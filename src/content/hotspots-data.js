// src/content/hotspots-data.js

// Defines the invisible spheres inside the brain that trigger pop-ups.
// - id: Matches the key in the knowledge-base.js file.
// - position: The [x, y, z] coordinates of the hotspot's center.
// - radius: How close the mouse needs to be to trigger this hotspot.
export const hotspots = [
  {
    id: 'frontal-lobe',
    name: 'Frontal Lobe',
    position: [0, 1.2, 1.8],
    radius: 0.9
  },
  {
    id: 'cerebellum',
    name: 'Cerebellum',
    position: [0, -1.5, -0.8],
    radius: 0.8
  },
  {
    id: 'temporal-lobe',
    name: 'Temporal Lobe',
    position: [-1.4, -0.2, 0.5],
    radius: 0.7
  },
  {
    id: 'parietal-lobe',
    name: 'Parietal Lobe',
    position: [0, 1.8, 0.2],
    radius: 0.8
  },
  {
    id: 'occipital-lobe',
    name: 'Occipital Lobe',
    position: [0, 0.5, -2.0],
    radius: 0.8
  }
];