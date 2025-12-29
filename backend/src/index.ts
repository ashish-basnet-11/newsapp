import "reflect-metadata";
import express from "express";
import AppDataSource from "./config/db.js";
import authRoutes from './routes/authRoutes.js'
import likeRoutes from './routes/likeRoutes.js'
import articleRoutes from './routes/articleRoutes.js'
import cookieParser from "cookie-parser";


const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes)
app.use("/api/articles", articleRoutes)
app.use("/api/likes", likeRoutes)

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