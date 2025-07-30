// src/components/EegWave.js
'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function EegWave({ position, count = 100, amplitude = 0.2, color = '#00ffff' }) {
  const lineRef = useRef();

  const points = useMemo(() => {
    // Create the initial set of points for the line
    return Array.from({ length: count }, (_, i) => {
      const x = (i / (count - 1)) * 4 - 2; // Spread along x-axis from -2 to 2
      return new THREE.Vector3(x, 0, 0);
    });
  }, [count]);

  useFrame(({ clock }) => {
    // Animate the points in the useFrame loop
    const t = clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
      const x = points[i].x;
      // A combination of sine waves for a more complex look
      const y = Math.sin(x * 2 + t * 3) * amplitude + Math.sin(x * 3 + t * 2) * amplitude * 0.5;
      lineRef.current.geometry.attributes.position.setY(i, y);
    }
    lineRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <line ref={lineRef} position={position}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.flatMap(p => p.toArray()))}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial attach="material" color={color} linewidth={2} />
    </line>
  );
}