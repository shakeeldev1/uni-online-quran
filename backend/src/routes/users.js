import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  toggleUserStatus,
} from "../controllers/usersController.js";
import authenticate from "../middleware/authenticate.js";

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Get all users
router.get("/", getAllUsers);

// Get user by ID
router.get("/:id", getUserById);

// Update user
router.put("/:id", updateUser);

// Delete user
router.delete("/:id", deleteUser);

// Toggle user status (activate/deactivate)
router.patch("/:id/toggle-status", toggleUserStatus);

export default router;
