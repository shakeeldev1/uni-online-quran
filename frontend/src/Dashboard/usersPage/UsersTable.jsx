import { useState, useEffect } from "react";
import { Search, Eye, Edit, Trash2, MoreVertical } from "lucide-react";
import TableDrops from "./dropdowns/TableDrops";
import ViewUserModal from "./modelsSection/ViewUserModal";
import EditUserModal from "./modelsSection/EditUserModal";
import DeleteUserModal from "./modelsSection/DeleteUserModal";
import { usersAPI } from "../../features/usersAPI";

export default function UsersTable() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [viewUser, setViewUser] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users from API
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await usersAPI.getAllUsers();
      if (response.success) {
        setUsers(response.data);
      } else {
        setError("Failed to load users");
      }
    } catch (error) {
      setError(error.message || "Failed to load users");
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = async (userData) => {
    try {
      const response = await usersAPI.updateUser(userData._id, userData);
      if (response.success) {
        // Update users list
        setUsers(
          users.map((user) =>
            user._id === userData._id ? response.data : user
          )
        );
        setEditUser(null);
        alert("User updated successfully!");
      }
    } catch (error) {
      alert(error.message || "Failed to update user");
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await usersAPI.deleteUser(userId);
      if (response.success) {
        // Remove user from list
        setUsers(users.filter((user) => user._id !== userId));
        setDeleteUser(null);
        alert("User deleted successfully!");
      }
    } catch (error) {
      alert(error.message || "Failed to delete user");
    }
  };

  const handleToggleStatus = async (userId) => {
    try {
      const response = await usersAPI.toggleUserStatus(userId);
      if (response.success) {
        // Update user status in list
        setUsers(
          users.map((user) => (user._id === userId ? response.data : user))
        );
        alert(
          `User ${
            response.data.isVerified ? "activated" : "deactivated"
          } successfully!`
        );
      }
    } catch (error) {
      alert(error.message || "Failed to toggle user status");
    }
  };

  // Filtered users by search and dropdown
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.username?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" ||
      (filter === "Students" && user.role === "user") ||
      (filter === "Tutors" && user.role === "admin") ||
      (filter === "Active" && user.isVerified === true) ||
      (filter === "Inactive" && user.isVerified === false);

    return matchesSearch && matchesFilter;
  });

  // Show loading or error states
  if (loading) {
    return (
      <div className="bg-gray-100 rounded-xl p-8 text-center">
        <div className="text-lg text-gray-600">Loading users...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-100 rounded-xl p-8 text-center">
        <div className="text-lg text-red-600 mb-4">{error}</div>
        <button
          onClick={fetchUsers}
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
          Users Management
          <span className="absolute left-0 -bottom-1 w-12 h-1 bg-[#cdcd14] rounded-full"></span>
        </h1>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          {/* Search */}
          <div className="relative w-full sm:w-100">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0E7C5A] focus:outline-none bg-white shadow-sm"
            />
          </div>

          {/* Filter Dropdown */}
          <TableDrops filter={filter} setFilter={setFilter} />
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-2xl shadow-lg bg-white">
        <div className="overflow-x-auto w-full rounded-2xl">
          <table className="w-full min-w-[800px] text-left border-collapse text-nowrap">
            <thead className="bg-[#01855d] text-white">
              <tr>
                <th className="px-6 py-3 text-sm font-semibold">Name</th>
                <th className="px-6 py-3 text-sm font-semibold">Email</th>
                <th className="px-6 py-3 text-sm font-semibold">Role</th>
                <th className="px-6 py-3 text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-sm font-semibold">Joined</th>
                <th className="px-6 py-3 text-sm font-semibold text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <tr
                    key={user._id}
                    className={`transition ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-green-50`}
                  >
                    {/* Avatar + Name */}
                    <td className="px-6 py-4 font-medium text-gray-800 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300">
                        {user.profileImage ? (
                          <img
                            src={user.profileImage}
                            alt={user.username}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = "none";
                              e.target.nextSibling.style.display = "flex";
                            }}
                          />
                        ) : null}
                        <div
                          className={`w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-medium text-sm ${
                            user.profileImage ? "hidden" : "flex"
                          }`}
                        >
                          {user.username.charAt(0).toUpperCase()}
                        </div>
                      </div>
                      {user.username}
                    </td>

                    <td className="px-6 py-4 text-gray-600">{user.email}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          user.role === "admin"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {user.role === "admin" ? "Admin" : "User"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          user.isVerified
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {user.isVerified ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => setViewUser(user)}
                          className="p-2 rounded-lg hover:bg-green-100 text-green-600 transition"
                          title="View User"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => setEditUser(user)}
                          className="p-2 rounded-lg hover:bg-yellow-100 text-yellow-600 transition"
                          title="Edit User"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => setDeleteUser(user)}
                          className="p-2 rounded-lg hover:bg-red-100 text-red-600 transition"
                          title="Delete User"
                        >
                          <Trash2 size={18} />
                        </button>
                        <button
                          onClick={() => handleToggleStatus(user._id)}
                          className={`p-2 rounded-lg transition ${
                            user.isVerified
                              ? "hover:bg-red-100 text-red-600"
                              : "hover:bg-green-100 text-green-600"
                          }`}
                          title={
                            user.isVerified
                              ? "Deactivate User"
                              : "Activate User"
                          }
                        >
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-6 text-center text-gray-500 italic"
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {/* Modals */}
          {viewUser && (
            <ViewUserModal user={viewUser} onClose={() => setViewUser(null)} />
          )}
          {editUser && (
            <EditUserModal
              user={editUser}
              onClose={() => setEditUser(null)}
              onSave={handleEditUser}
            />
          )}
          {deleteUser && (
            <DeleteUserModal
              user={deleteUser}
              onClose={() => setDeleteUser(null)}
              onDelete={handleDeleteUser}
            />
          )}
        </div>
      </div>
    </div>
  );
}
