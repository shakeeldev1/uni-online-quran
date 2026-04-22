import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import API from "../../features/api"; // keep your axios instance here
import { EyeIcon, EyeOffIcon } from "lucide-react";

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
    return "No response from server. Check API base URL / server availability.";
  }
  return error?.message || "Unknown error";
};

const AdminSignup = () => {
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

  // protect page: only admins can access
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !(user.role === "admin" || user.isAdmin === true)) {
      // not admin — redirect to homepage
      navigate("/", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validateForm = () => {
    const formErrors = {};
    if (!formData.name.trim()) formErrors.name = "Full name is required";
    if (!formData.email) formErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      formErrors.email = "Email address is invalid";
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
      // read token from localStorage (set on admin login)
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Missing access token. Please login again.");

      // POST to admin creation endpoint, including Authorization header
      const res = await API.post(
        "/auth/admin/signup",
        {
          username: formData.name,
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // After successful signup request
      alert("OTP sent to email. Please verify.");
      navigate("/dashboard/verify-otp?email=" + formData.email);
    } catch (error) {
      console.error("Admin signup error:", error);
      alert(parseAxiosError(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center py-5 sm:py-10 justify-center bg-[#F8F5E6] px-4">
      <div className="relative z-10 bg-white/90 shadow-xl rounded-2xl w-full max-w-lg p-5 border border-[#D4AF37]/30">
        <h2 className="text-2xl font-extrabold text-center text-[#2C3E50] mb-3">
          Create New Admin
        </h2>
        <div className="w-20 h-1.5 bg-[#0F6A51] rounded-full mx-auto mb-4" />

        <form className="space-y-5 text-sm" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-[#2C3E50] mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#D4AF37]`}
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2C3E50] mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#D4AF37]`}
              placeholder="admin@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-[#2C3E50] mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#D4AF37] pr-10`}
              placeholder="••••••••"
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-gray-500 hover:text-[#0E7C5A]"
              onClick={() => setShowPassword((s) => !s)}
            >
              {showPassword ? (
                <EyeIcon size={18} className="text-[#0E7C5A]" />
              ) : (
                <EyeOffIcon size={18} className="text-[#0E7C5A]" />
              )}
            </button>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-[#2C3E50] mb-1">
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full border ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#D4AF37] pr-10`}
              placeholder="••••••••"
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-gray-500 hover:text-[#0E7C5A]"
              onClick={() => setShowConfirmPassword((s) => !s)}
            >
              {showConfirmPassword ? (
                <EyeIcon size={18} className="text-[#0E7C5A]" />
              ) : (
                <EyeOffIcon size={18} className="text-[#0E7C5A]" />
              )}
            </button>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <div className="flex justify-center mt-5">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-8 py-2.5 rounded-lg font-semibold transition-all duration-200 ${
                isSubmitting
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-[#0F6A51] text-white hover:bg-[#31BD86] shadow-md hover:shadow-lg"
              }`}
            >
              {isSubmitting ? "Processing..." : "Create Admin"}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Back to{" "}
          <Link to="/dashboard" className="text-[#0F6A51] font-semibold hover:text-[#31BD86]">
            Dashboard
          </Link>
        </p>
      </div>
    </section>
  );
};

export default AdminSignup;
