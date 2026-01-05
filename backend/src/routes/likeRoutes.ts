import express from 'express';
import { protect } from '../middleware/authMidlleware.js';
import { getAllLikes, toggleLike, getLikeStatus } from '../controllers/likeController.js';

const router = express.Router();

// Get the list of people who liked this article (Public)
router.get("/:articleId", getAllLikes);

// Check if the current user likes this article (Private)
router.get("/:articleId/status", protect, getLikeStatus);

// Toggle the like (Private)
router.post("/:articleId", protect, toggleLike);

export default router;