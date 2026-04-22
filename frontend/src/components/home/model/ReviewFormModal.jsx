import { useEffect, useState } from "react";
import { X, Star } from "lucide-react";

export default function ReviewFormModal({ onClose }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    review: "",
  });


  // 🔒 Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden"; // disable scrolling
    return () => {
      document.body.style.overflow = "auto"; // re-enable scrolling when modal closes
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Review Submitted:", { ...formData, rating });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 bg-green-600">
          <h2 className="text-lg sm:text-xl font-bold text-white">
            Leave a Review
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-green-700/40 transition text-white"
          >
            <X size={22} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Star Rating */}
          <div className="flex items-center justify-center gap-2">
            {[...Array(5)].map((_, index) => {
              const value = index + 1;
              return (
                <button
                  type="button"
                  key={index}
                  onClick={() => setRating(value)}
                  onMouseEnter={() => setHover(value)}
                  onMouseLeave={() => setHover(null)}
                  className="transition transform hover:scale-110"
                >
                  <Star
                    size={32}
                    className={`${
                      value <= (hover || rating)
                        ? "fill-yellow-400 text-yellow-400 drop-shadow-md"
                        : "text-gray-300"
                    } transition`}
                  />
                </button>
              );
            })}
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="(optional)"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Review */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Review
            </label>
            <textarea
              name="review"
              placeholder="Write your feedback..."
              value={formData.review}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, review: e.target.value }))
              }
              rows={4}
              required
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white shadow-md transition"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
