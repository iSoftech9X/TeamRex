import React, { useState } from 'react';
import { Edit3 } from 'lucide-react';
import { ChatContact } from '../types';
import { ApiUser } from '../services/apiService';
import UserSearch from './UserSearch';

interface ChatListProps {
  contacts: ChatContact[];
  selectedContactId: string | null;
  onContactSelect: (contactId: string) => void;
  onNewChat: (user: ApiUser) => void;
}

const ChatList: React.FC<ChatListProps> = ({ 
  contacts, 
  selectedContactId, 
  onContactSelect,
  onNewChat
}) => {
  const [showUserSearch, setShowUserSearch] = useState(false);

  const handleNewChatClick = () => {
    setShowUserSearch(true);
  };

  const handleUserSelect = (user: ApiUser) => {
    onNewChat(user);
    setShowUserSearch(false);
  };

  return (
    <>
      <div className="w-80 bg-white border-r border-gray-200 h-screen flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Chat</h2>
            <div className="flex space-x-4 text-sm text-gray-600">
              <span className="font-medium">Recent</span>
              <span>Contacts</span>
            </div>
          </div>
          
          <button 
            onClick={handleNewChatClick}
            className="w-full flex items-center justify-center space-x-2 bg-yellow-100 hover:bg-yellow-200 text-gray-800 py-3 px-4 rounded-lg transition-colors"
          >
            <Edit3 size={16} />
            <span className="font-medium">New Chat</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {contacts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Edit3 size={24} className="text-gray-400" />
              </div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">No conversations yet</h3>
              <p className="text-xs text-gray-500 text-center">
                Start a new chat to begin messaging
              </p>
            </div>
          ) : (
            contacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => onContactSelect(contact.id)}
                className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                  selectedContactId === contact.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                }`}
              >
                <div className="relative">
                  <img
                    src={contact.avatar}
                    alt={contact.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {contact.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                
                <div className="ml-3 flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-900 truncate">
                      {contact.name}
                    </h3>
                    <span className="text-xs text-gray-500">{contact.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate mt-1">
                    {contact.lastMessage}
                  </p>
                </div>
                
                {contact.unreadCount > 0 && (
                  <div className="ml-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {contact.unreadCount}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {showUserSearch && (
        <UserSearch
          onUserSelect={handleUserSelect}
          onClose={() => setShowUserSearch(false)}
        />
      )}
    </>
  );
};

export default ChatList;