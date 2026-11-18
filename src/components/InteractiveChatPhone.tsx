import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wifi, Battery, ArrowRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sounds } from '../utils/audio';
import { useToast } from './ui/Toast';

interface ActionPayload {
  type: 'book_call' | 'view_cv' | 'view_project' | 'copy_email' | 'awards';
  label: string;
  target?: string;
}

interface Message {
  id: string;
  sender: 'user' | 'forger';
  text: string;
  timestamp: string;
  actions?: ActionPayload[];
}

interface InteractiveChatPhoneProps {
  onOpenResumeModal: () => void;
  onOpenContactForm: () => void;
  onSelectProject?: (slug: string) => void;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'm-init-1',
    sender: 'user',
    text: 'Hey The UX Forger! Can we collaborate on a new digital product?',
    timestamp: 'Just now',
  },
  {
    id: 'm-init-2',
    sender: 'forger',
    text: 'Your project could be next. I’m booking product design and design engineering sprints for early 2027.',
    timestamp: 'Just now',
  },
  {
    id: 'm-init-3',
    sender: 'user',
    text: 'Can we hop on a call?',
    timestamp: 'Just now',
  },
  {
    id: 'm-init-4',
    sender: 'forger',
    text: 'Of course! Pick a time that works for you or drop me a direct note.',
    timestamp: 'Just now',
    actions: [
      { type: 'book_call', label: 'Book a call' },
      { type: 'view_cv', label: 'View CV' },
    ],
  },
];

