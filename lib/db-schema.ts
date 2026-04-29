import { pgTable, serial, text, vector, index } from "drizzle-orm/pg-core";

// this is schema create with drizzle to store the vector and text data in db
export const documents = pgTable(
  "documents",
  {
    id: serial("id").primaryKey(),
    content: text("content").notNull(),
    embedding: vector("embedding", { dimensions: 384 }),
  },
  (table) => [
    index("embeddingIndex").using(
      "hnsw",
      table.embedding.op("vector_cosine_ops"),
    ),
  ],
);

//types exported here
export type InsertDocument = typeof documents.$inferInsert;
export type SelectDocument = typeof documents.$inferInsert;
