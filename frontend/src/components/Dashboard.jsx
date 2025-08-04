import React, { useState } from 'react';
import Sidebar from './Sidebar.jsx';
import ChatList from './ChatsPage.jsx';
import ChatArea from './ChatArea.jsx';
import ProfileModal from './ProfileModal.jsx'; // <-- new component

const Dashboard = ({ onLogout, currentUser }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [activeTab, setActiveTab] = useState('Recent');
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleSectionChange = (section) => {
    if (section === 'Profile') {
      setShowProfileModal(true);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 relative">
      {/* Sidebar */}
      <Sidebar
        onLogout={onLogout}
        currentUser={currentUser}
        activeSection=""
        onSectionChange={handleSectionChange}
      />

      {/* Chat List */}
      <ChatList 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
      />

      {/* Main Chat Area */}
      <ChatArea selectedChat={selectedChat} />

      {/* Profile Modal */}
      {showProfileModal && (
        <ProfileModal
          user={currentUser}
          onClose={() => setShowProfileModal(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
