import { useState } from "react";

/* -------------- Small Forms -------------- */
export const UserForm = ({ initial, onSave, onCancel }) => {
  const [form, setForm] = useState({ ...initial });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      {/* Name */}
      <label className="grid gap-1 text-sm">
        <span className="text-slate-600 font-medium">Name</span>
        <input
          type="text"
          placeholder="Enter full name"
          className="w-full px-3 py-2 rounded-md border border-slate-300 focus:ring-2 focus:ring-green-600 focus:outline-none"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
      </label>

      {/* Email */}
      <label className="grid gap-1 text-sm">
        <span className="text-slate-600 font-medium">Email</span>
        <input
          type="email"
          placeholder="Enter email address"
          className="w-full px-3 py-2 rounded-md border border-slate-300 focus:ring-2 focus:ring-green-600 focus:outline-none"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
      </label>

      {/* Status & Role */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="grid gap-1 text-sm">
          <span className="text-slate-600 font-medium">Status</span>
          <select
            className="w-full px-3 py-2 rounded-md border border-slate-300 focus:ring-2 focus:ring-green-600 focus:outline-none"
            value={form.status}
            onChange={(e) => handleChange("status", e.target.value)}
          >
            <option>Active</option>
            <option>Trial</option>
            <option>Inactive</option>
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          <span className="text-slate-600 font-medium">Role</span>
          <select
            className="w-full px-3 py-2 rounded-md border border-slate-300 focus:ring-2 focus:ring-green-600 focus:outline-none"
            value={form.role}
            onChange={(e) => handleChange("role", e.target.value)}
          >
            <option>Student</option>
            <option>Tutor</option>
            <option>Admin</option>
          </select>
        </label>
      </div>

      {/* Buttons */}
      <div className="mt-3 flex items-center justify-end gap-3">
        <button
          type="button"
          className="px-4 py-2 rounded-md border border-slate-300 hover:bg-slate-100 transition"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-md text-white bg-green-700 hover:bg-green-800 transition"
        >
          Save
        </button>
      </div>
    </form>
  );
};
