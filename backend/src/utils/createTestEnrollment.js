import express from "express";
import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";

const router = express.Router();

// Simple test endpoint to create enrollment directly (bypasses payment)
// Use this to test if the admin dashboard can display enrollments
router.post("/create-test-enrollment", async (req, res) => {
  try {
    console.log("\n" + "=".repeat(60));
    console.log("🧪 Creating Test Enrollment (No Payment Required)");
    console.log("=".repeat(60));

    const testEnrollment = new Enrollment({
      courseId: null,
      courseName: "Test Quran Course",
      instructor: "Test Instructor",
      instructorRole: "Teacher",
      price: "49.99",
      duration: "3 Months",
      sessions: 24,
      studentData: {
        fullName: "Test Student",
        email: "test-" + Date.now() + "@example.com",
        phone: "+1234567890",
        age: 25,
        gender: "Male",
        address: "123 Test Street, Test City",
        previousExperience: "Beginner",
        preferredTime: "Morning",
        learningGoals: "Learn Quran properly",
        additionalNotes: "Test enrollment - no actual payment",
      },
      status: "Approved",
      paymentIntentId: `test_${Date.now()}`,
      amount: "49.99 USD",
      paymentStatus: "Completed",
      enrolledAt: new Date(),
      enrollmentDate: new Date(),
    });

    await testEnrollment.save();

    console.log("✅ Test Enrollment Created Successfully!");
    console.log("   ID:", testEnrollment._id);
    console.log("   Email:", testEnrollment.studentData.email);
    console.log("   Course:", testEnrollment.courseName);
    console.log("   Status:", testEnrollment.status);
    console.log("=".repeat(60) + "\n");

    res.json({
      success: true,
      message: "Test enrollment created successfully",
      enrollment: {
        id: testEnrollment._id,
        courseName: testEnrollment.courseName,
        studentName: testEnrollment.studentData.fullName,
        studentEmail: testEnrollment.studentData.email,
        status: testEnrollment.status,
        paymentStatus: testEnrollment.paymentStatus,
        amount: testEnrollment.amount,
        enrolledAt: testEnrollment.enrolledAt,
      },
    });
  } catch (error) {
    console.error("❌ Error creating test enrollment:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export default router;
