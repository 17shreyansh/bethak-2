import { FileText, Link, Activity, FolderOpen, Settings, Bot } from 'lucide-react';
import { useWorkspaceStore } from '../store/useWorkspaceStore';

const tools = [
  { id: 'notes', icon: FileText, label: 'Notes' },
  { id: 'resources', icon: Link, label: 'Resources' },
  { id: 'activity', icon: Activity, label: 'Activity' },
  { id: 'files', icon: FolderOpen, label: 'Files' },
  { id: 'ai', icon: Bot, label: 'AI Assistant' },
  { id: 'settings', icon: Settings, label: 'Settings' },
];

export default function RightSidebar() {
  const { toggleWindow, windows } = useWorkspaceStore();

  return (
    <div className="w-16 bg-white border-l border-gray-200 flex flex-col items-center py-4 gap-2">
      {tools.map((tool) => {
        const Icon = tool.icon;
        const isActive = windows.find(w => w.id === tool.id)?.visible;
        
        return (
          <div key={tool.id} className="relative group">
            <button
              onClick={() => toggleWindow(tool.id)}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 ${
                isActive
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <Icon className="w-5 h-5" />
            </button>
            <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-1.5 rounded-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-lg">
              {tool.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}
