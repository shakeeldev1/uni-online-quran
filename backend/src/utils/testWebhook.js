/**
 * Stripe Webhook Test Script
 * 
 * This script simulates a Stripe checkout.session.completed webhook event
 * to test the enrollment creation functionality.
 * 
 * Usage:
 * 1. Make sure your server is running: npm run dev
 * 2. Run this script: node src/utils/testWebhook.js
 * 
 * Or send a request to this endpoint from Postman/curl
 */

import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-12-18.acacia",
});

// Test endpoint to simulate webhook (for development only)
router.post("/test-webhook-enrollment", async (req, res) => {
  try {
    console.log("\n" + "=".repeat(60));
    console.log("🧪 TEST: Simulating Stripe Payment Success");
    console.log("=".repeat(60));

    // Create a test checkout session
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Quran Learning Course - Premium",
              description: "3 months online Quran learning with certified teachers",
            },
            unit_amount: 4999, // $49.99
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${frontendUrl}/success`,
      cancel_url: `${frontendUrl}/fee`,
      customer_email: "test-student@example.com",
      metadata: {
        customerName: "Test Student",
        customerEmail: "test-student@example.com",
        planName: "Quran Learning Course - Premium",
        courseName: "Quran Learning Course - Premium",
        instructor: "To be assigned",
        instructorRole: "Teacher",
        price: "49.99",
        duration: "3 Months",
        sessions: "24",
        courseId: "",
        originalCurrency: "USD",
        originalAmount: "49.99",
      },
    });

    console.log("✅ Test Checkout Session Created");
    console.log("   Session ID:", session.id);
    console.log("   Payment Intent:", session.payment_intent);
    console.log("\n📋 To complete the test:");
    console.log("   1. Complete the payment using Stripe test card: 4242 4242 4242 4242");
    console.log("   2. Stripe will send a webhook to your /webhook/stripe endpoint");
    console.log("   3. Check your database for a new enrollment");
    console.log("=".repeat(60) + "\n");

    res.json({
      success: true,
      message: "Test checkout session created",
      sessionId: session.id,
      paymentIntentId: session.payment_intent,
      checkoutUrl: session.url,
    });
  } catch (error) {
    console.error("❌ Test failed:", error);
    res.status(500).json({ error: error.message });
  }
});

// Alternative: Direct test enrollment without Stripe
router.post("/test-direct-enrollment", async (req, res) => {
  try {
    // Import here to avoid circular dependencies
    const Enrollment = (await import("../models/Enrollment.js")).default;
    
    const testEnrollment = new Enrollment({
      courseId: null,
      courseName: "Test Course - Direct",
      instructor: "Test Instructor",
      instructorRole: "Teacher",
      price: "49.99",
      duration: "3 Months",
      sessions: 24,
      studentData: {
        fullName: "Direct Test Student",
        email: "direct-test@example.com",
        phone: "+1234567890",
        age: 25,
        gender: "Male",
        address: "123 Test Street",
        previousExperience: "Beginner",
        preferredTime: "Morning",
        learningGoals: "Learn Quran properly",
        additionalNotes: "Test enrollment created directly",
      },
      status: "Approved",
      paymentIntentId: `test_pi_${Date.now()}`,
      amount: "49.99 USD",
      paymentStatus: "Completed",
      enrolledAt: new Date(),
      enrollmentDate: new Date(),
    });

    await testEnrollment.save();

    console.log("✅ Direct test enrollment created:");
    console.log("   ID:", testEnrollment._id);
    console.log("   Email:", testEnrollment.studentData.email);

    res.json({
      success: true,
      message: "Test enrollment created",
      enrollment: testEnrollment,
    });
  } catch (error) {
    console.error("❌ Direct test failed:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
