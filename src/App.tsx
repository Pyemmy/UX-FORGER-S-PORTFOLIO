import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Plus,
  X,
  Check,
  Copy,
  Gamepad2,
  UtensilsCrossed,
} from 'lucide-react';
import {
  HERO_PILLARS,
  MARQUEE_ITEMS,
  PROJECTS,
  STATS_STRIP,
  EXPERIENCES,
  SERVICES,
  PROCESS_STEPS,
  STACK_ITEMS,
  INITIAL_TESTIMONIALS,
  PRICING_TIERS,
  ProjectItem,
  TestimonialItem,
} from './data/portfolioData';
import {
  ProjectCaseStudyModal,
  ResumePreviewModal,
  AddTestimonialModal,
} from './components/PortfolioModals';
import portraitImg from './assets/images/owoade_portrait_suit_1790590966249.jpg';

export default function App() {
  // Interactive state
  const [activeHeroPillar, setActiveHeroPillar] = useState<number>(0);
  const [projectFilter, setProjectFilter] = useState<
    'All' | 'Mobile App' | 'Web & AI' | 'Fintech' | 'Game Design'
  >('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [openServiceId, setOpenServiceId] = useState<string>('ui-ux');
  const [activeStackSkill, setActiveStackSkill] = useState<string | null>(null);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(INITIAL_TESTIMONIALS);
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [portraitError, setPortraitError] = useState(false);

  // Contact form & email copy state
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [selectedPackage, setSelectedPackage] = useState<string>('');
  const [messageSent, setMessageSent] = useState(false);

  const filteredGridProjects = PROJECTS.filter((p) => {
    if (p.featured && projectFilter === 'All') return false;
    if (projectFilter === 'All') return true;
    return p.filterTag === projectFilter;
  });

  const featuredProject = PROJECTS.find((p) => p.featured);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPricing = (tierName: string, price: string) => {
    setSelectedPackage(`${tierName} (${price})`);
    setContactMessage(
      `Hi Owoade, I'd like to get started with the ${tierName} package (${price}). Here are a few details about my timeline and goals:`
    );
    scrollToSection('contact');
  };

  const handleInquireProject = (projectName: string) => {
    setSelectedPackage(`Similar to ${projectName}`);
    setContactMessage(
      `Hi Owoade, I just reviewed your ${projectName} case study and would love to discuss a similar product design project.`
    );
    scrollToSection('contact');
  };

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText('owoadeopeyemi11@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) return;
    setMessageSent(true);
    setTimeout(() => {
      setContactName('');
      setContactEmail('');
      setContactMessage('');
      setSelectedPackage('');
      setMessageSent(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#080909] text-[#F2F5F4] selection:bg-[#14B8A6]/30 selection:text-[#2DD4BF]">
      {/* =====================================================================
          TOP NAVIGATION BAR (Strict 3-Zone Contract)
         ===================================================================== */}
      <header className="sticky top-0 z-40 h-16 bg-[#080909]/90 backdrop-blur-md border-b border-white/[0.06] px-6 lg:px-16 flex items-center justify-between">
        {/* Zone 1: Brand Title (Single text element wordmark) */}
        <a
          href="#top"
          className="font-display text-lg sm:text-xl font-semibold tracking-tight text-white whitespace-nowrap shrink-0"
        >
          The <span className="italic font-normal text-[#14B8A6]">UX</span> Forger
        </a>

        {/* Zone 2: 5 Single-Line Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono-num tracking-wider text-[#8C9694]">
          <a
            href="#work"
            className="hover:text-white transition-colors duration-150 py-1 border-b border-transparent hover:border-[#14B8A6] whitespace-nowrap"
          >
            Work
          </a>
          <a
            href="#experience"
            className="hover:text-white transition-colors duration-150 py-1 border-b border-transparent hover:border-[#14B8A6] whitespace-nowrap"
          >
            Experience
          </a>
          <a
            href="#about"
            className="hover:text-white transition-colors duration-150 py-1 border-b border-transparent hover:border-[#14B8A6] whitespace-nowrap"
          >
            About
          </a>
          <a
            href="#services"
            className="hover:text-white transition-colors duration-150 py-1 border-b border-transparent hover:border-[#14B8A6] whitespace-nowrap"
          >
            Services
          </a>
          <a
            href="#contact"
            className="hover:text-white transition-colors duration-150 py-1 border-b border-transparent hover:border-[#14B8A6] whitespace-nowrap"
          >
            Contact
          </a>
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => scrollToSection('contact')}
            className="px-4 py-2 text-xs font-mono-num tracking-wider text-[#14B8A6] border border-[#14B8A6]/50 hover:bg-[#14B8A6] hover:text-[#041110] transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0"
          >
            Hire Me
          </button>
        </div>
      </header>

      {/* =====================================================================
          HERO SECTION
         ===================================================================== */}
      <section
        id="top"
        className="relative pt-16 sm:pt-24 lg:pt-28 pb-12 px-6 lg:px-16 max-w-[1440px] mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Left Hero Column */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 text-xs font-mono-num tracking-widest text-[#14B8A6] mb-6"
            >
              <span className="w-6 h-[1px] bg-[#14B8A6]" aria-hidden="true" />
              <span>UI/UX &amp; PRODUCT DESIGNER · LAGOS, NIGERIA</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-6xl sm:text-7xl lg:text-[92px] leading-[0.94] tracking-tight font-semibold text-white mb-8"
            >
              <span className="block">Owoade</span>
              <span className="block italic font-normal text-[#139E93] mt-1">Opeyemi</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-[#8C9694] max-w-xl leading-relaxed mb-10"
            >
              I design <strong className="text-white font-semibold">clean interfaces</strong> with
              better user experience —{' '}
              <strong className="text-white font-semibold">highly converting</strong>, deeply
              intentional, and built to solve real problems.
            </motion.p>

            {/* Primary & Secondary CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4"
            >
              <button
                onClick={() => scrollToSection('work')}
                className="px-6 py-3.5 bg-[#0F8A82] hover:bg-[#14A399] text-white text-xs font-mono-num tracking-wider font-medium flex items-center gap-2.5 transition-transform duration-150 active:scale-[0.98] cursor-pointer whitespace-nowrap"
              >
                <span>VIEW WORK</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setIsResumeModalOpen(true)}
                className="px-6 py-3.5 bg-transparent hover:bg-white/[0.04] text-[#9BA5A3] hover:text-white border border-white/10 hover:border-white/25 text-xs font-mono-num tracking-wider flex items-center gap-2.5 transition-colors duration-150 cursor-pointer whitespace-nowrap"
              >
                <span>DOWNLOAD RESUME</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          </div>

          {/* Right Hero Column: Stacked Proof Metrics */}
          <motion.div
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3.5 w-full lg:max-w-[260px] lg:ml-auto"
          >
            <div className="flex-1 bg-[#0E1212] border border-white/[0.06] border-l-2 border-l-[#14B8A6] px-5 py-4">
              <div className="font-display text-3xl font-bold text-white font-mono-num">
                2<span className="text-[#14B8A6] text-xl ml-0.5">+</span>
              </div>
              <div className="text-[11px] font-mono-num tracking-wider text-[#7A8583] mt-1">
                YEARS DESIGNING
              </div>
            </div>

            <div className="flex-1 bg-[#0E1212] border border-white/[0.06] border-l-2 border-l-[#14B8A6] px-5 py-4">
              <div className="font-display text-3xl font-bold text-white font-mono-num">
                5<span className="text-[#14B8A6] text-xl ml-0.5">+</span>
              </div>
              <div className="text-[11px] font-mono-num tracking-wider text-[#7A8583] mt-1">
                PROJECTS COMPLETED
              </div>
            </div>

            <div className="flex-1 bg-[#0E1212] border border-white/[0.06] border-l-2 border-l-[#14B8A6] px-5 py-4">
              <div className="font-display text-3xl font-bold text-white font-mono-num">
                3<span className="text-[#14B8A6] text-xl ml-0.5">+</span>
              </div>
              <div className="text-[11px] font-mono-num tracking-wider text-[#7A8583] mt-1">
                HAPPY CLIENTS
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom 4-Pillar Interactive Strip */}
        <div className="mt-24 lg:mt-32 pt-6 border-t border-white/[0.06]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {HERO_PILLARS.map((pillar, idx) => {
              const isActive = activeHeroPillar === idx;
              return (
                <button
                  key={pillar.number}
                  onClick={() => setActiveHeroPillar(idx)}
                  className="text-left group py-3 relative focus:outline-none cursor-pointer"
                >
                  <div className="flex items-center gap-2.5 text-xs">
                    <span
                      className={`font-mono-num transition-colors ${
                        isActive ? 'text-[#14B8A6]' : 'text-[#596361] group-hover:text-[#14B8A6]'
                      }`}
                    >
                      {pillar.number}
                    </span>
                    <span
                      className={`font-medium transition-colors whitespace-nowrap ${
                        isActive ? 'text-white' : 'text-[#8C9694] group-hover:text-white'
                      }`}
                    >
                      {pillar.title}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#66706E] mt-1.5 line-clamp-1">
                    {pillar.detail}
                  </p>
                  <div className="mt-3 h-[2px] w-full bg-white/[0.05] overflow-hidden">
                    <div
                      className={`h-full bg-[#14B8A6] transition-transform duration-200 origin-left ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          TEAL MARQUEE TICKER RIBBON
         ===================================================================== */}
      <div className="w-full bg-[#0E857D] text-[#041715] py-3 overflow-hidden border-y border-[#14B8A6]/30 select-none">
        <div className="animate-marquee flex items-center">
          {[...Array(2)].map((_, groupIndex) => (
            <div key={groupIndex} className="flex items-center shrink-0">
              {MARQUEE_ITEMS.map((item, idx) => (
                <div key={`${groupIndex}-${idx}`} className="flex items-center shrink-0">
                  <span className="text-[11px] font-mono-num font-medium tracking-[0.2em] px-6 text-white/95 whitespace-nowrap">
                    {item}
                  </span>
                  <span className="text-white/40 text-xs" aria-hidden="true">
                    ·
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* =====================================================================
          SELECTED WORK ("Projects that matter")
         ===================================================================== */}
      <section id="work" className="py-24 lg:py-32 px-6 lg:px-16 max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-3 text-xs font-mono-num tracking-widest text-[#14B8A6] mb-3">
              <span className="w-5 h-[1px] bg-[#14B8A6]" aria-hidden="true" />
              <span>SELECTED WORK</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-[1.05] tracking-tight">
              Projects that
              <span className="block italic font-normal text-[#139E93]">matter</span>
            </h2>
          </div>

          {/* Interactive Category Filter Controls (Functional Buttons) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#0E1212] border border-white/[0.07]">
            {(['All', 'Mobile App', 'Web & AI', 'Fintech', 'Game Design'] as const).map(
              (category) => (
                <button
                  key={category}
                  onClick={() => setProjectFilter(category)}
                  className={`px-3.5 py-2 text-xs font-mono-num transition-colors duration-150 cursor-pointer whitespace-nowrap ${
                    projectFilter === category
                      ? 'bg-[#118A82] text-white font-medium'
                      : 'text-[#8C9694] hover:text-white'
                  }`}
                >
                  {category}
                </button>
              )
            )}
          </div>
        </div>

        {/* 2x2 Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredGridProjects.map((project) => (
            <motion.article
              key={project.id}
              layout
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setSelectedProject(project)}
              className="group bg-[#0D1010] border border-white/[0.07] hover:border-[#14B8A6]/50 transition-colors duration-200 cursor-pointer flex flex-col overflow-hidden"
            >
              {/* Top Gradient & Wireframe Canvas matching screenshot */}
              <div
                className="relative h-64 sm:h-72 w-full p-7 flex flex-col justify-between overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${project.gradientFrom} 0%, ${project.gradientVia} 55%, ${project.gradientTo} 100%)`,
                }}
              >
                {/* Abstract UI Wireframe Bars */}
                <div className="space-y-3 max-w-xs transition-transform duration-200 group-hover:translate-x-1">
                  <div
                    className="h-1.5 w-36 rounded-full opacity-80"
                    style={{ backgroundColor: project.accentLineColor }}
                  />
                  <div className="h-1.5 w-64 rounded-full bg-white/20" />
                  <div className="h-1.5 w-48 rounded-full bg-white/15" />
                </div>

                {/* Hover inspect cue + Bottom-Right Monogram */}
                <div className="flex items-end justify-between mt-auto">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono-num tracking-wider text-white/75 group-hover:text-white transition-colors">
                    <span>VIEW CASE STUDY</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>

                  <span className="font-display text-6xl sm:text-7xl font-bold text-white/15 group-hover:text-white/25 transition-colors select-none leading-none">
                    {project.monogram}
                  </span>
                </div>
              </div>

              {/* Card Content Footer (Clean unboxed metadata with middle-dot separators) */}
              <div className="p-6 sm:p-7 bg-[#0E1212] flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono-num tracking-wider text-[#14B8A6] mb-2.5">
                    {project.categories.map((cat, idx) => (
                      <React.Fragment key={cat}>
                        <span>{cat}</span>
                        {idx < project.categories.length - 1 && (
                          <span aria-hidden="true" className="text-white/25">
                            ·
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white group-hover:text-[#2DD4BF] transition-colors mb-2">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#8C9694] leading-relaxed">
                    {project.shortDescription}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Full-Width Featured Project Card (Ventics AI) */}
        {projectFilter === 'All' && featuredProject && (
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setSelectedProject(featuredProject)}
            className="mt-5 group bg-[#0E1212] border border-white/[0.07] hover:border-[#14B8A6]/50 transition-colors duration-200 cursor-pointer grid grid-cols-1 lg:grid-cols-12 overflow-hidden"
          >
            {/* Left Description Column */}
            <div className="lg:col-span-6 p-7 sm:p-10 lg:p-12 flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono-num tracking-wider text-[#14B8A6] mb-3">
                {featuredProject.categories.map((cat, idx) => (
                  <React.Fragment key={cat}>
                    <span className={cat === 'Featured' ? 'text-[#F59E0B]' : ''}>{cat}</span>
                    {idx < featuredProject.categories.length - 1 && (
                      <span aria-hidden="true" className="text-white/25">
                        ·
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>

              <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-white group-hover:text-[#2DD4BF] transition-colors mb-4">
                {featuredProject.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#8C9694] leading-relaxed max-w-lg mb-6">
                {featuredProject.shortDescription}
              </p>

              <div className="inline-flex items-center gap-2 text-xs font-mono-num tracking-wider text-[#14B8A6] group-hover:text-[#2DD4BF]">
                <span>EXPLORE CASE STUDY</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>

            {/* Right Amber Gradient Canvas */}
            <div
              className="lg:col-span-6 min-h-[240px] sm:min-h-[280px] p-7 sm:p-10 flex flex-col justify-between relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${featuredProject.gradientFrom} 0%, ${featuredProject.gradientVia} 52%, ${featuredProject.gradientTo} 100%)`,
              }}
            >
              <div className="space-y-3 max-w-xs transition-transform duration-200 group-hover:translate-x-1">
                <div
                  className="h-1.5 w-36 rounded-full opacity-85"
                  style={{ backgroundColor: featuredProject.accentLineColor }}
                />
                <div className="h-1.5 w-64 rounded-full bg-white/25" />
                <div className="h-1.5 w-48 rounded-full bg-white/15" />
              </div>

              <div className="flex justify-end mt-auto">
                <span className="font-display text-6xl sm:text-7xl font-bold text-white/20 select-none leading-none">
                  {featuredProject.monogram}
                </span>
              </div>
            </div>
          </motion.article>
        )}

        {/* 4-Column Quantitative Proof Strip directly below Selected Work */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 bg-[#0E1212] border border-white/[0.07] divide-y sm:divide-y-0 sm:divide-x divide-white/[0.07]">
          {STATS_STRIP.map((stat) => (
            <div key={stat.label} className="p-8 sm:p-10 text-center">
              <div className="font-display text-4xl sm:text-5xl font-bold text-white font-mono-num mb-2">
                {stat.value}
                {stat.suffix && <span className="text-[#14B8A6] text-3xl ml-0.5">{stat.suffix}</span>}
              </div>
              <div className="text-[11px] font-mono-num tracking-widest text-[#7A8583] mb-2">
                {stat.label}
              </div>
              <p className="text-xs text-[#646E6C] max-w-[210px] mx-auto leading-relaxed">
                {stat.subtext}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          CAREER / EXPERIENCE ("Where I've worked")
         ===================================================================== */}
      <section
        id="experience"
        className="py-24 lg:py-32 px-6 lg:px-16 max-w-[1440px] mx-auto border-t border-white/[0.06]"
      >
        <div className="mb-16">
          <div className="flex items-center gap-3 text-xs font-mono-num tracking-widest text-[#14B8A6] mb-3">
            <span className="w-5 h-[1px] bg-[#14B8A6]" aria-hidden="true" />
            <span>CAREER</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-[1.05] tracking-tight">
            Where I&apos;ve
            <span className="block italic font-normal text-[#139E93]">worked</span>
          </h2>
        </div>

        <div className="divide-y divide-white/[0.07] border-t border-b border-white/[0.07]">
          {EXPERIENCES.map((exp) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="py-10 lg:py-12 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start group"
            >
              {/* Date Range */}
              <div className="lg:col-span-3 text-xs font-mono-num tracking-wider text-[#7A8583]">
                {exp.period}
              </div>

              {/* Role, Company, Description & Unboxed Skills */}
              <div className="lg:col-span-7">
                <div className="text-[11px] font-mono-num tracking-widest text-[#14B8A6] mb-1.5">
                  {exp.company}
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white group-hover:text-[#2DD4BF] transition-colors mb-3">
                  {exp.role}
                </h3>
                <p className="text-xs sm:text-sm text-[#8C9694] leading-relaxed mb-5 max-w-2xl">
                  {exp.description}
                </p>

                {/* Clean unboxed skill metadata with typographic separators */}
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[11px] font-mono-num tracking-wider text-[#6E7876]">
                  {exp.skills.map((skill, index) => (
                    <React.Fragment key={skill}>
                      <span className="text-[#9BA5A3]">{skill}</span>
                      {index < exp.skills.length - 1 && (
                        <span aria-hidden="true" className="text-[#14B8A6]/60">
                          ·
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Right Employment Type */}
              <div className="lg:col-span-2 lg:text-right">
                <span className="text-[11px] font-mono-num tracking-widest text-[#8C9694]">
                  {exp.employmentType}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          SERVICES ("Services built around your needs")
         ===================================================================== */}
      <section
        id="services"
        className="py-24 lg:py-32 px-6 lg:px-16 max-w-[1440px] mx-auto border-t border-white/[0.06]"
      >
        <div className="mb-14">
          <div className="flex items-center gap-3 text-xs font-mono-num tracking-widest text-[#14B8A6] mb-3">
            <span className="w-5 h-[1px] bg-[#14B8A6]" aria-hidden="true" />
            <span>WHAT I OFFER</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-[1.05] tracking-tight">
            Services built
            <span className="block">
              around your <span className="italic font-normal text-[#139E93]">needs</span>
            </span>
          </h2>
        </div>

        {/* Interactive Accordion List */}
        <div className="border-t border-white/[0.08]">
          {SERVICES.map((service) => {
            const isOpen = openServiceId === service.id;
            return (
              <div key={service.id} className="border-b border-white/[0.08]">
                <button
                  onClick={() => setOpenServiceId(isOpen ? '' : service.id)}
                  className="w-full py-7 flex items-center justify-between text-left group cursor-pointer focus:outline-none"
                >
                  <div className="flex items-baseline gap-6 sm:gap-10">
                    <span className="text-xs font-mono-num text-[#14B8A6]">{service.number}</span>
                    <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white group-hover:text-[#2DD4BF] transition-colors">
                      {service.title}
                    </h3>
                  </div>

                  <span className="text-[#14B8A6] transition-transform duration-200">
                    {isOpen ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      className="pb-9 pl-10 sm:pl-16 pr-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
                    >
                      <p className="lg:col-span-6 text-xs sm:text-sm text-[#8C9694] leading-relaxed max-w-md">
                        {service.description}
                      </p>

                      <ul className="lg:col-span-6 space-y-2.5 text-xs font-mono-num tracking-wider text-[#9BA5A3]">
                        {service.deliverables.map((item) => (
                          <li key={item} className="flex items-center gap-3">
                            <span className="text-[#14B8A6]">—</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* =====================================================================
          DESIGN PROCESS ("My design process")
         ===================================================================== */}
      <section className="py-24 lg:py-32 px-6 lg:px-16 max-w-[1440px] mx-auto border-t border-white/[0.06]">
        <div className="mb-14">
          <div className="flex items-center gap-3 text-xs font-mono-num tracking-widest text-[#14B8A6] mb-3">
            <span className="w-5 h-[1px] bg-[#14B8A6]" aria-hidden="true" />
            <span>HOW I WORK</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-[1.05] tracking-tight">
            My design
            <span className="block italic font-normal text-[#139E93]">process</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 bg-[#0E1212] border border-white/[0.07] divide-y sm:divide-y-0 sm:divide-x divide-white/[0.07]">
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.number}
              className="p-7 sm:p-9 hover:bg-white/[0.015] transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="font-display text-4xl font-semibold text-[#134E4A] font-mono-num mb-5">
                  {step.number}
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-semibold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-xs text-[#8C9694] leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          ABOUT ME ("The person behind the forge")
         ===================================================================== */}
      <section
        id="about"
        className="py-24 lg:py-32 px-6 lg:px-16 max-w-[1440px] mx-auto border-t border-white/[0.06]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Bio & Interactive Stack Column */}
          <div className="lg:col-span-6">
            <div className="flex items-center gap-3 text-xs font-mono-num tracking-widest text-[#14B8A6] mb-3">
              <span className="w-5 h-[1px] bg-[#14B8A6]" aria-hidden="true" />
              <span>ABOUT ME</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-[1.05] tracking-tight mb-8">
              The person
              <span className="block">
                behind the <span className="italic font-normal text-[#139E93]">forge</span>
              </span>
            </h2>

            <div className="space-y-5 text-xs sm:text-sm text-[#8C9694] leading-relaxed max-w-xl">
              <p>
                I&apos;m <strong className="text-white font-semibold">Owoade Opeyemi</strong> — a
                UI/UX and Product Designer based in Lagos, Nigeria, operating under the brand{' '}
                <strong className="text-white font-semibold">The UX Forger</strong>. I design
                interfaces that feel as good as they look.
              </p>
              <p>
                Alongside design, I&apos;m a{' '}
                <strong className="text-white font-semibold">
                  Mathematics student at the University of Lagos
                </strong>{' '}
                — which means I think in systems, logic, and patterns. That analytical mindset flows
                into every product I touch.
              </p>
              <p>
                I also <strong className="text-white font-semibold">teach UI/UX design</strong> to
                aspiring designers breaking into the field — because good design thinking should be
                accessible to everyone willing to learn it.
              </p>
            </div>

            {/* Interactive Stack Filter / Highlight Buttons */}
            <div className="mt-10">
              <div className="text-[11px] font-mono-num tracking-widest text-[#646E6C] mb-3.5">
                MY STACK
              </div>
              <div className="flex flex-wrap gap-2">
                {STACK_ITEMS.map((skill) => {
                  const isSelected = activeStackSkill === skill;
                  return (
                    <button
                      key={skill}
                      onClick={() => setActiveStackSkill(isSelected ? null : skill)}
                      className={`px-3.5 py-2 text-xs font-mono-num border transition-colors duration-150 cursor-pointer whitespace-nowrap ${
                        isSelected
                          ? 'bg-[#118A82] text-white border-[#14B8A6]'
                          : 'bg-[#0E1212] text-[#9BA5A3] border-white/[0.08] hover:border-[#14B8A6]/50 hover:text-white'
                      }`}
                    >
                      {skill}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Center Portrait Column */}
          <div className="lg:col-span-4 relative">
            <div className="relative bg-[#141818] border border-white/10 overflow-hidden aspect-[3/4]">
              {!portraitError ? (
                <img
                  src={portraitImg}
                  alt="Owoade Opeyemi — The UX Forger portrait in a tailored suit"
                  referrerPolicy="no-referrer"
                  onError={() => setPortraitError(true)}
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#0D2E2C] to-[#091313] text-center">
                  <span className="font-display text-5xl font-bold text-[#14B8A6] mb-2">OO</span>
                  <span className="text-sm text-white font-medium">Owoade Opeyemi</span>
                  <span className="text-xs text-[#8C9694] mt-1">The UX Forger</span>
                </div>
              )}
            </div>

            {/* Gold Signature Label matching screenshot */}
            <div className="inline-block bg-[#F59E0B] text-[#080909] font-mono-num text-[11px] font-semibold tracking-widest px-4 py-2 -mt-4 relative z-10 shadow-md">
              THE UX FORGER
            </div>
          </div>

          {/* Right Vertical Stat Column */}
          <div className="lg:col-span-2 grid grid-cols-2 lg:grid-cols-1 gap-3.5">
            <div className="bg-[#0E1212] border border-white/[0.07] p-5">
              <div className="font-display text-3xl font-bold text-white font-mono-num">2</div>
              <div className="text-[11px] text-[#7A8583] mt-1">Years designing</div>
            </div>
            <div className="bg-[#0E1212] border border-white/[0.07] p-5">
              <div className="font-display text-3xl font-bold text-white font-mono-num">5</div>
              <div className="text-[11px] text-[#7A8583] mt-1">Projects done</div>
            </div>
            <div className="bg-[#0E1212] border border-white/[0.07] p-5">
              <div className="font-display text-3xl font-bold text-white font-mono-num">3</div>
              <div className="text-[11px] text-[#7A8583] mt-1">Happy clients</div>
            </div>
            <div className="bg-[#0E1212] border border-white/[0.07] p-5">
              <div className="font-display text-3xl font-bold text-white font-mono-num">∞</div>
              <div className="text-[11px] text-[#7A8583] mt-1">Ideas cooking</div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SOCIAL PROOF ("What clients say")
         ===================================================================== */}
      <section className="py-24 lg:py-32 px-6 lg:px-16 max-w-[1440px] mx-auto border-t border-white/[0.06]">
        <div className="mb-14">
          <div className="flex items-center gap-3 text-xs font-mono-num tracking-widest text-[#14B8A6] mb-3">
            <span className="w-5 h-[1px] bg-[#14B8A6]" aria-hidden="true" />
            <span>SOCIAL PROOF</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-[1.05] tracking-tight">
            What clients
            <span className="block italic font-normal text-[#139E93]">say</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-[#0E1212] border border-white/[0.07] p-8 flex flex-col justify-between"
            >
              <p className="font-display italic text-lg sm:text-xl text-[#D0D8D6] leading-relaxed mb-8">
                {item.quote}
              </p>
              <div>
                <div className="text-xs font-mono-num font-semibold tracking-wider text-white">
                  {item.author}
                </div>
                <div className="text-[11px] font-mono-num text-[#687370] mt-0.5">{item.role}</div>
              </div>
            </div>
          ))}

          {/* Interactive 3rd Card: "YOUR TESTIMONIAL HERE" */}
          <button
            onClick={() => setIsTestimonialModalOpen(true)}
            className="bg-[#0E1212]/60 hover:bg-[#0E1212] border border-dashed border-white/10 hover:border-[#14B8A6]/50 p-8 flex flex-col items-center justify-center text-center min-h-[220px] transition-colors cursor-pointer group"
          >
            <Plus className="w-5 h-5 text-[#687370] group-hover:text-[#14B8A6] mb-3 transition-colors" />
            <div className="text-xs font-mono-num tracking-widest text-[#7A8583] group-hover:text-white transition-colors">
              YOUR TESTIMONIAL HERE
            </div>
            <div className="text-xs text-[#596361] mt-1">Work with me and be featured</div>
          </button>
        </div>
      </section>

      {/* =====================================================================
          BEYOND THE SCREENS ("What I do when I'm not designing")
         ===================================================================== */}
      <section className="py-24 lg:py-32 px-6 lg:px-16 max-w-[1440px] mx-auto border-t border-white/[0.06]">
        <div className="mb-14">
          <div className="flex items-center gap-3 text-xs font-mono-num tracking-widest text-[#14B8A6] mb-3">
            <span className="w-5 h-[1px] bg-[#14B8A6]" aria-hidden="true" />
            <span>BEYOND THE SCREENS</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-[1.05] tracking-tight">
            What I do when
            <span className="block">
              I&apos;m not <span className="italic font-normal text-[#139E93]">designing</span>
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-[#0E1212] border border-white/[0.07] p-8 sm:p-10">
            <div className="w-10 h-10 bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#14B8A6] mb-5">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white mb-3">
              Gaming
            </h3>
            <p className="text-xs sm:text-sm text-[#8C9694] leading-relaxed max-w-lg">
              I play games seriously — and it&apos;s not unrelated to design. Games are the most
              complex UX systems that exist. Understanding them makes me a sharper, more intuitive
              designer.
            </p>
          </div>

          <div className="bg-[#0E1212] border border-white/[0.07] p-8 sm:p-10">
            <div className="w-10 h-10 bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#F59E0B] mb-5">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white mb-3">
              Cooking
            </h3>
            <p className="text-xs sm:text-sm text-[#8C9694] leading-relaxed max-w-lg">
              Cooking and design have more in common than you&apos;d think — both are about
              combining the right ingredients with intention, timing, and taste. I take both very
              seriously.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          PRICING ("Clear, upfront pricing")
         ===================================================================== */}
      <section
        id="pricing"
        className="py-24 lg:py-32 px-6 lg:px-16 max-w-[1440px] mx-auto border-t border-white/[0.06]"
      >
        <div className="mb-14">
          <div className="flex items-center gap-3 text-xs font-mono-num tracking-widest text-[#14B8A6] mb-3">
            <span className="w-5 h-[1px] bg-[#14B8A6]" aria-hidden="true" />
            <span>PRICING</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-[1.05] tracking-tight">
            Clear, upfront
            <span className="block italic font-normal text-[#139E93]">pricing</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`bg-[#0E1212] p-8 sm:p-10 flex flex-col justify-between border transition-colors ${
                tier.popular
                  ? 'border-[#14B8A6]/60 relative'
                  : 'border-white/[0.07] hover:border-white/20'
              }`}
            >
              <div>
                {tier.popular && (
                  <div className="text-[10px] font-mono-num tracking-widest text-[#14B8A6] pb-4 mb-6 border-b border-white/[0.08]">
                    MOST POPULAR
                  </div>
                )}

                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white mb-2">
                  {tier.name}
                </h3>
                <p className="text-xs text-[#8C9694] leading-relaxed mb-8">{tier.tagline}</p>

                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-4xl sm:text-5xl font-bold text-white font-mono-num">
                      {tier.price}
                    </span>
                    {tier.unit && (
                      <span className="text-sm font-mono-num text-[#8C9694]">{tier.unit}</span>
                    )}
                  </div>
                  <div className="text-[11px] font-mono-num text-[#687370] mt-1.5">
                    {tier.billingNote}
                  </div>
                </div>

                <ul className="space-y-3 border-t border-white/[0.07] pt-6 mb-10 text-xs text-[#9BA5A3]">
                  {tier.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-3">
                      <span className="text-[#14B8A6] font-mono-num">—</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleSelectPricing(tier.name, tier.price)}
                className={`w-full py-3.5 text-xs font-mono-num tracking-widest transition-colors duration-150 cursor-pointer whitespace-nowrap ${
                  tier.popular
                    ? 'bg-[#0F8A82] hover:bg-[#14A399] text-white font-medium'
                    : 'bg-transparent hover:bg-white/[0.05] text-[#9BA5A3] hover:text-white border border-white/10'
                }`}
              >
                {tier.ctaText}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          CONTACT ("Let's build something great together")
         ===================================================================== */}
      <section
        id="contact"
        className="py-24 lg:py-32 px-6 lg:px-16 max-w-[1440px] mx-auto border-t border-white/[0.06]"
      >
        <div className="max-w-xl mx-auto text-center">
          <div className="inline-flex items-center gap-2.5 text-xs font-mono-num tracking-widest text-[#14B8A6] mb-4">
            <span className="w-4 h-[1px] bg-[#14B8A6]" aria-hidden="true" />
            <span>GET IN TOUCH</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-[1.05] tracking-tight mb-4">
            Let&apos;s build something
            <span className="block italic font-normal text-[#139E93]">great together</span>
          </h2>

          <p className="text-xs sm:text-sm text-[#8C9694] mb-8">
            Available for freelance projects, collaborations, and UI/UX tutoring.
          </p>

          {/* Click-to-copy Email Headline */}
          <button
            onClick={handleCopyEmail}
            title="Click to copy email address"
            className="group inline-flex items-center gap-2.5 font-display text-xl sm:text-3xl text-white hover:text-[#2DD4BF] border-b border-white/15 hover:border-[#14B8A6] pb-1.5 mb-8 transition-colors cursor-pointer"
          >
            <span>owoadeopeyemi11@gmail.com</span>
            {copiedEmail ? (
              <Check className="w-4 h-4 text-[#14B8A6]" />
            ) : (
              <Copy className="w-4 h-4 text-[#687370] group-hover:text-[#14B8A6] transition-colors" />
            )}
          </button>

          {/* Social Links Strip */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] font-mono-num tracking-widest text-[#7A8583] mb-10">
            <a
              href="https://www.behance.net"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#14B8A6] transition-colors"
            >
              · BEHANCE
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#14B8A6] transition-colors"
            >
              · LINKEDIN
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#14B8A6] transition-colors"
            >
              · X
            </a>
            <a
              href="https://www.tiktok.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#14B8A6] transition-colors"
            >
              · TIKTOK
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#14B8A6] transition-colors"
            >
              · INSTAGRAM
            </a>
            <a href="tel:+2349157460998" className="hover:text-[#14B8A6] transition-colors">
              · +234 915 746 0998
            </a>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleContactSubmit} className="space-y-3 text-left">
            {selectedPackage && (
              <div className="flex items-center justify-between bg-[#102422] border border-[#14B8A6]/40 px-4 py-2 text-xs font-mono-num text-[#2DD4BF]">
                <span>INQUIRING ABOUT: {selectedPackage.toUpperCase()}</span>
                <button
                  type="button"
                  onClick={() => setSelectedPackage('')}
                  className="text-white/70 hover:text-white cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                required
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Your name"
                className="w-full bg-[#0E1212] border border-white/[0.08] focus:border-[#14B8A6] px-4 py-3 text-xs sm:text-sm text-white placeholder-[#596361] outline-none transition-colors"
              />
              <input
                type="email"
                required
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="Your email"
                className="w-full bg-[#0E1212] border border-white/[0.08] focus:border-[#14B8A6] px-4 py-3 text-xs sm:text-sm text-white placeholder-[#596361] outline-none transition-colors"
              />
            </div>

            <textarea
              rows={4}
              required
              value={contactMessage}
              onChange={(e) => setContactMessage(e.target.value)}
              placeholder="Tell me about your project..."
              className="w-full bg-[#0E1212] border border-white/[0.08] focus:border-[#14B8A6] px-4 py-3 text-xs sm:text-sm text-white placeholder-[#596361] outline-none transition-colors resize-none"
            />

            <button
              type="submit"
              className="w-full py-3.5 bg-[#0F8A82] hover:bg-[#14A399] text-white text-xs font-mono-num tracking-widest font-medium flex items-center justify-center gap-2 transition-colors duration-150 cursor-pointer"
            >
              {messageSent ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>MESSAGE SENT TO OWOADE</span>
                </>
              ) : (
                <>
                  <span>SEND MESSAGE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-4">
            <button
              onClick={() => setIsResumeModalOpen(true)}
              className="px-6 py-3 bg-transparent hover:bg-white/[0.04] text-[#8C9694] hover:text-white border border-white/10 text-[11px] font-mono-num tracking-widest inline-flex items-center gap-2 transition-colors cursor-pointer"
            >
              <span>DOWNLOAD RESUME</span>
              <ArrowDown className="w-3 h-3" />
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================================
          FOOTER
         ===================================================================== */}
      <footer className="border-t border-white/[0.06] py-8 px-6 lg:px-16 max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono-num text-[#646E6C]">
        <div className="font-display text-sm text-[#8C9694]">
          The <span className="italic text-[#14B8A6]">UX</span> Forger © 2026
        </div>
        <div className="tracking-widest">OWOADE OPEYEMI · LAGOS, NIGERIA</div>
        <div>
          Designed by <span className="text-[#14B8A6]">TheUXForger</span>
        </div>
      </footer>

      {/* =====================================================================
          INTERACTIVE MODALS (Case Study Lightbox, Resume Preview, Testimonial)
         ===================================================================== */}
      <ProjectCaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquireProject={handleInquireProject}
      />

      <ResumePreviewModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />

      <AddTestimonialModal
        isOpen={isTestimonialModalOpen}
        onClose={() => setIsTestimonialModalOpen(false)}
        onAdd={(newTestimonial) => setTestimonials((prev) => [...prev, newTestimonial])}
      />
    </div>
  );
}
