'use client';

import Image from 'next/image';
import { useChat } from 'ai/react';
import { useEffect, useRef, useState } from 'react';
import { PersonaSelector } from './persona-selector';
import { MessageBubble } from './message-bubble';
import { cn } from '@/lib/utils';
import type { Persona, KBSource, SourceDataEvent } from '@/lib/types';

const PERSONA_STARTERS: Record<Persona, string[]> = {
  customer: [
    'What is your return policy?',
    'How long does shipping take to the UK?',
    'Can I cancel my order after it ships?',
    'How do I start a return?',
  ],
  concierge: [
    'Walk me through the refund decision tree',
    'When should I escalate a customer issue?',
    'How do I handle a VIP Circle member complaint?',
    'What are the severity flags for escalation?',
  ],
  'brand-partner': [
    'What commission rate does SmartCart charge?',
    'How does the seller onboarding process work?',
    'What are the 5 core performance metrics?',
    'How do I manage made-to-order inventory?',
  ],
};

const PERSONA_LABELS: Record<Persona, string> = {
  customer: 'Customer',
  concierge: 'Concierge',
  'brand-partner': 'Brand Partner',
};

const PERSONA_SUBTITLES: Record<Persona, string> = {
  customer: 'Returns, shipping & policies',
  concierge: 'Playbooks & escalation',
  'brand-partner': 'Seller ops & admin',
};

