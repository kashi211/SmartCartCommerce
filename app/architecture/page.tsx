import type { Metadata } from 'next';
import { ArchitectureDiagram } from './architecture-diagram';

export const metadata: Metadata = {
  title: 'RAG Architecture — SmartCart Knowledge Assistant',
};

const SHIPPED = [
  {
    icon: '⚗️',
    title: 'Braintrust Eval',
    badge: 'npm run eval',
    badgeColor: 'bg-green-100 text-green-700',
    stack: 'Braintrust · autoevals',
    items: [
      '20-case golden dataset spanning Customer, Concierge, and Brand Partner personas',
      'Three LLM-as-judge scorers: AnswerRelevancy, Faithfulness, ContextRecall',
      'Results tracked as named experiments in the Braintrust dashboard',
    ],
  },
  {
    icon: '🔭',
    title: 'LangSmith Observability',
    badge: 'Production tracing',
    badgeColor: 'bg-indigo-100 text-indigo-700',
    stack: 'LangSmith · traceable',
    items: [
      'Every chat request creates a root span tracing embedding → retrieval → LLM generation',
      'Token usage, latency, finish reason, persona, and source count logged per request',
      'Visible in LangSmith dashboard under the smartcart-rag project',
    ],
  },
  {
    icon: '📄',
    title: 'Source Doc Viewer',
    badge: 'In chat UI',
    badgeColor: 'bg-amber-100 text-amber-700',
    stack: 'react-markdown · S3',
    items: [
      'Click any cited source to open the full document in a modal overlay',
      'Retrieved section highlighted with amber border and auto-scrolled into view',
      'Always shows the latest version — S3 edit takes precedence over bundled file',
    ],
  },
  {
    icon: '🛠️',
    title: 'Admin KB Console',
    badge: '/admin',
    badgeColor: 'bg-purple-100 text-purple-700',
    stack: 'AWS S3 · Pinecone · Next.js',
    items: [
      '87 docs browseable by category with chunk count and character count',
      'Inline markdown editor with source and live preview tabs',
      'Save & Re-index: re-chunks and re-embeds the doc to Pinecone in one click',
      'Edits persisted to AWS S3 — survive Vercel redeployments and server restarts',
    ],
  },
  {
    icon: '🔁',
    title: 'Re-ranking (two-stage retrieval)',
    badge: 'Retriever',
    badgeColor: 'bg-rose-100 text-rose-700',
    stack: 'gpt-4o-mini · LLM cross-encoder',
    items: [
      'First stage: Pinecone cosine search returns up to 20 candidates',
      'Second stage: gpt-4o-mini ranks candidates by true query relevance',
      'Final top-6 are far higher quality than raw cosine similarity alone',
    ],
  },
  {
    icon: '✏️',
    title: 'Query rewriting & expansion',
    badge: 'Retriever',
    badgeColor: 'bg-rose-100 text-rose-700',
    stack: 'gpt-4o-mini · multi-query',
    items: [
      'User query is rewritten into 2 search-optimised variants before embedding',
      'All 3 queries are embedded and searched — results are merged with deduplication',
      'Dramatically improves recall for vague conversational questions',
    ],
  },
  {
    icon: '🔀',
    title: 'Hybrid search (vector + keyword)',
    badge: 'Retriever',
    badgeColor: 'bg-rose-100 text-rose-700',
    stack: 'BM25 keyword boost · blended scoring',
    items: [
      'Candidates scored at 85% semantic + 15% keyword overlap with query terms',
      'Handles exact-term queries: SKUs, policy windows, specific figures',
      'No Pinecone index recreation needed — applied post-retrieval',
    ],
  },
  {
    icon: '🏷️',
    title: 'Metadata filtering by persona',
    badge: 'Retriever',
    badgeColor: 'bg-amber-100 text-amber-700',
    stack: 'Pinecone filter · audience tags',
    items: [
      'Each chunk tagged with audience at ingest: customer-facing / brand-partner / internal',
      'Customer searches only customer-facing docs; Brand Partner includes seller docs',
      'Concierge remains unfiltered — handles all document types',
    ],
  },
  {
    icon: '🧠',
    title: 'Stronger embedding model',
    badge: 'text-embedding-3-large',
    badgeColor: 'bg-emerald-100 text-emerald-700',
    stack: 'OpenAI · Matryoshka 1024d',
    items: [
      'Switched from text-embedding-3-small to text-embedding-3-large',
      'Uses Matryoshka representation learning to reduce to 1024 dims — index unchanged',
      'Significantly better handling of nuanced intent and ambiguous queries',
    ],
  },
  {
    icon: '✂️',
    title: 'Smarter chunking with overlap',
    badge: 'Ingestion',
    badgeColor: 'bg-amber-100 text-amber-700',
    stack: 'Sliding window · 2000 char / 400 overlap',
    items: [
      'Reduced max chunk size from 3000 to 2000 chars for tighter semantic focus',
      '400-char overlap between consecutive chunks preserves cross-boundary context',
      'Sliding window prefers paragraph breaks to avoid splitting mid-sentence',
    ],
  },
  {
    icon: '👍',
    title: 'User feedback loop',
    badge: 'Chat UI',
    badgeColor: 'bg-blue-100 text-blue-700',
    stack: '/api/feedback · LangSmith',
    items: [
      'Thumbs up / thumbs down button on every assistant response',
      'Feedback logged with message ID, query, and retrieved source IDs',
      'Signals forwarded to LangSmith for future reranker training',
    ],
  },
  {
    icon: '🔗',
    title: 'Multi-hop retrieval',
    badge: 'Retriever',
    badgeColor: 'bg-blue-100 text-blue-700',
    stack: 'gpt-4o-mini · iterative search',
    items: [
      'After initial retrieval, checks if results are weak (< 3 chunks or low scores)',
      'LLM generates a follow-up query targeting missing information',
      'Second retrieval pass fills gaps for complex multi-part questions',
    ],
  },
];


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
          <div className="flex items-center gap-4">
            <a href="/admin" className="text-xs text-stone-500 hover:text-stone-800 transition-colors">
              KB Admin
            </a>
            <a
              href="/chat"
              className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1.5 transition-colors"
            >
              ← Back to chat
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {/* Title */}
        <div className="mb-10">
          <h1 className="text-2xl sm:text-3xl font-semibold text-stone-900 mb-2">
            RAG Architecture
          </h1>
          <p className="text-stone-500 text-sm max-w-2xl">
            How SmartCart Knowledge Assistant retrieves relevant context across 87 documents using
            query rewriting, hybrid search, LLM re-ranking, and multi-hop retrieval — then streams
            grounded responses via OpenAI.
          </p>
        </div>

        <ArchitectureDiagram />

        {/* Stats */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Documents', value: '87', sub: 'markdown files' },
            { label: 'Candidates', value: 'Top 20', sub: 'pre-rerank retrieval' },
            { label: 'Eval cases', value: '20', sub: 'golden Q&A pairs' },
            { label: 'Final chunks', value: 'Top 6', sub: 'after re-ranking' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-stone-200 px-5 py-4 shadow-sm">
              <p className="text-2xl font-bold text-stone-900">{s.value}</p>
              <p className="text-xs font-medium text-stone-500 mt-0.5">{s.label}</p>
              <p className="text-[11px] text-stone-400">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div className="mt-8 bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-stone-700 mb-4">How it works</h2>
          <ol className="space-y-3">
            {[
              {
                step: '1. Query rewriting',
                desc: "gpt-4o-mini rewrites the user's question into 2 search-optimised variants tuned to the active persona's knowledge domain. All 3 queries are embedded in one batch with text-embedding-3-large (Matryoshka 1024d).",
              },
              {
                step: '2. Multi-query retrieval with metadata filter',
                desc: 'Each query vector searches Pinecone with a persona-scoped audience filter (customer-facing / brand-partner / internal). Top-20 candidates per query are merged with deduplication — best score wins.',
              },
              {
                step: '3. Hybrid keyword boost',
                desc: 'Candidate scores are re-blended: 85% cosine similarity + 15% keyword overlap with the original query. This handles exact-term queries (policy windows, SKUs, figures) that pure semantic search misses.',
              },
              {
                step: '4. LLM re-ranking',
                desc: 'gpt-4o-mini ranks the top-20 blended candidates by true relevance to the query, returning the best 6. This cross-encoder step understands query–document interaction far better than cosine distance alone.',
              },
              {
                step: '5. Multi-hop (if weak)',
                desc: 'If fewer than 3 strong chunks are found, a second LLM call generates a follow-up query targeting missing information. A second Pinecone pass fills the gap — critical for complex multi-part questions.',
              },
              {
                step: '6. Streaming generation + feedback',
                desc: 'gpt-4o-mini streams a grounded response with the full conversation history + re-ranked context. Each response has thumbs up/down feedback buttons. Citations are clickable and open the full doc with the relevant section highlighted.',
              },
            ].map((item) => (
              <li key={item.step} className="flex gap-3 text-sm">
                <span className="font-semibold text-stone-700 whitespace-nowrap">{item.step}:</span>
                <span className="text-stone-500">{item.desc}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* ── What's been shipped ── */}
        <div className="mt-14 mb-4">
          <div className="flex items-center justify-between gap-4 mb-1">
            <h2 className="text-xl sm:text-2xl font-semibold text-stone-900">
              What&apos;s been shipped
            </h2>
            <span className="flex-shrink-0 text-xs bg-green-700 text-white px-3 py-1.5 rounded-full font-medium">
              ✓ Live
            </span>
          </div>
          <p className="text-sm text-stone-500 max-w-2xl">
            12 features shipped across evaluation, observability, retrieval quality, and UI — from the baseline RAG pipeline to a fully modern 2025-grade system.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {SHIPPED.map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{f.icon}</span>
                  <h3 className="text-sm font-semibold text-stone-800">{f.title}</h3>
                </div>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${f.badgeColor}`}>
                  {f.badge}
                </span>
              </div>
              <p className="text-[10px] font-mono text-stone-400">{f.stack}</p>
              <ul className="space-y-1.5">
                {f.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-stone-600">
                    <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Modern 2025 RAG pipeline summary */}
        <div className="mt-10 bg-brand-800 rounded-xl p-6 sm:p-8">
          <h3 className="text-white font-semibold text-base mb-1">
            The full modern RAG pipeline — shipped
          </h3>
          <p className="text-stone-400 text-xs mb-6">
            All planned enhancements have been implemented. This is the complete pipeline:
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <p className="text-stone-400 text-[11px] uppercase tracking-widest font-medium mb-3">
                Retrieval pipeline
              </p>
              <ol className="space-y-2">
                {[
                  'User query',
                  'Query rewriting (LLM)',
                  'Hybrid search — vector + BM25',
                  'Top 20–50 candidates',
                  'Re-ranking (cross-encoder)',
                  'Top 5–8 high-quality chunks',
                ].map((step, i) => (
                  <li key={step} className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-brand-gold/20 border border-brand-gold/40 flex items-center justify-center text-[10px] text-brand-gold font-bold flex-shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-stone-300 text-xs">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <p className="text-stone-400 text-[11px] uppercase tracking-widest font-medium mb-3">
                Generation pipeline
              </p>
              <ol className="space-y-2">
                {[
                  'Persona-specific prompt',
                  'Re-ranked chunks injected',
                  'Full conversation history',
                  'Dynamic model routing',
                  'Streaming answer + citations',
                  'Feedback logged for eval',
                ].map((step, i) => (
                  <li key={step} className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-brand-gold/20 border border-brand-gold/40 flex items-center justify-center text-[10px] text-brand-gold font-bold flex-shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-stone-300 text-xs">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-stone-700 grid sm:grid-cols-3 gap-4">
            {[
              { label: 'Re-ranking', desc: 'Biggest single quality jump' },
              { label: 'Hybrid search', desc: 'Critical for exact-term recall' },
              { label: 'Query rewriting', desc: 'Massive boost for real user queries' },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-2">
                <span className="text-brand-gold text-base leading-none mt-0.5">✦</span>
                <div>
                  <p className="text-white text-xs font-semibold">{item.label}</p>
                  <p className="text-stone-500 text-[11px] mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-stone-400 mt-8 pb-4">
          SmartCart Knowledge Assistant · Next.js · OpenAI · Pinecone · AWS S3 · Braintrust · LangSmith · Vercel
        </p>
      </main>
    </div>
  );
}
