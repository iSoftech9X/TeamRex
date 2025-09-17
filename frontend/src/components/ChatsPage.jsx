
// // // import React, { useEffect, useState, useRef, useCallback } from 'react';
// // // import {
// // //   MessageCircle, Search, Send, LogOut, Phone, Video, Paperclip, Loader2,
// // //   RefreshCw, AlertCircle, User, Users, Check, CheckCheck, Edit3, Trash2, X, CheckCircle,
// // //   MoreVertical, Smile, Mic
// // // } from 'lucide-react';
// // // import { useAuth } from '../contexts/AuthContext';
// // // import { searchUsers } from '../services/authService';
// // // import {
// // //   // fetchConversations has been removed as requested
// // //   fetchMessages,
// // //   sendMessageApi,
// // //   markAsSeen,
// // //   markAsDelivered,
// // //   deleteMessageApi,
// // //   editMessageApi
// // // } from '../services/chatService';
// // // import {
// // //   connectWebSocket,
// // //   sendWebSocketMessage,
// // //   disconnectWebSocket
// // // } from '../services/websocketService';

// // // // Import message sound
// // // import messageSound from './../../asserts/sounds/message.mp3';

// // // const ChatsPage = () => {
// // //   const { currentUser, logout } = useAuth();
// // //   const messagesEndRef = useRef(null);
// // //   const messageInputRef = useRef(null);
// // //   const messageSoundRef = useRef(null);
// // //   const [isInitialLoad, setIsInitialLoad] = useState(true);

// // //   const [selectedChat, setSelectedChat] = useState(null);
// // //   const [message, setMessage] = useState('');
// // //   const [messages, setMessages] = useState([]);
  
// // //   // UPDATED: Chats are now initialized from localStorage to persist after a refresh
// // //   const [chats, setChats] = useState(() => {
// // //     try {
// // //       const savedChats = localStorage.getItem('chats');
// // //       if (savedChats) {
// // //         return JSON.parse(savedChats);
// // //       }
// // //     } catch (error) {
// // //       console.error('Failed to parse chats from localStorage', error);
// // //     }
// // //     return []; // Default to an empty array if nothing is saved
// // //   });

// // //   const [searchQuery, setSearchQuery] = useState('');
  
// // //   const [allUsers, setAllUsers] = useState([]);
// // //   const [usersLoaded, setUsersLoaded] = useState(false);

// // //   const [loading, setLoading] = useState({
// // //     chats: false,
// // //     messages: false,
// // //     users: false
// // //   });
// // //   const [errors, setErrors] = useState({
// // //     chats: null,
// // //     messages: null,
// // //     send: null,
// // //     users: null
// // //   });
// // //   const [sending, setSending] = useState(false);
// // //   const [connectionStatus, setConnectionStatus] = useState('disconnected');
// // //   const [activeTab, setActiveTab] = useState('chats');
// // //   const [editingMessage, setEditingMessage] = useState(null);
// // //   const [editContent, setEditContent] = useState('');
// // //   const [isHoveringMessage, setIsHoveringMessage] = useState(null);
  
// // //   const selectedChatRef = useRef(selectedChat);
// // //   useEffect(() => {
// // //     selectedChatRef.current = selectedChat;
// // //   }, [selectedChat]);

// // //   const allUsersRef = useRef(allUsers);
// // //   useEffect(() => {
// // //     allUsersRef.current = allUsers;
// // //   }, [allUsers]);

// // //   // NEW: This effect saves the chats to localStorage whenever they change
// // //   useEffect(() => {
// // //     try {
// // //       localStorage.setItem('chats', JSON.stringify(chats));
// // //     } catch (error) {
// // //       console.error('Failed to save chats to localStorage', error);
// // //     }
// // //   }, [chats]);

// // //   useEffect(() => {
// // //     messageSoundRef.current = new Audio(messageSound);
// // //     messageSoundRef.current.volume = 0.3;
// // //   }, []);

// // //   const scrollToBottom = useCallback(() => {
// // //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// // //   }, []);

// // //   useEffect(() => {
// // //     if (!currentUser?.id) {
// // //       return;
// // //     }

// // //     const onMessageReceived = (newMessage) => {
// // //       console.log('Received new WebSocket message:', newMessage);
      
// // //       if (newMessage.senderId !== currentUser.id) {
// // //         messageSoundRef.current.play().catch(e => console.log("Audio play failed:", e));
// // //       }

// // //       const participantId = newMessage.senderId === currentUser.id
// // //         ? newMessage.receiverId
// // //         : newMessage.senderId;

// // //       const isForCurrentChat = selectedChatRef.current && selectedChatRef.current.id === participantId;

// // //       if (isForCurrentChat || newMessage.senderId === currentUser.id) {
// // //         setMessages(prev => {
// // //           const exists = prev.some(msg => msg.id === newMessage.id || (msg.tempId && msg.tempId === newMessage.tempId));
// // //           if (!exists) {
// // //             return [...prev, { ...newMessage, status: 'sent' }];
// // //           }
// // //           return prev.map(msg => (msg.tempId && msg.tempId === newMessage.tempId) ? { ...newMessage, status: 'sent' } : msg);
// // //         });
        
// // //         if (newMessage.senderId === selectedChatRef.current?.id) {
// // //           markAsDelivered(newMessage.id, currentUser.id).catch(err => console.error('Error marking as delivered:', err));
// // //           if (document.visibilityState === 'visible') {
// // //             markAsSeen(newMessage.id, currentUser.id).catch(err => console.error('Error marking as seen:', err));
// // //           }
// // //         }
// // //       }

// // //       setChats(prevChats => {
// // //         const unreadIncrement = (newMessage.senderId !== currentUser.id && !isForCurrentChat) ? 1 : 0;
// // //         const existingChatIndex = prevChats.findIndex(c => c.id === participantId);
// // //         let newChatsArray = [...prevChats];

// // //         if (existingChatIndex > -1) {
// // //           const existingChat = newChatsArray[existingChatIndex];
// // //           const updatedChat = {
// // //             ...existingChat,
// // //             lastMessage: newMessage.content,
// // //             lastMessageTime: newMessage.timestamp,
// // //             unreadCount: (existingChat.unreadCount || 0) + unreadIncrement
// // //           };
// // //           newChatsArray[existingChatIndex] = updatedChat;
// // //         } else if (newMessage.senderId !== currentUser.id) {
// // //           const sender = allUsersRef.current.find(u => u.id === newMessage.senderId);
// // //           const newChat = {
// // //             id: participantId,
// // //             name: sender?.name || sender?.username || 'New Chat',
// // //             avatar: (sender?.name || sender?.username)?.charAt(0) || '?',
// // //             lastMessage: newMessage.content,
// // //             lastMessageTime: newMessage.timestamp,
// // //             unreadCount: 1,
// // //           };
// // //           newChatsArray.push(newChat);
// // //         } else {
// // //           return prevChats;
// // //         }

// // //         newChatsArray.sort((a, b) => {
// // //           const timeA = a.lastMessageTime ? new Date(a.lastMessageTime).getTime() : 0;
// // //           const timeB = b.lastMessageTime ? new Date(b.lastMessageTime).getTime() : 0;
// // //           return timeB - timeA;
// // //         });

// // //         return newChatsArray;
// // //       });
// // //     };

// // //     const onUpdateReceived = (updatedMessage) => {
// // //       console.log('Received message update:', updatedMessage);
// // //       setMessages(prev =>
// // //         prev.map(msg => (msg.id === updatedMessage.id ? { ...updatedMessage, status: 'sent' } : msg))
// // //       );
// // //     };

// // //     const onDeleteReceived = (deletedMessageId) => {
// // //       console.log('Received message delete for ID:', deletedMessageId);
// // //       setMessages(prev => prev.filter(msg => msg.id !== deletedMessageId));
// // //     };

// // //     const onConnect = () => {
// // //       console.log('WebSocket connected successfully');
// // //       setConnectionStatus('connected');
// // //     };

// // //     const onDisconnect = () => {
// // //       console.log('WebSocket disconnected');
// // //       setConnectionStatus('disconnected');
// // //     };

// // //     const onError = (error) => {
// // //       console.error('WebSocket error:', error);
// // //       setConnectionStatus('error');
// // //     };

// // //     connectWebSocket(
// // //       currentUser.id,
// // //       onMessageReceived,
// // //       onUpdateReceived,
// // //       onDeleteReceived,
// // //       onConnect,
// // //       onDisconnect,
// // //       onError
// // //     );

// // //     return () => {
// // //       disconnectWebSocket();
// // //     };
// // //   }, [currentUser?.id]);

// // //   const loadAllUsers = useCallback(async () => {
// // //     if (usersLoaded || !currentUser?.id) return;
// // //     setLoading(prev => ({ ...prev, users: true }));
// // //     setErrors(prev => ({ ...prev, users: null }));
// // //     try {
// // //       const users = await searchUsers('');
// // //       const filtered = users.filter(user => user?.id && user.id !== currentUser?.id);
// // //       setAllUsers(filtered);
// // //       setUsersLoaded(true);
// // //     } catch (error) {
// // //       console.error('Error loading all users:', error);
// // //       setErrors(prev => ({ ...prev, users: 'Failed to load users. Please try again.' }));
// // //     } finally {
// // //       setLoading(prev => ({ ...prev, users: false }));
// // //     }
// // //   }, [currentUser, usersLoaded]);

// // //   useEffect(() => {
// // //     if (activeTab === 'contacts') {
// // //       loadAllUsers();
// // //     }
// // //   }, [activeTab, loadAllUsers]);

// // //   const loadMessages = useCallback(async () => {
// // //     if (!selectedChat || !currentUser) return;
// // //     setLoading(prev => ({ ...prev, messages: true }));
// // //     setErrors(prev => ({ ...prev, messages: null }));

// // //     try {
// // //       const msgs = await fetchMessages(currentUser.id, selectedChat.id);
// // //       setMessages(msgs);

// // //       const markPromises = msgs.map(msg => {
// // //         if (msg.senderId === selectedChat.id) {
// // //           if (!msg.delivered) {
// // //             markAsDelivered(msg.id, currentUser.id).catch(err => console.error('Error marking as delivered:', err));
// // //           }
// // //           if (!msg.seen && document.visibilityState === 'visible') {
// // //             return markAsSeen(msg.id, currentUser.id).catch(err => console.error('Error marking as seen:', err));
// // //           }
// // //         }
// // //         return Promise.resolve();
// // //       });

// // //       await Promise.all(markPromises);

// // //       setChats(prev => prev.map(chat =>
// // //         chat.id === selectedChat.id ? { ...chat, unreadCount: 0 } : chat
// // //       ));
// // //     } catch (error) {
// // //       console.error('Error loading messages:', error);
// // //       setErrors(prev => ({ ...prev, messages: 'Failed to load messages. Please try again.' }));
// // //     } finally {
// // //       setLoading(prev => ({ ...prev, messages: false }));
// // //       setIsInitialLoad(false);
// // //     }
// // //   }, [selectedChat, currentUser]);

// // //   useEffect(() => {
// // //     if (selectedChat) {
// // //       loadMessages();
// // //     }
// // //   }, [selectedChat, loadMessages]);

// // //   useEffect(() => {
// // //     const handleVisibilityChange = () => {
// // //       if (document.visibilityState === 'visible' && selectedChat) {
// // //         messages.forEach(msg => {
// // //           if (msg.senderId === selectedChat.id && !msg.seen) {
// // //             markAsSeen(msg.id, currentUser.id).catch(err => console.error('Error marking as seen:', err));
// // //           }
// // //         });
// // //       }
// // //     };
// // //     document.addEventListener('visibilitychange', handleVisibilityChange);
// // //     return () => {
// // //       document.removeEventListener('visibilitychange', handleVisibilityChange);
// // //     };
// // //   }, [selectedChat, messages, currentUser]);

// // //   useEffect(() => {
// // //     if (!isInitialLoad) {
// // //       scrollToBottom();
// // //     }
// // //   }, [messages, scrollToBottom, isInitialLoad]);

// // //   useEffect(() => {
// // //     if (selectedChat && messageInputRef.current) {
// // //       messageInputRef.current.focus();
// // //     }
// // //   }, [selectedChat]);
  
// // //   const startNewChat = (user) => {
// // //     if (!user || !user.id) return;
// // //     const existing = chats.find(chat => chat.id === user.id);
// // //     if (existing) {
// // //       setSelectedChat(existing);
// // //     } else {
// // //       const newChat = {
// // //         id: user.id,
// // //         name: user.name || user.username || 'Unknown User',
// // //         avatar: (user.name || user.username)?.charAt(0) || '?',
// // //         lastMessage: '',
// // //         lastMessageTime: '',
// // //         unreadCount: 0
// // //       };
// // //       setChats(prev => [newChat, ...prev]);
// // //       setSelectedChat(newChat);
// // //     }
// // //     setSearchQuery('');
// // //     setActiveTab('chats');
// // //   };

