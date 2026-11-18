import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, ExternalLink, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/portfolioData';
import { sounds } from '../utils/audio';
import { SectionHeader } from './ui/SectionHeader';
import { SPRING_SOFT } from '../utils/motion';

const NOTE_STYLES = [
  { bg: 'bg-[#F9C74F]', text: 'text-[#1C1917]', border: 'border-[#E0A820]', tape: 'bg-[#FDF0D5]/85', tilt: -1.2, chip: 'bg-black/10' },
  { bg: 'bg-[#D02E50]', text: 'text-white', border: 'border-[#B02442]', tape: 'bg-[#FFF0F3]/85', tilt: 1, chip: 'bg-white/20' },
  { bg: 'bg-[#181E29]', text: 'text-[#F1F5F9]', border: 'border-[#334155]', tape: 'bg-[#64748B]/80', tilt: -0.6, chip: 'bg-white/15' },
];

/** "Ada Okafor" → "AO"; "TEAM INNOVATEQAS" → "TI" */
const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join('');

export const TestimonialCarousel: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);
  const [active, setActive] = useState(0);
  const raf = useRef(0);

  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanLeft(scrollLeft > 8);
    setCanRight(scrollLeft < scrollWidth - clientWidth - 8);
    // Pin to the ends; otherwise the card whose centre is closest to the track's centre
    if (scrollLeft <= 8) return setActive(0);
    if (scrollLeft >= scrollWidth - clientWidth - 8) return setActive(TESTIMONIALS.length - 1);
    const centre = scrollLeft + clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    Array.from(el.children).forEach((child, i) => {
      const c = child as HTMLElement;
      const dist = Math.abs(c.offsetLeft + c.offsetWidth / 2 - centre);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    setActive(best);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(measure);
    };
    measure();
    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf.current);
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [measure]);

  const scrollToIndex = (i: number) => {
    const el = trackRef.current;
    const card = el?.children[i] as HTMLElement | undefined;
    if (!el || !card) return;
    sounds.playClick();
    el.scrollTo({ left: card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2, behavior: 'smooth' });
  };

  const step = (dir: 1 | -1) => scrollToIndex(Math.min(TESTIMONIALS.length - 1, Math.max(0, active + dir)));

  const controls = (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => step(-1)}
        disabled={!canLeft}
        aria-label="Previous testimonial"
        className="lift flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink shadow-xs hover:bg-paper-2 disabled:pointer-events-none disabled:opacity-35"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => step(1)}
        disabled={!canRight}
        aria-label="Next testimonial"
        className="lift flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink shadow-xs hover:bg-paper-2 disabled:pointer-events-none disabled:opacity-35"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );

  return (
    <div className="relative w-full">
      <SectionHeader
        id="testimonials-title"
        accent="#EE5828"
        kicker="Word of mouth"
        title="What people say"
        subtitle="Collaborators, teammates and students on working with me."
        align="left"
        aside={controls}
      />

      <div
        ref={trackRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Testimonials"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') {
            e.preventDefault();
            step(-1);
          }
          if (e.key === 'ArrowRight') {
            e.preventDefault();
            step(1);
          }
        }}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pb-10 pt-6 sm:-mx-2 sm:gap-6 sm:px-2"
      >
        {TESTIMONIALS.map((t, i) => {
          const style = NOTE_STYLES[i % NOTE_STYLES.length];
          return (
            <motion.figure
              key={t.id}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${TESTIMONIALS.length}`}
              initial={{ opacity: 0, y: 30, rotate: style.tilt * 4 }}
              whileInView={{ opacity: 1, y: 0, rotate: style.tilt }}
              whileHover={{ y: -6, rotate: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ ...SPRING_SOFT, delay: i * 0.06 }}
              className={`relative flex w-[82vw] max-w-[360px] shrink-0 snap-center flex-col justify-between rounded-2xl border p-6 shadow-lg sm:w-[360px] sm:p-7 ${style.bg} ${style.text} ${style.border}`}
            >
              <span
                aria-hidden="true"
                className={`absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 -rotate-2 rounded-xs border border-black/5 shadow-xs ${style.tape}`}
              />
              <blockquote>
                <Quote className="mb-3 h-6 w-6 opacity-40" aria-hidden="true" />
                <p className="mb-6 text-[15px] font-medium leading-relaxed sm:text-base">&ldquo;{t.quote}&rdquo;</p>
              </blockquote>
              <figcaption className="flex items-center gap-3 border-t border-black/10 pt-4">
                {t.photo ? (
                  <img
                    src={t.photo}
                    alt=""
                    width={40}
                    height={40}
                    loading="lazy"
                    className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-white/40"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-xs font-bold ${style.chip}`}
                  >
                    {initials(t.author)}
                  </span>
                )}
                <span className="min-w-0">
                  <span className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-tight">
                    {t.link ? (
                      <a href={t.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline-offset-2 hover:underline">
                        {t.author}
                        <ExternalLink className="h-3 w-3 opacity-70" aria-hidden="true" />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    ) : (
                      t.author
                    )}
                  </span>
                  <span className="block font-mono text-[11px] opacity-85">
                    {t.role} · {t.company}
                  </span>
                </span>
              </figcaption>
            </motion.figure>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-2" role="group" aria-label="Choose testimonial">
        {TESTIMONIALS.map((t, i) => (
          <button
            key={t.id}
            type="button"
            onClick={() => scrollToIndex(i)}
            aria-label={`Show testimonial ${i + 1}`}
            aria-current={active === i ? 'true' : undefined}
            className="flex h-6 min-w-6 items-center justify-center"
          >
            <motion.span
              className="block h-2 rounded-full"
              animate={{ width: active === i ? 24 : 8, backgroundColor: active === i ? '#141618' : '#D5CEBF' }}
              transition={{ duration: 0.3 }}
            />
          </button>
        ))}
      </div>
    </div>
  );
};
