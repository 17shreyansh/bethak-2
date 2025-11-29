import { Send, Smile, Paperclip, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ChatPanel() {
  const messages = [
    { id: 1, user: 'Member A', avatar: 'bg-blue-500', text: 'Hey team! How is everyone doing?', time: '10:30 AM', reactions: ['👍', '❤️'] },
    { id: 2, user: 'Member B', avatar: 'bg-emerald-500', text: 'Great! Just finished the design mockups.', time: '10:32 AM', reactions: ['🎉'] },
    { id: 3, user: 'Member C', avatar: 'bg-purple-500', text: 'Awesome work! Can you share them in the resources panel?', time: '10:35 AM', reactions: [] },
    { id: 4, user: 'Member A', avatar: 'bg-blue-500', text: 'Sure thing! Uploading now...', time: '10:36 AM', reactions: ['👍'] },
  ];

  return (
    <div className="flex-1 flex flex-col bg-white">
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3 group"
          >
            <div className={`w-10 h-10 ${msg.avatar} rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0`}>
              {msg.user[0]}
            </div>
            <div className="flex-1">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-semibold text-gray-900 text-sm">{msg.user}</span>
                <span className="text-xs text-gray-500">{msg.time}</span>
              </div>
              <div className="bg-gray-50 rounded-lg rounded-tl-none p-3 border border-gray-200">
                <p className="text-sm text-gray-700">{msg.text}</p>
              </div>
              {msg.reactions.length > 0 && (
                <div className="flex gap-1 mt-1">
                  {msg.reactions.map((reaction, idx) => (
                    <span key={idx} className="text-xs bg-white border border-gray-200 rounded-full px-2 py-0.5 hover:border-blue-400 cursor-pointer transition-colors">
                      {reaction}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="flex items-center gap-2 bg-gray-50 rounded-lg border border-gray-200 p-2 focus-within:border-blue-400 transition-colors">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Paperclip className="w-5 h-5 text-gray-500" />
          </button>
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
          />
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Smile className="w-5 h-5 text-gray-500" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Sparkles className="w-5 h-5 text-purple-500" />
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
