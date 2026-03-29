import { saveModel } from "../models/save.model.js";
import { generateTags } from "../services/aiservice.js";
import { generateEmbeddings } from "../services/embeddingService.js";
import { extractMetadata } from "../services/metadataService.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { index } from "../config/pineCone.js";

const saveContent = asyncHandler(async (req, res) => {
  const { url, title } = req.body;
  const userId = req.user._id;

  const meta = await extractMetadata(url);

    const text = `${meta.title} ${meta.description}`;

  const tags = await generateTags(text);

  const textDataForEmbedding = `
          Title: ${meta.title}
          Description: ${meta.description}
          Tags: ${tags.join(", ")}
          URL: ${url}
      `;

  const embedding = await generateEmbeddings(textDataForEmbedding);

  const newSave = await saveModel.create({
    url: url,
    title: meta.title,
    tags: tags,
    type: url.includes("youtube") ? "video" : "article",
    description: meta.description,
    image: meta.image || undefined,
    user: userId,
    embedding: embedding,
  });

  await index.namespace(userId.toString()).upsert({
    records: [
      {
        id: newSave._id.toString(),
        values: Array.from(embedding).map(Number),
        metadata: {
          userId: userId.toString(),
          title: meta.title,
          url: url,
        },
      },
    ],
  });

  res.status(201).json({ saveData: newSave });
});

const savedItems = asyncHandler(async (req, res) => {
  const allItems = await saveModel
    .find({ user: req.user._id })
    .sort({ createdAt: -1 });

  res.status(200).json({ items: allItems });
});

const getRelatedItems = asyncHandler(async (req, res) => {
  const itemId = req.params.id;
  const item = await saveModel.findById(itemId);
  const userId = req.user._id;

  if (!item) {
    return res.status(404).json({ message: "Item not Found" });
  }


  const result = await index.namespace(userId.toString()).query({
    vector: item.embedding,
    topK: 5,
    includeMetadata: true,
  });

  const allIds = await result.matches
    .filter((match) => match.id !== itemId && match.score > 0.75)
    .map((match) => match.id);

  const relatedItemsRandom = await saveModel.find({
    _id: { $in: allIds },
  });

  const relatedItems = allIds
    .map((id) => relatedItemsRandom.find((item) => item._id.toString() === id))
    .filter(Boolean)
    .slice(0, 5);

  return res.status(200).json({ relatedItems: relatedItems });
});

export { saveContent, savedItems, getRelatedItems };
