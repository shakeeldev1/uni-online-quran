import express from "express";
import { authMiddleware, adminMiddleware } from "../middleware/auth.js";
import User from "../models/User.js";
import Admin from "../models/Admin.js";

const router = express.Router();

// ✅ Get full profile from DB
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    // First try user collection
    let account = await User.findById(req.user.id).select(
      "-password -otp -otpExpires -resetPasswordToken -resetPasswordExpires -emailChangeOtp -emailChangeOtpExpiry"
    );

    // If not found, check Admin collection
    if (!account) {
      account = await Admin.findById(req.user.id).select("-password");
    }

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.json({ user: account });
  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(500).json({ message: "Server error while fetching profile" });
  }
});

// ✅ Admin-only route
router.get("/dashboard", authMiddleware, adminMiddleware, (req, res) => {
  res.json({
    message: "Welcome Admin, this is the dashboard",
    admin: req.user.email,
  });
});

export default router;
