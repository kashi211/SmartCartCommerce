import type { Metadata } from 'next';
import { ChatInterface } from '@/components/chat-interface';

export const metadata: Metadata = {
  title: 'SmartCart Knowledge Assistant',
};

export default function ChatPage() {
  return <ChatInterface />;
}
