import express from 'express'
import { protect } from '../middleware/authMidlleware.js';
import { getAllLikes, toggleLike } from '../controllers/likeController.js';

const router = express.Router();

router.post("/:articleId", protect, toggleLike)
router.get("/:articleId", getAllLikes)


export default router;