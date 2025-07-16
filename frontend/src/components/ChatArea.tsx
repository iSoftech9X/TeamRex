import React, { useState, useRef, useEffect } from 'react';
import { Video, Phone, Hash, Users } from 'lucide-react';
import { Message, ChatTab, User, FileItem, Channel } from '../types';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import FilesTab from './FilesTab';
import OrganizationTab from './OrganizationTab';


interface ChatAreaProps {
  selectedContact: User | null;
  selectedChannel: Channel | null;
  messages: Message[];
  onSendMessage: (content: string) => void;
  files: FileItem[];
  organizationUsers: User[];
}

const ChatArea: React.FC<ChatAreaProps> = ({ 
  selectedContact, 
  selectedChannel,
  messages, 
  onSendMessage,
  files,
  organizationUsers
}) => {
  const [activeTab, setActiveTab] = useState<ChatTab>('chats');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!selectedContact && !selectedChannel) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Phone size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Select a conversation
          </h3>
          <p className="text-gray-500">
            Choose a contact or channel from the sidebar to start chatting
          </p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'chats' as ChatTab, label: 'Chats' },
    { id: 'files' as ChatTab, label: 'Files' },
    { id: 'organization' as ChatTab, label: 'Organization' },
  ];

  const isChannel = !!selectedChannel;
  const displayName = selectedChannel?.name || selectedContact?.name || '';
  const displayAvatar = selectedContact?.avatar;

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {isChannel ? (
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <Hash size={20} className="text-white" />
              </div>
            ) : (
              <img
                src={displayAvatar}
                alt={displayName}
                className="w-10 h-10 rounded-full object-cover"
              />
            )}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                {isChannel && <Hash size={16} className="text-gray-500" />}
                <span>{displayName}</span>
              </h2>
              {isChannel && (
                <p className="text-sm text-gray-500 flex items-center space-x-1">
                  <Users size={14} />
                  <span>{selectedChannel.memberIds.length} members</span>
                </p>
              )}
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button className="p-3 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors">
              <Video size={20} />
            </button>
            <button className="p-3 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg transition-colors">
              <Phone size={20} />
            </button>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex space-x-6 mt-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-2 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 font-medium'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        {activeTab === 'chats' && (
          <>
            <div className="flex-1 overflow-y-auto p-6">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                      {isChannel ? <Hash size={24} className="text-gray-400" /> : <Phone size={24} className="text-gray-400" />}
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Start the conversation
                    </h3>
                    <p className="text-gray-500">
                      {isChannel 
                        ? `Send your first message to #${displayName}`
                        : `Send your first message to ${displayName}`
                      }
                    </p>
                  </div>
                </div>
              ) : (
                messages.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))
              )}
              <div ref={messagesEndRef} />
            </div>
            <MessageInput onSendMessage={onSendMessage} />
          </>
        )}
        
        {activeTab === 'files' && (
          <FilesTab files={files} />
        )}
        
        {activeTab === 'organization' && (
          <OrganizationTab users={organizationUsers} />
        )}
      </div>
    </div>
  );
};

export default ChatArea;