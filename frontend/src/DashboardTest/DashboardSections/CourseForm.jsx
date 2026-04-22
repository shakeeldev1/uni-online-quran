import { useState } from "react";

export const CourseForm = ({ onSave, onCancel }) => {
  const [form, setForm] = useState({
    title: "",
    level: "Beginner",
    status: "Live",
    tutor: "",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      {/* Course Title & Tutor */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="grid gap-1 text-sm">
          <span className="text-slate-600 font-medium">Course Title</span>
          <input
            type="text"
            placeholder="Enter course title"
            className="w-full px-3 py-2 rounded-md border border-slate-300 focus:ring-2 focus:ring-green-600 focus:outline-none"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            required
          />
        </label>
        <label className="grid gap-1 text-sm">
          <span className="text-slate-600 font-medium">Tutor</span>
          <input
            type="text"
            placeholder="Enter tutor name"
            className="w-full px-3 py-2 rounded-md border border-slate-300 focus:ring-2 focus:ring-green-600 focus:outline-none"
            value={form.tutor}
            onChange={(e) => handleChange("tutor", e.target.value)}
            required
          />
        </label>
      </div>

      {/* Level & Status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="grid gap-1 text-sm">
          <span className="text-slate-600 font-medium">Level</span>
          <select
            className="w-full px-3 py-2 rounded-md border border-slate-300 focus:ring-2 focus:ring-green-600 focus:outline-none"
            value={form.level}
            onChange={(e) => handleChange("level", e.target.value)}
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          <span className="text-slate-600 font-medium">Status</span>
          <select
            className="w-full px-3 py-2 rounded-md border border-slate-300 focus:ring-2 focus:ring-green-600 focus:outline-none"
            value={form.status}
            onChange={(e) => handleChange("status", e.target.value)}
          >
            <option>Live</option>
            <option>Draft</option>
            <option>Archived</option>
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
          Add Course
        </button>
      </div>
    </form>
  );
};
