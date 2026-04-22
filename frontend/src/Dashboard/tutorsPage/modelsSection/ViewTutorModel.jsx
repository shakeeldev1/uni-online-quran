import {
  X,
  Mail,
  UserCircle,
  Calendar,
  ShieldCheck,
  BookOpen,
  Users,
  Star,
} from "lucide-react";

export default function ViewTutorModal({ user, onClose }) {
  return (
    <div className="fixed inset-0 flex justify-end z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 backdrop-blur-xs bg-black/30"
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div className="relative w-full sm:w-130 bg-gradient-to-b from-[#F5F7FA] to-white shadow-2xl h-full flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 ">
          {/* Profile Image */}
          <div className="flex flex-col items-center ">
            <img
              src={
                user.profileImage ||
                `https://i.pravatar.cc/40?u=${user.username}`
              }
              alt={user.username}
              className="w-20 h-20 rounded-full border-4 border-[#D4AF37] object-cover shadow-lg"
            />
            <h2 className="text-2xl  font-bold mt-4 text-[#0B1324] tracking-wide">
              {user.username}
            </h2>
            <p className="text-sm mb-3 text-gray-500 flex items-center gap-1">
              <UserCircle size={16} /> {user.role}
            </p>
          </div>
          <DetailCard
            icon={<Mail className="text-[#0E7C5A] mt-3" size={20} />}
            label="Email"
            value={user.email}
          />
          {/* User Details */}
          <div className=" mt-2 gap-2 grid grid-cols-2 mb-20  sm:grid-cols-3">
            {/* Email */}


            {/* Role */}
            <DetailCard
              icon={<ShieldCheck className="text-[#967B5A]" size={20} />}
              label="Role"
              value={user.role}
              badgeColor={
                user.role === "Qari"
                  ? "bg-blue-100 text-blue-700"
                  : user.role === "Hafiz"
                    ? "bg-purple-100 text-purple-700"
                    : "bg-pink-100 text-pink-700"
              }
            />

            {/* Status */}
            <DetailCard
              icon={
                <ShieldCheck
                  className={
                    user.status === "Active" ? "text-green-600" : "text-red-600"
                  }
                  size={20}
                />
              }
              label="Status"
              value={user.status}
              badgeColor={
                user.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }
            />

            {/* Joined */}
            <DetailCard
              icon={<Calendar className="text-[#0C6A4D]" size={20} />}
              label="Joined"
              value={user.joined}
            />

            {/* Experience */}
            <DetailCard
              icon={<BookOpen className="text-indigo-600" size={20} />}
              label="Experience"
              value={user.experience}
            />

            {/* Students Assigned */}
            <DetailCard
              icon={<Users className="text-blue-600" size={20} />}
              label="Students Assigned"
              value={user.studentsAssigned}
            />

            {/* Reviews */}
            <DetailCard
              icon={<Star className="text-yellow-500" size={20} />}
              label="Reviews"
              value={
                <span className="flex items-center gap-2">
                  {"⭐".repeat(Math.round(user.reviews))}{" "}
                  <span className="text-gray-600">
                    ({user.reviews.toFixed(1)})
                  </span>
                </span>
              }
            />
          </div>
        </div>

        {/* Footer Buttons (sticky at bottom) */}
        <div className="absolute bottom-0 left-0 right-0 bg-white p-4 border-t flex gap-3">
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

/* Reusable Card Component */
function DetailCard({ icon, label, value, badgeColor }) {
  return (
    <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow border hover:shadow-md transition">
      {icon}
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        {badgeColor ? (
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeColor}`}
          >
            {value}
          </span>
        ) : (
          <p className="text-sm font-medium text-gray-800">{value}</p>
        )}
      </div>
    </div>
  );
}
