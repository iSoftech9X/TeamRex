import React, { useState } from 'react';
import { 
  Radio,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Send,
  Users,
  Clock,
  Eye,
  MessageCircle,
  Heart,
  Share,
  Bell,
  Star,
  Pin,
  Edit,
  Trash2
} from 'lucide-react';

const BroadcastPage = () => {
  const [showCreateBroadcast, setShowCreateBroadcast] = useState(false);
  const [filter, setFilter] = useState('all');

  const broadcasts = [
    {
      id: 1,
      title: 'Q4 2024 Company All-Hands',
      content: 'Join us for our quarterly all-hands meeting where we\'ll discuss our achievements, challenges, and roadmap for the next quarter. All team members are expected to attend.',
      author: 'CEO Office',
      timestamp: '2 hours ago',
      priority: 'high',
      category: 'company',
      views: 245,
      reactions: 23,
      comments: 8,
      isPinned: true,
      audienceSize: 'All Employees (350)'
    },
    {
      id: 2,
      title: 'New Office Safety Guidelines',
      content: 'Please review the updated safety guidelines for our office spaces. These changes are effective immediately and ensure everyone\'s wellbeing.',
      author: 'HR Department',
      timestamp: '5 hours ago',
      priority: 'medium',
      category: 'policy',
      views: 189,
      reactions: 15,
      comments: 3,
      isPinned: false,
      audienceSize: 'All Employees (350)'
    },
    {
      id: 3,
      title: 'Development Team: New Deployment Process',
      content: 'We\'re implementing a new deployment process starting Monday. Please attend the training session tomorrow at 2 PM.',
      author: 'Engineering Manager',
      timestamp: '1 day ago',
      priority: 'medium',
      category: 'technical',
      views: 67,
      reactions: 12,
      comments: 15,
      isPinned: false,
      audienceSize: 'Development Team (25)'
    },
    {
      id: 4,
      title: 'Holiday Schedule Update',
      content: 'Updated holiday schedule for the rest of the year. Please check the company calendar and plan your time off accordingly.',
      author: 'Operations',
      timestamp: '2 days ago',
      priority: 'low',
      category: 'announcement',
      views: 301,
      reactions: 45,
      comments: 12,
      isPinned: false,
      audienceSize: 'All Employees (350)'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Broadcasts', count: broadcasts.length },
    { id: 'company', label: 'Company', count: broadcasts.filter(b => b.category === 'company').length },
    { id: 'policy', label: 'Policies', count: broadcasts.filter(b => b.category === 'policy').length },
    { id: 'technical', label: 'Technical', count: broadcasts.filter(b => b.category === 'technical').length },
    { id: 'announcement', label: 'Announcements', count: broadcasts.filter(b => b.category === 'announcement').length }
  ];

  const filteredBroadcasts = broadcasts.filter(broadcast => {
    if (filter === 'all') return true;
    return broadcast.category === filter;
  });

  const CreateBroadcastModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-h-96 overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">Create Broadcast</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter broadcast title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows="4"
              placeholder="What would you like to broadcast?"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option value="company">Company</option>
              <option value="policy">Policy</option>
              <option value="technical">Technical</option>
              <option value="announcement">Announcement</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Audience</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option value="all">All Employees</option>
              <option value="developers">Development Team</option>
              <option value="marketing">Marketing Team</option>
              <option value="design">Design Team</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="pin" className="rounded" />
            <label htmlFor="pin" className="text-sm text-gray-700">Pin this broadcast</label>
          </div>
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={() => setShowCreateBroadcast(false)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => setShowCreateBroadcast(false)}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>Broadcast</span>
          </button>
        </div>
      </div>
    </div>
  );

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Broadcast</h1>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowCreateBroadcast(true)}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>New Broadcast</span>
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex items-center justify-between">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search broadcasts"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="flex h-full">
        {/* Categories Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                  filter === category.id
                    ? 'bg-purple-50 text-purple-600 border border-purple-200'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>{category.label}</span>
                <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Broadcasts Feed */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredBroadcasts.length > 0 ? (
            <div className="space-y-6">
              {filteredBroadcasts.map((broadcast) => (
                <div
                  key={broadcast.id}
                  className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-3">
                      {broadcast.isPinned && (
                        <Pin className="w-4 h-4 text-purple-600 mt-1" />
                      )}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{broadcast.title}</h3>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-sm text-gray-600">by {broadcast.author}</span>
                          <div className="flex items-center space-x-1 text-sm text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>{broadcast.timestamp}</span>
                          </div>
                          <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(broadcast.priority)}`}>
                            {broadcast.priority.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="p-1 text-gray-400 hover:text-gray-600 rounded transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Content */}
                  <p className="text-gray-700 mb-4">{broadcast.content}</p>

                  {/* Audience */}
                  <div className="flex items-center space-x-2 mb-4 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>Sent to: {broadcast.audienceSize}</span>
                  </div>

                  {/* Stats and Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{broadcast.views} views</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span>{broadcast.reactions} reactions</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{broadcast.comments} comments</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-gray-100 transition-colors">
                        <Heart className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-blue-500 rounded-lg hover:bg-gray-100 transition-colors">
                        <Share className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-yellow-500 rounded-lg hover:bg-gray-100 transition-colors">
                        <Star className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Radio className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No broadcasts found</h3>
                <p className="text-gray-500 mb-4">
                  {filter === 'all' 
                    ? 'No broadcasts have been created yet.'
                    : `No broadcasts found in the ${filter} category.`
                  }
                </p>
                <button
                  onClick={() => setShowCreateBroadcast(true)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2 mx-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create First Broadcast</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {showCreateBroadcast && <CreateBroadcastModal />}
    </div>
  );
};

export default BroadcastPage;