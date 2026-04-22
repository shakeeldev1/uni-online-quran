import { useState, useEffect } from "react";
import { Layers, CheckCircle, XCircle } from "lucide-react";
import { servicesAPI } from "../../features/servicesAPI";

export default function ServicesCards({ refreshTrigger }) {
  const [stats, setStats] = useState({ total: 0, active: 0, inactive: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchServiceStats();
  }, [refreshTrigger]); // <-- now updates when refreshTrigger changes

  const fetchServiceStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await servicesAPI.getAllServices();
      if (response.success) {
        const services = response.data;
        setStats({
          total: services.length,
          active: services.filter((s) => s.status === "Active").length,
          inactive: services.filter((s) => s.status === "Inactive").length,
        });
      }
    } catch (error) {
      console.error(error);
      setError(error.message || "Failed to load service statistics");
    } finally {
      setLoading(false);
    }
  };

  const CARDS = [
    { title: "Total Services", value: stats.total, icon: <Layers />, color: "bg-[#967B5A]", border: "border-[#967B5A]" },
    { title: "Active Services", value: stats.active, icon: <CheckCircle />, color: "bg-[#0E7C5A]", border: "border-[#0E7C5A]" },
    { title: "Inactive Services", value: stats.inactive, icon: <XCircle />, color: "bg-red-500", border: "border-red-500" },
  ];

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="text-red-800">
            <h3 className="font-medium">Failed to load service statistics</h3>
            <p className="text-sm text-red-600">{error}</p>
          </div>
          <button
            onClick={fetchServiceStats}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {CARDS.map((card, idx) => (
        <div
          key={idx}
          className={`bg-[#F5F7FA] shadow rounded-xl p-5 flex items-center gap-4 border-l-4 ${card.border}`}
        >
          <div className={`${card.color} text-white text-2xl p-3 rounded-lg flex items-center justify-center`}>
            {card.icon}
          </div>
          <div>
            <h4 className="text-[#0B1324] text-sm font-medium">{card.title}</h4>
            <p className="text-2xl font-bold text-[#0E7C5A]">{loading ? "..." : card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}