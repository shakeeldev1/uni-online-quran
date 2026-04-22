import { useState } from "react";

export const Field = ({ label, children }) => (
  <label className="grid gap-1 text-sm">
    <span className="text-slate-600">{label}</span>
    {children}
  </label>
);

export const EditForm = ({ user, onCancel, onSubmit }) => {
  const [form, setForm] = useState({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
  });
  return (
    <form
      className="grid gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
    >
      <Field label="Name">
        <input
          className="w-full px-3 py-2 rounded-md border border-slate-200"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </Field>
      <Field label="Email">
        <input
          className="w-full px-3 py-2 rounded-md border border-slate-200"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Role">
          <select
            className="w-full px-3 py-2 rounded-md border border-slate-200"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option>Student</option>
            <option>Tutor</option>
            <option>Admin</option>
          </select>
        </Field>
        <Field label="Status">
          <select
            className="w-full px-3 py-2 rounded-md border border-slate-200"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option>Active</option>
            <option>Trial</option>
            <option>Inactive</option>
          </select>
        </Field>
      </div>
      <div className="mt-2 flex items-center justify-end gap-2">
        <button
          type="button"
          className="ripple px-3 py-2 rounded-md border border-slate-200 hover:bg-slate-50"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="ripple px-3 py-2 rounded-md text-white"
          style={{ background: "#0E7C5A" }}
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};
