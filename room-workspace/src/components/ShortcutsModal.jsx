import { motion, AnimatePresence } from 'framer-motion';
import { X, Command, Keyboard } from 'lucide-react';

export default function ShortcutsModal({ isOpen, onClose }) {
  const shortcuts = [
    { key: '⌘ K', description: 'Open command palette' },
    { key: 'Drag Tab', description: 'Move panel to another region' },
    { key: 'Drag to Edge', description: 'Create new region' },
    { key: 'Click Tab', description: 'Switch active panel' },
    { key: 'Hover X', description: 'Close panel tab' },
    { key: 'Drag Divider', description: 'Resize panels' },
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-white rounded-lg shadow-2xl w-full max-w-md border border-gray-200 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Keyboard size={20} className="text-gray-700" />
              <h2 className="text-lg font-semibold text-gray-900">Keyboard Shortcuts</h2>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>
          </div>
          <div className="p-4 space-y-3">
            {shortcuts.map((shortcut, i) => (
              <div key={i} className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-600">{shortcut.description}</span>
                <kbd className="px-3 py-1 text-xs font-semibold bg-gray-100 border border-gray-200 rounded">
                  {shortcut.key}
                </kbd>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
