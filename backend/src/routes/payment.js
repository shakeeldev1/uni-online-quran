// import express from "express";
// import Stripe from "stripe";

// const router = express.Router();

// // Initialize Stripe with secret key from environment variable
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// // Create payment intent
// router.post("/create-payment-intent", async (req, res) => {
//   try {
//     const { amount, currency, planName, customerName, customerEmail, metadata } = req.body;

//     // Validate required fields
//     if (!amount || !currency) {
//       return res.status(400).json({ error: "Amount and currency are required" });
//     }

//     // Create payment intent with Stripe
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: Math.round(amount), // Stripe expects amounts in cents
//       currency: currency,
//       automatic_payment_methods: {
//         enabled: true,
//       },
//       metadata: {
//         planName: planName || "Quran Course",
//         customerName: customerName || "",
//         customerEmail: customerEmail || "",
//         originalCurrency: metadata?.originalCurrency || currency,
//         originalAmount: metadata?.originalAmount || amount,
//       },
//       // Optional: Send receipt email
//       receipt_email: customerEmail,
//     });

//     res.json({
//       clientSecret: paymentIntent.client_secret,
//       paymentIntentId: paymentIntent.id,
//     });
//   } catch (error) {
//     console.error("Stripe Error:", error);
//     res.status(500).json({ error: error.message });
//   }
// });

// // Verify payment status
// router.get("/verify-payment/:paymentIntentId", async (req, res) => {
//   try {
//     const { paymentIntentId } = req.params;

//     const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

//     res.json({
//       status: paymentIntent.status,
//       amount: paymentIntent.amount,
//       currency: paymentIntent.currency,
//       metadata: paymentIntent.metadata,
//     });
//   } catch (error) {
//     console.error("Stripe Error:", error);
//     res.status(500).json({ error: error.message });
//   }
// });

// export default router;

// src/routes/payment.js
import express from "express";
import dotenv from "dotenv";
import Stripe from "stripe";

dotenv.config(); // Must come first

const router = express.Router();

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

// Debug: check if key loaded
console.log("Stripe Key Loaded:", !!process.env.STRIPE_SECRET_KEY);

// ================= CREATE PAYMENT INTENT =================
router.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount, currency, planName, customerName, customerEmail, metadata } = req.body;

    if (!amount || !currency) {
      return res.status(400).json({ error: "Amount and currency are required" });
    }

    // Convert to smallest currency unit (e.g., cents/paisa)
    const smallestUnitAmount = Math.round(amount * 100);

    // Enforce minimum Stripe amount (50 cents USD equivalent)
    if (smallestUnitAmount < 50) {
      return res.status(400).json({
        error: `Minimum payment is 50 cents. You entered ${amount} ${currency}.`,
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: smallestUnitAmount,
      currency: currency,
      automatic_payment_methods: { enabled: true },
      metadata: {
        planName: planName || "Quran Course",
        customerName: customerName || "",
        customerEmail: customerEmail || "",
        originalCurrency: metadata?.originalCurrency || currency,
        originalAmount: metadata?.originalAmount || amount,
        courseId: metadata?.courseId || "",
        courseName: metadata?.courseName || planName || "Quran Course",
        instructor: metadata?.instructor || "To be assigned",
        instructorRole: metadata?.instructorRole || "Teacher",
        price: metadata?.price || amount,
        duration: metadata?.duration || "3 Months",
        sessions: metadata?.sessions || "24",
      },
      receipt_email: customerEmail,
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// ================= VERIFY PAYMENT STATUS =================
router.get("/verify-payment/:paymentIntentId", async (req, res) => {
  try {
    const { paymentIntentId } = req.params;

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    res.json({
      status: paymentIntent.status,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      metadata: paymentIntent.metadata,
    });
  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;