import { Pinecone } from '@pinecone-database/pinecone';
import { EMBEDDING_DIMENSION } from './embeddings';
import type { PineconeMetadata } from '../types';

const INDEX_NAME = process.env.PINECONE_INDEX || 'smartcart-kb';

let pineconeClient: Pinecone | null = null;

function getClient(): Pinecone {
  if (!pineconeClient) {
    pineconeClient = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
  }
  return pineconeClient;
}

export async function ensureIndex(): Promise<void> {
  const client = getClient();
  const existing = await client.listIndexes();
  const names = existing.indexes?.map((i) => i.name) ?? [];

  if (!names.includes(INDEX_NAME)) {
    console.log(`Creating Pinecone index "${INDEX_NAME}"...`);
    await client.createIndex({
      name: INDEX_NAME,
      dimension: EMBEDDING_DIMENSION,
      metric: 'cosine',
      spec: {
        serverless: {
          cloud: 'aws',
          region: 'us-east-1',
        },
      },
    });
    // Wait for index to be ready
    await new Promise((r) => setTimeout(r, 60_000));
    console.log('Index ready.');
  }
}

export async function upsertVectors(
  vectors: Array<{ id: string; values: number[]; metadata: PineconeMetadata }>
): Promise<void> {
  const index = getClient().index(INDEX_NAME);
  const BATCH = 100;
  for (let i = 0; i < vectors.length; i += BATCH) {
    await index.upsert(vectors.slice(i, i + BATCH));
  }
}

export async function querySimilar(
  queryVector: number[],
  topK = 6
): Promise<Array<{ id: string; score: number; metadata: PineconeMetadata }>> {
  const index = getClient().index<PineconeMetadata>(INDEX_NAME);
  const result = await index.query({
    vector: queryVector,
    topK,
    includeMetadata: true,
  });

  return (result.matches ?? [])
    .filter((m) => m.score !== undefined && m.score > 0.3)
    .map((m) => ({
      id: m.id,
      score: m.score!,
      metadata: m.metadata as PineconeMetadata,
    }));
}
