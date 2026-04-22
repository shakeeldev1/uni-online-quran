import { useEffect, useMemo, useRef, useState } from "react";
import {
  FaSearch,
  FaFilter,
  FaDownload,
  FaTimes,
  FaBookOpen,
  FaChalkboardTeacher,
  FaStar,
  FaPen,
  FaTrashAlt,
  FaEye,
  FaPlay,
  FaThLarge,
  FaListUl,
  FaClock,
  FaUserGraduate,
  FaTag,
  FaCheck,
  FaPlus,
  FaCheckCircle,
} from "react-icons/fa";

const ease = [0.16, 1, 0.3, 1];
const cls = (...s) => s.filter(Boolean).join(" ");

/* ───────────────── Helpers ───────────────── */
const useMedia = (query) => {
  const get = () =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false;
  const [match, setMatch] = useState(get);
  useEffect(() => {
    const m = window.matchMedia(query);
    const fn = () => setMatch(m.matches);
    if (m.addEventListener) m.addEventListener("change", fn);
    else m.addListener(fn);
    return () =>
      m.removeEventListener
        ? m.removeEventListener("change", fn)
        : m.removeListener(fn);
  }, [query]);
  return match;
};

const scrollToTop = (target) => {
  const top =
    (typeof target?.offsetTop === "number" ? target.offsetTop : 0) - 8;
  window.scrollTo({ top, behavior: "smooth" });
};

const setQueryPage = (page) => {
  const url = new URL(window.location.href);
  url.searchParams.set("page", String(page));
  window.history.pushState({}, "", url.toString());
};
const getQueryPage = () => {
  const url = new URL(window.location.href);
  const p = parseInt(url.searchParams.get("page") || "1", 10);
  return Number.isNaN(p) || p < 1 ? 1 : p;
};

/* ───────────────── UI atoms ───────────────── */
const StatusBadge = ({ s }) => {
  const map = {
    Live: { fg: "#0E7C5A", bg: "#0E7C5A1A" },
    Draft: { fg: "#64748B", bg: "#64748B1A" },
    Archived: { fg: "#991B1B", bg: "#991B1B1A" },
  };
  const { fg, bg } = map[s] || map.Draft;
  return (
    <span
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
      style={{ color: fg, background: bg }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: fg }} />
      {s}
    </span>
  );
};

const LevelBadge = ({ lvl }) => {
  const map = {
    Beginner: "#A7F3D0",
    Intermediate: "#FDE68A",
    Advanced: "#C4B5FD",
  };
  const bg = map[lvl] || "#E5E7EB";
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold"
      style={{ color: "#1E293B", background: `${bg}66` }}
    >
      {lvl}
    </span>
  );
};

const IconBtn = ({
  children,
  label,
  onClick,
  variant = "neutral",
  disabled,
}) => {
  const styles = {
    neutral:
      "border-slate-200 text-slate-600 hover:bg-slate-50 focus-visible:ring-slate-300",
    view: "border-emerald-200 text-emerald-600 hover:bg-emerald-50 focus-visible:ring-emerald-300",
    edit: "border-amber-200  text-amber-600  hover:bg-amber-50  focus-visible:ring-amber-300",
    delete:
      "border-rose-200   text-rose-600   hover:bg-rose-50   focus-visible:ring-rose-300",
  }[variant];
  return (
    <button
      type="button"
      aria-label={label}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      whileHover={disabled ? undefined : { y: -1 }}
      whileTap={disabled ? undefined : { y: 0 }}
      className={cls(
        "ripple relative inline-flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-lg border transition outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        styles,
        disabled && "opacity-50 cursor-not-allowed"
      )}
      title={label}
      style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
    >
      <span className="text-[15px]">{children}</span>
    </button>
  );
};

const Head = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="text-left text-xs uppercase tracking-wide text-slate-500 hover:text-slate-700 transition"
  >
    {label}
  </button>
);

const Field = ({ label, children }) => (
  <label className="grid gap-1 text-sm">
    <span className="text-slate-600">{label}</span>
    {children}
  </label>
);

