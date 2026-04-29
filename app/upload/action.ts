"use server";

import { parsePdf } from "@/lib/pdf-parser";
import { db } from "@/lib/db-config";
import { documents } from "@/lib/db-schema";
import { generateEmbeddings } from "@/lib/embeddings";
import { chunkContent } from "@/lib/chunking";

export const processPdfFile = async (formData: FormData) => {
  try {
    const file = formData.get("pdf") as File;
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // use parsePdf instead of pdfParse
    const text = await parsePdf(buffer);

    if (!text || text.trim().length === 0) {
      return { success: false, error: "No text found in PDF" };
    }

    const chunks = await chunkContent(text);
    const embeddings = await generateEmbeddings(chunks);
    const records = chunks.map((chunk, i) => ({
      content: chunk,
      embedding: embeddings[i],
    }));

    await db.insert(documents).values(records);

    return {
      success: true,
      message: `created ${records.length} searchable chunks`,
    };
  } catch (error) {
    console.error("pdf process error", error);
    return { success: false, error: "failed to process the pdf" };
  }
};