// // //   const sendMessage = async () => {
// // //     if (!message.trim() || !selectedChat || !currentUser?.id || sending) return;
// // //     setSending(true);
// // //     setErrors(prev => ({ ...prev, send: null }));
// // //     const tempId = `temp-${Date.now()}`;
// // //     const msgObj = {
// // //       senderId: currentUser.id,
// // //       receiverId: selectedChat.id,
// // //       content: message.trim(),
// // //       timestamp: new Date().toISOString(),
// // //       tempId: tempId
// // //     };
// // //     let tempMessageAdded = false;
// // //     const wsSuccess = sendWebSocketMessage(msgObj);
// // //     if (!wsSuccess) {
// // //       const tempMessage = {
// // //         id: tempId, senderId: currentUser.id, receiverId: selectedChat.id,
// // //         content: message.trim(), timestamp: new Date().toISOString(),
// // //         status: 'sending', tempId: tempId
// // //       };
// // //       setMessages(prev => [...prev, tempMessage]);
// // //       tempMessageAdded = true;
// // //     }
// // //     setMessage('');
// // //     try {
// // //       if (!wsSuccess) {
// // //         console.warn('WebSocket not available, falling back to REST API');
// // //         const savedMessage = await sendMessageApi(msgObj);
// // //         setMessages(prev =>
// // //           prev.map(msg => msg.tempId === tempId ? { ...savedMessage, status: 'sent' } : msg)
// // //         );
// // //       }
// // //       setChats(prev => prev.map(chat =>
// // //         chat.id === selectedChat.id
// // //           ? { ...chat, lastMessage: message.trim(), lastMessageTime: new Date().toISOString() }
// // //           : chat
// // //       ).sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime)));
// // //     } catch (error) {
// // //       console.error('Error sending message:', error);
// // //       if (tempMessageAdded) {
// // //         setMessages(prev => prev.map(msg => msg.tempId === tempId ? { ...msg, status: 'failed' } : msg));
// // //       }
// // //       setErrors(prev => ({ ...prev, send: 'Failed to send message. Please try again.' }));
// // //     }
// // //     setSending(false);
// // //   };

// // //   const handleDeleteMessage = async (messageId) => {
// // //     if (!window.confirm('Are you sure you want to delete this message?')) return;
// // //     try {
// // //       await deleteMessageApi(messageId, currentUser.id, selectedChat.id);
// // //     } catch (error) {
// // //       console.error('Error deleting message:', error);
// // //       alert('Failed to delete message. Please try again.');
// // //     }
// // //   };

// // //   const startEditing = (message) => {
// // //     setEditingMessage(message.id);
// // //     setEditContent(message.content);
// // //   };

// // //   const cancelEditing = () => {
// // //     setEditingMessage(null);
// // //     setEditContent('');
// // //   };

// // //   const saveEditedMessage = async () => {
// // //     if (!editContent.trim() || !editingMessage) return;
// // //     try {
// // //       await editMessageApi(editingMessage, editContent.trim(), currentUser.id, selectedChat.id);
// // //       cancelEditing();
// // //     } catch (error) {
// // //       console.error('Error editing message:', error);
// // //       alert(error.response?.data?.message || 'Failed to edit message. Please try again.');
// // //     }
// // //   };

// // //   const handleEditKeyPress = (e) => {
// // //     if (e.key === 'Enter' && !e.shiftKey) {
// // //       e.preventDefault();
// // //       saveEditedMessage();
// // //     } else if (e.key === 'Escape') {
// // //       cancelEditing();
// // //     }
// // //   };

// // //   const canEditMessage = (message) => {
// // //     if (message.senderId !== currentUser.id) return false;
// // //     const userMessages = messages.filter(msg => msg.senderId === currentUser.id);
// // //     const latestMessage = userMessages[userMessages.length - 1];
// // //     if (!latestMessage || latestMessage.id !== message.id) return false;
// // //     const messageTime = new Date(message.timestamp);
// // //     const now = new Date();
// // //     const fiveMinutesAgo = new Date(now.getTime() - 5 * 60000);
// // //     return messageTime > fiveMinutesAgo;
// // //   };

// // //   const handleKeyPress = (e) => {
// // //     if (e.key === 'Enter' && !e.shiftKey) {
// // //       e.preventDefault();
// // //       sendMessage();
// // //     }
// // //   };

// // //   const retryConnection = () => { setConnectionStatus('connecting'); };
// // //   const formatTime = (timestamp) => !timestamp ? '' : new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

// // //   const formatDate = (timestamp) => {
// // //     if (!timestamp) return '';
// // //     const date = new Date(timestamp);
// // //     const today = new Date();
// // //     const yesterday = new Date(today);
// // //     yesterday.setDate(yesterday.getDate() - 1);
// // //     if (date.toDateString() === today.toDateString()) return 'Today';
// // //     if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
// // //     return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
// // //   };

// // //   const getMessageStatusIcon = (message) => {
// // //     if (message.status === 'sending') return <Loader2 size={12} className="animate-spin" />;
// // //     if (message.status === 'failed') return <AlertCircle size={12} />;
// // //     if (message.seen) return <CheckCheck size={12} className="text-blue-400" />;
// // //     if (message.delivered) return <CheckCheck size={12} className="text-gray-400" />;
// // //     return <Check size={12} className="text-gray-400" />;
// // //   };

// // //   const groupedMessages = messages.reduce((groups, message) => {
// // //     const date = formatDate(message.timestamp);
// // //     if (!groups[date]) groups[date] = [];
// // //     groups[date].push(message);
// // //     return groups;
// // //   }, {});
  
// // //   const filteredChats = chats.filter(chat => chat.name.toLowerCase().includes(searchQuery.toLowerCase()));
// // //   const filteredContacts = allUsers.filter(user => (user.name || user.username).toLowerCase().includes(searchQuery.toLowerCase()));

// // //   return (
// // //     <div className="flex h-screen bg-gray-50">
// // //       {/* Sidebar */}
// // //       <div className="w-80 bg-white border-r border-gray-200 flex flex-col shadow-sm">
// // //         <div className="p-4 bg-purple-600 text-white flex justify-between items-center">
// // //           <div className="flex items-center space-x-3">
// // //             <div className="bg-white text-purple-600 rounded-full w-10 h-10 flex items-center justify-center font-bold">
// // //               {currentUser?.username?.charAt(0) || '?'}
// // //             </div>
// // //             <div>
// // //               <h4 className="font-semibold">{currentUser?.name || currentUser?.username}</h4>
// // //               <div className="flex items-center">
// // //                 <span className={`inline-block w-2 h-2 rounded-full mr-1 ${connectionStatus === 'connected' ? 'bg-green-400' : connectionStatus === 'connecting' ? 'bg-yellow-400' : 'bg-red-400'}`}></span>
// // //                 <span className="text-xs text-purple-200">{connectionStatus === 'connected' ? 'Online' : connectionStatus === 'connecting' ? 'Connecting...' : 'Offline'}</span>
// // //                 {connectionStatus !== 'connected' && (<button onClick={retryConnection} className="ml-2 text-purple-200 hover:text-white" title="Retry connection"><RefreshCw size={14} /></button>)}
// // //               </div>
// // //             </div>
// // //           </div>
// // //           <button onClick={logout} className="hover:bg-purple-800 p-2 rounded-full transition-colors" aria-label="Logout"><LogOut size={20} /></button>
// // //         </div>
        
// // //         <div className="flex border-b">
// // //           <button className={`flex-1 py-3 text-center font-medium flex items-center justify-center ${activeTab === 'chats' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('chats')}><MessageCircle size={18} className="mr-2" /> Chats</button>
// // //           <button className={`flex-1 py-3 text-center font-medium flex items-center justify-center ${activeTab === 'contacts' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('contacts')}><Users size={18} className="mr-2" /> Contacts</button>
// // //         </div>
        
// // //         <div className="p-4 border-b">
// // //           <div className="relative">
// // //             <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
// // //             <input type="text" className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder={activeTab === 'chats' ? "Search chats..." : "Search contacts..."} value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
// // //           </div>
// // //         </div>
        
// // //         {activeTab === 'chats' && (
// // //           <div className="flex-1 overflow-y-auto">
// // //             {loading.chats && chats.length === 0 ? (<div className="flex justify-center items-center h-32"><Loader2 className="animate-spin text-purple-500" /></div>) :
// // //              filteredChats.length === 0 ? (<div className="text-center p-4 text-gray-500"><MessageCircle className="w-8 h-8 mx-auto mb-2 text-purple-500 opacity-50" /><p>{searchQuery ? 'No chats found' : 'No chats yet'}</p><p className="text-sm">{searchQuery ? 'Try a different search.' : 'Go to Contacts to start a conversation.'}</p></div>) :
// // //              (filteredChats.map(chat => (<div key={chat.id} onClick={() => { setSelectedChat(chat); }} className={`p-4 border-b cursor-pointer transition-colors ${selectedChat?.id === chat.id ? 'bg-purple-50' : 'hover:bg-gray-50'}`}><div className="flex items-center space-x-3"><div className="bg-purple-600 text-white rounded-full w-12 h-12 flex justify-center items-center font-semibold text-lg">{chat.avatar}</div><div className="flex-1 min-w-0"><div className="flex justify-between items-center"><h4 className="font-medium truncate">{chat.name}</h4><div className="flex items-center">{chat.lastMessageTime && <span className="text-xs text-gray-500 mr-2">{formatTime(chat.lastMessageTime)}</span>}{chat.unreadCount > 0 && <span className="bg-purple-600 text-white text-xs rounded-full px-2 py-1 min-w-[1.25rem] text-center">{chat.unreadCount}</span>}</div></div><p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p></div></div></div>)))}
// // //           </div>
// // //         )}
        
// // //         {activeTab === 'contacts' && (
// // //           <div className="flex-1 overflow-y-auto">
// // //             {errors.users && (<div className="p-3 bg-red-50 text-red-700 flex items-center justify-between"><div className="flex items-center"><AlertCircle size={16} className="mr-2" /><span className="text-sm">{errors.users}</span></div><button onClick={loadAllUsers} className="text-red-700 hover:text-red-900"><RefreshCw size={16} /></button></div>)}
// // //             {loading.users ? (<div className="flex justify-center items-center h-32"><Loader2 className="animate-spin text-purple-500" /></div>) :
// // //              filteredContacts.length === 0 ? (<div className="text-center p-4 text-gray-500"><Users className="w-8 h-8 mx-auto mb-2 text-purple-500 opacity-50" /><p>{searchQuery ? 'No contacts found' : 'No contacts available'}</p></div>) :
// // //              (filteredContacts.map(user => (<div key={user.id} onClick={() => startNewChat(user)} className="p-3 hover:bg-gray-100 cursor-pointer flex items-center space-x-3 transition-colors border-b"><div className="bg-purple-600 text-white rounded-full w-10 h-10 flex justify-center items-center font-semibold">{(user.name || user.username)?.charAt(0) || '?' }</div><div><div className="font-medium">{user.name || user.username}</div><div className="text-xs text-gray-500">{user.email}</div></div></div>)))}
// // //           </div>
// // //         )}
// // //       </div>
      
// // //       {/* Main Chat Area */}
// // //       <div className="flex-1 flex flex-col">
// // //         {selectedChat ? (
// // //           <>
// // //             <div className="p-4 border-b bg-white flex justify-between items-center shadow-sm">
// // //               <div className="flex items-center space-x-3"><div className="bg-purple-600 text-white rounded-full w-10 h-10 flex justify-center items-center font-semibold">{selectedChat.avatar}</div><div><h3 className="font-semibold">{selectedChat.name}</h3><p className="text-xs text-gray-500">{connectionStatus === 'connected' ? 'Online' : 'Offline'}</p></div></div>
// // //               <div className="flex space-x-1"><button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600 hover:text-purple-600" aria-label="Voice call"><Phone size={20} /></button><button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600 hover:text-purple-600" aria-label="Video call"><Video size={20} /></button><button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600 hover:text-purple-600" aria-label="More options"><MoreVertical size={20} /></button></div>
// // //             </div>
            
// // //             <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
// // //               {errors.messages && (<div className="p-3 bg-red-50 text-red-700 flex items-center justify-center mb-4 rounded-lg"><AlertCircle size={16} className="mr-2" /><span className="text-sm">{errors.messages}</span><button onClick={loadMessages} className="ml-3 text-red-700 hover:text-red-900"><RefreshCw size={16} /></button></div>)}
// // //               {loading.messages && isInitialLoad ? (<div className="flex justify-center items-center h-full"><Loader2 className="animate-spin text-purple-500" size={32} /></div>) :
// // //                messages.length === 0 ? (<div className="flex flex-col items-center justify-center h-full text-gray-500"><MessageCircle className="w-16 h-16 mb-4 text-purple-500 opacity-50" /><p className="text-lg font-medium">No messages yet</p><p className="text-sm">Start the conversation with {selectedChat.name}</p></div>) :
// // //                (Object.entries(groupedMessages).map(([date, dateMessages]) => (<div key={date}><div className="flex justify-center my-4"><div className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">{date}</div></div>{dateMessages.map(msg => (<div key={msg.id || msg.tempId} className={`flex mb-4 ${msg.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`} onMouseEnter={() => setIsHoveringMessage(msg.id)} onMouseLeave={() => setIsHoveringMessage(null)}><div className="relative max-w-xs lg:max-w-md"><div className={`px-4 py-2 rounded-2xl ${msg.senderId === currentUser.id ? (msg.status === 'failed' ? 'bg-red-100 text-red-800' : msg.status === 'sending' ? 'bg-purple-300 text-white' : 'bg-purple-600 text-white') : 'bg-white border border-gray-200'}`}>{editingMessage === msg.id ? (<div className="flex items-center"><input type="text" value={editContent} onChange={e => setEditContent(e.target.value)} onKeyDown={handleEditKeyPress} className="flex-1 bg-transparent border-b border-white outline-none mr-2 text-white placeholder-purple-200" placeholder="Edit your message..." autoFocus /><div className="flex space-x-1"><button onClick={saveEditedMessage} className="text-green-300 hover:text-green-100" aria-label="Save edit"><CheckCircle size={16} /></button><button onClick={cancelEditing} className="text-red-300 hover:text-red-100" aria-label="Cancel edit"><X size={16} /></button></div></div>) : (<><p className="whitespace-pre-wrap break-words">{msg.content}</p><div className={`flex items-center mt-1 justify-end space-x-1 ${msg.senderId === currentUser.id ? (msg.status === 'failed' ? 'text-red-500' : msg.status === 'sending' ? 'text-purple-100' : 'text-purple-200') : 'text-gray-400'}`}>{msg.edited && <span className="text-xs italic mr-1">(edited)</span>}<span className="text-xs mr-1">{formatTime(msg.timestamp)}</span>{msg.senderId === currentUser.id && getMessageStatusIcon(msg)}</div></>)}</div>{msg.senderId === currentUser.id && isHoveringMessage === msg.id && !editingMessage && !msg.tempId && (<div className="absolute -top-6 right-0 bg-white shadow-md rounded-lg p-1 flex border">{canEditMessage(msg) && (<button onClick={() => startEditing(msg)} className="p-1 text-purple-600 hover:bg-purple-50 rounded transition-colors" aria-label="Edit message"><Edit3 size={14} /></button>)}<button onClick={() => handleDeleteMessage(msg.id)} className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors" aria-label="Delete message"><Trash2 size={14} /></button></div>)}</div></div>))}</div>)))}
// // //               <div ref={messagesEndRef} />
// // //             </div>
            
