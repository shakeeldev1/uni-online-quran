import { X, Upload } from "lucide-react";
import { useState } from "react";
import { tutorsAPI } from "../../../features/tutorsAPI";

export default function TutorFormModal({ onClose, onTutorAdded }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    role: "Teacher",
    gender: "Male",
    experience: "",
    bio: "",
    address: "",
    teachingSubjects: [],
    availableHours: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const handleSubjectChange = (subject) => {
    setFormData((prev) => {
      const currentSubjects = prev.teachingSubjects;
      if (currentSubjects.includes(subject)) {
        // Remove subject if already selected
        return {
          ...prev,
          teachingSubjects: currentSubjects.filter((s) => s !== subject),
        };
      } else {
        // Add subject if not selected
        return {
          ...prev,
          teachingSubjects: [...currentSubjects, subject],
        };
      }
    });
  };

  const availableSubjects = [
    "Quran Reading",
    "Tajweed",
    "Hifz",
    "Islamic Studies",
    "Arabic",
    "Tafseer",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Create FormData for file upload
      const submitData = new FormData();

      // Add all form fields
      Object.keys(formData).forEach((key) => {
        if (key === "teachingSubjects") {
          submitData.append(key, JSON.stringify(formData[key]));
        } else {
          submitData.append(key, formData[key]);
        }
      });

      // Add profile image if selected
      if (profileImage) {
        submitData.append("profileImage", profileImage);
      }

      const response = await tutorsAPI.createTutor(submitData);

      if (response.success) {
        onTutorAdded(response.data);
        onClose();
      } else {
        setError(response.message || "Failed to create tutor");
      }
    } catch (error) {
      setError(error.message || "Failed to create tutor");
      console.error("Error creating tutor:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0  bg-black/50 flex items-center justify-center z-50 ">
      <div className="bg-white h-[90vh]  overflow-y-scroll rounded-3xl shadow-xl w-full max-w-2xl">
        {/* Header */}
        <div className="flex justify-between items-center border-b px-6 py-2 bg-[#01855d] rounded-t-2xl">
          <h2 className="text-xl font-bold text-white">Add New Tutor</h2>
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

          {/* Profile Image Upload */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-200 mb-3">
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
              <span className="text-sm text-gray-700">Upload Photo</span>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-[#01855d] outline-none"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-[#01855d] outline-none"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-[#01855d] outline-none"
              required
              minLength={6}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-[#01855d] outline-none"
            />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-[#01855d] outline-none"
            >
              <option value="Teacher">Teacher</option>
              <option value="Qari">Qari</option>
              <option value="Hafiz">Hafiz</option>
              <option value="Imam">Imam</option>
            </select>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-[#01855d] outline-none"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              type="text"
              name="experience"
              placeholder="Experience (e.g., 5 Years)"
              value={formData.experience}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-[#01855d] outline-none"
            />
            <input
              type="text"
              name="availableHours"
              placeholder="Available Hours"
              value={formData.availableHours}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-[#01855d] outline-none"
            />
            {/* Teaching Subjects - Multi-select checkboxes */}
            <div className="col-span-1 sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teaching Subjects
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-3 w-full border rounded-lg">
                {availableSubjects.map((subject) => (
                  <label
                    key={subject}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.teachingSubjects.includes(subject)}
                      onChange={() => handleSubjectChange(subject)}
                      className="w-4 h-4 text-[#01855d] border-gray-300 rounded focus:ring-[#01855d]"
                    />
                    <span className="text-sm text-gray-700">{subject}</span>
                  </label>
                ))}
              </div>
            </div>
            <textarea
              name="bio"
              placeholder="Bio"
              value={formData.bio}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-[#01855d] outline-none col-span-1 sm:col-span-2"
              
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-[#01855d] outline-none col-span-1 sm:col-span-2"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-6">
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
              {loading ? "Creating..." : "Save Tutor"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
