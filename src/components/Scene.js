// src/components/Scene.js
'use client';

import React from 'react';
import { useNeuroStore } from '@/stores/useNeuroStore';
import { useSpring, animated } from '@react-spring/three';
import { Stars, Html } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

import { CameraManager } from '@/components/CameraManager';
import { GalaxyHub } from '@/components/GalaxyHub';
import { BrainGalaxy } from '@/components/BrainGalaxy';
import { StatsGalaxy } from '@/components/StatsGalaxy';
import { hotspots } from '@/content/hotspots-data';
import { knowledgeBase } from '@/content/knowledge-base';

// --- NEW: A dedicated component for our lighting rigs ---
function Lighting({ view }) {
  if (view.mode === 'hub') {
    return (
      <>
        <Stars radius={300} depth={100} count={5000} factor={10} saturation={1} fade speed={1} />
        <ambientLight intensity={0.4} />
      </>
    );
  }
  
  if (view.id === 'brain') {
    return (
      <>
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -5, -10]} intensity={0.8} color="#00ffff" />
      </>
    );
  }
  
  if (view.id === 'stats') {
    return (
      <>
        <Stars radius={150} depth={50} count={5000} factor={5} saturation={1} fade speed={1} />
        <ambientLight intensity={0.3} />
        <pointLight position={[0, 10, 0]} intensity={1} color="#ff00ff" />
        <pointLight position={[0, -10, 0]} intensity={1} color="#0000ff" />
      </>
    );
  }
  
  return <ambientLight intensity={0.5} />; // Fallback
}


export function Scene() {
  const { view, setView, setIsWarping, setCameraInfo, jumpToGalaxy, setDisplayedFact, setFactPosition } = useNeuroStore();
  
  // This hook is now only used for handling facts, not shared state.
  const handleRegionActive = React.useCallback((regionId, position) => {
    if (regionId) {
      const facts = knowledgeBase[regionId] || knowledgeBase['general-brain'];
      const randomFact = facts[Math.floor(Math.random() * facts.length)];
      setDisplayedFact(randomFact);
      setFactPosition(position);
    } else {
      setDisplayedFact(null);
      setFactPosition(null);
    }
  }, [setDisplayedFact, setFactPosition]);

  const { hubScale, brainScale, statsScale } = useSpring({
    hubScale: view.mode === 'hub' ? 1 : 0.001,
    brainScale: view.id === 'brain' ? 1 : 0.001,
    statsScale: view.id === 'stats' ? 1 : 0.001,
    config: { mass: 1, tension: 210, friction: 30 }
  });

  return (
    <>
      <CameraManager 
        view={view} 
        setView={setView}
        onCameraUpdate={setCameraInfo}
        onWarpStart={() => setIsWarping(true)}
        onWarpEnd={() => setIsWarping(false)}
      />
      
      {/* The master lighting rig is now here */}
      <Lighting view={view} />

      <animated.group scale={hubScale} visible={hubScale.to(s => s > 0.01)}>
        <GalaxyHub onGalaxySelect={jumpToGalaxy} />
      </animated.group>
      
      <animated.group scale={brainScale} visible={brainScale.to(s => s > 0.01)}>
        <BrainGalaxy hotspots={hotspots} onRegionActive={handleRegionActive} />
      </animated.group>
      
      <animated.group scale={statsScale} visible={statsScale.to(s => s > 0.01)}>
        <StatsGalaxy />
      </animated.group>
      
      <EffectComposer>
        <Bloom intensity={0.6} luminanceThreshold={0.4} />
      </EffectComposer>
    </>
  );
}