// src/routes/adminAuth.js
import express from "express";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";
import { authMiddleware, adminMiddleware } from "../middleware/auth.js";
import { sendEmail } from "../utils/sendEmail.js";
import PendingAdmin from "../models/PendingAdmin.js";

const router = express.Router();

// Create a new admin (only existing admins can do this)
router.post("/signup", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // check existing admin
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // save pending admin
    const pending = new PendingAdmin({
      username,
      email,
      password: hashedPassword,
      otp,
      otpExpires: Date.now() + 10 * 60 * 1000, // 10 mins
    });
    await pending.save();

    // send email
    await sendEmail({
      to: email,
      subject: "Admin Account Verification",
      html: `<h2>Verify Admin Account</h2>
             <p>Your OTP is <b>${otp}</b></p>
             <p>It expires in 10 minutes.</p>`,
    });

    res.json({ message: "OTP sent to email. Please verify to complete signup." });
  } catch (error) {
    console.error("Admin Signup Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// Step 2: Verify OTP
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const pendingAdmin = await PendingAdmin.findOne({ email });
    if (!pendingAdmin)
      return res
        .status(404)
        .json({ message: "Admin not found or already verified" });

    if (
      pendingAdmin.otp !== otp ||
      pendingAdmin.otpExpires < Date.now()
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // create admin
    const admin = new Admin({
      username: pendingAdmin.username,
      email: pendingAdmin.email,
      password: pendingAdmin.password,
      role: "admin",
      isVerified: true,
    });
    await admin.save();

    // remove pending
    await PendingAdmin.deleteOne({ email });

    res.json({ message: "Admin verified and created successfully." });
  } catch (error) {
    console.error("Verify Admin OTP Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Step 3: Resend OTP
router.post("/resend-otp", async (req, res) => {
  try {
    const { email } = req.body;

    const pendingAdmin = await PendingAdmin.findOne({ email });
    if (!pendingAdmin) {
      return res
        .status(404)
        .json({ message: "No pending admin found with this email" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    pendingAdmin.otp = otp;
    pendingAdmin.otpExpires = Date.now() + 10 * 60 * 1000;
    await pendingAdmin.save();

    await sendEmail({
      to: email,
      subject: "Resend Admin OTP",
      html: `<p>Your new OTP is <b>${otp}</b>. It will expire in 10 minutes.</p>`,
    });

    res.json({ message: "New OTP sent to admin email" });
  } catch (error) {
    console.error("Resend Admin OTP Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;