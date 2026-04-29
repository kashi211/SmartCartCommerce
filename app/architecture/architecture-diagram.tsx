'use client';

import { MermaidDiagram } from '@/components/mermaid-diagram';

const QUERY_FLOW = `
flowchart TD
    U(["👤 User"]):::user
    UI["Next.js Chat UI\nuseChat · streaming"]:::ui

    subgraph QUERY["Query Flow (per message)"]
        direction TB
        Q["Last 3 user messages\ncombined as retrieval query"]:::step
        EMB["OpenAI Embeddings\ntext-embedding-3-small\n1024 dims"]:::openai
        PIN["Pinecone\nCosine similarity search\n856 vectors"]:::pinecone
        RET["Top-6 chunks\nreturned with scores"]:::step
        PROMPT["System Prompt Builder\nPersona instructions +\nretrieved context injected"]:::step
        LLM["OpenAI gpt-4o-mini\nFull conversation history\n+ context window"]:::openai
        STREAM["Vercel AI SDK\nstreamText · data stream\nSources streamed first"]:::step
    end

    subgraph INGEST["Ingestion (one-time · npm run ingest)"]
        direction LR
        KB["📁 Knowledge Base\n86 markdown docs"]:::kb
        CHUNK["Markdown Chunker\nSplit by ## headers\n3000 char max"]:::step
        CHUNKS["856 chunks\nwith metadata"]:::step
        EMBI["OpenAI Embeddings\nbatch of 96"]:::openai
        UPSERT["Pinecone Upsert\nbatches of 100"]:::pinecone
    end

    U -->|"types question"| UI
    UI -->|"POST /api/chat"| Q
    Q --> EMB
    EMB --> PIN
    PIN --> RET
    RET --> PROMPT
    PROMPT --> LLM
    LLM --> STREAM
    STREAM -->|"tokens + sources"| UI
    UI -->|"localStorage"| PERSIST[("💾 Conversation\nHistory")]:::storage

    KB --> CHUNK --> CHUNKS --> EMBI --> UPSERT

    classDef user fill:#b8860b,stroke:#b8860b,color:#fff
    classDef ui fill:#1c1917,stroke:#b8860b,color:#faf8f4
    classDef openai fill:#10a37f,stroke:#0d8a6b,color:#fff
    classDef pinecone fill:#003b57,stroke:#005f8a,color:#fff
    classDef kb fill:#44403c,stroke:#78716c,color:#faf8f4
    classDef step fill:#fff8ed,stroke:#d4a017,color:#1c1917
    classDef storage fill:#292524,stroke:#57534e,color:#faf8f4
`;

const PERSONA_FLOW = `
flowchart LR
    Q(["Query"]):::input

    subgraph PERSONAS["Persona System Prompts"]
        direction TB
        C["🛍️ Customer\nReturns · Shipping\nPolicies · Products"]:::customer
        CO["🎧 Concierge\nPlaybooks · Escalation\nVIP handling · Refunds"]:::concierge
        BP["🏪 Brand Partner\nOnboarding · Commissions\nAdmin console · SLAs"]:::brand
    end

    subgraph KB["Knowledge Base Coverage"]
        direction TB
        K1["02 — Customer Policies"]:::doc
        K2["03 — Industry Guides"]:::doc
        K3["04 — Seller Operations"]:::doc
        K4["05 — Support Playbooks"]:::doc
        K5["06 — Product Features"]:::doc
        K6["09 — Admin Platform"]:::doc
    end

    Q --> C & CO & BP
    C -.->|"retrieves from"| K1 & K2 & K5
    CO -.->|"retrieves from"| K1 & K4 & K2
    BP -.->|"retrieves from"| K3 & K6 & K4

    classDef input fill:#b8860b,stroke:#b8860b,color:#fff
    classDef customer fill:#1c1917,stroke:#b8860b,color:#faf8f4
    classDef concierge fill:#292524,stroke:#b8860b,color:#faf8f4
    classDef brand fill:#44403c,stroke:#b8860b,color:#faf8f4
    classDef doc fill:#fff8ed,stroke:#d4a017,color:#1c1917
`;

export function ArchitectureDiagram() {
  return (
    <div className="space-y-6">
      {/* Main flow */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm overflow-x-auto">
        <h2 className="text-sm font-semibold text-stone-700 mb-5">
          System Architecture — Query &amp; Ingestion Flow
        </h2>
        <MermaidDiagram chart={QUERY_FLOW} />
      </div>

      {/* Persona flow */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm overflow-x-auto">
        <h2 className="text-sm font-semibold text-stone-700 mb-5">
          Persona → Knowledge Base Routing
        </h2>
        <MermaidDiagram chart={PERSONA_FLOW} />
      </div>
    </div>
  );
}
