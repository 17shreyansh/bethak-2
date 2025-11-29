import { Settings, Calendar, Bell, Search, Bookmark, Clock, Video, Share2 } from 'lucide-react';

export default function ToolsPanel() {
  const tools = [
    { id: 1, name: 'Settings', icon: Settings, badge: null },
    { id: 2, name: 'Calendar', icon: Calendar, badge: '3' },
    { id: 3, name: 'Notifications', icon: Bell, badge: '12' },
    { id: 4, name: 'Search', icon: Search, badge: null },
    { id: 5, name: 'Bookmarks', icon: Bookmark, badge: null },
    { id: 6, name: 'History', icon: Clock, badge: null },
    { id: 7, name: 'Video Call', icon: Video, badge: null },
    { id: 8, name: 'Share', icon: Share2, badge: null },
  ];

  return (
    <div className="h-full bg-white flex flex-col p-2">
      {tools.map((tool) => {
        const Icon = tool.icon;
        return (
          <button
            key={tool.id}
            className="flex items-center justify-between gap-3 p-2.5 rounded-md hover:bg-gray-50 transition-colors text-left group"
          >
            <div className="flex items-center gap-3">
              <Icon size={18} className="text-gray-600 group-hover:text-gray-900 transition-colors" />
              <span className="text-sm text-gray-700">{tool.name}</span>
            </div>
            {tool.badge && (
              <span className="text-xs bg-gray-900 text-white px-1.5 py-0.5 rounded-full">
                {tool.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
