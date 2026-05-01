import * as fs from 'fs';
import * as path from 'path';
import { NextResponse } from 'next/server';
import { chunkMarkdownFile } from '@/lib/rag/chunker';
import { embedTexts } from '@/lib/rag/embeddings';
import { deleteDocVectors, upsertVectors } from '@/lib/rag/vectorstore';
import type { PineconeMetadata } from '@/lib/types';

const KB_ROOT = process.env.KB_PATH
  ? path.resolve(process.cwd(), process.env.KB_PATH)
  : path.resolve(process.cwd(), '../SmartCartCommerce-KnowledgeBase');

// POST /api/admin/reindex  body: { path }
export async function POST(req: Request) {
  const { path: relPath } = await req.json();
  if (!relPath) return NextResponse.json({ error: 'path required' }, { status: 400 });

  const absPath = path.resolve(KB_ROOT, relPath);
  if (!absPath.startsWith(KB_ROOT + path.sep)) {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  }

  if (!fs.existsSync(absPath)) {
    return NextResponse.json({ error: 'file not found' }, { status: 404 });
  }

  try {
    // 1. Delete old vectors for this doc
    const deleted = await deleteDocVectors(relPath);

    // 2. Re-chunk
    const chunks = chunkMarkdownFile(absPath, relPath);
    if (chunks.length === 0) {
      return NextResponse.json({ ok: true, deleted, indexed: 0 });
    }

    // 3. Re-embed
    const texts = chunks.map((c) => c.content);
    const embeddings = await embedTexts(texts);

    // 4. Upsert
    const vectors: Array<{ id: string; values: number[]; metadata: PineconeMetadata }> =
      chunks.map((chunk, i) => ({
        id: chunk.id,
        values: embeddings[i],
        metadata: {
          content: chunk.content,
          filePath: chunk.metadata.filePath,
          category: chunk.metadata.category,
          docTitle: chunk.metadata.docTitle,
          sectionTitle: chunk.metadata.sectionTitle,
          chunkIndex: chunk.metadata.chunkIndex,
        },
      }));

    await upsertVectors(vectors);

    return NextResponse.json({ ok: true, deleted, indexed: vectors.length });
  } catch (err) {
    console.error('Reindex error:', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
