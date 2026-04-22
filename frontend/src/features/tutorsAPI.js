import API from "./api.js";

// Tutors API functions
export const tutorsAPI = {
  // Get all tutors
  getAllTutors: async () => {
    try {
      const response = await API.get("/tutors");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get tutor by ID
  getTutorById: async (id) => {
    try {
      const response = await API.get(`/tutors/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Create new tutor
  createTutor: async (tutorData) => {
    try {
      // Check if tutorData is FormData (for file uploads) or regular object
      const config =
        tutorData instanceof FormData
          ? { headers: { "Content-Type": "multipart/form-data" } }
          : {};

      const response = await API.post("/tutors", tutorData, config);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update tutor
  updateTutor: async (id, tutorData) => {
    try {
      const response = await API.put(`/tutors/${id}`, tutorData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete tutor
  deleteTutor: async (id) => {
    try {
      const response = await API.delete(`/tutors/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Toggle tutor status
  toggleTutorStatus: async (id) => {
    try {
      const response = await API.patch(`/tutors/${id}/toggle-status`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Assign/remove students from tutor
  assignStudentToTutor: async (id, increment = 1) => {
    try {
      const response = await API.patch(`/tutors/${id}/assign-student`, {
        increment,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
