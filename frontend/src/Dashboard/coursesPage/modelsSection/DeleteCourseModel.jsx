import { X, Trash2 } from "lucide-react";
import { useState } from "react";
import { coursesAPI } from "../../../features/coursesAPI";

export default function DeleteCourseModal({
  course,
  onClose,
  onCourseDeleted,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await coursesAPI.deleteCourse(course._id);

      if (response.success) {
        onCourseDeleted(course._id);
        onClose();
      } else {
        setError(response.message || "Failed to delete course");
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      setError(error.message || "Failed to delete course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-xs animate-fade-in"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.15)] animate-scale-in overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-[#0E7C5A] transition"
        >
          <X size={25} />
        </button>

        {/* Content */}
        <div className="p-8 text-center">
          {/* Icon */}
          <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center rounded-2xl bg-gradient-to-br from-red-100 to-red-200 text-red-600 shadow-inner animate-pulse-slow">
            <Trash2 size={35} />
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-bold mb-3 text-[#0B1324]">
            Delete Course
          </h2>
          <p className="text-gray-600 mb-8 text-sm sm:text-base leading-relaxed text-wrap">
            By <span className="text-red-600 font-semibold">deleting </span>
            this course, all associated data will be{" "}
            <span className="italic text-red-600 font-semibold">
              lost.
            </span>{" "}
            Proceed only if you’re certain.
          </p>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Course Info Card */}
          <div className="bg-gradient-to-br from-[#F5F7FA] to-white rounded-2xl p-5 mb-8 shadow-sm border border-gray-100 space-y-2 text-left">
            <p>
              <span className="font-semibold text-[#0C6A4D] ml-3">Title:</span>{" "}
              {course.title}
            </p>
            <p>
              <span className="font-semibold text-[#0C6A4D] ml-3">
                Category:
              </span>{" "}
              {course.category}
            </p>
            <p>
              <span className="font-semibold text-[#0C6A4D] ml-3">Level:</span>{" "}
              {course.level}
            </p>
            <p>
              <span className="font-semibold text-[#0C6A4D] ml-3">
                Instructor:
              </span>{" "}
              {course.instructorId
                ? `${course.instructorId.username} (${course.instructorId.role})`
                : "No instructor assigned"}
            </p>
            <p>
              <span className="font-semibold text-[#0C6A4D] ml-3">Status:</span>{" "}
              {course.status}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium transition shadow-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={loading}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold shadow-lg hover:opacity-90 transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Deleting..." : "Delete Permanently"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
