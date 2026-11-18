import React from 'react';
import { Check } from 'lucide-react';
import { CAPABILITIES } from '../../data/portfolioData';
import { SectionHeader } from '../ui/SectionHeader';
import { Reveal, RevealItem } from '../ui/Reveal';

export const CapabilitiesSection: React.FC = () => (
  <section id="capabilities" aria-labelledby="capabilities-title" className="cv-auto mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
    <SectionHeader
      id="capabilities-title"
      accent="#3062F7"
      kicker="Expertise"
      title="What I work on"
      subtitle="I partner with founders, engineering leads and product teams across the full lifecycle, from early problem framing to functional code."
    />

    <Reveal as="ul" className="space-y-4" stagger={0.08}>
      {CAPABILITIES.map((cap) => (
        <RevealItem as="li" key={cap.id}>
          <article className="lift flex flex-col justify-between gap-6 rounded-2xl border border-line-soft bg-white p-6 shadow-xs hover:shadow-[0_18px_40px_-20px_rgba(40,30,20,0.25)] md:flex-row md:items-start">
            <div className="flex flex-1 items-start gap-4">
              <span
                aria-hidden="true"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-line-soft bg-paper-2 text-2xl"
              >
                {cap.emoji}
              </span>
              <div>
                <h3 className="mb-1 font-display text-xl font-bold text-ink">{cap.title}</h3>
                <p className="mb-3 text-sm leading-relaxed text-ink-3">{cap.summary}</p>
                <ul className="flex flex-wrap gap-1.5" aria-label="Focus areas">
                  {cap.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-md border border-line-soft bg-paper-2 px-2.5 py-0.5 font-mono text-[11px] text-ink-3"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="shrink-0 space-y-1.5 border-t border-paper pt-3 text-xs text-ink-3 md:w-64 md:border-l md:border-t-0 md:pl-6 md:pt-0">
              <h4 className="mb-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-ink">Deliverables</h4>
              <ul className="space-y-1.5">
                {cap.outcomes.map((out) => (
                  <li key={out} className="flex items-start gap-1.5">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-mint-ink" strokeWidth={3} aria-hidden="true" />
                    <span>{out}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </RevealItem>
      ))}
    </Reveal>
  </section>
);
