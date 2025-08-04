
let socket;

export const connectWebSocket = (userId, onMessageReceived) => {
  socket = new WebSocket(`ws://localhost:8080/ws/chat/${userId}`);

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    onMessageReceived(message);
  };

  socket.onopen = () => console.log('WebSocket connected');
  socket.onclose = () => console.log('WebSocket disconnected');
};
export const sendWebSocketMessage = (message) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  } else {
    console.warn('WebSocket not connected');
  }
};

export const disconnectWebSocket = () => {
  if (socket) {
    socket.close();
  }
};
