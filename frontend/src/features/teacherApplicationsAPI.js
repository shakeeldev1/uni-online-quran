import API from "./api.js";

// Teacher Applications API functions
export const teacherApplicationsAPI = {
  // Submit new teacher application (public endpoint - no auth required)
  submitApplication: async (applicationData) => {
    try {
      console.log("📤 Submitting teacher application...");
      console.log("📋 FormData keys:", applicationData instanceof FormData ? Array.from(applicationData.keys()) : "Not FormData");
      
      const response = await API.post("/teacher-applications", applicationData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("✅ Application submitted successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error submitting application:", error.response?.data || error.message);
      throw error.response?.data || error.message;
    }
  },

  // Get all applications (admin only - requires auth)
  getAllApplications: async () => {
    try {
      const response = await API.get("/teacher-applications");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get single application by ID
  getApplicationById: async (id) => {
    try {
      const response = await API.get(`/teacher-applications/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update application status (approve/reject) - admin only
  updateApplicationStatus: async (id, status, notes = "") => {
    try {
      const response = await API.patch(`/teacher-applications/${id}/status`, {
        status,
        notes,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete application - admin only
  deleteApplication: async (id) => {
    try {
      const response = await API.delete(`/teacher-applications/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
