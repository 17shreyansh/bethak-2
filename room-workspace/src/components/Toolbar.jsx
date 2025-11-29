import { LayoutGrid, Maximize2, RotateCcw, Command, Map } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Toolbar({ onCommandPalette, onResetLayout, onToggleFullscreen, onToggleMinimap }) {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="h-12 bg-white border-b border-gray-200 flex items-center justify-between px-4"
    >
      <div className="flex items-center gap-2">
        <LayoutGrid size={20} className="text-gray-700" />
        <span className="text-sm font-semibold text-gray-900">Room Workspace</span>
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={onCommandPalette}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
        >
          <Command size={14} />
          <span className="hidden sm:inline">Commands</span>
          <kbd className="hidden sm:inline px-1.5 py-0.5 text-xs bg-gray-100 rounded border border-gray-200">⌘K</kbd>
        </button>
        <button
          onClick={onResetLayout}
          className="p-2 text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
          title="Reset Layout"
        >
          <RotateCcw size={16} />
        </button>
        <button
          onClick={onToggleMinimap}
          className="p-2 text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
          title="Layout Overview"
        >
          <Map size={16} />
        </button>
        <button
          onClick={onToggleFullscreen}
          className="p-2 text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
          title="Toggle Fullscreen"
        >
          <Maximize2 size={16} />
        </button>
      </div>
    </motion.div>
  );
}
