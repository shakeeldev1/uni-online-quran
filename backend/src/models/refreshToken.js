import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema(
  {
    token: { type: String, required: true }, // the actual refresh token
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // link to user
    expiryDate: { type: Date, required: true }, // optional expiry date
  },
  { timestamps: true }
);

export default mongoose.model("RefreshToken", refreshTokenSchema);
