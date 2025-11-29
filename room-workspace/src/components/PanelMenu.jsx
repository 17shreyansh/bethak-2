import { motion, AnimatePresence } from 'framer-motion';
import { MoreVertical, Maximize2, Minimize2, X, Copy } from 'lucide-react';
import { useState } from 'react';

export default function PanelMenu({ panelId, onMaximize, onClose, onDuplicate }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
      >
        <MoreVertical size={14} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-50"
            >
              <button
                onClick={() => {
                  onMaximize?.();
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <Maximize2 size={14} />
                Maximize
              </button>
              <button
                onClick={() => {
                  onDuplicate?.();
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <Copy size={14} />
                Duplicate
              </button>
              <div className="h-px bg-gray-200 my-1" />
              <button
                onClick={() => {
                  onClose?.();
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <X size={14} />
                Close Panel
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
