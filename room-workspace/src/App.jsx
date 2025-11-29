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
    <div className="h-11 bg-gradient-to-r from-slate-50 to-gray-50 border-b border-slate-200/60 flex items-center overflow-x-auto scrollbar-hide">
      {tabs.map((tabId, index) => {
        const panel = PANELS[tabId];
        const Icon = panel.icon;
        const isActive = activeTab === tabId;
        
        return (
          <div
            key={tabId}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('panelId', tabId);
              e.dataTransfer.setData('fromRegion', region);
            }}
            onClick={() => onTabClick(tabId)}
            className={`
              relative h-11 px-4 flex items-center gap-2.5 cursor-pointer group transition-all duration-200 min-w-fit
              ${isActive 
                ? 'bg-white text-slate-900 shadow-sm border-b-2 border-blue-500' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }
              ${index > 0 ? 'border-l border-slate-200/60' : ''}
            `}
          >
            <Icon size={15} className={isActive ? panel.color : 'text-slate-500'} />
            <span className="text-sm font-medium tracking-tight">{panel.title}</span>
            
            {tabs.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onTabClose(tabId);
                }}
                className="opacity-0 group-hover:opacity-100 ml-1 p-0.5 hover:bg-slate-200 rounded transition-all duration-150"
              >
                <X size={12} className="text-slate-500" />
              </button>
            )}
            
            {isActive && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600" />
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
      className="h-full bg-white border border-slate-200/80 rounded-lg overflow-hidden shadow-sm"
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
        <div className="absolute inset-0 bg-blue-500/10 border-2 border-blue-500 rounded-lg z-50 pointer-events-none" />
      )}
      
      <TabBar
        tabs={tabs}
        activeTab={activeTab}
        onTabClick={onTabClick}
        onTabClose={onTabClose}
        region={region}
      />
      
      <div className="h-[calc(100%-2.75rem)] overflow-auto bg-white">
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
    <div className="h-screen w-screen bg-gradient-to-br from-slate-100 via-gray-50 to-slate-100 flex flex-col">
      <div className="h-14 bg-white/80 backdrop-blur-md border-b border-slate-200/60 flex items-center justify-between px-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg">
            <LayoutDashboard size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Room Workspace
            </h1>
            <p className="text-xs text-slate-500 -mt-0.5">Collaborative workspace</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100/60 rounded-lg">
            <Zap size={14} className="text-amber-500" />
            <span className="text-xs font-medium text-slate-600">Live</span>
          </div>
          
          <button
            onClick={() => setCmdOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Command size={14} />
            <span className="font-medium">⌘K</span>
          </button>
        </div>
      </div>

      <div className="flex-1 p-3">
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
      </div>
    </div>
  );
}
