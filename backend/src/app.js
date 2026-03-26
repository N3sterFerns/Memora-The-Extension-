import express from "express"
import 'dotenv/config.js';
import cookieParser from "cookie-parser";
import saveRouter from "./routes/save.route.js";
import authRouter from "./routes/auth.route.js";
import cors from "cors"


const app = express()


app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin: [`chrome-extension://${process.env.EXTENSION_ID}`, process.env.FRONTEND_URL],
    credentials: true
}))

app.use("/api/auth", authRouter)
app.use("/api", saveRouter)


export default app;