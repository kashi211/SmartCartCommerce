import { traceable } from 'langsmith/traceable';
import { embedTexts, embedQuery } from './embeddings';
import { querySimilar } from './vectorstore';
import { rewriteQuery, extractKeywords } from './query-rewriter';
import { rerankSources } from './reranker';
import type { KBSource, Persona } from '../types';

function getAudienceFilter(persona: Persona): Record<string, unknown> | undefined {
  switch (persona) {
    case 'customer':
      return { audience: 'customer-facing' };
    case 'brand-partner':
      return { audience: { $in: ['brand-partner', 'customer-facing'] } };
    case 'concierge':
      return undefined;
  }
}

function applyKeywordBoost(query: string, candidates: KBSource[]): KBSource[] {
  const keywords = extractKeywords(query);
  if (keywords.length === 0) return candidates;

  return candidates
    .map((c) => {
      const lower = c.content.toLowerCase();
      const hits = keywords.filter((kw) => lower.includes(kw)).length;
      const keywordScore = hits / keywords.length;
      const blended = c.score * 0.85 + keywordScore * 0.15;
      return { ...c, score: blended };
    })
    .sort((a, b) => b.score - a.score);
}

function mapToKBSource(m: {
  id: string;
  score: number;
  metadata: { content: string; filePath: string; category: string; docTitle: string; sectionTitle: string };
}): KBSource {
  return {
    id: m.id,
    score: m.score,
    content: m.metadata.content,
    metadata: {
      filePath: m.metadata.filePath,
      category: m.metadata.category,
      docTitle: m.metadata.docTitle,
      sectionTitle: m.metadata.sectionTitle,
    },
  };
}

async function hopRetrieval(
  query: string,
  existingSources: KBSource[],
  filter: Record<string, unknown> | undefined,
  topK: number,
): Promise<KBSource[]> {
  const existingContext = existingSources.map((s) => s.metadata.sectionTitle).join(', ');
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      temperature: 0,
      max_tokens: 60,
      messages: [
        {
          role: 'system',
          content:
            'You help identify what additional information is needed to answer a question. Output a single short search query, or output "NONE" if no additional info is needed.',
        },
        {
          role: 'user',
          content: `Question: ${query}\nAlready retrieved: ${existingContext || 'nothing'}\nWhat else should I search for?`,
        },
      ],
    }),
  });

  if (!response.ok) return [];

  const data = await response.json();
  const hopQuery: string = data.choices[0].message.content?.trim() ?? '';
  if (!hopQuery || hopQuery === 'NONE') return [];

  const hopVector = await embedQuery(hopQuery);
  let hopMatches = await querySimilar(hopVector, topK, filter);
  if (hopMatches.length === 0 && filter) {
    hopMatches = await querySimilar(hopVector, topK);
  }
  return hopMatches.map(mapToKBSource);
}

export const retrieveContext = traceable(
  async function retrieveContext(
    query: string,
    topK = 6,
    persona: Persona = 'customer',
  ): Promise<KBSource[]> {
    const audienceFilter = getAudienceFilter(persona);

    // Step 1: Query rewriting — produces [original, rewrite1, rewrite2]
    const queries = await rewriteQuery(query, persona).catch(() => [query]);

    // Step 2: Embed all query variants in one batch
    const embeddings = await embedTexts(queries);

    // Step 3: Multi-query retrieval with deduplication (best score wins)
    const candidateMap = new Map<string, KBSource>();

    for (const embedding of embeddings) {
      let matches = await querySimilar(embedding, 20, audienceFilter);
      // Fallback to unfiltered if the index doesn't have the audience field yet
      if (matches.length === 0 && audienceFilter) {
        matches = await querySimilar(embedding, 20);
      }
      for (const m of matches) {
        const existing = candidateMap.get(m.id);
        const source = mapToKBSource(m);
        if (!existing || m.score > existing.score) {
          candidateMap.set(m.id, source);
        }
      }
    }

    let candidates = Array.from(candidateMap.values()).sort((a, b) => b.score - a.score);

    // Step 4: Hybrid keyword boost (85% semantic + 15% keyword overlap)
    candidates = applyKeywordBoost(query, candidates);

    // Step 5: LLM re-rank top 20 candidates → top topK
    const reranked = await rerankSources(query, candidates.slice(0, 20), topK).catch(
      () => candidates.slice(0, topK),
    );

    // Step 6: Multi-hop if results are weak (< 3 results or top score < 0.4)
    const isWeak = reranked.length < 3 || (reranked[0]?.score ?? 0) < 0.4;
    if (isWeak) {
      const hopSources = await hopRetrieval(query, reranked, audienceFilter, 8).catch(() => []);
      for (const hs of hopSources) {
        if (!reranked.find((r) => r.id === hs.id)) {
          reranked.push(hs);
        }
      }
    }

    return reranked.slice(0, topK);
  },
  { name: 'retrieveContext', run_type: 'retriever' },
);
