// import { Client } from '@stomp/stompjs';
// import SockJS from 'sockjs-client';

// const BASE_URL = 'http://localhost:8080';

// // API Service Functions
// export const meetingService = {
//   baseUrl: BASE_URL,

//   createMeeting: async (userId) => {
//     const response = await fetch(`${BASE_URL}/api/meetings/create?userId=${userId}`, { method: 'POST' });
//     if (!response.ok) throw new Error(`Failed to create meeting: ${response.status}`);
//     return await response.json();
//   },

//   getMeeting: async (meetingId) => {
//     const response = await fetch(`${BASE_URL}/api/meetings/${meetingId}`);
//     if (!response.ok) throw new Error(`Meeting not found: ${response.status}`);
//     return await response.json();
//   },

//   // WebSocket connection function
//   connectToWebSocket: (userId, meetingId, onMessageCallback, onConnectCallback) => {
//     const socket = new SockJS(`${BASE_URL}/ws`);
//     const client = new Client({
//       webSocketFactory: () => socket,
//       connectHeaders: { userId, meetingId },
//       reconnectDelay: 5000,
//       debug: (str) => console.log(new Date(), str),
//       onConnect: () => {
//         client.subscribe(`/topic/webrtc/meeting/${meetingId}`, onMessageCallback);
//         onConnectCallback(client);
//       },
//     });
    
//     client.activate();
//     return client;
//   },

//   // WebRTC signaling functions
//   sendWebRTCMessage: (stompClient, meetingId, message) => {
//     if (stompClient?.connected) {
//       stompClient.publish({
//         destination: `/app/webrtc/meeting/${meetingId}`,
//         body: JSON.stringify(message),
//       });
//     }
//   },

//   sendIceCandidate: (stompClient, meetingId, candidate, senderId, receiverId) => {
//     meetingService.sendWebRTCMessage(stompClient, meetingId, {
//       type: 'ice_candidate',
//       candidate,
//       senderId,
//       receiverId
//     });
//   },

//   sendOffer: (stompClient, meetingId, offer, senderId, receiverId) => {
//     meetingService.sendWebRTCMessage(stompClient, meetingId, {
//       type: 'offer',
//       offer,
//       senderId,
//       receiverId
//     });
//   },

//   sendAnswer: (stompClient, meetingId, answer, senderId, receiverId) => {
//     meetingService.sendWebRTCMessage(stompClient, meetingId, {
//       type: 'answer',
//       answer,
//       senderId,
//       receiverId
//     });
//   },

//   sendScreenSharingStatus: (stompClient, meetingId, senderId, active) => {
//     meetingService.sendWebRTCMessage(stompClient, meetingId, {
//       type: 'screen_sharing',
//       senderId,
//       active
//     });
//   },

//   sendUserJoined: (stompClient, meetingId, senderId) => {
//     meetingService.sendWebRTCMessage(stompClient, meetingId, {
//       type: 'user_joined',
//       senderId
//     });
//   },

//   sendUserLeft: (stompClient, meetingId, senderId) => {
//     meetingService.sendWebRTCMessage(stompClient, meetingId, {
//       type: 'user_left',
//       senderId
//     });
//   }
// };

// export default meetingService;
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import API_BASE_URL, { WEBSOCKET_URL } from './apiConfig'; // Import the centralized URLs

// API Service Functions
export const meetingService = {
  baseUrl: API_BASE_URL,

  createMeeting: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/api/meetings/create?userId=${userId}`, { method: 'POST' });
    if (!response.ok) throw new Error(`Failed to create meeting: ${response.status}`);
    return await response.json();
  },

  getMeeting: async (meetingId) => {
    const response = await fetch(`${API_BASE_URL}/api/meetings/${meetingId}`);
    if (!response.ok) throw new Error(`Meeting not found: ${response.status}`);
    return await response.json();
  },

  // WebSocket connection function
  connectToWebSocket: (userId, meetingId, onMessageCallback, onConnectCallback) => {
    const socket = new SockJS(WEBSOCKET_URL);
    const client = new Client({
      webSocketFactory: () => socket,
      connectHeaders: { userId, meetingId },
      reconnectDelay: 5000,
      debug: (str) => console.log(new Date(), str),
      onConnect: () => {
        client.subscribe(`/topic/webrtc/meeting/${meetingId}`, onMessageCallback);
        onConnectCallback(client);
      },
    });

    client.activate();
    return client;
  },

  // WebRTC signaling functions
  sendWebRTCMessage: (stompClient, meetingId, message) => {
    if (stompClient?.connected) {
      stompClient.publish({
        destination: `/app/webrtc/meeting/${meetingId}`,
        body: JSON.stringify(message),
      });
    }
  },

  sendIceCandidate: (stompClient, meetingId, candidate, senderId, receiverId) => {
    meetingService.sendWebRTCMessage(stompClient, meetingId, {
      type: 'ice_candidate',
      candidate,
      senderId,
      receiverId
    });
  },

  sendOffer: (stompClient, meetingId, offer, senderId, receiverId) => {
    meetingService.sendWebRTCMessage(stompClient, meetingId, {
      type: 'offer',
      offer,
      senderId,
      receiverId
    });
  },

  sendAnswer: (stompClient, meetingId, answer, senderId, receiverId) => {
    meetingService.sendWebRTCMessage(stompClient, meetingId, {
      type: 'answer',
      answer,
      senderId,
      receiverId
    });
  },

  sendScreenSharingStatus: (stompClient, meetingId, senderId, active) => {
    meetingService.sendWebRTCMessage(stompClient, meetingId, {
      type: 'screen_sharing',
      senderId,
      active
    });
  },

  sendUserJoined: (stompClient, meetingId, senderId) => {
    meetingService.sendWebRTCMessage(stompClient, meetingId, {
      type: 'user_joined',
      senderId
    });
  },

  sendUserLeft: (stompClient, meetingId, senderId) => {
    meetingService.sendWebRTCMessage(stompClient, meetingId, {
      type: 'user_left',
      senderId
    });
  }
};

export default meetingService;