import React, { useState, useEffect } from "react";
import { FaUsers, FaUserCheck, FaUserTimes, FaUserClock } from "react-icons/fa";
import { statisticsAPI } from "../../features/statisticsAPI";

const UsersCards = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user statistics
  useEffect(() => {
    fetchUserStats();
  }, []);

  const fetchUserStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await statisticsAPI.getEntityStats("users");
      if (response.success) {
        setStats(response.data);
      } else {
        setError("Failed to load user statistics");
      }
    } catch (error) {
      setError(error.message || "Failed to load user statistics");
      console.error("Error fetching user statistics:", error);
    } finally {
      setLoading(false);
    }
  };

  // Default stats while loading or on error
  const defaultStats = {
    total: 0,
    verified: 0,
    unverified: 0,
  };

  const currentStats = stats || defaultStats;

  const CARDS = [
    {
      title: "Total Users",
      value: loading ? "..." : currentStats.total.toLocaleString(),
      icon: <FaUsers />,
      color: "bg-[#0E7C5A]", // Primary Green
      border: "border-[#0E7C5A]",
    },
    {
      title: "Active Users",
      value: loading ? "..." : currentStats.verified.toLocaleString(),
      icon: <FaUserCheck />,
      color: "bg-[#0C6A4D]", // Deep Green
      border: "border-[#0C6A4D]",
    },
    {
      title: "Inactive Users",
      value: loading ? "..." : currentStats.unverified.toLocaleString(),
      icon: <FaUserTimes />,
      color: "bg-[#967B5A]", // Sand Brown
      border: "border-[#967B5A]",
    },
    {
      title: "Verification Rate",
      value: loading
        ? "..."
        : `${
            currentStats.total > 0
              ? Math.round((currentStats.verified / currentStats.total) * 100)
              : 0
          }%`,
      icon: <FaUserClock />,
      color: "bg-[#D4AF37]", // Gold
      border: "border-[#D4AF37]",
    },
  ];

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="text-red-800">
            <h3 className="font-medium">Failed to load user statistics</h3>
            <p className="text-sm text-red-600">{error}</p>
          </div>
          <button
            onClick={fetchUserStats}
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
          onClick={fetchUserStats}
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
};

export default UsersCards;
