'use client';

import { MermaidDiagram } from '@/components/mermaid-diagram';

const QUERY_FLOW = `
flowchart TD
    U(["👤 User"]):::user
    UI["Next.js Chat UI\nuseChat · streaming"]:::ui

    subgraph QUERY["Query Flow (per message)"]
        direction TB
        Q["Last 3 user messages\ncombined as retrieval query"]:::step
        RW["Query Rewriter\ngpt-4o-mini\n3 search variants"]:::openai
        EMB["OpenAI Embeddings\ntext-embedding-3-large\nMatryoshka 1024d"]:::openai
        PIN["Pinecone\nMetadata-filtered search\nTop-20 per query"]:::pinecone
        HYBRID["Hybrid Keyword Boost\n85% semantic + 15% keyword\nDeduplicated candidates"]:::step
        RERANK["LLM Re-ranker\ngpt-4o-mini\nTop-20 → Top-6"]:::openai
        HOP{"Weak results?\n< 3 chunks or\nscore < 0.4"}:::decision
        HOP2["Multi-hop query\nSecond retrieval pass"]:::openai
        PROMPT["System Prompt Builder\nPersona instructions +\nre-ranked context"]:::step
        LLM["OpenAI gpt-4o-mini\nFull conversation history\n+ context window"]:::openai
        STREAM["Vercel AI SDK\nstreamText · data stream\nSources streamed first"]:::step
    end

    subgraph OBS["LangSmith Observability"]
        direction LR
        LS["LangSmith\ntraceable wrappers"]:::obs
    end

    subgraph INGEST["Ingestion (npm run ingest --clear)"]
        direction LR
        KB["📁 Knowledge Base\n87 markdown docs\nbundled in data/kb"]:::kb
        CHUNK["Sliding Window Chunker\n2000 char / 400 overlap\naudience tagging"]:::step
        CHUNKS["Chunks with metadata\nfilePath · category · audience"]:::step
        EMBI["text-embedding-3-large\nbatch of 96"]:::openai
        UPSERT["Pinecone Upsert\nbatches of 100"]:::pinecone
    end

    U -->|"types question"| UI
    UI -->|"POST /api/chat"| Q
    Q --> RW
    RW --> EMB
    EMB --> PIN
    PIN --> HYBRID
    HYBRID --> RERANK
    RERANK --> HOP
    HOP -->|"yes"| HOP2
    HOP2 --> PROMPT
    HOP -->|"no"| PROMPT
    PROMPT --> LLM
    LLM --> STREAM
    STREAM -->|"tokens + sources"| UI
    UI -->|"localStorage"| PERSIST[("💾 Conversation\nHistory")]:::storage
    UI -->|"👍 / 👎"| FB["/api/feedback"]:::step
    RW & RERANK & HOP2 -.->|"traced"| LS

    KB --> CHUNK --> CHUNKS --> EMBI --> UPSERT

    classDef user fill:#b8860b,stroke:#b8860b,color:#fff
    classDef ui fill:#1c1917,stroke:#b8860b,color:#faf8f4
    classDef openai fill:#10a37f,stroke:#0d8a6b,color:#fff
    classDef pinecone fill:#003b57,stroke:#005f8a,color:#fff
    classDef kb fill:#44403c,stroke:#78716c,color:#faf8f4
    classDef step fill:#fff8ed,stroke:#d4a017,color:#1c1917
    classDef storage fill:#292524,stroke:#57534e,color:#faf8f4
    classDef obs fill:#4f46e5,stroke:#3730a3,color:#fff
    classDef decision fill:#fef3c7,stroke:#d97706,color:#92400e
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

const PLATFORM_FLOW = `
flowchart LR
    subgraph EVAL["Eval Pipeline (npm run eval)"]
        direction TB
        GD["20 golden Q&A cases\n3 personas · 5 categories"]:::evalnode
        BT["Braintrust Eval runner\nexperiment tracking"]:::evalnode
        SC["LLM-as-judge scorers\nAnswerRelevancy\nFaithfulness · ContextRecall"]:::evalnode
        GD --> BT --> SC
    end

    subgraph ADMIN["Admin KB Console (/admin)"]
        direction TB
        LIST["87 docs listed\nby category"]:::adminnode
        ED["Markdown editor\n+ live preview tab"]:::adminnode
        RI["Save & Re-index\nre-chunk · re-embed\nupsert to Pinecone"]:::adminnode
        S3["AWS S3\npersistent edit store\nkb/<relPath>"]:::s3node
        LIST --> ED --> RI
        RI -->|"saves"| S3
        S3 -.->|"served on load"| ED
    end

    subgraph VIEWER["Source Doc Viewer"]
        direction TB
        SRC["Click cited source"]:::viewernode
        MODAL["Full doc modal\nhighlighted section\nauto-scroll"]:::viewernode
        S3V["S3-first content\nfallback to data/kb"]:::s3node
        SRC --> MODAL
        MODAL -->|"fetches"| S3V
    end

    subgraph FEEDBACK["User Feedback Loop"]
        direction TB
        FB["👍 / 👎 on each response"]:::fbnode
        FAPI["/api/feedback\nPOST with message ID\n+ source IDs"]:::fbnode
        FLOG["Logged to console\n+ LangSmith metadata"]:::fbnode
        FB --> FAPI --> FLOG
    end

    classDef evalnode fill:#f0fdf4,stroke:#22c55e,color:#15803d
    classDef adminnode fill:#fefce8,stroke:#eab308,color:#854d0e
    classDef s3node fill:#ff9900,stroke:#e68a00,color:#fff
    classDef viewernode fill:#eff6ff,stroke:#3b82f6,color:#1d4ed8
    classDef fbnode fill:#fdf4ff,stroke:#a855f7,color:#7e22ce
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

      {/* Platform features */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm overflow-x-auto">
        <h2 className="text-sm font-semibold text-stone-700 mb-5">
          Platform Features — Eval · Admin Console · Source Viewer
        </h2>
        <MermaidDiagram chart={PLATFORM_FLOW} />
      </div>
    </div>
  );
}
