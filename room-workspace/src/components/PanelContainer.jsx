import { motion, AnimatePresence } from 'framer-motion';
import DraggableTab from './DraggableTab';
import PanelMenu from './PanelMenu';
import DropZone from './DropZone';
import EdgeDropZone from './EdgeDropZone';

export default function PanelContainer({ 
  region,
  panels, 
  activeTab, 
  onTabChange, 
  onTabClose,
  onDrop,
  onDragStart,
  onEdgeDrop
}) {
  const activePanel = panels.find((p) => p.id === activeTab);

  return (
    <EdgeDropZone onDrop={onEdgeDrop}>
      <DropZone region={region} onDrop={onDrop}>
      <div className="h-full flex flex-col bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <div className="h-10 border-b border-gray-200 bg-gray-50 flex items-center justify-between overflow-x-auto scrollbar-hide">
          <div className="flex items-center flex-1 overflow-x-auto scrollbar-hide">
            {panels.map((tab) => (
              <DraggableTab
                key={tab.id}
                tab={tab}
                isActive={activeTab === tab.id}
                onClick={() => onTabChange(tab.id)}
                onClose={onTabClose}
                onDragStart={(e, id) => onDragStart(e, id, region)}
                canClose={panels.length > 1}
              />
            ))}
          </div>
          <div className="flex items-center px-2">
            <PanelMenu
              panelId={activeTab}
              onClose={() => onTabClose(activeTab)}
            />
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            {activePanel && (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                className="h-full"
              >
                {activePanel.component}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      </DropZone>
    </EdgeDropZone>
  );
}
