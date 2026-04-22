// CourseTable.jsx (replace file content with this)
import { useState } from "react";
import { Eye, Edit, Trash2, Star } from "lucide-react";
import ReviewsDrops from "./reviewsDrops/ReviewsDrops";
import ViewReviewModal from "./modelSection/ViewReviewModal";
import EditReviewModal from "./modelSection/EditReviewModal";
import DeleteReviewModal from "./modelSection/DeleteReviewModal";


const sampleReviews = [
  {
    id: 1,
    reviewerName: "Ahmed Ali",
    role: "Student",
    rating: 5,
    reviewText:
      "Alhamdulillah, I learned so much. The tutor was excellent and very patient. Highly recommended!",
    courseTitle: "Nazra Basics",
    date: "2025-09-20",
    status: "Published",
    avatar: "https://i.pravatar.cc/80?u=review1",
  },
  {
    id: 2,
    reviewerName: "Fatima Noor",
    role: "Student",
    rating: 4,
    reviewText:
      "Very good classes, but I’d love more practice sessions and homework reviews.",
    courseTitle: "Hifz Intermediate",
    date: "2025-09-18",
    status: "Pending",
    avatar: "https://i.pravatar.cc/80?u=review2",
  },
  {
    id: 3,
    reviewerName: "Ustadh Kareem",
    role: "Tutor",
    rating: 5,
    reviewText:
      "Great engagement from students. Platform and course structure work well for Tajweed classes.",
    courseTitle: "Tajweed Mastery",
    date: "2025-09-15",
    status: "Published",
    avatar: "https://i.pravatar.cc/80?u=review3",
  },
  {
    id: 4,
    reviewerName: "Zain Malik",
    role: "Student",
    rating: 2,
    reviewText:
      "Lessons were rushed and recordings were missing. Please improve scheduling and recordings.",
    courseTitle: "Advanced Quran Studies",
    date: "2025-09-10",
    status: "Flagged",
    avatar: "https://i.pravatar.cc/80?u=review4",
  },
];

export default function ReviewsTable() {
  const [search, setSearch] = useState("");
  const [viewReview, setViewReview] = useState(null);
  const [editReview, setEditReview] = useState(null);
  const [deleteReview, setDeleteReview] = useState(null);
  const [filter, setFilter] = useState({
    rating: "All",
    role: "All",
    status: "All",
    course: "All",
  });

  // Filter reviews by search + dropdowns
  const filteredReviews = sampleReviews.filter((r) => {
    const q = search.trim().toLowerCase();
    const matchesSearch =
      q === "" ||
      r.reviewerName.toLowerCase().includes(q) ||
      r.reviewText.toLowerCase().includes(q) ||
      r.courseTitle.toLowerCase().includes(q);

    const matchesRating =
      filter.rating === "All" || r.rating === Number(filter.rating);
    const matchesRole = filter.role === "All" || r.role === filter.role;
    const matchesStatus = filter.status === "All" || r.status === filter.status;
    const matchesCourse = filter.course === "All" || r.courseTitle === filter.course;

    return (
      matchesSearch &&
      matchesRating &&
      matchesRole &&
      matchesStatus &&
      matchesCourse
    );
  });

  return (
    <div className="bg-gray-100 rounded-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3 p-3">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 relative inline-block">
          Reviews Management
          <span className="absolute left-0 -bottom-1 w-12 h-1 bg-[#cdcd14] rounded-full"></span>
        </h1>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-full">
          {/* Filters (search + dropdowns) */}
          <ReviewsDrops
            search={search}
            setSearch={setSearch}
            filter={filter}
            setFilter={setFilter}
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl shadow-lg bg-white">
        <div className="overflow-x-auto w-full rounded-2xl">
          <table className="w-full min-w-[1100px] text-left border-collapse text-nowrap">
            <thead className="bg-[#01855d] text-white">
              <tr className="gap-3">
                <th className="px-6 py-3 text-sm font-semibold">Reviewer</th>
                <th className="px-6 py-3 text-sm font-semibold">Role</th>
                <th className="px-6 py-3 text-sm font-semibold">Rating</th>
                <th className="px-6 py-3 text-sm font-semibold">Review</th>
                <th className="px-6 py-3 text-sm font-semibold">Course</th>
                <th className="px-6 py-3 text-sm font-semibold">Date</th>
                <th className="px-6 py-3 text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-sm font-semibold text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredReviews.length > 0 ? (
                filteredReviews.map((review, index) => (
                  <tr
                    key={review.id}
                    className={`transition ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-green-50`}
                  >
                    {/* Reviewer */}
                    <td className="px-6 py-4 font-medium text-gray-800 flex items-center gap-3">
                      <img
                        src={review.avatar}
                        alt={review.reviewerName}
                        className="w-12 h-12 rounded-lg object-cover border border-gray-300"
                      />
                      <div>
                        <div className="font-medium">{review.reviewerName}</div>
                        <div className="text-xs text-gray-500">{review.email || ""}</div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-gray-700">{review.role}</td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400" />
                        ))}
                        <span className="text-sm text-gray-500 ml-2">{review.rating}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-gray-700 max-w-[28rem] truncate">
                      {review.reviewText}
                    </td>

                    <td className="px-6 py-4 text-gray-700">{review.courseTitle}</td>

                    <td className="px-6 py-4 text-gray-500">{review.date}</td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          review.status === "Published"
                            ? "bg-green-100 text-green-700"
                            : review.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {review.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => setViewReview(review)}
                          className="p-2 rounded-lg hover:bg-green-100 text-green-600 transition"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => setEditReview(review)}
                          className="p-2 rounded-lg hover:bg-yellow-100 text-yellow-600 transition"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => setDeleteReview(review)}
                          className="p-2 rounded-lg hover:bg-red-100 text-red-600 transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="px-6 py-6 text-center text-gray-500 italic"
                  >
                    No reviews found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Modals */}
          {viewReview && (
            <ViewReviewModal review={viewReview} onClose={() => setViewReview(null)} />
          )}
          {editReview && (
            <EditReviewModal review={editReview} onClose={() => setEditReview(null)} />
          )}
          {deleteReview && (
            <DeleteReviewModal review={deleteReview} onClose={() => setDeleteReview(null)} />
          )}
        </div>
      </div>
    </div>
  );
}
