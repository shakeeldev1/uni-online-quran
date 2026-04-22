import { RefreshCcw } from "lucide-react";

export default function SettingHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-2 relative">
          Settings
          <span className="absolute left-0 -bottom-1 w-16 h-1 bg-[#0E7C5A] rounded-full"></span>
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your profile, security, and platform preferences
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <button className="flex items-center gap-2 bg-gradient-to-r from-[#967B5A] to-[#776147] hover:opacity-90 text-white px-4 py-2 rounded-lg shadow-md transition">
          <RefreshCcw size={18} />
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </div>
    </div>
  );
}
