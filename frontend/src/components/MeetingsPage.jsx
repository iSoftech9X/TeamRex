// // // // // // import React, { useState } from 'react';
// // // // // // import { 
// // // // // //   Calendar,
// // // // // //   Clock,
// // // // // //   Users,
// // // // // //   Video,
// // // // // //   Plus,
// // // // // //   Search,
// // // // // //   Filter,
// // // // // //   MoreHorizontal,
// // // // // //   MapPin,
// // // // // //   Link,
// // // // // //   Play,
// // // // // //   Settings,
// // // // // //   ChevronLeft,
// // // // // //   ChevronRight
// // // // // // } from 'lucide-react';

// // // // // // const MeetingsPage = () => {
// // // // // //   const [selectedDate, setSelectedDate] = useState(new Date());
// // // // // //   const [viewMode, setViewMode] = useState('calendar');
// // // // // //   const [showCreateMeeting, setShowCreateMeeting] = useState(false);

// // // // // //   const meetings = [
// // // // // //     {
// // // // // //       id: 1,
// // // // // //       title: 'Daily Standup',
// // // // // //       time: '09:00 AM - 09:30 AM',
// // // // // //       date: '2024-01-15',
// // // // // //       participants: ['John Doe', 'Sarah Johnson', 'Mike Chen', 'Alex Rodriguez'],
// // // // // //       type: 'recurring',
// // // // // //       location: 'Conference Room A',
// // // // // //       status: 'upcoming',
// // // // // //       isOnline: false
// // // // // //     },
// // // // // //     {
// // // // // //       id: 2,
// // // // // //       title: 'Product Review Meeting',
// // // // // //       time: '02:00 PM - 03:00 PM',
// // // // // //       date: '2024-01-15',
// // // // // //       participants: ['Emma Wilson', 'Lisa Park', 'David Kim'],
// // // // // //       type: 'scheduled',
// // // // // //       location: 'https://meet.company.com/product-review',
// // // // // //       status: 'upcoming',
// // // // // //       isOnline: true
// // // // // //     },
// // // // // //     {
// // // // // //       id: 3,
// // // // // //       title: 'Client Presentation',
// // // // // //       time: '04:00 PM - 05:00 PM',
// // // // // //       date: '2024-01-15',
// // // // // //       participants: ['John Doe', 'Sarah Johnson', 'Client Team'],
// // // // // //       type: 'scheduled',
// // // // // //       location: 'Boardroom',
// // // // // //       status: 'upcoming',
// // // // // //       isOnline: false
// // // // // //     },
// // // // // //     {
// // // // // //       id: 4,
// // // // // //       title: 'Team Retrospective',
// // // // // //       time: '10:00 AM - 11:00 AM',
// // // // // //       date: '2024-01-16',
// // // // // //       participants: ['All Team Members'],
// // // // // //       type: 'recurring',
// // // // // //       location: 'https://meet.company.com/retrospective',
// // // // // //       status: 'upcoming',
// // // // // //       isOnline: true
// // // // // //     }
// // // // // //   ];

// // // // // //   const todaysMeetings = meetings.filter(meeting => meeting.date === '2024-01-15');
// // // // // //   const upcomingMeetings = meetings.filter(meeting => meeting.date > '2024-01-15');

// // // // // //   const CreateMeetingModal = () => (
// // // // // //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // // // // //       <div className="bg-white rounded-lg p-6 w-96 max-h-96 overflow-y-auto">
// // // // // //         <h3 className="text-lg font-semibold mb-4">Schedule a new meeting</h3>
// // // // // //         <div className="space-y-4">
// // // // // //           <div>
// // // // // //             <label className="block text-sm font-medium text-gray-700 mb-1">Meeting title</label>
// // // // // //             <input
// // // // // //               type="text"
// // // // // //               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
// // // // // //               placeholder="Enter meeting title"
// // // // // //             />
// // // // // //           </div>
// // // // // //           <div className="grid grid-cols-2 gap-4">
// // // // // //             <div>
// // // // // //               <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
// // // // // //               <input
// // // // // //                 type="date"
// // // // // //                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
// // // // // //               />
// // // // // //             </div>
// // // // // //             <div>
// // // // // //               <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
// // // // // //               <input
// // // // // //                 type="time"
// // // // // //                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
// // // // // //               />
// // // // // //             </div>
// // // // // //           </div>
// // // // // //           <div>
// // // // // //             <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
// // // // // //             <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
// // // // // //               <option value="30">30 minutes</option>
// // // // // //               <option value="60">1 hour</option>
// // // // // //               <option value="90">1.5 hours</option>
// // // // // //               <option value="120">2 hours</option>
// // // // // //             </select>
// // // // // //           </div>
// // // // // //           <div>
// // // // // //             <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
// // // // // //             <input
// // // // // //               type="text"
// // // // // //               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
// // // // // //               placeholder="Conference room or online link"
// // // // // //             />
// // // // // //           </div>
// // // // // //           <div>
// // // // // //             <label className="block text-sm font-medium text-gray-700 mb-1">Participants</label>
// // // // // //             <input
// // // // // //               type="text"
// // // // // //               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
// // // // // //               placeholder="Add participants"
// // // // // //             />
// // // // // //           </div>
// // // // // //           <div className="flex items-center space-x-2">
// // // // // //             <input type="checkbox" id="recurring" className="rounded" />
// // // // // //             <label htmlFor="recurring" className="text-sm text-gray-700">Make this a recurring meeting</label>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //         <div className="flex justify-end space-x-3 mt-6">
// // // // // //           <button
// // // // // //             onClick={() => setShowCreateMeeting(false)}
// // // // // //             className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
// // // // // //           >
// // // // // //             Cancel
// // // // // //           </button>
// // // // // //           <button
// // // // // //             onClick={() => setShowCreateMeeting(false)}
// // // // // //             className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
// // // // // //           >
// // // // // //             Schedule Meeting
// // // // // //           </button>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );

// // // // // //   const MeetingCard = ({ meeting }) => (
// // // // // //     <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
// // // // // //       <div className="flex items-start justify-between mb-3">
// // // // // //         <div className="flex-1">
// // // // // //           <h3 className="font-semibold text-gray-900 mb-1">{meeting.title}</h3>
// // // // // //           <div className="flex items-center text-sm text-gray-600 space-x-4">
// // // // // //             <div className="flex items-center space-x-1">
// // // // // //               <Clock className="w-4 h-4" />
// // // // // //               <span>{meeting.time}</span>
// // // // // //             </div>
// // // // // //             <div className="flex items-center space-x-1">
// // // // // //               {meeting.isOnline ? <Video className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
// // // // // //               <span className="truncate max-w-32">{meeting.location}</span>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //         <div className="flex items-center space-x-2">
// // // // // //           {meeting.isOnline && (
// // // // // //             <button className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors flex items-center space-x-1">
// // // // // //               <Play className="w-3 h-3" />
// // // // // //               <span>Join</span>
// // // // // //             </button>
// // // // // //           )}
// // // // // //           <button className="p-1 text-gray-400 hover:text-gray-600 rounded transition-colors">
// // // // // //             <MoreHorizontal className="w-4 h-4" />
// // // // // //           </button>
// // // // // //         </div>
// // // // // //       </div>
      
// // // // // //       <div className="flex items-center justify-between">
// // // // // //         <div className="flex items-center space-x-2">
// // // // // //           <Users className="w-4 h-4 text-gray-400" />
// // // // // //           <span className="text-sm text-gray-600">
// // // // // //             {Array.isArray(meeting.participants) ? meeting.participants.length : 1} participants
// // // // // //           </span>
// // // // // //         </div>
// // // // // //         <div className="flex -space-x-2">
// // // // // //           {Array.isArray(meeting.participants) && meeting.participants.slice(0, 3).map((participant, index) => (
// // // // // //             <div
// // // // // //               key={index}
// // // // // //               className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs border-2 border-white"
// // // // // //             >
// // // // // //               {participant.charAt(0)}
// // // // // //             </div>
// // // // // //           ))}
// // // // // //           {Array.isArray(meeting.participants) && meeting.participants.length > 3 && (
// // // // // //             <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center text-white text-xs border-2 border-white">
// // // // // //               +{meeting.participants.length - 3}
// // // // // //             </div>
// // // // // //           )}
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );

// // // // // //   return (
// // // // // //     <div className="h-full bg-gray-50">
// // // // // //       {/* Header */}
// // // // // //       <div className="bg-white border-b border-gray-200 p-6">
// // // // // //         <div className="flex items-center justify-between mb-4">
// // // // // //           <h1 className="text-2xl font-bold text-gray-900">Meetings</h1>
// // // // // //           <div className="flex items-center space-x-3">
// // // // // //             <button
// // // // // //               onClick={() => setShowCreateMeeting(true)}
// // // // // //               className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
// // // // // //             >
// // // // // //               <Plus className="w-4 h-4" />
// // // // // //               <span>New Meeting</span>
// // // // // //             </button>
// // // // // //             <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
// // // // // //               <Settings className="w-5 h-5" />
// // // // // //             </button>
// // // // // //           </div>
// // // // // //         </div>

// // // // // //         {/* View Toggle */}
// // // // // //         <div className="flex items-center justify-between">
// // // // // //           <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
// // // // // //             <button
// // // // // //               onClick={() => setViewMode('list')}
// // // // // //               className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
// // // // // //                 viewMode === 'list'
// // // // // //                   ? 'bg-white text-purple-600 shadow-sm'
// // // // // //                   : 'text-gray-600 hover:text-gray-900'
// // // // // //               }`}
// // // // // //             >
// // // // // //               List View
// // // // // //             </button>
// // // // // //             <button
// // // // // //               onClick={() => setViewMode('calendar')}
// // // // // //               className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
// // // // // //                 viewMode === 'calendar'
// // // // // //                   ? 'bg-white text-purple-600 shadow-sm'
// // // // // //                   : 'text-gray-600 hover:text-gray-900'
// // // // // //               }`}
// // // // // //             >
// // // // // //               Calendar View
// // // // // //             </button>
// // // // // //           </div>

// // // // // //           <div className="flex items-center space-x-3">
// // // // // //             <div className="relative">
// // // // // //               <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
// // // // // //               <input
// // // // // //                 type="text"
// // // // // //                 placeholder="Search meetings"
// // // // // //                 className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
// // // // // //               />
// // // // // //             </div>
// // // // // //             <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
// // // // // //               <Filter className="w-5 h-5" />
// // // // // //             </button>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       {/* Content */}
// // // // // //       <div className="flex-1 overflow-y-auto p-6">
// // // // // //         {viewMode === 'list' ? (
// // // // // //           <div className="space-y-6">
// // // // // //             {/* Today's Meetings */}
// // // // // //             <div>
// // // // // //               <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Meetings</h2>
// // // // // //               {todaysMeetings.length > 0 ? (
// // // // // //                 <div className="space-y-3">
// // // // // //                   {todaysMeetings.map((meeting) => (
// // // // // //                     <MeetingCard key={meeting.id} meeting={meeting} />
// // // // // //                   ))}
// // // // // //                 </div>
// // // // // //               ) : (
// // // // // //                 <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
// // // // // //                   <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
// // // // // //                   <p className="text-gray-500">No meetings scheduled for today</p>
// // // // // //                 </div>
// // // // // //               )}
// // // // // //             </div>

