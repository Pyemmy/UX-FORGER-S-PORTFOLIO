import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote, Sparkles } from 'lucide-react';
import { TESTIMONIALS, TestimonialItem } from '../data/portfolioData';
import { sounds } from '../utils/audio';

// Custom sticky note tint rotation inspired by reference image 5
const NOTE_STYLES = [
  {
    bg: 'bg-[#F9C74F]',
    text: 'text-[#1C1917]',
    border: 'border-[#E0A820]',
    tape: 'bg-[#FDF0D5]/80',
    rotate: '-rotate-1',
  },
  {
    bg: 'bg-[#FF4D6D]',
    text: 'text-white',
    border: 'border-[#D92B4B]',
    tape: 'bg-[#FFF0F3]/80',
    rotate: 'rotate-1',
  },
  {
    bg: 'bg-[#181E29]',
    text: 'text-[#F1F5F9]',
    border: 'border-[#334155]',
    tape: 'bg-[#475569]/80',
    rotate: '-rotate-0.5',
  },
];

export const TestimonialCarousel: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    // Calculate approximate active index
    const cardWidth = 360;
    const index = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(Math.max(0, index), TESTIMONIALS.length - 1));
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const scrollBy = (offset: number) => {
    sounds.playPop();
    scrollContainerRef.current?.scrollBy({ left: offset, behavior: 'smooth' });
  };

  const scrollToIndex = (idx: number) => {
    sounds.playClick();
    const el = scrollContainerRef.current;
    if (!el) return;
    const cardWidth = 360;
    el.scrollTo({ left: idx * cardWidth, behavior: 'smooth' });
  };

  return (
    <div className="relative w-full">
      {/* Editorial Header Annotation (Inspired by reference image 5) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#EE5828] mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Word of Mouth · Verified Collaborators</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#141618] tracking-tight">
            What People Say
          </h2>
        </div>

        {/* Arrow Controls as in reference image 5 */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => scrollBy(-380)}
            disabled={!canScrollLeft}
            aria-label="See more testimonials on the left"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#D5CEBF] bg-white text-xs font-mono font-bold text-[#141618] shadow-xs hover:bg-[#FAF7F2] disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden sm:inline">See More On The Left</span>
          </button>

          <button
            onClick={() => scrollBy(380)}
            disabled={!canScrollRight}
            aria-label="See more testimonials on the right"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#D5CEBF] bg-white text-xs font-mono font-bold text-[#141618] shadow-xs hover:bg-[#FAF7F2] disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer group"
          >
            <span className="hidden sm:inline">See More On The Right</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Snap-Scrolling Card Strip */}
      <div
        ref={scrollContainerRef}
        tabIndex={0}
        aria-label="Testimonial slider, use arrow keys to navigate"
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') scrollBy(-380);
          if (e.key === 'ArrowRight') scrollBy(380);
        }}
        className="flex gap-6 overflow-x-auto pb-8 pt-4 px-1 snap-x snap-mandatory scrollbar-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3062F7] rounded-2xl"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {TESTIMONIALS.map((t, idx) => {
          const style = NOTE_STYLES[idx % NOTE_STYLES.length];
          return (
            <motion.div
              key={t.id}
              whileHover={{ y: -6, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className={`shrink-0 w-[300px] sm:w-[360px] snap-center rounded-2xl p-6 sm:p-7 shadow-lg border relative flex flex-col justify-between ${style.bg} ${style.text} ${style.border} ${style.rotate}`}
            >
              {/* Decorative Sticky Tape on top edge */}
              <div
                className={`absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 ${style.tape} rounded-xs backdrop-blur-xs shadow-xs border border-black/5 -rotate-1`}
              />

              {/* Quote mark & content */}
              <div>
                <Quote className="w-6 h-6 opacity-40 mb-3" />
                <p className="text-sm sm:text-base font-sans font-medium leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Author & credential */}
              <div className="pt-4 border-t border-black/10 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 border border-white/30 flex items-center justify-center font-display font-bold text-xs shrink-0">
                  {t.author.substring(0, 2)}
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold tracking-tight uppercase">
                    {t.author}
                  </h4>
                  <p className="text-[11px] font-mono opacity-80">
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Progress Dots Indicator */}
      <div className="flex items-center justify-center gap-2 pt-2">
        {TESTIMONIALS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollToIndex(idx)}
            aria-label={`Jump to testimonial ${idx + 1}`}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              activeIndex === idx
                ? 'w-6 bg-[#141618]'
                : 'w-2 bg-[#D5CEBF] hover:bg-[#8A8275]'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
