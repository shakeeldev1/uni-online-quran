import React, { useState, useRef, useContext } from "react";
import { X, User, Mail, Phone, MapPin, Clock, BookOpen, Award, Users, CheckCircle2, CreditCard } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { enrollmentsAPI } from "../../features/enrollmentsAPI";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

// Initialize Stripe with the publishable key from environment variable
const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

if (!stripePublishableKey) {
  console.error("VITE_STRIPE_PUBLISHABLE_KEY is not set in environment variables");
}

// Create stripe promise once at module level
const stripePromise = stripePublishableKey
  ? loadStripe(stripePublishableKey)
  : Promise.reject(new Error("Stripe key not configured"));

// Payment Form Component
const CoursePaymentForm = ({ course, formData, onSuccess, onCancel }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL || "";
      
      // Parse course price (could be "$99" or "99")
      const priceValue = parseFloat(course.price.toString().replace(/[^\d.-]/g, "")) || 99;

      // Create payment intent
      const response = await fetch(`${API_BASE_URL}/create-payment-intent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: priceValue, // Amount in dollars (backend multiplies by 100)
          currency: "usd",
          planName: course.title,
          customerName: formData.name,
          customerEmail: formData.email,
          metadata: {
            courseId: course._id,
            courseName: course.title,
            studentPhone: formData.phone,
            studentAge: formData.age,
            studentGender: formData.gender,
            studentExperience: formData.previousExperience,
            instructor: course.instructorId?.username || "Unknown",
            instructorRole: course.instructorId?.role || "Teacher",
            duration: course.duration,
            sessions: course.sessions,
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

      // Confirm payment
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: formData.name,
            email: formData.email,
          },
        },
      });

      if (stripeError) {
        setError(stripeError.message);
        toast.error(`Payment failed: ${stripeError.message}`);
      } else if (paymentIntent.status === "succeeded") {
        toast.success("Payment successful!");
        
        // Create enrollment after payment
        try {
          const enrollmentData = {
            courseId: course._id,
            courseName: course.title,
            instructor: course.instructorId?.username || "Unknown",
            instructorRole: course.instructorId?.role || "Teacher",
            price: course.price,
            duration: course.duration,
            sessions: course.sessions,
            paymentIntentId: paymentIntent.id,
            studentData: {
              fullName: formData.name,
              email: formData.email,
              phone: formData.phone,
              age: parseInt(formData.age),
              gender: formData.gender,
              address: formData.address,
              previousExperience: formData.previousExperience,
              preferredTime: formData.preferredTime,
              learningGoals: formData.learningGoals,
              additionalNotes: formData.additionalNotes,
            },
          };

          const enrollResponse = await enrollmentsAPI.createEnrollment(enrollmentData);
          
          if (enrollResponse.success) {
            onSuccess(paymentIntent.id);
          } else {
            throw new Error(enrollResponse.message);
          }
        } catch (enrollError) {
          console.error("Enrollment error:", enrollError);
          toast.warning("Payment successful, but enrollment creation had an issue. Please contact support.");
        }
      }
    } catch (err) {
      setError(err.message || "Payment failed");
      toast.error(`Payment error: ${err.message}`);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
        <p className="text-sm text-gray-600">Course Price</p>
        <p className="text-2xl font-bold text-emerald-600">{course.price}</p>
      </div>

      <form onSubmit={handlePayment} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Card Information
          </label>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#fa755a",
                },
              },
            }}
            className="border border-gray-300 rounded-lg p-3 bg-white"
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={processing}
            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!stripe || processing}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-lg font-medium disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {processing ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Processing...
              </>
            ) : (
              <>
                <CreditCard size={18} />
                Pay {course.price}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

const EnrollmentModal = ({ course, onClose }) => {
  const { user } = useContext(AuthContext);
  
  const [formData, setFormData] = useState({
    name: user?.username || "",
    email: user?.email || "",
    phone: "",
    age: "",
    gender: "Male",
    address: "",
    previousExperience: "Beginner",
    preferredTime: "",
    learningGoals: "",
    additionalNotes: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const [currentStep, setCurrentStep] = useState("form"); // form, payment, success
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const formRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.age) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Move to payment step
    setCurrentStep("payment");
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center text-white relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full"></div>
            
            <div className="relative z-10">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Enrollment Successful!</h3>
              <p className="text-emerald-100">Your payment and enrollment are complete</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 text-center space-y-4">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <p className="text-sm text-gray-600 mb-1">Course</p>
              <p className="font-bold text-gray-800">{course.title}</p>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <p className="text-sm text-green-700 font-semibold">✓ Payment received</p>
              <p className="text-xs text-green-600 mt-1">Your enrollment is now active</p>
            </div>
            
            <div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Your instructor will contact you shortly with class details and access information.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-xs text-blue-600 font-semibold">📧 Check your email for confirmation and login details</p>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl mt-6"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Payment step
  if (currentStep === "payment") {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4 pt-20">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl h-auto flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-5 relative overflow-hidden flex-shrink-0">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full pointer-events-none"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full pointer-events-none"></div>
            
            <div className="flex items-center justify-between relative z-10">
              <div className="flex-1">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <CreditCard size={24} />
                  Payment
                </h2>
                <p className="text-emerald-100 text-sm">Secure payment via Stripe</p>
              </div>
              <button
                onClick={() => {
                  setCurrentStep("form");
                  setActiveTab("enrollment");
                }}
                className="p-1 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Payment Form */}
          <div className="p-6 flex-1">
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Student Name:</span>
                <span className="font-semibold text-gray-800">{formData.name}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Course:</span>
                <span className="font-semibold text-gray-800">{course.title}</span>
              </div>
              <div className="border-t pt-2 mt-2 flex justify-between">
                <span className="text-gray-600 font-medium">Total Amount:</span>
                <span className="text-2xl font-bold text-emerald-600">{course.price}</span>
              </div>
            </div>

            <Elements stripe={stripePromise}>
              <CoursePaymentForm
                course={course}
                formData={formData}
                onSuccess={(paymentId) => {
                  setSuccess(true);
                }}
                onCancel={() => {
                  setCurrentStep("form");
                  setActiveTab("enrollment");
                }}
              />
            </Elements>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4 pt-20">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[85vh] flex flex-col">
        {/* Compact Header with Gradient */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-5 relative overflow-hidden flex-shrink-0">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full pointer-events-none"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full pointer-events-none"></div>
          
          <div className="flex items-center justify-between relative z-10">
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{course.title}</h2>
              <p className="text-emerald-100 text-sm">Enroll in this course</p>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Tab Navigation - Compact */}
        <div className="bg-white border-b flex gap-0 flex-shrink-0">
          <button
            onClick={() => setActiveTab("details")}
            className={`flex-1 px-4 py-2 text-sm font-medium transition-all border-b-2 ${
              activeTab === "details"
                ? "border-emerald-600 text-emerald-600 bg-emerald-50"
                : "border-transparent text-gray-600 hover:text-gray-800"
            }`}
          >
            <BookOpen className="w-4 h-4 inline mr-1" />
            Details
          </button>
          <button
            onClick={() => setActiveTab("enrollment")}
            className={`flex-1 px-4 py-2 text-sm font-medium transition-all border-b-2 ${
              activeTab === "enrollment"
                ? "border-emerald-600 text-emerald-600 bg-emerald-50"
                : "border-transparent text-gray-600 hover:text-gray-800"
            }`}
          >
            <User className="w-4 h-4 inline mr-1" />
            Enroll
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto min-h-0">
          {activeTab === "details" ? (
            // Course Details Tab
            <div className="p-6 space-y-6">
              {/* Course Hero */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <div className="w-full aspect-video bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl overflow-hidden shadow-lg">
                    {course.thumbnail ? (
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen size={64} className="text-white/40" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="md:col-span-2 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{course.title}</h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {course.description || "Comprehensive Quran learning program designed to enhance your understanding and recitation skills."}
                    </p>
                  </div>

                  {/* Instructor Card */}
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {course.instructorId?.username?.charAt(0)?.toUpperCase() || "I"}
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">{course.instructorId?.username || "Expert Instructor"}</p>
                        <p className="text-sm text-gray-600">
                          {course.instructorId?.role} • {course.instructorId?.experience || 0}+ years experience
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-5 border border-emerald-200">
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="w-5 h-5 text-emerald-600" />
                    <p className="text-sm text-gray-600">Sessions</p>
                  </div>
                  <p className="text-2xl font-bold text-emerald-600">{course.sessions}</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <p className="text-sm text-gray-600">Duration</p>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">{course.duration}</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 border border-purple-200">
                  <div className="flex items-center gap-3 mb-2">
                    <Award className="w-5 h-5 text-purple-600" />
                    <p className="text-sm text-gray-600">Level</p>
                  </div>
                  <p className="text-2xl font-bold text-purple-600">{course.level}</p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-5 border border-orange-200">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xl">💰</span>
                    <p className="text-sm text-gray-600">Price</p>
                  </div>
                  <p className="text-2xl font-bold text-orange-600">{course.price}</p>
                </div>
              </div>

              {/* Key Features */}
              <div>
                <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  What You'll Get
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "Expert instruction from certified teachers",
                    "Structured curriculum tailored to your level",
                    "Interactive learning sessions",
                    "Personalized feedback and progress tracking",
                    "Flexible scheduling options",
                    "Certificate upon completion",
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-700">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            // Enrollment Form Tab
            <form ref={formRef} onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Login Status Notice */}
              {user && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-blue-900">Using your registered account</p>
                    <p className="text-sm text-blue-700">Name and email are pre-filled from your account</p>
                  </div>
                </div>
              )}

              {/* Personal Information Section */}
              <div>
                <h3 className="text-base font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <User className="w-5 h-5 text-emerald-600" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Name - Read Only */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 flex items-center">
                      <span>{formData.name || "N/A"}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">From your registered account</p>
                  </div>

                  {/* Email - Read Only */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 flex items-center">
                      <span>{formData.email || "N/A"}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">From your registered account</p>
                  </div>

                  {/* Phone - Editable */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition bg-white"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  {/* Age - Editable */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Age <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      required
                      min="5"
                      max="100"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition bg-white"
                      placeholder="Your age"
                    />
                  </div>

                  {/* Gender - Editable */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Gender
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition bg-white"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Previous Experience - Editable */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Previous Experience
                    </label>
                    <select
                      name="previousExperience"
                      value={formData.previousExperience}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition bg-white"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Contact Information Section */}
              <div className="border-t pt-4">
                <h3 className="text-base font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-emerald-600" />
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition bg-gray-50 hover:bg-white"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition bg-gray-50 hover:bg-white"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
                <div className="mt-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="2"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition resize-none bg-gray-50 hover:bg-white"
                    placeholder="Your complete address"
                  />
                </div>
              </div>

              {/* Learning Details Section */}
              <div className="border-t pt-4">
                <h3 className="text-base font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-emerald-600" />
                  Learning Preferences
                </h3>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Preferred Class Time
                  </label>
                  <input
                    type="text"
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition bg-gray-50 hover:bg-white"
                    placeholder="e.g., Morning 9 AM - 10 AM, Weekends"
                  />
                </div>
                <div className="mt-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Learning Goals
                  </label>
                  <textarea
                    name="learningGoals"
                    value={formData.learningGoals}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition resize-none bg-gray-50 hover:bg-white"
                    placeholder="What do you hope to achieve from this course? What are your learning objectives?"
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    name="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={handleChange}
                    rows="2"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition resize-none bg-gray-50 hover:bg-white"
                    placeholder="Any additional information you'd like to share with the instructor..."
                  />
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Footer - Compact */}
        <div className="bg-gray-50 border-t px-6 py-3 flex gap-3 flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium transition-colors"
          >
            Cancel
          </button>
          {activeTab === "enrollment" && (
            <button
              type="button"
              onClick={() => {
                // Validate required fields
                if (!formData.name || !formData.email || !formData.phone || !formData.age) {
                  toast.error("Please fill in all required fields");
                  return;
                }
                // Move to payment step
                setCurrentStep("payment");
              }}
              disabled={loading}
              className="flex-1 px-4 py-2 text-sm bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Validating...
                </>
              ) : (
                <>
                  <CreditCard size={16} />
                  Continue to Payment
                </>
              )}
            </button>
          )}
          {activeTab === "details" && (
            <button
              type="button"
              onClick={() => setActiveTab("enrollment")}
              className="flex-1 px-4 py-2 text-sm bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
            >
              Continue
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnrollmentModal;
