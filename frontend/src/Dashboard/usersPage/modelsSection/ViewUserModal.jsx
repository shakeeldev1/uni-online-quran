import { X, Mail, UserCircle, Calendar, ShieldCheck } from "lucide-react";

export default function ViewUserModal({ user, onClose }) {
  return (
    <div className="fixed inset-0 flex justify-end z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 backdrop-blur-xs bg-black/30"
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div className="relative w-full overflow-scroll sm:overflow-hidden  rounded sm:w-130 bg-gradient-to-b from-[#F5F7FA] to-white shadow-2xl h-full  p-6 animate-slide-in-right flex flex-col ">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        {/* Profile Image */}
        <div className="flex flex-col items-center ">
          <img
            src={
              user.profileImage || `https://i.pravatar.cc/40?u=${user.username}`
            }
            alt={user.username}
            className="w-23 h-23 rounded-full border-4 border-[#D4AF37] object-cover shadow-lg"
          />
          <h2 className="text-2xl font-bold mt-2 text-[#0B1324] tracking-wide">
            {user.username}
          </h2>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <UserCircle size={16} /> {user.role === "admin" ? "Admin" : "User"}
          </p>
        </div>

        {/* User Details */}
        <div className="mt-8 space-y-4 grid grid-cols-1 sm:grid-cols-2 gap-2 ">
          {/* Email */}
          <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow border hover:shadow-md transition">
            <Mail className="text-[#0E7C5A]" size={20} />
            <div>
              <p className="text-xs text-gray-400">Email</p>
              <p className="text-sm font-medium text-gray-800">{user.email}</p>
            </div>
          </div>

          {/* Role */}
          <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow border hover:shadow-md transition">
            <ShieldCheck className="text-[#967B5A]" size={20} />
            <div>
              <p className="text-xs text-gray-400">Role</p>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  user.role === "admin"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-purple-100 text-purple-700"
                }`}
              >
                {user.role === "admin" ? "Admin" : "User"}
              </span>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow border hover:shadow-md transition">
            <ShieldCheck
              className={user.isVerified ? "text-green-600" : "text-red-600"}
              size={20}
            />
            <div>
              <p className="text-xs text-gray-400">Status</p>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  user.isVerified
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {user.isVerified ? "Active" : "Inactive"}
              </span>
            </div>
          </div>

          {/* Phone */}
          {user.phone && (
            <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow border hover:shadow-md transition">
              <UserCircle className="text-[#0C6A4D]" size={20} />
              <div>
                <p className="text-xs text-gray-400">Phone</p>
                <p className="text-sm font-medium text-gray-800">
                  {user.phone}
                </p>
              </div>
            </div>
          )}

          {/* Bio */}
          {user.bio && (
            <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow border hover:shadow-md transition">
              <UserCircle className="text-[#0C6A4D]" size={20} />
              <div>
                <p className="text-xs text-gray-400">Bio</p>
                <p className="text-sm font-medium text-gray-800">{user.bio}</p>
              </div>
            </div>
          )}

          {/* Address */}
          {user.address && (
            <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow border hover:shadow-md transition">
              <UserCircle className="text-[#0C6A4D]" size={20} />
              <div>
                <p className="text-xs text-gray-400">Address</p>
                <p className="text-sm font-medium text-gray-800">
                  {user.address}
                </p>
              </div>
            </div>
          )}

          {/* Joined */}
          <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow border hover:shadow-md transition">
            <Calendar className="text-[#0C6A4D]" size={20} />
            <div>
              <p className="text-xs text-gray-400">Joined</p>
              <p className="text-sm font-medium text-gray-800">
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="mt-auto pt-6 flex gap-3">
          <button
            onClick={onClose}
            className="w-1/2 bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-300 transition"
          >
            Close
          </button>
          <button className="w-1/2 bg-[#0C6A4D] text-white py-2 rounded-lg font-medium hover:opacity-90 transition">
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}
