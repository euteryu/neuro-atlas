// src/components/StatsGalaxy.js
'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNeuroStore } from '@/stores/useNeuroStore';
import { WarpTunnel } from './WarpTunnel';
import { InformationObject } from './InformationObject';
// --- NEW: Import post-processing for the dedicated bloom effect ---
import { EffectComposer, Bloom } from '@react-three/postprocessing';

export function StatsGalaxy() {
  const [objects, setObjects] = useState([]);
  const { setActiveModal, activeModal, view } = useNeuroStore();
  const isPaused = activeModal !== null;

  const handleReachEnd = useCallback((id) => setObjects(prev => prev.filter(obj => obj.id !== id)), []);
  const handleObjectClick = useCallback(() => setActiveModal('stats_calculator'), [setActiveModal]);
  
  useEffect(() => {
    let intervalId = null;
    if (view.id === 'stats' && view.mode === 'galaxy') {
      const spawnObject = () => {
        if (document.hidden || isPaused) return;
        const newObject = {
          id: Math.random().toString(36).substr(2, 9),
          position: [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, -100]
        };
        setObjects(prev => [...prev, newObject]);
      };
      intervalId = setInterval(spawnObject, 4000);
    }
    return () => { if (intervalId) clearInterval(intervalId); };
  }, [view, isPaused]);

  return (
    <>
      <WarpTunnel isPaused={isPaused} />
      {objects.map(obj => (
        <InformationObject
          key={obj.id} id={obj.id} initialPosition={obj.position}
          onReachEnd={handleReachEnd} onObjectClick={handleObjectClick}
          isPaused={isPaused}
        />
      ))}
      {/* --- NEW: Add a powerful, dedicated Bloom effect ONLY for this galaxy --- */}
      <EffectComposer>
        <Bloom 
          intensity={1.5} // Much stronger bloom
          luminanceThreshold={0.3} // Affects more pixels
          luminanceSmoothing={0.9} 
        />
      </EffectComposer>
    </>
  );
}