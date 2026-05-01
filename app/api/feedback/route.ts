import { NextResponse } from 'next/server';

interface FeedbackPayload {
  messageId: string;
  feedback: 'up' | 'down';
  query?: string;
  sources?: Array<{ id: string; score: number }>;
  persona?: string;
}

export async function POST(req: Request) {
  const body: FeedbackPayload = await req.json();
  const { messageId, feedback, query, sources, persona } = body;

  if (!messageId || !feedback) {
    return NextResponse.json({ error: 'messageId and feedback required' }, { status: 400 });
  }

  const entry = {
    messageId,
    feedback,
    query,
    persona,
    sourceIds: sources?.map((s) => s.id),
    timestamp: new Date().toISOString(),
  };

  // Log to console for dev visibility
  console.log('[feedback]', JSON.stringify(entry));

  // Emit to LangSmith as metadata if tracing is enabled
  if (process.env.LANGCHAIN_TRACING_V2 === 'true') {
    console.log('[LangSmith] feedback signal:', entry);
  }

  return NextResponse.json({ ok: true });
}
