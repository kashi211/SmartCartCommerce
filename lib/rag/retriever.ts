import { embedQuery } from './embeddings';
import { querySimilar } from './vectorstore';
import type { KBSource } from '../types';

export async function retrieveContext(query: string, topK = 6): Promise<KBSource[]> {
  const [queryVector] = await Promise.all([embedQuery(query)]);
  const matches = await querySimilar(queryVector, topK);

  return matches.map((m) => ({
    id: m.id,
    score: m.score,
    content: m.metadata.content,
    metadata: {
      filePath: m.metadata.filePath,
      category: m.metadata.category,
      docTitle: m.metadata.docTitle,
      sectionTitle: m.metadata.sectionTitle,
    },
  }));
}
