import apiClient from "./apiClient";

const getCourseReviews = async (courseId) => {
  const response = await apiClient.get(`/reviews/course/${courseId}`);
  return response.data;
};

const createReview = async (courseId, review) => {
  const response = await apiClient.post(`/reviews/${courseId}`, review);
  return response.data;
};

export default {
  getCourseReviews,
  createReview,
};