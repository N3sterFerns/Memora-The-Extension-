import {Router} from "express"
import { getMe, login, register } from "../controllers/auth.controller.js"
import { authVerify } from "../middlewares/authVerify.middleware.js"

const authRouter = Router()


authRouter.post("/register", register)
authRouter.post("/login", login)
authRouter.get("/me", authVerify, getMe)


export default authRouter

