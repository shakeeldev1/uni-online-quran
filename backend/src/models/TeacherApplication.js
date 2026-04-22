import mongoose from "mongoose";

const teacherApplicationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    fatherName: {
      type: String,
      required: true,
      trim: true,
    },
    whatsapp: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    education: {
      type: String,
      required: true,
      trim: true,
    },
    specialization: {
      type: String,
      required: true,
      trim: true,
    },
    experience: {
      type: String,
      required: true,
      trim: true,
    },
    languages: [
      {
        type: String,
        trim: true,
      },
    ],
    courses: [
      {
        type: String,
        trim: true,
      },
    ],
    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },
    certificate: {
      type: String, // URL from Cloudinary
      default: "",
    },
    cnic: {
      type: String, // URL from Cloudinary
      default: "",
    },
    cv: {
      type: String, // URL from Cloudinary
      default: "",
    },
    about: {
      type: String,
      required: true,
      trim: true,
    },
    // Status tracking
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    notes: {
      type: String,
      default: "",
    },
    // Related user if approved and converted to tutor
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model(
  "TeacherApplication",
  teacherApplicationSchema
);
