import API from "./api.js";

// Plans API functions
export const plansAPI = {
  // Get all available plans
  getAllPlans: async () => {
    try {
      const response = await API.get("/plans");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get user's current active plan
  getUserPlan: async () => {
    try {
      const response = await API.get("/plans/user");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Activate a plan
  activatePlan: async (planName) => {
    try {
      const response = await API.post("/plans/activate", { planName });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Deactivate current plan
  deactivatePlan: async () => {
    try {
      const response = await API.post("/plans/deactivate");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