// // //             <div className="p-4 border-t bg-white shadow-md">
// // //               {errors.send && (<div className="mb-2 p-2 bg-red-50 text-red-700 rounded flex items-center"><AlertCircle size={16} className="mr-2" /><span className="text-sm">{errors.send}</span></div>)}
// // //               <div className="flex items-center space-x-2">
// // //                 <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full transition-colors" aria-label="Attach file"><Paperclip size={20} /></button>
// // //                 <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full transition-colors" aria-label="Emoji"><Smile size={20} /></button>
// // //                 <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full transition-colors" aria-label="Voice message"><Mic size={20} /></button>
// // //                 <div className="flex-1 relative"><input ref={messageInputRef} type="text" value={message} onChange={e => setMessage(e.target.value)} onKeyDown={handleKeyPress} className="w-full border rounded-full px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder={`Message ${selectedChat.name}`} disabled={sending} /></div>
// // //                 <button onClick={sendMessage} disabled={!message.trim() || sending} className={`p-3 rounded-full transition-all ${!message.trim() || sending ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-purple-600 text-white hover:bg-purple-700 shadow-md transform hover:scale-105'}`} aria-label="Send message">{sending ? <Loader2 className="animate-spin w-5 h-5" /> : <Send size={20} />}</button>
// // //               </div>
// // //             </div>
// // //           </>
// // //         ) : (
// // //           <div className="flex-1 flex items-center justify-center bg-gray-100">
// // //             <div className="text-center text-gray-600"><MessageCircle className="w-16 h-16 mx-auto mb-4 text-purple-500 opacity-50" /><p className="text-lg font-medium">Select a chat to start messaging</p><p className="text-sm">Or search for contacts to start a new conversation</p></div>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default ChatsPage;
// // import React, { useEffect, useState, useRef, useCallback } from 'react';
// // import {
// //   MessageCircle, Search, Send, LogOut, Phone, Video, Paperclip, Loader2,
// //   RefreshCw, AlertCircle, User, Users, Check, CheckCheck, Edit3, Trash2, X, CheckCircle,
// //   MoreVertical, Smile, Mic
// // } from 'lucide-react';
// // import { useAuth } from '../contexts/AuthContext';
// // import { searchUsers } from '../services/authService';
// // import {
// //   // fetchConversations has been removed as requested
// //   fetchMessages,
// //   sendMessageApi,
// //   markAsSeen,
// //   markAsDelivered,
// //   deleteMessageApi,
// //   editMessageApi
// // } from '../services/chatService';
// // import {
// //   connectWebSocket,
// //   sendWebSocketMessage,
// //   disconnectWebSocket
// // } from '../services/websocketService';

// // // Import message sound
// // import messageSound from './../../asserts/sounds/message.mp3';

// // const ChatsPage = () => {
// //   const { currentUser, logout } = useAuth();
// //   const messagesEndRef = useRef(null);
// //   const messageInputRef = useRef(null);
// //   const messageSoundRef = useRef(null);
// //   const [isInitialLoad, setIsInitialLoad] = useState(true);

// //   const [selectedChat, setSelectedChat] = useState(null);
// //   const [message, setMessage] = useState('');
// //   const [messages, setMessages] = useState([]);
  
// //   // UPDATED: Chats are now initialized from localStorage to persist after a refresh
// //   const [chats, setChats] = useState(() => {
// //     try {
// //       const savedChats = localStorage.getItem('chats');
// //       if (savedChats) {
// //         return JSON.parse(savedChats);
// //       }
// //     } catch (error) {
// //       console.error('Failed to parse chats from localStorage', error);
// //     }
// //     return []; // Default to an empty array if nothing is saved
// //   });

// //   const [searchQuery, setSearchQuery] = useState('');
  
// //   const [allUsers, setAllUsers] = useState([]);
// //   const [usersLoaded, setUsersLoaded] = useState(false);

// //   const [loading, setLoading] = useState({
// //     chats: false,
// //     messages: false,
// //     users: false
// //   });
// //   const [errors, setErrors] = useState({
// //     chats: null,
// //     messages: null,
// //     send: null,
// //     users: null
// //   });
// //   const [sending, setSending] = useState(false);
// //   const [connectionStatus, setConnectionStatus] = useState('disconnected');
// //   const [activeTab, setActiveTab] = useState('chats');
// //   const [editingMessage, setEditingMessage] = useState(null);
// //   const [editContent, setEditContent] = useState('');
// //   const [isHoveringMessage, setIsHoveringMessage] = useState(null);
  
// //   const selectedChatRef = useRef(selectedChat);
// //   useEffect(() => {
// //     selectedChatRef.current = selectedChat;
// //   }, [selectedChat]);

// //   const allUsersRef = useRef(allUsers);
// //   useEffect(() => {
// //     allUsersRef.current = allUsers;
// //   }, [allUsers]);

// //   // NEW: This effect saves the chats to localStorage whenever they change
// //   useEffect(() => {
// //     try {
// //       localStorage.setItem('chats', JSON.stringify(chats));
// //     } catch (error) {
// //       console.error('Failed to save chats to localStorage', error);
// //     }
// //   }, [chats]);

// //   useEffect(() => {
// //     messageSoundRef.current = new Audio(messageSound);
// //     messageSoundRef.current.volume = 0.3;
// //   }, []);

// //   const scrollToBottom = useCallback(() => {
// //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// //   }, []);

// //   useEffect(() => {
// //     if (!currentUser?.id) {
// //       return;
// //     }

// //     const onMessageReceived = (newMessage) => {
// //       console.log('Received new WebSocket message:', newMessage);
      
// //       if (newMessage.senderId !== currentUser.id) {
// //         messageSoundRef.current.play().catch(e => console.log("Audio play failed:", e));
// //       }

// //       const participantId = newMessage.senderId === currentUser.id
// //         ? newMessage.receiverId
// //         : newMessage.senderId;

// //       const isForCurrentChat = selectedChatRef.current && selectedChatRef.current.id === participantId;

// //       if (isForCurrentChat || newMessage.senderId === currentUser.id) {
// //         setMessages(prev => {
// //           const exists = prev.some(msg => msg.id === newMessage.id || (msg.tempId && msg.tempId === newMessage.tempId));
// //           if (!exists) {
// //             return [...prev, { ...newMessage, status: 'sent' }];
// //           }
// //           return prev.map(msg => (msg.tempId && msg.tempId === newMessage.tempId) ? { ...newMessage, status: 'sent' } : msg);
// //         });
        
// //         if (newMessage.senderId === selectedChatRef.current?.id) {
// //           markAsDelivered(newMessage.id, currentUser.id).catch(err => console.error('Error marking as delivered:', err));
// //           if (document.visibilityState === 'visible') {
// //             markAsSeen(newMessage.id, currentUser.id).catch(err => console.error('Error marking as seen:', err));
// //           }
// //         }
// //       }

// //       setChats(prevChats => {
// //         const unreadIncrement = (newMessage.senderId !== currentUser.id && !isForCurrentChat) ? 1 : 0;
// //         const existingChatIndex = prevChats.findIndex(c => c.id === participantId);
// //         let newChatsArray = [...prevChats];

// //         if (existingChatIndex > -1) {
// //           const existingChat = newChatsArray[existingChatIndex];
// //           const updatedChat = {
// //             ...existingChat,
// //             lastMessage: newMessage.content,
// //             lastMessageTime: newMessage.timestamp,
// //             unreadCount: (existingChat.unreadCount || 0) + unreadIncrement
// //           };
// //           newChatsArray[existingChatIndex] = updatedChat;
// //         } else if (newMessage.senderId !== currentUser.id) {
// //           const sender = allUsersRef.current.find(u => u.id === newMessage.senderId);
// //           const newChat = {
// //             id: participantId,
// //             name: sender?.name || sender?.username || 'New Chat',
// //             avatar: (sender?.name || sender?.username)?.charAt(0) || '?',
// //             lastMessage: newMessage.content,
// //             lastMessageTime: newMessage.timestamp,
// //             unreadCount: 1,
// //           };
// //           newChatsArray.push(newChat);
// //         } else {
// //           return prevChats;
// //         }

// //         newChatsArray.sort((a, b) => {
// //           const timeA = a.lastMessageTime ? new Date(a.lastMessageTime).getTime() : 0;
// //           const timeB = b.lastMessageTime ? new Date(b.lastMessageTime).getTime() : 0;
// //           return timeB - timeA;
// //         });

// //         return newChatsArray;
// //       });
// //     };

// //     const onUpdateReceived = (updatedMessage) => {
// //       console.log('Received message update:', updatedMessage);
// //       setMessages(prev =>
// //         prev.map(msg => (msg.id === updatedMessage.id ? { ...updatedMessage, status: 'sent' } : msg))
// //       );
// //     };

// //     const onDeleteReceived = (deletedMessageId) => {
// //       console.log('Received message delete for ID:', deletedMessageId);
// //       setMessages(prev => prev.filter(msg => msg.id !== deletedMessageId));
// //     };

// //     const onConnect = () => {
// //       console.log('WebSocket connected successfully');
// //       setConnectionStatus('connected');
// //     };

// //     const onDisconnect = () => {
// //       console.log('WebSocket disconnected');
// //       setConnectionStatus('disconnected');
// //     };

// //     const onError = (error) => {
// //       console.error('WebSocket error:', error);
// //       setConnectionStatus('error');
// //     };

// //     connectWebSocket(
// //       currentUser.id,
// //       onMessageReceived,
// //       onUpdateReceived,
// //       onDeleteReceived,
// //       onConnect,
// //       onDisconnect,
// //       onError
// //     );

// //     return () => {
// //       disconnectWebSocket();
// //     };
// //   }, [currentUser?.id]);

// //   const loadAllUsers = useCallback(async () => {
// //     if (usersLoaded || !currentUser?.id) return;
// //     setLoading(prev => ({ ...prev, users: true }));
// //     setErrors(prev => ({ ...prev, users: null }));
// //     try {
// //       const users = await searchUsers('');
// //       const filtered = users.filter(user => user?.id && user.id !== currentUser?.id);
// //       setAllUsers(filtered);
// //       setUsersLoaded(true);
// //     } catch (error) {
// //       console.error('Error loading all users:', error);
// //       setErrors(prev => ({ ...prev, users: 'Failed to load users. Please try again.' }));
// //     } finally {
// //       setLoading(prev => ({ ...prev, users: false }));
// //     }
// //   }, [currentUser, usersLoaded]);

// //   useEffect(() => {
// //     if (activeTab === 'contacts') {
// //       loadAllUsers();
// //     }
// //   }, [activeTab, loadAllUsers]);

// //   const loadMessages = useCallback(async () => {
// //     if (!selectedChat || !currentUser) return;
// //     setLoading(prev => ({ ...prev, messages: true }));
// //     setErrors(prev => ({ ...prev, messages: null }));

// //     try {
// //       const msgs = await fetchMessages(currentUser.id, selectedChat.id);
// //       setMessages(msgs);

// //       const markPromises = msgs.map(msg => {
// //         if (msg.senderId === selectedChat.id) {
// //           if (!msg.delivered) {
// //             markAsDelivered(msg.id, currentUser.id).catch(err => console.error('Error marking as delivered:', err));
// //           }
// //           if (!msg.seen && document.visibilityState === 'visible') {
// //             return markAsSeen(msg.id, currentUser.id).catch(err => console.error('Error marking as seen:', err));
// //           }
// //         }
// //         return Promise.resolve();
// //       });

// //       await Promise.all(markPromises);

// //       setChats(prev => prev.map(chat =>
// //         chat.id === selectedChat.id ? { ...chat, unreadCount: 0 } : chat
// //       ));
// //     } catch (error) {
// //       console.error('Error loading messages:', error);
// //       setErrors(prev => ({ ...prev, messages: 'Failed to load messages. Please try again.' }));
// //     } finally {
// //       setLoading(prev => ({ ...prev, messages: false }));
// //       setIsInitialLoad(false);
// //     }
// //   }, [selectedChat, currentUser]);

// //   useEffect(() => {
// //     if (selectedChat) {
// //       loadMessages();
// //     }
// //   }, [selectedChat, loadMessages]);

// //   useEffect(() => {
// //     const handleVisibilityChange = () => {
// //       if (document.visibilityState === 'visible' && selectedChat) {
// //         messages.forEach(msg => {
// //           if (msg.senderId === selectedChat.id && !msg.seen) {
// //             markAsSeen(msg.id, currentUser.id).catch(err => console.error('Error marking as seen:', err));
// //           }
// //         });
// //       }
// //     };
// //     document.addEventListener('visibilitychange', handleVisibilityChange);
// //     return () => {
// //       document.removeEventListener('visibilitychange', handleVisibilityChange);
// //     };
// //   }, [selectedChat, messages, currentUser]);

// //   useEffect(() => {
// //     if (!isInitialLoad) {
// //       scrollToBottom();
// //     }
// //   }, [messages, scrollToBottom, isInitialLoad]);

// //   useEffect(() => {
// //     if (selectedChat && messageInputRef.current) {
// //       messageInputRef.current.focus();
// //     }
// //   }, [selectedChat]);
  
