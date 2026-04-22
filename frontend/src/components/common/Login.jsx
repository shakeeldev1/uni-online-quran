import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import API from "../../features/api";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { toast } from "react-toastify";


const Login = () => {
  const navigate = useNavigate();

  // Login form states
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Forgot Password states
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotStep, setForgotStep] = useState(1);
  const [forgotEmail, setForgotEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPass, setNewPass] = useState("");

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // Input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  // Validation
  const validateForm = () => {
    let formErrors = {};

    if (!formData.email) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Invalid email address";
    }

    if (!formData.password) {
      formErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      formErrors.password = "Password must be at least 6 characters";
    }

    return formErrors;
  };

  // Login submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true);
      try {
        // Log the data being sent for debugging
        console.log("📤 Sending login request with:", {
          email: formData.email,
          password: formData.password ? "[PASSWORD]" : "[EMPTY]",
        });

        const res = await API.post("/auth/login", {
          email: formData.email,
          password: formData.password,
        });

        console.log("✅ Login successful:", res.data);

        // Store tokens separately for API calls
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        // Also store user object with role info
        localStorage.setItem("user", JSON.stringify(res.data.user));

        toast.success("Login successful!");
        navigate("/");
      } catch (error) {
        console.error("❌ Login error:", {
          status: error.response?.status,
          message: error.response?.data?.message,
          data: error.response?.data,
          fullError: error,
        });

        const errorMessage = error.response?.data?.message || "Something went wrong. Try again.";
        const isAccountDeleted = error.response?.data?.accountDeleted;

        // Clear password field for security
        setFormData({ ...formData, password: "" });

        // Determine if we should show signup hint
        const isInvalidCredentials = errorMessage.includes("Invalid email or password");
        let helpMessage = "";
        if (isInvalidCredentials) {
          helpMessage = "\n\nTips:\n• Check if you signed up with this email\n• Verify your email was verified\n• Check that password is correct";
        }

        if (isAccountDeleted) {
          // Show single comprehensive error toast for deleted account
          toast.error("Account deleted. Please sign up again and verify your email.", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            style: {
              background: "#fee",
              color: "#c00",
              fontSize: "16px",
              fontWeight: "600",
            },
          });
          setFormData({ email: "", password: "" });
        } else {
          // Show single comprehensive error toast
          const fullMessage = isInvalidCredentials 
            ? `${errorMessage}\nVerify your email or sign up if needed`
            : errorMessage;
          
          toast.error(fullMessage, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            style: {
              background: "#fee",
              color: "#c00",
              fontSize: "16px",
              fontWeight: "600",
              whiteSpace: "pre-line",
              padding: "16px",
            },
          });
        }
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrors(formErrors);
    }
  };

  // Forgot password: send OTP
  const handleSendOtp = async () => {
    try {
      await API.post("/auth/forgot-password", { email: forgotEmail });
      alert("OTP sent to your email");
      setForgotStep(2);
    } catch (err) {
      alert(err.response?.data?.message || "Error sending OTP");
    }
  };

  // Forgot password: reset
  const handleResetPassword = async () => {
    try {
      await API.post("/auth/reset-password", {
        email: forgotEmail,
        otp,
        newPassword: newPass,
      });
      alert("Password reset successful. Please login again.");
      setShowForgotModal(false);
      setForgotStep(1);
      setForgotEmail("");
      setOtp("");
      setNewPass("");
    } catch (err) {
      alert(err.response?.data?.message || "Error resetting password");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-10"
      style={{
        background: `linear-gradient(135deg, #fffbe8 60%, #f3e4c9 100%)`,
        // backgroundImage: `url(${bgPattern})`, // Uncomment if using bgPattern
        backgroundRepeat: "repeat",
      }}
    >
      {/* Animated Floating Shapes */}
      <div className="pointer-events-none select-none absolute inset-0 z-0 overflow-hidden">
        <span className="absolute top-10 left-5 w-24 h-24 rounded-full bg-[#D4AF37]/10 blur-2xl animate-pulse" />
        <span className="absolute bottom-5 right-14 w-32 h-32 rounded-full bg-[#0E7C5A]/10 blur-2xl animate-pulse" />
        <span className="absolute top-2/4 left-1/2 w-14 h-14 rounded-full bg-[#A98435]/10 blur-xl animate-pulse" />
      </div>

      {/* Login Card */}
      {!showForgotModal && (
        <section
          className="relative z-10 flex items-center justify-center w-full"
        >
          <div
            className="relative bg-white/95 shadow-2xl rounded-3xl w-full max-w-lg p-8 border border-[#D4AF37]/30 backdrop-blur-xl"
            data-aos="zoom-in"
            style={{
              boxShadow:
                "0 8px 32px 0 rgba(44, 62, 80, 0.12), 0 1.5px 5px 0 #D4AF37"
            }}
          >
            {/* Header */}
            <div className="flex flex-col items-center gap-2 mb-6">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#D4AF37]/30 shadow-inner mb-2">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="user avatar"
                  className="h-10 w-10 object-contain"
                />
              </div>
              <h2 className="text-3xl font-black text-[#2C3E50] leading-snug tracking-tight drop-shadow-sm">
                Welcome Back
              </h2>
              <div className="w-24 h-2 bg-gradient-to-r from-[#D4AF37] via-[#A98435] to-[#0E7C5A] rounded-full" />
              <p className="text-center text-gray-600 text-lg mt-2">
                Login to continue your <span className="text-[#D4AF37] font-semibold">Quranic</span> journey
              </p>
            </div>

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-semibold text-[#2C3E50] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-xl px-4 py-2 transition focus:ring-2 focus:ring-[#D4AF37] focus:outline-none bg-[#FAF9F6]`}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              <div className="relative">
                <label className="block text-sm font-semibold text-[#2C3E50] mb-1">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-xl px-4 py-2 pr-12 transition focus:ring-2 focus:ring-[#D4AF37] focus:outline-none bg-[#FAF9F6]`}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-9 text-gray-500 hover:text-[#D4AF37] focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeIcon size={20} className="text-[#D4AF37]" />
                  ) : (
                    <EyeOffIcon size={20} className="text-[#D4AF37]" />
                  )}
                </button>
                {errors.password && (
                  <p className="mt-1 text-xs text-red-500">{errors.password}</p>
                )}
              </div>

              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-2.5 rounded-xl font-bold transition-all duration-200 shadow-lg
                    ${
                      isSubmitting
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-gradient-to-r from-[#A98435] to-[#0E7C5A] text-white hover:from-[#D4AF37] hover:to-[#12956f] hover:scale-[1.015]"
                    }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-[#D4AF37]" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#D4AF37" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="#D4AF37" d="M4 12a8 8 0 018-8v8z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
            </form>

            {/* Forget Password Button */}
            <div className="mt-4 text-center">
              <button
                onClick={() => setShowForgotModal(true)}
                className="text-[#0E7C5A] text-sm font-semibold hover:underline hover:text-[#D4AF37] transition"
              >
                Forgot your password?
              </button>
            </div>

            {/* Redirect to Signup */}
            <div className="mt-7 text-center text-base text-gray-600">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-[#D4AF37] font-bold hover:text-[#A98435] transition"
              >
                Sign up here
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div
            className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm border border-[#D4AF37]/40 relative"
            data-aos="fade-up"
          >
            <button
              aria-label="Close"
              onClick={() => setShowForgotModal(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-[#D4AF37] text-xl font-bold"
            >
              ×
            </button>
            <h3 className="text-xl font-bold mb-4 text-[#2C3E50] text-center">
              Forgot Password
            </h3>
            {forgotStep === 1 && (
              <>
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 mb-5 bg-[#FAF9F6] focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
                />
                <button
                  onClick={handleSendOtp}
                  className="w-full bg-gradient-to-r from-[#D4AF37] to-[#A98435] text-white py-2.5 rounded-xl font-bold hover:from-[#A98435] hover:to-[#0E7C5A] transition"
                >
                  Send OTP
                </button>
              </>
            )}
            {forgotStep === 2 && (
              <>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 mb-4 bg-[#FAF9F6] focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
                />

                {/* New Password with Eye Toggle */}
                <div className="relative mb-4">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    placeholder="New Password"
                    className="w-full border border-gray-300 rounded-xl px-4 py-2 pr-12 bg-[#FAF9F6] focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-2.5 text-gray-500 hover:text-[#0E7C5A]"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeIcon size={18} className="text-[#0E7C5A]" />
                    ) : (
                      <EyeOffIcon size={18} className="text-[#0E7C5A]" />
                    )}
                  </button>
                </div>

                <button
                  onClick={handleResetPassword}
                  className="w-full bg-gradient-to-r from-[#0E7C5A] to-[#A98435] text-white py-2.5 rounded-xl font-bold hover:from-[#12956f] hover:to-[#D4AF37] transition"
                >
                  Reset Password
                </button>
              </>
            )}
            <button
              onClick={() => setShowForgotModal(false)}
              className="mt-5 block w-full text-sm text-gray-500 hover:text-[#D4AF37] font-semibold hover:underline transition text-center"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;