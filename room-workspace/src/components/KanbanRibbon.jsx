import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

export default function KanbanRibbon() {
  const scrollRef = useRef(null);
  
  const columns = [
    { id: 'todo', title: 'To-Do', tasks: ['Task 1', 'Task 2', 'Task 3'] },
    { id: 'doing', title: 'Doing', tasks: ['Task 4', 'Task 5'] },
    { id: 'review', title: 'Review', tasks: ['Task 6'] },
    { id: 'done', title: 'Done', tasks: ['Task 7', 'Task 8', 'Task 9'] },
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction * 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="h-32 bg-white border-b border-gray-200 flex items-center px-4 relative">
      <button
        onClick={() => scroll(-1)}
        className="absolute left-2 z-10 p-1.5 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
      >
        <ChevronLeft className="w-4 h-4 text-gray-600" />
      </button>
      
      <div ref={scrollRef} className="flex gap-3 overflow-x-auto scrollbar-hide flex-1 px-10">
        {columns.map((column) => (
          <div key={column.id} className="min-w-[200px] bg-gray-50 rounded-lg p-3 border border-gray-200">
            <h3 className="text-xs font-semibold text-gray-700 mb-2">{column.title}</h3>
            <div className="space-y-1.5">
              {column.tasks.map((task, idx) => (
                <div
                  key={idx}
                  className="bg-white p-2 rounded border border-gray-200 text-xs text-gray-600 hover:border-blue-400 hover:shadow-sm transition-all cursor-pointer"
                >
                  {task}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <button
        onClick={() => scroll(1)}
        className="absolute right-2 z-10 p-1.5 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
      >
        <ChevronRight className="w-4 h-4 text-gray-600" />
      </button>
    </div>
  );
}
