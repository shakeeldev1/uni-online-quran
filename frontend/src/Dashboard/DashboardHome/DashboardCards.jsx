import React, { useState, useEffect } from "react";
import {
  FaUsers,
  FaChalkboardTeacher,
  FaBookOpen,
  FaEnvelope,
} from "react-icons/fa";
import { statisticsAPI } from "../../features/statisticsAPI";

const DashboardCards = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dashboard statistics
  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await statisticsAPI.getDashboardStats();
      if (response.success) {
        setStats(response.data);
      } else {
        setError("Failed to load dashboard statistics");
      }
    } catch (error) {
      setError(error.message || "Failed to load dashboard statistics");
      console.error("Error fetching dashboard statistics:", error);
    } finally {
      setLoading(false);
    }
  };

  // Default stats while loading or on error
  const defaultStats = {
    users: { total: 0, active: 0 },
    tutors: { total: 0, active: 0 },
    courses: { total: 0, active: 0 },
    contacts: { total: 0, new: 0 },
  };

  const currentStats = stats || defaultStats;

  const CARDS = [
    {
      title: "Total Users",
      value: loading ? "..." : currentStats.users.total.toLocaleString(),
      subValue: loading ? "..." : `${currentStats.users.active} active`,
      icon: <FaUsers />,
      color: "bg-[#189C75]", // Emerald green
    },
    {
      title: "Tutors",
      value: loading ? "..." : currentStats.tutors.total.toLocaleString(),
      subValue: loading ? "..." : `${currentStats.tutors.active} active`,
      icon: <FaChalkboardTeacher />,
      color: "bg-[#0E6B51]", // Darker emerald
    },
    {
      title: "Courses",
      value: loading ? "..." : currentStats.courses.total.toLocaleString(),
      subValue: loading ? "..." : `${currentStats.courses.active} active`,
      icon: <FaBookOpen />,
      color: "bg-[#967B5A]", // Warm brown accent
    },
    {
      title: "Contact Requests",
      value: loading ? "..." : currentStats.contacts.total.toLocaleString(),
      subValue: loading ? "..." : `${currentStats.contacts.new} new`,
      icon: <FaEnvelope />,
      color: "bg-[#C49C2A]", // Golden brown
    },
  ];

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="text-red-800">
            <h3 className="font-medium">Failed to load statistics</h3>
            <p className="text-sm text-red-600">{error}</p>
          </div>
          <button
            onClick={fetchDashboardStats}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {CARDS.map((card, idx) => (
        <div
          key={idx}
          className="bg-[#F5F7FA] shadow rounded-xl p-5 flex items-center gap-4 border-l-4 border-[#0E7C5A] hover:shadow-lg transition"
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
            {card.subValue && (
              <p className="text-xs text-gray-600 mt-1">{card.subValue}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
