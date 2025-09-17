// // import axios from 'axios';

// // const API_URL = 'http://localhost:8080/api/auth';

// // export const registerUser = async (data) => {
// //   const response = await axios.post(`${API_URL}/register`, data);
// //   return response.data;
// // };

// // export const loginUser = async (data) => {
// //   const response = await axios.post(`${API_URL}/login`, data);
// //   return response.data;
// // };

// // export const searchUsers = async (query) => {
// //   const response = await axios.get(`${API_URL}/search?q=${query}`);
// //   return response.data;
// // };
// import axios from 'axios';
// import { REST_API_URL } from './apiConfig'; // Import the centralized URL

// const API_URL = `${REST_API_URL}/auth`;

// export const registerUser = async (data) => {
//   const response = await axios.post(`${API_URL}/register`, data);
//   return response.data;
// };

// export const loginUser = async (data) => {
//   const response = await axios.post(`${API_URL}/login`, data);
//   return response.data;
// };

// export const searchUsers = async (query) => {
//   const response = await axios.get(`${API_URL}/search?q=${query}`);
//   return response.data;
// };
import axios from 'axios';
import { REST_API_URL } from './apiConfig'; // Import the centralized URL

const API_URL = `${REST_API_URL}/auth`;

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

/**
 * NEW: Fetches a user's full profile by their ID.
 * @param {string} userId The ID of the user to fetch.
 * @returns {Promise<Object>} The user profile data.
 */
export const getUserProfile = async (userId) => {
  const response = await axios.get(`${API_URL}/${userId}/profile`);
  return response.data;
};