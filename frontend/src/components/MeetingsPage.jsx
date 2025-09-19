
// // import React, { useState, useEffect, useRef, useCallback } from 'react';
// // import {
// //   Mic, MicOff, Video, VideoOff, Phone, Copy, Users, MessageSquare,
// //   Clock, Share, Settings, Grid, UserPlus, Monitor, Cast,
// //   Airplay, MoreHorizontal, Bell, BellOff, ScreenShare, ScreenShareOff
// // } from 'lucide-react';

// // // Import the meeting service
// // import meetingService from '../services/meetingService';

// // // --- Floating Control Bar Component ---
// // const FloatingControlBar = ({ isAudioMuted, isVideoOff, isScreenSharing, onToggleAudio, onToggleVideo, onToggleScreenShare, onLeave, onInvite, participantCount }) => {
// //   const [isExpanded, setIsExpanded] = useState(true);

// //   return (
// //     <div className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-800 bg-opacity-90 rounded-full p-2 flex items-center transition-all duration-300 ${isExpanded ? 'w-auto px-4' : 'w-14'}`}>
// //       {isExpanded ? (
// //         <>
// //           <button
// //             onClick={onToggleAudio}
// //             className={`p-3 rounded-full mx-1 transition-colors ${isAudioMuted ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600'}`}
// //             title={isAudioMuted ? 'Unmute' : 'Mute'}
// //           >
// //             {isAudioMuted ? <MicOff size={20} /> : <Mic size={20} />}
// //           </button>

// //           <button
// //             onClick={onToggleVideo}
// //             className={`p-3 rounded-full mx-1 transition-colors ${isVideoOff ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600'}`}
// //             title={isVideoOff ? 'Turn on camera' : 'Turn off camera'}
// //           >
// //             {isVideoOff ? <VideoOff size={20} /> : <Video size={20} />}
// //           </button>

// //           <button
// //             onClick={onToggleScreenShare}
// //             className={`p-3 rounded-full mx-1 transition-colors ${isScreenSharing ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
// //             title={isScreenSharing ? 'Stop screen share' : 'Share screen'}
// //           >
// //             {isScreenSharing ? <ScreenShareOff size={20} /> : <ScreenShare size={20} />}
// //           </button>

// //           <button
// //             onClick={onInvite}
// //             className="p-3 rounded-full mx-1 bg-gray-700 hover:bg-gray-600 transition-colors"
// //             title="Invite people"
// //           >
// //             <UserPlus size={20} />
// //           </button>

// //           <div className="mx-2 h-6 w-px bg-gray-600"></div>

// //           <div className="text-white text-sm mx-2 flex items-center">
// //             <Users size={16} className="mr-1" />
// //             <span>{participantCount}</span>
// //           </div>

// //           <button
// //             onClick={onLeave}
// //             className="p-3 rounded-full mx-1 bg-red-600 hover:bg-red-700 transition-colors"
// //             title="Leave meeting"
// //           >
// //             <Phone size={20} />
// //           </button>
// //         </>
// //       ) : (
// //         <button
// //           onClick={() => setIsExpanded(true)}
// //           className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
// //           title="Show controls"
// //         >
// //           <MoreHorizontal size={20} />
// //         </button>
// //       )}

// //       <button
// //         onClick={() => setIsExpanded(!isExpanded)}
// //         className="absolute -top-8 left-1/2 transform -translate-x-1/2 p-1 bg-gray-800 bg-opacity-70 rounded-full"
// //       >
// //         <div className="w-8 h-1 bg-gray-500 rounded-full"></div>
// //       </button>
// //     </div>
// //   );
// // };

// // // --- Participant Tile Component ---
// // const ParticipantTile = ({ stream, participantId, isLocal, isMuted, isVideoOff, isSpeaking, isScreenSharing }) => {
// //   const videoRef = useRef(null);

// //   useEffect(() => {
// //     if (stream && videoRef.current) {
// //       videoRef.current.srcObject = stream;
// //     }
// //   }, [stream]);

// //   return (
// //     <div className={`bg-gray-800 rounded-xl overflow-hidden aspect-video relative shadow-lg flex items-center justify-center transition-all duration-300 ${isSpeaking ? 'ring-2 ring-blue-400' : ''}`}>
// //       <video
// //         ref={videoRef}
// //         autoPlay
// //         playsInline
// //         muted={isLocal}
// //         className={`w-full h-full object-cover transition-opacity duration-300 ${isVideoOff ? 'opacity-0' : 'opacity-100'}`}
// //       />

// //       {isVideoOff && (
// //         <div className="absolute w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center text-3xl font-bold">
// //           {participantId.charAt(0).toUpperCase()}
// //         </div>
// //       )}

// //       <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent flex items-center justify-between">
// //         <span className="text-white text-sm font-medium truncate">
// //           {participantId}{isLocal && ' (You)'}
// //           {isScreenSharing && <span className="ml-2 text-blue-300"><Monitor size={14} className="inline" /></span>}
// //         </span>

// //         <div className="flex items-center">
// //           {isMuted && (
// //             <div className="bg-black/50 p-1 rounded-full ml-2">
// //               <MicOff size={14} className="text-white" />
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // --- Main App Component ---
// // const VideoMeetingApp = () => {
// //   // --- State and Refs ---
// //   const [view, setView] = useState('join_form');
// //   const [userId, setUserId] = useState('');
// //   const [meetingId, setMeetingId] = useState('');
// //   const [meetingLink, setMeetingLink] = useState('');
// //   const [localStream, setLocalStream] = useState(null);
// //   const [screenStream, setScreenStream] = useState(null);
// //   const [participants, setParticipants] = useState(new Map());
// //   const [isAudioMuted, setIsAudioMuted] = useState(false);
// //   const [isVideoOff, setIsVideoOff] = useState(false);
// //   const [isScreenSharing, setIsScreenSharing] = useState(false);
// //   const [currentTime, setCurrentTime] = useState('');
// //   const [activeSpeaker, setActiveSpeaker] = useState(null);
// //   const [layout, setLayout] = useState('grid'); // 'grid', 'speaker', 'sidebar'
// //   const [showSettings, setShowSettings] = useState(false);
// //   const [notificationsEnabled, setNotificationsEnabled] = useState(true);

// //   const stompClientRef = useRef(null);
// //   const peerConnectionsRef = useRef(new Map());
// //   const localStreamRef = useRef(null);
// //   const screenStreamRef = useRef(null);
// //   const audioContextRef = useRef(null);
// //   const analyserRef = useRef(null);
// //   const speakingDetectionIntervalRef = useRef(null);

// //   // --- WebRTC and Signaling Logic ---
// //   const createPeerConnection = useCallback((remoteUserId) => {
// //     if (peerConnectionsRef.current.has(remoteUserId)) {
// //       peerConnectionsRef.current.get(remoteUserId).close();
// //     }

