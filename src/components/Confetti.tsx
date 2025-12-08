
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AnimationType } from '@/types.ts';

interface Props {
  type: AnimationType;
  colors: string[];
}

interface Particle {
  id: number;
  x: number;
  yStart: number;
  color: string;
  size: number;
  duration: number;
  delay: number;
  shape: 'circle' | 'square' | 'triangle' | 'star' | 'heart' | 'squiggle';
  rotation: number;
  sway: number[];
}

const BackgroundEffect: React.FC<Props> = ({ type, colors }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Increase count for more chaos, especially for confetti
    const count = type === 'snow' ? 100 : type === 'confetti' ? 70 : type === 'sparkles' ? 40 : 50;
    
    const newParticles = Array.from({ length: count }).map((_, i) => {
      // Determine shape based on type
      let shape: Particle['shape'] = 'circle'; // default
      if (type === 'hearts') shape = 'heart';
      else if (type === 'snow' || type === 'bubbles') shape = 'circle';
      else if (type === 'sparkles') shape = 'star';
      else if (type === 'confetti') {
        const shapes: Particle['shape'][] = ['circle', 'square', 'triangle', 'squiggle'];
        shape = shapes[Math.floor(Math.random() * shapes.length)];
      }

      // Chaotic sway pattern logic
      const startX = Math.random() * 100;
      const swayAmplitude = type === 'confetti' ? 15 : type === 'snow' ? 5 : 2; 
      
      const sway = [
        startX, 
        startX + (Math.random() * swayAmplitude - swayAmplitude/2),
        startX - (Math.random() * swayAmplitude - swayAmplitude/2),
        startX + (Math.random() * swayAmplitude - swayAmplitude/2)
      ];

      return {
        id: i,
        x: startX,
        yStart: type === 'sparkles' ? Math.random() * 100 : -Math.random() * 20 - 10, // Sparkles start everywhere
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random(),
        duration: (type === 'snow' ? 10 : type === 'sparkles' ? 3 : 3.5) + Math.random() * 4,
        delay: Math.random() * 5,
        shape,
        rotation: Math.random() * 360,
        sway
      };
    });
    setParticles(newParticles);
  }, [type, colors]);

  const getPath = (shape: Particle['shape']) => {
    switch(shape) {
      case 'heart': return "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";
      case 'star': return "M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z";
      case 'triangle': return "M12 4L4 20h16L12 4z";
      case 'circle': return "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z";
      case 'squiggle': return "M4,12 C8,2 16,22 20,12"; // Simple curve
      default: return ""; // Square handled by div
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => {
        const isStroke = p.shape === 'squiggle';
        const isSvg = p.shape !== 'square';
        const isSparkle = type === 'sparkles';
        
        return (
          <motion.div
            key={p.id}
            initial={{ 
              y: isSparkle ? p.yStart + '%' : -50, 
              x: `${p.sway[0]}vw`, 
              rotate: p.rotation,
              opacity: type === 'snow' ? 0 : 0
            }}
            animate={{
              y: isSparkle 
                  ? [p.yStart + '%', p.yStart - 5 + '%', p.yStart + '%'] // Float in place
                  : '110vh', // Fall down
              rotate: isSparkle 
                  ? [p.rotation, p.rotation + 20, p.rotation] 
                  : [p.rotation, p.rotation + (Math.random() > 0.5 ? 360 : -360) * (type === 'snow' ? 1 : 5)],
              x: isSparkle ? `${p.x}vw` : p.sway.map(s => `${s}vw`),
              opacity: isSparkle 
                  ? [0, 1, 0.5, 1, 0] // Twinkle
                  : type === 'bubbles' ? [0, 1, 0] 
                  : type === 'snow' ? [0, 0.8, 0.8, 0] 
                  : 1,
              scale: isSparkle ? [0.5, 1.2, 0.5] : 1
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: type === 'snow' ? "linear" : "easeInOut",
              delay: p.delay,
              times: isSparkle ? [0, 0.5, 1] : [0, 0.33, 0.66, 1]
            }}
            className="absolute"
          >
            {!isSvg ? (
              <div 
                style={{ 
                  backgroundColor: p.color,
                  width: `${8 + p.size * 10}px`,
                  height: `${8 + p.size * 10}px`,
                  borderRadius: '2px',
                }}
              />
            ) : (
              <svg 
                width={type === 'snow' ? 10 + p.size * 10 : 20 + p.size * 12} 
                height={type === 'snow' ? 10 + p.size * 10 : 20 + p.size * 12} 
                viewBox="0 0 24 24" 
                fill={isStroke ? 'none' : p.color}
                stroke={isStroke ? p.color : 'none'}
                strokeWidth={isStroke ? "3" : "0"}
                strokeLinecap="round"
                style={{ 
                  filter: type === 'sparkles' ? 'drop-shadow(0px 0px 4px rgba(255, 215, 0, 0.8))' : 'none' 
                }}
              >
                <path d={getPath(p.shape)} />
              </svg>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default BackgroundEffect;
