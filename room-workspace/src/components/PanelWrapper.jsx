import { X, GripVertical } from 'lucide-react';
import { PANEL_TITLES } from '../store/useWorkspaceStore';

export default function PanelWrapper({ id, children }) {
  return (
    <div className="h-full flex flex-col bg-white border-r border-b border-gray-200">
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center gap-2">
          <GripVertical className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-700 font-medium">{PANEL_TITLES[id]}</span>
        </div>
        <button className="p-1 hover:bg-gray-100 rounded transition-colors">
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>
      <div className="flex-1 overflow-auto p-6 bg-gray-50">
        {children}
      </div>
    </div>
  );
}
