import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function DraggableTab({ 
  tab, 
  isActive, 
  onClick, 
  onClose, 
  onDragStart, 
  canClose 
}) {
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e) => {
    if (e.target.closest('button')) return;
    setIsDragging(false);
  };

  const handleDragStart = (e) => {
    setIsDragging(true);
    onDragStart(e, tab.id);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleClick = (e) => {
    if (e.target.closest('button')) return;
    if (!isDragging) {
      onClick();
    }
  };

  return (
    <motion.div
      draggable
      onMouseDown={handleMouseDown}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
      className={`relative px-4 h-10 text-sm font-medium flex items-center gap-2 group cursor-pointer select-none border-r border-gray-200 ${
        isActive
          ? 'text-gray-900 bg-white'
          : 'text-gray-600 bg-gray-50 hover:bg-gray-100'
      }`}
      whileHover={{ y: -1 }}
      transition={{ duration: 0.15 }}
    >
      {tab.icon && <tab.icon size={14} className="flex-shrink-0" />}
      <span className="truncate">{tab.title}</span>
      {canClose && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose(tab.id);
          }}
          className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500 p-0.5 rounded hover:bg-gray-200 flex-shrink-0"
        >
          <X size={12} />
        </button>
      )}
      {isActive && (
        <motion.div
          layoutId="activeTabIndicator"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}
    </motion.div>
  );
}
