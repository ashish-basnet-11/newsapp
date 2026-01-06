import express from 'express'
import { createArticle, deleteArticle, getAllArticles, getArticleById, updateArticles } from '../controllers/articleController.js';
import { authorize, optionalAuth, protect } from '../middleware/authMidlleware.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();

router.post("/",protect, authorize("admin", "editor"), upload.single('image'),createArticle)
router.put("/:articleId",protect, authorize("admin", "editor"),updateArticles)
router.get("/", getAllArticles)
router.get("/:articleId", optionalAuth, getArticleById)
router.delete("/:articleId", protect, deleteArticle)

export default router;