// //   const startNewChat = (user) => {
// //     if (!user || !user.id) return;
// //     const existing = chats.find(chat => chat.id === user.id);
// //     if (existing) {
// //       setSelectedChat(existing);
// //     } else {
// //       const newChat = {
// //         id: user.id,
// //         name: user.name || user.username || 'Unknown User',
// //         avatar: (user.name || user.username)?.charAt(0) || '?',
// //         lastMessage: '',
// //         lastMessageTime: '',
// //         unreadCount: 0
// //       };
// //       setChats(prev => [newChat, ...prev]);
// //       setSelectedChat(newChat);
// //     }
// //     setSearchQuery('');
// //     setActiveTab('chats');
// //   };

// //   const sendMessage = async () => {
// //     if (!message.trim() || !selectedChat || !currentUser?.id || sending) return;
// //     setSending(true);
// //     setErrors(prev => ({ ...prev, send: null }));
// //     const tempId = `temp-${Date.now()}`;
// //     const msgObj = {
// //       senderId: currentUser.id,
// //       receiverId: selectedChat.id,
// //       content: message.trim(),
// //       timestamp: new Date().toISOString(),
// //       tempId: tempId
// //     };
// //     let tempMessageAdded = false;
// //     const wsSuccess = sendWebSocketMessage(msgObj);
// //     if (!wsSuccess) {
// //       const tempMessage = {
// //         id: tempId, senderId: currentUser.id, receiverId: selectedChat.id,
// //         content: message.trim(), timestamp: new Date().toISOString(),
// //         status: 'sending', tempId: tempId
// //       };
// //       setMessages(prev => [...prev, tempMessage]);
// //       tempMessageAdded = true;
// //     }
// //     setMessage('');
// //     try {
// //       if (!wsSuccess) {
// //         console.warn('WebSocket not available, falling back to REST API');
// //         const savedMessage = await sendMessageApi(msgObj);
// //         setMessages(prev =>
// //           prev.map(msg => msg.tempId === tempId ? { ...savedMessage, status: 'sent' } : msg)
// //         );
// //       }
// //       setChats(prev => prev.map(chat =>
// //         chat.id === selectedChat.id
// //           ? { ...chat, lastMessage: message.trim(), lastMessageTime: new Date().toISOString() }
// //           : chat
// //       ).sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime)));
// //     } catch (error) {
// //       console.error('Error sending message:', error);
// //       if (tempMessageAdded) {
// //         setMessages(prev => prev.map(msg => msg.tempId === tempId ? { ...msg, status: 'failed' } : msg));
// //       }
// //       setErrors(prev => ({ ...prev, send: 'Failed to send message. Please try again.' }));
// //     }
// //     setSending(false);
// //   };

// //   const handleDeleteMessage = async (messageId) => {
// //     if (!window.confirm('Are you sure you want to delete this message?')) return;
// //     try {
// //       await deleteMessageApi(messageId, currentUser.id, selectedChat.id);
// //     } catch (error) {
// //       console.error('Error deleting message:', error);
// //       alert('Failed to delete message. Please try again.');
// //     }
// //   };

// //   const startEditing = (message) => {
// //     setEditingMessage(message.id);
// //     setEditContent(message.content);
// //   };

// //   const cancelEditing = () => {
// //     setEditingMessage(null);
// //     setEditContent('');
// //   };

// //   const saveEditedMessage = async () => {
// //     if (!editContent.trim() || !editingMessage) return;
// //     try {
// //       await editMessageApi(editingMessage, editContent.trim(), currentUser.id, selectedChat.id);
// //       cancelEditing();
// //     } catch (error) {
// //       console.error('Error editing message:', error);
// //       alert(error.response?.data?.message || 'Failed to edit message. Please try again.');
// //     }
// //   };

// //   const handleEditKeyPress = (e) => {
// //     if (e.key === 'Enter' && !e.shiftKey) {
// //       e.preventDefault();
// //       saveEditedMessage();
// //     } else if (e.key === 'Escape') {
// //       cancelEditing();
// //     }
// //   };

// //   // ✅ MODIFIED FUNCTION
// //   const canEditMessage = (message) => {
// //     // Rule 1: You can only edit your own messages.
// //     if (message.senderId !== currentUser.id) return false;
    
// //     // Rule 2: The message must have been sent within the last 5 minutes.
// //     const messageTime = new Date(message.timestamp);
// //     const now = new Date();
// //     // 5 minutes in milliseconds = 5 * 60 * 1000 = 300000
// //     const fiveMinutesAgo = new Date(now.getTime() - 300000); 
    
// //     return messageTime > fiveMinutesAgo;
// //   };

// //   const handleKeyPress = (e) => {
// //     if (e.key === 'Enter' && !e.shiftKey) {
// //       e.preventDefault();
// //       sendMessage();
// //     }
// //   };

// //   const retryConnection = () => { setConnectionStatus('connecting'); };
// //   const formatTime = (timestamp) => !timestamp ? '' : new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

// //   const formatDate = (timestamp) => {
// //     if (!timestamp) return '';
// //     const date = new Date(timestamp);
// //     const today = new Date();
// //     const yesterday = new Date(today);
// //     yesterday.setDate(yesterday.getDate() - 1);
// //     if (date.toDateString() === today.toDateString()) return 'Today';
// //     if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
// //     return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
// //   };

// //   const getMessageStatusIcon = (message) => {
// //     if (message.status === 'sending') return <Loader2 size={12} className="animate-spin" />;
// //     if (message.status === 'failed') return <AlertCircle size={12} />;
// //     if (message.seen) return <CheckCheck size={12} className="text-blue-400" />;
// //     if (message.delivered) return <CheckCheck size={12} className="text-gray-400" />;
// //     return <Check size={12} className="text-gray-400" />;
// //   };

// //   const groupedMessages = messages.reduce((groups, message) => {
// //     const date = formatDate(message.timestamp);
// //     if (!groups[date]) groups[date] = [];
// //     groups[date].push(message);
// //     return groups;
// //   }, {});
  
// //   const filteredChats = chats.filter(chat => chat.name.toLowerCase().includes(searchQuery.toLowerCase()));
// //   const filteredContacts = allUsers.filter(user => (user.name || user.username).toLowerCase().includes(searchQuery.toLowerCase()));

// //   return (
// //     <div className="flex h-screen bg-gray-50">
// //       {/* Sidebar */}
// //       <div className="w-80 bg-white border-r border-gray-200 flex flex-col shadow-sm">
// //         <div className="p-4 bg-purple-600 text-white flex justify-between items-center">
// //           <div className="flex items-center space-x-3">
// //             <div className="bg-white text-purple-600 rounded-full w-10 h-10 flex items-center justify-center font-bold">
// //               {currentUser?.username?.charAt(0) || '?'}
// //             </div>
// //             <div>
// //               <h4 className="font-semibold">{currentUser?.name || currentUser?.username}</h4>
// //               <div className="flex items-center">
// //                 <span className={`inline-block w-2 h-2 rounded-full mr-1 ${connectionStatus === 'connected' ? 'bg-green-400' : connectionStatus === 'connecting' ? 'bg-yellow-400' : 'bg-red-400'}`}></span>
// //                 <span className="text-xs text-purple-200">{connectionStatus === 'connected' ? 'Online' : connectionStatus === 'connecting' ? 'Connecting...' : 'Offline'}</span>
// //                 {connectionStatus !== 'connected' && (<button onClick={retryConnection} className="ml-2 text-purple-200 hover:text-white" title="Retry connection"><RefreshCw size={14} /></button>)}
// //               </div>
// //             </div>
// //           </div>
// //           <button onClick={logout} className="hover:bg-purple-800 p-2 rounded-full transition-colors" aria-label="Logout"><LogOut size={20} /></button>
// //         </div>
        
// //         <div className="flex border-b">
// //           <button className={`flex-1 py-3 text-center font-medium flex items-center justify-center ${activeTab === 'chats' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('chats')}><MessageCircle size={18} className="mr-2" /> Chats</button>
// //           <button className={`flex-1 py-3 text-center font-medium flex items-center justify-center ${activeTab === 'contacts' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('contacts')}><Users size={18} className="mr-2" /> Contacts</button>
// //         </div>
        
// //         <div className="p-4 border-b">
// //           <div className="relative">
// //             <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
// //             <input type="text" className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder={activeTab === 'chats' ? "Search chats..." : "Search contacts..."} value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
// //           </div>
// //         </div>
        
// //         {activeTab === 'chats' && (
// //           <div className="flex-1 overflow-y-auto">
// //             {loading.chats && chats.length === 0 ? (<div className="flex justify-center items-center h-32"><Loader2 className="animate-spin text-purple-500" /></div>) :
// //               filteredChats.length === 0 ? (<div className="text-center p-4 text-gray-500"><MessageCircle className="w-8 h-8 mx-auto mb-2 text-purple-500 opacity-50" /><p>{searchQuery ? 'No chats found' : 'No chats yet'}</p><p className="text-sm">{searchQuery ? 'Try a different search.' : 'Go to Contacts to start a conversation.'}</p></div>) :
// //               (filteredChats.map(chat => (<div key={chat.id} onClick={() => { setSelectedChat(chat); }} className={`p-4 border-b cursor-pointer transition-colors ${selectedChat?.id === chat.id ? 'bg-purple-50' : 'hover:bg-gray-50'}`}><div className="flex items-center space-x-3"><div className="bg-purple-600 text-white rounded-full w-12 h-12 flex justify-center items-center font-semibold text-lg">{chat.avatar}</div><div className="flex-1 min-w-0"><div className="flex justify-between items-center"><h4 className="font-medium truncate">{chat.name}</h4><div className="flex items-center">{chat.lastMessageTime && <span className="text-xs text-gray-500 mr-2">{formatTime(chat.lastMessageTime)}</span>}{chat.unreadCount > 0 && <span className="bg-purple-600 text-white text-xs rounded-full px-2 py-1 min-w-[1.25rem] text-center">{chat.unreadCount}</span>}</div></div><p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p></div></div></div>)))}
// //           </div>
// //         )}
        
// //         {activeTab === 'contacts' && (
// //           <div className="flex-1 overflow-y-auto">
// //             {errors.users && (<div className="p-3 bg-red-50 text-red-700 flex items-center justify-between"><div className="flex items-center"><AlertCircle size={16} className="mr-2" /><span className="text-sm">{errors.users}</span></div><button onClick={loadAllUsers} className="text-red-700 hover:text-red-900"><RefreshCw size={16} /></button></div>)}
// //             {loading.users ? (<div className="flex justify-center items-center h-32"><Loader2 className="animate-spin text-purple-500" /></div>) :
// //               filteredContacts.length === 0 ? (<div className="text-center p-4 text-gray-500"><Users className="w-8 h-8 mx-auto mb-2 text-purple-500 opacity-50" /><p>{searchQuery ? 'No contacts found' : 'No contacts available'}</p></div>) :
// //               (filteredContacts.map(user => (<div key={user.id} onClick={() => startNewChat(user)} className="p-3 hover:bg-gray-100 cursor-pointer flex items-center space-x-3 transition-colors border-b"><div className="bg-purple-600 text-white rounded-full w-10 h-10 flex justify-center items-center font-semibold">{(user.name || user.username)?.charAt(0) || '?' }</div><div><div className="font-medium">{user.name || user.username}</div><div className="text-xs text-gray-500">{user.email}</div></div></div>)))}
// //           </div>
// //         )}
// //       </div>
      
// //       {/* Main Chat Area */}
// //       <div className="flex-1 flex flex-col">
// //         {selectedChat ? (
// //           <>
// //             <div className="p-4 border-b bg-white flex justify-between items-center shadow-sm">
// //               <div className="flex items-center space-x-3"><div className="bg-purple-600 text-white rounded-full w-10 h-10 flex justify-center items-center font-semibold">{selectedChat.avatar}</div><div><h3 className="font-semibold">{selectedChat.name}</h3><p className="text-xs text-gray-500">{connectionStatus === 'connected' ? 'Online' : 'Offline'}</p></div></div>
// //               <div className="flex space-x-1"><button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600 hover:text-purple-600" aria-label="Voice call"><Phone size={20} /></button><button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600 hover:text-purple-600" aria-label="Video call"><Video size={20} /></button><button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600 hover:text-purple-600" aria-label="More options"><MoreVertical size={20} /></button></div>
// //             </div>
            
// //             <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
// //               {errors.messages && (<div className="p-3 bg-red-50 text-red-700 flex items-center justify-center mb-4 rounded-lg"><AlertCircle size={16} className="mr-2" /><span className="text-sm">{errors.messages}</span><button onClick={loadMessages} className="ml-3 text-red-700 hover:text-red-900"><RefreshCw size={16} /></button></div>)}
// //               {loading.messages && isInitialLoad ? (<div className="flex justify-center items-center h-full"><Loader2 className="animate-spin text-purple-500" size={32} /></div>) :
// //                 messages.length === 0 ? (<div className="flex flex-col items-center justify-center h-full text-gray-500"><MessageCircle className="w-16 h-16 mb-4 text-purple-500 opacity-50" /><p className="text-lg font-medium">No messages yet</p><p className="text-sm">Start the conversation with {selectedChat.name}</p></div>) :
// //                 (Object.entries(groupedMessages).map(([date, dateMessages]) => (<div key={date}><div className="flex justify-center my-4"><div className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">{date}</div></div>{dateMessages.map(msg => (<div key={msg.id || msg.tempId} className={`flex mb-4 ${msg.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`} onMouseEnter={() => setIsHoveringMessage(msg.id)} onMouseLeave={() => setIsHoveringMessage(null)}><div className="relative max-w-xs lg:max-w-md"><div className={`px-4 py-2 rounded-2xl ${msg.senderId === currentUser.id ? (msg.status === 'failed' ? 'bg-red-100 text-red-800' : msg.status === 'sending' ? 'bg-purple-300 text-white' : 'bg-purple-600 text-white') : 'bg-white border border-gray-200'}`}>{editingMessage === msg.id ? (<div className="flex items-center"><input type="text" value={editContent} onChange={e => setEditContent(e.target.value)} onKeyDown={handleEditKeyPress} className="flex-1 bg-transparent border-b border-white outline-none mr-2 text-white placeholder-purple-200" placeholder="Edit your message..." autoFocus /><div className="flex space-x-1"><button onClick={saveEditedMessage} className="text-green-300 hover:text-green-100" aria-label="Save edit"><CheckCircle size={16} /></button><button onClick={cancelEditing} className="text-red-300 hover:text-red-100" aria-label="Cancel edit"><X size={16} /></button></div></div>) : (<><p className="whitespace-pre-wrap break-words">{msg.content}</p><div className={`flex items-center mt-1 justify-end space-x-1 ${msg.senderId === currentUser.id ? (msg.status === 'failed' ? 'text-red-500' : msg.status === 'sending' ? 'text-purple-100' : 'text-purple-200') : 'text-gray-400'}`}>{msg.edited && <span className="text-xs italic mr-1">(edited)</span>}<span className="text-xs mr-1">{formatTime(msg.timestamp)}</span>{msg.senderId === currentUser.id && getMessageStatusIcon(msg)}</div></>)}</div>{msg.senderId === currentUser.id && isHoveringMessage === msg.id && !editingMessage && !msg.tempId && (<div className="absolute -top-6 right-0 bg-white shadow-md rounded-lg p-1 flex border">{canEditMessage(msg) && (<button onClick={() => startEditing(msg)} className="p-1 text-purple-600 hover:bg-purple-50 rounded transition-colors" aria-label="Edit message"><Edit3 size={14} /></button>)}<button onClick={() => handleDeleteMessage(msg.id)} className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors" aria-label="Delete message"><Trash2 size={14} /></button></div>)}</div></div>))}</div>)))}
// //               <div ref={messagesEndRef} />
// //             </div>
            
