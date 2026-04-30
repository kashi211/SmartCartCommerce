import { traceable } from 'langsmith/traceable';

const OPENAI_EMBED_URL = 'https://api.openai.com/v1/embeddings';
const OPENAI_EMBED_MODEL = 'text-embedding-3-small';
const DIMENSIONS = 1024;

interface OpenAIEmbedResponse {
  data: Array<{ embedding: number[]; index: number }>;
  usage: { prompt_tokens: number; total_tokens: number };
}

const callEmbed = traceable(
  async function callEmbed(input: string[]): Promise<number[][]> {
    const response = await fetch(OPENAI_EMBED_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input, model: OPENAI_EMBED_MODEL, dimensions: DIMENSIONS }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenAI embedding failed (${response.status}): ${error}`);
    }

    const data: OpenAIEmbedResponse = await response.json();
    return data.data.sort((a, b) => a.index - b.index).map((d) => d.embedding);
  },
  { name: 'embeddings/openai', run_type: 'embedding' },
);

export async function embedTexts(texts: string[]): Promise<number[][]> {
  if (texts.length === 0) return [];
  return callEmbed(texts);
}

export async function embedQuery(query: string): Promise<number[]> {
  const results = await callEmbed([query]);
  return results[0];
}

export const EMBEDDING_DIMENSION = DIMENSIONS;
