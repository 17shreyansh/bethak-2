import { useState, useEffect, useRef } from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton, Chip, Stack, Tooltip, Badge, Menu, MenuItem, Divider, Button } from '@mui/material';
import { Allotment } from 'allotment';
import 'allotment/dist/style.css';
import { usePanelStore } from './store/usePanelStore';
import { glassStyles } from './theme';

import MembersPanel from './components/panels/MembersPanel';
import KanbanPanel from './components/panels/KanbanPanel';
import ChatPanel from './components/panels/ChatPanel';
import NotesPanel from './components/panels/NotesPanel';
import ResourcesPanel from './components/panels/ResourcesPanel';
import ActivityPanel from './components/panels/ActivityPanel';
import ToolsPanel from './components/panels/ToolsPanel';
import AIPanel from './components/panels/AIPanel';
import TaskBoardPanel from './components/panels/TaskBoardPanel';
import FileDrawerPanel from './components/panels/FileDrawerPanel';
import WhiteboardPanel from './components/panels/WhiteboardPanel';
import TimelinePanel from './components/panels/TimelinePanel';
import CodePanel from './components/panels/CodePanel';
import AIAgentPanel from './components/panels/AIAgentPanel';
import TeamPresencePanel from './components/panels/TeamPresencePanel';
import AnalyticsPanel from './components/panels/AnalyticsPanel';
import MiniAppsPanel from './components/panels/MiniAppsPanel';

import { Users, LayoutDashboard, MessageSquare, FileText, Link, Activity, Wrench, Sparkles, X, Command, Zap, Search, Settings, Bell, Layout, Save, CheckSquare, Folder, Palette, Calendar, Code2, Bot, BarChart3, Grid3x3 } from 'lucide-react';

const PANELS = {
  members: { component: MembersPanel, icon: Users, title: 'Members', color: '#10b981' },
  kanban: { component: KanbanPanel, icon: LayoutDashboard, title: 'Kanban', color: '#3b82f6' },
  chat: { component: ChatPanel, icon: MessageSquare, title: 'Chat', color: '#a855f7' },
  notes: { component: NotesPanel, icon: FileText, title: 'Notes', color: '#f59e0b' },
  resources: { component: ResourcesPanel, icon: Link, title: 'Resources', color: '#06b6d4' },
  activity: { component: ActivityPanel, icon: Activity, title: 'Activity', color: '#f43f5e' },
  tools: { component: ToolsPanel, icon: Wrench, title: 'Tools', color: '#6366f1' },
  ai: { component: AIPanel, icon: Sparkles, title: 'AI', color: '#8b5cf6' },
  taskboard: { component: TaskBoardPanel, icon: CheckSquare, title: 'Task Board', color: '#10b981' },
  files: { component: FileDrawerPanel, icon: Folder, title: 'Files', color: '#6366f1' },
  whiteboard: { component: WhiteboardPanel, icon: Palette, title: 'Whiteboard', color: '#ec4899' },
  timeline: { component: TimelinePanel, icon: Calendar, title: 'Timeline', color: '#14b8a6' },
  code: { component: CodePanel, icon: Code2, title: 'Code', color: '#0ea5e9' },
  aiagent: { component: AIAgentPanel, icon: Bot, title: 'AI Agent', color: '#8b5cf6' },
  presence: { component: TeamPresencePanel, icon: Users, title: 'Team', color: '#10b981' },
  analytics: { component: AnalyticsPanel, icon: BarChart3, title: 'Analytics', color: '#f59e0b' },
  miniapps: { component: MiniAppsPanel, icon: Grid3x3, title: 'Mini Apps', color: '#ef4444' },
};

function ActivityBar({ inactivePanels, onPanelClick, onDragStart }) {
  return (
    <Box sx={{ 
      width: 72, 
      background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
      borderRight: 1,
      borderColor: 'grey.800',
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      py: 2,
      gap: 1.5,
      boxShadow: '4px 0 12px rgba(0, 0, 0, 0.1)',
    }}>
      {inactivePanels.map((id) => {
        const panel = PANELS[id];
        const Icon = panel.icon;
        return (
          <Tooltip key={id} title={panel.title} placement="right">
            <Box
              draggable
              onDragStart={(e) => {
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/plain', id);
                onDragStart(id);
              }}
              onClick={() => onPanelClick(id)}
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                bgcolor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'grab',
                color: 'grey.400',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                '&:active': { cursor: 'grabbing' },
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  color: panel.color,
                  transform: 'translateX(4px) scale(1.05)',
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: -8,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 4,
                    height: 24,
                    bgcolor: panel.color,
                    borderRadius: 2,
                  },
                }
              }}
            >
              <Icon size={20} />
            </Box>
          </Tooltip>
        );
      })}
    </Box>
  );
}

