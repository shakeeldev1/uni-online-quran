import { useState } from "react";

export const TutorForm = ({ onSave, onCancel }) => {
  const [form, setForm] = useState({ name: "", email: "" });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      {/* Tutor Name */}
      <label className="grid gap-1 text-sm">
        <span className="text-slate-600 font-medium">Tutor Name</span>
        <input
          type="text"
          placeholder="Enter tutor name"
          className="w-full px-3 py-2 rounded-md border border-slate-300 focus:ring-2 focus:ring-green-600 focus:outline-none"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          required
        />
      </label>

      {/* Email */}
      <label className="grid gap-1 text-sm">
        <span className="text-slate-600 font-medium">Email</span>
        <input
          type="email"
          placeholder="Enter tutor email"
          className="w-full px-3 py-2 rounded-md border border-slate-300 focus:ring-2 focus:ring-green-600 focus:outline-none"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          required
        />
      </label>

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
          Add Tutor
        </button>
      </div>
    </form>
  );
};
