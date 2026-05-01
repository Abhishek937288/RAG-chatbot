// lib/embeddings.ts
import { pipeline } from "@xenova/transformers";

let embedder: any = null;

async function getEmbedder() {
  if (!embedder) {
    embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
  }
  return embedder;
}

async function fetchEmbedding(inputs: string | string[]): Promise<number[][]> {
  const model = await getEmbedder();
  const texts = Array.isArray(inputs) ? inputs : [inputs];
  const results: number[][] = [];

  for (const text of texts) {
    const output = await model(text, { pooling: "mean", normalize: true });
    results.push(Array.from(output.data) as number[]);
  }

  return results;
}

export async function generateEmbedding(text: string): Promise<number[]> {
  const input = text.replaceAll("\n", " ");
  const result = await fetchEmbedding(input);
  return result[0];
}

export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  const inputs = texts.map((t) => t.replaceAll("\n", " "));
  return await fetchEmbedding(inputs);
}