import { X } from "lucide-react";
import { useState } from "react";

export default function EditTutorModal({ user, onClose, onSave }) {
  const [formData, setFormData] = useState({
    username: user.username || "",
    email: user.email || "",
    role: user.role || "Teacher",
    gender: user.gender || "Male",
    experience: user.experience || "",
    studentsAssigned: user.studentsAssigned || 0,
    reviews: user.reviews || 0,
    phone: user.phone || "",
    bio: user.bio || "",
    address: user.address || "",
    qualifications: user.qualifications || [],
    certifications: user.certifications || [],
    teachingSubjects: user.teachingSubjects || [],
    availableHours: user.availableHours || "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave({ ...user, ...formData });
    } catch (error) {
      console.error("Error updating tutor:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
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
            Edit Tutor
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Left: Profile Picture */}
            <div className="flex flex-col items-center">
              <div className="w-22 h-22 sm:w-full sm:h-full sm:rounded rounded-full overflow-hidden border-4 border-[#0E7C5A]/30 shadow-md mb-4">
                <img
                  src={
                    user.profileImage ||
                    `https://i.pravatar.cc/40?u=${user.username}`
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-gray-600 text-sm">Profile Picture</p>
            </div>

            {/* Right: Form Fields */}
            <div className="space-y-4">
              {/* Username */}
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0E7C5A] outline-none"
                required
              />

              {/* Email */}
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0E7C5A] outline-none"
                required
              />

              {/* Phone */}
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0E7C5A] outline-none"
              />

              {/* Role */}
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0E7C5A] outline-none"
              >
                <option value="Teacher">Teacher</option>
                <option value="Qari">Qari</option>
                <option value="Hafiz">Hafiz</option>
                <option value="Imam">Imam</option>
              </select>

              {/* Gender */}
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0E7C5A] outline-none"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>

              {/* Experience */}
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Experience (e.g., 5 Years)"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0E7C5A] outline-none"
              />

              {/* Bio */}
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Bio"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0E7C5A] outline-none"
                rows={3}
              />

              {/* Save Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0E7C5A] text-white py-2 rounded-lg hover:bg-[#0C6A4D] transition font-semibold shadow-md disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
