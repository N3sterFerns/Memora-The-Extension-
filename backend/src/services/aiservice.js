import axios from "axios";
import { Mistral } from "@mistralai/mistralai";

const client = new Mistral({ apiKey: process.env.MISTRAL_API_KEY });

export const generateTags = async (text) => {
  try {
    const res = await client.chat.complete({
      model: "mistral-small",
      messages: [
        {
          role: "system",
          content: `You must generate exactly 4 tags from the given content.

                    STRICT RULES:
                    - Output EXACTLY 4 tags. Not less, not more.
                    - Each tag must be 1-2 words maximum.
                    - Tags must be lowercase.
                    - Separate tags ONLY with a comma and a single space.
                    - DO NOT use parentheses, quotes, numbers, bullet points, or any extra text.
                    - DO NOT add explanations or prefixes.

                    OUTPUT FORMAT (must match exactly):
                    tag1, tag2, tag3, tag4

                    Content:
            ${text}`,
                    },
                ],
    });

    const output = res.choices[0].message.content;

    return output.split(",").map((tag) => tag.trim().toLowerCase()).filter(tag => tag.length > 0).slice(0, 4);;
  } catch (error) {
    return [];
  }
};
