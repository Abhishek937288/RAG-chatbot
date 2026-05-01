# 🤖 RAG Chatbot (Next.js)

A simple **Retrieval-Augmented Generation (RAG) Chatbot** built using **Next.js** with free resources.

This project allows users to upload data and ask questions. The chatbot retrieves relevant information from stored data and generates accurate responses using LLMs.

---

## 🚀 Features

* 📄 Upload and process documents (PDF support)
* 🔍 Semantic search using embeddings
* 🤖 AI-powered responses (RAG-based)
* 🔐 Authentication & Authorization using Clerk
* ⚡ Fast and modern UI with Next.js + React
* 💸 Built using mostly free resources

---

## 🛠️ Tech Stack

### Frontend

* Next.js 16
* React 19
* Tailwind CSS
* shadcn/ui

### Backend / Logic

* Next.js API routes
* Drizzle ORM
* Neon Database (PostgreSQL)

### AI & RAG

* Embeddings: Hugging Face
* LLM Responses: OpenRouter
* Text Splitting: LangChain

### Auth

* Clerk

---

## 🧠 How It Works (Simple Flow)

1. User uploads a document (PDF)
2. Text is extracted and split into chunks
3. Each chunk is converted into embeddings (vector format)
4. Embeddings are stored in the database
5. User asks a question
6. Relevant chunks are retrieved using similarity search
7. Context + question is sent to LLM (OpenRouter)
8. Final answer is generated and shown to user

---

## 📦 Installation

```bash
git clone <your-repo-url>
cd rag-chatbot
npm install
```

---

## ⚙️ Environment Variables

Create a `.env.local` file and add:

```env
# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# OpenRouter
OPENROUTER_API_KEY=

# Hugging Face
HUGGINGFACE_API_KEY=

# Database (Neon / PostgreSQL)
DATABASE_URL=
```

---

## ▶️ Run the Project

```bash
npm run dev
```

App will run on:

```
http://localhost:3000
```

---

## 📁 Project Structure (Basic)

```
/app            → Next.js app router
/components     → UI components
/lib            → helpers (embeddings, db, etc.)
/db             → schema & config (Drizzle)
/api            → backend routes
```

---

## 📚 Key Dependencies

* `next`, `react`
* `@clerk/nextjs`
* `@huggingface/inference`
* `drizzle-orm`
* `@langchain/textsplitters`
* `openai` (used via OpenRouter)
* `pdfjs-dist`

---

## ⚠️ Notes

* This project uses **free-tier APIs**, so:

  * Rate limits may apply
  * Response speed may vary
* OpenAI package is used, but requests are routed through OpenRouter

---

## 🎯 Future Improvements

* Add chat history
* Better UI/UX
* Support for multiple file types
* Streaming responses
* Vector DB (like Pinecone / Supabase)

---

## 🙌 Conclusion

This is a beginner-friendly RAG chatbot project built with modern tools.
Great for learning how real-world AI apps work.

---

## 📌 Author

Abhishek
