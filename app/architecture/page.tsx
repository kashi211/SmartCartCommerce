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
];

const ENHANCEMENTS = [
  {
    priority: 'High',
    priorityColor: 'bg-red-100 text-red-700',
    title: 'Re-ranking (two-stage retrieval)',
    impact: 'Highest ROI improvement',
    current: 'Pinecone top-6 → directly injected into prompt',
    problem:
      'Vector similarity ≠ true relevance. First-stage retrieval often surfaces chunks that are topically close but not the best answer.',
    upgrade:
      'Retrieve top 20–50 with Pinecone, then pass through a cross-encoder re-ranker (Cohere Rerank, bge-reranker, or a lightweight LLM scoring prompt) to select the best 5–8. Re-rankers understand query-document interaction far better than cosine distance.',
  },
  {
    priority: 'High',
    priorityColor: 'bg-red-100 text-red-700',
    title: 'Query rewriting & expansion',
    impact: 'Dramatic boost for real users',
    current: 'Raw user message embedded directly',
    problem:
      'Users ask vague, conversational questions. "Does it support Apple Pay?" gives a poor embedding compared to what\'s in the docs.',
    upgrade:
      'Add a fast LLM step before retrieval to rewrite the query into a search-optimised form: "SmartCartCommerce accepted payment methods Apple Pay". Also expand to multiple sub-queries for complex questions (multi-query retrieval).',
  },
  {
    priority: 'High',
    priorityColor: 'bg-red-100 text-red-700',
    title: 'Hybrid search (vector + BM25 keyword)',
    impact: 'Critical for e-commerce / documentation systems',
    current: 'Pure semantic (dense vector) search only',
    problem:
      'Semantic search fails on exact terms: SKUs, error codes, API names, specific figures like "60-day window". A query for "60 days" may not rank the returns policy highly.',
    upgrade:
      'Enable Pinecone\'s built-in hybrid search (sparse + dense vectors). BM25 handles exact keyword matching while the dense vector handles semantic intent. Alpha parameter controls the blend.',
  },
  {
    priority: 'Medium',
    priorityColor: 'bg-amber-100 text-amber-700',
    title: 'Metadata filtering before retrieval',
    impact: 'Reduces hallucination, improves precision',
    current: 'All 856 chunks searched regardless of persona',
    problem:
      'A customer query searches brand-partner admin docs and vice versa, adding noise and occasionally surfacing internal-only content.',
    upgrade:
      'Tag each chunk with audience (customer-facing / internal / brand-partner) at ingest time. Apply a Pinecone metadata filter before the vector search so each persona only retrieves from its relevant document subset.',
  },
  {
    priority: 'Medium',
    priorityColor: 'bg-amber-100 text-amber-700',
    title: 'Stronger embedding model',
    impact: '20–40% retrieval quality improvement',
    current: 'OpenAI text-embedding-3-small (1024 dims)',
    problem:
      'text-embedding-3-small trades quality for speed and cost. Nuanced intent, ambiguous queries, and long documents are handled worse than larger models.',
    upgrade:
      'Switch to text-embedding-3-large (3072 dims, reducible to 1024 with Matryoshka). At 856 chunks the cost difference at query time is negligible. Re-run npm run ingest after switching — the Pinecone index needs to be recreated.',
  },
  {
    priority: 'Medium',
    priorityColor: 'bg-amber-100 text-amber-700',
    title: 'Smarter chunking strategy',
    impact: 'Cleaner context, fewer noisy chunks',
    current: 'Split by ## markdown headers, 3000 char max',
    problem:
      'Section sizes vary wildly — some chunks are 200 chars, others 3000. Oversized chunks dilute relevance; undersized chunks lose surrounding context.',
    upgrade:
      'Hybrid chunking: fixed token window (400–600 tokens) with 100-token overlap, applied within each section. Alternatively, use semantic chunking that splits on embedding similarity drops rather than fixed size.',
  },
  {
    priority: 'Medium',
    priorityColor: 'bg-amber-100 text-amber-700',
    title: 'Dynamic model routing',
    impact: 'Better answers where it matters, lower cost where it doesn\'t',
    current: 'gpt-4o-mini for all queries',
    problem:
      'Simple FAQ questions (return window, shipping cost) don\'t need a strong model. Complex multi-step brand-partner compliance questions do.',
    upgrade:
      'Route by persona and query complexity: Customer simple → gpt-4o-mini, Concierge / Brand Partner or detected complexity → gpt-4o. Complexity can be detected by a cheap classifier or heuristic (query length, keyword presence).',
  },
  {
    priority: 'Low',
    priorityColor: 'bg-blue-100 text-blue-700',
    title: 'User feedback loop (thumbs up/down)',
    impact: 'Training signal for future reranking',
    current: 'No feedback mechanism',
    problem:
      'No signal about which responses were helpful. Can\'t identify systematically failing query patterns.',
    upgrade:
      'Add thumbs up/down on each response. Log (query, retrieved chunks, answer, feedback) to a database. Use negative feedback as a dataset for fine-tuning a reranker or for prompt improvement sprints.',
  },
  {
    priority: 'Low',
    priorityColor: 'bg-blue-100 text-blue-700',
    title: 'Multi-hop retrieval',
    impact: 'Handles complex multi-part questions',
    current: 'Single retrieval step per message',
    problem:
      'Complex questions like "What happens if a brand partner violates the returns policy?" require information from both seller-operations and customer-policies docs — a single retrieval often misses one.',
    upgrade:
      'Implement iterative retrieval: after generating an initial answer, detect if follow-up retrieval is needed (tool call or confidence check), retrieve again with a refined query, then synthesise. LangGraph or a simple agent loop can orchestrate this.',
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
            How SmartCart Knowledge Assistant retrieves relevant context from 856 indexed chunks
            across 87 documents and generates grounded responses using OpenAI.
          </p>
        </div>

        <ArchitectureDiagram />

        {/* Stats */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Documents', value: '87', sub: 'markdown files' },
            { label: 'Chunks', value: '856', sub: 'indexed in Pinecone' },
            { label: 'Eval cases', value: '20', sub: 'golden Q&A pairs' },
            { label: 'Retrieved', value: 'Top 6', sub: 'chunks per query' },
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
                step: '1. Query embedding',
                desc: "The user's message (plus up to 2 prior messages for context) is embedded using OpenAI text-embedding-3-small into a 1024-dimensional vector. This call is traced in LangSmith.",
              },
              {
                step: '2. Semantic retrieval',
                desc: 'The query vector is compared against 856 pre-indexed chunks in Pinecone using cosine similarity. The top 6 most relevant chunks are returned. Retrieval is traced as a LangSmith span.',
              },
              {
                step: '3. Prompt construction',
                desc: 'A persona-specific system prompt (Customer / Concierge / Brand Partner) is built with the retrieved chunks injected as context.',
              },
              {
                step: '4. Streaming generation',
                desc: 'gpt-4o-mini generates a grounded response using the full conversation history + retrieved context. Tokens, latency, and finish reason are logged on completion. The response and source citations stream to the UI simultaneously via Vercel AI SDK.',
              },
              {
                step: '5. Source doc viewer',
                desc: 'Each cited source is clickable. Clicking opens a modal showing the full document with the retrieved section highlighted and auto-scrolled into view. Content is served from S3 if the doc was edited in admin, otherwise from the bundled data/kb files.',
              },
              {
                step: '6. Ingestion & admin',
                desc: '87 markdown documents are bundled in data/kb and indexed via npm run ingest. The /admin console lets you edit any doc with a live preview and re-index it to Pinecone in one click. Edits are persisted in AWS S3.',
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
            Features built beyond the core RAG pipeline: evaluation, observability, a source viewer, and a live KB admin console.
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

        {/* ── Future Enhancements ── */}
        <div className="mt-16 mb-2">
          <div className="flex items-start justify-between gap-4 mb-1">
            <h2 className="text-xl sm:text-2xl font-semibold text-stone-900">
              Future Enhancements
            </h2>
            <span className="flex-shrink-0 text-xs bg-stone-800 text-stone-200 px-3 py-1.5 rounded-full font-medium mt-1">
              v1 → Modern RAG
            </span>
          </div>
          <p className="text-sm text-stone-500 max-w-2xl">
            The current system is production-ready v1 RAG — better than 80% of what&apos;s shipped today.
            Below are the high-impact upgrades that separate it from 2025-grade AI products, ordered by ROI.
          </p>
        </div>

        {/* Priority legend */}
        <div className="flex items-center gap-3 mb-6 mt-4">
          <span className="text-xs text-stone-400">Priority:</span>
          {[
            { label: 'High', color: 'bg-red-100 text-red-700' },
            { label: 'Medium', color: 'bg-amber-100 text-amber-700' },
            { label: 'Low', color: 'bg-blue-100 text-blue-700' },
          ].map((p) => (
            <span key={p.label} className={`text-xs font-medium px-2.5 py-1 rounded-full ${p.color}`}>
              {p.label}
            </span>
          ))}
        </div>

        <div className="space-y-4">
          {ENHANCEMENTS.map((e, i) => (
            <div
              key={e.title}
              className="bg-white rounded-xl border border-stone-200 p-5 sm:p-6 shadow-sm"
            >
              <div className="flex items-start gap-3 mb-3">
                <span className="text-stone-400 text-sm font-mono mt-0.5 w-5 flex-shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-stone-800">{e.title}</h3>
                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${e.priorityColor}`}>
                      {e.priority}
                    </span>
                  </div>
                  <p className="text-xs text-brand-gold font-medium">{e.impact}</p>
                </div>
              </div>

              <div className="ml-8 space-y-3">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-stone-50 rounded-lg p-3">
                    <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wide mb-1">
                      Current
                    </p>
                    <p className="text-xs text-stone-600">{e.current}</p>
                  </div>
                  <div className="bg-red-50 rounded-lg p-3">
                    <p className="text-[11px] font-semibold text-red-400 uppercase tracking-wide mb-1">
                      Problem
                    </p>
                    <p className="text-xs text-stone-600">{e.problem}</p>
                  </div>
                </div>
                <div className="bg-green-50 border border-green-100 rounded-lg p-3">
                  <p className="text-[11px] font-semibold text-green-600 uppercase tracking-wide mb-1">
                    Upgrade path
                  </p>
                  <p className="text-xs text-stone-600 leading-relaxed">{e.upgrade}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modern 2025 RAG pipeline summary */}
        <div className="mt-10 bg-brand-800 rounded-xl p-6 sm:p-8">
          <h3 className="text-white font-semibold text-base mb-1">
            What modern 2025 RAG looks like
          </h3>
          <p className="text-stone-400 text-xs mb-6">
            If all high-priority enhancements are applied, the pipeline becomes:
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
