import { useState } from "react";
import { Plus, RefreshCcw, Download } from "lucide-react";
import TutorFormModal from "./modelsSection/TutorFormModal";

export default function TutorsHeader({ onTutorAdded }) {
  const [openForm, setOpenForm] = useState(false);

  const handleTutorAdded = (newTutor) => {
    onTutorAdded?.(newTutor);
    setOpenForm(false);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      {/* Page Title */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 relative inline-block">
        Tutors
        <span className="absolute left-0 -bottom-1 w-12 h-1 bg-[#cdcd14] rounded-full"></span>
      </h1>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setOpenForm(true)}
          className="flex items-center gap-2 bg-[#967B5A] hover:bg-[#776147] text-white px-4 py-2 rounded-lg shadow transition"
        >
          <Plus size={18} />
          <span className="hidden sm:inline">Add Tutor</span>
        </button>

        {/* <button
          onClick={onRefresh}
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg shadow transition"
        >
          <RefreshCcw size={18} />
          <span className="hidden sm:inline">Refresh</span>
        </button>

        <button className="flex items-center gap-2 bg-green-700 hover:bg-[#006045] text-white px-4 py-2 rounded-lg shadow transition">
          <Download size={18} />
          <span className="hidden sm:inline">Export</span>
        </button> */}
      </div>

      {/* Tutor Form Modal */}
      {openForm && (
        <TutorFormModal
          onClose={() => setOpenForm(false)}
          onTutorAdded={handleTutorAdded}
        />
      )}
    </div>
  );
}
