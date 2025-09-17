// import React from 'react';
// import {
//   Bell,
//   MessageCircle,
//   Users,
//   Calendar,
//   Radio,
//   LogOut
// } from 'lucide-react';

// const Sidebar = ({ onLogout, currentUser, activeSection, onSectionChange, onToggleProfileModal }) => {
//   const menuItems = [
//     { id: 'Activity', label: 'Activity', icon: Bell },
//     { id: 'Chats', label: 'Chats', icon: MessageCircle },
//     { id: 'Teams', label: 'Teams', icon: Users },
//     { id: 'Meeting', label: 'Meeting', icon: Calendar },
//     { id: 'Broadcast', label: 'Broadcast', icon: Radio }
//   ];

//   return (
//     <div className="w-20 bg-purple-600 flex flex-col items-center py-6 space-y-6">
//       {/* Profile Icon */}
//       {currentUser && (
//         <div
//           onClick={onToggleProfileModal}
//           className="cursor-pointer text-center mb-2"
//         >
//           <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mb-1">
//             <span className="text-white text-sm font-semibold">
//               {currentUser.username ? currentUser.username.charAt(0).toUpperCase() : 'U'}
//             </span>
//           </div>
//           <div
//             className={`w-3 h-3 rounded-full mx-auto ${
//               currentUser.status === 'Online' ? 'bg-green-400' :
//               currentUser.status === 'Busy' ? 'bg-red-400' :
//               currentUser.status === 'Away' ? 'bg-yellow-400' : 'bg-gray-400'
//             }`}
//           ></div>
//         </div>
//       )}

//       {/* Menu */}
//       <div className="flex flex-col space-y-4">
//         {menuItems.map((item) => {
//           const Icon = item.icon;
//           const isActive = activeSection === item.id;

//           return (
//             <button
//               key={item.id}
//               onClick={() => onSectionChange(item.id)}
//               className={`group flex flex-col items-center p-3 rounded-xl transition-all duration-200 ${
//                 isActive
//                   ? 'bg-purple-500 text-white'
//                   : 'text-purple-200 hover:text-white hover:bg-purple-500'
//               }`}
//             >
//               <Icon className="w-6 h-6 mb-1" />
//               <span className="text-xs font-medium">{item.label}</span>
//             </button>
//           );
//         })}
//       </div>

//       {/* Logout */}
//       <div className="mt-auto">
//         <button
//           onClick={onLogout}
//           className="group flex flex-col items-center p-3 rounded-xl text-purple-200 hover:text-white hover:bg-purple-500 transition-all duration-200"
//         >
//           <LogOut className="w-6 h-6 mb-1" />
//           <span className="text-xs font-medium">Logout</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
import React from "react";
import {
  Bell,
  MessageCircle,
  Users,
  Calendar,
  Radio,
  LogOut,
} from "lucide-react";

const Sidebar = ({ onLogout, currentUser, activeSection, onSectionChange }) => {
  const menuItems = [
    { id: "Activity", label: "Activity", icon: Bell },
    { id: "Chats", label: "Chats", icon: MessageCircle },
    { id: "Teams", label: "Teams", icon: Users },
    { id: "Meeting", label: "Meeting", icon: Calendar },
    { id: "Broadcast", label: "Broadcast", icon: Radio },
  ];

  return (
    <div className="w-20 bg-purple-600 flex flex-col items-center py-6 space-y-6">
      {/* Profile Avatar */}
      {currentUser && (
        <div
          onClick={() => onSectionChange("Profile")}
          className="cursor-pointer text-center mb-2"
        >
          <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mb-1">
            <span className="text-white text-sm font-semibold">
              {currentUser.username
                ? currentUser.username.charAt(0).toUpperCase()
                : "U"}
            </span>
          </div>
          <div
            className={`w-3 h-3 rounded-full mx-auto ${
              currentUser.status === "Online"
                ? "bg-green-400"
                : currentUser.status === "Busy"
                ? "bg-red-400"
                : currentUser.status === "Away"
                ? "bg-yellow-400"
                : "bg-gray-400"
            }`}
          />
        </div>
      )}

      {/* Menu Items */}
      <div className="flex flex-col space-y-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`group flex flex-col items-center p-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-purple-500 text-white"
                  : "text-purple-200 hover:text-white hover:bg-purple-500"
              }`}
            >
              <Icon size={20} />
              <span className="text-[10px] mt-1">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Logout */}
      {currentUser && (
        <button
          onClick={onLogout}
          className="mt-auto mb-4 flex flex-col items-center p-3 rounded-xl text-purple-200 hover:text-white hover:bg-red-500 transition-all duration-200"
        >
          <LogOut size={20} />
          <span className="text-[10px] mt-1">Logout</span>
        </button>
      )}
    </div>
  );
};

export default Sidebar;
