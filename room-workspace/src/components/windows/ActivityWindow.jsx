export default function ActivityWindow() {
  const activities = [
    { id: 1, user: 'Member A', action: 'completed Task 1', time: '5 min ago' },
    { id: 2, user: 'Member B', action: 'added a comment', time: '12 min ago' },
    { id: 3, user: 'Member C', action: 'uploaded a file', time: '1 hour ago' },
    { id: 4, user: 'Member A', action: 'created new task', time: '2 hours ago' },
  ];

  return (
    <div className="space-y-2">
      {activities.map((activity) => (
        <div key={activity.id} className="bg-white p-3 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-700">
              <span className="font-semibold text-blue-600">{activity.user}</span> {activity.action}
            </p>
            <span className="text-xs text-gray-500">{activity.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