// //             <div className="p-4 border-t bg-white shadow-md">
// //               {errors.send && (<div className="mb-2 p-2 bg-red-50 text-red-700 rounded flex items-center"><AlertCircle size={16} className="mr-2" /><span className="text-sm">{errors.send}</span></div>)}
// //               <div className="flex items-center space-x-2">
// //                 <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full transition-colors" aria-label="Attach file"><Paperclip size={20} /></button>
// //                 <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full transition-colors" aria-label="Emoji"><Smile size={20} /></button>
// //                 <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full transition-colors" aria-label="Voice message"><Mic size={20} /></button>
// //                 <div className="flex-1 relative"><input ref={messageInputRef} type="text" value={message} onChange={e => setMessage(e.target.value)} onKeyDown={handleKeyPress} className="w-full border rounded-full px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder={`Message ${selectedChat.name}`} disabled={sending} /></div>
// //                 <button onClick={sendMessage} disabled={!message.trim() || sending} className={`p-3 rounded-full transition-all ${!message.trim() || sending ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-purple-600 text-white hover:bg-purple-700 shadow-md transform hover:scale-105'}`} aria-label="Send message">{sending ? <Loader2 className="animate-spin w-5 h-5" /> : <Send size={20} />}</button>
// //               </div>
// //             </div>
// //           </>
// //         ) : (
// //           <div className="flex-1 flex items-center justify-center bg-gray-100">
// //             <div className="text-center text-gray-600"><MessageCircle className="w-16 h-16 mx-auto mb-4 text-purple-500 opacity-50" /><p className="text-lg font-medium">Select a chat to start messaging</p><p className="text-sm">Or search for contacts to start a new conversation</p></div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default ChatsPage; 
// import React, { useEffect, useState, useRef, useCallback } from 'react';
// import {
//     MessageCircle, Search, Send, LogOut, Phone, Video, Paperclip, Loader2,
//     RefreshCw, AlertCircle, Users, Check, CheckCheck, Edit3, Trash2, X, CheckCircle,
//     MoreVertical, Smile, Mic, ArrowLeft, ThumbsUp, Heart
// } from 'lucide-react';
// import { useAuth } from '../contexts/AuthContext';
// import { searchUsers } from '../services/authService';
// import {
//     fetchMessages, sendMessageApi, markAsSeen, markAsDelivered, deleteMessageApi, editMessageApi
// } from '../services/chatService';
// import {
//     connectWebSocket, sendWebSocketMessage, disconnectWebSocket
// } from '../services/websocketService';
// import messageSound from './../../asserts/sounds/message.mp3';

// const MessageStatus = ({ message }) => {
//     if (message.status === 'sending') return <Loader2 size={16} className="animate-spin text-slate-400" title="Sending..." />;
//     if (message.status === 'failed') return <AlertCircle size={16} className="text-red-500" title="Failed to send" />;
//     if (message.seen) return <CheckCheck size={16} className="text-blue-500" title="Read" />;
//     if (message.delivered) return <CheckCheck size={16} className="text-slate-400" title="Delivered" />;
//     return <Check size={16} className="text-slate-400" title="Sent" />;
// };

// // ✅ NEW: Component for the innovative reaction bar
// const ReactionBar = ({ onReact }) => (
//     <div className="absolute -top-5 z-10 bg-white rounded-full shadow-md border border-slate-200 flex items-center p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//         <button onClick={() => onReact('👍')} className="p-1 rounded-full hover:bg-slate-200 transition-colors"><ThumbsUp size={16} /></button>
//         <button onClick={() => onReact('❤️')} className="p-1 rounded-full hover:bg-slate-200 transition-colors"><Heart size={16} className="text-red-500" /></button>
//         <button onClick={() => onReact('😄')} className="p-1 rounded-full hover:bg-slate-200 transition-colors"><Smile size={16} className="text-yellow-500" /></button>
//     </div>
// );


// const ChatsPage = () => {
//     const { currentUser, logout } = useAuth();
//     const messagesEndRef = useRef(null);
//     const messageInputRef = useRef(null);
//     const messageSoundRef = useRef(null);
//     const optionsMenuRef = useRef(null);

//     const [isInitialLoad, setIsInitialLoad] = useState(true);
//     const [selectedChat, setSelectedChat] = useState(null);
//     const [message, setMessage] = useState('');
//     const [messages, setMessages] = useState([]);
//     const [chats, setChats] = useState(() => {
//         try {
//             return JSON.parse(localStorage.getItem('chats') || '[]');
//         } catch (error) {
//             console.error('Failed to parse chats from localStorage', error);
//             return [];
//         }
//     });

//     const [searchQuery, setSearchQuery] = useState('');
//     const [allUsers, setAllUsers] = useState([]);
//     const [usersLoaded, setUsersLoaded] = useState(false);
//     const [loading, setLoading] = useState({ messages: false, users: false });
//     const [errors, setErrors] = useState({ messages: null, send: null, users: null });
//     const [sending, setSending] = useState(false);
//     const [connectionStatus, setConnectionStatus] = useState('disconnected');
//     const [activeTab, setActiveTab] = useState('chats');
//     const [editingMessage, setEditingMessage] = useState(null);
//     const [editContent, setEditContent] = useState('');
//     const [messageOptions, setMessageOptions] = useState(null);

//     const selectedChatRef = useRef(selectedChat);
//     useEffect(() => { selectedChatRef.current = selectedChat; }, [selectedChat]);
    
//     // Most hooks and logic remain unchanged as they are robust.
//     // ... (All the useEffect, useCallback, and handler functions from the previous step are here)
//     // ... (Omitting for brevity, no changes were made to the core logic)
//      const allUsersRef = useRef(allUsers);
//     useEffect(() => { allUsersRef.current = allUsers; }, [allUsers]);

//     useEffect(() => {
//         try {
//             localStorage.setItem('chats', JSON.stringify(chats));
//         } catch (error) {
//             console.error('Failed to save chats to localStorage', error);
//         }
//     }, [chats]);

//     useEffect(() => {
//         messageSoundRef.current = new Audio(messageSound);
//         messageSoundRef.current.volume = 0.3;
//     }, []);
    
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (optionsMenuRef.current && !optionsMenuRef.current.contains(event.target)) {
//                 setMessageOptions(null);
//             }
//         };
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, []);


//     const scrollToBottom = useCallback(() => {
//         messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, []);
    
//     useEffect(() => {
//         if (!currentUser?.id) return;
//         const onMessageReceived = (newMessage) => {
//             if (newMessage.senderId !== currentUser.id) {
//                 messageSoundRef.current.play().catch(e => console.log("Audio play failed:", e));
//             }
//             const participantId = newMessage.senderId === currentUser.id ? newMessage.receiverId : newMessage.senderId;
//             const isForCurrentChat = selectedChatRef.current && selectedChatRef.current.id === participantId;

//             if (isForCurrentChat || newMessage.senderId === currentUser.id) {
//                 setMessages(prev => {
//                     const exists = prev.some(msg => msg.id === newMessage.id || (msg.tempId && msg.tempId === newMessage.tempId));
//                     if (!exists) return [...prev, { ...newMessage, status: 'sent' }];
//                     return prev.map(msg => (msg.tempId && msg.tempId === newMessage.tempId) ? { ...newMessage, status: 'sent' } : msg);
//                 });
//                 if (newMessage.senderId === selectedChatRef.current?.id) {
//                     markAsDelivered(newMessage.id, currentUser.id).catch(err => console.error('Error marking as delivered:', err));
//                     if (document.visibilityState === 'visible') {
//                         markAsSeen(newMessage.id, currentUser.id).catch(err => console.error('Error marking as seen:', err));
//                     }
//                 }
//             }
//             setChats(prevChats => {
//                 const unreadIncrement = (newMessage.senderId !== currentUser.id && !isForCurrentChat) ? 1 : 0;
//                 const existingChatIndex = prevChats.findIndex(c => c.id === participantId);
//                 let newChatsArray = [...prevChats];

//                 if (existingChatIndex > -1) {
//                     const existingChat = newChatsArray[existingChatIndex];
//                     const updatedChat = { ...existingChat, lastMessage: newMessage.content, lastMessageTime: newMessage.timestamp, unreadCount: (existingChat.unreadCount || 0) + unreadIncrement };
//                     newChatsArray[existingChatIndex] = updatedChat;
//                 } else if (newMessage.senderId !== currentUser.id) {
//                     const sender = allUsersRef.current.find(u => u.id === newMessage.senderId);
//                     const newChat = { id: participantId, name: sender?.name || sender?.username || 'New Chat', avatar: (sender?.name || sender?.username)?.charAt(0) || '?', lastMessage: newMessage.content, lastMessageTime: newMessage.timestamp, unreadCount: 1 };
//                     newChatsArray.push(newChat);
//                 } else {
//                     return prevChats;
//                 }
//                 newChatsArray.sort((a, b) => (new Date(b.lastMessageTime) || 0) - (new Date(a.lastMessageTime) || 0));
//                 return newChatsArray;
//             });
//         };
//         const onUpdateReceived = (updatedMessage) => setMessages(prev => prev.map(msg => (msg.id === updatedMessage.id ? { ...updatedMessage, status: 'sent' } : msg)));
//         const onDeleteReceived = (deletedMessageId) => setMessages(prev => prev.filter(msg => msg.id !== deletedMessageId));
//         const onConnect = () => setConnectionStatus('connected');
//         const onDisconnect = () => setConnectionStatus('disconnected');
//         const onError = (error) => { console.error('WebSocket error:', error); setConnectionStatus('error'); };

//         connectWebSocket(currentUser.id, onMessageReceived, onUpdateReceived, onDeleteReceived, onConnect, onDisconnect, onError);
//         return () => disconnectWebSocket();
//     }, [currentUser?.id]);

//     const loadAllUsers = useCallback(async () => {
//         if (usersLoaded || !currentUser?.id) return;
//         setLoading(prev => ({ ...prev, users: true }));
//         setErrors(prev => ({ ...prev, users: null }));
//         try {
//             const users = await searchUsers('');
//             setAllUsers(users.filter(user => user?.id && user.id !== currentUser?.id));
//             setUsersLoaded(true);
//         } catch (error) {
//             console.error('Error loading all users:', error);
//             setErrors(prev => ({ ...prev, users: 'Failed to load users.' }));
//         } finally {
//             setLoading(prev => ({ ...prev, users: false }));
//         }
//     }, [currentUser, usersLoaded]);

//     useEffect(() => {
//         if (activeTab === 'contacts') {
//             loadAllUsers();
//         }
//     }, [activeTab, loadAllUsers]);

//     const loadMessages = useCallback(async () => {
//         if (!selectedChat || !currentUser) return;
//         setLoading(prev => ({ ...prev, messages: true }));
//         setErrors(prev => ({ ...prev, messages: null }));
//         try {
//             const msgs = await fetchMessages(currentUser.id, selectedChat.id);
//             setMessages(msgs);
//             const markPromises = msgs
//                 .filter(msg => msg.senderId === selectedChat.id && !msg.seen && document.visibilityState === 'visible')
//                 .map(msg => markAsSeen(msg.id, currentUser.id).catch(err => console.error('Error marking as seen:', err)));
//             await Promise.all(markPromises);
//             setChats(prev => prev.map(chat => chat.id === selectedChat.id ? { ...chat, unreadCount: 0 } : chat));
//         } catch (error) {
//             console.error('Error loading messages:', error);
//             setErrors(prev => ({ ...prev, messages: 'Failed to load messages.' }));
//         } finally {
//             setLoading(prev => ({ ...prev, messages: false }));
//             setIsInitialLoad(false);
//         }
//     }, [selectedChat, currentUser]);

//     useEffect(() => {
//         if (selectedChat) loadMessages();
//     }, [selectedChat, loadMessages]);

//     useEffect(() => {
//         if (!isInitialLoad) scrollToBottom();
//     }, [messages, scrollToBottom, isInitialLoad]);

//     useEffect(() => {
//         if (selectedChat && messageInputRef.current) messageInputRef.current.focus();
//     }, [selectedChat]);
    
