import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import API from "../../features/api";

const AdminVerifyOtp = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const email = params.get("email");

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/auth/admin/verify-otp", { email, otp });
      alert(res.data.message);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-[#F8F5E6]">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center text-[#2C3E50]">
          Verify Admin OTP
        </h2>
        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#A98435] text-white py-2 rounded-lg hover:bg-[#D4AF37]"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AdminVerifyOtp;
