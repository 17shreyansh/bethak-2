import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import EdgeDropZone from './EdgeDropZone';

export default function EmptyRegion({ region, onAddPanel, availablePanels, onEdgeDrop }) {
  return (
    <EdgeDropZone onDrop={onEdgeDrop}>
      <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full flex items-center justify-center bg-white border-2 border-dashed border-gray-300 rounded-lg"
    >
      <div className="text-center p-6">
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <Plus size={24} className="text-gray-400" />
        </div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Empty Region</h3>
        <p className="text-xs text-gray-500 mb-4">Drag a panel here or add one</p>
        {availablePanels.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center">
            {availablePanels.slice(0, 4).map((panel) => (
              <button
                key={panel.id}
                onClick={() => onAddPanel(panel.id, region)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
              >
                {panel.icon && <panel.icon size={12} />}
                {panel.title}
              </button>
            ))}
          </div>
        )}
      </div>
      </motion.div>
    </EdgeDropZone>
  );
}
