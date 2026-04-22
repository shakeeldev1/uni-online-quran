import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    image: {
      type: String,
      default: "",
    },
    cloudinaryPublicId: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);
