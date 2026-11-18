import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'motion/react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Award,
  Sparkles,
  Layers,
  Terminal,
  FileText,
  Download,
  Mail,
  Copy,
  Check,
  CheckCircle2,
  Clock,
  Compass,
  Zap,
  Globe,
  Send,
  Code2,
  Command,
  Search,
  MessageSquare,
  Smile,
  Gamepad2,
  Briefcase,
  Menu,
  X,
} from 'lucide-react';
import {
  PERSONAL_INFO,
  AWARDS_LIST,
  PROJECTS,
  CAPABILITIES,
  EXPERIMENTS,
  TESTIMONIALS,
  ProjectItem,
  BEYOND_WORK_ITEMS,
} from './data/portfolioData';
import { MascotBuddies } from './components/MascotBuddies';
import { FrostedCanvasFrame } from './components/FrostedCanvasFrame';
import { EditorialProjectCard } from './components/EditorialProjectCard';
import { CompanyBricks } from './components/CompanyBricks';
import { InteractiveChatPhone } from './components/InteractiveChatPhone';
import { PlaygroundInteractiveToys } from './components/PlaygroundInteractiveToys';
import { TestimonialCarousel } from './components/TestimonialCarousel';
import { ForgeConsole } from './components/ForgeConsole';
import { FullScreenCaseStudy } from './components/FullScreenCaseStudy';
import { ResumeModal } from './components/ResumeModal';
import { InteractivePhotoBook } from './components/InteractivePhotoBook';
import { sounds } from './utils/audio';

