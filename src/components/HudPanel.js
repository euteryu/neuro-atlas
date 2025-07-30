// src/components/HudPanel.js
'use client';

// A reusable component for our futuristic UI panels
export function HudPanel({ title, children, className }) {
  return (
    // The main container with a relative position for the SVG border
    <div className={`relative p-4 text-yellow-400 ${className}`}>
      {/* The SVG border, absolutely positioned to fill the container */}
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
      >
        <path
          d="M10,0 L(calc(100% - 10px)),0 L100%,10 L100%,(calc(100% - 10px)) L(calc(100% - 10px)),100% L10,100% L0,(calc(100% - 10px)) L0,10 Z"
          stroke="rgba(250, 204, 21, 0.5)" // yellow-400 with 50% opacity
          strokeWidth="2"
          fill="rgba(250, 204, 21, 0.05)" // A very faint yellow fill
        />
      </svg>
      
      {/* The content, positioned relative to keep it on top of the SVG */}
      <div className="relative z-10">
        <h3 className="text-lg font-bold uppercase tracking-widest text-yellow-400 mb-2">
          {title}
        </h3>
        <div>{children}</div>
      </div>
    </div>
  );
}