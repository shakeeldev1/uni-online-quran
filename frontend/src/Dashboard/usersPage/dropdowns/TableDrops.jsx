import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function TableDrops({ filter, setFilter }) {
  const [open, setOpen] = useState(false);

  const options = [
    { label: "All Users", value: "All" },
    { label: "Students", value: "Students" },
    { label: "Tutors", value: "Tutors" },
    { label: "Active Users", value: "Active" },
    { label: "Inactive Users", value: "Inactive" },
  ];

  const handleSelect = (value) => {
    setFilter(value);
    setOpen(false);
  };

  return (
    <div className="relative w-full sm:w-60">
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-[#0E7C5A] transition"
      >
        <span className="text-gray-700 font-medium">
          {options.find((opt) => opt.value === filter)?.label}
        </span>
        <ChevronDown
          className={`ml-2 h-4 w-4 text-gray-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-20">
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className={`px-4 py-2 cursor-pointer hover:bg-[#e3f2e3] ${
                filter === opt.value ? "bg-[#0E7C5A] text-white hover:text-[#077150]" : "text-gray-700"
              }`}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}