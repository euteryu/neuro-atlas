// src/components/BrainGalaxy.js
'use client';

import React, { Suspense, useRef } from 'react';
import { Html, Stars } from '@react-three/drei';
import { useFrame } from '@react-three/fiber'; // Import useFrame
import { EffectComposer, Bloom } from '@react-three/postprocessing';

import { BrainModel } from '@/components/Brain';
import { HudWidget } from '@/components/HudWidget';
import { EegWave } from '@/components/EegWave';

export function BrainGalaxy({ hotspots, onRegionActive }) {
  const brainRef = useRef();
  // Create a ref for the group that will contain everything and rotate
  const galaxyGroupRef = useRef();

  // useFrame runs on every frame, perfect for continuous animation
  useFrame((state, delta) => {
    if (galaxyGroupRef.current) {
      // --- THIS IS THE FIX ---
      // The variable name is galaxyGroupRef, not galaxyGroup.
      galaxyGroupRef.current.rotation.y += delta * 0.05;
      // -------------------------
    }
  });

  return (
    // This group now correctly uses the ref to enable rotation.
    <group ref={galaxyGroupRef}>
      <Suspense fallback={<Html><div>Loading Galaxy...</div></Html>}>
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -5, -10]} intensity={0.8} color="#00ffff" />
        
        <group ref={brainRef}>
          <BrainModel hotspots={hotspots} onRegionActive={onRegionActive} />
        </group>
        
        <Html 
          position={[-3, 1, 0]} 
          transform
          occlude={[brainRef]}
          distanceFactor={10}
        >
          <HudWidget title="Cognitive Load">
            <p>Status: <span className="text-green-400">Nominal</span></p>
            <p>Working Memory: 42%</p>
          </HudWidget>
        </Html>
        
        <EegWave position={[0, 2.8, 0]} />

        <EffectComposer>
          <Bloom 
            intensity={0.4}
            luminanceThreshold={0.6}
            luminanceSmoothing={0.9} 
          />
        </EffectComposer>
      </Suspense>
    </group>
  );
}