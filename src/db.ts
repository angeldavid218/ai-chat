import Dexie, { type EntityTable } from 'dexie';

export interface ChatMessage {
  id?: number;
  question: string;
  answer: string;
  createdAt?: Date;
}

const db = new Dexie('chatDatabase') as Dexie & {
  chatMessages: EntityTable<ChatMessage, 'id'>; // type and primary key
};

db.version(1).stores({
  // ++ means autoincrement primary key
  chatMessages: '++id, question, answer, createdAt',
});

export { db };
