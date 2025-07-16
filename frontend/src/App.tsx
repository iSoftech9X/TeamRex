import React, { useState, useCallback, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginForm from './components/LoginForm';
import Sidebar from './components/Sidebar';
import ChatList from './components/ChatList';
import ChatArea from './components/ChatArea';
import Channels from './components/Channels';
import { ActiveTab, Message, User, ChatContact } from './types';
import { ApiUser, apiService } from './services/apiService';
import { websocketService, ChatMessage } from './services/websocketService';
import { 
  mockTeams, 
  mockFiles 
} from './data/mockData';

const ChatApp: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<ActiveTab>('chats');
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [contacts, setContacts] = useState<ChatContact[]>([]);
  const [organizationUsers, setOrganizationUsers] = useState<User[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  const selectedContact = organizationUsers.find(u => u.id === selectedContactId) || null;
  const selectedChannel = mockTeams
    .flatMap(team => team.channels)
    .find(channel => channel.id === selectedChannelId) || null;

  // Initialize WebSocket connection
  useEffect(() => {
    if (user && !isConnected) {
      websocketService.connect(user.id)
        .then(() => {
          setIsConnected(true);
          console.log('WebSocket connected for user:', user.username);
        })
        .catch((error) => {
          console.error('Failed to connect WebSocket:', error);
        });

      // Listen for incoming messages
      const handleIncomingMessage = (message: ChatMessage) => {
        const newMessage: Message = {
          id: message.id || Date.now().toString(),
          content: message.content,
          senderId: message.senderId,
          senderName: organizationUsers.find(u => u.id === message.senderId)?.name || 'Unknown',
          senderAvatar: organizationUsers.find(u => u.id === message.senderId)?.avatar || '',
          timestamp: new Date(message.timestamp),
          type: 'text',
          isOwn: message.senderId === user.id,
        };

        setMessages(prev => [...prev, newMessage]);

        // Update contact list with latest message
        setContacts(prev => {
          const existingContactIndex = prev.findIndex(c => c.id === message.senderId);
          const contactUser = organizationUsers.find(u => u.id === message.senderId);
          
          if (existingContactIndex >= 0) {
            const updated = [...prev];
            updated[existingContactIndex] = {
              ...updated[existingContactIndex],
              lastMessage: message.content,
              timestamp: new Date().toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit',
                hour12: true 
              }),
              unreadCount: message.senderId !== selectedContactId ? updated[existingContactIndex].unreadCount + 1 : 0
            };
            return updated;
          } else if (contactUser) {
            return [{
              id: message.senderId,
              name: contactUser.name,
              avatar: contactUser.avatar,
              lastMessage: message.content,
              timestamp: new Date().toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit',
                hour12: true 
              }),
              unreadCount: message.senderId !== selectedContactId ? 1 : 0,
              isOnline: contactUser.status === 'online'
            }, ...prev];
          }
          return prev;
        });
      };

      websocketService.onMessage(handleIncomingMessage);

      return () => {
        websocketService.removeMessageCallback(handleIncomingMessage);
        websocketService.disconnect();
        setIsConnected(false);
      };
    }
  }, [user, isConnected, organizationUsers, selectedContactId]);

  // Load messages when contact is selected
  useEffect(() => {
    if (selectedContactId && user) {
      loadMessages(user.id, selectedContactId);
    }
  }, [selectedContactId, user]);

  const loadMessages = async (senderId: string, receiverId: string) => {
    try {
      const apiMessages = await apiService.getPrivateMessages(senderId, receiverId);
      const formattedMessages: Message[] = apiMessages.map(msg => ({
        id: msg.id,
        content: msg.content,
        senderId: msg.senderId,
        senderName: organizationUsers.find(u => u.id === msg.senderId)?.name || 'Unknown',
        senderAvatar: organizationUsers.find(u => u.id === msg.senderId)?.avatar || '',
        timestamp: new Date(msg.timestamp),
        type: 'text',
        isOwn: msg.senderId === senderId,
      }));
      setMessages(formattedMessages);
    } catch (error) {
      console.error('Error loading messages:', error);
      setMessages([]);
    }
  };

  const handleSendMessage = useCallback(async (content: string) => {
  if (!user || !selectedContactId) return;

  const timestamp = new Date();

  const messageData = {
    senderId: user.id,
    receiverId: selectedContactId,
    content,
  };

  try {
    await apiService.sendMessage(messageData);

    websocketService.sendMessage({
      ...messageData,
      timestamp,
    });

    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      senderId: user.id,
      senderName: user.username,     // ✅ using username
      senderAvatar: user.avatar || '',
      timestamp,
      type: 'text',
      isOwn: true,
    };

    setMessages(prev => [...prev, newMessage]);

    // ✅ Update contact list with latest message
    setContacts(prev => {
      const existingContactIndex = prev.findIndex(c => c.id === selectedContactId);
      if (existingContactIndex >= 0) {
        const updated = [...prev];
        updated[existingContactIndex] = {
          ...updated[existingContactIndex],
          lastMessage: content,
          timestamp: timestamp.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          })
        };
        return updated;
      }
      return prev;
    });

  } catch (error) {
    console.error('Error sending message:', error);
  }
}, [user, selectedContactId]);


  const handleContactSelect = (contactId: string) => {
    setSelectedContactId(contactId);
    setSelectedChannelId(null);
    
    // Mark messages as read
    setContacts(prev => 
      prev.map(contact => 
        contact.id === contactId 
          ? { ...contact, unreadCount: 0 }
          : contact
      )
    );
  };

  const handleChannelSelect = (channelId: string) => {
    setSelectedChannelId(channelId);
    setSelectedContactId(null);
  };

  const handleNewChat = (apiUser: ApiUser) => {
    // Convert ApiUser to User and add to organization users if not exists
    const newUser: User = {
      id: apiUser.id,
      name: apiUser.username,
      email: apiUser.email,
      avatar: apiUser.avatar || 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      status: apiUser.status || 'offline'
    };

    setOrganizationUsers(prev => {
      const exists = prev.find(u => u.id === newUser.id);
      return exists ? prev : [...prev, newUser];
    });

    // Add to contacts if not exists
    setContacts(prev => {
      const exists = prev.find(c => c.id === apiUser.id);
      if (!exists) {
        const newContact: ChatContact = {
          id: apiUser.id,
          name: apiUser.username,
          avatar: apiUser.avatar || 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
          lastMessage: 'Start a conversation...',
          timestamp: 'now',
          unreadCount: 0,
          isOnline: apiUser.status === 'online'
        };
        return [newContact, ...prev];
      }
      return prev;
    });

    // Select the new contact
    setSelectedContactId(apiUser.id);
    setActiveTab('chats');
  };

  const renderMainContent = () => {
    switch (activeTab) {
      case 'chats':
        return (
          <>
            <ChatList
              contacts={contacts}
              selectedContactId={selectedContactId}
              onContactSelect={handleContactSelect}
              onNewChat={handleNewChat}
            />
            <ChatArea
              selectedContact={selectedContact}
              selectedChannel={null}
              messages={messages.filter(msg => !msg.channelId)}
              onSendMessage={handleSendMessage}
              files={mockFiles}
              organizationUsers={organizationUsers}
            />
          </>
        );
      
      case 'channels':
        return (
          <>
            <Channels
              teams={mockTeams}
              onChannelSelect={handleChannelSelect}
              selectedChannelId={selectedChannelId}
            />
            <ChatArea
              selectedContact={null}
              selectedChannel={selectedChannel}
              messages={messages.filter(msg => msg.channelId === selectedChannelId)}
              onSendMessage={handleSendMessage}
              files={mockFiles}
              organizationUsers={organizationUsers}
            />
          </>
        );
      
      case 'activity':
        return (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="w-24 h-24 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🔔</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Activity Feed
              </h3>
              <p className="text-gray-500">
                Your recent activity will appear here
              </p>
            </div>
          </div>
        );
      
      case 'meetings':
        return (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">📅</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Meetings
              </h3>
              <p className="text-gray-500">
                Your scheduled meetings will appear here
              </p>
            </div>
          </div>
        );
      
      case 'broadcast':
        return (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="w-24 h-24 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">📡</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Broadcast
              </h3>
              <p className="text-gray-500">
                Broadcast messages will appear here
              </p>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      {renderMainContent()}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <ChatApp />
    </AuthProvider>
  );
}

export default App;