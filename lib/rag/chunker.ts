import * as fs from 'fs';
import * as path from 'path';
import type { Chunk } from '../types';

const MAX_CHUNK_CHARS = 3000;

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

function splitLongSection(text: string, maxChars: number): string[] {
  if (text.length <= maxChars) return [text];

  const subSections = text.split(/(?=^### )/m);
  if (subSections.length > 1) {
    const result: string[] = [];
    for (const sub of subSections) {
      result.push(...splitLongSection(sub, maxChars));
    }
    return result;
  }

  const paragraphs = text.split(/\n\n+/);
  const chunks: string[] = [];
  let current = '';

  for (const para of paragraphs) {
    if (current.length + para.length + 2 > maxChars && current.length > 0) {
      chunks.push(current.trim());
      current = para;
    } else {
      current = current ? current + '\n\n' + para : para;
    }
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks;
}

export function chunkMarkdownFile(filePath: string, relPath: string): Chunk[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const docTitle = extractDocTitle(content, relPath);
  const category = categoryFromPath(relPath);

  const sections = content.split(/(?=^## )/m);
  const chunks: Chunk[] = [];

  for (const section of sections) {
    const trimmed = section.trim();
    if (trimmed.length < 80) continue;

    const sectionTitleMatch = trimmed.match(/^## (.+)$/m);
    const sectionTitle = sectionTitleMatch ? sectionTitleMatch[1].trim() : '';

    const subChunks = splitLongSection(trimmed, MAX_CHUNK_CHARS);
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
      },
    });
  }

  return chunks;
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
