import { X } from 'lucide-react';

export default function PanelHeader({ title, onClose }) {
  return (
    <div className="h-10 border-b border-gray-200 bg-white flex items-center justify-between px-4 select-none">
      <span className="text-sm font-medium text-gray-700">{title}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
