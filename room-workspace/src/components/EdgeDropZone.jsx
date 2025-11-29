import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EdgeDropZone({ onDrop, children }) {
  const [activeEdge, setActiveEdge] = useState(null);

  const handleDragOver = (e, edge) => {
    e.preventDefault();
    setActiveEdge(edge);
  };

  const handleDrop = (e, edge) => {
    e.preventDefault();
    setActiveEdge(null);
    const panelId = e.dataTransfer.getData('panelId');
    const fromRegion = e.dataTransfer.getData('fromRegion');
    if (panelId) {
      onDrop(panelId, fromRegion, edge);
    }
  };

  const edges = [
    { name: 'left', style: 'left-0 top-0 bottom-0 w-16' },
    { name: 'right', style: 'right-0 top-0 bottom-0 w-16' },
    { name: 'top', style: 'top-0 left-0 right-0 h-16' },
    { name: 'bottom', style: 'bottom-0 left-0 right-0 h-16' },
  ];

  return (
    <div className="relative h-full">
      {edges.map((edge) => (
        <div
          key={edge.name}
          className={`absolute ${edge.style} z-30`}
          onDragOver={(e) => handleDragOver(e, edge.name)}
          onDragLeave={() => setActiveEdge(null)}
          onDrop={(e) => handleDrop(e, edge.name)}
        >
          <AnimatePresence>
            {activeEdge === edge.name && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full h-full bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center"
              >
                <span className="text-xs font-semibold text-blue-600 bg-white px-3 py-1 rounded-full shadow-lg">
                  Create {edge.name} panel
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
      {children}
    </div>
  );
}
