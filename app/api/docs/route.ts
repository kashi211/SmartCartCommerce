import * as fs from 'fs';
import * as path from 'path';
import { NextResponse } from 'next/server';
import { loadFromS3 } from '@/lib/storage/s3';

const KB_ROOT = process.env.KB_PATH
  ? path.resolve(process.cwd(), process.env.KB_PATH)
  : path.resolve(process.cwd(), 'data/kb');

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const relPath = searchParams.get('path');
  if (!relPath) return NextResponse.json({ error: 'path required' }, { status: 400 });

  const absPath = path.resolve(KB_ROOT, relPath);
  if (!absPath.startsWith(KB_ROOT + path.sep) && absPath !== KB_ROOT) {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  }

  // S3 has the live edited version; fall back to the bundled file
  try {
    const stored = await loadFromS3(relPath);
    if (stored) return NextResponse.json({ content: stored });
  } catch { /* S3 unavailable — fall through */ }

  try {
    const content = fs.readFileSync(absPath, 'utf-8');
    return NextResponse.json({ content });
  } catch {
    return NextResponse.json({ error: 'not found' }, { status: 404 });
  }
}
