// src/components/Minimap.js
'use client';

import React from 'react';
import { galaxies } from '@/content/galaxies-data';
import { useNeuroStore } from '@/stores/useNeuroStore'; // Import our store

const mapToMinimap = (position, mapSize, mapScale) => {
  const x = (position.x / mapScale) * (mapSize / 2) + (mapSize / 2);
  const z = (position.z / mapScale) * (mapSize / 2) + (mapSize / 2);
  return { x, z };
};

export function Minimap() {
  // Get all required data and actions directly from the store
  const { cameraInfo, view, jumpToGalaxy } = useNeuroStore();

  const MAP_SIZE = 200;
  const MAP_SCALE = 15;

  const galaxyDots = galaxies.map(g => ({
    ...g,
    ...mapToMinimap({ x: g.position[0], z: g.position[2] }, MAP_SIZE, MAP_SCALE)
  }));

  let cameraPositionOnMap;
  if (view.mode === 'hub') {
    cameraPositionOnMap = cameraInfo.position;
  } else {
    const currentGalaxy = galaxies.find(g => g.id === view.id);
    cameraPositionOnMap = currentGalaxy ? { x: currentGalaxy.position[0], z: currentGalaxy.position[2] } : cameraInfo.position;
  }

  const cameraDot = mapToMinimap(cameraPositionOnMap, MAP_SIZE, MAP_SCALE);
  const cameraAngle = Math.atan2(cameraInfo.direction.z, cameraInfo.direction.x) * (180 / Math.PI);

  return (
    <div 
      className="fixed bottom-8 left-8 z-50 rounded-full"
      style={{
        width: `${MAP_SIZE}px`,
        height: `${MAP_SIZE}px`,
        background: 'rgba(0, 50, 50, 0.3)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(0, 255, 255, 0.3)',
        boxShadow: '0 0 25px rgba(0, 255, 255, 0.2)',
      }}
    >
      <svg width={MAP_SIZE} height={MAP_SIZE} viewBox={`0 0 ${MAP_SIZE} ${MAP_SIZE}`}>
        <defs><pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0, 255, 255, 0.1)" strokeWidth="0.5"/></pattern></defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <circle cx={MAP_SIZE/2} cy={MAP_SIZE/2} r={MAP_SIZE/2 - 2} fill="none" stroke="rgba(0, 255, 255, 0.2)" />
        
        {galaxyDots.map(dot => (
          <g key={dot.id} onClick={() => jumpToGalaxy(dot.id)} className="cursor-pointer">
            <circle cx={dot.x} cy={dot.z} r="8" fill={dot.color} fillOpacity="0.2" />
            <circle cx={dot.x} cy={dot.z} r="4" fill={dot.color} />
          </g>
        ))}

        <g transform={`translate(${cameraDot.x}, ${cameraDot.z}) rotate(${cameraAngle})`}>
          <path d="M 0 0 L 20 -10 L 20 10 Z" fill="rgba(0, 255, 255, 0.4)" stroke="rgba(0, 255, 255, 0.8)" strokeWidth="1" />
        </g>
      </svg>
    </div>
  );
}