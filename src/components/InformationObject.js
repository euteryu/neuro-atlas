// src/components/InformationObject.js
'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { HudWidget } from './HudWidget'; // We reuse our glass pane widget

const START_Z = -100;
const END_Z = 15;
const SPEED = 10;

export function InformationObject({ id, initialPosition, onReachEnd, onObjectClick, isPaused }) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (!groupRef.current || isPaused) return;

    // Move the object towards the camera
    groupRef.current.position.z += delta * SPEED;

    // Scale the object as it gets closer
    const progress = (groupRef.current.position.z - START_Z) / (END_Z - START_Z);
    const scale = Math.sin(progress * Math.PI) * 1.5; // Sin wave makes it grow and then shrink
    groupRef.current.scale.set(scale, scale, scale);

    // If it reaches the end, tell the parent to remove it
    if (groupRef.current.position.z > END_Z) {
      onReachEnd(id);
    }
  });

  return (
    <group ref={groupRef} position={initialPosition}>
      <Html transform distanceFactor={10}>
        <div onClick={() => onObjectClick(id)} className="cursor-pointer">
          <HudWidget title={`DATA PACKET #${id.slice(0, 4)}`}>
            <p>Type: T-Test Analysis</p>
            <p>Click to inspect...</p>
          </HudWidget>
        </div>
      </Html>
    </group>
  );
}