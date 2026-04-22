import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaPalette,
  FaBell,
  FaShieldAlt,
  FaDownload,
  FaUpload,
  FaPowerOff,
  FaTimes,
  FaCamera,
  FaCheckCircle,
  FaExclamationTriangle,
  FaGoogle,
  FaFacebookF,
  FaApple,
  FaDesktop,
  FaMobileAlt,
  FaGlobeAsia,
  FaKey,
  FaSyncAlt,
} from "react-icons/fa";

/* ───────── Brand & helpers ───────── */
const BRAND = {
  primary: "#0E7C5A",
  gold: "#D4AF37",
  dark: "#0B1324",
  light: "#F5F7FA",
};
const ease = [0.16, 1, 0.3, 1];
const cls = (...s) => s.filter(Boolean).join(" ");
const nowISO = () => new Date().toISOString();

const ACCENTS = [
  "#0E7C5A",
  "#D4AF37",
  "#2C3E50",
  "#10B981",
  "#8B5CF6",
  "#F59E0B",
  "#EF4444",
  "#0EA5E9",
];

/* LocalStorage */
const LS_SETTINGS = "dashboard_settings_v2";
const useLocalState = (key, initial) => {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
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

/* Toasts */
const Toasts = ({ list, onClose }) => (
  <div className="fixed bottom-4 right-4 z-50 grid gap-2">
    <AnimatePresence>
      {list.map((t) => (
        <motion.div
          key={t.id}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          className={cls(
            "rounded-xl px-4 py-3 shadow-lg border text-sm bg-white/95 backdrop-blur flex items-start gap-3",
            t.kind === "error"
              ? "border-rose-200 text-rose-800"
              : "border-emerald-200 text-emerald-800"
          )}
        >
          <FaCheckCircle className="mt-0.5" />
          <div className="min-w-0">
            <div className="font-medium">{t.title}</div>
            {t.msg && <div className="text-slate-600">{t.msg}</div>}
          </div>
          <button
            onClick={() => onClose(t.id)}
            className="opacity-60 hover:opacity-100 ml-2"
          >
            <FaTimes />
          </button>
        </motion.div>
      ))}
    </AnimatePresence>
  </div>
);

/* Toggle */
const Toggle = ({ checked, onChange }) => (
  <label className="relative inline-flex items-center cursor-pointer select-none">
    <input
      type="checkbox"
      className="sr-only peer"
      checked={!!checked}
      onChange={(e) => onChange(e.target.checked)}
    />
    <span className="w-11 h-6 bg-slate-300 rounded-full peer-checked:bg-emerald-600 transition-colors relative">
      <span className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5" />
    </span>
  </label>
);

/* Field */
const Field = ({ label, hint, children }) => (
  <label className="grid gap-1 text-sm">
    <span className="text-slate-700">{label}</span>
    {children}
    {hint && <span className="text-xs text-slate-400">{hint}</span>}
  </label>
);

/* Buttons */
const SaveButton = ({ saving, children, style }) => (
  <button
    type="submit"
    className="px-3 py-2 rounded-md text-white inline-flex items-center gap-2 disabled:opacity-70"
    style={style}
    disabled={saving}
  >
    {saving ? <FaSyncAlt className="animate-spin" /> : null}
    {children}
  </button>
);

/* Avatar upload helper */
const readDataURL = (file) =>
  new Promise((res, rej) => {
    const fr = new FileReader();
    fr.onload = () => res(fr.result);
    fr.onerror = rej;
    fr.readAsDataURL(file);
  });

/* Defaults (expanded) */
const DEFAULTS = {
  profile: {
    name: "Ali Raza",
    email: "ali@example.com",
    phone: "",
    country: "Pakistan",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
    language: "English",
    avatar: "",
    publicProfile: true,
  },
  prefs: {
    theme: "system", // system | light | dark
    accent: "#0E7C5A",
    density: "comfortable", // comfortable | compact
    animate: true,
  },
  notifications: {
    generalEmail: true,
    remindersEmail: true,
    reminderTime: "08:00",
    whatsappUpdates: false,
    weeklySummary: true,
  },
  security: {
    twoFA: false,
    loginAlerts: true,
    lastPwdChange: "2025-09-01T09:00:00",
    backupCodes: [],
    connected: { google: false, facebook: false, apple: false },
    sessions: [
      {
        id: "sess_1",
        device: "MacBook Pro",
        type: "Desktop",
        ip: "103.245.6.21",
        where: "Lahore, PK",
        last: "2025-09-08T21:03:00",
        current: true,
      },
      {
        id: "sess_2",
        device: "iPhone 14",
        type: "Mobile",
        ip: "103.245.6.21",
        where: "Lahore, PK",
        last: "2025-09-07T09:12:00",
        current: false,
      },
      {
        id: "sess_3",
        device: "Office PC",
        type: "Desktop",
        ip: "51.89.200.4",
        where: "London, UK",
        last: "2025-09-01T12:44:00",
        current: false,
      },
    ],
  },
};

/* File helpers */
const downloadText = (
  filename,
  text,
  mime = "application/json;charset=utf-8"
) => {
  const blob = new Blob([text], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 400);
};

/* Accent CSS variable (live preview across page) */
const useAccentVar = (color) => {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--accent", color);
    return () => root.style.removeProperty("--accent");
  }, [color]);
};

