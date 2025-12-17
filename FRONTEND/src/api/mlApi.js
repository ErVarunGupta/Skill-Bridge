import axios from "axios";

export const getTopUsers = async () => {
    const url = "http://localhost:8080/api/ml/top-users";
  const response = await fetch(url);
  return response;
};

export const getRecommendations = async (userIndex) => {
  const url = `http://localhost:8080/api/ml/recommend?userIndex=${userIndex}`;
  const response = await fetch(url);
  return response;
};

