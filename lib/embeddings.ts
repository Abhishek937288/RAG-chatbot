import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

async function fetchEmbedding(inputs: string | string[]): Promise<number[][]> {
  const result = await hf.featureExtraction({
    model: "sentence-transformers/all-MiniLM-L6-v2",
    inputs,
  });

  // normalize output to number[][]
  if (Array.isArray(result) && typeof result[0] === "number") {
    return [result as number[]];
  }
  return result as number[][];
}

export async function generateEmbedding(text: string): Promise<number[]> {
  const input = text.replaceAll("\n", " ");
  const result = await fetchEmbedding(input);
  return result[0];
}

export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  const inputs = texts.map((t) => t.replaceAll("\n", " "));
  const result = await fetchEmbedding(inputs);
  return result;
}