import axios from "axios";
import { Mistral } from "@mistralai/mistralai";

const client = new Mistral({ apiKey: process.env.MISTRAL_API_KEY });

export const generateEmbeddings = async (text) => {
  try {
    const embeddingResponse = await client.embeddings.create({
      model: "mistral-embed",
      inputs: [text],
    });

    const rawEmbedding = embeddingResponse?.data?.[0]?.embedding;

    if (!rawEmbedding || rawEmbedding.length === 0) {
      throw new Error("Empty embedding returned from Mistral");
    }

    return Array.isArray(rawEmbedding[0])
      ? rawEmbedding.flat()
      : rawEmbedding;

  } catch (error) {
    console.log("Embedding error:", error.message);
    return [];
  }
};
