import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Play, RefreshCw, Volume2, VolumeX, Copy, Check, Code, ChevronRight } from 'lucide-react';
import { sounds } from '../utils/audio';
import { readableOn } from '../utils/color';
import { useToast } from './ui/Toast';
import { useSoundMuted } from '../hooks/useSoundMuted';
import { Reveal, RevealItem } from './ui/Reveal';

// Curated Palettes for Forge Generator
const PALETTES = [
  {
    name: 'Lagos Sun & Terracotta',
    colors: ['#F0EBE1', '#F4BE24', '#EE5828', '#2FA06A', '#141618'],
    labels: ['Warm Sand', 'Golden Sun', 'Hot Coral', 'Palm Green', 'Obsidian'],
  },
  {
    name: 'Cobalt & Electric Mint',
    colors: ['#0A1128', '#3062F7', '#00E5FF', '#22C55E', '#FAF9F6'],
    labels: ['Midnight', 'Royal Cobalt', 'Electric Cyan', 'Mint Pulse', 'Paper White'],
  },
  {
    name: 'Artisanal Clay & Saffron',
    colors: ['#FAF7F2', '#E2725B', '#E5A93B', '#4A6B53', '#2C2A29'],
    labels: ['Eggshell', 'Terracotta', 'Saffron Gold', 'Deep Sage', 'Espresso'],
  },
  {
    name: 'Cyber Lavender & Jade',
    colors: ['#121316', '#9B8AF5', '#10B981', '#F43F5E', '#F8FAFC'],
    labels: ['Void Black', 'Soft Lavender', 'Jade Stone', 'Rose Spark', 'Ghost White'],
  },
];

// Pidgin Glossary Data
const PIDGIN_SLANGS = [
  {
    phrase: 'E go work!',
    literal: 'It will definitely work.',
    uxMeaning: 'System architecture validated, edge cases accounted for, zero fatal crashes.',
    category: 'Engineering & Resilience',
    badgeColor: '#2FA06A',
  },
  {
    phrase: 'Drop am for main.',
    literal: 'Put it on the main branch.',
    uxMeaning: 'Direct continuous delivery deployment into live production with full confidence.',
    category: 'CI/CD & Shipping',
    badgeColor: '#EE5828',
  },
  {
    phrase: 'Zero wahala.',
    literal: 'No trouble at all.',
    uxMeaning: 'Frictionless user onboarding flow with zero cognitive overload.',
    category: 'UX Architecture',
    badgeColor: '#3062F7',
  },
  {
    phrase: 'Deploy sharp sharp!',
    literal: 'Deploy very quickly!',
    uxMeaning: 'AI-assisted rapid prototyping velocity shipping from concept to URL in hours.',
    category: 'Rapid Prototyping',
    badgeColor: '#F4BE24',
  },
  {
    phrase: 'No dey whine me.',
    literal: 'Stop misleading me.',
    uxMeaning: 'Anti-AI slop discipline: honest metrics, real case studies, and authentic client proof.',
    category: 'Honest Craft',
    badgeColor: '#9B8AF5',
  },
];