// // // // // //             {/* Upcoming Meetings */}
// // // // // //             <div>
// // // // // //               <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Meetings</h2>
// // // // // //               {upcomingMeetings.length > 0 ? (
// // // // // //                 <div className="space-y-3">
// // // // // //                   {upcomingMeetings.map((meeting) => (
// // // // // //                     <MeetingCard key={meeting.id} meeting={meeting} />
// // // // // //                   ))}
// // // // // //                 </div>
// // // // // //               ) : (
// // // // // //                 <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
// // // // // //                   <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
// // // // // //                   <p className="text-gray-500">No upcoming meetings scheduled</p>
// // // // // //                 </div>
// // // // // //               )}
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         ) : (
// // // // // //           /* Calendar View */
// // // // // //           <div className="bg-white rounded-lg border border-gray-200 p-6">
// // // // // //             <div className="flex items-center justify-between mb-6">
// // // // // //               <h2 className="text-lg font-semibold text-gray-900">January 2024</h2>
// // // // // //               <div className="flex items-center space-x-2">
// // // // // //                 <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
// // // // // //                   <ChevronLeft className="w-5 h-5" />
// // // // // //                 </button>
// // // // // //                 <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
// // // // // //                   <ChevronRight className="w-5 h-5" />
// // // // // //                 </button>
// // // // // //               </div>
// // // // // //             </div>
            
// // // // // //             {/* Calendar Grid */}
// // // // // //             <div className="grid grid-cols-7 gap-4 mb-6">
// // // // // //               {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
// // // // // //                 <div key={day} className="text-center text-sm font-medium text-gray-500 p-2">
// // // // // //                   {day}
// // // // // //                 </div>
// // // // // //               ))}
              
// // // // // //               {Array.from({ length: 35 }, (_, i) => {
// // // // // //                 const day = i - 6; // Start from previous month
// // // // // //                 const isCurrentMonth = day > 0 && day <= 31;
// // // // // //                 const hasEvents = isCurrentMonth && [15, 16, 22, 28].includes(day);
                
// // // // // //                 return (
// // // // // //                   <div
// // // // // //                     key={i}
// // // // // //                     className={`aspect-square p-2 text-center text-sm rounded-lg cursor-pointer transition-colors ${
// // // // // //                       isCurrentMonth
// // // // // //                         ? hasEvents
// // // // // //                           ? 'bg-purple-100 text-purple-900 hover:bg-purple-200'
// // // // // //                           : 'text-gray-900 hover:bg-gray-100'
// // // // // //                         : 'text-gray-400'
// // // // // //                     }`}
// // // // // //                   >
// // // // // //                     {isCurrentMonth ? day : ''}
// // // // // //                     {hasEvents && (
// // // // // //                       <div className="w-2 h-2 bg-purple-600 rounded-full mx-auto mt-1"></div>
// // // // // //                     )}
// // // // // //                   </div>
// // // // // //                 );
// // // // // //               })}
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         )}
// // // // // //       </div>

// // // // // //       {showCreateMeeting && <CreateMeetingModal />}
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default MeetingsPage;

// // // // import React, { useState, useEffect, useRef, useCallback } from 'react';
// // // // import {
// // // //   Mic, MicOff, Video, VideoOff, Phone, Copy, Users, MessageSquare,
// // // //   Clock, Share, Settings, Grid, UserPlus, Monitor, Cast,
// // // //   Airplay, MoreHorizontal, Bell, BellOff, ScreenShare, ScreenShareOff
// // // // } from 'lucide-react';
// // // // import { Client } from '@stomp/stompjs';
// // // // import SockJS from 'sockjs-client';

// // // // // --- API Service Module ---
// // // // const messageService = {
// // // //   baseUrl: 'http://localhost:8080',
// // // //   createMeeting: async (userId) => {
// // // //     const response = await fetch(`${messageService.baseUrl}/api/meetings/create?userId=${userId}`, { method: 'POST' });
// // // //     if (!response.ok) throw new Error(`Failed to create meeting: ${response.status}`);
// // // //     return await response.json();
// // // //   },
// // // //   getMeeting: async (meetingId) => {
// // // //     const response = await fetch(`${messageService.baseUrl}/api/meetings/${meetingId}`);
// // // //     if (!response.ok) throw new Error(`Meeting not found: ${response.status}`);
// // // //     return await response.json();
// // // //   }
// // // // };

// // // // // --- Floating Control Bar Component ---
// // // // const FloatingControlBar = ({ isAudioMuted, isVideoOff, isScreenSharing, onToggleAudio, onToggleVideo, onToggleScreenShare, onLeave, onInvite, participantCount }) => {
// // // //   const [isExpanded, setIsExpanded] = useState(true);

// // // //   return (
// // // //     <div className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-800 bg-opacity-90 rounded-full p-2 flex items-center transition-all duration-300 ${isExpanded ? 'w-auto px-4' : 'w-14'}`}>
// // // //       {isExpanded ? (
// // // //         <>
// // // //           <button
// // // //             onClick={onToggleAudio}
// // // //             className={`p-3 rounded-full mx-1 transition-colors ${isAudioMuted ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600'}`}
// // // //             title={isAudioMuted ? 'Unmute' : 'Mute'}
// // // //           >
// // // //             {isAudioMuted ? <MicOff size={20} /> : <Mic size={20} />}
// // // //           </button>

// // // //           <button
// // // //             onClick={onToggleVideo}
// // // //             className={`p-3 rounded-full mx-1 transition-colors ${isVideoOff ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600'}`}
// // // //             title={isVideoOff ? 'Turn on camera' : 'Turn off camera'}
// // // //           >
// // // //             {isVideoOff ? <VideoOff size={20} /> : <Video size={20} />}
// // // //           </button>

// // // //           <button
// // // //             onClick={onToggleScreenShare}
// // // //             className={`p-3 rounded-full mx-1 transition-colors ${isScreenSharing ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
// // // //             title={isScreenSharing ? 'Stop screen share' : 'Share screen'}
// // // //           >
// // // //             {isScreenSharing ? <ScreenShareOff size={20} /> : <ScreenShare size={20} />}
// // // //           </button>

// // // //           <button
// // // //             onClick={onInvite}
// // // //             className="p-3 rounded-full mx-1 bg-gray-700 hover:bg-gray-600 transition-colors"
// // // //             title="Invite people"
// // // //           >
// // // //             <UserPlus size={20} />
// // // //           </button>

// // // //           <div className="mx-2 h-6 w-px bg-gray-600"></div>

// // // //           <div className="text-white text-sm mx-2 flex items-center">
// // // //             <Users size={16} className="mr-1" />
// // // //             <span>{participantCount}</span>
// // // //           </div>

// // // //           <button
// // // //             onClick={onLeave}
// // // //             className="p-3 rounded-full mx-1 bg-red-600 hover:bg-red-700 transition-colors"
// // // //             title="Leave meeting"
// // // //           >
// // // //             <Phone size={20} />
// // // //           </button>
// // // //         </>
// // // //       ) : (
// // // //         <button
// // // //           onClick={() => setIsExpanded(true)}
// // // //           className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
// // // //           title="Show controls"
// // // //         >
// // // //           <MoreHorizontal size={20} />
// // // //         </button>
// // // //       )}

// // // //       <button
// // // //         onClick={() => setIsExpanded(!isExpanded)}
// // // //         className="absolute -top-8 left-1/2 transform -translate-x-1/2 p-1 bg-gray-800 bg-opacity-70 rounded-full"
// // // //       >
// // // //         <div className="w-8 h-1 bg-gray-500 rounded-full"></div>
// // // //       </button>
// // // //     </div>
// // // //   );
// // // // };

// // // // // --- Participant Tile Component ---
// // // // const ParticipantTile = ({ stream, participantId, isLocal, isMuted, isVideoOff, isSpeaking, isScreenSharing }) => {
// // // //   const videoRef = useRef(null);

// // // //   useEffect(() => {
// // // //     if (stream && videoRef.current) {
// // // //       videoRef.current.srcObject = stream;
// // // //     }
// // // //   }, [stream]);

// // // //   return (
// // // //     <div className={`bg-gray-800 rounded-xl overflow-hidden aspect-video relative shadow-lg flex items-center justify-center transition-all duration-300 ${isSpeaking ? 'ring-2 ring-blue-400' : ''}`}>
// // // //       <video
// // // //         ref={videoRef}
// // // //         autoPlay
// // // //         playsInline
// // // //         muted={isLocal}
// // // //         className={`w-full h-full object-cover transition-opacity duration-300 ${isVideoOff ? 'opacity-0' : 'opacity-100'}`}
// // // //       />

// // // //       {isVideoOff && (
// // // //         <div className="absolute w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center text-3xl font-bold">
// // // //           {participantId.charAt(0).toUpperCase()}
// // // //         </div>
// // // //       )}

// // // //       <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent flex items-center justify-between">
// // // //         <span className="text-white text-sm font-medium truncate">
// // // //           {participantId}{isLocal && ' (You)'}
// // // //           {isScreenSharing && <span className="ml-2 text-blue-300"><Monitor size={14} className="inline" /></span>}
// // // //         </span>

// // // //         <div className="flex items-center">
// // // //           {isMuted && (
// // // //             <div className="bg-black/50 p-1 rounded-full ml-2">
// // // //               <MicOff size={14} className="text-white" />
// // // //             </div>
// // // //           )}
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // // --- Main App Component ---
// // // // const VideoMeetingApp = () => {
// // // //   // --- State and Refs ---
// // // //   const [view, setView] = useState('join_form');
// // // //   const [userId, setUserId] = useState('');
// // // //   const [meetingId, setMeetingId] = useState('');
// // // //   const [meetingLink, setMeetingLink] = useState('');
// // // //   const [localStream, setLocalStream] = useState(null);
// // // //   const [screenStream, setScreenStream] = useState(null);
// // // //   const [participants, setParticipants] = useState(new Map());
// // // //   const [isAudioMuted, setIsAudioMuted] = useState(false);
// // // //   const [isVideoOff, setIsVideoOff] = useState(false);
// // // //   const [isScreenSharing, setIsScreenSharing] = useState(false);
// // // //   const [currentTime, setCurrentTime] = useState('');
// // // //   const [activeSpeaker, setActiveSpeaker] = useState(null);
// // // //   const [layout, setLayout] = useState('grid'); // 'grid', 'speaker', 'sidebar'
// // // //   const [showSettings, setShowSettings] = useState(false);
// // // //   const [notificationsEnabled, setNotificationsEnabled] = useState(true);

// // // //   const stompClientRef = useRef(null);
// // // //   const peerConnectionsRef = useRef(new Map());
// // // //   const localStreamRef = useRef(null);
// // // //   const screenStreamRef = useRef(null);
// // // //   const audioContextRef = useRef(null);
// // // //   const analyserRef = useRef(null);
// // // //   const speakingDetectionIntervalRef = useRef(null);

// // // //   // --- WebRTC and Signaling Logic ---
// // // //   const createPeerConnection = useCallback((remoteUserId) => {
// // // //     if (peerConnectionsRef.current.has(remoteUserId)) {
// // // //       peerConnectionsRef.current.get(remoteUserId).close();
// // // //     }

// // // //     const pc = new RTCPeerConnection({
// // // //       iceServers: [
// // // //         { urls: 'stun:stun.l.google.com:19302' },
// // // //         { urls: 'stun:stun1.l.google.com:19302' },
// // // //         { urls: 'stun:stun2.l.google.com:19302' }
// // // //       ]
// // // //     });

// // // //     pc.onicecandidate = (event) => {
// // // //       if (event.candidate && stompClientRef.current?.connected) {
// // // //         stompClientRef.current.publish({
// // // //           destination: `/app/webrtc/meeting/${meetingId}`,
// // // //           body: JSON.stringify({
// // // //             type: 'ice_candidate',
// // // //             candidate: event.candidate,
// // // //             senderId: userId,
// // // //             receiverId: remoteUserId
// // // //           }),
// // // //         });
// // // //       }
// // // //     };

// // // //     pc.ontrack = (event) => {
// // // //       setParticipants(prev => {
// // // //         const newParticipants = new Map(prev);
// // // //         newParticipants.set(remoteUserId, {
// // // //           stream: event.streams[0],
// // // //           isSpeaking: false,
// // // //           isScreenSharing: false
// // // //         });
// // // //         return newParticipants;
// // // //       });
// // // //     };

// // // //     // Add local tracks
// // // //     const streamToSend = isScreenSharing && screenStreamRef.current ?
// // // //       screenStreamRef.current : localStreamRef.current;

// // // //     if (streamToSend) {
// // // //       streamToSend.getTracks().forEach(track => {
// // // //         pc.addTrack(track, streamToSend);
// // // //       });
// // // //     }

// // // //     peerConnectionsRef.current.set(remoteUserId, pc);
// // // //     return pc;
// // // //   }, [userId, meetingId, isScreenSharing]);

// // // //   const handleStompMessage = useCallback((message) => {
// // // //     const signal = JSON.parse(message.body);
// // // //     if (signal.senderId === userId) return;

// // // //     switch (signal.type) {
// // // //       case 'user_joined':
// // // //         const pc = createPeerConnection(signal.senderId);
// // // //         pc.createOffer()
// // // //           .then(offer => pc.setLocalDescription(offer))
// // // //           .then(() => {
// // // //             stompClientRef.current.publish({
// // // //               destination: `/app/webrtc/meeting/${meetingId}`,
// // // //               body: JSON.stringify({
// // // //                 type: 'offer',
// // // //                 offer: pc.localDescription,
// // // //                 senderId: userId,
// // // //                 receiverId: signal.senderId
// // // //               }),
// // // //             });
// // // //           })
// // // //           .catch(e => console.error("Error creating offer:", e));
// // // //         break;

