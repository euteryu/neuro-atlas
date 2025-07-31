// src/components/CameraManager.js
'use client';

import { useThree, useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';
import { useNeuroStore } from '@/stores/useNeuroStore'; // Import our new store

// Constants for our camera views
const GALAXY_VIEW_PROPS = { pos: [0, 0, 15], target: [0, 0, 0] };
const HUB_VIEW_PROPS = { pos: [0, 2, 20], target: [0, 0, 0] };
const MAX_HUB_DISTANCE = 30;

export function CameraManager() {
  const { camera, controls } = useThree();
  // Get state and actions directly from the Zustand store
  const { view, returnToHub, setCameraInfo, setIsWarping } = useNeuroStore();

  // --- NEW ARCHITECTURE: Driving animations with a spring ---
  const [{ cameraPos, cameraTarget }] = useSpring(() => {
    const props = view.mode === 'galaxy' ? GALAXY_VIEW_PROPS : HUB_VIEW_PROPS;
    return {
      cameraPos: props.pos,
      cameraTarget: props.target,
      config: { mass: 1, tension: 170, friction: 26 },
      onRest: () => setIsWarping(false), // Turn off warp effect when animation finishes
    };
  }, [view]);
  // -----------------------------------------------------------

  useFrame(() => {
    if (!controls) return;

    // Animate the camera and target on every frame using the spring's values
    camera.position.set(...cameraPos.get());
    controls.target.set(...cameraTarget.get());
    controls.update();

    // Continuously report camera info for the minimap
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    setCameraInfo({ position: camera.position, direction });
    
    // Automatically return to hub if zoomed out too far
    if (view.mode === 'galaxy' && controls.getDistance() > MAX_HUB_DISTANCE) {
      returnToHub();
    }
  });

  // Set the hard limit for zooming out in hub view
  if (controls) {
    controls.maxDistance = view.mode === 'hub' ? MAX_HUB_DISTANCE : MAX_HUB_DISTANCE + 5;
  }

  return null;
}