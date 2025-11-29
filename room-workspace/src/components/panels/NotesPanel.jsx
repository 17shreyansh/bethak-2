import { FileText, Plus, Search } from 'lucide-react';

export default function NotesPanel() {
  const notes = [
    { id: 1, title: 'Meeting Notes - Sprint Planning', date: 'Today, 2:30 PM', preview: 'Discussed Q1 goals and deliverables...' },
    { id: 2, title: 'Project Ideas', date: 'Yesterday', preview: 'New feature concepts for the dashboard...' },
    { id: 3, title: 'Research - User Feedback', date: '2 days ago', preview: 'Compiled feedback from beta testers...' },
    { id: 4, title: 'Technical Documentation', date: 'Last week', preview: 'API endpoints and authentication flow...' },
  ];

  return (
    <div className="h-full bg-white flex flex-col">
      <div className="p-3 border-b border-gray-200 space-y-2">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search notes..."
            className="w-full pl-9 pr-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>
        <button className="w-full flex items-center justify-center gap-2 px-3 py-1.5 text-sm text-gray-700 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
          <Plus size={16} />
          New Note
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {notes.map((note) => (
          <div
            key={note.id}
            className="flex gap-3 p-3 rounded-md hover:bg-gray-50 cursor-pointer transition-colors mb-1"
          >
            <FileText size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-700 truncate mb-0.5">{note.title}</div>
              <div className="text-xs text-gray-500 mb-1">{note.date}</div>
              <div className="text-xs text-gray-400 truncate">{note.preview}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
