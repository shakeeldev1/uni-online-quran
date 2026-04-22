import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";

dotenv.config();

const router = express.Router();

// Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-12-18.acacia",
});

// Development mode logging helper
const devLog = (message, data = {}) => {
  if (process.env.NODE_ENV === "development") {
    console.log(`[WEBHOOK DEV] ${message}`, JSON.stringify(data, null, 2));
  }
};

// Helper function to process payment and create enrollment
const processPayment = async (paymentIntentId, metadata, amount, currency, billingDetails, res) => {
  console.log("=" .repeat(50));
  console.log("✅ STRIPE PAYMENT SUCCESSFUL");
  console.log("=".repeat(50));
  console.log("💳 Payment Intent ID:", paymentIntentId);
  console.log("💰 Amount:", amount, currency);
  console.log("📧 Customer Email:", billingDetails?.email);
  console.log("=" .repeat(50));

  try {
    const {
      customerName,
      customerEmail,
      planName,
      courseId,
      courseName,
      instructor,
      instructorRole,
      price,
      duration,
      sessions,
      originalAmount,
    } = metadata || {};

    devLog("📋 Metadata extracted from Stripe", metadata);

    // Check if this paymentIntent already has an enrollment (prevent duplicates)
    const existingEnrollment = await Enrollment.findOne({
      paymentIntentId: paymentIntentId,
    });

    if (existingEnrollment) {
      console.log("⚠️ DUPLICATE PREVENTED: Enrollment already exists for payment:", paymentIntentId);
      console.log("   Existing enrollment ID:", existingEnrollment._id);
      return { 
        received: true, 
        message: "Enrollment already exists",
        enrollmentId: existingEnrollment._id,
        duplicate: true
      };
    }

    // Convert amount from cents to display format
    const amountInDollars = (amount / 100).toFixed(2);

    // Create enrollment data
    const enrollmentData = {
      courseId: courseId || null,
      courseName: courseName || planName || "Quran Course",
      instructor: instructor || "To be assigned",
      instructorRole: instructorRole || "Teacher",
      price: price || originalAmount || amountInDollars,
      duration: duration || "3 Months",
      sessions: sessions ? parseInt(sessions) : 24,
      studentData: {
        fullName: customerName || billingDetails?.name || "Unknown",
        email: customerEmail || billingDetails?.email || "unknown@email.com",
        phone: billingDetails?.phone || "Not provided",
        age: 18,
        gender: "Male",
        address: billingDetails?.address?.line1 || "",
        previousExperience: "Beginner",
        preferredTime: "Not specified",
        learningGoals: "Learn Quran",
        additionalNotes: `Payment completed via Stripe - Payment ID: ${paymentIntentId}`,
      },
      status: "Approved",
      paymentIntentId: paymentIntentId,
      amount: `${amountInDollars} ${currency?.toUpperCase() || "USD"}`,
      paymentStatus: "Completed",
      enrolledAt: new Date(),
      enrollmentDate: new Date(),
    };

    // If courseId exists, verify the course exists in DB
    if (courseId) {
      try {
        const course = await Course.findById(courseId);
        if (!course) {
          console.log("⚠️ Course not found in database:", courseId);
          enrollmentData.courseId = null;
        } else {
          console.log("✅ Course verified:", course.title);
        }
      } catch (courseError) {
        console.log("⚠️ Error verifying course:", courseError.message);
        enrollmentData.courseId = null;
      }
    }

    // Create the enrollment
    const newEnrollment = new Enrollment(enrollmentData);
    await newEnrollment.save();

    console.log("=".repeat(50));
    console.log("✅ ENROLLMENT CREATED SUCCESSFULLY");
    console.log("=".repeat(50));
    console.log("🆔 Enrollment ID:", newEnrollment._id);
    console.log("👤 Student:", customerName, "-", customerEmail);
    console.log("📚 Course:", planName || courseName);
    console.log("💵 Amount:", amountInDollars, currency?.toUpperCase());
    console.log("🔒 Payment ID:", paymentIntentId);
    console.log("📅 Enrolled At:", newEnrollment.enrolledAt);
    console.log("=".repeat(50));

    return {
      received: true,
      enrollmentId: newEnrollment._id
    };

  } catch (error) {
    console.error("=".repeat(50));
    console.error("❌ ERROR CREATING ENROLLMENT FROM WEBHOOK");
    console.error("=".repeat(50));
    console.error("Error:", error.message);
    console.error("Stack:", error.stack);
    console.error("=".repeat(50));
    throw error;
  }
};

// Webhook endpoint for Stripe
// NOTE: This must be BEFORE express.json() middleware for raw body
router.post(
  "/stripe",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    // Debug: Log incoming webhook event type
    devLog("📦 Received webhook event", { 
      type: req.headers["stripe-signature"] ? "signed" : "unsigned",
      bodyLength: req.body?.length 
    });

    try {
      // Verify webhook signature
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
      
      devLog("✅ Webhook signature verified", { eventType: event.type });
      console.log(`📦 Stripe Webhook Event: ${event.type}`);
    } catch (err) {
      console.error("❌ Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle checkout.session.completed event (Stripe Checkout)
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const result = await processPayment(
        session.payment_intent, 
        session.metadata, 
        session.amount_total, 
        session.currency, 
        session.customer_details,
        res
      );
      return res.status(200).json(result);
    }

    // Handle payment_intent.succeeded event (PaymentIntents API - used by CardElement)
    else if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object;
      const result = await processPayment(
        paymentIntent.id, 
        paymentIntent.metadata, 
        paymentIntent.amount, 
        paymentIntent.currency, 
        paymentIntent.billing_details,
        res
      );
      return res.status(200).json(result);
    }

    // Handle other Stripe event types (for logging)
    else if (event.type) {
      console.log(`📦 Other Stripe event received: ${event.type}`);
    }

    // Return 200 response to acknowledge receipt of the event
    res.status(200).json({ received: true });
  }
);

export default router;
