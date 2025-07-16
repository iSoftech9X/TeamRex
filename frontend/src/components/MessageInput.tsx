import React, { useState } from 'react';
import { 
  Send, 
  Paperclip, 
  Smile, 
  Mic, 
  Camera,
  MapPin,
  Film
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface MessageInputProps {
  onSendMessage: (content: string) => void;
  disabled?: boolean;
}

 const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');
  const { user } = useAuth(); // ✅ Get logged-in user

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled && user) {
      // ✅ Optionally, send content with user info (if needed)
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const actionButtons = [
    { icon: Paperclip, label: 'Attach file' },
    { icon: Camera, label: 'Take photo' },
    { icon: Smile, label: 'Add emoji' },
    { icon: Film, label: 'Add GIF' },
    { icon: Mic, label: 'Voice message' },
    { icon: MapPin, label: 'Share location' },
  ];

  return (
    <div className="border-t border-gray-200 bg-white p-4">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a new message"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            disabled={disabled}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex space-x-3">
            {actionButtons.map((button, index) => {
              const Icon = button.icon;
              return (
                <button
                  key={index}
                  type="button"
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  title={button.label}
                >
                  <Icon size={20} />
                </button>
              );
            })}
          </div>
          
          <button
            type="submit"
            disabled={!message.trim() || disabled}
            className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white px-6 py-2 rounded-lg transition-colors"
          >
            <Send size={16} />
            <span>Send</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;