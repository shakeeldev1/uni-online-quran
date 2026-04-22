import { useState, useEffect } from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import TutorDrops from "./tutorDrops/TutorDrops";
import ViewTutorModal from "./modelsSection/ViewTutorModel";
import EditTutorModal from "./modelsSection/EditTutorModel";
import DeleteTutorModal from "./modelsSection/DeleteTutorModel";
import { tutorsAPI } from "../../features/tutorsAPI";

export default function TutorTable() {
  const [search, setSearch] = useState("");
  const [viewTutor, setViewTutor] = useState(null);
  const [editTutor, setEditTutor] = useState(null);
  const [deleteTutor, setDeleteTutor] = useState(null);
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({
    role: "All",
    status: "All",
    gender: "All",
    reviews: "All",
  });

  // Fetch tutors from API
  useEffect(() => {
    fetchTutors();
  }, []);

  const fetchTutors = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await tutorsAPI.getAllTutors();
      if (response.success) {
        setTutors(response.data);
      } else {
        setError("Failed to load tutors");
      }
    } catch (error) {
      setError(error.message || "Failed to load tutors");
      console.error("Error fetching tutors:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditTutor = async (tutorData) => {
    try {
      const response = await tutorsAPI.updateTutor(tutorData._id, tutorData);
      if (response.success) {
        // Update tutors list
        setTutors(
          tutors.map((tutor) =>
            tutor._id === tutorData._id ? response.data : tutor
          )
        );
        setEditTutor(null);
        alert("Tutor updated successfully!");
      }
    } catch (error) {
      alert(error.message || "Failed to update tutor");
    }
  };

  const handleDeleteTutor = async (tutorId) => {
    try {
      const response = await tutorsAPI.deleteTutor(tutorId);
      if (response.success) {
        // Remove tutor from list
        setTutors(tutors.filter((tutor) => tutor._id !== tutorId));
        setDeleteTutor(null);
        alert("Tutor deleted successfully!");
      }
    } catch (error) {
      alert(error.message || "Failed to delete tutor");
    }
  };

  const handleToggleStatus = async (tutorId) => {
    try {
      const response = await tutorsAPI.toggleTutorStatus(tutorId);
      if (response.success) {
        // Update tutor status in list
        setTutors(
          tutors.map((tutor) => (tutor._id === tutorId ? response.data : tutor))
        );
        alert(
          `Tutor ${
            response.data.isActive ? "activated" : "deactivated"
          } successfully!`
        );
      }
    } catch (error) {
      alert(error.message || "Failed to toggle tutor status");
    }
  };

  // Filter tutors by search + dropdowns
  const filteredTutors = tutors.filter((t) => {
    const matchesSearch =
      t.username?.toLowerCase().includes(search.toLowerCase()) ||
      t.email?.toLowerCase().includes(search.toLowerCase());

    const matchesRole = filter.role === "All" || t.role === filter.role;
    const matchesStatus =
      filter.status === "All" ||
      (filter.status === "Active" && t.isActive) ||
      (filter.status === "Inactive" && !t.isActive);
    const matchesGender = filter.gender === "All" || t.gender === filter.gender;
    const matchesReviews =
      filter.reviews === "All" ||
      (filter.reviews === "5" && Math.round(t.reviews) === 5) ||
      (filter.reviews === "4+" && t.reviews >= 4) ||
      (filter.reviews === "3-" && t.reviews <= 3);

    return (
      matchesSearch &&
      matchesRole &&
      matchesStatus &&
      matchesGender &&
      matchesReviews
    );
  });

  // Show loading or error states
  if (loading) {
    return (
      <div className="bg-gray-100 rounded-xl p-8 text-center">
        <div className="text-lg text-gray-600">Loading tutors...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-100 rounded-xl p-8 text-center">
        <div className="text-lg text-red-600 mb-4">{error}</div>
        <button
          onClick={fetchTutors}
          className="px-4 py-2 bg-[#0E7C5A] text-white rounded-lg hover:bg-[#0a6147]"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 rounded-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3 p-3">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 relative inline-block">
          Tutors Management
          <span className="absolute left-0 -bottom-1 w-12 h-1 bg-[#cdcd14] rounded-full"></span>
        </h1>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-full">
          {/* Filters */}
          <TutorDrops
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
          <table className="w-full min-w-[900px] text-left border-collapse text-nowrap">
            <thead className="bg-[#01855d] text-white">
              <tr>
                <th className="px-6 py-3 text-sm font-semibold">Name</th>
                <th className="px-6 py-3 text-sm font-semibold">Email</th>
                <th className="px-6 py-3 text-sm font-semibold">Role</th>
                <th className="px-6 py-3 text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-sm font-semibold">Gender</th>
                <th className="px-6 py-3 text-sm font-semibold">Experience</th>
                <th className="px-6 py-3 text-sm font-semibold">Students</th>
                <th className="px-6 py-3 text-sm font-semibold">Reviews</th>
                <th className="px-6 py-3 text-sm font-semibold">Joined</th>
                <th className="px-6 py-3 text-sm font-semibold text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredTutors.length > 0 ? (
                filteredTutors.map((tutor, index) => (
                  <tr
                    key={tutor._id}
                    className={`transition ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-green-50`}
                  >
                    {/* Avatar + Name */}
                    <td className="px-6 py-4 font-medium text-gray-800 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300">
                        {tutor.profileImage ? (
                          <img
                            src={tutor.profileImage}
                            alt={tutor.username}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = "none";
                              e.target.nextSibling.style.display = "flex";
                            }}
                          />
                        ) : null}
                        <div
                          className={`w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-medium text-sm ${
                            tutor.profileImage ? "hidden" : "flex"
                          }`}
                        >
                          {tutor.username.charAt(0).toUpperCase()}
                        </div>
                      </div>
                      {tutor.username}
                    </td>

                    <td className="px-6 py-4 text-gray-600">{tutor.email}</td>

                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
                        {tutor.role}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          tutor.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {tutor.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-gray-700">{tutor.gender}</td>
                    <td className="px-6 py-4 text-gray-700">
                      {tutor.experience}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      <button
                        onClick={() => handleToggleStatus(tutor._id)}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                        title="Click to toggle status"
                      >
                        {tutor.studentsAssigned}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-yellow-600 font-semibold">
                      ⭐ {tutor.reviews.toFixed(1)}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(tutor.createdAt).toLocaleDateString()}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => setViewTutor(tutor)}
                          className="p-2 rounded-lg hover:bg-green-100 text-green-600 transition"
                          title="View Tutor"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => setEditTutor(tutor)}
                          className="p-2 rounded-lg hover:bg-yellow-100 text-yellow-600 transition"
                          title="Edit Tutor"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => setDeleteTutor(tutor)}
                          className="p-2 rounded-lg hover:bg-red-100 text-red-600 transition"
                          title="Delete Tutor"
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
                    No tutors found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Modals */}
          {viewTutor && (
            <ViewTutorModal
              user={viewTutor}
              onClose={() => setViewTutor(null)}
            />
          )}
          {editTutor && (
            <EditTutorModal
              user={editTutor}
              onClose={() => setEditTutor(null)}
              onSave={handleEditTutor}
            />
          )}
          {deleteTutor && (
            <DeleteTutorModal
              user={deleteTutor}
              onClose={() => setDeleteTutor(null)}
              onDelete={handleDeleteTutor}
            />
          )}
        </div>
      </div>
    </div>
  );
}
