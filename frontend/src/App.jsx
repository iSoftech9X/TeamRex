// import React, { useState } from 'react';
// import LoginPage from './components/LoginPage';
// import Sidebar from './components/Sidebar';
// import TeamsPage from './components/TeamsPage';
// import ActivityPage from './components/ActivityPage';
// import MeetingsPage from './components/MeetingsPage';
// import BroadcastPage from './components/BroadcastPage';
// import ChatsPage from './components/ChatsPage';
// import ProfileDashboard from './components/ProfileDashboard';
// import { registerUser, loginUser } from './services/authService';
// import { AuthProvider } from './contexts/AuthContext';

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [activeSection, setActiveSection] = useState('Teams');

//   const handleLogin = (userData) => {
//     setIsLoggedIn(true);
//     setCurrentUser(userData);
//   };

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     setCurrentUser(null);
//     setActiveSection('Teams');
//   };

//   const renderActivePage = () => {
//     const props = { userId: currentUser?.id, currentUser };

//     switch (activeSection) {
//       case 'Activity':
//         return <ActivityPage {...props} />;
//       case 'Chats':
//         return <ChatsPage {...props} />;
//       case 'Teams':
//         return <TeamsPage {...props} />;
//       case 'Meeting':
//         return <MeetingsPage {...props} />;
//       case 'Broadcast':
//         return <BroadcastPage {...props} />;
//       case 'Profile':
//         return <ProfileDashboard {...props} />;
//       default:
//         return <TeamsPage {...props} />;
//     }
//   };

//   return (
//     <AuthProvider>
//       <div className="min-h-screen">
//         {isLoggedIn ? (
//           <div className="flex h-screen bg-gray-100">
//             <Sidebar
//               onLogout={handleLogout}
//               currentUser={currentUser}
//               activeSection={activeSection}
//               onSectionChange={setActiveSection}
//             />
//             <div className="flex-1 overflow-y-auto p-4">
//               {renderActivePage()}
//             </div>
//           </div>
//         ) : (
//           <LoginPage onLogin={handleLogin} />
//         )}
//       </div>
//     </AuthProvider>
//   );
// }

// export default App;
// App.js
import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import Sidebar from './components/Sidebar';
import TeamsPage from './components/TeamsPage';
import ActivityPage from './components/ActivityPage';
import MeetingsPage from './components/MeetingsPage';
import BroadcastPage from './components/BroadcastPage';
import ChatsPage from './components/ChatsPage';
import ProfileDashboard from './components/ProfileDashboard';
import { useAuth } from './contexts/AuthContext';
import { Loader2 } from 'lucide-react';

function App() {
  const [activeSection, setActiveSection] = useState('Teams');
  const { currentUser, isAuthenticated, logout, loading } = useAuth();

  const handleLogout = () => {
    logout();
    setActiveSection('Teams');
  };

  const renderActivePage = () => {
    const props = { userId: currentUser?.id, currentUser };

    switch (activeSection) {
      case 'Activity':
        return <ActivityPage {...props} />;
      case 'Chats':
        return <ChatsPage {...props} />;
      case 'Teams':
        return <TeamsPage {...props} />;
      case 'Meeting':
        return <MeetingsPage {...props} />;
      case 'Broadcast':
        return <BroadcastPage {...props} />;
      case 'Profile':
        return <ProfileDashboard {...props} />;
      default:
        return <TeamsPage {...props} />;
    }
  };

  // Show loading spinner while auth state is being determined
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {isAuthenticated ? (
        <div className="flex h-screen bg-gray-100">
          <Sidebar
            onLogout={handleLogout}
            currentUser={currentUser}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
          <div className="flex-1 overflow-y-auto p-4">
            {renderActivePage()}
          </div>
        </div>
      ) : (
        <LoginPage />
      )}
    </div>
  );
}

export default App;