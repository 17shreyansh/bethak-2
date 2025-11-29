import { MessageSquare, Upload, CheckCircle, UserPlus, FileText } from 'lucide-react';

export default function ActivityPanel() {
  const activities = [
    { id: 1, user: 'John Doe', action: 'created a new task', time: '5m ago', icon: CheckCircle, color: 'text-green-500' },
    { id: 2, user: 'Jane Smith', action: 'uploaded Design System.pdf', time: '12m ago', icon: Upload, color: 'text-blue-500' },
    { id: 3, user: 'Mike Johnson', action: 'commented on Sprint Planning', time: '1h ago', icon: MessageSquare, color: 'text-gray-500' },
    { id: 4, user: 'Sarah Wilson', action: 'joined the workspace', time: '2h ago', icon: UserPlus, color: 'text-purple-500' },
    { id: 5, user: 'John Doe', action: 'updated Meeting Notes', time: '3h ago', icon: FileText, color: 'text-orange-500' },
  ];

  return (
    <div className="h-full bg-white flex flex-col">
      <div className="flex-1 overflow-y-auto p-2">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div
              key={activity.id}
              className="flex items-start gap-3 p-2.5 rounded-md hover:bg-gray-50 transition-colors"
            >
              <Icon size={16} className={`${activity.color} mt-0.5 flex-shrink-0`} />
              <div className="flex-1 min-w-0">
                <div className="text-sm text-gray-700">
                  <span className="font-medium">{activity.user}</span> {activity.action}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">{activity.time}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
