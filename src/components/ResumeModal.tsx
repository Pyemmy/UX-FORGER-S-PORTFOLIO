import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Download,
  FileText,
  Mail,
  Phone,
  Award,
  Clock,
  GraduationCap,
  Copy,
  Check,
  ExternalLink,
} from 'lucide-react';
import {
  PERSONAL_INFO,
  EXPERIENCES,
  EDUCATION_LIST,
  AWARDS_LIST,
  SKILL_CATEGORIES,
} from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl bg-[#171A21] border border-white/10 rounded-xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col text-[#F5F7FA]"
            role="dialog"
            aria-modal="true"
            aria-label="Curriculum Vitae"
          >
            {/* Header */}
            <div className="bg-[#12141A] border-b border-white/10 px-6 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-[#1D9E75]" />
                <div>
                  <h3 className="font-display font-bold text-base text-white">
                    Official Curriculum Vitae
                  </h3>
                  <p className="text-xs font-mono text-[#9BA3AF]">
                    Owowade Opeyemi · The UX Forger
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={PERSONAL_INFO.cvPdfUrl}
                  download="Owowade_Opeyemi_CV.pdf"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1D9E75] hover:bg-[#22B586] text-white text-xs font-mono font-medium rounded-lg transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </a>
                <button
                  onClick={onClose}
                  aria-label="Close CV viewer"
                  className="p-1.5 rounded-lg text-[#9BA3AF] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-8 text-sm">
              {/* Profile Card */}
              <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] pb-3">
                  <div>
                    <h2 className="text-2xl font-display font-bold text-white">
                      {PERSONAL_INFO.name}
                    </h2>
                    <p className="text-xs font-mono text-[#1D9E75]">
                      {PERSONAL_INFO.roleTitle} · {PERSONAL_INFO.specialization}
                    </p>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-[#9BA3AF] hover:text-white bg-white/5 hover:bg-white/10 rounded border border-white/10 transition-colors"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3 h-3 text-[#1D9E75]" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Email</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-xs text-[#9BA3AF] leading-relaxed">
                  Product Designer and Engineer with 2+ years of experience designing web and mobile
                  products and building them with AI-assisted development. 2× hackathon award winner,
                  Senior Product Designer at EcoVest, and founder of Forge Academy.
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#9BA3AF] pt-1">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#1D9E75]" />
                    {PERSONAL_INFO.email}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#1D9E75]" />
                    {PERSONAL_INFO.phoneDisplay}
                  </span>
                  <span className="text-[#C7F36B]">{PERSONAL_INFO.location}</span>
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#9BA3AF] font-bold mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#F26522]" />
                  <span>Competition Achievements &amp; Awards</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {AWARDS_LIST.map((award) => (
                    <div
                      key={award.id}
                      className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.06] space-y-1.5"
                    >
                      <span className="inline-block text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[#F26522]/10 text-[#F26522] border border-[#F26522]/20">
                        {award.badgeTag}
                      </span>
                      <h5 className="font-display font-semibold text-sm text-white">
                        {award.title}
                      </h5>
                      <p className="text-xs text-[#9BA3AF] leading-relaxed">
                        {award.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#9BA3AF] font-bold mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#1D9E75]" />
                  <span>Professional Experience</span>
                </h4>
                <div className="space-y-3">
                  {EXPERIENCES.map((exp) => (
                    <div
                      key={exp.id}
                      className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.06] space-y-1.5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-display font-semibold text-sm text-white">
                          {exp.role} · <span className="text-[#1D9E75]">{exp.company}</span>
                        </span>
                        <span className="text-[11px] font-mono text-[#6B7280]">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-xs text-[#9BA3AF] leading-relaxed">
                        {exp.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {exp.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-[#9BA3AF]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#9BA3AF] font-bold mb-3 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#C7F36B]" />
                  <span>Education &amp; Credentials</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {EDUCATION_LIST.map((edu, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-lg bg-white/[0.02] border border-white/[0.06] space-y-1"
                    >
                      <div className="font-display font-semibold text-xs text-white">
                        {edu.degree}
                      </div>
                      <div className="text-xs font-mono text-[#1D9E75]">
                        {edu.institution}
                      </div>
                      <div className="text-[11px] text-[#6B7280]">{edu.period}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-[#12141A] border-t border-white/10 px-6 py-3.5 flex items-center justify-between shrink-0 text-xs font-mono text-[#9BA3AF]">
              <span>Official CV stored at public asset path</span>
              <a
                href={PERSONAL_INFO.cvPdfUrl}
                download="Owowade_Opeyemi_CV.pdf"
                className="inline-flex items-center gap-1.5 text-[#1D9E75] hover:text-[#22B586] font-semibold"
              >
                <span>Download PDF Document</span>
                <Download className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