// //     const pc = new RTCPeerConnection({
// //       iceServers: [
// //         { urls: 'stun:stun.l.google.com:19302' },
// //         { urls: 'stun:stun1.l.google.com:19302' },
// //         { urls: 'stun:stun2.l.google.com:19302' }
// //       ]
// //     });

// //     pc.onicecandidate = (event) => {
// //       if (event.candidate) {
// //         meetingService.sendIceCandidate(
// //           stompClientRef.current, 
// //           meetingId, 
// //           event.candidate, 
// //           userId, 
// //           remoteUserId
// //         );
// //       }
// //     };

// //     pc.ontrack = (event) => {
// //       setParticipants(prev => {
// //         const newParticipants = new Map(prev);
// //         newParticipants.set(remoteUserId, {
// //           stream: event.streams[0],
// //           isSpeaking: false,
// //           isScreenSharing: false
// //         });
// //         return newParticipants;
// //       });
// //     };

// //     // Add local tracks
// //     const streamToSend = isScreenSharing && screenStreamRef.current ?
// //       screenStreamRef.current : localStreamRef.current;

// //     if (streamToSend) {
// //       streamToSend.getTracks().forEach(track => {
// //         pc.addTrack(track, streamToSend);
// //       });
// //     }

// //     peerConnectionsRef.current.set(remoteUserId, pc);
// //     return pc;
// //   }, [userId, meetingId, isScreenSharing]);

// //   const handleStompMessage = useCallback((message) => {
// //     const signal = JSON.parse(message.body);
// //     if (signal.senderId === userId) return;

// //     switch (signal.type) {
// //       case 'user_joined':
// //         const pc = createPeerConnection(signal.senderId);
// //         pc.createOffer()
// //           .then(offer => pc.setLocalDescription(offer))
// //           .then(() => {
// //             meetingService.sendOffer(
// //               stompClientRef.current,
// //               meetingId,
// //               pc.localDescription,
// //               userId,
// //               signal.senderId
// //             );
// //           })
// //           .catch(e => console.error("Error creating offer:", e));
// //         break;

// //       case 'user_left':
// //         if (peerConnectionsRef.current.has(signal.senderId)) {
// //           peerConnectionsRef.current.get(signal.senderId).close();
// //           peerConnectionsRef.current.delete(signal.senderId);
// //         }
// //         setParticipants(prev => {
// //           const newParticipants = new Map(prev);
// //           newParticipants.delete(signal.senderId);
// //           return newParticipants;
// //         });
// //         break;

// //       case 'offer':
// //         if (signal.receiverId === userId) {
// //           const peerConn = createPeerConnection(signal.senderId);
// //           peerConn.setRemoteDescription(new RTCSessionDescription(signal.offer))
// //             .then(() => peerConn.createAnswer())
// //             .then(answer => peerConn.setLocalDescription(answer))
// //             .then(() => {
// //               meetingService.sendAnswer(
// //                 stompClientRef.current,
// //                 meetingId,
// //                 peerConn.localDescription,
// //                 userId,
// //                 signal.senderId
// //               );
// //             })
// //             .catch(e => console.error("Error handling offer:", e));
// //         }
// //         break;

// //       case 'answer':
// //         if (signal.receiverId === userId) {
// //           const pc = peerConnectionsRef.current.get(signal.senderId);
// //           if (pc) pc.setRemoteDescription(new RTCSessionDescription(signal.answer));
// //         }
// //         break;

// //       case 'ice_candidate':
// //         if (signal.receiverId === userId) {
// //           const pc = peerConnectionsRef.current.get(signal.senderId);
// //           if (pc) pc.addIceCandidate(new RTCIceCandidate(signal.candidate));
// //         }
// //         break;

// //       case 'screen_sharing':
// //         setParticipants(prev => {
// //           const newParticipants = new Map(prev);
// //           const participant = newParticipants.get(signal.senderId);
// //           if (participant) {
// //             newParticipants.set(signal.senderId, {
// //               ...participant,
// //               isScreenSharing: signal.active
// //             });
// //           }
// //           return newParticipants;
// //         });
// //         break;

// //       default:
// //         break;
// //     }
// //   }, [userId, meetingId, createPeerConnection]);

// //   // --- Media Stream Functions ---
// //   const initLocalStream = async () => {
// //     try {
// //       const stream = await navigator.mediaDevices.getUserMedia({
// //         video: { width: 1280, height: 720 },
// //         audio: {
// //           echoCancellation: true,
// //           noiseSuppression: true,
// //           autoGainControl: true
// //         }
// //       });

// //       setLocalStream(stream);
// //       localStreamRef.current = stream;

// //       // Initialize audio context for speaking detection
// //       audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
// //       analyserRef.current = audioContextRef.current.createAnalyser();
// //       const source = audioContextRef.current.createMediaStreamSource(stream);
// //       source.connect(analyserRef.current);
// //       analyserRef.current.fftSize = 256;

// //       return stream;
// //     } catch (error) {
// //       console.error('Error accessing media devices:', error);
// //       alert('Could not access your camera and microphone. Please check permissions.');
// //       return null;
// //     }
// //   };

// //   const toggleScreenShare = async () => {
// //     try {
// //       if (isScreenSharing) {
// //         // Stop screen share
// //         if (screenStreamRef.current) {
// //           screenStreamRef.current.getTracks().forEach(track => track.stop());
// //         }
// //         setScreenStream(null);
// //         screenStreamRef.current = null;
// //         setIsScreenSharing(false);

// //         // Notify others
// //         meetingService.sendScreenSharingStatus(
// //           stompClientRef.current,
// //           meetingId,
// //           userId,
// //           false
// //         );
// //       } else {
// //         // Start screen share
// //         const screenStream = await navigator.mediaDevices.getDisplayMedia({
// //           video: true,
// //           audio: true
// //         });

// //         setScreenStream(screenStream);
// //         screenStreamRef.current = screenStream;
// //         setIsScreenSharing(true);

// //         // Notify others
// //         meetingService.sendScreenSharingStatus(
// //           stompClientRef.current,
// //           meetingId,
// //           userId,
// //           true
// //         );

// //         // Handle when user stops screen share using browser UI
// //         screenStream.getVideoTracks()[0].onended = () => {
// //           toggleScreenShare();
// //         };
// //       }

// //       // Update all peer connections with new stream
// //       peerConnectionsRef.current.forEach((pc, remoteUserId) => {
// //         // Remove all existing tracks
// //         pc.getSenders().forEach(sender => {
// //           if (sender.track.kind === 'video' || sender.track.kind === 'audio') {
// //             pc.removeTrack(sender);
// //           }
// //         });

// //         // Add new tracks
// //         const streamToSend = isScreenSharing ? localStreamRef.current : screenStreamRef.current;
// //         if (streamToSend) {
// //           streamToSend.getTracks().forEach(track => {
// //             pc.addTrack(track, streamToSend);
// //           });
// //         }

