import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useThemeStore } from '../store/themeStore';
import { Instagram, Youtube, Twitter, Share2 } from 'lucide-react';

export const GlobeVisualization = ({ isLoading = false, isLanding = false }) => {
  const { currentTheme } = useThemeStore();
  const globeRef = useRef<HTMLDivElement>(null);

  const themeColors = {
    blue: '#3B82F6',
    purple: '#8B5CF6',
    gold: '#F59E0B'
  };

  const scale = isLanding ? 1.5 : (isLoading ? 1.2 : 1);

  return (
    <div className={`relative w-full h-full flex items-center justify-center ${isLanding ? 'z-20' : ''}`}>
      <motion.div
        ref={globeRef}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale,
          opacity: 1,
          transition: { duration: 0.8, ease: "easeOut" }
        }}
        className="relative"
        style={{ 
          transformStyle: 'preserve-3d',
          transform: isLanding ? undefined : 'rotateX(15deg)'
        }}
      >
        {/* Enhanced 3D Globe Structure */}
        <motion.div 
          className="w-80 h-80 rounded-full relative"
          animate={!isLanding ? { rotateY: 360 } : undefined}
          transition={!isLanding ? {
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          } : undefined}
          style={{
            background: `radial-gradient(circle at 30% 30%, ${themeColors[currentTheme]}20, ${themeColors[currentTheme]}05)`,
            boxShadow: `
              inset -20px -20px 60px ${themeColors[currentTheme]}40,
              inset 20px 20px 60px ${themeColors[currentTheme]}20,
              0 0 80px ${themeColors[currentTheme]}30
            `,
            transformStyle: 'preserve-3d',
            perspective: '1000px'
          }}
        >
          {/* Enhanced Sphere Effect Layers */}
          {[...Array(12)].map((_, i) => (
            <div
              key={`sphere-${i}`}
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(circle at ${30 + i * 5}% ${30 + i * 5}%, ${themeColors[currentTheme]}${20 - i}, transparent)`,
                transform: `translateZ(${i * 2}px) scale(${1 - i * 0.02})`,
                opacity: 1 - (i * 0.08)
              }}
            />
          ))}

          {/* Enhanced Latitude Lines */}
          {[...Array(15)].map((_, i) => (
            <div
              key={`lat-${i}`}
              className="absolute w-full"
              style={{
                height: '1px',
                top: `${(i + 1) * 6}%`,
                background: `linear-gradient(90deg, transparent, ${themeColors[currentTheme]}30, transparent)`,
                transform: `rotateX(${(i - 7) * 12}deg) translateZ(2px)`,
                opacity: 1 - Math.abs(i - 7) / 8,
                transformStyle: 'preserve-3d'
              }}
            />
          ))}

          {/* Enhanced Longitude Lines */}
          {[...Array(24)].map((_, i) => (
            <div
              key={`long-${i}`}
              className="absolute h-full"
              style={{
                width: '1px',
                left: '50%',
                background: `linear-gradient(180deg, transparent, ${themeColors[currentTheme]}30, transparent)`,
                transform: `rotateY(${i * 15}deg) translateZ(2px)`,
                transformOrigin: '50% 50%',
                transformStyle: 'preserve-3d'
              }}
            />
          ))}

          {/* Enhanced Glowing Core */}
          <div
            className="absolute inset-8 rounded-full"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${themeColors[currentTheme]}40, transparent)`,
              filter: 'blur(15px)',
              transform: 'translateZ(-40px)',
              opacity: 0.9
            }}
          />

          {/* Enhanced Surface Details */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle at 70% 70%, transparent, ${themeColors[currentTheme]}15)`,
              transform: 'translateZ(5px) rotateX(-15deg)',
              mixBlendMode: 'soft-light'
            }}
          />

          {/* Enhanced Depth Effect */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `linear-gradient(45deg, ${themeColors[currentTheme]}10, transparent)`,
              transform: 'translateZ(10px)',
              filter: 'blur(5px)'
            }}
          />
        </motion.div>

        {/* Orbiting Social Icons */}
        <motion.div
          animate={{
            rotate: 360
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0"
          style={{ transform: 'translateZ(30px)' }}
        >
          {[Instagram, Youtube, Twitter, Share2].map((Icon, index) => (
            <motion.div
              key={index}
              className="absolute"
              style={{
                top: '50%',
                left: '50%',
                transform: `rotate(${index * 90}deg) translateX(180px) rotate(-${index * 90}deg) translateZ(${20 + Math.sin(index * Math.PI / 2) * 10}px)`
              }}
              whileHover={{ scale: 1.2 }}
            >
              <div
                className="p-3 rounded-full backdrop-blur-sm"
                style={{
                  background: `linear-gradient(45deg, ${themeColors[currentTheme]}40, transparent)`,
                  boxShadow: `0 0 20px ${themeColors[currentTheme]}30`,
                  transform: 'translateZ(20px)'
                }}
              >
                <Icon className="w-6 h-6" style={{ color: themeColors[currentTheme] }} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};