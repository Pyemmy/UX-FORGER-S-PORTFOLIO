import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, Variants } from 'motion/react';
import { BookOpen, Calendar, ChevronLeft, ChevronRight, MapPin, Maximize2, Minimize2, Quote, X } from 'lucide-react';
import { BOOK_CHAPTERS } from '../data/portfolioData';
import { sounds } from '../utils/audio';
import { sizeOf } from '../data/imageSizes';
import { useScrollLock } from '../hooks/useScrollLock';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { EASE_OUT, SPRING_SOFT } from '../utils/motion';

const TOTAL = BOOK_CHAPTERS.length;
const pad = (n: number) => String(n).padStart(2, '0');

// Direction-aware page turn: pages swing around the spine with perspective
const pageVariants: Variants = {
  enter: (dir: number) => ({ opacity: 0, rotateY: dir > 0 ? 28 : -28, x: dir > 0 ? 60 : -60, scale: 0.98 }),
  center: { opacity: 1, rotateY: 0, x: 0, scale: 1, transition: { duration: 0.5, ease: EASE_OUT } },
  exit: (dir: number) => ({
    opacity: 0,
    rotateY: dir > 0 ? -22 : 22,
    x: dir > 0 ? -50 : 50,
    scale: 0.98,
    transition: { duration: 0.26, ease: [0.4, 0, 1, 1] },
  }),
};

const isTypingTarget = (el: EventTarget | null) =>
  el instanceof HTMLElement && (el.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName));

