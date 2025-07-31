// src/components/GalaxyHub.js
'use client';

import React, { Suspense } from 'react';
import { Html, Stars, Text } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { galaxies } from '@/content/galaxies-data'; // Import the master map of the universe

// This component renders the meta-view of all available knowledge galaxies.
// It is designed to be a clean, dark space with no central light source.
export function GalaxyHub({ onGalaxySelect }) {
  return (
    <Suspense fallback={<Html><div>Loading Neuro-Verse...</div></Html>}>
      {/* A dark, ambient starfield for the hub view */}
      <Stars radius={300} depth={100} count={5000} factor={10} saturation={1} fade speed={1} />
      
      {/* 
        The only light source is a faint ambient light. This prevents pure blackness
        but ensures there is no central "sun". The primary light will come from
        the glowing galaxy spheres themselves.
      */}
      <ambientLight intensity={0.4} />
      
      {/* 
        We dynamically render the galaxy markers by reading from our
        single source of truth: the galaxies-data.js file.
        This is a highly scalable pattern.
      */}
      {galaxies.map(galaxy => (
        <group key={galaxy.id} position={galaxy.position}>
          <mesh 
            onClick={() => onGalaxySelect(galaxy.id)}
            onPointerEnter={(e) => (e.object.scale.set(1.2, 1.2, 1.2))}
            onPointerLeave={(e) => (e.object.scale.set(1, 1, 1))}
          >
            <sphereGeometry args={[2, 32, 32]} />
            <meshStandardMaterial 
              color={galaxy.color} 
              emissive={galaxy.color} 
              emissiveIntensity={0.5} 
            />
          </mesh>
          <Text 
            position={[0, -3.5, 0]} 
            fontSize={1.2} 
            color="white" 
            anchorX="center" 
            anchorY="middle"
          >
            {galaxy.name}
          </Text>
        </group>
      ))}

      {/* The post-processing adds the cinematic glow to the scene */}
      <EffectComposer>
        <Bloom intensity={0.8} luminanceThreshold={0.2} />
      </EffectComposer>
    </Suspense>
  );
}