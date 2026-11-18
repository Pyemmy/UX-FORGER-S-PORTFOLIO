import React, { useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Award, Clock, Copy, Download, FileText, GraduationCap, Mail, MapPin, Phone, X } from 'lucide-react';
import { AWARDS_LIST, EDUCATION_LIST, EXPERIENCES, PERSONAL_INFO } from '../data/portfolioData';
import { useScrollLock } from '../hooks/useScrollLock';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { useToast } from './ui/Toast';
import { EASE_OUT } from '../utils/motion';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Dialog: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const { copy } = useToast();

  useScrollLock(true);
  useFocusTrap(panelRef, true, { initialFocus: closeRef, onEscape: onClose });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[80] flex items-end justify-center bg-black/75 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-title"
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.98, transition: { duration: 0.18 } }}
        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl border border-white/10 bg-night-2 text-night-text shadow-2xl sm:max-h-[90vh] sm:rounded-2xl"
      >
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 bg-night-3 px-5 py-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <FileText className="h-5 w-5 shrink-0 text-teal" aria-hidden="true" />
            <div className="min-w-0">
              <h2 id="resume-title" className="font-display text-base font-bold text-white">
                Résumé
              </h2>
              <p className="truncate font-mono text-xs text-night-muted">{PERSONAL_INFO.fullName} · The UX Forger</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <a
              href={PERSONAL_INFO.cvPdfUrl}
              download={PERSONAL_INFO.cvFileName}
              className="inline-flex items-center gap-1.5 rounded-lg bg-teal-ink px-3 py-1.5 font-mono text-xs font-medium text-white transition-colors hover:bg-[#0F6449]"
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              <span>PDF</span>
            </a>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close résumé"
              className="rounded-lg p-1.5 text-night-muted transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="space-y-8 overflow-y-auto overscroll-contain p-5 text-sm sm:p-8">
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.08 }}
            className="space-y-3 rounded-xl border border-white/[0.08] bg-white/[0.03] p-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] pb-3">
              <div>
                <p className="font-display text-2xl font-bold text-white">{PERSONAL_INFO.name}</p>
                <p className="font-mono text-xs text-teal">
                  {PERSONAL_INFO.roleTitle} · {PERSONAL_INFO.specialization}
                </p>
              </div>
              <button
                type="button"
                onClick={() => copy(PERSONAL_INFO.email, 'Email copied')}
                className="inline-flex items-center gap-1.5 rounded border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-xs text-night-muted transition-colors hover:bg-white/10 hover:text-white"
              >
                <Copy className="h-3 w-3" aria-hidden="true" />
                Copy email
              </button>
            </div>
            <p className="text-[13px] leading-relaxed text-night-muted">
              Product Designer and Engineer with 2+ years of experience designing web and mobile products and building
              them with AI-assisted development. 2× hackathon award winner, Senior Product Designer at EcoVest, and
              founder of Forge Academy.
            </p>
            <ul className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-1 font-mono text-xs text-night-muted">
              <li className="flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-teal" aria-hidden="true" />
                <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-white">
                  {PERSONAL_INFO.email}
                </a>
              </li>
              <li className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-teal" aria-hidden="true" />
                <a href={`tel:${PERSONAL_INFO.phone.replace(/\s/g, '')}`} className="hover:text-white">
                  {PERSONAL_INFO.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-lime">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                {PERSONAL_INFO.location}
              </li>
            </ul>
          </motion.section>

          <section>
            <h3 className="mb-3 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-night-muted">
              <Award className="h-4 w-4 text-[#FF8A4C]" aria-hidden="true" />
              Awards &amp; achievements
            </h3>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {AWARDS_LIST.map((award) => (
                <li key={award.id} className="space-y-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
                  <span className="inline-block rounded border border-[#F26522]/25 bg-[#F26522]/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-[#FF8A4C]">
                    {award.badgeTag}
                  </span>
                  <h4 className="font-display text-sm font-semibold text-white">{award.title}</h4>
                  <p className="text-xs leading-relaxed text-night-muted">{award.description}</p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="mb-3 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-night-muted">
              <Clock className="h-4 w-4 text-teal" aria-hidden="true" />
              Experience
            </h3>
            <ul className="space-y-3">
              {EXPERIENCES.map((exp) => (
                <li key={exp.id} className="space-y-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="font-display text-sm font-semibold text-white">
                      {exp.role} · <span className="text-teal">{exp.company}</span>
                    </h4>
                    <span className="font-mono text-[11px] text-night-faint">{exp.period}</span>
                  </div>
                  <p className="text-xs leading-relaxed text-night-muted">{exp.description}</p>
                  <ul className="flex flex-wrap gap-1.5 pt-1">
                    {exp.skills.map((skill) => (
                      <li key={skill} className="rounded bg-white/5 px-2 py-0.5 font-mono text-[10px] text-night-muted">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="mb-3 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-night-muted">
              <GraduationCap className="h-4 w-4 text-lime" aria-hidden="true" />
              Education &amp; credentials
            </h3>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {EDUCATION_LIST.map((edu) => (
                <li key={`${edu.institution}-${edu.degree}`} className="space-y-1 rounded-lg border border-white/[0.06] bg-white/[0.02] p-3.5">
                  <h4 className="font-display text-xs font-semibold text-white">{edu.degree}</h4>
                  <p className="font-mono text-xs text-teal">{edu.institution}</p>
                  <p className="text-[11px] text-night-faint">{edu.period}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-white/10 bg-night-3 px-5 py-3.5 font-mono text-xs text-night-muted sm:px-6">
          <span>Updated Nov 2026</span>
          <a
            href={PERSONAL_INFO.cvPdfUrl}
            download={PERSONAL_INFO.cvFileName}
            className="inline-flex items-center gap-1.5 font-semibold text-teal transition-colors hover:text-[#22B586]"
          >
            Download PDF
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => (
  <AnimatePresence>{isOpen && <Dialog key="resume" onClose={onClose} />}</AnimatePresence>
);
