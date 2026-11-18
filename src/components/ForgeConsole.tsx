import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  ArrowRight,
  ExternalLink,
  Copy,
  Check,
  Download,
  Terminal,
  FolderGit2,
  FileText,
  User,
  Sparkles,
  Layers,
  X,
  Compass,
} from 'lucide-react';
import { PERSONAL_INFO, PROJECTS } from '../data/portfolioData';

interface ForgeConsoleProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenProjectCaseStudy: (projectId: string) => void;
  onOpenResumeModal: () => void;
}

interface CommandAction {
  id: string;
  group: 'EXPLORE' | 'QUICK ACTIONS' | 'LIVE PROJECTS';
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  shortcut?: string;
  external?: boolean;
  run: () => void;
}

export const ForgeConsole: React.FC<ForgeConsoleProps> = ({
  isOpen,
  onClose,
  onNavigateSection,
  onOpenProjectCaseStudy,
  onOpenResumeModal,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Focus input & lock scroll when opened
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      setQuery('');
      setSelectedIndex(0);
      setCopiedEmail(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Copy email handler
  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => {
      setCopiedEmail(false);
      onClose();
    }, 1200);
  };

  // Build commands
  const liveProjects = PROJECTS.filter((p) => p.liveUrl);

  const actions: CommandAction[] = [
    // Group 1: EXPLORE
    {
      id: 'explore-work',
      group: 'EXPLORE',
      title: 'Selected Projects',
      subtitle: 'View flagship UI/UX and product builds',
      icon: <Layers className="w-4 h-4 text-[#1D9E75]" />,
      run: () => {
        onClose();
        onNavigateSection('work');
      },
    },
    {
      id: 'explore-capabilities',
      group: 'EXPLORE',
      title: 'Core Capabilities',
      subtitle: 'Strategy, design systems, frontend, AI workflows',
      icon: <Compass className="w-4 h-4 text-[#1D9E75]" />,
      run: () => {
        onClose();
        onNavigateSection('capabilities');
      },
    },
    {
      id: 'explore-experiments',
      group: 'EXPLORE',
      title: 'Engineering & AI Experiments',
      subtitle: 'Rapid prototypes, hackathon builds, and lab explorations',
      icon: <Sparkles className="w-4 h-4 text-[#C7F36B]" />,
      run: () => {
        onClose();
        onNavigateSection('playground');
      },
    },
    {
      id: 'explore-about',
      group: 'EXPLORE',
      title: 'About Me & Experience',
      subtitle: 'UNILAG Mathematics, background, and EcoVest brick stack',
      icon: <User className="w-4 h-4 text-[#1D9E75]" />,
      run: () => {
        onClose();
        onNavigateSection('experience');
      },
    },

    // Group 2: QUICK ACTIONS
    {
      id: 'action-copy-email',
      group: 'QUICK ACTIONS',
      title: copiedEmail ? 'Email Copied to Clipboard!' : 'Copy Email Address',
      subtitle: PERSONAL_INFO.email,
      icon: copiedEmail ? (
        <Check className="w-4 h-4 text-[#C7F36B]" />
      ) : (
        <Copy className="w-4 h-4 text-[#9BA3AF]" />
      ),
      run: handleCopyEmail,
    },
    {
      id: 'action-resume',
      group: 'QUICK ACTIONS',
      title: 'Download Résumé (Official PDF)',
      subtitle: 'Download latest verified CV document',
      icon: <Download className="w-4 h-4 text-[#1D9E75]" />,
      run: () => {
        const link = document.createElement('a');
        link.href = PERSONAL_INFO.cvPdfUrl;
        link.download = 'Owoade_Opeyemi_Ismail_CV.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        onClose();
      },
    },
    {
      id: 'action-view-resume',
      group: 'QUICK ACTIONS',
      title: 'Preview Résumé Online',
      subtitle: 'Interactive CV modal viewer',
      icon: <FileText className="w-4 h-4 text-[#9BA3AF]" />,
      run: () => {
        onClose();
        onOpenResumeModal();
      },
    },
    {
      id: 'action-linkedin',
      group: 'QUICK ACTIONS',
      title: 'Open LinkedIn Profile',
      subtitle: 'linkedin.com/in/owoade-opeyemi',
      icon: <ExternalLink className="w-4 h-4 text-[#9BA3AF]" />,
      external: true,
      run: () => {
        const a = document.createElement('a');
        a.href = PERSONAL_INFO.linkedin;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.click();
        onClose();
      },
    },
    {
      id: 'action-github',
      group: 'QUICK ACTIONS',
      title: 'Open GitHub Repositories',
      subtitle: 'github.com/theuxforger',
      icon: <FolderGit2 className="w-4 h-4 text-[#9BA3AF]" />,
      external: true,
      run: () => {
        const a = document.createElement('a');
        a.href = PERSONAL_INFO.github;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.click();
        onClose();
      },
    },
    {
      id: 'action-forge-academy',
      group: 'QUICK ACTIONS',
      title: 'Visit Forge Academy',
      subtitle: 'Cohort training & design mentorship platform',
      icon: <Terminal className="w-4 h-4 text-[#F26522]" />,
      run: () => {
        onClose();
        onNavigateSection('experience');
      },
    },

    // Group 3: LIVE PROJECTS
    ...liveProjects.map((proj) => ({
      id: `live-${proj.id}`,
      group: 'LIVE PROJECTS' as const,
      title: `${proj.subtitle.split(':')[0]} (${proj.title})`,
      subtitle: `${proj.category} · ${proj.liveUrl}`,
      icon: <ExternalLink className="w-4 h-4 text-[#1D9E75]" />,
      external: true,
      run: () => {
        if (proj.liveUrl) {
          const a = document.createElement('a');
          a.href = proj.liveUrl;
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
          a.click();
        }
        onClose();
      },
    })),
  ];

  // Filter actions by search query
  const filteredActions = actions.filter((action) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      action.title.toLowerCase().includes(q) ||
      action.subtitle?.toLowerCase().includes(q) ||
      action.group.toLowerCase().includes(q)
    );
  });

  // Handle keyboard navigation inside palette
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredActions.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredActions.length) % Math.max(1, filteredActions.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredActions[selectedIndex]) {
        filteredActions[selectedIndex].run();
      }
    }
  };

  // Group filtered actions
  const groupedActions = {
    EXPLORE: filteredActions.filter((a) => a.group === 'EXPLORE'),
    'QUICK ACTIONS': filteredActions.filter((a) => a.group === 'QUICK ACTIONS'),
    'LIVE PROJECTS': filteredActions.filter((a) => a.group === 'LIVE PROJECTS'),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/75 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleKeyDown}
            className="w-full max-w-2xl bg-[#171A21] border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col text-[#F5F7FA]"
            role="dialog"
            aria-modal="true"
            aria-label="Forge Console command palette"
          >
            {/* Input Header */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-[#12141A]">
              <Search className="w-5 h-5 text-[#9BA3AF] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Type a command, project name, or action..."
                className="w-full bg-transparent text-sm text-[#F5F7FA] placeholder-[#6B7280] focus:outline-none font-sans"
              />
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-[#9BA3AF] bg-white/5 border border-white/10 rounded">
                  ESC to close
                </span>
                <button
                  onClick={onClose}
                  aria-label="Close console"
                  className="p-1 hover:bg-white/10 rounded text-[#9BA3AF] hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* List Body */}
            <div ref={listRef} className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-white/[0.04]">
              {filteredActions.length === 0 ? (
                <div className="p-8 text-center text-sm text-[#6B7280]">
                  No matching commands or projects found for &quot;{query}&quot;.
                </div>
              ) : (
                (Object.keys(groupedActions) as (keyof typeof groupedActions)[]).map((groupKey) => {
                  const items = groupedActions[groupKey];
                  if (items.length === 0) return null;

                  return (
                    <div key={groupKey} className="py-2 first:pt-0 last:pb-0">
                      <div className="px-3 py-1.5 text-[11px] font-mono tracking-wider font-semibold text-[#6B7280]">
                        {groupKey}
                      </div>
                      <div className="space-y-0.5">
                        {items.map((item) => {
                          const itemIndex = filteredActions.indexOf(item);
                          const isSelected = itemIndex === selectedIndex;

                          return (
                            <button
                              key={item.id}
                              onClick={item.run}
                              onMouseEnter={() => setSelectedIndex(itemIndex)}
                              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-xs transition-colors cursor-pointer ${
                                isSelected
                                  ? 'bg-[#1D9E75]/15 text-white border border-[#1D9E75]/30'
                                  : 'text-[#9BA3AF] hover:bg-white/5 hover:text-white border border-transparent'
                              }`}
                            >
                              <div className="flex items-center gap-3 min-w-0 pr-2">
                                <div className="shrink-0">{item.icon}</div>
                                <div className="min-w-0">
                                  <div className="font-medium text-sm text-white truncate">
                                    {item.title}
                                  </div>
                                  {item.subtitle && (
                                    <div className="text-[11px] text-[#9BA3AF] truncate">
                                      {item.subtitle}
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="shrink-0 flex items-center gap-1.5 text-[#6B7280]">
                                {item.external && <ExternalLink className="w-3.5 h-3.5" />}
                                {isSelected && (
                                  <ArrowRight className="w-4 h-4 text-[#1D9E75] hidden sm:inline" />
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Help */}
            <div className="px-4 py-2.5 bg-[#12141A] border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#6B7280]">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>ESC Close</span>
              </div>
              <div className="text-[#1D9E75] font-semibold">The Forger’s Lab</div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
