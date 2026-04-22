import { useState, useEffect } from "react";
import { Users, UserCheck, UserX, Star } from "lucide-react";
import { statisticsAPI } from "../../features/statisticsAPI";

export default function TutorSummaryCards() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tutor statistics
  useEffect(() => {
    fetchTutorStats();
  }, []);

  const fetchTutorStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await statisticsAPI.getEntityStats("tutors");
      if (response.success) {
        setStats(response.data);
      } else {
        setError("Failed to load tutor statistics");
      }
    } catch (error) {
      setError(error.message || "Failed to load tutor statistics");
      console.error("Error fetching tutor statistics:", error);
    } finally {
      setLoading(false);
    }
  };

  // Default stats while loading or on error
  const defaultStats = {
    total: 0,
    active: 0,
    inactive: 0,
    totalStudents: 0,
    avgRating: 0,
  };

  const currentStats = stats || defaultStats;

  const CARDS = [
    {
      title: "Total Tutors",
      value: loading ? "..." : currentStats.total.toLocaleString(),
      icon: <Users className="w-6 h-6" />,
      color: "bg-[#967B5A]", // main green
      border: "border-[#967B5A]",
    },
    {
      title: "Active Tutors",
      value: loading ? "..." : currentStats.active.toLocaleString(),
      icon: <UserCheck className="w-6 h-6" />,
      color: "bg-[#D4AF37]", // gold
      border: "border-[#D4AF37]",
    },
    {
      title: "Inactive Tutors",
      value: loading ? "..." : currentStats.inactive.toLocaleString(),
      icon: <UserX className="w-6 h-6" />,
      color: "bg-[#0B1324]", // dark navy
      border: "border-[#0B1324]",
    },
    {
      title: "Average Rating",
      value: loading
        ? "..."
        : currentStats.avgRating
        ? `${currentStats.avgRating.toFixed(1)}⭐`
        : "N/A",
      icon: <Star className="w-6 h-6" />,
      color: "bg-[#0E7C5A]",
      border: "border-[#0E7C5A]",
    },
  ];

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="text-red-800">
            <h3 className="font-medium">Failed to load tutor statistics</h3>
            <p className="text-sm text-red-600">{error}</p>
          </div>
          <button
            onClick={fetchTutorStats}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {CARDS.map((card, idx) => (
        <div
          key={idx}
          className={`bg-[#F5F7FA] shadow rounded-xl p-5 flex items-center gap-4 border-l-4 ${card.border} hover:shadow-lg transition cursor-pointer`}
          onClick={fetchTutorStats}
          title="Click to refresh"
        >
          {/* Icon */}
          <div
            className={`${card.color} text-white text-2xl p-3 rounded-lg flex items-center justify-center`}
          >
            {card.icon}
          </div>

          {/* Content */}
          <div>
            <h4 className="text-[#0B1324] text-sm font-medium">{card.title}</h4>
            <p className="text-2xl font-bold text-[#0E7C5A]">{card.value}</p>
            {loading && <p className="text-xs text-gray-500">Loading...</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
