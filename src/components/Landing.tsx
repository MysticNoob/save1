import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useThemeStore } from '../store/themeStore';
import { ArrowRight } from 'lucide-react';
import { CubeHero } from './CubeHero';

export const Landing = () => {
  const navigate = useNavigate();
  const { theme } = useThemeStore();

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-start">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/95 to-gray-900" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8"
        >
          <motion.h1
            className={`text-7xl font-bold bg-clip-text text-transparent ${theme.gradient}`}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Media Manager
          </motion.h1>

          <motion.p
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Your command center for seamless social media management.
            Connect, schedule, and analyze all your platforms in one place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="pt-8"
          >
            <button
              onClick={() => navigate('/dashboard')}
              className={`${theme.gradient} px-8 py-4 rounded-full text-lg font-semibold 
                shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all
                flex items-center space-x-2 mx-auto`}
            >
              <span>Enter Dashboard</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </motion.div>

        <CubeHero />
      </div>
    </div>
  );
};