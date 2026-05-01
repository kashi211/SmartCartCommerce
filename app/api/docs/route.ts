import * as fs from 'fs';
import * as path from 'path';
import { NextResponse } from 'next/server';

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

  try {
    const content = fs.readFileSync(absPath, 'utf-8');
    return NextResponse.json({ content });
  } catch {
    return NextResponse.json({ error: 'not found' }, { status: 404 });
  }
}