//     const startNewChat = (user) => {
//         if (!user || !user.id) return;
//         const existing = chats.find(chat => chat.id === user.id);
//         if (existing) {
//             setSelectedChat(existing);
//         } else {
//             const newChat = { id: user.id, name: user.name || user.username || 'Unknown', avatar: (user.name || user.username)?.charAt(0) || '?', lastMessage: '', lastMessageTime: '', unreadCount: 0 };
//             setChats(prev => [newChat, ...prev]);
//             setSelectedChat(newChat);
//         }
//         setSearchQuery('');
//         setActiveTab('chats');
//     };

//     const sendMessage = async () => {
//         if (!message.trim() || !selectedChat || !currentUser?.id || sending) return;
//         setSending(true);
//         setErrors(prev => ({ ...prev, send: null }));
//         const tempId = `temp-${Date.now()}`;
//         const msgObj = { senderId: currentUser.id, receiverId: selectedChat.id, content: message.trim(), timestamp: new Date().toISOString(), tempId: tempId };
        
//         const wsSuccess = sendWebSocketMessage(msgObj);
        
//         if (!wsSuccess) {
//             const tempMessage = { ...msgObj, id: tempId, status: 'sending' };
//             setMessages(prev => [...prev, tempMessage]);
//             try {
//                 const savedMessage = await sendMessageApi(msgObj);
//                 setMessages(prev => prev.map(msg => msg.tempId === tempId ? { ...savedMessage, status: 'sent' } : msg));
//             } catch (error) {
//                 console.error('Error sending message via API:', error);
//                 setMessages(prev => prev.map(msg => msg.tempId === tempId ? { ...msg, status: 'failed' } : msg));
//                 setErrors(prev => ({ ...prev, send: 'Failed to send.' }));
//             }
//         }
        
//         setChats(prev => prev.map(chat =>
//             chat.id === selectedChat.id ? { ...chat, lastMessage: message.trim(), lastMessageTime: new Date().toISOString() } : chat
//         ).sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime)));

//         setMessage('');
//         setSending(false);
//     };

//     const handleDeleteMessage = async (messageId) => {
//         setMessageOptions(null);
//         if (!window.confirm('Are you sure you want to delete this message?')) return;
//         try {
//             await deleteMessageApi(messageId, currentUser.id, selectedChat.id);
//         } catch (error) {
//             console.error('Error deleting message:', error);
//             alert('Failed to delete message.');
//         }
//     };

//     const startEditing = (message) => {
//         setMessageOptions(null);
//         setEditingMessage(message.id);
//         setEditContent(message.content);
//     };

//     const cancelEditing = () => {
//         setEditingMessage(null);
//         setEditContent('');
//     };

//     const saveEditedMessage = async () => {
//         if (!editContent.trim() || !editingMessage) return;
//         try {
//             await editMessageApi(editingMessage, editContent.trim(), currentUser.id, selectedChat.id);
//             cancelEditing();
//         } catch (error) {
//             console.error('Error editing message:', error);
//             alert(error.response?.data?.message || 'Failed to edit message.');
//         }
//     };
    
//     const canEditMessage = (message) => {
//         if (message.senderId !== currentUser.id) return false;
//         const messageTime = new Date(message.timestamp);
//         const fiveMinutesAgo = new Date(Date.now() - 5 * 60000);
//         return messageTime > fiveMinutesAgo;
//     };
    
//     const handleKeyPress = (e) => {
//         if (e.key === 'Enter' && !e.shiftKey) {
//             e.preventDefault();
//             sendMessage();
//         }
//     };

//     const formatTime = (timestamp) => !timestamp ? '' : new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//     const formatDate = (timestamp) => {
//         if (!timestamp) return '';
//         const date = new Date(timestamp);
//         const today = new Date();
//         const yesterday = new Date(today);
//         yesterday.setDate(yesterday.getDate() - 1);
//         if (date.toDateString() === today.toDateString()) return 'Today';
//         if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
//         return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
//     };

//     const groupedMessages = messages.reduce((groups, message) => {
//         const date = formatDate(message.timestamp);
//         if (!groups[date]) groups[date] = [];
//         groups[date].push(message);
//         return groups;
//     }, {});
    
//     const filteredChats = chats.filter(chat => chat.name.toLowerCase().includes(searchQuery.toLowerCase()));
//     const filteredContacts = allUsers.filter(user => (user.name || user.username).toLowerCase().includes(searchQuery.toLowerCase()));

//     // Render logic starts here
//     return (
//         <div className="flex h-screen overflow-hidden bg-slate-50 font-sans">
//              {/* Sidebar */}
//             <div className={`w-full flex-col border-r border-slate-200 bg-white transition-all duration-300 md:flex md:w-80 lg:w-96 ${selectedChat ? 'hidden' : 'flex'}`}>
//                 {/* ... Sidebar header and search (no changes) ... */}
//                 <div className="p-4 bg-purple-600 text-white flex justify-between items-center shadow-md">
//                     <div className="flex items-center space-x-3">
//                          <div className="bg-white text-purple-600 rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl">
//                             {currentUser?.username?.charAt(0).toUpperCase() || '?'}
//                         </div>
//                         <div>
//                             <h4 className="font-semibold">{currentUser?.name || currentUser?.username}</h4>
//                             <div className="flex items-center text-xs text-purple-200">
//                                 <span className={`mr-1.5 h-2 w-2 rounded-full ${connectionStatus === 'connected' ? 'bg-green-400' : 'bg-red-400'}`}></span>
//                                 {connectionStatus === 'connected' ? 'Online' : 'Offline'}
//                             </div>
//                         </div>
//                     </div>
//                     <button onClick={logout} className="p-2 rounded-full transition-colors hover:bg-purple-700" aria-label="Logout"><LogOut size={20} /></button>
//                 </div>
//                 <div className="flex border-b border-slate-200">
//                     <button className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${activeTab === 'chats' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-slate-500 hover:bg-slate-50'}`} onClick={() => setActiveTab('chats')}><MessageCircle size={16} /> Chats</button>
//                     <button className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${activeTab === 'contacts' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-slate-500 hover:bg-slate-50'}`} onClick={() => setActiveTab('contacts')}><Users size={16} /> Contacts</button>
//                 </div>
//                 <div className="p-3 border-b border-slate-200">
//                     <div className="relative">
//                         <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
//                         <input type="text" className="w-full rounded-full bg-slate-100 py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none" placeholder={activeTab === 'chats' ? "Search chats..." : "Search contacts..."} value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
//                     </div>
//                 </div>

//                 <div className="flex-1 overflow-y-auto">
//                     {activeTab === 'chats' && (filteredChats.length > 0 ? filteredChats.map(chat => (
//                         // ✅ MODIFIED: Sidebar item with left accent bar for selection
//                         <div key={chat.id} onClick={() => { setSelectedChat(chat); }} className={`flex cursor-pointer items-center space-x-3 p-3 transition-colors relative ${selectedChat?.id === chat.id ? 'bg-slate-50' : 'hover:bg-slate-50'}`}>
//                            {selectedChat?.id === chat.id && <div className="absolute left-0 top-0 h-full w-1 bg-purple-600 rounded-r-full"></div>}
//                             <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex-shrink-0 flex justify-center items-center font-semibold text-lg">{chat.avatar.toUpperCase()}</div>
//                             <div className="flex-1 min-w-0">
//                                 <div className="flex justify-between items-center">
//                                     <h4 className="font-semibold truncate text-slate-800">{chat.name}</h4>
//                                     <span className="text-xs text-slate-400 flex-shrink-0 ml-2">{formatTime(chat.lastMessageTime)}</span>
//                                 </div>
//                                 <div className="flex justify-between items-start">
//                                     <p className="text-sm text-slate-500 truncate">{chat.lastMessage}</p>
//                                     {chat.unreadCount > 0 && <span className="mt-1 bg-purple-600 text-white text-xs font-bold rounded-full px-2 py-0.5 min-w-[1.25rem] text-center">{chat.unreadCount}</span>}
//                                 </div>
//                             </div>
//                         </div>
//                     )) : <div className="text-center p-8 text-slate-500"><MessageCircle className="w-10 h-10 mx-auto mb-2 text-purple-300" /><p>No chats yet.</p></div>)}
//                     {/* ... Contacts tab unchanged ... */}
//                      {activeTab === 'contacts' && (
//                         loading.users ? <div className="flex justify-center p-8"><Loader2 className="animate-spin text-purple-500" /></div> :
//                         filteredContacts.length > 0 ? filteredContacts.map(user => (
//                             <div key={user.id} onClick={() => startNewChat(user)} className="p-3 hover:bg-slate-50 cursor-pointer flex items-center space-x-3 transition-colors">
//                                 <div className="bg-purple-600 text-white rounded-full w-10 h-10 flex justify-center items-center font-semibold">{(user.name || user.username)?.charAt(0).toUpperCase() || '?' }</div>
//                                 <div>
//                                     <div className="font-semibold text-slate-800">{user.name || user.username}</div>
//                                     <div className="text-xs text-slate-500">{user.email}</div>
//                                 </div>
//                             </div>
//                         )) : <div className="text-center p-8 text-slate-500"><Users className="w-10 h-10 mx-auto mb-2 text-purple-300" /><p>No contacts found.</p></div>
//                     )}
//                 </div>
//             </div>

//             {/* Main Chat Area */}
//             <div className={`flex-1 flex-col bg-slate-100 ${selectedChat ? 'flex' : 'hidden md:flex'}`}>
//                 {selectedChat ? (
//                     <>
//                         <div className="p-3 border-b bg-white flex justify-between items-center shadow-sm">
//                           {/* ... Chat header unchanged ... */}
//                            <div className="flex items-center space-x-3">
//                                 <button onClick={() => setSelectedChat(null)} className="p-2 md:hidden rounded-full hover:bg-slate-100"><ArrowLeft size={20} /></button>
//                                 <div className="bg-purple-600 text-white rounded-full w-10 h-10 flex justify-center items-center font-semibold">{selectedChat.avatar.toUpperCase()}</div>
//                                 <div>
//                                     <h3 className="font-semibold text-slate-800">{selectedChat.name}</h3>
//                                     <p className="text-xs text-slate-500">{connectionStatus === 'connected' ? 'Online' : 'Offline'}</p>
//                                 </div>
//                             </div>
//                             <div className="flex space-x-1">
//                                 <button className="p-2 rounded-full transition-colors text-slate-500 hover:bg-slate-100" aria-label="Voice call"><Phone size={20} /></button>
//                                 <button className="p-2 rounded-full transition-colors text-slate-500 hover:bg-slate-100" aria-label="Video call"><Video size={20} /></button>
//                                 <button className="p-2 rounded-full transition-colors text-slate-500 hover:bg-slate-100" aria-label="More options"><MoreVertical size={20} /></button>
//                             </div>
//                         </div>
                        
//                         <div className="flex-1 overflow-y-auto p-4 space-y-4">
//                             {loading.messages && isInitialLoad ? <div className="flex justify-center items-center h-full"><Loader2 className="animate-spin text-purple-500" size={32} /></div> :
//                              Object.entries(groupedMessages).map(([date, dateMessages]) => (
//                                 <React.Fragment key={date}>
//                                     <div className="flex justify-center my-4"><div className="bg-slate-200 text-slate-600 text-xs px-3 py-1 rounded-full">{date}</div></div>
//                                     {dateMessages.map(msg => (
//                                         <div key={msg.id || msg.tempId} className={`flex items-start gap-3 group ${msg.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}>
//                                             {/* ✅ NEW: Avatar shown for received messages */}
//                                             {msg.senderId !== currentUser.id && (
//                                                  <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex-shrink-0 flex justify-center items-center font-semibold text-sm mt-5">{selectedChat.avatar.toUpperCase()}</div>
//                                             )}

//                                             <div className={`w-full max-w-lg ${msg.senderId === currentUser.id ? 'ml-auto' : ''}`}>
//                                                 {/* ✅ NEW: Metadata (name, time) above received messages */}
//                                                 {msg.senderId !== currentUser.id && (
//                                                     <div className="flex items-center gap-2 mb-1">
//                                                         <span className="font-semibold text-sm text-slate-800">{selectedChat.name}</span>
//                                                         <span className="text-xs text-slate-500">{formatTime(msg.timestamp)}</span>
//                                                     </div>
//                                                 )}

//                                                 <div className={`relative max-w-fit ${msg.senderId === currentUser.id ? 'ml-auto' : ''}`}>
//                                                     <ReactionBar onReact={(emoji) => alert(`Reacted with ${emoji}`)} />

//                                                     {/* ✅ MODIFIED: Teams-style message bubbles */}
//                                                     <div className={`px-3 py-2 ${msg.senderId === currentUser.id ? 'bg-purple-100 text-slate-800 rounded-lg' : 'bg-white border border-slate-200 text-slate-800 rounded-lg'}`}>
//                                                         {editingMessage === msg.id ? (
//                                                             <div className="flex items-center gap-2">
//                                                                 <input type="text" value={editContent} onChange={e => setEditContent(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && saveEditedMessage()} autoFocus className="w-full bg-transparent border-b border-purple-400 outline-none text-sm" />
//                                                                 <button onClick={saveEditedMessage} className="text-green-500 hover:text-green-700"><CheckCircle size={18} /></button>
//                                                                 <button onClick={cancelEditing} className="text-red-500 hover:text-red-700"><X size={18} /></button>
//                                                             </div>
//                                                         ) : (
//                                                             <p className="whitespace-pre-wrap break-words text-sm">{msg.content}</p>
//                                                         )}
//                                                     </div>

