import { User } from 'lucide-react';

const members = [
  { id: 1, name: 'Member A', status: 'online', color: 'bg-blue-500' },
  { id: 2, name: 'Member B', status: 'online', color: 'bg-emerald-500' },
  { id: 3, name: 'Member C', status: 'idle', color: 'bg-purple-500' },
  { id: 4, name: 'Member D', status: 'offline', color: 'bg-orange-500' },
];

export default function LeftSidebar() {
  return (
    <div className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4 gap-3">
      {members.map((member) => (
        <div key={member.id} className="relative group cursor-pointer">
          <div className={`w-10 h-10 ${member.color} rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-sm`}>
            <User className="w-5 h-5 text-white" />
          </div>
          <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
            member.status === 'online' ? 'bg-green-500' : 
            member.status === 'idle' ? 'bg-yellow-500' : 'bg-gray-400'
          }`} />
          <div className="absolute left-16 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-1.5 rounded-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-lg">
            {member.name}
          </div>
        </div>
      ))}
    </div>
  );
}
