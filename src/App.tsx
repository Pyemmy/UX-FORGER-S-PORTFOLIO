import React, { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { PROJECTS, ProjectItem } from './data/portfolioData';
import { ToastProvider } from './components/ui/Toast';
import { SectionHeader } from './components/ui/SectionHeader';
import { SiteHeader } from './components/layout/SiteHeader';
import { Hero } from './components/sections/Hero';
import { WorkSection } from './components/sections/WorkSection';
import { CapabilitiesSection } from './components/sections/CapabilitiesSection';
import { AboutSection } from './components/sections/AboutSection';
import { PlaygroundSection } from './components/sections/PlaygroundSection';
import { ContactFooter } from './components/sections/ContactFooter';
import { CompanyBricks } from './components/CompanyBricks';
import { TestimonialCarousel } from './components/TestimonialCarousel';
import { InteractiveChatPhone } from './components/InteractiveChatPhone';

// Overlays are code-split: they load in the background after first paint.
const loadCaseStudy = () => import('./components/FullScreenCaseStudy');
const loadResume = () => import('./components/ResumeModal');
const loadConsole = () => import('./components/ForgeConsole');
const FullScreenCaseStudy = lazy(() => loadCaseStudy().then((m) => ({ default: m.FullScreenCaseStudy })));
const ResumeModal = lazy(() => loadResume().then((m) => ({ default: m.ResumeModal })));
const ForgeConsole = lazy(() => loadConsole().then((m) => ({ default: m.ForgeConsole })));

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const projectFromHash = (hash: string) => {
  if (!hash.startsWith('#work/')) return null;
  const slug = decodeURIComponent(hash.slice('#work/'.length)).toLowerCase();
  return PROJECTS.find((p) => p.slug === slug || p.id === slug) ?? null;
};

export default function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  // Keep each overlay mounted after its first use so exit animations can play
  const [mounted, setMounted] = useState({ caseStudy: false, resume: false, console: false });
  const pushedHash = useRef(false);
  const overlayOpen = Boolean(selectedProject) || isResumeOpen || isConsoleOpen;

  useEffect(() => {
    if (selectedProject) setMounted((m) => (m.caseStudy ? m : { ...m, caseStudy: true }));
    if (isResumeOpen) setMounted((m) => (m.resume ? m : { ...m, resume: true }));
    if (isConsoleOpen) setMounted((m) => (m.console ? m : { ...m, console: true }));
  }, [selectedProject, isResumeOpen, isConsoleOpen]);

  // Warm the overlay chunks once the page is idle so they open instantly
  useEffect(() => {
    const warm = () => {
      loadCaseStudy();
      loadResume();
      loadConsole();
    };
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    if (w.requestIdleCallback) w.requestIdleCallback(warm);
    else window.setTimeout(warm, 1500);
  }, []);

  // ⌘K / Ctrl+K toggles the command console
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsConsoleOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Deep links: #work/<slug> opens a case study; browser back closes it
  useEffect(() => {
    // Read the hash after hydration so the pre-rendered HTML always matches
    const initial = projectFromHash(window.location.hash);
    if (initial) setSelectedProject(initial);
    const onHash = () => {
      const project = projectFromHash(window.location.hash);
      setSelectedProject(project);
      if (!project) pushedHash.current = false;
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // Off-screen sections use content-visibility (estimated heights until rendered), so a long
  // jump can stop short as sections expand mid-scroll. After each scroll settles, correct
  // course until the target sits under the header (max 4 passes).
  const navToken = useRef(0);
  const navigate = useCallback((id: string) => {
    const behavior: ScrollBehavior = prefersReducedMotion() ? 'auto' : 'smooth';
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior });
      history.replaceState(null, '', window.location.pathname + window.location.search);
      return;
    }
    const el = document.getElementById(id);
    if (!el) return;
    const token = ++navToken.current;
    const offset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 96;

    const go = (pass: number) => {
      el.scrollIntoView({ behavior, block: 'start' });
      let timer = 0;
      const check = () => {
        window.removeEventListener('scrollend', check);
        window.clearTimeout(timer);
        if (token !== navToken.current) return; // a newer navigation took over
        const delta = el.getBoundingClientRect().top - offset;
        // Only give up early if the target is still below us and the page can't scroll further
        const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
        const stuck = delta > 0 && atBottom;
        if (Math.abs(delta) > 6 && !stuck && pass < 4) go(pass + 1);
      };
      window.addEventListener('scrollend', check, { once: true });
      // Fallback for browsers without `scrollend`, or when no scroll was needed
      timer = window.setTimeout(check, behavior === 'smooth' ? 1400 : 120);
    };
    go(1);
    history.replaceState(null, '', `#${id}`);
  }, []);

  const openProject = useCallback((project: ProjectItem) => {
    const hash = `#work/${project.slug}`;
    if (projectFromHash(window.location.hash)) {
      // Switching between case studies: don't stack history entries
      history.replaceState(null, '', hash);
    } else {
      history.pushState(null, '', hash);
      pushedHash.current = true;
    }
    setSelectedProject(project);
  }, []);

  const closeProject = useCallback(() => {
    if (pushedHash.current) {
      pushedHash.current = false;
      history.back(); // fires hashchange → clears the selection
    } else {
      history.replaceState(null, '', window.location.pathname + window.location.search);
      setSelectedProject(null);
    }
  }, []);

  const inquire = useCallback(() => {
    closeProject();
    window.setTimeout(() => navigate('contact'), 380);
  }, [closeProject, navigate]);

  const openProjectBySlug = useCallback(
    (slug: string) => {
      const project = PROJECTS.find((p) => p.slug === slug || p.id === slug);
      if (project) openProject(project);
    },
    [openProject],
  );

  return (
    <MotionConfig reducedMotion="user">
      <ToastProvider>
        <a href="#main" className="skip-link rounded-full bg-ink px-4 py-2 font-mono text-xs font-bold text-white">
          Skip to content
        </a>

        {/* Background is inert while an overlay is open: no focus or screen-reader access behind dialogs */}
        <div className="min-h-screen bg-paper text-ink" inert={overlayOpen || undefined}>
          <SiteHeader onNavigate={navigate} onOpenConsole={() => setIsConsoleOpen(true)} />

          <main id="main" tabIndex={-1} className="outline-none">
            <Hero onNavigate={navigate} />
            <WorkSection onOpenProject={openProject} />
            <CapabilitiesSection />
            <AboutSection onNavigate={navigate} />

            <section id="experience" aria-labelledby="experience-title" className="cv-auto mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
              <SectionHeader
                id="experience-title"
                accent="#EE5828"
                kicker="Career history"
                title="Where I've been"
                subtitle="A stack of the teams and communities I've built with. Tap a brick to see my role, impact and tools."
              />
              <CompanyBricks />
            </section>

            <section id="testimonials" aria-labelledby="testimonials-title" className="cv-auto mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
              <TestimonialCarousel />
            </section>

            <PlaygroundSection onOpenProject={openProject} />

            <section id="ask" aria-labelledby="ask-title" className="cv-auto mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-24">
              <SectionHeader
                id="ask-title"
                accent="#9B8AF5"
                kicker="Studio concierge"
                title="Ask The UX Forger"
                subtitle="A playful chat to check availability, explore project decisions or grab my CV. Tap a suggestion or type a question."
              />
              <InteractiveChatPhone
                onOpenResumeModal={() => setIsResumeOpen(true)}
                onOpenContactForm={() => navigate('contact')}
                onSelectProject={openProjectBySlug}
              />
            </section>
          </main>

          <ContactFooter onOpenResume={() => setIsResumeOpen(true)} onNavigate={navigate} />
        </div>

        <Suspense fallback={null}>
          {mounted.caseStudy && (
            <FullScreenCaseStudy
              project={selectedProject}
              onClose={closeProject}
              onNavigateProject={openProject}
              onInquire={inquire}
            />
          )}
          {mounted.resume && <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />}
          {mounted.console && (
            <ForgeConsole
              isOpen={isConsoleOpen}
              onClose={() => setIsConsoleOpen(false)}
              onNavigateSection={navigate}
              onOpenProject={openProject}
              onOpenResumeModal={() => setIsResumeOpen(true)}
            />
          )}
        </Suspense>
      </ToastProvider>
    </MotionConfig>
  );
}
