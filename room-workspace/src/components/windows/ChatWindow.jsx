import { Send } from 'lucide-react';

export default function ChatWindow() {
  const messages = [
    { id: 1, user: 'Member A', text: 'Hey team!', time: '10:30 AM' },
    { id: 2, user: 'Member B', text: 'Hello! How is the project going?', time: '10:32 AM' },
    { id: 3, user: 'Member C', text: 'Making good progress!', time: '10:35 AM' },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
        {messages.map((msg) => (
          <div key={msg.id} className="bg-white p-3 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-semibold text-blue-600">{msg.user}</span>
              <span className="text-xs text-gray-500">{msg.time}</span>
            </div>
            <p className="text-sm text-gray-700">{msg.text}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-400 focus:outline-none"
        />
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
