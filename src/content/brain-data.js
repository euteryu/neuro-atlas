// src/content/brain-data.js

export const brainRegions = [
  {
    id: 'frontal-lobe',
    name: 'Frontal Lobe',
    position: [0, 1.5, 2], // Position is now just for reference
    color: '#ff6b6b', // Color can be used for UI elements
    description: 'The home of our executive functions, decision making, and personality.',
    details: {
      functions: ['Working memory', 'Cognitive flexibility', 'Inhibitory control', 'Planning'],
      disorders: ['ADHD', 'Schizophrenia', 'Depression', 'Personality changes'],
      cases: ['Phineas Gage case study']
    }
  },
  {
    id: 'temporal-lobe',
    name: 'Temporal Lobe',
    position: [-1.5, 0, 0],
    color: '#4ecdc4',
    description: 'Crucial for processing auditory information and the encoding of memory.',
    details: {
      functions: ['Auditory processing', 'Memory formation (Hippocampus)', 'Language comprehension (Wernicke\'s area)'],
      disorders: ['Aphasia', 'Amnesia', 'Auditory hallucinations'],
      cases: ['Patient H.M.', 'Wernicke\'s aphasia studies']
    }
  },
  {
    id: 'parietal-lobe',
    name: 'Parietal Lobe',
    position: [0, 2, 0], // Placeholder
    color: '#45aaf2',
    description: 'Integrates sensory information, including touch, temperature, and pain.',
    details: {
      functions: ['Somatosensation', 'Spatial awareness', 'Navigation', 'Number representation'],
      disorders: ['Hemispatial neglect', 'Gerstmann\'s syndrome', 'Apraxia'],
      cases: ['Studies on hemispatial neglect patients']
    }
  },
  {
    id: 'occipital-lobe',
    name: 'Occipital Lobe',
    position: [0, 0.5, -2.5],
    color: '#fd79a8',
    description: 'The visual processing center of the brain.',
    details: {
      functions: ['Visual perception', 'Object recognition', 'Color determination', 'Motion detection'],
      disorders: ['Cortical blindness', 'Visual agnosia', 'Prosopagnosia'],
      cases: ['Patient D.F.', 'Blindsight studies']
    }
  },
  {
    id: 'cerebellum',
    name: 'Cerebellum',
    position: [0, -2, -1],
    color: '#a55eea',
    description: 'Coordinates voluntary movements such as posture, balance, and speech.',
    details: {
      functions: ['Motor coordination', 'Balance', 'Procedural memory', 'Motor learning'],
      disorders: ['Ataxia', 'Dysmetria', 'Intention tremors'],
      cases: ['Studies of patients with cerebellar damage']
    }
  },
];