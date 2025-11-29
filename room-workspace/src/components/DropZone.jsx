import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DropZone({ region, onDrop, children }) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const panelId = e.dataTransfer.getData('panelId');
    const fromRegion = e.dataTransfer.getData('fromRegion');
    if (panelId && fromRegion) {
      onDrop(panelId, fromRegion, region);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className="relative h-full"
    >
      <AnimatePresence>
        {isDragOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-blue-500/10 border-2 border-blue-500 border-dashed rounded-lg z-50 pointer-events-none flex items-center justify-center"
          >
            <div className="bg-white px-4 py-2 rounded-lg shadow-lg border border-blue-500">
              <span className="text-sm font-medium text-blue-600">Drop here</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </div>
  );
}
