import express from "express";
import { requireAdmin } from "../middleware/adminAuth.js";

const router = express.Router();

// Test endpoint to check if backend is reachable
router.get("/test", (req, res) => {
  res.json({ message: "Backend is working!", timestamp: new Date() });
});

// Test admin auth
router.get("/test-admin", requireAdmin, (req, res) => {
  res.json({ 
    message: "Admin access granted!", 
    user: req.user 
  });
});

export default router;
