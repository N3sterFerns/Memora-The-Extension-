import {Router} from "express"
import { saveContent, savedItems } from "../controllers/save.controller.js"
import { authVerify } from "../middlewares/authVerify.middleware.js"

const saveRouter = Router()


saveRouter.post("/save",authVerify, saveContent)
saveRouter.get("/save/all",authVerify, savedItems)


export default saveRouter

