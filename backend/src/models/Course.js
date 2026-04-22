import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ["Nazra", "Hifz", "Tajweed", "Advanced", "Beginner"],
      default: "Beginner",
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Completed", "Upcoming"],
      default: "Upcoming",
    },
    instructorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tutor",
      required: true,
    },
    studentsEnrolled: {
      type: Number,
      default: 0,
      min: 0,
    },
    duration: {
      type: String,
      required: true,
    },
    sessions: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: String,
      required: true,
    },

    // Course thumbnail with Cloudinary
    thumbnail: {
      type: String,
      default: "",
    },
    cloudinaryPublicId: {
      type: String,
    },

    // Course description
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
