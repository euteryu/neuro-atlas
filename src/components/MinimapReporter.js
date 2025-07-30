// src/components/MinimapReporter.js
'use client';

import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// This component is invisible. Its only job is to report camera data
// to the parent component on every frame.
export function MinimapReporter({ onUpdate }) {
  const { camera } = useThree();
  const directionVector = new THREE.Vector3();

  useFrame(() => {
    // Get the direction the camera is looking in world space
    camera.getWorldDirection(directionVector);
    
    // Calculate the rotation angle on the Y-axis (top-down view)
    // We use atan2 to get a full 360-degree angle from the x and z components.
    const rotation = Math.atan2(directionVector.x, directionVector.z);

    onUpdate({
      position: camera.position,
      rotation: rotation, // Send the calculated angle
    });
  });

  return null; // Renders nothing
}