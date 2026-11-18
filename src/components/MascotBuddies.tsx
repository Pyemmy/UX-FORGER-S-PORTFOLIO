import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, MotionValue, useMotionValue, useSpring } from 'motion/react';
import { sounds } from '../utils/audio';
import { SPRING_BOUNCY } from '../utils/motion';

interface BuddyProps {
  id: string;
  label: string;
  speech: string;
  className: string;
  floatDuration: number;
  enterDelay: number;
  rotate?: number;
  activeId: string | null;
  onPoke: (id: string) => void;
  children: React.ReactNode;
}

const Buddy: React.FC<BuddyProps> = ({
  id,
  label,
  speech,
  className,
  floatDuration,
  enterDelay,
  rotate = 0,
  activeId,
  onPoke,
  children,
}) => {
  return (
    <div
      className={`absolute z-30 ${className}`}
      style={{ rotate: `${rotate}deg` }}
    >
      <div className="pop-in" style={{ '--d': `${enterDelay}s` } as React.CSSProperties}>
      <motion.button
        type="button"
        aria-label={`${label}: ${speech}`}
        onClick={() => onPoke(id)}
        drag
        dragSnapToOrigin
        dragElastic={0.35}
        dragConstraints={{ left: -40, right: 40, top: -40, bottom: 40 }}
        whileHover={{ scale: 1.12, rotate: -6 }}
        whileTap={{ scale: 0.9 }}
        className="relative flex touch-none select-none items-center justify-center rounded-[inherit] focus-visible:outline-offset-4 active:cursor-grabbing"
        style={{ cursor: 'grab' }}
      >
        <span className="buddy-float" style={{ '--float-duration': `${floatDuration}s` } as React.CSSProperties}>
          {children}
        </span>
        <AnimatePresence>
          {activeId === id && (
            <motion.span
              role="status"
              initial={{ opacity: 0, y: 6, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.9 }}
              transition={SPRING_BOUNCY}
              className="pointer-events-none absolute -top-10 left-1/2 z-40 -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-ink px-2.5 py-1 font-mono text-[10px] font-bold text-white shadow-lg"
            >
              {speech}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
      </div>
    </div>
  );
};

const Pupil: React.FC<{ x: MotionValue<number>; y: MotionValue<number> }> = ({ x, y }) => (
  <span className="relative flex h-3 w-3 items-center justify-center overflow-hidden rounded-full bg-white shadow-inner">
    <motion.span style={{ x, y }} className="block h-1.5 w-1.5 rounded-full bg-black" />
  </span>
);

/** Five draggable, clickable buddies orbiting the hero headline. */
export const MascotBuddies: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const timer = useRef<number | undefined>(undefined);

  // Eye tracking runs on motion values: zero React re-renders on mouse move
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const eyeX = useSpring(rawX, { stiffness: 300, damping: 30 });
  const eyeY = useSpring(rawY, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const dx = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const dy = (e.clientY - 320) / 320;
      rawX.set(Math.max(-2.5, Math.min(2.5, dx * 2.5)));
      rawY.set(Math.max(-2.5, Math.min(2.5, dy * 2.5)));
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.clearTimeout(timer.current);
    };
  }, [rawX, rawY]);

  const poke = (id: string) => {
    sounds.playBoing();
    setActiveId(id);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setActiveId(null), 2200);
  };

  const shared = { activeId, onPoke: poke };

  return (
    <>
      {/* Green box — upper left */}
      <Buddy
        id="green"
        label="Green buddy"
        speech="BuildVerse honourable mention! 🏆"
        className="-top-12 left-[3%] sm:-top-10 sm:left-[8%]"
        floatDuration={4.2}
        enterDelay={0.55}
        rotate={-4}
        {...shared}
      >
        <span className="flex h-11 w-11 flex-col items-center justify-center rounded-xl border-2 border-black/15 bg-[#1E7B4F] shadow-md">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
          </span>
          <span className="mt-1 flex h-1.5 w-3 items-center justify-center rounded-xs bg-white">
            <span className="h-0.5 w-full bg-[#1E7B4F]" />
          </span>
        </span>
      </Buddy>

      {/* Red circle — upper right (the watcher) */}
      <Buddy
        id="red"
        label="Red buddy"
        speech="I'm watching you build! 👀"
        className="-top-12 right-[4%] sm:-top-11 sm:right-[10%]"
        floatDuration={3.8}
        enterDelay={0.62}
        {...shared}
      >
        <span className="flex h-12 w-12 flex-col items-center justify-center rounded-full border-2 border-black/15 bg-[#E14328] shadow-md">
          <span className="flex items-center gap-1.5 pt-1">
            <Pupil x={eyeX} y={eyeY} />
            <Pupil x={eyeX} y={eyeY} />
          </span>
          <span className="mt-0.5 h-1 w-2.5 rounded-full border-b-2 border-black/60" />
        </span>
      </Buddy>

      {/* Orange — far right (hidden on small screens so it never covers the headline) */}
      <Buddy
        id="orange"
        label="Orange buddy"
        speech="Ship it! 🚀"
        className="top-[40%] -right-6 hidden sm:block lg:-right-10"
        floatDuration={4.6}
        enterDelay={0.7}
        rotate={8}
        {...shared}
      >
        <span className="flex h-11 w-11 flex-col items-center justify-center rounded-xl border-2 border-black/15 bg-[#F57C20] shadow-md">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-black" />
            <span className="h-1.5 w-1.5 rounded-full bg-black" />
          </span>
          <span className="mt-1 h-1 w-2 rounded-full bg-black/80" />
        </span>
      </Buddy>

      {/* Purple dome — bottom centre */}
      <Buddy
        id="purple"
        label="Purple buddy"
        speech="Dreaming up new UI… 💤"
        className="-bottom-9 left-1/2 -translate-x-1/2"
        floatDuration={5}
        enterDelay={0.78}
        {...shared}
      >
        <span className="flex h-8 w-14 items-center justify-center rounded-t-full border-2 border-black/15 bg-[#9D7CE8] pt-1 shadow-md">
          <span className="flex items-center gap-2">
            <span className="h-0.5 w-2 rounded-full bg-black" />
            <span className="h-0.5 w-2 rounded-full bg-black" />
          </span>
        </span>
      </Buddy>

      {/* Blue pouch — far left */}
      <Buddy
        id="blue"
        label="Blue buddy"
        speech="UNILAG maths + UX 📐"
        className="top-[38%] -left-6 hidden sm:block lg:-left-10"
        floatDuration={3.5}
        enterDelay={0.66}
        rotate={-6}
        {...shared}
      >
        <span className="flex h-14 w-11 flex-col items-center justify-center rounded-2xl border-2 border-black/15 bg-[#3B82F6] shadow-md">
          <span className="flex items-center gap-1.5">
            <span className="flex h-2.5 w-2 items-center justify-center rounded-full bg-white">
              <span className="h-1 w-1 rounded-full bg-black" />
            </span>
            <span className="flex h-2.5 w-2 items-center justify-center rounded-full bg-white">
              <span className="h-1 w-1 rounded-full bg-black" />
            </span>
          </span>
          <span className="mt-1 h-1 w-3 rounded-full border-b-2 border-white" />
        </span>
      </Buddy>
    </>
  );
};
