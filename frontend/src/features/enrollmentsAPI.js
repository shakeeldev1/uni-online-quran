import API from "./api.js";

// Enrollments API functions
export const enrollmentsAPI = {
  // Create new enrollment
  createEnrollment: async (enrollmentData) => {
    try {
      const response = await API.post("/enrollments", enrollmentData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get all enrollments (admin only)
  getAllEnrollments: async () => {
    try {
      const response = await API.get("/enrollments");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get enrollment by ID
  getEnrollmentById: async (id) => {
    try {
      const response = await API.get(`/enrollments/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update enrollment status
  updateEnrollmentStatus: async (id, status, adminNotes = "") => {
    try {
      const response = await API.put(`/enrollments/${id}/status`, {
        status,
        adminNotes,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete enrollment
  deleteEnrollment: async (id) => {
    try {
      const response = await API.delete(`/enrollments/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
