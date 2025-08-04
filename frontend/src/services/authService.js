import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

export const registerUser = async (data) => {
  const response = await axios.post(`${API_URL}/register`, data);
  return response.data;
};

export const loginUser = async (data) => {
  const response = await axios.post(`${API_URL}/login`, data);
  return response.data;
};

export const searchUsers = async (query) => {
  const response = await axios.get(`${API_URL}/search?q=${query}`);
  return response.data;
};
