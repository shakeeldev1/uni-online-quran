import { useState, useEffect } from "react";
import { Eye, Check, X, Trash2, Download, ExternalLink } from "lucide-react";
import { teacherApplicationsAPI } from "../../features/teacherApplicationsAPI";

export default function TeacherApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [filter, setFilter] = useState("all"); // all, pending, approved, rejected

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await teacherApplicationsAPI.getAllApplications();
      if (response.success) {
        setApplications(response.data);
      } else {
        setError("Failed to load applications");
      }
    } catch (error) {
      setError(error.message || "Failed to load applications");
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      const response = await teacherApplicationsAPI.updateApplicationStatus(id, status);
      if (response.success) {
        // Update local state
        setApplications(
          applications.map((app) =>
            app._id === id ? { ...app, status } : app
          )
        );
        alert(`Application ${status} successfully!`);
      }
    } catch (error) {
      alert(error.message || "Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this application?")) {
      return;
    }
    try {
      const response = await teacherApplicationsAPI.deleteApplication(id);
      if (response.success) {
        setApplications(applications.filter((app) => app._id !== id));
        alert("Application deleted successfully!");
      }
    } catch (error) {
      alert(error.message || "Failed to delete application");
    }
  };

  // Filter applications
  const filteredApplications = applications.filter((app) => {
    if (filter === "all") return true;
    return app.status === filter;
  });

  // Get status badge color
  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "approved":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="bg-gray-100 rounded-xl p-8 text-center">
        <div className="text-lg text-gray-600">Loading applications...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-gray-100 rounded-xl p-8 text-center">
        <div className="text-lg text-red-600 mb-4">{error}</div>
        <button
          onClick={fetchApplications}
          className="px-4 py-2 bg-[#0E7C5A] text-white rounded-lg hover:bg-[#0a6147]"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 rounded-xl p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 relative inline-block">
          Teacher Applications
          <span className="absolute left-0 -bottom-1 w-12 h-1 bg-[#cdcd14] rounded-full"></span>
        </h1>

        <div className="flex items-center gap-3">
          {/* Filter dropdown */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#0E7C5A] outline-none"
          >
            <option value="all">All Applications</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>

          {/* Refresh button */}
          <button
            onClick={fetchApplications}
            className="px-4 py-2 bg-[#0E7C5A] text-white rounded-lg hover:bg-[#0a6147]"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="text-2xl font-bold text-gray-800">{applications.length}</div>
          <div className="text-sm text-gray-500">Total Applications</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="text-2xl font-bold text-yellow-600">
            {applications.filter((a) => a.status === "pending").length}
          </div>
          <div className="text-sm text-gray-500">Pending</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="text-2xl font-bold text-green-600">
            {applications.filter((a) => a.status === "approved").length}
          </div>
          <div className="text-sm text-gray-500">Approved</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="text-2xl font-bold text-red-600">
            {applications.filter((a) => a.status === "rejected").length}
          </div>
          <div className="text-sm text-gray-500">Rejected</div>
        </div>
      </div>

      {/* Applications List */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {filteredApplications.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left">
              <thead className="bg-[#01855d] text-white">
                <tr>
                  <th className="px-6 py-3 text-sm font-semibold">Name</th>
                  <th className="px-6 py-3 text-sm font-semibold">Email</th>
                  <th className="px-6 py-3 text-sm font-semibold">Phone</th>
                  <th className="px-6 py-3 text-sm font-semibold">Country</th>
                  <th className="px-6 py-3 text-sm font-semibold">Education</th>
                  <th className="px-6 py-3 text-sm font-semibold">Experience</th>
                  <th className="px-6 py-3 text-sm font-semibold">Status</th>
                  <th className="px-6 py-3 text-sm font-semibold">Date</th>
                  <th className="px-6 py-3 text-sm font-semibold text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map((app, index) => (
                  <tr
                    key={app._id}
                    className={`transition ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-green-50`}
                  >
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {app.fullName}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{app.email}</td>
                    <td className="px-6 py-4 text-gray-600">{app.whatsapp}</td>
                    <td className="px-6 py-4 text-gray-600">{app.country}</td>
                    <td className="px-6 py-4 text-gray-600">{app.education}</td>
                    <td className="px-6 py-4 text-gray-600">{app.experience}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadge(
                          app.status
                        )}`}
                      >
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => setSelectedApplication(app)}
                          className="p-2 rounded-lg hover:bg-blue-100 text-blue-600 transition"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>
                        {app.status === "pending" && (
                          <>
                            <button
                              onClick={() => handleStatusUpdate(app._id, "approved")}
                              className="p-2 rounded-lg hover:bg-green-100 text-green-600 transition"
                              title="Approve"
                            >
                              <Check size={18} />
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(app._id, "rejected")}
                              className="p-2 rounded-lg hover:bg-red-100 text-red-600 transition"
                              title="Reject"
                            >
                              <X size={18} />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleDelete(app._id)}
                          className="p-2 rounded-lg hover:bg-red-100 text-red-600 transition"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">
            No applications found
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">
                  Application Details
                </h2>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {/* Personal Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500">Full Name</label>
                  <p className="font-medium">{selectedApplication.fullName}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Father Name</label>
                  <p className="font-medium">{selectedApplication.fatherName}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">WhatsApp</label>
                  <p className="font-medium">{selectedApplication.whatsapp}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Email</label>
                  <p className="font-medium">{selectedApplication.email}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Gender</label>
                  <p className="font-medium">{selectedApplication.gender}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Country</label>
                  <p className="font-medium">{selectedApplication.country}</p>
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="text-sm text-gray-500">Address</label>
                <p className="font-medium">{selectedApplication.address}</p>
              </div>

              {/* Education & Experience */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm text-gray-500">Education</label>
                  <p className="font-medium">{selectedApplication.education}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Specialization</label>
                  <p className="font-medium">{selectedApplication.specialization}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Experience</label>
                  <p className="font-medium">{selectedApplication.experience}</p>
                </div>
              </div>

              {/* Languages */}
              <div>
                <label className="text-sm text-gray-500">Languages</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedApplication.languages?.map((lang, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Courses */}
              <div>
                <label className="text-sm text-gray-500">Courses Can Teach</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedApplication.courses?.map((course, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>

              {/* About */}
              <div>
                <label className="text-sm text-gray-500">About</label>
                <p className="mt-1 text-gray-700">{selectedApplication.about}</p>
              </div>

              {/* Documents */}
              <div>
                <label className="text-sm text-gray-500">Documents</label>
                <div className="flex flex-wrap gap-3 mt-2">
                  {selectedApplication.certificate && (
                    <a
                      href={selectedApplication.certificate}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm"
                    >
                      <Download size={16} />
                      Certificate
                      <ExternalLink size={14} />
                    </a>
                  )}
                  {selectedApplication.cnic && (
                    <a
                      href={selectedApplication.cnic}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm"
                    >
                      <Download size={16} />
                      CNIC
                      <ExternalLink size={14} />
                    </a>
                  )}
                  {selectedApplication.cv && (
                    <a
                      href={selectedApplication.cv}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm"
                    >
                      <Download size={16} />
                      CV
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center gap-4 pt-4 border-t">
                <span className="text-sm text-gray-500">Status:</span>
                <span
                  className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusBadge(
                    selectedApplication.status
                  )}`}
                >
                  {selectedApplication.status.charAt(0).toUpperCase() +
                    selectedApplication.status.slice(1)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            {selectedApplication.status === "pending" && (
              <div className="p-6 border-t flex justify-end gap-3">
                <button
                  onClick={() => {
                    handleStatusUpdate(selectedApplication._id, "rejected");
                    setSelectedApplication(null);
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Reject
                </button>
                <button
                  onClick={() => {
                    handleStatusUpdate(selectedApplication._id, "approved");
                    setSelectedApplication(null);
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Approve
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
