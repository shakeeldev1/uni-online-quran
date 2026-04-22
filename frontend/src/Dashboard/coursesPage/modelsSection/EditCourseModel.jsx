import { X, Upload } from "lucide-react";
import { useState, useEffect } from "react";
import { coursesAPI } from "../../../features/coursesAPI";
import { tutorsAPI } from "../../../features/tutorsAPI";

export default function EditCourseModal({ course, onClose, onCourseUpdated }) {
  const [formData, setFormData] = useState({
    title: "",
    category: "Beginner",
    level: "Beginner",
    instructorId: "",
    duration: "",
    sessions: "",
    price: "",
    description: "",
    status: "Upcoming",
  });
  const [thumbnail, setThumbnail] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tutors, setTutors] = useState([]);
  const [loadingTutors, setLoadingTutors] = useState(true);

  // Load tutors and initialize form data
  useEffect(() => {
    loadTutors();
    if (course) {
      setFormData({
        title: course.title || "",
        category: course.category || "Beginner",
        level: course.level || "Beginner",
        instructorId: course.instructorId?._id || "",
        duration: course.duration || "",
        sessions: course.sessions || "",
        price: course.price || "",
        description: course.description || "",
        status: course.status || "Upcoming",
      });
      setImagePreview(course.thumbnail || "");
    }
  }, [course]);

  const loadTutors = async () => {
    try {
      setLoadingTutors(true);
      const response = await tutorsAPI.getAllTutors();
      if (response.success) {
        // Filter only active tutors
        const activeTutors = response.data.filter((tutor) => tutor.isActive);
        setTutors(activeTutors);
      }
    } catch (error) {
      console.error("Error loading tutors:", error);
    } finally {
      setLoadingTutors(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Create FormData for file upload
      const submitData = new FormData();

      // Add all form fields
      Object.keys(formData).forEach((key) => {
        submitData.append(key, formData[key]);
      });

      // Add thumbnail if selected
      if (thumbnail) {
        submitData.append("thumbnail", thumbnail);
      }

      const response = await coursesAPI.updateCourse(course._id, submitData);

      if (response.success) {
        onCourseUpdated && onCourseUpdated(response.data);
        onClose();
      } else {
        setError(response.message || "Failed to update course");
      }
    } catch (error) {
      setError(error.message || "Failed to update course");
      console.error("Error updating course:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4 text-wrap">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-xs"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[95vh] overflow-y-auto animate-fade-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
        >
          <X size={24} />
        </button>

        {/* Modal Content */}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-[#0E7C5A] text-center">
            Edit Course
          </h2>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Left: Course Thumbnail */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-lg overflow-hidden border-4 border-[#0E7C5A]/30 shadow-md mb-4">
                <img
                  src={
                    imagePreview ||
                    "https://via.placeholder.com/128x128?text=Course"
                  }
                  alt="Course Thumbnail"
                  className="w-full h-full object-cover"
                />
              </div>
              <label className="flex items-center gap-2 cursor-pointer text-[#0E7C5A] hover:text-[#0C6A4D] transition font-medium">
                <Upload size={18} />
                <span>Change Thumbnail</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Right: Form Fields */}
            <div className="space-y-4">
              {/* Course Title */}
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Course Title"
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0E7C5A] outline-none"
              />

              {/* Category */}
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0E7C5A] outline-none"
              >
                <option value="Beginner">Beginner</option>
                <option value="Nazra">Nazra</option>
                <option value="Hifz">Hifz</option>
                <option value="Tajweed">Tajweed</option>
                <option value="Advanced">Advanced</option>
              </select>

              {/* Level */}
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0E7C5A] outline-none"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>

              {/* Instructor */}
              <select
                name="instructorId"
                value={formData.instructorId}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0E7C5A] outline-none"
              >
                <option value="">
                  {loadingTutors
                    ? "Loading instructors..."
                    : "Select Instructor"}
                </option>
                {tutors.map((tutor) => (
                  <option key={tutor._id} value={tutor._id}>
                    {tutor.username} ({tutor.role}) - {tutor.experience} years
                    exp.
                  </option>
                ))}
              </select>

              {/* Status */}
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0E7C5A] outline-none"
              >
                <option value="Upcoming">Upcoming</option>
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Bottom: Full Width Fields */}
            <div className="md:col-span-2 space-y-4">
              {/* Duration, Sessions, Price */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="Duration (e.g., 3 months)"
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0E7C5A] outline-none"
                />
                <input
                  type="number"
                  name="sessions"
                  value={formData.sessions}
                  onChange={handleChange}
                  placeholder="Number of Sessions"
                  min="1"
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0E7C5A] outline-none"
                />
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Price (e.g., $100)"
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0E7C5A] outline-none"
                />
              </div>

              {/* Description */}
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Course Description"
                rows="4"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0E7C5A] outline-none resize-none"
              />
            </div>
            {/* Submit Buttons */}
            <div className="md:col-span-2 flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-6 py-2 rounded-lg bg-[#0E7C5A] text-white hover:bg-[#0C6A4D] font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Updating..." : "Update Course"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
