import { traceable } from 'langsmith/traceable';
import type { Persona } from '../types';

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'is', 'it', 'in', 'on', 'at', 'to', 'for',
  'of', 'and', 'or', 'but', 'not', 'with', 'as', 'by', 'from',
  'that', 'this', 'are', 'was', 'be', 'do', 'does', 'did', 'how',
  'what', 'when', 'where', 'who', 'why', 'can', 'could', 'would',
  'will', 'i', 'my', 'me', 'we', 'our', 'you', 'your',
]);

export function extractKeywords(query: string): string[] {
  return query
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));
}

export const rewriteQuery = traceable(
  async function rewriteQuery(query: string, _persona: Persona): Promise<string[]> {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        temperature: 0,
        max_tokens: 100,
        messages: [
          {
            role: 'system',
            content: `Rephrase the user's question as 1 concise, keyword-focused search query suitable for a documentation database.
Preserve the exact topic and intent — do NOT introduce topics not present in the original question.
Output ONLY the rephrased query, nothing else.`,
          },
          { role: 'user', content: query },
        ],
      }),
    });

    if (!response.ok) return [query];

    const data = await response.json();
    const rewrite: string = (data.choices[0].message.content ?? '').trim();

    // Only use the rewrite if it's meaningfully different from the original
    if (!rewrite || rewrite.toLowerCase() === query.toLowerCase()) return [query];
    return [query, rewrite];
  },
  { name: 'query/rewrite', run_type: 'chain' },
);
