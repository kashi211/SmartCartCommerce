'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { deleteConversation, relativeTime } from '@/lib/storage';
import type { Conversation } from '@/lib/storage';

interface ConversationListProps {
  conversations: Conversation[];
  activeId: string;
  onSelect: (conv: Conversation) => void;
  onDelete: (id: string) => void;
  onNew: () => void;
}

export function ConversationList({
  conversations,
  activeId,
  onSelect,
  onDelete,
  onNew,
}: ConversationListProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    deleteConversation(id);
    onDelete(id);
  };

  return (
    <div className="flex flex-col gap-1 flex-1 min-h-0">
      {/* New chat button */}
      <button
        onClick={onNew}
        className="flex items-center gap-2 w-full px-3 py-2 rounded-lg border border-stone-600 hover:border-brand-gold/50 hover:bg-white/5 text-stone-300 hover:text-white transition-all text-sm mb-2"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
          <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </svg>
        New chat
      </button>

      {conversations.length === 0 ? (
        <p className="text-xs text-stone-600 px-3 pt-2">No previous chats yet.</p>
      ) : (
        <div className="overflow-y-auto flex-1 space-y-0.5 -mx-1 px-1">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => onSelect(conv)}
              onMouseEnter={() => setHoveredId(conv.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={cn(
                'w-full text-left px-3 py-2.5 rounded-lg transition-all group relative',
                activeId === conv.id
                  ? 'bg-white/10 text-white'
                  : 'text-stone-400 hover:bg-white/5 hover:text-stone-200'
              )}
            >
              <p className="text-xs font-medium leading-snug truncate pr-6">
                {conv.title}
              </p>
              <p className="text-[10px] text-stone-600 mt-0.5">
                {relativeTime(conv.updatedAt)}
              </p>

              {hoveredId === conv.id && (
                <div
                  role="button"
                  tabIndex={0}
                  onClick={(e) => handleDelete(e, conv.id)}
                  onKeyDown={(e) => e.key === 'Enter' && handleDelete(e as never, conv.id)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-stone-500 hover:text-red-400 transition-colors cursor-pointer"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M2 2l8 8M10 2l-8 8" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