export function ChatInterface() {
  const [persona, setPersona] = useState<Persona>('customer');
  const [sourcesMap, setSourcesMap] = useState<Record<string, KBSource[]>>({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading, data, setMessages, append } =
    useChat({
      api: '/api/chat',
      body: { persona },
    });

  useEffect(() => {
    if (!data || data.length === 0) return;
    const sourceEvents = (data as unknown as SourceDataEvent[]).filter((d) => d?.type === 'sources');
    const assistantMessages = messages.filter((m) => m.role === 'assistant');
    const newMap: Record<string, KBSource[]> = {};
    sourceEvents.forEach((event, i) => {
      if (assistantMessages[i]) {
        newMap[assistantMessages[i].id] = event.sources;
      }
    });
    setSourcesMap(newMap);
  }, [data, messages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handlePersonaChange = (p: Persona) => {
    setPersona(p);
    setMessages([]);
    setSourcesMap({});
    setSidebarOpen(false);
  };

  const handleStarter = (text: string) => {
    append({ role: 'user', content: text });
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="flex h-[100dvh] bg-brand-50 overflow-hidden">

      {/* ── Desktop sidebar ── */}
      <aside className="hidden md:flex w-64 flex-shrink-0 bg-brand-800 flex-col py-6 px-4 overflow-y-auto">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <Image src="/sc-logo.png" alt="SmartCart" width={32} height={32} className="rounded-lg" />
            <div>
              <p className="text-white text-sm font-semibold leading-tight">SmartCart</p>
              <p className="text-stone-400 text-[10px] leading-tight">Commerce</p>
            </div>
          </div>
          <p className="text-stone-500 text-[11px] mt-3 leading-snug">
            AI-powered knowledge base assistant — 86 docs, 5 categories.
          </p>
        </div>
        <PersonaSelector value={persona} onChange={handlePersonaChange} />
        <div className="mt-auto pt-6">
          <p className="text-[10px] text-stone-600 text-center">
            Powered by OpenAI + Pinecone
          </p>
        </div>
      </aside>

      {/* ── Mobile sidebar drawer overlay ── */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="relative z-50 w-72 bg-brand-800 flex flex-col py-6 px-4 overflow-y-auto">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Image src="/sc-logo.png" alt="SmartCart" width={28} height={28} className="rounded-md" />
                  <p className="text-white text-sm font-semibold">SmartCart</p>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="text-stone-400 hover:text-white p-1"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
                  </svg>
                </button>
              </div>
              <p className="text-stone-500 text-[11px] leading-snug">
                AI-powered knowledge base — 86 docs, 5 categories.
              </p>
            </div>
            <PersonaSelector value={persona} onChange={handlePersonaChange} />
            <div className="mt-auto pt-6">
              <p className="text-[10px] text-stone-600 text-center">Powered by OpenAI + Pinecone</p>
            </div>
          </aside>
        </div>
      )}

      {/* ── Main area ── */}
      <main className="flex-1 flex flex-col min-w-0">

        {/* Header */}
        <header className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-stone-200 bg-white/60 backdrop-blur-sm flex-shrink-0">
          <div className="flex items-center gap-3">
            {/* Mobile menu button */}
            <button
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg hover:bg-stone-100 text-stone-600 flex-shrink-0"
              onClick={() => setSidebarOpen(true)}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                <rect y="2" width="18" height="2" rx="1" />
                <rect y="8" width="18" height="2" rx="1" />
                <rect y="14" width="18" height="2" rx="1" />
              </svg>
            </button>
            {/* Logo (mobile only) */}
            <div className="md:hidden flex items-center gap-2">
              <Image src="/sc-logo.png" alt="SmartCart" width={26} height={26} className="rounded-md" />
              <span className="text-sm font-semibold text-stone-800">SmartCart</span>
            </div>
            {/* Desktop title */}
            <div className="hidden md:block">
              <h1 className="text-base font-semibold text-stone-800">Knowledge Assistant</h1>
              <p className="text-xs text-stone-400 mt-0.5">{PERSONA_SUBTITLES[persona]}</p>
            </div>
          </div>

          {/* Mobile: persona pill tabs */}
          <div className="flex md:hidden items-center gap-1 bg-stone-100 rounded-lg p-1">
            {(['customer', 'concierge', 'brand-partner'] as Persona[]).map((p) => (
              <button
                key={p}
                onClick={() => handlePersonaChange(p)}
                className={cn(
                  'px-2.5 py-1 rounded-md text-[11px] font-medium transition-all',
                  persona === p
                    ? 'bg-white text-stone-800 shadow-sm'
                    : 'text-stone-500'
                )}
              >
                {p === 'brand-partner' ? 'Brand' : PERSONA_LABELS[p]}
              </button>
            ))}
          </div>

          {/* Desktop: status indicator */}
          <div className="hidden md:flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400" />
            <span className="text-xs text-stone-400">Ready</span>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 sm:py-6">
          {isEmpty ? (
            <EmptyState persona={persona} onStarter={handleStarter} />
          ) : (
            <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
              {messages.map((msg, i) => {
                const isLastAssistant = msg.role === 'assistant' && i === messages.length - 1;
                return (
                  <MessageBubble
                    key={msg.id}
                    message={msg}
                    sources={sourcesMap[msg.id]}
                    isStreaming={isLastAssistant && isLoading}
                  />
                );
              })}
              {isLoading && messages.at(-1)?.role === 'user' && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-2xl rounded-tl-sm border border-stone-200 px-4 py-3 shadow-sm">
                    <span className="streaming-cursor text-stone-400 text-sm italic">Thinking</span>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <div className="flex-shrink-0 px-3 sm:px-6 py-3 sm:py-4 border-t border-stone-200 bg-white/80 backdrop-blur-sm">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="flex items-end gap-2 sm:gap-3">
              <textarea
                value={input}
                onChange={(e) => {
                  handleInputChange(e as never);
                  e.target.style.height = 'auto';
                  e.target.style.height = Math.min(e.target.scrollHeight, 140) + 'px';
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e as never);
                  }
                }}
                placeholder="Ask anything…"
                rows={1}
                disabled={isLoading}
                className="flex-1 resize-none rounded-xl border border-stone-300 bg-white px-3 sm:px-4 py-3 text-base sm:text-sm text-stone-800 placeholder-stone-400 outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 transition-all disabled:opacity-50 leading-relaxed"
                style={{ minHeight: '48px', maxHeight: '140px', fontSize: '16px' }}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="flex-shrink-0 w-11 h-11 sm:w-11 sm:h-11 rounded-xl bg-brand-800 text-white flex items-center justify-center hover:bg-stone-700 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M1.5 1.5l13 6.5-13 6.5V9.5l9-1.5-9-1.5V1.5z" />
                </svg>
              </button>
            </form>
            <p className="hidden sm:block text-[11px] text-stone-400 mt-2 text-center">
              Press Enter to send · Shift+Enter for new line
            </p>
          </div>
        </div>

      </main>
    </div>
  );
}

function EmptyState({
  persona,
  onStarter,
}: {
  persona: Persona;
  onStarter: (text: string) => void;
}) {
  const starters = PERSONA_STARTERS[persona];

  return (
    <div className="max-w-3xl mx-auto flex flex-col items-center justify-center h-full min-h-[300px] sm:min-h-[400px] text-center px-2">
      <div className="mb-4 sm:mb-5">
        <Image src="/sc-logo.png" alt="SmartCart" width={56} height={56} className="rounded-2xl" />
      </div>
      <h2 className="text-lg sm:text-xl font-semibold text-stone-800 mb-2">
        SmartCart Knowledge Base
      </h2>
      <p className="text-sm text-stone-500 mb-6 sm:mb-8 max-w-sm sm:max-w-md">
        Ask anything about SmartCartCommerce — policies, operations, products, and platform
        documentation.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 w-full max-w-sm sm:max-w-lg">
        {starters.map((s) => (
          <button
            key={s}
            onClick={() => onStarter(s)}
            className="text-left px-4 py-3 rounded-xl border border-stone-200 bg-white hover:border-brand-gold/50 hover:bg-brand-50 text-sm text-stone-600 hover:text-stone-800 transition-all shadow-sm active:scale-[0.98]"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
