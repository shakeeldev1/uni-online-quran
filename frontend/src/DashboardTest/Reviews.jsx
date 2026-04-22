import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import {
  FaSearch,
  FaFilter,
  FaPlus,
  FaDownload,
  FaTimes,
  FaPen,
  FaTrashAlt,
  FaEye,
  FaEyeSlash,
  FaUpload,
  FaCheck,
  FaCrown,
} from "react-icons/fa";

/* ── Brand / helpers ─────────────────────────────────────────────── */
const BRAND = {
  primary: "#0E7C5A",
  gold: "#D4AF37",
  dark: "#0B1324",
  light: "#F5F7FA",
};
const ease = [0.16, 1, 0.3, 1];
const cls = (...s) => s.filter(Boolean).join(" ");
const COURSES = ["Tajweed", "Hifz", "Tafseer", "Kids Quran", "Islamic Studies"];
const LS_REVIEWS = "reviews_library_v1";

/* Seed */
const SEED = [
  {
    id: 1,
    name: "Ali Raza",
    role: "Student",
    course: "Tajweed",
    rating: 5,
    featured: true,
    status: "Published",
    avatar: "https://i.pravatar.cc/120?img=39",
    text: "Teacher explained Makharij so clearly. My recitation improved within two weeks. Highly recommended!",
    date: "2025-09-05T09:00:00Z",
  },
  {
    id: 2,
    name: "Fatima Noor",
    role: "Parent",
    course: "Kids Quran",
    rating: 5,
    featured: true,
    status: "Published",
    avatar: "https://i.pravatar.cc/120?img=15",
    text: "My daughter enjoys every class. The female tutor is patient and kind. Flexible timings are a big plus.",
    date: "2025-09-06T16:00:00Z",
  },
  {
    id: 3,
    name: "Ahmed Ali",
    role: "Student",
    course: "Hifz",
    rating: 4,
    featured: false,
    status: "Published",
    avatar: "https://i.pravatar.cc/120?img=11",
    text: "Consistent memorization plan and regular revision. The pace is perfect for me.",
    date: "2025-09-04T12:30:00Z",
  },
  {
    id: 4,
    name: "Maryam Saeed",
    role: "Student",
    course: "Tafseer",
    rating: 5,
    featured: false,
    status: "Pending",
    avatar: "https://i.pravatar.cc/120?img=31",
    text: "Deep and insightful tafseer sessions. I’ve started to reflect more on verses.",
    date: "2025-09-02T18:30:00Z",
  },
];

const useLocalState = (key, initial) => {
  const [state, setState] = useState(() => {
    try {
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {}
  }, [key, state]);
  return [state, setState];
};

/* ── small hooks ─────────────────────────────────────────────────── */
const useMedia = (q) => {
  const [m, setM] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(q);
    const fn = () => setM(mq.matches);
    fn();
    mq.addEventListener
      ? mq.addEventListener("change", fn)
      : mq.addListener(fn);
    return () =>
      mq.removeEventListener
        ? mq.removeEventListener("change", fn)
        : mq.removeListener(fn);
  }, [q]);
  return m;
};

/* ── Stars ───────────────────────────────────────────────────────── */
const Stars = ({ value = 0, onChange, size = 16 }) => (
  <div className="inline-flex items-center gap-0.5 select-none">
    {[1, 2, 3, 4, 5].map((i) => {
      const filled = i <= Math.round(value);
      return (
        <button
          key={i}
          type="button"
          onClick={() => onChange?.(i)}
          className="p-0.5"
          title={`${i} star${i > 1 ? "s" : ""}`}
        >
          <svg
            width={size}
            height={size}
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M10 1.7l2.47 5.21 5.74.48-4.31 3.76 1.29 5.58L10 13.82 4.81 16.73l1.29-5.58L1.79 7.39l5.74-.48L10 1.7z"
              fill={filled ? "#F59E0B" : "#E5E7EB"}
            />
          </svg>
        </button>
      );
    })}
  </div>
);

const StatusPill = ({ status }) => {
  const m = {
    Published: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Pending: "bg-amber-50 text-amber-700 border-amber-200",
    Hidden: "bg-slate-100 text-slate-700 border-slate-200",
  };
  return (
    <span
      className={`px-2.5 h-6 inline-flex items-center rounded-full text-xs border ${
        m[status] || m.Hidden
      }`}
    >
      {status}
    </span>
  );
};

