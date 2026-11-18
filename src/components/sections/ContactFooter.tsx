import React from 'react';
import { motion } from 'motion/react';
import { ArrowUp, Copy, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { useToast } from '../ui/Toast';
import { EASE_OUT, REVEAL_VIEWPORT, SPRING_BOUNCY } from '../../utils/motion';

const Sparkle: React.FC<{ fill: string; className: string; delay: number }> = ({ fill, className, delay }) => (
  <motion.span
    aria-hidden="true"
    className={`pointer-events-none absolute select-none ${className}`}
    initial={{ scale: 0, rotate: -90 }}
    whileInView={{ scale: 1, rotate: 0 }}
    viewport={{ once: true }}
    transition={{ ...SPRING_BOUNCY, delay }}
  >
    <svg viewBox="0 0 44 44" className="sparkle-sway h-9 w-9 sm:h-11 sm:w-11" fill="none">
      <path
        d="M22 2 C22 13, 29 20, 42 22 C29 24, 22 31, 22 42 C22 31, 15 24, 2 22 C15 20, 22 13, 22 2 Z"
        fill={fill}
        stroke="#141618"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  </motion.span>
);

interface ContactFooterProps {
  onOpenResume: () => void;
  onNavigate: (id: string) => void;
}

export const ContactFooter: React.FC<ContactFooterProps> = ({ onOpenResume, onNavigate }) => {
  const { copy } = useToast();
  const year = new Date().getFullYear();

  return (
    <footer id="contact" aria-labelledby="contact-title" className="mx-auto max-w-5xl px-4 pb-12 pt-16 sm:px-6 sm:pt-24">
      <motion.div
        initial={{ opacity: 0, y: 40, rotate: -1 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={REVEAL_VIEWPORT}
        transition={{ duration: 0.8, ease: EASE_OUT }}
        className="relative flex flex-col items-center overflow-hidden rounded-[2.5rem] border-[3px] border-ink bg-[#FFCC33] p-8 text-center shadow-[8px_8px_0_#141618] sm:p-14 lg:p-16"
      >
        <Sparkle fill="#FF758F" className="left-5 top-5 sm:left-7 sm:top-7" delay={0.3} />
        <Sparkle fill="#4FD1C5" className="bottom-5 right-5 sm:bottom-7 sm:right-7" delay={0.45} />

        <p className="mb-2 font-serif text-lg font-medium italic tracking-tight text-ink sm:text-2xl">got an idea?</p>
        <h2
          id="contact-title"
          className="mb-4 max-w-2xl font-display text-4xl font-black leading-[1.05] tracking-tight text-ink sm:text-6xl md:text-7xl"
        >
          Let&apos;s build something fun.
        </h2>
        <p className="max-w-md text-sm font-medium text-ink-2 sm:text-base">
          {PERSONAL_INFO.availability}. Product design, design engineering, or a fast prototype. Tell me what
          you&apos;re building.
        </p>

        <div className="group my-6 flex flex-col items-center">
          <button
            type="button"
            onClick={() => copy(PERSONAL_INFO.email, 'Email copied')}
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-sm font-bold text-ink transition-colors hover:bg-black/5 md:text-base"
            aria-label={`Copy email address ${PERSONAL_INFO.email}`}
          >
            <span>{PERSONAL_INFO.email}</span>
            <Copy className="h-4 w-4" aria-hidden="true" />
          </button>
          <svg aria-hidden="true" className="mt-0.5 h-3.5 w-44 text-ink sm:w-56" viewBox="0 0 200 12" fill="none">
            <motion.path
              d="M2 6 Q 12 1, 22 6 T 42 6 T 62 6 T 82 6 T 102 6 T 122 6 T 142 6 T 162 6 T 182 6 T 198 6"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: EASE_OUT, delay: 0.3 }}
            />
          </svg>
        </div>

        <ul className="z-10 mt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <li>
            <a
              href={`mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent("Let's build something")}`}
              className="btn-brutal inline-flex items-center gap-2 rounded-xl bg-[#FF5A43] px-5 py-2.5 font-mono text-sm font-bold text-ink hover:bg-[#FF6B56] sm:px-6 sm:py-3"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Email
            </a>
          </li>
          <li>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brutal inline-flex items-center gap-2 rounded-xl bg-[#7C97FF] px-5 py-2.5 font-mono text-sm font-bold text-ink hover:bg-[#8DA5FF] sm:px-6 sm:py-3"
            >
              <span className="font-display text-xs font-black leading-none" aria-hidden="true">
                in
              </span>
              LinkedIn
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </li>
          <li>
            <a
              href={PERSONAL_INFO.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brutal inline-flex items-center gap-2 rounded-xl bg-paper-2 px-5 py-2.5 font-mono text-sm font-bold text-ink hover:bg-white sm:px-6 sm:py-3"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.05 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413Z" />
              </svg>
              WhatsApp
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </li>
          <li>
            <a
              href={PERSONAL_INFO.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brutal inline-flex items-center gap-2 rounded-xl bg-[#4FD1A5] px-5 py-2.5 font-mono text-sm font-bold text-ink hover:bg-[#63DBB2] sm:px-6 sm:py-3"
            >
              <span className="font-display text-sm font-black leading-none" aria-hidden="true">
                𝕏
              </span>
              X / Twitter
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </li>
        </ul>
      </motion.div>

      <div className="mt-8 flex flex-col items-center justify-between gap-4 font-mono text-xs text-ink-3 sm:flex-row">
        <p className="flex items-center gap-2">
          <span className="font-bold text-ink">The UX Forger</span>
          <span aria-hidden="true">·</span>
          <span>{PERSONAL_INFO.name}</span>
        </p>
        <p>
          Designed &amp; built by me · © {year}
        </p>
        <div className="flex items-center gap-4">
          <button type="button" onClick={onOpenResume} className="underline underline-offset-4 transition-colors hover:text-ink">
            Résumé
          </button>
          <a
            href={PERSONAL_INFO.cvPdfUrl}
            download={PERSONAL_INFO.cvFileName}
            className="underline underline-offset-4 transition-colors hover:text-ink"
          >
            Download CV
          </a>
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('top');
            }}
            className="group inline-flex items-center gap-1 font-bold text-ink"
          >
            Back to top
            <ArrowUp className="h-3 w-3 transition-transform group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
};
