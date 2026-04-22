# Stripe Webhook Integration Guide

## Overview

This document explains how the Stripe webhook integration works in your Online Quran project to automatically create enrollments when a payment is successful.

## Architecture

```
User Payment → Stripe → Webhook Endpoint → MongoDB → Admin Dashboard
```

## Flow Diagram

1. **User initiates payment** via PaymentModal
2. **Backend creates PaymentIntent** with metadata (name, email, course info)
3. **Stripe processes payment** and sends webhook to your server
4. **Webhook verifies signature** using STRIPE_WEBHOOK_SECRET
5. **Enrollment created** in MongoDB with payment details
6. **Admin Dashboard** automatically shows new enrollment

## Required Environment Variables

### Backend (.env)

```
env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Database
MONGO_URI=mongodb://localhost:27017/online-quran

# Server
PORT=5000
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)

```
env
# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key

# API (optional - defaults to localhost:5000)
VITE_API_URL=http://localhost:5000
```

## API Endpoints

### Webhook Endpoint
```
POST /webhook/stripe
```

This endpoint:
- Uses raw body parser (configured in server.js)
- Verifies Stripe signature
- Handles `checkout.session.completed` event
- Creates enrollment automatically
- Prevents duplicate enrollments using paymentIntentId

### Enrollments API

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | /api/enrollments | Get all enrollments | Admin |
| GET | /api/enrollments/stats | Get enrollment stats | Admin |
| POST | /api/enrollments | Create enrollment | Public |
| PUT | /api/enrollments/:id/status | Update status | Admin |
| DELETE | /api/enrollments/:id | Delete enrollment | Admin |

## Testing the Webhook

### Option 1: Stripe CLI (Recommended)

1. **Install Stripe CLI**: https://stripe.com/docs/stripe-cli

2. **Login to Stripe**:
   
```
bash
   stripe login
   
```

3. **Start listening to webhooks**:
   
```
bash
   stripe listen --forward-to localhost:5000/webhook/stripe
   
```

4. **Copy the webhook secret** (starts with `whsec_`) to your `.env`:
   
```
   STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxx
   
```

5. **Make a test payment** using Stripe test cards:
   - Card: 4242 4242 4242 4242
   - Exp: Any future date (e.g., 12/30)
   - CVC: Any 3 digits (e.g., 123)

### Option 2: Test API

Use the test endpoint to create a test enrollment directly:

```
bash
curl -X POST http://localhost:5000/api/test-direct-enrollment
```

Or use Postman to call:
```
POST http://localhost:5000/api/test-direct-enrollment
```

## Enrollment Schema

The Enrollment model includes:

```
javascript
{
  // Course Information
  courseId: mongoose.Schema.Types.ObjectId,
  courseName: String,
  instructor: String,
  instructorRole: String,
  price: String,
  duration: String,
  sessions: Number,

  // Student Information
  studentData: {
    fullName: String,
    email: String,
    phone: String,
    age: Number,
    gender: String,
    address: String,
    previousExperience: String,
    preferredTime: String,
    learningGoals: String,
    additionalNotes: String
  },

  // Status
  status: 'Pending' | 'Approved' | 'Rejected' | 'Completed',

  // Payment Information
  paymentIntentId: String (unique),
  amount: String,
  paymentStatus: 'Pending' | 'Completed' | 'Failed' | 'Refunded',
  enrolledAt: Date,
  enrollmentDate: Date
}
```

## Webhook Security

The webhook endpoint:
1. ✅ Verifies Stripe signature using `STRIPE_WEBHOOK_SECRET`
2. ✅ Uses raw body parser (not JSON)
3. ✅ Prevents duplicate enrollments via paymentIntentId
4. ✅ Validates event type before processing

## Frontend Integration

### Payment Flow

1. User selects a course/plan
2. PaymentModal collects user info (name, email)
3. Backend creates PaymentIntent with metadata
4. User enters card details
5. Stripe processes payment
6. On success → Stripe sends webhook
7. Backend creates enrollment automatically
8. User redirected to success page

### Admin Dashboard

The EnrollmentsPage.jsx automatically fetches all enrollments:
- Uses `getAllEnrollments()` from enrollmentsAPI
- Requires admin authentication
- Displays payment status, amount, date
- Allows status updates and management

## Troubleshooting

### Webhook Not Receiving Events

1. Check Stripe dashboard → Developers → Webhooks
2. Verify endpoint URL is correct
3. Check webhook secret matches in .env
4. Use Stripe CLI to test: `stripe listen`

### Duplicate Enrollments

The webhook prevents duplicates using `paymentIntentId`. If duplicates occur:
- Check if payment was retried
- Verify webhook isn't being sent multiple times

### Enrollment Not Created

Check server logs for:
- Signature verification errors
- MongoDB connection issues
- Missing metadata in session

## Files Reference

| File | Purpose |
|------|---------|
| `backend/src/routes/webhook.js` | Stripe webhook handler |
| `backend/src/routes/enrollments.js` | Enrollment API routes |
| `backend/src/models/Enrollment.js` | Enrollment schema |
| `backend/src/server.js` | Express server setup |
| `frontend/src/features/enrollmentsAPI.js` | Frontend API calls |
| `frontend/src/Dashboard/EnrollmentsPage.jsx` | Admin dashboard |

## Development Tips

1. Use Stripe test mode for development
2. Check Stripe CLI logs for webhook events
3. Use MongoDB Compass to verify enrollments
4. Check browser console for frontend errors

## Production Checklist

- [ ] Set STRIPE_SECRET_KEY to live key
- [ ] Set STRIPE_WEBHOOK_SECRET from Stripe Dashboard
- [ ] Enable SSL/HTTPS
- [ ] Configure proper CORS settings
- [ ] Set up proper error logging
- [ ] Test webhook endpoint with real payments
