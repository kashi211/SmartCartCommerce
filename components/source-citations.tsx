'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { KBSource } from '@/lib/types';

interface SourceCitationsProps {
  sources: KBSource[];
}

function scoreLabel(score: number): string {
  if (score >= 0.85) return 'High';
  if (score >= 0.7) return 'Good';
  return 'Fair';
}

function categoryColor(category: string): string {
  const map: Record<string, string> = {
    'customer policies': 'bg-blue-900/40 text-blue-300',
    'customer support': 'bg-purple-900/40 text-purple-300',
    'seller operations': 'bg-amber-900/40 text-amber-300',
    'industry guides': 'bg-green-900/40 text-green-300',
    'product features': 'bg-teal-900/40 text-teal-300',
    'admin platform': 'bg-orange-900/40 text-orange-300',
    company: 'bg-stone-700/60 text-stone-300',
    'marketing and editorial': 'bg-pink-900/40 text-pink-300',
    'slack excerpts': 'bg-yellow-900/40 text-yellow-300',
  };
  return map[category.toLowerCase()] ?? 'bg-stone-700/40 text-stone-300';
}

export function SourceCitations({ sources }: SourceCitationsProps) {
  const [open, setOpen] = useState(false);

  if (sources.length === 0) return null;

  return (
    <div className="mt-3 border-t border-stone-100 pt-3">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-600 transition-colors"
      >
        <span>{open ? '▾' : '▸'}</span>
        <span>
          {sources.length} source{sources.length !== 1 ? 's' : ''} retrieved
        </span>
      </button>

      {open && (
        <div className="mt-2 space-y-2">
          {sources.map((s, i) => (
            <div
              key={s.id}
              className="rounded-lg border border-stone-200 bg-stone-50 p-3 text-xs"
            >
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-semibold text-stone-700">
                    {s.metadata.docTitle}
                    {s.metadata.sectionTitle && (
                      <span className="font-normal text-stone-400">
                        {' '}/{' '}{s.metadata.sectionTitle}
                      </span>
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <span
                    className={cn(
                      'px-1.5 py-0.5 rounded text-[10px] font-medium',
                      categoryColor(s.metadata.category)
                    )}
                  >
                    {s.metadata.category}
                  </span>
                  <span className="text-stone-400">
                    {scoreLabel(s.score)}
                  </span>
                </div>
              </div>
              <p className="text-stone-500 leading-relaxed line-clamp-3">
                {s.content.slice(0, 280).replace(/^.+\n\n/, '')}
                {s.content.length > 280 ? '…' : ''}
              </p>
              <p className="mt-1.5 text-[10px] text-stone-400 font-mono">
                {s.metadata.filePath}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
