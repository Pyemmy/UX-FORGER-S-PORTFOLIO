import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Play, RefreshCw, Volume2, Copy, Check, Code, ChevronRight } from 'lucide-react';
import { sounds } from '../utils/audio';

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

  const triggerBounce = () => {
    sounds.playBoing();
    setSpringKey((prev) => prev + 1);
  };

  const handleNextPalette = () => {
    sounds.playPop();
    setPaletteIndex((prev) => (prev + 1) % PALETTES.length);
  };

  const handleCopyColor = (hex: string) => {
    sounds.playChime();
    navigator.clipboard?.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 1800);
  };

  const handleCopySpringCode = () => {
    sounds.playChime();
    navigator.clipboard?.writeText(
      `transition={{ type: "spring", stiffness: ${stiffness}, damping: ${damping} }}`
    );
    setCopiedSpringCode(true);
    setTimeout(() => setCopiedSpringCode(false), 2000);
  };

  const currentPalette = PALETTES[paletteIndex];
  const currentPidgin = PIDGIN_SLANGS[pidginIndex];

  return (
    <div className="space-y-8 my-10 select-none">
      <div className="text-center">
        <span className="text-[11px] font-mono font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#D5CEBF] text-[#52525B]">
          INTERACTIVE DESIGN &amp; CODE TOYS
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* =================================================================
            TOY 1: FRAMER MOTION SPRING SANDBOX
           ================================================================= */}
        <div className="bg-white rounded-2xl p-6 border border-[#E0D9CC] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#3062F7] text-white">
                PHYSICS SANDBOX
              </span>
              <span className="text-xs font-mono text-[#71717A]">Framer Motion</span>
            </div>
            <h4 className="font-display font-bold text-xl text-[#141618]">
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
                <span>STIFFNESS ({stiffness})</span>
                <span className="text-zinc-400">High = Snappy</span>
              </div>
              <input
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
                <span>DAMPING ({damping})</span>
                <span className="text-zinc-400">Low = Bouncy</span>
              </div>
              <input
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

        {/* =================================================================
            TOY 2: FORGE AI PALETTE GENERATOR
           ================================================================= */}
        <div className="bg-white rounded-2xl p-6 border border-[#E0D9CC] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#F4BE24] text-[#121316]">
                COLOR LAB
              </span>
              <span className="text-xs font-mono text-[#71717A]">Contrast Validated</span>
            </div>
            <h4 className="font-display font-bold text-xl text-[#141618]">
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
              <span className="text-[10px] text-[#71717A]">{paletteIndex + 1} of {PALETTES.length}</span>
            </div>

            <div className="grid grid-cols-5 gap-2 h-24">
              {currentPalette.colors.map((c, i) => (
                <motion.div
                  key={c}
                  whileHover={{ scale: 1.06, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCopyColor(c)}
                  className="rounded-xl shadow-sm border border-black/10 flex flex-col items-center justify-between p-2 cursor-pointer transition-transform group"
                  style={{ backgroundColor: c }}
                  title={`Click to copy ${c}`}
                >
                  <span className="text-[9px] font-mono font-bold opacity-0 group-hover:opacity-100 transition-opacity drop-shadow">
                    {copiedColor === c ? '✓' : 'Copy'}
                  </span>
                  <span className="text-[10px] font-mono font-bold drop-shadow mix-blend-difference text-white">
                    {c}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-2 border-t border-[#F0EBE1] flex items-center justify-between">
            <span className="text-xs font-mono text-[#71717A]">
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

        {/* =================================================================
            TOY 3: LAGOS TECH PIDGIN GLOSSARY FLASHCARDS
           ================================================================= */}
        <div className="bg-white rounded-2xl p-6 border border-[#E0D9CC] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#2FA06A] text-white">
                CULTURE &amp; COLLABORATION
              </span>
              <span className="text-xs font-mono text-[#71717A]">Lagos Tech Dictionary</span>
            </div>
            <h4 className="font-display font-bold text-xl text-[#141618]">
              Lagos Tech &amp; Design Dialect
            </h4>
            <p className="text-xs text-[#52525B] mt-1">
              How Nigerian builders communicate high-stakes shipping speed, resilience, and product excellence.
            </p>
          </div>

          {/* Interactive Card Stage */}
          <motion.div
            key={pidginIndex}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-5 rounded-xl bg-[#FAF7F2] border border-[#E0D9CC] space-y-2 relative"
          >
            <div className="flex items-center justify-between">
              <span
                className="text-[10px] font-mono font-bold px-2 py-0.5 rounded text-white"
                style={{ backgroundColor: currentPidgin.badgeColor }}
              >
                {currentPidgin.category}
              </span>
              <span className="text-[10px] font-mono text-[#71717A]">
                {pidginIndex + 1} of {PIDGIN_SLANGS.length}
              </span>
            </div>

            <div className="text-2xl font-display font-extrabold text-[#141618] pt-1">
              &ldquo;{currentPidgin.phrase}&rdquo;
            </div>

            <div className="text-xs font-mono text-[#71717A]">
              Literal: {currentPidgin.literal}
            </div>

            <div className="text-xs font-sans font-medium text-[#141618] pt-1 border-t border-[#EAE4D7] leading-relaxed">
              <strong className="text-[#3062F7]">UX Translation:</strong> {currentPidgin.uxMeaning}
            </div>
          </motion.div>

          {/* Action Row */}
          <div className="pt-2 border-t border-[#F0EBE1] flex items-center justify-between">
            <span className="text-xs font-mono text-[#71717A]">
              Tap Next for more dialect phrases
            </span>
            <button
              onClick={() => {
                sounds.playPop();
                setPidginIndex((prev) => (prev + 1) % PIDGIN_SLANGS.length);
              }}
              className="px-4 py-2 bg-[#141618] hover:bg-[#2FA06A] text-white rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Next Slang</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* =================================================================
            TOY 4: TACTILE SOUND SYNTHESIZER PADS
           ================================================================= */}
        <div className="bg-white rounded-2xl p-6 border border-[#E0D9CC] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#9B8AF5] text-white">
                SYNTHESIZER
              </span>
              <span className="text-xs font-mono text-[#71717A]">Web Audio API</span>
            </div>
            <h4 className="font-display font-bold text-xl text-[#141618]">
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
              className="p-4 rounded-xl bg-[#EE5828] text-white font-mono font-bold text-xs flex flex-col items-center justify-center gap-1 shadow-md hover:brightness-110 cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>BOING SQUISH</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => sounds.playChime()}
              className="p-4 rounded-xl bg-[#2FA06A] text-white font-mono font-bold text-xs flex flex-col items-center justify-center gap-1 shadow-md hover:brightness-110 cursor-pointer"
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
            <span className="text-xs font-mono text-[#71717A]">
              Interactive Haptics &amp; Tone Generator
            </span>
            <button
              onClick={() => {
                sounds.toggleMute();
              }}
              className="text-xs font-mono text-[#3062F7] hover:underline cursor-pointer"
            >
              Toggle Global Audio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
