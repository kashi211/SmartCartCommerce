import type { Metadata } from 'next';
import { ArchitectureDiagram } from './architecture-diagram';

export const metadata: Metadata = {
  title: 'RAG Architecture — SmartCart Knowledge Assistant',
};

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen bg-brand-50">
      {/* Header */}
      <header className="border-b border-stone-200 bg-white/70 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/sc-logo.png" alt="SmartCart" className="w-8 h-8 rounded-lg" />
            <div>
              <p className="text-sm font-semibold text-stone-800 leading-tight">SmartCart</p>
              <p className="text-[10px] text-stone-400 leading-tight">Knowledge Assistant</p>
            </div>
          </div>
          <a
            href="/chat"
            className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1.5 transition-colors"
          >
            ← Back to chat
          </a>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {/* Title */}
        <div className="mb-10">
          <h1 className="text-2xl sm:text-3xl font-semibold text-stone-900 mb-2">
            RAG Architecture
          </h1>
          <p className="text-stone-500 text-sm max-w-2xl">
            How SmartCart Knowledge Assistant retrieves relevant context from 856 indexed chunks
            across 86 documents and generates grounded responses using OpenAI.
          </p>
        </div>

        <ArchitectureDiagram />

        {/* Stats */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Documents', value: '86', sub: 'markdown files' },
            { label: 'Chunks', value: '856', sub: 'indexed in Pinecone' },
            { label: 'Embeddings', value: '1024', sub: 'dimensions' },
            { label: 'Retrieved', value: 'Top 6', sub: 'chunks per query' },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-xl border border-stone-200 px-5 py-4 shadow-sm"
            >
              <p className="text-2xl font-bold text-stone-900">{s.value}</p>
              <p className="text-xs font-medium text-stone-500 mt-0.5">{s.label}</p>
              <p className="text-[11px] text-stone-400">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-8 bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-stone-700 mb-4">How it works</h2>
          <ol className="space-y-3">
            {[
              {
                step: '1. Query embedding',
                desc: 'The user\'s message (plus up to 2 prior messages for context) is embedded using OpenAI text-embedding-3-small into a 1024-dimensional vector.',
              },
              {
                step: '2. Semantic retrieval',
                desc: 'The query vector is compared against 856 pre-indexed chunks in Pinecone using cosine similarity. The top 6 most relevant chunks are returned.',
              },
              {
                step: '3. Prompt construction',
                desc: 'A persona-specific system prompt (Customer / Concierge / Brand Partner) is built with the retrieved chunks injected as context.',
              },
              {
                step: '4. Streaming generation',
                desc: 'gpt-4o-mini generates a grounded response using the full conversation history + retrieved context. The response and source citations stream to the UI simultaneously via Vercel AI SDK.',
              },
              {
                step: '5. Ingestion (one-time)',
                desc: '86 markdown documents from the SmartCartCommerce knowledge base are chunked by section headers, embedded, and upserted into Pinecone. Re-run npm run ingest when the KB changes.',
              },
            ].map((item) => (
              <li key={item.step} className="flex gap-3 text-sm">
                <span className="font-semibold text-stone-700 whitespace-nowrap">{item.step}:</span>
                <span className="text-stone-500">{item.desc}</span>
              </li>
            ))}
          </ol>
        </div>
      </main>
    </div>
  );
}
