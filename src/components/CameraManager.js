// src/components/CameraManager.js
'use client';

import { useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';

// --- FIX: Tighter, more controlled camera positions ---
const GALAXY_VIEW_POSITION = new THREE.Vector3(0, 0, 15);
const HUB_VIEW_POSITION = new THREE.Vector3(0, 2, 20); // Much closer "Orrery" view
const MAX_HUB_DISTANCE = 30; // The absolute "wall" of the universe
const GALAXY_SWITCH_TRIGGER_DISTANCE = 25;
// ----------------------------------------------------

export function CameraManager({ view, setView, onCameraUpdate, onWarpStart, onWarpEnd }) {
  const { camera, controls } = useThree();

  useFrame(() => {
    TWEEN.update();
    if (!controls) return;
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    onCameraUpdate({ position: camera.position, direction });
    const distance = controls.getDistance();
    if (view.mode === 'galaxy' && distance > GALAXY_SWITCH_TRIGGER_DISTANCE) {
      setView({ mode: 'hub' });
    }
  });
  
  useEffect(() => {
    if (!controls) return;
    
    let targetPosition, targetLookAt;
    
    if (view.mode === 'galaxy') {
      targetPosition = GALAXY_VIEW_POSITION;
      targetLookAt = new THREE.Vector3(0, 0, 0);
      controls.maxDistance = GALAXY_SWITCH_TRIGGER_DISTANCE;
    } else { // hub mode
      targetPosition = HUB_VIEW_POSITION;
      targetLookAt = new THREE.Vector3(0, 0, 0);
      controls.maxDistance = MAX_HUB_DISTANCE;
    }
    
    // --- FIX: Prevent animation fighting by stopping previous tweens ---
    TWEEN.removeAll();
    onWarpStart();
    // --------------------------------------------------------------------

    new TWEEN.Tween(camera.position)
      .to(targetPosition, 1000)
      .easing(TWEEN.Easing.Quartic.Out)
      .start();
      
    new TWEEN.Tween(controls.target)
      .to(targetLookAt, 1000)
      .easing(TWEEN.Easing.Quartic.Out)
      .onComplete(() => {
          // This ensures the warp ends cleanly and gives control back
          onWarpEnd();
      })
      .start();
      
  }, [view, controls, onWarpStart, onWarpEnd, setView]);

  return null;
}