export const InteractivePhotoBook: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const spreadRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLButtonElement>(null);
  const inView = useInView(rootRef, { amount: 0.3 });

  const chapter = BOOK_CHAPTERS[index];
  const imgSize = sizeOf(chapter.image);

  useScrollLock(isFullscreen);
  useFocusTrap(spreadRef, isFullscreen, { onEscape: () => setIsFullscreen(false) });

  const open = () => {
    sounds.playPop(0.9);
    setIsOpen(true);
  };

  const close = useCallback(() => {
    sounds.playPop(0.8);
    setIsFullscreen(false);
    setIsOpen(false);
    requestAnimationFrame(() => coverRef.current?.focus({ preventScroll: true }));
  }, []);

  const goTo = useCallback(
    (next: number) => {
      if (next < 0 || next >= TOTAL || next === index) return;
      sounds.playWhoosh();
      setDirection(next > index ? 1 : -1);
      setIndex(next);
    },
    [index],
  );

  // Arrow keys turn pages while the book is open and on screen (never while typing elsewhere)
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (isTypingTarget(e.target) || e.metaKey || e.ctrlKey || e.altKey) return;
      if (!isFullscreen && !inView) return;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        goTo(index + 1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goTo(index - 1);
      } else if (e.key === 'Escape' && !isFullscreen && rootRef.current?.contains(document.activeElement)) {
        close();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, isFullscreen, inView, index, goTo, close]);

  // Swipe to turn on touch screens
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.3) goTo(dx < 0 ? index + 1 : index - 1);
    touchStart.current = null;
  };

  return (
    <div
      ref={rootRef}
      className={
        isFullscreen
          ? 'fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-ink/90 p-3 backdrop-blur-sm sm:p-6'
          : 'relative mt-10'
      }
    >
      <AnimatePresence mode="wait" initial={false}>
        {!isOpen ? (
          /* ---------------- Closed: hardcover ---------------- */
          <motion.div
            key="cover"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, rotateY: -12, transition: { duration: 0.25 } }}
            transition={SPRING_SOFT}
            className="mx-auto w-full max-w-xl [perspective:1400px]"
          >
            <button
              ref={coverRef}
              type="button"
              onClick={open}
              aria-label="Open the photo book: The person behind the work"
              className="group relative block w-full text-left"
            >
              {/* Page edges */}
              <span aria-hidden="true" className="absolute -right-2.5 bottom-2.5 top-2.5 flex w-4 flex-col justify-around rounded-r-md border border-line bg-[#F2ECE1] px-0.5 py-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <span key={i} className="h-px w-full bg-[#DCD4C4]" />
                ))}
              </span>
              <span aria-hidden="true" className="absolute -bottom-2 left-3 right-1 h-3 rounded-b-md border-b border-line bg-[#E8E1D3]" />

              <span className="relative block overflow-hidden rounded-2xl border-[3.5px] border-ink bg-[#1A1D20] p-6 text-paper-2 shadow-[10px_14px_0_#141618] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 group-hover:shadow-[12px_18px_0_#141618] sm:p-10">
                <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
                <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-6 w-px bg-white/10" />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-[0.05]"
                  style={{ backgroundImage: 'radial-gradient(#FFFFFF 1px, transparent 1px)', backgroundSize: '16px 16px' }}
                />

                <span className="mb-8 flex items-center justify-between border-b border-white/15 pb-4">
                  <span className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-sun" />
                    <span className="font-mono text-[11px] uppercase tracking-widest text-white/75">
                      Editorial monograph · Vol. 01
                    </span>
                  </span>
                  <span className="font-mono text-[11px] text-white/65">{TOTAL} chapters</span>
                </span>

                <span className="mb-8 flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:text-left">
                  <img
                    src="/assets/photos/founder.webp"
                    alt=""
                    width={96}
                    height={96}
                    loading="lazy"
                    decoding="async"
                    className="h-20 w-20 shrink-0 rounded-full border-[2.5px] border-sun object-cover object-top shadow-md ring-4 ring-black/40 sm:h-24 sm:w-24"
                  />
                  <span className="space-y-2">
                    <span className="inline-block rounded-full border border-sun/40 bg-sun/20 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-sun">
                      Interactive photo book
                    </span>
                    <span className="block font-display text-2xl font-black leading-tight tracking-tight text-white sm:text-4xl">
                      THE PERSON BEHIND THE WORK
                    </span>
                    <span className="block max-w-sm text-sm leading-relaxed text-white/80">
                      A collection of moments, experiences, and everything in between.
                    </span>
                  </span>
                </span>

                <span className="flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-4 sm:flex-row">
                  <span className="font-mono text-xs text-white/75">
                    Curated by <span className="font-bold text-white">Opeyemi</span> · The UX Forger
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-xl bg-sun px-4 py-2 font-mono text-xs font-bold text-ink shadow-md transition-transform group-hover:scale-105">
                    <BookOpen className="h-3.5 w-3.5" />
                    Open photo book
                  </span>
                </span>
              </span>
            </button>
          </motion.div>
        ) : (
          /* ---------------- Open: two-page spread ---------------- */
          <motion.div
            key="spread"
            ref={spreadRef}
            role={isFullscreen ? 'dialog' : 'region'}
            aria-modal={isFullscreen || undefined}
            aria-label={`Photo book, ${chapter.chapterNumber}: ${chapter.title}`}
            initial={{ opacity: 0, scale: 0.96, rotateX: 8 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
            transition={SPRING_SOFT}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            className={`mx-auto flex w-full flex-col overflow-hidden rounded-3xl border-[3px] border-ink bg-paper-2 shadow-[10px_14px_0_#141618] ${
              isFullscreen ? 'max-w-6xl' : 'max-w-5xl'
            }`}
          >
            {/* Reader controls */}
            <div className="flex items-center justify-between gap-3 border-b-2 border-ink bg-[#EFE9DC] px-4 py-3 font-mono text-xs sm:px-5">
              <div className="flex min-w-0 items-center gap-2 font-bold text-ink">
                <BookOpen className="h-4 w-4 shrink-0 text-coral-ink" aria-hidden="true" />
                <span className="hidden truncate sm:inline">THE PERSON BEHIND THE WORK</span>
                <span className="sm:hidden">Photo book</span>
                <span className="text-[#8A8275]" aria-hidden="true">·</span>
                <span className="whitespace-nowrap font-extrabold text-coral-ink" aria-live="polite">
                  {pad(index + 1)} / {pad(TOTAL)}
                </span>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={() => goTo(index - 1)}
                  disabled={index === 0}
                  aria-label="Previous chapter"
                  className="rounded-lg border border-ink bg-white p-1.5 text-ink shadow-xs transition-[background-color,transform] hover:bg-paper-2 active:scale-95 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => goTo(index + 1)}
                  disabled={index === TOTAL - 1}
                  aria-label="Next chapter"
                  className="rounded-lg border border-ink bg-white p-1.5 text-ink shadow-xs transition-[background-color,transform] hover:bg-paper-2 active:scale-95 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
                <span className="mx-0.5 h-4 w-px bg-line" aria-hidden="true" />
                <button
                  type="button"
                  onClick={() => setIsFullscreen((v) => !v)}
                  aria-label={isFullscreen ? 'Exit fullscreen' : 'Read in fullscreen'}
                  className="hidden rounded-lg border border-ink bg-white p-1.5 text-ink shadow-xs transition-colors hover:bg-paper-2 sm:block"
                >
                  {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </button>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close photo book"
                  className="flex items-center gap-1 rounded-lg border border-ink bg-coral-ink px-2.5 py-1.5 text-xs font-bold text-white shadow-xs transition-colors hover:bg-[#9A3818]"
                >
                  <X className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Close</span>
                </button>
              </div>
            </div>

            {/* Spread */}
            <div className="relative overflow-hidden bg-[#FCFBF7] [perspective:1800px]">
              <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-1/2 z-20 hidden w-12 -translate-x-1/2 bg-gradient-to-r from-transparent via-black/[0.07] to-transparent md:block" />
              <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-1/2 z-20 hidden w-px -translate-x-1/2 bg-[#E4DDD0] md:block" />

              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.div
                  key={chapter.id}
                  custom={direction}
                  variants={pageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  style={{ transformOrigin: direction > 0 ? 'left center' : 'right center' }}
                  className="grid grid-cols-1 md:h-[620px] md:grid-cols-2"
                >
                  {/* Left page: story */}
                  <div className="flex min-h-0 flex-col border-b border-[#EFE9DC] md:border-b-0 md:border-r">
                    <div className="min-h-0 flex-1 space-y-3.5 overflow-y-auto overscroll-contain p-6 sm:p-8 md:p-10 md:pb-8 md:[mask-image:linear-gradient(to_bottom,black_calc(100%-40px),transparent)]">
                      <div className="flex items-center justify-between border-b border-[#EFE9DC] pb-2.5 font-mono text-xs text-ink-3">
                        <span className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: chapter.accentColor }} />
                          <span className="font-bold uppercase tracking-wider text-ink">{chapter.chapterNumber}</span>
                        </span>
                        <span className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" aria-hidden="true" />
                            {chapter.year}
                          </span>
                          {chapter.location && (
                            <span className="hidden items-center gap-1 sm:flex">
                              <MapPin className="h-3 w-3" aria-hidden="true" />
                              {chapter.location}
                            </span>
                          )}
                        </span>
                      </div>

                      <div>
                        <h4 className="font-display text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-3xl">
                          {chapter.title}
                        </h4>
                        <p className="mt-0.5 font-mono text-xs font-medium text-ink-3 sm:text-sm">{chapter.subtitle}</p>
                      </div>

                      {chapter.quote && (
                        <blockquote className="relative rounded-r-xl border-l-[3px] border-ink bg-paper-2 p-3 pl-4">
                          <Quote className="absolute -left-2 -top-2 h-4 w-4 text-[#8A8275]" aria-hidden="true" />
                          <p className="font-serif text-sm italic leading-relaxed text-ink-2">&ldquo;{chapter.quote}&rdquo;</p>
                        </blockquote>
                      )}

                      <p className="text-sm leading-relaxed text-ink-2">{chapter.story}</p>

                      <div className="space-y-1.5 pt-1">
                        <h5 className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink-3">
                          Highlights
                        </h5>
                        <ul className="space-y-1.5">
                          {chapter.reflections.map((r) => (
                            <li key={r} className="flex items-start gap-2 text-xs leading-relaxed text-ink-2 sm:text-[13px]">
                              <span className="mt-px shrink-0 font-bold" style={{ color: chapter.accentColor }} aria-hidden="true">
                                →
                              </span>
                              <span>{r}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center justify-between gap-3 border-t border-[#EFE9DC] px-6 py-3 font-mono text-xs text-[#6B6358] sm:px-8 md:px-10">
                      <ul className="flex min-w-0 flex-wrap gap-1.5">
                        {chapter.tags.slice(0, 3).map((tag) => (
                          <li key={tag} className="whitespace-nowrap rounded-md border border-[#EFE9DC] bg-paper-2 px-2 py-0.5 text-[10px] text-ink-3">
                            {tag}
                          </li>
                        ))}
                      </ul>
                      <span className="shrink-0 whitespace-nowrap font-bold text-ink">Page {index * 2 + 1}</span>
                    </div>
                  </div>

                  {/* Right page: photo */}
                  <div className="flex min-h-0 flex-col bg-[#FDFCFA]">
                    <figure className="flex flex-1 flex-col justify-center gap-3 p-6 sm:p-8 md:p-10">
                      <div className="relative h-64 w-full overflow-hidden rounded-2xl border-[2.5px] border-ink bg-ink shadow-[5px_5px_0_#141618] sm:h-80 md:h-[340px]">
                        <img
                          src={chapter.image}
                          alt={chapter.imageCaption}
                          width={imgSize?.w}
                          height={imgSize?.h}
                          loading="lazy"
                          decoding="async"
                          className={`h-full w-full ${
                            chapter.imageFit === 'contain'
                              ? 'object-contain object-center'
                              : `object-cover ${chapter.imagePosition || 'object-center'}`
                          }`}
                        />
                        {chapter.eventOrContext && (
                          <span className="absolute bottom-3 left-3 z-10 rounded-lg border border-white/20 bg-black/85 px-3 py-1 font-mono text-[11px] font-bold text-white shadow-sm">
                            {chapter.eventOrContext}
                          </span>
                        )}
                      </div>
                      <figcaption className="px-1 font-mono text-xs italic leading-relaxed text-ink-3">
                        ↳ {chapter.imageCaption}
                      </figcaption>
                    </figure>
                    <div className="flex shrink-0 items-center justify-between gap-3 border-t border-[#EFE9DC] px-6 py-3 font-mono text-xs text-[#6B6358] sm:px-8 md:px-10">
                      <span className="truncate text-[11px]">The UX Forger monograph</span>
                      <span className="shrink-0 font-bold text-ink">Page {index * 2 + 2}</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Chapter ribbon */}
            <nav aria-label="Chapters" className="no-scrollbar flex items-center gap-2 overflow-x-auto border-t-2 border-ink bg-paper-2 px-4 py-3">
              <span className="shrink-0 pl-1 font-mono text-[10px] font-bold uppercase text-[#6B6358]">Chapters</span>
              {BOOK_CHAPTERS.map((ch, i) => {
                const active = i === index;
                return (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-current={active ? 'step' : undefined}
                    className={`relative flex shrink-0 items-center gap-1.5 rounded-xl px-3 py-1.5 font-mono text-xs font-bold transition-colors ${
                      active ? 'text-white' : 'border border-line bg-white text-ink-3 hover:bg-[#EFE9DC]'
                    }`}
                  >
                    {active && (
                      <motion.span layoutId="book-chapter-pill" className="absolute inset-0 rounded-xl bg-ink" transition={SPRING_SOFT} />
                    )}
                    <span className="relative h-1.5 w-1.5 rounded-full" style={{ backgroundColor: ch.accentColor }} />
                    <span className="relative">{ch.title}</span>
                  </button>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
