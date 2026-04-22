import express from "express";
import {
  getAllApplications,
  getApplicationById,
  createApplication,
  updateApplicationStatus,
  deleteApplication,
} from "../controllers/teacherApplicationsController.js";
import { upload } from "../middleware/upload.js";
import authenticate from "../middleware/authenticate.js";

const router = express.Router();

// Public route - no authentication required for submitting application
router.post("/", upload.fields([
  { name: "certificate", maxCount: 1 },
  { name: "cnic", maxCount: 1 },
  { name: "cv", maxCount: 1 }
]), createApplication);

// All other routes require authentication (for admin dashboard)
router.use(authenticate);

// Get all applications
router.get("/", getAllApplications);

// Get single application by ID
router.get("/:id", getApplicationById);

// Update application status (approve/reject)
router.patch("/:id/status", updateApplicationStatus);

// Delete application
router.delete("/:id", deleteApplication);

export default router;
