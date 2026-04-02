import {Router} from "express"
import { checkExisting, checkSimilarAI, deleteItem, getGraphData, getRelatedItems, getResurfaceItems, saveContent, savedItems } from "../controllers/save.controller.js"
import { authVerify } from "../middlewares/authVerify.middleware.js"

const saveRouter = Router()


saveRouter.post("/save",authVerify, saveContent)
saveRouter.get("/save/all",authVerify, savedItems)
saveRouter.get("/save/smart-resurface", authVerify, getResurfaceItems)
saveRouter.post("/save/check-existing", authVerify, checkExisting)
saveRouter.post("/save/check-similar-ai", authVerify, checkSimilarAI)
saveRouter.get("/save/graph", authVerify, getGraphData)

saveRouter.get("/save/:id",authVerify, getRelatedItems)
saveRouter.delete("/save/delete/:id",authVerify, deleteItem)

export default saveRouter

