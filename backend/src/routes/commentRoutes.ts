import express from 'express'
import { protect } from '../middleware/authMidlleware.js';
import { commentArticle, deleteComment, getAllComments } from '../controllers/commentController.js';

const router = express.Router();

router.post("/:articleId", protect, commentArticle)
router.get("/article/:articleId", getAllComments)
router.delete("/:id",protect,  deleteComment)



export default router;