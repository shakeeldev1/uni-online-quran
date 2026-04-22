// models/PendingAdmin.js
import mongoose from "mongoose";

const pendingAdminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // already hashed
  otp: { type: String, required: true },
  otpExpires: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now, expires: 604800 }, // auto-delete after 7 days
});

export default mongoose.model("PendingAdmin", pendingAdminSchema);
