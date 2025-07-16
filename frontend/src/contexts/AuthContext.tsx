import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { userService, ApiUser } from '../services/userService';
import { websocketService, ChatMessage } from '../services/websocketService';

// Define the shape of a user object
interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
}

// Define what the auth context will provide
interface AuthContextType {
  user: User | null;
  login: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  incomingMessageCallback: ((message: ChatMessage) => void) | null;
  setIncomingMessageCallback: React.Dispatch<React.SetStateAction<((message: ChatMessage) => void) | null>>;
}

// Create the actual context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook to use the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Props type for children passed to AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [incomingMessageCallback, setIncomingMessageCallback] = useState<((message: ChatMessage) => void) | null>(null);

  // Try to restore user from localStorage on app load
  useEffect(() => {
    const storedUser = localStorage.getItem('chatUser');
    if (storedUser) {
      try {
        const u: User = JSON.parse(storedUser);
        setUser(u);
        connectWebSocket(u.id);
      } catch (e) {
        console.error('Error restoring user from storage:', e);
        localStorage.removeItem('chatUser');
      }
    }
  }, []);

  // Connect WebSocket and register incoming message handler
  const connectWebSocket = async (userId: string) => {
    try {
      await websocketService.connect(userId);
      websocketService.onMessage((message: ChatMessage) => {
        if (incomingMessageCallback) {
          incomingMessageCallback(message);
        }
      });
    } catch (err) {
      console.error('WebSocket connection failed', err);
    }
  };

  // Login function to create user and persist credentials
  const login = async (username: string, email: string, password: string): Promise<boolean> => {
    try {
      const apiUser: ApiUser = await userService.createUser({
        username,
        email,
        password,
      });

      const newUser: User = {
        id: apiUser.id,
        username: apiUser.username,
        email: apiUser.email,
        avatar: apiUser.avatar || 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      };

      localStorage.setItem('chatUser', JSON.stringify(newUser));
      setUser(newUser);
      await connectWebSocket(newUser.id);

      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    websocketService.disconnect();
    localStorage.removeItem('chatUser');
    setUser(null);
  };

  // Context value
  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    incomingMessageCallback,
    setIncomingMessageCallback,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