//                                                     {/* ✅ MODIFIED: Timestamp and status below own message */}
//                                                     {msg.senderId === currentUser.id && (
//                                                         <div className="flex items-center mt-1 justify-end gap-1 text-slate-400">
//                                                             {msg.edited && <span className="text-xs italic">(edited)</span>}
//                                                             <span className="text-xs">{formatTime(msg.timestamp)}</span>
//                                                             <MessageStatus message={msg} />
//                                                         </div>
//                                                     )}
//                                                 </div>
//                                             </div>
//                                             {msg.senderId === currentUser.id && (
//                                                 <div className="relative flex items-center self-center">
//                                                     <button onClick={() => setMessageOptions(messageOptions === msg.id ? null : msg.id)} className="p-1 rounded-full text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-slate-200">
//                                                         <MoreVertical size={16} />
//                                                     </button>
//                                                      {messageOptions === msg.id && (
//                                                         <div ref={optionsMenuRef} className="absolute bottom-full right-0 mb-2 w-28 bg-white rounded-lg shadow-xl border border-slate-100 z-10 overflow-hidden">
//                                                             {canEditMessage(msg) && <button onClick={() => startEditing(msg)} className="w-full text-left text-sm px-3 py-2 flex items-center gap-2 hover:bg-slate-50"><Edit3 size={14}/> Edit</button>}
//                                                             <button onClick={() => handleDeleteMessage(msg.id)} className="w-full text-left text-sm px-3 py-2 flex items-center gap-2 text-red-600 hover:bg-red-50"><Trash2 size={14}/> Delete</button>
//                                                         </div>
//                                                     )}
//                                                 </div>
//                                             )}
//                                         </div>
//                                     ))}
//                                 </React.Fragment>
//                             ))}
//                             <div ref={messagesEndRef} />
//                         </div>

//                         {/* ✅ NEW: Teams-style composition box */}
//                         <div className="p-3 border-t bg-white">
//                              <div className="flex-1 p-2 border rounded-lg focus-within:ring-2 focus-within:ring-purple-500">
//                                 <input ref={messageInputRef} type="text" value={message} onChange={e => setMessage(e.target.value)} onKeyDown={handleKeyPress} className="w-full outline-none bg-transparent text-sm" placeholder={`Message ${selectedChat.name}`} disabled={sending} />
//                             </div>
//                             <div className="flex justify-between items-center mt-2">
//                                 <div className="flex items-center gap-1">
//                                     <button className="p-2 text-slate-500 hover:text-purple-600 rounded-md transition-colors hover:bg-slate-100"><Smile size={20} /></button>
//                                     <button className="p-2 text-slate-500 hover:text-purple-600 rounded-md transition-colors hover:bg-slate-100"><Paperclip size={20} /></button>
//                                     <button className="p-2 text-slate-500 hover:text-purple-600 rounded-md transition-colors hover:bg-slate-100"><Mic size={20} /></button>
//                                 </div>
//                                 <button onClick={sendMessage} disabled={!message.trim() || sending} className={`p-2 rounded-md transition-all duration-200 ${!message.trim() || sending ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-purple-600 text-white hover:bg-purple-700'}`} aria-label="Send message">
//                                     {sending ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
//                                 </button>
//                             </div>
//                         </div>
//                     </>
//                 ) : (
//                     <div className="flex-1 flex items-center justify-center bg-slate-100">
//                         <div className="text-center text-slate-500">
//                             <MessageCircle className="w-16 h-16 mx-auto mb-4 text-purple-300" />
//                             <p className="text-lg font-semibold">Select a chat to start messaging</p>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ChatsPage;
import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
    MessageCircle, Search, Send, LogOut, Phone, Video, Paperclip, Loader2,
    RefreshCw, AlertCircle, Users, Check, CheckCheck, Edit3, Trash2, X, CheckCircle,
    MoreVertical, Smile, Mic, ArrowLeft, ThumbsUp, Heart
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { searchUsers } from '../services/authService';
import {
    fetchMessages, sendMessageApi, markAsSeen, markAsDelivered, deleteMessageApi, editMessageApi
} from '../services/chatService';
import {
    connectWebSocket, sendWebSocketMessage, disconnectWebSocket
} from '../services/websocketService';
import messageSound from './../../asserts/sounds/message.mp3';

const MessageStatus = ({ message }) => {
    if (message.status === 'sending') return <Loader2 size={16} className="animate-spin text-slate-400" title="Sending..." />;
    if (message.status === 'failed') return <AlertCircle size={16} className="text-red-500" title="Failed to send" />;
    if (message.seen) return <CheckCheck size={16} className="text-blue-500" title="Read" />;
    if (message.delivered) return <CheckCheck size={16} className="text-slate-400" title="Delivered" />;
    return <Check size={16} className="text-slate-400" title="Sent" />;
};

const ReactionBar = ({ onReact }) => (
    <div className="absolute -top-5 z-10 bg-white rounded-full shadow-md border border-slate-200 flex items-center p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button onClick={() => onReact('👍')} className="p-1 rounded-full hover:bg-slate-200 transition-colors"><ThumbsUp size={16} /></button>
        <button onClick={() => onReact('❤️')} className="p-1 rounded-full hover:bg-slate-200 transition-colors"><Heart size={16} className="text-red-500" /></button>
        <button onClick={() => onReact('😄')} className="p-1 rounded-full hover:bg-slate-200 transition-colors"><Smile size={16} className="text-yellow-500" /></button>
    </div>
);


