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

async function searchWithFallback(
  embedding: number[],
  topK: number,
  filter: Record<string, unknown> | undefined,
): Promise<ReturnType<typeof querySimilar>> {
  if (filter) {
    const filtered = await querySimilar(embedding, topK, filter);
    if (filtered.length > 0) return filtered;
    // Old index without audience field — fall back to unfiltered
  }
  return querySimilar(embedding, topK);
}

async function hopRetrieval(
  query: string,
  existingSources: KBSource[],
  filter: Record<string, unknown> | undefined,
  topK: number,
): Promise<KBSource[]> {
  const existingContext = existingSources.map((s) => s.metadata.sectionTitle).filter(Boolean).join(', ');
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
  const hopMatches = await searchWithFallback(hopVector, topK, filter);
  return hopMatches.map(mapToKBSource);
}

async function simpleFallbackRetrieval(query: string, topK: number): Promise<KBSource[]> {
  const queryVector = await embedQuery(query);
  const matches = await querySimilar(queryVector, topK);
  return matches.map(mapToKBSource);
}

export const retrieveContext = traceable(
  async function retrieveContext(
    query: string,
    topK = 6,
    persona: Persona = 'customer',
  ): Promise<KBSource[]> {
    const audienceFilter = getAudienceFilter(persona);

    try {
      // Step 1: Query rewriting — [original, rewrite1, rewrite2]
      const queries = await rewriteQuery(query, persona).catch(() => [query]);

      // Step 2: Embed all query variants in one batch
      const embeddings = await embedTexts(queries);

      // Step 3: Run all Pinecone searches in PARALLEL (not sequential)
      const searchResults = await Promise.all(
        embeddings.map((embedding) => searchWithFallback(embedding, 20, audienceFilter)),
      );

      // Step 4: Deduplicate across all search results (best score wins)
      const candidateMap = new Map<string, KBSource>();
      for (const matches of searchResults) {
        for (const m of matches) {
          const existing = candidateMap.get(m.id);
          const source = mapToKBSource(m);
          if (!existing || m.score > existing.score) {
            candidateMap.set(m.id, source);
          }
        }
      }

      let candidates = Array.from(candidateMap.values()).sort((a, b) => b.score - a.score);

      if (candidates.length === 0) {
        console.warn('[retrieveContext] no candidates after multi-query search');
        return simpleFallbackRetrieval(query, topK);
      }

      // Step 5: Hybrid keyword boost (85% semantic + 15% keyword overlap)
      candidates = applyKeywordBoost(query, candidates);

      // Step 6: LLM re-rank top 20 → top topK
      const reranked = await rerankSources(query, candidates.slice(0, 20), topK).catch(
        () => candidates.slice(0, topK),
      );

      // Step 7: Multi-hop if results are weak
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
    } catch (err) {
      console.error('[retrieveContext] pipeline error, using simple fallback:', err);
      return simpleFallbackRetrieval(query, topK);
    }
  },
  { name: 'retrieveContext', run_type: 'retriever' },
);
