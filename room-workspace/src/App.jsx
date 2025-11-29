import { useState, useEffect } from 'react';
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
import { Users, LayoutDashboard, MessageSquare, FileText, Link, Activity, Wrench, Sparkles, X, Command } from 'lucide-react';

const PANELS = {
  members: { component: MembersPanel, icon: Users, title: 'Members' },
  kanban: { component: KanbanPanel, icon: LayoutDashboard, title: 'Kanban' },
  chat: { component: ChatPanel, icon: MessageSquare, title: 'Chat' },
  notes: { component: NotesPanel, icon: FileText, title: 'Notes' },
  resources: { component: ResourcesPanel, icon: Link, title: 'Resources' },
  activity: { component: ActivityPanel, icon: Activity, title: 'Activity' },
  tools: { component: ToolsPanel, icon: Wrench, title: 'Tools' },
  ai: { component: AIPanel, icon: Sparkles, title: 'AI' },
};

function TabBar({ tabs, activeTab, onTabClick, onTabClose, onDragStart, region }) {
  return (
    <div className="h-10 bg-gray-50 border-b border-gray-200 flex items-center">
      {tabs.map((tabId) => {
        const panel = PANELS[tabId];
        const Icon = panel.icon;
        return (
          <div
            key={tabId}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('panelId', tabId);
              e.dataTransfer.setData('fromRegion', region);
            }}
            onClick={() => onTabClick(tabId)}
            className={`h-10 px-4 flex items-center gap-2 cursor-pointer border-r border-gray-200 group ${
              activeTab === tabId ? 'bg-white text-gray-900' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Icon size={14} />
            <span className="text-sm font-medium">{panel.title}</span>
            {tabs.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onTabClose(tabId);
                }}
                className="opacity-0 group-hover:opacity-100 ml-2"
              >
                <X size={12} />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

function PanelRegion({ region, tabs, activeTab, onTabClick, onTabClose, onDrop }) {
  const [dragOver, setDragOver] = useState(false);
  const Component = PANELS[activeTab]?.component;

  return (
    <div
      className="h-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm"
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
        <div className="absolute inset-0 bg-blue-500/10 border-2 border-blue-500 z-50 pointer-events-none" />
      )}
      <TabBar
        tabs={tabs}
        activeTab={activeTab}
        onTabClick={onTabClick}
        onTabClose={onTabClose}
        region={region}
      />
      <div className="h-[calc(100%-2.5rem)] overflow-auto">
        {Component && <Component />}
      </div>
    </div>
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
    <div className="h-screen w-screen bg-gray-100 flex flex-col">
      <div className="h-12 bg-white border-b border-gray-200 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <LayoutDashboard size={20} />
          <span className="font-semibold">Room Workspace</span>
        </div>
        <button
          onClick={() => setCmdOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-gray-100 rounded"
        >
          <Command size={14} />
          <span>⌘K</span>
        </button>
      </div>

      <div className="flex-1 p-2">
        <Allotment>
          {layout.left.length > 0 && (
            <Allotment.Pane minSize={200} preferredSize={250}>
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
                <Allotment.Pane minSize={60} preferredSize={80}>
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
                <Allotment.Pane minSize={200} preferredSize={300}>
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
            <Allotment.Pane minSize={200} preferredSize={250}>
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
      </div>
    </div>
  );
}
