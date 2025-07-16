const API_BASE_URL = 'http://localhost:8080/api';

export interface ApiUser {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  status?: 'online' | 'offline' | 'away' | 'busy';
}

export interface ApiMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  statusinfo?: 'SENT' | 'DELIVERED' | 'SEEN';
  deleted?: boolean;
}

class ApiService {
  // User endpoints
  async searchUsers(query: string): Promise<ApiUser[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/users/search?query=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error('Failed to search users');
      }
      return await response.json();
    } catch (error) {
      console.error('Error searching users:', error);
      // Return mock data for development
      return [
        {
          id: '1',
          username: 'Allan Deyoung',
          email: 'allan.deyoung@company.com',
          avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
          status: 'online'
        },
        {
          id: '2',
          username: 'Juan Carlos',
          email: 'juan.carlos@company.com',
          avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
          status: 'away'
        },
        {
          id: '3',
          username: 'Suzuka',
          email: 'suzuka@company.com',
          avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
          status: 'busy'
        }
      ].filter(user => 
        user.username.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase())
      );
    }
  }

  // Message endpoints
  async getPrivateMessages(senderId: string, receiverId: string): Promise<ApiMessage[]> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/chat/messages?senderId=${senderId}&receiverId=${receiverId}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }
      const messages = await response.json();
      
      // Also get messages in reverse direction
      const reverseResponse = await fetch(
        `${API_BASE_URL}/chat/messages?senderId=${receiverId}&receiverId=${senderId}`
      );
      if (reverseResponse.ok) {
        const reverseMessages = await reverseResponse.json();
        return [...messages, ...reverseMessages].sort((a, b) => 
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );
      }
      
      return messages;
    } catch (error) {
      console.error('Error fetching messages:', error);
      return [];
    }
  }

  async sendMessage(message: {
    senderId: string;
    receiverId: string;
    content: string;
  }): Promise<ApiMessage> {
    try {
      const response = await fetch(`${API_BASE_URL}/chat/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...message,
          timestamp: new Date().toISOString(),
          statusinfo: 'SENT'
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  async markAsDelivered(messageId: string, userId: string): Promise<void> {
    try {
      await fetch(`${API_BASE_URL}/chat/delivered/${messageId}?userId=${userId}`, {
        method: 'POST',
      });
    } catch (error) {
      console.error('Error marking message as delivered:', error);
    }
  }

  async markAsSeen(messageId: string, userId: string): Promise<void> {
    try {
      await fetch(`${API_BASE_URL}/chat/seen/${messageId}?userId=${userId}`, {
        method: 'POST',
      });
    } catch (error) {
      console.error('Error marking message as seen:', error);
    }
  }
}

export const apiService = new ApiService();