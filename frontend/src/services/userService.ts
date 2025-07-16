const API_BASE_URL = 'http://localhost:8080/api';

export interface ApiUser {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  status?: 'online' | 'offline' | 'away' | 'busy';
}

export interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
}

class UserService {
  async createUser(userData: CreateUserRequest): Promise<ApiUser> {
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create user');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating user:', error);
      // Mock user creation for development
      return {
        id: Date.now().toString(),
        username: userData.username,
        email: userData.email,
        avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
        status: 'online'
      };
    }
  }

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

  async getUserById(userId: string): Promise<ApiUser | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to get user');
      }
      return await response.json();
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  }
}

export const userService = new UserService();