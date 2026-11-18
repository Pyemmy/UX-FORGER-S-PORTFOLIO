import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowRight,
  Compass,
  Copy,
  CornerDownLeft,
  Download,
  ExternalLink,
  FileText,
  FolderGit2,
  Layers,
  Search,
  Sparkles,
  User,
  X,
} from 'lucide-react';
import { PERSONAL_INFO, PROJECTS, ProjectItem } from '../data/portfolioData';
import { useScrollLock } from '../hooks/useScrollLock';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { useToast } from './ui/Toast';

interface ForgeConsoleProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenProject: (project: ProjectItem) => void;
  onOpenResumeModal: () => void;
}

type Group = 'Jump to' | 'Case studies' | 'Actions';

interface Command {
  id: string;
  group: Group;
  title: string;
  subtitle?: string;
  keywords?: string;
  icon: React.ReactNode;
  external?: boolean;
  run: () => void;
}

const GROUPS: Group[] = ['Jump to', 'Case studies', 'Actions'];

const openExternal = (url: string) => window.open(url, '_blank', 'noopener,noreferrer');

const Palette: React.FC<Omit<ForgeConsoleProps, 'isOpen'>> = ({
  onClose,
  onNavigateSection,
  onOpenProject,
  onOpenResumeModal,
}) => {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const { copy } = useToast();

  useScrollLock(true);
  useFocusTrap(panelRef, true, { initialFocus: inputRef, onEscape: onClose });

  const commands = useMemo<Command[]>(() => {
    const go = (id: string) => () => {
      onClose();
      // Let the palette unlock scrolling before we scroll
      window.setTimeout(() => onNavigateSection(id), 60);
    };
    return [
      { id: 'work', group: 'Jump to', title: 'Selected work', subtitle: 'Case studies and shipped builds', icon: <Layers className="h-4 w-4 text-teal" />, run: go('work') },
      { id: 'capabilities', group: 'Jump to', title: 'Expertise', subtitle: 'What I work on', icon: <Compass className="h-4 w-4 text-teal" />, run: go('capabilities') },
      { id: 'about', group: 'Jump to', title: 'About me', subtitle: 'Story, life off the keyboard, photo book', icon: <User className="h-4 w-4 text-teal" />, run: go('about') },
      { id: 'experience', group: 'Jump to', title: 'Career history', subtitle: 'EcoVest, Forge Academy, Ventics AI and more', keywords: 'experience jobs', icon: <User className="h-4 w-4 text-teal" />, run: go('experience') },
      { id: 'playground', group: 'Jump to', title: 'Playground & lab', subtitle: 'Experiments and interactive toys', keywords: 'experiments', icon: <Sparkles className="h-4 w-4 text-lime" />, run: go('playground') },
      { id: 'contact', group: 'Jump to', title: 'Contact', subtitle: 'Email, LinkedIn, WhatsApp, X', keywords: 'hire talk', icon: <ArrowRight className="h-4 w-4 text-teal" />, run: go('contact') },
      ...PROJECTS.map<Command>((p) => ({
        id: `project-${p.id}`,
        group: 'Case studies',
        title: p.displayTitle || p.title,
        subtitle: p.displayCategory || p.subtitle,
        keywords: `${p.title} ${p.technologies.join(' ')} ${p.clientOrOrg}`,
        icon: <FileText className="h-4 w-4 text-night-muted" />,
        run: () => {
          onClose();
          onOpenProject(p);
        },
      })),
      {
        id: 'copy-email',
        group: 'Actions',
        title: 'Copy email address',
        subtitle: PERSONAL_INFO.email,
        icon: <Copy className="h-4 w-4 text-night-muted" />,
        run: () => {
          copy(PERSONAL_INFO.email, 'Email copied');
          onClose();
        },
      },
      {
        id: 'resume',
        group: 'Actions',
        title: 'View résumé',
        subtitle: 'Experience, awards and education',
        keywords: 'cv',
        icon: <FileText className="h-4 w-4 text-night-muted" />,
        run: () => {
          onClose();
          onOpenResumeModal();
        },
      },
      {
        id: 'download-cv',
        group: 'Actions',
        title: 'Download CV (PDF)',
        subtitle: PERSONAL_INFO.cvFileName,
        keywords: 'resume',
        icon: <Download className="h-4 w-4 text-teal" />,
        run: () => {
          const a = document.createElement('a');
          a.href = PERSONAL_INFO.cvPdfUrl;
          a.download = PERSONAL_INFO.cvFileName;
          a.click();
          onClose();
        },
      },
      {
        id: 'linkedin',
        group: 'Actions',
        title: 'Open LinkedIn',
        subtitle: PERSONAL_INFO.linkedin.replace('https://', ''),
        icon: <ExternalLink className="h-4 w-4 text-night-muted" />,
        external: true,
        run: () => {
          openExternal(PERSONAL_INFO.linkedin);
          onClose();
        },
      },
      {
        id: 'github',
        group: 'Actions',
        title: 'Open GitHub',
        subtitle: PERSONAL_INFO.github.replace('https://', ''),
        icon: <FolderGit2 className="h-4 w-4 text-night-muted" />,
        external: true,
        run: () => {
          openExternal(PERSONAL_INFO.github);
          onClose();
        },
      },
      ...PROJECTS.filter((p) => p.liveUrl).map<Command>((p) => ({
        id: `live-${p.id}`,
        group: 'Actions',
        title: `Open ${p.displayTitle || p.title} live`,
        subtitle: p.liveUrl!.replace('https://', '').replace(/\/$/, ''),
        keywords: 'demo live prototype',
        icon: <ExternalLink className="h-4 w-4 text-night-muted" />,
        external: true,
        run: () => {
          openExternal(p.liveUrl!);
          onClose();
        },
      })),
    ];
  }, [copy, onClose, onNavigateSection, onOpenProject, onOpenResumeModal]);

  const q = query.trim().toLowerCase();
  // Relevance: title prefix > title match > subtitle/keyword match
  const score = (c: Command) => {
    if (!q) return 1;
    const title = c.title.toLowerCase();
    if (title.startsWith(q)) return 4;
    if (title.split(/\s+/).some((w) => w.startsWith(q))) return 3;
    if (title.includes(q)) return 2;
    return `${c.subtitle ?? ''} ${c.keywords ?? ''} ${c.group}`.toLowerCase().includes(q) ? 1 : 0;
  };
  const scored = commands.map((c) => ({ c, s: score(c) })).filter((x) => x.s > 0);
  // Groups appear in order of their best match, items by score within a group
  const groupOrder = q
    ? [...GROUPS].sort(
        (a, b) =>
          Math.max(0, ...scored.filter((x) => x.c.group === b).map((x) => x.s)) -
            Math.max(0, ...scored.filter((x) => x.c.group === a).map((x) => x.s)) ||
          GROUPS.indexOf(a) - GROUPS.indexOf(b),
      )
    : GROUPS;
  const ordered = groupOrder.flatMap((g) =>
    scored
      .filter((x) => x.c.group === g)
      .sort((a, b) => b.s - a.s)
      .map((x) => x.c),
  );

  useEffect(() => setSelected(0), [query]);

  // Keep the highlighted row visible while arrowing through the list
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-index="${selected}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [selected]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelected((s) => (ordered.length ? (s + 1) % ordered.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelected((s) => (ordered.length ? (s - 1 + ordered.length) % ordered.length : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      ordered[selected]?.run();
    }
  };

  const activeId = ordered[selected] ? `cmd-${ordered[selected].id}` : undefined;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 z-[85] flex items-start justify-center bg-black/70 px-3 pt-[12vh] backdrop-blur-sm sm:px-4"
      onClick={onClose}
    >
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Quick search"
        initial={{ opacity: 0, scale: 0.97, y: -12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: -8, transition: { duration: 0.12 } }}
        transition={{ type: 'spring', stiffness: 520, damping: 36 }}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
        className="flex w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-night-2 text-night-text shadow-2xl"
      >
        <div className="flex items-center gap-3 border-b border-white/10 bg-night-3 px-4 py-3.5">
          <Search className="h-5 w-5 shrink-0 text-night-muted" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, sections, actions…"
            aria-label="Search commands"
            role="combobox"
            aria-expanded="true"
            aria-controls="console-list"
            aria-activedescendant={activeId}
            autoComplete="off"
            spellCheck={false}
            className="w-full bg-transparent font-sans text-base text-night-text placeholder:text-night-faint focus:outline-none focus-visible:outline-none sm:text-sm"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close quick search"
            className="shrink-0 rounded p-1 text-night-muted transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div ref={listRef} id="console-list" role="listbox" aria-label="Results" className="max-h-[56vh] overflow-y-auto overscroll-contain p-2">
          {ordered.length === 0 ? (
            <p className="p-8 text-center text-sm text-night-faint">Nothing matches &ldquo;{query}&rdquo;. Try &ldquo;cv&rdquo; or a project name.</p>
          ) : (
            groupOrder.map((group) => {
              const items = ordered.filter((c) => c.group === group);
              if (items.length === 0) return null;
              return (
                <div key={group} role="group" aria-label={group} className="py-1.5">
                  <div className="px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-night-faint">{group}</div>
                  {items.map((item) => {
                    const index = ordered.indexOf(item);
                    const isSelected = index === selected;
                    return (
                      <div
                        key={item.id}
                        id={`cmd-${item.id}`}
                        role="option"
                        aria-selected={isSelected}
                        data-index={index}
                        onClick={item.run}
                        onMouseMove={() => !isSelected && setSelected(index)}
                        className={`relative flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-left text-xs transition-colors ${
                          isSelected ? 'text-white' : 'text-night-muted'
                        }`}
                      >
                        {isSelected && (
                          <motion.span
                            layoutId="console-highlight"
                            className="absolute inset-0 rounded-lg border border-teal/30 bg-teal/15"
                            transition={{ type: 'spring', stiffness: 600, damping: 40 }}
                          />
                        )}
                        <span className="relative flex min-w-0 items-center gap-3 pr-2">
                          <span className="shrink-0" aria-hidden="true">
                            {item.icon}
                          </span>
                          <span className="min-w-0">
                            <span className="block truncate text-sm font-medium text-white">{item.title}</span>
                            {item.subtitle && <span className="block truncate text-[11px] text-night-muted">{item.subtitle}</span>}
                          </span>
                        </span>
                        <span className="relative flex shrink-0 items-center gap-1.5 text-night-faint">
                          {item.external && <ExternalLink className="h-3.5 w-3.5" aria-label="opens in a new tab" />}
                          {isSelected && <CornerDownLeft className="hidden h-3.5 w-3.5 text-teal sm:block" aria-hidden="true" />}
                        </span>
                      </div>
                    );
                  })}
                </div>
              );
            })
          )}
        </div>

        <div className="hidden items-center justify-between border-t border-white/10 bg-night-3 px-4 py-2.5 font-mono text-[11px] text-night-faint sm:flex">
          <span className="flex items-center gap-3">
            <span>↑↓ navigate</span>
            <span>↵ select</span>
            <span>esc close</span>
          </span>
          <span className="font-semibold text-teal">The Forger&apos;s console</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const ForgeConsole: React.FC<ForgeConsoleProps> = ({ isOpen, ...rest }) => (
  <AnimatePresence>{isOpen && <Palette key="console" {...rest} />}</AnimatePresence>
);
