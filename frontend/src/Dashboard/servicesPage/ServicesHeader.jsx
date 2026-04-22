import { RefreshCcw, Plus } from "lucide-react";

export default function ServicesHeader({ onRefresh, onAddService }) {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        {/* Page Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 relative inline-block">
          Services
          <span className="absolute left-0 -bottom-1 w-14 h-1 bg-[#cdcd14] rounded-full"></span>
        </h1>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          {/* Add Service */}
          <button
            onClick={onAddService}
            className="flex items-center gap-2 bg-[#967B5A] hover:bg-[#776147] text-white px-4 py-2 rounded-lg shadow-md transition"
          >
            <Plus size={18} />
            <span>Add Service</span>
          </button>

          {/* Refresh */}
          <button
            onClick={onRefresh}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg shadow-md transition"
          >
            <RefreshCcw size={18} />
            <span>Refresh</span>
          </button>
        </div>
      </div>
    </>
  );
}
