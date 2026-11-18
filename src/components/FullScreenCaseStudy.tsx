import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ArrowLeft,
  ExternalLink,
  Award,
  Clock,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Terminal,
  Share2,
  Check,
} from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';

interface FullScreenCaseStudyProps {
  project: ProjectItem | null;
  onClose: () => void;
  onInquireProject: (projectName: string) => void;
}

export const FullScreenCaseStudy: React.FC<FullScreenCaseStudyProps> = ({
  project,
  onClose,
  onInquireProject,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState('overview');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Keyboard Escape listener & body scroll lock
  useEffect(() => {
    if (!project) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  // Track scroll progress inside the overlay container
  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const totalHeight = el.scrollHeight - el.clientHeight;
    if (totalHeight > 0) {
      const progress = (el.scrollTop / totalHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    }
  };

  const handleCopyProjectLink = () => {
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}/#work/${project?.slug || project?.id}`;
      navigator.clipboard?.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 bg-[#0F1115] overflow-y-auto flex flex-col text-[#F5F7FA]"
        ref={scrollContainerRef}
        onScroll={handleScroll}
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} Case Study`}
      >
        {/* Sticky Reading Progress Bar */}
        <div className="fixed top-0 left-0 right-0 h-1 bg-[#171A21] z-50">
          <div
            className="h-full bg-[#1D9E75] transition-all duration-75"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Sticky Editorial Top Header */}
        <header className="sticky top-0 z-40 bg-[#0F1115]/95 backdrop-blur-md border-b border-white/[0.08] px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-[#9BA3AF] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Portfolio</span>
          </button>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleCopyProjectLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-[#9BA3AF] hover:text-white hover:bg-white/5 border border-white/10 transition-colors cursor-pointer"
              title="Copy direct link to this case study"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#1D9E75]" />
                  <span className="text-[#1D9E75]">Link Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Share Link</span>
                </>
              )}
            </button>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold bg-[#1D9E75] hover:bg-[#22B586] text-white transition-colors"
              >
                <span>Launch App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <button
              onClick={onClose}
              aria-label="Close case study"
              className="p-1.5 rounded-lg text-[#9BA3AF] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Main Editorial Content Container */}
        <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-8 py-10 sm:py-16 space-y-16">
          {/* Section 0: Project Header */}
          <section id="overview" className="space-y-6">
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#9BA3AF]">
              <span className="px-2.5 py-0.5 rounded bg-white/5 border border-white/10 font-semibold text-[#1D9E75]">
                {project.category}
              </span>
              <span>·</span>
              <span>{project.year}</span>
              <span>·</span>
              <span>{project.clientOrOrg}</span>
              {project.buildDuration && (
                <>
                  <span>·</span>
                  <span className="text-[#C7F36B]">{project.buildDuration}</span>
                </>
              )}
            </div>

            {project.awardOrBadge && (
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F26522]/10 border border-[#F26522]/30 text-[#F26522] text-xs font-mono font-semibold rounded-md">
                <Award className="w-3.5 h-3.5" />
                <span>{project.awardOrBadge}</span>
              </div>
            )}

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight leading-[1.08]">
              {project.title}
            </h1>

            <p className="text-lg sm:text-xl text-[#9BA3AF] font-sans leading-relaxed">
              {project.subtitle}
            </p>

            {/* Quick Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10 text-xs">
              <div>
                <span className="block font-mono text-[#6B7280] uppercase tracking-wider mb-1">
                  My Role
                </span>
                <span className="text-white font-medium">{project.role}</span>
              </div>
              <div>
                <span className="block font-mono text-[#6B7280] uppercase tracking-wider mb-1">
                  Timeline
                </span>
                <span className="text-white font-medium">{project.buildDuration || 'Sprints'}</span>
              </div>
              <div>
                <span className="block font-mono text-[#6B7280] uppercase tracking-wider mb-1">
                  Client / Context
                </span>
                <span className="text-white font-medium">{project.clientOrOrg}</span>
              </div>
              <div>
                <span className="block font-mono text-[#6B7280] uppercase tracking-wider mb-1">
                  Stack
                </span>
                <span className="text-white font-medium truncate block">
                  {project.technologies.slice(0, 3).join(', ')}
                </span>
              </div>
            </div>

            {/* Production Web Mockup Showcase */}
            {project.mockupImage && (
              <div className="pt-4 flex justify-center">
                <div className="max-w-4xl w-full">
                  <img
                    src={project.mockupImage}
                    alt={`${project.title} Application Mockup`}
                    className="w-full h-auto object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.45)]"
                  />
                </div>
              </div>
            )}
          </section>

          {/* Section 1: Quantitative Proof & Metrics */}
          {project.metrics && project.metrics.length > 0 && (
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {project.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="p-5 rounded-xl bg-[#171A21] border border-white/[0.08] relative overflow-hidden"
                >
                  <div className="text-3xl sm:text-4xl font-display font-bold text-white mb-1">
                    {metric.value}
                  </div>
                  <div className="text-xs font-mono text-[#9BA3AF]">{metric.label}</div>
                  <div className="absolute top-0 right-0 w-16 h-16 bg-[#1D9E75]/5 rounded-bl-full pointer-events-none" />
                </div>
              ))}
            </section>
          )}

          {/* Section 2: Selective Warm Paper Contrast Container for Design Artifacts & Challenge */}
          <section className="warm-paper-surface p-6 sm:p-10 rounded-2xl border border-[#E5E0D5] space-y-8 shadow-xl text-[#121417]">
            <div className="flex items-center justify-between border-b border-[#D8D2C5] pb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider font-bold text-[#1D9E75]">
                  Editorial Case Spec
                </span>
                <h3 className="text-2xl font-display font-bold text-[#121417] mt-0.5">
                  The Problem &amp; Design Solution
                </h3>
              </div>
              <span className="px-2.5 py-1 bg-black/5 rounded text-xs font-mono font-semibold text-[#52525B]">
                01. Strategy
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#B91C1C] uppercase tracking-wider">
                  <AlertCircle className="w-4 h-4" />
                  <span>The Challenge</span>
                </div>
                <p className="text-sm leading-relaxed text-[#27272A] font-sans">
                  {project.problem}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#047857] uppercase tracking-wider">
                  <TrendingUp className="w-4 h-4" />
                  <span>The Solution</span>
                </div>
                <p className="text-sm leading-relaxed text-[#27272A] font-sans">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Constraints & Strategic Trade-offs */}
            {project.constraints && project.constraints.length > 0 && (
              <div className="pt-6 border-t border-[#D8D2C5] grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-mono font-bold text-[#52525B] uppercase tracking-wider mb-2.5">
                    Constraints &amp; Boundary Conditions
                  </h4>
                  <ul className="space-y-2">
                    {project.constraints.map((c, i) => (
                      <li key={i} className="text-xs text-[#3F3F46] flex items-start gap-2">
                        <span className="text-[#1D9E75] font-bold font-mono">/</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {project.tradeoffs && project.tradeoffs.length > 0 && (
                  <div>
                    <h4 className="text-xs font-mono font-bold text-[#52525B] uppercase tracking-wider mb-2.5">
                      Key Decisions &amp; Trade-Offs
                    </h4>
                    <ul className="space-y-2">
                      {project.tradeoffs.map((t, i) => (
                        <li key={i} className="text-xs text-[#3F3F46] flex items-start gap-2">
                          <span className="text-[#F26522] font-bold font-mono">→</span>
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </section>

          {/* Section 3: In-Depth Narrative Sections */}
          {project.caseStudySections && project.caseStudySections.length > 0 && (
            <section className="space-y-12">
              {project.caseStudySections.map((sec, idx) => (
                <div
                  key={idx}
                  className="p-6 sm:p-8 rounded-xl bg-[#171A21] border border-white/[0.08] space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                      {sec.title}
                    </h3>
                    <span className="text-xs font-mono text-[#6B7280]">
                      Phase {idx + 1}
                    </span>
                  </div>

                  {sec.subtitle && (
                    <p className="text-sm font-mono text-[#1D9E75]">{sec.subtitle}</p>
                  )}

                  <div className="space-y-3 pt-2 text-sm text-[#9BA3AF] leading-relaxed">
                    {sec.content.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}
                  </div>

                  {sec.takeaways && sec.takeaways.length > 0 && (
                    <div className="mt-4 p-4 rounded-lg bg-black/30 border border-white/[0.06] space-y-2">
                      <span className="text-xs font-mono text-[#C7F36B] font-semibold uppercase tracking-wider block">
                        Verified Findings
                      </span>
                      <ul className="space-y-1.5">
                        {sec.takeaways.map((takeaway, tIdx) => (
                          <li
                            key={tIdx}
                            className="text-xs text-[#D1D5DB] flex items-start gap-2"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#1D9E75] shrink-0 mt-0.5" />
                            <span>{takeaway}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Section 4: Deliverables & Interface Architecture Highlights */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-[#171A21] border border-white/[0.08] space-y-3">
              <h3 className="text-sm font-mono font-bold text-[#F5F7FA] uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#1D9E75]" />
                <span>Delivered Assets</span>
              </h3>
              <ul className="space-y-2.5 pt-2">
                {project.deliverables.map((item) => (
                  <li key={item} className="text-xs text-[#9BA3AF] flex items-start gap-2.5">
                    <span className="text-[#1D9E75] font-mono">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-xl bg-[#171A21] border border-white/[0.08] space-y-3">
              <h3 className="text-sm font-mono font-bold text-[#F5F7FA] uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C7F36B]" />
                <span>Interface &amp; UX Details</span>
              </h3>
              <ul className="space-y-2.5 pt-2">
                {project.wireframeHighlights.map((item) => (
                  <li key={item} className="text-xs text-[#9BA3AF] flex items-start gap-2.5">
                    <span className="text-[#C7F36B] font-mono">·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Section 5: Bottom CTA & Navigation */}
          <section className="pt-8 pb-12 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-[#6B7280] block mb-1">
                Looking for a similar product build?
              </span>
              <p className="text-sm text-[#F5F7FA] font-medium">
                Let&apos;s discuss strategy, UX flows, and engineering execution.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-lg text-xs font-mono text-[#9BA3AF] hover:text-white border border-white/10 hover:bg-white/5 transition-colors cursor-pointer"
              >
                Close Case Study
              </button>

              <button
                onClick={() => {
                  onClose();
                  onInquireProject(project.title);
                }}
                className="px-5 py-2.5 rounded-lg text-xs font-mono font-semibold bg-[#1D9E75] hover:bg-[#22B586] text-white transition-colors cursor-pointer"
              >
                Inquire About This Work
              </button>
            </div>
          </section>
        </main>
      </motion.div>
    </AnimatePresence>
  );
};
