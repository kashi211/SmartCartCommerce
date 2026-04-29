import { streamText, createDataStreamResponse } from 'ai';
import { openai } from '@ai-sdk/openai';
import { retrieveContext } from '@/lib/rag/retriever';
import { buildSystemPrompt } from '@/lib/prompts';
import type { Persona } from '@/lib/types';

export const maxDuration = 60;

export async function POST(req: Request) {
  const { messages, persona = 'customer' } = await req.json();

  const lastUserMessage = messages
    .filter((m: { role: string }) => m.role === 'user')
    .at(-1)?.content as string;

  if (!lastUserMessage) {
    return new Response('No user message found', { status: 400 });
  }

  let sources = await retrieveContext(lastUserMessage, 6).catch((err) => {
    console.error('Retrieval failed:', err.message);
    return [];
  });

  return createDataStreamResponse({
    execute: (dataStream) => {
      dataStream.writeData({ type: 'sources', sources } as never);

      const result = streamText({
        model: openai('gpt-4o-mini'),
        system: buildSystemPrompt(persona as Persona, sources),
        messages,
        maxTokens: 1024,
        temperature: 0.1,
      });

      result.mergeIntoDataStream(dataStream);
    },
    onError: (err) => {
      console.error('Stream error:', err);
      return 'An error occurred. Please try again.';
    },
  });
}
