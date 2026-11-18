import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';
import { SmartImage } from './ui/SmartImage';
import { EASE_OUT, REVEAL_VIEWPORT } from '../utils/motion';
import { readableOn } from '../utils/color';
import { sizeOf } from '../data/imageSizes';

interface EditorialProjectCardProps {
  project: ProjectItem;
  index: number;
  onOpenCaseStudy: (project: ProjectItem) => void;
}

/** Shown for projects whose screenshot hasn't been added yet (or failed to load). */
const ProjectPoster: React.FC<{ project: ProjectItem }> = ({ project }) => {
  const accent = project.folderBg;
  const onAccent = readableOn(accent);
  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-black/10 sm:rounded-[26px]"
      style={{ backgroundColor: accent, color: onAccent }}
    >
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage: `radial-gradient(${onAccent} 1.2px, transparent 1.2px)`,
          backgroundSize: '18px 18px',
        }}
        aria-hidden="true"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-10 -right-6 select-none font-serif text-[11rem] font-black leading-none opacity-15 sm:text-[14rem]"
      >
        {project.monogram}
      </div>
      <div className="relative flex h-full flex-col justify-between p-6 sm:p-8">
        <span
          className="inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider"
          style={{ backgroundColor: onAccent === '#FFFFFF' ? 'rgba(255,255,255,0.16)' : 'rgba(20,22,24,0.1)' }}
        >
          {project.category}
        </span>
        <div>
          <p className="max-w-sm font-serif text-xl font-bold leading-snug sm:text-2xl">{project.title}</p>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 3).map((t) => (
              <li
                key={t}
                className="rounded-md px-2 py-0.5 font-mono text-[10px] font-semibold"
                style={{ backgroundColor: onAccent === '#FFFFFF' ? 'rgba(255,255,255,0.14)' : 'rgba(20,22,24,0.08)' }}
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export const EditorialProjectCard: React.FC<EditorialProjectCardProps> = ({ project, index, onOpenCaseStudy }) => {
  const numIndex = project.numberIndex || String(index + 1).padStart(2, '0');
  const title = project.displayTitle || project.title;
  const size = sizeOf(project.mockupImage);

  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={REVEAL_VIEWPORT}
      transition={{ duration: 0.7, ease: EASE_OUT }}
      aria-labelledby={`project-${project.id}-title`}
      className="group/card relative rounded-[32px] border border-[#DDD4C4] bg-card p-5 shadow-soft transition-shadow duration-500 hover:shadow-[0_28px_60px_-18px_rgba(40,30,20,0.22)] sm:rounded-[40px] sm:p-8 lg:p-11 lg:pr-8"
    >
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12 xl:gap-14">
        {/* Visual */}
        <div className="relative flex w-full items-center justify-center lg:col-span-7">
          <button
            type="button"
            onClick={() => onOpenCaseStudy(project)}
            aria-label={`Open the ${title} case study`}
            className="group/mockup relative w-full max-w-[620px] rounded-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 sm:rounded-[26px]"
          >
            {project.mockupImage ? (
              <span className="relative block overflow-hidden rounded-2xl shadow-[0_20px_45px_rgba(20,15,10,0.16)] transition-shadow duration-500 group-hover/mockup:shadow-[0_28px_55px_rgba(20,15,10,0.24)] sm:rounded-[22px]">
                <SmartImage
                  src={project.mockupImage}
                  alt={`${title} — ${project.displayCategory ?? project.subtitle}`}
                  width={size?.w ?? 1600}
                  height={size?.h ?? 1100}
                  className="block h-auto w-full"
                  fallback={<ProjectPoster project={project} />}
                />
              </span>
            ) : (
              <ProjectPoster project={project} />
            )}
            <span className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-[inherit] bg-black/0 transition-colors duration-300 group-hover/mockup:bg-black/10">
              <span className="flex translate-y-2 items-center gap-2 rounded-xl border border-white/20 bg-black/85 px-4 py-2 font-mono text-xs font-bold text-white opacity-0 shadow-xl transition-[opacity,transform] duration-300 group-hover/mockup:translate-y-0 group-hover/mockup:opacity-100 group-focus-visible/mockup:translate-y-0 group-focus-visible/mockup:opacity-100">
                <span>Open case study</span>
                <ArrowUpRight className="h-4 w-4 text-sun" />
              </span>
            </span>
          </button>
        </div>

        {/* Copy */}
        <div className="z-10 flex flex-col justify-center lg:col-span-5">
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-2xl font-black tracking-tight text-rust sm:text-3xl">{numIndex}</span>
            {project.awardOrBadge && (
              <span className="truncate font-mono text-[10px] font-bold uppercase tracking-wider text-ink-3 sm:text-[11px]">
                {project.awardOrBadge.replace(/^[^\w₦]+/u, '')}
              </span>
            )}
          </div>

          <h3
            id={`project-${project.id}-title`}
            className="mt-1 font-serif text-[2.1rem] font-black leading-[1.05] tracking-tight text-[#1E1915] sm:text-4xl lg:text-5xl"
          >
            {title}
          </h3>
          <motion.div
            aria-hidden="true"
            className="mt-1 h-2 w-24 origin-left -rotate-1 rounded-full bg-[#F6C343]/75 sm:w-32"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25, ease: EASE_OUT }}
          />

          <p className="mt-3 font-serif text-base font-bold text-[#322A22] sm:text-lg">
            {project.displayCategory || project.subtitle}
          </p>
          <p className="mt-2.5 max-w-md text-sm leading-relaxed text-[#4A4037] sm:text-base">
            {project.editorialSummary || project.shortDescription}
          </p>

          <p className="mt-4 font-mono text-[11px] text-ink-3">
            <span className="font-bold text-ink">Role</span> · {project.myRoleTitle || project.role}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-5">
            <span className="relative inline-block">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -left-2 -top-2 z-10 h-3 w-6 -rotate-12 border-y border-black/10 bg-[#F4CF55]/85"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-2 -right-2 z-10 h-3 w-6 rotate-12 border-y border-black/10 bg-[#F4CF55]/85"
              />
              <button
                type="button"
                onClick={() => onOpenCaseStudy(project)}
                className="lift inline-flex items-center gap-2 rounded-full bg-[#241711] px-6 py-3 text-sm font-bold text-[#FAF5ED] shadow-md hover:bg-[#3A241B] hover:shadow-lg sm:px-7 sm:py-3.5"
              >
                <span>View case study</span>
                <ArrowUpRight className="h-4 w-4 text-sun" />
              </button>
            </span>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="lift inline-flex items-center gap-1.5 rounded-full border border-[#DDD4C4] bg-white px-5 py-3 text-sm font-bold text-[#241711] shadow-2xs hover:border-[#B8AB96] sm:py-3.5"
              >
                <span>Try it live</span>
                <ExternalLink className="h-3.5 w-3.5 text-cobalt-ink" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
};
