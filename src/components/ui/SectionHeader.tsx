import React from 'react';
import { Reveal, RevealItem } from './Reveal';

interface SectionHeaderProps {
  kicker: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Accent dot colour; matches the section's colour in the nav. */
  accent: string;
  align?: 'center' | 'left';
  /** Optional element shown on the right on wide screens (e.g. carousel controls). */
  aside?: React.ReactNode;
  id?: string;
  className?: string;
}

/** The one header pattern every section uses: mono kicker, display title, short subtitle. */
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  kicker,
  title,
  subtitle,
  accent,
  align = 'center',
  aside,
  id,
  className = '',
}) => {
  const centered = align === 'center';
  return (
    <Reveal
      className={`mb-10 sm:mb-14 ${
        aside ? 'flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between' : ''
      } ${centered && !aside ? 'text-center' : ''} ${className}`}
    >
      <div className={centered && !aside ? 'mx-auto max-w-2xl' : 'max-w-2xl'}>
        <RevealItem>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-paper-2 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-3 shadow-[0_1px_0_rgba(0,0,0,0.04)]">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} aria-hidden="true" />
            {kicker}
          </span>
        </RevealItem>
        <RevealItem>
          <h2
            id={id}
            className="mt-4 font-display text-[2.15rem] font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl"
          >
            {title}
          </h2>
        </RevealItem>
        {subtitle && (
          <RevealItem>
            <p className="mt-3 text-sm leading-relaxed text-ink-3 sm:text-base">{subtitle}</p>
          </RevealItem>
        )}
      </div>
      {aside && <RevealItem className="shrink-0">{aside}</RevealItem>}
    </Reveal>
  );
};
