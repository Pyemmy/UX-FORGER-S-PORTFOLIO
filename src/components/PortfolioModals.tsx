import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUpRight, CheckCircle2, Download, FileText, Sparkles, Layers } from 'lucide-react';
import { ProjectItem, TestimonialItem, EXPERIENCES, STACK_ITEMS } from '../data/portfolioData';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onInquireProject: (projectName: string) => void;
}

export const ProjectCaseStudyModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onInquireProject,
}) => {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl bg-[#0D1010] border border-white/10 overflow-hidden my-auto max-h-[90vh] flex flex-col"
          >
            {/* Top visual banner matching the project card */}
            <div
              className="relative h-56 sm:h-64 w-full overflow-hidden p-6 sm:p-8 flex flex-col justify-between shrink-0"
              style={{
                background: `linear-gradient(135deg, ${project.gradientFrom} 0%, ${project.gradientVia} 52%, ${project.gradientTo} 100%)`,
              }}
            >
              {/* Wireframe UI bars from the portfolio design */}
              <div className="space-y-2.5 max-w-md opacity-70">
                <div
                  className="h-1.5 w-36 rounded-full"
                  style={{ backgroundColor: project.accentLineColor }}
                />
                <div className="h-1.5 w-64 rounded-full bg-white/25" />
                <div className="h-1.5 w-48 rounded-full bg-white/15" />
              </div>

              <div className="flex items-end justify-between z-10">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono-num tracking-wider text-white/75 mb-2">
                    {project.categories.map((cat, idx) => (
                      <React.Fragment key={cat}>
                        <span>{cat}</span>
                        {idx < project.categories.length - 1 && (
                          <span aria-hidden="true" className="text-white/40">
                            ·
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                  <h2 className="text-3xl sm:text-5xl font-display font-semibold text-white tracking-tight">
                    {project.title}
                  </h2>
                </div>

                <span className="font-display text-5xl sm:text-7xl font-bold text-white/15 select-none leading-none">
                  {project.monogram}
                </span>
              </div>

              <button
                onClick={onClose}
                aria-label="Close case study"
                className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center bg-black/40 hover:bg-black/70 text-white/80 hover:text-white border border-white/15 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Case study body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-8 text-sm text-[#A2ABA9]">
              {/* Metadata bar */}
              <div className="grid grid-cols-3 gap-4 pb-6 border-b border-white/10">
                <div>
                  <div className="text-[11px] font-mono-num text-[#687370] mb-1">ROLE</div>
                  <div className="text-white font-medium">{project.role}</div>
                </div>
                <div>
                  <div className="text-[11px] font-mono-num text-[#687370] mb-1">TIMELINE</div>
                  <div className="text-white font-medium font-mono-num">{project.duration}</div>
                </div>
                <div>
                  <div className="text-[11px] font-mono-num text-[#687370] mb-1">YEAR</div>
                  <div className="text-white font-medium font-mono-num">{project.year}</div>
                </div>
              </div>

              {/* Problem & Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#111515] border border-white/5 p-5">
                  <div className="text-xs font-mono-num text-[#14B8A6] mb-2">
                    01. THE CHALLENGE
                  </div>
                  <p className="text-[#D5DCDD] leading-relaxed">{project.problem}</p>
                </div>
                <div className="bg-[#111515] border border-white/5 p-5">
                  <div className="text-xs font-mono-num text-[#14B8A6] mb-2">
                    02. DESIGN SOLUTION
                  </div>
                  <p className="text-[#D5DCDD] leading-relaxed">{project.solution}</p>
                </div>
              </div>

              {/* Impact Metrics */}
              <div>
                <div className="text-xs font-mono-num text-[#687370] mb-3">
                  03. MEASURED OUTCOMES
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {project.impactMetrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="bg-[#111515] border border-white/5 p-4 border-l-2 border-l-[#14B8A6]"
                    >
                      <div className="text-2xl font-display font-bold text-white font-mono-num">
                        {metric.value}
                      </div>
                      <div className="text-xs text-[#8D9795] mt-1">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deliverables & Key Screens */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-xs font-mono-num text-[#687370] mb-3">
                    KEY DELIVERABLES
                  </div>
                  <ul className="space-y-2">
                    {project.deliverables.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-[#D5DCDD]">
                        <span className="text-[#14B8A6] font-mono-num">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-xs font-mono-num text-[#687370] mb-3">
                    INTERFACE ARCHITECTURE HIGHLIGHTS
                  </div>
                  <ul className="space-y-2">
                    {project.wireframeHighlights.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-[#D5DCDD]">
                        <Layers className="w-3.5 h-3.5 text-[#14B8A6] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Footer CTA */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs text-[#8D9795]">
                  Want a similar high-converting design for your product?
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={onClose}
                    className="px-4 py-2.5 text-xs font-mono-num text-[#A2ABA9] hover:text-white border border-white/10 hover:border-white/25 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    CLOSE PREVIEW
                  </button>
                  <button
                    onClick={() => {
                      const title = project.title;
                      onClose();
                      onInquireProject(title);
                    }}
                    className="px-5 py-2.5 text-xs font-mono-num font-medium bg-[#118A82] hover:bg-[#14A399] text-white transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap"
                  >
                    <span>REQUEST SIMILAR PROJECT</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumePreviewModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownloadResumeFile = () => {
    const resumeText = `OWOADE OPEYEMI (THE UX FORGER)
UI/UX & Product Designer · Lagos, Nigeria
Email: owoadeopeyemi11@gmail.com | Phone: +234 915 746 0998

SUMMARY
UI/UX and Product Designer based in Lagos, Nigeria, crafting clean, intentional, and high-converting digital interfaces. Mathematics student at the University of Lagos combining systems thinking, logic, and visual craft.

EXPERIENCE
${EXPERIENCES.map(
  (e) => `${e.role} — ${e.company} (${e.period} | ${e.employmentType})\n${e.description}\nSkills: ${e.skills.join(', ')}\n`
).join('\n')}

CORE STACK & SKILLS
${STACK_ITEMS.join(' · ')}
`;
    const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Owoade_Opeyemi_TheUXForger_Resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl bg-[#0D1010] border border-white/10 p-6 sm:p-8 my-auto max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-start justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <div className="text-xs font-mono-num text-[#14B8A6] mb-1">
                  — CURRICULUM VITAE
                </div>
                <h2 className="text-3xl font-display font-semibold text-white">
                  Owoade <span className="italic text-[#14B8A6] font-normal">Opeyemi</span>
                </h2>
                <p className="text-xs text-[#8D9795] mt-1">
                  UI/UX & Product Designer · University of Lagos (B.Sc. Mathematics) · Lagos, Nigeria
                </p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close resume modal"
                className="w-9 h-9 flex items-center justify-center border border-white/10 text-white/70 hover:text-white hover:border-white/25 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-6 space-y-6 text-sm">
              {EXPERIENCES.map((exp) => (
                <div key={exp.id} className="border-b border-white/5 pb-5 last:border-b-0 last:pb-0">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-mono-num text-[#14B8A6]">{exp.company}</span>
                    <span className="text-xs font-mono-num text-[#687370]">
                      {exp.period} · {exp.employmentType}
                    </span>
                  </div>
                  <div className="text-lg font-display font-semibold text-white mb-1.5">
                    {exp.role}
                  </div>
                  <p className="text-xs text-[#9DA7A5] leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-[#8D9795] font-mono-num">
                owoadeopeyemi11@gmail.com · +234 915 746 0998
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleDownloadResumeFile}
                  className="px-5 py-2.5 text-xs font-mono-num font-medium bg-[#118A82] hover:bg-[#14A399] text-white transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  {downloaded ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>RESUME DOWNLOADED</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      <span>DOWNLOAD RESUME FILE</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface AddTestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (t: TestimonialItem) => void;
}

export const AddTestimonialModal: React.FC<AddTestimonialModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [author, setAuthor] = useState('');
  const [role, setRole] = useState('');
  const [quote, setQuote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !quote.trim()) return;
    onAdd({
      id: `custom-${Date.now()}`,
      author: author.trim().toUpperCase(),
      role: role.trim() || 'Client Partner',
      quote: `"${quote.trim().replace(/^"|"$/g, '')}"`,
    });
    setAuthor('');
    setRole('');
    setQuote('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-[#0D1010] border border-white/10 p-6 sm:p-8"
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div>
                <div className="text-xs font-mono-num text-[#14B8A6]">— CLIENT FEEDBACK</div>
                <h3 className="text-2xl font-display font-semibold text-white mt-0.5">
                  Share your <span className="italic text-[#14B8A6] font-normal">experience</span>
                </h3>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center border border-white/10 text-white/70 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono-num text-[#8D9795] mb-1.5">
                  YOUR NAME OR TEAM
                </label>
                <input
                  type="text"
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. Founders at PayStack"
                  className="w-full bg-[#121616] border border-white/10 focus:border-[#14B8A6] px-3.5 py-2.5 text-sm text-white outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-mono-num text-[#8D9795] mb-1.5">
                  PROJECT / COMPANY ROLE
                </label>
                <input
                  type="text"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Fintech Mobile App"
                  className="w-full bg-[#121616] border border-white/10 focus:border-[#14B8A6] px-3.5 py-2.5 text-sm text-white outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-mono-num text-[#8D9795] mb-1.5">
                  YOUR TESTIMONIAL
                </label>
                <textarea
                  rows={4}
                  required
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  placeholder="How was your experience working with Owoade (The UX Forger)?"
                  className="w-full bg-[#121616] border border-white/10 focus:border-[#14B8A6] px-3.5 py-2.5 text-sm text-white outline-none transition-colors resize-none"
                />
              </div>
              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-xs font-mono-num text-[#8D9795] hover:text-white border border-white/10 cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-mono-num font-medium bg-[#118A82] hover:bg-[#14A399] text-white transition-colors cursor-pointer"
                >
                  PUBLISH TESTIMONIAL
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
