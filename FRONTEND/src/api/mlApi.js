import axios from "axios";
const API_URL = import.meta.env.VITE_ML_URL;

export const getTopUsers = async () => {
    const url = `${API_URL}/ml/top-users`;
  const response = await fetch(url);
  return response;
};

export const getRecommendations = async (userIndex) => {
  const url = `${API_URL}/ml/recommend?userIndex=${userIndex}`;
  const response = await fetch(url);
  return response;
};

