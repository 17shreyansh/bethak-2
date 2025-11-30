import { create } from 'zustand';

export const useRoomsStore = create((set) => ({
  rooms: [
    { id: 1, name: 'Design System Project', category: 'Design', members: 4, visibility: 'public', tags: ['UI/UX', 'Figma'], active: true },
    { id: 2, name: 'AI Startup MVP', category: 'Startup', members: 6, visibility: 'private', tags: ['React', 'Python', 'ML'], active: true },
    { id: 3, name: 'Content Strategy Team', category: 'Content', members: 3, visibility: 'public', tags: ['Writing', 'SEO'], active: false },
  ],
  addRoom: (room) => set((state) => ({ rooms: [...state.rooms, room] })),
  removeRoom: (id) => set((state) => ({ rooms: state.rooms.filter((r) => r.id !== id) })),
}));
