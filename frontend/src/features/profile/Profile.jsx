import { useEffect, useState } from "react";
import API from "../../features/api";
import { useNavigate } from "react-router-dom";
import {
  Pencil,
  LogOut,
  Upload,
  EyeIcon,
  EyeOffIcon,
  Home,
} from "lucide-react";

// fetched profile
const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [user, setUser] = useState();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
    profileImage: "",
    currentPassword: "",
    newPassword: "",
    otp: "",
  });
  const [emailOtpStep, setEmailOtpStep] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [errors, setErrors] = useState({});
  const [pendingEmail, setPendingEmail] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/protected/profile");
        const user = res.data?.user || res.data;
        console.log("Fetched profile:", user);

        setProfile(user);
        setFormData((prev) => ({ ...prev, ...user }));
      } catch (error) {
        setMessage({
          type: "error",
          text: error.response?.data?.message || "Please login again",
        });
      }
    };
    fetchProfile();
  }, []);

  // Validation rules
  const validateField = (field, value) => {
    let error = "";

    switch (field) {
      case "username":
        if (!value.trim()) error = "Username is required";
        else if (value.length < 3) error = "Must be at least 3 characters";
        break;

      case "email":
        if (!value.trim()) error = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = "Invalid email format";
        break;

      case "phone":
        if (value && !/^\d{10,15}$/.test(value))
          error = "Phone must be 10–15 digits";
        break;

      case "address":
        if (!value.trim()) error = "Address is required";
        break;

      case "bio":
        if (value.length > 200) error = "Max 200 characters allowed";
        break;

      case "currentPassword":
        if (!value.trim()) error = "Current password is required";
        break;

      case "newPassword":
        if (!value.trim()) error = "New password is required";
        else if (value.length < 6)
          error = "New password must be at least 6 characters";
        break;

      default:
        break;
    }

    return error;
  };

  // Handle input change + instant validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const errorMsg = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  // Profile picture upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append("profileImage", file);

    try {
      const res = await API.put("/auth/profile", formDataUpload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProfile(res.data.user);
      setFormData((prev) => ({ ...prev, ...res.data.user }));
      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.dispatchEvent(new Event("storage")); // trigger update if Navbar listens

      setMessage({ type: "success", text: "Profile picture updated!" });
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Upload failed",
      });
    }
  };

  // Save single profile fields
  const handleSaveProfile = async () => {
    const errorMsg = validateField(editingField, formData[editingField]);
    if (errorMsg) {
      setErrors((prev) => ({ ...prev, [editingField]: errorMsg }));
      return;
    }

    try {
      let payload = {};
      if (editingField) payload[editingField] = formData[editingField];

      const res = await API.put("/auth/profile", payload);

      if (res.data.user) {
        setProfile(res.data.user);
        setFormData((prev) => ({ ...prev, ...res.data.user }));
      }

      if (payload.email && res.data.message.includes("OTP")) {
        setEmailOtpStep(true);
        setOtpTimer(60);
        setPendingEmail(profile.email); // store the email awaiting verification
        startOtpTimer();
      }

      setMessage({
        type: "success",
        text: res.data.message || `${editingField} updated successfully!`,
      });
      setEditingField(null);
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          `${
            editingField?.charAt(0).toUpperCase() + editingField?.slice(1)
          } update failed`,
      });
    }
  };

  // Verify OTP for email change
  const handleVerifyOtp = async () => {
    try {
      const res = await API.post("/auth/verify-email-change", {
        otp: formData.otp,
      });
      setProfile(res.data.user);
      setEmailOtpStep(false);
      setFormData({ ...formData, otp: "" });
      setMessage({ type: "success", text: "Email updated successfully!" });
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Invalid OTP",
      });
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    console.log("Resend OTP for email:", pendingEmail);
    try {
      const res = await API.post("/auth/resend-otp", {
        email: pendingEmail, // This should be the current email, not the new one
      });
      setOtpTimer(60);
      startOtpTimer();
      setMessage({ type: "success", text: res.data.message });
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Resend failed",
      });
    }
  };

  // OTP countdown
  const startOtpTimer = () => {
    const interval = setInterval(() => {
      setOtpTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Save password
  const handleSavePassword = async () => {
    const currentErr = validateField(
      "currentPassword",
      formData.currentPassword
    );
    const newErr = validateField("newPassword", formData.newPassword);

    if (currentErr || newErr) {
      setErrors((prev) => ({
        ...prev,
        currentPassword: currentErr,
        newPassword: newErr,
      }));
      return;
    }

    try {
      const res = await API.post("/auth/change-password", {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });
      setMessage({
        type: "success",
        text: res.data.message || "Password updated succfessfully!",
      });
      setEditingField(null);
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");

      window.location.href = "/login";
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Password update failed",
      });
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        await API.post("/auth/logout", { refreshToken });
      }
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    } finally {
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");

      window.location.href = "/login";
    }
  };

  // loader
  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-[#F2FEF8] to-[#F0ECEB]">
        <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-2xl animate-pulse">
          {/* Avatar Skeleton */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 bg-[length:200%_100%] animate-[shimmer_2s_infinite]"></div>
          </div>

          {/* Name Line */}
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 bg-[length:200%_100%] animate-[shimmer_2s_infinite] rounded mb-3 w-2/3 mx-auto"></div>

          {/* Email Line */}
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 bg-[length:200%_100%] animate-[shimmer_2s_infinite] rounded mb-3 w-1/2 mx-auto"></div>

          {/* Other Fields */}
          <div className="space-y-3 mt-6">
            <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 bg-[length:200%_100%] animate-[shimmer_2s_infinite] rounded w-full"></div>
            <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 bg-[length:200%_100%] animate-[shimmer_2s_infinite] rounded w-5/6"></div>
            <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 bg-[length:200%_100%] animate-[shimmer_2s_infinite] rounded w-4/6"></div>
          </div>
        </div>

        {/* Text Loader */}
        <p className="mt-6 text-sm text-[#2C3E50] tracking-wide animate-pulse">
          Fetching your profile details...
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F2FEF8] p-4 sm:p-6">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-6 sm:p-8 text-[#2C3E50]">
        {/* Profile Header */}
        <div className="flex flex-col items-center relative">
          <div className="relative group">
            {profile.profileImage ? (
              <img
                src={profile.profileImage}
                alt="Profile not showing"
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover shadow-md"
              />
            ) : (
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#D8B586] flex items-center justify-center text-4xl font-bold text-white shadow-md">
                {profile.username?.charAt(0).toUpperCase()}
              </div>
            )}
            <label className="absolute bottom-0 right-0 bg-[#0E7C5A] p-2 rounded-full shadow-md text-white cursor-pointer hover:bg-[#095c44] transition">
              <Upload size={16} />
              <input
                type="file"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>
          <h1 className="mt-4 text-2xl font-bold text-[#513D2B]">My Profile</h1>
        </div>

        {/* Message Banner */}
        {message.text && (
          <div
            className={`mt-4 p-3 rounded-lg text-center text-sm ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Profile Fields */}
        <div className="mt-6 space-y-5">
          {["username", "phone", "address", "bio"].map((field) => (
            <div
              key={field}
              className="flex flex-col border-b border-gray-200 pb-2"
            >
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <strong className="text-[#0E7C5A] capitalize">
                    {field}:
                  </strong>{" "}
                  {editingField === field ? (
                    <input
                      type="text"
                      name={field}
                      value={formData[field] || ""}
                      onChange={handleChange}
                      className="ml-2 p-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                    />
                  ) : (
                    <span className="ml-2">{profile[field] || "Not set"}</span>
                  )}
                </div>
                <div>
                  {editingField === field ? (
                    <button
                      onClick={handleSaveProfile}
                      className="text-xs sm:text-sm bg-[#0E7C5A] text-white px-2 sm:px-3 py-1 rounded-lg mr-2"
                    >
                      Save
                    </button>
                  ) : null}
                  <button
                    onClick={() =>
                      setEditingField(editingField === field ? null : field)
                    }
                    className="text-gray-600 hover:text-[#0E7C5A]"
                  >
                    <Pencil size={18} />
                  </button>
                </div>
              </div>
              {errors[field] && (
                <p className="text-sm text-red-600 mt-1">{errors[field]}</p>
              )}
            </div>
          ))}

          {/* Email with OTP flow */}
          <div className="border-b border-gray-200 pb-2">
            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <strong className="text-[#0E7C5A]">Email:</strong>{" "}
                  {editingField === "email" ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="ml-2 p-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                    />
                  ) : (
                    <span className="ml-2">{profile.email}</span>
                  )}
                </div>
                <div>
                  {editingField === "email" ? (
                    <button
                      onClick={handleSaveProfile}
                      className="text-xs sm:text-sm bg-[#0E7C5A] text-white px-2 sm:px-3 py-1 rounded-lg mr-2"
                    >
                      Save
                    </button>
                  ) : null}
                  <button
                    onClick={() =>
                      setEditingField(editingField === "email" ? null : "email")
                    }
                    className="text-gray-600 hover:text-[#0E7C5A]"
                  >
                    <Pencil size={18} />
                  </button>
                </div>
              </div>
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">{errors.email}</p>
              )}
              {emailOtpStep && (
                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="text"
                    name="otp"
                    value={formData.otp}
                    onChange={handleChange}
                    placeholder="Enter OTP"
                    className="p-1 border rounded-lg flex-1"
                  />
                  <button
                    onClick={handleVerifyOtp}
                    className="bg-[#0E7C5A] text-white px-2 sm:px-3 py-1 rounded-lg"
                  >
                    Verify
                  </button>
                  <button
                    onClick={handleResendOtp}
                    disabled={otpTimer > 0}
                    className="text-sm text-blue-600 disabled:text-gray-400"
                  >
                    {otpTimer > 0 ? `Resend in ${otpTimer}s` : "Resend OTP"}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Password Change */}
          <div className="border-b border-gray-200 pb-2">
            <div className="flex flex-col gap-2">
              <strong className="text-[#0E7C5A]">Password:</strong>
              {editingField === "password" ? (
                <>
                  <div>
                    <div className="relative mb-2">
                      <input
                        type={showOldPassword ? "text" : "password"}
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        placeholder="Current Password"
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] pr-10"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-2.5 text-gray-500 hover:text-[#0E7C5A]"
                        onClick={() => setShowOldPassword(!showOldPassword)}
                      >
                        {showOldPassword ? (
                          <EyeIcon size={18} className="text-[#0E7C5A]" />
                        ) : (
                          <EyeOffIcon size={18} className="text-[#0E7C5A]" />
                        )}
                      </button>
                    </div>
                    {errors.currentPassword && (
                      <p className="text-sm text-red-600">
                        {errors.currentPassword}
                      </p>
                    )}

                    {/* New Password */}
                    <div className="relative mb-2">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        placeholder="New Password"
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] pr-10"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-2.5 text-gray-500 hover:text-[#0E7C5A]"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? (
                          <EyeIcon size={18} className="text-[#0E7C5A]" />
                        ) : (
                          <EyeOffIcon size={18} className="text-[#0E7C5A]" />
                        )}
                      </button>
                    </div>
                    {errors.newPassword && (
                      <p className="text-sm text-red-600">
                        {errors.newPassword}
                      </p>
                    )}
                    <button
                      onClick={handleSavePassword}
                      className="mt-2 bg-[#0E7C5A] text-white py-2 rounded-xl shadow-md px-5"
                    >
                      Save Password
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex justify-between items-center">
                  <span>********</span>
                  <button
                    onClick={() =>
                      setEditingField(
                        editingField === "password" ? null : "password"
                      )
                    }
                    className="text-gray-600 hover:text-[#0E7C5A]"
                  >
                    <Pencil size={18} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex gap-5">
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 w-1/2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl shadow-md"
            >
              <LogOut size={18} /> Logout
            </button>

            {/* Home Button */}
            <button
              onClick={() => navigate("/")}
              className="flex items-center justify-center gap-2 w-1/2 bg-[#0E7C5A] hover:bg-[#0c694c] text-white py-2 rounded-xl shadow-md"
            >
              <Home size={18} /> Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
