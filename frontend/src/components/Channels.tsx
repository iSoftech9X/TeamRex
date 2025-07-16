import React, { useState } from 'react';
import { Plus, Hash, Lock, Search } from 'lucide-react';
import { Team, Channel } from '../types';

interface ChannelsProps {
  teams: Team[];
  onChannelSelect: (channelId: string) => void;
  selectedChannelId: string | null;
}

const Channels: React.FC<ChannelsProps> = ({ 
  teams, 
  onChannelSelect, 
  selectedChannelId 
}) => {
  const [expandedTeams, setExpandedTeams] = useState<Set<string>>(new Set(['1'])); // Default expand first team
  const [searchQuery, setSearchQuery] = useState('');

  const toggleTeam = (teamId: string) => {
    const newExpanded = new Set(expandedTeams);
    if (newExpanded.has(teamId)) {
      newExpanded.delete(teamId);
    } else {
      newExpanded.add(teamId);
    }
    setExpandedTeams(newExpanded);
  };

  // Filter teams and channels based on search
  const filteredTeams = teams.map(team => ({
    ...team,
    channels: team.channels.filter(channel =>
      channel.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(team => 
    team.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    team.channels.length > 0
  );

  // Separate favorites (first 3 teams) from others
  const favoriteTeams = filteredTeams.slice(0, 3);
  const otherTeams = filteredTeams.slice(3);

  const renderTeam = (team: Team, isFavorite: boolean = false) => (
    <div key={team.id} className="mb-2">
      <button
        onClick={() => toggleTeam(team.id)}
        className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors group"
      >
        <div className={`w-8 h-8 rounded flex items-center justify-center text-white text-sm font-bold ${
          team.isPrivate ? 'bg-red-500' : isFavorite ? 'bg-blue-500' : 'bg-green-500'
        }`}>
          {team.name.substring(0, 2).toUpperCase()}
        </div>
        <div className="flex-1 text-left">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-900 truncate">
              {team.name}
            </span>
            {team.isPrivate && <Lock size={12} className="text-gray-400 flex-shrink-0" />}
          </div>
          <span className="text-xs text-gray-500">
            {team.channels.length} channel{team.channels.length !== 1 ? 's' : ''}
          </span>
        </div>
        <div className={`transform transition-transform ${
          expandedTeams.has(team.id) ? 'rotate-90' : ''
        }`}>
          <Hash size={14} className="text-gray-400" />
        </div>
      </button>
      
      {expandedTeams.has(team.id) && (
        <div className="ml-11 mt-1 space-y-1">
          {team.channels.map((channel) => (
            <button
              key={channel.id}
              onClick={() => onChannelSelect(channel.id)}
              className={`w-full flex items-center space-x-2 p-2 text-left hover:bg-gray-50 rounded-lg transition-colors ${
                selectedChannelId === channel.id 
                  ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-500' 
                  : 'text-gray-700'
              }`}
            >
              <Hash size={14} className="flex-shrink-0" />
              <span className="text-sm truncate">{channel.name}</span>
              {channel.isPrivate && <Lock size={10} className="text-gray-400 flex-shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="w-80 bg-white border-r border-gray-200 h-screen flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Teams</h2>
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Plus size={20} />
          </button>
        </div>
        
        {/* Search */}
        <div className="relative mb-4">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search teams and channels"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        {/* Create Team Button */}
        <button className="w-full flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors">
          <Plus size={16} />
          <span className="font-medium">Create Team</span>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Favorites Section */}
        {favoriteTeams.length > 0 && (
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
              <span className="mr-2">⭐</span>
              Favorites
            </h3>
            <div className="space-y-1">
              {favoriteTeams.map(team => renderTeam(team, true))}
            </div>
          </div>
        )}

        {/* More Teams Section */}
        {otherTeams.length > 0 && (
          <div className="p-4 border-t border-gray-100">
            <h3 className="text-sm font-medium text-gray-700 mb-3">More Teams</h3>
            <div className="space-y-1">
              {otherTeams.map(team => renderTeam(team, false))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredTeams.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Hash size={24} className="text-gray-400" />
            </div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">
              {searchQuery ? 'No teams found' : 'No teams yet'}
            </h3>
            <p className="text-xs text-gray-500 text-center">
              {searchQuery 
                ? 'Try adjusting your search terms' 
                : 'Create your first team to get started'
              }
            </p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex space-x-2">
          <button className="flex-1 flex items-center justify-center space-x-2 text-sm text-gray-600 hover:text-gray-800 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors">
            <Plus size={14} />
            <span>Join Team</span>
          </button>
          <button className="flex-1 flex items-center justify-center space-x-2 text-sm text-gray-600 hover:text-gray-800 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors">
            <Hash size={14} />
            <span>Browse</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Channels;