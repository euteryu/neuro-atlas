// src/app/page.js
'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { AnimatePresence } from 'framer-motion';
import { useNeuroStore } from '@/stores/useNeuroStore';
import { FactWindow } from '@/components/FactWindow';
import { Minimap } from '@/components/Minimap';
import { Scene } from '@/components/Scene';

export default function NeuroAtlas() {
  // We now get the returnToHub function from our store
  const { view, displayedFact, factPosition, isWarping, jumpToGalaxy, returnToHub } = useNeuroStore();

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* --- THIS IS THE FIX --- */}
      {/* We've wrapped the <h1> and <p> in a button to make them clickable. */}
      {/* The onClick event now calls the returnToHub action from our store. */}
      <div className="absolute top-8 left-8 z-20">
        <button onClick={returnToHub} className="text-left cursor-pointer">
          <h1 className="text-3xl font-bold uppercase tracking-widest text-cyan-300" style={{ textShadow: '0 0 10px rgba(0, 255, 255, 0.5)' }}>
            Neuro-Verse
          </h1>
          <p className="text-cyan-300/70 capitalize">{view.mode}: {view.id || 'Orrery View'}</p>
        </button>
      </div>
      {/* ---------------------- */}

      <Minimap onGalaxyClick={jumpToGalaxy} />

      {isWarping && <div className="fixed inset-0 z-50 bg-white/20 backdrop-blur-sm pointer-events-none" />}

      <div className="h-screen w-full absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
          <OrbitControls enablePan={true} enableZoom={true} />
          <Scene />
        </Canvas>
      </div>
      
      <AnimatePresence>
        {displayedFact && <FactWindow fact={displayedFact} position={factPosition} />}
      </AnimatePresence>
    </div>
  );
}