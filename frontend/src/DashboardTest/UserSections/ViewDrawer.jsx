import React from "react";
import { FaTimes } from "react-icons/fa";

export const StatusBadge = ({ s }) => {
  const map = {
    Active: { fg: "#0E7C5A", bg: "#0E7C5A1A" },
    Trial: { fg: "#B45309", bg: "#B453091A" },
    Inactive: { fg: "#64748B", bg: "#64748B1A" },
  };
  const { fg, bg } = map[s] || map.Inactive;
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold"
      style={{ color: fg, background: bg }}
    >
      {s}
    </span>
  );
};

export const RoleBadge = ({ r }) => {
  const map = { Student: "#CBD5E1", Tutor: "#FACC15", Admin: "#A78BFA" };
  const bg = map[r] || map.Student;
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold"
      style={{ color: "#1E293B", background: `${bg}33` }}
    >
      {r}
    </span>
  );
};

function ViewDrawer({ user, onClose }) {
  if (!user) return null; // don't render anything if no user selected

  return (
    <>
      {/* overlay */}
      <div className="fixed inset-0 bg-black/30" onClick={onClose} />

      {/* drawer content */}
      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg overflow-y-auto mt-15 ">
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="text-lg font-semibold" style={{ color: "#2C3E50" }}>
            User Details
          </h3>
          <button
            className="ripple w-9 h-9 rounded-md border border-slate-200 hover:bg-slate-50"
            onClick={onClose}
            title="Close"
          >
            <FaTimes className="mx-auto" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center gap-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover ring-2 ring-white shadow"
            />
            <div>
              <div className="text-xl font-bold">{user.name}</div>
              <div className="text-slate-500">{user.email}</div>
              <div className="mt-2 flex items-center gap-2">
                <RoleBadge r={user.role} /> <StatusBadge s={user.status} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-slate-500">Joined:</span>{" "}
              {new Date(user.joined).toLocaleDateString()}
            </div>
            <div>
              <span className="text-slate-500">User ID:</span> #{user.id}
            </div>
          </div>

          <div className="pt-2 border-t">
            <div className="text-sm text-slate-500 mb-2">Notes</div>
            <p className="text-slate-700">
              Wire this to your backend to show attendance, enrolled courses,
              and last login.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewDrawer;
