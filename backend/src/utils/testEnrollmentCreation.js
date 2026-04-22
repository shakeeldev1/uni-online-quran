import express from "express";
import Enrollment from "../models/Enrollment.js";

const router = express.Router();

// Test endpoint to simulate Stripe webhook enrollment creation
router.post("/test-create-enrollment", async (req, res) => {
  try {
    const {
      paymentIntentId,
      customerName,
      customerEmail,
      courseName,
      amount,
      currency,
    } = req.body;

    console.log("🧪 TEST: Creating enrollment manually");
    console.log("   Payment ID:", paymentIntentId);
    console.log("   Customer:", customerName, customerEmail);
    console.log("   Course:", courseName);
    console.log("   Amount:", amount, currency);

    // Check if enrollment already exists
    const existingEnrollment = await Enrollment.findOne({ paymentIntentId });
    if (existingEnrollment) {
      console.log("⚠️ Enrollment already exists:", existingEnrollment._id);
      return res.json({
        success: true,
        message: "Enrollment already exists",
        enrollment: existingEnrollment,
      });
    }

    // Create enrollment
    const enrollmentData = {
      courseId: null,
      courseName: courseName || "Test Quran Course",
      instructor: "Test Instructor",
      instructorRole: "Teacher",
      price: amount?.toString() || "50",
      duration: "3 Months",
      sessions: 24,
      studentData: {
        fullName: customerName || "Test Student",
        email: customerEmail || "test@example.com",
        phone: "+1234567890",
        age: 25,
        gender: "Male",
        address: "Test Address",
        previousExperience: "Beginner",
        preferredTime: "Morning",
        learningGoals: "Learn Quran",
        additionalNotes: "Test enrollment from manual trigger",
      },
      status: "Approved",
      paymentIntentId: paymentIntentId || `test_pi_${Date.now()}`,
      amount: `${amount || 50} ${currency || "USD"}`,
      paymentStatus: "Completed",
      enrolledAt: new Date(),
      enrollmentDate: new Date(),
    };

    const newEnrollment = new Enrollment(enrollmentData);
    await newEnrollment.save();

    console.log("✅ TEST: Enrollment created successfully!");
    console.log("   Enrollment ID:", newEnrollment._id);

    res.json({
      success: true,
      message: "Test enrollment created successfully",
      enrollment: newEnrollment,
    });
  } catch (error) {
    console.error("❌ TEST ERROR:", error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Get all enrollments (for debugging)
router.get("/debug-enrollments", async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .sort({ createdAt: -1 })
      .limit(20);

    console.log(`📊 Found ${enrollments.length} enrollments in database`);

    res.json({
      success: true,
      count: enrollments.length,
      enrollments: enrollments.map(e => ({
        id: e._id,
        studentName: e.studentData?.fullName,
        studentEmail: e.studentData?.email,
        courseName: e.courseName,
        status: e.status,
        paymentStatus: e.paymentStatus,
        paymentIntentId: e.paymentIntentId,
        createdAt: e.createdAt,
      })),
    });
  } catch (error) {
    console.error("❌ Error fetching enrollments:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
