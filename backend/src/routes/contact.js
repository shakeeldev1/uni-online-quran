import express from "express";
import {
  submitContactForm,
  getAllContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
} from "../controllers/contactController.js";
import { authMiddleware, adminMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Public route - Submit contact form
router.post("/submit", submitContactForm);

// Admin routes - Protected
router.get("/", authMiddleware, adminMiddleware, getAllContacts);
router.get("/:id", authMiddleware, adminMiddleware, getContactById);
router.put("/:id", authMiddleware, adminMiddleware, updateContactStatus);
router.delete("/:id", authMiddleware, adminMiddleware, deleteContact);

export default router;
