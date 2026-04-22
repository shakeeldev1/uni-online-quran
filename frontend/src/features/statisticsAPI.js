import api from "./api.js";

export const statisticsAPI = {
  // Get dashboard overview statistics
  getDashboardStats: async () => {
    try {
      const response = await api.get("/statistics/dashboard");
      return response.data;
    } catch (error) {
      console.error("Error fetching dashboard statistics:", error);
      throw new Error(
        error.response?.data?.message || "Failed to fetch dashboard statistics"
      );
    }
  },

  // Get detailed statistics for specific entity
  getEntityStats: async (entity) => {
    try {
      const response = await api.get(`/statistics/entity/${entity}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${entity} statistics:`, error);
      throw new Error(
        error.response?.data?.message || `Failed to fetch ${entity} statistics`
      );
    }
  },

  // Get recent activity across all entities
  getRecentActivity: async (limit = 10) => {
    try {
      const response = await api.get(
        `/statistics/recent-activity?limit=${limit}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching recent activity:", error);
      throw new Error(
        error.response?.data?.message || "Failed to fetch recent activity"
      );
    }
  },

  // Get growth statistics (monthly growth data)
  getGrowthStats: async (months = 6) => {
    try {
      const response = await api.get(`/statistics/growth?months=${months}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching growth statistics:", error);
      throw new Error(
        error.response?.data?.message || "Failed to fetch growth statistics"
      );
    }
  },
};
