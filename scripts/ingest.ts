import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import { findMarkdownFiles, chunkMarkdownFile } from '../lib/rag/chunker';
import { embedTexts } from '../lib/rag/embeddings';
import { ensureIndex, upsertVectors } from '../lib/rag/vectorstore';
import type { PineconeMetadata } from '../lib/types';

const KB_PATH = process.env.KB_PATH
  ? path.resolve(process.cwd(), process.env.KB_PATH)
  : path.resolve(process.cwd(), '../SmartCartCommerce-KnowledgeBase');

const EMBED_BATCH = 96;

async function main() {
  console.log(`\nSmartCart KB Ingestion`);
  console.log(`Knowledge base: ${KB_PATH}`);

  const files = findMarkdownFiles(KB_PATH);
  console.log(`Found ${files.length} markdown files\n`);

  console.log('Ensuring Pinecone index exists...');
  await ensureIndex();

  let allChunks: ReturnType<typeof chunkMarkdownFile> = [];
  for (const { absPath, relPath } of files) {
    const chunks = chunkMarkdownFile(absPath, relPath);
    allChunks.push(...chunks);
  }

  console.log(`Total chunks: ${allChunks.length}`);
  console.log(`Embedding in batches of ${EMBED_BATCH}...\n`);

  const vectors: Array<{ id: string; values: number[]; metadata: PineconeMetadata }> = [];
  let processed = 0;

  for (let i = 0; i < allChunks.length; i += EMBED_BATCH) {
    const batch = allChunks.slice(i, i + EMBED_BATCH);
    const texts = batch.map((c) => c.content);

    process.stdout.write(`  [${i + 1}–${Math.min(i + EMBED_BATCH, allChunks.length)}/${allChunks.length}] embedding...`);
    const embeddings = await embedTexts(texts);
    process.stdout.write(` done\n`);

    for (let j = 0; j < batch.length; j++) {
      const chunk = batch[j];
      vectors.push({
        id: chunk.id,
        values: embeddings[j],
        metadata: {
          content: chunk.content,
          filePath: chunk.metadata.filePath,
          category: chunk.metadata.category,
          docTitle: chunk.metadata.docTitle,
          sectionTitle: chunk.metadata.sectionTitle,
          chunkIndex: chunk.metadata.chunkIndex,
        },
      });
    }

    processed += batch.length;
  }

  console.log(`\nUpserting ${vectors.length} vectors to Pinecone...`);
  await upsertVectors(vectors);

  console.log(`\nIngestion complete. ${processed} chunks indexed.\n`);
}

main().catch((err) => {
  console.error('Ingestion failed:', err);
  process.exit(1);
});
