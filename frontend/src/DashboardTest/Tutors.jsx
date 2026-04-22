import { useEffect, useMemo, useRef, useState } from "react";
import {
  FaSearch,
  FaFilter,
  FaTimes,
  FaUserTie,
  FaStar,
  FaPen,
  FaTrashAlt,
  FaEye,
  FaChalkboardTeacher,
  FaThLarge,
  FaListUl,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaShieldAlt,
  FaCalendarAlt,
  FaPlus,
} from "react-icons/fa";
import { EditForm } from "./TutorSections/EditForm";
import { Field } from "./UserSections/EditForm";
import {
  ActionsMenu,
  IconBtn,
  SoftSelect,
  StatusBadge,
  useMedia,
  useOutside,
} from "./UserSections/Exports";

/* ───────────────── helpers ───────────────── */
const cls = (...s) => s.filter(Boolean).join(" ");

/* ───────────────── UI atoms ───────────────── */

const SubjectTag = ({ t }) => (
  <span className="px-2 py-1 rounded-full text-[11px] bg-emerald-50 text-emerald-700">
    {t}
  </span>
);
const FeatureChip = ({ label, icon }) => (
  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] bg-slate-50 text-slate-700 border border-slate-200">
    <span className="text-[12px]">{icon}</span> {label}
  </span>
);
/* ───────────────── Demo data ───────────────── */
const seed = [
  {
    id: 201,
    name: "Ustadh Imran",
    email: "imran@example.com",
    phone: "+974-5555-0101",
    gender: "Male",
    status: "Active",
    subjects: ["Tajweed", "Arabic"],
    rating: 4.8,
    students: 54,
    availability: "Weekdays",
    avatar: "https://i.pravatar.cc/64?img=22",
    updated: "2025-09-07",
    features: ["One-on-One", "Flexible"],
    verified: false,
  },
];

<EditForm />;

