import React, { useState, useEffect } from 'react';
import { Search, X, MessageCircle } from 'lucide-react';
import { userService, ApiUser } from '../services/userService';

interface UserSearchProps {
  onUserSelect: (user: ApiUser) => void;
  onClose: () => void;
}

const UserSearch: React.FC<UserSearchProps> = ({ onUserSelect, onClose }) => {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState<ApiUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const searchUsers = async () => {
      if (query.trim().length < 2) {
        setUsers([]);
        return;
      }

      setIsLoading(true);
      try {
        const results = await userService.searchUsers(query);
        setUsers(results);
      } catch (error) {
        console.error('Error searching users:', error);
        setUsers([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchUsers, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleUserSelect = (user: ApiUser) => {
    onUserSelect(user);
    onClose();
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'busy': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Start New Chat</h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4">
          <div className="relative mb-4">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />
          </div>

          <div className="max-h-64 overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            ) : users.length > 0 ? (
              <div className="space-y-2">
                {users.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => handleUserSelect(user)}
                    className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                  >
                    <div className="relative">
                      <img
                        src={user.avatar || 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150'}
                        alt={user.username}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className={`absolute bottom-0 right-0 w-3 h-3 ${getStatusColor(user.status)} rounded-full border-2 border-white`}></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-900 truncate">
                        {user.username}
                      </h4>
                      <p className="text-xs text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>
                    <MessageCircle size={16} className="text-gray-400" />
                  </button>
                ))}
              </div>
            ) : query.length >= 2 ? (
              <div className="text-center py-8">
                <Search size={32} className="text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">No users found</p>
              </div>
            ) : (
              <div className="text-center py-8">
                <Search size={32} className="text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">Type to search for users</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSearch;