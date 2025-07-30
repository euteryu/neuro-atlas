// src/app/page.js
'use client';

import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, Stars } from '@react-three/drei';
import { Brain, Calculator, BookOpen, Menu, X } from 'lucide-react';

import { brainRegions } from '@/content/brain-data';
import { BrainModel } from '@/components/Brain';

function KnowledgeHub({ selectedRegion, onClose }) {
  if (!selectedRegion) return null;
  return (
    <div className="fixed right-0 top-16 bottom-0 w-full md:w-96 bg-white shadow-2xl transform transition-transform duration-300 z-20 overflow-y-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{selectedRegion.name}</h2>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={20} /></button>
      </div>
      <div className="space-y-6">
        <div className="p-4 bg-gray-50 rounded-lg"><p className="text-gray-700 leading-relaxed">{selectedRegion.description}</p></div>
        <div><h3 className="text-lg font-semibold text-gray-800 mb-3">Key Functions</h3><ul className="space-y-2">{selectedRegion.details.functions.map((func, i) => <li key={i} className="flex items-center text-gray-600"><div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>{func}</li>)}</ul></div>
        <div><h3 className="text-lg font-semibold text-gray-800 mb-3">Associated Disorders</h3><ul className="space-y-2">{selectedRegion.details.disorders.map((d, i) => <li key={i} className="flex items-center text-gray-600"><div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>{d}</li>)}</ul></div>
        <div><h3 className="text-lg font-semibold text-gray-800 mb-3">Notable Case Studies</h3><div className="space-y-2">{selectedRegion.details.cases.map((c, i) => <button key={i} className="block w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-blue-700 font-medium">{c}</button>)}</div></div>
      </div>
    </div>
  );
}

function StatsLab() {
  const [result, setResult] = useState(null); const [loading, setLoading] = useState(false);
  const runStatTest = () => { setLoading(true); setTimeout(() => { setResult({ statistic: (Math.random()*4-2).toFixed(3), pValue: (Math.random()*0.1).toFixed(4), significant: Math.random() > 0.5 }); setLoading(false); }, 1500); };
  return (
    <div className="max-w-4xl mx-auto p-6"><div className="bg-white rounded-lg shadow-lg p-8"><div className="flex items-center mb-6"><Calculator className="text-blue-600 mr-3" size={28} /><h2 className="text-3xl font-bold text-gray-800">Statistics Lab</h2></div><div className="grid md:grid-cols-2 gap-6"><div><label className="block text-sm font-medium text-gray-700 mb-2">Dataset 1</label><textarea className="w-full p-3 border border-gray-300 rounded-lg" rows={4} placeholder="12, 15, 18..." /></div><div><label className="block text-sm font-medium text-gray-700 mb-2">Dataset 2</label><textarea className="w-full p-3 border border-gray-300 rounded-lg" rows={4} placeholder="10, 12, 14..." /></div></div><div className="mt-6"><label className="block text-sm font-medium text-gray-700 mb-2">Statistical Test</label><select className="w-full p-3 border border-gray-300 rounded-lg"><option>Independent Samples T-Test</option><option>Pearson Correlation</option></select></div><button onClick={runStatTest} disabled={loading} className="mt-6 w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 font-medium">{loading ? 'Calculating...' : 'Run Analysis'}</button>{result && (<div className="mt-6 p-6 bg-gray-50 rounded-lg"><h3 className="text-lg font-semibold text-gray-800 mb-4">Results</h3><div className="space-y-2"><p><span className="font-medium">Test Statistic:</span> {result.statistic}</p><p><span className="font-medium">P-Value:</span> {result.pValue}</p><p className={`font-medium ${result.significant ? 'text-green-600' : 'text-red-600'}`}>Result: {result.significant ? 'Statistically Significant' : 'Not Statistically Significant'}</p></div></div>)}</div></div>
  );
}

export default function NeuroAtlas() {
  const [currentView, setCurrentView] = useState('atlas');
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [hoveredRegionId, setHoveredRegionId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleRegionClick = (regionId) => {
    console.log("Region ID received from event:", regionId);
    const region = brainRegions.find(r => r.id === regionId);
    console.log("Found region data:", region);
    setSelectedRegion(region);
  };

  const navigation = [
    { id: 'atlas', name: '3D Brain Atlas', icon: Brain },
    { id: 'knowledge', name: 'Knowledge Base', icon: BookOpen },
    { id: 'stats', name: 'Stats Lab', icon: Calculator },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="sticky top-0 bg-black bg-opacity-30 backdrop-blur-md border-b border-white border-opacity-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center"><Brain className="text-white mr-3" size={28} /><h1 className="text-white text-xl font-bold">Neuro-Atlas</h1></div>
            <div className="hidden md:flex space-x-4">
              {navigation.map((item) => (
                <button key={item.id} onClick={() => setCurrentView(item.id)} className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === item.id ? 'bg-white bg-opacity-20' : 'text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10'}`}><item.icon size={18} className="mr-2" />{item.name}</button>
              ))}
            </div>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden p-2"><Menu size={24} /></button>
          </div>
        </div>
      </nav>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-64 bg-gray-900 p-4">
            <div className="flex justify-between items-center mb-8"><h2 className="text-white text-lg font-bold">Navigation</h2><button onClick={() => setSidebarOpen(false)}><X size={24} /></button></div>
            <div className="space-y-4">
              {navigation.map((item) => (
                <button key={item.id} onClick={() => { setCurrentView(item.id); setSidebarOpen(false); }} className={`flex items-center w-full px-3 py-2 rounded-md text-sm font-medium ${currentView === item.id ? 'bg-blue-600' : 'text-gray-300 hover:bg-gray-700'}`}><item.icon size={18} className="mr-2" />{item.name}</button>
              ))}
            </div>
          </div>
        </div>
      )}

      <main>
        <div className={currentView === 'atlas' ? 'block' : 'hidden'}>
          <div className="h-screen w-full absolute top-0 left-0">
            <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
              <Suspense fallback={<Html><div>Loading 3D Model...</div></Html>}>
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <ambientLight intensity={1.5} />
                <directionalLight position={[10, 10, 5]} intensity={2} />
                <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} autoRotate={true} autoRotateSpeed={0.3} />
                <BrainModel onRegionClick={handleRegionClick} onRegionHover={setHoveredRegionId} hoveredRegionId={hoveredRegionId} />
              </Suspense>
            </Canvas>
            <KnowledgeHub selectedRegion={selectedRegion} onClose={() => setSelectedRegion(null)} />
          </div>
        </div>
        
        <div className={currentView === 'stats' ? 'block' : 'hidden'}><StatsLab /></div>
        
        <div className={currentView === 'knowledge' ? 'block' : 'hidden'}>
          <div className="min-h-screen pt-8"><div className="max-w-4xl mx-auto p-6"><div className="bg-white rounded-lg shadow-lg p-8 text-gray-800"><div className="flex items-center mb-6"><BookOpen className="text-green-600 mr-3" size={28} /><h2 className="text-3xl font-bold">Knowledge Base</h2></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {brainRegions.map((region) => (
              <div 
                key={region.id} 
                className="p-4 border border-gray-200 rounded-lg hover:shadow-md cursor-pointer" 
                onClick={() => {
                  handleRegionClick(region.id);
                  setCurrentView('atlas');
                }}>
                <div className="w-4 h-4 rounded-full mb-2" style={{ backgroundColor: region.color }} />
                <h3 className="font-semibold mb-2">{region.name}</h3>
                <p className="text-sm text-gray-600">{region.description}</p>
              </div>
            ))}
          </div>
          </div></div></div>
        </div>
      </main>
    </div>
  );
}