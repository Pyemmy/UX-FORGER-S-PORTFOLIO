import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BRICK_COMPANIES } from '../data/portfolioData';
import { sounds } from '../utils/audio';
import { ExternalLink, Sparkles, Trophy } from 'lucide-react';

export const CompanyBricks: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Staggered horizontal offsets and subtle rotation for authentic toy brick stack
  const stackOffsets = [
    { x: 0, rot: -0.8 },
    { x: -6, rot: 1.2 },
    { x: 4, rot: -1.4 },
    { x: -4, rot: 0.9 },
    { x: 6, rot: -1.1 },
    { x: -2, rot: 1.5 },
    { x: 3, rot: -0.7 },
    { x: 0, rot: 0.5 },
  ];

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 flex flex-col items-center select-none">
      {/* Brick Stack Container */}
      <div className="w-full relative flex flex-col items-center">
        {BRICK_COMPANIES.map((brick, idx) => {
          const offset = stackOffsets[idx % stackOffsets.length];
          const isHovered = hoveredIndex === idx;

          return (
            <motion.div
              key={brick.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              whileHover={{
                scale: 1.04,
                y: -6,
                zIndex: 30,
                transition: { duration: 0.2 },
              }}
              onMouseEnter={() => {
                setHoveredIndex(idx);
                sounds.playPop(1 + idx * 0.08);
              }}
              onMouseLeave={() => setHoveredIndex(null)}
              className="w-full sm:w-[94%] max-w-xl relative cursor-pointer my-1.5 transition-all group"
              style={{
                transform: `translateX(${offset.x}px) rotate(${offset.rot}deg)`,
                zIndex: isHovered ? 40 : BRICK_COMPANIES.length - idx,
              }}
            >
              {/* LEGO 3D Studs Row along top edge of each brick */}
              <div className="absolute -top-2 left-6 right-6 flex justify-between px-3 pointer-events-none z-10">
                {[...Array(6)].map((_, sIdx) => (
                  <div
                    key={sIdx}
                    className="w-5 h-2.5 rounded-full shadow-inner border border-black/20"
                    style={{
                      backgroundColor: brick.color,
                      filter: 'brightness(1.15)',
                      boxShadow: '0 -1px 2px rgba(255,255,255,0.4) inset, 0 1px 1px rgba(0,0,0,0.3)',
                    }}
                  />
                ))}
              </div>

              {/* Physical Brick Body with 3D Bevel & Shadow */}
              <div
                className="w-full px-6 py-4 rounded-2xl border-2 border-black/20 relative overflow-hidden transition-shadow duration-200"
                style={{
                  backgroundColor: brick.color,
                  color: brick.textColor,
                  boxShadow: isHovered
                    ? '0 16px 30px rgba(0,0,0,0.22), 0 6px 0 rgba(0,0,0,0.35)'
                    : '0 8px 18px rgba(0,0,0,0.12), 0 5px 0 rgba(0,0,0,0.28)',
                }}
              >
                {/* Brick Surface Highlight & Texture */}
                <div className="absolute inset-x-0 top-0 h-1 bg-white/30 pointer-events-none" />

                <div className="flex items-center justify-between gap-4">
                  {/* Left: Company & Role */}
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight leading-none drop-shadow-sm">
                      {brick.name}
                    </span>
                    <span className="text-xs sm:text-sm font-sans font-semibold opacity-90 tracking-wide">
                      • {brick.role}
                    </span>
                  </div>

                  {/* Right: Year Badge */}
                  <div className="text-[11px] sm:text-xs font-mono font-bold shrink-0 bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20 tracking-wider">
                    {brick.period}
                  </div>
                </div>

                {/* Expanded Details Drawer on Hover / Touch */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-3 pt-3 border-t border-black/15 text-xs font-sans space-y-1.5"
                    >
                      <div className="font-medium opacity-95 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 shrink-0 opacity-80" />
                        <span>{brick.highlight}</span>
                      </div>
                      <div className="text-[11px] font-mono opacity-80">
                        Stack & Tools: {brick.tools}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}

        {/* LEGO Baseplate Platform Pedestal */}
        <div className="w-[98%] max-w-2xl h-5 bg-[#C9C2B5] rounded-xl border-2 border-[#9E978B] shadow-md mt-2 relative overflow-hidden flex items-center justify-between px-6">
          <div className="text-[10px] font-mono font-extrabold text-[#5D574E] tracking-widest uppercase">
            FOUNDATION BASEPLATE · 2024 — PRESENT
          </div>
          <div className="flex gap-2">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-2.5 h-1.5 bg-[#B5AE9F] rounded-full shadow-inner" />
            ))}
          </div>
        </div>

        {/* Ambient Ground Shadow */}
        <div className="w-[85%] max-w-lg h-4 bg-black/10 rounded-full blur-md mt-1" />
      </div>

      <p className="text-xs font-mono text-[#71717A] mt-4 text-center">
        Hover or tap any brick in the stack to inspect key impact and tech stack.
      </p>
    </div>
  );
};
