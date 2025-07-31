// src/stores/useNeuroStore.js
import { create } from 'zustand';

export const useNeuroStore = create((set, get) => ({ // Add 'get' to read the current state
  // --- STATE ---
  view: { mode: 'hub', id: null },
  cameraInfo: {
    position: { x: 0, y: 0, z: 0 },
    direction: { x: 0, y: 0, z: -1 },
  },
  isWarping: false,

  // --- ACTIONS ---
  setView: (newView) => set({ view: newView }),
  setCameraInfo: (newInfo) => set({ cameraInfo: newInfo }),
  setIsWarping: (status) => set({ isWarping: status }),

  // --- THIS IS THE MAJOR FIX ---
  // The jumpToGalaxy action is now much smarter.
  jumpToGalaxy: (galaxyId) => {
    const currentView = get().view; // Get the current state before changing it

    // If we are already warping, or already at the destination, do nothing.
    if (get().isWarping || (currentView.mode === 'galaxy' && currentView.id === galaxyId)) {
      return;
    }

    // Set the warping flag immediately.
    set({ isWarping: true });

    const performJump = () => {
      set({ view: { mode: 'galaxy', id: galaxyId } });
    };

    if (currentView.mode === 'hub') {
      // If we are already in the hub, the jump is simple and direct.
      performJump();
    } else {
      // If we are inside another galaxy, perform the "Two-Step Warp".
      // Step 1: Set the view to 'hub' to initiate the flight out.
      set({ view: { mode: 'hub' } });

      // Step 2: After a delay (to allow the first flight to complete),
      // initiate the second flight into the new galaxy.
      setTimeout(performJump, 1100); // 1100ms is slightly longer than the flight animation.
    }
  },

  returnToHub: () => {
    if (get().isWarping || get().view.mode === 'hub') return;
    set({ isWarping: true, view: { mode: 'hub' } });
  }
}));