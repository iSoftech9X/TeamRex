import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export interface ChatMessage {
  id?: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  statusinfo?: 'SENT' | 'DELIVERED' | 'SEEN';
}

class WebSocketService {
  private client: Client | null = null;
  private connected = false;
  private messageCallbacks: ((message: ChatMessage) => void)[] = [];
  private currentUserId: string | null = null;

  connect(userId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.connected && this.currentUserId === userId) {
        resolve();
        return;
      }

      // Disconnect existing connection if different user
      if (this.connected && this.currentUserId !== userId) {
        this.disconnect();
      }

      this.currentUserId = userId;

      this.client = new Client({
        webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
        connectHeaders: {
          userId: userId
        },
        debug: (str) => {
          console.log('STOMP Debug:', str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });

      this.client.onConnect = () => {
        console.log('Connected to WebSocket for user:', userId);
        this.connected = true;
        
        // Subscribe to private messages for this user
        this.client?.subscribe(`/queue/private/${userId}`, (message) => {
          try {
            const chatMessage: ChatMessage = JSON.parse(message.body);
            console.log('Received message:', chatMessage);
            this.messageCallbacks.forEach(callback => callback(chatMessage));
          } catch (error) {
            console.error('Error parsing message:', error);
          }
        });

        // Subscribe to general message topic
        this.client?.subscribe('/topic/messages', (message) => {
          try {
            const chatMessage: ChatMessage = JSON.parse(message.body);
            // Only process if this message is for current user
            if (chatMessage.receiverId === userId) {
              console.log('Received broadcast message:', chatMessage);
              this.messageCallbacks.forEach(callback => callback(chatMessage));
            }
          } catch (error) {
            console.error('Error parsing broadcast message:', error);
          }
        });

        resolve();
      };

      this.client.onStompError = (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
        this.connected = false;
        reject(new Error('WebSocket connection failed'));
      };

      this.client.onWebSocketError = (error) => {
        console.error('WebSocket error:', error);
        this.connected = false;
        reject(error);
      };

      this.client.onDisconnect = () => {
        console.log('WebSocket disconnected');
        this.connected = false;
      };

      this.client.activate();
    });
  }

  disconnect() {
    if (this.client) {
      this.client.deactivate();
      this.connected = false;
      this.currentUserId = null;
      console.log('WebSocket disconnected');
    }
  }

  sendMessage(message: ChatMessage) {
    if (this.client && this.connected) {
      console.log('Sending message:', message);
      this.client.publish({
        destination: '/app/chat.send',
        body: JSON.stringify({
          ...message,
          timestamp: new Date().toISOString()
        })
      });
    } else {
      console.error('WebSocket not connected');
    }
  }

  onMessage(callback: (message: ChatMessage) => void) {
    this.messageCallbacks.push(callback);
  }

  removeMessageCallback(callback: (message: ChatMessage) => void) {
    this.messageCallbacks = this.messageCallbacks.filter(cb => cb !== callback);
  }

  isConnected() {
    return this.connected;
  }
}

export const websocketService = new WebSocketService();