// //         // Create and send new offer
// //         pc.createOffer()
// //           .then(offer => pc.setLocalDescription(offer))
// //           .then(() => {
// //             meetingService.sendOffer(
// //               stompClientRef.current,
// //               meetingId,
// //               pc.localDescription,
// //               userId,
// //               remoteUserId
// //             );
// //           })
// //           .catch(e => console.error("Error renegotiating:", e));
// //       });
// //     } catch (error) {
// //       console.error('Error toggling screen share:', error);
// //     }
// //   };

// //   // --- UI Handlers ---
// //   const handleProceedToLobby = async (isCreating) => {
// //     if (!userId.trim()) return alert('Please enter your name');
// //     if (!isCreating && !meetingId.trim()) return alert('Please enter a meeting code');

// //     if (isCreating) {
// //       try {
// //         const result = await meetingService.createMeeting(userId);
// //         setMeetingId(result.meetingId);
// //         setMeetingLink(`${window.location.origin}/meeting/${result.meetingId}`);
// //       } catch (error) {
// //         return alert('Failed to create meeting. Please try again.');
// //       }
// //     } else {
// //       try {
// //         await meetingService.getMeeting(meetingId);
// //         // Set meeting link for joining as well
// //         setMeetingLink(`${window.location.origin}/meeting/${meetingId}`);
// //       } catch (error) {
// //         return alert('Failed to join meeting. Please check the meeting ID and try again.');
// //       }
// //     }

// //     if (await initLocalStream()) {
// //       setView('lobby');
// //     }
// //   };

// //   const handleJoinFromLobby = () => {
// //     if (localStreamRef.current) {
// //       localStreamRef.current.getAudioTracks()[0].enabled = !isAudioMuted;
// //       localStreamRef.current.getVideoTracks()[0].enabled = !isVideoOff;
// //     }

// //     meetingService.connectToWebSocket(
// //       userId, 
// //       meetingId, 
// //       handleStompMessage,
// //       (client) => {
// //         stompClientRef.current = client;
// //         // Start speaking detection
// //         startSpeakingDetection();

// //         // Notify others that we joined
// //         meetingService.sendUserJoined(client, meetingId, userId);
        
// //         setView('meeting_room');
// //       }
// //     );
// //   };

// //   const startSpeakingDetection = () => {
// //     if (!analyserRef.current) return;

// //     speakingDetectionIntervalRef.current = setInterval(() => {
// //       const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
// //       analyserRef.current.getByteFrequencyData(dataArray);

// //       let sum = 0;
// //       for (let i = 0; i < dataArray.length; i++) {
// //         sum += dataArray[i];
// //       }
// //       const average = sum / dataArray.length;

// //       // If volume is above threshold, user is speaking
// //       if (average > 50) {
// //         setActiveSpeaker(userId);
// //       }
// //     }, 500);
// //   };

// //   const leaveMeeting = () => {
// //     // Clear intervals
// //     if (speakingDetectionIntervalRef.current) {
// //       clearInterval(speakingDetectionIntervalRef.current);
// //     }

// //     // Notify others that we're leaving
// //     if (stompClientRef.current?.connected) {
// //       meetingService.sendUserLeft(stompClientRef.current, meetingId, userId);
// //     }

// //     // Close connections
// //     stompClientRef.current?.deactivate();
// //     peerConnectionsRef.current.forEach(pc => pc.close());
// //     peerConnectionsRef.current.clear();

// //     // Stop streams
// //     if (localStreamRef.current) {
// //       localStreamRef.current.getTracks().forEach(track => track.stop());
// //     }
// //     if (screenStreamRef.current) {
// //       screenStreamRef.current.getTracks().forEach(track => track.stop());
// //     }

// //     // Reset state
// //     localStreamRef.current = null;
// //     screenStreamRef.current = null;
// //     setLocalStream(null);
// //     setScreenStream(null);
// //     setParticipants(new Map());
// //     setMeetingId('');
// //     setMeetingLink('');
// //     setView('join_form');
// //     setIsScreenSharing(false);
// //   };

// //   const toggleAudio = () => {
// //     if (localStreamRef.current) {
// //       const audioTrack = localStreamRef.current.getAudioTracks()[0];
// //       audioTrack.enabled = !audioTrack.enabled;
// //       setIsAudioMuted(!audioTrack.enabled);
// //     }
// //   };

// //   const toggleVideo = () => {
// //     if (localStreamRef.current) {
// //       const videoTrack = localStreamRef.current.getVideoTracks()[0];
// //       videoTrack.enabled = !videoTrack.enabled;
// //       setIsVideoOff(!videoTrack.enabled);
// //     }
// //   };

// //   const copyInviteLink = () => {
// //     navigator.clipboard.writeText(meetingLink)
// //       .then(() => {
// //         if (notificationsEnabled) {
// //           // Show custom notification
// //           const notification = document.createElement('div');
// //           notification.className = 'fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-md shadow-lg z-50';
// //           notification.textContent = 'Invite link copied to clipboard!';
// //           document.body.appendChild(notification);

// //           setTimeout(() => {
// //             document.body.removeChild(notification);
// //           }, 3000);
// //         }
// //       });
// //   };

// //   // --- Effects ---
// //   useEffect(() => {
// //     const timer = setInterval(() => {
// //       setCurrentTime(new Date().toLocaleTimeString('en-US', {
// //         hour: '2-digit',
// //         minute: '2-digit',
// //         hour12: true
// //       }));
// //     }, 1000);

// //     return () => clearInterval(timer);
// //   }, []);

// //   // --- Render Logic ---
// //   if (view === 'join_form') {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-800 text-white flex flex-col items-center justify-center p-4">
// //         <div className="w-full max-w-md bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-2xl shadow-2xl p-8 space-y-6 border border-gray-700">
// //           <div className="text-center">
// //             <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
// //               WE-CHAT
// //             </h1>
// //             <p className="text-gray-300 mt-2">Premium video meetings. Made simple.</p>
// //           </div>

// //           <div className="space-y-4">
// //             <div>
// //               <label className="block text-sm font-medium text-gray-300 mb-1">Your Name</label>
// //               <input
// //                 type="text"
// //                 value={userId}
// //                 onChange={(e) => setUserId(e.target.value)}
// //                 className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
// //                 placeholder="Enter your name"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-300 mb-1">Meeting Code (to join)</label>
// //               <input
// //                 type="text"
// //                 value={meetingId}
// //                 onChange={(e) => setMeetingId(e.target.value.trim())}
// //                 className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
// //                 placeholder="Enter meeting code"
// //               />
// //             </div>
// //           </div>

