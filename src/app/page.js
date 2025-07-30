// src/app/page.js
'use client';

import React, { useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { AnimatePresence } from 'framer-motion';

import { hotspots } from '@/content/hotspots-data';
import { knowledgeBase } from '@/content/knowledge-base';
import { FactWindow } from '@/components/FactWindow';
import { BrainGalaxy } from '@/components/BrainGalaxy';
import { StatsGalaxy } from '@/components/StatsGalaxy';
import { GalaxyHub } from '@/components/GalaxyHub';
import { CameraManager } from '@/components/CameraManager';
import { Minimap } from '@/components/Minimap';

export default function NeuroAtlas() {
  const [view, setView] = useState({ mode: 'galaxy', id: 'brain' });
  const [displayedFact, setDisplayedFact] = useState(null);
  const [factPosition, setFactPosition] = useState(null);
  const [isWarping, setIsWarping] = useState(false);
  
  const [cameraInfo, setCameraInfo] = useState({
    position: { x: 0, y: 0, z: 0 },
    direction: { x: 0, y: 0, z: -1 },
  });

  const handleRegionActive = useCallback((regionId, position) => {
    if (regionId) {
      const facts = knowledgeBase[regionId] || knowledgeBase['general-brain'];
      const randomFact = facts[Math.floor(Math.random() * facts.length)];
      setDisplayedFact(randomFact);
      setFactPosition(position);
    } else {
      setDisplayedFact(null);
      setFactPosition(null);
    }
  }, []);

  const handleGalaxySelect = (galaxyId) => {
    // Only trigger a new view if it's actually different.
    if (view.id === galaxyId && view.mode === 'galaxy') return;
    setView({ mode: 'galaxy', id: galaxyId });
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <div className="absolute top-8 left-8 z-20 pointer-events-none">
        <h1 className="text-3xl font-bold uppercase tracking-widest text-cyan-300" style={{ textShadow: '0 0 10px rgba(0, 255, 255, 0.5)' }}>
          Neuro-Verse
        </h1>
        <p className="text-cyan-300/70 capitalize">{view.mode}: {view.id || 'Galactic Hub'}</p>
      </div>

      <Minimap cameraInfo={cameraInfo} view={view} onGalaxyClick={handleGalaxySelect} />

      {/* --- FIX: Simpler, more reliable warp effect --- */}
      {isWarping && <div className="fixed inset-0 z-50 bg-white/20 backdrop-blur-sm pointer-events-none" />}

      <div className="h-screen w-full absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
          <OrbitControls enablePan={true} enableZoom={true} />
          <CameraManager 
            view={view} 
            setView={setView} 
            onCameraUpdate={setCameraInfo}
            onWarpStart={() => setIsWarping(true)}
            onWarpEnd={() => setIsWarping(false)}
          />

          {view.mode === 'hub' && <GalaxyHub onGalaxySelect={handleGalaxySelect} />}
          {view.mode === 'galaxy' && view.id === 'brain' && (
            <BrainGalaxy hotspots={hotspots} onRegionActive={handleRegionActive} />
          )}
          {view.mode === 'galaxy' && view.id === 'stats' && (
            <StatsGalaxy />
          )}
        </Canvas>
      </div>
      
      <AnimatePresence>
        {displayedFact && <FactWindow fact={displayedFact} position={factPosition} />}
      </AnimatePresence>
    </div>
  );
}