import express from "express";
import Enrollment from "../models/Enrollment.js";

const router = express.Router();

// Create sample enrollments for testing
router.get("/create-sample-enrollments", async (req, res) => {
  try {
    const sampleEnrollments = [
      {
        courseId: null,
        courseName: "Quran Memorization (Hifz)",
        instructor: "Sheikh Ahmad",
        instructorRole: "Teacher",
        price: "150",
        duration: "12 Months",
        sessions: 120,
        studentData: {
          fullName: "Ahmed Khan",
          email: "ahmed.khan@example.com",
          phone: "+1234567890",
          age: 12,
          gender: "Male",
          address: "123 Main Street, City",
          previousExperience: "Beginner",
          preferredTime: "Morning",
          learningGoals: "Memorize the entire Quran",
          additionalNotes: "Very enthusiastic student",
        },
        status: "Pending",
        paymentIntentId: `sample_pi_1_${Date.now()}`,
        amount: "150 USD",
        paymentStatus: "Completed",
        enrolledAt: new Date(),
        enrollmentDate: new Date(),
      },
      {
        courseId: null,
        courseName: "Tajweed Rules",
        instructor: "Ustad Muhammad",
        instructorRole: "Teacher",
        price: "75",
        duration: "3 Months",
        sessions: 24,
        studentData: {
          fullName: "Fatima Ali",
          email: "fatima.ali@example.com",
          phone: "+1234567891",
          age: 25,
          gender: "Female",
          address: "456 Oak Avenue, Town",
          previousExperience: "Intermediate",
          preferredTime: "Evening",
          learningGoals: "Learn proper Tajweed",
          additionalNotes: "Has some prior knowledge",
        },
        status: "Approved",
        paymentIntentId: `sample_pi_2_${Date.now()}`,
        amount: "75 USD",
        paymentStatus: "Completed",
        enrolledAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        enrollmentDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
      {
        courseId: null,
        courseName: "Nazra Quran",
        instructor: "Dr. Hassan",
        instructorRole: "Teacher",
        price: "100",
        duration: "6 Months",
        sessions: 48,
        studentData: {
          fullName: "Yusuf Ibrahim",
          email: "yusuf.ibrahim@example.com",
          phone: "+1234567892",
          age: 30,
          gender: "Male",
          address: "789 Pine Road, Village",
          previousExperience: "Beginner",
          preferredTime: "Afternoon",
          learningGoals: "Learn to read Quran fluently",
          additionalNotes: "",
        },
        status: "Completed",
        paymentIntentId: `sample_pi_3_${Date.now()}`,
        amount: "100 USD",
        paymentStatus: "Completed",
        enrolledAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        enrollmentDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      },
      {
        courseId: null,
        courseName: "Islamic Studies",
        instructor: "Dr. Sarah",
        instructorRole: "Teacher",
        price: "50",
        duration: "3 Months",
        sessions: 24,
        studentData: {
          fullName: "Aisha Mohammed",
          email: "aisha.mohammed@example.com",
          phone: "+1234567893",
          age: 18,
          gender: "Female",
          address: "321 Cedar Lane, City",
          previousExperience: "Beginner",
          preferredTime: "Weekend",
          learningGoals: "Basic Islamic knowledge",
          additionalNotes: "Interested in prayer and Dua",
        },
        status: "Rejected",
        paymentIntentId: `sample_pi_4_${Date.now()}`,
        amount: "50 USD",
        paymentStatus: "Failed",
        enrolledAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        enrollmentDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      },
    ];

    // Clear existing sample enrollments and create new ones
    await Enrollment.deleteMany({
      "studentData.email": {
        $in: [
          "ahmed.khan@example.com",
          "fatima.ali@example.com",
          "yusuf.ibrahim@example.com",
          "aisha.mohammed@example.com",
        ],
      },
    });

    const createdEnrollments = await Enrollment.insertMany(sampleEnrollments);

    console.log("✅ Sample enrollments created:", createdEnrollments.length);

    res.json({
      success: true,
      message: `Created ${createdEnrollments.length} sample enrollments`,
      enrollments: createdEnrollments,
    });
  } catch (error) {
    console.error("❌ Error creating sample enrollments:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export default router;
