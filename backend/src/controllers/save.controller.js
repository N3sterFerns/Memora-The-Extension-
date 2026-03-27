import { saveModel } from "../models/save.model.js";
import { generateTags } from "../services/aiservice.js";
import { extractMetadata } from "../services/metadataService.js";
import { asyncHandler } from "../utils/asyncHandler.js";



const saveContent = asyncHandler(async (req, res)=>{
    const {url, title} = req.body;
    const userId = req.user._id;
    
    const meta = await extractMetadata(url)
    

    const tags = await generateTags(`${meta.title} ${meta.description}`)


    const newSave = await saveModel.create({
        url: url,
        title: meta.title,
        tags: tags,
        type: url.includes("youtube") ? "video": "article",
        description: meta.description,
        image: meta.image || undefined,
        user:userId 
    })

    res.status(201).json({saveData: newSave})
})


const savedItems = asyncHandler(async (req, res)=>{

    const allItems = await saveModel.find({user: req.user._id}).sort({ createdAt: -1 })

    res.status(200).json({items: allItems})
})


export {saveContent, savedItems}