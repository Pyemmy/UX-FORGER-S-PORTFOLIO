import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { BRICK_COMPANIES } from '../data/portfolioData';
import { sounds } from '../utils/audio';
import { readableOn } from '../utils/color';
import { EASE_OUT, SPRING_SOFT } from '../utils/motion';

// Hand-stacked toy-brick offsets (x in px, rotation in deg)
const OFFSETS = [
  { x: 0, rot: -0.8 },
  { x: -6, rot: 1.1 },
  { x: 5, rot: -1.3 },
  { x: -4, rot: 0.9 },
  { x: 6, rot: -1 },
  { x: -3, rot: 1.3 },
  { x: 3, rot: -0.7 },
  { x: 0, rot: 0.5 },
];

export const CompanyBricks: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    sounds.playPop(1 + i * 0.07);
    setOpenIndex((cur) => (cur === i ? null : i));
  };

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-1 py-6 sm:px-4">
      <ul className="relative flex w-full flex-col items-center">
        {BRICK_COMPANIES.map((brick, i) => {
          const offset = OFFSETS[i % OFFSETS.length];
          const isOpen = openIndex === i;
          const text = readableOn(brick.color);
          const panelId = `brick-panel-${i}`;
          return (
            <motion.li
              key={brick.name}
              initial={{ opacity: 0, y: -40, x: offset.x, rotate: offset.rot * 3 }}
              whileInView={{ opacity: 1, y: 0, x: offset.x, rotate: isOpen ? 0 : offset.rot, scale: isOpen ? 1.02 : 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ ...SPRING_SOFT, delay: 0.04 * i }}
              className="relative my-1.5 w-full max-w-xl sm:w-[94%]"
              style={{ zIndex: isOpen ? 40 : BRICK_COMPANIES.length - i }}
            >
              {/* Studs */}
              <span aria-hidden="true" className="pointer-events-none absolute -top-2 left-6 right-6 z-10 flex justify-between px-3">
                {Array.from({ length: 6 }).map((_, s) => (
                  <span
                    key={s}
                    className="h-2.5 w-5 rounded-full border border-black/20"
                    style={{
                      backgroundColor: brick.color,
                      filter: 'brightness(1.12)',
                      boxShadow: '0 -1px 2px rgba(255,255,255,0.4) inset, 0 1px 1px rgba(0,0,0,0.3)',
                    }}
                  />
                ))}
              </span>

              <div
                className="relative w-full overflow-hidden rounded-2xl border-2 border-black/20 transition-shadow duration-300"
                style={{
                  backgroundColor: brick.color,
                  color: text,
                  boxShadow: isOpen
                    ? '0 18px 34px rgba(0,0,0,0.22), 0 6px 0 rgba(0,0,0,0.35)'
                    : '0 8px 18px rgba(0,0,0,0.12), 0 5px 0 rgba(0,0,0,0.28)',
                }}
              >
                <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-white/30" />
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left focus-visible:outline-offset-[-4px] sm:px-6"
                >
                  <span className="flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-display text-2xl font-extrabold leading-none tracking-tight sm:text-3xl">
                      {brick.name}
                    </span>
                    <span className="text-xs font-semibold tracking-wide opacity-90 sm:text-sm">{brick.role}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-2">
                    <span
                      className="rounded-full border px-2.5 py-1 font-mono text-[10px] font-bold tracking-wider sm:text-[11px]"
                      style={{
                        borderColor: text === '#FFFFFF' ? 'rgba(255,255,255,0.25)' : 'rgba(20,22,24,0.2)',
                        backgroundColor: text === '#FFFFFF' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.3)',
                      }}
                    >
                      {brick.period}
                    </span>
                    <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3, ease: EASE_OUT }}>
                      <ChevronDown className="h-4 w-4 opacity-80" aria-hidden="true" />
                    </motion.span>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      key="panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: EASE_OUT }}
                    >
                      <div
                        className="mx-5 mb-4 space-y-1.5 border-t pt-3 text-[13px] sm:mx-6"
                        style={{ borderColor: text === '#FFFFFF' ? 'rgba(255,255,255,0.22)' : 'rgba(20,22,24,0.15)' }}
                      >
                        <p className="flex items-start gap-1.5 font-medium leading-relaxed">
                          <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-80" aria-hidden="true" />
                          <span>{brick.highlight}</span>
                        </p>
                        <p className="font-mono text-[11px] opacity-85">Stack &amp; tools: {brick.tools}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.li>
          );
        })}
      </ul>

      {/* Baseplate */}
      <div className="relative mt-3 flex h-5 w-[98%] max-w-2xl items-center justify-between overflow-hidden rounded-xl border-2 border-[#9E978B] bg-[#C9C2B5] px-4 shadow-md sm:px-6">
        <span className="font-mono text-[9px] font-extrabold uppercase tracking-widest text-[#4A453E] sm:text-[10px]">
          Foundation · 2024 — present
        </span>
        <span aria-hidden="true" className="flex gap-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="h-1.5 w-2.5 rounded-full bg-[#B5AE9F] shadow-inner" />
          ))}
        </span>
      </div>
      <div aria-hidden="true" className="mt-1 h-4 w-[85%] max-w-lg rounded-full bg-black/10 blur-md" />

      <p className="mt-4 text-center font-mono text-xs text-ink-3">Tap any brick to see the impact and tools.</p>
    </div>
  );
};
