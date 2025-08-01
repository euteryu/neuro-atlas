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
import { StatsCalculatorModal } from '@/components/StatsCalculatorModal';

export default function NeuroAtlas() {
  // --- FIX: This component is now much simpler. It just READS state. ---
  const { view, displayedFact, factPosition, isWarping, activeModal, jumpTo } = useNeuroStore();
  
  const returnToHub = () => jumpTo({ mode: 'hub' });

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <div className="absolute top-8 left-8 z-20">
        <button onClick={returnToHub} className="text-left cursor-pointer">
          <h1 className="text-3xl font-bold uppercase tracking-widest text-cyan-300" style={{ textShadow: '0 0 10px rgba(0, 255, 255, 0.5)' }}>
            Neuro-Verse
          </h1>
          <p className="text-cyan-300/70 capitalize">{view.mode}: {view.id || 'Orrery View'}</p>
        </button>
      </div>

      <Minimap />

      {/* This now works perfectly, driven by a single, reliable state */}
      {isWarping && <div className="fixed inset-0 z-50 bg-white/20 backdrop-blur-sm pointer-events-none" />}

      <div className="h-screen w-full absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
          <OrbitControls enablePan={true} enableZoom={true} />
          {/* Scene no longer needs any props passed down */}
          <Scene />
        </Canvas>
      </div>
      
      <AnimatePresence>
        {displayedFact && <FactWindow fact={displayedFact} position={factPosition} />}
        {activeModal === 'stats_calculator' && <StatsCalculatorModal />}
      </AnimatePresence>
    </div>
  );
}