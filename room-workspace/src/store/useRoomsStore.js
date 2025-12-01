import { create } from 'zustand';

export const useRoomsStore = create((set) => ({
  rooms: [
    { id: 1, name: 'Design System Project', category: 'Design', members: 12, visibility: 'public', tags: ['UI/UX', 'Figma', 'Design Tokens'], active: true, icon: '🎨', color: '#ec4899', colorEnd: '#f43f5e', progress: 68, starred: true, description: 'Building a comprehensive design system for our product suite', trending: true, avatars: [] },
    { id: 2, name: 'AI Startup MVP', category: 'Startup', members: 8, visibility: 'private', tags: ['React', 'Python', 'ML', 'OpenAI'], active: true, icon: '🚀', color: '#6366f1', colorEnd: '#8b5cf6', progress: 45, starred: false, description: 'Developing an AI-powered SaaS platform for content generation', avatars: [] },
    { id: 3, name: 'Content Strategy Team', category: 'Content', members: 5, visibility: 'public', tags: ['Writing', 'SEO', 'Marketing'], active: false, icon: '📝', color: '#10b981', colorEnd: '#14b8a6', progress: 82, description: 'Creating engaging content and SEO strategies', avatars: [] },
    { id: 4, name: 'Mobile App Development', category: 'Software', members: 15, visibility: 'public', tags: ['React Native', 'iOS', 'Android'], active: true, icon: '📱', color: '#f59e0b', colorEnd: '#ef4444', progress: 34, trending: true, description: 'Cross-platform mobile app for e-commerce', avatars: [] },
    { id: 5, name: 'Data Science Research', category: 'Study', members: 7, visibility: 'public', tags: ['Python', 'TensorFlow', 'Analytics'], active: true, icon: '📊', color: '#3b82f6', colorEnd: '#06b6d4', progress: 91, starred: true, description: 'Advanced machine learning research and experiments', avatars: [] },
    { id: 6, name: 'Web3 DApp Project', category: 'Startup', members: 10, visibility: 'private', tags: ['Blockchain', 'Solidity', 'Web3'], active: true, icon: '⛓️', color: '#8b5cf6', colorEnd: '#a855f7', progress: 23, description: 'Decentralized application on Ethereum', avatars: [] },
  ],
  addRoom: (room) => set((state) => ({ rooms: [...state.rooms, room] })),
  removeRoom: (id) => set((state) => ({ rooms: state.rooms.filter((r) => r.id !== id) })),
}));
