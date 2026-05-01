import * as fs from 'fs';
import * as path from 'path';
import { NextResponse } from 'next/server';
import { findMarkdownFiles, chunkMarkdownFile } from '@/lib/rag/chunker';
import { loadFromS3 } from '@/lib/storage/s3';

const KB_ROOT = process.env.KB_PATH
  ? path.resolve(process.cwd(), process.env.KB_PATH)
  : path.resolve(process.cwd(), 'data/kb');

function safePath(relPath: string): string | null {
  const abs = path.resolve(KB_ROOT, relPath);
  if (!abs.startsWith(KB_ROOT + path.sep) && abs !== KB_ROOT) return null;
  return abs;
}

// GET /api/admin/docs              → list all docs
// GET /api/admin/docs?path=...     → get one doc's content
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const relPath = searchParams.get('path');

  if (relPath) {
    const abs = safePath(relPath);
    if (!abs) return NextResponse.json({ error: 'forbidden' }, { status: 403 });

    // Check S3 first for any admin-saved version, fall back to bundled file
    try {
      const stored = await loadFromS3(relPath);
      if (stored) return NextResponse.json({ content: stored, source: 's3' });
    } catch { /* S3 unavailable — fall through to file */ }

    try {
      const content = fs.readFileSync(abs, 'utf-8');
      return NextResponse.json({ content, source: 'file' });
    } catch {
      return NextResponse.json({ error: 'not found' }, { status: 404 });
    }
  }

  if (!fs.existsSync(KB_ROOT)) {
    return NextResponse.json(
      { error: `Knowledge base directory not found at: ${KB_ROOT}. Set KB_PATH in .env.local and restart the server.` },
      { status: 503 },
    );
  }

  try {
    const files = findMarkdownFiles(KB_ROOT);
    const docs = files.map(({ absPath, relPath: rel }) => {
      const raw = fs.readFileSync(absPath, 'utf-8');
      const title = raw.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? rel;
      const category = rel.split('/')[0].replace(/^\d+-/, '').replace(/-/g, ' ');
      const chunks = chunkMarkdownFile(absPath, rel);
      return { relPath: rel, title, category, chunkCount: chunks.length, charCount: raw.length };
    });
    return NextResponse.json({ docs });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
