// models/Admin.js
import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // Role always admin
    role: { type: String, default: "admin" },

    // Verification fields
    isVerified: { type: Boolean, default: true }, // Admins usually verified by default
    otp: { type: String }, // for email verification (if needed)
    otpExpires: { type: Date },

    // Password reset
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },

    // Email change process
    pendingEmail: { type: String },
    emailChangeOtp: { type: String },
    emailChangeOtpExpiry: { type: Date },

    // Profile info
    profileImage: { type: String },
    cloudinaryPublicId: { type: String }, // Cloudinary public ID for image management
    phone: { type: String },
    bio: { type: String },
    address: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Admin", adminSchema);
