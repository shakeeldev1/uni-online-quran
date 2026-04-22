import { X } from "lucide-react";
import { useState } from "react";

export default function EditUserModal({ user, onClose, onSave }) {
  const [formData, setFormData] = useState({
    username: user.username || "",
    email: user.email || "",
    role: user.role || "user",
    phone: user.phone || "",
    bio: user.bio || "",
    address: user.address || "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave({ ...user, ...formData });
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex  items-center justify-center z-50 px-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-xs"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white overflow-y-scroll sm:overflow-y-hidden rounded-2xl shadow-2xl w-full max-w-2xl animate-fade-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
        >
          <X size={24} />
        </button>

        {/* Modal Content */}
        <div className="p-2 sm:p-6 overflow-y-scroll sm:overflow-y-hidden">
          <h2 className="text-2xl font-bold sm:mb-6 mb-2 text-[#0E7C5A] text-center">
            Edit User
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Left: Profile Picture */}
            <div className="flex flex-col justify-center   items-center">
              <div className=" overflow-hidden h-28 w-28 rounded-full sm:h-full sm:w-full sm:rounded-none  border-4 border-[#0E7C5A]/30 shadow-md sm:mb-4">
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
            <div className="space-y-2 gap-2 grid grid-cols-2 sm:grid-cols-1">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                className="w-full px-4 py-2 sm:py-2 border rounded-lg focus:ring-2 focus:ring-[#0E7C5A] outline-none"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0E7C5A] outline-none"
                required
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0E7C5A] outline-none"
              />
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Bio"
                className="w-full px-4 sm:py-2 border rounded-lg focus:ring-2 focus:ring-[#0E7C5A] outline-none"
                // rows={3}
              />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0E7C5A] outline-none"
              />
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0E7C5A] outline-none"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
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
