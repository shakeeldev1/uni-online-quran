import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaUsers,
  FaBookOpen,
  FaChalkboardTeacher,
  FaHome,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
  FaBell,
  FaBars,
} from "react-icons/fa";

const BORDER = "#e2e8f0";

const MENU = [
  { name: "Dashboard", path: "/dashboardTest", icon: <FaHome /> },
  { name: "Users", path: "/dashboardTest/users", icon: <FaUsers /> },
  {
    name: "Tutors",
    path: "/dashboardTest/tutors",
    icon: <FaChalkboardTeacher />,
  },
  { name: "Courses", path: "/dashboardTest/courses", icon: <FaBookOpen /> },
  { name: "Reviews", path: "/dashboardTest/reviews", icon: <FaStar /> },
];

const baseLink =
  "qa-link relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 " +
  "text-emerald-50/90 hover:text-white transition";

const Sidebar = () => {
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("sidebar:collapsed") || "false");
    } catch {
      return false;
    }
  });
  useEffect(() => {
    localStorage.setItem("sidebar:collapsed", JSON.stringify(collapsed));
  }, [collapsed]);

  useEffect(() => setOpen(false), [location.pathname]);

  const rail = collapsed ? 80 : 260;
  useEffect(() => {
    document.documentElement.style.setProperty("--rail", `${rail}px`);
  }, [rail]);

  return (
    <div className="overflow-hidden">
      <style>{`
        /* gradient background for sidebar */
        .qa-aside {
          background: linear-gradient(145deg, #0D6E57 0%, #0E7C5A 40%, #0F5E4B 80%);
          background-size: 200% 200%;
          backdrop-filter: blur(14px);
          box-shadow: 4px 0 30px rgba(0,0,0,.35);
          animation: qa-gradient-shift 10s ease-in-out infinite alternate;
        }
        @keyframes qa-gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 50% 100%; }
          100% { background-position: 100% 50%; }
        }

        /* links */
        .qa-link {
          position: relative;
          background: linear-gradient(145deg, rgba(255,255,255,.04), rgba(255,255,255,.02));
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 16px;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.08);
          transition: all 0.3s cubic-bezier(.25,.8,.25,1);
          overflow: hidden;
        }
        .qa-link:hover {
          background: linear-gradient(145deg, rgba(255,255,255,.12), rgba(255,255,255,.06));
          border-color: rgba(255,255,255,.3);
          transform: translateX(4px) scale(1.03) rotateX(2deg);
          box-shadow: 0 8px 28px rgba(0,0,0,.3);
        }
        .qa-link[aria-current="page"] {
          color: #FFD970;
          background: linear-gradient(145deg, rgba(255,217,112,.22), rgba(255,217,112,.1));
          border-color: rgba(255,217,112,.55);
          box-shadow: 0 10px 30px rgba(255,217,112,.25),
                      inset 0 1px 0 rgba(255,255,255,.18);
          transform: scale(1.04);
        }
        .qa-link[aria-current="page"]::before {
          content: "";
          position: absolute;
          left: 6px; top: 8px; bottom: 8px;
          width: 4px;
          border-radius: 999px;
          background: linear-gradient(180deg,#FFD970,#E7C14F);
          box-shadow: 0 0 18px rgba(255,217,112,.8);
          animation: qa-pulse 1.8s ease-in-out infinite alternate;
        }
        @keyframes qa-pulse {
          from { opacity: 0.5; transform: scaleY(0.9); }
          to   { opacity: 1; transform: scaleY(1); }
        }
      `}</style>

      {/* offset body for sidebar */}
      <style>{`
        @media (min-width: 768px){
          body { margin-left: var(--rail, 260px); }
        }
      `}</style>

      {/* TOP NAVBAR — MOBILE ONLY */}
      <header
        className="md:hidden sticky top-0 z-40 backdrop-blur"
        style={{
          background: "rgba(255,255,255,.85)",
          borderBottom: `1px solid ${BORDER}`,
          paddingInlineStart: "max(1rem, env(safe-area-inset-left))",
          paddingInlineEnd: "max(1rem, env(safe-area-inset-right))",
          paddingTop: "max(.5rem, env(safe-area-inset-top))",
        }}
      ></header>
      {/* Floating Menu Button (Mobile Only) */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-3 left-3 z-40 w-11 h-11 flex items-center justify-center rounded-xl bg-white text-slate-700 shadow border border-slate-200"
        aria-label="Open sidebar"
      >
        <FaBars size={15} />
      </button>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40 md:hidden bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="fixed inset-y-0 left-0 z-50 md:hidden w-[82vw] max-w-xs
                         qa-aside text-white border-r border-[#D4AF37]/30 flex flex-col"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25 }}
            >
              <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="grid place-items-center w-9 h-9 rounded-lg bg-white/15 text-[#FFD970] ring-1 ring-white/20">
                    QA
                  </div>
                  <span className="text-lg font-bold tracking-wide text-[#FFD970]">
                    Quran Admin
                  </span>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/15 text-[#FFD970] hover:bg-white/20"
                  aria-label="Close menu"
                >
                  <FaChevronLeft />
                </button>
              </div>

              <nav className="flex-1 px-3 py-3 overflow-y-auto">
                <ul className="space-y-2">
                  {MENU.map((m) => (
                    <motion.li key={m.path} whileHover={{ y: -1 }}>
                      <NavLink to={m.path} className={baseLink}>
                        <span className="qa-ico text-lg">{m.icon}</span>
                        <span className="truncate">{m.name}</span>
                      </NavLink>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="py-3 border-t border-white/10 text-xs text-white/80">
                <div className="flex items-center justify-between">
                  <span>© {new Date().getFullYear()} Quran Academy</span>
                  <span className="opacity-80">v1.0</span>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* DESKTOP/TABLET SIDEBAR */}
      <motion.aside
        className="hidden md:flex md:flex-col md:fixed md:left-0 md:inset-y-0 z-40
             qa-aside text-white border-r border-white/10 overflow-y-auto"
        animate={{ width: rail }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="grid place-items-center w-9 h-9 rounded-lg bg-white/15 text-[#FFD970] ring-1 ring-white/20">
              QA
            </div>
            <span
              className={`text-lg font-bold tracking-wide text-[#FFD970] ${
                collapsed ? "hidden" : "inline"
              }`}
            >
              Quran Admin
            </span>
          </div>
          <button
            onClick={() => setCollapsed((v) => !v)}
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg
                 bg-white/15 text-[#FFD970] hover:bg-white/20"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand" : "Collapse"}
          >
            {collapsed ? (
              <FaChevronRight className="text-lg sm:text-xl" />
            ) : (
              <FaChevronLeft className="text-lg sm:text-xl" />
            )}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-3 overflow-y-auto">
          <ul className="space-y-2">
            {MENU.map((m) => (
              <motion.li
                key={m.path}
                whileHover={{ y: -1 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
              >
                <NavLink
                  to={m.path}
                  title={collapsed ? m.name : undefined}
                  className={baseLink}
                >
                  <span className="qa-ico text-lg sm:text-xl">{m.icon}</span>
                  <span
                    className={`${collapsed ? "hidden" : "inline"} truncate`}
                  >
                    {m.name}
                  </span>
                </NavLink>
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-white/10 text-xs text-white/80">
          <div className="flex items-center justify-between">
            <span className={`${collapsed ? "hidden" : "inline"}`}>
              © {new Date().getFullYear()} Quran Academy
            </span>
            <span className="opacity-80">v1.0</span>
          </div>
        </div>
      </motion.aside>
    </div>
  );
};

export default Sidebar;
