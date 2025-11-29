import { File, Folder } from 'lucide-react';

export default function FilesWindow() {
  const items = [
    { id: 1, name: 'Documents', type: 'folder' },
    { id: 2, name: 'Images', type: 'folder' },
    { id: 3, name: 'project-plan.pdf', type: 'file' },
    { id: 4, name: 'design-mockup.fig', type: 'file' },
    { id: 5, name: 'notes.txt', type: 'file' },
  ];

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-white p-3 rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-sm transition-all cursor-pointer flex items-center gap-3"
        >
          {item.type === 'folder' ? (
            <Folder className="w-5 h-5 text-blue-500" />
          ) : (
            <File className="w-5 h-5 text-gray-500" />
          )}
          <span className="text-sm text-gray-700">{item.name}</span>
        </div>
      ))}
    </div>
  );
}
