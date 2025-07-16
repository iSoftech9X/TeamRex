import { ChatContact, User, Message, Team, FileItem } from '../types';

export const mockContacts: ChatContact[] = [
  {
    id: '1',
    name: 'Allan Deyoung',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
    lastMessage: 'Hi! I will be working on Rebits from',
    timestamp: '2:21 PM',
    unreadCount: 0,
    isOnline: true,
  },
  {
    id: '2',
    name: 'IB Group',
    avatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=150',
    lastMessage: 'Checking for updates on IB Policy',
    timestamp: '1:45 PM',
    unreadCount: 3,
    isOnline: false,
  },
  {
    id: '3',
    name: 'Juan Carlos Gonzalez',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    lastMessage: 'Meeting scheduled for tomorrow',
    timestamp: '11:30 AM',
    unreadCount: 1,
    isOnline: true,
  },
  {
    id: '4',
    name: 'Suzuka',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    lastMessage: 'Thanks for the update!',
    timestamp: '10:15 AM',
    unreadCount: 0,
    isOnline: false,
  },
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Allan Deyoung',
    email: 'allan.deyoung@company.com',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
    status: 'online',
  },
  {
    id: '2',
    name: 'Juan Carlos Gonzalez',
    email: 'juan.gonzalez@company.com',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    status: 'online',
  },
  {
    id: '3',
    name: 'Suzuka',
    email: 'suzuka@company.com',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    status: 'away',
  },
  {
    id: '4',
    name: 'Hermit',
    email: 'hermit@company.com',
    avatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=150',
    status: 'busy',
  },
  {
    id: '5',
    name: 'Kristina',
    email: 'kristina@company.com',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
    status: 'online',
  },
];

export const mockMessages: Message[] = [
  {
    id: '1',
    content: 'Checking for updates on IB Policy',
    senderId: '1',
    senderName: 'Allan Deyoung',
    senderAvatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
    timestamp: new Date('2024-05-01T10:30:00'),
    type: 'text',
    isOwn: false,
    receiverId: undefined
  },
  {
    id: '2',
    content: 'Thanks for the update! I\'ll review the policy changes.',
    senderId: 'current-user',
    senderName: 'You',
    senderAvatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
    timestamp: new Date('2024-05-01T10:35:00'),
    type: 'text',
    isOwn: true,
    receiverId: undefined
  },
  {
    id: '3',
    content: 'Perfect! Let me know if you have any questions.',
    senderId: '1',
    senderName: 'Allan Deyoung',
    senderAvatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
    timestamp: new Date('2024-05-01T10:40:00'),
    type: 'text',
    isOwn: false,
    receiverId: undefined
  },
  {
    id: '4',
    content: 'Will do! The changes look comprehensive.',
    senderId: 'current-user',
    senderName: 'You',
    senderAvatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
    timestamp: new Date('2024-05-01T10:45:00'),
    type: 'text',
    isOwn: true,
    receiverId: undefined
  },
];

export const mockTeams: Team[] = [
  {
    id: '1',
    name: 'eLis Team Site',
    avatar: 'TS',
    isPrivate: true,
    channels: [
      {
        id: '1',
        name: 'General',
        teamId: '1',
        memberIds: ['1', '2', '3'],
        isPrivate: false,
      },
      {
        id: '2',
        name: 'Staff Notice',
        teamId: '1',
        memberIds: ['1', '2'],
        isPrivate: false,
      },
      {
        id: '3',
        name: 'ID-IT Cross Team Discussion',
        teamId: '1',
        memberIds: ['1', '2', '3', '4'],
        isPrivate: false,
      },
    ],
  },
  {
    id: '2',
    name: 'Support-Id Meetings',
    avatar: 'SM',
    isPrivate: false,
    channels: [
      {
        id: '4',
        name: 'General',
        teamId: '2',
        memberIds: ['1', '2', '3', '4', '5'],
        isPrivate: false,
      },
      {
        id: '5',
        name: 'Tech Support',
        teamId: '2',
        memberIds: ['1', '3', '5'],
        isPrivate: false,
      },
    ],
  },
  {
    id: '3',
    name: 'Web Editors',
    avatar: 'WE',
    isPrivate: false,
    channels: [
      {
        id: '6',
        name: 'General',
        teamId: '3',
        memberIds: ['2', '3', '4'],
        isPrivate: false,
      },
      {
        id: '7',
        name: 'Website Updates',
        teamId: '3',
        memberIds: ['2', '4'],
        isPrivate: false,
      },
    ],
  },
];

export const mockFiles: FileItem[] = [
  {
    id: '1',
    name: 'from Hermit to Allen.JPG',
    type: 'image/jpeg',
    size: '2.4 MB',
    sharedOn: '25m ago',
    sharedBy: 'Hermit',
    url: '#',
  },
  {
    id: '2',
    name: 'Important.File',
    type: 'application/pdf',
    size: '1.2 MB',
    sharedOn: '2 days ago',
    sharedBy: 'Hermit',
    url: '#',
  },
  {
    id: '3',
    name: 'Project_Specs.docx',
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    size: '856 KB',
    sharedOn: '1 week ago',
    sharedBy: 'Allan Deyoung',
    url: '#',
  },
];