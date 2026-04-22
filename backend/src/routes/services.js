import express from "express";
import {
  getAllServices,
  getActiveServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  toggleServiceStatus,
} from "../controllers/servicesController.js";
import authenticate from "../middleware/authenticate.js";
import { upload } from "../middleware/upload.js"; // multer instance

const router = express.Router();

/* ===== PUBLIC ROUTES ===== */
router.get("/active", getActiveServices);

/* ===== ADMIN ROUTES ===== */
router.use(authenticate);

router.get("/", getAllServices);
router.get("/:id", getServiceById);

// Use single file upload middleware
router.post("/", upload.single("image"), createService);
router.put("/:id", upload.single("image"), updateService);

router.delete("/:id", deleteService);
router.patch("/:id/toggle-status", toggleServiceStatus);

export default router;