'use client';

import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Message } from 'ai';
import { SourceCitations } from './source-citations';
import type { KBSource } from '@/lib/types';

interface MessageBubbleProps {
  message: Message;
  sources?: KBSource[];
  isStreaming?: boolean;
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
        </div>
      </div>
    </div>
  );
}
