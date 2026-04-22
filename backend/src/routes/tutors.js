import express from "express";
import {
  getAllTutors,
  getTutorById,
  createTutor,
  updateTutor,
  deleteTutor,
  toggleTutorStatus,
  assignStudentToTutor,
} from "../controllers/tutorsController.js";
import authenticate from "../middleware/authenticate.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Get all tutors
router.get("/", getAllTutors);

// Get tutor by ID
router.get("/:id", getTutorById);

// Create new tutor
router.post("/", upload.single("profileImage"), createTutor);

// Update tutor
router.put("/:id", updateTutor);

// Delete tutor
router.delete("/:id", deleteTutor);

// Toggle tutor status (activate/deactivate)
router.patch("/:id/toggle-status", toggleTutorStatus);

// Assign/remove students from tutor
router.patch("/:id/assign-student", assignStudentToTutor);

export default router;
