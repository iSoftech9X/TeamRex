import { useEffect, useState } from 'react';
import { getMessages, sendMessage } from '../services/chatService';
import { connectWebSocket, sendWebSocketMessage } from '../services/websocketService';

const ChatArea = ({ senderId, receiverId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    getMessages(senderId, receiverId).then(setMessages);
    connectWebSocket((newMsg) => {
      if (newMsg.senderId === senderId || newMsg.receiverId === senderId) {
        setMessages((prev) => [...prev, newMsg]);
      }
    });
  }, [senderId, receiverId]);

  const handleSend = () => {
    const msg = {
      senderId,
      receiverId,
      content: input,
      timestamp: new Date().toISOString()
    };
    sendMessage(msg);
    sendWebSocketMessage(msg);
    setInput('');
  };

  return (
    <div>
      {messages.map((msg, i) => <div key={i}>{msg.content}</div>)}
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};



// import React from 'react';

// const ChatArea = ({ messages, message, setMessage, handleSend, selectedChat, currentUser }) => {
//   return (
//     <div className="flex flex-col h-full">
//       <div className="flex items-center justify-between px-4 py-2 border-b">
//         <h2 className="text-lg font-semibold">Chat with {selectedChat.username}</h2>
//       </div>

//       <div className="flex-1 overflow-y-auto p-4 space-y-2">
//         {messages.map((msg) => (
//           <div
//             key={msg.id}
//             className={`max-w-xs px-4 py-2 rounded-lg ${
//               msg.senderId === currentUser.id ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-200 text-black'
//             }`}
//           >
//             {msg.content}
//           </div>
//         ))}
//       </div>

//       <div className="flex items-center border-t p-2">
//         <input
//           type="text"
//           placeholder="Type a message..."
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           className="flex-1 border rounded px-4 py-2"
//         />
//         <button
//           onClick={handleSend}
//           className="ml-2 bg-green-500 text-white px-4 py-2 rounded"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatArea;