export const PlaygroundInteractiveToys: React.FC = () => {
  // Toy 1: Spring Physics Sandbox
  const [stiffness, setStiffness] = useState(260);
  const [damping, setDamping] = useState(15);
  const [springKey, setSpringKey] = useState(0);
  const [copiedSpringCode, setCopiedSpringCode] = useState(false);

  // Toy 2: Palette Generator
  const [paletteIndex, setPaletteIndex] = useState(0);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  // Toy 3: Pidgin Glossary
  const [pidginIndex, setPidginIndex] = useState(0);
  const [pidginDir, setPidginDir] = useState(1);

  const { copy } = useToast();
  const muted = useSoundMuted();

  const triggerBounce = () => {
    sounds.playBoing();
    setSpringKey((prev) => prev + 1);
  };

  const handleNextPalette = () => {
    sounds.playPop();
    setPaletteIndex((prev) => (prev + 1) % PALETTES.length);
  };

  const handleCopyColor = async (hex: string) => {
    if (await copy(hex, `Copied ${hex}`)) {
      setCopiedColor(hex);
      setTimeout(() => setCopiedColor(null), 1800);
    }
  };

  const handleCopySpringCode = async () => {
    const ok = await copy(
      `transition={{ type: "spring", stiffness: ${stiffness}, damping: ${damping} }}`,
      'Spring config copied',
    );
    if (ok) {
      setCopiedSpringCode(true);
      setTimeout(() => setCopiedSpringCode(false), 2000);
    }
  };

  const currentPalette = PALETTES[paletteIndex];
  const currentPidgin = PIDGIN_SLANGS[pidginIndex];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Interactive toys</h3>
        <p className="mx-auto mt-1 max-w-md text-sm text-ink-3">Small, playable pieces of the craft. Go on, poke them.</p>
      </div>

      <Reveal className="grid grid-cols-1 gap-6 md:grid-cols-2" stagger={0.08}>
        {/* =================================================================
            TOY 1: FRAMER MOTION SPRING SANDBOX
           ================================================================= */}
        <RevealItem className="h-full">
        <div className="flex h-full flex-col justify-between space-y-4 rounded-2xl border border-line-soft bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#3062F7] text-white">
                PHYSICS SANDBOX
              </span>
              <span className="text-xs font-mono text-ink-3">Framer Motion</span>
            </div>
            <h4 className="font-display font-bold text-xl text-ink">
              Spring Physics &amp; Easing Tuner
            </h4>
            <p className="text-xs text-[#52525B] mt-1">
              Adjust stiffness and damping, then trigger the spring launch to test natural tactile UI inertia.
            </p>
          </div>

          {/* Interactive Bouncing Mascot Stage */}
          <div className="h-32 bg-[#FAF7F2] rounded-xl border border-[#E0D9CC] flex items-center justify-center relative overflow-hidden">
            <motion.div
              key={springKey}
              initial={{ y: 35, scale: 0.8 }}
              animate={{ y: 0, scale: 1 }}
              transition={{
                type: 'spring',
                stiffness,
                damping,
              }}
              className="w-16 h-16 bg-[#EE5828] rounded-2xl shadow-lg border-2 border-black/15 flex flex-col items-center justify-center text-white cursor-pointer"
              onClick={triggerBounce}
              role="button"
              tabIndex={0}
              aria-label="Launch the spring"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  triggerBounce();
                }
              }}
            >
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
              </div>
              <div className="w-3 h-1 border-b-2 border-white rounded-full mt-1" />
            </motion.div>
          </div>

          {/* Sliders */}
          <div className="space-y-3 pt-2 text-xs font-mono">
            <div>
              <div className="flex justify-between text-[#52525B] mb-1">
                <label htmlFor="spring-stiffness">STIFFNESS ({stiffness})</label>
                <span className="text-ink-3">High = snappy</span>
              </div>
              <input
                id="spring-stiffness"
                type="range"
                min="80"
                max="500"
                value={stiffness}
                onChange={(e) => setStiffness(Number(e.target.value))}
                className="w-full accent-[#3062F7] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-[#52525B] mb-1">
                <label htmlFor="spring-damping">DAMPING ({damping})</label>
                <span className="text-ink-3">Low = bouncy</span>
              </div>
              <input
                id="spring-damping"
                type="range"
                min="5"
                max="40"
                value={damping}
                onChange={(e) => setDamping(Number(e.target.value))}
                className="w-full accent-[#EE5828] cursor-pointer"
              />
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-2 border-t border-[#F0EBE1] flex items-center justify-between gap-2">
            <button
              onClick={triggerBounce}
              className="px-4 py-2 bg-[#141618] hover:bg-[#3062F7] text-white rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>Launch Spring</span>
            </button>

            <button
              onClick={handleCopySpringCode}
              className="px-3 py-2 bg-[#FAF7F2] hover:bg-[#EFEAE2] text-[#141618] rounded-xl text-xs font-mono border border-[#D5CEBF] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedSpringCode ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              <span>{copiedSpringCode ? 'Copied' : 'Copy Code'}</span>
            </button>
          </div>
        </div>
        </RevealItem>

        {/* =================================================================
            TOY 2: FORGE AI PALETTE GENERATOR
           ================================================================= */}
        <RevealItem className="h-full">
        <div className="flex h-full flex-col justify-between space-y-4 rounded-2xl border border-line-soft bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#F4BE24] text-[#121316]">
                COLOR LAB
              </span>
              <span className="text-xs font-mono text-ink-3">Contrast Validated</span>
            </div>
            <h4 className="font-display font-bold text-xl text-ink">
              Forge Harmonic Palettes
            </h4>
            <p className="text-xs text-[#52525B] mt-1">
              Curated design tokens combining Lagos warmth with modern digital product contrast. Tap swatches to copy HEX.
            </p>
          </div>

          {/* Swatch Display */}
          <div className="space-y-2">
            <div className="text-xs font-mono font-bold text-[#141618] flex items-center justify-between">
              <span>{currentPalette.name}</span>
              <span className="text-[10px] text-ink-3">{paletteIndex + 1} of {PALETTES.length}</span>
            </div>

            <div className="grid grid-cols-5 gap-2 h-24">
              {currentPalette.colors.map((c, i) => (
                <motion.button
                  type="button"
                  key={`${paletteIndex}-${c}`}
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: i * 0.04, type: 'spring', stiffness: 400, damping: 24 }}
                  whileHover={{ scale: 1.06, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCopyColor(c)}
                  aria-label={`Copy ${currentPalette.labels[i]} ${c}`}
                  className="group flex flex-col items-center justify-between rounded-xl border border-black/10 p-1.5 shadow-sm"
                  style={{ backgroundColor: c, color: readableOn(c) }}
                >
                  <span className="font-mono text-[9px] font-bold opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                    {copiedColor === c ? '✓' : 'Copy'}
                  </span>
                  <span className="font-mono text-[9px] font-bold sm:text-[10px]">{c}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-2 border-t border-[#F0EBE1] flex items-center justify-between">
            <span className="text-xs font-mono text-ink-3">
              {copiedColor ? `Copied ${copiedColor}!` : 'Click any color swatch to copy'}
            </span>
            <button
              onClick={handleNextPalette}
              className="px-4 py-2 bg-[#141618] hover:bg-[#F4BE24] hover:text-[#121316] text-white rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Next Palette</span>
            </button>
          </div>
        </div>
        </RevealItem>

        {/* =================================================================
            TOY 3: LAGOS TECH PIDGIN GLOSSARY FLASHCARDS
           ================================================================= */}
        <RevealItem className="h-full">
        <div className="flex h-full flex-col justify-between space-y-4 rounded-2xl border border-line-soft bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#2FA06A] text-ink">
                CULTURE &amp; COLLABORATION
              </span>
              <span className="text-xs font-mono text-ink-3">Lagos Tech Dictionary</span>
            </div>
            <h4 className="font-display font-bold text-xl text-ink">
              Lagos Tech &amp; Design Dialect
            </h4>
            <p className="text-xs text-[#52525B] mt-1">
              How Nigerian builders communicate high-stakes shipping speed, resilience, and product excellence.
            </p>
          </div>

          {/* Interactive Card Stage */}
          <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" initial={false} custom={pidginDir}>
          <motion.div
            key={pidginIndex}
            custom={pidginDir}
            initial={{ opacity: 0, x: pidginDir * 24, rotate: pidginDir * 1.5 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            exit={{ opacity: 0, x: pidginDir * -24, rotate: pidginDir * -1.5 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            aria-live="polite"
            className="p-5 rounded-xl bg-[#FAF7F2] border border-[#E0D9CC] space-y-2 relative"
          >
            <div className="flex items-center justify-between">
              <span
                className="text-[10px] font-mono font-bold px-2 py-0.5 rounded"
                style={{ backgroundColor: currentPidgin.badgeColor, color: readableOn(currentPidgin.badgeColor) }}
              >
                {currentPidgin.category}
              </span>
              <span className="text-[10px] font-mono text-ink-3">
                {pidginIndex + 1} of {PIDGIN_SLANGS.length}
              </span>
            </div>

            <div className="text-2xl font-display font-extrabold text-[#141618] pt-1">
              &ldquo;{currentPidgin.phrase}&rdquo;
            </div>

            <div className="text-xs font-mono text-ink-3">
              Literal: {currentPidgin.literal}
            </div>

            <div className="text-xs font-sans font-medium text-[#141618] pt-1 border-t border-[#EAE4D7] leading-relaxed">
              <strong className="text-cobalt-ink">UX translation:</strong> {currentPidgin.uxMeaning}
            </div>
          </motion.div>
          </AnimatePresence>
          </div>

          {/* Action Row */}
          <div className="pt-2 border-t border-[#F0EBE1] flex items-center justify-between">
            <span className="text-xs font-mono text-ink-3">
              Tap Next for more dialect phrases
            </span>
            <button
              onClick={() => {
                sounds.playPop();
                setPidginDir(1);
                setPidginIndex((prev) => (prev + 1) % PIDGIN_SLANGS.length);
              }}
              className="px-4 py-2 bg-[#141618] hover:bg-[#2FA06A] text-white rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Next Slang</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        </RevealItem>

        {/* =================================================================
            TOY 4: TACTILE SOUND SYNTHESIZER PADS
           ================================================================= */}
        <RevealItem className="h-full">
        <div className="flex h-full flex-col justify-between space-y-4 rounded-2xl border border-line-soft bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#9B8AF5] text-ink">
                SYNTHESIZER
              </span>
              <span className="text-xs font-mono text-ink-3">Web Audio API</span>
            </div>
            <h4 className="font-display font-bold text-xl text-ink">
              Tactile Toybox Audio Pads
            </h4>
            <p className="text-xs text-[#52525B] mt-1">
              Pure real-time Web Audio oscillators synthesized in your browser. Zero external audio files required.
            </p>
          </div>

          {/* 4 Interactive Drum Pads */}
          <div className="grid grid-cols-2 gap-3 py-1">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => sounds.playBoing()}
              className="p-4 rounded-xl bg-[#EE5828] text-ink font-mono font-bold text-xs flex flex-col items-center justify-center gap-1 shadow-md hover:brightness-110 cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>BOING SQUISH</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => sounds.playChime()}
              className="p-4 rounded-xl bg-[#2FA06A] text-ink font-mono font-bold text-xs flex flex-col items-center justify-center gap-1 shadow-md hover:brightness-110 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>CHIME SUCCESS</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => sounds.playPop(1.4)}
              className="p-4 rounded-xl bg-[#3062F7] text-white font-mono font-bold text-xs flex flex-col items-center justify-center gap-1 shadow-md hover:brightness-110 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>BUBBLE POP</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => sounds.playClick()}
              className="p-4 rounded-xl bg-[#F4BE24] text-[#121316] font-mono font-bold text-xs flex flex-col items-center justify-center gap-1 shadow-md hover:brightness-110 cursor-pointer"
            >
              <Code className="w-4 h-4" />
              <span>TACTILE CLICK</span>
            </motion.button>
          </div>

          {/* Action Row */}
          <div className="pt-2 border-t border-[#F0EBE1] flex items-center justify-between">
            <span className="text-xs font-mono text-ink-3">
              {muted ? 'Turn sound on to hear the pads' : 'Synthesised live, no audio files'}
            </span>
            <button
              type="button"
              onClick={() => sounds.toggleMute()}
              aria-pressed={!muted}
              className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1 font-mono text-xs font-bold text-ink transition-colors hover:bg-paper-2"
            >
              {muted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5 text-mint-ink" />}
              {muted ? 'Sound off' : 'Sound on'}
            </button>
          </div>
        </div>
        </RevealItem>
      </Reveal>
    </div>
  );
};
