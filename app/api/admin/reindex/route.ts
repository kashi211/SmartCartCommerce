import * as fs from 'fs';
import * as path from 'path';
import { NextResponse } from 'next/server';
import { chunkMarkdownContent } from '@/lib/rag/chunker';
import { embedTexts } from '@/lib/rag/embeddings';
import { deleteDocVectors, upsertVectors, saveDocContent } from '@/lib/rag/vectorstore';
import type { PineconeMetadata } from '@/lib/types';

const KB_ROOT = process.env.KB_PATH
  ? path.resolve(process.cwd(), process.env.KB_PATH)
  : path.resolve(process.cwd(), 'data/kb');

// POST /api/admin/reindex  body: { path, content }
// Content is passed directly from the editor — no file read required.
// Best-effort file write (works locally, silently skipped on Vercel's read-only fs).
export async function POST(req: Request) {
  const { path: relPath, content } = await req.json();
  if (!relPath || typeof content !== 'string') {
    return NextResponse.json({ error: 'path and content required' }, { status: 400 });
  }

  const absPath = path.resolve(KB_ROOT, relPath);
  if (!absPath.startsWith(KB_ROOT + path.sep)) {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  }

  // Persist file when possible (local dev / writable server)
  try { fs.writeFileSync(absPath, content, 'utf-8'); } catch { /* Vercel: skip */ }

  try {
    const chunks = chunkMarkdownContent(content, relPath);

    const deleted = await deleteDocVectors(relPath);

    if (chunks.length === 0) {
      return NextResponse.json({ ok: true, deleted, indexed: 0 });
    }

    const embeddings = await embedTexts(chunks.map((c) => c.content));

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

    // Persist the edited content in Pinecone so it survives across Vercel deployments
    await saveDocContent(relPath, content);

    return NextResponse.json({ ok: true, deleted, indexed: vectors.length, fileSaved: fs.existsSync(absPath) });
  } catch (err) {
    console.error('Reindex error:', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