/* ───────── Page ───────── */
export const Settings = () => {
  const [data, setData] = useLocalState(LS_SETTINGS, DEFAULTS);
  const [tab, setTab] = useState("profile"); // profile | prefs | notifications | security
  const [toasts, setToasts] = useState([]);
  const toast = (kind, title, msg) =>
    setToasts((t) => [
      ...t,
      { id: Math.random().toString(36).slice(2), kind, title, msg },
    ]);
  const closeToast = (id) => setToasts((t) => t.filter((x) => x.id !== id));

  const fileRef = useRef(null);
  const importRef = useRef(null);
  const accent = data.prefs.accent || BRAND.primary;

  useAccentVar(accent);

  /* header glow */
  const Glow = () => (
    <div className="absolute inset-0 pointer-events-none">
      <div
        className="absolute -top-24 -left-24 w-[360px] h-[360px] rounded-full blur-3xl opacity-30"
        style={{
          background: "conic-gradient(from 90deg, #ffffff55, transparent)",
        }}
      />
      <div
        className="absolute -bottom-24 -right-24 w-[360px] h-[360px] rounded-full blur-3xl opacity-20"
        style={{
          background: "radial-gradient(closest-side, #ffffff66, transparent)",
        }}
      />
    </div>
  );

  /* Save + Import/Export bar */
  const TopBar = () => (
    <div className="bg-white/90 backdrop-blur rounded-2xl shadow p-3 mb-4 border border-slate-100 flex items-center justify-between gap-2 flex-wrap">
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            downloadText("settings.json", JSON.stringify(data, null, 2));
            toast("success", "Exported settings");
          }}
          className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-slate-200 hover:bg-slate-50"
        >
          <FaDownload /> Export
        </button>

        <button
          onClick={() => importRef.current?.click()}
          className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-slate-200 hover:bg-slate-50"
        >
          <FaUpload /> Import
        </button>
        <input
          ref={importRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (!f) return;
            const fr = new FileReader();
            fr.onload = () => {
              try {
                setData(JSON.parse(fr.result));
                toast("success", "Imported");
              } catch {
                toast("error", "Invalid file");
              }
            };
            fr.readAsText(f);
            e.target.value = "";
          }}
        />
      </div>

      {/* Animated tabs with underline */}
      <div className="relative inline-flex rounded-xl bg-white/15 ring-1 ring-slate-200/70 overflow-hidden">
        {[
          { id: "profile", label: "Profile", icon: <FaUser /> },
          { id: "prefs", label: "Preferences", icon: <FaPalette /> },
          { id: "notifications", label: "Notifications", icon: <FaBell /> },
          { id: "security", label: "Security", icon: <FaShieldAlt /> },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cls(
              "px-4 py-2 text-sm flex items-center gap-2 transition",
              tab === t.id
                ? "bg-[var(--accent)] text-white"
                : "text-slate-700 hover:bg-slate-50"
            )}
            style={
              tab === t.id ? { boxShadow: "inset 0 -2px 0 0 #00000022" } : {}
            }
            title={t.label}
          >
            {t.icon}
            <span className="hidden sm:inline">{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  /* ——— Profile ——— */
  const Profile = () => {
    const [form, setForm] = useState(data.profile);
    const [saving, setSaving] = useState(false);
    useEffect(() => setForm(data.profile), [data.profile]);

    const changeAvatar = async (file) => {
      if (!file) return;
      try {
        const url = await readDataURL(file);
        setForm((prev) => ({ ...prev, avatar: url }));
      } catch {
        toast("error", "Couldn’t load image");
      }
    };

    const onSubmit = (e) => {
      e.preventDefault();
      setSaving(true);
      setTimeout(() => {
        setSaving(false);
        setData((prev) => ({ ...prev, profile: form }));
        toast("success", "Profile saved");
      }, 600);
    };

    return (
      <div className="grid gap-6 overflow-hidden">
        {/* Cover card with avatar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease }}
          className="relative overflow-hidden rounded-2xl p-6 text-white shadow border border-transparent"
          style={{ background: `linear-gradient(135deg, ${accent}, #0B5F46)` }}
        >
          <Glow />
          <div className="relative flex items-center gap-4">
            <div className="relative">
              <img
                src={form.avatar || "https://i.pravatar.cc/160?img=39"}
                alt="Avatar"
                className="w-20 h-20 rounded-full object-cover ring-2 ring-white shadow"
                style={{ border: `3px solid ${accent}33` }}
              />
              <button
                className="absolute bottom-0 right-0 w-8 h-8 rounded-full grid place-items-center text-white"
                style={{ background: accent }}
                onClick={() => fileRef.current?.click()}
                title="Change avatar"
              >
                <FaCamera />
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) changeAvatar(f);
                  e.target.value = "";
                }}
              />
            </div>
            <div className="min-w-0">
              <div className="font-semibold text-xl">
                {form.name || "Your name"}
              </div>
              <div className="text-white/90 text-sm">{form.email}</div>
              <div className="text-xs text-white/80">
                Timezone: {form.timezone}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Details */}
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease }}
          onSubmit={onSubmit}
          className="bg-white rounded-2xl border border-slate-100 shadow p-4 grid gap-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Full name">
              <input
                className="w-full px-3 py-2 rounded-md border border-slate-200"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </Field>
            <Field label="Email">
              <input
                type="email"
                className="w-full px-3 py-2 rounded-md border border-slate-200"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </Field>
            <Field label="Phone (optional)">
              <input
                className="w-full px-3 py-2 rounded-md border border-slate-200"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </Field>
            <Field label="Country">
              <input
                className="w-full px-3 py-2 rounded-md border border-slate-200"
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
              />
            </Field>
            <Field label="Timezone">
              <input
                className="w-full px-3 py-2 rounded-md border border-slate-200"
                value={form.timezone}
                onChange={(e) => setForm({ ...form, timezone: e.target.value })}
              />
            </Field>
            <Field label="Language">
              <select
                className="w-full px-3 py-2 rounded-md border border-slate-200"
                value={form.language}
                onChange={(e) => setForm({ ...form, language: e.target.value })}
              >
                {["English", "Arabic", "Urdu", "French"].map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </Field>
          </div>

          <div className="flex items-center justify-between">
            <label className="inline-flex items-center gap-2 text-sm">
              <Toggle
                checked={form.publicProfile}
                onChange={(v) => setForm({ ...form, publicProfile: v })}
              />
              <span>Make my profile public on the site</span>
            </label>
            <SaveButton saving={saving} style={{ background: accent }}>
              Save Changes
            </SaveButton>
          </div>
        </motion.form>
      </div>
    );
  };

  /* ——— Preferences ——— */
  const Preferences = () => {
    const [form, setForm] = useState(data.prefs);
    const [saving, setSaving] = useState(false);
    useEffect(() => setForm(data.prefs), [data.prefs]);

    const onSubmit = (e) => {
      e.preventDefault();
      setSaving(true);
      setTimeout(() => {
        setSaving(false);
        setData((prev) => ({ ...prev, prefs: form }));
        toast("success", "Preferences saved");
      }, 600);
    };

    return (
      <motion.form
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease }}
        onSubmit={onSubmit}
        className="bg-white rounded-2xl border border-slate-100 shadow p-4 grid gap-4overflow-hidden "
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 overflow-hidden">
          <Field label="Theme">
            <select
              className="w-full px-3 py-2 rounded-md border border-slate-200"
              value={form.theme}
              onChange={(e) => setForm({ ...form, theme: e.target.value })}
            >
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </Field>
          <Field label="Density" hint="Controls spacing inside tables/cards">
            <select
              className="w-full px-3 py-2 rounded-md border border-slate-200"
              value={form.density}
              onChange={(e) => setForm({ ...form, density: e.target.value })}
            >
              <option value="comfortable">Comfortable</option>
              <option value="compact">Compact</option>
            </select>
          </Field>
          <Field label="Animations">
            <div className="flex items-center h-[42px] px-3 rounded-md border border-slate-200">
              <Toggle
                checked={form.animate}
                onChange={(v) => setForm({ ...form, animate: v })}
              />
              <span className="ml-2 text-sm text-slate-600">
                {form.animate ? "On" : "Off"}
              </span>
            </div>
          </Field>
        </div>

        <div className="grid gap-3">
          <div className="text-sm text-slate-700">Accent color</div>
          <div className="flex items-center gap-2 flex-wrap">
            {ACCENTS.map((c) => (
              <button
                key={c}
                onClick={() => setForm({ ...form, accent: c })}
                className={cls(
                  "w-8 h-8 rounded-full border transition",
                  form.accent === c
                    ? "ring-2 ring-offset-2 ring-offset-white"
                    : "hover:scale-105"
                )}
                style={{ background: c, borderColor: `${c}66` }}
                title={c}
              />
            ))}
            <input
              type="color"
              value={form.accent}
              onChange={(e) => setForm({ ...form, accent: e.target.value })}
              className="w-10 h-10 rounded-full border border-slate-200 p-0 overflow-hidden cursor-pointer"
            />
          </div>

          {/* Live preview */}
          <div className="mt-2 rounded-xl border border-slate-200 overflow-hidden">
            <div className="p-3 text-sm bg-slate-50">Live preview</div>
            <div className="p-4 flex items-center gap-3 flex-wrap">
              <button
                className="px-3 py-2 rounded-md text-white"
                style={{ background: form.accent }}
              >
                Primary
              </button>
              <span
                className="px-2 py-1 text-xs rounded-full"
                style={{
                  background: `${form.accent}1A`,
                  color: form.accent,
                  border: `1px solid ${form.accent}33`,
                }}
              >
                Badge
              </span>
              <div className="rounded-lg border border-slate-200 p-3">
                <div
                  className="text-sm font-semibold"
                  style={{ color: form.accent }}
                >
                  Card title
                </div>
                <div className="text-xs text-slate-500">
                  Lorem ipsum preview text.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end">
          <SaveButton saving={saving} style={{ background: form.accent }}>
            Save Preferences
          </SaveButton>
        </div>
      </motion.form>
    );
  };

  /* ——— Notifications ——— */
  const Notifications = () => {
    const [form, setForm] = useState(data.notifications);
    const [saving, setSaving] = useState(false);
    useEffect(() => setForm(data.notifications), [data.notifications]);

    const onSubmit = (e) => {
      e.preventDefault();
      setSaving(true);
      setTimeout(() => {
        setSaving(false);
        setData((prev) => ({ ...prev, notifications: form }));
        toast("success", "Notifications saved");
      }, 600);
    };

    return (
      <motion.form
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease }}
        onSubmit={onSubmit}
        className="bg-white rounded-2xl border border-slate-100 shadow p-4 grid gap-4"
      >
        {[
          {
            key: "generalEmail",
            label: "General updates (email)",
            hint: "Feature announcements & tips.",
          },
          {
            key: "remindersEmail",
            label: "Class reminders (email)",
            hint: "24h & 1h before your session.",
          },
          {
            key: "whatsappUpdates",
            label: "WhatsApp updates",
            hint: "Trials, schedule changes and offers.",
          },
          {
            key: "weeklySummary",
            label: "Weekly progress summary",
            hint: "Sent every Sunday morning.",
          },
        ].map((row) => (
          <div key={row.key} className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="text-sm text-slate-800">{row.label}</div>
              <div className="text-xs text-slate-500">{row.hint}</div>
            </div>
            <Toggle
              checked={form[row.key]}
              onChange={(v) => setForm({ ...form, [row.key]: v })}
            />
          </div>
        ))}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Reminder time (local)">
            <input
              type="time"
              className="w-full px-3 py-2 rounded-md border border-slate-200"
              value={form.reminderTime}
              onChange={(e) =>
                setForm({ ...form, reminderTime: e.target.value })
              }
            />
          </Field>
          <div className="grid gap-1 text-xs text-slate-500 self-end">
            You’ll get an email at your selected time on class days.
          </div>
        </div>

        <div className="flex items-center justify-end">
          <SaveButton saving={saving} style={{ background: accent }}>
            Save Notifications
          </SaveButton>
        </div>
      </motion.form>
    );
  };

  /* Helpers for security */
  const genCodes = () =>
    Array.from(
      { length: 10 },
      () =>
        Math.random().toString(36).slice(2, 6).toUpperCase() +
        "-" +
        Math.random().toString(36).slice(2, 6).toUpperCase()
    );
  const downloadCodes = (codes) =>
    downloadText(
      "backup_codes.txt",
      codes.join("\n"),
      "text/plain;charset=utf-8"
    );

  /* ——— Security ——— */
  const Security = () => {
    const [twoFA, setTwoFA] = useState(data.security.twoFA);
    const [alerts, setAlerts] = useState(data.security.loginAlerts);
    const [oldPwd, setOldPwd] = useState("");
    const [newPwd, setNewPwd] = useState("");
    const [showPwd, setShowPwd] = useState(false);
    const [codes, setCodes] = useState(data.security.backupCodes || []);
    const [conn, setConn] = useState(data.security.connected);
    const [sessions, setSessions] = useState(data.security.sessions);
    const [savingMain, setSavingMain] = useState(false);

    useEffect(() => {
      setTwoFA(data.security.twoFA);
      setAlerts(data.security.loginAlerts);
      setCodes(data.security.backupCodes || []);
      setConn(data.security.connected);
      setSessions(data.security.sessions);
    }, [data.security]);

    const saveMain = () => {
      setSavingMain(true);
      setTimeout(() => {
        setSavingMain(false);
        setData((prev) => ({
          ...prev,
          security: {
            ...prev.security,
            twoFA,
            loginAlerts: alerts,
            backupCodes: codes,
            connected: conn,
            sessions,
          },
        }));
        toast("success", "Security settings saved");
      }, 600);
    };

    const changePassword = (e) => {
      e.preventDefault();
      if (!newPwd || newPwd.length < 6)
        return toast("error", "Password too short", "Use 6+ characters.");
      setData((prev) => ({
        ...prev,
        security: { ...prev.security, lastPwdChange: nowISO() },
      }));
      setOldPwd("");
      setNewPwd("");
      toast("success", "Password updated");
    };

    const connect = (key) => {
      setConn((prev) => ({ ...prev, [key]: true }));
      toast("success", `Connected ${key}`);
    };
    const disconnect = (key) => {
      setConn((prev) => ({ ...prev, [key]: false }));
      toast("success", `Disconnected ${key}`);
    };

    const signOut = (id) => {
      setSessions((prev) => prev.filter((s) => s.id !== id));
      toast("success", "Signed out session");
    };
    const signOutAll = () => {
      setSessions((prev) => prev.filter((s) => s.current));
      toast("success", "Signed out other sessions");
    };

    return (
      <div className="grid gap-6">
        {/* Quick toggles */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease }}
          className="bg-white rounded-2xl border border-slate-100 shadow p-4 grid gap-4"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="text-sm text-slate-800">
                Two-factor authentication
              </div>
              <div className="text-xs text-slate-500">
                Adds an extra step when logging in (via app or SMS).
              </div>
            </div>
            <Toggle checked={twoFA} onChange={setTwoFA} />
          </div>
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="text-sm text-slate-800">Login alerts</div>
              <div className="text-xs text-slate-500">
                Email me when a new device signs in.
              </div>
            </div>
            <Toggle checked={alerts} onChange={setAlerts} />
          </div>

          {/* 2FA setup block */}
          {twoFA && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4"
            >
              <div className="text-sm font-medium text-emerald-800 mb-2">
                Set up 2FA
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-3 items-center">
                {/* Fake QR placeholder */}
                <div className="rounded-lg border-2 border-dashed border-emerald-300 w-[140px] h-[140px] grid place-items-center text-emerald-600 text-xs">
                  Scan with Authenticator
                </div>
                <div className="text-sm text-slate-700">
                  1) Scan the code with Google Authenticator (or similar).
                  <br />
                  2) Enter the 6-digit code on next login.
                  <br />
                  <div className="mt-2">
                    <button
                      className="px-3 py-2 rounded-md border border-emerald-200 text-emerald-700 hover:bg-emerald-50 text-xs"
                      onClick={() => {
                        const newCodes = genCodes();
                        setCodes(newCodes);
                        toast("success", "Backup codes generated");
                      }}
                    >
                      Generate backup codes
                    </button>
                    {!!codes.length && (
                      <button
                        className="ml-2 px-3 py-2 rounded-md border border-slate-200 hover:bg-slate-50 text-xs"
                        onClick={() => downloadCodes(codes)}
                      >
                        Download codes
                      </button>
                    )}
                  </div>
                </div>
              </div>
              {!!codes.length && (
                <div className="mt-3 grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                  {codes.map((c, i) => (
                    <div
                      key={i}
                      className="px-2 py-1 rounded-md border border-emerald-200 text-emerald-800 bg-white"
                    >
                      {c}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          <div className="flex items-center justify-end">
            <SaveButton saving={savingMain} style={{ background: accent }}>
              <FaCheckCircle /> Save Security
            </SaveButton>
          </div>
        </motion.div>

        {/* Change password */}
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease }}
          onSubmit={changePassword}
          className="bg-white rounded-2xl border border-slate-100 shadow p-4 grid gap-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Field label="Current password">
              <input
                type={showPwd ? "text" : "password"}
                className="w-full px-3 py-2 rounded-md border border-slate-200"
                value={oldPwd}
                onChange={(e) => setOldPwd(e.target.value)}
              />
            </Field>
            <Field label="New password">
              <input
                type={showPwd ? "text" : "password"}
                className="w-full px-3 py-2 rounded-md border border-slate-200"
                value={newPwd}
                onChange={(e) => setNewPwd(e.target.value)}
              />
            </Field>
            <Field label=" ">
              <label className="inline-flex items-center gap-2 mt-3 text-sm">
                <input
                  type="checkbox"
                  checked={showPwd}
                  onChange={(e) => setShowPwd(e.target.checked)}
                />
                <span>Show passwords</span>
              </label>
            </Field>
          </div>
          <div className="text-xs text-slate-500">
            Last changed:{" "}
            {new Date(data.security.lastPwdChange).toLocaleString()}
          </div>
          <div className="flex items-center justify-end">
            <button
              className="px-3 py-2 rounded-md text-white"
              style={{ background: accent }}
            >
              <FaKey /> Update Password
            </button>
          </div>
        </motion.form>

        {/* Connected accounts */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease }}
          className="bg-white rounded-2xl border border-slate-100 shadow p-4"
        >
          <div className="text-sm font-semibold text-slate-800 mb-3">
            Connected accounts
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                k: "google",
                label: "Google",
                icon: <FaGoogle />,
                color: "#0EA5E9",
              },
              {
                k: "facebook",
                label: "Facebook",
                icon: <FaFacebookF />,
                color: "#2563EB",
              },
              {
                k: "apple",
                label: "Apple",
                icon: <FaApple />,
                color: "#111827",
              },
            ].map((s) => (
              <div
                key={s.k}
                className="rounded-xl border border-slate-200 p-3 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-8 h-8 grid place-items-center rounded-md text-white"
                    style={{ background: s.color }}
                  >
                    {s.icon}
                  </span>
                  <div className="text-sm text-slate-700">{s.label}</div>
                </div>
                {conn[s.k] ? (
                  <button
                    className="px-3 py-1.5 text-xs rounded-md border border-rose-200 text-rose-600 hover:bg-rose-50"
                    onClick={() => disconnect(s.k)}
                  >
                    Disconnect
                  </button>
                ) : (
                  <button
                    className="px-3 py-1.5 text-xs rounded-md border border-slate-200 hover:bg-slate-50"
                    onClick={() => connect(s.k)}
                  >
                    Connect
                  </button>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Active sessions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease }}
          className="bg-white rounded-2xl border border-slate-100 shadow p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-semibold text-slate-800">
              Active sessions
            </div>
            <button
              className="px-3 py-1.5 text-xs rounded-md border border-slate-200 hover:bg-slate-50"
              onClick={signOutAll}
            >
              Sign out of other sessions
            </button>
          </div>
          <div className="grid gap-2">
            {sessions.map((s) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                className="rounded-xl border border-slate-200 p-3 flex items-center justify-between"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-9 h-9 grid place-items-center rounded-md bg-slate-50 border border-slate-200 text-slate-600">
                    {s.type === "Mobile" ? <FaMobileAlt /> : <FaDesktop />}
                  </span>
                  <div className="min-w-0">
                    <div className="text-sm text-slate-800 truncate">
                      {s.device}{" "}
                      {s.current && (
                        <span className="ml-1 px-2 py-0.5 rounded-full text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Current
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-500 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1">
                        <FaGlobeAsia />
                        {s.where}
                      </span>
                      <span>• IP {s.ip}</span>
                      <span>• {new Date(s.last).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                {!s.current && (
                  <button
                    className="px-3 py-1.5 text-xs rounded-md border border-rose-200 text-rose-600 hover:bg-rose-50"
                    onClick={() => signOut(s.id)}
                  >
                    <FaPowerOff /> Sign out
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  };

  /* Danger zone modal */
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [dangerAction, setDangerAction] = useState(null); // "reset" | "delete"

  const DangerZone = () => (
    <div className="bg-white rounded-2xl border border-rose-200 shadow p-4">
      <div className="flex items-start gap-3">
        <div className="mt-1 text-rose-500">
          <FaExclamationTriangle />
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-semibold text-rose-700">Danger zone</div>
          <div className="text-sm text-rose-600">
            These actions are irreversible.
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button
              className="px-3 py-2 rounded-md border border-rose-200 text-rose-600 hover:bg-rose-50"
              onClick={() => {
                setDangerAction("reset");
                setConfirmOpen(true);
              }}
            >
              Clear local settings
            </button>
            <button
              className="px-3 py-2 rounded-md bg-rose-600 text-white hover:opacity-95"
              onClick={() => {
                setDangerAction("delete");
                setConfirmOpen(true);
              }}
            >
              Delete account (mock)
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="flex-1 p-6 md:p-8 overflow-x-hidden"
      style={{ background: BRAND.light }}
    >
      <Toasts list={toasts} onClose={closeToast} />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease }}
        className="relative overflow-hidden rounded-2xl mb-6 p-6 sm:p-8 text-white shadow"
        style={{ background: `linear-gradient(135deg, ${accent}, #0B5F46)` }}
      >
        <Glow />
        <div className="relative flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="grid place-items-center w-11 h-11 rounded-full bg-white/15 ring-1 ring-white/20">
              <FaUser />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              Settings
            </h1>
          </div>
          <div className="text-sm opacity-90">
            Customize your account and dashboard experience
          </div>
        </div>
      </motion.div>

      <TopBar />

      <AnimatePresence mode="wait">
        {tab === "profile" && (
          <motion.div
            key="profile"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
          >
            <Profile />
          </motion.div>
        )}
        {tab === "prefs" && (
          <motion.div
            key="prefs"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
          >
            <Preferences />
          </motion.div>
        )}
        {tab === "notifications" && (
          <motion.div
            key="notifs"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
          >
            <Notifications />
          </motion.div>
        )}
        {tab === "security" && (
          <motion.div
            key="security"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
          >
            <Security />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Danger zone */}
      <div className="mt-6">
        <DangerZone />
      </div>

      {/* Confirm modal */}
      <AnimatePresence>
        {confirmOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConfirmOpen(false)}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="fixed inset-0 z-50 grid place-items-center p-4"
            >
              <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-start gap-3">
                  <div className="text-rose-600 text-xl">
                    <FaExclamationTriangle />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-[#0B1324]">
                      Are you sure?
                    </div>
                    <div className="text-sm text-slate-600 mt-1">
                      {dangerAction === "reset"
                        ? "This will clear local settings stored in your browser."
                        : "This simulates account deletion (front-end only)."}
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-end gap-2">
                  <button
                    className="px-3 py-2 rounded-md border border-slate-200 hover:bg-slate-50"
                    onClick={() => setConfirmOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-3 py-2 rounded-md bg-rose-600 text-white hover:opacity-95"
                    onClick={() => {
                      setConfirmOpen(false);
                      if (dangerAction === "reset") {
                        setData(DEFAULTS);
                        toast("success", "Settings reset");
                      } else {
                        toast("success", "Account deleted (mock)");
                      }
                    }}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
