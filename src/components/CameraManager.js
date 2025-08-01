// src/components/CameraManager.js
'use client';

import { useEffect, useState } from 'react'; // Import useState
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import { useNeuroStore } from '@/stores/useNeuroStore';

const GALAXY_VIEW_POSITION = new THREE.Vector3(0, 0, 15);
const HUB_VIEW_POSITION = new THREE.Vector3(0, 2, 20);
const STATS_GALAXY_COCKPIT_POSITION = new THREE.Vector3(0, 0, 10);
const MAX_HUB_DISTANCE = 30;

export function CameraManager() {
  const { camera, controls, mouse } = useThree();
  const { view, jumpTo, setCameraInfo, toggleWarpEffect } = useNeuroStore(); // Get toggleWarpEffect
  
  // Local state to track if a flight is currently active
  const [isFlightActive, setIsFlightActive] = useState(false);

  useFrame(() => {
    TWEEN.update();
    if (!controls) return;
    if (view.mode === 'galaxy' && view.id === 'stats') {
      const target = new THREE.Vector3(mouse.x * 2, mouse.y * 2, 0);
      controls.target.lerp(target, 0.1);
    }
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    setCameraInfo({ position: camera.position, direction });
    const distance = controls.getDistance();
    if (view.mode === 'galaxy' && view.id !== 'stats' && distance > MAX_HUB_DISTANCE + 5) {
      jumpTo({ mode: 'hub' });
    }
  });
  
  useEffect(() => {
    if (!controls) return;
    
    let targetPosition, targetLookAt;
    
    if (view.mode === 'hub') {
      targetPosition = HUB_VIEW_POSITION;
      targetLookAt = new THREE.Vector3(0, 0, 0);
      controls.maxDistance = MAX_HUB_DISTANCE;
      controls.minDistance = 5;
    } else {
      controls.enableZoom = view.id !== 'stats';
      controls.enablePan = view.id !== 'stats';
      if (view.id === 'stats') {
        targetPosition = STATS_GALAXY_COCKPIT_POSITION;
        targetLookAt = new THREE.Vector3(0, 0, 0);
      } else {
        targetPosition = GALAXY_VIEW_POSITION;
        targetLookAt = new THREE.Vector3(0, 0, 0);
        controls.maxDistance = MAX_HUB_DISTANCE + 10;
      }
    }
    
    TWEEN.removeAll();
    setIsFlightActive(true); // Indicate flight has started
    toggleWarpEffect(true); // Immediately turn on the blur
    
    // --- FIX: Add a reliable timer to turn off the blur ---
    const flightTween = new TWEEN.Tween(camera.position)
      .to(targetPosition, 1000)
      .easing(TWEEN.Easing.Quartic.Out)
      .onComplete(() => {
        setIsFlightActive(false); // Indicate flight has ended
        // After a small delay, turn off the blur. This gives the browser time to render.
        setTimeout(() => {
          toggleWarpEffect(false);
        }, 100); // 100ms delay. Adjust if needed.
      })
      .start();
    // ----------------------------------------------------
      
    new TWEEN.Tween(controls.target)
      .to(targetLookAt, 1000)
      .easing(TWEEN.Easing.Quartic.Out)
      .start();
      
    // Cleanup function: If the component unmounts or effect re-runs mid-flight, stop the tween
    return () => {
      flightTween.stop();
      setIsFlightActive(false);
      toggleWarpEffect(false); // Ensure blur is off if flight is prematurely stopped
    };

  }, [view, controls, toggleWarpEffect]); // Dependency array is now cleaner

  return null;
}