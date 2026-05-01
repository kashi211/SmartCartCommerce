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
  async function rewriteQuery(query: string, persona: Persona): Promise<string[]> {
    const personaContext: Record<Persona, string> = {
      customer: 'e-commerce customer support — returns, shipping, orders, loyalty, product policies',
      concierge: 'VIP customer concierge — escalations, refunds, white-glove service, support playbooks',
      'brand-partner': 'marketplace seller / brand partner — commissions, onboarding, admin console, seller operations',
    };

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        temperature: 0,
        max_tokens: 150,
        messages: [
          {
            role: 'system',
            content: `You are a search query optimizer for a ${personaContext[persona]} knowledge base.
Given a user question, output 2 search-optimized reformulations on separate lines.
Focus on key terminology likely in documentation. Be concise.
Output ONLY the queries, one per line, no numbering or bullets.`,
          },
          { role: 'user', content: query },
        ],
      }),
    });

    if (!response.ok) return [query];

    const data = await response.json();
    const text: string = data.choices[0].message.content ?? '';
    const rewrites = text
      .split('\n')
      .map((q: string) => q.trim())
      .filter(Boolean)
      .slice(0, 2);

    return [query, ...rewrites];
  },
  { name: 'query/rewrite', run_type: 'chain' },
);
