# SmartCart Knowledge Assistant

An AI-powered RAG chat app built on SmartCartCommerce's internal knowledge base — 86 documents across policies, operations, support playbooks, and the brand admin console.

![SmartCart RAG](https://img.shields.io/badge/Next.js-15-black?logo=nextdotjs) ![OpenAI](https://img.shields.io/badge/OpenAI-gpt--4o--mini-412991?logo=openai) ![Pinecone](https://img.shields.io/badge/Pinecone-vector%20DB-00B379) ![Vercel](https://img.shields.io/badge/Vercel-deployed-black?logo=vercel)

---

## What it does

Ask questions in natural language — the assistant retrieves the most relevant knowledge base sections, grounds its answer in them, and shows you exactly which documents it pulled from.

**Three personas, each with a different lens on the same KB:**

| Persona | Audience | Knowledge focus |
|---|---|---|
| Customer | Shoppers | Returns, shipping, policies, products |
| Concierge | Internal support team | Playbooks, escalation, VIP handling |
| Brand Partner | Seller operators | Onboarding, commissions, admin console |

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| LLM | OpenAI `gpt-4o-mini` via Vercel AI SDK |
| Embeddings | OpenAI `text-embedding-3-small` (1024 dims) |
| Vector DB | Pinecone (serverless, cosine similarity) |
| Streaming | Vercel AI SDK v4 — `streamText` + `createDataStreamResponse` |
| Styling | Tailwind CSS |

---

## Architecture

```
User query
    │
    ▼
Embed query (OpenAI text-embedding-3-small)
    │
    ▼
Semantic search → Pinecone (top-6 chunks)
    │
    ▼
Build prompt with retrieved context + persona instructions
    │
    ▼
Stream response (gpt-4o-mini) → UI
    │
    ▼
Source citations shown alongside response
```

---

## Local setup

**1. Clone and install**

```bash
git clone https://github.com/saketpanwar/chatbot.git
cd chatbot
npm install
```

**2. Add environment variables**

```bash
cp .env.local.example .env.local
```

Fill in `.env.local`:

```env
OPENAI_API_KEY=sk-proj-...
PINECONE_API_KEY=pcsk_...
PINECONE_INDEX=smartcart-kb
KB_PATH=../SmartCartCommerce-KnowledgeBase
```

**3. Ingest the knowledge base**

Run once to chunk, embed, and index all 86 documents into Pinecone:

```bash
npm run ingest
```

This creates the `smartcart-kb` index automatically if it doesn't exist, then upserts 856 chunks.

**4. Start the app**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deploying to Vercel

1. Push to GitHub (already done)
2. Import the repo at [vercel.com/new](https://vercel.com/new) — Vercel auto-detects Next.js
3. Add environment variables in **Settings → Environment Variables**:
   - `OPENAI_API_KEY`
   - `PINECONE_API_KEY`
   - `PINECONE_INDEX` → `smartcart-kb`
4. Redeploy

The Pinecone index is pre-populated — no re-ingestion needed on Vercel.

---

## Project structure

```
├── app/
│   ├── api/chat/route.ts       # Streaming RAG endpoint
│   ├── chat/page.tsx           # Chat page
│   └── layout.tsx
├── components/
│   ├── chat-interface.tsx      # Main UI + useChat hook
│   ├── message-bubble.tsx      # Message rendering + markdown
│   ├── source-citations.tsx    # Collapsible source cards
│   └── persona-selector.tsx    # Persona switcher
├── lib/
│   ├── prompts.ts              # System prompt builders per persona
│   ├── types.ts
│   └── rag/
│       ├── chunker.ts          # Markdown → chunks
│       ├── embeddings.ts       # OpenAI embedding calls
│       ├── vectorstore.ts      # Pinecone client
│       └── retriever.ts        # Semantic retrieval
└── scripts/
    └── ingest.ts               # One-time KB indexing script
```
