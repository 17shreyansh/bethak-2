import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command } from 'lucide-react';

export default function CommandPalette({ isOpen, onClose, commands }) {
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState(commands);

  useEffect(() => {
    if (search) {
      setFiltered(
        commands.filter((cmd) =>
          cmd.title.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setFiltered(commands);
    }
  }, [search, commands]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-start justify-center pt-32"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, y: -20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: -20 }}
          className="bg-white rounded-lg shadow-2xl w-full max-w-2xl border border-gray-200 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search commands..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 text-sm outline-none"
              autoFocus
            />
            <kbd className="px-2 py-1 text-xs bg-gray-100 rounded border border-gray-200">
              <Command size={10} className="inline" /> K
            </kbd>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {filtered.map((cmd) => (
              <button
                key={cmd.id}
                onClick={() => {
                  cmd.action();
                  onClose();
                }}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
              >
                {cmd.icon && <cmd.icon size={16} className="text-gray-400" />}
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-700">{cmd.title}</div>
                  {cmd.description && (
                    <div className="text-xs text-gray-500">{cmd.description}</div>
                  )}
                </div>
                {cmd.shortcut && (
                  <kbd className="px-2 py-1 text-xs bg-gray-100 rounded border border-gray-200">
                    {cmd.shortcut}
                  </kbd>
                )}
              </button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
