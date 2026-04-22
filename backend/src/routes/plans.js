import express from "express";
import {
  getAllPlans,
  getUserPlan,
  activatePlan,
  deactivatePlan,
} from "../controllers/plansController.js";
import authenticate from "../middleware/authenticate.js";

const router = express.Router();

// Public route - Get all available plans
router.get("/", getAllPlans);

// Private routes - Require authentication
router.get("/user", authenticate, getUserPlan);
router.post("/activate", authenticate, activatePlan);
router.post("/deactivate", authenticate, deactivatePlan);

export default router;
