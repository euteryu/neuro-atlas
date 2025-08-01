// src/components/BrainGalaxy.js
'use client';

import React, { Suspense, useRef } from 'react';
import { useGLTF, Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { HudWidget } from '@/components/HudWidget';
import { EegWave } from '@/components/EegWave';

// A sub-component to cleanly load and manage the brain model
function Brain({ onRegionActive, hotspots }) {
  // --- FIX: Updated path to match your new folder structure ---
  const { nodes } = useGLTF('/models/BrainGalaxy/brain-model/brain-transformed.glb');
  const brainMesh = Object.values(nodes).find(node => node.isMesh);
  
  if (!brainMesh) return null;
  
  // Proximity logic would go here if needed...
  const handlePointerMove = (event) => {};
  const handlePointerLeave = () => {};

  return (
    <mesh
      geometry={brainMesh.geometry}
      material={brainMesh.material}
      material-transparent={true}
      material-opacity={0.6}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    />
  );
}

export function BrainGalaxy({ hotspots, onRegionActive }) {
  const galaxyGroupRef = useRef();
  useFrame((state, delta) => { if (galaxyGroupRef.current) galaxyGroupRef.current.rotation.y += delta * 0.05; });

  return (
    <group ref={galaxyGroupRef}>
      <Suspense fallback={<Html><div>Loading Galaxy...</div></Html>}>
        <Brain hotspots={hotspots} onRegionActive={onRegionActive} />
        <Html position={[-7, 1, 0]} transform distanceFactor={10}>
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