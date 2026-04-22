import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
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
    phone: {
      type: String,
      required: true,
    },
    class: {
      type: String,
      enum: ["Nazra", "Hifz", "Tajweed", "Advanced", "Beginner"],
      default: "Beginner",
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Pending", "Graduated"],
      default: "Pending",
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },
    age: {
      type: Number,
      required: true,
      min: 5,
      max: 100,
    },

    // Profile image with Cloudinary
    profileImage: {
      type: String,
      default: "",
    },
    cloudinaryPublicId: {
      type: String,
    },

    // Authentication tokens
    refreshTokens: [String],

    // Password reset
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    passwordChangedAt: Date,

    // Email verification
    otp: { type: String },
    otpExpires: { type: Date },

    // Email change OTP
    pendingEmail: { type: String },
    emailChangeOtp: { type: String },
    emailChangeOtpExpiry: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
