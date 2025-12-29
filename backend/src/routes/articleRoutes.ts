import express from 'express'
import { createArticle, deleteArticle, getAllArticles } from '../controllers/articleController.js';
import { authorize, protect } from '../middleware/authMidlleware.js';

const router = express.Router();

router.post("/",protect, authorize("admin", "editor"),createArticle)
router.get("/", getAllArticles)
router.get("/:id", getAllArticles)
router.delete("/:id", protect, deleteArticle)

export default router;