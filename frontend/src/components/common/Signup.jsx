import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import API from "../../features/api";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { toast } from "react-toastify";

// Error parsing remains unchanged
const parseAxiosError = (error) => {
  if (error?.response) {
    const { status, data } = error.response;
    const msg =
      data?.message ||
      data?.error ||
      (typeof data === "string" ? data : JSON.stringify(data));
    return `Error ${status}: ${msg}`;
  }
  if (error?.request) {
    return "No response from server. Check API base URL/CORS/server availability.";
  }
  return error?.message || "Unknown error";
};

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState("signup");
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  useEffect(() => {
    if (step !== "verify" || resendCooldown <= 0) return;
    const t = setInterval(() => setResendCooldown((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [step, resendCooldown]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validateForm = () => {
    const formErrors = {};
    if (!formData.name.trim()) formErrors.name = "Full name is required";
    if (!formData.email) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Email address is invalid";
    }
    if (!formData.password) formErrors.password = "Password is required";
    else if (formData.password.length < 6)
      formErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword)
      formErrors.confirmPassword = "Passwords do not match";
    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await API.post("/auth/signup", {
        username: formData.name,
        email: formData.email,
        password: formData.password,
      });
      toast.success(
        res?.data?.message || "Signup successful. Check your email for OTP."
      );
      setStep("verify");
      setResendCooldown(30);
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(parseAxiosError(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp.trim()) {
      toast.error("Please enter the OTP.");
      return;
    }
    setIsVerifying(true);
    try {
      const res = await API.post("/auth/verify-otp", {
        email: formData.email,
        otp,
      });
      toast.success(res?.data?.message || "Email verified!");
      setStep("done");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      console.error("Verify OTP error:", error);
      toast.error(parseAxiosError(error));
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    if (!formData.email) {
      toast.error("Missing email. Please go back and sign up again.");
      return;
    }
    if (resendCooldown > 0) return;
    try {
      const res = await API.post("/auth/resend-otp", { email: formData.email });
      toast.success(res?.data?.message || "A new OTP has been sent to your email.");
      setResendCooldown(30);
    } catch (error) {
      console.error("Resend OTP error:", error);
      toast.error(parseAxiosError(error));
    }
  };

  return (
    <section
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8e9e6] via-[#f8f5e6] to-[#e7f8f6] px-4 py-5 sm:py-10 relative overflow-hidden"
      style={{
        backgroundImage:
          "radial-gradient(circle at 80% 20%, #d4af3733 10%, transparent 70%), radial-gradient(circle at 10% 90%, #0e7c5a33 10%, transparent 60%)",
      }}
    >
      {/* Decorative Elements */}
      <span className="absolute left-10 top-10 w-32 h-32 bg-[#d4af3710] rounded-full blur-3xl z-0"></span>
      <span className="absolute right-0 bottom-0 w-56 h-56 bg-[#0e7c5a12] rounded-full blur-3xl z-0"></span>

      <div
        className="relative z-10 bg-white/95 shadow-2xl rounded-3xl w-full max-w-lg p-7 border-2 border-[#D4AF37]/20 backdrop-blur-lg"
        data-aos="zoom-in"
      >
        {/* Step 1: Signup */}
        {step === "signup" && (
          <>
            <div className="flex flex-col items-center mb-2">
              <div className="bg-[#D4AF37] bg-gradient-to-tr from-[#D4AF37] to-[#F8F5E6] rounded-full p-2 shadow-md mb-2">
                <svg width={42} height={42} fill="none" viewBox="0 0 50 50">
                  <circle cx="25" cy="25" r="24" stroke="#A98435" strokeWidth="2" fill="#FFF9E3" />
                  <path d="M16 33c2-2.5 5.5-5 9-5s7 2.5 9 5" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="21" cy="24" r="2" fill="#D4AF37" />
                  <circle cx="29" cy="24" r="2" fill="#D4AF37" />
                </svg>
              </div>
              <h2 className="text-3xl font-extrabold text-center text-[#2C3E50] mb-1 leading-tight tracking-tight">
                Create Your Account
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-[#D4AF37] via-[#A98435] to-[#0E7C5A] rounded-full mt-2 mb-1"></div>
              <p className="text-center text-[#8B8C8C] mb-4 text-base font-medium">
                Sign up to start your Quranic journey
              </p>
            </div>

            <form className="space-y-5 text-sm" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-5">
                <div>
                  <label className="block text-sm font-semibold text-[#2C3E50] mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    autoComplete="off"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full border ${
                      errors.name ? "border-red-400" : "border-[#E1E4ED]"
                    } rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[#D4AF37] bg-[#FFFEFA] transition placeholder:text-gray-400`}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#2C3E50] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    autoComplete="off"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full border ${
                      errors.email ? "border-red-400" : "border-[#E1E4ED]"
                    } rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[#D4AF37] bg-[#FFFEFA] transition placeholder:text-gray-400`}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                  )}
                </div>
              </div>
              

              <div className="flex flex-col gap-5">
                <div className="relative">
                  <label className="block text-sm font-semibold text-[#2C3E50] mb-1">
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full border ${
                      errors.password ? "border-red-400" : "border-[#E1E4ED]"
                    } rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[#D4AF37] bg-[#FFFEFA] pr-12 transition placeholder:text-gray-400`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-9 text-gray-400 hover:text-[#A98435] transition"
                    tabIndex={-1}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeIcon size={20} className="text-[#D4AF37]" />
                    ) : (
                      <EyeOffIcon size={20} className="text-[#D4AF37]" />
                    )}
                  </button>
                  {errors.password && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <label className="block text-sm font-semibold text-[#2C3E50] mb-1">
                    Confirm Password
                  </label>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    autoComplete="new-password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full border ${
                      errors.confirmPassword
                        ? "border-red-400"
                        : "border-[#E1E4ED]"
                    } rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[#D4AF37] bg-[#FFFEFA] pr-12 transition placeholder:text-gray-400`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-9 text-gray-400 hover:text-[#A98435] transition"
                    tabIndex={-1}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeIcon size={20} className="text-[#D4AF37]" />
                    ) : (
                      <EyeOffIcon size={20} className="text-[#D4AF37]" />
                    )}
                  </button>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex justify-center mt-5">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-16 py-2.5 rounded-xl font-bold text-lg tracking-wide transition-all shadow-lg duration-200 
      ${
        isSubmitting
          ? "bg-gray-300 text-gray-600 cursor-not-allowed"
          : "bg-gradient-to-tr from-[#A98435] via-[#D4AF37] to-[#0E7C5A] text-white hover:scale-105 hover:shadow-2xl"
      }`}
                >
                  {isSubmitting ? "Processing..." : "Sign Up"}
                </button>
              </div>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#D4AF37] font-semibold hover:text-[#A98435] transition"
              >
                Login
              </Link>
            </p>
          </>
        )}

        {/* Step 2: OTP Verify */}
        {step === "verify" && (
          <>
            <div className="flex flex-col items-center mb-3">
              <div className="bg-[#0E7C5A] bg-gradient-to-tr from-[#0E7C5A] to-[#D4AF37] rounded-full p-2 shadow mb-2">
                <svg width={36} height={36} fill="none" viewBox="0 0 38 38">
                  <circle cx="19" cy="19" r="18" stroke="#0E7C5A" strokeWidth="2" fill="#E5F7F2" />
                  <path d="M12 20l5 5 9-11" stroke="#D4AF37" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-center text-[#2C3E50] mb-2">
                Verify Your Email
              </h2>
              <p className="text-center text-[#8B8C8C] text-sm mb-3">
                Enter the OTP sent to <span className="font-medium">{formData.email}</span>
              </p>
            </div>
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full border border-[#E1E4ED] rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[#D4AF37] bg-[#FFFEFA] text-lg text-center tracking-widest placeholder:text-gray-400"
                placeholder="Enter OTP"
                autoFocus
                maxLength={8}
                inputMode="numeric"
              />
              <button
                type="submit"
                disabled={isVerifying}
                className={`w-full bg-gradient-to-r from-[#D4AF37] to-[#0E7C5A] text-white py-2.5 rounded-xl font-bold text-lg hover:scale-105 shadow-lg transition ${
                  isVerifying ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                {isVerifying ? "Verifying..." : "Verify OTP"}
              </button>
            </form>

            <button
              onClick={handleResendOtp}
              disabled={resendCooldown > 0}
              className={`mt-4 w-full text-sm font-medium ${
                resendCooldown > 0
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-[#0E7C5A] hover:underline"
              }`}
            >
              {resendCooldown > 0
                ? `Resend OTP in ${resendCooldown}s`
                : "Resend OTP"}
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default Signup;