export const InteractiveChatPhone: React.FC<InteractiveChatPhoneProps> = ({
  onOpenResumeModal,
  onOpenContactForm,
  onSelectProject,
}) => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const { copy } = useToast();

  // Keep the newest message in view (scrolls the chat only, never the page)
  useEffect(() => {
    const el = chatScrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  const addDialogue = (userPrompt: string, responseText: string, actions?: ActionPayload[]) => {
    if (isTyping) return;
    sounds.playClick();

    const timeStr = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date());

    setMessages((prev) => [
      ...prev,
      {
        id: `u-${Date.now()}`,
        sender: 'user',
        text: userPrompt,
        timestamp: timeStr,
      },
    ]);

    setIsTyping(true);

    setTimeout(() => {
      sounds.playPop();
      setMessages((prev) => [
        ...prev,
        {
          id: `f-${Date.now()}`,
          sender: 'forger',
          text: responseText,
          timestamp: timeStr,
          actions,
        },
      ]);
      setIsTyping(false);
    }, 600);
  };

  const handleActionClick = (action: ActionPayload) => {
    sounds.playClick();
    if (action.type === 'book_call') {
      onOpenContactForm();
    } else if (action.type === 'view_cv') {
      onOpenResumeModal();
    } else if (action.type === 'copy_email') {
      copy(PERSONAL_INFO.email, 'Email copied');
    } else if (action.type === 'awards' || action.type === 'view_project') {
      onSelectProject?.(action.target ?? 'qualityhub');
    }
  };

  const processQuery = (raw: string) => {
    const q = raw.toLowerCase().trim();
    if (!q) return;

    if (q.includes('call') || q.includes('talk') || q.includes('meet') || q.includes('hire') || q.includes('contact')) {
      addDialogue(
        raw,
        'Let’s do it! Reach me directly by email, WhatsApp or LinkedIn. Everything is just below.',
        [
          { type: 'book_call', label: 'Show contact options' },
          { type: 'copy_email', label: 'Copy my email' },
        ]
      );
    } else if (q.includes('cv') || q.includes('resume') || q.includes('experience') || q.includes('background')) {
      addDialogue(
        raw,
        'Here is my verified background: Senior Product Designer at EcoVest, Founder of Forge Academy, and studying B.Sc. Industrial Mathematics at UNILAG.',
        [{ type: 'view_cv', label: 'Open my CV' }]
      );
    } else if (q.includes('ecovest') || q.includes('pocketa')) {
      addDialogue(
        raw,
        'At EcoVest, I led product design for Pocketa, architecting budget creation, expense tracking, and the Safe-to-Spend pacing engine for young adults.',
        [
          { type: 'view_project', label: 'Read the Pocketa case study', target: 'pocketa' },
          { type: 'book_call', label: 'Discuss fintech work' },
        ]
      );
    } else if (q.includes('hackathon') || q.includes('award') || q.includes('win') || q.includes('qualityhub') || q.includes('babasika')) {
      addDialogue(
        raw,
        'I won 1st Runner Up (out of 14 teams) at UNILAG QAS & SERVICOM for QualityHub, and an Honourable Mention plus ₦100,000 at the BuildVerse Hackathon for BabaSika!',
        [
          { type: 'awards', label: 'Open QualityHub', target: 'qualityhub' },
          { type: 'view_project', label: 'Open BabaSika', target: 'babasika' },
        ]
      );
    } else if (q.includes('rate') || q.includes('price') || q.includes('cost') || q.includes('timeline')) {
      addDialogue(
        raw,
        'I work on sprint-based pricing for design engineering builds, and monthly retainers for senior product design roles. Let’s discuss your scope!',
        [{ type: 'book_call', label: 'Get a project estimate' }]
      );
    } else {
      addDialogue(
        raw,
        'I design end-to-end products in Figma and ship functional code in React/TypeScript. What specific problem are you looking to solve?',
        [
          { type: 'view_cv', label: 'View résumé' },
          { type: 'book_call', label: 'Let’s talk' },
        ]
      );
    }

    setInputText('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    processQuery(inputText);
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-[#18191E] rounded-[3.4rem] p-3 sm:p-3.5 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.08)] border-4 border-[#27282F] text-[#141618] font-sans relative">
      {/* Side Hardware Buttons Indications */}
      <div aria-hidden="true" className="absolute -left-[7px] top-24 w-[3px] h-10 bg-[#3F3F46] rounded-l-xs" />
      <div aria-hidden="true" className="absolute -left-[7px] top-38 w-[3px] h-12 bg-[#3F3F46] rounded-l-xs" />
      <div aria-hidden="true" className="absolute -right-[7px] top-28 w-[3px] h-14 bg-[#3F3F46] rounded-r-xs" />

      {/* Top Status Bar with Dynamic Island */}
      <div aria-hidden="true" className="relative px-5 pt-1 pb-1 flex items-center justify-between text-[11px] font-mono text-zinc-400">
        <span className="font-semibold text-zinc-300">09:41</span>
        
        {/* Dynamic Island pill */}
        <div className="w-24 h-5 bg-black rounded-full flex items-center justify-between px-2.5 shadow-inner">
          <div className="w-2 h-2 rounded-full bg-[#111215] ring-1 ring-zinc-700/60" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#1A382A] ring-1 ring-[#2FA06A]/40" />
        </div>

        <div className="flex items-center gap-1.5 text-zinc-300">
          <Wifi className="w-3.5 h-3.5" />
          <Battery className="w-4 h-4 text-[#2FA06A]" />
        </div>
      </div>

      {/* Screen Container with warm paper dot-grid backdrop */}
      <div className="bg-[#FAF7F2] rounded-[2.4rem] p-3.5 sm:p-4 border border-[#E4DEC3] shadow-inner relative overflow-hidden flex flex-col h-[520px]">
        {/* Subtle dot pattern background */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#C8BFB0 1px, transparent 1px)',
            backgroundSize: '16px 16px',
          }}
        />

        {/* Top Header Card (Inspired by reference image 1) */}
        <div className="relative z-10 flex items-center justify-between pb-3 border-b border-[#E0D8C7] mb-2">
          <div className="flex items-center gap-2.5">
            {/* Real circular profile photograph */}
            <div className="w-9 h-9 rounded-full overflow-hidden border border-[#D5CEBF] bg-[#141618] shrink-0 shadow-xs ring-1 ring-black/10">
              <img
                src="/assets/photos/avatar.webp"
                alt=""
                width={36}
                height={36}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <p className="font-display font-extrabold text-xs tracking-tight text-[#141618]">
                  The UX Forger
                </p>
                <span className="w-1.5 h-1.5 rounded-full bg-[#2FA06A] animate-pulse" />
              </div>
              <p className="text-[10px] font-mono text-ink-3">
                Usually replies within a day
              </p>
            </div>
          </div>

          <div className="px-2 py-0.5 rounded-full bg-[#EAE4D7] border border-[#D5CEBF] text-[10px] font-mono text-[#52525B] font-semibold">
            Lagos, NG
          </div>
        </div>

        {/* Messages Stream */}
        <div
          ref={chatScrollRef}
          tabIndex={0}
          aria-label="Chat with The UX Forger"
          aria-live="polite"
          role="log"
          className="relative z-10 flex-1 space-y-3 overflow-y-auto pr-1 py-1 text-xs scroll-smooth focus:outline-none"
          style={{ scrollbarWidth: 'thin' }}
        >
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex flex-col ${
                msg.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              {/* Chat Bubble */}
              <div
                className={`max-w-[85%] p-3.5 rounded-2xl shadow-xs text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#141618] text-white rounded-br-xs'
                    : 'bg-coral-ink text-white rounded-bl-xs font-medium shadow-sm'
                }`}
              >
                <p>{msg.text}</p>

                {/* Embedded action button directly in reply (Inspired by reference image 1) */}
                {msg.actions && msg.actions.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-white/20 flex flex-col gap-1.5">
                    {msg.actions.map((act) => (
                      <button
                        key={act.label}
                        type="button"
                        onClick={() => handleActionClick(act)}
                        className="w-full py-2 px-3 bg-white text-[#141618] hover:bg-[#FAF7F2] font-display font-bold text-xs rounded-xl shadow-xs flex items-center justify-between transition-all cursor-pointer group"
                      >
                        <span>{act.label}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#EE5828] group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <span className="text-[9px] font-mono text-[#6B6358] mt-1 px-1">
                {msg.sender === 'user' ? 'You' : 'The UX Forger'} · {msg.timestamp}
              </span>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              aria-label="The UX Forger is typing"
              className="flex items-center gap-1 px-3 py-2 bg-white rounded-2xl w-14 border border-[#E0D8C7] shadow-xs"
            >
              <div className="w-1.5 h-1.5 bg-[#EE5828] rounded-full animate-bounce" />
              <div className="w-1.5 h-1.5 bg-[#EE5828] rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-1.5 h-1.5 bg-[#EE5828] rounded-full animate-bounce [animation-delay:0.4s]" />
            </motion.div>
          )}
        </div>

        {/* Suggested Quick Prompt Chips (reference image 1 style) */}
        <div className="relative z-10 pt-2 pb-2">
          <div className="no-scrollbar flex gap-1.5 overflow-x-auto pb-1" role="group" aria-label="Suggested questions">
            <button
              onClick={() =>
                addDialogue(
                  'Can we hop on a call?',
                  'I’d love that! Select a convenient time or drop your project summary in the form.',
                  [{ type: 'book_call', label: 'Book a call' }]
                )
              }
              type="button"
              className="shrink-0 text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-white hover:bg-coral-ink text-coral-ink hover:text-white border border-coral-ink transition-colors shadow-2xs"
            >
              Can we hop on a call?
            </button>
            <button
              type="button"
              onClick={() =>
                addDialogue(
                  'What have you won?',
                  'QualityHub took 1st Runner Up out of 14 teams at UNILAG, and BabaSika won an Honourable Mention plus ₦100,000 at BuildVerse.',
                  [
                    { type: 'awards', label: 'Open QualityHub', target: 'qualityhub' },
                    { type: 'view_project', label: 'Open BabaSika', target: 'babasika' },
                  ]
                )
              }
              className="shrink-0 text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-white hover:bg-[#141618] text-[#141618] hover:text-white border border-[#D5CEBF] transition-colors shadow-2xs"
            >
              What have you won?
            </button>
            <button
              onClick={() =>
                addDialogue(
                  'I need a website or web app designed',
                  'Awesome. I handle UX strategy, Figma design systems, and functional React/Tailwind prototyping.',
                  [{ type: 'book_call', label: 'Start your project' }]
                )
              }
              type="button"
              className="shrink-0 text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-white hover:bg-[#141618] text-[#141618] hover:text-white border border-[#D5CEBF] transition-colors shadow-2xs"
            >
              I need a product designed
            </button>
            <button
              onClick={() =>
                addDialogue(
                  'Can I check your official CV?',
                  'Here’s my resume with verified employment at EcoVest, Forge Academy, and UNILAG awards.',
                  [{ type: 'view_cv', label: 'Open Résumé' }]
                )
              }
              type="button"
              className="shrink-0 text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-white hover:bg-[#141618] text-[#141618] hover:text-white border border-[#D5CEBF] transition-colors shadow-2xs"
            >
              Check CV & Background
            </button>
          </div>
        </div>

        {/* Text Input Field Bar (reference image 1 style) */}
        <form
          onSubmit={handleSubmit}
          className="relative z-10 pt-1 flex items-center gap-1.5"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Start your project with me..."
            aria-label="Ask The UX Forger a question"
            className="flex-1 min-w-0 px-3.5 py-2 rounded-full bg-white border border-[#D5CEBF] text-base sm:text-xs text-[#141618] placeholder-[#6B6358] focus:outline-none focus-visible:outline-none focus:border-coral-ink focus:ring-2 focus:ring-coral/25 shadow-2xs font-sans transition-[border-color,box-shadow]"
          />
          <button
            type="submit"
            aria-label="Send message"
            className="w-9 h-9 rounded-full bg-coral-ink hover:bg-[#9A3818] text-white flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shadow-xs shrink-0"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
