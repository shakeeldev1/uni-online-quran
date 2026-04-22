import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaHome, FaEnvelope, FaPhone } from "react-icons/fa";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [paymentDetails, setPaymentDetails] = useState(null);

  useEffect(() => {
    // Retrieve payment details from sessionStorage
    const paymentIntentId = sessionStorage.getItem("paymentIntentId");
    const planName = sessionStorage.getItem("planName");
    const amount = sessionStorage.getItem("amount");

    if (paymentIntentId) {
      setPaymentDetails({
        paymentIntentId,
        planName,
        amount,
      });
    }

    // Clear session storage after reading
    sessionStorage.removeItem("paymentIntentId");
    sessionStorage.removeItem("planName");
    sessionStorage.removeItem("amount");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F5F1] to-white flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Success Header */}
        <div className="bg-gradient-to-r from-green-500 to-[#0E7C5A] p-8 text-center">
          <div className="flex justify-center mb-4">
            <FaCheckCircle className="text-6xl text-white animate-bounce" />
          </div>
          <h1 className="text-2xl font-bold text-white">Payment Successful!</h1>
          <p className="text-green-100 mt-2">Thank you for your enrollment</p>
        </div>

        {/* Payment Details */}
        <div className="p-6">
          {paymentDetails ? (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Plan:</span>
                  <span className="font-semibold text-[#0E7C5A]">
                    {paymentDetails.planName || "Quran Course"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Amount Paid:</span>
                  <span className="font-semibold text-[#0E7C5A]">
                    {paymentDetails.amount || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Transaction ID:</span>
                  <span className="font-mono text-sm text-gray-500">
                    {paymentDetails.paymentIntentId?.substring(0, 20)}...
                  </span>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-2">
                  📋 Next Steps
                </h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Check your email for confirmation details</li>
                  <li>• Our team will contact you within 24 hours</li>
                  <li>• Get ready for your first Quran class!</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-500">Loading payment details...</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-6 space-y-3">
            <Link
              to="/"
              className="flex items-center justify-center gap-2 w-full bg-[#0E7C5A] text-white py-3 rounded-lg hover:bg-[#0C6148] transition"
            >
              <FaHome />
              Back to Home
            </Link>
            <Link
              to="/contact"
              className="flex items-center justify-center gap-2 w-full border border-[#0E7C5A] text-[#0E7C5A] py-3 rounded-lg hover:bg-[#0E7C5A] hover:text-white transition"
            >
              <FaEnvelope />
              Contact Support
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-4 text-center text-sm text-gray-500">
          <p>Having issues? Call us at +92 300 6868033</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
