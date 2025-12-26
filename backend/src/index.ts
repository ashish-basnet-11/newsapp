import express from "express";
import AppDataSource from "./config/db.js";
import authRoutes from './routes/authRoutes.js'

const app = express();
app.use(express.json());

app.use("/", authRoutes)


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