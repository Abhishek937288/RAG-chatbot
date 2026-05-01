import { sql } from "drizzle-orm";
import { db } from "./db-config";

import { generateEmbedding } from "./embeddings";

// export const searchDocuments = async (
//   query: string,
//   limit: number = 5,
//   threshold: number = 0.5,
// ) => {
//   const embedding = await generateEmbedding(query);

//   // cast embedding array to vector explicitly
//   const embeddingStr = `[${embedding.join(",")}]`;

//   const similarDocuments = await db.execute(sql`
//     SELECT id, content,
//       1 - (embedding <=> ${embeddingStr}::vector) AS similarity
//     FROM documents
//     ORDER BY embedding <=> ${embeddingStr}::vector
// LIMIT ${limit}
//   `);

//   return similarDocuments.rows as {
//     id: number;
//     content: string;
//     similarity: number;
//   }[];
// };

export const searchDocuments = async (query: string, limit: number = 5) => {
  const embedding = await generateEmbedding(query);
  const embeddingStr = `[${embedding.join(",")}]`;

  const similarDocuments = await db.execute(sql`
    SELECT id, content,
      1 - (embedding <=> ${embeddingStr}::vector) AS similarity
    FROM documents
    ORDER BY embedding <=> ${embeddingStr}::vector
    LIMIT ${limit}
  `);

  return similarDocuments.rows as {
    id: number;
    content: string;
    similarity: number;
  }[];
};
