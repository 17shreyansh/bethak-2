import { X, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TabPanel({ tabs, activeTab, onTabChange, onTabClose, onAddTab, children }) {
  return (
    <div className="h-full flex flex-col bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <div className="h-10 border-b border-gray-200 bg-white flex items-center justify-between">
        <div className="flex items-center overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative px-4 h-10 text-sm font-medium transition-colors flex items-center gap-2 group ${
                activeTab === tab.id
                  ? 'text-gray-900 bg-gray-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {tab.icon && <tab.icon size={14} />}
              <span>{tab.title}</span>
              {onTabClose && tabs.length > 1 && (
                <X
                  size={12}
                  className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    onTabClose(tab.id);
                  }}
                />
              )}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>
        {onAddTab && (
          <button
            onClick={onAddTab}
            className="px-3 h-10 text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <Plus size={14} />
          </button>
        )}
      </div>
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
