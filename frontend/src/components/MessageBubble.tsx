import React from 'react';
import { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className={`flex mb-4 ${message.isOwn ? 'justify-end' : 'justify-start'}`}>
      {!message.isOwn && (
        <img
          src={message.senderAvatar}
          alt={message.senderName}
          className="w-10 h-10 rounded-full object-cover mr-3 flex-shrink-0"
        />
      )}
      
      <div className={`max-w-xs lg:max-w-md ${message.isOwn ? 'order-1' : ''}`}>
        <div className={`px-4 py-3 rounded-lg shadow-sm ${
          message.isOwn 
            ? 'bg-blue-500 text-white' 
            : 'bg-white text-gray-900 border border-gray-200'
        }`}>
          {!message.isOwn && (
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-semibold text-gray-900">
                {message.senderName}
              </span>
              <span className="text-xs text-gray-500">
                ({formatDate(message.timestamp)})
              </span>
            </div>
          )}
          
          <p className={`text-sm ${message.isOwn ? 'text-white' : 'text-gray-800'}`}>
            {message.content}
          </p>
          
          <div className={`text-xs mt-1 ${
            message.isOwn ? 'text-blue-100' : 'text-gray-500'
          }`}>
            {formatTime(message.timestamp)}
          </div>
        </div>
      </div>
      
      {message.isOwn && (
        <img
          src={message.senderAvatar}
          alt={message.senderName}
          className="w-10 h-10 rounded-full object-cover ml-3 flex-shrink-0 order-2"
        />
      )}
    </div>
  );
};

export default MessageBubble;