// src/components/StatsGalaxy.js
'use client';

import React, { Suspense } from 'react';
import { Html, Stars, Text, TorusKnot } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

// This is the boilerplate component for our Statistics galaxy.
export function StatsGalaxy() {
  return (
    <Suspense fallback={<Html><div>Loading Quadrant...</div></Html>}>
      {/* A unique starfield for this galaxy */}
      <Stars radius={150} depth={50} count={5000} factor={5} saturation={1} fade speed={1} />
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 10, 0]} intensity={1} color="#ff00ff" />
      <pointLight position={[0, -10, 0]} intensity={1} color="#0000ff" />

      {/* Central "Sun": A Torus Knot representing complex data relationships */}
      <TorusKnot args={[5, 1.5, 200, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.9} />
      </TorusKnot>

      <Text position={[0, 0, -10]} fontSize={2} color="white">
        T-Test Planet (WIP)
      </Text>
       <Text position={[10, 0, 0]} fontSize={2} color="white">
        ANOVA Planet (WIP)
      </Text>

      <EffectComposer>
        <Bloom intensity={0.6} luminanceThreshold={0.3} />
      </EffectComposer>
    </Suspense>
  );
}