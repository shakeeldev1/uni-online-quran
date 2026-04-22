import dotenv from "dotenv";
dotenv.config();

// ============== ENVIRONMENT VARIABLE VALIDATION ==============
const requiredEnvVars = [
  "MONGO_URI",
  "JWT_SECRET",
  "JWT_REFRESH_SECRET",
  "PORT",
  "FRONTEND_URL",
  "EMAIL_USER",
  "EMAIL_PASS",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
  "STRIPE_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET",
  "STRIPE_PUBLISHABLE_KEY",
];

const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);

if (missingVars.length > 0) {
  console.error("❌ MISSING ENVIRONMENT VARIABLES:");
  missingVars.forEach((varName) => console.error(`   - ${varName}`));
  console.error("\n⚠️  Please set these variables in your .env file");
  process.exit(1);
}

console.log("✅ All required environment variables are set");
// ============================================================

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

// Import routes synchronously
import authRoutes from "./routes/auth.js";
import adminAuthRoutes from "./routes/adminAuth.js";
import protectedRoutes from "./routes/protected.js";
import usersRoutes from "./routes/users.js";
import tutorsRoutes from "./routes/tutors.js";
import studentsRoutes from "./routes/students.js";
import coursesRoutes from "./routes/courses.js";
import servicesRoutes from "./routes/services.js";
import enrollmentsRoutes from "./routes/enrollments.js";
import contactRoutes from "./routes/contact.js";
import statisticsRoutes from "./routes/statistics.js";
import paymentRoutes from "./routes/payment.js";
import plansRoutes from "./routes/plans.js";
import teacherApplicationsRoutes from "./routes/teacherApplications.js";
import webhookRoutes from "./routes/webhook.js";
import testWebhookRouter from "./utils/testWebhook.js";
import createTestEnrollmentRouter from "./utils/createTestEnrollment.js";
import createSampleEnrollmentsRouter from "./utils/createSampleEnrollments.js";
import testEnrollmentCreationRouter from "./utils/testEnrollmentCreation.js";
import createManualEnrollmentRouter from "./utils/createManualEnrollment.js";
import testRoutes from "./routes/test.js";

const PORT = process.env.PORT || 5000;

const app = express();

// IMPORTANT: Stripe webhook needs raw body - add BEFORE express.json()
app.use("/webhook", express.raw({ type: "application/json" }));

app.use(express.json());
app.use(cookieParser());

// allow frontend (React) to talk to backend
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // http://localhost:5173
    credentials: true,
  })
);
  
// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/auth/admin", adminAuthRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/tutors", tutorsRoutes);
app.use("/api/students", studentsRoutes);
app.use("/api/courses", coursesRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/enrollments", enrollmentsRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/statistics", statisticsRoutes);
app.use("/api", paymentRoutes);
app.use("/api/plans", plansRoutes);
app.use("/api/teacher-applications", teacherApplicationsRoutes);

// Stripe webhook endpoint (raw body parser applied above)
app.use("/webhook", webhookRoutes);

// Test endpoints (development only)
app.use("/api", testWebhookRouter);
app.use("/api", createTestEnrollmentRouter);
app.use("/api", createSampleEnrollmentsRouter);
app.use("/api", testEnrollmentCreationRouter);
app.use("/api", createManualEnrollmentRouter);
app.use("/api/test", testRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ DB Error:", err));

mongoose.connection.on("connected", () => {
  console.log(`✅ Connected to MongoDB database: ${mongoose.connection.name}`);
});

app.get("/hello", (req, res) => {
  res.json({
    message: "Online Quran Backend API",
    version: "1.0.0",
    features: [
      "Authentication",
      "Email Verification",
      "Cloudinary Integration",
    ],
    status: "Running",
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handler
app.use((error, req, res, next) => {
  console.error("❌ Server Error:", error);
  res.status(500).json({
    message: "Internal server error",
    error:
      process.env.NODE_ENV === "development"
        ? error.message
        : "Something went wrong",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🔗 Frontend URL: ${process.env.FRONTEND_URL}`);
});
