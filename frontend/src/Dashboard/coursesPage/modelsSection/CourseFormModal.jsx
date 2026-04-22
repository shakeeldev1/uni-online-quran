import { X, Upload } from "lucide-react";
import { useState, useEffect } from "react";
import { coursesAPI } from "../../../features/coursesAPI";
import { tutorsAPI } from "../../../features/tutorsAPI";

export default function CourseFormModal({ onClose, onCourseAdded }) {
  const [formData, setFormData] = useState({
    title: "",
    category: "Beginner",
    level: "Beginner",
    instructorId: "",
    duration: "",
    sessions: "",
    price: "",
    description: "",
  });
  const [thumbnail, setThumbnail] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tutors, setTutors] = useState([]);
  const [loadingTutors, setLoadingTutors] = useState(true);

  // Load tutors on component mount
  useEffect(() => {
    loadTutors();
  }, []);

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

      const response = await coursesAPI.createCourse(submitData);

      if (response.success) {
        onCourseAdded && onCourseAdded(response.data);
        onClose();
      } else {
        setError(response.message || "Failed to create course");
      }
    } catch (error) {
      setError(error.message || "Failed to create course");
      console.error("Error creating course:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl  overflow-y-scroll lg:overflow-y-hidden h-full md:h-auto shadow-xl w-full max-w-2xl">
        {/* Header */}
        <div className="flex justify-between items-center border-b px-6 py-2 bg-[#01855d] rounded-t-2xl">
          <h2 className="text-xl font-bold text-white">Add New Course</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/20 transition text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* Thumbnail Upload */}
          <div className="flex flex-col items-center mb-2">
            <div className="w-20 h-20 rounded-lg overflow-hidden border-4 border-gray-200 mb-3">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <Upload className="text-gray-400" size={24} />
                </div>
              )}
            </div>
            <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <span className="text-sm text-gray-700">Upload Thumbnail</span>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="text"
              name="title"
              placeholder="Course Title"
              value={formData.title}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-[#01855d] outline-none"
              required
            />
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-[#01855d] outline-none"
              required
            >
              <option value="Beginner">Beginner</option>
              <option value="Nazra">Nazra</option>
              <option value="Hifz">Hifz</option>
              <option value="Tajweed">Tajweed</option>
              <option value="Advanced">Advanced</option>
            </select>
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-[#01855d] outline-none"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            <select
              name="instructorId"
              value={formData.instructorId}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-[#01855d] outline-none"
              required
              disabled={loadingTutors}
            >
              <option value="">
                {loadingTutors ? "Loading instructors..." : "Select Instructor"}
              </option>
              {tutors.map((tutor) => (
                <option key={tutor._id} value={tutor._id}>
                  {tutor.username} - {tutor.role} ({tutor.experience})
                </option>
              ))}
            </select>
            <input
              type="text"
              name="duration"
              placeholder="Duration (e.g., 3 Months)"
              value={formData.duration}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-[#01855d] outline-none"
              required
            />
            <input
              type="number"
              name="sessions"
              placeholder="Number of Sessions"
              value={formData.sessions}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-[#01855d] outline-none"
              required
              min="1"
            />
            <input
              type="text"
              name="price"
              placeholder="Price (e.g., $120)"
              value={formData.price}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-[#01855d] outline-none"
              required
            />
          
          </div>
            <textarea
              name="description"
              placeholder="Course Description"
              value={formData.description}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-[#01855d] outline-none col-span-1 sm:col-span-2"
              
            />

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg border text-gray-700 hover:bg-gray-100 transition"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-[#967B5A] hover:bg-[#776147] text-white shadow-md transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Creating..." : "Save Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
