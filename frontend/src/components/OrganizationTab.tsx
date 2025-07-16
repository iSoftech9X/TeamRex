import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { User } from '../types';

interface OrganizationTabProps {
  users: User[];
}

const OrganizationTab: React.FC<OrganizationTabProps> = ({ users }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: User['status']) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'busy': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="flex-1 bg-white p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Organization</h3>
        
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by Name or Alias"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className={`absolute bottom-0 right-0 w-3 h-3 ${getStatusColor(user.status)} rounded-full border-2 border-white`}></div>
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-gray-900 truncate">
                  {user.name}
                </h4>
                <p className="text-xs text-gray-500 truncate">
                  {user.email}
                </p>
                <p className="text-xs text-gray-400 capitalize mt-1">
                  {user.status}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <Search size={48} className="text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No users found</p>
        </div>
      )}
    </div>
  );
};

export default OrganizationTab;