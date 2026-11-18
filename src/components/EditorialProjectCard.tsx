import React from 'react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';

interface EditorialProjectCardProps {
  project: ProjectItem;
  index: number;
  onOpenCaseStudy: (project: ProjectItem) => void;
}

export const EditorialProjectCard: React.FC<EditorialProjectCardProps> = ({
  project,
  index,
  onOpenCaseStudy,
}) => {
  const hasMockupImage = Boolean(project.mockupImage);

  // Fallback index number
  const numIndex = project.numberIndex || String(index + 1).padStart(2, '0');

  return (
    <div className="relative group/card my-4 sm:my-8 lg:my-12">
      {/* Studio-Board Card Body */}
      <div className="relative bg-[#F4EFE6] rounded-[32px] sm:rounded-[40px] border border-[#DDD4C4] shadow-[0_20px_50px_-15px_rgba(40,30,20,0.12)] p-6 sm:p-8 lg:p-11 lg:pr-8 transition-shadow duration-300 hover:shadow-[0_25px_60px_-15px_rgba(40,30,20,0.18)] overflow-visible">
        
        {/* Main Grid: Left Column Big Image, Right Column Name, Number & Subtext */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-14 items-center">
          
          {/* ================= LEFT COLUMN: THE BIG IMAGE ================= */}
          <div className="lg:col-span-7 relative flex items-center justify-center w-full">
            {hasMockupImage ? (
              <div
                onClick={() => onOpenCaseStudy(project)}
                className="relative cursor-pointer group/mockup w-full flex items-center justify-center"
              >
                <div className="relative w-full max-w-[620px] transform transition-all duration-500 ease-out group-hover/mockup:-translate-y-1.5">
                  {project.id === 'ecovest' ? (
                    <div className="relative rounded-2xl sm:rounded-[26px] overflow-hidden border border-[#2B231B]/12 shadow-[0_20px_45px_rgba(20,15,10,0.18)] group-hover/mockup:shadow-[0_28px_55px_rgba(20,15,10,0.24)] transition-all duration-500">
                      <img
                        src={project.mockupImage}
                        alt={`${project.title} Mobile Mockup`}
                        className="w-full h-auto block select-none"
                        loading="eager"
                      />
                      {/* Subtle hover inspector overlay */}
                      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover/mockup:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                        <div className="transform translate-y-2 group-hover/mockup:translate-y-0 transition-transform duration-300 px-4 py-2 rounded-xl bg-black/85 backdrop-blur-md text-white font-mono font-bold text-xs shadow-xl flex items-center gap-2 border border-white/20">
                          <span>Inspect Full Case Study</span>
                          <ArrowUpRight className="w-4 h-4 text-[#F4BE24]" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      <img
                        src={project.mockupImage}
                        alt={`${project.title} Web Platform Mockup`}
                        className="w-full h-auto block select-none drop-shadow-[0_20px_42px_rgba(20,15,10,0.18)] group-hover/mockup:drop-shadow-[0_28px_55px_rgba(20,15,10,0.24)] transition-all duration-500 rounded-xl sm:rounded-2xl"
                        loading="eager"
                      />
                      {/* Subtle hover inspector overlay */}
                      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover/mockup:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none rounded-xl sm:rounded-2xl">
                        <div className="transform translate-y-2 group-hover/mockup:translate-y-0 transition-transform duration-300 px-4 py-2 rounded-xl bg-black/85 backdrop-blur-md text-white font-mono font-bold text-xs shadow-xl flex items-center gap-2 border border-white/20">
                          <span>Inspect Full Case Study</span>
                          <ArrowUpRight className="w-4 h-4 text-[#F4BE24]" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Generic Prototype Showcase (Ventics AI & QuickBill) */
              <div
                onClick={() => onOpenCaseStudy(project)}
                className="relative cursor-pointer group/web w-full max-w-[540px] transition-all duration-500 group-hover/web:-translate-y-1.5"
              >
                <div className="rounded-2xl sm:rounded-3xl bg-white border border-[#DDD4C4] shadow-[0_20px_45px_-15px_rgba(20,15,10,0.18)] p-4 sm:p-6 group-hover/web:shadow-[0_26px_55px_-15px_rgba(20,15,10,0.24)] transition-shadow">
                  {/* Browser Chrome Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-black/10 text-xs font-mono">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                    </div>
                    <div className="px-3 py-0.5 rounded-full bg-black/5 text-[#52483E] text-[10px] font-semibold">
                      {project.liveUrl ? project.liveUrl.replace('https://', '') : `${project.slug}.live`}
                    </div>
                    <div className="text-[10px] font-bold text-[#3062F7] flex items-center gap-1">
                      <span>Live</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </div>
                  </div>

                  {/* Central Showcase Preview */}
                  <div className="my-3 p-6 sm:p-8 rounded-xl bg-gradient-to-br from-[#FAF7F2] to-[#EFE8DD] border border-dashed border-[#DDD4C4] flex flex-col items-center justify-center text-center">
                    <div className="font-display font-black text-5xl text-[#2B231B]/15 mb-2">
                      {project.monogram}
                    </div>
                    <div className="font-serif font-bold text-base text-[#1E1915]">
                      {project.title}
                    </div>
                    <p className="text-xs text-[#52483E] max-w-xs mt-1">
                      {project.shortDescription}
                    </p>
                  </div>

                  {/* Metrics Strip */}
                  {project.metrics && (
                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-black/10 text-center font-mono">
                      {project.metrics.map((m, mIdx) => (
                        <div key={mIdx} className="p-1.5 rounded-lg bg-[#F8F4EC]">
                          <div className="text-xs font-bold text-[#1E1915]">{m.value}</div>
                          <div className="text-[9px] text-[#786C5E] truncate">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ================= RIGHT COLUMN: NUMBER, NAME, SUBTEXT & ACTION ================= */}
          <div className="lg:col-span-5 flex flex-col justify-center z-10 space-y-4">
            <div>
              {/* Number Kicker (e.g. 01, 02, 03) */}
              <div className="font-serif font-black text-2xl sm:text-3xl text-[#C2410C] tracking-tight">
                {numIndex}
              </div>

              {/* Big Serif Display Title / Name */}
              <h3 className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl text-[#1E1915] tracking-tight leading-[1.08] mt-1">
                {project.displayTitle || project.title}
              </h3>

              {/* Highlighter Accent */}
              <div className="w-24 sm:w-32 h-2 bg-[#F6C343]/70 rounded-full -rotate-1 mt-1 -mb-1 shadow-2xs pointer-events-none" />

              {/* Category Subtitle */}
              <div className="font-serif text-base sm:text-lg font-bold text-[#322A22] mt-3">
                {project.displayCategory || project.subtitle}
              </div>

              {/* Editorial Sentence Summary / Subtext */}
              <p className="text-sm sm:text-base font-sans text-[#52483E] leading-relaxed mt-2.5 font-normal max-w-md">
                {project.editorialSummary || project.shortDescription}
              </p>
            </div>

            {/* Clean Action Buttons: "View Case Study" + optional "Try Live Sandbox" */}
            <div className="flex flex-wrap items-center gap-3 pt-2 select-none">
              {/* Yellow Masking Tape Accents on View Case Study */}
              <div className="relative inline-block">
                <span
                  className="absolute -top-2 -left-2 w-6 h-3 bg-[#F4CF55]/85 border-t border-b border-black/10 -rotate-12 shadow-xs pointer-events-none z-10"
                  aria-hidden="true"
                />
                <span
                  className="absolute -bottom-2 -right-2 w-6 h-3 bg-[#F4CF55]/85 border-t border-b border-black/10 rotate-12 shadow-xs pointer-events-none z-10"
                  aria-hidden="true"
                />

                <button
                  onClick={() => onOpenCaseStudy(project)}
                  className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#241711] hover:bg-[#3A241B] text-[#FAF5ED] font-sans font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>View Case Study</span>
                  <ArrowUpRight className="w-4 h-4 text-[#F4BE24]" />
                </button>
              </div>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 sm:py-3.5 rounded-full bg-white hover:bg-[#FAF7F2] text-[#241711] border border-[#DDD4C4] hover:border-[#B8AB96] font-sans font-bold text-xs sm:text-sm shadow-2xs hover:shadow-xs transition-all duration-200 inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Try Live Sandbox</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#3062F7]" />
                </a>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
