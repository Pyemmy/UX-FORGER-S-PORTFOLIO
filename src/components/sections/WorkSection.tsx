import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { PROJECTS, ProjectItem } from '../../data/portfolioData';
import { EditorialProjectCard } from '../EditorialProjectCard';
import { SectionHeader } from '../ui/SectionHeader';
import { sounds } from '../../utils/audio';
import { EASE_OUT, SPRING_SNAPPY } from '../../utils/motion';

type Filter = 'ALL' | 'Shipped AI Build' | 'Product Case Study';

const FILTERS: { id: Filter; label: string; activeClass: string }[] = [
  { id: 'ALL', label: 'All projects', activeClass: 'bg-ink text-white' },
  { id: 'Shipped AI Build', label: '⚡ Shipped AI builds', activeClass: 'bg-rust text-white' },
  { id: 'Product Case Study', label: '📐 Product case studies', activeClass: 'bg-mint-ink text-white' },
];

interface WorkSectionProps {
  onOpenProject: (project: ProjectItem) => void;
}

export const WorkSection: React.FC<WorkSectionProps> = ({ onOpenProject }) => {
  const [filter, setFilter] = useState<Filter>('ALL');

  const counts = useMemo(
    () => ({
      ALL: PROJECTS.length,
      'Shipped AI Build': PROJECTS.filter((p) => p.category === 'Shipped AI Build').length,
      'Product Case Study': PROJECTS.filter((p) => p.category === 'Product Case Study').length,
    }),
    [],
  );

  const projects = filter === 'ALL' ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="work" aria-labelledby="work-title" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <SectionHeader
        id="work-title"
        accent="#F4BE24"
        kicker={`${PROJECTS.length} builds & case studies`}
        title={
          <>
            Selected work <span className="font-normal text-rust">↗</span>
          </>
        }
        subtitle="Award-winning hackathon builds, shipped AI products and end-to-end product design. Open any project for the full story."
      />

      <div role="group" aria-label="Filter projects" className="-mt-4 mb-12 flex flex-wrap items-center justify-center gap-2 sm:mb-16">
        {FILTERS.map((f) => {
          const active = filter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={active}
              onClick={() => {
                if (active) return;
                sounds.playClick();
                setFilter(f.id);
              }}
              className={`relative rounded-full border px-4 py-2 text-xs font-semibold transition-colors sm:text-[13px] ${
                active ? 'border-transparent text-white' : 'border-line bg-white text-ink-3 hover:text-ink'
              }`}
            >
              {active && (
                <motion.span
                  layoutId="work-filter-pill"
                  transition={SPRING_SNAPPY}
                  className={`absolute inset-0 rounded-full ${f.activeClass}`}
                />
              )}
              <span className="relative">
                {f.label} <span className="font-mono text-[11px]">({counts[f.id]})</span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="space-y-10 sm:space-y-16 lg:space-y-20">
        <AnimatePresence mode="popLayout" initial={false}>
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              layout="position"
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.2 } }}
              transition={{ duration: 0.5, ease: EASE_OUT }}
              className={idx > 0 ? 'cv-card' : undefined}
            >
              <EditorialProjectCard project={project} index={idx} onOpenCaseStudy={onOpenProject} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};
