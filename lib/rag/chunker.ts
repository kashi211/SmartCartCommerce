import * as fs from 'fs';
import * as path from 'path';
import type { Chunk } from '../types';

const MAX_CHUNK_CHARS = 2000;
const OVERLAP_CHARS = 400;

function extractDocTitle(content: string, filePath: string): string {
  const h1 = content.match(/^#\s+(.+)$/m);
  if (h1) return h1[1].trim();
  return path.basename(filePath, '.md').replace(/-/g, ' ');
}

function categoryFromPath(filePath: string): string {
  const parts = filePath.split('/');
  const dir = parts[parts.length - 2] || parts[0];
  return dir.replace(/^\d+-/, '').replace(/-/g, ' ');
}

function makeChunkId(filePath: string, index: number): string {
  return filePath
    .replace(/[\/\\]/g, '-')
    .replace(/\.md$/, '')
    .replace(/[^a-zA-Z0-9-]/g, '')
    .slice(0, 80) + `-${index}`;
}

function splitWithOverlap(text: string, maxChars: number, overlapChars: number): string[] {
  if (text.length <= maxChars) return [text];

  // First try splitting on ### sub-sections
  const subSections = text.split(/(?=^### )/m);
  if (subSections.length > 1) {
    const result: string[] = [];
    for (const sub of subSections) {
      result.push(...splitWithOverlap(sub, maxChars, overlapChars));
    }
    return result;
  }

  // Sliding window with overlap, preferring paragraph breaks
  const chunks: string[] = [];
  let pos = 0;

  while (pos < text.length) {
    const rawEnd = Math.min(pos + maxChars, text.length);
    let chunkEnd = rawEnd;

    if (rawEnd < text.length) {
      // Prefer breaking at a paragraph boundary in the last 30% of the window
      const searchFloor = pos + Math.floor(maxChars * 0.7);
      const paraBreak = text.lastIndexOf('\n\n', rawEnd);
      if (paraBreak >= searchFloor) {
        chunkEnd = paraBreak;
      } else {
        const lineBreak = text.lastIndexOf('\n', rawEnd);
        if (lineBreak >= searchFloor) chunkEnd = lineBreak;
      }
    }

    const chunk = text.slice(pos, chunkEnd).trim();
    if (chunk.length > 60) chunks.push(chunk);
    if (chunkEnd >= text.length) break;
    pos = Math.max(pos + 1, chunkEnd - overlapChars);
  }

  return chunks;
}

function audienceFromPath(relPath: string): string {
  const dir = relPath.split('/')[0] ?? '';
  if (dir.startsWith('04-') || dir.startsWith('09-')) return 'brand-partner';
  if (dir.startsWith('05-')) return 'internal';
  return 'customer-facing';
}

export function chunkMarkdownContent(content: string, relPath: string): Chunk[] {
  const docTitle = extractDocTitle(content, relPath);
  const category = categoryFromPath(relPath);
  const audience = audienceFromPath(relPath);

  const sections = content.split(/(?=^## )/m);
  const chunks: Chunk[] = [];

  for (const section of sections) {
    const trimmed = section.trim();
    if (trimmed.length < 80) continue;

    const sectionTitleMatch = trimmed.match(/^## (.+)$/m);
    const sectionTitle = sectionTitleMatch ? sectionTitleMatch[1].trim() : '';

    const subChunks = splitWithOverlap(trimmed, MAX_CHUNK_CHARS, OVERLAP_CHARS);
    for (const text of subChunks) {
      if (text.trim().length < 60) continue;
      const idx = chunks.length;
      chunks.push({
        id: makeChunkId(relPath, idx),
        content: `${docTitle}${sectionTitle ? ` — ${sectionTitle}` : ''}\n\n${text}`,
        metadata: {
          filePath: relPath,
          category,
          docTitle,
          sectionTitle,
          chunkIndex: idx,
          charCount: text.length,
          audience,
        },
      });
    }
  }

  if (chunks.length === 0 && content.trim().length > 60) {
    chunks.push({
      id: makeChunkId(relPath, 0),
      content: content.slice(0, MAX_CHUNK_CHARS),
      metadata: {
        filePath: relPath,
        category,
        docTitle,
        sectionTitle: '',
        chunkIndex: 0,
        charCount: content.length,
        audience,
      },
    });
  }

  return chunks;
}

export function chunkMarkdownFile(filePath: string, relPath: string): Chunk[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  return chunkMarkdownContent(content, relPath);
}

export function findMarkdownFiles(kbRoot: string): Array<{ absPath: string; relPath: string }> {
  const results: Array<{ absPath: string; relPath: string }> = [];

  function walk(dir: string) {
    for (const entry of fs.readdirSync(dir)) {
      if (entry.startsWith('.')) continue;
      const full = path.join(dir, entry);
      const stat = fs.statSync(full);
      if (stat.isDirectory()) {
        walk(full);
      } else if (entry.endsWith('.md') && entry !== 'README.md') {
        results.push({ absPath: full, relPath: path.relative(kbRoot, full) });
      }
    }
  }

  walk(kbRoot);
  return results;
}
