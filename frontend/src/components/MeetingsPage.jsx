import React, { useState } from 'react';
import { 
  Calendar,
  Clock,
  Users,
  Video,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  MapPin,
  Link,
  Play,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const MeetingsPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('calendar');
  const [showCreateMeeting, setShowCreateMeeting] = useState(false);

  const meetings = [
    {
      id: 1,
      title: 'Daily Standup',
      time: '09:00 AM - 09:30 AM',
      date: '2024-01-15',
      participants: ['John Doe', 'Sarah Johnson', 'Mike Chen', 'Alex Rodriguez'],
      type: 'recurring',
      location: 'Conference Room A',
      status: 'upcoming',
      isOnline: false
    },
    {
      id: 2,
      title: 'Product Review Meeting',
      time: '02:00 PM - 03:00 PM',
      date: '2024-01-15',
      participants: ['Emma Wilson', 'Lisa Park', 'David Kim'],
      type: 'scheduled',
      location: 'https://meet.company.com/product-review',
      status: 'upcoming',
      isOnline: true
    },
    {
      id: 3,
      title: 'Client Presentation',
      time: '04:00 PM - 05:00 PM',
      date: '2024-01-15',
      participants: ['John Doe', 'Sarah Johnson', 'Client Team'],
      type: 'scheduled',
      location: 'Boardroom',
      status: 'upcoming',
      isOnline: false
    },
    {
      id: 4,
      title: 'Team Retrospective',
      time: '10:00 AM - 11:00 AM',
      date: '2024-01-16',
      participants: ['All Team Members'],
      type: 'recurring',
      location: 'https://meet.company.com/retrospective',
      status: 'upcoming',
      isOnline: true
    }
  ];

  const todaysMeetings = meetings.filter(meeting => meeting.date === '2024-01-15');
  const upcomingMeetings = meetings.filter(meeting => meeting.date > '2024-01-15');

  const CreateMeetingModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-h-96 overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">Schedule a new meeting</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Meeting title</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter meeting title"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <input
                type="time"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="90">1.5 hours</option>
              <option value="120">2 hours</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Conference room or online link"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Participants</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Add participants"
            />
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="recurring" className="rounded" />
            <label htmlFor="recurring" className="text-sm text-gray-700">Make this a recurring meeting</label>
          </div>
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={() => setShowCreateMeeting(false)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => setShowCreateMeeting(false)}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Schedule Meeting
          </button>
        </div>
      </div>
    </div>
  );

  const MeetingCard = ({ meeting }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">{meeting.title}</h3>
          <div className="flex items-center text-sm text-gray-600 space-x-4">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{meeting.time}</span>
            </div>
            <div className="flex items-center space-x-1">
              {meeting.isOnline ? <Video className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
              <span className="truncate max-w-32">{meeting.location}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {meeting.isOnline && (
            <button className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors flex items-center space-x-1">
              <Play className="w-3 h-3" />
              <span>Join</span>
            </button>
          )}
          <button className="p-1 text-gray-400 hover:text-gray-600 rounded transition-colors">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Users className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            {Array.isArray(meeting.participants) ? meeting.participants.length : 1} participants
          </span>
        </div>
        <div className="flex -space-x-2">
          {Array.isArray(meeting.participants) && meeting.participants.slice(0, 3).map((participant, index) => (
            <div
              key={index}
              className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs border-2 border-white"
            >
              {participant.charAt(0)}
            </div>
          ))}
          {Array.isArray(meeting.participants) && meeting.participants.length > 3 && (
            <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center text-white text-xs border-2 border-white">
              +{meeting.participants.length - 3}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Meetings</h1>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowCreateMeeting(true)}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>New Meeting</span>
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'list'
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              List View
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'calendar'
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Calendar View
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search meetings"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {viewMode === 'list' ? (
          <div className="space-y-6">
            {/* Today's Meetings */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Meetings</h2>
              {todaysMeetings.length > 0 ? (
                <div className="space-y-3">
                  {todaysMeetings.map((meeting) => (
                    <MeetingCard key={meeting.id} meeting={meeting} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">No meetings scheduled for today</p>
                </div>
              )}
            </div>

            {/* Upcoming Meetings */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Meetings</h2>
              {upcomingMeetings.length > 0 ? (
                <div className="space-y-3">
                  {upcomingMeetings.map((meeting) => (
                    <MeetingCard key={meeting.id} meeting={meeting} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                  <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">No upcoming meetings scheduled</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Calendar View */
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">January 2024</h2>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-4 mb-6">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center text-sm font-medium text-gray-500 p-2">
                  {day}
                </div>
              ))}
              
              {Array.from({ length: 35 }, (_, i) => {
                const day = i - 6; // Start from previous month
                const isCurrentMonth = day > 0 && day <= 31;
                const hasEvents = isCurrentMonth && [15, 16, 22, 28].includes(day);
                
                return (
                  <div
                    key={i}
                    className={`aspect-square p-2 text-center text-sm rounded-lg cursor-pointer transition-colors ${
                      isCurrentMonth
                        ? hasEvents
                          ? 'bg-purple-100 text-purple-900 hover:bg-purple-200'
                          : 'text-gray-900 hover:bg-gray-100'
                        : 'text-gray-400'
                    }`}
                  >
                    {isCurrentMonth ? day : ''}
                    {hasEvents && (
                      <div className="w-2 h-2 bg-purple-600 rounded-full mx-auto mt-1"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {showCreateMeeting && <CreateMeetingModal />}
    </div>
  );
};

export default MeetingsPage;