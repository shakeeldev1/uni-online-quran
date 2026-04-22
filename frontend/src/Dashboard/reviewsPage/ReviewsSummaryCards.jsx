import { Star, ThumbsUp, Gauge, Flag } from "lucide-react";

export default function ReviewsSummaryCards() {
  const CARDS = [
    {
      title: "Total Reviews",
      value: 245,
      icon: <Star className="w-6 h-6" />,
      color: "bg-[#967B5A]", // brown-gold
      border: "border-[#967B5A]",
    },
    {
      title: "5-Star Reviews",
      value: 180,
      icon: <ThumbsUp className="w-6 h-6" />,
      color: "bg-[#0E7C5A]", // green
      border: "border-[#0E7C5A]",
    },
    {
      title: "Average Rating",
      value: "4.6",
      icon: <Gauge className="w-6 h-6" />,
      color: "bg-[#D4AF37]", // gold
      border: "border-[#D4AF37]",
    },
    {
      title: "Flagged Reviews",
      value: 3,
      icon: <Flag className="w-6 h-6" />,
      color: "bg-[#B91C1C]", // red
      border: "border-[#B91C1C]",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {CARDS.map((card, idx) => (
        <div
          key={idx}
          className={`bg-[#F5F7FA] shadow rounded-xl p-5 flex items-center gap-4 border-l-4 ${card.border} hover:shadow-lg transition`}
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
          </div>
        </div>
      ))}
    </div>
  );
}
