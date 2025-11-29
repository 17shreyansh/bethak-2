import { X, GripVertical } from 'lucide-react';

export default function DraggablePanel({ title, onClose, onDragStart, children }) {
  return (
    <div className="h-full flex flex-col bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <div 
        className="h-10 border-b border-gray-200 bg-white flex items-center justify-between px-3 cursor-move select-none"
        draggable
        onDragStart={(e) => onDragStart && onDragStart(e, title)}
      >
        <div className="flex items-center gap-2">
          <GripVertical size={14} className="text-gray-400" />
          <span className="text-sm font-medium text-gray-700">{title}</span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1 rounded transition-colors"
          >
            <X size={14} />
          </button>
        )}
      </div>
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
