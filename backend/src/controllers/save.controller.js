import { saveModel } from "../models/save.model.js";
import { generateTags } from "../services/aiservice.js";
import { generateEmbeddings } from "../services/embeddingService.js";
import { extractMetadata } from "../services/metadataService.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { index } from "../config/pineCone.js";
import mongoose from "mongoose";
import { cosineSimilarity } from "../utils/cosine.js";

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
  const userId = req.user._id;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  const skip = (page - 1) * limit;

  const total = await saveModel.countDocuments({ user: userId });

  const allItems = await saveModel
    .find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)

  res.status(200).json({ items: allItems, page, 
    totalPages: Math.ceil(total / limit),
    totalItems: total
   });
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

  const meta = await extractMetadata(url);

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
    _id: { $in: ids },
    user: userId,
  });

  const ordered = ids
    .map((id) => items.find((i) => i._id.toString() === id))
    .filter(Boolean)
    .slice(0, 3);

  return res.status(200).json({ items: ordered });
});


const getMixedResurfaced = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const now = new Date();


  const ranges = [7, 30];
  const timeBased = [];

  for (const days of ranges) {
    const from = new Date(now - days * 86400000);
    const to = new Date(now - (days - 2) * 86400000);

    const item = await saveModel
      .findOne({
        user: userId,
        createdAt: { $gte: from, $lte: to },
      })
      .sort({ createdAt: -1 }).select("-embedding")

    if (item) {
      timeBased.push({
        type: `${days}_days`,
        item,
      });
    }
  }


  const recentItems = await saveModel
    .find({ user: userId })
    .sort({ createdAt: -1 })
    .limit(3);

  let relevanceBased = [];

  if (recentItems.length) {
    const seed =
      recentItems[Math.floor(Math.random() * recentItems.length)];

    const result = await index.namespace(userId.toString()).query({
      vector: seed.embedding,
      topK: 8,
      includeMetadata: true,
    });

    const ids = result.matches
      .filter(
        (m) =>
          m.id !== seed._id.toString() &&
          m.score > 0.82
      )
      .map((m) => m.id);

    const items = await saveModel.find({
      _id: { $in: ids },
      user: userId,
    }).select("-embedding")

    relevanceBased = ids
      .map((id) => items.find((i) => i._id.toString() === id))
      .filter(Boolean)
      .slice(0, 4);
  }

  res.status(200).json({
    timeBased,
    relevanceBased,
  });
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

const deleteItem = asyncHandler(async (req, res) => {
  const itemId = req.params.id;
  const userId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  await saveModel.findOneAndDelete({
    _id: itemId,
  });

  await index.namespace(userId.toString()).deleteOne({ id: itemId });

  res.status(200).json({ message: "Deleted successfully" });
});


const getGraphData = asyncHandler(async (req, res) => {
  const userId = req.user._id;


  const items = await saveModel.find({user: userId}).limit(30).lean()

  const nodes = items.map((item)=>({
    id: item._id.toString(),
    title: item.title,
    group: item?.tags?.[0] || "other"
  }))

  const links = []
  const linkSet = new Set()

  
  for(const item of items){
    if(!item.embedding || item.embedding.length === 0) continue;
    
    const result = await index.namespace(userId.toString()).query({
      vector: item.embedding,
      topK: 6,
      includeMetadata: true
    })
    
    result.matches.forEach((match)=>{
      if(match.id !== item._id.toString() &&  match.score > 0.75 && items.find(i => i._id.toString() === match.id)){
        const key = [item._id.toString(), match.id].sort().join("-")

        if(!linkSet.has(key)){
          linkSet.add(key)
          links.push({
            source: item._id.toString(),
            target: match.id,
            strength: match.score
          })
        }
      }
    })
  }

  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      const a = items[i];
      const b = items[j];

      if (!a.tags || !b.tags) continue;

      const commonTags = a.tags.filter(tag => b.tags.includes(tag));

      if (commonTags.length > 0) {
        const key = [a._id.toString(), b._id.toString()].sort().join("-");

        if (!linkSet.has(key)) {
          linkSet.add(key);

          links.push({
            source: a._id.toString(),
            target: b._id.toString(),
            strength: 0.7 + (commonTags.length * 0.05)
          });
        }
      }
    }
  }

  


  res.status(200).json({ nodes, links});
});

export {
  saveContent,
  savedItems,
  getRelatedItems,
  getResurfaceItems,
  checkExisting,
  checkSimilarAI,
  deleteItem,
  getGraphData,
  getMixedResurfaced
};
