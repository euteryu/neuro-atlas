// src/app/page.js
'use client';

import React, { useState, Suspense, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, Stars } from '@react-three/drei';
import { AnimatePresence } from 'framer-motion';
// Import post-processing components
import { EffectComposer, Bloom } from '@react-three/postprocessing';

// Import all our custom components and data
import { hotspots } from '@/content/hotspots-data';
import { knowledgeBase } from '@/content/knowledge-base';
import { BrainModel } from '@/components/Brain';
import { FactWindow } from '@/components/FactWindow';
// --- THIS IS THE FIX ---
// Import the HudWidget component so the file knows what it is.
import { HudWidget } from '@/components/HudWidget';
// ----------------------
import { EegWave } from '@/components/EegWave';

export default function NeuroAtlas() {
  const [displayedFact, setDisplayedFact] = useState(null);
  const [factPosition, setFactPosition] = useState(null);

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

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <div className="absolute top-8 left-8 z-20">
        <h1 className="text-3xl font-bold uppercase tracking-widest text-cyan-300" style={{ textShadow: '0 0 10px rgba(0, 255, 255, 0.5)' }}>
          Neuro-Atlas
        </h1>
        <p className="text-cyan-300/70">Interactive Brain Explorer</p>
      </div>

      <div className="h-screen w-full absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 4.5], fov: 50 }}>
          <Suspense fallback={<Html><div>Loading Interface...</div></Html>}>
            {/* --- 3D Environment --- */}
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight position={[-10, -5, -10]} intensity={0.8} color="#00ffff" />
            
            {/* --- Controls and Main Model --- */}
            <OrbitControls 
              enablePan={false} 
              enableZoom={true} // Re-enabled zoom
              autoRotate 
              autoRotateSpeed={0.2} 
            />
            <BrainModel hotspots={hotspots} onRegionActive={handleRegionActive} />
            
            {/* --- Futuristic 3D Widgets --- */}
            
            {/* Floating "Glass Screen" Panel */}
            <Html position={[-3, 1, 0]}>
              <HudWidget title="Cognitive Load">
                <p>Status: <span className="text-green-400">Nominal</span></p>
                <p>Working Memory: 42%</p>
              </HudWidget>
            </Html>
            
            {/* Simulated EEG Wave Visualization */}
            <EegWave position={[0, 2.8, 0]} />

            {/* --- Post-Processing Effects for the "Movie" Look --- */}
            <EffectComposer>
              <Bloom 
                intensity={0.4}
                luminanceThreshold={0.6}
                luminanceSmoothing={0.9} 
              />
            </EffectComposer>

          </Suspense>
        </Canvas>
      </div>
      
      {/* 
        This is where the animated fact window (that follows the mouse) is rendered.
        It lives outside the Canvas in the main 2D HTML layer.
      */}
      <AnimatePresence>
        {displayedFact && <FactWindow fact={displayedFact} position={factPosition} />}
      </AnimatePresence>
    </div>
  );
}