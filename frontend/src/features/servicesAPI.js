import API from "./api.js";

// Services API functions
export const servicesAPI = {
  // Get all services
  getAllServices: async () => {
    try {
      const response = await API.get("/services");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get only active services (Public)
  getActiveServices: async () => {
    try {
      const response = await API.get("/services/active");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get service by ID
  getServiceById: async (id) => {
    try {
      const response = await API.get(`/services/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Create new service
  createService: async (serviceData) => {
    try {
      const response = await API.post("/services", serviceData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update service
  updateService: async (id, serviceData) => {
    try {
      const response = await API.put(`/services/${id}`, serviceData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete service
  deleteService: async (id) => {
    try {
      const response = await API.delete(`/services/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Toggle service status
  toggleServiceStatus: async (id) => {
    try {
      const response = await API.patch(`/services/${id}/toggle-status`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
