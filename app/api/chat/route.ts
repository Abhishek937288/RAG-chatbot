// Import OpenAI SDK (we use it to call OpenRouter API)
import OpenAI from "openai";

// Create client instance
const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1", // OpenRouter endpoint
  apiKey: process.env.OPENROUTER_API_KEY, //  Your API key from .env
});

// This function runs when frontend sends POST request to /api/chat
export async function POST(req: Request) {
  try {
    const { messages } = await req.json(); // Get messages array from frontend request
    // Frontend sends chat history like:  [{ "role": "user", "content": "What is MERN?" }]

    // Get last user message (latest question)
    const lastMessage = messages[messages.length - 1]?.content || "";

    // Placeholder for RAG (we will replace this later)
    const context = "Your retrieved context here";

    // Call OpenRouter LLM
    const response = await client.responses.create({
      model: "meta-llama/llama-3-8b-instruct",
      // prompt start here
      input: `
You are a helpful assistant. 

Use the context below to answer the question.
If the answer is not in the context, say "I don't know".

Context: 
${context}

Question:
${lastMessage}
`,
    }); // Injects your retrieved data (from DB later)  Adds user's question to prompt

    const answer = response.output_text; // Extract final text response safely

    return Response.json({ message: answer });
  } catch (error) {
    console.error(error);
    return new Response("Error", { status: 500 });
  }
}
