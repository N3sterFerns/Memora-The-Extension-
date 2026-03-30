import { saveModel } from "../models/save.model.js";
import { generateTags } from "../services/aiservice.js";
import { generateEmbeddings } from "../services/embeddingService.js";
import { extractMetadata } from "../services/metadataService.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { index } from "../config/pineCone.js";
import mongoose from "mongoose";

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

const checkSimilarAI = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { title, url } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title required" });
  }

  const meta = await extractMetadata(url)


  const textDataForEmbedding = `
      Title: ${meta.title}
      Description: ${meta.description}
      URL: ${url}
    `;

  const embedding = await generateEmbeddings(textDataForEmbedding);

  if (!embedding || embedding.length === 0) {
    return res.status(400).json({ message: "Embedding failed" });
  }

  const result = await index.namespace(userId.toString()).query({
    vector: Array.from(embedding).map(Number),
    topK: 10,
    includeMetadata: true,
  });

  const matches = result.matches
    .filter((match) => match.score > 0.78)
    .map((match) => ({
      id: match.id,
      title: match.metadata.title,
      url: match.metadata.url,
      score: match.score,
    }));


  return res.status(200).json({
    matches: matches[0] || null,
    isSimilar: matches.length > 0,
  });
});

const getResurfaceItems = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const latestItem = await saveModel
    .findOne({ user: userId })
    .sort({ created: -1 });


  if (!latestItem || !latestItem.embedding) {
    return res.status(200).json({ items: [] });
  }

  const result = await index.namespace(userId.toString()).query({
    vector: latestItem.embedding,
    topK: 10,
    includeMetadata: true,
  });

  const ids = result.matches
    .filter((m) => m.id !== latestItem._id.toString() && m.score > 0.7)
    .map((m) => m.id);

  const items = await saveModel.find({
    _id: {$in: ids},
    user: userId
  })

  const ordered = ids.map((id)=> items.find((i)=> i._id.toString() === id)).filter(Boolean).slice(0, 3);

  return res.status(200).json({ items: ordered });
});

const checkExisting = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { url } = req.body;

  const existing = await saveModel
    .findOne({
      user: userId,
      url: url,
    })
    .select("-embedding");

  res.status(200).json({
    exists: !!existing,
    item: existing || null,
  });
});

export {
  saveContent,
  savedItems,
  getRelatedItems,
  getResurfaceItems,
  checkExisting,
  checkSimilarAI,
};
