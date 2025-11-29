import { Sparkles, Lightbulb, TrendingUp, Users, Clock } from 'lucide-react';

export default function AIPanel() {
  const suggestions = [
    { 
      id: 1, 
      text: 'Consider breaking down the large task into smaller subtasks for better tracking', 
      type: 'productivity',
      icon: TrendingUp,
      color: 'text-blue-500'
    },
    { 
      id: 2, 
      text: 'Schedule a team sync for project alignment - 3 members are available now', 
      type: 'collaboration',
      icon: Users,
      color: 'text-purple-500'
    },
    { 
      id: 3, 
      text: 'Review and update project documentation - last updated 5 days ago', 
      type: 'documentation',
      icon: Clock,
      color: 'text-orange-500'
    },
  ];

  return (
    <div className="h-full bg-white flex flex-col">
      <div className="p-3 border-b border-gray-200 flex items-center gap-2">
        <Sparkles size={16} className="text-gray-600" />
        <span className="text-sm font-medium text-gray-700">AI Suggestions</span>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {suggestions.map((suggestion) => {
          const Icon = suggestion.icon;
          return (
            <div
              key={suggestion.id}
              className="flex gap-3 p-3 mb-2 rounded-md bg-gray-50 border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer"
            >
              <Icon size={16} className={`${suggestion.color} mt-0.5 flex-shrink-0`} />
              <div className="flex-1 min-w-0">
                <div className="text-sm text-gray-700 leading-relaxed mb-1">{suggestion.text}</div>
                <div className="text-xs text-gray-500 capitalize">{suggestion.type}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