function TabBar({ tabs, activeTab, onTabClick, onTabClose, onDragStart }) {
  return (
    <Box sx={{ 
      borderBottom: 1, 
      borderColor: 'divider', 
      bgcolor: 'grey.50',
      display: 'flex',
      minHeight: 44,
      overflowX: 'auto',
      px: 1,
      gap: 0.5,
      alignItems: 'center',
      '&::-webkit-scrollbar': { height: 6 },
      '&::-webkit-scrollbar-thumb': { bgcolor: 'grey.300', borderRadius: 3 },
    }}>
      {tabs.map((tabId) => {
        const panel = PANELS[tabId];
        const Icon = panel.icon;
        const isActive = activeTab === tabId;
        return (
          <Box
            key={tabId}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.effectAllowed = 'move';
              e.dataTransfer.setData('text/plain', tabId);
              onDragStart(tabId);
            }}
            onClick={() => onTabClick(tabId)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              px: 2,
              py: 1,
              borderRadius: 2,
              cursor: 'pointer',
              bgcolor: isActive ? 'white' : 'transparent',
              boxShadow: isActive ? '0 2px 8px rgba(0, 0, 0, 0.08)' : 'none',
              border: isActive ? '1px solid' : '1px solid transparent',
              borderColor: isActive ? 'grey.200' : 'transparent',
              userSelect: 'none',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              '&:hover': {
                bgcolor: isActive ? 'white' : 'grey.100',
                transform: 'translateY(-1px)',
              },
              '&:hover .close-btn': {
                opacity: 1,
              },
              '&::before': isActive ? {
                content: '""',
                position: 'absolute',
                bottom: -1,
                left: 8,
                right: 8,
                height: 3,
                bgcolor: panel.color,
                borderRadius: '3px 3px 0 0',
              } : {},
            }}
          >
            <Icon size={16} style={{ color: panel.color }} />
            <Typography variant="body2" fontWeight={isActive ? 600 : 500} sx={{ fontSize: 13, whiteSpace: 'nowrap' }}>
              {panel.title}
            </Typography>
            <IconButton
              className="close-btn"
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onTabClose(tabId);
              }}
              sx={{ 
                p: 0.25, 
                ml: 0.5,
                width: 20,
                height: 20,
                opacity: isActive ? 1 : 0,
                transition: 'opacity 0.2s',
                '&:hover': { bgcolor: 'grey.200' },
              }}
            >
              <X size={14} />
            </IconButton>
          </Box>
        );
      })}
    </Box>
  );
}

function EditorGroup({ groupId, tabs, activeTab, onTabClick, onTabClose, onDragStart, onDrop }) {
  const Component = PANELS[activeTab]?.component;
  const boxRef = useRef(null);
  const [dropIndicator, setDropIndicator] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!boxRef.current) return;

    const rect = boxRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const w = rect.width;
    const h = rect.height;
    
    const xPercent = x / w;
    const yPercent = y / h;
    const edgeThreshold = 0.2;

    let position = 'center';
    
    if (xPercent < edgeThreshold) position = 'left';
    else if (xPercent > 1 - edgeThreshold) position = 'right';
    else if (yPercent < edgeThreshold) position = 'top';
    else if (yPercent > 1 - edgeThreshold) position = 'bottom';

    setDropIndicator(position);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const panelId = e.dataTransfer.getData('text/plain');
    if (panelId) {
      onDrop(groupId, panelId, dropIndicator);
    }
    setDropIndicator(null);
  };

  const handleDragLeave = (e) => {
    if (!boxRef.current?.contains(e.relatedTarget)) {
      setDropIndicator(null);
    }
  };

  return (
    <Box
      ref={boxRef}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      }}
    >
      {dropIndicator && (
        <Box
          sx={{
            position: 'absolute',
            bgcolor: dropIndicator === 'center' ? 'success.main' : 'primary.main',
            opacity: 0.15,
            zIndex: 1000,
            pointerEvents: 'none',
            border: '2px dashed',
            borderColor: dropIndicator === 'center' ? 'success.main' : 'primary.main',
            transition: 'all 0.12s cubic-bezier(0.4, 0, 0.2, 1)',
            ...(dropIndicator === 'center' && { left: 8, right: 8, top: 48, bottom: 8, borderRadius: 1 }),
            ...(dropIndicator === 'left' && { left: 0, top: 0, bottom: 0, width: '50%' }),
            ...(dropIndicator === 'right' && { right: 0, top: 0, bottom: 0, width: '50%' }),
            ...(dropIndicator === 'top' && { left: 0, right: 0, top: 0, height: '50%' }),
            ...(dropIndicator === 'bottom' && { left: 0, right: 0, bottom: 0, height: '50%' }),
          }}
        />
      )}

      <TabBar
        tabs={tabs}
        activeTab={activeTab}
        onTabClick={onTabClick}
        onTabClose={onTabClose}
        onDragStart={onDragStart}
      />
      
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {Component && <Component />}
      </Box>
    </Box>
  );
}

