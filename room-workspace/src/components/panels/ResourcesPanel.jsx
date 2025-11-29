import { Link, Upload, File, ExternalLink } from 'lucide-react';

export default function ResourcesPanel() {
  const resources = [
    { id: 1, name: 'Design System.pdf', type: 'PDF', size: '2.4 MB', icon: File },
    { id: 2, name: 'API Documentation', type: 'Link', url: '#', icon: ExternalLink },
    { id: 3, name: 'Wireframes.fig', type: 'Figma', size: '1.8 MB', icon: File },
    { id: 4, name: 'Brand Guidelines', type: 'Link', url: '#', icon: ExternalLink },
    { id: 5, name: 'Sprint Report.xlsx', type: 'Excel', size: '856 KB', icon: File },
  ];

  return (
    <div className="h-full bg-white flex flex-col">
      <div className="p-3 border-b border-gray-200">
        <button className="w-full flex items-center justify-center gap-2 px-3 py-1.5 text-sm text-gray-700 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
          <Upload size={16} />
          Upload
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {resources.map((resource) => {
          const Icon = resource.icon;
          return (
            <div
              key={resource.id}
              className="flex items-center gap-3 p-2.5 rounded-md hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <Icon size={16} className="text-gray-400 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-700 truncate">{resource.name}</div>
                <div className="text-xs text-gray-500">
                  {resource.type} {resource.size && `• ${resource.size}`}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
