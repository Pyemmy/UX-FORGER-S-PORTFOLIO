import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { sounds } from '../utils/audio';

interface EyePosition {
  x: number;
  y: number;
}

export const MascotBuddies: React.FC = () => {
  const [activeSpeech, setActiveSpeech] = useState<{ id: string; text: string } | null>(null);
  const [mousePos, setMousePos] = useState<EyePosition>({ x: 0, y: 0 });

  // Subtle pupil gazing following mouse cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = 320;
      const dx = (e.clientX - centerX) / (window.innerWidth / 2);
      const dy = (e.clientY - centerY) / 320;
      setMousePos({
        x: Math.max(-2.5, Math.min(2.5, dx * 2.5)),
        y: Math.max(-2.5, Math.min(2.5, dy * 2.5)),
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const triggerMascot = (id: string, text: string) => {
    sounds.playBoing();
    setActiveSpeech({ id, text });
    setTimeout(() => {
      setActiveSpeech((current) => (current?.id === id ? null : current));
    }, 2400);
  };

  return (
    <>
      {/* =========================================================================
          CIRCULAR ORBIT FORMATION AROUND HEADLINE (EXACTLY 5 DECORATIVE ELEMENTS)
         ========================================================================= */}

      {/* 1. Green Box Buddy — Upper Left Orbit */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.1, rotate: -4 }}
        whileTap={{ scale: 0.94 }}
        drag
        dragElastic={0.3}
        dragConstraints={{ left: -30, right: 30, top: -30, bottom: 30 }}
        onClick={() => triggerMascot('green-box', 'BuildVerse Hackathon Winner! 🏆')}
        className="absolute -top-10 left-[4%] sm:left-[10%] w-11 h-11 bg-[#1E7B4F] rounded-xl shadow-md border-2 border-black/15 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing z-30 select-none"
        title="BuildVerse Hackathon Winner"
      >
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
        </div>
        <div className="w-3 h-1.5 bg-white rounded-xs mt-1 flex items-center justify-center">
          <div className="w-full h-0.5 bg-[#1E7B4F]" />
        </div>

        {activeSpeech?.id === 'green-box' && (
          <motion.div
            initial={{ scale: 0, y: 8 }}
            animate={{ scale: 1, y: 0 }}
            className="absolute -top-9 left-1/2 -translate-x-1/2 bg-[#141618] text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg shadow-lg border border-white/10 whitespace-nowrap z-40 pointer-events-none"
          >
            {activeSpeech.text}
          </motion.div>
        )}
      </motion.div>

      {/* 2. Red Circle Buddy — Upper Right Orbit */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        whileHover={{ scale: 1.1, rotate: 4 }}
        whileTap={{ scale: 0.94 }}
        drag
        dragElastic={0.3}
        dragConstraints={{ left: -30, right: 30, top: -30, bottom: 30 }}
        onClick={() => triggerMascot('red-circle', "I'm watching you build! 👀")}
        className="absolute -top-11 right-[6%] sm:right-[12%] w-12 h-12 bg-[#E14328] rounded-full shadow-md border-2 border-black/15 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing z-30 select-none group"
        title="The Curious Watcher"
      >
        <div className="flex items-center gap-1.5 pt-1">
          <div className="w-3 h-3 bg-white rounded-full flex items-center justify-center relative overflow-hidden shadow-inner">
            <motion.div
              style={{ x: mousePos.x, y: mousePos.y }}
              className="w-1.5 h-1.5 bg-black rounded-full"
            />
          </div>
          <div className="w-3 h-3 bg-white rounded-full flex items-center justify-center relative overflow-hidden shadow-inner">
            <motion.div
              style={{ x: mousePos.x, y: mousePos.y }}
              className="w-1.5 h-1.5 bg-black rounded-full"
            />
          </div>
        </div>
        <div className="w-2.5 h-1 border-b-2 border-black/60 rounded-full mt-0.5" />

        {activeSpeech?.id === 'red-circle' && (
          <motion.div
            initial={{ scale: 0, y: 8 }}
            animate={{ scale: 1, y: 0 }}
            className="absolute -top-9 left-1/2 -translate-x-1/2 bg-[#141618] text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg shadow-lg border border-white/10 whitespace-nowrap z-40 pointer-events-none"
          >
            {activeSpeech.text}
          </motion.div>
        )}
      </motion.div>

      {/* 3. Orange Diamond Buddy — Far Right Orbit */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        whileHover={{ scale: 1.1, rotate: 14 }}
        whileTap={{ scale: 0.94 }}
        drag
        dragElastic={0.3}
        dragConstraints={{ left: -30, right: 30, top: -30, bottom: 30 }}
        onClick={() => triggerMascot('orange-diamond', 'Ship it! 🚀 60 FPS')}
        className="absolute top-[42%] -right-3 sm:-right-7 w-11 h-11 bg-[#F57C20] rounded-xl shadow-md border-2 border-black/15 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing z-30 select-none rotate-6"
        title="The Fast Shipper"
      >
        <div className="flex items-center gap-1.5 -rotate-6">
          <div className="w-1.5 h-1.5 bg-black rounded-full" />
          <div className="w-1.5 h-1.5 bg-black rounded-full" />
        </div>
        <div className="w-2 h-1 bg-black/80 rounded-full mt-1 -rotate-6" />

        {activeSpeech?.id === 'orange-diamond' && (
          <motion.div
            initial={{ scale: 0, y: 8 }}
            animate={{ scale: 1, y: 0 }}
            className="absolute -top-9 left-1/2 -translate-x-1/2 bg-[#141618] text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg shadow-lg border border-white/10 whitespace-nowrap z-40 pointer-events-none"
          >
            {activeSpeech.text}
          </motion.div>
        )}
      </motion.div>

      {/* 4. Purple Sleepy Dome Buddy — Bottom Center Orbit */}
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 5.0, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
        whileHover={{ scale: 1.1, rotate: -3 }}
        whileTap={{ scale: 0.94 }}
        drag
        dragElastic={0.3}
        dragConstraints={{ left: -30, right: 30, top: -30, bottom: 30 }}
        onClick={() => triggerMascot('purple-dome', 'Dreaming up new UI... 💤')}
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-14 h-8 bg-[#9D7CE8] rounded-t-full shadow-md border-2 border-black/15 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing z-30 select-none"
        title="Quiet Thinker"
      >
        <div className="flex items-center gap-2 pt-1">
          <div className="w-2 h-0.5 bg-black rounded-full" />
          <div className="w-2 h-0.5 bg-black rounded-full" />
        </div>

        {activeSpeech?.id === 'purple-dome' && (
          <motion.div
            initial={{ scale: 0, y: 8 }}
            animate={{ scale: 1, y: 0 }}
            className="absolute -top-9 left-1/2 -translate-x-1/2 bg-[#141618] text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg shadow-lg border border-white/10 whitespace-nowrap z-40 pointer-events-none"
          >
            {activeSpeech.text}
          </motion.div>
        )}
      </motion.div>

      {/* 5. Blue Pouch Buddy — Far Left Orbit */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
        whileHover={{ scale: 1.1, rotate: -8 }}
        whileTap={{ scale: 0.94 }}
        drag
        dragElastic={0.3}
        dragConstraints={{ left: -30, right: 30, top: -30, bottom: 30 }}
        onClick={() => triggerMascot('blue-pouch', 'UNILAG Math + UX Forger 📐')}
        className="absolute top-[40%] -left-3 sm:-left-7 w-11 h-14 bg-[#3B82F6] rounded-2xl shadow-md border-2 border-black/15 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing z-30 select-none -rotate-6"
        title="Math & Systems"
      >
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2.5 bg-white rounded-full flex items-center justify-center">
            <div className="w-1 h-1 bg-black rounded-full" />
          </div>
          <div className="w-2 h-2.5 bg-white rounded-full flex items-center justify-center">
            <div className="w-1 h-1 bg-black rounded-full" />
          </div>
        </div>
        <div className="w-3 h-1 border-b-2 border-white rounded-full mt-1" />

        {activeSpeech?.id === 'blue-pouch' && (
          <motion.div
            initial={{ scale: 0, y: 8 }}
            animate={{ scale: 1, y: 0 }}
            className="absolute -top-9 left-1/2 -translate-x-1/2 bg-[#141618] text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg shadow-lg border border-white/10 whitespace-nowrap z-40 pointer-events-none"
          >
            {activeSpeech.text}
          </motion.div>
        )}
      </motion.div>
    </>
  );
};
