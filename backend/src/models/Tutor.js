import mongoose from "mongoose";

const tutorSchema = new mongoose.Schema(
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

    // Tutor specific fields
    role: {
      type: String,
      enum: ["Qari", "Hafiz", "Teacher", "Imam"],
      default: "Teacher",
    },

    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },

    experience: {
      type: String,
      default: "0 Years",
    },

    studentsAssigned: {
      type: Number,
      default: 0,
    },

    reviews: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    // Status and verification
    isVerified: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    // Contact details
    phone: {
      type: String,
    },

    bio: {
      type: String,
      trim: true,
    },

    address: {
      type: String,
      trim: true,
    },

    // Profile details
    profileImage: {
      type: String,
      default: "",
    },

    cloudinaryPublicId: {
      type: String,
    },

    // Qualifications and certifications
    qualifications: [
      {
        type: String,
        trim: true,
      },
    ],

    certifications: [
      {
        type: String,
        trim: true,
      },
    ],

    // Teaching preferences
    teachingSubjects: [
      {
        type: String,
        enum: [
          "Quran Reading",
          "Tajweed",
          "Hifz",
          "Islamic Studies",
          "Arabic",
          "Tafseer",
        ],
      },
    ],

    availableHours: {
      type: String,
      default: "Not specified",
    },

    // Tokens for authentication
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

export default mongoose.model("Tutor", tutorSchema);
