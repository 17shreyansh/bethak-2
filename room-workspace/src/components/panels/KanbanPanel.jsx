import { Plus } from 'lucide-react';

export default function KanbanPanel() {
  const columns = [
    { id: 1, title: 'To Do', count: 3, color: 'bg-gray-100' },
    { id: 2, title: 'In Progress', count: 2, color: 'bg-blue-50' },
    { id: 3, title: 'Review', count: 1, color: 'bg-yellow-50' },
    { id: 4, title: 'Done', count: 5, color: 'bg-green-50' },
  ];

  return (
    <div className="h-full bg-white flex items-center gap-3 px-4 overflow-x-auto">
      {columns.map((col) => (
        <div key={col.id} className={`flex items-center gap-2 px-3 py-1.5 ${col.color} rounded-md border border-gray-200`}>
          <span className="text-sm font-medium text-gray-700">{col.title}</span>
          <span className="text-xs text-gray-500 bg-white px-1.5 py-0.5 rounded">{col.count}</span>
        </div>
      ))}
      <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 rounded-md border border-gray-200 border-dashed transition-colors">
        <Plus size={14} />
        Add
      </button>
    </div>
  );
}
