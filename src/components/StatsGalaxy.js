// src/components/StatsGalaxy.js
'use client';

import React, { Suspense } from 'react';
import { Html, Text, TorusKnot } from '@react-three/drei';

export function StatsGalaxy() {
  return (
    <Suspense fallback={<Html><div>Loading Quadrant...</div></Html>}>
        {/* LIGHTS AND STARS ARE REMOVED FROM HERE */}
        <TorusKnot args={[5, 1.5, 200, 32]} position={[0, 0, 0]}>
            <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.9} />
        </TorusKnot>
        <Text position={[0, 0, -10]} fontSize={2} color="white">T-Test Planet (WIP)</Text>
        <Text position={[10, 0, 0]} fontSize={2} color="white">ANOVA Planet (WIP)</Text>
    </Suspense>
  );
}