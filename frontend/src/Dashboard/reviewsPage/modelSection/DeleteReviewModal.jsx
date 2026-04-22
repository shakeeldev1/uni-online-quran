import { X, Trash2 } from "lucide-react";

export default function DeleteReviewModal({ review, onClose, onDelete }) {
  const handleDelete = () => {
    console.log("Deleting Review:", review);
    onDelete?.(review);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-xs"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden animate-scale-in">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-[#0E7C5A]"
        >
          <X size={25} />
        </button>

        {/* Content */}
        <div className="p-8 text-center">
          {/* Icon */}
          <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center rounded-2xl bg-red-100 text-red-600 shadow-inner">
            <Trash2 size={35} />
          </div>

          <h2 className="text-2xl font-bold mb-3 text-[#0B1324]">
            Delete Review
          </h2>
          <p className="text-gray-600 mb-8 text-sm sm:text-base leading-relaxed">
            Are you sure you want to{" "}
            <span className="text-red-600 font-semibold">delete</span> this
            review by{" "}
            <span className="font-semibold">{review.reviewerName}</span> for{" "}
            <span className="italic">{review.courseTitle}</span>? This action
            cannot be undone.
          </p>

          {/* Review Preview */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6 shadow-sm border text-left">
            <p className="text-sm">
              <span className="font-semibold text-[#0C6A4D]">Review:</span>{" "}
              {review.reviewText}
            </p>
            <p className="text-sm mt-1 text-gray-500">
              {review.rating} Stars • {review.status}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium transition"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold shadow-lg hover:opacity-90"
            >
              Delete Permanently
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
