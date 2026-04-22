import { RefreshCcw, Download } from "lucide-react";

export default function ReviewsHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      {/* Page Title */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 relative inline-block">
        Reviews
        <span className="absolute left-0 -bottom-1 w-14 h-1 bg-[#cdcd14] rounded-full"></span>
      </h1>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        {/* Refresh Reviews */}
        <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg shadow transition">
          <RefreshCcw size={18} />
          <span className="hidden sm:inline">Refresh</span>
        </button>

        {/* Export Reviews */}
        <button className="flex items-center gap-2 bg-green-700 hover:bg-[#006045] text-white px-4 py-2 rounded-lg shadow transition">
          <Download size={18} />
          <span className="hidden sm:inline">Export Reviews</span>
        </button>
      </div>
    </div>
  );
}
