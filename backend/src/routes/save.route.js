import {Router} from "express"
import { getRelatedItems, saveContent, savedItems } from "../controllers/save.controller.js"
import { authVerify } from "../middlewares/authVerify.middleware.js"

const saveRouter = Router()


saveRouter.post("/save",authVerify, saveContent)
saveRouter.get("/save/all",authVerify, savedItems)
saveRouter.get("/save/:id",authVerify, getRelatedItems)


export default saveRouter

