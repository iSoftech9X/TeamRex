
// // import SockJS from "sockjs-client";
// // import { Client } from "@stomp/stompjs";

// // let stompClient = null;

// // export const connectWebSocket = (
// //   userId,
// //   onMessageReceived,
// //   onConnect,
// //   onDisconnect,
// //   onError
// // ) => {
// //   try {
// //     if (stompClient) {
// //       stompClient.deactivate();
// //     }

// //     stompClient = new Client({
// //       // Connect to backend SockJS endpoint
// //       webSocketFactory: () => new SockJS("http://localhost:8080/ws"),

// //       connectHeaders: {
// //         userId: userId, // optional (can be used in interceptor)
// //       },

// //       debug: (str) => {
// //         console.log("STOMP Debug:", str);
// //       },

// //       reconnectDelay: 5000,

// //       onConnect: (frame) => {
// //         console.log("STOMP connected:", frame);
// //         if (onConnect) onConnect();

// //         // ✅ FIXED: Subscribe to user-specific queue with correct destination format
// //         stompClient.subscribe(`/user/${userId}/queue/messages`, (message) => {
// //           try {
// //             const body = JSON.parse(message.body);
// //             if (onMessageReceived) onMessageReceived(body);
// //           } catch (error) {
// //             console.error("Error parsing STOMP message:", error);
// //           }
// //         });
// //       },

// //       onDisconnect: () => {
// //         console.log("STOMP disconnected");
// //         if (onDisconnect) onDisconnect();
// //       },

// //       onStompError: (frame) => {
// //         console.error("Broker error:", frame.headers["message"]);
// //         if (onError) onError(frame);
// //       },

// //       onWebSocketError: (error) => {
// //         console.error("WebSocket error:", error);
// //         if (onError) onError(error);
// //       },
// //     });

// //     stompClient.activate();
// //     return stompClient;
// //   } catch (error) {
// //     console.error("Error creating STOMP connection:", error);
// //     if (onError) onError(error);
// //     return null;
// //   }
// // };

// // // ✅ Send message via STOMP to /app/chat.send (matches @MessageMapping)
// // export const sendWebSocketMessage = (message) => {
// //   if (stompClient && stompClient.connected) {
// //     try {
// //       stompClient.publish({
// //         destination: "/app/chat.send",
// //         body: JSON.stringify(message),
// //       });
// //       return true;
// //     } catch (error) {
// //       console.error("Error sending STOMP message:", error);
// //       return false;
// //     }
// //   } else {
// //     console.warn("STOMP client not connected. Message not sent:", message);
// //     return false;
// //   }
// // };

// // export const disconnectWebSocket = () => {
// //   if (stompClient) {
// //     stompClient.deactivate();
// //     stompClient = null;
// //   }
// // };

// // export const getWebSocketStatus = () => {
// //   if (!stompClient) return "disconnected";
// //   if (stompClient.connected) return "connected";
// //   return "connecting";
// // };
// import SockJS from "sockjs-client";
// import { Client } from "@stomp/stompjs";

// let stompClient = null;

// export const connectWebSocket = (
//   userId,
//   onMessageReceived,
//   onUpdateReceived,
//   onDeleteReceived,
//   onConnect,
//   onDisconnect,
//   onError
// ) => {
//   try {
//     if (stompClient) {
//       stompClient.deactivate();
//     }

//     stompClient = new Client({
//       webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
//       connectHeaders: {
//         userId: userId,
//       },
//       debug: (str) => {
//         console.log("STOMP Debug:", str);
//       },
//       reconnectDelay: 5000,
//       onConnect: (frame) => {
//         console.log("STOMP connected:", frame);
//         if (onConnect) onConnect();

//         // Subscription for new messages
//         stompClient.subscribe(`/user/${userId}/queue/messages`, (message) => {
//           try {
//             const body = JSON.parse(message.body);
//             if (onMessageReceived) onMessageReceived(body);
//           } catch (error) {
//             console.error("Error parsing new message:", error);
//           }
//         });

//         // Subscription for message edits/updates
//         stompClient.subscribe(`/user/${userId}/queue/message-updates`, (message) => {
//           try {
//             const updatedMessage = JSON.parse(message.body);
//             if (onUpdateReceived) onUpdateReceived(updatedMessage);
//           } catch (error) {
//             console.error("Error parsing message update:", error);
//           }
//         });

