import { create } from 'zustand';

export const useWorkspaceStore = create((set) => ({
  windows: [
    { id: 'notes', title: 'Notes', x: 100, y: 100, width: 500, height: 400, visible: false, zIndex: 1 },
    { id: 'files', title: 'Files', x: 150, y: 150, width: 500, height: 400, visible: false, zIndex: 2 },
    { id: 'activity', title: 'Activity', x: 200, y: 200, width: 450, height: 400, visible: false, zIndex: 3 },
    { id: 'ai', title: 'AI Assistant', x: 250, y: 250, width: 500, height: 450, visible: false, zIndex: 4 },
    { id: 'resources', title: 'Resources', x: 300, y: 300, width: 500, height: 400, visible: false, zIndex: 5 },
    { id: 'settings', title: 'Settings', x: 350, y: 350, width: 450, height: 400, visible: false, zIndex: 6 },
  ],
  maxZIndex: 6,
  
  toggleWindow: (id) =>
    set((state) => {
      const window = state.windows.find((w) => w.id === id);
      if (!window) return state;
      
      if (window.visible) {
        return {
          windows: state.windows.map((w) =>
            w.id === id ? { ...w, visible: false } : w
          ),
        };
      } else {
        return {
          windows: state.windows.map((w) =>
            w.id === id ? { ...w, visible: true, zIndex: state.maxZIndex + 1 } : w
          ),
          maxZIndex: state.maxZIndex + 1,
        };
      }
    }),
  
  updateWindow: (id, updates) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, ...updates } : w
      ),
    })),
  
  bringToFront: (id) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, zIndex: state.maxZIndex + 1 } : w
      ),
      maxZIndex: state.maxZIndex + 1,
    })),
}));

export const PANEL_TITLES = {
  kanban: 'Kanban Board',
  notes: 'Notes',
  chat: 'Chat',
  resources: 'Resources',
  activity: 'Activity',
  files: 'Files',
  ai: 'AI Assistant',
  settings: 'Settings',
};
