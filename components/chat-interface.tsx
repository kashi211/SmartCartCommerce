'use client';

import { useChat } from 'ai/react';
import { useEffect, useRef, useState } from 'react';
import { PersonaSelector } from './persona-selector';
import { MessageBubble } from './message-bubble';
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

export function ChatInterface() {
  const [persona, setPersona] = useState<Persona>('customer');
  const [sourcesMap, setSourcesMap] = useState<Record<string, KBSource[]>>({});
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
  };

  const handleStarter = (text: string) => {
    append({ role: 'user', content: text });
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="flex h-screen bg-brand-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-brand-800 flex flex-col py-6 px-4 overflow-y-auto">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded bg-brand-gold flex items-center justify-center">
              <span className="text-xs font-bold text-white">SC</span>
            </div>
            <div>
              <p className="text-white text-sm font-semibold leading-tight">SmartCart</p>
              <p className="text-stone-400 text-[10px] leading-tight">Commerce</p>
            </div>
          </div>
          <p className="text-stone-500 text-[11px] mt-3 leading-snug">
            AI-powered knowledge base assistant — 87 docs, 5 categories.
          </p>
        </div>

        <PersonaSelector value={persona} onChange={handlePersonaChange} />

        <div className="mt-auto pt-6">
          <p className="text-[10px] text-stone-600 text-center">
            Powered by Claude + Voyage AI + Pinecone
          </p>
        </div>
      </aside>

      {/* Main chat area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-white/60 backdrop-blur-sm flex-shrink-0">
          <div>
            <h1 className="text-base font-semibold text-stone-800">Knowledge Assistant</h1>
            <p className="text-xs text-stone-400 mt-0.5">
              {persona === 'customer' && 'Customer support · Returns, shipping, policies'}
              {persona === 'concierge' && 'Internal · Playbooks, escalation, protocols'}
              {persona === 'brand-partner' && 'Brand partner · Seller ops, admin console'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
            <span className="text-xs text-stone-400">Ready</span>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {isEmpty ? (
            <EmptyState persona={persona} onStarter={handleStarter} />
          ) : (
            <div className="max-w-3xl mx-auto space-y-6">
              {messages.map((msg, i) => {
                const isLastAssistant =
                  msg.role === 'assistant' &&
                  i === messages.length - 1;
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
        <div className="flex-shrink-0 px-6 py-4 border-t border-stone-200 bg-white/80 backdrop-blur-sm">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="flex items-end gap-3">
              <textarea
                value={input}
                onChange={(e) => {
                  handleInputChange(e as never);
                  e.target.style.height = 'auto';
                  e.target.style.height = Math.min(e.target.scrollHeight, 160) + 'px';
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e as never);
                  }
                }}
                placeholder="Ask anything about SmartCartCommerce…"
                rows={1}
                disabled={isLoading}
                className="flex-1 resize-none rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-800 placeholder-stone-400 outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 transition-all disabled:opacity-50 leading-relaxed"
                style={{ minHeight: '48px', maxHeight: '160px' }}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="flex-shrink-0 w-11 h-11 rounded-xl bg-brand-800 text-white flex items-center justify-center hover:bg-stone-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M1.5 1.5l13 6.5-13 6.5V9.5l9-1.5-9-1.5V1.5z" />
                </svg>
              </button>
            </form>
            <p className="text-[11px] text-stone-400 mt-2 text-center">
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
    <div className="max-w-3xl mx-auto flex flex-col items-center justify-center h-full min-h-[400px] text-center">
      <div className="w-14 h-14 rounded-2xl bg-brand-800 border border-brand-gold/30 flex items-center justify-center mb-5">
        <span className="text-xl text-brand-gold font-bold">SC</span>
      </div>
      <h2 className="text-xl font-semibold text-stone-800 mb-2">SmartCart Knowledge Base</h2>
      <p className="text-sm text-stone-500 mb-8 max-w-md">
        Ask anything about SmartCartCommerce — policies, operations, products, and platform
        documentation. Answers are grounded in the internal knowledge base.
      </p>

      <div className="grid grid-cols-2 gap-2.5 w-full max-w-lg">
        {starters.map((s) => (
          <button
            key={s}
            onClick={() => onStarter(s)}
            className="text-left px-4 py-3 rounded-xl border border-stone-200 bg-white hover:border-brand-gold/50 hover:bg-brand-50 text-sm text-stone-600 hover:text-stone-800 transition-all shadow-sm"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
