import { ExternalLink } from 'lucide-react';

export default function ResourcesWindow() {
  const resources = [
    { id: 1, title: 'Project Documentation', url: '#', type: 'Docs' },
    { id: 2, title: 'Design Files', url: '#', type: 'Figma' },
    { id: 3, title: 'API Reference', url: '#', type: 'Docs' },
    { id: 4, title: 'Meeting Notes', url: '#', type: 'Notes' },
  ];

  return (
    <div className="space-y-2">
      {resources.map((resource) => (
        <div
          key={resource.id}
          className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-sm transition-all cursor-pointer flex items-center justify-between"
        >
          <div>
            <h4 className="text-sm font-medium text-gray-700">{resource.title}</h4>
            <span className="text-xs text-gray-500">{resource.type}</span>
          </div>
          <ExternalLink className="w-4 h-4 text-gray-400" />
        </div>
      ))}
    </div>
  );
}