//         // Subscription for message deletions
//         stompClient.subscribe(`/user/${userId}/queue/message-deleted`, (message) => {
//           // The body is just the message ID string, no JSON parsing needed
//           const deletedMessageId = message.body;
//           if (onDeleteReceived) onDeleteReceived(deletedMessageId);
//         });

//       },
//       onDisconnect: () => {
//         console.log("STOMP disconnected");
//         if (onDisconnect) onDisconnect();
//       },
//       onStompError: (frame) => {
//         console.error("Broker error:", frame.headers["message"]);
//         if (onError) onError(frame);
//       },
//       onWebSocketError: (error) => {
//         console.error("WebSocket error:", error);
//         if (onError) onError(error);
//       },
//     });

//     stompClient.activate();
//     return stompClient;
//   } catch (error) {
//     console.error("Error creating STOMP connection:", error);
//     if (onError) onError(error);
//     return null;
//   }
// };

// export const sendWebSocketMessage = (message) => {
//   if (stompClient && stompClient.connected) {
//     try {
//       stompClient.publish({
//         destination: "/app/chat.send",
//         body: JSON.stringify(message),
//       });
//       return true;
//     } catch (error) {
//       console.error("Error sending STOMP message:", error);
//       return false;
//     }
//   } else {
//     console.warn("STOMP client not connected. Message not sent:", message);
//     return false;
//   }
// };

// export const disconnectWebSocket = () => {
//   if (stompClient) {
//     stompClient.deactivate();
//     stompClient = null;
//   }
// };

// export const getWebSocketStatus = () => {
//   if (!stompClient) return "disconnected";
//   if (stompClient.connected) return "connected";
//   return "connecting";
// }; 
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { WEBSOCKET_URL } from './apiConfig'; // Import the centralized URL

let stompClient = null;

export const connectWebSocket = (
  userId,
  onMessageReceived,
  onUpdateReceived,
  onDeleteReceived,
  onConnect,
  onDisconnect,
  onError
) => {
  try {
    if (stompClient) {
      stompClient.deactivate();
    }

    stompClient = new Client({
      webSocketFactory: () => new SockJS(WEBSOCKET_URL), // Use the centralized URL
      connectHeaders: {
        userId: userId,
      },
      debug: (str) => {
        console.log("STOMP Debug:", str);
      },
      reconnectDelay: 5000,
      onConnect: (frame) => {
        console.log("STOMP connected:", frame);
        if (onConnect) onConnect();

        // Subscription for new messages
        stompClient.subscribe(`/user/${userId}/queue/messages`, (message) => {
          try {
            const body = JSON.parse(message.body);
            if (onMessageReceived) onMessageReceived(body);
          } catch (error) {
            console.error("Error parsing new message:", error);
          }
        });

        // Subscription for message edits/updates
        stompClient.subscribe(`/user/${userId}/queue/message-updates`, (message) => {
          try {
            const updatedMessage = JSON.parse(message.body);
            if (onUpdateReceived) onUpdateReceived(updatedMessage);
          } catch (error) {
            console.error("Error parsing message update:", error);
          }
        });

        // Subscription for message deletions
        stompClient.subscribe(`/user/${userId}/queue/message-deleted`, (message) => {
          const deletedMessageId = message.body;
          if (onDeleteReceived) onDeleteReceived(deletedMessageId);
        });

      },
      onDisconnect: () => {
        console.log("STOMP disconnected");
        if (onDisconnect) onDisconnect();
      },
      onStompError: (frame) => {
        console.error("Broker error:", frame.headers["message"]);
        if (onError) onError(frame);
      },
      onWebSocketError: (error) => {
        console.error("WebSocket error:", error);
        if (onError) onError(error);
      },
    });

    stompClient.activate();
    return stompClient;
  } catch (error) {
    console.error("Error creating STOMP connection:", error);
    if (onError) onError(error);
    return null;
  }
};

export const sendWebSocketMessage = (message) => {
  if (stompClient && stompClient.connected) {
    try {
      stompClient.publish({
        destination: "/app/chat.send",
        body: JSON.stringify(message),
      });
      return true;
    } catch (error) {
      console.error("Error sending STOMP message:", error);
      return false;
    }
  } else {
    console.warn("STOMP client not connected. Message not sent:", message);
    return false;
  }
};

export const disconnectWebSocket = () => {
  if (stompClient) {
    stompClient.deactivate();
    stompClient = null;
  }
};

export const getWebSocketStatus = () => {
  if (!stompClient) return "disconnected";
  if (stompClient.connected) return "connected";
  return "connecting";
};