export default function App() {
  const { layout, activeTabs, movePanel, setActiveTab, removePanel, addPanel } = usePanelStore();
  const [cmdOpen, setCmdOpen] = useState(false);
  const [draggedPanel, setDraggedPanel] = useState(null);
  const [layoutMenuAnchor, setLayoutMenuAnchor] = useState(null);

  const LAYOUT_TEMPLATES = [
    { name: 'Dev Room', layout: { left: ['files'], center: ['code'], right: ['aiagent'], bottom: ['taskboard'] } },
    { name: 'Design Room', layout: { left: ['files'], center: ['whiteboard'], right: ['presence'], bottom: ['chat'] } },
    { name: 'Planning Room', layout: { left: ['timeline'], center: ['taskboard'], right: ['analytics'], bottom: ['notes'] } },
    { name: 'Meeting Room', layout: { left: ['presence'], center: ['chat'], right: ['notes'], bottom: ['miniapps'] } },
  ];

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

  const getAllActivePanels = () => {
    return [...new Set([
      ...layout.left,
      ...layout.top,
      ...layout.center,
      ...layout.bottom,
      ...layout.right,
    ])];
  };

  const getInactivePanels = () => {
    const activePanels = getAllActivePanels();
    return Object.keys(PANELS).filter(id => !activePanels.includes(id));
  };

  const handleActivityBarClick = (panelId) => {
    addPanel(panelId, 'center');
    setActiveTab('center', panelId);
  };

  const handleDragStart = (panelId) => {
    setDraggedPanel(panelId);
  };

  const handleDrop = (targetGroup, panelId, position) => {
    if (!panelId) return;

    let sourceRegion = null;
    for (const [region, panels] of Object.entries(layout)) {
      if (panels.includes(panelId)) {
        sourceRegion = region;
        break;
      }
    }

    if (!sourceRegion) {
      if (position === 'center') {
        addPanel(panelId, targetGroup);
        setActiveTab(targetGroup, panelId);
      } else {
        addPanel(panelId, position);
        setActiveTab(position, panelId);
      }
    } else {
      if (position === 'center') {
        if (sourceRegion !== targetGroup) {
          movePanel(panelId, sourceRegion, targetGroup);
        }
      } else {
        if (sourceRegion !== position) {
          movePanel(panelId, sourceRegion, position);
        }
      }
    }

    setDraggedPanel(null);
  };

  return (
    <Box sx={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', bgcolor: 'grey.50' }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: 'white',
          borderBottom: 1,
          borderColor: 'divider',
          zIndex: 1300,
          ...glassStyles,
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: 56, px: 3 }}>
          <Stack direction="row" spacing={3} alignItems="center">
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box
                sx={{
                  p: 1,
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  borderRadius: 2,
                  boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
                }}
              >
                <LayoutDashboard size={20} color="white" />
              </Box>
              <Typography variant="h6" fontWeight={700} sx={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Room Workspace
              </Typography>
            </Stack>

            <Divider orientation="vertical" flexItem />

            <Stack direction="row" spacing={1}>
              <Tooltip title="Search (⌘K)">
                <IconButton size="small" onClick={() => setCmdOpen(true)}>
                  <Search size={18} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Layout Templates">
                <IconButton size="small" onClick={(e) => setLayoutMenuAnchor(e.currentTarget)}>
                  <Layout size={18} />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
          
          <Stack direction="row" spacing={2} alignItems="center">
            <Badge badgeContent={3} color="error">
              <Tooltip title="Notifications">
                <IconButton size="small">
                  <Bell size={18} />
                </IconButton>
              </Tooltip>
            </Badge>
            
            <Chip
              icon={<Users size={14} />}
              label="5 online"
              size="small"
              sx={{
                bgcolor: 'success.50',
                color: 'success.700',
                fontWeight: 600,
                border: '1px solid',
                borderColor: 'success.200',
              }}
            />
            
            <Chip
              icon={<Zap size={14} />}
              label="Live"
              size="small"
              sx={{
                bgcolor: 'warning.50',
                color: 'warning.700',
                fontWeight: 600,
                border: '1px solid',
                borderColor: 'warning.200',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                '@keyframes pulse': {
                  '0%, 100%': { opacity: 1 },
                  '50%': { opacity: 0.7 },
                },
              }}
            />

            <Tooltip title="Settings">
              <IconButton size="small">
                <Settings size={18} />
              </IconButton>
            </Tooltip>
          </Stack>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={layoutMenuAnchor}
        open={Boolean(layoutMenuAnchor)}
        onClose={() => setLayoutMenuAnchor(null)}
        PaperProps={{
          sx: { minWidth: 220, mt: 1, borderRadius: 2 },
        }}
      >
        <Box sx={{ px: 2, py: 1.5, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="subtitle2" fontWeight={600}>Layout Templates</Typography>
        </Box>
        {LAYOUT_TEMPLATES.map((template, i) => (
          <MenuItem key={i} onClick={() => setLayoutMenuAnchor(null)}>
            <Stack spacing={0.5}>
              <Typography variant="body2" fontWeight={500}>{template.name}</Typography>
              <Typography variant="caption" color="text.secondary">
                {Object.keys(template.layout).length} panels
              </Typography>
            </Stack>
          </MenuItem>
        ))}
        <Divider />
        <MenuItem>
          <Save size={16} style={{ marginRight: 8 }} />
          Save Current Layout
        </MenuItem>
      </Menu>

      <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {getInactivePanels().length > 0 && (
          <ActivityBar 
            inactivePanels={getInactivePanels()}
            onPanelClick={handleActivityBarClick}
            onDragStart={handleDragStart}
          />
        )}

        <Box sx={{ flex: 1, p: 2 }}>
          <Allotment snap>
            {layout.left.length > 0 && (
              <Allotment.Pane minSize={180} preferredSize={300}>
                <EditorGroup
                  groupId="left"
                  tabs={layout.left}
                  activeTab={activeTabs.left || layout.left[0]}
                  onTabClick={(id) => setActiveTab('left', id)}
                  onTabClose={(id) => removePanel(id, 'left')}
                  onDragStart={handleDragStart}
                  onDrop={handleDrop}
                />
              </Allotment.Pane>
            )}

            <Allotment.Pane>
              <Allotment vertical snap>
                {layout.top.length > 0 && (
                  <Allotment.Pane minSize={120} preferredSize={200}>
                    <EditorGroup
                      groupId="top"
                      tabs={layout.top}
                      activeTab={activeTabs.top || layout.top[0]}
                      onTabClick={(id) => setActiveTab('top', id)}
                      onTabClose={(id) => removePanel(id, 'top')}
                      onDragStart={handleDragStart}
                      onDrop={handleDrop}
                    />
                  </Allotment.Pane>
                )}

                {layout.center.length > 0 && (
                  <Allotment.Pane>
                    <EditorGroup
                      groupId="center"
                      tabs={layout.center}
                      activeTab={activeTabs.center || layout.center[0]}
                      onTabClick={(id) => setActiveTab('center', id)}
                      onTabClose={(id) => removePanel(id, 'center')}
                      onDragStart={handleDragStart}
                      onDrop={handleDrop}
                    />
                  </Allotment.Pane>
                )}

                {layout.bottom.length > 0 && (
                  <Allotment.Pane minSize={120} preferredSize={280}>
                    <EditorGroup
                      groupId="bottom"
                      tabs={layout.bottom}
                      activeTab={activeTabs.bottom || layout.bottom[0]}
                      onTabClick={(id) => setActiveTab('bottom', id)}
                      onTabClose={(id) => removePanel(id, 'bottom')}
                      onDragStart={handleDragStart}
                      onDrop={handleDrop}
                    />
                  </Allotment.Pane>
                )}
              </Allotment>
            </Allotment.Pane>

            {layout.right.length > 0 && (
              <Allotment.Pane minSize={180} preferredSize={300}>
                <EditorGroup
                  groupId="right"
                  tabs={layout.right}
                  activeTab={activeTabs.right || layout.right[0]}
                  onTabClick={(id) => setActiveTab('right', id)}
                  onTabClose={(id) => removePanel(id, 'right')}
                  onDragStart={handleDragStart}
                  onDrop={handleDrop}
                />
              </Allotment.Pane>
            )}
          </Allotment>
        </Box>
      </Box>
    </Box>
  );
}
