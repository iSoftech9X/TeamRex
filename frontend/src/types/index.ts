export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: 'online' | 'offline' | 'away' | 'busy';
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  timestamp: Date;
  type: 'text' | 'file' | 'image';
  isOwn?: boolean;
  receiverId?: string;
  channelId?: string;
  status?: 'sent' | 'delivered' | 'read';
}

export interface Channel {
  id: string;
  name: string;
  teamId: string;
  memberIds: string[];
  isPrivate: boolean;
  description?: string;
  lastMessage?: Message;
}

export interface Team {
  id: string;
  name: string;
  avatar: string;
  isPrivate: boolean;
  channels: Channel[];
}

export interface ChatContact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
  status?: User['status'];
}

export interface FileItem {
  id: string;
  name: string;
  type: string;
  size: string;
  sharedOn: string;
  sharedBy: string;
  url: string;
}

export type ActiveTab = 'activity' | 'chats' | 'channels' | 'meetings' | 'broadcast';
export type ChatTab = 'chats' | 'files' | 'organization';