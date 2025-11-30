import { useState, useEffect } from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton, Chip, Stack, Tabs, Tab } from '@mui/material';
import { Allotment } from 'allotment';
import 'allotment/dist/style.css';
import { usePanelStore } from './store/usePanelStore';
import MembersPanel from './components/panels/MembersPanel';
import KanbanPanel from './components/panels/KanbanPanel';
import ChatPanel from './components/panels/ChatPanel';
import NotesPanel from './components/panels/NotesPanel';
import ResourcesPanel from './components/panels/ResourcesPanel';
import ActivityPanel from './components/panels/ActivityPanel';
import ToolsPanel from './components/panels/ToolsPanel';
import AIPanel from './components/panels/AIPanel';
import { Users, LayoutDashboard, MessageSquare, FileText, Link, Activity, Wrench, Sparkles, X, Command, Zap } from 'lucide-react';

const PANELS = {
  members: { component: MembersPanel, icon: Users, title: 'Members', color: 'text-emerald-600' },
  kanban: { component: KanbanPanel, icon: LayoutDashboard, title: 'Kanban', color: 'text-blue-600' },
  chat: { component: ChatPanel, icon: MessageSquare, title: 'Chat', color: 'text-purple-600' },
  notes: { component: NotesPanel, icon: FileText, title: 'Notes', color: 'text-amber-600' },
  resources: { component: ResourcesPanel, icon: Link, title: 'Resources', color: 'text-cyan-600' },
  activity: { component: ActivityPanel, icon: Activity, title: 'Activity', color: 'text-rose-600' },
  tools: { component: ToolsPanel, icon: Wrench, title: 'Tools', color: 'text-indigo-600' },
  ai: { component: AIPanel, icon: Sparkles, title: 'AI', color: 'text-violet-600' },
};

function TabBar({ tabs, activeTab, onTabClick, onTabClose, region }) {
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'grey.50' }}>
      <Tabs value={activeTab} onChange={(e, val) => onTabClick(val)} variant="scrollable" scrollButtons="auto">
        {tabs.map((tabId) => {
          const panel = PANELS[tabId];
          const Icon = panel.icon;
          return (
            <Tab
              key={tabId}
              value={tabId}
              label={
                <Stack direction="row" spacing={1} alignItems="center">
                  <Icon size={16} />
                  <span>{panel.title}</span>
                  {tabs.length > 1 && (
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        onTabClose(tabId);
                      }}
                      sx={{ ml: 0.5, p: 0.25 }}
                    >
                      <X size={12} />
                    </IconButton>
                  )}
                </Stack>
              }
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData('panelId', tabId);
                e.dataTransfer.setData('fromRegion', region);
              }}
            />
          );
        })}
      </Tabs>
    </Box>
  );
}

function PanelRegion({ region, tabs, activeTab, onTabClick, onTabClose, onDrop }) {
  const [dragOver, setDragOver] = useState(false);
  const Component = PANELS[activeTab]?.component;

  return (
    <Box
      sx={{
        height: '100%',
        bgcolor: 'background.paper',
        borderRadius: 1,
        overflow: 'hidden',
        boxShadow: 1,
        border: 1,
        borderColor: 'divider',
        position: 'relative'
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        const panelId = e.dataTransfer.getData('panelId');
        const fromRegion = e.dataTransfer.getData('fromRegion');
        if (panelId && fromRegion !== region) {
          onDrop(panelId, fromRegion, region);
        }
      }}
    >
      {dragOver && (
        <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'primary.light', opacity: 0.1, border: 2, borderColor: 'primary.main', borderRadius: 1, zIndex: 50, pointerEvents: 'none' }} />
      )}
      
      <TabBar
        tabs={tabs}
        activeTab={activeTab}
        onTabClick={onTabClick}
        onTabClose={onTabClose}
        region={region}
      />
      
      <Box sx={{ height: 'calc(100% - 48px)', overflow: 'auto', bgcolor: 'background.paper' }}>
        {Component && <Component />}
      </Box>
    </Box>
  );
}

