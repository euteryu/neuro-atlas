// src/components/WarpTunnel.js
'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const FADE_DISTANCE = 10;
const FAR_DISTANCE = -100;
const STREAK_LENGTH = 1.5; // How long each light beam is

export function WarpTunnel({ count = 2000, speed = 30, isPaused }) {
  const lineRef = useRef();

  // Create the initial vertices for all the line segments
  const [positions, colors] = useMemo(() => {
    // Each line needs a start and end point (2 vertices * 3 coordinates)
    const pos = new Float32Array(count * 2 * 3);
    const col = new Float32Array(count * 2 * 3);
    const colorChoices = [new THREE.Color('#00ffff'), new THREE.Color('#ff00ff'), new THREE.Color('#ffffff')];

    for (let i = 0; i < count; i++) {
      const i6 = i * 6; // Index for the start of the line's data
      const radius = Math.random() * 8 + 2;
      const angle = Math.random() * Math.PI * 2;
      const z = THREE.MathUtils.randFloat(FAR_DISTANCE, FADE_DISTANCE);
      
      const chosenColor = colorChoices[Math.floor(Math.random() * colorChoices.length)];

      // Start vertex
      pos[i6 + 0] = Math.cos(angle) * radius;
      pos[i6 + 1] = Math.sin(angle) * radius;
      pos[i6 + 2] = z;
      
      // End vertex (slightly ahead to create the streak)
      pos[i6 + 3] = pos[i6 + 0];
      pos[i6 + 4] = pos[i6 + 1];
      pos[i6 + 5] = z + STREAK_LENGTH;

      // Apply color to both vertices
      col[i6 + 0] = chosenColor.r; col[i6 + 1] = chosenColor.g; col[i6 + 2] = chosenColor.b;
      col[i6 + 3] = chosenColor.r; col[i6 + 4] = chosenColor.g; col[i6 + 5] = chosenColor.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (!lineRef.current || isPaused) return;
    const posArray = lineRef.current.geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      const i6 = i * 6;
      // Move both vertices along the Z axis
      posArray[i6 + 2] += delta * speed;
      posArray[i6 + 5] += delta * speed;
      
      // If the line flies past the camera, reset it to the back
      if (posArray[i6 + 2] > FADE_DISTANCE) {
        posArray[i6 + 2] = FAR_DISTANCE;
        posArray[i6 + 5] = FAR_DISTANCE + STREAK_LENGTH;
      }
    }
    lineRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    // We now use LineSegments to render our streaks
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count * 2} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count * 2} array={colors} itemSize={3} />
      </bufferGeometry>
      {/* LineBasicMaterial is perfect for glowing, unlit lines */}
      <lineBasicMaterial vertexColors={true} transparent={true} opacity={0.7} />
    </lineSegments>
  );
}