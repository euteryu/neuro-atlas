// src/components/Brain.js
'use client';

import React from 'react';
import { useGLTF } from '@react-three/drei';

export function BrainModel({ onRegionClick, onRegionHover, hoveredRegionId }) {
  const { nodes, materials } = useGLTF('/models/brain-transformed.glb');

  const meshToRegionMap = {
    // This is your current map. It's likely one of these names is wrong.
    'FrontalLobe_1': 'frontal-lobe',
    'ParietalLobe_1': 'parietal-lobe',
    'TemporalLobe_1': 'temporal-lobe',
    'OccipitalLobe_1': 'occipital-lobe',
    'Cerebellum_1': 'cerebellum',
  };

  // UNCOMMENT THIS IF YOU STILL NEED TO SEE ALL AVAILABLE NODES
  // console.log("All available nodes in model:", nodes);

  return (
    <group dispose={null} scale={1.5} rotation={[0.2, -Math.PI / 2, 0.1]}>
      {Object.values(nodes).map((node) => {
        if (!node.isMesh) return null;

        const regionId = meshToRegionMap[node.name];
        const isHovered = regionId === hoveredRegionId;
        
        // This is an interactive or non-interactive part of the brain
        return (
          <mesh
            key={node.uuid}
            geometry={node.geometry}
            material={!regionId ? node.material : materials[node.material.name]}
            onClick={(event) => {
              event.stopPropagation();
              
              // --- THIS IS THE NEW, CRUCIAL DEBUGGING STEP ---
              // Log the ACTUAL name of the mesh that was just clicked.
              console.log('--- CLICK EVENT ---');
              console.log('You clicked on MESH NAME:', node.name);
              
              // Now we call the parent function with the mapped ID.
              // If the map is wrong, `regionId` will be undefined here.
              onRegionClick(regionId);
            }}
            onPointerEnter={(e) => { if(regionId) { e.stopPropagation(); document.body.style.cursor = 'pointer'; onRegionHover(regionId); } }}
            onPointerLeave={() => { if(regionId) { document.body.style.cursor = 'auto'; onRegionHover(null); } }}
          >
            {/* Apply visual effects only to mapped, interactive regions */}
            {regionId && (
              <meshStandardMaterial
                {...materials[node.material.name]}
                color={isHovered ? '#ff9f43' : materials[node.material.name].color}
                emissive={isHovered ? '#ff9f43' : '#000000'}
                emissiveIntensity={isHovered ? 0.6 : 0}
              />
            )}
            {/* Make non-interactive parts transparent */}
            {!regionId && (
              <meshStandardMaterial
                {...node.material}
                transparent={true}
                opacity={0.3}
              />
            )}
          </mesh>
        );
      })}
    </group>
  );
}

useGLTF.preload('/models/brain-transformed.glb');