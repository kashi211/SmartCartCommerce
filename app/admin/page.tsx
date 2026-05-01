'use client';

import { useEffect, useState, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { X, Search, FileText, RefreshCw, Save, Eye, Edit3, ChevronRight, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DocMeta {
  relPath: string;
  title: string;
  category: string;
  chunkCount: number;
  charCount: number;
}

type ReindexStatus = 'idle' | 'saving' | 'reindexing' | 'done' | 'error';

function categoryColor(category: string): string {
  const map: Record<string, string> = {
    company: 'bg-stone-100 text-stone-600',
    'customer policies': 'bg-blue-50 text-blue-700',
    'industry guides': 'bg-green-50 text-green-700',
    'seller operations': 'bg-amber-50 text-amber-700',
    'customer support': 'bg-purple-50 text-purple-700',
    'product features': 'bg-teal-50 text-teal-700',
    'slack excerpts': 'bg-yellow-50 text-yellow-700',
    'marketing and editorial': 'bg-pink-50 text-pink-700',
    'admin platform': 'bg-orange-50 text-orange-700',
  };
  return map[category.toLowerCase()] ?? 'bg-stone-100 text-stone-600';
}

// ── Editor Panel ────────────────────────────────────────────────────────────

interface EditorPanelProps {
  doc: DocMeta;
  onClose: () => void;
  onSaved: (updatedDoc: DocMeta) => void;
}

function EditorPanel({ doc, onClose, onSaved }: EditorPanelProps) {
  const [content, setContent] = useState('');
  const [loadingContent, setLoadingContent] = useState(true);
  const [tab, setTab] = useState<'edit' | 'preview'>('edit');
  const [status, setStatus] = useState<ReindexStatus>('idle');
  const [statusMsg, setStatusMsg] = useState('');
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    setLoadingContent(true);
    setDirty(false);
    fetch(`/api/admin/docs?path=${encodeURIComponent(doc.relPath)}`)
      .then((r) => r.json())
      .then((data) => setContent(data.content ?? ''))
      .finally(() => setLoadingContent(false));
  }, [doc.relPath]);

  const handleChange = (val: string) => {
    setContent(val);
    setDirty(true);
    if (status === 'done' || status === 'error') setStatus('idle');
  };

  const handleSaveAndReindex = useCallback(async () => {
    try {
      // 1. Save file
      setStatus('saving');
      setStatusMsg('Saving file…');
      const saveRes = await fetch('/api/admin/docs', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: doc.relPath, content }),
      });
      if (!saveRes.ok) throw new Error((await saveRes.json()).error ?? 'Save failed');

      // 2. Re-index
      setStatus('reindexing');
      setStatusMsg('Re-chunking and re-embedding…');
      const reindexRes = await fetch('/api/admin/reindex', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: doc.relPath }),
      });
      const reindexData = await reindexRes.json();
      if (!reindexRes.ok) throw new Error(reindexData.error ?? 'Reindex failed');

      setStatus('done');
      setStatusMsg(`Done — deleted ${reindexData.deleted} old vectors, indexed ${reindexData.indexed} new chunks`);
      setDirty(false);

      // Estimate new chunk count from response
      onSaved({ ...doc, chunkCount: reindexData.indexed });
    } catch (err) {
      setStatus('error');
      setStatusMsg(String(err));
    }
  }, [doc, content, onSaved]);

  const proseClasses =
    'prose prose-sm max-w-none prose-headings:text-stone-800 prose-p:text-stone-600 prose-li:text-stone-600 prose-strong:text-stone-700 prose-code:text-amber-700 prose-code:bg-amber-50 prose-code:px-1 prose-code:rounded prose-a:text-amber-700';

  return (
    <div className="fixed inset-0 z-40 flex">
      {/* Dimmed backdrop */}
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />

      {/* Panel */}
      <div className="relative ml-auto w-full max-w-3xl h-full bg-white shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 px-5 py-4 border-b border-stone-200 flex-shrink-0">
          <div className="min-w-0">
            <span
              className={cn(
                'inline-block text-[10px] font-medium px-2 py-0.5 rounded mb-1',
                categoryColor(doc.category),
              )}
            >
              {doc.category}
            </span>
            <h2 className="text-sm font-semibold text-stone-800 leading-snug">{doc.title}</h2>
            <p className="text-[10px] font-mono text-stone-400 mt-0.5 truncate">{doc.relPath}</p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 p-1.5 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-stone-600 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 px-5 pt-3 pb-0 border-b border-stone-100 flex-shrink-0">
          <button
            onClick={() => setTab('edit')}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-t-lg border-b-2 transition-colors',
              tab === 'edit'
                ? 'border-amber-500 text-amber-700'
                : 'border-transparent text-stone-500 hover:text-stone-700',
            )}
          >
            <Edit3 size={12} /> Source
          </button>
          <button
            onClick={() => setTab('preview')}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-t-lg border-b-2 transition-colors',
              tab === 'preview'
                ? 'border-amber-500 text-amber-700'
                : 'border-transparent text-stone-500 hover:text-stone-700',
            )}
          >
            <Eye size={12} /> Preview
          </button>
          {dirty && (
            <span className="ml-2 text-[10px] text-amber-600 font-medium">● Unsaved changes</span>
          )}
        </div>

        {/* Editor / Preview */}
        <div className="flex-1 overflow-hidden">
          {loadingContent ? (
            <div className="flex items-center justify-center h-full text-stone-400 text-sm">
              Loading…
            </div>
          ) : tab === 'edit' ? (
            <textarea
              value={content}
              onChange={(e) => handleChange(e.target.value)}
              className="w-full h-full resize-none font-mono text-xs leading-relaxed text-stone-700 p-5 outline-none border-0 focus:ring-0"
              spellCheck={false}
            />
          ) : (
            <div className="h-full overflow-y-auto px-6 py-5">
              <div className={proseClasses}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 border-t border-stone-200 px-5 py-3 bg-stone-50">
          {/* Status bar */}
          {statusMsg && (
            <div
              className={cn(
                'flex items-center gap-2 text-xs mb-3 px-3 py-2 rounded-lg',
                status === 'done' && 'bg-green-50 text-green-700',
                status === 'error' && 'bg-red-50 text-red-700',
                (status === 'saving' || status === 'reindexing') &&
                  'bg-amber-50 text-amber-700',
              )}
            >
              {status === 'error' && <AlertCircle size={12} />}
              {(status === 'saving' || status === 'reindexing') && (
                <RefreshCw size={12} className="animate-spin" />
              )}
              {statusMsg}
            </div>
          )}

          <div className="flex items-center justify-between">
            <p className="text-[10px] text-stone-400">
              {content.length.toLocaleString()} chars
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="px-3 py-1.5 text-xs text-stone-500 hover:text-stone-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAndReindex}
                disabled={status === 'saving' || status === 'reindexing' || !dirty}
                className={cn(
                  'flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-medium transition-colors',
                  dirty && status !== 'saving' && status !== 'reindexing'
                    ? 'bg-amber-600 hover:bg-amber-700 text-white'
                    : 'bg-stone-200 text-stone-400 cursor-not-allowed',
                )}
              >
                {status === 'saving' || status === 'reindexing' ? (
                  <RefreshCw size={12} className="animate-spin" />
                ) : (
                  <Save size={12} />
                )}
                Save &amp; Re-index
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Admin Page ──────────────────────────────────────────────────────────

export default function AdminPage() {
  const [docs, setDocs] = useState<DocMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [editingDoc, setEditingDoc] = useState<DocMeta | null>(null);

  useEffect(() => {
    fetch('/api/admin/docs')
      .then((r) => r.json())
      .then((data) => {
        if (data.error) { setFetchError(data.error); return; }
        setDocs(data.docs ?? []);
      })
      .catch((e) => setFetchError(String(e)))
      .finally(() => setLoading(false));
  }, []);

  const handleSaved = useCallback((updated: DocMeta) => {
    setDocs((prev) => prev.map((d) => (d.relPath === updated.relPath ? updated : d)));
  }, []);

  const filtered = docs.filter(
    (d) =>
      !search ||
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.category.toLowerCase().includes(search.toLowerCase()) ||
      d.relPath.toLowerCase().includes(search.toLowerCase()),
  );

  // Group by category
  const grouped = filtered.reduce<Record<string, DocMeta[]>>((acc, doc) => {
    (acc[doc.category] ??= []).push(doc);
    return acc;
  }, {});

  const totalChunks = docs.reduce((s, d) => s + d.chunkCount, 0);

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Top bar */}
      <div className="bg-white border-b border-stone-200 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-base font-semibold text-stone-800">Knowledge Base Admin</h1>
            {!loading && (
              <p className="text-xs text-stone-400 mt-0.5">
                {docs.length} documents · {totalChunks} chunks indexed
              </p>
            )}
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <a
              href="/"
              className="text-xs text-stone-500 hover:text-stone-700 transition-colors px-3 py-1.5 rounded-lg hover:bg-stone-100"
            >
              ← Back to chat
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-6">
        {/* Search */}
        <div className="relative mb-6">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
          />
          <input
            type="text"
            placeholder="Search documents…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-stone-200 rounded-xl bg-white outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400 transition-all"
          />
        </div>

        {/* Warning banner */}
        <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-6 text-xs text-amber-700">
          <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
          <span>
            Edits write directly to the knowledge base files and re-embed to Pinecone. File writes
            require local dev or a writable server deployment.
          </span>
        </div>

        {/* KB not found error */}
        {fetchError && (
          <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-4 mb-6">
            <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-700 mb-1">Knowledge base not accessible</p>
              <p className="text-xs text-red-600">{fetchError}</p>
              <p className="text-xs text-red-500 mt-2">
                This console requires the KB files on the local filesystem. It works in{' '}
                <code className="bg-red-100 px-1 rounded">npm run dev</code> but not on
                Vercel (read-only serverless).
              </p>
            </div>
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-16 bg-stone-200 rounded-xl animate-pulse" />
            ))}
          </div>
        )}

        {/* Doc groups */}
        {!loading && (
          <div className="space-y-8">
            {Object.entries(grouped)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([category, categoryDocs]) => (
                <div key={category}>
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className={cn(
                        'text-[10px] font-semibold px-2 py-0.5 rounded uppercase tracking-wide',
                        categoryColor(category),
                      )}
                    >
                      {category}
                    </span>
                    <span className="text-xs text-stone-400">{categoryDocs.length} docs</span>
                  </div>

                  <div className="space-y-2">
                    {categoryDocs.map((doc) => (
                      <button
                        key={doc.relPath}
                        onClick={() => setEditingDoc(doc)}
                        className="w-full text-left bg-white border border-stone-200 hover:border-amber-300 hover:bg-amber-50/30 rounded-xl px-4 py-3 transition-colors group flex items-center gap-3"
                      >
                        <FileText
                          size={15}
                          className="text-stone-300 group-hover:text-amber-500 flex-shrink-0 transition-colors"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-stone-700 group-hover:text-stone-900 truncate">
                            {doc.title}
                          </p>
                          <p className="text-[10px] font-mono text-stone-400 mt-0.5 truncate">
                            {doc.relPath}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0 text-xs text-stone-400">
                          <span>{doc.chunkCount} chunks</span>
                          <span>{(doc.charCount / 1000).toFixed(1)}k chars</span>
                          <ChevronRight
                            size={14}
                            className="opacity-0 group-hover:opacity-100 text-amber-500 transition-opacity"
                          />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}

            {filtered.length === 0 && (
              <div className="text-center py-16 text-stone-400 text-sm">
                No documents match &ldquo;{search}&rdquo;
              </div>
            )}
          </div>
        )}
      </div>

      {/* Editor drawer */}
      {editingDoc && (
        <EditorPanel
          doc={editingDoc}
          onClose={() => setEditingDoc(null)}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
}
