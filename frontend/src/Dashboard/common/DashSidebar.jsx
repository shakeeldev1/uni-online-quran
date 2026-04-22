import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  FaUsers,
  FaBookOpen,
  FaChalkboardTeacher,
  FaHome,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
  FaUsersCog,
  FaClipboardList,
  FaEnvelope,
  FaConciergeBell,
} from "react-icons/fa";

const MENU = [
  { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
  { name: "Users", path: "/dashboard/users", icon: <FaUsers /> },
  { name: "Tutors", path: "/dashboard/tutors", icon: <FaChalkboardTeacher /> },
  { name: "Courses", path: "/dashboard/courses", icon: <FaBookOpen /> },
  { name: "Services", path: "/dashboard/services", icon: <FaConciergeBell /> },
  {
    name: "Enrollments",
    path: "/dashboard/enrollments",
    icon: <FaClipboardList />,
  },
  { name: "Contacts", path: "/dashboard/contacts", icon: <FaEnvelope /> },
  // { name: "Reviews", path: "/dashboard/reviews", icon: <FaStar /> }, // Commented out for now
];

const baseLink =
  "flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-white/90 hover:text-white hover:bg-emerald-700/40 transition";

const DashSidebar = ({ open, setOpen, collapsed, setCollapsed }) => {
  const location = useLocation();
  useEffect(() => setOpen(false), [location.pathname, setOpen]);

  return (
    <>
      {/* ===== Mobile Drawer ===== */}
      {open && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="w-72 bg-emerald-800 text-white flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-emerald-600">
              <span className="font-bold text-lg">Quran Admin</span>
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-lg bg-white/20 hover:bg-white/30"
              >
                <FaChevronLeft />
              </button>
            </div>

            {/* Nav items */}
            <nav className="flex-1 px-3 py-3 overflow-y-auto">
              <ul className="space-y-1">
                {MENU.map((m) => (
                  <li key={m.path}>
                    <NavLink
                      to={m.path}
                      className={({ isActive }) =>
                        `${baseLink} ${
                          isActive ? "bg-emerald-700 text-yellow-300" : ""
                        }`
                      }
                    >
                      <span className="text-lg">{m.icon}</span>
                      <span className="truncate">{m.name}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="flex-1 bg-black/50" onClick={() => setOpen(false)} />
        </div>
      )}

      {/* ===== Desktop Sidebar ===== */}
      <aside
        className={`hidden md:flex fixed inset-y-0 left-0 bg-emerald-800 text-white 
          border-r border-emerald-700 flex-col transition-all duration-300
          ${collapsed ? "w-20" : "w-64"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3.5 border-b border-emerald-700">
          {collapsed ? (
            <img
              src="/quranLogo-sidebar.png"
              alt="Quran Logo"
              className="w-8 h-8 object-contain"
            />
          ) : (
            <span className="font-bold text-lg">Quran Admin</span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center p-2 ml-1 rounded-lg bg-white/20 hover:bg-white/30"
          >
            {collapsed ? (
              <FaChevronRight className="w-2 h-4" />
            ) : (
              <FaChevronLeft />
            )}
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-2 py-3 overflow-y-auto">
          <ul className="space-y-1">
            {MENU.map((m) => (
              <li key={m.path}>
                <NavLink
                  to={m.path}
                  className={({ isActive }) =>
                    `${baseLink} ${
                      isActive ? "bg-emerald-700 text-yellow-300" : ""
                    }`
                  }
                >
                  <span className="text-lg">{m.icon}</span>
                  {!collapsed && <span className="truncate">{m.name}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-emerald-700 text-xs text-white/80">
          <div className="flex items-center justify-between">
            {!collapsed && (
              <span>© {new Date().getFullYear()} Quran Academy</span>
            )}
            <span className="opacity-70">v1.0</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashSidebar;
