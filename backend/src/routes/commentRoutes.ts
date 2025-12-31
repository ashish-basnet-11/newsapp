import express from 'express'
import { protect } from '../middleware/authMidlleware.js';
import { commentArticle, deleteComment, getAllComments, updateComment } from '../controllers/commentController.js';

const router = express.Router();

router.post("/:articleId", protect, commentArticle)
router.put("/:commentId", protect, updateComment)
router.get("/:articleId", getAllComments)
router.delete("/:commentId",protect,  deleteComment)



export default router;