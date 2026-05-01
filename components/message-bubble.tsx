'use client';

import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useState } from 'react';
import type { Message } from 'ai';
import { SourceCitations } from './source-citations';
import type { KBSource } from '@/lib/types';

interface MessageBubbleProps {
  message: Message;
  sources?: KBSource[];
  isStreaming?: boolean;
}

function FeedbackButtons({
  messageId,
  sources,
}: {
  messageId: string;
  sources?: KBSource[];
}) {
  const [voted, setVoted] = useState<'up' | 'down' | null>(null);

  async function vote(feedback: 'up' | 'down') {
    if (voted) return;
    setVoted(feedback);
    await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messageId,
        feedback,
        sources: sources?.map((s) => ({ id: s.id, score: s.score })),
      }),
    }).catch(() => {});
  }

  return (
    <div className="flex items-center gap-1 mt-2 pt-2 border-t border-stone-100">
      <span className="text-[10px] text-stone-400 mr-1">Helpful?</span>
      <button
        onClick={() => vote('up')}
        disabled={!!voted}
        className={`p-1 rounded transition-colors text-sm ${
          voted === 'up'
            ? 'text-green-600'
            : 'text-stone-300 hover:text-stone-500 disabled:opacity-40'
        }`}
        aria-label="Thumbs up"
      >
        👍
      </button>
      <button
        onClick={() => vote('down')}
        disabled={!!voted}
        className={`p-1 rounded transition-colors text-sm ${
          voted === 'down'
            ? 'text-red-500'
            : 'text-stone-300 hover:text-stone-500 disabled:opacity-40'
        }`}
        aria-label="Thumbs down"
      >
        👎
      </button>
      {voted && (
        <span className="text-[10px] text-stone-400 ml-1">Thanks for the feedback</span>
      )}
    </div>
  );
}

export function MessageBubble({ message, sources, isStreaming }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] bg-stone-800 text-white rounded-2xl rounded-tr-sm px-4 py-3 text-sm leading-relaxed">
          {typeof message.content === 'string' ? message.content : ''}
        </div>
      </div>
    );
  }

  const content = typeof message.content === 'string' ? message.content : '';

  return (
    <div className="flex justify-start">
      <div className="max-w-[85%]">
        <div className="flex items-center gap-2 mb-1.5 px-1">
          <Image src="/sc-logo.png" alt="SmartCart" width={20} height={20} className="rounded-full" />
          <span className="text-xs text-stone-400 font-medium">SmartCart Assistant</span>
        </div>

        <div className="bg-white rounded-2xl rounded-tl-sm border border-stone-200 px-4 py-3 shadow-sm">
          <div className={`prose-sm text-stone-800 text-sm leading-relaxed ${isStreaming && !content ? 'text-stone-400 italic' : ''}`}>
            {content ? (
              <div className={isStreaming ? 'streaming-cursor' : ''}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {content}
                </ReactMarkdown>
              </div>
            ) : (
              <span className="streaming-cursor">Thinking</span>
            )}
          </div>

          {!isStreaming && sources && sources.length > 0 && (
            <SourceCitations sources={sources} />
          )}

          {!isStreaming && content && (
            <FeedbackButtons messageId={message.id} sources={sources} />
          )}
        </div>
      </div>
    </div>
  );
}
