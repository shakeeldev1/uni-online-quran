import { X, Star, Calendar, BookOpen, ShieldCheck } from "lucide-react";

export default function ViewReviewModal({ review, onClose }) {
  return (
    <div className="fixed inset-0 flex justify-end z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 backdrop-blur-xs bg-black/30"
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div className="relative w-full sm:w-130 bg-gradient-to-b from-[#F5F7FA] to-white shadow-2xl h-full flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 pb-28">
          {/* Reviewer Info */}
          <div className="flex flex-col items-center mt-8">
            <img
              src={review.avatar}
              alt={review.reviewerName}
              className="w-28 h-28 rounded-full border-4 border-[#D4AF37] object-cover shadow-lg"
            />
            <h2 className="text-2xl font-bold mt-4 text-[#0B1324] tracking-wide">
              {review.reviewerName}
            </h2>
            <p className="text-sm text-gray-500">{review.role}</p>
          </div>

          {/* Review Details */}
          <div className="mt-8 space-y-4">
            <DetailCard
              icon={<BookOpen className="text-[#967B5A]" size={20} />}
              label="Course"
              value={review.courseTitle}
            />

            <DetailCard
              icon={<Calendar className="text-[#0C6A4D]" size={20} />}
              label="Date"
              value={review.date}
            />

            <DetailCard
              icon={<Star className="text-yellow-500" size={20} />}
              label="Rating"
              value={
                <div className="flex items-center gap-1">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400" />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {review.rating}/5
                  </span>
                </div>
              }
            />

            <DetailCard
              icon={
                <ShieldCheck
                  className={
                    review.status === "Published"
                      ? "text-green-600"
                      : review.status === "Pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }
                  size={20}
                />
              }
              label="Status"
              value={review.status}
              badgeColor={
                review.status === "Published"
                  ? "bg-green-100 text-green-700"
                  : review.status === "Pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }
            />

            {/* Full Review */}
            <div className="bg-white rounded-xl p-4 shadow border hover:shadow-md transition">
              <p className="text-xs text-gray-400 mb-1">Review</p>
              <p className="text-sm text-gray-700 leading-relaxed">
                {review.reviewText}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 bg-white p-4 border-t">
          <button
            onClick={onClose}
            className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-300 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* Reusable Card */
function DetailCard({ icon, label, value, badgeColor }) {
  return (
    <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow border hover:shadow-md transition">
      {icon}
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        {badgeColor ? (
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeColor}`}
          >
            {value}
          </span>
        ) : (
          <p className="text-sm font-medium text-gray-800">{value}</p>
        )}
      </div>
    </div>
  );
}
