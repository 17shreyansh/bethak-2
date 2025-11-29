import { motion } from 'framer-motion';
import { Wifi, Zap, Users } from 'lucide-react';

export default function StatusBar({ panelCount, activeUsers }) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="h-8 bg-white border-t border-gray-200 flex items-center justify-between px-4 text-xs text-gray-600"
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <Wifi size={12} className="text-green-500" />
          <span>Connected</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Zap size={12} className="text-blue-500" />
          <span>{panelCount} panels active</span>
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <Users size={12} className="text-purple-500" />
        <span>{activeUsers} online</span>
      </div>
    </motion.div>
  );
}
