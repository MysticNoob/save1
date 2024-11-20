import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { Upload } from './components/Upload';
import { Schedule } from './components/Schedule';
import { Analytics } from './components/Analytics';
import { ApiManager } from './components/ApiManager';
import { Landing } from './components/Landing';
import { GlobeVisualization } from './components/GlobeVisualization';

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {location.pathname !== '/' && <Navigation />}
      <GlobeVisualization isLoading={loading} isLanding={location.pathname === '/'} />
      
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={`relative z-10 ${location.pathname !== '/' ? 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8' : ''}`}
        >
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/api-management" element={<ApiManager />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
    </div>
  );
}

export default App;