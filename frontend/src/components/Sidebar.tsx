import React from 'react';
import { 
  Bell, 
  MessageCircle, 
  Users, 
  Calendar, 
  Radio 
} from 'lucide-react';
import { ActiveTab } from '../types';

interface SidebarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const menuItems = [
    { id: 'activity' as ActiveTab, icon: Bell, label: 'Activity' },
    { id: 'chats' as ActiveTab, icon: MessageCircle, label: 'Chats' },
    { id: 'channels' as ActiveTab, icon: Users, label: 'Teams' },
    { id: 'meetings' as ActiveTab, icon: Calendar, label: 'Meeting' },
    { id: 'broadcast' as ActiveTab, icon: Radio, label: 'Broadcast' },
  ];

  return (
    <div className="w-20 bg-purple-900 h-screen flex flex-col items-center py-4">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        
        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex flex-col items-center justify-center w-16 h-16 mb-2 rounded-lg transition-all duration-200 hover:bg-purple-800 ${
              isActive ? 'bg-purple-800 text-white' : 'text-purple-200'
            }`}
          >
            <Icon size={24} className="mb-1" />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default Sidebar;