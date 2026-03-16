import apiClient from "./apiClient";

const register = async (name, email, password) => {

  const response = await apiClient.post("/auth/register", {
    name,
    email,
    password
  });

  return response.data;
};

const login = async (email, password) => {
  const response = await apiClient.post("/auth/login", {
    email,
    password,
  });

  return response.data;
};

const getProfile = async () => {
  const response = await apiClient.get("/auth/profile");
  return response.data;
};

const updateProfile = async (id, name, password) => {
  const response = await apiClient.get(`/auth/profile:${id}`,{
    name,
    password
  });
  return response.data;
};



export default {
  register,
  login,
  getProfile,
  updateProfile
};