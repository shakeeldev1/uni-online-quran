import { useState } from "react";
import { Field } from "../UserSections/EditForm";

export const EditForm = ({ tutor, onCancel, onSubmit }) => {
  const [form, setForm] = useState({ ...tutor });
  const isCreate = !tutor?.id;

  const toggleFeature = (f) => {
    setForm((prev) => {
      const set = new Set(prev.features || []);
      set.has(f) ? set.delete(f) : set.add(f);
      return { ...prev, features: Array.from(set) };
    });
  };

  return (
    <form
      className="grid gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field  label="Name">
          <input
            className="w-full px-3 py-2 rounded-md border border-slate-200"
            value={form.name || ""}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </Field>
        <Field label="Gender">
          <select
            className="w-full px-3 py-2 rounded-md border border-slate-200"
            value={form.gender || "Male"}
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
          >
            <option>Male</option>
            <option>Female</option>
          </select>
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Email">
          <input
            className="w-full px-3 py-2 rounded-md border border-slate-200"
            type="email"
            value={form.email || ""}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </Field>
        <Field label="Phone">
          <input
            className="w-full px-3 py-2 rounded-md border border-slate-200"
            value={form.phone || ""}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Status">
          <select
            className="w-full px-3 py-2 rounded-md border border-slate-200"
            value={form.status || "Active"}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option>Active</option>
            <option>OnLeave</option>
            <option>Inactive</option>
          </select>
        </Field>
        <Field label="Availability">
          <input
            className="w-full px-3 py-2 rounded-md border border-slate-200"
            value={form.availability || ""}
            onChange={(e) => setForm({ ...form, availability: e.target.value })}
          />
        </Field>
      </div>

      <Field label="Subjects (comma separated)">
        <input
          className="w-full px-3 py-2 rounded-md border border-slate-200"
          value={(form.subjects || []).join(", ")}
          onChange={(e) =>
            setForm({
              ...form,
              subjects: e.target.value
                .split(",")
                .map((x) => x.trim())
                .filter(Boolean),
            })
          }
        />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Field label="Students">
          <input
            type="number"
            className="w-full px-3 py-2 rounded-md border border-slate-200"
            value={form.students || 0}
            onChange={(e) =>
              setForm({ ...form, students: Number(e.target.value) })
            }
          />
        </Field>
        <Field label="Rating">
          <input
            type="number"
            step="0.1"
            min="0"
            max="5"
            className="w-full px-3 py-2 rounded-md border border-slate-200"
            value={form.rating ?? 4.5}
            onChange={(e) =>
              setForm({ ...form, rating: Number(e.target.value) })
            }
          />
        </Field>
        <Field label="Avatar URL">
          <input
            className="w-full px-3 py-2 rounded-md border border-slate-200"
            value={form.avatar || ""}
            onChange={(e) => setForm({ ...form, avatar: e.target.value })}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Field label="Features">
          <div className="flex flex-wrap gap-2">
            {["One-on-One", "Flexible"].map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => toggleFeature(f)}
                className={`px-2 py-1 rounded-full text-[12px] border ${
                  form.features?.includes(f)
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </Field>
        <Field label="Verified (female tutors)">
          <label className="inline-flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={!!form.verified}
              onChange={(e) => setForm({ ...form, verified: e.target.checked })}
            />
            <span>Show verified shield</span>
          </label>
        </Field>
        <div />
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
          className="ripple px-3 py-2 rounded-md text-white cta cta-glow"
        >
          {isCreate ? "Create Tutor" : "Save Changes"}
        </button>
      </div>
    </form>
  );
};