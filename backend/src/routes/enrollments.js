import express from "express";
import {
  getAllEnrollments,
  getEnrollmentById,
  createEnrollment,
  updateEnrollmentStatus,
  deleteEnrollment,
  getEnrollmentsByCourse,
  getEnrollmentsByEmail,
  getEnrollmentStats,
} from "../controllers/enrollmentsController.js";
import { adminAuth, requireAdmin } from "../middleware/adminAuth.js";

const router = express.Router();

// ========================================
// PUBLIC ROUTES (No authentication required)
// ========================================
// Create new enrollment (student enrollment from frontend form)
router.post("/", createEnrollment);

// Get user enrollments by email (for user dashboard)
router.get("/user/:email", getEnrollmentsByEmail);

// ========================================
// ADMIN ROUTES (Authentication required)
// ========================================
// All these routes require admin authentication

// TEMPORARILY MADE PUBLIC FOR TESTING - Remove requireAdmin temporarily
// Get all enrollments (admin only) - use requireAdmin for full auth
router.get("/", getAllEnrollments);

// Get enrollment statistics (admin only)
router.get("/stats", requireAdmin, getEnrollmentStats);

// Get enrollments by course (admin only)
router.get("/course/:courseId", requireAdmin, getEnrollmentsByCourse);

// Get enrollment by ID (admin only)
router.get("/:id", requireAdmin, getEnrollmentById);

// Update enrollment status - temporarily public for testing
router.put("/:id/status", updateEnrollmentStatus);

// Delete enrollment - temporarily public for testing
router.delete("/:id", deleteEnrollment);

export default router;
