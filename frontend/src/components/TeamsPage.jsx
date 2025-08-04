import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Users, 
  Settings, 
  Hash, 
  Lock,
  Globe,
  ChevronRight,
  UserPlus,
  Star,
  Pin
} from 'lucide-react';

const TeamsPage = () => {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showCreateTeam, setShowCreateTeam] = useState(false);

  const teams = [
    {
      id: 1,
      name: 'Development Team',
      description: 'Core development and engineering discussions',
      memberCount: 12,
      isPrivate: false,
      channels: [
        { id: 1, name: 'General', type: 'public', unread: 3 },
        { id: 2, name: 'Development', type: 'public', unread: 0 },
        { id: 3, name: 'Code Reviews', type: 'private', unread: 1 },
      ]
    },
    {
      id: 2,
      name: 'Marketing Team',
      description: 'Marketing campaigns and brand strategy',
      memberCount: 8,
      isPrivate: false,
      channels: [
        { id: 4, name: 'General', type: 'public', unread: 0 },
        { id: 5, name: 'Campaigns', type: 'public', unread: 2 },
        { id: 6, name: 'Analytics', type: 'private', unread: 0 },
      ]
    },
    {
      id: 3,
      name: 'Design Team',
      description: 'UI/UX design and creative discussions',
      memberCount: 6,
      isPrivate: true,
      channels: [
        { id: 7, name: 'General', type: 'public', unread: 1 },
        { id: 8, name: 'Design Reviews', type: 'public', unread: 0 },
      ]
    }
  ];

  const CreateTeamModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h3 className="text-lg font-semibold mb-4">Create a new team</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Team name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter team name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows="3"
              placeholder="What's this team about?"
            />
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="private" className="rounded" />
            <label htmlFor="private" className="text-sm text-gray-700">Make this team private</label>
          </div>
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={() => setShowCreateTeam(false)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => setShowCreateTeam(false)}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Create Team
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-full">
      {/* Teams List */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Teams</h2>
            <button
              onClick={() => setShowCreateTeam(true)}
              className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search teams"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {teams.map((team) => (
            <div
              key={team.id}
              onClick={() => setSelectedTeam(team)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedTeam?.id === team.id ? 'bg-purple-50 border-purple-200' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-gray-900">{team.name}</h3>
                    {team.isPrivate ? (
                      <Lock className="w-4 h-4 text-gray-400" />
                    ) : (
                      <Globe className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{team.description}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Users className="w-3 h-3 mr-1" />
                    {team.memberCount} members
                  </div>
                </div>
                <button className="p-1 text-gray-400 hover:text-gray-600">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Details */}
      <div className="flex-1 flex flex-col">
        {selectedTeam ? (
          <>
            {/* Team Header */}
            <div className="bg-white border-b border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-2xl font-bold text-gray-900">{selectedTeam.name}</h1>
                    {selectedTeam.isPrivate ? (
                      <Lock className="w-5 h-5 text-gray-400" />
                    ) : (
                      <Globe className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  <p className="text-gray-600">{selectedTeam.description}</p>
                  <div className="flex items-center text-sm text-gray-500 mt-2">
                    <Users className="w-4 h-4 mr-1" />
                    {selectedTeam.memberCount} members
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2">
                    <UserPlus className="w-4 h-4" />
                    <span>Add members</span>
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                    <Settings className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Channels */}
            <div className="flex-1 bg-gray-50 p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Channels</h3>
                <div className="grid gap-3">
                  {selectedTeam.channels.map((channel) => (
                    <div
                      key={channel.id}
                      className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer border border-gray-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            {channel.type === 'private' ? (
                              <Lock className="w-4 h-4 text-gray-600" />
                            ) : (
                              <Hash className="w-4 h-4 text-gray-600" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{channel.name}</h4>
                            <p className="text-sm text-gray-500">
                              {channel.type === 'private' ? 'Private channel' : 'Public channel'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {channel.unread > 0 && (
                            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                              {channel.unread}
                            </span>
                          )}
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4">Quick Actions</h4>
                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Hash className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Create channel</p>
                      <p className="text-sm text-gray-500">Add a new channel to this team</p>
                    </div>
                  </button>
                  <button className="flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <UserPlus className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Invite people</p>
                      <p className="text-sm text-gray-500">Add members to this team</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a team</h3>
              <p className="text-gray-500">Choose a team from the list to view its channels and details</p>
            </div>
          </div>
        )}
      </div>

      {showCreateTeam && <CreateTeamModal />}
    </div>
  );
};

export default TeamsPage;