export default function App() {
  const { layout, activeTabs, movePanel, setActiveTab, removePanel } = usePanelStore();
  const [cmdOpen, setCmdOpen] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCmdOpen(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleDrop = (panelId, fromRegion, toRegion) => {
    movePanel(panelId, fromRegion, toRegion);
    setActiveTab(toRegion, panelId);
  };

  return (
    <Box sx={{ height: '100vh', width: '100vw', bgcolor: 'grey.100', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static" color="default" elevation={1} sx={{ bgcolor: 'background.paper' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Box sx={{ p: 1, background: 'linear-gradient(135deg, #1976d2, #9c27b0)', borderRadius: 1, boxShadow: 2 }}>
              <LayoutDashboard size={18} color="white" />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={700}>Room Workspace</Typography>
              <Typography variant="caption" color="text.secondary">Collaborative workspace</Typography>
            </Box>
          </Stack>
          
          <Stack direction="row" spacing={2} alignItems="center">
            <Chip icon={<Zap size={14} />} label="Live" size="small" color="warning" variant="outlined" />
            <IconButton onClick={() => setCmdOpen(true)} sx={{ bgcolor: 'grey.900', color: 'white', '&:hover': { bgcolor: 'grey.800' } }}>
              <Command size={16} />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      <Box sx={{ flex: 1, p: 2 }}>
        <Allotment>
          {layout.left.length > 0 && (
            <Allotment.Pane minSize={220} preferredSize={280}>
              <PanelRegion
                region="left"
                tabs={layout.left}
                activeTab={activeTabs.left || layout.left[0]}
                onTabClick={(id) => setActiveTab('left', id)}
                onTabClose={(id) => removePanel(id, 'left')}
                onDrop={handleDrop}
              />
            </Allotment.Pane>
          )}

          <Allotment.Pane>
            <Allotment vertical>
              {layout.top.length > 0 && (
                <Allotment.Pane minSize={80} preferredSize={100}>
                  <PanelRegion
                    region="top"
                    tabs={layout.top}
                    activeTab={activeTabs.top || layout.top[0]}
                    onTabClick={(id) => setActiveTab('top', id)}
                    onTabClose={(id) => removePanel(id, 'top')}
                    onDrop={handleDrop}
                  />
                </Allotment.Pane>
              )}

              {layout.center.length > 0 && (
                <Allotment.Pane>
                  <PanelRegion
                    region="center"
                    tabs={layout.center}
                    activeTab={activeTabs.center || layout.center[0]}
                    onTabClick={(id) => setActiveTab('center', id)}
                    onTabClose={(id) => removePanel(id, 'center')}
                    onDrop={handleDrop}
                  />
                </Allotment.Pane>
              )}

              {layout.bottom.length > 0 && (
                <Allotment.Pane minSize={220} preferredSize={320}>
                  <PanelRegion
                    region="bottom"
                    tabs={layout.bottom}
                    activeTab={activeTabs.bottom || layout.bottom[0]}
                    onTabClick={(id) => setActiveTab('bottom', id)}
                    onTabClose={(id) => removePanel(id, 'bottom')}
                    onDrop={handleDrop}
                  />
                </Allotment.Pane>
              )}
            </Allotment>
          </Allotment.Pane>

          {layout.right.length > 0 && (
            <Allotment.Pane minSize={220} preferredSize={280}>
              <PanelRegion
                region="right"
                tabs={layout.right}
                activeTab={activeTabs.right || layout.right[0]}
                onTabClick={(id) => setActiveTab('right', id)}
                onTabClose={(id) => removePanel(id, 'right')}
                onDrop={handleDrop}
              />
            </Allotment.Pane>
          )}
        </Allotment>
      </Box>
    </Box>
  );
}
