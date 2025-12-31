import "reflect-metadata";
import express from "express";
import AppDataSource from "./config/db.js";
import authRoutes from './routes/authRoutes.js'
import likeRoutes from './routes/likeRoutes.js'
import articleRoutes from './routes/articleRoutes.js'
import commentRoutes from './routes/commentRoutes.js'
import cookieParser from "cookie-parser";
import rateLimit from 'express-rate-limit'


const app = express();
app.use(express.json());
app.use(cookieParser());



// rate limit


const isDev = process.env.NODE_ENV === 'development'


const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: isDev ? 1000 : 100,
    message: "Too many requests from this IP, please try again later",
    standardHeaders: true,
    legacyHeaders: false,
})

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: isDev ? 100 : 5,
    message: "Too many login/register attempts, please try again later",
    standardHeaders: true,
    legacyHeaders: false,
});

app.use("/api/", apiLimiter);
app.use("/api/auth/login", authLimiter);
app.use("/api/auth/register", authLimiter);

        //routes

app.use("/api/auth", authRoutes)
app.use("/api/articles", articleRoutes)
app.use("/api/likes", likeRoutes)
app.use("/api/comments", commentRoutes)


const PORT = 5001


const startServer = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server is running on ${PORT}`);
        })
        await AppDataSource.initialize()
        console.log("Database has been connected")
    } catch (error) {
        console.error("Error during Data Source initialization", error)
    }
}

startServer();