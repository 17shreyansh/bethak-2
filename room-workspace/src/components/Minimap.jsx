import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export default function Minimap({ layout, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed bottom-4 right-4 bg-white rounded-lg shadow-2xl border border-gray-200 p-4 z-40 w-64"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-gray-700">Layout Overview</span>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X size={14} />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="col-span-1 space-y-2">
          <div className="bg-blue-50 border border-blue-200 rounded p-2 text-center text-blue-700">
            Left
            <div className="text-[10px] text-blue-500 mt-1">{layout.left.length}</div>
          </div>
        </div>
        <div className="col-span-1 space-y-2">
          <div className="bg-green-50 border border-green-200 rounded p-2 text-center text-green-700">
            Top
            <div className="text-[10px] text-green-500 mt-1">{layout.top.length}</div>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded p-2 text-center text-purple-700">
            Center
            <div className="text-[10px] text-purple-500 mt-1">{layout.center.length}</div>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded p-2 text-center text-orange-700">
            Bottom
            <div className="text-[10px] text-orange-500 mt-1">{layout.bottom.length}</div>
          </div>
        </div>
        <div className="col-span-1 space-y-2">
          <div className="bg-pink-50 border border-pink-200 rounded p-2 text-center text-pink-700">
            Right
            <div className="text-[10px] text-pink-500 mt-1">{layout.right.length}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
