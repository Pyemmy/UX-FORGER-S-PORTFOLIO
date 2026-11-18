import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react';
import { ArrowRight, Command, Menu, Volume2, VolumeX, X } from 'lucide-react';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { useSoundMuted } from '../../hooks/useSoundMuted';
import { sounds } from '../../utils/audio';
import { SPRING_SNAPPY } from '../../utils/motion';

export const NAV_LINKS = [
  { id: 'work', label: 'Work', long: 'Selected work', color: '#F4BE24' },
  { id: 'capabilities', label: 'Expertise', long: 'What I work on', color: '#3062F7' },
  { id: 'about', label: 'About', long: 'Story & photo book', color: '#EE5828' },
  { id: 'playground', label: 'Playground', long: 'Lab & toys', color: '#9B8AF5' },
  { id: 'contact', label: 'Contact', long: 'Say hello', color: '#2FA06A' },
] as const;

// Sections that "belong" to a nav item for scroll-spy purposes
const SPY_IDS = ['work', 'capabilities', 'about', 'experience', 'testimonials', 'playground', 'ask', 'contact'];
const SPY_TO_NAV: Record<string, string> = {
  experience: 'about',
  testimonials: 'about',
  ask: 'playground',
};

interface SiteHeaderProps {
  onNavigate: (id: string) => void;
  onOpenConsole: () => void;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({ onNavigate, onOpenConsole }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Detected after mount so pre-rendered HTML and the first client render match
  const [isMac, setIsMac] = useState(false);
  useEffect(() => setIsMac(/Mac|iPhone|iPad/.test(navigator.userAgent)), []);
  const muted = useSoundMuted();
  const spy = useScrollSpy(SPY_IDS);
  const activeNav = spy ? (SPY_TO_NAV[spy] ?? spy) : null;
  const headerRef = useRef<HTMLElement>(null);

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 32, restDelta: 0.001 });
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24));

  // Close the mobile menu on Escape or a tap outside it
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    const onPointer = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onPointer);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', onPointer);
    };
  }, [menuOpen]);

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setMenuOpen(false);
    onNavigate(id);
  };


  return (
    <>
      {/* Reading progress */}
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-sun via-coral to-cobalt"
        style={{ scaleX: progress }}
      />

      <header ref={headerRef} className="sticky top-3 z-50 mx-auto max-w-5xl px-3 sm:top-4 sm:px-6">
        <motion.div
          animate={{
            paddingTop: scrolled ? 6 : 10,
            paddingBottom: scrolled ? 6 : 10,
            boxShadow: scrolled
              ? '0 14px 40px -12px rgba(20,16,10,0.22), 0 0 0 1px rgba(20,22,24,0.06)'
              : '0 8px 30px -14px rgba(20,16,10,0.10), 0 0 0 1px rgba(20,22,24,0.04)',
          }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-between gap-3 rounded-full border border-line bg-paper-2/90 pl-2 pr-2 backdrop-blur-md sm:pl-3"
        >
          <a
            href="#top"
            onClick={(e) => go(e, 'top')}
            className="flex shrink-0 items-center gap-2.5 rounded-full py-0.5 pr-2 transition-opacity hover:opacity-80"
            aria-label="The UX Forger — back to top"
          >
            <img
              src="/assets/photos/avatar.webp"
              alt=""
              width={32}
              height={32}
              className="h-8 w-8 rounded-full border border-line bg-ink object-cover ring-1 ring-black/5"
            />
            <span className="whitespace-nowrap font-display text-[15px] font-extrabold tracking-tight text-ink sm:text-base">
              The UX Forger
            </span>
          </a>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-0.5 font-mono text-xs font-semibold">
              {NAV_LINKS.map((link) => {
                const active = activeNav === link.id;
                return (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => go(e, link.id)}
                      aria-current={active ? 'true' : undefined}
                      className={`relative flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors ${
                        active ? 'text-ink' : 'text-ink-3 hover:text-ink'
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="nav-active-pill"
                          className="absolute inset-0 rounded-full bg-paper-3"
                          transition={SPRING_SNAPPY}
                        />
                      )}
                      <span className="relative h-1.5 w-1.5 rounded-full" style={{ backgroundColor: link.color }} />
                      <span className="relative">{link.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
            <button
              type="button"
              onClick={() => {
                sounds.toggleMute();
              }}
              aria-label={muted ? 'Turn interface sounds on' : 'Turn interface sounds off'}
              aria-pressed={!muted}
              title={muted ? 'Sounds off' : 'Sounds on'}
              className="flex h-9 w-9 items-center justify-center rounded-full text-ink-3 transition-colors hover:bg-black/5 hover:text-ink"
            >
              {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>

            <button
              type="button"
              onClick={onOpenConsole}
              aria-label="Open quick search"
              aria-keyshortcuts={isMac ? 'Meta+K' : 'Control+K'}
              className="hidden h-9 items-center gap-1 rounded-full border border-line bg-white/70 px-2.5 font-mono text-[11px] font-semibold text-ink-3 transition-colors hover:border-ink/30 hover:text-ink sm:flex"
            >
              {isMac ? <Command className="h-3 w-3" /> : <span>Ctrl</span>}
              <span>K</span>
            </button>

            <a
              href="#contact"
              onClick={(e) => go(e, 'contact')}
              className="lift group flex items-center gap-1.5 rounded-full bg-sun px-4 py-2 font-display text-xs font-bold text-ink shadow-[0_2px_10px_rgba(244,190,36,0.35)] hover:bg-[#E5AE18] sm:px-5 sm:text-sm"
            >
              <span>Let&apos;s talk</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-black/5 md:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={menuOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </motion.div>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              id="mobile-menu"
              aria-label="Mobile"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={SPRING_SNAPPY}
              className="mt-2 origin-top rounded-3xl border border-line bg-paper-2 p-2 shadow-[0_24px_50px_-20px_rgba(20,16,10,0.35)] md:hidden"
            >
              <ul className="flex flex-col">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.03 * i, duration: 0.25 }}
                  >
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => go(e, link.id)}
                      className={`flex items-center justify-between rounded-2xl px-4 py-3 transition-colors hover:bg-paper-3 ${
                        activeNav === link.id ? 'bg-paper-3' : ''
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: link.color }} />
                        <span className="font-display text-base font-bold text-ink">{link.label}</span>
                      </span>
                      <span className="font-mono text-[11px] text-muted">{link.long}</span>
                    </a>
                  </motion.li>
                ))}
                <li className="mt-1 border-t border-line-soft pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      onOpenConsole();
                    }}
                    className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition-colors hover:bg-paper-3"
                  >
                    <span className="font-display text-base font-bold text-ink">Quick search</span>
                    <span className="font-mono text-[11px] text-muted">Projects, CV, links</span>
                  </button>
                </li>
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
