import API from "./api.js";

// Courses API functions
export const coursesAPI = {
  // Get public courses (no authentication required)
  getPublicCourses: async () => {
    try {
      const response = await API.get("/courses/public");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get all courses (requires authentication)
  getAllCourses: async () => {
    try {
      const response = await API.get("/courses");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get course by ID
  getCourseById: async (id) => {
    try {
      const response = await API.get(`/courses/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Create new course
  createCourse: async (courseData) => {
    try {
      // Check if courseData is FormData (for file uploads) or regular object
      const config =
        courseData instanceof FormData
          ? { headers: { "Content-Type": "multipart/form-data" } }
          : {};

      const response = await API.post("/courses", courseData, config);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update course
  updateCourse: async (id, courseData) => {
    try {
      // Check if courseData is FormData (for file uploads) or regular object
      const config =
        courseData instanceof FormData
          ? { headers: { "Content-Type": "multipart/form-data" } }
          : {};

      const response = await API.put(`/courses/${id}`, courseData, config);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete course
  deleteCourse: async (id) => {
    try {
      const response = await API.delete(`/courses/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Toggle course status
  toggleCourseStatus: async (id) => {
    try {
      const response = await API.patch(`/courses/${id}/toggle-status`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update students enrolled count
  updateStudentsEnrolled: async (id, increment = 1) => {
    try {
      const response = await API.patch(`/courses/${id}/students-enrolled`, {
        increment,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
