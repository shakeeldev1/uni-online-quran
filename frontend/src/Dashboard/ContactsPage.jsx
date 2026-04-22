import React, { useState, useEffect } from "react";
import API from "../features/api";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhone,
  FaUser,
  FaEye,
  FaTrash,
  FaFilter,
  FaSearch,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaUserGraduate,
  FaTimes,
  FaStickyNote,
  FaWhatsapp,
} from "react-icons/fa";

const ContactsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalContacts: 0,
  });
  const [statusCounts, setStatusCounts] = useState([]);
  const [newCount, setNewCount] = useState(0);

  const fetchContacts = React.useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: pagination.currentPage,
        limit: 10,
        status: statusFilter,
        ...(searchTerm && { search: searchTerm }),
      });

      const response = await API.get(`/contact?${params}`);

      if (response.data.success) {
        setContacts(response.data.data.contacts);
        setPagination(response.data.data.pagination);
        setStatusCounts(response.data.data.statusCounts);
        setNewCount(response.data.data.newCount);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, statusFilter, pagination.currentPage]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const handleViewContact = async (contactId) => {
    try {
      const response = await API.get(`/contact/${contactId}`);
      if (response.data.success) {
        setSelectedContact(response.data.data);
        setShowModal(true);
        // Refresh contacts to update read status
        fetchContacts();
      }
    } catch (error) {
      console.error("Error fetching contact details:", error);
    }
  };

  const handleUpdateStatus = async (contactId, status, adminNotes = "") => {
    try {
      const response = await API.put(`/contact/${contactId}`, {
        status,
        adminNotes,
      });

      if (response.data.success) {
        fetchContacts();
        if (selectedContact && selectedContact._id === contactId) {
          setSelectedContact(response.data.data);
        }
      }
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  const handleDeleteContact = async (contactId) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        await API.delete(`/contact/${contactId}`);
        fetchContacts();
        setShowModal(false);
      } catch (error) {
        console.error("Error deleting contact:", error);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "new":
        return "bg-[#AC7D40] text-[#0E7C5A]";
      case "contacted":
        return "bg-[#FBBF24] text-[#B45309]";
      case "enrolled":
        return "bg-[#4ADE80] text-[#065F46]";
      case "not-interested":
        return "bg-[#4ADE80] text-[#065F46]";
      default:
        return "bg-[#4ADE80] text-[#065F46]";
    }
  };

  const getStatusCount = (status) => {
    const found = statusCounts.find((item) => item._id === status);
    return found ? found.count : 0;
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FaEnvelope className="text-[#0E7C5A]" />
            <span className="text-[#AC7D40]">Contact Inquiries</span>
            {newCount > 0 && (
              <span className="bg-[#AC7D40] text-white text-sm px-2 py-1 rounded-full">
                {newCount} new
              </span>
            )}
          </h1>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-[#AC7D40]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">New Inquiries</p>
                <p className="text-2xl font-bold text-[#0E7C5A]">
                  {getStatusCount("new")}
                </p>
              </div>
              <FaClock className="text-3xl text-[#0E7C5A]" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-[#AC7D40]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Contacted</p>
                <p className="text-2xl font-bold text-[#0E7C5A]">
                  {getStatusCount("contacted")}
                </p>
              </div>
              <FaPhone className="text-3xl text-[#0E7C5A]" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-[#AC7D40]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Enrolled</p>
                <p className="text-2xl font-bold text-[#0E7C5A]">
                  {getStatusCount("enrolled")}
                </p>
              </div>
              <FaUserGraduate className="text-3xl text-[#0E7C5A]" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-[#AC7D40]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Not Interested</p>
                <p className="text-2xl font-bold text-[#0E7C5A]">
                  {getStatusCount("not-interested")}
                </p>
              </div>
              <FaTimes className="text-3xl text-[#0E7C5A]" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search contacts..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setPagination((prev) => ({ ...prev, currentPage: 1 }));
                  }}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FaFilter className="text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPagination((prev) => ({ ...prev, currentPage: 1 }));
                }}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="enrolled">Enrolled</option>
                <option value="not-interested">Not Interested</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Contacts List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {contacts.length === 0 ? (
          <div className="p-8 text-center">
            <FaEnvelope className="mx-auto text-6xl text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No contacts found
            </h3>
            <p className="text-gray-500">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filter criteria."
                : "Contact inquiries will appear here."}
            </p>
          </div>
        ) : (
          <>
            {/* Table Header */}
            <div className="bg-gray-50 px-6 py-3 border-b">
              <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700">
                <div className="col-span-3">Contact Info</div>
                <div className="col-span-3">Message Preview</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2">Date</div>
                <div className="col-span-2">Actions</div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {contacts.map((contact) => (
                <div
                  key={contact._id}
                  className={`px-6 py-4 hover:bg-gray-50 transition-colors ${
                    !contact.isRead ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="grid grid-cols-12 gap-4 items-center">
                    {/* Contact Info */}
                    <div className="col-span-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                          <FaUser className="text-amber-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {contact.name}
                            {!contact.isRead && (
                              <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full inline-block"></span>
                            )}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {contact.email}
                          </p>
                          <p className="text-sm text-gray-600">
                            {contact.phone}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Message Preview */}
                    <div className="col-span-3">
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {contact.message}
                      </p>
                    </div>

                    {/* Status */}
                    <div className="col-span-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          contact.status
                        )}`}
                      >
                        {contact.status}
                      </span>
                    </div>

                    {/* Date */}
                    <div className="col-span-2">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <FaCalendarAlt className="text-xs" />
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="col-span-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewContact(contact._id)}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => handleDeleteContact(contact._id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setPagination((prev) => ({
                  ...prev,
                  currentPage: prev.currentPage - 1,
                }))
              }
              disabled={!pagination.hasPrev}
              className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>

            <span className="px-4 py-2 text-sm text-gray-600">
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>

            <button
              onClick={() =>
                setPagination((prev) => ({
                  ...prev,
                  currentPage: prev.currentPage + 1,
                }))
              }
              disabled={!pagination.hasNext}
              className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Contact Details Modal */}
      {showModal && selectedContact && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white p-6 rounded-t-xl">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Contact Details</h2>
                  <p className="text-amber-100">
                    Submitted on{" "}
                    {new Date(selectedContact.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-white hover:text-amber-200 transition-colors"
                >
                  <FaTimes size={24} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* Contact Information */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Full Name
                    </label>
                    <p className="text-lg font-semibold text-gray-900">
                      {selectedContact.name}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Father's Name
                    </label>
                    <p className="text-lg font-semibold text-gray-900">
                      {selectedContact.fatherName}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Email Address
                    </label>
                    <div className="flex items-center gap-2">
                      <p className="text-lg font-semibold text-gray-900">
                        {selectedContact.email}
                      </p>
                      <a
                        href={`mailto:${selectedContact.email}`}
                        className="text-blue-600 hover:text-blue-800"
                        title="Send Email"
                      >
                        <FaEnvelope />
                      </a>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Phone Number
                    </label>
                    <div className="flex items-center gap-2">
                      <p className="text-lg font-semibold text-gray-900">
                        {selectedContact.phone}
                      </p>
                      <a
                        href={`https://wa.me/${selectedContact.phone.replace(
                          /\D/g,
                          ""
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-800"
                        title="WhatsApp"
                      >
                        <FaWhatsapp />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-600 mb-2 block">
                  Message
                </label>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-900 whitespace-pre-wrap">
                    {selectedContact.message}
                  </p>
                </div>
              </div>

              {/* Status and Admin Notes */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="text-sm font-medium text-gray-600 mb-2 block">
                    Status
                  </label>
                  <select
                    value={selectedContact.status}
                    onChange={(e) =>
                      handleUpdateStatus(
                        selectedContact._id,
                        e.target.value,
                        selectedContact.adminNotes
                      )
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="enrolled">Enrolled</option>
                    <option value="not-interested">Not Interested</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600 mb-2 block">
                    Admin Notes
                  </label>
                  <textarea
                    value={selectedContact.adminNotes || ""}
                    onChange={(e) =>
                      setSelectedContact((prev) => ({
                        ...prev,
                        adminNotes: e.target.value,
                      }))
                    }
                    onBlur={(e) =>
                      handleUpdateStatus(
                        selectedContact._id,
                        selectedContact.status,
                        e.target.value
                      )
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 h-20 resize-none"
                    placeholder="Add admin notes..."
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => handleDeleteContact(selectedContact._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                >
                  <FaTrash />
                  Delete
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactsPage;
