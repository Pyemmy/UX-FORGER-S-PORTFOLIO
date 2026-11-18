import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  X,
  Camera,
  Sparkles,
  MapPin,
  Calendar,
  Layers,
  Quote,
} from 'lucide-react';
import { BOOK_CHAPTERS, BookChapter } from '../data/portfolioData';
import { sounds } from '../utils/audio';

interface InteractivePhotoBookProps {
  onOpenChange?: (isOpen: boolean) => void;
}

export const InteractivePhotoBook: React.FC<InteractivePhotoBookProps> = ({
  onOpenChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [turnDirection, setTurnDirection] = useState<'next' | 'prev' | null>(null);
  const bookContainerRef = useRef<HTMLDivElement>(null);

  const activeChapter: BookChapter = BOOK_CHAPTERS[activeIndex];
  const totalChapters = BOOK_CHAPTERS.length;

  const handleOpenBook = () => {
    sounds.playPop(0.9);
    setIsOpen(true);
    onOpenChange?.(true);
  };

  const handleCloseBook = () => {
    sounds.playPop(0.8);
    setIsOpen(false);
    setIsFullscreen(false);
    onOpenChange?.(false);
  };

  const handleNext = () => {
    if (activeIndex < totalChapters - 1) {
      sounds.playPop(1.1);
      setTurnDirection('next');
      setActiveIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      sounds.playPop(1.0);
      setTurnDirection('prev');
      setActiveIndex((prev) => prev - 1);
    }
  };

  const handleSelectChapter = (idx: number) => {
    if (idx === activeIndex) return;
    sounds.playPop(1.05);
    setTurnDirection(idx > activeIndex ? 'next' : 'prev');
    setActiveIndex(idx);
  };

  // Keyboard navigation when book is open
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape') {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          handleCloseBook();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeIndex, isFullscreen]);

  // Touch swipe support
  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX < -50) {
      handleNext();
    } else if (deltaX > 50) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <div
      ref={bookContainerRef}
      className={`w-full transition-all duration-300 ${
        isFullscreen
          ? 'fixed inset-0 z-50 bg-[#141618]/90 backdrop-blur-md p-3 sm:p-6 flex flex-col items-center justify-center overflow-y-auto'
          : 'relative my-8'
      }`}
    >
      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* ===================================================================
             1. CLOSED BOOK STATE — EDITORIAL HARDCOVER MONOGRAPH
             =================================================================== */
          <motion.div
            key="closed-book"
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.3 }}
            onClick={handleOpenBook}
            className="w-full max-w-xl mx-auto cursor-pointer group select-none"
            role="button"
            tabIndex={0}
            aria-label="Open The Person Behind The Work photo book"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleOpenBook();
              }
            }}
          >
            {/* 3D Physical Book Illusion with Spine & Edge Stack */}
            <div className="relative">
              {/* Paper Stack Edge Behind (Pages illusion on right/bottom) */}
              <div className="absolute -right-2.5 top-2.5 bottom-2.5 w-4 bg-[#F2ECE1] rounded-r-md border border-[#D5CEBF] shadow-xs flex flex-col justify-around py-2 px-0.5">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-px bg-[#DCD4C4] w-full" />
                ))}
              </div>
              <div className="absolute -bottom-2 left-3 right-1 h-3 bg-[#E8E1D3] rounded-b-md border-b border-[#D5CEBF] shadow-sm" />

              {/* Hardcover Outer Frame */}
              <div className="relative bg-[#1A1D20] text-[#FAF7F2] rounded-2xl border-[3.5px] border-[#141618] p-6 sm:p-10 shadow-[10px_14px_0px_#141618] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[12px_18px_0px_#141618] overflow-hidden">
                {/* Book Spine Bevel (Left edge gradient) */}
                <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/60 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute inset-y-0 left-6 w-px bg-white/10 pointer-events-none" />

                {/* Cover Texture Subtle Grid */}
                <div
                  className="absolute inset-0 opacity-5 pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(#FFFFFF 1px, transparent 1px)',
                    backgroundSize: '16px 16px',
                  }}
                />

                {/* Monograph Header */}
                <div className="flex items-center justify-between border-b border-white/15 pb-4 mb-8">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F4BE24]" />
                    <span className="text-[11px] font-mono tracking-widest uppercase text-white/70">
                      Editorial Monograph · Vol. 01
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-white/50">7 Chapters</span>
                </div>

                {/* Author Vignette & Title Group */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 text-center sm:text-left">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-[2.5px] border-[#F4BE24] shadow-md shrink-0 ring-4 ring-black/40">
                    <img
                      src="/assets/aistudio/IMG_2086_3ecf5b10.jpeg"
                      alt="Opeyemi - The UX Forger"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="inline-block px-2.5 py-0.5 rounded-full bg-[#F4BE24]/20 border border-[#F4BE24]/40 text-[#F4BE24] text-[10px] font-mono font-bold tracking-wider uppercase">
                      Interactive Photo Book
                    </div>
                    <h3 className="text-2xl sm:text-4xl font-display font-black tracking-tight leading-tight text-white">
                      THE PERSON BEHIND THE WORK
                    </h3>
                    <p className="text-xs sm:text-sm text-white/75 font-sans leading-relaxed max-w-sm">
                      A collection of moments, experiences, and everything in between.
                    </p>
                  </div>
                </div>

                {/* Cover Details & Invitation */}
                <div className="pt-4 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs font-mono text-white/70">
                    <span className="text-white/40">Curated by</span>{' '}
                    <span className="font-bold text-white">Opeyemi</span> · The UX Forger
                  </div>

                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F4BE24] text-[#141618] font-mono font-bold text-xs shadow-md group-hover:scale-105 transition-transform">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Open Photo Book ↗</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-center text-xs font-mono text-[#71717A] mt-3">
              Click anywhere on the book to open the interactive two-page spread.
            </p>
          </motion.div>
        ) : (
          /* ===================================================================
             2. OPEN BOOK SPREAD — TWO-PAGE EDITORIAL SPREAD
             =================================================================== */
          <motion.div
            key="open-book"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3 }}
            className={`w-full ${
              isFullscreen ? 'max-w-6xl' : 'max-w-5xl'
            } mx-auto bg-[#FAF7F2] rounded-3xl border-[3px] border-[#141618] shadow-[10px_14px_0px_#141618] overflow-hidden flex flex-col`}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Top Reader Controls Bar */}
            <div className="px-5 py-3.5 bg-[#EFE9DC] border-b-2 border-[#141618] flex items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2 text-[#141618] font-bold">
                <BookOpen className="w-4 h-4 text-[#EE5828]" />
                <span className="hidden sm:inline">THE PERSON BEHIND THE WORK</span>
                <span className="sm:hidden">Photo Book</span>
                <span className="text-[#8A8275]">·</span>
                <span className="text-[#EE5828] font-extrabold">
                  {activeChapter.chapterNumber} of 07
                </span>
              </div>

              {/* Action Buttons: Prev, Next, Fullscreen, Close */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  disabled={activeIndex === 0}
                  aria-label="Previous chapter"
                  className="p-1.5 rounded-lg border border-[#141618] bg-white hover:bg-[#FAF7F2] disabled:opacity-30 disabled:cursor-not-allowed text-[#141618] cursor-pointer transition-colors shadow-xs"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <span className="text-[11px] font-bold text-[#52525B] px-1">
                  {activeIndex + 1} / {totalChapters}
                </span>

                <button
                  onClick={handleNext}
                  disabled={activeIndex === totalChapters - 1}
                  aria-label="Next chapter"
                  className="p-1.5 rounded-lg border border-[#141618] bg-white hover:bg-[#FAF7F2] disabled:opacity-30 disabled:cursor-not-allowed text-[#141618] cursor-pointer transition-colors shadow-xs"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                <div className="h-4 w-px bg-[#D5CEBF] mx-1" />

                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                  className="p-1.5 rounded-lg border border-[#141618] bg-white hover:bg-[#FAF7F2] text-[#141618] cursor-pointer transition-colors shadow-xs"
                  title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-4 h-4" />
                  ) : (
                    <Maximize2 className="w-4 h-4" />
                  )}
                </button>

                <button
                  onClick={handleCloseBook}
                  aria-label="Close photo book"
                  className="px-3 py-1.5 rounded-lg border border-[#141618] bg-[#EE5828] hover:bg-[#DC4B1D] text-white font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
                >
                  <X className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Close</span>
                </button>
              </div>
            </div>

            {/* The Two-Page Spread Container — Fixed Size Monograph */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 bg-[#FCFBF7] md:h-[620px] overflow-hidden">
              {/* Central Spine Paper Shadow (Desktop only) */}
              <div className="hidden md:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-12 bg-gradient-to-r from-transparent via-black/8 to-transparent pointer-events-none z-20" />
              <div className="hidden md:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-[#E4DDD0] pointer-events-none z-20" />

              {/* -------------------------------------------------------------
                  LEFT PAGE: THE EDITORIAL NARRATIVE & STORY
                  ------------------------------------------------------------- */}
              <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#EFE9DC] relative md:h-full overflow-hidden">
                {/* Content Container */}
                <div className="space-y-3 sm:space-y-3.5 overflow-hidden">
                  {/* Chapter Kicker & Metadata */}
                  <div className="flex items-center justify-between text-xs font-mono text-[#71717A] border-b border-[#EFE9DC] pb-2.5">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: activeChapter.accentColor }}
                      />
                      <span className="font-bold text-[#141618] uppercase tracking-wider">
                        {activeChapter.chapterNumber}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#8A8275]" />
                        <span>{activeChapter.year}</span>
                      </span>
                      {activeChapter.location && (
                        <span className="hidden sm:flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#8A8275]" />
                          <span>{activeChapter.location}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Chapter Title & Subtitle */}
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-[#141618] tracking-tight leading-tight">
                      {activeChapter.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-mono font-medium text-[#71717A] mt-0.5">
                      {activeChapter.subtitle}
                    </p>
                  </div>

                  {/* Editorial Pull Quote */}
                  {activeChapter.quote && (
                    <div className="relative pl-3.5 border-l-3 border-[#141618] bg-[#FAF7F2] p-2.5 rounded-r-xl">
                      <Quote className="w-3.5 h-3.5 text-[#8A8275] absolute -top-1.5 -left-1.5 opacity-60" />
                      <p className="text-xs sm:text-sm italic font-serif text-[#27272A] leading-relaxed">
                        &ldquo;{activeChapter.quote}&rdquo;
                      </p>
                    </div>
                  )}

                  {/* Personal Story Paragraph */}
                  <p className="text-xs sm:text-sm font-sans text-[#3F3F46] leading-relaxed line-clamp-4 sm:line-clamp-5">
                    {activeChapter.story}
                  </p>

                  {/* Reflections / Key Highlights */}
                  <div className="space-y-1 pt-1">
                    <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#71717A]">
                      Key Highlights &amp; Insights:
                    </div>
                    {activeChapter.reflections.slice(0, 3).map((ref, rIdx) => (
                      <div
                        key={rIdx}
                        className="flex items-start gap-2 text-xs text-[#27272A]"
                      >
                        <span
                          className="font-bold leading-none mt-0.5 shrink-0"
                          style={{ color: activeChapter.accentColor }}
                        >
                          →
                        </span>
                        <span className="line-clamp-1">{ref}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Left Page Footer: Tags & Page Number */}
                <div className="pt-4 mt-4 border-t border-[#EFE9DC] flex items-center justify-between gap-3 text-xs font-mono text-[#8A8275] shrink-0">
                  <div className="flex flex-wrap gap-1.5 min-w-0">
                    {activeChapter.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-[#FAF7F2] border border-[#EFE9DC] text-[10px] text-[#52525B] whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="font-bold text-[#141618] whitespace-nowrap shrink-0">
                    Page {activeIndex * 2 + 1}
                  </span>
                </div>
              </div>

              {/* -------------------------------------------------------------
                  RIGHT PAGE: THE VISUAL MEDIA / STAGE PHOTO / EDITORIAL NOTE
                  ------------------------------------------------------------- */}
              <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-between bg-[#FDFCFA] relative md:h-full overflow-hidden">
                <div className="h-full flex flex-col justify-center">
                  {activeChapter.image && (
                    <div className="space-y-3">
                      <div className="relative rounded-2xl overflow-hidden border-[2.5px] border-[#141618] shadow-[5px_5px_0px_#141618] bg-[#141618] h-64 sm:h-72 md:h-[330px] w-full">
                        <img
                          src={activeChapter.image}
                          alt={activeChapter.title}
                          className={`w-full h-full ${
                            activeChapter.imageFit === 'contain'
                              ? 'object-contain object-center bg-[#141618]'
                              : `${activeChapter.imagePosition || 'object-center'} object-cover`
                          }`}
                        />

                        {/* Event Watermark Pill */}
                        {activeChapter.eventOrContext && (
                          <div className="absolute bottom-3 left-3 px-3 py-1 bg-black/85 backdrop-blur-sm rounded-lg border border-white/20 text-white text-[11px] font-mono font-bold z-10 shadow-sm">
                            {activeChapter.eventOrContext}
                          </div>
                        )}
                      </div>

                      {/* Photo Caption */}
                      {activeChapter.imageCaption && (
                        <p className="text-xs font-mono text-[#52525B] leading-relaxed italic px-1 h-11 flex items-center line-clamp-2">
                          ↳ {activeChapter.imageCaption}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Right Page Footer */}
                <div className="pt-4 mt-4 border-t border-[#EFE9DC] flex items-center justify-between gap-3 text-xs font-mono text-[#8A8275] shrink-0">
                  <span className="text-[11px] truncate">The UX Forger Monograph</span>
                  <span className="font-bold text-[#141618] whitespace-nowrap shrink-0">
                    Page {activeIndex * 2 + 2}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Chapter Selector Thumbnail Ribbon */}
            <div className="px-4 py-3 bg-[#FAF7F2] border-t-2 border-[#141618] flex items-center gap-2 overflow-x-auto select-none">
              <span className="text-[10px] font-mono font-bold uppercase text-[#8A8275] shrink-0 pl-2">
                Chapters:
              </span>
              {BOOK_CHAPTERS.map((ch, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={ch.id}
                    onClick={() => handleSelectChapter(idx)}
                    className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[#141618] text-white shadow-xs'
                        : 'bg-white hover:bg-[#EFE9DC] text-[#52525B] border border-[#D5CEBF]'
                    }`}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: ch.accentColor }}
                    />
                    <span>{ch.title}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
