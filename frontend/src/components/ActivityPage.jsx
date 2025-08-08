import React, { useState } from 'react';
import { 
  Bell, 
  MessageCircle, 
  Users, 
  Calendar,
  AtSign,
  Filter,
  MoreHorizontal,
  Check,
  X,
  Clock,
  Star
} from 'lucide-react';

const ActivityPage = () => {
  const [filter, setFilter] = useState('all');

  const activities = [
    {
      id: 1,
      type: 'mention',
      title: 'Sarah mentioned you in Development Team',
      message: '@john can you review the latest PR for the authentication module?',
      time: '2 minutes ago',
      unread: true,
      channel: '#development',
      user: 'Sarah Johnson'
    },
    {
      id: 2,
      type: 'message',
      title: 'New message in Marketing Team',
      message: 'The Q4 campaign assets are ready for review',
      time: '15 minutes ago',
      unread: true,
      channel: '#campaigns',
      user: 'Mike Chen'
    },
    {
      id: 3,
      type: 'meeting',
      title: 'Meeting reminder',
      message: 'Daily standup starts in 30 minutes',
      time: '30 minutes ago',
      unread: false,
      channel: 'Development Team',
      user: 'Calendar Bot'
    },
    {
      id: 4,
      type: 'team',
      title: 'You were added to Design Team',
      message: 'Welcome to the Design Team! Check out the #general channel to get started.',
      time: '1 hour ago',
      unread: false,
      channel: 'Design Team',
      user: 'Emma Wilson'
    },
    {
      id: 5,
      type: 'mention',
      title: 'Alex mentioned you in Code Reviews',
      message: '@john great work on the new dashboard component!',
      time: '2 hours ago',
      unread: false,
      channel: '#code-reviews',
      user: 'Alex Rodriguez'
    },
    {
      id: 6,
      type: 'message',
      title: 'New message in General',
      message: 'Don\'t forget about the team lunch tomorrow at 12 PM',
      time: '3 hours ago',
      unread: false,
      channel: '#general',
      user: 'Lisa Park'
    }
  ];

  const filters = [
    { id: 'all', label: 'All Activity', icon: Bell },
    { id: 'mentions', label: 'Mentions', icon: AtSign },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
    { id: 'meetings', label: 'Meetings', icon: Calendar },
    { id: 'teams', label: 'Teams', icon: Users }
  ];

  const filteredActivities = activities.filter(activity => {
    if (filter === 'all') return true;
    if (filter === 'mentions') return activity.type === 'mention';
    if (filter === 'messages') return activity.type === 'message';
    if (filter === 'meetings') return activity.type === 'meeting';
    if (filter === 'teams') return activity.type === 'team';
    return true;
  });

  const getActivityIcon = (type) => {
    switch (type) {
      case 'mention':
        return <AtSign className="w-4 h-4 text-blue-600" />;
      case 'message':
        return <MessageCircle className="w-4 h-4 text-green-600" />;
      case 'meeting':
        return <Calendar className="w-4 h-4 text-purple-600" />;
      case 'team':
        return <Users className="w-4 h-4 text-orange-600" />;
      default:
        return <Bell className="w-4 h-4 text-gray-600" />;
    }
  };

  const markAsRead = (id) => {
    // Handle mark as read functionality
    console.log('Mark as read:', id);
  };

  const markAllAsRead = () => {
    // Handle mark all as read functionality
    console.log('Mark all as read');
  };

  return (
    <div className="h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Activity</h1>
          <div className="flex items-center space-x-3">
            <button
              onClick={markAllAsRead}
              className="px-4 py-2 text-sm text-purple-600 hover:bg-purple-50 rounded-lg transition-colors flex items-center space-x-2"
            >
              <Check className="w-4 h-4" />
              <span>Mark all as read</span>
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {filters.map((filterItem) => {
            const Icon = filterItem.icon;
            return (
              <button
                key={filterItem.id}
                onClick={() => setFilter(filterItem.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filter === filterItem.id
                    ? 'bg-white text-purple-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{filterItem.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Activity Feed */}
      <div className="flex-1 overflow-y-auto p-6">
        {filteredActivities.length > 0 ? (
          <div className="space-y-3">
            {filteredActivities.map((activity) => (
              <div
                key={activity.id}
                className={`bg-white rounded-lg border p-4 hover:shadow-md transition-shadow ${
                  activity.unread ? 'border-purple-200 bg-purple-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start space-x-4">
                  {/* Activity Icon */}
                  <div className={`p-2 rounded-lg ${
                    activity.type === 'mention' ? 'bg-blue-100' :
                    activity.type === 'message' ? 'bg-green-100' :
                    activity.type === 'meeting' ? 'bg-purple-100' :
                    activity.type === 'team' ? 'bg-orange-100' : 'bg-gray-100'
                  }`}>
                    {getActivityIcon(activity.type)}
                  </div>

                  {/* Activity Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className={`font-medium ${activity.unread ? 'text-gray-900' : 'text-gray-700'}`}>
                          {activity.title}
                        </h3>
                        <p className="text-gray-600 mt-1">{activity.message}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <span className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{activity.time}</span>
                          </span>
                          <span>{activity.channel}</span>
                          <span>by {activity.user}</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center space-x-2 ml-4">
                        {activity.unread && (
                          <button
                            onClick={() => markAsRead(activity.id)}
                            className="p-1 text-purple-600 hover:bg-purple-100 rounded transition-colors"
                            title="Mark as read"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        )}
                        <button className="p-1 text-gray-400 hover:text-gray-600 rounded transition-colors">
                          <Star className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-gray-600 rounded transition-colors">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No activity found</h3>
              <p className="text-gray-500">
                {filter === 'all' 
                  ? 'You\'re all caught up! New activity will appear here.'
                  : `No ${filter} activity found. Try selecting a different filter.`
                }
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityPage;