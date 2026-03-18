import apiClient from "./apiClient";

const getNotification = async () => {
  const response = await apiClient.get("/notification");
  return response.data;
};

const createNotification = async (notification) => {
    const response = await apiClient.post("/notification", notification);
    return response.data;
  };

  export default {
    getNotification,
    createNotification
  }