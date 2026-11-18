import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Award,
  CheckCircle2,
  ExternalLink,
  Layers,
  Share2,
  Sparkles,
  TrendingUp,
  X,
} from 'lucide-react';
import { PROJECTS, ProjectItem } from '../data/portfolioData';
import { sizeOf } from '../data/imageSizes';
import { useScrollLock } from '../hooks/useScrollLock';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { useToast } from './ui/Toast';
import { SmartImage } from './ui/SmartImage';
import { EASE_OUT, REVEAL_VIEWPORT } from '../utils/motion';

interface FullScreenCaseStudyProps {
  project: ProjectItem | null;
  onClose: () => void;
  onNavigateProject: (project: ProjectItem) => void;
  onInquire: () => void;
}

const Block: React.FC<{ children: React.ReactNode; className?: string; as?: 'section' | 'div' }> = ({
  children,
  className,
  as = 'section',
}) => {
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={REVEAL_VIEWPORT}
      transition={{ duration: 0.6, ease: EASE_OUT }}
    >
      {children}
    </Component>
  );
};

const Overlay: React.FC<Omit<FullScreenCaseStudyProps, 'project'> & { project: ProjectItem }> = ({
  project,
  onClose,
  onNavigateProject,
  onInquire,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const { copy } = useToast();

  useScrollLock(true);
  useFocusTrap(scrollRef, true, { initialFocus: closeRef, onEscape: onClose });

  const { scrollYProgress } = useScroll({ container: scrollRef });
  const progress = useSpring(scrollYProgress, { stiffness: 240, damping: 34, restDelta: 0.001 });

  // New project → back to the top of the overlay
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [project.id]);

  const idx = PROJECTS.findIndex((p) => p.id === project.id);
  const prev = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(idx + 1) % PROJECTS.length];
  const heroSize = sizeOf(project.mockupImage);
  const title = project.displayTitle || project.title;

  return (
    <motion.div
      ref={scrollRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30, transition: { duration: 0.22, ease: [0.4, 0, 1, 1] } }}
      transition={{ type: 'spring', stiffness: 260, damping: 30 }}
      className="fixed inset-0 z-[80] flex flex-col overflow-y-auto overscroll-contain bg-night text-night-text"
    >
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[85] h-1 origin-left bg-teal"
        style={{ scaleX: progress }}
      />

      <header className="sticky top-0 z-[82] flex items-center justify-between gap-3 border-b border-white/[0.08] bg-night/95 px-4 py-3 backdrop-blur-md sm:px-8">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg px-2 py-1.5 font-mono text-xs font-medium text-night-muted transition-colors hover:bg-white/5 hover:text-white sm:px-3"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>
            Back<span className="hidden sm:inline"> to portfolio</span>
          </span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => copy(`${window.location.origin}/#work/${project.slug}`, 'Link to this case study copied')}
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 font-mono text-xs text-night-muted transition-colors hover:bg-white/5 hover:text-white"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Share link</span>
            <span className="sr-only sm:hidden">Copy link to this case study</span>
          </button>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-teal-ink px-3 py-1.5 font-mono text-xs font-semibold text-white transition-colors hover:bg-[#0F6449] sm:px-3.5"
            >
              <span>
                <span className="hidden sm:inline">Launch </span>
                <span className="sm:hidden">Live </span>
                <span className="hidden sm:inline">app</span>
              </span>
              <ExternalLink className="h-3.5 w-3.5" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            className="rounded-lg p-1.5 text-night-muted transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </header>

      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={project.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12, transition: { duration: 0.18 } }}
          transition={{ duration: 0.45, ease: EASE_OUT }}
          className="mx-auto w-full max-w-4xl flex-1 space-y-14 px-4 py-10 sm:space-y-16 sm:px-8 sm:py-16"
        >
          {/* Header */}
          <section className="space-y-6">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-night-muted">
              <span className="rounded border border-white/10 bg-white/5 px-2.5 py-0.5 font-semibold text-teal">
                {project.category}
              </span>
              <span aria-hidden="true">·</span>
              <span>{project.year}</span>
              <span aria-hidden="true">·</span>
              <span>{project.clientOrOrg}</span>
              {project.buildDuration && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-lime">{project.buildDuration}</span>
                </>
              )}
            </div>

            {project.awardOrBadge && (
              <p className="inline-flex items-center gap-2 rounded-md border border-[#F26522]/30 bg-[#F26522]/10 px-3 py-1 font-mono text-xs font-semibold text-[#FF8A4C]">
                <Award className="h-3.5 w-3.5" aria-hidden="true" />
                {project.awardOrBadge.replace(/^[^\w₦]+/u, '')}
              </p>
            )}

            <div>
              <p className="mb-2 font-mono text-sm font-semibold text-night-faint">{title}</p>
              <h1
                id="case-study-title"
                className="font-display text-3xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
              >
                {project.title}
              </h1>
            </div>
            <p className="font-sans text-lg leading-relaxed text-night-muted sm:text-xl">{project.subtitle}</p>

            <dl className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6 text-xs sm:grid-cols-4">
              {[
                ['My role', project.role],
                ['Timeline', project.buildDuration || project.year],
                ['Client / context', project.clientOrOrg],
                ['Stack', project.technologies.slice(0, 3).join(', ')],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="mb-1 font-mono uppercase tracking-wider text-night-faint">{label}</dt>
                  <dd className="font-medium text-white">{value}</dd>
                </div>
              ))}
            </dl>

            {project.mockupImage && (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.15 }}
                className="pt-4"
              >
                <SmartImage
                  src={project.mockupImage}
                  alt={`${title} interface`}
                  loading="eager"
                  width={heroSize?.w}
                  height={heroSize?.h}
                  className="h-auto w-full rounded-2xl object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.45)]"
                />
              </motion.div>
            )}
          </section>

          {/* Metrics */}
          {project.metrics.length > 0 && (
            <Block className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {project.metrics.map((m) => (
                <div key={m.label} className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-night-2 p-5">
                  <div className="mb-1 font-display text-3xl font-bold text-white sm:text-4xl">{m.value}</div>
                  <div className="font-mono text-xs text-night-muted">{m.label}</div>
                  <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 h-16 w-16 rounded-bl-full bg-teal/5" />
                </div>
              ))}
            </Block>
          )}

          {/* Problem / solution on warm paper */}
          <Block className="warm-paper-surface space-y-8 rounded-2xl border border-[#E5E0D5] p-6 text-ink shadow-xl sm:p-10">
            <div className="flex items-center justify-between border-b border-[#D8D2C5] pb-4">
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-teal-ink">The brief</span>
                <h2 className="mt-0.5 font-display text-2xl font-bold text-ink">Problem &amp; design solution</h2>
              </div>
              <span className="rounded bg-black/5 px-2.5 py-1 font-mono text-xs font-semibold text-ink-3">01 · Strategy</span>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="space-y-3">
                <h3 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#B91C1C]">
                  <AlertCircle className="h-4 w-4" aria-hidden="true" />
                  The challenge
                </h3>
                <p className="text-[15px] leading-relaxed text-ink-2">{project.problem}</p>
              </div>
              <div className="space-y-3">
                <h3 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#047857]">
                  <TrendingUp className="h-4 w-4" aria-hidden="true" />
                  The solution
                </h3>
                <p className="text-[15px] leading-relaxed text-ink-2">{project.solution}</p>
              </div>
            </div>

            {Boolean(project.constraints?.length || project.tradeoffs?.length) && (
              <div className="grid grid-cols-1 gap-6 border-t border-[#D8D2C5] pt-6 md:grid-cols-2">
                {project.constraints && project.constraints.length > 0 && (
                  <div>
                    <h4 className="mb-2.5 font-mono text-xs font-bold uppercase tracking-wider text-ink-3">Constraints</h4>
                    <ul className="space-y-2">
                      {project.constraints.map((c) => (
                        <li key={c} className="flex items-start gap-2 text-sm text-ink-2">
                          <span className="font-mono font-bold text-teal-ink" aria-hidden="true">/</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {project.tradeoffs && project.tradeoffs.length > 0 && (
                  <div>
                    <h4 className="mb-2.5 font-mono text-xs font-bold uppercase tracking-wider text-ink-3">
                      Key decisions &amp; trade-offs
                    </h4>
                    <ul className="space-y-2">
                      {project.tradeoffs.map((t) => (
                        <li key={t} className="flex items-start gap-2 text-sm text-ink-2">
                          <span className="font-mono font-bold text-rust" aria-hidden="true">→</span>
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </Block>

          {/* Narrative */}
          {project.caseStudySections && project.caseStudySections.length > 0 && (
            <div className="space-y-6">
              {project.caseStudySections.map((sec, i) => (
                <Block key={sec.title} className="space-y-4 rounded-xl border border-white/[0.08] bg-night-2 p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="font-display text-xl font-bold text-white sm:text-2xl">{sec.title}</h2>
                    <span className="shrink-0 pt-1.5 font-mono text-xs text-night-faint">Phase {i + 1}</span>
                  </div>
                  {sec.subtitle && <p className="font-mono text-sm text-teal">{sec.subtitle}</p>}
                  <div className="space-y-3 pt-1 text-[15px] leading-relaxed text-[#C3C9D2]">
                    {sec.content.map((p) => (
                      <p key={p.slice(0, 40)}>{p}</p>
                    ))}
                  </div>
                  {sec.takeaways && sec.takeaways.length > 0 && (
                    <div className="mt-4 space-y-2 rounded-lg border border-white/[0.06] bg-black/30 p-4">
                      <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-lime">Key findings</h3>
                      <ul className="space-y-1.5">
                        {sec.takeaways.map((t) => (
                          <li key={t} className="flex items-start gap-2 text-sm text-[#D1D5DB]">
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal" aria-hidden="true" />
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </Block>
              ))}
            </div>
          )}

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <Block className="space-y-4">
              <h2 className="font-mono text-sm font-bold uppercase tracking-wider text-white">More screens</h2>
              <div className={`grid gap-4 ${project.gallery.length > 1 ? 'sm:grid-cols-2' : ''}`}>
                {project.gallery.map((img) => {
                  const size = sizeOf(img.src);
                  return (
                    <figure key={img.src} className="overflow-hidden rounded-xl border border-white/[0.08] bg-night-2">
                      <SmartImage
                        src={img.src}
                        alt={img.alt}
                        width={size?.w}
                        height={size?.h}
                        className="h-auto w-full"
                      />
                      <figcaption className="px-4 py-3 font-mono text-xs text-night-muted">{img.alt}</figcaption>
                    </figure>
                  );
                })}
              </div>
            </Block>
          )}

          {/* Deliverables */}
          <Block className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-3 rounded-xl border border-white/[0.08] bg-night-2 p-6">
              <h2 className="flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-wider text-night-text">
                <Layers className="h-4 w-4 text-teal" aria-hidden="true" />
                Delivered
              </h2>
              <ul className="space-y-2.5 pt-2">
                {project.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-night-muted">
                    <span className="font-mono text-teal" aria-hidden="true">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3 rounded-xl border border-white/[0.08] bg-night-2 p-6">
              <h2 className="flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-wider text-night-text">
                <Sparkles className="h-4 w-4 text-lime" aria-hidden="true" />
                Interface &amp; UX details
              </h2>
              <ul className="space-y-2.5 pt-2">
                {project.wireframeHighlights.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-night-muted">
                    <span className="font-mono text-lime" aria-hidden="true">·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Block>

          {/* CTA */}
          <Block className="flex flex-col items-start justify-between gap-5 rounded-2xl border border-white/10 bg-gradient-to-br from-night-2 to-night p-6 sm:flex-row sm:items-center sm:p-8">
            <div>
              <h2 className="font-display text-xl font-bold text-white">Building something similar?</h2>
              <p className="mt-1 text-sm text-night-muted">Let&apos;s talk strategy, UX flows and engineering execution.</p>
            </div>
            <button
              type="button"
              onClick={onInquire}
              className="lift inline-flex shrink-0 items-center gap-2 rounded-full bg-sun px-5 py-3 font-display text-sm font-bold text-ink hover:bg-[#FFD24D]"
            >
              Start a conversation
              <ArrowRight className="h-4 w-4" />
            </button>
          </Block>

          {/* Prev / next */}
          <nav aria-label="More case studies" className="grid grid-cols-2 gap-3 border-t border-white/10 pt-8 sm:gap-4">
            {[
              { p: prev, label: 'Previous', dir: -1 },
              { p: next, label: 'Next', dir: 1 },
            ].map(({ p, label, dir }) => (
              <button
                key={label}
                type="button"
                onClick={() => onNavigateProject(p)}
                className={`group flex flex-col gap-1 rounded-xl border border-white/[0.08] bg-night-2 p-4 transition-colors hover:border-white/20 hover:bg-[#1C2029] sm:p-5 ${
                  dir > 0 ? 'items-end text-right' : 'items-start text-left'
                }`}
              >
                <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-night-faint">
                  {dir < 0 && <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />}
                  {label}
                  {dir > 0 && <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />}
                </span>
                <span className="font-display text-base font-bold text-white sm:text-lg">{p.displayTitle || p.title}</span>
                <span className="hidden text-xs text-night-muted sm:block">{p.displayCategory || p.subtitle}</span>
              </button>
            ))}
          </nav>
        </motion.main>
      </AnimatePresence>
    </motion.div>
  );
};

export const FullScreenCaseStudy: React.FC<FullScreenCaseStudyProps> = ({ project, ...rest }) => (
  <AnimatePresence>{project && <Overlay key="case-study" project={project} {...rest} />}</AnimatePresence>
);