const IconBtn = ({ label, onClick, tone = "slate", children }) => {
  const toneCls = {
    slate: "border-slate-200 text-slate-700 hover:bg-slate-50",
    green: "border-emerald-200 text-emerald-700 hover:bg-emerald-50",
    rose: "border-rose-200 text-rose-600 hover:bg-rose-50",
  }[tone];
  return (
    <motion.button
      whileHover={{ y: -1, scale: 1.04 }}
      whileTap={{ y: 0, scale: 0.97 }}
      title={label}
      aria-label={label}
      onClick={onClick}
      className={cls(
        "w-9 h-9 md:w-9 md:h-9 w-8 h-8 inline-flex items-center justify-center rounded-full border transition",
        toneCls
      )}
    >
      <span className="text-[13px] leading-none flex items-center">
        {children}
      </span>
    </motion.button>
  );
};

/* ── Outside click (supports multiple refs incl. trigger) ────────── */
const useOutside = (refs, onClose) => {
  const list = Array.isArray(refs) ? refs : [refs];
  useEffect(() => {
    const onDown = (e) => {
      for (const r of list) {
        if (r?.current && r.current.contains(e.target)) return;
      }
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

/* ── SoftSelect (portal dropdown; mobile-safe with viewport clamp) ─ */
const SoftSelect = ({ label, value, options, onChange }) => {
  const btnRef = useRef(null);
  const popRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0, width: 240 });
  const isPhone = useMedia("(max-width: 480px)");

  const objOpts = options.map((o) =>
    typeof o === "string" ? { label: o, value: o } : o
  );
  const current = objOpts.find((o) => o.value === value) || objOpts[0];

  const place = () => {
    if (!btnRef.current) return;
    const r = btnRef.current.getBoundingClientRect();
    const vw = window.innerWidth;
    const margin = 12;
    const width = Math.min(r.width, vw - margin * 2, 560);
    const left = Math.min(Math.max(margin, r.left), vw - width - margin);
    setPos({ top: r.bottom + 6, left, width });
  };

  useEffect(() => {
    if (open) place();
  }, [open]);
  useEffect(() => {
    const onResize = () => {
      if (open) place();
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onResize, true);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onResize, true);
    };
  }, [open]);

  useOutside([popRef, btnRef], () => setOpen(false));

  return (
    <div className="grid gap-1 text-sm">
      <span className="text-slate-600">{label}</span>

      <button
        ref={btnRef}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left px-3 py-2 rounded-lg border border-slate-200 bg-white pr-9 outline-none transition
                   focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 relative"
      >
        {current.label}
        <motion.span
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.18 }}
        >
          ▾
        </motion.span>
      </button>

      {open &&
        createPortal(
          <AnimatePresence>
            <motion.div
              ref={popRef}
              role="listbox"
              aria-activedescendant={String(current.value)}
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.2, ease }}
              className="fixed z-50 rounded-xl border border-slate-200 bg-white shadow-2xl overflow-hidden backdrop-blur"
              style={{
                top: pos.top,
                left: isPhone
                  ? Math.max(
                      12,
                      (window.innerWidth -
                        Math.min(pos.width, window.innerWidth - 24)) /
                        2
                    )
                  : pos.left,
                width: isPhone
                  ? Math.min(pos.width, window.innerWidth - 24)
                  : pos.width,
              }}
            >
              <ul
                className="overflow-auto"
                style={{ maxHeight: isPhone ? "50vh" : 320 }}
              >
                {objOpts.map((opt) => {
                  const active = opt.value === value;
                  return (
                    <li key={opt.value} id={String(opt.value)}>
                      <button
                        onClick={() => {
                          onChange(opt.value);
                          setOpen(false);
                        }}
                        className={cls(
                          "w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-emerald-50 transition-colors",
                          active
                            ? "bg-emerald-50 text-emerald-700"
                            : "text-slate-700"
                        )}
                      >
                        <span
                          className={cls(
                            "inline-flex items-center justify-center w-5",
                            active ? "opacity-100" : "opacity-0"
                          )}
                        >
                          <FaCheck />
                        </span>
                        {opt.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
};

/* ── Skeleton (shimmer) ──────────────────────────────────────────── */
const Skeleton = ({ rows = 6 }) => {
  return (
    <div
      className="grid gap-4"
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))" }}
    >
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-slate-200 bg-white overflow-hidden h-[240px] sm:h-[260px] relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-100 to-transparent animate-[shimmer_1.6s_infinite]" />
          <style>{`@keyframes shimmer{0%{transform:translateX(-50%)}100%{transform:translateX(50%)}}`}</style>
          <div className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-slate-100" />
              <div className="flex-1">
                <div className="h-3 w-36 bg-slate-100 rounded mb-2" />
                <div className="h-3 w-24 bg-slate-100 rounded" />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="h-3 w-full bg-slate-100 rounded" />
              <div className="h-3 w-11/12 bg-slate-100 rounded" />
              <div className="h-3 w-9/12 bg-slate-100 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

/* ── Review Card (responsive footer/actions) ─────────────────────── */
const ReviewCard = ({ r, onView, onEdit, onDelete, onToggleStatus }) => {
  const isPub = r.status === "Published";
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8 }}
      whileHover={{ y: -6, rotateX: 0.4 }}
      transition={{ duration: 0.28, ease }}
      className="relative group rounded-2xl border bg-white overflow-hidden h-full flex flex-col"
      style={{
        borderColor: "rgba(226,232,240,.9)",
        boxShadow: "0 16px 40px rgba(2,8,20,.06)",
        backgroundImage:
          "linear-gradient(#fff,#fff), radial-gradient(1200px 200px at 0% -10%, rgba(14,124,90,.10), transparent 40%)",
        backgroundClip: "padding-box, border-box",
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        aria-hidden
        className="absolute inset-x-0 top-0 h-1"
        style={{
          background: `linear-gradient(90deg, ${BRAND.primary}, ${BRAND.gold})`,
        }}
        initial={{ scaleX: 0, transformOrigin: "0% 50%" }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, ease }}
      />
      {r.featured && (
        <motion.div
          className="absolute -right-8 -top-8 rotate-45 bg-[#D4AF3726] text-[#6b4f00] px-10 py-2 border border-[#D4AF37]/40 flex items-center gap-2"
          initial={{ y: -8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.05 }}
        >
          <FaCrown className="opacity-80" />
          <span className="text-xs font-semibold">Featured</span>
        </motion.div>
      )}

      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-start gap-3">
          <img
            src={r.avatar || `https://i.pravatar.cc/120?u=${r.name}`}
            alt={r.name}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="font-semibold text-[#0B1324] truncate">
                  {r.name}{" "}
                  <span className="text-xs text-slate-500">• {r.role}</span>
                </div>
                <div className="text-xs text-slate-500">
                  {r.course} • {new Date(r.date).toLocaleDateString()}
                </div>
              </div>
              <Stars value={r.rating} size={14} />
            </div>

            <p className="mt-2 text-slate-700 min-h-[96px] sm:min-h-[120px] leading-relaxed line-clamp-6">
              {r.text}
            </p>
            <button
              onClick={() => onView(r)}
              className="text-xs text-[#0E7C5A] hover:underline"
            >
              View full
            </button>
          </div>
        </div>

        {/* Footer: wraps on phones, fixed on md+ */}
        <div className="mt-auto pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            {r.featured && (
              <span className="px-2.5 h-6 inline-flex items-center rounded-full text-xs bg-[#D4AF3733] text-[#6b4f00] border border-[#D4AF37]/40">
                <FaCrown className="mr-1" /> Featured
              </span>
            )}
            <StatusPill status={r.status} />
          </div>

          <div className="flex items-center gap-2 justify-end sm:w-[188px]">
            <IconBtn label="View" onClick={() => onView(r)}>
              <FaEye />
            </IconBtn>
            <IconBtn label="Edit" onClick={() => onEdit(r)}>
              <FaPen />
            </IconBtn>
            <IconBtn
              label={isPub ? "Hide" : "Publish"}
              tone="green"
              onClick={() => onToggleStatus(r)}
            >
              {isPub ? <FaEyeSlash /> : <FaUpload />}
            </IconBtn>
            <IconBtn label="Delete" tone="rose" onClick={() => onDelete(r)}>
              <FaTrashAlt />
            </IconBtn>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ── Modal Shell / Form ──────────────────────────────────────────── */
const ModalShell = ({ title, onClose, children }) => (
  <>
    <motion.div
      className="fixed inset-0 bg-black/40 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    />
    <motion.div
      initial={{ scale: 0.96, opacity: 0, y: 6 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.96, opacity: 0, y: 6 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className="fixed inset-0 z-50 grid place-items-center p-4 overflow-y-auto"
    >
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-4 sm:p-6 border border-slate-100">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h3
            className="text-base sm:text-lg font-semibold"
            style={{ color: BRAND.dark }}
          >
            {title}
          </h3>
          <button
            className="w-9 h-9 rounded-md border border-slate-200 hover:bg-slate-50"
            onClick={onClose}
          >
            <FaTimes className="mx-auto" />
          </button>
        </div>
        {children}
      </div>
    </motion.div>
  </>
);

const ReviewForm = ({ value, onSubmit, onCancel }) => {
  const v = value || {};
  const [form, setForm] = useState({
    id: v.id,
    name: v.name || "",
    role: v.role || "Student",
    course: v.course || COURSES[0],
    rating: v.rating || 5,
    featured: v.featured || false,
    status: v.status || "Published",
    avatar: v.avatar || "",
    text: v.text || "",
  });
  const set = (k, val) => setForm((f) => ({ ...f, [k]: val }));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(form);
      }}
      className="grid gap-3"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="grid gap-1 text-sm">
          <span className="text-slate-600">Name</span>
          <input
            className="w-full px-3 py-2 rounded-md border border-slate-200 focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            required
          />
        </label>
        <label className="grid gap-1 text-sm">
          <span className="text-slate-600">Role</span>
          <select
            className="w-full px-3 py-2 rounded-md border border-slate-200 focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400"
            value={form.role}
            onChange={(e) => set("role", e.target.value)}
          >
            {["Student", "Parent", "Tutor"].map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="grid gap-1 text-sm">
          <span className="text-slate-600">Course</span>
          <select
            className="w-full px-3 py-2 rounded-md border border-slate-200 focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400"
            value={form.course}
            onChange={(e) => set("course", e.target.value)}
          >
            {COURSES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          <span className="text-slate-600">Rating</span>
          <div className="px-3 py-2 rounded-md border border-slate-200">
            <Stars value={form.rating} onChange={(v) => set("rating", v)} />
          </div>
        </label>
      </div>

      <label className="grid gap-1 text-sm">
        <span className="text-slate-600">Avatar URL (optional)</span>
        <input
          className="w-full px-3 py-2 rounded-md border border-slate-200 focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400"
          value={form.avatar}
          onChange={(e) => set("avatar", e.target.value)}
        />
      </label>

      <label className="grid gap-1 text-sm">
        <span className="text-slate-600">Review</span>
        <textarea
          rows={4}
          className="w-full px-3 py-2 rounded-md border border-slate-200 focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400"
          value={form.text}
          onChange={(e) => set("text", e.target.value)}
          required
        />
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <label className="grid gap-1 text-sm">
          <span className="text-slate-600">Status</span>
          <select
            className="w-full px-3 py-2 rounded-md border border-slate-200 focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400"
            value={form.status}
            onChange={(e) => set("status", e.target.value)}
          >
            {["Published", "Pending", "Hidden"].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          <span className="text-slate-600">Featured</span>
          <select
            className="w-full px-3 py-2 rounded-md border border-slate-200 focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400"
            value={String(form.featured)}
            onChange={(e) => set("featured", e.target.value === "true")}
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </label>
        <div className="hidden sm:block" />
      </div>

      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-2 rounded-md border border-slate-200 hover:bg-slate-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-3 py-2 rounded-md text-white hover:opacity-95"
          style={{ background: BRAND.primary }}
        >
          Save
        </button>
      </div>
    </form>
  );
};

/* ── Page ─────────────────────────────────────────────────────────── */
export const Reviews = () => {
  const [rows, setRows] = useLocalState(LS_REVIEWS, SEED);
  const isXS = useMedia("(max-width: 380px)");
  const isSM = useMedia("(max-width: 640px)");
  const cardMin = isXS ? 220 : isSM ? 250 : 280;

  const [q, setQ] = useState("");
  const [course, setCourse] = useState("All");
  const [status, setStatus] = useState("All");
  const [ratingMin, setRatingMin] = useState(0);
  const [sort, setSort] = useState({ key: "date", dir: "desc" });

  const [modalOpen, setModalOpen] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [viewRow, setViewRow] = useState(null);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    let out = [...rows];
    if (q.trim()) {
      const t = q.toLowerCase();
      out = out.filter(
        (r) =>
          r.name.toLowerCase().includes(t) ||
          r.text.toLowerCase().includes(t) ||
          r.course.toLowerCase().includes(t)
      );
    }
    if (course !== "All") out = out.filter((r) => r.course === course);
    if (status !== "All") out = out.filter((r) => r.status === status);
    if (ratingMin > 0) out = out.filter((r) => r.rating >= ratingMin);
    out.sort((a, b) => {
      const k = sort.key;
      let av = a[k],
        bv = b[k];
      if (k === "date") {
        av = +new Date(a.date);
        bv = +new Date(b.date);
      }
      if (typeof av === "string") {
        av = av.toLowerCase();
        bv = bv.toLowerCase();
      }
      if (av < bv) return sort.dir === "asc" ? -1 : 1;
      if (av > bv) return sort.dir === "asc" ? 1 : -1;
      return 0;
    });
    return out;
  }, [rows, q, course, status, ratingMin, sort]);

  const stats = useMemo(
    () => ({
      total: rows.length,
      published: rows.filter((r) => r.status === "Published").length,
      avg: rows.length
        ? rows.reduce((n, r) => n + r.rating, 0) / rows.length
        : 0,
    }),
    [rows]
  );

  const openCreate = () => {
    setEditRow(null);
    setModalOpen(true);
  };
  const save = (payload) => {
    if (payload.id) {
      setRows((prev) =>
        prev.map((x) => (x.id === payload.id ? { ...x, ...payload } : x))
      );
    } else {
      const nextId = Math.max(0, ...rows.map((r) => r.id)) + 1;
      setRows((prev) => [
        { ...payload, id: nextId, date: new Date().toISOString() },
        ...prev,
      ]);
    }
    setModalOpen(false);
  };
  const exportJSON = () => {
    const data = JSON.stringify(rows, null, 2);
    const blob = new Blob([data], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "reviews.json";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 400);
  };

  return (
    <MotionConfig transition={{ duration: 0.28, ease }}>
      <div
        className="flex-1 p-4 sm:p-6 md:p-8 overflow-hidden"
        style={{ background: BRAND.light }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl mb-6 p-5 sm:p-6 md:p-8 text-white shadow"
          style={{
            background: `linear-gradient(135deg, ${BRAND.primary}, #0B5F46)`,
          }}
        >
          <div
            className="absolute -top-24 -left-16 w-72 h-72 rounded-full opacity-20 blur-3xl"
            style={{ background: BRAND.gold }}
          />
          <div
            className="absolute -bottom-24 -right-16 w-72 h-72 rounded-full opacity-20 blur-3xl"
            style={{ background: "#58C1A0" }}
          />
          <div className="absolute inset-0 opacity-30 pointer-events-none bg-[radial-gradient(800px_300px_at_-10%_-60%,rgba(255,255,255,.35),transparent_60%)] animate-[float_12s_ease-in-out_infinite_alternate]" />
          <style>{`@keyframes float{from{transform:translate3d(-1%,-1%,0)}to{transform:translate3d(1%,1%,0)}}`}</style>

          <div className="relative flex items-center justify-between gap-3 flex-wrap">
            <h1 className="text-lg sm:text-2xl font-extrabold tracking-tight">
              Reviews
            </h1>
            <div className="flex items-center gap-2">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={exportJSON}
                className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-white/30 bg-white/10 hover:bg-white/20"
              >
                <FaDownload /> Export
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={openCreate}
                className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-white/15 ring-1 ring-white/30 hover:bg-white/25"
              >
                <FaPlus /> New Review
              </motion.button>
            </div>
          </div>
          <p className="relative mt-1 opacity-90 text-sm">
            Cards are equal-height, actions perfectly aligned, and scale down
            gracefully on phones.
          </p>
        </motion.div>

        {/* Stat tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          {[
            { t: "Total", v: stats.total, from: "#0E7C5A", to: "#0B5F46" },
            {
              t: "Published",
              v: stats.published,
              from: "#2C3E50",
              to: "#1B2A38",
            },
            {
              t: "Average Rating",
              v: `${stats.avg.toFixed(1)} / 5`,
              from: "#D4AF37",
              to: "#B98F21",
            },
          ].map((k, i) => (
            <motion.div
              key={k.t}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 * i, ease }}
              whileHover={{ y: -3, boxShadow: "0 14px 30px rgba(0,0,0,0.08)" }}
              className="relative overflow-hidden rounded-2xl p-4 sm:p-5 text-white"
              style={{
                background: `linear-gradient(135deg, ${k.from}, ${k.to})`,
              }}
            >
              <div className="absolute inset-0 opacity-25 pointer-events-none bg-[radial-gradient(600px_220px_at_-10%_-60%,rgba(255,255,255,.35),transparent_60%)]" />
              <div className="relative text-sm opacity-95">{k.t}</div>
              <div className="relative mt-1 text-xl sm:text-2xl font-extrabold">
                {k.v}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur rounded-2xl shadow p-4 mb-4 border border-slate-100"
        >
          <div className="grid gap-3">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex-1 min-w-[160px] w-full flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[#0E7C5A33]">
                <FaSearch className="text-slate-400" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search name, course or review…"
                  className="w-full outline-none bg-transparent"
                />
              </div>
              <button className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-slate-200 hover:bg-slate-50">
                <FaFilter /> Filters
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <SoftSelect
                label="Course"
                value={course}
                onChange={setCourse}
                options={[
                  { label: "All", value: "All" },
                  ...COURSES.map((c) => ({ label: c, value: c })),
                ]}
              />
              <SoftSelect
                label="Status"
                value={status}
                onChange={setStatus}
                options={["All", "Published", "Pending", "Hidden"]}
              />
              <div className="grid grid-cols-2 gap-3">
                <SoftSelect
                  label="Sort"
                  value={`${sort.key}:${sort.dir}`}
                  onChange={(v) => {
                    const [k, d] = String(v).split(":");
                    setSort({ key: k, dir: d });
                  }}
                  options={[
                    { label: "Newest", value: "date:desc" },
                    { label: "Oldest", value: "date:asc" },
                    { label: "Name A→Z", value: "name:asc" },
                    { label: "Name Z→A", value: "name:desc" },
                    { label: "Rating High", value: "rating:desc" },
                    { label: "Rating Low", value: "rating:asc" },
                  ]}
                />
                <label className="grid gap-1 text-sm">
                  <span className="text-slate-600">Min rating</span>
                  <div className="px-3 py-2 rounded-lg border border-slate-200">
                    <Stars value={ratingMin} onChange={setRatingMin} />
                  </div>
                </label>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Grid (auto-fill, responsive min width) */}
        {loading ? (
          <Skeleton rows={6} />
        ) : filtered.length === 0 ? (
          <div className="grid place-items-center py-16">
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="mx-auto w-16 h-16 rounded-full bg-[#0E7C5A10] grid place-items-center border border-[#0E7C5A22]">
                <FaSearch className="text-[#0E7C5A]" />
              </div>
              <div className="mt-3 font-semibold text-slate-700">
                No reviews match your filters
              </div>
              <div className="text-sm text-slate-500">
                Try clearing filters or lowering the minimum rating.
              </div>
            </motion.div>
          </div>
        ) : (
          <motion.div
            layout
            className="grid gap-4"
            style={{
              gridTemplateColumns: `repeat(auto-fill, minmax(${cardMin}px, 1fr))`,
              gridAutoRows: "1fr",
            }}
          >
            <AnimatePresence initial={false}>
              {filtered.map((r) => (
                <ReviewCard
                  key={r.id}
                  r={r}
                  onView={setViewRow}
                  onEdit={(row) => {
                    setEditRow(row);
                    setModalOpen(true);
                  }}
                  onDelete={(row) => {
                    setRows((prev) => prev.filter((x) => x.id !== row.id));
                  }}
                  onToggleStatus={(row) => {
                    setRows((prev) =>
                      prev.map((x) =>
                        x.id === row.id
                          ? {
                              ...x,
                              status:
                                x.status === "Published"
                                  ? "Hidden"
                                  : "Published",
                            }
                          : x
                      )
                    );
                  }}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* View modal */}
        <AnimatePresence>
          {viewRow && (
            <ModalShell title="Review" onClose={() => setViewRow(null)}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <img
                    src={
                      viewRow.avatar ||
                      `https://i.pravatar.cc/120?u=${viewRow.name}`
                    }
                    alt={viewRow.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-[#0B1324]">
                      {viewRow.name} • {viewRow.role}
                    </div>
                    <div className="text-xs text-slate-500">
                      {viewRow.course} •{" "}
                      {new Date(viewRow.date).toLocaleString()}
                    </div>
                  </div>
                </div>
                <Stars value={viewRow.rating} size={18} />
              </div>
              <p className="mt-3 text-slate-700 leading-relaxed">
                {viewRow.text}
              </p>
            </ModalShell>
          )}
        </AnimatePresence>

        {/* Create/Edit modal */}
        <AnimatePresence>
          {modalOpen && (
            <ModalShell
              title={editRow ? "Edit Review" : "New Review"}
              onClose={() => setModalOpen(false)}
            >
              <ReviewForm
                value={editRow}
                onCancel={() => setModalOpen(false)}
                onSubmit={save}
              />
            </ModalShell>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
};