/* ───────────────── Select (animated dropdown; mobile-safe clamp + flip) ─ */
const useOutside = (refs, onClose) => {
  const list = Array.isArray(refs) ? refs : [refs];
  useEffect(() => {
    const onDown = (e) => {
      for (const r of list)
        if (r?.current && r.current.contains(e.target)) return;
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

const Select = ({ label, value, options, onChange }) => {
  const isPhone = useMedia("(max-width: 480px)");
  const btnRef = useRef(null);
  const popRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({
    top: 0,
    left: 0,
    width: 220,
    flip: false,
    bottom: undefined,
  });
  const opts = options.map((o) =>
    typeof o === "string" ? { label: o, value: o } : o
  );
  const current = opts.find((o) => o.value === value) || opts[0];

  const place = () => {
    if (!btnRef.current) return;
    const r = btnRef.current.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const margin = 12;

    const width = Math.min(Math.max(220, r.width), vw - margin * 2, 560);
    const left = Math.min(
      Math.max(margin, r.left + (r.width - width) / 2),
      vw - width - margin
    );

    const belowSpace = vh - (r.bottom + 6) - margin;
    const aboveSpace = r.top - 6 - margin;

    const wantBelow = belowSpace >= 220 || belowSpace >= aboveSpace;
    const top = wantBelow ? r.bottom + 6 : r.top - 6;
    const bottom = wantBelow ? undefined : vh - (r.top - 6);
    setPos({ top, left, width, flip: !wantBelow, bottom });
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

  useOutside([btnRef, popRef], () => setOpen(false));

  return (
    <div className="grid gap-1 text-sm min-w-[160px]">
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
        <span
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.18 }}
        >
          ▾
        </span>
      </button>

      {open && (
        <div
          ref={popRef}
          initial={{ opacity: 0, y: -6, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.98 }}
          transition={{ duration: 0.2, ease }}
          className="fixed z-50 rounded-xl border border-slate-200 bg-white shadow-2xl overflow-hidden"
          style={{
            left: pos.left,
            width: pos.width,
            maxHeight: isPhone ? "50vh" : 320,
            top: pos.flip ? undefined : pos.top,
            bottom: pos.flip ? pos.bottom : undefined,
          }}
        >
          <ul className="overflow-auto" role="menu" aria-label={label}>
            {opts.map((o) => {
              const active = o.value === value;
              return (
                <li key={o.value}>
                  <button
                    role="menuitemradio"
                    aria-checked={active}
                    onClick={() => {
                      onChange(o.value);
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
                    {o.label}
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

/* ───────────────── Images (placeholders) ───────────────── */
const QURAN_WEBSITE_IMAGES = {};
const FALLBACK_QURAN = {
  tajweed:
    "https://qtstutor.com/wp-content/uploads/2025/02/online-Quran-classes-with-Tajweed.jpg",
  hifz: "https://qiratulquran.com/wp-content/uploads/2024/10/How-to-Do-Hifz-at-Home.webp",
  tafseer:
    "https://alfalahquranacademy.com/wp-content/uploads/2017/04/al-falah-Quran-academy-tafseer-ul-quran_yellow.jpg",
  kids: "https://hoorainquranacademyonline.com/wp-content/uploads/2025/06/quran-recitation-for-kids-1024x683-1.jpg",
  studies:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSevvC-mK2xSxYqCdf_sHnYzpHT4wnvUoovgQ&s",
  arabic:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQvNFbowNQajiHhICsupLNWqjTtJrzV2rgyA&s",
};
const qImg = (key) => QURAN_WEBSITE_IMAGES[key] || FALLBACK_QURAN[key];

/* ───────────────── Demo data ───────────────── */
const seed = [
  {
    id: 101,
    title: "Tajweed Mastery",
    category: "Tajweed",
    level: "Intermediate",
    tutor: "Ustadh Imran",
    students: 128,
    rating: 4.8,
    status: "Live",
    updated: "2025-09-06",
    duration: "12 weeks",
    sessions: 24,
    price: 149,
    thumb: qImg("tajweed"),
  },
  {
    id: 102,
    title: "Hifz (Memorization)",
    category: "Hifz",
    level: "Advanced",
    tutor: "Qari Zainab",
    students: 96,
    rating: 4.9,
    status: "Live",
    updated: "2025-09-07",
    duration: "20 weeks",
    sessions: 40,
    price: 199,
    thumb: qImg("hifz"),
  },
  {
    id: 103,
    title: "Tafseer Essentials",
    category: "Tafseer",
    level: "Beginner",
    tutor: "Ustadha Aisha",
    students: 84,
    rating: 4.6,
    status: "Live",
    updated: "2025-09-04",
    duration: "10 weeks",
    sessions: 20,
    price: 129,
    thumb: qImg("tafseer"),
  },
  {
    id: 104,
    title: "Kids’ Quran Classes",
    category: "Kids",
    level: "Beginner",
    tutor: "Ustadh Ali",
    students: 152,
    rating: 4.7,
    status: "Live",
    updated: "2025-09-05",
    duration: "8 weeks",
    sessions: 16,
    price: 99,
    thumb: qImg("kids"),
  },
  {
    id: 105,
    title: "Islamic Studies Track",
    category: "Islamic Studies",
    level: "Intermediate",
    tutor: "Ustadha Maryam",
    students: 73,
    rating: 4.5,
    status: "Draft",
    updated: "2025-09-03",
    duration: "14 weeks",
    sessions: 28,
    price: 139,
    thumb: qImg("studies"),
  },
  {
    id: 106,
    title: "Arabic for Quran",
    category: "Arabic",
    level: "Beginner",
    tutor: "Ustadh Bilal",
    students: 61,
    rating: 4.3,
    status: "Archived",
    updated: "2025-08-28",
    duration: "12 weeks",
    sessions: 24,
    price: 119,
    thumb: qImg("arabic"),
  },
];

/* ───────────────── Edit / Create Form ───────────────── */
const EditForm = ({ course, onCancel, onSubmit }) => {
  const isEdit = Boolean(course?.id);
  const [form, setForm] = useState({
    id: course?.id,
    title: course?.title || "",
    tutor: course?.tutor || "",
    level: course?.level || "Beginner",
    status: course?.status || "Live",
    students: course?.students ?? 0,
    duration: course?.duration || "",
    sessions: course?.sessions ?? 0,
    price: course?.price ?? 0,
    category: course?.category || "Tajweed",
    thumb: course?.thumb || qImg("tajweed"),
    rating: course?.rating ?? 0,
    updated: course?.updated || new Date().toISOString().slice(0, 10),
  });

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <form
      className="grid gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        if (!form.title.trim()) {
          alert("Title is required");
          return;
        }
        onSubmit(form);
      }}
    >
      <Field label="Title">
        <input
          className="w-full px-3 py-2 rounded-md border border-slate-200"
          value={form.title}
          onChange={(e) => set("title", e.target.value)}
          placeholder="e.g. Advanced Tajweed Program"
          required
        />
      </Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Tutor">
          <input
            className="w-full px-3 py-2 rounded-md border border-slate-200"
            value={form.tutor}
            onChange={(e) => set("tutor", e.target.value)}
            placeholder="e.g. Ustadh Imran"
          />
        </Field>
        <Field label="Level">
          <select
            className="w-full px-3 py-2 rounded-md border border-slate-200"
            value={form.level}
            onChange={(e) => set("level", e.target.value)}
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </Field>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Status">
          <select
            className="w-full px-3 py-2 rounded-md border border-slate-200"
            value={form.status}
            onChange={(e) => set("status", e.target.value)}
          >
            <option>Live</option>
            <option>Draft</option>
            <option>Archived</option>
          </select>
        </Field>
        <Field label="Students">
          <input
            type="number"
            className="w-full px-3 py-2 rounded-md border border-slate-200"
            value={form.students}
            onChange={(e) => set("students", Number(e.target.value))}
          />
        </Field>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Duration">
          <input
            className="w-full px-3 py-2 rounded-md border border-slate-200"
            value={form.duration}
            onChange={(e) => set("duration", e.target.value)}
            placeholder="e.g. 12 weeks"
          />
        </Field>
        <Field label="Sessions">
          <input
            type="number"
            className="w-full px-3 py-2 rounded-md border border-slate-200"
            value={form.sessions}
            onChange={(e) => set("sessions", Number(e.target.value))}
          />
        </Field>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Price ($)">
          <input
            type="number"
            className="w-full px-3 py-2 rounded-md border border-slate-200"
            value={form.price}
            onChange={(e) => set("price", Number(e.target.value))}
          />
        </Field>
        <Field label="Category">
          <select
            className="w-full px-3 py-2 rounded-md border border-slate-200"
            value={form.category}
            onChange={(e) => {
              set("category", e.target.value);
              set(
                "thumb",
                qImg(
                  e.target.value.toLowerCase().includes("islamic")
                    ? "studies"
                    : e.target.value.toLowerCase()
                )
              );
            }}
          >
            {[
              "Tajweed",
              "Hifz",
              "Tafseer",
              "Kids",
              "Islamic Studies",
              "Arabic",
            ].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </Field>
      </div>
      <Field label="Thumbnail URL">
        <input
          className="w-full px-3 py-2 rounded-md border border-slate-200"
          value={form.thumb}
          onChange={(e) => set("thumb", e.target.value)}
          placeholder="https://…"
        />
      </Field>

      <div className="mt-2 flex items-center justify-between gap-2">
        <div className="text-xs text-slate-500">
          Last updated: {new Date(form.updated).toLocaleDateString()}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="ripple px-3 py-2 rounded-md border border-slate-200 hover:bg-slate-50"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="ripple inline-flex items-center gap-2 px-3 py-2 rounded-md text-white hover:opacity-95"
            style={{ background: "#0E7C5A" }}
          >
            <FaCheck /> {isEdit ? "Save Changes" : "Create Course"}
          </button>
        </div>
      </div>
    </form>
  );
};

/* ───────────────── Course Card ───────────────── */
const CourseCard = ({ c, onView, onEdit, onDelete }) => (
  <div className="group relative bg-white rounded-2xl shadow overflow-hidden border border-slate-100 hover-lift">
    <div className="relative aspect-[16/9] sm:aspect-[5/2] overflow-hidden">
      <img
        src={c.thumb}
        alt={`${c.title} thumbnail`}
        loading="lazy"
        className="w-full h-full object-cover"
      />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(212,175,55,.15), transparent)",
        }}
      />
      <div className="absolute top-2 left-2 flex items-center gap-2">
        <LevelBadge lvl={c.level} />
        <StatusBadge s={c.status} />
      </div>
    </div>

    <div className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-[#0B1324] truncate">
            {c.title}
          </h3>
          <div className="mt-1 text-xs text-slate-500 truncate flex items-center gap-2">
            <FaChalkboardTeacher className="opacity-70" /> {c.tutor}
          </div>
        </div>
        <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-amber-600">
          <FaStar className="opacity-80" /> {c.rating.toFixed(1)}
        </span>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 text-[12px] text-slate-600">
        <div className="inline-flex items-center gap-1.5">
          <FaClock /> {c.duration || "—"}
        </div>
        <div className="inline-flex items-center gap-1.5">
          <FaUserGraduate /> {c.students} students
        </div>
        <div className="inline-flex items-center gap-1.5">
          <FaTag /> ${c.price}
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <span className="px-2 py-1 rounded-full text-[11px] bg-emerald-50 text-emerald-700">
          {c.category}
        </span>
        <span className="px-2 py-1 rounded-full text-[11px] bg-slate-50 text-slate-700">
          Sessions: {c.sessions}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-xs text-slate-500">
          Updated {new Date(c.updated).toLocaleDateString()}
        </div>
        <div className="flex items-center gap-2">
          <IconBtn label="View" variant="view" onClick={onView}>
            <FaEye />
          </IconBtn>
          <IconBtn label="Update" variant="edit" onClick={onEdit}>
            <FaPen />
          </IconBtn>
          <IconBtn label="Delete" variant="delete" onClick={onDelete}>
            <FaTrashAlt />
          </IconBtn>
        </div>
      </div>
    </div>
  </div>
);

/* ───────────────── Page ───────────────── */
export const Courses = () => {
  const isMobile = useMedia("(max-width: 767px)");
  const isXS = useMedia("(max-width: 360px)");
  const isSM = useMedia("(max-width: 640px)");
  const commandRef = useRef(null);
  const listRef = useRef(null);

  const cardMin = isXS ? 200 : isSM ? 240 : 280;

  const [q, setQ] = useState("");
  const [level, setLevel] = useState("All");
  const [status, setStatus] = useState("All");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState({ key: "updated", dir: "desc" });
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [mode, setMode] = useState("cards");
  const [drawer, setDrawer] = useState(null);
  const [editCourse, setEditCourse] = useState(null);
  const [deleteCourse, setDeleteCourse] = useState(null);
  const [toast, setToast] = useState(null);

  const perPage = 6;

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      setData(seed);
      const initial = getQueryPage();
      setPage(initial);
      setLoading(false);
    }, 450);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (isMobile) setMode("cards");
  }, [isMobile]);
  useEffect(() => {
    if (!loading) setQueryPage(page);
  }, [page, loading]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(data.map((d) => d.category)))],
    [data]
  );
  const filtered = useMemo(() => {
    let out = [...data];
    if (q.trim()) {
      const t = q.toLowerCase();
      out = out.filter(
        (c) =>
          c.title.toLowerCase().includes(t) || c.tutor.toLowerCase().includes(t)
      );
    }
    if (category !== "All") out = out.filter((c) => c.category === category);
    if (status !== "All") out = out.filter((c) => c.status === status);
    if (level !== "All") out = out.filter((c) => c.level === level);

    out.sort((a, b) => {
      const k = sort.key;
      let av = a[k],
        bv = b[k];
      if (k === "updated") {
        av = +new Date(a.updated);
        bv = +new Date(b.updated);
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
  }, [data, q, category, status, level, sort]);

  const total = filtered.length;
  const pages = Math.max(1, Math.ceil(total / perPage));
  const pageData = filtered.slice((page - 1) * perPage, page * perPage);
  useEffect(() => {
    if (page > pages) setPage(pages);
  }, [pages, page]);

  const allChecked =
    pageData.length > 0 && pageData.every((c) => selected.includes(c.id));
  const toggleAll = () => {
    if (allChecked)
      setSelected((prev) =>
        prev.filter((id) => !pageData.find((c) => c.id === id))
      );
    else
      setSelected((prev) => [
        ...new Set([...prev, ...pageData.map((c) => c.id)]),
      ]);
  };
  const toggleOne = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const exportCSV = () => alert("Export current view to CSV");

  const applyUpdate = (payload) => {
    if (payload.id) {
      setData((prev) =>
        prev.map((c) =>
          c.id === payload.id
            ? {
                ...c,
                ...payload,
                updated: new Date().toISOString().slice(0, 10),
              }
            : c
        )
      );
      setToast({ title: "Course updated", desc: payload.title });
    } else {
      const nextId = Math.max(0, ...data.map((d) => d.id)) + 1;
      const newCourse = {
        ...payload,
        id: nextId,
        rating: 0,
        updated: new Date().toISOString().slice(0, 10),
      };
      setData((prev) => [newCourse, ...prev]);
      setPage(1);
      setToast({ title: "Course added", desc: newCourse.title });
      sparkle();
    }
    setEditCourse(null);
    setTimeout(() => setToast(null), 1800);
  };

  const applyDelete = (id) => {
    const item = data.find((d) => d.id === id);
    setData((prev) => prev.filter((c) => c.id !== id));
    setDeleteCourse(null);
    setSelected((prev) => prev.filter((x) => x !== id));
    setToast({ title: "Course deleted", desc: item?.title || `#${id}` });
    setTimeout(() => setToast(null), 1500);
  };

  const openAdd = () => {
    setEditCourse({
      title: "",
      tutor: "",
      level: "Beginner",
      status: "Live",
      students: 0,
      duration: "",
      sessions: 0,
      price: 0,
      category: "Tajweed",
      thumb: qImg("tajweed"),
      updated: new Date().toISOString().slice(0, 10),
      rating: 0,
    });
  };

  const goPage = (n) => {
    const next = Math.min(Math.max(1, n), pages);
    if (next === page) return;
    setPage(next);
    setTimeout(() => scrollToTop(listRef.current || document.body), 10);
  };
  const goPrev = () => goPage(page - 1);
  const goNext = () => goPage(page + 1);

  const sparkle = () => {
    const root = document.body;
    const colors = ["#34d399", "#d4af37", "#60a5fa"];
    for (let i = 0; i < 12; i++) {
      const s = document.createElement("span");
      s.textContent = "✦";
      s.style.position = "fixed";
      s.style.left = 50 + (Math.random() * 20 - 10) + "vw";
      s.style.top = 20 + Math.random() * 10 + "vh";
      s.style.color = colors[i % colors.length];
      s.style.fontSize = 10 + Math.random() * 10 + "px";
      s.style.pointerEvents = "none";
      s.style.animation = "pop .9s ease forwards";
      root.appendChild(s);
      setTimeout(() => root.removeChild(s), 900);
    }
  };

  const counts = useMemo(
    () => ({
      all: data.length,
      live: data.filter((d) => d.status === "Live").length,
      drafts: data.filter((d) => d.status === "Draft").length,
    }),
    [data]
  );

  return (
    <div
      className="relative flex-1 p-4 sm:p-6 md:p-8 overflow-hidden"
      style={{ background: "#F5F7FA" }}
    >
      {/* Toast */}

      {toast && (
        <div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-white border border-emerald-200 text-emerald-800 rounded-full shadow-lg px-4 py-2 flex items-center gap-2"
        >
          <FaCheckCircle />
          <div className="text-sm font-medium">{toast.title}</div>
          {toast.desc && (
            <div className="text-xs text-emerald-700">• {toast.desc}</div>
          )}
        </div>
      )}

      {/* Hero (keep Add here) */}
      <div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease }}
        className="relative overflow-hidden rounded-2xl mb-6 p-5 sm:p-8 text-white shadow"
        style={{
          background: `linear-gradient(135deg, #0E7C5A, #0B5F46)`,
        }}
      >
        <div className="absolute inset-0 aurora opacity-35" />
        <div className="relative">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="grid place-items-center w-11 h-11 rounded-full bg-white/15 ring-1 ring-white/20">
                <FaBookOpen />
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                Courses
              </h1>
            </div>
            <button
              whileTap={{ scale: 0.98 }}
              whileHover={{ y: -1 }}
              onClick={openAdd}
              className="ripple inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/90 text-[#0B1324] ring-1 ring-white/50 hover:bg-white"
            >
              <FaPlus /> Add Course
            </button>
          </div>
          <p className="mt-1 opacity-90 text-sm">
            Manage Quran offerings with live status and enrollments.
          </p>
        </div>
      </div>

      {/* KPI tiles */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            t: "Total Courses",
            v: counts.all,
            from: "#0E7C5A",
            to: "#0B5F46",
            icon: <FaBookOpen />,
          },
          {
            t: "Live Courses",
            v: counts.live,
            from: "#D4AF37",
            to: "#B98F21",
            icon: <FaPlay />,
          },
          {
            t: "Drafts",
            v: counts.drafts,
            from: "#2C3E50",
            to: "#1B2A38",
            icon: <FaStar />,
          },
        ].map((k, i) => (
          <div
            key={k.t}
            initial={{ opacity: 0, y: 12 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.45, delay: 0.06 * i, ease },
            }}
            className="relative overflow-hidden rounded-2xl p-5 text-white shadow-lg transition-shadow"
            style={{
              background: `linear-gradient(135deg, ${k.from}, ${k.to})`,
            }}
          >
            <div
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{
                background:
                  "radial-gradient(600px 200px at -10% -40%, rgba(255,255,255,.35), transparent 60%)",
              }}
            />
            <div className="relative flex items-center gap-3 min-w-0">
              <div className="shrink-0 grid place-items-center w-11 h-11 rounded-full bg-white/10 ring-1 ring-white/15">
                <span className="text-[18px]">{k.icon}</span>
              </div>
              <div className="min-w-0">
                <div className="text-sm/4 opacity-90 truncate">{k.t}</div>
                <div className="mt-1 text-3xl font-extrabold tracking-tight tabular-nums">
                  {k.v}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Command bar (Add Course button REMOVED here) */}
      <div ref={commandRef} className="bg-white rounded-2xl shadow p-4 mb-4">
        <div className="grid gap-3">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <div
              className="flex-1 min-w-[200px] w-full flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-2"
              whileFocus={{ boxShadow: "0 0 0 6px #0E7C5A22" }}
            >
              <FaSearch className="text-slate-400" />
              <input
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setPage(1);
                }}
                placeholder="Search title or tutor…"
                className="w-full outline-none bg-transparent"
              />
            </div>

            {/* Right actions: scrollable on tight screens */}
            <div className="ml-auto flex items-center gap-2 shrink-0 overflow-x-auto scrollbar-none">
              <div className="inline-flex rounded-lg border border-slate-200 overflow-hidden">
                <button
                  className={cls(
                    "px-3 py-2 text-sm",
                    mode === "cards"
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-slate-600 hover:bg-slate-50"
                  )}
                  onClick={() => setMode("cards")}
                  title="Cards view"
                >
                  <FaThLarge />
                </button>
                <button
                  className={cls(
                    "px-3 py-2 text-sm",
                    mode === "table"
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-slate-600 hover:bg-slate-50",
                    isMobile && "opacity-50 pointer-events-none"
                  )}
                  onClick={() => !isMobile && setMode("table")}
                  title={isMobile ? "Table on larger screens" : "Table view"}
                >
                  <FaListUl />
                </button>
              </div>
              <button className="ripple inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-slate-200 hover:bg-slate-50">
                <FaFilter className="text-slate-500" /> Advanced
              </button>
              <button
                className="ripple inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg text-white hover:opacity-95"
                style={{ background: "#0E7C5A" }}
                onClick={exportCSV}
              >
                <FaDownload className="text-white/90" /> Export
              </button>
            </div>
          </div>

          {/* Dropdown filters */}
          <div className="grid gap-3 sm:grid-cols-3">
            <Select
              label="Course"
              value={category}
              onChange={(v) => {
                setCategory(v);
                setPage(1);
              }}
              options={categories.map((c) => ({ label: c, value: c }))}
            />
            <Select
              label="Status"
              value={status}
              onChange={(v) => {
                setStatus(v);
                setPage(1);
              }}
              options={["All", "Live", "Draft", "Archived"]}
            />
            <Select
              label="Level"
              value={level}
              onChange={(v) => {
                setLevel(v);
                setPage(1);
              }}
              options={["All", "Beginner", "Intermediate", "Advanced"]}
            />
          </div>
        </div>
      </div>

      {/* ====== CARDS VIEW ====== */}
      {mode === "cards" && (
        <div ref={listRef}>
          <div
            key={`cards-page-${page}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease }}
            className="grid gap-4"
            style={{
              gridTemplateColumns: `repeat(auto-fill, minmax(${cardMin}px, 1fr))`,
            }}
          >
            {loading ? (
              [...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-64 rounded-2xl bg-white shadow animate-pulse"
                />
              ))
            ) : pageData.length ? (
              pageData.map((c) => (
                <CourseCard
                  key={c.id}
                  c={c}
                  onView={() => setDrawer(c)}
                  onEdit={() => setEditCourse(c)}
                  onDelete={() => setDeleteCourse(c)}
                />
              ))
            ) : (
              <div className="col-span-full">
                <div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.25 },
                  }}
                  className="grid place-items-center h-48 rounded-2xl bg-white border border-slate-100 text-slate-600"
                >
                  No courses match your filters.
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ====== TABLE VIEW ====== */}
      {mode === "table" && (
        <div ref={listRef} className="hidden md:block mt-4">
          <div className="bg-white/80 backdrop-blur rounded-2xl shadow overflow-hidden border border-slate-100">
            <div className="overflow-x-auto">
              <div className="min-w-[1000px]">
                <div className="sticky top-0 z-10 bg-slate-50/70 backdrop-blur border-b">
                  <div className="grid grid-cols-[64px_1.5fr_2fr_120px] px-2 py-3 text-xs uppercase tracking-wide text-slate-500">
                    <div className="pl-2">
                      <input
                        type="checkbox"
                        checked={
                          pageData.length > 0 &&
                          pageData.every((c) => selected.includes(c.id))
                        }
                        onChange={toggleAll}
                      />
                    </div>
                    <Head
                      label="Course"
                      onClick={() =>
                        setSort((s) => ({
                          key: "title",
                          dir:
                            s.key === "title" && s.dir === "asc"
                              ? "desc"
                              : "asc",
                        }))
                      }
                    />
                    <Head
                      label="Description"
                      onClick={() =>
                        setSort((s) => ({
                          key: "category",
                          dir:
                            s.key === "category" && s.dir === "asc"
                              ? "desc"
                              : "asc",
                        }))
                      }
                    />
                    <div className="pr-3 text-right">Actions</div>
                  </div>
                </div>

                {loading ? (
                  <div className="p-4 space-y-3">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="h-16 rounded-xl bg-slate-100 animate-pulse"
                      />
                    ))}
                  </div>
                ) : (
                  <ul className="divide-y">
                    {pageData.map((c, idx) => (
                      <li
                        key={c.id}
                        className="grid grid-cols-[64px_1.5fr_2fr_120px] items-center px-2 py-3 transition-colors hover:bg-[#0E7C5A06]"
                      >
                        <div className="pl-2">
                          <input
                            type="checkbox"
                            checked={selected.includes(c.id)}
                            onChange={() => toggleOne(c.id)}
                          />
                        </div>
                        <div className="min-w-0 flex items-center gap-3">
                          <img
                            src={c.thumb}
                            alt={c.title}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <div className="font-medium text-[#0B1324]">
                              {c.title}
                            </div>
                            <div className="text-xs text-slate-500">
                              {c.category}
                            </div>
                          </div>
                        </div>
                        <div className="min-w-0 pr-4">
                          <div className="text-sm text-slate-600 truncate">
                            <span className="font-medium">Tutor:</span> {c.tutor} • <span className="font-medium">Level:</span> {c.level} • <span className="font-medium">Students:</span> {c.students}
                          </div>
                          <div className="text-xs text-slate-500 mt-1">
                            {c.duration} • {c.sessions} sessions • ${c.price}
                          </div>
                        </div>
                        <div className="pr-3">
                          <div className="flex items-center justify-end gap-3">
                            <IconBtn
                              label="View"
                              variant="view"
                              onClick={() => setDrawer(c)}
                            >
                              <FaEye />
                            </IconBtn>
                            <IconBtn
                              label="Update"
                              variant="edit"
                              onClick={() => setEditCourse(c)}
                            >
                              <FaPen />
                            </IconBtn>
                            <IconBtn
                              label="Delete"
                              variant="delete"
                              onClick={() => setDeleteCourse(c)}
                            >
                              <FaTrashAlt />
                            </IconBtn>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}

                {!loading && (
                  <div className="flex items-center justify-between px-4 py-3 text-sm text-slate-600 border-t">
                    <span>
                      Showing {(page - 1) * perPage + 1}–
                      {Math.min(page * perPage, total)} of {total}
                    </span>

                    {/* Desktop pager */}
                    <div className="hidden md:flex items-center gap-1">
                      <button
                        className="ripple px-3 py-1.5 rounded-full border border-slate-200 hover:bg-slate-50 disabled:opacity-50"
                        onClick={goPrev}
                        disabled={page === 1}
                      >
                        ← Previous
                      </button>
                      {[...Array(pages)].map((_, i) => (
                        <button
                          key={i}
                          className={cls(
                            "ripple px-3 py-1.5 rounded-full border transition",
                            page === i + 1
                              ? "bg-[#0E7C5A] text-white border-transparent"
                              : "border-slate-200 hover:bg-slate-50"
                          )}
                          onClick={() => goPage(i + 1)}
                        >
                          {i + 1}
                        </button>
                      ))}
                      <button
                        className="ripple px-3 py-1.5 rounded-full border border-slate-200 hover:bg-slate-50 disabled:opacity-50"
                        onClick={goNext}
                        disabled={page === pages}
                      >
                        Next →
                      </button>
                    </div>

                    {/* Mobile compact pager */}
                    <div className="flex md:hidden items-center gap-2">
                      <button
                        className="ripple px-3 py-1.5 rounded-full border border-slate-200 hover:bg-slate-50 disabled:opacity-50"
                        onClick={goPrev}
                        disabled={page === 1}
                      >
                        ← Prev
                      </button>
                      <span className="tabular-nums">
                        {page} / {pages}
                      </span>
                      <button
                        className="ripple px-3 py-1.5 rounded-full border border-slate-200 hover:bg-slate-50 disabled:opacity-50"
                        onClick={goNext}
                        disabled={page === pages}
                      >
                        Next →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Drawer */}

      {drawer && (
        <>
          <div
            className="fixed inset-0 bg-black/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDrawer(null)}
          />
          <aside
            initial={{ x: "100%" }}
            animate={{ x: 0, transition: { duration: 0.35, ease } }}
            exit={{ x: "100%" }}
            className="fixed right-0 top-0 h-[100svh] w-full max-w-md bg-white shadow-2xl z-50 flex flex-col pb-[env(safe-area-inset-bottom)]"
          >
            <div className="p-4 border-b flex items-center justify-between">
              <h3
                className="text-lg font-semibold"
                style={{ color: "#2C3E50" }}
              >
                Course Details
              </h3>
              <button
                className="ripple w-9 h-9 rounded-md border border-slate-200 hover:bg-slate-50"
                onClick={() => setDrawer(null)}
                title="Close"
              >
                <FaTimes className="mx-auto" />
              </button>
            </div>
            <div className="p-6 space-y-4 overflow-y-auto overscroll-contain flex-1">
              <div className="rounded-xl overflow-hidden border border-slate-100">
                <img
                  src={drawer.thumb}
                  alt={`${drawer.title} cover`}
                  loading="lazy"
                  className="w-full h-40 object-cover"
                />
              </div>
              <div>
                <div className="text-xl font-bold">{drawer.title}</div>
                <div className="text-slate-500">by {drawer.tutor}</div>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <LevelBadge lvl={drawer.level} />
                  <StatusBadge s={drawer.status} />
                  <span className="px-2 py-1 rounded-full text-[11px] bg-emerald-50 text-emerald-700">
                    {drawer.category}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-slate-500">Students:</span>{" "}
                  {drawer.students}
                </div>
                <div>
                  <span className="text-slate-500">Rating:</span>{" "}
                  {drawer.rating.toFixed(1)}
                </div>
                <div>
                  <span className="text-slate-500">Duration:</span>{" "}
                  {drawer.duration || "—"}
                </div>
                <div>
                  <span className="text-slate-500">Sessions:</span>{" "}
                  {drawer.sessions}
                </div>
                <div>
                  <span className="text-slate-500">Price:</span> ${drawer.price}
                </div>
                <div>
                  <span className="text-slate-500">Updated:</span>{" "}
                  {new Date(drawer.updated).toLocaleDateString()}
                </div>
                <div>
                  <span className="text-slate-500">Course ID:</span> #
                  {drawer.id}
                </div>
              </div>
              <div className="pt-2 border-t">
                <div className="text-sm text-slate-500 mb-2">Notes</div>
                <p className="text-slate-700">
                  Connect to backend to show syllabus, session count, and
                  enrolled cohorts.
                </p>
              </div>
            </div>
          </aside>
        </>
      )}

      {/* Edit/Create modal */}

      {editCourse && (
        <>
          <div
            className="fixed inset-0 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setEditCourse(null)}
          />
          <div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, transition: { duration: 0.25 } }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center p-4"
          >
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3
                  className="text-lg font-semibold"
                  style={{ color: "#2C3E50" }}
                >
                  {editCourse.id ? "Update Course" : "Add Course"}
                </h3>
                <button
                  className="ripple w-9 h-9 rounded-md border border-slate-200 hover:bg-slate-50"
                  onClick={() => setEditCourse(null)}
                >
                  <FaTimes className="mx-auto" />
                </button>
              </div>
              <EditForm
                course={editCourse}
                onCancel={() => setEditCourse(null)}
                onSubmit={applyUpdate}
              />
            </div>
          </div>
        </>
      )}

      {/* Delete confirm */}

      {deleteCourse && (
        <>
          <div
            className="fixed inset-0 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDeleteCourse(null)}
          />
          <div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, transition: { duration: 0.25 } }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center p-4"
          >
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: "#2C3E50" }}
              >
                Confirm Delete
              </h3>
              <p className="text-slate-600 mb-4">
                Delete <b>{deleteCourse.title}</b>? This action cannot be
                undone.
              </p>
              <div className="flex items-center justify-end gap-2">
                <button
                  className="ripple px-3 py-2 rounded-md border border-slate-200 hover:bg-slate-50"
                  onClick={() => setDeleteCourse(null)}
                >
                  Cancel
                </button>
                <button
                  className="ripple px-3 py-2 rounded-md text-white bg-rose-600 hover:opacity-95"
                  onClick={() => applyDelete(deleteCourse.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Mobile quick bar (kept) */}

      {isMobile && !(drawer || editCourse || deleteCourse) && (
        <nav
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 bg-white/95 backdrop-blur border border-slate-200 shadow-xl rounded-full px-3 py-2 flex items-center gap-2 safe-bottom pointer-events-auto overflow-x-auto scrollbar-none"
          style={{ bottom: `calc(12px + env(safe-area-inset-bottom))` }}
        >
          <button
            className="ripple px-3 py-1.5 rounded-full text-sm text-white"
            style={{ background: "#0E7C5A" }}
            onClick={openAdd}
          >
            <FaPlus className="-mt-0.5 mr-1" />
            Add
          </button>
          <button
            className="ripple px-3 py-1.5 rounded-full text-sm border border-slate-200"
            onClick={() => {
              commandRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <FaFilter className="inline -mt-0.5 mr-1" />
            Filters
          </button>
        </nav>
      )}
    </div>
  );
};
