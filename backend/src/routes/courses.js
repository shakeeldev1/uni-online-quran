import express from "express";
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  toggleCourseStatus,
  updateStudentsEnrolled,
  getPublicCourses,
} from "../controllers/coursesController.js";
import authenticate from "../middleware/authenticate.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

// Public routes - no authentication required
router.get("/public", getPublicCourses);

// All other routes require authentication
router.use(authenticate);

// Get all courses
router.get("/", getAllCourses);

// Get course by ID
router.get("/:id", getCourseById);

// Create new course
router.post("/", upload.single("thumbnail"), createCourse);

// Update course
router.put("/:id", upload.single("thumbnail"), updateCourse);

// Delete course
router.delete("/:id", deleteCourse);

// Toggle course status (activate/deactivate)
router.patch("/:id/toggle-status", toggleCourseStatus);

// Update students enrolled count
router.patch("/:id/students-enrolled", updateStudentsEnrolled);

export default router;
