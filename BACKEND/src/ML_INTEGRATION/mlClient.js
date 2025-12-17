import axios from "axios";

const ML_BASE_URL = process.env.ML_SERVICE_URL || "http://127.0.0.1:8000";

export const getTopUsersFromML = async (limit = 10) => {
  const { data } = await axios.get(`${ML_BASE_URL}/users/top`, {
    params: { limit }
  });
  return data;
};

export const getRecommendationsFromML = async (userIndex, limit = 10) => {
  const { data } = await axios.get(`${ML_BASE_URL}/recommend/search`, {
    params: { user_index: userIndex, limit }
  });
  return data;
};
