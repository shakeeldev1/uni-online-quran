import { useState } from "react";
import { ToggleLeft, ToggleRight, Trash2, Search } from "lucide-react";

export default function SettingMain() {
  const [loginAlerts, setLoginAlerts] = useState(true);

  // Example devices (you can fetch dynamically later)
  const devices = [
    { id: 1, device: "Chrome on Windows", location: "Pakistan", lastLogin: "2025-09-20" },
    { id: 2, device: "Safari on iPhone", location: "UAE", lastLogin: "2025-09-19" },
  ];

  // Example admins
  const admins = [
    { id: 1, name: "Super Admin", email: "superadmin@example.com" },
    { id: 2, name: "Assistant Admin", email: "assistant@example.com" },
  ];

  const [searchEmail, setSearchEmail] = useState("");

  return (
    <div className="space-y-8">
      {/* Login Alerts Section */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Login Alerts</h2>
        <p className="text-gray-600 mb-4">
          Get notified whenever someone logs into the admin dashboard.
        </p>
        <button
          onClick={() => setLoginAlerts(!loginAlerts)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
        >
          {loginAlerts ? (
            <ToggleRight size={20} className="text-green-600" />
          ) : (
            <ToggleLeft size={20} className="text-gray-500" />
          )}
          {loginAlerts ? "Enabled" : "Disabled"}
        </button>
      </div>

      {/* Logged In Devices Section */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Logged In Devices</h2>
        <ul className="divide-y divide-gray-200">
          {devices.map((d) => (
            <li key={d.id} className="py-3 flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-700">{d.device}</p>
                <p className="text-sm text-gray-500">
                  {d.location} • Last login: {d.lastLogin}
                </p>
              </div>
              <button className="px-3 py-1 text-sm rounded bg-red-50 text-red-600 hover:bg-red-100 transition">
                Logout
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Manage Admins Section */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Manage Admins</h2>
        <ul className="divide-y divide-gray-200">
          {admins.map((a) => (
            <li key={a.id} className="py-3 flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-700">{a.name}</p>
                <p className="text-sm text-gray-500">{a.email}</p>
              </div>
              <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition">
                <Trash2 size={18} />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Delete User Section */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-red-700 mb-4">Delete User</h2>
        <p className="text-gray-600 mb-4">
          Remove a student or teacher permanently by searching their email.
        </p>
        <div className="flex gap-2">
          <input
            type="email"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            placeholder="Enter user email"
            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
          />
          <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition">
            <Search size={18} />
            Delete
          </button>
        </div>
      </div>

      {/* Danger Zone Section */}
      <div className="bg-white border border-red-300 rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-red-700 mb-4">Danger Zone</h2>
        <p className="text-gray-600 mb-4">
          Deleting your own admin account is irreversible. Proceed with caution.
        </p>
        <button className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow transition">
          Delete My Admin Account
        </button>
      </div>
    </div>
  );
}