// // // //       case 'user_left':
// // // //         if (peerConnectionsRef.current.has(signal.senderId)) {
// // // //           peerConnectionsRef.current.get(signal.senderId).close();
// // // //           peerConnectionsRef.current.delete(signal.senderId);
// // // //         }
// // // //         setParticipants(prev => {
// // // //           const newParticipants = new Map(prev);
// // // //           newParticipants.delete(signal.senderId);
// // // //           return newParticipants;
// // // //         });
// // // //         break;

// // // //       case 'offer':
// // // //         if (signal.receiverId === userId) {
// // // //           const peerConn = createPeerConnection(signal.senderId);
// // // //           peerConn.setRemoteDescription(new RTCSessionDescription(signal.offer))
// // // //             .then(() => peerConn.createAnswer())
// // // //             .then(answer => peerConn.setLocalDescription(answer))
// // // //             .then(() => {
// // // //               stompClientRef.current.publish({
// // // //                 destination: `/app/webrtc/meeting/${meetingId}`,
// // // //                 body: JSON.stringify({
// // // //                   type: 'answer',
// // // //                   answer: peerConn.localDescription,
// // // //                   senderId: userId,
// // // //                   receiverId: signal.senderId
// // // //                 }),
// // // //               });
// // // //             })
// // // //             .catch(e => console.error("Error handling offer:", e));
// // // //         }
// // // //         break;

// // // //       case 'answer':
// // // //         if (signal.receiverId === userId) {
// // // //           const pc = peerConnectionsRef.current.get(signal.senderId);
// // // //           if (pc) pc.setRemoteDescription(new RTCSessionDescription(signal.answer));
// // // //         }
// // // //         break;

// // // //       case 'ice_candidate':
// // // //         if (signal.receiverId === userId) {
// // // //           const pc = peerConnectionsRef.current.get(signal.senderId);
// // // //           if (pc) pc.addIceCandidate(new RTCIceCandidate(signal.candidate));
// // // //         }
// // // //         break;

// // // //       case 'screen_sharing':
// // // //         setParticipants(prev => {
// // // //           const newParticipants = new Map(prev);
// // // //           const participant = newParticipants.get(signal.senderId);
// // // //           if (participant) {
// // // //             newParticipants.set(signal.senderId, {
// // // //               ...participant,
// // // //               isScreenSharing: signal.active
// // // //             });
// // // //           }
// // // //           return newParticipants;
// // // //         });
// // // //         break;

// // // //       default:
// // // //         break;
// // // //     }
// // // //   }, [userId, meetingId, createPeerConnection]);

// // // //   // --- Media Stream Functions ---
// // // //   const initLocalStream = async () => {
// // // //     try {
// // // //       const stream = await navigator.mediaDevices.getUserMedia({
// // // //         video: { width: 1280, height: 720 },
// // // //         audio: {
// // // //           echoCancellation: true,
// // // //           noiseSuppression: true,
// // // //           autoGainControl: true
// // // //         }
// // // //       });

// // // //       setLocalStream(stream);
// // // //       localStreamRef.current = stream;

// // // //       // Initialize audio context for speaking detection
// // // //       audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
// // // //       analyserRef.current = audioContextRef.current.createAnalyser();
// // // //       const source = audioContextRef.current.createMediaStreamSource(stream);
// // // //       source.connect(analyserRef.current);
// // // //       analyserRef.current.fftSize = 256;

// // // //       return stream;
// // // //     } catch (error) {
// // // //       console.error('Error accessing media devices:', error);
// // // //       alert('Could not access your camera and microphone. Please check permissions.');
// // // //       return null;
// // // //     }
// // // //   };

// // // //   const toggleScreenShare = async () => {
// // // //     try {
// // // //       if (isScreenSharing) {
// // // //         // Stop screen share
// // // //         if (screenStreamRef.current) {
// // // //           screenStreamRef.current.getTracks().forEach(track => track.stop());
// // // //         }
// // // //         setScreenStream(null);
// // // //         screenStreamRef.current = null;
// // // //         setIsScreenSharing(false);

// // // //         // Notify others
// // // //         if (stompClientRef.current?.connected) {
// // // //           stompClientRef.current.publish({
// // // //             destination: `/app/webrtc/meeting/${meetingId}`,
// // // //             body: JSON.stringify({
// // // //               type: 'screen_sharing',
// // // //               senderId: userId,
// // // //               active: false
// // // //             }),
// // // //           });
// // // //         }
// // // //       } else {
// // // //         // Start screen share
// // // //         const screenStream = await navigator.mediaDevices.getDisplayMedia({
// // // //           video: true,
// // // //           audio: true
// // // //         });

// // // //         setScreenStream(screenStream);
// // // //         screenStreamRef.current = screenStream;
// // // //         setIsScreenSharing(true);

// // // //         // Notify others
// // // //         if (stompClientRef.current?.connected) {
// // // //           stompClientRef.current.publish({
// // // //             destination: `/app/webrtc/meeting/${meetingId}`,
// // // //             body: JSON.stringify({
// // // //               type: 'screen_sharing',
// // // //               senderId: userId,
// // // //               active: true
// // // //             }),
// // // //           });
// // // //         }

// // // //         // Handle when user stops screen share using browser UI
// // // //         screenStream.getVideoTracks()[0].onended = () => {
// // // //           toggleScreenShare();
// // // //         };
// // // //       }

// // // //       // Update all peer connections with new stream
// // // //       peerConnectionsRef.current.forEach((pc, remoteUserId) => {
// // // //         // Remove all existing tracks
// // // //         pc.getSenders().forEach(sender => {
// // // //           if (sender.track.kind === 'video' || sender.track.kind === 'audio') {
// // // //             pc.removeTrack(sender);
// // // //           }
// // // //         });

// // // //         // Add new tracks
// // // //         const streamToSend = isScreenSharing ? localStreamRef.current : screenStreamRef.current;
// // // //         if (streamToSend) {
// // // //           streamToSend.getTracks().forEach(track => {
// // // //             pc.addTrack(track, streamToSend);
// // // //           });
// // // //         }

// // // //         // Create and send new offer
// // // //         pc.createOffer()
// // // //           .then(offer => pc.setLocalDescription(offer))
// // // //           .then(() => {
// // // //             stompClientRef.current.publish({
// // // //               destination: `/app/webrtc/meeting/${meetingId}`,
// // // //               body: JSON.stringify({
// // // //                 type: 'offer',
// // // //                 offer: pc.localDescription,
// // // //                 senderId: userId,
// // // //                 receiverId: remoteUserId
// // // //               }),
// // // //             });
// // // //           })
// // // //           .catch(e => console.error("Error renegotiating:", e));
// // // //       });
// // // //     } catch (error) {
// // // //       console.error('Error toggling screen share:', error);
// // // //     }
// // // //   };

// // // //   // --- UI Handlers ---
// // // //   const handleProceedToLobby = async (isCreating) => {
// // // //     if (!userId.trim()) return alert('Please enter your name');
// // // //     if (!isCreating && !meetingId.trim()) return alert('Please enter a meeting code');

// // // //     if (isCreating) {
// // // //       try {
// // // //         const result = await messageService.createMeeting(userId);
// // // //         setMeetingId(result.meetingId);
// // // //         setMeetingLink(`${window.location.origin}/meeting/${result.meetingId}`);
// // // //       } catch (error) {
// // // //         return alert('Failed to create meeting. Please try again.');
// // // //       }
// // // //     } else {
// // // //       try {
// // // //         await messageService.getMeeting(meetingId);
// // // //         // Set meeting link for joining as well
// // // //         setMeetingLink(`${window.location.origin}/meeting/${meetingId}`);
// // // //       } catch (error) {
// // // //         return alert('Failed to join meeting. Please check the meeting ID and try again.');
// // // //       }
// // // //     }

// // // //     if (await initLocalStream()) {
// // // //       setView('lobby');
// // // //     }
// // // //   };

// // // //   const handleJoinFromLobby = () => {
// // // //     if (localStreamRef.current) {
// // // //       localStreamRef.current.getAudioTracks()[0].enabled = !isAudioMuted;
// // // //       localStreamRef.current.getVideoTracks()[0].enabled = !isVideoOff;
// // // //     }

// // // //     const socket = new SockJS(`${messageService.baseUrl}/ws`);
// // // //     const client = new Client({
// // // //       webSocketFactory: () => socket,
// // // //       connectHeaders: { userId, meetingId },
// // // //       reconnectDelay: 5000,
// // // //       debug: (str) => console.log(new Date(), str),
// // // //       onConnect: () => {
// // // //         client.subscribe(`/topic/webrtc/meeting/${meetingId}`, handleStompMessage);
// // // //         stompClientRef.current = client;

// // // //         // Start speaking detection
// // // //         startSpeakingDetection();

// // // //         setView('meeting_room');
// // // //       },
// // // //     });
// // // //     client.activate();
// // // //   };

// // // //   const startSpeakingDetection = () => {
// // // //     if (!analyserRef.current) return;

// // // //     speakingDetectionIntervalRef.current = setInterval(() => {
// // // //       const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
// // // //       analyserRef.current.getByteFrequencyData(dataArray);

// // // //       let sum = 0;
// // // //       for (let i = 0; i < dataArray.length; i++) {
// // // //         sum += dataArray[i];
// // // //       }
// // // //       const average = sum / dataArray.length;

// // // //       // If volume is above threshold, user is speaking
// // // //       if (average > 50) {
// // // //         setActiveSpeaker(userId);
// // // //       }
// // // //     }, 500);
// // // //   };

// // // //   const leaveMeeting = () => {
// // // //     // Clear intervals
// // // //     if (speakingDetectionIntervalRef.current) {
// // // //       clearInterval(speakingDetectionIntervalRef.current);
// // // //     }

// // // //     // Close connections
// // // //     stompClientRef.current?.deactivate();
// // // //     peerConnectionsRef.current.forEach(pc => pc.close());
// // // //     peerConnectionsRef.current.clear();

// // // //     // Stop streams
// // // //     if (localStreamRef.current) {
// // // //       localStreamRef.current.getTracks().forEach(track => track.stop());
// // // //     }
// // // //     if (screenStreamRef.current) {
// // // //       screenStreamRef.current.getTracks().forEach(track => track.stop());
// // // //     }

// // // //     // Reset state
// // // //     localStreamRef.current = null;
// // // //     screenStreamRef.current = null;
// // // //     setLocalStream(null);
// // // //     setScreenStream(null);
// // // //     setParticipants(new Map());
// // // //     setMeetingId('');
// // // //     setMeetingLink('');
// // // //     setView('join_form');
// // // //     setIsScreenSharing(false);
// // // //   };

// // // //   const toggleAudio = () => {
// // // //     if (localStreamRef.current) {
// // // //       const audioTrack = localStreamRef.current.getAudioTracks()[0];
// // // //       audioTrack.enabled = !audioTrack.enabled;
// // // //       setIsAudioMuted(!audioTrack.enabled);
// // // //     }
// // // //   };

// // // //   const toggleVideo = () => {
// // // //     if (localStreamRef.current) {
// // // //       const videoTrack = localStreamRef.current.getVideoTracks()[0];
// // // //       videoTrack.enabled = !videoTrack.enabled;
// // // //       setIsVideoOff(!videoTrack.enabled);
// // // //     }
// // // //   };

// // // //   const copyInviteLink = () => {
// // // //     navigator.clipboard.writeText(meetingLink)
// // // //       .then(() => {
// // // //         if (notificationsEnabled) {
// // // //           // Show custom notification
// // // //           const notification = document.createElement('div');
// // // //           notification.className = 'fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-md shadow-lg z-50';
// // // //           notification.textContent = 'Invite link copied to clipboard!';
// // // //           document.body.appendChild(notification);

// // // //           setTimeout(() => {
// // // //             document.body.removeChild(notification);
// // // //           }, 3000);
// // // //         }
// // // //       });
// // // //   };

// // // //   // --- Effects ---
// // // //   useEffect(() => {
// // // //     const timer = setInterval(() => {
// // // //       setCurrentTime(new Date().toLocaleTimeString('en-US', {
// // // //         hour: '2-digit',
// // // //         minute: '2-digit',
// // // //         hour12: true
// // // //       }));
// // // //     }, 1000);

