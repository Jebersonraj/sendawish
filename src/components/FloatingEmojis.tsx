import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface FloatingEmojisProps {
  emojis: string[];
}

const FloatingEmojis: React.FC<FloatingEmojisProps> = ({ emojis }) => {
  const [items, setItems] = useState<{ id: number; emoji: string; x: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    const newItems = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      emoji: emojis[i % emojis.length],
      x: Math.random() * 100,
      duration: 10 + Math.random() * 20,
      delay: Math.random() * 10,
    }));
    setItems(newItems);
  }, [emojis]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {items.map((item) => (
        <motion.div
          key={item.id}
          initial={{ y: '110vh', x: `${item.x}vw`, opacity: 0, rotate: 0 }}
          animate={{
            y: '-10vh',
            opacity: [0, 1, 1, 0],
            rotate: 360,
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            delay: item.delay,
            ease: "linear",
          }}
          className="absolute text-4xl md:text-6xl"
        >
          {item.emoji}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingEmojis;