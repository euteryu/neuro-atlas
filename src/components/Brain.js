// src/components/Brain.js
'use client';

import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export function BrainModel({ hotspots, onRegionActive }) {
  const { nodes } = useGLTF('/models/brain-transformed.glb');
  const brainMesh = Object.values(nodes).find(node => node.isMesh);
  const activeHotspotRef = useRef(null);

  const handlePointerMove = (event) => {
    if (event.buttons > 0) return;
    event.stopPropagation();
    const intersectionPoint = event.point;

    let closestHotspot = null;
    let minDistance = Infinity;

    hotspots.forEach(hotspot => {
      const hotspotPosition = new THREE.Vector3(...hotspot.position);
      const distance = intersectionPoint.distanceTo(hotspotPosition);
      if (distance < hotspot.radius && distance < minDistance) {
        minDistance = distance;
        closestHotspot = hotspot;
      }
    });

    const activeId = closestHotspot ? closestHotspot.id : null;
    if (activeHotspotRef.current !== activeId) {
      activeHotspotRef.current = activeId;
      onRegionActive(activeId, { x: event.clientX + 20, y: event.clientY });
    }
  };

  const handlePointerLeave = () => {
    if (activeHotspotRef.current !== null) {
      activeHotspotRef.current = null;
      onRegionActive(null, null);
    }
  };

  if (!brainMesh) return null;

  return (
    <group scale={1.5} rotation={[0.2, -Math.PI / 2, 0.1]}>
      <mesh
        geometry={brainMesh.geometry}
        // --- FIX: USE THE ORIGINAL MATERIAL FROM THE MODEL ---
        material={brainMesh.material}
        // --- FIX: MODIFY THE ORIGINAL MATERIAL TO BE TRANSPARENT ---
        material-transparent={true}
        material-opacity={0.6} // Adjust this value (0.0 to 1.0)
        // ----------------------------------------------------
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        {/* We no longer add a new material here, we use the one from the file */}
      </mesh>
    </group>
  );
}

useGLTF.preload('/models/brain-transformed.glb');