// // // //     return () => clearInterval(timer);
// // // //   }, []);

// // // //   // --- Render Logic ---
// // // //   if (view === 'join_form') {
// // // //     return (
// // // //       <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-800 text-white flex flex-col items-center justify-center p-4">
// // // //         <div className="w-full max-w-md bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-2xl shadow-2xl p-8 space-y-6 border border-gray-700">
// // // //           <div className="text-center">
// // // //             <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
// // // //               WE-CHAT
// // // //             </h1>
// // // //             <p className="text-gray-300 mt-2">Premium video meetings. Made simple.</p>
// // // //           </div>

// // // //           <div className="space-y-4">
// // // //             <div>
// // // //               <label className="block text-sm font-medium text-gray-300 mb-1">Your Name</label>
// // // //               <input
// // // //                 type="text"
// // // //                 value={userId}
// // // //                 onChange={(e) => setUserId(e.target.value)}
// // // //                 className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
// // // //                 placeholder="Enter your name"
// // // //               />
// // // //             </div>

// // // //             <div>
// // // //               <label className="block text-sm font-medium text-gray-300 mb-1">Meeting Code (to join)</label>
// // // //               <input
// // // //                 type="text"
// // // //                 value={meetingId}
// // // //                 onChange={(e) => setMeetingId(e.target.value.trim())}
// // // //                 className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
// // // //                 placeholder="Enter meeting code"
// // // //               />
// // // //             </div>
// // // //           </div>

// // // //           <div className="flex flex-col sm:flex-row gap-3">
// // // //             <button
// // // //               onClick={() => handleProceedToLobby(false)}
// // // //               disabled={!meetingId.trim() || !userId.trim()}
// // // //               className="flex-1 bg-indigo-600 hover:bg-indigo-700 font-medium py-3 px-4 rounded-lg transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center gap-2"
// // // //             >
// // // //               <Phone size={18} /> Join Meeting
// // // //             </button>

// // // //             <button
// // // //               onClick={() => handleProceedToLobby(true)}
// // // //               disabled={!userId.trim()}
// // // //               className="flex-1 border border-indigo-500 text-indigo-300 hover:bg-indigo-500 hover:text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center gap-2"
// // // //             >
// // // //               <UserPlus size={18} /> New Meeting
// // // //             </button>
// // // //           </div>

