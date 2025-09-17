
// // const api = axios.create({
// //   baseURL: API_BASE_URL,
// // });

// // // Add request interceptor to include token
// // api.interceptors.request.use(
// //   (config) => {
// //     const token = localStorage.getItem('token');
// //     if (token) {
// //       config.headers.Authorization = `Bearer ${token}`;
// //     }
// //     return config;
// //   },
// //   (error) => {
// //     return Promise.reject(error);
// //   }
// // );

// // // ✅ Fetch conversations (all messages between sender and receiver)
// // export const fetchConversations = async (senderId, receiverId) => {
// //   try {
// //     const response = await api.get(`/messages`, {
// //       params: { senderId, receiverId },
// //     });
// //     return response.data;
// //   } catch (error) {
// //     console.error('Error fetching conversations:', error);
// //     throw error;
// //   }
// // };

// // // ✅ Fetch messages (same as conversations since backend only supports query params)
// // export const fetchMessages = async (senderId, receiverId) => {
// //   try {
// //     const response = await api.get(`/messages`, {
// //       params: { senderId, receiverId },
// //     });
// //     return response.data;
// //   } catch (error) {
// //     console.error('Error fetching messages:', error);
// //     throw error;
// //   }
// // };

// // export const sendMessageApi = async (message) => {
// //   try {
// //     const response = await api.post('/send', message);
// //     return response.data;
// //   } catch (error) {
// //     console.error('sendMessage error:', error);
// //     throw error;
// //   }
// // };


// // export const markAsDelivered = async (messageId, userId) => {
// //   try {
// //     const response = await api.post(
// //       `/delivered/${messageId}`, 
// //       null,  // no request body
// //       { params: { userId } } // query param
// //     );
// //     return response.data;
// //   } catch (error) {
// //     console.error("Error marking as delivered:", error);
// //     throw error;
// //   }
// // };
// // export const markAsSeen = async (messageId, userId) => {
// //   try {
// //     const response = await api.post(`/seen/${messageId}`, null, {
// //       params: { userId }
// //     });
// //     return response.data;
// //   } catch (error) {
// //     console.error('Error marking as seen:', error);
// //     throw error;
// //   }
// // };


// // export const deleteMessageApi = async (messageId) => {
// //   try {
// //     const response = await api.delete(`/delete/${messageId}`);
// //     return response.data;
// //   } catch (error) {
// //     console.error('Error deleting message:', error);
// //     throw error;
// //   }
// // };

// // export const editMessageApi = async (messageId, content, senderId) => {
// //   try {
// //     const response = await api.patch(`/edit/${messageId}`, null, {
// //       params: { content, senderId }
// //     });
// //     return response.data;
// //   } catch (error) {
// //     console.error('Error editing message:', error);
// //     throw error;
// //   }
// // };
// // export const searchUsers = async (query) => {
// //   try {
// //     const response = await api.get(`/users/search?q=${encodeURIComponent(query)}`);
// //     return response.data;
// //   } catch (error) {
// //     console.error('Error searching users:', error);
// //     throw error;
// //   }
// // };
// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:8080/api/chat';

// // Create axios instance with default config
// const api = axios.create({
//   baseURL: API_BASE_URL,
// }); 

// // Add request interceptor to include token
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export const fetchConversations = async (senderId, receiverId) => {
//   try {
//     const response = await api.get(`/messages`, {
//       params: { senderId, receiverId },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching conversations:', error);
//     throw error;
//   }
// };

// export const fetchMessages = async (senderId, receiverId) => {
//   try {
//     const response = await api.get(`/messages`, {
//       params: { senderId, receiverId },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching messages:', error);
//     throw error;
//   }
// };

// export const sendMessageApi = async (message) => {
//   try {
//     const response = await api.post('/send', message);
//     return response.data;
//   } catch (error) {
//     console.error('sendMessage error:', error);
//     throw error;
//   }
// };

// export const markAsDelivered = async (messageId, userId) => {
//   try {
//     const response = await api.post(
//       `/delivered/${messageId}`,
//       null,
//       { params: { userId } }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error marking as delivered:", error);
//     throw error;
//   }
// };

// export const markAsSeen = async (messageId, userId) => {
//   try {
//     const response = await api.post(`/seen/${messageId}`, null, {
//       params: { userId }
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error marking as seen:', error);
//     throw error;
//   }
// };

// export const deleteMessageApi = async (messageId, senderId, receiverId) => {
//   try {
//     const response = await api.delete(`/delete/${messageId}`, {
//       data: { senderId, receiverId }
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error deleting message:', error);
//     throw error;
//   }
// };

// export const editMessageApi = async (messageId, newContent, senderId, receiverId) => {
//   try {
//     const response = await api.patch(`/edit/${messageId}`, {
//       newContent,
//       senderId,
//       receiverId
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error editing message:', error);
//     throw error;
//   }
// };
import axios from 'axios';
import { REST_API_URL } from './apiConfig'; // Import the centralized URL

const API_BASE_URL = `${REST_API_URL}/chat`;

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add request interceptor to include token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchConversations = async (senderId, receiverId) => {
  try {
    const response = await api.get(`/messages`, {
      params: { senderId, receiverId },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching conversations:', error);
    throw error;
  }
};

export const fetchMessages = async (senderId, receiverId) => {
  try {
    const response = await api.get(`/messages`, {
      params: { senderId, receiverId },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};

export const sendMessageApi = async (message) => {
  try {
    const response = await api.post('/send', message);
    return response.data;
  } catch (error) {
    console.error('sendMessage error:', error);
    throw error;
  }
};

export const markAsDelivered = async (messageId, userId) => {
  try {
    const response = await api.post(
      `/delivered/${messageId}`,
      null,
      { params: { userId } }
    );
    return response.data;
  } catch (error) {
    console.error("Error marking as delivered:", error);
    throw error;
  }
};

export const markAsSeen = async (messageId, userId) => {
  try {
    const response = await api.post(`/seen/${messageId}`, null, {
      params: { userId }
    });
    return response.data;
  } catch (error) {
    console.error('Error marking as seen:', error);
    throw error;
  }
};

export const deleteMessageApi = async (messageId, senderId, receiverId) => {
  try {
    const response = await api.delete(`/delete/${messageId}`, {
      data: { senderId, receiverId }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting message:', error);
    throw error;
  }
};

export const editMessageApi = async (messageId, newContent, senderId, receiverId) => {
  try {
    const response = await api.patch(`/edit/${messageId}`, {
      newContent,
      senderId,
      receiverId
    });
    return response.data;
  } catch (error) {
    console.error('Error editing message:', error);
    throw error;
  }
};