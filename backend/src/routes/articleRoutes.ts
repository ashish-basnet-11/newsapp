import express from 'express'
import { createArticle, deleteArticle, getAllArticles } from '../controllers/articleController.js';
import { authorize, protect } from '../middleware/authMidlleware.js';

const router = express.Router();

router.post("/api/articles",protect, authorize("admin", "editor"),createArticle)
router.get("/api/articles", getAllArticles)
router.get("/api/articles/:id", getAllArticles)
router.delete("/api/articles/:id", protect, deleteArticle)

export default router;