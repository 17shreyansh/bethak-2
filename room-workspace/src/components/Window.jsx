import { Rnd } from 'react-rnd';
import { X, Minus, Maximize2 } from 'lucide-react';
import { useWorkspaceStore } from '../store/useWorkspaceStore';
import { motion } from 'framer-motion';

export default function Window({ window, children }) {
  const { updateWindow, closeWindow, bringToFront } = useWorkspaceStore();

  if (!window.visible) return null;

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
      minWidth={300}
      minHeight={200}
      bounds="parent"
      dragHandleClassName="window-header"
      style={{ zIndex: window.zIndex }}
      onMouseDown={() => bringToFront(window.id)}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full h-full bg-gray-800 rounded-lg shadow-2xl border border-gray-700 flex flex-col overflow-hidden"
      >
        <div className="window-header bg-gray-900 px-4 py-2 flex items-center justify-between border-b border-gray-700 cursor-move">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <div className="w-2 h-2 rounded-full bg-yellow-500" />
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="ml-2 text-sm text-gray-300 font-medium">{window.title}</span>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-1 hover:bg-gray-700 rounded transition-colors">
              <Minus className="w-4 h-4 text-gray-400" />
            </button>
            <button className="p-1 hover:bg-gray-700 rounded transition-colors">
              <Maximize2 className="w-4 h-4 text-gray-400" />
            </button>
            <button
              onClick={() => closeWindow(window.id)}
              className="p-1 hover:bg-red-600 rounded transition-colors"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-auto p-4 bg-gray-850">
          {children}
        </div>
      </motion.div>
    </Rnd>
  );
}
