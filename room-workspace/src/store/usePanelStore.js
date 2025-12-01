import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const usePanelStore = create(
  persist(
    (set) => ({
      layout: {
        left: ['members'],
        top: ['kanban'],
        center: ['chat'],
        bottom: ['notes', 'resources', 'activity'],
        right: ['tools', 'ai'],
      },
      activeTabs: {
        left: 'members',
        top: 'kanban',
        center: 'chat',
        bottom: 'notes',
        right: 'tools',
      },
      movePanel: (panelId, fromRegion, toRegion) =>
        set((state) => {
          const newLayout = { ...state.layout };
          const newActiveTabs = { ...state.activeTabs };
          
          // Remove from source
          newLayout[fromRegion] = newLayout[fromRegion].filter((id) => id !== panelId);
          
          // Add to target if not exists
          if (!newLayout[toRegion].includes(panelId)) {
            newLayout[toRegion] = [...newLayout[toRegion], panelId];
            newActiveTabs[toRegion] = panelId;
          }
          
          // Update active tab in source if needed
          if (newActiveTabs[fromRegion] === panelId && newLayout[fromRegion].length > 0) {
            newActiveTabs[fromRegion] = newLayout[fromRegion][0];
          }
          
          return { layout: newLayout, activeTabs: newActiveTabs };
        }),
      addPanel: (panelId, region) =>
        set((state) => {
          const newLayout = { ...state.layout };
          if (!newLayout[region].includes(panelId)) {
            newLayout[region] = [...newLayout[region], panelId];
          }
          return { layout: newLayout };
        }),
      setActiveTab: (region, tabId) =>
        set((state) => ({
          activeTabs: { ...state.activeTabs, [region]: tabId },
        })),
      removePanel: (panelId, region) =>
        set((state) => {
          const newLayout = { ...state.layout };
          newLayout[region] = newLayout[region].filter((id) => id !== panelId);
          const newActiveTabs = { ...state.activeTabs };
          if (newActiveTabs[region] === panelId && newLayout[region].length > 0) {
            newActiveTabs[region] = newLayout[region][0];
          }
          return { layout: newLayout, activeTabs: newActiveTabs };
        }),
    }),
    { name: 'workspace-layout' }
  )
);