// // // //           <div className="text-center text-sm text-gray-400 mt-4">
// // // //             By joining, you agree to our Terms of Service and Privacy Policy.
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   if (view === 'lobby') {
// // // //     return (
// // // //       <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
// // // //         <div className="w-full max-w-4xl bg-gray-800 rounded-2xl overflow-hidden shadow-xl">
// // // //           <div className="p-6 border-b border-gray-700">
// // // //             <h1 className="text-2xl font-bold">Ready to join?</h1>
// // // //             <p className="text-gray-400">Preview your video and audio before joining</p>
// // // //           </div>

// // // //           <div className="p-6 flex flex-col md:flex-row gap-6">
// // // //             <div className="flex-1 bg-black rounded-xl overflow-hidden relative aspect-video">
// // // //               <video
// // // //                 ref={el => el && (el.srcObject = localStream)}
// // // //                 autoPlay
// // // //                 muted
// // // //                 playsInline
// // // //                 className={`w-full h-full object-cover ${isVideoOff ? 'hidden' : 'block'}`}
// // // //               />

// // // //               {isVideoOff && (
// // // //                 <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
// // // //                   <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center text-3xl font-bold">
// // // //                     {userId.charAt(0).toUpperCase()}
// // // //                   </div>
// // // //                 </div>
// // // //               )}

// // // //               <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
// // // //                 <button
// // // //                   onClick={() => setIsAudioMuted(!isAudioMuted)}
// // // //                   className={`p-3 rounded-full transition-colors ${isAudioMuted ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600'}`}
// // // //                 >
// // // //                   {isAudioMuted ? <MicOff size={20} /> : <Mic size={20} />}
// // // //                 </button>

// // // //                 <button
// // // //                   onClick={() => setIsVideoOff(!isVideoOff)}
// // // //                   className={`p-3 rounded-full transition-colors ${isVideoOff ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600'}`}
// // // //                 >
// // // //                   {isVideoOff ? <VideoOff size={20} /> : <Video size={20} />}
// // // //                 </button>
// // // //               </div>
// // // //             </div>

// // // //             <div className="md:w-64 space-y-4 flex flex-col">
// // // //               <div className="flex-1 space-y-4">
// // // //                 {meetingLink && (
// // // //                   <div className="bg-gray-700 p-3 rounded-lg">
// // // //                     <h3 className="font-medium mb-2 text-sm">Share this invite</h3>
// // // //                     <div className="flex items-center bg-gray-900 rounded-md p-2">
// // // //                       <input
// // // //                         type="text"
// // // //                         readOnly
// // // //                         value={meetingLink}
// // // //                         className="flex-1 bg-transparent text-xs text-gray-300 outline-none truncate"
// // // //                       />
// // // //                       <button onClick={copyInviteLink} className="p-1 rounded-md hover:bg-gray-600 transition-colors" title="Copy link">
// // // //                         <Copy size={16} />
// // // //                       </button>
// // // //                     </div>
// // // //                   </div>
// // // //                 )}
// // // //               </div>

// // // //               <div className="space-y-2">
// // // //                 <button
// // // //                   onClick={handleJoinFromLobby}
// // // //                   className="w-full bg-indigo-600 hover:bg-indigo-700 font-medium py-3 px-4 rounded-lg text-lg transition-colors flex items-center justify-center gap-2"
// // // //                 >
// // // //                   <Phone size={20} /> Join now
// // // //                 </button>

// // // //                 <button
// // // //                   onClick={() => setView('join_form')}
// // // //                   className="w-full border border-gray-600 text-gray-300 hover:bg-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
// // // //                 >
// // // //                   Cancel
// // // //                 </button>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   // --- Meeting Room View ---
// // // //   return (
// // // //     <div className="min-h-screen bg-gray-900 text-white flex flex-col">
// // // //       {/* Header Bar */}
// // // //       <header className="px-6 py-3 flex justify-between items-center border-b border-gray-800">
// // // //         <div className="flex items-center gap-4">
// // // //           <div className="text-xl font-bold text-indigo-400">WE-CHAT</div>
// // // //           <div className="text-sm font-medium">{currentTime}</div>
// // // //           <div className="text-sm bg-gray-700 px-2 py-1 rounded-md">{meetingId}</div>
// // // //         </div>

// // // //         <div className="flex items-center gap-3">
// // // //           <button
// // // //             onClick={() => setShowSettings(!showSettings)}
// // // //             className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
// // // //             title="Settings"
// // // //           >
// // // //             <Settings size={20} />
// // // //           </button>

// // // //           {showSettings && (
// // // //             <div className="absolute top-16 right-6 bg-gray-800 rounded-lg shadow-lg p-4 z-10 w-64">
// // // //               <h3 className="font-medium mb-3">Settings</h3>

// // // //               <div className="flex items-center justify-between mb-3">
// // // //                 <span className="text-sm">Notifications</span>
// // // //                 <button
// // // //                   onClick={() => setNotificationsEnabled(!notificationsEnabled)}
// // // //                   className={`relative w-10 h-6 rounded-full transition-colors ${notificationsEnabled ? 'bg-indigo-600' : 'bg-gray-600'}`}
// // // //                 >
// // // //                   <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${notificationsEnabled ? 'left-5' : 'left-1'}`}></span>
// // // //                 </button>
// // // //               </div>

// // // //               <div className="text-xs text-gray-400 mt-4">
// // // //                 Video quality is automatically adjusted based on your network connection.
// // // //               </div>
// // // //             </div>
// // // //           )}
// // // //         </div>
// // // //       </header>

// // // //       {/* Main Content - Video Grid */}
// // // //       <main className="flex-1 p-4 overflow-auto">
// // // //         <div className={`grid gap-4 ${layout === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
// // // //           {/* Local Video */}
// // // //           <ParticipantTile
// // // //             stream={isScreenSharing ? screenStream : localStream}
// // // //             participantId={userId}
// // // //             isLocal
// // // //             isMuted={isAudioMuted}
// // // //             isVideoOff={isVideoOff && !isScreenSharing}
// // // //             isSpeaking={activeSpeaker === userId}
// // // //             isScreenSharing={isScreenSharing}
// // // //           />

// // // //           {/* Remote Participants */}
// // // //           {Array.from(participants.entries()).map(([id, data]) => (
// // // //             <ParticipantTile
// // // //               key={id}
// // // //               stream={data.stream}
// // // //               participantId={id}
// // // //               isMuted={false}
// // // //               isVideoOff={false}
// // // //               isSpeaking={activeSpeaker === id}
// // // //               isScreenSharing={data.isScreenSharing}
// // // //             />
// // // //           ))}
// // // //         </div>
// // // //       </main>

// // // //       {/* Floating Control Bar */}
// // // //       <FloatingControlBar
// // // //         isAudioMuted={isAudioMuted}
// // // //         isVideoOff={isVideoOff}
// // // //         isScreenSharing={isScreenSharing}
// // // //         onToggleAudio={toggleAudio}
// // // //         onToggleVideo={toggleVideo}
// // // //         onToggleScreenShare={toggleScreenShare}
// // // //         onLeave={leaveMeeting}
// // // //         onInvite={copyInviteLink}
// // // //         participantCount={participants.size + 1}
// // // //       />

// // // //       {/* Layout Options (at bottom right) */}
// // // //       <div className="fixed right-6 bottom-24 flex flex-col gap-2">
// // // //         <button
// // // //           onClick={() => setLayout('grid')}
// // // //           className={`p-3 rounded-full transition-colors ${layout === 'grid' ? 'bg-indigo-600' : 'bg-gray-700 hover:bg-gray-600'}`}
// // // //           title="Grid view"
// // // //         >
// // // //           <Grid size={20} />
// // // //         </button>

// // // //         <button
// // // //           onClick={() => setLayout('speaker')}
// // // //           className={`p-3 rounded-full transition-colors ${layout === 'speaker' ? 'bg-indigo-600' : 'bg-gray-700 hover:bg-gray-600'}`}
// // // //           title="Speaker view"
// // // //         >
// // // //           <Monitor size={20} />
// // // //         </button>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default VideoMeetingApp;
// // // import React, { useState, useEffect, useRef, useCallback } from 'react';
// // // import {
// // //   Mic, MicOff, Video, VideoOff, Phone, Copy, Users, MessageSquare,
// // //   Clock, Share, Settings, Grid, UserPlus, Monitor, Cast,
// // //   Airplay, MoreHorizontal, Bell, BellOff, ScreenShare, ScreenShareOff
// // // } from 'lucide-react';

// // // // Import the meeting service
// // // import meetingService from '../services/meetingService';

// // // // --- Floating Control Bar Component ---
// // // const FloatingControlBar = ({ isAudioMuted, isVideoOff, isScreenSharing, onToggleAudio, onToggleVideo, onToggleScreenShare, onLeave, onInvite, participantCount }) => {
// // //   const [isExpanded, setIsExpanded] = useState(true);

// // //   return (
// // //     <div className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-800 bg-opacity-90 rounded-full p-2 flex items-center transition-all duration-300 ${isExpanded ? 'w-auto px-4' : 'w-14'}`}>
// // //       {isExpanded ? (
// // //         <>
// // //           <button
// // //             onClick={onToggleAudio}
// // //             className={`p-3 rounded-full mx-1 transition-colors ${isAudioMuted ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600'}`}
// // //             title={isAudioMuted ? 'Unmute' : 'Mute'}
// // //           >
// // //             {isAudioMuted ? <MicOff size={20} /> : <Mic size={20} />}
// // //           </button>

// // //           <button
// // //             onClick={onToggleVideo}
// // //             className={`p-3 rounded-full mx-1 transition-colors ${isVideoOff ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600'}`}
// // //             title={isVideoOff ? 'Turn on camera' : 'Turn off camera'}
// // //           >
// // //             {isVideoOff ? <VideoOff size={20} /> : <Video size={20} />}
// // //           </button>

// // //           <button
// // //             onClick={onToggleScreenShare}
// // //             className={`p-3 rounded-full mx-1 transition-colors ${isScreenSharing ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
// // //             title={isScreenSharing ? 'Stop screen share' : 'Share screen'}
// // //           >
// // //             {isScreenSharing ? <ScreenShareOff size={20} /> : <ScreenShare size={20} />}
// // //           </button>

// // //           <button
// // //             onClick={onInvite}
// // //             className="p-3 rounded-full mx-1 bg-gray-700 hover:bg-gray-600 transition-colors"
// // //             title="Invite people"
// // //           >
// // //             <UserPlus size={20} />
// // //           </button>

// // //           <div className="mx-2 h-6 w-px bg-gray-600"></div>

// // //           <div className="text-white text-sm mx-2 flex items-center">
// // //             <Users size={16} className="mr-1" />
// // //             <span>{participantCount}</span>
// // //           </div>

// // //           <button
// // //             onClick={onLeave}
// // //             className="p-3 rounded-full mx-1 bg-red-600 hover:bg-red-700 transition-colors"
// // //             title="Leave meeting"
// // //           >
// // //             <Phone size={20} />
// // //           </button>
// // //         </>
// // //       ) : (
// // //         <button
// // //           onClick={() => setIsExpanded(true)}
// // //           className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
// // //           title="Show controls"
// // //         >
// // //           <MoreHorizontal size={20} />
// // //         </button>
// // //       )}

// // //       <button
// // //         onClick={() => setIsExpanded(!isExpanded)}
// // //         className="absolute -top-8 left-1/2 transform -translate-x-1/2 p-1 bg-gray-800 bg-opacity-70 rounded-full"
// // //       >
// // //         <div className="w-8 h-1 bg-gray-500 rounded-full"></div>
// // //       </button>
// // //     </div>
// // //   );
// // // };

// // // // --- Participant Tile Component ---
// // // const ParticipantTile = ({ stream, participantId, isLocal, isMuted, isVideoOff, isSpeaking, isScreenSharing }) => {
// // //   const videoRef = useRef(null);

// // //   useEffect(() => {
// // //     if (stream && videoRef.current) {
// // //       videoRef.current.srcObject = stream;
// // //     }
// // //   }, [stream]);

// // //   return (
// // //     <div className={`bg-gray-800 rounded-xl overflow-hidden aspect-video relative shadow-lg flex items-center justify-center transition-all duration-300 ${isSpeaking ? 'ring-2 ring-blue-400' : ''}`}>
// // //       <video
// // //         ref={videoRef}
// // //         autoPlay
// // //         playsInline
// // //         muted={isLocal}
// // //         className={`w-full h-full object-cover transition-opacity duration-300 ${isVideoOff ? 'opacity-0' : 'opacity-100'}`}
// // //       />

// // //       {isVideoOff && (
// // //         <div className="absolute w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center text-3xl font-bold">
// // //           {participantId.charAt(0).toUpperCase()}
// // //         </div>
// // //       )}

// // //       <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent flex items-center justify-between">
// // //         <span className="text-white text-sm font-medium truncate">
// // //           {participantId}{isLocal && ' (You)'}
// // //           {isScreenSharing && <span className="ml-2 text-blue-300"><Monitor size={14} className="inline" /></span>}
// // //         </span>

// // //         <div className="flex items-center">
// // //           {isMuted && (
// // //             <div className="bg-black/50 p-1 rounded-full ml-2">
// // //               <MicOff size={14} className="text-white" />
// // //             </div>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // // --- Main App Component ---
// // // const VideoMeetingApp = () => {
// // //   // --- State and Refs ---
// // //   const [view, setView] = useState('join_form');
// // //   const [userId, setUserId] = useState('');
// // //   const [meetingId, setMeetingId] = useState('');
// // //   const [meetingLink, setMeetingLink] = useState('');
// // //   const [localStream, setLocalStream] = useState(null);
// // //   const [screenStream, setScreenStream] = useState(null);
// // //   const [participants, setParticipants] = useState(new Map());
// // //   const [isAudioMuted, setIsAudioMuted] = useState(false);
// // //   const [isVideoOff, setIsVideoOff] = useState(false);
// // //   const [isScreenSharing, setIsScreenSharing] = useState(false);
// // //   const [currentTime, setCurrentTime] = useState('');
// // //   const [activeSpeaker, setActiveSpeaker] = useState(null);
// // //   const [layout, setLayout] = useState('grid'); // 'grid', 'speaker', 'sidebar'
// // //   const [showSettings, setShowSettings] = useState(false);
// // //   const [notificationsEnabled, setNotificationsEnabled] = useState(true);

// // //   const stompClientRef = useRef(null);
// // //   const peerConnectionsRef = useRef(new Map());
// // //   const localStreamRef = useRef(null);
// // //   const screenStreamRef = useRef(null);
// // //   const audioContextRef = useRef(null);
// // //   const analyserRef = useRef(null);
// // //   const speakingDetectionIntervalRef = useRef(null);

// // //   // --- WebRTC and Signaling Logic ---
// // //   const createPeerConnection = useCallback((remoteUserId) => {
// // //     if (peerConnectionsRef.current.has(remoteUserId)) {
// // //       peerConnectionsRef.current.get(remoteUserId).close();
// // //     }

// // //     const pc = new RTCPeerConnection({
// // //       iceServers: [
// // //         { urls: 'stun:stun.l.google.com:19302' },
// // //         { urls: 'stun:stun1.l.google.com:19302' },
// // //         { urls: 'stun:stun2.l.google.com:19302' }
// // //       ]
// // //     });

// // //     pc.onicecandidate = (event) => {
// // //       if (event.candidate) {
// // //         meetingService.sendIceCandidate(
// // //           stompClientRef.current, 
// // //           meetingId, 
// // //           event.candidate, 
// // //           userId, 
// // //           remoteUserId
// // //         );
// // //       }
// // //     };

// // //     pc.ontrack = (event) => {
// // //       setParticipants(prev => {
// // //         const newParticipants = new Map(prev);
// // //         newParticipants.set(remoteUserId, {
// // //           stream: event.streams[0],
// // //           isSpeaking: false,
// // //           isScreenSharing: false
// // //         });
// // //         return newParticipants;
// // //       });
// // //     };

// // //     // Add local tracks
// // //     const streamToSend = isScreenSharing && screenStreamRef.current ?
// // //       screenStreamRef.current : localStreamRef.current;

// // //     if (streamToSend) {
// // //       streamToSend.getTracks().forEach(track => {
// // //         pc.addTrack(track, streamToSend);
// // //       });
// // //     }

// // //     peerConnectionsRef.current.set(remoteUserId, pc);
// // //     return pc;
// // //   }, [userId, meetingId, isScreenSharing]);

// // //   const handleStompMessage = useCallback((message) => {
// // //     const signal = JSON.parse(message.body);
// // //     if (signal.senderId === userId) return;

// // //     switch (signal.type) {
// // //       case 'user_joined':
// // //         const pc = createPeerConnection(signal.senderId);
// // //         pc.createOffer()
// // //           .then(offer => pc.setLocalDescription(offer))
// // //           .then(() => {
// // //             meetingService.sendOffer(
// // //               stompClientRef.current,
// // //               meetingId,
// // //               pc.localDescription,
// // //               userId,
// // //               signal.senderId
// // //             );
// // //           })
// // //           .catch(e => console.error("Error creating offer:", e));
// // //         break;

// // //       case 'user_left':
// // //         if (peerConnectionsRef.current.has(signal.senderId)) {
// // //           peerConnectionsRef.current.get(signal.senderId).close();
// // //           peerConnectionsRef.current.delete(signal.senderId);
// // //         }
// // //         setParticipants(prev => {
// // //           const newParticipants = new Map(prev);
// // //           newParticipants.delete(signal.senderId);
// // //           return newParticipants;
// // //         });
// // //         break;

// // //       case 'offer':
// // //         if (signal.receiverId === userId) {
// // //           const peerConn = createPeerConnection(signal.senderId);
// // //           peerConn.setRemoteDescription(new RTCSessionDescription(signal.offer))
// // //             .then(() => peerConn.createAnswer())
// // //             .then(answer => peerConn.setLocalDescription(answer))
// // //             .then(() => {
// // //               meetingService.sendAnswer(
// // //                 stompClientRef.current,
// // //                 meetingId,
// // //                 peerConn.localDescription,
// // //                 userId,
// // //                 signal.senderId
// // //               );
// // //             })
// // //             .catch(e => console.error("Error handling offer:", e));
// // //         }
// // //         break;

// // //       case 'answer':
// // //         if (signal.receiverId === userId) {
// // //           const pc = peerConnectionsRef.current.get(signal.senderId);
// // //           if (pc) pc.setRemoteDescription(new RTCSessionDescription(signal.answer));
// // //         }
// // //         break;

// // //       case 'ice_candidate':
// // //         if (signal.receiverId === userId) {
// // //           const pc = peerConnectionsRef.current.get(signal.senderId);
// // //           if (pc) pc.addIceCandidate(new RTCIceCandidate(signal.candidate));
// // //         }
// // //         break;

// // //       case 'screen_sharing':
// // //         setParticipants(prev => {
// // //           const newParticipants = new Map(prev);
// // //           const participant = newParticipants.get(signal.senderId);
// // //           if (participant) {
// // //             newParticipants.set(signal.senderId, {
// // //               ...participant,
// // //               isScreenSharing: signal.active
// // //             });
// // //           }
// // //           return newParticipants;
// // //         });
// // //         break;

// // //       default:
// // //         break;
// // //     }
// // //   }, [userId, meetingId, createPeerConnection]);

// // //   // --- Media Stream Functions ---
// // //   const initLocalStream = async () => {
// // //     try {
// // //       const stream = await navigator.mediaDevices.getUserMedia({
// // //         video: { width: 1280, height: 720 },
// // //         audio: {
// // //           echoCancellation: true,
// // //           noiseSuppression: true,
// // //           autoGainControl: true
// // //         }
// // //       });

// // //       setLocalStream(stream);
// // //       localStreamRef.current = stream;

// // //       // Initialize audio context for speaking detection
// // //       audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
// // //       analyserRef.current = audioContextRef.current.createAnalyser();
// // //       const source = audioContextRef.current.createMediaStreamSource(stream);
// // //       source.connect(analyserRef.current);
// // //       analyserRef.current.fftSize = 256;

// // //       return stream;
// // //     } catch (error) {
// // //       console.error('Error accessing media devices:', error);
// // //       alert('Could not access your camera and microphone. Please check permissions.');
// // //       return null;
// // //     }
// // //   };

// // //   const toggleScreenShare = async () => {
// // //     try {
// // //       if (isScreenSharing) {
// // //         // Stop screen share
// // //         if (screenStreamRef.current) {
// // //           screenStreamRef.current.getTracks().forEach(track => track.stop());
// // //         }
// // //         setScreenStream(null);
// // //         screenStreamRef.current = null;
// // //         setIsScreenSharing(false);

// // //         // Notify others
// // //         meetingService.sendScreenSharingStatus(
// // //           stompClientRef.current,
// // //           meetingId,
// // //           userId,
// // //           false
// // //         );
// // //       } else {
// // //         // Start screen share
// // //         const screenStream = await navigator.mediaDevices.getDisplayMedia({
// // //           video: true,
// // //           audio: true
// // //         });

// // //         setScreenStream(screenStream);
// // //         screenStreamRef.current = screenStream;
// // //         setIsScreenSharing(true);

// // //         // Notify others
// // //         meetingService.sendScreenSharingStatus(
// // //           stompClientRef.current,
// // //           meetingId,
// // //           userId,
// // //           true
// // //         );

// // //         // Handle when user stops screen share using browser UI
// // //         screenStream.getVideoTracks()[0].onended = () => {
// // //           toggleScreenShare();
// // //         };
// // //       }

// // //       // Update all peer connections with new stream
// // //       peerConnectionsRef.current.forEach((pc, remoteUserId) => {
// // //         // Remove all existing tracks
// // //         pc.getSenders().forEach(sender => {
// // //           if (sender.track.kind === 'video' || sender.track.kind === 'audio') {
// // //             pc.removeTrack(sender);
// // //           }
// // //         });

// // //         // Add new tracks
// // //         const streamToSend = isScreenSharing ? localStreamRef.current : screenStreamRef.current;
// // //         if (streamToSend) {
// // //           streamToSend.getTracks().forEach(track => {
// // //             pc.addTrack(track, streamToSend);
// // //           });
// // //         }

// // //         // Create and send new offer
// // //         pc.createOffer()
// // //           .then(offer => pc.setLocalDescription(offer))
// // //           .then(() => {
// // //             meetingService.sendOffer(
// // //               stompClientRef.current,
// // //               meetingId,
// // //               pc.localDescription,
// // //               userId,
// // //               remoteUserId
// // //             );
// // //           })
// // //           .catch(e => console.error("Error renegotiating:", e));
// // //       });
// // //     } catch (error) {
// // //       console.error('Error toggling screen share:', error);
// // //     }
// // //   };

// // //   // --- UI Handlers ---
// // //   const handleProceedToLobby = async (isCreating) => {
// // //     if (!userId.trim()) return alert('Please enter your name');
// // //     if (!isCreating && !meetingId.trim()) return alert('Please enter a meeting code');

// // //     if (isCreating) {
// // //       try {
// // //         const result = await meetingService.createMeeting(userId);
// // //         setMeetingId(result.meetingId);
// // //         setMeetingLink(`${window.location.origin}/meeting/${result.meetingId}`);
// // //       } catch (error) {
// // //         return alert('Failed to create meeting. Please try again.');
// // //       }
// // //     } else {
// // //       try {
// // //         await meetingService.getMeeting(meetingId);
// // //         // Set meeting link for joining as well
// // //         setMeetingLink(`${window.location.origin}/meeting/${meetingId}`);
// // //       } catch (error) {
// // //         return alert('Failed to join meeting. Please check the meeting ID and try again.');
// // //       }
// // //     }

// // //     if (await initLocalStream()) {
// // //       setView('lobby');
// // //     }
// // //   };

// // //   const handleJoinFromLobby = () => {
// // //     if (localStreamRef.current) {
// // //       localStreamRef.current.getAudioTracks()[0].enabled = !isAudioMuted;
// // //       localStreamRef.current.getVideoTracks()[0].enabled = !isVideoOff;
// // //     }

// // //     meetingService.connectToWebSocket(
// // //       userId, 
// // //       meetingId, 
// // //       handleStompMessage,
// // //       (client) => {
// // //         stompClientRef.current = client;
// // //         // Start speaking detection
// // //         startSpeakingDetection();

// // //         // Notify others that we joined
// // //         meetingService.sendUserJoined(client, meetingId, userId);
        
// // //         setView('meeting_room');
// // //       }
// // //     );
// // //   };

// // //   const startSpeakingDetection = () => {
// // //     if (!analyserRef.current) return;

// // //     speakingDetectionIntervalRef.current = setInterval(() => {
// // //       const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
// // //       analyserRef.current.getByteFrequencyData(dataArray);

// // //       let sum = 0;
// // //       for (let i = 0; i < dataArray.length; i++) {
// // //         sum += dataArray[i];
// // //       }
// // //       const average = sum / dataArray.length;

// // //       // If volume is above threshold, user is speaking
// // //       if (average > 50) {
// // //         setActiveSpeaker(userId);
// // //       }
// // //     }, 500);
// // //   };

// // //   const leaveMeeting = () => {
// // //     // Clear intervals
// // //     if (speakingDetectionIntervalRef.current) {
// // //       clearInterval(speakingDetectionIntervalRef.current);
// // //     }

// // //     // Notify others that we're leaving
// // //     if (stompClientRef.current?.connected) {
// // //       meetingService.sendUserLeft(stompClientRef.current, meetingId, userId);
// // //     }

// // //     // Close connections
// // //     stompClientRef.current?.deactivate();
// // //     peerConnectionsRef.current.forEach(pc => pc.close());
// // //     peerConnectionsRef.current.clear();

// // //     // Stop streams
// // //     if (localStreamRef.current) {
// // //       localStreamRef.current.getTracks().forEach(track => track.stop());
// // //     }
// // //     if (screenStreamRef.current) {
// // //       screenStreamRef.current.getTracks().forEach(track => track.stop());
// // //     }

// // //     // Reset state
// // //     localStreamRef.current = null;
// // //     screenStreamRef.current = null;
// // //     setLocalStream(null);
// // //     setScreenStream(null);
// // //     setParticipants(new Map());
// // //     setMeetingId('');
// // //     setMeetingLink('');
// // //     setView('join_form');
// // //     setIsScreenSharing(false);
// // //   };

// // //   const toggleAudio = () => {
// // //     if (localStreamRef.current) {
// // //       const audioTrack = localStreamRef.current.getAudioTracks()[0];
// // //       audioTrack.enabled = !audioTrack.enabled;
// // //       setIsAudioMuted(!audioTrack.enabled);
// // //     }
// // //   };

// // //   const toggleVideo = () => {
// // //     if (localStreamRef.current) {
// // //       const videoTrack = localStreamRef.current.getVideoTracks()[0];
// // //       videoTrack.enabled = !videoTrack.enabled;
// // //       setIsVideoOff(!videoTrack.enabled);
// // //     }
// // //   };

// // //   const copyInviteLink = () => {
// // //     navigator.clipboard.writeText(meetingLink)
// // //       .then(() => {
// // //         if (notificationsEnabled) {
// // //           // Show custom notification
// // //           const notification = document.createElement('div');
// // //           notification.className = 'fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-md shadow-lg z-50';
// // //           notification.textContent = 'Invite link copied to clipboard!';
// // //           document.body.appendChild(notification);

// // //           setTimeout(() => {
// // //             document.body.removeChild(notification);
// // //           }, 3000);
// // //         }
// // //       });
// // //   };

// // //   // --- Effects ---
// // //   useEffect(() => {
// // //     const timer = setInterval(() => {
// // //       setCurrentTime(new Date().toLocaleTimeString('en-US', {
// // //         hour: '2-digit',
// // //         minute: '2-digit',
// // //         hour12: true
// // //       }));
// // //     }, 1000);

// // //     return () => clearInterval(timer);
// // //   }, []);

// // //   // --- Render Logic ---
// // //   if (view === 'join_form') {
// // //     return (
// // //       <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-800 text-white flex flex-col items-center justify-center p-4">
// // //         <div className="w-full max-w-md bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-2xl shadow-2xl p-8 space-y-6 border border-gray-700">
// // //           <div className="text-center">
// // //             <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
// // //               WE-CHAT
// // //             </h1>
// // //             <p className="text-gray-300 mt-2">Premium video meetings. Made simple.</p>
// // //           </div>

// // //           <div className="space-y-4">
// // //             <div>
// // //               <label className="block text-sm font-medium text-gray-300 mb-1">Your Name</label>
// // //               <input
// // //                 type="text"
// // //                 value={userId}
// // //                 onChange={(e) => setUserId(e.target.value)}
// // //                 className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
// // //                 placeholder="Enter your name"
// // //               />
// // //             </div>

// // //             <div>
// // //               <label className="block text-sm font-medium text-gray-300 mb-1">Meeting Code (to join)</label>
// // //               <input
// // //                 type="text"
// // //                 value={meetingId}
// // //                 onChange={(e) => setMeetingId(e.target.value.trim())}
// // //                 className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
// // //                 placeholder="Enter meeting code"
// // //               />
// // //             </div>
// // //           </div>

// // //           <div className="flex flex-col sm:flex-row gap-3">
// // //             <button
// // //               onClick={() => handleProceedToLobby(false)}
// // //               disabled={!meetingId.trim() || !userId.trim()}
// // //               className="flex-1 bg-indigo-600 hover:bg-indigo-700 font-medium py-3 px-4 rounded-lg transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center gap-2"
// // //             >
// // //               <Phone size={18} /> Join Meeting
// // //             </button>

// // //             <button
// // //               onClick={() => handleProceedToLobby(true)}
// // //               disabled={!userId.trim()}
// // //               className="flex-1 border border-indigo-500 text-indigo-300 hover:bg-indigo-500 hover:text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center gap-2"
// // //             >
// // //               <UserPlus size={18} /> New Meeting
// // //             </button>
// // //           </div>

// // //           <div className="text-center text-sm text-gray-400 mt-4">
// // //             By joining, you agree to our Terms of Service and Privacy Policy.
// // //           </div>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   if (view === 'lobby') {
// // //     return (
// // //       <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
// // //         <div className="w-full max-w-4xl bg-gray-800 rounded-2xl overflow-hidden shadow-xl">
// // //           <div className="p-6 border-b border-gray-700">
// // //             <h1 className="text-2xl font-bold">Ready to join?</h1>
// // //             <p className="text-gray-400">Preview your video and audio before joining</p>
// // //           </div>

// // //           <div className="p-6 flex flex-col md:flex-row gap-6">
// // //             <div className="flex-1 bg-black rounded-xl overflow-hidden relative aspect-video">
// // //               <video
// // //                 ref={el => el && (el.srcObject = localStream)}
// // //                 autoPlay
// // //                 muted
// // //                 playsInline
// // //                 className={`w-full h-full object-cover ${isVideoOff ? 'hidden' : 'block'}`}
// // //               />

// // //               {isVideoOff && (
// // //                 <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
// // //                   <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center text-3xl font-bold">
// // //                     {userId.charAt(0).toUpperCase()}
// // //                   </div>
// // //                 </div>
// // //               )}

// // //               <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
// // //                 <button
// // //                   onClick={() => setIsAudioMuted(!isAudioMuted)}
// // //                   className={`p-3 rounded-full transition-colors ${isAudioMuted ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600'}`}
// // //                 >
// // //                   {isAudioMuted ? <MicOff size={20} /> : <Mic size={20} />}
// // //                 </button>

// // //                 <button
// // //                   onClick={() => setIsVideoOff(!isVideoOff)}
// // //                   className={`p-3 rounded-full transition-colors ${isVideoOff ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600'}`}
// // //                 >
// // //                   {isVideoOff ? <VideoOff size={20} /> : <Video size={20} />}
// // //                 </button>
// // //               </div>
// // //             </div>

// // //             <div className="md:w-64 space-y-4 flex flex-col">
// // //               <div className="flex-1 space-y-4">
// // //                 {meetingLink && (
// // //                   <div className="bg-gray-700 p-3 rounded-lg">
// // //                     <h3 className="font-medium mb-2 text-sm">Share this invite</h3>
// // //                     <div className="flex items-center bg-gray-900 rounded-md p-2">
// // //                       <input
// // //                         type="text"
// // //                         readOnly
// // //                         value={meetingLink}
// // //                         className="flex-1 bg-transparent text-xs text-gray-300 outline-none truncate"
// // //                       />
// // //                       <button onClick={copyInviteLink} className="p-1 rounded-md hover:bg-gray-600 transition-colors" title="Copy link">
// // //                         <Copy size={16} />
// // //                       </button>
// // //                     </div>
// // //                   </div>
// // //                 )}
// // //               </div>

// // //               <div className="space-y-2">
// // //                 <button
// // //                   onClick={handleJoinFromLobby}
// // //                   className="w-full bg-indigo-600 hover:bg-indigo-700 font-medium py-3 px-4 rounded-lg text-lg transition-colors flex items-center justify-center gap-2"
// // //                 >
// // //                   <Phone size={20} /> Join now
// // //                 </button>

// // //                 <button
// // //                   onClick={() => setView('join_form')}
// // //                   className="w-full border border-gray-600 text-gray-300 hover:bg-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
// // //                 >
// // //                   Cancel
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   // --- Meeting Room View ---
// // //   return (
// // //     <div className="min-h-screen bg-gray-900 text-white flex flex-col">
// // //       {/* Header Bar */}
// // //       <header className="px-6 py-3 flex justify-between items-center border-b border-gray-800">
// // //         <div className="flex items-center gap-4">
// // //           <div className="text-xl font-bold text-indigo-400">WE-CHAT</div>
// // //           <div className="text-sm font-medium">{currentTime}</div>
// // //           <div className="text-sm bg-gray-700 px-2 py-1 rounded-md">{meetingId}</div>
// // //         </div>

// // //         <div className="flex items-center gap-3">
// // //           <button
// // //             onClick={() => setShowSettings(!showSettings)}
// // //             className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
// // //             title="Settings"
// // //           >
// // //             <Settings size={20} />
// // //           </button>

// // //           {showSettings && (
// // //             <div className="absolute top-16 right-6 bg-gray-800 rounded-lg shadow-lg p-4 z-10 w-64">
// // //               <h3 className="font-medium mb-3">Settings</h3>

// // //               <div className="flex items-center justify-between mb-3">
// // //                 <span className="text-sm">Notifications</span>
// // //                 <button
// // //                   onClick={() => setNotificationsEnabled(!notificationsEnabled)}
// // //                   className={`relative w-10 h-6 rounded-full transition-colors ${notificationsEnabled ? 'bg-indigo-600' : 'bg-gray-600'}`}
// // //                 >
// // //                   <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${notificationsEnabled ? 'left-5' : 'left-1'}`}></span>
// // //                 </button>
// // //               </div>

// // //               <div className="text-xs text-gray-400 mt-4">
// // //                 Video quality is automatically adjusted based on your network connection.
// // //               </div>
// // //             </div>
// // //           )}
// // //         </div>
// // //       </header>

// // //       {/* Main Content - Video Grid */}
// // //       <main className="flex-1 p-4 overflow-auto">
// // //         <div className={`grid gap-4 ${layout === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
// // //           {/* Local Video */}
// // //           <ParticipantTile
// // //             stream={isScreenSharing ? screenStream : localStream}
// // //             participantId={userId}
// // //             isLocal
// // //             isMuted={isAudioMuted}
// // //             isVideoOff={isVideoOff && !isScreenSharing}
// // //             isSpeaking={activeSpeaker === userId}
// // //             isScreenSharing={isScreenSharing}
// // //           />

// // //           {/* Remote Participants */}
// // //           {Array.from(participants.entries()).map(([id, data]) => (
// // //             <ParticipantTile
// // //               key={id}
// // //               stream={data.stream}
// // //               participantId={id}
// // //               isMuted={false}
// // //               isVideoOff={false}
// // //               isSpeaking={activeSpeaker === id}
// // //               isScreenSharing={data.isScreenSharing}
// // //             />
// // //           ))}
// // //         </div>
// // //       </main>

// // //       {/* Floating Control Bar */}
// // //       <FloatingControlBar
// // //         isAudioMuted={isAudioMuted}
// // //         isVideoOff={isVideoOff}
// // //         isScreenSharing={isScreenSharing}
// // //         onToggleAudio={toggleAudio}
// // //         onToggleVideo={toggleVideo}
// // //         onToggleScreenShare={toggleScreenShare}
// // //         onLeave={leaveMeeting}
// // //         onInvite={copyInviteLink}
// // //         participantCount={participants.size + 1}
// // //       />

// // //       {/* Layout Options (at bottom right) */}
// // //       <div className="fixed right-6 bottom-24 flex flex-col gap-2">
// // //         <button
// // //           onClick={() => setLayout('grid')}
// // //           className={`p-3 rounded-full transition-colors ${layout === 'grid' ? 'bg-indigo-600' : 'bg-gray-700 hover:bg-gray-600'}`}
// // //           title="Grid view"
// // //         >
// // //           <Grid size={20} />
// // //         </button>

// // //         <button
// // //           onClick={() => setLayout('speaker')}
// // //           className={`p-3 rounded-full transition-colors ${layout === 'speaker' ? 'bg-indigo-600' : 'bg-gray-700 hover:bg-gray-600'}`}
// // //           title="Speaker view"
// // //         >
// // //           <Monitor size={20} />
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default VideoMeetingApp;
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Mic, MicOff, Video, VideoOff, Phone, Copy, Users, MessageSquare,
  Clock, Share, Settings, Grid, UserPlus, Monitor, Cast,
  Airplay, MoreHorizontal, Bell, BellOff, ScreenShare, ScreenShareOff
} from 'lucide-react';

