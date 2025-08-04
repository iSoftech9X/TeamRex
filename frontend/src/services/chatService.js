import axios from 'axios';
const API_BASE_URL = 'http://localhost:8080/api/chat';

export const fetchConversations = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/conversations/${userId}`);
    if (!response.ok) throw new Error('Failed to fetch conversations');
    return await response.json();
  } catch (error) {
    console.error('Error fetching conversations:', error);
    return [];
  }
};

export const fetchMessages = async (userId, participantId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/messages/${userId}/${participantId}`
    );
    if (!response.ok) throw new Error('Failed to fetch messages');
    return await response.json();
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
};


export const sendMessageApi= async (message) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/send`, message, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error('sendMessage error:', err);
    throw err;
  }
};

export const searchUsers = async (query) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/search?q=${query}`);
    if (!response.ok) throw new Error('Failed to search users');
    return await response.json();
  } catch (error) {
    console.error('Error searching users:', error);
    return [];
  }
};