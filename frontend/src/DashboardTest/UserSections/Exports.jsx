import { useState, useEffect, useRef } from "react";
import { FaChevronDown, FaEye, FaPen, FaTrashAlt } from "react-icons/fa";
const cls = (...s) => s.filter(Boolean).join(" ");
/* ───────────────── Hooks ───────────────── */
export const useMedia = (query) => {
  const get = () =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false;

  const [match, setMatch] = useState(get);

  useEffect(() => {
    const m = window.matchMedia(query);
    const fn = () => setMatch(m.matches);

    m.addEventListener ? m.addEventListener("change", fn) : m.addListener(fn);

    return () =>
      m.removeEventListener
        ? m.removeEventListener("change", fn)
        : m.removeListener(fn);
  }, [query]);

  return match;
};

export const useOutside = (refs, onClose) => {
  const list = Array.isArray(refs) ? refs : [refs];

  useEffect(() => {
    const onDown = (e) => {
      if (list.some((r) => r?.current && r.current.contains(e.target))) return;
      onClose?.();
    };

    const onEsc = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onEsc);

    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onEsc);
    };
  }, [onClose]);
};

/* ───────────────── UI atoms ───────────────── */
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

export const IconBtn = ({ children, label, onClick, variant = "neutral" }) => {
  const styles = {
    neutral:
      "border-slate-200 text-slate-600 hover:bg-slate-50 focus-visible:ring-slate-300",
    view: "border-emerald-200 text-emerald-600 hover:bg-emerald-50 focus-visible:ring-emerald-300",
    edit: "border-amber-200 text-amber-600 hover:bg-amber-50 focus-visible:ring-amber-300",
    delete:
      "border-rose-200 text-rose-600 hover:bg-rose-50 focus-visible:ring-rose-300",
  }[variant];

  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="ripple inline-flex items-center justify-center w-9 h-9 rounded-lg border transition outline-none focus-visible:ring-2"
      title={label}
      style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
    >
      <span className="text-[15px]">{children}</span>
    </button>
  );
};

export const Head = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="text-left text-xs uppercase tracking-wide text-slate-500 hover:text-slate-700 transition"
  >
    {label}
  </button>
);

/* ───────────────── SoftSelect (animated dropdown for filters) ───────────────── */
export const SoftSelect = ({ label, value, options, onChange, className }) => {
  const wrap = useRef(null);
  const pop = useRef(null);
  const [open, setOpen] = useState(false);
  useOutside([wrap, pop], () => setOpen(false));

  const opts = (Array.isArray(options) ? options : []).map((o) =>
    typeof o === "string" ? { label: o, value: o } : o
  );

  const current =
    opts.find((o) => o.value === value) ||
    opts[0] || { label: "All", value: "All" };

  return (
    <div ref={wrap} className={cls("relative grid gap-1 text-sm", className)}>
      <span className="text-slate-600">{label}</span>

      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left px-3 py-2 rounded-lg border border-slate-200 bg-white pr-9 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 relative"
      >
        {current.label}
        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500">
          ▾
        </span>
      </button>

      {open && (
        <div
          ref={pop}
          className="absolute z-30 mt-1 w-full rounded-lg border border-slate-200 bg-white shadow-2xl overflow-hidden"
        >
          <ul className="max-h-64 overflow-auto">
            {opts.map((opt) => {
              const active = opt.value === value;
              return (
                <li key={opt.value}>
                  <button
                    onClick={() => {
                      onChange?.(opt.value);
                      setOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 hover:bg-emerald-50 ${
                      active
                        ? "bg-emerald-50 text-emerald-700"
                        : "text-slate-700"
                    }`}
                  >
                    {opt.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

/* ───────────────── Actions dropdown (replaces 3-dots) ───────────────── */
export const ActionsMenu = ({ onView, onEdit, onDelete }) => {
  const btnRef = useRef(null);
  const popRef = useRef(null);
  const [open, setOpen] = useState(false);
  useOutside([btnRef, popRef], () => setOpen(false));

  return (
    <div className="relative inline-block text-left">
      <button
        ref={btnRef}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-full border border-slate-200 bg-white hover:bg-slate-50"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        Actions <FaChevronDown className="opacity-70" />
      </button>

      {open && (
        <div
          ref={popRef}
          className="absolute right-0 mt-1 w-36 rounded-xl border border-slate-200 bg-white shadow-2xl overflow-hidden z-20"
        >
          <ul className="py-1 text-sm">
            <li>
              <button
                onClick={() => {
                  setOpen(false);
                  onView?.();
                }}
                className="w-full text-left px-3 py-2 hover:bg-emerald-50 text-slate-700 flex items-center gap-2"
              >
                <FaEye className="text-emerald-600" /> View
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setOpen(false);
                  onEdit?.();
                }}
                className="w-full text-left px-3 py-2 hover:bg-amber-50 text-slate-700 flex items-center gap-2"
              >
                <FaPen className="text-amber-600" /> Edit
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setOpen(false);
                  onDelete?.();
                }}
                className="w-full text-left px-3 py-2 hover:bg-rose-50 text-rose-700 flex items-center gap-2"
              >
                <FaTrashAlt /> Delete
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
