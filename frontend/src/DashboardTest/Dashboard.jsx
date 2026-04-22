import { useEffect, useMemo, useRef, useState } from "react";
import {
  FaUsers,
  FaChalkboardTeacher,
  FaBookOpen,
  FaChartLine,
  FaSearch,
} from "react-icons/fa";
import { AreaChart } from "./DashboardSections/AreaChart";
import QuickActions from "./DashboardSections/QuickActions";
import LatestUsers from "./DashboardSections/LatestUsers";

/* ---------- tiny helpers ---------- */
const useLocalStorage = (key, initial) => {
  const [val, setVal] = useState(() => {
    try {
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch {}
  }, [key, val]);
  return [val, setVal];
};

const CountUp = ({ value, duration = 1000 }) => {
  const [v, setV] = useState(0);
  useEffect(() => {
    let id, s;
    const step = (t) => {
      if (!s) s = t;
      const p = Math.min(1, (t - s) / duration);
      const e = 1 - Math.pow(1 - p, 3);
      setV(Math.round(value * e));
      if (p < 1) id = requestAnimationFrame(step);
    };
    id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [value, duration]);
  return <>{v.toLocaleString()}</>;
};

//  Dashboard (main component)
export const Dashboard = () => {
  const [range, setRange] = useLocalStorage("dash:range", "30d");
  const [loading, setLoading] = useState(false);
  const [legendHidden, setLegendHidden] = useState(new Set());

  const areaSvgRef = useRef(null);
  const [chartFull, setChartFull] = useState(false);

  // Demo base data
  const baseData = useMemo(
    () => ({
      users: 1245,
      tutors: 48,
      courses: 12,
      trials: 56,
      delta: { users: +12, tutors: +3, courses: +1, trials: +6 },
      latestUsers: [
        {
          name: "Aisha Rahman",
          email: "aisha@example.com",
          status: "Inactive",
          joined: "5d ago",
          role: "Student",
          avatar: "https://i.pravatar.cc/40?img=17",
        },
      ],
    }),
    []
  );

  const [users] = useState(baseData.latestUsers);
  const [totalUsers, setTotalUsers] = useState(baseData.users);
  const [coursesCount, setCoursesCount] = useState(baseData.courses);
  const tutorsActive = users.filter(
    (u) => u.role === "Tutor" && u.status === "Active"
  ).length;

  const chart = useMemo(() => {
    const make = (len, start, step) =>
      Array.from({ length: len }, (_, i) =>
        Math.round(
          start +
            i * step +
            Math.sin(i * 0.7) * step * 0.8 +
            (i % 5 ? 0 : step * 2)
        )
      );
    let len = 30,
      lbl = (i) => `Day ${i + 1}`;
    if (range === "7d") {
      len = 7;
      lbl = (i) => ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i % 7];
    }
    if (range === "90d") {
      len = 90;
      lbl = (i) => `D${i + 1}`;
    }
    if (range === "Today") {
      len = 24;
      lbl = (i) => `${i}:00`;
    }
    const users = make(len, 600, 8);
    const trials = make(len, 10, 0.4).map((v) => Math.max(2, v));
    return {
      labels: Array.from({ length: len }, (_, i) => lbl(i)),
      series: [
        { name: "Users", color: "#0E7C5A", data: users },
        { name: "Trials", color: "#967B5A", data: trials },
      ],
    };
  }, [range]);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 420);
    return () => clearTimeout(t);
  }, [range]);

  /* KPI Card */
  const Card = ({ title, value, icon, color, delta }) => (
    <div className="group relative rounded-xl min-w-0 border border-green-800">
      <div className="relative p-3 sm:p-4 flex items-center gap-3 sm:gap-4">
        <div
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-white text-lg sm:text-xl shadow-md"
          style={{ background: color }}
        >
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-xs sm:text-sm">{title}</p>
          <div className="flex items-end gap-2 sm:gap-3">
            <h3 className="text-xl sm:text-2xl font-extrabold">
              <CountUp value={value} />
            </h3>
          </div>
        </div>
        <span
          className={`ml-auto text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full ${
            delta >= 0
              ? "bg-emerald-50 text-emerald-700"
              : "bg-rose-50 text-rose-700"
          }`}
        >
          {delta >= 0 ? "▲" : "▼"} {Math.abs(delta)}%
        </span>
      </div>
    </div>
  );

  return (
    <div className="flex-1 min-h-screen overflow-hidden">
      {/* ---------- Header ---------- */}
      <div className="sticky top-0 z-10 backdrop-blur border-b border-green-800">
        <div className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 flex flex-wrap items-center gap-2 sm:gap-3">
          <h1 className="text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight">
            Dashboard Overview
          </h1>

          <div className="ml-auto flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {/* mobile search */}
            <button className="sm:hidden inline-flex items-center justify-center w-9 h-9 rounded-full border border-green-800">
              <FaSearch />
            </button>

            {/* desktop search */}
            <div className="hidden md:flex items-center gap-2 rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 border border-green-800 w-full md:w-auto">
              <FaSearch className="text-sm" />
              <input
                placeholder="Search…"
                className="outline-none text-sm bg-transparent flex-1"
                style={{ caretColor: "#0E7C5A" }}
              />
            </div>

            {/* time range */}
            <div className="flex items-center gap-1 rounded-lg p-0.5 sm:p-1 overflow-x-auto no-scrollbar border border-green-800 w-full sm:w-auto">
              {["Today", "7d", "30d"].map((r) => (
                <button
                  key={r}
                  onClick={() => setRange(r)}
                  className="px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm font-medium transition flex-1 sm:flex-none"
                  style={{
                    background: range === r ? "#0E7C5A" : "transparent",
                    boxShadow:
                      range === r ? "0 3px 8px rgba(14,124,90,.3)" : "none",
                  }}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Content ---------- */}
      <div className="px-0.5 sm:px-4 md:px-6 py-4 sm:py-6 grid gap-4 sm:gap-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          <Card
            title="Total Users"
            value={totalUsers}
            icon={<FaUsers />}
            color="#0E7C5A"
            delta={baseData.delta.users}
          />
          <Card
            title="Active Tutors"
            value={tutorsActive}
            icon={<FaChalkboardTeacher />}
            color="#D4AF37"
            delta={baseData.delta.tutors}
          />
          <Card
            title="Courses"
            value={coursesCount}
            icon={<FaBookOpen />}
            color="#2C3E50"
            delta={baseData.delta.courses}
          />
          <Card
            title="Trial Requests"
            value={baseData.trials}
            icon={<FaChartLine />}
            color="#967B5A"
            delta={baseData.delta.trials}
          />
        </div>

        {/* Chart + Quick Actions */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6 items-start">
          {/* Chart card */}
          <div
            className={`xl:col-span-3 rounded-2xl px-3 sm:px-4 md:px-5 pt-3 sm:pt-4 pb-2 sm:pb-3 min-w-0 self-start border border-green-800 ${
              chartFull ? "fixed inset-2 sm:inset-4 z-50 bg-white" : ""
            }`}
          >
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h2 className="text-base sm:text-lg font-semibold">
                User Growth ({range})
              </h2>
              {chartFull && (
                <button
                  onClick={() => setChartFull(false)}
                  className="ml-auto bg-gray-100 rounded-full px-2 py-1 text-xs sm:text-sm"
                >
                  Close
                </button>
              )}
            </div>
            <AreaChart
              series={chart.series}
              labels={chart.labels}
              height={220}
              legend={{ hidden: legendHidden }}
              svgRef={areaSvgRef}
            />
          </div>
          <QuickActions />
        </div>

        {/* Latest Users */}
        <LatestUsers />
      </div>
    </div>
  );
};
