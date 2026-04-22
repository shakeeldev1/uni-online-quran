// src/components/common/PrivacyPolicy.jsx
import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#0E7C5A] to-[#AC7D40] text-white py-8 px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Protecting your privacy is our sacred commitment at Al-Hafiz Online-Quran Academy
          </p>
        </div>

        {/* Content Section */}
        <div className="px-6 py-10 lg:px-10">
          <div className="prose prose-lg max-w-none">
            {/* Introduction */}
            <div className="mb-8 p-6 bg-green-50 rounded-xl border-l-4 border-[#0E7C5A]">
              <p className="text-gray-700 leading-relaxed">
                At <strong className="text-[#0E7C5A]">Al-Hafiz Online-Quran Academy</strong>, we respect your privacy and
                are committed to protecting your personal information. This Privacy
                Policy explains how we collect, use, and safeguard your information when
                you visit our website or use our services, including our online Quran
                classes, trial sessions, and student dashboard.
              </p>
            </div>

            {/* Section 1 */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-[#0E7C5A] text-white rounded-full flex items-center justify-center font-bold mr-3">
                  1
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Information We Collect</h2>
              </div>
              <p className="text-gray-700 mb-4">
                We may collect personal information that you voluntarily provide when
                registering for a class, booking a free trial, subscribing to our
                newsletter, or contacting us. This includes:
              </p>
              <ul className="grid md:grid-cols-2 gap-2 mb-4">
                <li className="flex items-start">
                  <span className="text-[#AC7D40] mr-2">•</span>
                  <span>Name, email address, and phone number</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#AC7D40] mr-2">•</span>
                  <span>Student details (age and preferred course)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#AC7D40] mr-2">•</span>
                  <span>Secure payment information</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#AC7D40] mr-2">•</span>
                  <span>Messages and feedback from contact forms</span>
                </li>
              </ul>
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <p className="text-gray-700 text-sm">
                  <span className="font-semibold text-[#AC7D40]">Note:</span> We may also collect non-personal information like browser type, device
                  type, and pages visited to improve your experience on our platform.
                </p>
              </div>
            </div>

            {/* Section 2 */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-[#0E7C5A] text-white rounded-full flex items-center justify-center font-bold mr-3">
                  2
                </div>
                <h2 className="text-2xl font-bold text-gray-800">How We Use Your Information</h2>
              </div>
              <p className="text-gray-700 mb-4">We use your information to:</p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Provide and manage online Quran classes",
                  "Process enrollments and payments",
                  "Schedule trial sessions",
                  "Communicate with students and parents",
                  "Improve our website and services",
                  "Send class updates and announcements"
                ].map((item, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors">
                    <div className="w-6 h-6 bg-[#AC7D40] text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">
                      ✓
                    </div>
                    <span className="text-gray-700">{item}</span>
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
                <h2 className="text-2xl font-bold text-gray-800">Information Sharing</h2>
              </div>
              <div className="bg-red-50 p-5 rounded-xl border border-red-200">
                <p className="text-gray-700 leading-relaxed">
                  <strong className="text-red-600">We do not sell, rent, or trade your personal data.</strong> We may share limited
                  information with trusted service providers (such as payment processors
                  or email services) who assist in operating our academy, but they are
                  bound to keep your information secure and confidential.
                </p>
              </div>
            </div>

            {/* Section 4 */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-[#0E7C5A] text-white rounded-full flex items-center justify-center font-bold mr-3">
                  4
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Data Security</h2>
              </div>
              <div className="flex items-start p-5 bg-blue-50 rounded-xl border border-blue-200">
                <span className="text-2xl text-blue-500 mr-3">🔒</span>
                <p className="text-gray-700">
                  We use secure technologies and administrative safeguards to protect your
                  data from unauthorized access or misuse. However, please note that no
                  online transmission is 100% secure.
                </p>
              </div>
            </div>

            {/* Section 5 */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-[#0E7C5A] text-white rounded-full flex items-center justify-center font-bold mr-3">
                  5
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Children's Privacy</h2>
              </div>
              <div className="flex items-start p-5 bg-purple-50 rounded-xl border border-purple-200">
                <span className="text-2xl text-purple-500 mr-3">👶</span>
                <p className="text-gray-700">
                  Protecting the privacy of children is important to us. We collect
                  children's information only with parental consent and use it solely to
                  deliver Quran learning sessions. Parents may contact us anytime to
                  review or delete their child's data.
                </p>
              </div>
            </div>

            {/* Section 6 */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-[#0E7C5A] text-white rounded-full flex items-center justify-center font-bold mr-3">
                  6
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Cookies and Tracking</h2>
              </div>
              <p className="text-gray-700 p-5 bg-gray-50 rounded-xl">
                Our website may use cookies to improve user experience, store
                preferences, and analyze site usage. You can choose to disable cookies
                through your browser settings.
              </p>
            </div>

            {/* Section 7 */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-[#0E7C5A] text-white rounded-full flex items-center justify-center font-bold mr-3">
                  7
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Updates to This Policy</h2>
              </div>
              <div className="flex items-start p-5 bg-yellow-50 rounded-xl border border-yellow-200">
                <span className="text-2xl text-yellow-500 mr-3">🔄</span>
                <p className="text-gray-700">
                  We may update this Privacy Policy occasionally to reflect changes in our
                  practices. Updates will be posted on this page with a new "Last Updated"
                  date.
                </p>
              </div>
            </div>

            {/* Section 8 */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-[#0E7C5A] text-white rounded-full flex items-center justify-center font-bold mr-3">
                  8
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Contact Us</h2>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-amber-50 p-6 rounded-xl border border-[#0E7C5A]">
                <p className="text-gray-700 mb-4">
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm">
                  <span className="text-2xl mr-3">📧</span>
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

export default PrivacyPolicy;