// Import the meeting service
const meetingService = {
  createMeeting: async (userId) => {
    return { meetingId: Math.random().toString(36).substring(2, 10) };
  },
  getMeeting: async (meetingId) => {
    return { exists: true };
  },
  connectToWebSocket: (userId, meetingId, onMessage, onConnect) => {
    // Mock WebSocket connection
    const mockClient = {
      connected: true,
      send: () => {},
      deactivate: () => {}
    };
    setTimeout(() => onConnect(mockClient), 100);
    return mockClient;
  },
  sendUserJoined: (client, meetingId, userId) => {},
  sendUserLeft: (client, meetingId, userId) => {},
  sendIceCandidate: (client, meetingId, candidate, senderId, receiverId) => {},
  sendOffer: (client, meetingId, offer, senderId, receiverId) => {},
  sendAnswer: (client, meetingId, answer, senderId, receiverId) => {},
  sendScreenSharingStatus: (client, meetingId, userId, active) => {}
};

// --- Floating Control Bar Component ---
const FloatingControlBar = ({ isAudioMuted, isVideoOff, isScreenSharing, onToggleAudio, onToggleVideo, onToggleScreenShare, onLeave, onInvite, participantCount }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-800 bg-opacity-90 rounded-full p-2 flex items-center transition-all duration-300 ${isExpanded ? 'w-auto px-4' : 'w-14'}`}>
      {isExpanded ? (
        <>
          <button
            onClick={onToggleAudio}
            className={`p-3 rounded-full mx-1 transition-colors ${isAudioMuted ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600'}`}
            title={isAudioMuted ? 'Unmute' : 'Mute'}
          >
            {isAudioMuted ? <MicOff size={20} /> : <Mic size={20} />}
          </button>

          <button
            onClick={onToggleVideo}
            className={`p-3 rounded-full mx-1 transition-colors ${isVideoOff ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600'}`}
            title={isVideoOff ? 'Turn on camera' : 'Turn off camera'}
          >
            {isVideoOff ? <VideoOff size={20} /> : <Video size={20} />}
          </button>

          <button
            onClick={onToggleScreenShare}
            className={`p-3 rounded-full mx-1 transition-colors ${isScreenSharing ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
            title={isScreenSharing ? 'Stop screen share' : 'Share screen'}
          >
            {isScreenSharing ? <ScreenShareOff size={20} /> : <ScreenShare size={20} />}
          </button>

          <button
            onClick={onInvite}
            className="p-3 rounded-full mx-1 bg-gray-700 hover:bg-gray-600 transition-colors"
            title="Invite people"
          >
            <UserPlus size={20} />
          </button>

          <div className="mx-2 h-6 w-px bg-gray-600"></div>

          <div className="text-white text-sm mx-2 flex items-center">
            <Users size={16} className="mr-1" />
            <span>{participantCount}</span>
          </div>

          <button
            onClick={onLeave}
            className="p-3 rounded-full mx-1 bg-red-600 hover:bg-red-700 transition-colors"
            title="Leave meeting"
          >
            <Phone size={20} />
          </button>
        </>
      ) : (
        <button
          onClick={() => setIsExpanded(true)}
          className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
          title="Show controls"
        >
          <MoreHorizontal size={20} />
        </button>
      )}

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -top-8 left-1/2 transform -translate-x-1/2 p-1 bg-gray-800 bg-opacity-70 rounded-full"
      >
        <div className="w-8 h-1 bg-gray-500 rounded-full"></div>
      </button>
    </div>
  );
};

// --- Participant Tile Component ---
const ParticipantTile = ({ stream, participantId, isLocal, isMuted, isVideoOff, isSpeaking, isScreenSharing }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className={`bg-gray-800 rounded-xl overflow-hidden aspect-video relative shadow-lg flex items-center justify-center transition-all duration-300 ${isSpeaking ? 'ring-2 ring-blue-400' : ''}`}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={isLocal}
        className={`w-full h-full object-cover transition-opacity duration-300 ${isVideoOff ? 'opacity-0' : 'opacity-100'}`}
      />

      {isVideoOff && (
        <div className="absolute w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center text-3xl font-bold">
          {participantId.charAt(0).toUpperCase()}
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent flex items-center justify-between">
        <span className="text-white text-sm font-medium truncate">
          {participantId}{isLocal && ' (You)'}
          {isScreenSharing && <span className="ml-2 text-blue-300"><Monitor size={14} className="inline" /></span>}
        </span>

        <div className="flex items-center">
          {isMuted && (
            <div className="bg-black/50 p-1 rounded-full ml-2">
              <MicOff size={14} className="text-white" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---
const VideoMeetingApp = () => {
  // --- State and Refs ---
  const [view, setView] = useState('join_form');
  const [userId, setUserId] = useState('');
  const [meetingId, setMeetingId] = useState('');
  const [meetingLink, setMeetingLink] = useState('');
  const [localStream, setLocalStream] = useState(null);
  const [screenStream, setScreenStream] = useState(null);
  const [participants, setParticipants] = useState(new Map());
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [activeSpeaker, setActiveSpeaker] = useState(null);
  const [layout, setLayout] = useState('grid'); // 'grid', 'speaker', 'sidebar'
  const [showSettings, setShowSettings] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const stompClientRef = useRef(null);
  const peerConnectionsRef = useRef(new Map());
  const localStreamRef = useRef(null);
  const screenStreamRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const speakingDetectionIntervalRef = useRef(null);
  const dataChannelRef = useRef(new Map());

  // --- WebRTC and Signaling Logic ---
  const createPeerConnection = useCallback((remoteUserId) => {
    if (peerConnectionsRef.current.has(remoteUserId)) {
      peerConnectionsRef.current.get(remoteUserId).close();
    }

    const pc = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
        { urls: 'stun:stun2.l.google.com:19302' }
      ]
    });

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        meetingService.sendIceCandidate(
          stompClientRef.current, 
          meetingId, 
          event.candidate, 
          userId, 
          remoteUserId
        );
      }
    };

    pc.ontrack = (event) => {
      setParticipants(prev => {
        const newParticipants = new Map(prev);
        newParticipants.set(remoteUserId, {
          stream: event.streams[0],
          isSpeaking: false,
          isScreenSharing: false
        });
        return newParticipants;
      });
    };

    // Create a data channel for messaging
    const dataChannel = pc.createDataChannel('messages');
    dataChannelRef.current.set(remoteUserId, dataChannel);
    
    dataChannel.onmessage = (event) => {
      console.log('Message from', remoteUserId, ':', event.data);
    };
    
    dataChannel.onopen = () => {
      console.log('Data channel opened with', remoteUserId);
    };

    // Add local tracks
    const streamToSend = isScreenSharing && screenStreamRef.current ?
      screenStreamRef.current : localStreamRef.current;

    if (streamToSend) {
      streamToSend.getTracks().forEach(track => {
        // Check if the track is already added to avoid overadding
        const senderExists = Array.from(pc.getSenders()).some(
          sender => sender.track === track
        );
        
        if (!senderExists) {
          pc.addTrack(track, streamToSend);
        }
      });
    }

    peerConnectionsRef.current.set(remoteUserId, pc);
    return pc;
  }, [userId, meetingId, isScreenSharing]);

  const handleStompMessage = useCallback((message) => {
    const signal = JSON.parse(message.body);
    if (signal.senderId === userId) return;

    switch (signal.type) {
      case 'user_joined':
        const pc = createPeerConnection(signal.senderId);
        pc.createOffer()
          .then(offer => pc.setLocalDescription(offer))
          .then(() => {
            meetingService.sendOffer(
              stompClientRef.current,
              meetingId,
              pc.localDescription,
              userId,
              signal.senderId
            );
          })
          .catch(e => console.error("Error creating offer:", e));
        break;

      case 'user_left':
        if (peerConnectionsRef.current.has(signal.senderId)) {
          peerConnectionsRef.current.get(signal.senderId).close();
          peerConnectionsRef.current.delete(signal.senderId);
        }
        if (dataChannelRef.current.has(signal.senderId)) {
          dataChannelRef.current.delete(signal.senderId);
        }
        setParticipants(prev => {
          const newParticipants = new Map(prev);
          newParticipants.delete(signal.senderId);
          return newParticipants;
        });
        break;

      case 'offer':
        if (signal.receiverId === userId) {
          const peerConn = createPeerConnection(signal.senderId);
          peerConn.setRemoteDescription(new RTCSessionDescription(signal.offer))
            .then(() => peerConn.createAnswer())
            .then(answer => peerConn.setLocalDescription(answer))
            .then(() => {
              meetingService.sendAnswer(
                stompClientRef.current,
                meetingId,
                peerConn.localDescription,
                userId,
                signal.senderId
              );
            })
            .catch(e => console.error("Error handling offer:", e));
        }
        break;

      case 'answer':
        if (signal.receiverId === userId) {
          const pc = peerConnectionsRef.current.get(signal.senderId);
          if (pc) pc.setRemoteDescription(new RTCSessionDescription(signal.answer));
        }
        break;

      case 'ice_candidate':
        if (signal.receiverId === userId) {
          const pc = peerConnectionsRef.current.get(signal.senderId);
          if (pc) pc.addIceCandidate(new RTCIceCandidate(signal.candidate));
        }
        break;

      case 'screen_sharing':
        setParticipants(prev => {
          const newParticipants = new Map(prev);
          const participant = newParticipants.get(signal.senderId);
          if (participant) {
            newParticipants.set(signal.senderId, {
              ...participant,
              isScreenSharing: signal.active
            });
          }
          return newParticipants;
        });
        break;

      default:
        break;
    }
  }, [userId, meetingId, createPeerConnection]);

  // --- Media Stream Functions ---
  const initLocalStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      setLocalStream(stream);
      localStreamRef.current = stream;

      // Initialize audio context for speaking detection
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      analyserRef.current.fftSize = 256;

      return stream;
    } catch (error) {
      console.error('Error accessing media devices:', error);
      alert('Could not access your camera and microphone. Please check permissions.');
      return null;
    }
  };

  const toggleScreenShare = async () => {
    try {
      if (isScreenSharing) {
        // Stop screen share
        if (screenStreamRef.current) {
          screenStreamRef.current.getTracks().forEach(track => track.stop());
        }
        setScreenStream(null);
        screenStreamRef.current = null;
        setIsScreenSharing(false);

        // Notify others
        meetingService.sendScreenSharingStatus(
          stompClientRef.current,
          meetingId,
          userId,
          false
        );
      } else {
        // Start screen share
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true
        });

        setScreenStream(screenStream);
        screenStreamRef.current = screenStream;
        setIsScreenSharing(true);

        // Notify others
        meetingService.sendScreenSharingStatus(
          stompClientRef.current,
          meetingId,
          userId,
          true
        );

        // Handle when user stops screen share using browser UI
        screenStream.getVideoTracks()[0].onended = () => {
          toggleScreenShare();
        };
      }

      // Update all peer connections with new stream
      peerConnectionsRef.current.forEach((pc, remoteUserId) => {
        // Remove all existing tracks
        const senders = pc.getSenders();
        senders.forEach(sender => {
          if (sender.track && (sender.track.kind === 'video' || sender.track.kind === 'audio')) {
            pc.removeTrack(sender);
          }
        });

        // Add new tracks
        const streamToSend = isScreenSharing ? localStreamRef.current : screenStreamRef.current;
        if (streamToSend) {
          streamToSend.getTracks().forEach(track => {
            pc.addTrack(track, streamToSend);
          });
        }

        // Create and send new offer
        pc.createOffer()
          .then(offer => pc.setLocalDescription(offer))
          .then(() => {
            meetingService.sendOffer(
              stompClientRef.current,
              meetingId,
              pc.localDescription,
              userId,
              remoteUserId
            );
          })
          .catch(e => console.error("Error renegotiating:", e));
      });
    } catch (error) {
      console.error('Error toggling screen share:', error);
    }
  };

  // --- UI Handlers ---
  const handleProceedToLobby = async (isCreating) => {
    if (!userId.trim()) return alert('Please enter your name');
    if (!isCreating && !meetingId.trim()) return alert('Please enter a meeting code');

    if (isCreating) {
      try {
        const result = await meetingService.createMeeting(userId);
        setMeetingId(result.meetingId);
        setMeetingLink(`${window.location.origin}/meeting/${result.meetingId}`);
      } catch (error) {
        return alert('Failed to create meeting. Please try again.');
      }
    } else {
      try {
        await meetingService.getMeeting(meetingId);
        // Set meeting link for joining as well
        setMeetingLink(`${window.location.origin}/meeting/${meetingId}`);
      } catch (error) {
        return alert('Failed to join meeting. Please check the meeting ID and try again.');
      }
    }

    if (await initLocalStream()) {
      setView('lobby');
    }
  };

  const handleJoinFromLobby = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getAudioTracks()[0].enabled = !isAudioMuted;
      localStreamRef.current.getVideoTracks()[0].enabled = !isVideoOff;
    }

    meetingService.connectToWebSocket(
      userId, 
      meetingId, 
      handleStompMessage,
      (client) => {
        stompClientRef.current = client;
        // Start speaking detection
        startSpeakingDetection();

        // Notify others that we joined
        meetingService.sendUserJoined(client, meetingId, userId);
        
        setView('meeting_room');
      }
    );
  };

  const startSpeakingDetection = () => {
    if (!analyserRef.current) return;

    speakingDetectionIntervalRef.current = setInterval(() => {
      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
      analyserRef.current.getByteFrequencyData(dataArray);

      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) {
        sum += dataArray[i];
      }
      const average = sum / dataArray.length;

      // If volume is above threshold, user is speaking
      if (average > 50) {
        setActiveSpeaker(userId);
      }
    }, 500);
  };

  const leaveMeeting = () => {
    // Clear intervals
    if (speakingDetectionIntervalRef.current) {
      clearInterval(speakingDetectionIntervalRef.current);
    }

    // Notify others that we're leaving
    if (stompClientRef.current?.connected) {
      meetingService.sendUserLeft(stompClientRef.current, meetingId, userId);
    }

    // Close connections
    stompClientRef.current?.deactivate();
    peerConnectionsRef.current.forEach(pc => pc.close());
    peerConnectionsRef.current.clear();
    dataChannelRef.current.clear();

    // Stop streams
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
    }
    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach(track => track.stop());
    }

    // Reset state
    localStreamRef.current = null;
    screenStreamRef.current = null;
    setLocalStream(null);
    setScreenStream(null);
    setParticipants(new Map());
    setMeetingId('');
    setMeetingLink('');
    setView('join_form');
    setIsScreenSharing(false);
  };

  const toggleAudio = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setIsAudioMuted(!audioTrack.enabled);
    }
  };

  const toggleVideo = () => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setIsVideoOff(!videoTrack.enabled);
    }
  };

  const copyInviteLink = () => {
    navigator.clipboard.writeText(meetingLink)
      .then(() => {
        if (notificationsEnabled) {
          // Show custom notification
          const notification = document.createElement('div');
          notification.className = 'fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-md shadow-lg z-50';
          notification.textContent = 'Invite link copied to clipboard!';
          document.body.appendChild(notification);

          setTimeout(() => {
            document.body.removeChild(notification);
          }, 3000);
        }
      });
  };

  // --- Effects ---
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // --- Render Logic ---
  if (view === 'join_form') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-800 text-white flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-2xl shadow-2xl p-8 space-y-6 border border-gray-700">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              WE-CHAT
            </h1>
            <p className="text-gray-300 mt-2">Premium video meetings. Made simple.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Your Name</label>
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Meeting Code (to join)</label>
              <input
                type="text"
                value={meetingId}
                onChange={(e) => setMeetingId(e.target.value.trim())}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
                placeholder="Enter meeting code"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => handleProceedToLobby(false)}
              disabled={!meetingId.trim() || !userId.trim()}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 font-medium py-3 px-4 rounded-lg transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Phone size={18} /> Join Meeting
            </button>

            <button
              onClick={() => handleProceedToLobby(true)}
              disabled={!userId.trim()}
              className="flex-1 border border-indigo-500 text-indigo-300 hover:bg-indigo-500 hover:text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <UserPlus size={18} /> New Meeting
            </button>
          </div>

          <div className="text-center text-sm text-gray-400 mt-4">
            By joining, you agree to our Terms of Service and Privacy Policy.
          </div>
        </div>
      </div>
    );
  }

  if (view === 'lobby') {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-gray-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-6 border-b border-gray-700">
            <h1 className="text-2xl font-bold">Ready to join?</h1>
            <p className="text-gray-400">Preview your video and audio before joining</p>
          </div>

          <div className="p-6 flex flex-col md:flex-row gap-6">
            <div className="flex-1 bg-black rounded-xl overflow-hidden relative aspect-video">
              <video
                ref={el => el && (el.srcObject = localStream)}
                autoPlay
                muted
                playsInline
                className={`w-full h-full object-cover ${isVideoOff ? 'hidden' : 'block'}`}
              />

              {isVideoOff && (
                <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                  <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center text-3xl font-bold">
                    {userId.charAt(0).toUpperCase()}
                  </div>
                </div>
              )}

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                <button
                  onClick={() => setIsAudioMuted(!isAudioMuted)}
                  className={`p-3 rounded-full transition-colors ${isAudioMuted ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                >
                  {isAudioMuted ? <MicOff size={20} /> : <Mic size={20} />}
                </button>

                <button
                  onClick={() => setIsVideoOff(!isVideoOff)}
                  className={`p-3 rounded-full transition-colors ${isVideoOff ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                >
                  {isVideoOff ? <VideoOff size={20} /> : <Video size={20} />}
                </button>
              </div>
            </div>

            <div className="md:w-64 space-y-4 flex flex-col">
              <div className="flex-1 space-y-4">
                {meetingLink && (
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <h3 className="font-medium mb-2 text-sm">Share this invite</h3>
                    <div className="flex items-center bg-gray-900 rounded-md p-2">
                      <input
                        type="text"
                        readOnly
                        value={meetingLink}
                        className="flex-1 bg-transparent text-xs text-gray-300 outline-none truncate"
                      />
                      <button onClick={copyInviteLink} className="p-1 rounded-md hover:bg-gray-600 transition-colors" title="Copy link">
                        <Copy size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleJoinFromLobby}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 font-medium py-3 px-4 rounded-lg text-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Phone size={20} /> Join now
                </button>

                <button
                  onClick={() => setView('join_form')}
                  className="w-full border border-gray-600 text-gray-300 hover:bg-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- Meeting Room View ---
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header Bar */}
      <header className="px-6 py-3 flex justify-between items-center border-b border-gray-800">
        <div className="flex items-center gap-4">
          <div className="text-xl font-bold text-indigo-400">WE-CHAT</div>
          <div className="text-sm font-medium">{currentTime}</div>
          <div className="text-sm bg-gray-700 px-2 py-1 rounded-md">{meetingId}</div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
            title="Settings"
          >
            <Settings size={20} />
          </button>

          {showSettings && (
            <div className="absolute top-16 right-6 bg-gray-800 rounded-lg shadow-lg p-4 z-10 w-64">
              <h3 className="font-medium mb-3">Settings</h3>

              <div className="flex items-center justify-between mb-3">
                <span className="text-sm">Notifications</span>
                <button
                  onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                  className={`relative w-10 h-6 rounded-full transition-colors ${notificationsEnabled ? 'bg-indigo-600' : 'bg-gray-600'}`}
                >
                  <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${notificationsEnabled ? 'left-5' : 'left-1'}`}></span>
                </button>
              </div>

              <div className="text-xs text-gray-400 mt-4">
                Video quality is automatically adjusted based on your network connection.
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content - Video Grid */}
      <main className="flex-1 p-4 overflow-auto">
        <div className={`grid gap-4 ${layout === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
          {/* Local Video */}
          <ParticipantTile
            stream={isScreenSharing ? screenStream : localStream}
            participantId={userId}
            isLocal
            isMuted={isAudioMuted}
            isVideoOff={isVideoOff && !isScreenSharing}
            isSpeaking={activeSpeaker === userId}
            isScreenSharing={isScreenSharing}
          />

          {/* Remote Participants */}
          {Array.from(participants.entries()).map(([id, data]) => (
            <ParticipantTile
              key={id}
              stream={data.stream}
              participantId={id}
              isMuted={false}
              isVideoOff={false}
              isSpeaking={activeSpeaker === id}
              isScreenSharing={data.isScreenSharing}
            />
          ))}
        </div>
      </main>

      {/* Floating Control Bar */}
      <FloatingControlBar
        isAudioMuted={isAudioMuted}
        isVideoOff={isVideoOff}
        isScreenSharing={isScreenSharing}
        onToggleAudio={toggleAudio}
        onToggleVideo={toggleVideo}
        onToggleScreenShare={toggleScreenShare}
        onLeave={leaveMeeting}
        onInvite={copyInviteLink}
        participantCount={participants.size + 1}
      />

      {/* Layout Options (at bottom right) */}
      <div className="fixed right-6 bottom-24 flex flex-col gap-2">
        <button
          onClick={() => setLayout('grid')}
          className={`p-3 rounded-full transition-colors ${layout === 'grid' ? 'bg-indigo-600' : 'bg-gray-700 hover:bg-gray-600'}`}
          title="Grid view"
        >
          <Grid size={20} />
        </button>

        <button
          onClick={() => setLayout('speaker')}
          className={`p-3 rounded-full transition-colors ${layout === 'speaker' ? 'bg-indigo-600' : 'bg-gray-700 hover:bg-gray-600'}`}
          title="Speaker view"
        >
          <Monitor size={20} />
        </button>
      </div>
    </div>
  );
};

export default VideoMeetingApp;
