'use client';

import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { X } from 'lucide-react';
import type { KBSource } from '@/lib/types';

interface DocViewerModalProps {
  source: KBSource | null;
  onClose: () => void;
}

function splitAtSection(
  content: string,
  sectionTitle: string,
): [string, string, string] {
  if (!sectionTitle) return ['', content, ''];

  const heading = `## ${sectionTitle}`;
  const idx = content.indexOf(heading);
  if (idx === -1) return ['', content, ''];

  const before = content.slice(0, idx);
  const fromSection = content.slice(idx);

  // Find where the next ## heading starts (end of this section)
  const nextMatch = fromSection.slice(heading.length).match(/\n(## )/);
  if (!nextMatch || nextMatch.index === undefined) {
    return [before, fromSection, ''];
  }

  const splitPoint = heading.length + nextMatch.index + 1;
  return [before, fromSection.slice(0, splitPoint), fromSection.slice(splitPoint)];
}

export function DocViewerModal({ source, onClose }: DocViewerModalProps) {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!source) return;
    setContent(null);
    setError(null);
    setLoading(true);

    fetch(`/api/docs?path=${encodeURIComponent(source.metadata.filePath)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setContent(data.content);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [source]);

  // Scroll highlighted section into view once content loads
  useEffect(() => {
    if (content && highlightRef.current) {
      setTimeout(() => {
        highlightRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 80);
    }
  }, [content]);

  if (!source) return null;

  const sectionTitle = source.metadata.sectionTitle ?? '';
  const [before, highlighted, after] = content
    ? splitAtSection(content, sectionTitle)
    : ['', '', ''];

  const proseClasses =
    'prose prose-sm max-w-none prose-headings:text-stone-800 prose-p:text-stone-600 prose-li:text-stone-600 prose-strong:text-stone-700 prose-code:text-amber-700 prose-code:bg-amber-50 prose-code:px-1 prose-code:rounded prose-a:text-amber-700';

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative z-10 bg-white w-full sm:max-w-3xl h-[90vh] sm:h-[85vh] rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 px-5 py-4 border-b border-stone-200 flex-shrink-0">
          <div className="min-w-0">
            <p className="text-xs font-medium text-amber-700 uppercase tracking-wide mb-0.5">
              {source.metadata.category}
            </p>
            <h2 className="text-base font-semibold text-stone-800 truncate">
              {source.metadata.docTitle}
            </h2>
            {sectionTitle && (
              <p className="text-xs text-stone-400 mt-0.5">§ {sectionTitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 p-1.5 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-stone-600 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {loading && (
            <div className="flex items-center justify-center h-32 text-stone-400 text-sm">
              Loading document…
            </div>
          )}

          {error && (
            <div className="text-red-500 text-sm p-4 bg-red-50 rounded-lg">
              {error}
            </div>
          )}

          {content && (
            <>
              {before && (
                <div className={proseClasses}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{before}</ReactMarkdown>
                </div>
              )}

              {/* Highlighted section */}
              <div
                ref={highlightRef}
                className="rounded-xl border-2 border-amber-400 bg-amber-50/60 px-4 py-3 my-3 scroll-mt-4"
              >
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-amber-500" />
                  <span className="text-[10px] font-semibold text-amber-700 uppercase tracking-wide">
                    Cited section
                  </span>
                </div>
                <div className={proseClasses}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{highlighted}</ReactMarkdown>
                </div>
              </div>

              {after && (
                <div className={proseClasses}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{after}</ReactMarkdown>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-2.5 border-t border-stone-100 bg-stone-50 flex-shrink-0">
          <p className="text-[10px] font-mono text-stone-400 truncate">
            {source.metadata.filePath}
          </p>
          <span className="text-[10px] text-stone-400 flex-shrink-0 ml-2">
            Relevance: {Math.round(source.score * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
}
