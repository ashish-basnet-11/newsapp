import express from 'express';
import { authorize, protect } from '../middleware/authMidlleware.js';
import { getAdminStats, getGrowthStats } from '../controllers/statsController.js';


const router = express.Router();

// Only admins should usually see dashboard-wide stats
router.get("/summary", protect, authorize("admin"), getAdminStats);
router.get("/growth", protect, authorize("admin"), getGrowthStats);


export default router;