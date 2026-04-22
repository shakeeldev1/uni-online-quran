import { X } from "lucide-react";
import { useState } from "react";

export default function EditReviewModal({ review, onClose }) {
  const [formData, setFormData] = useState({
    reviewerName: review.reviewerName || "",
    role: review.role || "Student",
    rating: review.rating || 5,
    reviewText: review.reviewText || "",
    courseTitle: review.courseTitle || "",
    status: review.status || "Pending",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Review:", formData);
    // API call goes here
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-xs"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[95vh] overflow-y-auto animate-fade-in">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <X size={24} />
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-[#0E7C5A] text-center">
            Edit Review
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Reviewer Name */}
            <input
              type="text"
              name="reviewerName"
              value={formData.reviewerName}
              onChange={handleChange}
              placeholder="Reviewer Name"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0E7C5A] outline-none"
            />

            {/* Role */}
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0E7C5A] outline-none"
            >
              <option>Student</option>
              <option>Tutor</option>
            </select>

            {/* Rating */}
            <select
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0E7C5A] outline-none"
            >
              {[1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r}>
                  {r} Star{r > 1 ? "s" : ""}
                </option>
              ))}
            </select>

            {/* Course */}
            <input
              type="text"
              name="courseTitle"
              value={formData.courseTitle}
              onChange={handleChange}
              placeholder="Course Title"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0E7C5A] outline-none"
            />

            {/* Review Text */}
            <textarea
              name="reviewText"
              value={formData.reviewText}
              onChange={handleChange}
              placeholder="Write review..."
              rows={4}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0E7C5A] outline-none"
            />

            {/* Status */}
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0E7C5A] outline-none"
            >
              <option>Published</option>
              <option>Pending</option>
              <option>Flagged</option>
            </select>

            {/* Save */}
            <button
              type="submit"
              className="w-full bg-[#0E7C5A] text-white py-2 rounded-lg hover:bg-[#0C6A4D] transition font-semibold shadow-md"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
