export type Persona = 'customer' | 'concierge' | 'brand-partner';

export interface KBSource {
  id: string;
  content: string;
  score: number;
  metadata: {
    filePath: string;
    category: string;
    docTitle: string;
    sectionTitle: string;
  };
}

export interface SourceDataEvent {
  type: 'sources';
  sources: KBSource[];
}

export interface Chunk {
  id: string;
  content: string;
  metadata: {
    filePath: string;
    category: string;
    docTitle: string;
    sectionTitle: string;
    chunkIndex: number;
    charCount: number;
  };
}

export interface PineconeMetadata {
  content: string;
  filePath: string;
  category: string;
  docTitle: string;
  sectionTitle: string;
  chunkIndex: number;
  [key: string]: string | number | boolean;
}
