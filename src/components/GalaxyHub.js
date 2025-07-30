// src/components/GalaxyHub.js
'use client';

import React, { Suspense } from 'react';
import { Html, Stars, Text } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

// We define and export this data so the minimap can use it.
export const galaxyData = [
  { id: 'brain', position: [-8, 0, 0], color: '#00ffff' },
  { id: 'stats', position: [8, 2, -2], color: '#ff00ff' },
];

export function GalaxyHub({ onGalaxySelect }) {
  return (
    <Suspense fallback={<Html><div>Loading Neuro-Verse...</div></Html>}>
      <Stars radius={300} depth={100} count={5000} factor={10} saturation={1} fade speed={1} />
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} intensity={1.5} color="#ffffff" />
      
      {/* A temporary helper to show you the center of the universe [X=red, Y=green, Z=blue] */}
      <axesHelper args={[5]} />

      {/* The Brain Galaxy representation */}
      <group position={[-8, 0, 0]}>
        <mesh 
          onClick={() => onGalaxySelect('brain')}
          onPointerEnter={(e) => (e.object.scale.set(1.2, 1.2, 1.2))}
          onPointerLeave={(e) => (e.object.scale.set(1, 1, 1))}
        >
          <sphereGeometry args={[2, 32, 32]} />
          <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.5} />
        </mesh>
        <Text position={[0, -3.5, 0]} fontSize={1.2} color="white" anchorX="center" anchorY="middle">
          The Brain Quadrant
        </Text>
      </group>
      
      {/* The Statistics Galaxy representation */}
      <group position={[8, 2, -2]}>
        <mesh 
          onClick={() => onGalaxySelect('stats')}
          onPointerEnter={(e) => (e.object.scale.set(1.2, 1.2, 1.2))}
          onPointerLeave={(e) => (e.object.scale.set(1, 1, 1))}
        >
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={0.5} />
        </mesh>
        <Text position={[0, -3, 0]} fontSize={1.2} color="white" anchorX="center" anchorY="middle">
          The Quantitative Cosmos
        </Text>
      </group>
      {/* ------------------------------- */}

      <EffectComposer>
        <Bloom intensity={0.8} luminanceThreshold={0.2} />
      </EffectComposer>
    </Suspense>
  );
}