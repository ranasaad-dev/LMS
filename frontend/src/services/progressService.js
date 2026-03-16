import apiClient from "./apiClient";

const updateProgress = async (courseId, progress) => {
  const response = await apiClient.put(`/enroll/${courseId}/progress`, {
    progress,
  });

  return response.data;
};

export default {
  updateProgress,
};