// //           <div className="flex flex-col sm:flex-row gap-3">
// //             <button
// //               onClick={() => handleProceedToLobby(false)}
// //               disabled={!meetingId.trim() || !userId.trim()}
// //               className="flex-1 bg-indigo-600 hover:bg-indigo-700 font-medium py-3 px-4 rounded-lg transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center gap-2"
// //             >
// //               <Phone size={18} /> Join Meeting
// //             </button>

// //             <button
// //               onClick={() => handleProceedToLobby(true)}
// //               disabled={!userId.trim()}
// //               className="flex-1 border border-indigo-500 text-indigo-300 hover:bg-indigo-500 hover:text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center gap-2"
// //             >
// //               <UserPlus size={18} /> New Meeting
// //             </button>
// //           </div>

// //           <div className="text-center text-sm text-gray-400 mt-4">
// //             By joining, you agree to our Terms of Service and Privacy Policy.
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (view === 'lobby') {
// //     return (
// //       <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
// //         <div className="w-full max-w-4xl bg-gray-800 rounded-2xl overflow-hidden shadow-xl">
// //           <div className="p-6 border-b border-gray-700">
// //             <h1 className="text-2xl font-bold">Ready to join?</h1>
// //             <p className="text-gray-400">Preview your video and audio before joining</p>
// //           </div>

// //           <div className="p-6 flex flex-col md:flex-row gap-6">
// //             <div className="flex-1 bg-black rounded-xl overflow-hidden relative aspect-video">
// //               <video
// //                 ref={el => el && (el.srcObject = localStream)}
// //                 autoPlay
// //                 muted
// //                 playsInline
// //                 className={`w-full h-full object-cover ${isVideoOff ? 'hidden' : 'block'}`}
// //               />

// //               {isVideoOff && (
// //                 <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
// //                   <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center text-3xl font-bold">
// //                     {userId.charAt(0).toUpperCase()}
// //                   </div>
// //                 </div>
// //               )}

// //               <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
// //                 <button
// //                   onClick={() => setIsAudioMuted(!isAudioMuted)}
// //                   className={`p-3 rounded-full transition-colors ${isAudioMuted ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600'}`}
// //                 >
// //                   {isAudioMuted ? <MicOff size={20} /> : <Mic size={20} />}
// //                 </button>

// //                 <button
// //                   onClick={() => setIsVideoOff(!isVideoOff)}
// //                   className={`p-3 rounded-full transition-colors ${isVideoOff ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600'}`}
// //                 >
// //                   {isVideoOff ? <VideoOff size={20} /> : <Video size={20} />}
// //                 </button>
// //               </div>
// //             </div>

// //             <div className="md:w-64 space-y-4 flex flex-col">
// //               <div className="flex-1 space-y-4">
// //                 {meetingLink && (
// //                   <div className="bg-gray-700 p-3 rounded-lg">
// //                     <h3 className="font-medium mb-2 text-sm">Share this invite</h3>
// //                     <div className="flex items-center bg-gray-900 rounded-md p-2">
// //                       <input
// //                         type="text"
// //                         readOnly
// //                         value={meetingLink}
// //                         className="flex-1 bg-transparent text-xs text-gray-300 outline-none truncate"
// //                       />
// //                       <button onClick={copyInviteLink} className="p-1 rounded-md hover:bg-gray-600 transition-colors" title="Copy link">
// //                         <Copy size={16} />
// //                       </button>
// //                     </div>
// //                   </div>
// //                 )}
// //               </div>

// //               <div className="space-y-2">
// //                 <button
// //                   onClick={handleJoinFromLobby}
// //                   className="w-full bg-indigo-600 hover:bg-indigo-700 font-medium py-3 px-4 rounded-lg text-lg transition-colors flex items-center justify-center gap-2"
// //                 >
// //                   <Phone size={20} /> Join now
// //                 </button>

// //                 <button
// //                   onClick={() => setView('join_form')}
// //                   className="w-full border border-gray-600 text-gray-300 hover:bg-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
// //                 >
// //                   Cancel
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // --- Meeting Room View ---
// //   return (
// //     <div className="min-h-screen bg-gray-900 text-white flex flex-col">
// //       {/* Header Bar */}
// //       <header className="px-6 py-3 flex justify-between items-center border-b border-gray-800">
// //         <div className="flex items-center gap-4">
// //           <div className="text-xl font-bold text-indigo-400">WE-CHAT</div>
// //           <div className="text-sm font-medium">{currentTime}</div>
// //           <div className="text-sm bg-gray-700 px-2 py-1 rounded-md">{meetingId}</div>
// //         </div>

// //         <div className="flex items-center gap-3">
// //           <button
// //             onClick={() => setShowSettings(!showSettings)}
// //             className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
// //             title="Settings"
// //           >
// //             <Settings size={20} />
// //           </button>

// //           {showSettings && (
// //             <div className="absolute top-16 right-6 bg-gray-800 rounded-lg shadow-lg p-4 z-10 w-64">
// //               <h3 className="font-medium mb-3">Settings</h3>

// //               <div className="flex items-center justify-between mb-3">
// //                 <span className="text-sm">Notifications</span>
// //                 <button
// //                   onClick={() => setNotificationsEnabled(!notificationsEnabled)}
// //                   className={`relative w-10 h-6 rounded-full transition-colors ${notificationsEnabled ? 'bg-indigo-600' : 'bg-gray-600'}`}
// //                 >
// //                   <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${notificationsEnabled ? 'left-5' : 'left-1'}`}></span>
// //                 </button>
// //               </div>

// //               <div className="text-xs text-gray-400 mt-4">
// //                 Video quality is automatically adjusted based on your network connection.
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </header>

// //       {/* Main Content - Video Grid */}
// //       <main className="flex-1 p-4 overflow-auto">
// //         <div className={`grid gap-4 ${layout === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
// //           {/* Local Video */}
// //           <ParticipantTile
// //             stream={isScreenSharing ? screenStream : localStream}
// //             participantId={userId}
// //             isLocal
// //             isMuted={isAudioMuted}
// //             isVideoOff={isVideoOff && !isScreenSharing}
// //             isSpeaking={activeSpeaker === userId}
// //             isScreenSharing={isScreenSharing}
// //           />

// //           {/* Remote Participants */}
// //           {Array.from(participants.entries()).map(([id, data]) => (
// //             <ParticipantTile
// //               key={id}
// //               stream={data.stream}
// //               participantId={id}
// //               isMuted={false}
// //               isVideoOff={false}
// //               isSpeaking={activeSpeaker === id}
// //               isScreenSharing={data.isScreenSharing}
// //             />
// //           ))}
// //         </div>
// //       </main>

// //       {/* Floating Control Bar */}
// //       <FloatingControlBar
// //         isAudioMuted={isAudioMuted}
// //         isVideoOff={isVideoOff}
// //         isScreenSharing={isScreenSharing}
// //         onToggleAudio={toggleAudio}
// //         onToggleVideo={toggleVideo}
// //         onToggleScreenShare={toggleScreenShare}
// //         onLeave={leaveMeeting}
// //         onInvite={copyInviteLink}
// //         participantCount={participants.size + 1}
// //       />

// //       {/* Layout Options (at bottom right) */}
// //       <div className="fixed right-6 bottom-24 flex flex-col gap-2">
// //         <button
// //           onClick={() => setLayout('grid')}
// //           className={`p-3 rounded-full transition-colors ${layout === 'grid' ? 'bg-indigo-600' : 'bg-gray-700 hover:bg-gray-600'}`}
// //           title="Grid view"
// //         >
// //           <Grid size={20} />
// //         </button>

// //         <button
// //           onClick={() => setLayout('speaker')}
// //           className={`p-3 rounded-full transition-colors ${layout === 'speaker' ? 'bg-indigo-600' : 'bg-gray-700 hover:bg-gray-600'}`}
// //           title="Speaker view"
// //         >
// //           <Monitor size={20} />
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default VideoMeetingApp;

// import React, { useEffect, useRef, useState } from "react";
// import { Client } from "@stomp/stompjs";
// import SockJS from "sockjs-client";
// import { useAuth } from "../contexts/AuthContext";

// // Backend config
// const BACKEND = "http://localhost:8080";
// const API_CREATE = `${BACKEND}/api/meetings/create`;
// const WS_ENDPOINT = `${BACKEND}/ws`;
// const API_GET_PARTICIPANTS = `${BACKEND}/api/meetings`; // ADDED: API to fetch participants

// // STUN servers
// const ICE_CONFIG = {
//   iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
// };

// export default function App() {
//   const { currentUser } = useAuth();
//   if (!currentUser) {
//     return <div>Please login (AuthProvider required) to use meetings.</div>;
//   }
//   const userId = currentUser.id;
//   const userName = currentUser.name || "Unnamed";

//   const [meetingIdInput, setMeetingIdInput] = useState("");
//   const [meetingId, setMeetingId] = useState(null);
//   const [meetingLink, setMeetingLink] = useState("");
//   const [joined, setJoined] = useState(false);
//   const [participants, setParticipants] = useState([]);
//   const [remoteStreams, setRemoteStreams] = useState({});

//   const [chatInput, setChatInput] = useState("");
//   const [messages, setMessages] = useState([]);

//   // refs for media, connections, stomp
//   const localVideoRef = useRef(null);
//   const localStreamRef = useRef(null);
//   const peersRef = useRef({});
//   const remoteStreamsRef = useRef({});
//   const stompRef = useRef(null);

//   // Debug logging
//   useEffect(() => {
//     console.log("Participants updated:", participants);
//   }, [participants]);

//   useEffect(() => {
//     console.log("Remote streams updated:", remoteStreams);
//   }, [remoteStreams]);

//   // ADDED: Function to fetch participants from backend
//   const fetchParticipants = async (meetingId) => {
//     try {
//       const response = await fetch(`${API_GET_PARTICIPANTS}/${meetingId}/participants`);
//       if (response.ok) {
//         const participantsData = await response.json();
//         console.log("Fetched participants:", participantsData);
//         setParticipants(participantsData);
//       }
//     } catch (error) {
//       console.error("Error fetching participants:", error);
//     }
//   };

//   // helper: create stomp client if not exists
//   const ensureStomp = () => {
//     if (stompRef.current && stompRef.current.connected) return stompRef.current;

//     const sock = new SockJS(WS_ENDPOINT);
//     const client = new Client({
//       webSocketFactory: () => sock,
//       reconnectDelay: 5000,
//       debug: (m) => console.log("STOMP:", m)
//     });

//     client.onConnect = () => {
//       console.log("STOMP connected");
//     };

//     client.onStompError = (frame) => {
//       console.error("Broker error:", frame);
//     };

//     client.activate();
//     stompRef.current = client;
//     return client;
//   };

//   // Create meeting via backend and auto-join
//   const handleCreateMeeting = async () => {
//     try {
//       const res = await fetch(`${API_CREATE}?userId=${encodeURIComponent(userId)}`, {
//         method: "POST"
//       });
//       if (!res.ok) throw new Error("Create meeting failed");
//       const body = await res.json();
//       const id = body.meetingId || body.id;
//       setMeetingId(id);
//       setMeetingLink(body.meetingLink || `${window.location.origin}/meeting/${id}`);
//       // Auto-join
//       setTimeout(() => joinMeeting(id), 200);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to create meeting: " + err.message);
//     }
//   };

//   // Join meeting by id
//   const joinMeeting = async (idArg) => {
//     const id = idArg || meetingIdInput || meetingId;
//     if (!id) { alert("Meeting ID required"); return; }
//     setMeetingId(id);

//     // 1) get local media
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//       localStreamRef.current = stream;
//       if (localVideoRef.current) localVideoRef.current.srcObject = stream;
//     } catch (err) {
//       console.error("getUserMedia failed", err);
//       alert("Could not access camera/microphone: " + err.message);
//       return;
//     }

//     // 2) create STOMP connection & subscribe
//     const stomp = ensureStomp();

//     // wait until connected before subscribing/publishing
//     const waitConnect = () => new Promise((resolve) => {
//       if (stomp.connected) return resolve();
//       const idListener = setInterval(() => {
//         if (stomp && stomp.connected) {
//           clearInterval(idListener);
//           resolve();
//         }
//       }, 200);
//     });

//     await waitConnect();

//     // 3) Fetch current participants first
//     await fetchParticipants(id);

//     // 4) subscribe to meeting topic
//     stomp.subscribe(`/topic/webrtc/meeting/${id}`, (msg) => {
//       try {
//         const payload = JSON.parse(msg.body);
//         console.log("Received WebRTC signal:", payload);
//         handleIncomingSignal(payload);
//       } catch (e) {
//         console.error("error parsing message", e);
//       }
//     });

//     // subscribe to chat messages
//     stomp.subscribe("/topic/chat-messages", (msg) => {
//       try {
//         const body = JSON.parse(msg.body);
//         setMessages((m) => [...m, body]);
//       } catch (e) { console.error(e); }
//     });

//     // Try multiple subscription patterns for participant updates
//     const subscriptionPatterns = [
//       `/topic/meeting/${id}/participants`,
//       `/topic/meeting/${id}`,
//       `/topic/participants/${id}`,
//       `/user/topic/meeting/participants`
//     ];

//     subscriptionPatterns.forEach(pattern => {
//       stomp.subscribe(pattern, (msg) => {
//         try {
//           const payload = JSON.parse(msg.body);
//           console.log(`Received message on ${pattern}:`, payload);
//           handleParticipantUpdate(payload);
//         } catch (e) {
//           console.error(`error parsing message from ${pattern}`, e);
//         }
//       });
//     });

//     // 5) announce join
//     stomp.publish({
//       destination: `/app/meeting/${id}/join`,
//       body: JSON.stringify({
//         type: "join",
//         senderId: userId,
//         senderName: userName,
//         contextType: "meeting",
//         contextId: id
//       })
//     });

//     setJoined(true);
//   };

//   // Handle participant updates
//   const handleParticipantUpdate = (payload) => {
//     console.log("Raw participant update:", payload);
    
//     // Try to extract participants from different payload formats
//     let participantsList = [];
    
//     if (Array.isArray(payload)) {
//       participantsList = payload;
//     } else if (payload.participants && Array.isArray(payload.participants)) {
//       participantsList = payload.participants;
//     } else if (payload.participantList && Array.isArray(payload.participantList)) {
//       participantsList = payload.participantList;
//     } else if (payload.participantsWithNames && Array.isArray(payload.participantsWithNames)) {
//       participantsList = payload.participantsWithNames;
//     } else if (payload.data && Array.isArray(payload.data)) {
//       participantsList = payload.data;
//     } else if (payload.action === "join" || payload.action === "leave") {
//       // If it's a join/leave action, refetch the full list
//       fetchParticipants(meetingId);
//       return;
//     }
    
//     // Filter out duplicates and ensure proper format
//     const uniqueParticipants = participantsList.reduce((acc, participant) => {
//       const id = participant.id || participant.userId || participant.senderId;
//       if (id && !acc.find(p => (p.id || p.userId || p.senderId) === id)) {
//         acc.push({
//           id: id,
//           name: participant.name || participant.userName || participant.senderName || "Unknown"
//         });
//       }
//       return acc;
//     }, []);
    
//     if (uniqueParticipants.length > 0) {
//       console.log("Setting participants:", uniqueParticipants);
//       setParticipants(uniqueParticipants);
//     }
//   };

//   // Leave meeting
//   const leaveMeeting = () => {
//     if (!meetingId) return;
//     const stomp = stompRef.current;
//     if (stomp && stomp.connected) {
//       stomp.publish({
//         destination: `/app/meeting/${meetingId}/leave`,
//         body: JSON.stringify({
//           type: "leave",
//           senderId: userId,
//           senderName: userName,
//           contextType: "meeting",
//           contextId: meetingId
//         })
//       });
//     }

//     // close connections & stop tracks
//     Object.values(peersRef.current).forEach(pc => {
//       try { pc.close(); } catch (e) {}
//     });
//     peersRef.current = {};
//     remoteStreamsRef.current = {};
//     setParticipants([]);
//     setRemoteStreams({});
//     setJoined(false);
//     setMeetingId(null);
//     setMeetingLink("");
//     setMessages([]);
    
//     if (localStreamRef.current) {
//       localStreamRef.current.getTracks().forEach(t => t.stop());
//       localStreamRef.current = null;
//     }
//   };

//   // Send chat message
//   const sendChat = () => {
//     if (!chatInput.trim()) return;
//     const stomp = stompRef.current;
//     if (!stomp || !stomp.connected) return;
//     const payload = {
//       senderId: userId,
//       senderName: userName,
//       content: chatInput,
//       timestamp: Date.now()
//     };
//     stomp.publish({
//       destination: "/app/chat-message",
//       body: JSON.stringify(payload)
//     });
//     setChatInput("");
//     setMessages((m) => [...m, payload]);
//   };

//   // Create RTCPeerConnection for a remote peer
//   const createPeerFor = async (remoteId, doCreateOffer = false) => {
//     if (peersRef.current[remoteId]) return peersRef.current[remoteId];

//     const pc = new RTCPeerConnection(ICE_CONFIG);

//     // add local tracks
//     if (localStreamRef.current) {
//       localStreamRef.current.getTracks().forEach(track => pc.addTrack(track, localStreamRef.current));
//     }

//     pc.ontrack = (event) => {
//       remoteStreamsRef.current[remoteId] = event.streams[0];
//       setRemoteStreams({...remoteStreamsRef.current});
//     };

//     pc.onicecandidate = (event) => {
//       if (event.candidate) {
//         const candidateStr = JSON.stringify(event.candidate);
//         const signal = {
//           type: "candidate",
//           senderId: userId,
//           receiverId: remoteId,
//           candidate: candidateStr,
//           contextType: "meeting",
//           contextId: meetingId
//         };
//         publishSignal(signal);
//       }
//     };

//     pc.onconnectionstatechange = () => {
//       console.log(`Connection state with ${remoteId}: ${pc.connectionState}`);
//       if (pc.connectionState === "failed" || pc.connectionState === "disconnected" || pc.connectionState === "closed") {
//         if (peersRef.current[remoteId]) {
//           try { peersRef.current[remoteId].close(); } catch (e) {}
//           delete peersRef.current[remoteId];
//         }
//         if (remoteStreamsRef.current[remoteId]) {
//           delete remoteStreamsRef.current[remoteId];
//           setRemoteStreams({...remoteStreamsRef.current});
//         }
//       }
//     };

//     peersRef.current[remoteId] = pc;

//     if (doCreateOffer) {
//       try {
//         const offer = await pc.createOffer();
//         await pc.setLocalDescription(offer);
//         const signal = {
//           type: "offer",
//           senderId: userId,
//           receiverId: remoteId,
//           sdp: pc.localDescription.sdp,
//           contextType: "meeting",
//           contextId: meetingId
//         };
//         publishSignal(signal);
//       } catch (err) {
//         console.error("Failed to create/send offer", err);
//       }
//     }

//     return pc;
//   };

//   // publish signaling message
//   const publishSignal = (signalObj) => {
//     const stomp = stompRef.current;
//     if (!stomp || !stomp.connected) {
//       console.warn("STOMP not connected yet, dropping signal", signalObj);
//       return;
//     }
//     signalObj.contextType = "meeting";
//     signalObj.contextId = meetingId;
//     stomp.publish({
//       destination: `/app/webrtc/meeting/${meetingId}`,
//       body: JSON.stringify(signalObj)
//     });
//   };

//   // handle incoming messages
//   const handleIncomingSignal = async (payload) => {
//     console.log("Processing signal:", payload);
    
//     // Check if this is a participant update
//     if (payload.participants !== undefined || payload.participantList !== undefined || 
//         payload.action === "join" || payload.action === "leave") {
//       handleParticipantUpdate(payload);
//       return;
//     }

//     const t = payload.type;
//     const sender = payload.senderId;
//     const receiver = payload.receiverId;

//     if (!t || !sender) return;
//     if (receiver && receiver !== userId) return;

//     try {
//       if (t === "offer") {
//         const pc = await createPeerFor(sender, false);
//         const desc = { type: "offer", sdp: payload.sdp };
//         await pc.setRemoteDescription(desc);
//         const answer = await pc.createAnswer();
//         await pc.setLocalDescription(answer);

//         publishSignal({
//           type: "answer",
//           senderId: userId,
//           receiverId: sender,
//           sdp: pc.localDescription.sdp
//         });

//       } else if (t === "answer") {
//         const pc = peersRef.current[sender];
//         if (pc) {
//           const desc = { type: "answer", sdp: payload.sdp };
//           await pc.setRemoteDescription(desc);
//         }
//       } else if (t === "candidate") {
//         const pc = peersRef.current[sender] || await createPeerFor(sender, false);
//         if (payload.candidate) {
//           try {
//             const candObj = typeof payload.candidate === "string" 
//               ? JSON.parse(payload.candidate) 
//               : payload.candidate;
//             await pc.addIceCandidate(new RTCIceCandidate(candObj));
//           } catch (err) {
//             console.error("addIceCandidate error", err);
//           }
//         }
//       }
//     } catch (err) {
//       console.error("Error handling signal:", err);
//     }
//   };

//   // helper UI: show participant names
//   const renderParticipants = () => {
//     if (!participants || participants.length === 0) return <div>No participants yet</div>;
//     return (
//       <ul>
//         {participants.map((p) => (
//           <li key={p.id}>{p.name || p.id}{p.id === userId ? " (you)" : ""}</li>
//         ))}
//       </ul>
//     );
//   };

//   // Render remote videos
//   const RemoteVideoGrid = () => {
//     const entries = Object.entries(remoteStreams);
//     return (
//       <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
//         {entries.map(([peerId, stream]) => (
//           <RemoteVideo key={peerId} peerId={peerId} stream={stream} />
//         ))}
//       </div>
//     );
//   };

//   function RemoteVideo({ peerId, stream }) {
//     const ref = useRef(null);
//     useEffect(() => {
//       if (ref.current && stream) ref.current.srcObject = stream;
//     }, [stream]);
    
//     const participant = participants.find(p => p.id === peerId);
//     const displayName = participant ? participant.name : peerId;
    
//     return (
//       <div style={{ width: 260 }}>
//         <div style={{ fontSize: 12, marginBottom: 4 }}>{displayName}</div>
//         <video ref={ref} autoPlay playsInline style={{ width: "100%", background: "#000" }} />
//       </div>
//     );
//   }

//   // Manual refresh button
//   const refreshParticipants = () => {
//     if (meetingId) {
//       fetchParticipants(meetingId);
//     }
//   };

//   // cleanup on unmount
//   useEffect(() => {
//     return () => {
//       try { leaveMeeting(); } catch (e) {}
//       if (stompRef.current) {
//         try { stompRef.current.deactivate(); } catch (e) {}
//         stompRef.current = null;
//       }
//     };
//   }, []);

//   return (
//     <div style={{ padding: 18 }}>
//       <h2>Meetings (dynamic user from Auth)</h2>
//       <div>
//         <strong>User:</strong> {userName} ({userId})
//       </div>

//       <div style={{ marginTop: 12 }}>
//         <button onClick={handleCreateMeeting}>Create Meeting</button>
//         {meetingLink && <span style={{ marginLeft: 12 }}>Link: <code>{meetingLink}</code></span>}
//       </div>

//       <div style={{ marginTop: 12 }}>
//         <input
//           placeholder="Meeting ID to join (or use created)"
//           value={meetingIdInput}
//           onChange={(e) => setMeetingIdInput(e.target.value)}
//           style={{ width: 260 }}
//         />
//         <button onClick={() => joinMeeting(meetingIdInput || meetingId)} style={{ marginLeft: 8 }}>
//           Join
//         </button>
//         <button onClick={leaveMeeting} style={{ marginLeft: 8 }} disabled={!joined}>
//           Leave
//         </button>
//         <button onClick={refreshParticipants} style={{ marginLeft: 8 }} disabled={!joined}>
//           Refresh Participants
//         </button>
//       </div>

//       <div style={{ display: "flex", gap: 20, marginTop: 18 }}>
//         <div>
//           <h4>Local</h4>
//           <video ref={localVideoRef} autoPlay muted playsInline style={{ width: 320, background: "#000" }} />
//         </div>

//         <div style={{ minWidth: 320 }}>
//           <h4>Participants ({participants.length})</h4>
//           {renderParticipants()}
//         </div>
//       </div>

//       <div style={{ marginTop: 18 }}>
//         <h4>Remote streams ({Object.keys(remoteStreams).length})</h4>
//         <RemoteVideoGrid />
//       </div>

//       <div style={{ marginTop: 18 }}>
//         <h4>Chat</h4>
//         <div style={{ border: "1px solid #ddd", padding: 8, height: 160, overflowY: "auto" }}>
//           {messages.map((m, i) => (
//             <div key={i}><strong>{m.senderName || m.senderId}:</strong> {m.content}</div>
//           ))}
//         </div>
//         <div style={{ marginTop: 8 }}>
//           <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Message" style={{ width: 360 }} />
//           <button onClick={sendChat} style={{ marginLeft: 8 }}>Send</button>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useAuth } from "../contexts/AuthContext";

const BACKEND = "http://localhost:8080";
const API_CREATE = `${BACKEND}/api/meetings/create`;
const WS_ENDPOINT = `${BACKEND}/ws`;
const ICE_CONFIG = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };

