import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  MessageCircle, Search, Send, LogOut, Phone, Video, Paperclip, Loader2
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { searchUsers } from '../services/authService';
import {
  fetchConversations,
  fetchMessages,
  sendMessageApi
} from '../services/chatService';
import {
  connectWebSocket,
  sendWebSocketMessage,
  disconnectWebSocket,
  // getWebSocketStatus
} from '../services/websocketService';

const ChatsPage = () => {
  const { currentUser, logout } = useAuth();
  const messagesEndRef = useRef(null);

  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [loading, setLoading] = useState({
    chats: false,
    messages: false
  });
  const [sending, setSending] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');

  // Auto-scroll to bottom of messages
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Handle incoming WebSocket messages
  const handleIncomingMessage = useCallback((message) => {
    // Update messages if it belongs to the current chat
    if (message.senderId === selectedChat?.id || message.receiverId === selectedChat?.id) {
      setMessages(prev => [...prev, message]);
    }

    // Update last message in chats list
    setChats(prev => prev.map(chat => 
      chat.id === message.senderId || chat.id === message.receiverId
        ? { ...chat, lastMessage: message.content }
        : chat
    ));
  }, [selectedChat]);

  // Initialize WebSocket connection
  useEffect(() => {
    if (!currentUser?.id) return;

    const onConnect = () => {
      setConnectionStatus('connected');
    };

    const onDisconnect = () => {
      setConnectionStatus('disconnected');
    };

    const onError = (error) => {
      console.error('WebSocket error:', error);
      setConnectionStatus('error');
    };

    connectWebSocket(
      currentUser.id,
      handleIncomingMessage,
      onConnect,
      onDisconnect,
      onError
    );

    return () => {
      disconnectWebSocket();
    };
  }, [currentUser, handleIncomingMessage]);

  // Fetch conversations
  useEffect(() => {
    const loadConversations = async () => {
      if (!currentUser?.id) return;
      setLoading(prev => ({ ...prev, chats: true }));
      
      try {
        const conversations = await fetchConversations(currentUser.id);
        setChats(conversations.map(chat => ({
          id: chat.participantId,
          name: chat.participantName,
          avatar: chat.participantName?.charAt(0) || '?',
          lastMessage: chat.lastMessage?.content || '',
          unreadCount: chat.unreadCount || 0
        })));
      } catch (error) {
        console.error('Error loading conversations:', error);
      } finally {
        setLoading(prev => ({ ...prev, chats: false }));
      }
    };

    loadConversations();
  }, [currentUser]);

  // Fetch messages for selected chat
  useEffect(() => {
    const loadMessages = async () => {
      if (!selectedChat || !currentUser) return;
      setLoading(prev => ({ ...prev, messages: true }));
      
      try {
        const msgs = await fetchMessages(currentUser.id, selectedChat.id);
        setMessages(msgs);
      } catch (error) {
        console.error('Error loading messages:', error);
      } finally {
        setLoading(prev => ({ ...prev, messages: false }));
      }
    };

    loadMessages();
  }, [selectedChat, currentUser]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Handle search
  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    try {
      const users = await searchUsers(query);
      const filtered = users.filter(user => user?.id && user.id !== currentUser?.id);
      setSearchResults(filtered);
      setShowSearchResults(true);
    } catch (err) {
      console.error('Error searching users:', err);
      setSearchResults([]);
    }
  };

  // Start new chat
  const startNewChat = (user) => {
    if (!user || !user.id) return;
    const existing = chats.find(chat => chat.id === user.id);

    if (existing) {
      setSelectedChat(existing);
    } else {
      const newChat = {
        id: user.id,
        name: user.name || user.username || 'Unknown User',
        avatar: (user.name || user.username)?.charAt(0) || '?',
        lastMessage: '',
        unreadCount: 0
      };
      setChats(prev => [newChat, ...prev]);
      setSelectedChat(newChat);
    }

    setSearchQuery('');
    setShowSearchResults(false);
  };

  // Send message

const sendMessage = async () => {
  console.log('Sending message:', message);

  console.log("Before checks", { message, selectedChat, currentUser, sending });
if (!message.trim() || !selectedChat || !currentUser?.id || sending) {
  console.warn("Exiting early due to condition failure");
  return;
}

  setSending(true);

  // Prepare the message payload for API
  const msgObj = {
    sender: { id: currentUser.id },
    receiver: { id: selectedChat.id },
    content: message
  };

  // Send message via WebSocket for real-time updates
  sendWebSocketMessage({
    senderId: currentUser.id,
    receiverId: selectedChat.id,
    content: message,
    timestamp: new Date().toISOString()
  });

  // Optimistic UI update
  const tempId = `temp-${Date.now()}`;
  setMessages(prev => [
    ...prev,
    { ...msgObj, id: tempId, timestamp: new Date().toISOString(), status: 'sending' }
  ]);
  setMessage('');

  try {
    // Send message to backend via REST API
    console.log("Calling sendMessageApi now...");
    const savedMessage = await sendMessageApi(msgObj);

    // Replace temp message with actual message
    setMessages(prev =>
      prev.map(msg =>
        msg.id === tempId ? { ...savedMessage, status: 'sent' } : msg
      )
    );
  } catch (error) {
    // On failure, mark message as failed
    setMessages(prev =>
      prev.map(msg =>
        msg.id === tempId ? { ...msg, status: 'failed' } : msg
      )
    );
  }

  setSending(false);
};


  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* User Header */}
        <div className="p-4 bg-purple-600 text-white flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-white text-purple-600 rounded-full w-10 h-10 flex items-center justify-center font-bold">
              {currentUser?.name?.charAt(0) || '?'}
            </div>
            <div>
              <h4>{currentUser?.name || currentUser?.username}</h4>
              <p className="text-xs text-purple-200 flex items-center">
                <span className={`inline-block w-2 h-2 rounded-full mr-1 ${
                  connectionStatus === 'connected' ? 'bg-green-400' : 'bg-red-400'
                }`}></span>
                {connectionStatus === 'connected' ? 'Online' : 'Offline'}
              </p>
            </div>
          </div>
          <button 
            onClick={logout} 
            className="hover:bg-purple-700 p-2 rounded"
            aria-label="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Search users..."
              value={searchQuery}
              onChange={e => handleSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Search Results */}
        {showSearchResults && (
          <div className="overflow-y-auto border-b max-h-96">
            {searchResults.length > 0 ? searchResults.map(user => (
              <div
                key={user.id}
                onClick={() => startNewChat(user)}
                className="p-3 hover:bg-gray-100 cursor-pointer flex items-center space-x-3 transition-colors"
              >
                <div className="bg-purple-500 text-white rounded-full w-10 h-10 flex justify-center items-center font-semibold">
                  {(user.name || user.username)?.charAt(0)}
                </div>
                <span>{user.name || user.username}</span>
              </div>
            )) : (
              <div className="text-center p-4 text-gray-500">No users found</div>
            )}
          </div>
        )}

        {/* Chats List */}
        <div className="flex-1 overflow-y-auto">
          {loading.chats && chats.length === 0 ? (
            <div className="flex justify-center items-center h-full">
              <Loader2 className="animate-spin text-purple-500" />
            </div>
          ) : chats.length === 0 ? (
            <div className="text-center p-4 text-gray-500">No chats yet</div>
          ) : (
            chats.map(chat => (
              <div
                key={chat.id}
                onClick={() => {
                  setSelectedChat(chat);
                  setShowSearchResults(false);
                }}
                className={`p-4 border-b cursor-pointer transition-colors ${
                  selectedChat?.id === chat.id 
                    ? 'bg-purple-50' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-500 text-white rounded-full w-10 h-10 flex justify-center items-center font-semibold">
                    {chat.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium truncate">{chat.name}</h4>
                      {chat.unreadCount > 0 && (
                        <span className="bg-purple-600 text-white text-xs rounded-full px-2 py-1">
                          {chat.unreadCount}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b bg-white flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-500 text-white rounded-full w-10 h-10 flex justify-center items-center font-semibold">
                  {selectedChat.avatar}
                </div>
                <div>
                  <h3 className="font-semibold">{selectedChat.name}</h3>
                  <p className="text-xs text-gray-500">
                    {connectionStatus === 'connected' ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>
              <div className="space-x-2">
                <button 
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Voice call"
                >
                  <Phone size={20} />
                </button>
                <button 
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Video call"
                >
                  <Video size={20} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
              {loading.messages ? (
                <div className="flex justify-center items-center h-full">
                  <Loader2 className="animate-spin text-purple-500" />
                </div>
              ) : messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <MessageCircle className="w-8 h-8 mb-2 text-purple-500" />
                  <p>No messages yet</p>
                  <p className="text-sm">Start the conversation with {selectedChat.name}</p>
                </div>
              ) : (
                messages.map(msg => (
                  <div 
                    key={msg.id} 
                    className={`flex ${msg.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`px-4 py-2 rounded-lg max-w-xs lg:max-w-md ${
                      msg.senderId === currentUser.id 
                        ? msg.status === 'failed'
                          ? 'bg-red-100 text-red-800 border border-red-200'
                          : msg.status === 'sending'
                            ? 'bg-purple-300 text-white'
                            : 'bg-purple-600 text-white'
                        : 'bg-white border border-gray-200'
                    }`}>
                      <p>{msg.content}</p>
                      <p className={`text-xs mt-1 text-right ${
                        msg.senderId === currentUser.id 
                          ? msg.status === 'failed' 
                            ? 'text-red-500' 
                            : msg.status === 'sending'
                              ? 'text-purple-100'
                              : 'text-purple-200'
                          : 'text-gray-400'
                      }`}>
                        {msg.status === 'sending' ? 'Sending...' : 
                         msg.status === 'failed' ? 'Failed to send' : 
                         new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t bg-white flex items-center space-x-2">
              <button 
                className="p-2 text-gray-400 hover:text-gray-600 rounded-full transition-colors"
                aria-label="Attach file"
              >
                <Paperclip size={20} />
              </button>
              <input
                type="text"
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                className="flex-1 border rounded-full px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder={`Message ${selectedChat.name}`}
                disabled={sending}
              />
              <button
                onClick={sendMessage}
                disabled={!message.trim() || sending}
                className={`p-2 rounded-full transition-colors ${
                  !message.trim() || sending
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
                aria-label="Send message"
              >
                {sending ? (
                  <Loader2 className="animate-spin w-5 h-5" />
                ) : (
                  <Send size={20} />
                )}
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-100">
            <div className="text-center text-gray-600">
              <MessageCircle className="w-8 h-8 mx-auto mb-2 text-purple-500" />
              <p>Select a chat to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatsPage;