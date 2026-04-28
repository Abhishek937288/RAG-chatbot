import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

const FREE_MODELS = [
  "openrouter/free",
  "meta-llama/llama-3.3-70b-instruct:free",
  "google/gemma-3-27b-it:free",
  "deepseek/deepseek-chat:free",
  "mistralai/mistral-small-3.1-24b-instruct:free",
];

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1]?.content || "";
    const context = "Your retrieved context here";

    const systemPrompt = `You are a helpful assistant. Use the context below to answer the question. If the answer is not in the context, say "I don't know".\n\nContext:\n${context}`;

    let lastError: unknown;

    for (const model of FREE_MODELS) {
      try {
        const response = await client.chat.completions.create({
          model,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: lastMessage },
          ],
        });

        const answer = response.choices[0]?.message?.content || "No response";
        console.log(` Responded using: ${model}`);
        return Response.json({ message: answer });
      } catch (err: any) {
        if (err?.status === 429 || err?.status === 404) {
          console.warn(` ${model} failed (${err.status}), trying next...`);
          lastError = err;
          continue;
        }
        throw err;
      }
    }

    console.error("All models failed:", lastError);
    return Response.json(
      {
        message: "All models are currently busy. Please try again in a moment.",
      },
      { status: 429 },
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}