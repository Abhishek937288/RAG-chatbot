import OpenAI from "openai";
import { searchDocuments } from "@/lib/search";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

const FREE_MODELS = [
  "openrouter/auto", //  BEST (auto picks working model)
  "meta-llama/llama-3-8b-instruct", //  paid but stable
  "mistralai/mistral-small", //  stable
];

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1]?.content || "";

    const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

    //  Search condition
    const shouldSearch = true;

    let results: any[] = [];
    const searchQuery = lastMessage + " personal details name";

    if (shouldSearch) {
      try {
        results = await searchDocuments(searchQuery, 8, 0.1);
      } catch (err) {
        console.warn("Search failed, proceeding without context:", err);
      }
    }

    //  Build context
    const context =
      results.length > 0
        ? results.map((r, i) => `[${i + 1}] ${r.content}`).join("\n\n")
        : "No relevant information found.";

    //  System prompt
    const systemPrompt = `You are a helpful assistant.

STRICT RULES:
- Answer ONLY using the provided context
- Do NOT use your own knowledge
- If answer is not in context, say "I don't know"

Context:
${context}`;

    let lastError: any = null;

    //  Try models one by one
    for (const model of FREE_MODELS) {
      try {
        console.log("Trying model:", model);

        const response = await client.chat.completions.create({
          model,
          messages: [{ role: "system", content: systemPrompt }, ...messages],
        });

        const answer = response.choices[0]?.message?.content || "No response";

        console.log(` Responded using: ${model}`);

        return Response.json({ message: answer });
      } catch (err: any) {
        if (err?.status === 429 || err?.status === 404 || err?.status === 503) {
          console.warn(`${model} failed (${err.status}), trying next...`);
          lastError = err;
          await sleep(1000);
          continue;
        }

        // Unknown error → stop immediately
        throw err;
      }
    }

    //  All models failed
    console.error("All models failed:", lastError);

    return Response.json(
      {
        message:
          "All models are busy or unavailable. Please try again in a moment.",
      },
      { status: 429 },
    );
  } catch (error) {
    console.error("Server error:", error);

    return Response.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
