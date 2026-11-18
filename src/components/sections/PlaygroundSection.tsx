import React from 'react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { EXPERIMENTS, PROJECTS, ProjectItem } from '../../data/portfolioData';
import { SectionHeader } from '../ui/SectionHeader';
import { Reveal, RevealItem } from '../ui/Reveal';
import { PlaygroundInteractiveToys } from '../PlaygroundInteractiveToys';
import { readableOn } from '../../utils/color';

interface PlaygroundSectionProps {
  onOpenProject: (project: ProjectItem) => void;
}

export const PlaygroundSection: React.FC<PlaygroundSectionProps> = ({ onOpenProject }) => (
  <section id="playground" aria-labelledby="playground-title" className="cv-auto mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
    <SectionHeader
      id="playground-title"
      accent="#9B8AF5"
      kicker="Playground & lab"
      title={
        <>
          Things I build to <span className="italic font-serif font-black text-lavender-ink">learn in public</span>
        </>
      }
      subtitle="A workshop for creative engineering, micro-interaction physics, design tokens and functional prototypes, shipped fast and shared with the builder community."
    />

    <Reveal as="ul" className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2" stagger={0.08}>
      {EXPERIMENTS.map((exp) => {
        const project = exp.projectSlug ? PROJECTS.find((p) => p.slug === exp.projectSlug) : undefined;
        return (
          <RevealItem as="li" key={exp.id}>
            <article className="lift flex h-full flex-col justify-between space-y-4 rounded-2xl border border-line-soft bg-white p-6 shadow-xs hover:shadow-[0_18px_40px_-20px_rgba(40,30,20,0.28)]">
              <div>
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span
                    className="rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold"
                    style={{ backgroundColor: exp.color, color: readableOn(exp.color) }}
                  >
                    {exp.status}
                  </span>
                  <span className="font-mono text-xs text-ink-3">{exp.duration}</span>
                </div>
                <h3 className="mb-1 font-display text-xl font-bold text-ink">{exp.title}</h3>
                <p className="mb-3 text-sm leading-relaxed text-ink-3">{exp.description}</p>
                <dl className="mb-3 space-y-1.5 rounded-xl border border-paper-3 bg-paper-2 p-3 font-mono text-[11px] leading-relaxed text-ink-3">
                  <div>
                    <dt className="inline font-bold text-ink">What: </dt>
                    <dd className="inline">{exp.whatItIs}</dd>
                  </div>
                  <div>
                    <dt className="inline font-bold text-ink">Why: </dt>
                    <dd className="inline">{exp.whyItExists}</dd>
                  </div>
                </dl>
                <ul className="flex flex-wrap gap-1.5" aria-label="Stack">
                  {exp.stack.map((s) => (
                    <li key={s} className="rounded bg-paper px-2 py-0.5 font-mono text-[10px] text-ink-3">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-paper pt-3 font-mono text-xs font-bold">
                {project ? (
                  <button
                    type="button"
                    onClick={() => onOpenProject(project)}
                    className="group inline-flex items-center gap-1 text-ink underline-offset-4 hover:underline"
                  >
                    Read case study
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </button>
                ) : (
                  <span />
                )}
                {exp.liveUrl && (
                  <a
                    href={exp.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-cobalt-ink underline-offset-4 hover:underline"
                  >
                    Launch prototype
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
              </div>
            </article>
          </RevealItem>
        );
      })}
    </Reveal>

    <PlaygroundInteractiveToys />
  </section>
);
