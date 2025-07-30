// src/components/HudWidget.js
'use client';

// A component for our 3D-positioned "glass" panels.
// It uses CSS backdrop-filter for the frosted glass effect.
export function HudWidget({ title, children }) {
  return (
    <div
      className="w-64 h-auto p-4 text-cyan-300 rounded-lg"
      style={{
        background: 'rgba(0, 255, 255, 0.05)', // A very faint cyan background
        backdropFilter: 'blur(10px)',         // The "frosted glass" effect
        border: '1px solid rgba(0, 255, 255, 0.2)',
        boxShadow: '0 0 20px rgba(0, 255, 255, 0.2)', // The outer glow
        textShadow: '0 0 5px rgba(0, 255, 255, 0.7)',  // The text glow
      }}
    >
      <h3 className="text-lg font-bold uppercase tracking-wider">{title}</h3>
      <div className="mt-2 text-sm font-light">{children}</div>
    </div>
  );
}