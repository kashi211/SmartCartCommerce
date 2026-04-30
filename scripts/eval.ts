import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import { Eval } from 'braintrust';
import { AnswerRelevancy, Faithfulness, ContextRecall } from 'autoevals';
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { retrieveContext } from '../lib/rag/retriever';
import { buildSystemPrompt } from '../lib/prompts';
import { GOLDEN_DATASET } from '../lib/eval-dataset';
import type { Persona } from '../lib/types';

console.log(`\nSmartCart RAG Eval`);
console.log(`Dataset: ${GOLDEN_DATASET.length} cases`);
console.log(`Model: gpt-4o-mini\n`);

type TaskOutput = { answer: string; context: string };
type CaseMeta = { persona: Persona; category: string };

Eval<string, TaskOutput, string, CaseMeta>('SmartCart-RAG', {
  data: () =>
    GOLDEN_DATASET.map((c) => ({
      input: c.input,
      expected: c.expected,
      metadata: c.metadata,
    })),

  task: async (input, hooks) => {
    const persona = (hooks.metadata as CaseMeta).persona;
    const sources = await retrieveContext(input, 6);

    const context =
      sources.length > 0
        ? sources.map((s) => `[${s.metadata.docTitle}]\n${s.content}`).join('\n\n---\n\n')
        : 'No relevant context found.';

    const { text } = await generateText({
      model: openai('gpt-4o-mini'),
      system: buildSystemPrompt(persona, sources),
      messages: [{ role: 'user', content: input }],
      maxTokens: 512,
      temperature: 0.1,
    });

    return { answer: text, context };
  },

  scores: [
    // Is the answer relevant to the question?
    ({ input, output, expected }) =>
      AnswerRelevancy({ input, output: output.answer, expected }),

    // Is the answer grounded in the retrieved context? (no hallucination)
    ({ output, expected }) =>
      Faithfulness({ output: output.answer, context: output.context, expected }),

    // Did the retrieved context contain the expected answer?
    ({ output, expected }) =>
      ContextRecall({ output: output.answer, context: output.context, expected }),
  ],

  trialCount: 1,
  metadata: {
    model: 'gpt-4o-mini',
    embedding: 'text-embedding-3-small',
    vectorDb: 'pinecone',
    topK: 6,
    chunkStrategy: 'header-split',
  },
});
