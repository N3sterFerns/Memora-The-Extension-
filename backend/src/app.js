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
  origin: function(origin, callback) {
    if (!origin || origin.startsWith("chrome-extension://")) return callback(null, true);

    if (origin === process.env.FRONTEND_URL) return callback(null, true);

    callback(new Error("Not allowed by CORS"));
  }
}));

app.use("/api/auth", authRouter)
app.use("/api", saveRouter)


export default app;