import express from "express";
import {
  getDashboardStats,
  getEntityStats,
  getRecentActivity,
  getGrowthStats,
} from "../controllers/statisticsController.js";
import authenticate from "../middleware/authenticate.js";

const router = express.Router();

// All routes require authentication (admin access)
router.use(authenticate);

// Get dashboard overview statistics
router.get("/dashboard", getDashboardStats);

// Get detailed statistics for specific entity
router.get("/entity/:entity", getEntityStats);

// Get recent activity across all entities
router.get("/recent-activity", getRecentActivity);

// Get growth statistics (monthly growth data)
router.get("/growth", getGrowthStats);

export default router;
