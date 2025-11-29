export default function KanbanWindow() {
  const columns = ['Member A', 'Member B', 'Member C'];
  const tasks = {
    'Member A': ['Task 1', 'Task 2'],
    'Member B': ['Task 3'],
    'Member C': ['Task 4', 'Task 5', 'Task 6'],
  };

  return (
    <div className="flex gap-4 h-full">
      {columns.map((column) => (
        <div key={column} className="flex-1 bg-white rounded-lg p-4 border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">{column}</h3>
          <div className="space-y-2">
            {tasks[column].map((task, idx) => (
              <div
                key={idx}
                className="bg-white p-3 rounded-lg border border-gray-200 text-sm text-gray-700 hover:border-blue-400 hover:shadow-sm transition-all cursor-pointer"
              >
                {task}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