/* ───────────────── Tutor Card (more attractive + equal height) ───────────────── */
const TutorCard = ({ t, onView, onEdit, onDelete }) => (
  <div className="group relative rounded-2xl overflow-hidden card-gradient hover-lift h-full">
    <div className="p-4 flex flex-col h-full">
      <div className="flex items-start gap-3">
        <div className="relative shrink-0">
          <img
            src={t.avatar}
            alt={t.name}
            className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover ring-2 ring-white shadow-sm"
          />
          {t.gender === "Female" && t.verified && (
            <span className="absolute -bottom-1 -right-1 grid place-items-center w-5 h-5 rounded-full bg-white shadow ring-1 ring-slate-200 text-[10px] text-amber-600">
              <FaShieldAlt title="Verified female tutor" />
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-[clamp(14px,2vw,16px)] font-semibold text-[#0B1324] truncate">
              {t.name}
            </h3>
            <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-amber-600">
              <FaStar className="opacity-80" /> {t.rating.toFixed(1)}
            </span>
          </div>
          <div className="mt-1 text-xs text-slate-500 truncate flex items-center gap-2">
            <FaChalkboardTeacher className="opacity-70" /> {t.students} students
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {t.subjects.map((s, i) => (
              <SubjectTag key={i} t={s} />
            ))}
            <StatusBadge s={t.status} />
          </div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-[12px] text-slate-600">
        <div className="inline-flex items-center gap-1.5">
          <FaClock /> {t.availability}
        </div>
        <div className="inline-flex items-center gap-1.5">
          <FaPhoneAlt /> {t.phone}
        </div>
        <div className="inline-flex items-center gap-1.5">
          <FaEnvelope /> {t.email}
        </div>
      </div>

      <div className="mt-2 flex items-center gap-2 flex-wrap">
        {t.features?.includes("One-on-One") && (
          <FeatureChip label="One-on-One" icon={<FaUserTie />} />
        )}
        {t.features?.includes("Flexible") && (
          <FeatureChip label="Flexible" icon={<FaCalendarAlt />} />
        )}
      </div>

      <div className="mt-auto pt-3 flex items-center justify-end gap-2">
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

    {/* sheen */}
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition pointer-events-none"
      style={{
        background:
          "linear-gradient(90deg, transparent, rgba(212,175,55,.10), transparent)",
      }}
    />
  </div>
);

/* ───────────────── Page ───────────────── */
export const Tutors = () => {
  const isMobile = useMedia("(max-width: 767px)");
  const commandRef = useRef(null);
  const listTopRef = useRef(null);

  // filters & state
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All");
  const [subject, setSubject] = useState("All");
  const [availability, setAvailability] = useState("All");
  const [minRating, setMinRating] = useState(0);
  const [minStudents, setMinStudents] = useState(0);
  const [sort, setSort] = useState({ key: "updated", dir: "desc" });
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [mode, setMode] = useState("cards");
  useEffect(() => {
    setMode(isMobile ? "cards" : "table");
  }, [isMobile]);
  const [compact, setCompact] = useState(false);

  // overlays
  const [drawer, setDrawer] = useState(null);
  const [editTutor, setEditTutor] = useState(null);
  const [deleteTutor, setDeleteTutor] = useState(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const perPage = 6;

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      setData(seed);
      setLoading(false);
    }, 450);
    return () => clearTimeout(t);
  }, []);

  const subjects = useMemo(() => {
    const s = new Set();
    data.forEach((d) => d.subjects.forEach((x) => s.add(x)));
    return ["All", ...Array.from(s)];
  }, [data]);
  const availabilities = useMemo(() => {
    const s = new Set(data.map((d) => d.availability));
    return ["All", ...Array.from(s)];
  }, [data]);

  /* filter/sort */
  const filtered = useMemo(() => {
    let out = [...data];
    if (q.trim()) {
      const t = q.toLowerCase();
      out = out.filter(
        (x) =>
          x.name.toLowerCase().includes(t) ||
          x.email.toLowerCase().includes(t) ||
          x.subjects.some((s) => s.toLowerCase().includes(t))
      );
    }
    if (status !== "All") out = out.filter((x) => x.status === status);
    if (subject !== "All")
      out = out.filter((x) => x.subjects.includes(subject));
    if (availability !== "All")
      out = out.filter((x) => x.availability === availability);
    out = out.filter(
      (x) => (x.rating ?? 0) >= minRating && (x.students ?? 0) >= minStudents
    );

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
  }, [data, q, status, subject, availability, minRating, minStudents, sort]);

  const total = filtered.length;
  const pages = Math.max(1, Math.ceil(total / perPage));
  const pageData = filtered.slice((page - 1) * perPage, page * perPage);
  useEffect(() => {
    if (page > pages) setPage(pages);
  }, [pages, page]);

  const gotoPage = (i) => {
    setPage(i);
    listTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const allChecked =
    pageData.length > 0 && pageData.every((x) => selected.includes(x.id));
  const toggleAll = () => {
    if (allChecked)
      setSelected((prev) =>
        prev.filter((id) => !pageData.find((x) => x.id === id))
      );
    else
      setSelected((prev) => [
        ...new Set([...prev, ...pageData.map((x) => x.id)]),
      ]);
  };
  const toggleOne = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  /* actions (mock) */

  const applyUpdate = (payload) => {
    setData((prev) =>
      prev.map((x) => (x.id === payload.id ? { ...x, ...payload } : x))
    );
    setEditTutor(null);
    alert("Tutor updated");
  };
  const applyDelete = (id) => {
    setData((prev) => prev.filter((x) => x.id !== id));
    setDeleteTutor(null);
    setSelected((prev) => prev.filter((x) => x !== id));
    alert("Tutor deleted");
  };
  const createTutor = (payload) => {
    const next = {
      ...payload,
      id: Math.max(...data.map((d) => d.id), 200) + 1,
      updated: new Date().toISOString().slice(0, 10),
    };
    setData((prev) => [next, ...prev]);
    setCreateOpen(false);
    alert("Tutor created");
  };

  // bulk actions
  const setBulkStatus = (newStatus) => {
    setData((prev) =>
      prev.map((x) =>
        selected.includes(x.id) ? { ...x, status: newStatus } : x
      )
    );
    setSelected([]);
    alert(`Set ${newStatus} for selected`);
  };
  const deleteSelected = () => {
    setData((prev) => prev.filter((x) => !selected.includes(x.id)));
    setSelected([]);
    alert("Selected tutors deleted");
  };

  const counts = useMemo(
    () => ({
      all: data.length,
      females: data.filter((d) => d.gender === "Female").length,
      onLeave: data.filter((d) => d.status === "OnLeave").length,
    }),
    [data]
  );

  return (
    <div className="relative flex-1 p-4 sm:p-6 md:p-8 mx-auto max-w-7xl overflow-hidden bg-[#F5F7FA]">
      {/* Hero */}
      <div
        className="relative overflow-hidden rounded-2xl mb-6 p-6 sm:p-8 text-white shadow"
        style={{
          background: `linear-gradient(135deg,#0E7C5A, #0B5F46)`,
        }}
      >
        <div className="absolute inset-0 aurora opacity-35" />
        <div className="relative">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="grid place-items-center w-11 h-11 rounded-full bg-white/15 ring-1 ring-white/20">
                <FaUserTie />
              </div>
              <h1 className="text-[clamp(18px,2.2vw,24px)] font-extrabold tracking-tight">
                Tutors
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="ripple cta cta-glow inline-flex items-center gap-2 px-3 sm:px-4 py-2 text-sm rounded-xl text-white shadow"
                onClick={() => setCreateOpen(true)}
              >
                <FaPlus /> Add Tutor
              </button>
            </div>
          </div>
          <p className="mt-1 opacity-90 text-sm">
            Manage your teaching team — subjects, availability, ratings, and
            status.
          </p>
        </div>
      </div>

      {/* KPI tiles */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            t: "Total Tutors",
            v: counts.all,
            from: "#0E7C5A",
            to: "#0B5F46",
            icon: <FaUserTie />,
          },
          {
            t: "Female Tutors",
            v: counts.females,
            from: "#D4AF37",
            to: "#B98F21",
            icon: <FaChalkboardTeacher />,
          },
          {
            t: "On Leave",
            v: counts.onLeave,
            from: "#2C3E50",
            to: "#1B2A38",
            icon: <FaClock />,
          },
        ].map((k) => (
          <div
            key={k.t}
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
            <div className="relative flex items-center gap-3">
              <div className="shrink-0 grid place-items-center w-11 h-11 rounded-full bg-white/10 ring-1 ring-white/15">
                <span className="text-[18px]">{k.icon}</span>
              </div>
              <div>
                <div className="text-sm/4 opacity-90">{k.t}</div>
                <div className="mt-1 text-3xl font-extrabold tracking-tight">
                  {k.v}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Command bar */}
      <div
        ref={commandRef}
        className="bg-white rounded-2xl shadow p-4 sm:p-5 mb-4"
      >
        <div className="grid gap-3">
          {/* Search & view toggles */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <div className="flex-1 min-w-[220px] w-full flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[#0E7C5A33]">
              <FaSearch className="text-slate-400" />
              <input
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setPage(1);
                }}
                placeholder="Search name, email, or subject…"
                className="w-full outline-none bg-transparent"
              />
            </div>

            <div className="ml-auto flex items-center gap-2 shrink-0">
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
              <button
                className="ripple inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-slate-200 hover:bg-slate-50"
                onClick={() => setShowAdvanced((v) => !v)}
              >
                <FaFilter className="text-slate-500" /> Advanced
              </button>
            </div>
          </div>

          {/* Primary dropdown filters (mobile-first, stacks) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <SoftSelect
              label="Subject"
              value={subject}
              options={subjects}
              onChange={(v) => {
                setSubject(v);
                setPage(1);
              }}
            />
            <SoftSelect
              label="Status"
              value={status}
              options={["All", "Active", "OnLeave", "Inactive"]}
              onChange={(v) => {
                setStatus(v);
                setPage(1);
              }}
            />
            <SoftSelect
              label="Availability"
              value={availability}
              options={availabilities}
              onChange={(v) => {
                setAvailability(v);
                setPage(1);
              }}
            />
          </div>

          {/* Advanced filters */}

          {showAdvanced && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 border-t pt-3">
              <Field label={`Min Rating: ${minRating.toFixed(1)}`}>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  value={minRating}
                  onChange={(e) => {
                    setMinRating(Number(e.target.value));
                    setPage(1);
                  }}
                  className="w-full"
                />
              </Field>
              <Field label="Min Students">
                <input
                  type="number"
                  className="w-full px-3 py-2 rounded-md border border-slate-200"
                  value={minStudents}
                  onChange={(e) => {
                    setMinStudents(Number(e.target.value));
                    setPage(1);
                  }}
                />
              </Field>
              <Field label="Compact Table Rows">
                <label className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={compact}
                    onChange={(e) => setCompact(e.target.checked)}
                  />
                  <span>Compact mode</span>
                </label>
              </Field>
            </div>
          )}
        </div>
      </div>

      {/* Anchor for scroll on pagination */}
      <div ref={listTopRef} />

      {/* ===== CARDS VIEW (fully responsive grid) ===== */}
      {mode === "cards" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {loading ? (
            [...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-48 rounded-2xl shadow bg-white shimmer"
              />
            ))
          ) : pageData.length ? (
            pageData.map((t) => (
              <TutorCard
                key={t.id}
                t={t}
                onView={() => setDrawer(t)}
                onEdit={() => setEditTutor(t)}
                onDelete={() => setDeleteTutor(t)}
              />
            ))
          ) : (
            <div className="col-span-full">
              <div className="grid place-items-center h-48 rounded-2xl bg-white border border-slate-100 text-slate-600">
                No tutors match your filters.
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===== TABLE VIEW (md+) ===== */}
      {mode === "table" && (
        <div className="hidden md:block bg-white/80 backdrop-blur rounded-2xl shadow overflow-hidden border border-slate-100 mt-4">
          <div className="sticky top-0 z-10 bg-slate-50/70 backdrop-blur border-b">
            <div
              className={`grid grid-cols-[48px_1.8fr_1.6fr_.9fr_.9fr_.9fr_160px] px-2 ${
                compact ? "py-2" : "py-3"
              } text-xs uppercase tracking-wide text-slate-500`}
            >
              <div className="pl-2">
                <input
                  type="checkbox"
                  checked={
                    pageData.length > 0 &&
                    pageData.every((x) => selected.includes(x.id))
                  }
                  onChange={toggleAll}
                />
              </div>
              <button
                onClick={() =>
                  setSort((s) => ({
                    key: "name",
                    dir: s.key === "name" && s.dir === "asc" ? "desc" : "asc",
                  }))
                }
                className="text-left"
              >
                NAME
              </button>
              <button
                onClick={() =>
                  setSort((s) => ({
                    key: "email",
                    dir: s.key === "email" && s.dir === "asc" ? "desc" : "asc",
                  }))
                }
                className="text-left"
              >
                EMAIL
              </button>
              <button
                onClick={() =>
                  setSort((s) => ({
                    key: "gender",
                    dir: s.key === "gender" && s.dir === "asc" ? "desc" : "asc",
                  }))
                }
                className="text-left"
              >
                GENDER
              </button>
              <button
                onClick={() =>
                  setSort((s) => ({
                    key: "students",
                    dir:
                      s.key === "students" && s.dir === "asc" ? "desc" : "asc",
                  }))
                }
                className="text-left"
              >
                STUDENTS
              </button>
              <button
                onClick={() =>
                  setSort((s) => ({
                    key: "updated",
                    dir:
                      s.key === "updated" && s.dir === "asc" ? "desc" : "asc",
                  }))
                }
                className="text-left"
              >
                UPDATED
              </button>
              <div className="pr-3 text-right">ACTIONS</div>
            </div>
          </div>

          {loading ? (
            <div className="p-4 space-y-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-16 rounded-xl shimmer" />
              ))}
            </div>
          ) : (
            <ul className="divide-y">
              {pageData.map((t, idx) => (
                <li
                  key={t.id}
                  className={`grid grid-cols-[48px_1.8fr_1.6fr_.9fr_.9fr_.9fr_160px] items-center px-2 ${
                    compact ? "py-2" : "py-3"
                  } transition-colors hover:bg-[#0E7C5A06]`}
                >
                  <div className="pl-2">
                    <input
                      type="checkbox"
                      checked={selected.includes(t.id)}
                      onChange={() => toggleOne(t.id)}
                    />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={t.avatar}
                          alt={t.name}
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm"
                        />
                        {t.gender === "Female" && t.verified && (
                          <span className="absolute -bottom-1 -right-1 grid place-items-center w-4.5 h-4.5 rounded-full bg-white shadow ring-1 ring-slate-200 text-[9px] text-amber-600">
                            <FaShieldAlt title="Verified female tutor" />
                          </span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium truncate text-[#0B1324]">
                          {t.name}
                        </div>
                        <div className="text-xs text-slate-500 flex items-center gap-2">
                          {t.subjects.slice(0, 2).map((s, i) => (
                            <SubjectTag key={i} t={s} />
                          ))}
                          {t.subjects.length > 2 && (
                            <span className="text-[11px] text-slate-500">
                              +{t.subjects.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="truncate">{t.email}</div>
                  <div className="truncate">{t.gender}</div>
                  <div className="tabular-nums">{t.students}</div>
                  <div>{new Date(t.updated).toLocaleDateString()}</div>

                  <div className="pr-3 text-right">
                    <ActionsMenu
                      onView={() => setDrawer(t)}
                      onEdit={() => setEditTutor(t)}
                      onDelete={() => setDeleteTutor(t)}
                    />
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
              <div className="flex items-center gap-1">
                <button
                  className="ripple px-2 py-1 rounded border border-slate-200 hover:bg-slate-50"
                  onClick={() => gotoPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                >
                  Prev
                </button>
                {[...Array(pages)].map((_, i) => (
                  <button
                    key={i}
                    className={cls(
                      "ripple px-2 py-1 rounded border border-slate-200 hover:bg-slate-50",
                      page === i + 1
                        ? "bg-[#0E7C5A] text-white border-transparent"
                        : ""
                    )}
                    onClick={() => gotoPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  className="ripple px-2 py-1 rounded border border-slate-200 hover:bg-slate-50"
                  onClick={() => gotoPage(Math.min(pages, page + 1))}
                  disabled={page === pages}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Bulk actions bar */}

      {selected.length > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-white shadow-xl border border-slate-200 rounded-full px-3 py-2 flex items-center gap-2">
          <span className="text-sm text-slate-700 px-2">
            Selected: {selected.length}
          </span>
          <button
            className="ripple px-3 py-1.5 rounded-full text-sm border border-slate-200 hover:bg-slate-50"
            onClick={() => setBulkStatus("Active")}
          >
            Set Active
          </button>
          <button
            className="ripple px-3 py-1.5 rounded-full text-sm border border-slate-200 hover:bg-slate-50"
            onClick={() => setBulkStatus("OnLeave")}
          >
            Set On Leave
          </button>
          <button
            className="ripple px-3 py-1.5 rounded-full text-sm border border-slate-200 hover:bg-slate-50"
            onClick={() => setBulkStatus("Inactive")}
          >
            Set Inactive
          </button>
          <button
            className="ripple px-3 py-1.5 rounded-full text-sm bg-rose-600 text-white hover:opacity-95"
            onClick={deleteSelected}
          >
            Delete
          </button>
        </div>
      )}

      {/* Floating Add Tutor FAB for phones */}

      {isMobile && !(drawer || editTutor || deleteTutor || createOpen) && (
        <button
          onClick={() => setCreateOpen(true)}
          className="fixed bottom-5 right-5 z-40 cta cta-glow ripple rounded-full px-4 py-3 text-white shadow-lg inline-flex items-center gap-2"
          aria-label="Add Tutor"
        >
          <FaPlus /> Add Tutor
        </button>
      )}

      {/* Drawer (View) */}

      {drawer && (
        <>
          <div onClick={() => setDrawer(null)} />
          <aside className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#2C3E50]">
                Tutor Details
              </h3>
              <button
                className="ripple w-9 h-9 rounded-md border border-slate-200 hover:bg-slate-50"
                onClick={() => setDrawer(null)}
                title="Close"
              >
                <FaTimes className="mx-auto" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={drawer.avatar}
                    alt={drawer.name}
                    className="w-16 h-16 rounded-full object-cover ring-2 ring-white shadow"
                  />
                  {drawer.gender === "Female" && drawer.verified && (
                    <span className="absolute -bottom-1 -right-1 grid place-items-center w-5 h-5 rounded-full bg-white shadow ring-1 ring-slate-200 text-[10px] text-amber-600">
                      <FaShieldAlt title="Verified female tutor" />
                    </span>
                  )}
                </div>
                <div>
                  <div className="text-xl font-bold">{drawer.name}</div>
                  <div className="text-slate-500">{drawer.email}</div>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    {drawer.subjects.map((s, i) => (
                      <SubjectTag key={i} t={s} />
                    ))}
                    <StatusBadge s={drawer.status} />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-slate-500">Phone:</span> {drawer.phone}
                </div>
                <div>
                  <span className="text-slate-500">Gender:</span>{" "}
                  {drawer.gender}
                </div>
                <div>
                  <span className="text-slate-500">Students:</span>{" "}
                  {drawer.students}
                </div>
                <div>
                  <span className="text-slate-500">Rating:</span>{" "}
                  {drawer.rating.toFixed(1)}
                </div>
                <div>
                  <span className="text-slate-500">Availability:</span>{" "}
                  {drawer.availability}
                </div>
                <div>
                  <span className="text-slate-500">Updated:</span>{" "}
                  {new Date(drawer.updated).toLocaleDateString()}
                </div>
                <div>
                  <span className="text-slate-500">Tutor ID:</span> #{drawer.id}
                </div>
              </div>
              <div className="pt-2 border-t">
                <div className="text-sm text-slate-500 mb-2">Notes</div>
                <p className="text-slate-700">
                  Connect to backend to show schedule, booked slots, and recent
                  sessions.
                </p>
                <div className="mt-3 flex items-center gap-2 flex-wrap">
                  {drawer.features?.includes("One-on-One") && (
                    <FeatureChip label="One-on-One" icon={<FaUserTie />} />
                  )}
                  {drawer.features?.includes("Flexible") && (
                    <FeatureChip label="Flexible" icon={<FaCalendarAlt />} />
                  )}
                </div>
              </div>
            </div>
          </aside>
        </>
      )}

      {/* Edit modal */}

      {editTutor && (
        <>
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setEditTutor(null)}
          />
          <div className="fixed inset-0 z-50 grid place-items-center p-4">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[#2C3E50]">
                  Update Tutor
                </h3>
                <button
                  className="ripple w-9 h-9 rounded-md border border-slate-200 hover:bg-slate-50"
                  onClick={() => setEditTutor(null)}
                >
                  <FaTimes className="mx-auto" />
                </button>
              </div>
              <EditForm
                tutor={editTutor}
                onCancel={() => setEditTutor(null)}
                onSubmit={applyUpdate}
              />
            </div>
          </div>
        </>
      )}

      {/* Create modal */}

      {createOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setCreateOpen(false)}
          />
          <div className="fixed inset-0 z-50 grid place-items-center p-4">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[#2C3E50] ">
                  Add Tutor
                </h3>
                <button
                  className="ripple w-9 h-9 rounded-md border border-slate-200 hover:bg-slate-50"
                  onClick={() => setCreateOpen(false)}
                >
                  <FaTimes className="mx-auto" />
                </button>
              </div>
              <EditForm
                tutor={{
                  name: "",
                  gender: "Male",
                  email: "",
                  phone: "",
                  status: "Active",
                  availability: "Weekdays",
                  subjects: [],
                  students: 0,
                  rating: 4.5,
                  avatar: "",
                  features: [],
                  verified: false,
                }}
                onCancel={() => setCreateOpen(false)}
                onSubmit={createTutor}
              />
            </div>
          </div>
        </>
      )}

      {/* Delete confirm */}

      {deleteTutor && (
        <>
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setDeleteTutor(null)}
          />
          <div className="fixed inset-0 z-50 grid place-items-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-semibold mb-2 text-[#2C3E50]">
                Confirm Delete
              </h3>
              <p className="text-slate-600 mb-4">
                Delete <b>{deleteTutor.name}</b>? This action cannot be undone.
              </p>
              <div className="flex items-center justify-end gap-2">
                <button
                  className="ripple px-3 py-2 rounded-md border border-slate-200 hover:bg-slate-50"
                  onClick={() => setDeleteTutor(null)}
                >
                  Cancel
                </button>
                <button
                  className="ripple px-3 py-2 rounded-md text-white bg-rose-600 hover:opacity-95"
                  onClick={() => applyDelete(deleteTutor.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

/* both named and default to avoid import mismatch */
export default Tutors;
