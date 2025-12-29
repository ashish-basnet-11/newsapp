import express from 'express'
import { createArticle, deleteArticle, getAllArticles, getArticleById } from '../controllers/articleController.js';
import { authorize, protect } from '../middleware/authMidlleware.js';

const router = express.Router();

router.post("/",protect, authorize("admin", "editor"),createArticle)
router.get("/", getAllArticles)
router.get("/:articleId", getArticleById)
router.delete("/:id", protect, deleteArticle)

export default router;