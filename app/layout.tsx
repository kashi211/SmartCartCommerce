import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SmartCart Knowledge Assistant',
  description: 'AI-powered knowledge base for SmartCartCommerce — powered by RAG',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
