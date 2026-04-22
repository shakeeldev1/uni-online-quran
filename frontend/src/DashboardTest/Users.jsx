// /src/Dashboard/common pages/Users.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Field } from "./UserSections/EditForm";
import { EditForm } from "./UserSections/EditForm";
import ViewDrawer from "./UserSections/ViewDrawer";
import {
  FaSearch,
  FaFilter,
  FaTimes,
  FaUsers,
  FaChalkboardTeacher,
  FaStar,
  FaPen,
  FaTrashAlt,
  FaEye,
} from "react-icons/fa";
import {
  useMedia,
  useOutside,
  StatusBadge,
  RoleBadge,
  IconBtn,
  Head,
  SoftSelect,
  ActionsMenu,
} from "./UserSections/Exports";

const ease = [0.16, 1, 0.3, 1];

const cls = (...s) => s.filter(Boolean).join(" ");

/* ───────────────── Demo data ───────────────── */
const seed = [
  {
    id: 10,
    name: "Ali Raza",
    email: "ali@example.com",
    role: "Student",
    status: "Active",
    joined: "2025-09-09",
    avatar: "https://i.pravatar.cc/64?img=39",
  },
];

/* ───────────────── Edit Form ───────────────── */
<EditForm />;

/* ───────────────── Page ───────────────── */
export const Users = () => {
  const reduce = useReducedMotion();
  const isMobile = useMedia("(max-width: 767px)");
  const commandRef = useRef(null);
  const listTopRef = useRef(null);
  const [q, setQ] = useState("");
  const [role, setRole] = useState("All");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState({ key: "joined", dir: "desc" });
  const [minDate, setMinDate] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState("cards");
  const [drawer, setDrawer] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    setMode(isMobile ? "cards" : "table");
  }, [isMobile]);

  const perPage = 6;

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      setData(seed);
      setLoading(false);
    }, 450);
    return () => clearTimeout(t);
  }, []);

  /* filter/sort */
  const filtered = useMemo(() => {
    let out = [...data];
    if (q.trim()) {
      const t = q.toLowerCase();
      out = out.filter(
        (u) =>
          u.name.toLowerCase().includes(t) || u.email.toLowerCase().includes(t)
      );
    }
    if (role !== "All") out = out.filter((u) => u.role === role);
    if (status !== "All") out = out.filter((u) => u.status === status);
    if (minDate)
      out = out.filter((u) => +new Date(u.joined) >= +new Date(minDate));

    out.sort((a, b) => {
      const k = sort.key;
      let av = a[k],
        bv = b[k];
      if (k === "joined") {
        av = +new Date(a.joined);
        bv = +new Date(b.joined);
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
  }, [data, q, role, status, minDate, sort]);

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
    pageData.length > 0 && pageData.every((u) => selected.includes(u.id));
  const toggleAll = () => {
    if (allChecked)
      setSelected((prev) =>
        prev.filter((id) => !pageData.find((u) => u.id === id))
      );
    else
      setSelected((prev) => [
        ...new Set([...prev, ...pageData.map((u) => u.id)]),
      ]);
  };
  const toggleOne = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  /* actions (mock) */
  const applyUpdate = (payload) => {
    setData((prev) =>
      prev.map((u) => (u.id === payload.id ? { ...u, ...payload } : u))
    );
    setEditUser(null);
    alert("User updated");
  };
  const applyDelete = (id) => {
    setData((prev) => prev.filter((u) => u.id !== id));
    setDeleteUser(null);
    setSelected((prev) => prev.filter((x) => x !== id));
    alert("User deleted");
  };

  /* quick counts */
  const counts = useMemo(
    () => ({
      all: data.length,
      tutors: data.filter((d) => d.role === "Tutor").length,
      trials: data.filter((d) => d.status === "Trial").length,
    }),
    [data]
  );

  return (
    <div
      className="relative flex-1 p-4 sm:p-6 md:p-8 overflow-x-hidden"
      style={{ background: "#F5F7FA" }}
    >
      {/* Hero / heading */}
      <div
        className="relative overflow-x-hidden rounded-2xl mb-6 p-6 sm:p-8 text-white shadow"
        style={{
          background: `linear-gradient(135deg,#0E7C5A, #0B5F46)`,
        }}
      >
        <div className="absolute inset-0 aurora opacity-35" />
        <div className="relative">
          <div className="flex items-center gap-3">
            <div className="grid place-items-center w-11 h-11 rounded-full bg-white/15 ring-1 ring-white/20">
              <FaUsers />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              Users
            </h1>
          </div>
          <p className="mt-1 opacity-90 text-sm">
            Manage members, roles, status, and onboarding.
          </p>
        </div>
      </div>

      {/* Stat tiles */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            t: "Total Users",
            v: counts.all,
            from: "#0E7C5A",
            to: "#0B5F46",
            icon: <FaUsers />,
          },
          {
            t: "Active Tutors",
            v: counts.tutors,
            from: "#D4AF37",
            to: "#B98F21",
            icon: <FaChalkboardTeacher />,
          },
          {
            t: "Trial Signups",
            v: counts.trials,
            from: "#2C3E50",
            to: "#1B2A38",
            icon: <FaStar />,
          },
        ].map((k, i) => (
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
                <span
                  className="text-[18px]"
                  whileHover={reduce ? undefined : { rotate: 2, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                >
                  {k.icon}
                </span>
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
      <div ref={commandRef} className="bg-white rounded-2xl shadow p-4 mb-4">
        <div className="grid gap-3">
          {/* search + view toggle + advanced */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <div className="flex-1 min-w-[220px] w-full flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[#0E7C5A33]">
              <FaSearch className="text-slate-400" />
              <input
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setPage(1);
                }}
                placeholder="Search name or email…"
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
                  Cards
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
                  Table
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

          {/* primary DROPDOWN filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <SoftSelect
              label="Role"
              value={role}
              options={["All", "Student", "Tutor", "Admin"]}
              onChange={(v) => {
                setRole(v);
                setPage(1);
              }}
            />
            <SoftSelect
              label="Status"
              value={status}
              options={["All", "Active", "Trial", "Inactive"]}
              onChange={(v) => {
                setStatus(v);
                setPage(1);
              }}
            />
            <SoftSelect
              label="Sort"
              value={`${sort.key}:${sort.dir}`}
              options={[
                { label: "Newest", value: "joined:desc" },
                { label: "Oldest", value: "joined:asc" },
                { label: "Name A→Z", value: "name:asc" },
                { label: "Name Z→A", value: "name:desc" },
                { label: "Role A→Z", value: "role:asc" },
              ]}
              onChange={(v) => {
                const [k, d] = String(v).split(":");
                setSort({ key: k, dir: d });
              }}
            />
          </div>

          {/* Advanced */}

          {showAdvanced && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 border-t pt-3">
              <Field label="Joined After">
                <input
                  type="date"
                  value={minDate}
                  onChange={(e) => {
                    setMinDate(e.target.value);
                    setPage(1);
                  }}
                  className="w-full px-3 py-2 rounded-md border border-slate-200"
                />
              </Field>
              <div className="grid items-end">
                <button
                  className="ripple px-3 py-2 rounded-md border border-slate-200 hover:bg-slate-50"
                  onClick={() => {
                    setMinDate("");
                    setRole("All");
                    setStatus("All");
                    setSort({ key: "joined", dir: "desc" });
                  }}
                >
                  Reset Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* anchor for smooth scroll on pagination */}
      <div ref={listTopRef} />

      {/* ===== TABLE (md+) ===== */}
      {mode === "table" && (
        <div className="hidden md:block bg-white/80 backdrop-blur rounded-2xl shadow overflow-x-hidden border border-slate-100">
          <div className="sticky top-0 z-10 bg-slate-50/70 backdrop-blur border-b">
            <div className="grid grid-cols-[48px_1.6fr_1.4fr_.9fr_.9fr_.9fr_180px] px-2 py-3 text-xs uppercase tracking-wide text-slate-500">
              <div className="pl-2">
                <input
                  type="checkbox"
                  checked={
                    pageData.length > 0 &&
                    pageData.every((u) => selected.includes(u.id))
                  }
                  onChange={toggleAll}
                />
              </div>
              <Head
                label="Name"
                onClick={() =>
                  setSort((s) => ({
                    key: "name",
                    dir: s.key === "name" && s.dir === "asc" ? "desc" : "asc",
                  }))
                }
              />
              <Head
                label="Email"
                onClick={() =>
                  setSort((s) => ({
                    key: "email",
                    dir: s.key === "email" && s.dir === "asc" ? "desc" : "asc",
                  }))
                }
              />
              <Head
                label="Role"
                onClick={() =>
                  setSort((s) => ({
                    key: "role",
                    dir: s.key === "role" && s.dir === "asc" ? "desc" : "asc",
                  }))
                }
              />
              <Head
                label="Status"
                onClick={() =>
                  setSort((s) => ({
                    key: "status",
                    dir: s.key === "status" && s.dir === "asc" ? "desc" : "asc",
                  }))
                }
              />
              <Head
                label="Joined"
                onClick={() =>
                  setSort((s) => ({
                    key: "joined",
                    dir: s.key === "joined" && s.dir === "asc" ? "desc" : "asc",
                  }))
                }
              />
              <div className="pr-3 text-right">Actions</div>
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
              {pageData.map((u, idx) => (
                <li
                  key={u.id}
                  exit={{ opacity: 0, y: 4 }}
                  className="group grid grid-cols-[48px_1.6fr_1.4fr_.9fr_.9fr_.9fr_180px] items-center px-2 py-3 transition-colors hover:bg-[#0E7C5A06]"
                >
                  <div className="pl-2">
                    <input
                      type="checkbox"
                      checked={selected.includes(u.id)}
                      onChange={() => toggleOne(u.id)}
                    />
                  </div>
                  <button onClick={() => setDrawer(u)} className="text-left">
                    <div className="flex items-center gap-3">
                      <img
                        src={u.avatar}
                        alt={u.name}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm"
                      />
                      <div className="min-w-0">
                        <div className="font-medium truncate text-[#0B1324]">
                          {u.name}
                        </div>
                        <div className="text-xs text-slate-500">ID #{u.id}</div>
                      </div>
                    </div>
                  </button>
                  <div className="truncate">{u.email}</div>
                  <div>
                    <RoleBadge r={u.role} />
                  </div>
                  <div>
                    <StatusBadge s={u.status} />
                  </div>
                  <div>{new Date(u.joined).toLocaleDateString()}</div>
                  <div className="pr-3 text-right">
                    {/* Replaced 3-dots with an Actions dropdown */}
                    <ActionsMenu
                      onView={() => setDrawer(u)}
                      onEdit={() => setEditUser(u)}
                      onDelete={() => setDeleteUser(u)}
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

      {/* ===== CARDS (mobile-first) ===== */}
      {mode === "cards" && (
        <div className="md:hidden grid gap-3">
          {loading
            ? [...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-24 rounded-2xl shadow bg-white shimmer"
                />
              ))
            : pageData.map((u) => (
                <div
                  key={u.id}
                  className="bg-white rounded-2xl shadow p-4 flex items-center gap-3 transition hover-lift"
                >
                  <input
                    type="checkbox"
                    className="mt-1"
                    checked={selected.includes(u.id)}
                    onChange={() => toggleOne(u.id)}
                  />
                  <img
                    src={u.avatar}
                    alt={u.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-sm"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-[#0B1324] truncate">
                      {u.name}
                    </div>
                    <div className="text-xs text-slate-500 truncate">
                      {u.email}
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <RoleBadge r={u.role} />
                      <StatusBadge s={u.status} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <IconBtn
                      label="View"
                      variant="view"
                      onClick={() => setDrawer(u)}
                    >
                      <FaEye />
                    </IconBtn>
                    <IconBtn
                      label="Update"
                      variant="edit"
                      onClick={() => setEditUser(u)}
                    >
                      <FaPen />
                    </IconBtn>
                    <IconBtn
                      label="Delete"
                      variant="delete"
                      onClick={() => setDeleteUser(u)}
                    >
                      <FaTrashAlt />
                    </IconBtn>
                  </div>
                </div>
              ))}

          {!loading && (
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>
                Page {page}/{pages}
              </span>
              <div className="flex items-center gap-1">
                <button
                  className="ripple px-3 py-1 rounded border border-slate-200"
                  onClick={() => gotoPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                >
                  Prev
                </button>
                <button
                  className="ripple px-3 py-1 rounded border border-slate-200"
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

      {/* Sticky mobile quick bar */}

      {isMobile && !(drawer || editUser || deleteUser) && (
        <nav className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 bg-white/95 backdrop-blur border border-slate-200 shadow-xl rounded-full px-3 py-2 flex items-center gap-2">
          <button
            className="ripple px-3 py-1.5 rounded-full text-sm border border-slate-200"
            onClick={() => {
              commandRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <FaFilter className="inline -mt-0.5 mr-1" />
            Filters
          </button>
          <button
            className={cls(
              "ripple px-3 py-1.5 rounded-full text-sm border",
              mode === "cards"
                ? "border-emerald-300 text-emerald-700 bg-emerald-50"
                : "border-slate-200"
            )}
            onClick={() => setMode((m) => (m === "cards" ? "table" : "cards"))}
          >
            {mode === "cards" ? "Table" : "Cards"}
          </button>
        </nav>
      )}

      {/* View Drawer */}
      <ViewDrawer user={drawer} onClose={() => setDrawer(null)} />
      {/* Edit modal */}

      {editUser && (
        <>
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setEditUser(null)}
          />
          <div className="fixed inset-0 z-50 grid place-items-center p-4">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3
                  className="text-lg font-semibold"
                  style={{ color: "#2C3E50" }}
                >
                  Update User
                </h3>
                <button
                  className="ripple w-9 h-9 rounded-md border border-slate-200 hover:bg-slate-50"
                  onClick={() => setEditUser(null)}
                >
                  <FaTimes className="mx-auto" />
                </button>
              </div>
              <EditForm
                user={editUser}
                onCancel={() => setEditUser(null)}
                onSubmit={applyUpdate}
              />
            </div>
          </div>
        </>
      )}

      {/* Delete confirm */}

      {deleteUser && (
        <>
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setDeleteUser(null)}
          />
          <div className="fixed inset-0 z-50 grid place-items-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: "#2C3E50" }}
              >
                Confirm Delete
              </h3>
              <p className="text-slate-600 mb-4">
                Delete <b>{deleteUser.name}</b>? This action cannot be undone.
              </p>
              <div className="flex items-center justify-end gap-2">
                <button
                  className="ripple px-3 py-2 rounded-md border border-slate-200 hover:bg-slate-50"
                  onClick={() => setDeleteUser(null)}
                >
                  Cancel
                </button>
                <button
                  className="ripple px-3 py-2 rounded-md text-white bg-rose-600 hover:opacity-95"
                  onClick={() => applyDelete(deleteUser.id)}
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

export default Users;
