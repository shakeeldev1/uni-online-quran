import express from "express";
import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  toggleStudentStatus,
} from "../controllers/studentsController.js";
import authenticate from "../middleware/authenticate.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Get all students
router.get("/", getAllStudents);

// Get student by ID
router.get("/:id", getStudentById);

// Create new student
router.post("/", upload.single("profileImage"), createStudent);

// Update student
router.put("/:id", updateStudent);

// Delete student
router.delete("/:id", deleteStudent);

// Toggle student status (activate/deactivate)
router.patch("/:id/toggle-status", toggleStudentStatus);

export default router;
