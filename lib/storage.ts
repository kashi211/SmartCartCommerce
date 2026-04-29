import type { Message } from 'ai';
import type { Persona } from './types';

export interface Conversation {
  id: string;
  title: string;
  persona: Persona;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
}

const STORAGE_KEY = 'smartcart-conversations';
const MAX_CONVERSATIONS = 50;

export function loadConversations(): Conversation[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveConversation(conv: Conversation): void {
  if (typeof window === 'undefined') return;
  try {
    const all = loadConversations().filter((c) => c.id !== conv.id);
    const updated = [conv, ...all].slice(0, MAX_CONVERSATIONS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // localStorage full or unavailable — silently skip
  }
}

export function deleteConversation(id: string): void {
  if (typeof window === 'undefined') return;
  try {
    const all = loadConversations().filter((c) => c.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {}
}

export function generateId(): string {
  return `conv-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function conversationTitle(messages: Message[]): string {
  const first = messages.find((m) => m.role === 'user');
  if (!first || typeof first.content !== 'string') return 'New conversation';
  const text = first.content.trim();
  return text.length > 48 ? text.slice(0, 48) + '…' : text;
}

export function relativeTime(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
