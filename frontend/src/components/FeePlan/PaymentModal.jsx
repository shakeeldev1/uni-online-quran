import React, { useState, useMemo, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";

// Initialize Stripe with the publishable key from environment variable
const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

if (!stripePublishableKey) {
  console.error("VITE_STRIPE_PUBLISHABLE_KEY is not set in environment variables");
}

// Create stripe promise once at module level
const stripePromise = stripePublishableKey 
  ? loadStripe(stripePublishableKey)
  : Promise.reject(new Error("Stripe key not configured"));

// Currency configurations
const currencyConfig = {
  PKR: { currency: "pkr", symbol: "PKR", minAmount: 5000 },
  USD: { currency: "usd", symbol: "$", minAmount: 35 },
  GBP: { currency: "gbp", symbol: "£", minAmount: 25 },
};

// Conversion rates to USD (base currency for Stripe)
const conversionToUSD = {
  PKR: 1 / 280,
  USD: 1,
  GBP: 1 / 1.35,
};

// Inner form component that uses Stripe hooks
const PaymentForm = ({ plan, currency, onClose, onSuccess }) => {
  const { user } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("idle"); // idle, processing, success, failure

  // Get customer name and email from logged-in user
  const customerName = user?.username || "Guest";
  const customerEmail = user?.email || "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setPaymentStatus("processing");
    setError(null);

    try {
      // Convert the plan fee to USD (Stripe's base currency)
      const feeInPKR = plan.fee;
      const feeInUSD = feeInPKR * conversionToUSD[currency];

      // Create payment intent on the backend
      // Use relative path for both development and production
      const API_BASE_URL = import.meta.env.VITE_API_URL || "";
      const response = await fetch(`${API_BASE_URL}/create-payment-intent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Math.round(feeInUSD * 100) / 100, // Amount in dollars (backend multiplies by 100)
          currency: currencyConfig[currency].currency,
          planName: plan.name,
          customerName: customerName,
          customerEmail: customerEmail,
          metadata: {
            planName: plan.name,
            customerName: userData.name,
            customerEmail: userData.email,
            originalCurrency: currency,
            originalAmount: plan.fee,
            courseId: plan._id || "",
            courseName: plan.name || "Quran Course",
            instructor: plan.instructor || "To be assigned",
            instructorRole: plan.instructorRole || "Teacher",
            price: plan.fee || feeInUSD.toFixed(2),
            duration: plan.duration || "3 Months",
            sessions: plan.sessions || "24",
          },
        }),
      });

      const data = await response.json();
      const { clientSecret, error: backendError } = data;

      if (!response.ok || backendError) {
        console.error("Backend error response:", data);
        throw new Error(backendError || `Backend error: ${response.status}`);
      }

      if (!clientSecret) {
        console.error("Missing clientSecret in response:", data);
        throw new Error("Payment initialization failed - no client secret received from server");
      }

      // Confirm the payment with Stripe
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: customerName,
              email: customerEmail,
            },
          },
        }
      );

      if (stripeError) {
        setError(stripeError.message);
        setPaymentStatus("failure");
        toast.error(`Payment failed: ${stripeError.message}`);
      } else if (paymentIntent.status === "succeeded") {
        setPaymentStatus("success");
        toast.success("Payment successful!");
        
        // Create enrollment in backend after successful payment
        try {
          const API_BASE_URL = import.meta.env.VITE_API_URL || "";
          const enrollmentResponse = await fetch(`${API_BASE_URL}/enrollments`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              courseId: plan._id || "",
              courseName: plan.name || "Quran Course",
              price: plan.fee,
              duration: plan.duration || "3 Months",
              sessions: plan.sessions || "24",
              instructor: plan.instructor || "To be assigned",
              instructorRole: plan.instructorRole || "Teacher",
              paymentIntentId: paymentIntent.id,
              studentData: {
                fullName: customerName,
                email: customerEmail,
              },
            }),
          });
          
          const enrollmentData = await enrollmentResponse.json();
          if (enrollmentData.success || enrollmentData._id) {
            console.log("✅ Enrollment created:", enrollmentData);
            toast.success("Enrollment created successfully!");
          } else if (enrollmentData.message !== "Enrollment already exists for this payment") {
            console.warn("⚠️ Enrollment creation note:", enrollmentData.message);
          }
        } catch (enrollmentError) {
          console.error("⚠️ Error creating enrollment:", enrollmentError);
          // Don't block the flow - payment was successful
        }
        
        // Navigate to success page after a short delay
        setTimeout(() => {
          onSuccess(paymentIntent.id);
        }, 1500);
      }
    } catch (err) {
      setError(err.message || "An error occurred during payment");
      setPaymentStatus("failure");
      toast.error(`Payment failed: ${err.message}`);
    } finally {
      setProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#9e2146",
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Customer Info Display */}
      <div className="bg-gray-50 p-4 rounded-lg mb-4">
        <h4 className="font-semibold text-gray-700 mb-2">Payment Details</h4>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Plan:</span> {plan.name}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Amount:</span> {plan.fee} {currencyConfig[currency].symbol}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Name:</span> {userData.name}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Email:</span> {userData.email}
        </p>
      </div>

      {/* Card Element */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Card Information
        </label>
        <div className="border rounded-lg p-3 bg-white">
          <CardElement options={cardElementOptions} />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Status Messages */}
      {paymentStatus === "processing" && (
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg flex items-center gap-2">
          <div className="animate-spin h-4 w-4 border-2 border-blue-700 border-t-transparent rounded-full"></div>
          <p className="text-sm">Processing payment...</p>
        </div>
      )}

      {paymentStatus === "success" && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          <p className="text-sm">✓ Payment successful! Redirecting...</p>
        </div>
      )}

      {paymentStatus === "failure" && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p className="text-sm">✗ Payment failed. Please try again.</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          disabled={processing}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || processing}
          className="flex-1 px-4 py-2 bg-[#0E7C5A] text-white rounded-lg hover:bg-[#0C6148] disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
        >
          {processing ? (
            <>
              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
              Processing...
            </>
          ) : (
            `Pay ${plan.fee} ${currencyConfig[currency].symbol}`
          )}
        </button>
      </div>
    </form>
  );
};

// Main Modal Component
// Main Modal Component
const PaymentModal = ({ isOpen, onClose, plan, currency }) => {
  const [userData, setUserData] = useState({ name: "", email: "" });
  const [showForm, setShowForm] = useState(false);

  // ✅ Handle cancel action
  const handleCancel = () => {
    setUserData({ name: "", email: "" });
    setShowForm(false);
    toast.info("Payment cancelled");
    onClose();
  };

  const handleProceed = () => {
    if (!userData.name.trim() || !userData.email.trim()) {
      toast.error("Please enter your name and email");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    setShowForm(true);
  };

  const handleSuccess = (paymentIntentId) => {
    sessionStorage.setItem("paymentIntentId", paymentIntentId);
    sessionStorage.setItem("planName", plan.name);
    sessionStorage.setItem("amount", `${plan.fee} ${currency}`);
    onClose();
    window.location.href = "/success";
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleCancel} // click outside closes modal
    >
      <div
        className="bg-white rounded-2xl w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // prevent inner click from closing
      >
        {/* Header */}
        <div className="bg-[#0E7C5A] p-4 rounded-t-2xl flex justify-between items-center">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            💳 Complete Your Payment
          </h2>
          <button onClick={handleCancel} className="text-white text-xl">
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!showForm ? (
            <>
              {/* User Details Form */}
              <div className="space-y-4">
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                  <h3 className="font-semibold text-amber-800">Selected Plan</h3>
                  <p className="text-amber-700">
                    {plan?.name} - {plan?.fee} {currencyConfig[currency]?.symbol}
                  </p>
                </div>

                <input
                  type="text"
                  placeholder="Full Name"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  className="w-full border p-2 rounded mb-3"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  className="w-full border p-2 rounded mb-3"
                />

                <button
                  onClick={handleProceed}
                  className="w-full bg-[#0E7C5A] text-white py-2 rounded-lg mb-2"
                >
                  Proceed to Payment
                </button>

                <button
                  onClick={handleCancel}
                  className="w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            // Stripe Payment Form
            <Elements stripe={stripePromise}>
              <PaymentForm
                plan={plan}
                currency={currency}
                userData={userData}
                onClose={handleCancel} // ✅ pass cancel handler
                onSuccess={handleSuccess}
              />
            </Elements>
          )}
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default PaymentModal;