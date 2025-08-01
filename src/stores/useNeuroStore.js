// src/stores/useNeuroStore.js
import { create } from 'zustand';

export const useNeuroStore = create((set, get) => ({
  // --- STATE ---
  view: { mode: 'hub', id: null },
  cameraInfo: { position: { x: 0, y: 0, z: 0 }, direction: { x: 0, y: 0, z: -1 } },
  isWarping: false, // This will now be controlled by a dedicated toggle action
  activeModal: null,

  // --- ACTIONS ---
  setCameraInfo: (newInfo) => set({ cameraInfo: newInfo }),
  setActiveModal: (modalId) => set({ activeModal: modalId }),
  
  // --- NEW: Dedicated action to control the warp effect's visibility ---
  toggleWarpEffect: (status) => set({ isWarping: status }),

  jumpTo: (targetView) => {
    const { view: currentView, isWarping } = get();

    if (isWarping) return; // Prevent new jumps while one is in progress
    if (currentView.mode === targetView.mode && currentView.id === targetView.id) return;

    // The CameraManager will call toggleWarpEffect when it actually starts/ends the flight.
    set({ view: targetView });
  },
}));