import { traceable } from 'langsmith/traceable';
import type { KBSource } from '../types';

export const rerankSources = traceable(
  async function rerankSources(query: string, candidates: KBSource[], topK = 6): Promise<KBSource[]> {
    if (candidates.length <= topK) return candidates;

    const numbered = candidates
      .map((c, i) => `[${i}] ${c.content.slice(0, 350).replace(/\n+/g, ' ')}`)
      .join('\n\n');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        temperature: 0,
        max_tokens: 80,
        messages: [
          {
            role: 'system',
            content: `Rank the ${topK} most relevant passages for the query. Output ONLY a comma-separated list of indices like: 3,0,7,2,5,1`,
          },
          {
            role: 'user',
            content: `Query: ${query}\n\nCandidates:\n${numbered}`,
          },
        ],
      }),
    });

    if (!response.ok) return candidates.slice(0, topK);

    const data = await response.json();
    const text: string = data.choices[0].message.content ?? '';
    const indices = text
      .split(',')
      .map((s: string) => parseInt(s.trim(), 10))
      .filter((n: number) => !isNaN(n) && n >= 0 && n < candidates.length)
      .slice(0, topK);

    if (indices.length === 0) return candidates.slice(0, topK);

    const reranked = indices.map((i) => candidates[i]);

    // Fill remaining slots if parse yielded fewer than topK
    if (reranked.length < topK) {
      const used = new Set(indices);
      for (let i = 0; i < candidates.length && reranked.length < topK; i++) {
        if (!used.has(i)) reranked.push(candidates[i]);
      }
    }

    return reranked;
  },
  { name: 'retrieval/rerank', run_type: 'chain' },
);
