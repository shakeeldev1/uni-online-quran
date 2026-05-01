import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { BookOpen, Calendar, Clock, User, Mail, Award, Loader2, AlertCircle, CheckCircle2, Clock as ClockIcon, XCircle } from "lucide-react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const MyEnrollments = () => {
  const { user } = useContext(AuthContext);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (user?.email) {
      loadEnrollments();
    } else {
      setError("User email not found. Please log in again.");
      setLoading(false);
    }
  }, [user?.email]);

  const loadEnrollments = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`/api/enrollments/user/${user?.email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch enrollments");
      }

      const data = await response.json();

      if (data.success) {
        setEnrollments(data.data || []);
      } else {
        setError(data.message || "Failed to load enrollments");
      }
    } catch (err) {
      console.error("Error loading enrollments:", err);
      setError(err.message || "Failed to load enrollments. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      Pending: {
        bg: "bg-yellow-50",
        border: "border-yellow-200",
        text: "text-yellow-800",
        icon: ClockIcon,
        label: "Pending Review",
      },
      Approved: {
        bg: "bg-green-50",
        border: "border-green-200",
        text: "text-green-800",
        icon: CheckCircle2,
        label: "Approved",
      },
      Rejected: {
        bg: "bg-red-50",
        border: "border-red-200",
        text: "text-red-800",
        icon: XCircle,
        label: "Rejected",
      },
      Completed: {
        bg: "bg-blue-50",
        border: "border-blue-200",
        text: "text-blue-800",
        icon: Award,
        label: "Completed",
      },
    };

    const config = statusConfig[status] || statusConfig.Pending;
    const IconComponent = config.icon;

    return (
      <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${config.bg} border ${config.border}`}>
        <IconComponent className={`w-4 h-4 ${config.text}`} />
        <span className={`text-sm font-medium ${config.text}`}>{config.label}</span>
      </div>
    );
  };

  const filteredEnrollments =
    filterStatus === "All"
      ? enrollments
      : enrollments.filter((enrollment) => enrollment.status === filterStatus);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-[#0E7C5A] animate-spin" />
          <p className="text-gray-600">Loading your enrollments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Enrollments</h1>
          <p className="text-gray-600">Track your course enrollments and status</p>
        </div>

        {/* Filter Section */}
        <div className="mb-6 flex flex-wrap gap-2">
          {["All", "Pending", "Approved", "Rejected", "Completed"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filterStatus === status
                  ? "bg-[#0E7C5A] text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 flex gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Enrollments Grid */}
        {filteredEnrollments.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No enrollments found</h3>
            <p className="text-gray-600 mb-6">You haven't enrolled in any courses yet.</p>
            <Link
              to="/services"
              className="inline-block px-6 py-2 bg-[#0E7C5A] text-white rounded-lg hover:bg-[#0C6148] transition"
            >
              Browse Services
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredEnrollments.map((enrollment) => (
              <div
                key={enrollment._id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden cursor-pointer"
                onClick={() => {
                  setSelectedEnrollment(enrollment);
                  setShowModal(true);
                }}
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-[#0E7C5A] to-[#0C6148] px-6 py-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1">{enrollment.courseName}</h3>
                      <p className="text-emerald-100 text-sm">{enrollment.instructor}</p>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  {/* Status Badge */}
                  <div className="mb-4">{getStatusBadge(enrollment.status)}</div>

                  {/* Course Details Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4 text-[#0E7C5A]" />
                      <span>{enrollment.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <BookOpen className="w-4 h-4 text-[#0E7C5A]" />
                      <span>{enrollment.sessions} sessions</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Award className="w-4 h-4 text-[#0E7C5A]" />
                      <span>${enrollment.price}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4 text-[#0E7C5A]" />
                      <span>{new Date(enrollment.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Instructor Role */}
                  <div className="text-xs text-gray-500 mb-4 pb-4 border-b">
                    Instructor Role: <span className="font-medium text-gray-700">{enrollment.instructorRole}</span>
                  </div>

                  {/* Admin Notes */}
                  {enrollment.adminNotes && (
                    <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-4">
                      <p className="text-xs font-semibold text-blue-900 mb-1">Admin Notes:</p>
                      <p className="text-sm text-blue-800">{enrollment.adminNotes}</p>
                    </div>
                  )}

                  {/* Click to View Button */}
                  <button className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded font-medium transition text-sm">
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {showModal && selectedEnrollment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#0E7C5A] to-[#0C6148] px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">{selectedEnrollment.courseName}</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Status Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Enrollment Status</h3>
                {getStatusBadge(selectedEnrollment.status)}
              </div>

              {/* Course Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Course Duration</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedEnrollment.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Number of Sessions</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedEnrollment.sessions}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Course Price</p>
                  <p className="text-lg font-semibold text-gray-900">${selectedEnrollment.price}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Enrollment Date</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {new Date(selectedEnrollment.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Instructor Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Instructor Information</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-[#0E7C5A]" />
                    <span className="text-gray-900 font-medium">{selectedEnrollment.instructor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#0E7C5A]" />
                    <span className="text-gray-900 font-medium">{selectedEnrollment.instructorRole}</span>
                  </div>
                </div>
              </div>

              {/* Student Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Your Information</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-[#0E7C5A]" />
                    <span className="text-gray-900">{selectedEnrollment.studentData?.fullName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-[#0E7C5A]" />
                    <span className="text-gray-900">{selectedEnrollment.studentData?.email}</span>
                  </div>
                  {selectedEnrollment.studentData?.phone && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-900">📞 {selectedEnrollment.studentData?.phone}</span>
                    </div>
                  )}
                  {selectedEnrollment.studentData?.age && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-900">Age: {selectedEnrollment.studentData?.age}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Admin Notes */}
              {selectedEnrollment.adminNotes && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Admin Notes</h3>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-blue-800">{selectedEnrollment.adminNotes}</p>
                  </div>
                </div>
              )}

              {/* Status Help Text */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-800">
                  <strong>Status Info:</strong> Your enrollment is currently{" "}
                  <span className="font-semibold">
                    {selectedEnrollment.status === "Pending" && "pending review by administrators"}
                    {selectedEnrollment.status === "Approved" && "approved and ready to start"}
                    {selectedEnrollment.status === "Rejected" && "rejected. Please contact support"}
                    {selectedEnrollment.status === "Completed" && "completed"}
                  </span>
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                className="w-full py-3 px-4 bg-[#0E7C5A] text-white rounded-lg font-semibold hover:bg-[#0C6148] transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyEnrollments;
