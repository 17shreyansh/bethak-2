import { motion } from 'framer-motion';
import { Keyboard, Zap, Info } from 'lucide-react';

export default function QuickActions({ onShowShortcuts }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 left-4 flex gap-2 z-40"
    >
      <button
        onClick={onShowShortcuts}
        className="flex items-center gap-2 px-3 py-2 bg-white text-gray-700 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-all text-sm"
      >
        <Keyboard size={16} />
        <span className="hidden sm:inline">Shortcuts</span>
      </button>
      <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-lg text-xs">
        <Zap size={14} />
        <span>Drag tabs to edges to create new regions</span>
      </div>
    </motion.div>
  );
}
