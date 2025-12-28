import express from 'express'
import { createArticle, getAllArticles } from '../controllers/articleController.js';

const router = express.Router();

router.post("/articles", createArticle)
router.get("/articles", getAllArticles)

export default router;