export default function Meetings() {
  const { currentUser } = useAuth();
  if (!currentUser) return <div>Please login to access meetings</div>;

  const userId = currentUser.id;
  const userName = currentUser.name || "Unnamed";

  const [meetingId, setMeetingId] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [joined, setJoined] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [remoteStreams, setRemoteStreams] = useState({});

  const localVideoRef = useRef(null);
  const localStreamRef = useRef(null);
  const peersRef = useRef({});
  const remoteStreamsRef = useRef({});
  const stompRef = useRef(null);

  // -------------------- STOMP --------------------
  const ensureStomp = () => {
    if (stompRef.current && stompRef.current.connected) return stompRef.current;

    const sock = new SockJS(WS_ENDPOINT);
    const client = new Client({
      webSocketFactory: () => sock,
      reconnectDelay: 5000,
      debug: (msg) => console.log("STOMP:", msg),
    });

    client.onConnect = () => console.log("STOMP connected");
    client.onStompError = (frame) => console.error("Broker error:", frame);
    client.activate();
    stompRef.current = client;
    return client;
  };

  // -------------------- PARTICIPANT UPDATES --------------------
  const handleParticipantUpdate = (payload) => {
    if (payload.participants && Array.isArray(payload.participants)) {
      setParticipants(payload.participants);
      payload.participants.forEach((p) => {
        if (p.id !== userId && !peersRef.current[p.id]) {
          createPeerFor(p.id, true);
        }
      });
    } else if (payload.type && payload.participant) {
      setParticipants((prev) => {
        if (payload.type === "join") {
          if (!prev.find((p) => p.id === payload.participant.id)) {
            if (payload.participant.id !== userId) createPeerFor(payload.participant.id, true);
            return [...prev, payload.participant];
          }
        } else if (payload.type === "leave") {
          if (peersRef.current[payload.participant.id]) {
            peersRef.current[payload.participant.id].close();
            delete peersRef.current[payload.participant.id];
            delete remoteStreamsRef.current[payload.participant.id];
            setRemoteStreams({ ...remoteStreamsRef.current });
          }
          return prev.filter((p) => p.id !== payload.participant.id);
        }
        return prev;
      });
    }
  };

  // -------------------- CREATE / JOIN MEETING --------------------
  const handleCreateMeeting = async () => {
    try {
      const res = await fetch(`${API_CREATE}?userId=${encodeURIComponent(userId)}`, { method: "POST" });
      const body = await res.json();
      const id = body.meetingId;
      setMeetingId(id);
      setMeetingLink(body.meetingLink);
      setTimeout(() => joinMeeting(id), 200);
    } catch (err) {
      console.error(err);
      alert("Failed to create meeting: " + err.message);
    }
  };

  const joinMeeting = async (idArg) => {
    const id = idArg || meetingId;
    if (!id) return alert("Meeting ID required");
    setMeetingId(id);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localStreamRef.current = stream;
      if (localVideoRef.current) localVideoRef.current.srcObject = stream;
    } catch (err) {
      return alert("Could not access camera/microphone: " + err.message);
    }

    const stomp = ensureStomp();
    await new Promise((resolve) => {
      if (stomp.connected) return resolve();
      const interval = setInterval(() => { if (stomp.connected) { clearInterval(interval); resolve(); } }, 200);
    });

    // Subscribe to meeting topic
    stomp.subscribe(`/topic/webrtc/meeting/${id}`, (msg) => {
      try {
        const payload = JSON.parse(msg.body);
        if (payload.senderId && payload.type) handleSignal(payload);
        else handleParticipantUpdate(payload);
      } catch (e) { console.error(e); }
    });

    // announce join
    stomp.publish({
      destination: `/app/meeting/${id}/join`,
      body: JSON.stringify({ senderId: userId, type: "join", contextType: "meeting", contextId: id }),
    });

    setJoined(true);
  };

  // -------------------- PEER CONNECTION --------------------
  const createPeerFor = async (remoteId, doOffer = false) => {
    if (peersRef.current[remoteId]) return peersRef.current[remoteId];
    const pc = new RTCPeerConnection(ICE_CONFIG);

    localStreamRef.current?.getTracks().forEach((track) => pc.addTrack(track, localStreamRef.current));

    pc.ontrack = (event) => {
      remoteStreamsRef.current[remoteId] = event.streams[0];
      setRemoteStreams({ ...remoteStreamsRef.current });
    };

    pc.onicecandidate = (event) => {
      if (event.candidate) publishSignal({
        type: "candidate",
        senderId: userId,
        receiverId: remoteId,
        candidate: JSON.stringify(event.candidate),
      });
    };

    pc.onconnectionstatechange = () => {
      if (["disconnected", "failed", "closed"].includes(pc.connectionState)) {
        delete peersRef.current[remoteId];
        delete remoteStreamsRef.current[remoteId];
        setRemoteStreams({ ...remoteStreamsRef.current });
      }
    };

    peersRef.current[remoteId] = pc;

    if (doOffer) {
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      publishSignal({
        type: "offer",
        senderId: userId,
        receiverId: remoteId,
        sdp: pc.localDescription.sdp,
      });
    }

    return pc;
  };

  // -------------------- SIGNALING --------------------
  const publishSignal = (signal) => {
    const stomp = stompRef.current;
    if (!stomp?.connected) return;
    signal.contextType = "meeting";
    signal.contextId = meetingId;
    stomp.publish({ destination: `/app/webrtc/meeting/${meetingId}`, body: JSON.stringify(signal) });
  };

  const handleSignal = async (payload) => {
    const { type, senderId, receiverId, sdp, candidate } = payload;
    if (senderId === userId) return;
    if (receiverId && receiverId !== userId) return;

    const pc = await createPeerFor(senderId, type === "offer" ? false : false);

    try {
      if (type === "offer") {
        await pc.setRemoteDescription({ type: "offer", sdp });
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        publishSignal({ type: "answer", senderId: userId, receiverId: senderId, sdp: answer.sdp });
      } else if (type === "answer") {
        await pc.setRemoteDescription({ type: "answer", sdp });
      } else if (type === "candidate") {
        if (candidate) await pc.addIceCandidate(new RTCIceCandidate(JSON.parse(candidate)));
      }
    } catch (err) {
      console.error("Signal handling error", err);
    }
  };

  // -------------------- LEAVE --------------------
  const leaveMeeting = () => {
    const stomp = stompRef.current;
    if (stomp?.connected) {
      stomp.publish({
        destination: `/app/meeting/${meetingId}/leave`,
        body: JSON.stringify({ senderId: userId, type: "leave", contextType: "meeting", contextId: meetingId }),
      });
    }

    Object.values(peersRef.current).forEach((pc) => pc.close());
    peersRef.current = {};
    remoteStreamsRef.current = {};
    setRemoteStreams({});
    setParticipants([]);
    setJoined(false);
    setMeetingId("");
    setMeetingLink("");
    if (localStreamRef.current) localStreamRef.current.getTracks().forEach((t) => t.stop());
    localStreamRef.current = null;
  };

  // -------------------- UI --------------------
  return (
    <div style={{ padding: 20 }}>
      <h2>Meetings</h2>
      <div>User: {userName}</div>
      <button onClick={handleCreateMeeting}>Create Meeting</button>
      {meetingLink && <span> Link: {meetingLink}</span>}
      <div style={{ marginTop: 12 }}>
        <input value={meetingId} onChange={(e) => setMeetingId(e.target.value)} placeholder="Meeting ID" />
        <button onClick={() => joinMeeting(meetingId)}>Join</button>
        <button onClick={leaveMeeting} disabled={!joined}>Leave</button>
      </div>

      <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
        <div>
          <h4>Local</h4>
          <video ref={localVideoRef} autoPlay muted playsInline style={{ width: 300, background: "#000" }} />
        </div>
        <div>
          <h4>Participants ({participants.length})</h4>
          <ul>
            {participants.map((p) => (
              <li key={p.id}>{p.name || p.id} {p.id === userId ? "(you)" : ""}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Remote Videos</h4>
          {Object.entries(remoteStreams).map(([id, stream]) => (
            <video key={id} autoPlay playsInline ref={(el) => { if (el) el.srcObject = stream; }} style={{ width: 300, background: "#000" }} />
          ))}
        </div>
      </div>
    </div>
  );
}
