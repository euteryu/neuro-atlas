// src/components/FactWindow.js
'use client';

import { motion } from 'framer-motion';

export function FactWindow({ fact, position }) {
  if (!fact || !position) return null;

  return (
    // This div is positioned absolutely on the screen based on the mouse coordinates.
    // 'motion.div' enables animations.
    <motion.div
      className="fixed p-4 text-yellow-400 bg-black/50 backdrop-blur-sm rounded-lg shadow-lg max-w-xs pointer-events-none"
      style={{
        top: position.y,
        left: position.x,
        // Add a glow effect using text-shadow.
        textShadow: '0 0 8px rgba(250, 204, 21, 0.5)',
        border: '1px solid rgba(250, 204, 21, 0.3)', // Faint yellow border
      }}
      // Animation properties
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <p className="text-sm font-light leading-relaxed">{fact}</p>
    </motion.div>
  );
}