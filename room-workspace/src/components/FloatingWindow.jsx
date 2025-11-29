import { Rnd } from 'react-rnd';
import { X, Minus, Maximize2 } from 'lucide-react';
import { useWorkspaceStore } from '../store/useWorkspaceStore';
import { motion } from 'framer-motion';

export default function FloatingWindow({ window, children }) {
  const { updateWindow, toggleWindow, bringToFront } = useWorkspaceStore();

  return (
    <Rnd
      size={{ width: window.width, height: window.height }}
      position={{ x: window.x, y: window.y }}
      onDragStop={(e, d) => {
        updateWindow(window.id, { x: d.x, y: d.y });
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        updateWindow(window.id, {
          width: ref.offsetWidth,
          height: ref.offsetHeight,
          ...position,
        });
      }}
      minWidth={350}
      minHeight={250}
      bounds="parent"
      dragHandleClassName="window-drag-handle"
      style={{ zIndex: window.zIndex }}
      onMouseDown={() => bringToFront(window.id)}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full h-full bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
      >
        <div className="window-drag-handle bg-white px-4 py-3 flex items-center justify-between border-b border-gray-200 cursor-move">
          <span className="text-sm font-semibold text-gray-700">{window.title}</span>
          <div className="flex items-center gap-1">
            <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
              <Minus className="w-4 h-4 text-gray-500" />
            </button>
            <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
              <Maximize2 className="w-4 h-4 text-gray-500" />
            </button>
            <button
              onClick={() => toggleWindow(window.id)}
              className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-gray-500 hover:text-red-600" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-auto p-6 bg-gray-50">
          {children}
        </div>
      </motion.div>
    </Rnd>
  );
}
