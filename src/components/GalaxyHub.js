// src/components/GalaxyHub.js
'use client';

import React, { Suspense } from 'react';
import { Html, Stars, Text } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { galaxies } from '@/content/galaxies-data';
// --- THIS IS THE FIX ---
// Import the 'useNeuroStore' hook so this component can access the central state and actions.
import { useNeuroStore } from '@/stores/useNeuroStore';
// ----------------------

// The component no longer needs to receive any props.
export function GalaxyHub() {
  // --- THIS IS THE FIX ---
  // Get the 'jumpTo' action directly from our store.
  const { jumpTo } = useNeuroStore();
  // ----------------------

  return (
    <Suspense fallback={<Html><div>Loading Neuro-Verse...</div></Html>}>
      <Stars radius={300} depth={100} count={5000} factor={10} saturation={1} fade speed={1} />
      <ambientLight intensity={0.4} />
      
      {galaxies.map(galaxy => (
        <group key={galaxy.id} position={galaxy.position}>
          <mesh 
            // --- THIS IS THE FIX ---
            // The onClick now directly calls the 'jumpTo' action from the store.
            onClick={() => jumpTo({ mode: 'galaxy', id: galaxy.id })}
            // ----------------------
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

      <EffectComposer>
        <Bloom intensity={0.8} luminanceThreshold={0.2} />
      </EffectComposer>
    </Suspense>
  );
}