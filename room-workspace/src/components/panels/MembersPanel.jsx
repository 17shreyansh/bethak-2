import { UserPlus } from 'lucide-react';

export default function MembersPanel() {
  const members = [
    { id: 1, name: 'John Doe', status: 'online', avatar: 'JD' },
    { id: 2, name: 'Jane Smith', status: 'online', avatar: 'JS' },
    { id: 3, name: 'Mike Johnson', status: 'away', avatar: 'MJ' },
    { id: 4, name: 'Sarah Wilson', status: 'offline', avatar: 'SW' },
  ];

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="p-3 border-b border-gray-200">
        <button className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-gray-700 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
          <UserPlus size={16} />
          Add Member
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {members.map((member) => (
          <div
            key={member.id}
            className="flex items-center gap-3 p-2.5 rounded-md hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
              {member.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-700 truncate">{member.name}</div>
              <div className="text-xs text-gray-500 capitalize">{member.status}</div>
            </div>
            <div className={`w-2 h-2 rounded-full ${
              member.status === 'online' ? 'bg-green-500' : 
              member.status === 'away' ? 'bg-yellow-500' : 'bg-gray-300'
            }`} />
          </div>
        ))}
      </div>
    </div>
  );
}