const ChatsPage = () => {
    const { currentUser, logout } = useAuth();
    const messagesEndRef = useRef(null);
    const messageInputRef = useRef(null);
    const messageSoundRef = useRef(null);
    const optionsMenuRef = useRef(null);

    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [selectedChat, setSelectedChat] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [chats, setChats] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('chats') || '[]');
        } catch (error) {
            console.error('Failed to parse chats from localStorage', error);
            return [];
        }
    });

    const [searchQuery, setSearchQuery] = useState('');
    const [allUsers, setAllUsers] = useState([]);
    const [usersLoaded, setUsersLoaded] = useState(false);
    const [loading, setLoading] = useState({ messages: false, users: false });
    const [errors, setErrors] = useState({ messages: null, send: null, users: null });
    const [sending, setSending] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState('disconnected');
    const [activeTab, setActiveTab] = useState('chats');
    const [editingMessage, setEditingMessage] = useState(null);
    const [editContent, setEditContent] = useState('');
    const [messageOptions, setMessageOptions] = useState(null);

    const selectedChatRef = useRef(selectedChat);
    useEffect(() => { selectedChatRef.current = selectedChat; }, [selectedChat]);
    
    const allUsersRef = useRef(allUsers);
    useEffect(() => { allUsersRef.current = allUsers; }, [allUsers]);

    // ✅ FIX: Helper function to correctly parse timestamps from the server.
    // This assumes the server sends a UTC timestamp string that might be missing timezone info.
    // It appends 'Z' to tell the browser's Date object to treat it as UTC.
    const parseUTCDate = (timestampStr) => {
        if (!timestampStr) return null;
        if (typeof timestampStr === 'string' && !timestampStr.endsWith('Z')) {
            // Replace space with 'T' for better compatibility and add 'Z' for UTC.
            return new Date(timestampStr.replace(' ', 'T') + 'Z');
        }
        return new Date(timestampStr);
    };

    useEffect(() => {
        try {
            localStorage.setItem('chats', JSON.stringify(chats));
        } catch (error) {
            console.error('Failed to save chats to localStorage', error);
        }
    }, [chats]);

    useEffect(() => {
        messageSoundRef.current = new Audio(messageSound);
        messageSoundRef.current.volume = 0.3;
    }, []);
    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (optionsMenuRef.current && !optionsMenuRef.current.contains(event.target)) {
                setMessageOptions(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);
    
    useEffect(() => {
        if (!currentUser?.id) return;
        const onMessageReceived = (newMessage) => {
            if (newMessage.senderId !== currentUser.id) {
                messageSoundRef.current.play().catch(e => console.log("Audio play failed:", e));
            }
            const participantId = newMessage.senderId === currentUser.id ? newMessage.receiverId : newMessage.senderId;
            const isForCurrentChat = selectedChatRef.current && selectedChatRef.current.id === participantId;

            if (isForCurrentChat || newMessage.senderId === currentUser.id) {
                setMessages(prev => {
                    const exists = prev.some(msg => msg.id === newMessage.id || (msg.tempId && msg.tempId === newMessage.tempId));
                    if (!exists) return [...prev, { ...newMessage, status: 'sent' }];
                    return prev.map(msg => (msg.tempId && msg.tempId === newMessage.tempId) ? { ...newMessage, status: 'sent' } : msg);
                });
                if (newMessage.senderId === selectedChatRef.current?.id) {
                    markAsDelivered(newMessage.id, currentUser.id).catch(err => console.error('Error marking as delivered:', err));
                    if (document.visibilityState === 'visible') {
                        markAsSeen(newMessage.id, currentUser.id).catch(err => console.error('Error marking as seen:', err));
                    }
                }
            }
            setChats(prevChats => {
                const unreadIncrement = (newMessage.senderId !== currentUser.id && !isForCurrentChat) ? 1 : 0;
                const existingChatIndex = prevChats.findIndex(c => c.id === participantId);
                let newChatsArray = [...prevChats];

                if (existingChatIndex > -1) {
                    const existingChat = newChatsArray[existingChatIndex];
                    const updatedChat = { ...existingChat, lastMessage: newMessage.content, lastMessageTime: newMessage.timestamp, unreadCount: (existingChat.unreadCount || 0) + unreadIncrement };
                    newChatsArray[existingChatIndex] = updatedChat;
                } else if (newMessage.senderId !== currentUser.id) {
                    const sender = allUsersRef.current.find(u => u.id === newMessage.senderId);
                    const newChat = { id: participantId, name: sender?.name || sender?.username || 'New Chat', avatar: (sender?.name || sender?.username)?.charAt(0) || '?', lastMessage: newMessage.content, lastMessageTime: newMessage.timestamp, unreadCount: 1 };
                    newChatsArray.push(newChat);
                } else {
                    return prevChats;
                }
                // ✅ FIX: Use the parseUTCDate helper for correct sorting.
                newChatsArray.sort((a, b) => (parseUTCDate(b.lastMessageTime) || 0) - (parseUTCDate(a.lastMessageTime) || 0));
                return newChatsArray;
            });
        };
        const onUpdateReceived = (updatedMessage) => setMessages(prev => prev.map(msg => (msg.id === updatedMessage.id ? { ...updatedMessage, status: 'sent' } : msg)));
        const onDeleteReceived = (deletedMessageId) => setMessages(prev => prev.filter(msg => msg.id !== deletedMessageId));
        const onConnect = () => setConnectionStatus('connected');
        const onDisconnect = () => setConnectionStatus('disconnected');
        const onError = (error) => { console.error('WebSocket error:', error); setConnectionStatus('error'); };

        connectWebSocket(currentUser.id, onMessageReceived, onUpdateReceived, onDeleteReceived, onConnect, onDisconnect, onError);
        return () => disconnectWebSocket();
    }, [currentUser?.id]);

    const loadAllUsers = useCallback(async () => {
        if (usersLoaded || !currentUser?.id) return;
        setLoading(prev => ({ ...prev, users: true }));
        setErrors(prev => ({ ...prev, users: null }));
        try {
            const users = await searchUsers('');
            setAllUsers(users.filter(user => user?.id && user.id !== currentUser?.id));
            setUsersLoaded(true);
        } catch (error) {
            console.error('Error loading all users:', error);
            setErrors(prev => ({ ...prev, users: 'Failed to load users.' }));
        } finally {
            setLoading(prev => ({ ...prev, users: false }));
        }
    }, [currentUser, usersLoaded]);

    useEffect(() => {
        if (activeTab === 'contacts') {
            loadAllUsers();
        }
    }, [activeTab, loadAllUsers]);

    const loadMessages = useCallback(async () => {
        if (!selectedChat || !currentUser) return;
        setLoading(prev => ({ ...prev, messages: true }));
        setErrors(prev => ({ ...prev, messages: null }));
        try {
            const msgs = await fetchMessages(currentUser.id, selectedChat.id);
            setMessages(msgs);
            const markPromises = msgs
                .filter(msg => msg.senderId === selectedChat.id && !msg.seen && document.visibilityState === 'visible')
                .map(msg => markAsSeen(msg.id, currentUser.id).catch(err => console.error('Error marking as seen:', err)));
            await Promise.all(markPromises);
            setChats(prev => prev.map(chat => chat.id === selectedChat.id ? { ...chat, unreadCount: 0 } : chat));
        } catch (error) {
            console.error('Error loading messages:', error);
            setErrors(prev => ({ ...prev, messages: 'Failed to load messages.' }));
        } finally {
            setLoading(prev => ({ ...prev, messages: false }));
            setIsInitialLoad(false);
        }
    }, [selectedChat, currentUser]);

    useEffect(() => {
        if (selectedChat) loadMessages();
    }, [selectedChat, loadMessages]);

    useEffect(() => {
        if (!isInitialLoad) scrollToBottom();
    }, [messages, scrollToBottom, isInitialLoad]);

    useEffect(() => {
        if (selectedChat && messageInputRef.current) messageInputRef.current.focus();
    }, [selectedChat]);
    
    const startNewChat = (user) => {
        if (!user || !user.id) return;
        const existing = chats.find(chat => chat.id === user.id);
        if (existing) {
            setSelectedChat(existing);
        } else {
            const newChat = { id: user.id, name: user.name || user.username || 'Unknown', avatar: (user.name || user.username)?.charAt(0) || '?', lastMessage: '', lastMessageTime: '', unreadCount: 0 };
            setChats(prev => [newChat, ...prev]);
            setSelectedChat(newChat);
        }
        setSearchQuery('');
        setActiveTab('chats');
    };

    const sendMessage = async () => {
        if (!message.trim() || !selectedChat || !currentUser?.id || sending) return;
        setSending(true);
        setErrors(prev => ({ ...prev, send: null }));
        const tempId = `temp-${Date.now()}`;
        const msgObj = { senderId: currentUser.id, receiverId: selectedChat.id, content: message.trim(), timestamp: new Date().toISOString(), tempId: tempId };
        
        const wsSuccess = sendWebSocketMessage(msgObj);
        
        if (!wsSuccess) {
            const tempMessage = { ...msgObj, id: tempId, status: 'sending' };
            setMessages(prev => [...prev, tempMessage]);
            try {
                const savedMessage = await sendMessageApi(msgObj);
                setMessages(prev => prev.map(msg => msg.tempId === tempId ? { ...savedMessage, status: 'sent' } : msg));
            } catch (error) {
                console.error('Error sending message via API:', error);
                setMessages(prev => prev.map(msg => msg.tempId === tempId ? { ...msg, status: 'failed' } : msg));
                setErrors(prev => ({ ...prev, send: 'Failed to send.' }));
            }
        }
        
        setChats(prev => prev.map(chat =>
            chat.id === selectedChat.id ? { ...chat, lastMessage: message.trim(), lastMessageTime: new Date().toISOString() } : chat
        // ✅ FIX: Use the parseUTCDate helper for correct sorting.
        ).sort((a, b) => parseUTCDate(b.lastMessageTime) - parseUTCDate(a.lastMessageTime)));

        setMessage('');
        setSending(false);
    };

    const handleDeleteMessage = async (messageId) => {
        setMessageOptions(null);
        if (!window.confirm('Are you sure you want to delete this message?')) return;
        try {
            await deleteMessageApi(messageId, currentUser.id, selectedChat.id);
        } catch (error) {
            console.error('Error deleting message:', error);
            alert('Failed to delete message.');
        }
    };

    const startEditing = (message) => {
        setMessageOptions(null);
        setEditingMessage(message.id);
        setEditContent(message.content);
    };

    const cancelEditing = () => {
        setEditingMessage(null);
        setEditContent('');
    };

    const saveEditedMessage = async () => {
        if (!editContent.trim() || !editingMessage) return;
        try {
            await editMessageApi(editingMessage, editContent.trim(), currentUser.id, selectedChat.id);
            cancelEditing();
        } catch (error) {
            console.error('Error editing message:', error);
            alert(error.response?.data?.message || 'Failed to edit message.');
        }
    };
    
    // ✅ FIX: Use the parseUTCDate helper for correct time comparison.
    const canEditMessage = (message) => {
        if (message.senderId !== currentUser.id) return false;
        const messageTime = parseUTCDate(message.timestamp);
        if (!messageTime) return false; // Handle case where timestamp is invalid
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60000);
        return messageTime > fiveMinutesAgo;
    };
    
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    // ✅ FIX: Use the parseUTCDate helper for correct time display.
    const formatTime = (timestamp) => !timestamp ? '' : parseUTCDate(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // ✅ FIX: Use the parseUTCDate helper for correct date display.
    const formatDate = (timestamp) => {
        if (!timestamp) return '';
        const date = parseUTCDate(timestamp);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        if (date.toDateString() === today.toDateString()) return 'Today';
        if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
        return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    };

    const groupedMessages = messages.reduce((groups, message) => {
        const date = formatDate(message.timestamp);
        if (!groups[date]) groups[date] = [];
        groups[date].push(message);
        return groups;
    }, {});
    
    const filteredChats = chats.filter(chat => chat.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const filteredContacts = allUsers.filter(user => (user.name || user.username).toLowerCase().includes(searchQuery.toLowerCase()));

    // Render logic starts here
    return (
        <div className="flex h-screen overflow-hidden bg-slate-50 font-sans">
             {/* Sidebar */}
            <div className={`w-full flex-col border-r border-slate-200 bg-white transition-all duration-300 md:flex md:w-80 lg:w-96 ${selectedChat ? 'hidden' : 'flex'}`}>
                {/* ... Sidebar header and search (no changes) ... */}
                <div className="p-4 bg-purple-600 text-white flex justify-between items-center shadow-md">
                    <div className="flex items-center space-x-3">
                         <div className="bg-white text-purple-600 rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl">
                             {currentUser?.username?.charAt(0).toUpperCase() || '?'}
                         </div>
                         <div>
                             <h4 className="font-semibold">{currentUser?.name || currentUser?.username}</h4>
                             <div className="flex items-center text-xs text-purple-200">
                                 <span className={`mr-1.5 h-2 w-2 rounded-full ${connectionStatus === 'connected' ? 'bg-green-400' : 'bg-red-400'}`}></span>
                                 {connectionStatus === 'connected' ? 'Online' : 'Offline'}
                             </div>
                         </div>
                    </div>
                    <button onClick={logout} className="p-2 rounded-full transition-colors hover:bg-purple-700" aria-label="Logout"><LogOut size={20} /></button>
                </div>
                <div className="flex border-b border-slate-200">
                    <button className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${activeTab === 'chats' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-slate-500 hover:bg-slate-50'}`} onClick={() => setActiveTab('chats')}><MessageCircle size={16} /> Chats</button>
                    <button className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${activeTab === 'contacts' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-slate-500 hover:bg-slate-50'}`} onClick={() => setActiveTab('contacts')}><Users size={16} /> Contacts</button>
                </div>
                <div className="p-3 border-b border-slate-200">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input type="text" className="w-full rounded-full bg-slate-100 py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none" placeholder={activeTab === 'chats' ? "Search chats..." : "Search contacts..."} value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {activeTab === 'chats' && (filteredChats.length > 0 ? filteredChats.map(chat => (
                        <div key={chat.id} onClick={() => { setSelectedChat(chat); }} className={`flex cursor-pointer items-center space-x-3 p-3 transition-colors relative ${selectedChat?.id === chat.id ? 'bg-slate-50' : 'hover:bg-slate-50'}`}>
                           {selectedChat?.id === chat.id && <div className="absolute left-0 top-0 h-full w-1 bg-purple-600 rounded-r-full"></div>}
                            <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex-shrink-0 flex justify-center items-center font-semibold text-lg">{chat.avatar.toUpperCase()}</div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center">
                                    <h4 className="font-semibold truncate text-slate-800">{chat.name}</h4>
                                    <span className="text-xs text-slate-400 flex-shrink-0 ml-2">{formatTime(chat.lastMessageTime)}</span>
                                </div>
                                <div className="flex justify-between items-start">
                                    <p className="text-sm text-slate-500 truncate">{chat.lastMessage}</p>
                                    {chat.unreadCount > 0 && <span className="mt-1 bg-purple-600 text-white text-xs font-bold rounded-full px-2 py-0.5 min-w-[1.25rem] text-center">{chat.unreadCount}</span>}
                                </div>
                            </div>
                        </div>
                    )) : <div className="text-center p-8 text-slate-500"><MessageCircle className="w-10 h-10 mx-auto mb-2 text-purple-300" /><p>No chats yet.</p></div>)}
                     {activeTab === 'contacts' && (
                        loading.users ? <div className="flex justify-center p-8"><Loader2 className="animate-spin text-purple-500" /></div> :
                        filteredContacts.length > 0 ? filteredContacts.map(user => (
                            <div key={user.id} onClick={() => startNewChat(user)} className="p-3 hover:bg-slate-50 cursor-pointer flex items-center space-x-3 transition-colors">
                                <div className="bg-purple-600 text-white rounded-full w-10 h-10 flex justify-center items-center font-semibold">{(user.name || user.username)?.charAt(0).toUpperCase() || '?' }</div>
                                <div>
                                    <div className="font-semibold text-slate-800">{user.name || user.username}</div>
                                    <div className="text-xs text-slate-500">{user.email}</div>
                                </div>
                            </div>
                        )) : <div className="text-center p-8 text-slate-500"><Users className="w-10 h-10 mx-auto mb-2 text-purple-300" /><p>No contacts found.</p></div>
                    )}
                </div>
            </div>

            {/* Main Chat Area */}
            <div className={`flex-1 flex-col bg-slate-100 ${selectedChat ? 'flex' : 'hidden md:flex'}`}>
                {selectedChat ? (
                    <>
                        <div className="p-3 border-b bg-white flex justify-between items-center shadow-sm">
                           <div className="flex items-center space-x-3">
                                <button onClick={() => setSelectedChat(null)} className="p-2 md:hidden rounded-full hover:bg-slate-100"><ArrowLeft size={20} /></button>
                                <div className="bg-purple-600 text-white rounded-full w-10 h-10 flex justify-center items-center font-semibold">{selectedChat.avatar.toUpperCase()}</div>
                                <div>
                                    <h3 className="font-semibold text-slate-800">{selectedChat.name}</h3>
                                    <p className="text-xs text-slate-500">{connectionStatus === 'connected' ? 'Online' : 'Offline'}</p>
                                </div>
                            </div>
                            <div className="flex space-x-1">
                                <button className="p-2 rounded-full transition-colors text-slate-500 hover:bg-slate-100" aria-label="Voice call"><Phone size={20} /></button>
                                <button className="p-2 rounded-full transition-colors text-slate-500 hover:bg-slate-100" aria-label="Video call"><Video size={20} /></button>
                                <button className="p-2 rounded-full transition-colors text-slate-500 hover:bg-slate-100" aria-label="More options"><MoreVertical size={20} /></button>
                            </div>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {loading.messages && isInitialLoad ? <div className="flex justify-center items-center h-full"><Loader2 className="animate-spin text-purple-500" size={32} /></div> :
                                Object.entries(groupedMessages).map(([date, dateMessages]) => (
                                    <React.Fragment key={date}>
                                        <div className="flex justify-center my-4"><div className="bg-slate-200 text-slate-600 text-xs px-3 py-1 rounded-full">{date}</div></div>
                                        {dateMessages.map(msg => (
                                            <div key={msg.id || msg.tempId} className={`flex items-start gap-3 group ${msg.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}>
                                                {msg.senderId !== currentUser.id && (
                                                    <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex-shrink-0 flex justify-center items-center font-semibold text-sm mt-5">{selectedChat.avatar.toUpperCase()}</div>
                                                )}

                                                <div className={`w-full max-w-lg ${msg.senderId === currentUser.id ? 'ml-auto' : ''}`}>
                                                    {msg.senderId !== currentUser.id && (
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className="font-semibold text-sm text-slate-800">{selectedChat.name}</span>
                                                            <span className="text-xs text-slate-500">{formatTime(msg.timestamp)}</span>
                                                        </div>
                                                    )}

                                                    <div className={`relative max-w-fit ${msg.senderId === currentUser.id ? 'ml-auto' : ''}`}>
                                                        <ReactionBar onReact={(emoji) => alert(`Reacted with ${emoji}`)} />
                                                        
                                                        <div className={`px-3 py-2 ${msg.senderId === currentUser.id ? 'bg-purple-100 text-slate-800 rounded-lg' : 'bg-white border border-slate-200 text-slate-800 rounded-lg'}`}>
                                                            {editingMessage === msg.id ? (
                                                                <div className="flex items-center gap-2">
                                                                    <input type="text" value={editContent} onChange={e => setEditContent(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && saveEditedMessage()} autoFocus className="w-full bg-transparent border-b border-purple-400 outline-none text-sm" />
                                                                    <button onClick={saveEditedMessage} className="text-green-500 hover:text-green-700"><CheckCircle size={18} /></button>
                                                                    <button onClick={cancelEditing} className="text-red-500 hover:text-red-700"><X size={18} /></button>
                                                                </div>
                                                            ) : (
                                                                <p className="whitespace-pre-wrap break-words text-sm">{msg.content}</p>
                                                            )}
                                                        </div>
                                                        
                                                        {msg.senderId === currentUser.id && (
                                                            <div className="flex items-center mt-1 justify-end gap-1 text-slate-400">
                                                                {msg.edited && <span className="text-xs italic">(edited)</span>}
                                                                <span className="text-xs">{formatTime(msg.timestamp)}</span>
                                                                <MessageStatus message={msg} />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                {msg.senderId === currentUser.id && (
                                                    <div className="relative flex items-center self-center">
                                                        <button onClick={() => setMessageOptions(messageOptions === msg.id ? null : msg.id)} className="p-1 rounded-full text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-slate-200">
                                                            <MoreVertical size={16} />
                                                        </button>
                                                         {messageOptions === msg.id && (
                                                            <div ref={optionsMenuRef} className="absolute bottom-full right-0 mb-2 w-28 bg-white rounded-lg shadow-xl border border-slate-100 z-10 overflow-hidden">
                                                                {canEditMessage(msg) && <button onClick={() => startEditing(msg)} className="w-full text-left text-sm px-3 py-2 flex items-center gap-2 hover:bg-slate-50"><Edit3 size={14}/> Edit</button>}
                                                                <button onClick={() => handleDeleteMessage(msg.id)} className="w-full text-left text-sm px-3 py-2 flex items-center gap-2 text-red-600 hover:bg-red-50"><Trash2 size={14}/> Delete</button>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </React.Fragment>
                                ))}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="p-3 border-t bg-white">
                             <div className="flex-1 p-2 border rounded-lg focus-within:ring-2 focus-within:ring-purple-500">
                                 <input ref={messageInputRef} type="text" value={message} onChange={e => setMessage(e.target.value)} onKeyDown={handleKeyPress} className="w-full outline-none bg-transparent text-sm" placeholder={`Message ${selectedChat.name}`} disabled={sending} />
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <div className="flex items-center gap-1">
                                    <button className="p-2 text-slate-500 hover:text-purple-600 rounded-md transition-colors hover:bg-slate-100"><Smile size={20} /></button>
                                    <button className="p-2 text-slate-500 hover:text-purple-600 rounded-md transition-colors hover:bg-slate-100"><Paperclip size={20} /></button>
                                    <button className="p-2 text-slate-500 hover:text-purple-600 rounded-md transition-colors hover:bg-slate-100"><Mic size={20} /></button>
                                </div>
                                <button onClick={sendMessage} disabled={!message.trim() || sending} className={`p-2 rounded-md transition-all duration-200 ${!message.trim() || sending ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-purple-600 text-white hover:bg-purple-700'}`} aria-label="Send message">
                                    {sending ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center bg-slate-100">
                        <div className="text-center text-slate-500">
                            <MessageCircle className="w-16 h-16 mx-auto mb-4 text-purple-300" />
                            <p className="text-lg font-semibold">Select a chat to start messaging</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatsPage;