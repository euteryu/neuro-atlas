// src/components/StatsCalculatorModal.js
'use client';

import { motion } from 'framer-motion';
import { X, Play } from 'lucide-react';
import { useNeuroStore } from '@/stores/useNeuroStore';
import '@/styles/StatsCalculatorModal.css'; // Import our new stylesheet

export function StatsCalculatorModal() {
  const { setActiveModal } = useNeuroStore();

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-8"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <motion.div
        className="relative w-full max-w-4xl h-auto bg-black/50 backdrop-blur-xl border border-cyan-300/30 shadow-2xl shadow-cyan-500/30 stats-modal-container p-8 text-white"
        initial={{ y: 50, scale: 0.9, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 50, scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      >
        <button 
          onClick={() => setActiveModal(null)}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full z-10"
        >
          <X size={24} />
        </button>

        <div className="stats-modal-grid">
          <header className="modal-header">
            <h2 className="text-3xl font-bold text-cyan-300" style={{textShadow: '0 0 8px #00ffff'}}>STATISTICAL ANALYSIS</h2>
            <p className="text-cyan-300/70">Input datasets and configure parameters for computation.</p>
          </header>

          <section className="modal-inputs modal-widget">
            <h3 className="text-lg font-semibold mb-4">Data Input</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Dataset 1</label>
                <textarea rows="3" className="w-full bg-black/30 border border-cyan-300/30 rounded-lg p-3 outline-none focus:ring-2 focus:ring-cyan-400" placeholder="e.g., 12, 15, 18..."></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Dataset 2</label>
                <textarea rows="3" className="w-full bg-black/30 border border-cyan-300/30 rounded-lg p-3 outline-none focus:ring-2 focus:ring-cyan-400" placeholder="e.g., 10, 12, 14..."></textarea>
              </div>
            </div>
          </section>
          
          <section className="modal-params modal-widget">
            <h3 className="text-lg font-semibold mb-4">Parameters</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Test Type</label>
                <select className="w-full bg-black/30 border border-cyan-300/30 rounded-lg p-3 outline-none focus:ring-2 focus:ring-cyan-400">
                  <option>Independent Samples T-Test</option>
                  <option>Paired Samples T-Test</option>
                  <option>ANOVA</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Confidence Level: 95%</label>
                <input type="range" min="80" max="99" defaultValue="95" className="w-full futuristic-slider" />
              </div>
            </div>
          </section>

          <footer className="modal-footer flex justify-end">
            <button className="flex items-center justify-center px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-lg shadow-lg shadow-cyan-500/50 transition-all">
              <Play className="mr-2" size={20} />
              COMPUTE
            </button>
          </footer>
        </div>
      </motion.div>
    </motion.div>
  );
}