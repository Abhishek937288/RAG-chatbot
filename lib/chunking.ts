import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export const textsplitters = new RecursiveCharacterTextSplitter({
  chunkSize: 150,
  chunkOverlap: 20,
  separators: [" "],
});

export const chunkContent = async (content: string) => {
  return await textsplitters.splitText(content.trim());
};
