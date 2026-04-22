import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    // Tokens
    refreshTokens: [String],

    // Password reset
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    passwordChangedAt: Date,

    // Email verification on signup
    isVerified: { type: Boolean, default: false },
    otp: { type: String },
    otpExpires: { type: Date },

    // Email change OTP
    pendingEmail: { type: String },
    emailChangeOtp: { type: String },
    emailChangeOtpExpiry: { type: Date },

    // Profile details ✨
    phone: { type: String },
    bio: { type: String, trim: true },
    address: { type: String, trim: true },
    profileImage: { type: String, default: "" }, // URL to cloud or uploads
    cloudinaryPublicId: { type: String }, // Cloudinary public ID for image management

    // Active Plan - stores user's current subscription plan
    activePlan: {
      name: { type: String, default: null },
      fee: { type: Number, default: null },
      activatedAt: { type: Date, default: null },
      features: [{ type: String }],
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
