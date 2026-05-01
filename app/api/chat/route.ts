import { streamText, createDataStreamResponse } from 'ai';
import { openai } from '@ai-sdk/openai';
import { traceable } from 'langsmith/traceable';
import { retrieveContext } from '@/lib/rag/retriever';
import { buildSystemPrompt } from '@/lib/prompts';
import type { Persona } from '@/lib/types';

export const maxDuration = 60;

export async function POST(req: Request) {
  const { messages, persona = 'customer' } = await req.json();

  const userMessages = messages.filter((m: { role: string }) => m.role === 'user');
  const lastUserMessage = userMessages.at(-1)?.content as string;

  if (!lastUserMessage) {
    return new Response('No user message found', { status: 400 });
  }

  // Use only the latest user message for retrieval — joining prior messages
  // causes the first question's topic to dominate all subsequent retrievals.
  // The query rewriter handles rephrasing; the LLM has full conversation
  // history in its context window to handle follow-up questions correctly.
  const retrievalQuery = lastUserMessage;

  // Wrap the retrieval step so LangSmith traces it as the root span of each request
  const runRetrieval = traceable(
    () =>
      retrieveContext(retrievalQuery, 6, persona as Persona).catch((err) => {
        console.error('Retrieval failed:', err.message);
        return [];
      }),
    { name: 'chat/retrieve', run_type: 'chain', metadata: { persona } },
  );

  const sources = await runRetrieval();

  return createDataStreamResponse({
    execute: (dataStream) => {
      dataStream.writeData({ type: 'sources', sources } as never);

      const result = streamText({
        model: openai('gpt-4o-mini'),
        system: buildSystemPrompt(persona as Persona, sources),
        messages,
        maxTokens: 1024,
        temperature: 0.1,
        onFinish: ({ usage, finishReason }) => {
          if (process.env.LANGCHAIN_TRACING_V2 === 'true') {
            console.log('[LangSmith] llm finish:', {
              inputTokens: usage.promptTokens,
              outputTokens: usage.completionTokens,
              finishReason,
              persona,
              sourcesReturned: sources.length,
            });
          }
        },
      });

      result.mergeIntoDataStream(dataStream);
    },
    onError: (err) => {
      console.error('Stream error:', err);
      return 'An error occurred. Please try again.';
    },
  });
}
