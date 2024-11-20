import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useThemeStore } from '../store/themeStore';
import { BarChart2, Calendar, TrendingUp, Upload, Share2, Users } from 'lucide-react';

interface CubeFace {
  icon: React.ElementType;
  label: string;
  description: string;
}

const themeColors = {
  blue: '#3B82F6',
  purple: '#8B5CF6',
  gold: '#F59E0B'
};

const colorSequence = ['blue', 'purple', 'gold'] as const;

const CubeFaceContent: React.FC<{ face: CubeFace; isHovered: boolean; currentColor: string }> = ({ face, isHovered, currentColor }) => {
  const Icon = face.icon;

  return (
    <div className="text-center p-8 w-full h-full flex flex-col items-center justify-center">
      <Icon 
        className="w-12 h-12 mb-4 transition-colors duration-1000" 
        style={{ color: currentColor }} 
      />
      <h3 className="text-lg font-semibold mb-2">{face.label}</h3>
      <motion.div
        initial={false}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.8,
        }}
        transition={{ duration: 0.2 }}
        className="text-sm text-gray-300 mt-2"
      >
        {face.description}
      </motion.div>
    </div>
  );
};

export const CubeHero = () => {
  const [hoveredFace, setHoveredFace] = useState<number | null>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: -20, y: 45 });
  const [colorIndex, setColorIndex] = useState(0);
  const [currentColor, setCurrentColor] = useState(themeColors[colorSequence[0]]);

  const faces: CubeFace[] = [
    { icon: BarChart2, label: 'Analytics', description: 'Deep insights into your social media performance' },
    { icon: Calendar, label: 'Scheduling', description: 'Plan and automate your content delivery' },
    { icon: TrendingUp, label: 'Growth Tools', description: 'Expand your reach and engagement' },
    { icon: Upload, label: 'Content Upload', description: 'Distribute content across platforms' },
    { icon: Share2, label: 'Integration', description: 'Connect all your social accounts' },
    { icon: Users, label: 'Community', description: 'Build and manage your audience' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % colorSequence.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const nextColor = themeColors[colorSequence[colorIndex]];
    setCurrentColor(nextColor);
  }, [colorIndex]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !cubeRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 60;
      const rotateX = ((e.clientY - centerY) / (rect.height / 2)) * 60;

      setRotation({
        x: -20 + (-rotateX),
        y: 45 + (rotateY)
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const renderFace = (index: number, transform: string) => (
    <motion.div
      className="absolute inset-0"
      style={{
        transform,
        backgroundColor: `${currentColor}15`,
        backdropFilter: 'blur(8px)',
        border: `2px solid ${currentColor}40`,
        boxShadow: hoveredFace === index ? `0 0 30px ${currentColor}60` : `0 0 20px ${currentColor}30`,
        backfaceVisibility: 'hidden',
        transition: 'background-color 1s, border-color 1s, box-shadow 1s',
      }}
      onHoverStart={() => setHoveredFace(index)}
      onHoverEnd={() => setHoveredFace(null)}
    >
      <CubeFaceContent 
        face={faces[index]} 
        isHovered={hoveredFace === index}
        currentColor={currentColor}
      />
    </motion.div>
  );

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[600px] flex items-center justify-center"
      style={{ perspective: '2000px' }}
    >
      <motion.div
        ref={cubeRef}
        className="relative"
        style={{
          width: '300px',
          height: '300px',
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: 'transform 0.2s ease-out'
        }}
      >
        {renderFace(0, 'translateZ(150px)')}
        {renderFace(1, 'rotateY(180deg) translateZ(150px)')}
        {renderFace(2, 'rotateY(90deg) translateZ(150px)')}
        {renderFace(3, 'rotateY(-90deg) translateZ(150px)')}
        {renderFace(4, 'rotateX(90deg) translateZ(150px)')}
        {renderFace(5, 'rotateX(-90deg) translateZ(150px)')}

        {/* Glowing edges */}
        <div
          className="absolute inset-0"
          style={{
            transform: 'translateZ(150px)',
            border: `2px solid ${currentColor}`,
            boxShadow: `0 0 30px ${currentColor}`,
            opacity: 0.2,
            pointerEvents: 'none',
            backfaceVisibility: 'hidden',
            transition: 'border-color 1s, box-shadow 1s',
          }}
        />
      </motion.div>
    </div>
  );
};