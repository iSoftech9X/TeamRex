// import { Client } from '@stomp/stompjs';
// import SockJS from 'sockjs-client';

// let stompClient = null;

// export const connectStomp = (userId, onMessageReceived) => {
//   stompClient = new Client({
//     webSocketFactory: () => new SockJS('http://localhost:8080/ws'), // Spring Boot endpoint
//     reconnectDelay: 5000, // auto-reconnect
//     onConnect: () => {
//       console.log("✅ Connected to STOMP");

//       // Subscribe to personal queue
//       stompClient.subscribe(`/user/${userId}/queue/messages`, (msg) => {
//         const body = JSON.parse(msg.body);
//         console.log("📩 Received:", body);
//         onMessageReceived(body);
//       });
//     },
//     onStompError: (frame) => {
//       console.error('❌ Broker error: ', frame.headers['message']);
//     },
//   });

//   stompClient.activate();
// };

// export const sendMessage = (message) => {
//   if (stompClient && stompClient.connected) {
//     stompClient.publish({
//       destination: '/app/chat.sendMessage',
//       body: JSON.stringify(message),
//     });
//   } else {
//     console.warn('⚠️ STOMP client not connected');
//   }
// };

// export const disconnectStomp = () => {
//   if (stompClient) {
//     stompClient.deactivate();
//     console.log("🔌 Disconnected from STOMP");
//   }
// };
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { WEBSOCKET_URL } from './apiConfig'; // Import the centralized URL

let stompClient = null;

export const connectStomp = (userId, onMessageReceived) => {
  stompClient = new Client({
    webSocketFactory: () => new SockJS(WEBSOCKET_URL), // Use the centralized URL
    reconnectDelay: 5000, // auto-reconnect
    onConnect: () => {
      console.log("✅ Connected to STOMP");

      // Subscribe to personal queue
      stompClient.subscribe(`/user/${userId}/queue/messages`, (msg) => {
        const body = JSON.parse(msg.body);
        console.log("📩 Received:", body);
        onMessageReceived(body);
      });
    },
    onStompError: (frame) => {
      console.error('❌ Broker error: ', frame.headers['message']);
    },
  });

  stompClient.activate();
};

export const sendMessage = (message) => {
  if (stompClient && stompClient.connected) {
    stompClient.publish({
      destination: '/app/chat.sendMessage',
      body: JSON.stringify(message),
    });
  } else {
    console.warn('⚠️ STOMP client not connected');
  }
};

export const disconnectStomp = () => {
  if (stompClient) {
    stompClient.deactivate();
    console.log("🔌 Disconnected from STOMP");
  }
};