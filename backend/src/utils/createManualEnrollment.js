/**
 * Manual Enrollment Creation Utility
 * 
 * This endpoint allows creating an enrollment directly from the frontend
 * after successful payment, as a fallback in case the webhook doesn't work.
 * 
 * Usage:
 * POST /api/create-enrollment-from-payment
 * {
 *   paymentIntentId: "pi_xxx",
 *   customerName: "John Doe",
 *   customerEmail: "john@example.com",
 *   courseName: "Quran Learning Course",
 *   price: "49.99",
 *   duration: "3 Months",
 *   sessions: 24,
 *   instructor: "To be assigned"
 * }
 */

import express from "express";
import Enrollment from "../models/Enrollment.js";

const router = express.Router();

router.post("/create-enrollment-from-payment", async (req, res) => {
  try {
    const {
      paymentIntentId,
      customerName,
      customerEmail,
      courseName,
      price,
      duration,
      sessions,
      instructor,
      instructorRole,
      phone,
    } = req.body;

    // Validate required fields
    if (!paymentIntentId || !customerName || !customerEmail) {
      return res.status(400).json({
        success: false,
        message: "paymentIntentId, customerName, and customerEmail are required"
      });
    }

    // Check if enrollment already exists for this payment
    const existingEnrollment = await Enrollment.findOne({ paymentIntentId });
    
    if (existingEnrollment) {
      return res.status(400).json({
        success: false,
        message: "Enrollment already exists for this payment",
        enrollment: existingEnrollment
      });
    }

    // Create new enrollment
    const newEnrollment = new Enrollment({
      courseId: null,
      courseName: courseName || "Quran Course",
      instructor: instructor || "To be assigned",
      instructorRole: instructorRole || "Teacher",
      price: price || "0",
      duration: duration || "3 Months",
      sessions: sessions || 24,
      studentData: {
        fullName: customerName,
        email: customerEmail,
        phone: phone || "Not provided",
        age: 18,
        gender: "Male",
        address: "",
        previousExperience: "Beginner",
        preferredTime: "Not specified",
        learningGoals: "Learn Quran",
        additionalNotes: `Payment completed via Stripe - Payment ID: ${paymentIntentId}`,
      },
      status: "Approved",
      paymentIntentId: paymentIntentId,
      amount: `${price || "0"} USD`,
      paymentStatus: "Completed",
      enrolledAt: new Date(),
      enrollmentDate: new Date(),
    });

    await newEnrollment.save();

    console.log("✅ Enrollment created from payment:");
    console.log("   ID:", newEnrollment._id);
    console.log("   Student:", customerName, "-", customerEmail);
    console.log("   Course:", courseName);
    console.log("   Payment ID:", paymentIntentId);

    res.status(201).json({
      success: true,
      message: "Enrollment created successfully",
      enrollment: newEnrollment
    });

  } catch (error) {
    console.error("❌ Error creating enrollment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create enrollment",
      error: error.message
    });
  }
});

export default router;
