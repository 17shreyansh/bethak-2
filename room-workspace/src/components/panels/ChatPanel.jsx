import { Send, Paperclip, Smile } from 'lucide-react';

export default function ChatPanel() {
  const messages = [
    { id: 1, user: 'John Doe', text: 'Hey team, how is the project going?', time: '10:30 AM', avatar: 'JD' },
    { id: 2, user: 'Jane Smith', text: 'Making good progress on the frontend! The new design looks great.', time: '10:32 AM', avatar: 'JS' },
    { id: 3, user: 'Mike Johnson', text: 'Backend APIs are almost ready. Should be done by EOD.', time: '10:35 AM', avatar: 'MJ' },
    { id: 4, user: 'Sarah Wilson', text: 'Perfect! Let me know when we can start integration testing.', time: '10:38 AM', avatar: 'SW' },
  ];

  return (
    <div className="h-full bg-white flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600 flex-shrink-0">
              {msg.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-sm font-medium text-gray-700">{msg.user}</span>
                <span className="text-xs text-gray-400">{msg.time}</span>
              </div>
              <div className="text-sm text-gray-600 leading-relaxed">{msg.text}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-200 p-4">
        <div className="flex gap-2 items-end">
          <div className="flex-1 flex flex-col gap-2">
            <textarea
              placeholder="Type a message..."
              rows="2"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 resize-none"
            />
            <div className="flex gap-2">
              <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded transition-colors">
                <Paperclip size={16} />
              </button>
              <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded transition-colors">
                <Smile size={16} />
              </button>
            </div>
          </div>
          <button className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors h-fit">
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
