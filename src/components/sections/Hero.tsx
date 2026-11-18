import React from 'react';
import { motion, type MotionStyle } from 'motion/react';
import { ArrowDown, ArrowRight, Award, Sparkles, Zap } from 'lucide-react';
import { MascotBuddies } from '../MascotBuddies';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { SPRING_BOUNCY } from '../../utils/motion';

const BLOCKS = [
  { text: 'I design', className: 'bg-cobalt text-white', tilt: -1.5, hover: -3 },
  { text: 'products', className: 'bg-sun text-ink', tilt: 1.5, hover: 3 },
  { text: 'and I', className: 'border-2 border-line bg-paper-2 text-ink', tilt: -1, hover: -2 },
  { text: 'ship them.', className: 'bg-coral text-white', tilt: 1, hover: 3 },
];

const PROOF = [
  { icon: Award, color: '#2D5DEA', label: '1st Runner Up · 14 teams', sub: 'UNILAG QAS & SERVICOM' },
  { icon: Sparkles, color: '#B2421E', label: 'Honourable Mention + ₦100k', sub: 'BuildVerse Hackathon' },
  { icon: Zap, color: '#23784F', label: '10+ hackathons shipped', sub: 'Rapid AI prototyping' },
];

/** CSS entrance (see .hero-rise in index.css) — runs before hydration. */
const delay = (d: number) => ({ '--d': `${d}s` }) as React.CSSProperties;

interface HeroProps {
  onNavigate: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative mx-auto max-w-4xl px-4 pb-16 pt-16 text-center sm:px-6 sm:pb-24 sm:pt-24"
    >
      {/* Availability kicker */}
      <div className="hero-rise mb-14 flex justify-center sm:mb-8" style={delay(0)}>
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-paper-3 px-3.5 py-1.5 font-mono text-[11px] font-medium text-ink-3 shadow-[0_1px_0_rgba(0,0,0,0.03)] sm:text-xs">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
          </span>
          <span>{PERSONAL_INFO.availability}</span>
          <span className="hidden text-line sm:inline">·</span>
          <span className="hidden sm:inline">Lagos / Remote</span>
        </span>
      </div>

      {/* Headline blocks with orbiting mascots */}
      <div className="relative mx-auto mb-10 max-w-3xl">
        <MascotBuddies />
        <h1
          id="hero-title"
          aria-label="I design products and I ship them."
          className="flex flex-wrap items-center justify-center gap-2 font-display sm:gap-3.5"
        >
          {BLOCKS.map((block, i) => (
            <motion.span
              key={block.text}
              style={{ rotate: block.tilt, '--tilt': block.tilt, '--d': `${(0.08 + i * 0.09).toFixed(2)}s` } as MotionStyle}
              tabIndex={-1}
              whileHover={{ scale: 1.05, rotate: block.hover }}
              whileTap={{ scale: 0.96 }}
              transition={SPRING_BOUNCY}
              className={`block-in inline-block select-none rounded-2xl px-4 py-2 text-[2.1rem] font-extrabold leading-tight shadow-sm sm:px-7 sm:py-3.5 sm:text-5xl lg:text-6xl ${block.className}`}
            >
              {block.text}
            </motion.span>
          ))}
        </h1>
      </div>

      <p
        style={delay(0.3)}
        className="hero-nudge mx-auto mb-9 max-w-2xl text-base font-medium leading-relaxed text-ink-3 sm:text-xl"
      >
        I&apos;m <strong className="font-bold text-ink">{PERSONAL_INFO.name}</strong>, The UX Forger. I solve product
        problems, shape intuitive experiences and help build them too, bridging product thinking, Figma design systems
        and front-end engineering.
      </p>

      <div className="hero-rise flex flex-wrap items-center justify-center gap-3 sm:gap-4" style={delay(0.45)}>
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('contact');
          }}
          className="lift group flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 font-display text-sm font-bold text-white shadow-md hover:bg-cobalt"
        >
          <span>Let&apos;s build together</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
        <a
          href="#work"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('work');
          }}
          className="lift group flex items-center gap-2 rounded-full border border-line bg-white px-6 py-3.5 text-sm font-semibold text-ink shadow-xs hover:border-ink/25"
        >
          <span>See the work</span>
          <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
        </a>
      </div>

      <ul
        style={delay(0.55)}
        aria-label="Highlights"
        className="hero-rise mt-12 flex flex-wrap items-center justify-center gap-2.5 border-t border-line/60 pt-7 font-mono text-xs"
      >
        {PROOF.map(({ icon: Icon, color, label, sub }) => (
          <li
            key={label}
            className="flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-ink shadow-xs"
          >
            <Icon className="h-3.5 w-3.5 shrink-0" style={{ color }} aria-hidden="true" />
            <span className="font-bold">{label}</span>
            <span className="hidden text-muted sm:inline">· {sub}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};
