// src/components/Brain.js
'use client';

import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three'; // Import THREE to use Vector3

export function BrainModel({ hotspots, onRegionActive }) {
  const { nodes } = useGLTF('/models/brain-transformed.glb');
  const brainMesh = Object.values(nodes).find(node => node.isMesh);
  const activeHotspotRef = useRef(null); // Keep track of the active region

  const handlePointerMove = (event) => {
    // We don't want this to fire if the user is dragging the model.
    if (event.buttons > 0) return;

    event.stopPropagation();
    const intersectionPoint = event.point; // The 3D point on the brain surface

    let closestHotspot = null;
    let minDistance = Infinity;

    // Find the closest hotspot to the intersection point
    hotspots.forEach(hotspot => {
      const hotspotPosition = new THREE.Vector3(...hotspot.position);
      const distance = intersectionPoint.distanceTo(hotspotPosition);
      if (distance < hotspot.radius && distance < minDistance) {
        minDistance = distance;
        closestHotspot = hotspot;
      }
    });

    const activeId = closestHotspot ? closestHotspot.id : null;

    // Only update the state if the active region has changed
    if (activeHotspotRef.current !== activeId) {
      activeHotspotRef.current = activeId;
      onRegionActive(activeId, { x: event.clientX + 20, y: event.clientY });
    }
  };

  const handlePointerLeave = () => {
    // When the mouse leaves the brain, deactivate any active region
    if (activeHotspotRef.current !== null) {
        activeHotspotRef.current = null;
        onRegionActive(null, null);
    }
  };

  if (!brainMesh) return null; // Don't render if no mesh is found

  return (
    <group scale={1.5} rotation={[0.2, -Math.PI / 2, 0.1]}>
      <mesh
        geometry={brainMesh.geometry}
        // --- THE FIX IS HERE ---
        // We are now using the ORIGINAL material from the 3D file.
        material={brainMesh.material}
        // We can still modify properties of this original material directly.
        // Let's make it semi-transparent for that futuristic look.
        material-transparent={true}
        material-opacity={0.6} // Adjust between 0.0 (invisible) and 1.0 (solid)
        // ----------------------
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        {/* We no longer need to define a <meshStandardMaterial> inside here! */}
      </mesh>
    </group>
  );
}

useGLTF.preload('/models/brain-transformed.glb');