// src/components/BrainGalaxy.js
'use client';

import React, { Suspense, useRef } from 'react';
import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { BrainModel } from '@/components/Brain';
import { HudWidget } from '@/components/HudWidget';
import { EegWave } from '@/components/EegWave';

export function BrainGalaxy({ hotspots, onRegionActive }) {
  const brainRef = useRef();
  const galaxyGroupRef = useRef();

  useFrame((state, delta) => {
    if (galaxyGroupRef.current) {
      galaxyGroupRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group ref={galaxyGroupRef}>
      <Suspense fallback={<Html><div>Loading Galaxy...</div></Html>}>
        {/* LIGHTS AND STARS ARE REMOVED FROM HERE */}
        <group ref={brainRef}>
          <BrainModel hotspots={hotspots} onRegionActive={onRegionActive} />
        </group>
        <Html position={[-3, 1, 0]} transform occlude={[brainRef]} distanceFactor={10}>
          <HudWidget title="Cognitive Load">
            <p>Status: <span className="text-green-400">Nominal</span></p>
            <p>Working Memory: 42%</p>
          </HudWidget>
        </Html>
        <EegWave position={[0, 2.8, 0]} />
      </Suspense>
    </group>
  );
}