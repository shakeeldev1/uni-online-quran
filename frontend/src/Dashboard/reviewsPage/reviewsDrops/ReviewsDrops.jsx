// CourseDrops.jsx (replace file content with this)
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Search } from "lucide-react";

export default function ReviewsDrops({ search, setSearch, filter, setFilter }) {
  const [open, setOpen] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // You can extend the course list here or generate it from actual reviews server-side
  const dropdowns = [
    {
      key: "rating",
      options: [
        { label: "All Ratings", value: "All" },
        { label: "5 - Excellent", value: "5" },
        { label: "4 - Very Good", value: "4" },
        { label: "3 - Good", value: "3" },
        { label: "2 - Fair", value: "2" },
        { label: "1 - Poor", value: "1" },
      ],
    },
    {
      key: "role",
      options: [
        { label: "All Roles", value: "All" },
        { label: "Student", value: "Student" },
        { label: "Tutor", value: "Tutor" },
      ],
    },
    {
      key: "status",
      options: [
        { label: "All Status", value: "All" },
        { label: "Published", value: "Published" },
        { label: "Pending", value: "Pending" },
        { label: "Flagged", value: "Flagged" },
      ],
    },
    {
      key: "course",
      options: [
        { label: "All Courses", value: "All" },
        { label: "Nazra Basics", value: "Nazra Basics" },
        { label: "Hifz Intermediate", value: "Hifz Intermediate" },
        { label: "Tajweed Mastery", value: "Tajweed Mastery" },
        { label: "Advanced Quran Studies", value: "Advanced Quran Studies" },
      ],
    },
  ];

  const handleSelect = (key, value) => {
    setFilter((prev) => ({ ...prev, [key]: value }));
    setOpen(null);
  };

  return (
    <div ref={dropdownRef} className="bg-white w-full rounded-xl shadow p-4 mb-6">
      {/* Search Bar */}
      <div className="relative w-full mb-4">
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search reviews by reviewer, text or course..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0E7C5A] focus:outline-none"
        />
      </div>

      {/* Dropdown Filters */}
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        {dropdowns.map((drop) => (
          <div key={drop.key} className="relative w-full sm:w-1/4">
            <button
              onClick={() => setOpen(open === drop.key ? null : drop.key)}
              className="w-full flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-[#0E7C5A] transition"
            >
              <span className="text-gray-700 font-medium">
                {drop.options.find((opt) => opt.value === filter[drop.key])?.label}
              </span>
              <ChevronDown
                className={`ml-2 h-4 w-4 text-gray-500 transition-transform ${
                  open === drop.key ? "rotate-180" : ""
                }`}
              />
            </button>

            {open === drop.key && (
              <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-20">
                {drop.options.map((opt) => (
                  <div
                    key={opt.value}
                    onClick={() => handleSelect(drop.key, opt.value)}
                    className={`px-4 py-2 cursor-pointer hover:bg-[#e3f2e3] ${
                      filter[drop.key] === opt.value
                        ? "bg-[#0E7C5A] text-white hover:text-[#077150]"
                        : "text-gray-700"
                    }`}
                  >
                    {opt.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
