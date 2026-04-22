// src/components/common/TermsOfService.jsx
import React from "react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#0E7C5A] to-[#AC7D40] text-white py-8 px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Guidelines for using Al-Hafiz Online Quran Academy services
          </p>
        </div>

        {/* Content Section */}
        <div className="px-6 py-10 lg:px-10">
          <div className="prose prose-lg max-w-none">
            {/* Introduction */}
            <div className="mb-8 p-6 bg-green-50 rounded-xl border-l-4 border-[#0E7C5A]">
              <p className="text-gray-700 leading-relaxed">
                Welcome to <strong className="text-[#0E7C5A]">Al-Hafiz Online Quran Academy</strong>. 
                By using our website and enrolling in our courses, you agree to these Terms of Service. 
                Please read them carefully before using our platform.
              </p>
            </div>

            {/* Section 1 */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-[#0E7C5A] text-white rounded-full flex items-center justify-center font-bold mr-3">
                  1
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Acceptance of Terms</h2>
              </div>
              <p className="text-gray-700 p-4 bg-gray-50 rounded-lg">
                By accessing our services, you agree to these Terms and our Privacy Policy. 
                If you disagree with any part, please discontinue use immediately.
              </p>
            </div>

            {/* Section 2 */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-[#0E7C5A] text-white rounded-full flex items-center justify-center font-bold mr-3">
                  2
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Services Overview</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Virtual Quran teaching classes",
                  "Tajweed lessons",
                  "Islamic studies",
                  "Online video sessions"
                ].map((service, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors">
                    <div className="w-6 h-6 bg-[#AC7D40] text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">
                      ✓
                    </div>
                    <span className="text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3 */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-[#0E7C5A] text-white rounded-full flex items-center justify-center font-bold mr-3">
                  3
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Account Registration</h2>
              </div>
              <div className="bg-blue-50 p-5 rounded-xl border border-blue-200">
                <p className="text-gray-700">
                  You must register with accurate information and maintain account confidentiality. 
                  You're responsible for all activities under your account.
                </p>
              </div>
            </div>

            {/* Section 4 */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-[#0E7C5A] text-white rounded-full flex items-center justify-center font-bold mr-3">
                  4
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Payments & Refunds</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-[#0E7C5A] mb-2">Payment Terms</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Fees paid in advance</li>
                    <li>• Multiple payment methods</li>
                    <li>• Secure transaction processing</li>
                  </ul>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                  <h3 className="font-semibold text-[#AC7D40] mb-2">Refund Policy</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Tutor unavailability</li>
                    <li>• Verified service issues</li>
                    <li>• Management discretion</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 5 */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-[#0E7C5A] text-white rounded-full flex items-center justify-center font-bold mr-3">
                  5
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Free Trial</h2>
              </div>
              <p className="text-gray-700 p-4 bg-gray-50 rounded-lg">
                One complimentary trial class per student. Continued enrollment requires 
                registration and payment for selected packages.
              </p>
            </div>

            {/* Section 6 */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-[#0E7C5A] text-white rounded-full flex items-center justify-center font-bold mr-3">
                  6
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Code of Conduct</h2>
              </div>
              <div className="bg-red-50 p-5 rounded-xl border border-red-200">
                <p className="text-gray-700">
                  <strong className="text-red-600">Respect and ethical behavior are mandatory.</strong> 
                  Misconduct, offensive language, or inappropriate behavior may result in 
                  immediate account suspension or termination.
                </p>
              </div>
            </div>

            {/* Section 7 */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-[#0E7C5A] text-white rounded-full flex items-center justify-center font-bold mr-3">
                  7
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Intellectual Property</h2>
              </div>
              <div className="flex items-start p-5 bg-purple-50 rounded-xl border border-purple-200">
                <span className="text-2xl text-purple-500 mr-3">©</span>
                <p className="text-gray-700">
                  All course materials, videos, and learning resources are proprietary. 
                  Unauthorized copying, sharing, or distribution is strictly prohibited.
                </p>
              </div>
            </div>

            {/* Section 8 */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-[#0E7C5A] text-white rounded-full flex items-center justify-center font-bold mr-3">
                  8
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Liability Disclaimer</h2>
              </div>
              <p className="text-gray-700 p-4 bg-gray-50 rounded-lg">
                We're not liable for technical issues, session delays, or interruptions 
                caused by third-party services or user internet connectivity. We strive 
                for uninterrupted service but cannot guarantee it.
              </p>
            </div>

            {/* Section 9 */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-[#0E7C5A] text-white rounded-full flex items-center justify-center font-bold mr-3">
                  9
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Service Termination</h2>
              </div>
              <div className="bg-orange-50 p-5 rounded-xl border border-orange-200">
                <p className="text-gray-700">
                  We reserve the right to suspend or terminate accounts that violate 
                  these Terms, Islamic principles, or our code of conduct.
                </p>
              </div>
            </div>

            {/* Section 10 */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-[#0E7C5A] text-white rounded-full flex items-center justify-center font-bold mr-3">
                  10
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Policy Updates</h2>
              </div>
              <p className="text-gray-700 p-4 bg-gray-50 rounded-lg">
                Terms may be updated periodically. Continued website use implies 
                acceptance of changes. Please review this page regularly.
              </p>
            </div>

            {/* Section 11 */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-[#0E7C5A] text-white rounded-full flex items-center justify-center font-bold mr-3">
                  11
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Contact Information</h2>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-amber-50 p-6 rounded-xl border border-[#0E7C5A] text-center">
                <p className="text-gray-700 mb-4">
                  For questions about these Terms or our services:
                </p>
                <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm max-w-md mx-auto">
                  <span className="text-2xl mr-3 text-[#0E7C5A]">📧</span>
                  <strong className="text-[#0E7C5A] text-lg">support@onlinequranacademy.com</strong>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-12 pt-6 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-500">
                <strong>Last Updated:</strong> October 2025
              </p>
              <div className="mt-4 flex justify-center space-x-4">
                <div className="w-3 h-3 bg-[#0E7C5A] rounded-full"></div>
                <div className="w-3 h-3 bg-[#AC7D40] rounded-full"></div>
                <div className="w-3 h-3 bg-[#0E7C5A] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;