export default function App() {
  // Navigation & Project Filter State
  const [activeProjectFilter, setActiveProjectFilter] = useState<'ALL' | 'SHIPPED_AI' | 'CASE_STUDY'>('ALL');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Email copy state
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Keyboard shortcut Cmd+K / Ctrl+K for Forge Console
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsConsoleOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle URL Hash deep linking for case studies (#work/:slug)
  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#work/')) {
        const slug = hash.replace('#work/', '').toLowerCase();
        const found = PROJECTS.find((p) => p.slug === slug || p.id === slug);
        if (found) {
          setSelectedProject(found);
        }
      } else if (!hash.includes('#work/')) {
        setSelectedProject(null);
      }
    };

    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const openProject = (project: ProjectItem) => {
    setSelectedProject(project);
    window.location.hash = `work/${project.slug}`;
  };

  const closeProject = () => {
    setSelectedProject(null);
    if (window.location.hash.includes('#work/')) {
      history.pushState('', document.title, window.location.pathname + window.location.search);
    }
  };

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const targetId = id === 'experiments' ? 'playground' : (id === 'about' ? 'experience' : id);
    const el = document.getElementById(targetId) || document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCopyEmail = () => {
    sounds.playChime();
    navigator.clipboard?.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  const handleInquireProject = (_projectName: string) => {
    closeProject();
    scrollToSection('contact');
    handleCopyEmail();
  };

  const filteredProjects = PROJECTS.filter((proj) => {
    if (activeProjectFilter === 'ALL') return true;
    if (activeProjectFilter === 'SHIPPED_AI') return proj.category === 'Shipped AI Build';
    if (activeProjectFilter === 'CASE_STUDY') return proj.category === 'Product Case Study';
    return true;
  });

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#F0EBE1] text-[#141618] font-sans selection:bg-[#F4C01E] selection:text-[#121316]">
        {/* =====================================================================
            1. MINIMAL, STREAMLINED NAVIGATION (Inspired by reference image 2)
           ===================================================================== */}
        <header className="sticky top-4 z-40 px-4 sm:px-6 max-w-4xl mx-auto">
          <div className="bg-[#FAF7F2]/95 backdrop-blur-md border border-[#D5CEBF] shadow-[0_8px_30px_rgba(0,0,0,0.06)] rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
            {/* Brand Logo / Text: The UX Forger with real unedited photograph */}
            <a
              href="#top"
              className="flex items-center gap-2.5 hover:opacity-85 transition-opacity shrink-0"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden border border-[#D5CEBF] bg-[#141618] shrink-0 shadow-xs ring-1 ring-black/10">
                <img
                  src="/assets/aistudio/IMG_9969_f5884aae.jpeg"
                  alt="The UX Forger"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <span className="font-display font-extrabold text-sm sm:text-base tracking-tight text-[#141618] whitespace-nowrap">
                The UX Forger
              </span>
            </a>

            {/* Exactly 5 Visible Nav Links with Color Accent Bullets (reference image 2) */}
            <nav className="hidden md:flex items-center gap-6 text-xs font-mono font-semibold text-[#52525B]">
              <a
                href="#work"
                className="hover:text-[#141618] transition-colors flex items-center gap-1.5 py-1"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#F4BE24]" />
                <span>Work</span>
              </a>
              <a
                href="#capabilities"
                className="hover:text-[#141618] transition-colors flex items-center gap-1.5 py-1"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#3062F7]" />
                <span>Expertise</span>
              </a>
              <a
                href="#about"
                className="hover:text-[#141618] transition-colors flex items-center gap-1.5 py-1"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#EE5828]" />
                <span>About</span>
              </a>
              <a
                href="#playground"
                className="hover:text-[#141618] transition-colors flex items-center gap-1.5 py-1"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#9B8AF5]" />
                <span>Playground</span>
              </a>
              <a
                href="#contact"
                className="hover:text-[#141618] transition-colors flex items-center gap-1.5 py-1"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#2FA06A]" />
                <span>Contact</span>
              </a>
            </nav>

            {/* Single Prominent CTA: Let's Talk */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => scrollToSection('contact')}
                className="px-4 sm:px-5 py-2 bg-[#F4BE24] hover:bg-[#E5AE18] text-[#141618] font-display font-bold text-xs sm:text-sm rounded-full shadow-[0_2px_10px_rgba(244,190,36,0.3)] transition-all flex items-center gap-1.5 cursor-pointer hover:scale-102 active:scale-98"
              >
                <span>Let&apos;s Talk</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Mobile Menu Hamburger Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className="md:hidden p-2 text-[#141618] hover:bg-black/5 rounded-full transition-colors cursor-pointer"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Drawer Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="md:hidden mt-2 bg-[#FAF7F2] border border-[#D5CEBF] rounded-2xl p-4 shadow-xl flex flex-col gap-3 font-mono text-xs font-bold"
              >
                <a
                  href="#work"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-xl hover:bg-[#EAE4D7] flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-[#F4BE24]" />
                  <span>Work (Selected Builds)</span>
                </a>
                <a
                  href="#capabilities"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-xl hover:bg-[#EAE4D7] flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-[#3062F7]" />
                  <span>Expertise (What I Work On)</span>
                </a>
                <a
                  href="#about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-xl hover:bg-[#EAE4D7] flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-[#EE5828]" />
                  <span>About (Story &amp; Photo Book)</span>
                </a>
                <a
                  href="#playground"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-xl hover:bg-[#EAE4D7] flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-[#9B8AF5]" />
                  <span>Playground (Lab &amp; Toys)</span>
                </a>
                <a
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-xl hover:bg-[#EAE4D7] flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-[#2FA06A]" />
                  <span>Contact &amp; Booking</span>
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        {/* =====================================================================
            2. HERO SECTION — EXACTLY FIVE MASCOTS IN CIRCULAR FORMATION
           ===================================================================== */}
        <section id="top" className="relative pt-16 sm:pt-24 pb-20 px-4 sm:px-6 max-w-4xl mx-auto text-center">
          {/* Status Kicker Badge */}
          <div className="relative mb-6 flex items-center justify-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#EAE4D7] border border-[#D5CEBF] rounded-full text-xs font-mono text-[#52525B] relative z-10 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#2FA06A] animate-pulse" />
              <span>Product Designer &amp; Design Engineer · Lagos / Remote</span>
            </div>
          </div>

          {/* Big Block Letters Headline with circular mascot orbit around it */}
          <div className="relative flex flex-wrap items-center justify-center gap-2 sm:gap-3.5 max-w-3xl mx-auto mb-8 font-display">
            {/* The 5 Floating Mascots in Circular Formation */}
            <MascotBuddies />

            {/* [I design] block - Royal Blue */}
            <motion.span
              whileHover={{ scale: 1.05, rotate: -2 }}
              whileTap={{ scale: 0.96 }}
              className="px-5 sm:px-7 py-2.5 sm:py-3.5 bg-[#3062F7] text-white text-3xl sm:text-5xl lg:text-6xl font-extrabold rounded-2xl shadow-sm -rotate-1 select-none cursor-pointer"
            >
              I design
            </motion.span>

            {/* [products] block - Golden Yellow */}
            <motion.span
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.96 }}
              className="px-5 sm:px-7 py-2.5 sm:py-3.5 bg-[#F4BE24] text-[#121316] text-3xl sm:text-5xl lg:text-6xl font-extrabold rounded-2xl shadow-sm rotate-1 select-none cursor-pointer"
            >
              products
            </motion.span>

            {/* [and I] block - Warm Paper Outline */}
            <motion.span
              whileHover={{ scale: 1.05, rotate: -1 }}
              whileTap={{ scale: 0.96 }}
              className="px-5 sm:px-7 py-2.5 sm:py-3.5 bg-[#FAF7F2] text-[#141618] border-2 border-[#D5CEBF] text-3xl sm:text-5xl lg:text-6xl font-extrabold rounded-2xl shadow-sm -rotate-1 select-none cursor-pointer"
            >
              and I
            </motion.span>

            {/* [ship them.] block - Terracotta Coral */}
            <motion.span
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.96 }}
              className="px-5 sm:px-7 py-2.5 sm:py-3.5 bg-[#EE5828] text-white text-3xl sm:text-5xl lg:text-6xl font-extrabold rounded-2xl shadow-sm rotate-1 select-none cursor-pointer"
            >
              ship them.
            </motion.span>
          </div>

          {/* Subtitle Statement with Breathing Room for Future Photo */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="text-base sm:text-xl text-[#52525B] max-w-2xl mx-auto leading-relaxed mb-8 font-sans font-medium"
          >
            I solve product problems, shape intuitive user experiences, and get involved in building them too. Bridging product thinking, Figma design systems, and rapid front-end engineering.
          </motion.p>

          {/* Primary CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
            <button
              onClick={() => scrollToSection('contact')}
              className="px-6 py-3 bg-[#141618] hover:bg-[#3062F7] text-white text-xs sm:text-sm font-display font-bold rounded-full shadow-md transition-all cursor-pointer flex items-center gap-2 group"
            >
              <span>Let&apos;s build together</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => scrollToSection('work')}
              className="px-6 py-3 bg-white hover:bg-[#FAF7F2] text-[#141618] border border-[#D5CEBF] text-xs sm:text-sm font-semibold rounded-full shadow-xs transition-all cursor-pointer flex items-center gap-2"
            >
              <span>See the work</span>
              <ArrowDown className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Proof Badges Strip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="mt-12 pt-6 border-t border-[#D5CEBF]/60 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs font-mono"
          >
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#D5CEBF] shadow-xs text-[#141618]">
              <Award className="w-3.5 h-3.5 text-[#3062F7]" />
              <span className="font-bold">1st Runner Up (14 teams)</span>
              <span className="text-[#71717A]">· UNILAG SERVICOM</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#D5CEBF] shadow-xs text-[#141618]">
              <Sparkles className="w-3.5 h-3.5 text-[#F4BE24]" />
              <span className="font-bold">Honourable Mention</span>
              <span className="text-[#71717A]">· BuildVerse Hackathon</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#D5CEBF] shadow-xs text-[#141618]">
              <Zap className="w-3.5 h-3.5 text-[#2FA06A]" />
              <span className="font-bold">10+ Hackathons Shipped</span>
              <span className="text-[#71717A]">· Rapid AI Prototyping</span>
            </div>
          </motion.div>
        </section>

        {/* =====================================================================
            3. SELECTED WORK — EDITORIAL STUDIO-BOARD CARDS WITH BREAKOUT MOCKUPS
           ===================================================================== */}
        <section id="work" className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="flex items-center justify-center gap-2 text-3xl sm:text-5xl font-serif font-black text-[#141618] tracking-tight mb-2">
              <span>Selected Works</span>
              <span className="text-2xl sm:text-3xl font-normal text-[#C2410C]">↗</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#EAE4D7] rounded-full text-xs font-mono font-semibold text-[#52525B]">
              <span>{PROJECTS.length} BUILDS &amp; CASE STUDIES</span>
              <span>·</span>
              <span>EDITORIAL STUDIO DECK</span>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
              <button
                onClick={() => setActiveProjectFilter('ALL')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                  activeProjectFilter === 'ALL'
                    ? 'bg-[#141618] text-white shadow-xs'
                    : 'bg-white text-[#52525B] hover:text-[#141618] border border-[#D5CEBF]'
                }`}
              >
                All Projects ({PROJECTS.length})
              </button>
              <button
                onClick={() => setActiveProjectFilter('SHIPPED_AI')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                  activeProjectFilter === 'SHIPPED_AI'
                    ? 'bg-[#C2410C] text-white shadow-xs'
                    : 'bg-white text-[#52525B] hover:text-[#141618] border border-[#D5CEBF]'
                }`}
              >
                ⚡ Shipped AI Builds (5)
              </button>
              <button
                onClick={() => setActiveProjectFilter('CASE_STUDY')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                  activeProjectFilter === 'CASE_STUDY'
                    ? 'bg-[#2FA06A] text-white shadow-xs'
                    : 'bg-white text-[#52525B] hover:text-[#141618] border border-[#D5CEBF]'
                }`}
              >
                📐 Product Case Studies (5)
              </button>
            </div>
          </div>

          {/* Editorial Cards Deck with Breakout Mockups */}
          <div className="space-y-16 sm:space-y-24">
            {filteredProjects.map((project, idx) => (
              <EditorialProjectCard
                key={project.id}
                project={project}
                index={idx}
                onOpenCaseStudy={openProject}
              />
            ))}
          </div>
        </section>

        {/* =====================================================================
            4. "WHAT I WORK ON" (Capabilities)
           ===================================================================== */}
        <section id="capabilities" className="py-20 px-4 sm:px-6 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-[#141618] tracking-tight mb-2">
              What I work on
            </h2>
            <p className="text-xs sm:text-sm text-[#71717A] max-w-lg mx-auto">
              I partner with founders, engineering leads, and product teams across the full lifecycle from early problem framing to functional code.
            </p>
          </div>

          <div className="space-y-4">
            {CAPABILITIES.map((cap) => (
              <motion.div
                key={cap.id}
                whileHover={{ y: -2 }}
                className="bg-white rounded-2xl p-6 border border-[#E0D9CC] shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-start justify-between gap-6"
              >
                <div className="flex items-start gap-4 flex-1">
                  <span className="text-3xl select-none">{cap.emoji}</span>
                  <div>
                    <h3 className="font-display font-bold text-xl text-[#141618] mb-1">
                      {cap.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed mb-3">
                      {cap.summary}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {cap.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 bg-[#FAF7F2] text-[#52525B] text-[11px] font-mono rounded-md border border-[#E0D9CC]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="md:w-64 shrink-0 border-t md:border-t-0 md:border-l border-[#F0EBE1] pt-3 md:pt-0 md:pl-6 space-y-1.5 text-xs text-[#71717A]">
                  <div className="font-mono font-bold text-[10px] text-[#141618] tracking-wider uppercase mb-1">
                    Deliverables:
                  </div>
                  {cap.outcomes.map((out, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <span className="text-[#2FA06A] font-bold">✓</span>
                      <span>{out}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* =====================================================================
            5. DEDICATED "ABOUT" SECTION — WHO I AM, BEYOND WORK & PHOTO BOOK
           ===================================================================== */}
        <section id="about" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto">
          {/* Section Kicker & Title */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#FAF7F2] border border-[#D5CEBF] rounded-full text-xs font-mono font-bold text-[#EE5828] mb-3 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#EE5828]" />
              <span>THE PERSON BEHIND THE WORK</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-[#141618] tracking-tight mb-3">
              About me &amp; my journey
            </h2>
            <p className="text-sm sm:text-base text-[#52525B] max-w-2xl mx-auto leading-relaxed">
              Product Designer, Product Engineer, founder of Forge Academy, and hackathon competitor. I design products with deep user empathy and ship them directly in code.
            </p>
          </div>

          {/* Part A: Personal Story & Narrative Bento */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16">
            {/* Left Narrative Box */}
            <div className="md:col-span-7 bg-white rounded-3xl border-2 border-[#141618] p-6 sm:p-8 shadow-[6px_6px_0px_#141618] space-y-4">
              <div className="flex items-center justify-between border-b border-[#F0EBE1] pb-3 text-xs font-mono text-[#71717A]">
                <span className="font-bold text-[#141618]">A. Introduction · Who I Am</span>
                <span>Lagos, NG · UNILAG</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-display font-bold text-[#141618] tracking-tight">
                Designing with intention, engineering with speed, and teaching in the open.
              </h3>

              <div className="space-y-3 text-xs sm:text-sm text-[#3F3F46] font-sans leading-relaxed">
                <p>
                  I’m <strong className="text-[#141618]">Opeyemi (The UX Forger)</strong>. As a Product Designer and Design Engineer studying Industrial Mathematics at the University of Lagos, I approach digital experiences through a dual lens: mathematical system modeling and human behavioral empathy.
                </p>
                <p>
                  I believe the gap between design and engineering is where great products are won or lost. Instead of handing off static rectangles and hoping for the best, I prototype directly in code, test edge cases with real data, and deploy functional MVPs under hackathon constraints.
                </p>
                <p>
                  Beyond personal building, I founded <strong className="text-[#141618]">Forge Academy</strong>—a hands-on design and tech academy where I mentor cohorts of ambitious young creators through real product teardowns, design systems, and modern AI acceleration.
                </p>
              </div>

              {/* Personal Proof Metrics */}
              <div className="pt-4 border-t border-[#F0EBE1] grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#EFE9DC]">
                  <div className="font-display font-black text-lg sm:text-xl text-[#3062F7]">2x</div>
                  <div className="text-[10px] font-mono text-[#71717A] uppercase font-bold">Award Winner</div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#EFE9DC]">
                  <div className="font-display font-black text-lg sm:text-xl text-[#2FA06A]">10+</div>
                  <div className="text-[10px] font-mono text-[#71717A] uppercase font-bold">Hackathons Shipped</div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#EFE9DC]">
                  <div className="font-display font-black text-lg sm:text-xl text-[#EE5828]">10+</div>
                  <div className="text-[10px] font-mono text-[#71717A] uppercase font-bold">Students Mentored</div>
                </div>
              </div>
            </div>

            {/* Right Side: Philosophy & Math Background Bento */}
            <div className="md:col-span-5 flex flex-col justify-between gap-4">
              <div className="bg-[#FAF7F2] rounded-3xl border-2 border-[#141618] p-6 shadow-[6px_6px_0px_#141618] flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="text-xs font-mono font-bold text-[#EE5828] uppercase tracking-wider flex items-center gap-1.5">
                    <span>⚡</span>
                    <span>The Philosophy</span>
                  </div>
                  <blockquote className="text-base sm:text-lg font-serif italic text-[#141618] leading-snug">
                    &ldquo;I design products and I ship them. The best way to understand constraints is to build inside them.&rdquo;
                  </blockquote>
                  <p className="text-xs text-[#52525B] font-sans">
                    Every interface is a hypothesis until a real user clicks, hesitates, or completes their goal.
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#D5CEBF] flex items-center justify-between text-xs font-mono text-[#71717A]">
                  <span>Founder · Forge Academy</span>
                  <a
                    href="#experience"
                    className="text-[#141618] font-bold hover:underline underline-offset-4 flex items-center gap-1"
                  >
                    <span>Career Bricks</span>
                    <span>↓</span>
                  </a>
                </div>
              </div>

              {/* UNILAG Math Connection */}
              <div className="bg-white rounded-2xl border-2 border-[#141618] p-4 shadow-[4px_4px_0px_#141618] flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#3062F7]/10 border border-[#3062F7]/30 flex items-center justify-center text-[#3062F7] text-lg shrink-0 font-mono font-bold">
                  ∫dx
                </div>
                <div>
                  <div className="font-display font-bold text-xs text-[#141618]">
                    Industrial Mathematics @ UNILAG
                  </div>
                  <div className="text-[11px] font-mono text-[#71717A]">
                    Applying algorithms, systems thinking &amp; logic to UI architecture.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Part B: Beyond Work (Personal Interests) */}
          <div className="mb-16">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
              <div>
                <div className="text-xs font-mono font-bold text-[#EE5828] uppercase tracking-wider mb-1">
                  B. Beyond the Screen
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-[#141618] tracking-tight">
                  Life off the keyboard
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#71717A] max-w-sm">
                Interests that keep my mind curious, grounded, and refreshed.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {BEYOND_WORK_ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border-2 border-[#141618] p-5 shadow-[4px_4px_0px_#141618] bg-white flex flex-col justify-between hover:-translate-y-1 hover:shadow-[5px_5px_0px_#141618] transition-all"
                >
                  <div className="space-y-2.5">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xl border border-black/10"
                      style={{ backgroundColor: item.bgTint }}
                    >
                      <span>{item.emoji}</span>
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-base text-[#141618] leading-tight">
                        {item.title}
                      </h4>
                      <div className="text-[11px] font-mono font-semibold text-[#71717A] mt-0.5">
                        {item.tagline}
                      </div>
                    </div>
                    <p className="text-xs text-[#52525B] leading-relaxed font-sans">
                      {item.description}
                    </p>
                  </div>

                  <div
                    className="pt-3 mt-3 border-t border-[#F0EBE1] flex items-center gap-1.5 text-[10px] font-mono font-bold"
                    style={{ color: item.color }}
                  >
                    <span>●</span>
                    <span className="uppercase">Personal Pursuit</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Part C: The Interactive Photo Book ("The Person Behind the Work") */}
          <div className="pt-4">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141618] text-white text-xs font-mono font-bold mb-2">
                <span>📖</span>
                <span>C. My Journey · Interactive Photo Book</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-[#141618] tracking-tight">
                Flip through memorable moments
              </h3>
              <p className="text-xs sm:text-sm text-[#71717A] max-w-lg mx-auto mt-1">
                An interactive physical book documenting milestones, stage presentations, cohort workshops, and stories along the way. Click the cover to open and explore.
              </p>
            </div>

            {/* The Photo Book Component */}
            <InteractivePhotoBook />
          </div>

          {/* Contextual Jump Link to Experience Bricks */}
          <div className="mt-12 p-4 rounded-2xl bg-[#EFE9DC] border-2 border-[#141618] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left shadow-xs">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🧱</span>
              <div>
                <div className="font-display font-bold text-xs sm:text-sm text-[#141618]">
                  Looking for my formal employment history &amp; company contributions?
                </div>
                <div className="text-[11px] font-mono text-[#71717A]">
                  Explore the 3D career brick stack below featuring EcoVest, Forge Academy, Ventics AI &amp; more.
                </div>
              </div>
            </div>
            <a
              href="#experience"
              className="px-4 py-2 rounded-xl bg-[#141618] text-white font-mono font-bold text-xs hover:bg-[#27272A] transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>Explore Career Bricks</span>
              <span>↓</span>
            </a>
          </div>
        </section>

        {/* =====================================================================
            6. "WHERE I'VE BEEN" (Interactive 3D Lego Bricks)
           ===================================================================== */}
        <section id="experience" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-[#141618] tracking-tight mb-2">
              Where I&apos;ve been
            </h2>
            <p className="text-xs sm:text-sm text-[#71717A] max-w-md mx-auto">
              Interactive career brick stack. Click any brick to reveal my role, timeline, and key contributions.
            </p>
          </div>

          <CompanyBricks />
        </section>

        {/* =====================================================================
            6. "WORD OF MOUTH" — HORIZONTAL SNAP CAROUSEL (Option 1)
           ===================================================================== */}
        <section id="testimonials" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto">
          <TestimonialCarousel />
        </section>

        {/* =====================================================================
            7. "PLAYGROUND" (Clear Intro, Status Badges & Interactive Toys)
           ===================================================================== */}
        <section id="playground" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 text-2xl sm:text-4xl font-display font-extrabold text-[#141618] tracking-tight mb-2">
              <span>🕹️</span>
              <span>Playground &amp; Lab</span>
            </div>
            <p className="text-xs sm:text-sm text-[#52525B] max-w-xl mx-auto leading-relaxed">
              A dedicated workshop for creative engineering, micro-interaction physics, design tokens, and functional prototypes. Built to test ideas in the open and share tools with the builder community.
            </p>
          </div>

          {/* Experiment Cards with Status Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            {EXPERIMENTS.map((exp) => (
              <motion.div
                key={exp.id}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-6 border border-[#E0D9CC] shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full text-white"
                      style={{ backgroundColor: exp.color }}
                    >
                      {exp.status}
                    </span>
                    <span className="text-xs font-mono text-[#71717A]">{exp.duration}</span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-[#141618] mb-1">
                    {exp.title}
                  </h3>
                  <p className="text-xs text-[#52525B] leading-relaxed mb-3">
                    {exp.description}
                  </p>

                  {/* What it is, does, why */}
                  <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EAE4D7] space-y-1.5 text-[11px] font-mono text-[#52525B] mb-3">
                    <div>
                      <strong className="text-[#141618]">What:</strong> {exp.whatItIs}
                    </div>
                    <div>
                      <strong className="text-[#141618]">Why:</strong> {exp.whyItExists}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {exp.stack.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 bg-[#F0EBE1] text-[10px] font-mono text-[#52525B] rounded"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {exp.liveUrl && (
                  <div className="pt-3 border-t border-[#F0EBE1] flex justify-end">
                    <a
                      href={exp.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#3062F7] hover:underline"
                    >
                      <span>Launch Prototype</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Real Interactive Playground Toys */}
          <PlaygroundInteractiveToys />
        </section>

        {/* =====================================================================
            8. "ASK THE UX FORGER" — SMARTPHONE CONCIERGE (reference image 1)
           ===================================================================== */}
        <section className="py-20 px-4 sm:px-6 max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FAF7F2] border border-[#D5CEBF] rounded-full text-xs font-mono text-[#52525B] mb-2 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#EE5828]" />
              <span>STUDIO CONCIERGE</span>
            </div>
            <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-[#141618] tracking-tight">
              Ask The UX Forger
            </h3>
            <p className="text-xs sm:text-sm text-[#71717A] mt-1.5 max-w-md mx-auto">
              Simulate an interactive conversation. Check availability, explore project decisions, or grab my verified CV.
            </p>
          </div>

          <InteractiveChatPhone
            onOpenResumeModal={() => setIsResumeModalOpen(true)}
            onOpenContactForm={() => scrollToSection('contact')}
            onSelectProject={(slug) => {
              const proj = PROJECTS.find((p) => p.slug === slug || p.id === slug);
              if (proj) openProject(proj);
            }}
          />
        </section>

        {/* =====================================================================
            9. CLOSING FOOTER SECTION (Inspired by reference image)
           ===================================================================== */}
        <footer id="contact" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto">
          {/* The Sunny Yellow Neo-Brutalist Card */}
          <div className="relative bg-[#FFCC33] border-[3px] border-[#141618] rounded-[2.5rem] p-8 sm:p-14 lg:p-16 shadow-[8px_8px_0px_#141618] flex flex-col items-center justify-center text-center overflow-hidden">
            {/* Pink Corner Sparkle Star (Top Left) */}
            <div className="absolute top-5 left-5 sm:top-7 sm:left-7 -rotate-12 pointer-events-none select-none">
              <svg viewBox="0 0 44 44" className="w-9 h-9 sm:w-11 sm:h-11" fill="none">
                <path
                  d="M22 2 C22 13, 29 20, 42 22 C29 24, 22 31, 22 42 C22 31, 15 24, 2 22 C15 20, 22 13, 22 2 Z"
                  fill="#FF758F"
                  stroke="#141618"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Mint Teal Corner Sparkle Star (Bottom Right) */}
            <div className="absolute bottom-5 right-5 sm:bottom-7 sm:right-7 rotate-12 pointer-events-none select-none">
              <svg viewBox="0 0 44 44" className="w-9 h-9 sm:w-11 sm:h-11" fill="none">
                <path
                  d="M22 2 C22 13, 29 20, 42 22 C29 24, 22 31, 22 42 C22 31, 15 24, 2 22 C15 20, 22 13, 22 2 Z"
                  fill="#4FD1C5"
                  stroke="#141618"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Casual Handwritten Kicker */}
            <p className="font-serif italic text-lg sm:text-2xl text-[#141618] font-medium tracking-tight mb-2 select-none">
              got an idea?
            </p>

            {/* Massive Bold Headline */}
            <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-[#141618] tracking-tight leading-[1.08] max-w-2xl mb-4">
              Let&apos;s build something fun.
            </h2>

            {/* Email with Copy Icon & Signature Squiggly Wavy Underline */}
            <div className="flex flex-col items-center justify-center my-4 group">
              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm md:text-base font-bold text-[#141618] hover:opacity-85 transition-opacity cursor-pointer px-3 py-1 rounded-full hover:bg-black/5"
                title="Click to copy email address"
              >
                <span>uxforger@gmail.com</span>
                {copiedEmail ? (
                  <Check className="w-4 h-4 text-[#1E7B4F]" />
                ) : (
                  <Copy className="w-4 h-4 text-[#141618]" />
                )}
                {copiedEmail && (
                  <span className="text-[10px] font-mono font-bold bg-[#141618] text-white px-2 py-0.5 rounded-full ml-1">
                    Copied!
                  </span>
                )}
              </button>

              {/* Decorative Wavy Squiggle Path directly beneath */}
              <svg
                className="w-44 sm:w-56 h-3.5 text-[#141618] mt-0.5 pointer-events-none"
                viewBox="0 0 200 12"
                fill="none"
              >
                <path
                  d="M2 6 Q 12 1, 22 6 T 42 6 T 62 6 T 82 6 T 102 6 T 122 6 T 142 6 T 162 6 T 182 6 T 198 6"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Four Distinct Colorful Neo-Brutalist Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-4 z-10">
              {/* 1. Email Button (Coral Red) */}
              <a
                href="mailto:uxforger@gmail.com"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-[#FF5A43] hover:bg-[#EE4932] text-white font-mono font-bold text-xs sm:text-sm rounded-xl border-[2.5px] border-[#141618] shadow-[3.5px_3.5px_0px_#141618] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#141618] active:translate-x-[3.5px] active:translate-y-[3.5px] active:shadow-none transition-all cursor-pointer"
              >
                <Mail className="w-4 h-4 text-white" />
                <span>Email</span>
              </a>

              {/* 2. LinkedIn Button (Periwinkle Blue) */}
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-[#6B8AFD] hover:bg-[#5777EC] text-white font-mono font-bold text-xs sm:text-sm rounded-xl border-[2.5px] border-[#141618] shadow-[3.5px_3.5px_0px_#141618] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#141618] active:translate-x-[3.5px] active:translate-y-[3.5px] active:shadow-none transition-all cursor-pointer"
              >
                <span className="font-display font-black text-xs leading-none">in</span>
                <span>LinkedIn</span>
              </a>

              {/* 3. WhatsApp Button */}
              <a
                href={PERSONAL_INFO.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-[#FAF7F2] hover:bg-white text-[#141618] font-mono font-bold text-xs sm:text-sm rounded-xl border-[2.5px] border-[#141618] shadow-[3.5px_3.5px_0px_#141618] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#141618] active:translate-x-[3.5px] active:translate-y-[3.5px] active:shadow-none transition-all cursor-pointer"
              >
                <svg
                  className="w-4 h-4 fill-current text-[#141618]"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.05 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413Z" />
                </svg>
                <span>WhatsApp</span>
              </a>

              {/* 4. X / Twitter Button (Mint Teal) */}
              <a
                href={PERSONAL_INFO.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-[#4FD1A5] hover:bg-[#3DC094] text-[#141618] font-mono font-bold text-xs sm:text-sm rounded-xl border-[2.5px] border-[#141618] shadow-[3.5px_3.5px_0px_#141618] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#141618] active:translate-x-[3.5px] active:translate-y-[3.5px] active:shadow-none transition-all cursor-pointer"
              >
                <span className="font-display font-black text-sm leading-none">𝕏</span>
                <span>X / Twitter</span>
              </a>
            </div>
          </div>

          {/* Clean Minimal Centered Sub-Footer as in reference image */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#71717A]">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#141618]">The UX Forger</span>
              <span>·</span>
              <span>Owowade Opeyemi</span>
            </div>

            <div className="text-center sm:text-left">
              Designed &amp; built by The UX Forger · © 2026
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsResumeModalOpen(true)}
                className="hover:text-[#141618] underline underline-offset-4 cursor-pointer"
              >
                Resume PDF
              </button>
              <a
                href={PERSONAL_INFO.cvPdfUrl}
                download="Owowade_Opeyemi_CV.pdf"
                className="hover:text-[#141618] underline underline-offset-4"
              >
                Download CV
              </a>
              <a href="#top" className="hover:text-[#141618] font-bold">
                Back to Top ↑
              </a>
            </div>
          </div>
        </footer>

        {/* =====================================================================
            MODALS & COMMAND PALETTE
           ===================================================================== */}
        <ForgeConsole
          isOpen={isConsoleOpen}
          onClose={() => setIsConsoleOpen(false)}
          onNavigateSection={scrollToSection}
          onOpenProjectCaseStudy={(projId) => {
            const proj = PROJECTS.find((p) => p.id === projId);
            if (proj) openProject(proj);
          }}
          onOpenResumeModal={() => setIsResumeModalOpen(true)}
        />

        <FullScreenCaseStudy
          project={selectedProject}
          onClose={closeProject}
          onInquireProject={handleInquireProject}
        />

        <ResumeModal
          isOpen={isResumeModalOpen}
          onClose={() => setIsResumeModalOpen(false)}
        />
      </div>
    </MotionConfig>
  );
}
