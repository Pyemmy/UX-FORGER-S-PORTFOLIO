export interface CaseStudySection {
  title: string;
  subtitle?: string;
  content: string[];
  takeaways?: string[];
}

export interface ProjectItem {
  id: string;
  slug: string;
  monogram: string;
  folderTab: string;
  folderBg: string;
  folderText: string;
  badgeKicker: string;
  title: string;
  subtitle: string;
  category: 'Shipped AI Build' | 'Product Case Study';
  tagline: string;
  shortDescription: string;
  featured: boolean;
  awardOrBadge?: string;
  liveUrl?: string;
  githubUrl?: string;
  buildDuration?: string;
  year: string;
  role: string;
  clientOrOrg: string;
  technologies: string[];
  metrics: { label: string; value: string }[];
  deliverables: string[];
  wireframeHighlights: string[];
  problem: string;
  solution: string;
  constraints?: string[];
  tradeoffs?: string[];
  caseStudySections?: CaseStudySection[];
  mockupImage?: string;
  /** Extra screens shown in the case study gallery. */
  gallery?: { src: string; alt: string }[];
  numberIndex?: string;
  displayTitle?: string;
  displayCategory?: string;
  editorialSummary?: string;
  myRoleTitle?: string;
}

export interface CapabilityItem {
  id: string;
  emoji: string;
  title: string;
  summary: string;
  outcomes: string[];
  tags: string[];
}

export interface ExperimentItem {
  id: string;
  title: string;
  category: string;
  duration: string;
  liveUrl?: string;
  description: string;
  stack: string[];
  badge: string;
  color: string;
  status: 'Live Experiment' | 'Interactive Prototype' | 'Lab / In Progress';
  whatItIs: string;
  whatItDoes: string;
  whyItExists: string;
  /** Slug of the matching case study in PROJECTS, if there is one. */
  projectSlug?: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  /** The person's real name, e.g. "Ada Okafor". */
  author: string;
  role: string;
  company: string;
  /** Optional headshot, e.g. /assets/photos/testimonials/ada.webp */
  photo?: string;
  /** Optional LinkedIn or website so visitors can verify the quote. */
  link?: string;
}

export const PERSONAL_INFO = {
  name: 'Owoade Opeyemi',
  fullName: 'Owoade Opeyemi Ismail',
  brandName: 'The UX Forger',
  headline: 'I design products and I ship them.',
  bio: 'Product Designer and Design Engineer. I solve product problems, design how things should work, and get involved in building them too.',
  roleTitle: 'Product Designer & Engineer',
  specialization: 'AI-Assisted Building & Systems Thinking',
  currentFocus: 'Senior Product Designer at EcoVest · Founder of Forge Academy',
  availability: 'Booking projects for early 2027',
  email: 'uxforger@gmail.com',
  phone: '+234 810 752 2288',
  phoneDisplay: '+234 810 752 2288',
  website: 'https://uxforger.live',
  websiteDisplay: 'uxforger.live',
  location: 'Lagos, Nigeria (open to remote)',
  cvPdfUrl: '/Owoade_Opeyemi_CV.pdf',
  cvFileName: 'Owoade_Opeyemi_CV.pdf',
  github: 'https://github.com/theuxforger',
  linkedin: 'https://linkedin.com/in/owoade-opeyemi',
  twitter: 'https://x.com/theuxforger',
  whatsapp: 'https://wa.me/2348107522288',
  academicInstitution: 'University of Lagos',
  academicDegree: 'B.Sc. Industrial Mathematics (Oct 2024 – Oct 2028 expected)',
};

export const AWARDS_LIST = [
  {
    id: 'unilag-servicom',
    title: 'UNILAG QAS & SERVICOM Student Innovation Competition 2026',
    place: '1st Runner Up (14 teams)',
    organization: 'University of Lagos Quality Assurance & SERVICOM Unit',
    date: '2026',
    description:
      'Product designer and engineer on Team InnovateQAS. Built QualityHub over four months of strategy, research, and functional prototyping. Features are slated for inclusion in UNILAG’s institutional QAS platform; the team also earned industry placement and was featured on the university website.',
    badgeTag: '1ST RUNNER UP · 14 TEAMS',
  },
  {
    id: 'buildverse-babasika',
    title: 'BuildVerse Hackathon · The John Amhanesi Foundation',
    place: 'Honourable Mention + ₦100,000',
    organization: 'The John Amhanesi Foundation',
    date: '2026',
    description:
      'Led product, UX and design in a 3-person team over 36 hours. Built BabaSika, a WhatsApp and USSD pension-savings onboarding and contribution experience for Nigeria’s 92M informal workers.',
    badgeTag: 'HONOURABLE MENTION + ₦100K · BUILDVERSE',
  },
  {
    id: 'hackathon-veteran',
    title: '10+ Hackathons Attended & Shipped',
    place: 'Rapid Prototyping & AI Velocity',
    organization: 'Wetech, NexaScale, BuildVerse & Tech Communities',
    date: '2025 — 2026',
    description:
      'Consistently taking ideas from 0 to live functional web & mobile deployments using Google AI Studio, structured prompt engineering, and Vercel/Render CI/CD.',
    badgeTag: '10+ HACKATHONS SHIPPED',
  },
];

export const CAPABILITIES: CapabilityItem[] = [
  {
    id: 'complex-products',
    emoji: '💡',
    title: 'Complex products',
    summary:
      'I make products with lots of moving parts easier to understand and use — from university compliance systems to micro-pension engines.',
    outcomes: [
      'Evidence-backed problem framing and PRDs',
      'User journey mapping & operational bottlenecks audit',
      'Information architecture for multi-stakeholder workflows',
    ],
    tags: ['Information Architecture', 'User Journeys', 'Edge Cases'],
  },
  {
    id: 'design-systems',
    emoji: '⭐',
    title: 'Design systems',
    summary:
      'I help teams build products that feel consistent, without having to solve the same problems over and over. Component libraries in Figma & code.',
    outcomes: [
      'Figma token hierarchies mapped to Tailwind CSS',
      'Accessible components with zero handoff ambiguity',
      'Living documentation and cross-platform design guidelines',
    ],
    tags: ['Figma Tokens', 'Tailwind CSS', 'Accessible Components'],
  },
  {
    id: 'design-engineering',
    emoji: '🛠️',
    title: 'Design engineering',
    summary:
      'I design in Figma and work in code, so I can help bring the finished experience to life with AI-assisted velocity and zero fidelity loss.',
    outcomes: [
      'Rapid functional prototypes in React & TypeScript',
      'Micro-interactions that communicate state without friction',
      'Zero layout shifts and WCAG AA contrast standards',
    ],
    tags: ['Google AI Studio', 'Prompt Engineering', 'GitHub & Vercel'],
  },
  {
    id: 'figuring-out',
    emoji: '💬',
    title: 'Figuring out what to build',
    summary:
      'Sometimes the problem isn’t clear yet. I run discovery, talk to users, and write product specs so teams build the right thing first.',
    outcomes: [
      'Qualitative user research and usability teardowns',
      'Hypothesis validation before writing a line of code',
      'Feature prioritization frameworks and scoping',
    ],
    tags: ['User Research', 'Product PRDs', 'Usability Testing'],
  },
];

export const EXPERIMENTS: ExperimentItem[] = [
  {
    id: 'quickbill',
    title: 'QuickBill',
    category: 'Fintech Voice Invoicing',
    duration: '3-hour build',
    liveUrl: 'https://quickbill-m-cord.onrender.com',
    description:
      'Turns plain-English or Nigerian Pidgin voice instructions into a formatted, WhatsApp-ready PDF invoice.',
    stack: ['Google AI Studio', 'Render', 'Node.js', 'WhatsApp Webhook'],
    badge: '3-HOUR HACKATHON BUILD',
    color: '#EE5828',
    status: 'Live Experiment',
    whatItIs: 'A voice-to-PDF invoice generator built for informal market merchants in West Africa.',
    whatItDoes: 'Transcribes spoken Nigerian Pidgin and plain English into formatted line-item calculations and instant PDF export.',
    whyItExists: 'Solo traders lose significant revenue and time calculating bills manually over chat.',
    projectSlug: 'quickbill',
  },
  {
    id: 'forge-ai',
    title: 'FORGE: AI Product Engineer',
    category: 'Product Engineering Concept',
    duration: '5-hour build',
    liveUrl: 'https://forge-ai-ebon-six.vercel.app',
    description:
      'An interactive platform that visualizes ambiguous text prompts synthesizing into structured design tokens, wireframes, and production React code.',
    stack: ['React', 'Motion', 'Vercel', 'Tailwind CSS'],
    badge: '5-HOUR LIVE BUILD',
    color: '#9B8AF5',
    status: 'Interactive Prototype',
    whatItIs: 'A concept demonstrator exploring real-time UI code synthesis with dynamic state transitions.',
    whatItDoes: 'Simulates the transformation of abstract product briefs into interactive tokens and components at 60 FPS.',
    whyItExists: 'To test how designers and developers can visualize AI code synthesis without black-box confusion.',
    projectSlug: 'forge-ai',
  },
  {
    id: 'vale',
    title: 'Vale Interactive Candle',
    category: 'Sensory Web Experience',
    duration: 'Design + Build Sprint',
    liveUrl: 'https://vale-h7ne.vercel.app',
    description:
      'An ambient interactive candle site where visitors virtually ignite the candle wick, triggering dynamic canvas illumination and warm audio.',
    stack: ['Interactive Canvas', 'Vercel', 'CSS Illumination', 'Sound FX'],
    badge: 'LIVE ON VERCEL',
    color: '#C85A3A',
    status: 'Live Experiment',
    whatItIs: 'An experiential e-commerce concept testing digital warmth and physical metaphor.',
    whatItDoes: 'Maps cursor interaction to wick physics, dims surrounding surfaces, and modulates ambient scent color temperature.',
    whyItExists: 'Luxury artisanal brands need emotional texture online that flat static catalog photos cannot deliver.',
    projectSlug: 'vale',
  },
  {
    id: 'smartajo',
    title: 'SmartAjo',
    category: 'AI Default Risk Scoring',
    duration: 'Hackathon Concept',
    liveUrl: 'https://smartajo-seven.vercel.app/',
    description:
      'A digital trust layer for Nigeria’s informal cooperative savings circles, featuring AI default risk scoring and USSD flows.',
    stack: ['Fintech UX', 'USSD Journeys', 'Credit Profiling', 'Multilingual'],
    badge: 'FINTECH CONCEPT',
    color: '#0C7770',
    status: 'Live Experiment',
    whatItIs: 'A community savings risk-scoring prototype for informal cooperative groups (Ajo/Esusu).',
    whatItDoes: 'Evaluates informal payout reliability to recommend sustainable contribution amounts across 4 Nigerian languages.',
    whyItExists: 'Informal savings organizers take personal financial liability when group members default on their turns.',
    projectSlug: 'smartajo',
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'qualityhub',
    slug: 'qualityhub',
    monogram: 'QH',
    folderTab: '📁 #01 · QUALITYHUB',
    folderBg: '#3062F7',
    folderText: '#FFFFFF',
    badgeKicker: 'UNILAG QAS & SERVICOM · 1ST RUNNER UP',
    title: 'Making campus complaint resolution verifiable & transparent',
    subtitle: 'QualityHub: UNILAG QAS & SERVICOM Compliance Platform',
    category: 'Shipped AI Build',
    tagline: '1st Runner Up (14 teams) · UNILAG Student Innovation Competition 2026',
    awardOrBadge: '🏆 1ST RUNNER UP · 14 TEAMS',
    featured: true,
    liveUrl: 'https://qas-servicom-compliance-platform.vercel.app',
    buildDuration: '4-Month Strategy & Build',
    year: '2026',
    role: 'Lead Product Designer & Frontend Engineer',
    clientOrOrg: 'University of Lagos QAS Unit',
    technologies: ['Google AI Studio', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    mockupImage: '/assets/projects/qualityhub.webp',
    gallery: [
      { src: '/assets/projects/qualityhub-2.webp', alt: 'QualityHub student dashboard with course reviews and complaint tracking' },
    ],
    numberIndex: '01',
    displayTitle: 'QualityHub',
    displayCategory: 'Institutional Compliance Platform',
    editorialSummary:
      'A transparent campus complaint and resolution platform that makes accountability verifiable for every student.',
    myRoleTitle: 'Lead Product Designer & Frontend Engineer',
    shortDescription:
      'Four months of strategy, design, and development for a university-wide platform that tracks, resolves, and verifies student complaints with full administrative transparency.',
    problem:
      'At the University of Lagos, student complaints regarding missing exam grades, hostel facilities, and administrative services were handled through informal, fragmented paper channels. Complaints frequently disappeared without tracking numbers, students had zero visibility into resolution progress, and the Quality Assurance Unit had no centralized audit trail.',
    solution:
      'Designed and engineered QualityHub—an institutional compliance dashboard with a transparent 4-stage ticket lifecycle (Submitted → Triaged → In Review → Resolved with Proof). Every report generates a verifiable hash code and sends milestone notifications to both student and administrator.',
    constraints: [
      'Must work reliably on low-bandwidth 3G mobile connections used by students across campus',
      'Strict privacy standards for sensitive student academic records',
      'Zero learning curve for non-technical administrative staff across 12 faculties',
    ],
    tradeoffs: [
      'Chose lightweight client-side ticket caching over heavy websockets to preserve battery and mobile data',
      'Prioritized high-contrast text and unboxed metadata over decorative card enclosures to ensure rapid scanning',
    ],
    metrics: [
      { label: 'COMPETITION RANK', value: '1st Runner Up' },
      { label: 'TEAMS COMPETING', value: '14 Teams' },
      { label: 'PILOT RESOLUTION', value: '4.2× Faster' },
    ],
    deliverables: [
      'Student Mobile-First Submission Flow',
      'QAS Dean & Officer Central Triage Dashboard',
      'Audit Trail & Evidence Upload System',
      'Live Vercel Production Deployment',
    ],
    wireframeHighlights: [
      'Ticket Lifecycle Timeline with Timestamp Verification',
      'Departmental Escalation & SLA Breach Warnings',
      'Anonymous Whistleblower Mode with Cryptographic Hash',
    ],
    caseStudySections: [
      {
        title: '01. Background & Campus Discovery',
        subtitle: 'Uncovering the broken paper trail',
        content: [
          'In early 2026, the Quality Assurance and SERVICOM Unit at the University of Lagos opened a student innovation challenge to tackle institutional accountability. Over two weeks of qualitative discovery, our team interviewed 42 undergraduate students and 8 administrative officers.',
          'The data revealed a striking paradox: students were reluctant to complain not because they lacked grievances, but because they feared academic retaliation or believed their reports would simply be discarded.',
        ],
        takeaways: [
          '83% of interviewed students had never received follow-up on a written complaint',
          'Faculty officers spent up to 14 hours per week manually filing physical memos',
        ],
      },
      {
        title: '02. Architecture & Design Decisions',
        subtitle: 'Designing for trust and accountability',
        content: [
          'To overcome cynicism, every UI element was designed around verification. When a student lodges a ticket, QualityHub immediately issues an immutable tracking key and an estimated SLA resolution date.',
          'We built role-based interfaces: a low-latency, thumb-friendly mobile app for students, and an information-dense desktop queue for faculty review officers that surfaces overdue SLA flags in high-contrast amber.',
        ],
        takeaways: [
          'Automated SLA countdown timers eliminate administrative bottlenecks',
          'Role-based access controls keep sensitive student records private',
        ],
      },
      {
        title: '03. Implementation & Validation',
        subtitle: 'Shipping to Vercel and pitching to university leadership',
        content: [
          'Using Google AI Studio and React, we iterated from Figma wireframes to a fully interactive, deployed web application on Vercel. We stress-tested the platform with simulated multi-department escalations.',
          'During the final grand pitch before UNILAG leadership, Team InnovateQAS earned 1st Runner Up out of 14 competing teams. Platform features and UX patterns are slated for integration into UNILAG’s official QAS platform, and the team earned industry placement, access to the QAS Unit and university tech hub, and a feature on the university website.',
        ],
      },
    ],
  },
  {
    id: 'babasika',
    slug: 'babasika',
    monogram: 'BS',
    folderTab: '📁 #02 · BABASIKA',
    folderBg: '#181B20',
    folderText: '#FFFFFF',
    badgeKicker: 'BUILDVERSE HACKATHON · HONOURABLE MENTION',
    title: 'Micro-pensions for Nigeria’s 92M informal workers',
    subtitle: 'BabaSika: WhatsApp & USSD Informal Pension Engine',
    category: 'Product Case Study',
    tagline: 'Honourable Mention + ₦100,000 · BuildVerse Hackathon 2026',
    awardOrBadge: '🏆 HONOURABLE MENTION + ₦100,000',
    featured: true,
    buildDuration: '36-Hour Hackathon Sprint',
    year: '2026',
    role: 'Product Lead & UX Strategist',
    clientOrOrg: 'The John Amhanesi Foundation',
    technologies: ['WhatsApp Business API', 'USSD Flows', 'Figma', 'Fintech UX'],
    mockupImage: '/assets/projects/babasika.webp',
    gallery: [
      { src: '/assets/projects/babasika-2.webp', alt: 'BabaSika landing page: “Small small, your future dey grow.”' },
    ],
    liveUrl: 'https://baba-sika.vercel.app/',
    numberIndex: '02',
    displayTitle: 'BabaSika',
    displayCategory: 'Conversational Pension Web App & USSD',
    editorialSummary:
      'A conversational pension experience that helps Nigeria’s 92 million informal workers save for retirement, from just ₦200.',
    myRoleTitle: 'Product Lead & UX Strategist',
    shortDescription:
      'Designed a frictionless WhatsApp and USSD pension savings experience tailored for market traders, artisans, and transport workers across Nigeria.',
    problem:
      'Over 92 million Nigerians work in the informal economy—market traders, vulcanizers, carpenters, and commercial drivers. Traditional pension fund administrators require formal tax documents, bank visits, and English literacy. Less than 2% of informal workers have retirement savings.',
    solution:
      'Spearheaded the UX architecture for BabaSika: a conversational savings platform accessible through WhatsApp and offline USSD (*384#). Workers can deposit as little as ₦200 daily directly via mobile money or bank transfer, receiving daily voice audio notes and SMS receipts in native languages.',
    constraints: [
      'Must function without smartphone hardware or mobile internet connectivity via USSD',
      'Target users have high skepticism of financial institutions due to historical scams',
      'Strict 36-hour hackathon execution timeline',
    ],
    tradeoffs: [
      'Eliminated traditional multi-field signup forms entirely in favor of progressive conversational onboarding over WhatsApp',
      'Used voice notes instead of long text terms to ensure accessibility for low-literacy market vendors',
    ],
    metrics: [
      { label: 'RECOGNITION', value: 'Honourable Mention' },
      { label: 'TARGET AUDIENCE', value: '92M Workers' },
      { label: 'DAILY MIN. DEPOSIT', value: '₦200' },
    ],
    deliverables: [
      'Conversational WhatsApp Onboarding Flow',
      '3-Step Offline USSD Menu Architecture',
      'Agent Cash-In Verification Interface',
      'Interactive Figma Prototype & Pitch Deck',
    ],
    wireframeHighlights: [
      'Pidgin & Yoruba Voice Prompt Navigation',
      'Emergency Liquidity Drawdown Safeguard',
      'Daily Target Gamification with Milestone Badges',
    ],
    caseStudySections: [
      {
        title: '01. The Informal Economy Dilemma',
        subtitle: 'Why traditional fintech fails market traders',
        content: [
          'During the 36-hour BuildVerse hackathon, our team focused on a stark reality: when a market woman at Tejuosho Market grows old, her only retirement plan is her children. Formal pension schemes demand paperwork she does not have and impose minimum deposits she cannot sustain.',
          'We realized that any solution requiring an app download was doomed. The user already lives on WhatsApp and USSD.',
        ],
      },
      {
        title: '02. Conversational UX & Language Empathy',
        subtitle: 'Turning complex pension math into natural dialogue',
        content: [
          'We designed an automated conversational assistant named "BabaSika" that speaks the user’s language. Instead of asking for "Annual Contribution Rate", BabaSika asks: "Mama, how much you fit save today? ₦200, ₦500, or ₦1,000?"',
          'Instant SMS confirmations provide tangible proof of deposit, addressing trust concerns immediately.',
        ],
      },
    ],
  },
  {
    id: 'ecovest',
    slug: 'pocketa',
    monogram: 'PK',
    folderTab: '📁 #03 · POCKETA',
    folderBg: '#2FA06A',
    folderText: '#FFFFFF',
    badgeKicker: 'ECOVEST · SENIOR PRODUCT DESIGNER',
    title: 'Budgeting & expense management designed for student realities',
    subtitle: 'Pocketa by EcoVest: Mobile-First Student Finance',
    category: 'Product Case Study',
    tagline: 'Senior Product Designer · May 2026 – Present',
    awardOrBadge: '📱 SENIOR DESIGNER · ECOVEST',
    featured: true,
    year: '2026',
    role: 'Senior Product Designer',
    clientOrOrg: 'EcoVest Technology Ltd',
    technologies: ['Mobile UI/UX', 'Figma', 'Design Systems', 'Fintech Architecture'],
    mockupImage: '/assets/projects/pocketa.webp',
    gallery: [
      { src: '/assets/projects/pocketa-2.webp', alt: 'Pocketa savings goals and money-left screens' },
    ],
    numberIndex: '03',
    displayTitle: 'Pocketa',
    displayCategory: 'Mobile Application',
    editorialSummary:
      'A student money app built around a forgiving “Safe-to-Spend” daily pacing engine instead of scary red alerts.',
    myRoleTitle: 'Senior Product Designer',
    shortDescription:
      'Leading end-to-end product design for Pocketa, defining core user journeys from allowance budgeting to real-time expense tracking and emergency savings pots.',
    problem:
      'College students in Nigeria receive unpredictable pocket money from parents, navigate sudden campus levies, and face high food inflation. Mainstream banking apps categorize expenses poorly and induce anxiety with punitive "over-budget" red alerts.',
    solution:
      'Architected Pocketa from the ground up: defined the MVP, mapped 14 core user flows, built a comprehensive tokenized design system in Figma, and created a forgiving "Safe-to-Spend" daily metric that dynamically adjusts as student expenses occur.',
    constraints: [
      'Complex backend ledger reconciliation must feel instant and friction-free on mobile',
      'Students frequently operate in erratic network environments during campus lectures',
      'High churn risk if daily entry takes more than 5 seconds',
    ],
    tradeoffs: [
      'Replaced manual category tagging with intelligent merchant auto-detection',
      'Substituted punitive warning popups with empathetic financial pacing suggestions',
    ],
    metrics: [
      { label: 'FLOWS ARCHITECTED', value: '14 Core Flows' },
      { label: 'AVG. ENTRY TIME', value: '< 4 Seconds' },
      { label: 'DESIGN TOKENS', value: '120+ Components' },
    ],
    deliverables: [
      'Zero-State Onboarding & Financial Persona Quiz',
      'Dynamic Safe-to-Spend Daily Dashboard',
      'Peer-to-Peer Split Bill Calculation Engine',
      'Complete Mobile Design System & Handoff Specs',
    ],
    wireframeHighlights: [
      'Quick-Tap Expense Bottom Sheet with Haptic Feedback',
      'Visual Savings Goals with Milestone Visualizers',
      'End-of-Month Habit Reflection & Insights',
    ],
    caseStudySections: [
      {
        title: '01. Researching Campus Financial Behaviors',
        subtitle: 'Living the reality of Nigerian university finances',
        content: [
          'As an active student at the University of Lagos and Senior Product Designer at EcoVest, I led discovery sessions with 60 students across 4 universities. We discovered that traditional monthly budgets fail students because their income is weekly or unpredictable.',
          'What students needed was not a spreadsheet: they needed to know whether they could afford lunch today without running out of cash before Friday.',
        ],
      },
      {
        title: '02. The Safe-to-Spend Paradigm',
        subtitle: 'Designing empathetic financial guardrails',
        content: [
          'We created the "Safe-to-Spend" algorithm and UI indicator. Instead of displaying a frightening total bank balance, Pocketa subtracts fixed obligations (hostel fees, upcoming exams) and divides the remainder by days left in the week.',
        ],
      },
    ],
  },
  {
    id: 'ventics-ai',
    slug: 'ventics-ai',
    monogram: 'VT',
    folderTab: '📁 #04 · VENTICS AI',
    folderBg: '#F4BE24',
    folderText: '#121316',
    badgeKicker: 'VENTICS AI · FOUNDING PRODUCT DESIGNER',
    title: 'Transforming interior design visualization with generative AI',
    subtitle: 'Ventics AI: Pre-Launch Onboarding & Waitlist Experience',
    category: 'Product Case Study',
    tagline: 'Founding Product Designer · Jan 2026 – Apr 2026',
    awardOrBadge: '⚡ 34.2% WAITLIST CONVERSION',
    featured: true,
    year: '2026',
    role: 'Founding Product Designer (Part-Time)',
    clientOrOrg: 'Ventics AI Inc.',
    technologies: ['Generative AI UX', 'Figma', 'Interactive Prototypes', 'Conversion Optimization'],
    numberIndex: '04',
    displayTitle: 'Ventics AI',
    displayCategory: 'Generative AI Web Experience',
    mockupImage: '/assets/projects/ventics-ai.webp',
    gallery: [
      { src: '/assets/projects/ventics-ai-2.webp', alt: 'Ventics AI landing page hero on a desktop browser' },
      { src: '/assets/projects/ventics-ai-3.webp', alt: 'Ventics AI waitlist page' },
    ],
    editorialSummary:
      'An AI interior staging platform that turns rough room photos into photorealistic decor in seconds.',
    myRoleTitle: 'Founding Product Designer',
    shortDescription:
      'Led end-to-end design of an AI-powered interior design platform from concept to waitlist launch, achieving a 34.2% visitor-to-waitlist conversion rate.',
    problem:
      'Homeowners and interior decorators struggle with visualizing furniture layouts and materials in existing living spaces. Traditional 3D rendering tools take days to configure and require specialized architectural training.',
    solution:
      'Designed the complete landing page, prompt guidance interface, and interactive preview sandbox for Ventics AI. Users upload a room photo, select aesthetic moodboards, and receive photo-realistic reimagined renders in seconds.',
    constraints: [
      'AI image generation takes 8–15 seconds; UI needed engaging progress feedback to avoid drop-offs',
      'First-time users lacked vocabulary to describe architectural design styles accurately',
    ],
    tradeoffs: [
      'Implemented visual style picker chips over open text prompt fields to guarantee high aesthetic output quality',
      'Built a split-screen before/after interactive slider that clearly demonstrated generative rendering fidelity',
    ],
    metrics: [
      { label: 'WAITLIST CONVERSION', value: '34.2%' },
      { label: 'USABILITY SCORE', value: '94 / 100' },
      { label: 'RENDER WAIT DROP', value: '< 2.1%' },
    ],
    deliverables: [
      'High-Converting Product Landing Page',
      'Visual Style & Material Picker System',
      'Before / After Interactive Slider Component',
      'Core Design System & Token Library',
    ],
    wireframeHighlights: [
      'Progressive Style Onboarding Questionnaire',
      'Split-View Drag Comparison Frame',
      'One-Click Material & Color Swap Drawer',
    ],
    caseStudySections: [
      {
        title: '01. Tackling Generative Latency in UX',
        subtitle: 'Turning waiting time into anticipation',
        content: [
          'Working directly with the CEO and CTO, our greatest challenge was model latency. When an AI takes 12 seconds to generate a room, an ordinary spinner causes users to bounce.',
          'We designed a multi-step progressive rendering status: analyzing room geometry → applying lighting layers → staging furniture. Users felt the system was actively thinking, reducing perceived wait time by 48%.',
        ],
      },
    ],
  },
  {
    id: 'quickbill-proj',
    slug: 'quickbill',
    monogram: 'QB',
    folderTab: '📁 #05 · QUICKBILL',
    folderBg: '#EE5828',
    folderText: '#FFFFFF',
    badgeKicker: 'WETECH X NEXASCALE · 3-HOUR BUILD',
    title: 'Voice-to-invoice automation for West African micro-merchants',
    subtitle: 'QuickBill: Pidgin & English WhatsApp Invoicing Tool',
    category: 'Shipped AI Build',
    tagline: 'Wetech x NexaScale Hackathon · 3-Hour Rapid Build',
    awardOrBadge: '⏱ 3-HOUR HACKATHON BUILD',
    featured: false,
    liveUrl: 'https://quickbill-m-cord.onrender.com',
    buildDuration: '3 Hours',
    year: '2026',
    role: 'Product Designer & AI Engineer',
    clientOrOrg: 'Wetech x NexaScale Hackathon',
    technologies: ['Google AI Studio', 'Render', 'Node.js', 'WhatsApp Webhook'],
    numberIndex: '05',
    displayTitle: 'QuickBill',
    displayCategory: 'WhatsApp Automation Tool',
    mockupImage: '/assets/projects/quickbill.webp',
    gallery: [
      { src: '/assets/projects/quickbill-2.webp', alt: 'QuickBill landing page: “Invoice. Verify. Get Paid Faster.”' },
    ],
    editorialSummary:
      'A voice-driven WhatsApp invoicing tool for solo bakers, artisans and vendors, built in three hours.',
    myRoleTitle: 'Product Designer & AI Engineer',
    shortDescription:
      'A working invoicing tool that turns plain-English or Nigerian Pidgin instructions into a WhatsApp-ready PDF invoice. Wrote the product spec and UI reference first.',
    problem:
      'Solo artisans, bakers, and freelancers in Nigeria lose hours calculating subtotals and formatting invoices on mobile phones while juggling client conversations.',
    solution:
      'Created QuickBill: speak or type a sentence like "Send invoice to Emeka for 3 cakes at 15k each, discount 2k", and receive a structured, branded PDF invoice ready to share on WhatsApp in seconds.',
    metrics: [
      { label: 'BUILD TIME', value: '3 Hours' },
      { label: 'INVOICE SPEED', value: '< 2 Seconds' },
      { label: 'LANGUAGES', value: 'Pidgin & English' },
    ],
    deliverables: [
      'Prompt Parser for Informal African Currency Expressions',
      'Dynamic HTML-to-PDF Generation Service',
      'Live Render Production Deployment',
    ],
    wireframeHighlights: [
      'WhatsApp Share Intent Trigger',
      'Automatic Tax & Discount Recalculation',
    ],
  },
  {
    id: 'forge-ai-proj',
    slug: 'forge-ai',
    monogram: 'FA',
    folderTab: '📁 #06 · FORGE AI',
    folderBg: '#9B8AF5',
    folderText: '#FFFFFF',
    badgeKicker: 'AI PRODUCT ENGINEER · 5-HOUR LIVE BUILD',
    title: 'Visualizing concept-to-product synthesis with motion',
    subtitle: 'FORGE: The AI Product Engineer Platform',
    category: 'Shipped AI Build',
    tagline: '5-Hour Rapid Concept & Build Sprint',
    awardOrBadge: '⚡ 5-HOUR LIVE BUILD',
    featured: false,
    liveUrl: 'https://forge-ai-ebon-six.vercel.app',
    buildDuration: '5 Hours',
    year: '2026',
    role: 'Product Designer & Frontend Engineer',
    clientOrOrg: 'Self-Initiated Build Sprint',
    technologies: ['React', 'Motion', 'Vercel', 'Tailwind CSS'],
    mockupImage: '/assets/projects/forge-ai.webp',
    numberIndex: '06',
    displayTitle: 'FORGE',
    displayCategory: 'AI Product Engineer · Landing Experience',
    editorialSummary:
      'A landing experience that shows a raw idea becoming tokens, wireframes and production React code, in motion.',
    myRoleTitle: 'Product Designer & Frontend Engineer',
    shortDescription:
      'A showcase landing experience for an autonomous product engineer that transforms raw text ideas into structured UI, design systems, and verified code.',
    problem:
      'Most AI builder landing pages use generic abstract gradients and vague marketing copy that fail to explain how synthesis actually occurs.',
    solution:
      'Engineered an interactive landing page featuring animated state transitions that visually demonstrate an ambiguous prompt resolving into tokens, wireframes, and production React code.',
    metrics: [
      { label: 'BUILD SPRINT', value: '5 Hours' },
      { label: 'ANIMATION FPS', value: '60 FPS' },
      { label: 'VERCEL UPTIME', value: '99.9%' },
    ],
    deliverables: [
      'Custom Motion State Orchestration',
      'Interactive Code Synthesis Simulator',
      'Live Vercel Production Deployment',
    ],
    wireframeHighlights: [
      'Idea-to-Code Transformation Timeline',
      'Dynamic Token Inspector Pane',
    ],
  },
  {
    id: 'vale-proj',
    slug: 'vale',
    monogram: 'VL',
    folderTab: '📁 #07 · VALE',
    folderBg: '#C85A3A',
    folderText: '#FFFFFF',
    badgeKicker: 'EXPERIENTIAL WEB · DESIGN + BUILD',
    title: 'Atmospheric digital retail with interactive lighting physics',
    subtitle: 'Vale: Artisanal Candle Digital Flagship',
    category: 'Shipped AI Build',
    tagline: 'Design + Build Ambient Web Experience',
    awardOrBadge: '🕯 INTERACTIVE LIGHTING',
    featured: false,
    liveUrl: 'https://vale-h7ne.vercel.app',
    buildDuration: 'Design & Code Sprint',
    year: '2025',
    role: 'Product Designer & Creative Technologist',
    clientOrOrg: 'Creative Lab Sprint',
    technologies: ['React', 'CSS Illumination', 'Sound FX', 'Vercel'],
    numberIndex: '07',
    displayTitle: 'Vale',
    displayCategory: 'Experiential Candle Website',
    editorialSummary:
      'An ambient candle site where you light the wick yourself and the glow shifts with every scent.',
    myRoleTitle: 'Product Designer & Creative Technologist',
    shortDescription:
      'An ambient interactive candle flagship where visitors light the candle wick, and page illumination dynamically shifts across scent notes.',
    problem:
      'Luxury fragrance and candle brands struggle to convey warmth and aroma through flat static e-commerce photographs.',
    solution:
      'Engineered an experiential web canvas where lighting the candle dims background surfaces, projects warm organic radial glow, and plays subtle ambient wick audio.',
    metrics: [
      { label: 'DWELL TIME LIFT', value: '+74%' },
      { label: 'INTERACTION RATE', value: '88%' },
      { label: 'ASSET WEIGHT', value: '< 240KB' },
    ],
    deliverables: [
      'Interactive Flame & Wick Click Physics',
      'Dynamic Scent Color Temperature Mapping',
      'Live Vercel Deployment',
    ],
    wireframeHighlights: [
      'Wick Ignition State Machine',
      'Artisanal Fragrance Notes Spectrum',
    ],
  },
  {
    id: 'smartajo-proj',
    slug: 'smartajo',
    monogram: 'SA',
    folderTab: '📁 #08 · SMARTAJO',
    folderBg: '#0E857D',
    folderText: '#FFFFFF',
    badgeKicker: 'FINTECH UX STRATEGY & RISK SCORING',
    title: 'AI default risk scoring for informal cooperative savings',
    subtitle: 'SmartAjo: Digital Trust Layer for Esusu Circles',
    category: 'Product Case Study',
    tagline: 'Fintech Hackathon Strategy & UX Concept',
    awardOrBadge: '🤝 FINTECH UX CONCEPT',
    featured: false,
    liveUrl: 'https://smartajo-seven.vercel.app/',
    year: '2026',
    role: 'Lead UX Strategist',
    clientOrOrg: 'Fintech Community Challenge',
    technologies: ['Fintech Architecture', 'Figma', 'USSD Journeys', 'Risk Scoring UX'],
    numberIndex: '08',
    displayTitle: 'SmartAjo',
    displayCategory: 'Fintech Trust Layer · WhatsApp & USSD',
    editorialSummary:
      'A digital trust layer for Ajo/Esusu savings circles, with AI default-risk scoring and multilingual USSD flows.',
    myRoleTitle: 'Lead UX Strategist',
    shortDescription:
      'A digital trust layer for Nigeria’s informal Ajo/Esusu savings circles, combining AI default risk prediction with multilingual WhatsApp/USSD flows.',
    problem:
      'Informal rotating savings groups (Ajo/Esusu) collapse when participants default on their payout turns, leaving organizers personally liable.',
    solution:
      'Designed a credit profiling engine that evaluates informal savings reliability from mobile transaction history, assigning risk-adjusted contribution tiers.',
    metrics: [
      { label: 'DEFAULT REDUCTION', value: '41% Projected' },
      { label: 'LANGUAGES', value: '4 Languages' },
      { label: 'MARKET SEGMENT', value: 'Tier 2 & 3 Cities' },
    ],
    deliverables: [
      'Organiser Circle Management Dashboard',
      'Member Credit Profile & Streak Visualizer',
      'Multilingual USSD Fallback Flowchart',
    ],
    wireframeHighlights: [
      'Circle Rotation Payout Matrix',
      'Automated Peer Reminder Notification System',
    ],
  },
  {
    id: 'carecell-proj',
    slug: 'carecell',
    monogram: 'CC',
    folderTab: '📁 #09 · CARECELL',
    folderBg: '#C92A54',
    folderText: '#FFFFFF',
    badgeKicker: 'HEALTHCARE ACCESSIBILITY UX',
    title: 'Accessible medication adherence for sickle cell warriors',
    subtitle: 'CareCell: Sickle Cell Health Companion',
    category: 'Product Case Study',
    tagline: 'Healthcare Accessibility UX Research & Design',
    awardOrBadge: '❤️ HEALTH ACCESSIBILITY',
    featured: false,
    year: '2025',
    role: 'Product Designer & User Researcher',
    clientOrOrg: 'Healthcare Community Initiative',
    technologies: ['Mobile Health UX', 'Figma', 'Accessibility (WCAG AAA)', 'Emergency Triggers'],
    numberIndex: '09',
    displayTitle: 'CareCell',
    displayCategory: 'Healthcare Mobile App',
    editorialSummary:
      'A calm, high-contrast companion that helps sickle cell warriors log pain crises and call for help in one tap.',
    myRoleTitle: 'Product Designer & User Researcher',
    shortDescription:
      'A mobile app designed with high-contrast accessibility standards to help sickle cell patients track pain crises, manage daily hydration, and summon rapid emergency assistance.',
    problem:
      'During acute vaso-occlusive pain crises, sickle cell patients experience severe visual fatigue and motor distress, rendering complex medical tracking apps unusable.',
    solution:
      'Created an ultra-high-contrast, minimal-tap emergency interface. One tap logs crisis severity, alerts pre-configured emergency contacts with GPS coordinates, and surfaces nearest specialist clinics.',
    metrics: [
      { label: 'EMERGENCY TAPS', value: '1 Tap to SOS' },
      { label: 'CONTRAST RATIO', value: '18:1 (AAA)' },
      { label: 'LOGGING SPEED', value: '< 3 Seconds' },
    ],
    deliverables: [
      'Pain Severity Visual Scale & Hydration Tracker',
      'One-Tap Emergency Geolocation Dispatch',
      'Doctor Appointment & Medication History Report',
    ],
    wireframeHighlights: [
      'Crisis Mode Low-Distress Interface',
      'Automated Hydration Push Reminders',
    ],
  },
  {
    id: 'pivot-proj',
    slug: 'pivot',
    monogram: 'PV',
    folderTab: '📁 #10 · PIVOT',
    folderBg: '#4F46E5',
    folderText: '#FFFFFF',
    badgeKicker: 'THERAPEUTIC GAME UX · PRODUCT DESIGNER',
    title: 'Gamifying addiction recovery through therapeutic play',
    subtitle: 'Pivot: The Resilience Board Game UX',
    category: 'Product Case Study',
    tagline: 'Product Designer · Dec 2025 – Present',
    awardOrBadge: '🎲 THERAPEUTIC GAME UX',
    featured: false,
    year: '2025',
    role: 'Product Designer & Systems Architect',
    clientOrOrg: 'Pivot Youth Rehabilitation Initiative',
    technologies: ['Therapeutic UX', 'Game Systems', 'Physical & Digital Tokens', 'Emotional Accessibility'],
    numberIndex: '10',
    displayTitle: 'Pivot',
    displayCategory: 'Therapeutic Board Game',
    editorialSummary:
      'A cooperative board game that turns addiction recovery into supportive group play, designed with therapeutic UX.',
    myRoleTitle: 'Product Designer & Systems Architect',
    shortDescription:
      'Designing a cooperative board game that guides youth drug addiction recovery, applying therapeutic UX principles, emotional accessibility, and supportive game mechanics.',
    problem:
      'Clinical rehabilitation therapy sessions often feel punitive, clinical, or intimidating for youth navigating substance abuse recovery.',
    solution:
      'Designed a cooperative board game that gamifies relapse prevention strategies, emotional check-ins, and mutual peer accountability through structured group play.',
    metrics: [
      { label: 'ENGAGEMENT LIFT', value: '+64% Lift' },
      { label: 'FACILITATOR SCORE', value: '100% Approval' },
      { label: 'PLAYTEST SCORE', value: '4.8 / 5.0' },
    ],
    deliverables: [
      'Emotional Accessibility & Therapeutic Principles Guide',
      'Game Board Topology & Safe-Zone Milestone Map',
      'Trigger vs Resilience Action Card System',
      'Facilitator Companion Manual',
    ],
    wireframeHighlights: [
      'Safe-Zone Progression Board Layout',
      'Coping Strategy Deck UI & Card Logic',
    ],
  },
];

export const BRICK_COMPANIES = [
  {
    name: 'EcoVest',
    role: 'Senior Product Designer',
    period: 'May 2026 — Now',
    color: '#2FA06A',
    textColor: '#FFFFFF',
    highlight: 'Designed Pocketa PFM app, Safe-to-Spend pacing engine & onboarding for 20k+ users.',
    tools: 'Figma, Design Systems, Mobile UI, FinTech Architecture',
  },
  {
    name: 'Forge Academy',
    role: 'Founder & Lead Instructor',
    period: 'Jun 2026 — Now',
    color: '#EE5828',
    textColor: '#FFFFFF',
    highlight: 'Founded community academy, mentored 10+ students through design systems & AI workflows.',
    tools: 'Curriculum Design, Figma, Community, AI Tools',
  },
  {
    name: 'Ventics AI',
    role: 'Founding Product Designer',
    period: 'Jan — Apr 2026',
    color: '#9B8AF5',
    textColor: '#FFFFFF',
    highlight: 'Designed AI room transformer waitlist & editor UI, reaching 34.2% conversion.',
    tools: 'Next.js, Tailwind, Figma, Stable Diffusion Workflows',
  },
  {
    name: 'Wrix-Way Tech Hub',
    role: 'UI/UX Design Tutor',
    period: 'Apr — Jun 2026',
    color: '#3062F7',
    textColor: '#FFFFFF',
    highlight: 'Trained students on UI principles, wireframing, and Figma prototyping fundamentals.',
    tools: 'Figma, UX Research, Design Thinking',
  },
  {
    name: 'Pivot',
    role: 'Product Designer',
    period: 'Dec 2025 — Now',
    color: '#F4BE24',
    textColor: '#121316',
    highlight: 'Designing a cooperative recovery board game: safe-zone progression board and coping-strategy card decks.',
    tools: 'Therapeutic UX, Game Systems, Card & Board Design',
  },
  {
    name: 'Cowrywise',
    role: 'Campus Ambassador',
    period: 'Dec 2025 — Now',
    color: '#0C7770',
    textColor: '#FFFFFF',
    highlight: 'Championed financial literacy & fintech adoption across UNILAG campus community.',
    tools: 'FinTech Advocacy, Community Leadership',
  },
  {
    name: 'PlastiBuild',
    role: 'Product Design Intern',
    period: 'Oct — Dec 2025',
    color: '#C92A54',
    textColor: '#FFFFFF',
    highlight: 'Designed circular economy waste tracking & eco-rewards redemption experience.',
    tools: 'Figma, Mobile Prototypes, Sustainability UX',
  },
  {
    name: 'NAMSSN UNILAG',
    role: 'Assistant General Secretary',
    period: 'Aug 2026 — Now',
    color: '#181B20',
    textColor: '#FFFFFF',
    highlight: 'Organized academic & tech empowerment initiatives for math & science students.',
    tools: 'Operations, Leadership, Mathematics',
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-unilag',
    quote:
      'Owoade brings more than visual flair; he brings thoughtfulness, empathy, and a deep understanding of the user and the system. His work on QualityHub turned a complex complaint process into an accountable experience.',
    author: 'TEAM INNOVATEQAS',
    role: '1st Runner Up (14 teams)',
    company: 'UNILAG QAS & SERVICOM Innovation 2026',
  },
  {
    id: 'test-ventics',
    quote:
      'Working with Owoade was smooth from start to finish. He understands the brief deeply, iterates at lightning speed with AI tooling, and delivers work that actually converts—taking our waitlist conversion to 34.2%.',
    author: 'VENTICS AI FOUNDING TEAM',
    role: 'AI Interior Platform',
    company: 'Ventics AI Inc.',
  },
  {
    id: 'test-forge',
    quote:
      'Learning UI/UX design under Owoade at Forge Academy completely demystified Figma and design systems. Practical, no-fluff, and directly focused on real-world portfolio building.',
    author: 'COHORT 1 GRADUATE',
    role: 'Product Designer',
    company: 'Forge Academy Alumni',
  },
];

export interface ExperienceItem {
  id: string;
  period: string;
  company: string;
  role: string;
  employmentType: string;
  location: string;
  description: string;
  highlights: string[];
  skills: string[];
}

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'forge-academy',
    period: 'JUN 2026 – PRESENT',
    company: 'Forge Academy',
    role: 'Founder & Lead Instructor',
    employmentType: 'Founder / Hybrid',
    location: 'Lagos, Nigeria',
    description:
      'Founded a community-driven tech academy with live cohorts, mentorship, and real-world projects. Now in Cohort 2, with 10+ students trained in modern product design and AI tooling.',
    highlights: [
      'Designed the complete curriculum and lead live UI/UX Design cohorts',
      'Mentored 10+ students through portfolio development, design systems, and career readiness',
      'Oversee the academy’s product vision, operations, marketing, and community growth',
    ],
    skills: ['Curriculum Design', 'Mentorship', 'Design Systems', 'Product Strategy'],
  },
  {
    id: 'ecovest',
    period: 'MAY 2026 – PRESENT',
    company: 'EcoVest',
    role: 'Senior Product Designer',
    employmentType: 'Senior Designer',
    location: 'Remote',
    description:
      'Lead product design for Pocketa, a mobile-first budgeting and money-management product for students and young adults.',
    highlights: [
      'Defined the MVP and core journeys: budget creation, expense tracking, spending insights, and savings goals',
      'Run discovery and UX research into students’ financial behaviours to inform flows, IA, and high-fidelity UI',
      'Collaborate closely with founders and engineers on product strategy and feature prioritisation',
    ],
    skills: ['Mobile App Design', 'User Research', 'Fintech UX', 'Design Systems'],
  },
  {
    id: 'wrix-way',
    period: 'APR 2026 – JUN 2026',
    company: 'Wrix-Way Tech Hub',
    role: 'UI/UX Design Tutor',
    employmentType: 'Remote Tutor',
    location: 'Remote',
    description:
      'Taught UI/UX design fundamentals, user research, wireframing, prototyping, and Figma; developed comprehensive course materials and gave individual feedback.',
    highlights: [
      'Structured 8-week design thinking and Figma auto-layout modules',
      'Conducted 1-on-1 portfolio teardowns and design critique sessions',
    ],
    skills: ['Figma', 'Wireframing', 'Prototyping', 'Design Teaching'],
  },
  {
    id: 'ventics-ai-exp',
    period: 'JAN 2026 – APR 2026',
    company: 'Ventics AI',
    role: 'Founding Product Designer',
    employmentType: 'Part-Time / Contract',
    location: 'Remote',
    description:
      'Led end-to-end design of an AI-powered interior design platform from concept to waitlist launch, including landing, onboarding, and conversion journey.',
    highlights: [
      'Designed flows, wireframes, high-fidelity UI and prototypes; established design system',
      'Worked directly with CEO, CTO and engineers; ran usability testing and competitor UX audits',
    ],
    skills: ['AI Product Design', 'Landing Page Conversion', 'Usability Audits'],
  },
  {
    id: 'pivot-exp',
    period: 'DEC 2025 – PRESENT',
    company: 'Pivot: The Resilience Game',
    role: 'Product Designer',
    employmentType: 'Contract',
    location: 'Remote',
    description:
      'Design a board game that guides drug addiction recovery, applying therapeutic UX principles, emotional accessibility, and supportive game mechanics.',
    highlights: [
      'Developed card progression logic and milestone safe-zone mechanics',
      'Created facilitator companion guide for addiction rehabilitation clinics',
    ],
    skills: ['Therapeutic UX', 'Game Systems', 'Emotional Accessibility'],
  },
  {
    id: 'cowrywise',
    period: 'DEC 2025 – PRESENT',
    company: 'Cowrywise',
    role: 'Campus & Community Ambassador',
    employmentType: 'Ambassador',
    location: 'University of Lagos / Remote',
    description:
      'Represent Cowrywise in university and tech communities, promoting personal finance literacy, savings discipline, and mutual fund investment products.',
    highlights: [
      'Organized financial literacy sessions for 200+ students',
      'Championed digital savings adoption across student groups',
    ],
    skills: ['Community Advocacy', 'Financial Literacy', 'Public Engagement'],
  },
  {
    id: 'plastibuild',
    period: 'OCT 2025 – DEC 2025',
    company: 'PlastiBuild Creative Solutions',
    role: 'Product Design Intern',
    employmentType: 'Internship',
    location: 'Lagos, Nigeria',
    description:
      'Led end-to-end design of a sustainability-focused digital platform connecting waste pickers, artisans, and eco-partners from discovery to high-fidelity Figma delivery.',
    highlights: [
      'Defined product vision, user journeys, and information architecture',
      'Ran field user research and prototype usability testing with local artisans',
    ],
    skills: ['Sustainability UX', 'Information Architecture', 'Field Research'],
  },
  {
    id: 'namssn-leadership',
    period: 'AUG 2026 – PRESENT',
    company: 'NAMSSN (UNILAG)',
    role: 'Assistant General Secretary',
    employmentType: 'Elected Leadership',
    location: 'University of Lagos',
    description:
      'Elected Assistant General Secretary for the National Association of Mathematics Students of Nigeria (UNILAG Chapter). Managing communications, student advocacy, and academic initiatives.',
    highlights: [
      'Representing hundreds of undergraduate mathematics students',
      'Bridging mathematical logic and computational problem solving',
    ],
    skills: ['Student Leadership', 'Governance', 'Communication'],
  },
];

export const EDUCATION_LIST = [
  {
    institution: 'University of Lagos',
    degree: 'B.Sc. Industrial Mathematics',
    period: 'Oct 2024 – Oct 2028 (expected)',
    note: 'Applying mathematical logic, statistics, and algorithms to system design.',
  },
  {
    institution: 'Product Design University',
    degree: 'UI/UX Professional Diploma',
    period: '2024',
    note: 'Advanced product design, design systems, and design thinking.',
  },
  {
    institution: 'Product Design University',
    degree: 'Elementary Certificate in UI/UX Design',
    period: '2024',
    note: 'Foundations of UI design, typography, and wireframing.',
  },
  {
    institution: 'Rejoice',
    degree: 'Bootcamp for Designers',
    period: '2024',
    note: 'Intensive product prototyping and industry design sprints.',
  },
  {
    institution: 'TID 5.0',
    degree: 'Certificate in Tech & Design Innovation',
    period: '2024',
    note: 'Collaborative product development and tech innovation.',
  },
];

export const SKILL_CATEGORIES = [
  {
    title: 'Product & Design',
    skills: [
      'Product Design & UI/UX',
      'User Research & Usability Testing',
      'Wireframing & Prototyping',
      'Design Systems & Tokens',
      'Web & App Design',
      'Information Architecture',
    ],
  },
  {
    title: 'AI-Assisted Engineering',
    skills: [
      'Google AI Studio Prototyping',
      'Prompt Engineering & PRDs',
      'Deployment with GitHub & Vercel',
      'Front-End Design Engineering',
      'Render & Web Hooks',
      'Rapid MVP Shipping',
    ],
  },
  {
    title: 'Tools & Leadership',
    skills: [
      'Figma & FigJam',
      'Adobe Creative Suite',
      'Whimsical',
      'Curriculum Design & Mentorship',
      'Public Speaking',
      'Fluent: English, Yoruba',
    ],
  },
];

export interface BookChapter {
  id: string;
  chapterNumber: string;
  title: string;
  subtitle: string;
  quote?: string;
  story: string;
  reflections: string[];
  eventOrContext?: string;
  year: string;
  location?: string;
  image: string;
  imageCaption: string;
  tags: string[];
  accentColor: string;
  imageFit?: 'cover' | 'contain';
  imagePosition?: string;
}

export const BOOK_CHAPTERS: BookChapter[] = [
  {
    id: 'ch-01-builder',
    chapterNumber: 'Chapter 01',
    title: 'The Builder',
    subtitle: 'Translating concepts into living, working software',
    quote: 'A design only becomes real when people can touch it, test it, and use it.',
    story:
      'I don’t stop at high-fidelity mockups. My workflow bridges Figma design tokens directly into React, Tailwind, and full-stack deployments. Whether it’s crafting micro-pension flows in BabaSika or university compliance escalation in QualityHub, building in code informs every constraint I design for.',
    reflections: [
      'Code-first design systems and token hierarchies',
      'AI-assisted rapid prototyping velocity with Google AI Studio',
      'Eliminating fidelity loss between Figma and production',
    ],
    eventOrContext: 'Design Engineering & Builder',
    year: '2024 — Present',
    location: 'Lagos, Nigeria',
    image: '/assets/photos/portrait.webp',
    imageCaption: 'Opeyemi — Product Designer & Design Engineer bridging design systems, rapid AI velocity, and production code.',
    tags: ['Design Systems', 'React', 'Rapid MVP', 'Figma Tokens'],
    accentColor: '#3062F7',
    imagePosition: 'object-[center_12%]',
  },
  {
    id: 'ch-02-pitcher',
    chapterNumber: 'Chapter 02',
    title: 'The Pitcher',
    subtitle: 'Defending product decisions under the stage lights',
    quote: 'Some rooms teach you to think differently. When you have 3 minutes to pitch a 36-hour sprint, clarity is everything.',
    story:
      'This photo captures pitching on stage at The Industry Discourse (TID 5.0) Hackathon, defending our product architecture with teammates. Beyond TID, I’ve pitched across multiple competitive hackathons—including BuildVerse, UNILAG SERVICOM, and Wetech. When facing judges, investors, and fellow builders with only 3 minutes to communicate complex problem-solving, clarity and conviction under pressure are everything.',
    reflections: [
      'Pitched across 10+ hackathons including TID 5.0, BuildVerse & UNILAG SERVICOM',
      'Honourable Mention at BuildVerse Hackathon · The John Amhanesi Foundation',
      '1st Runner Up (out of 14 teams) at UNILAG SERVICOM & QAS Innovation',
    ],
    eventOrContext: 'TID 5.0 Hackathon Stage',
    year: '2026',
    location: 'UNILAG Main Auditorium · Lagos',
    image: '/assets/photos/stage-tid.webp',
    imageCaption: 'Pitching on stage at The Industry Discourse (TID 5.0) Hackathon · NEX FRONT, defending product architecture alongside teammates.',
    tags: ['TID 5.0 Hackathon', 'Hackathon Pitching', 'BuildVerse', 'Stage Defense'],
    accentColor: '#EE5828',
    imagePosition: 'object-center',
  },
  {
    id: 'ch-03-speaker',
    chapterNumber: 'Chapter 03',
    title: 'The Speaker',
    subtitle: 'Demystifying AI, product design, and modern tooling',
    quote: 'Sharing what you know doesn’t just help others—it forces you to articulate why your craft matters.',
    story:
      'Engaging student developers, designers, and community members at tech gatherings and beginner masterclasses. As an invited speaker at the UX Design Masterclass for Beginners hosted by AfriAI, I share foundational principles of intuitive, user-centered digital experiences across web and mobile platforms.',
    reflections: [
      'Invited speaker & tutor at UX Design Masterclass for Beginners · AfriAI',
      'Workshops on clean, purposeful, user-centered product design',
      'Bridging Industrial Mathematics analytical rigor with UX intuition',
    ],
    eventOrContext: 'UX Design Masterclass · AfriAI',
    year: '2025 — 2026',
    location: 'AfriAI · Virtual & Lagos',
    image: '/assets/photos/speaker-afriai.webp',
    imageCaption: 'Invited speaker flyer for the UX Design Masterclass for Beginners · AfriAI: “Meet Our Speakers — Owoade Opeyemi (The UX Forger)”.',
    tags: ['Invited Speaker', 'AfriAI', 'Masterclass', 'UX Education'],
    accentColor: '#9B8AF5',
    imagePosition: 'object-[20%_40%]',
  },
  {
    id: 'ch-04-educator',
    chapterNumber: 'Chapter 04',
    title: 'The Educator',
    subtitle: 'Passing the torch to the next cohort of designers',
    quote: 'Watching a student go from struggling with auto-layout to shipping their first verified case study is the most rewarding part of this work.',
    story:
      'At Forge Academy, I teach live cohorts in UI/UX design, wireframing, and component architecture. Over 10+ students in our first cohort learned to think critically about user pain points, build design systems from scratch, and prepare job-ready portfolios without relying on generic templates.',
    reflections: [
      '10+ designers trained and mentored through comprehensive curriculum',
      'Hands-on portfolio reviews and Figma workflow optimization',
      'Fostering problem-solving mindset over shallow aesthetic copying',
    ],
    eventOrContext: 'Design Systems & Stage Masterclass',
    year: '2026 — Present',
    location: 'Forge Academy · Hybrid',
    image: '/assets/photos/teaching.webp',
    imageCaption: 'On stage breaking down mobile UI architectures, health monitoring metrics, and design systems for aspiring creators.',
    tags: ['Mentorship', 'Design Cohorts', 'UI/UX Training', 'Education'],
    accentColor: '#2FA06A',
  },
  {
    id: 'ch-05-founder',
    chapterNumber: 'Chapter 05',
    title: 'The Founder',
    subtitle: 'Building Forge Academy from a vision into a community',
    quote: 'True design education should be accessible, practical, and grounded in real-world shipping.',
    story:
      'I founded Forge Academy to create the learning environment I wished I had when starting out: no fluff, no outdated theory, but direct access to real design sprints, mentor feedback, and collaborative peer builds. From curriculum design to community operations, every detail is crafted with intention.',
    reflections: [
      'Now actively running Cohort 2 with expanding curriculum',
      'Cultivating a tight-knit community of ambitious West African creators',
      'Continually evolving modules to include modern AI design engineering',
    ],
    eventOrContext: 'Forge Academy Founder',
    year: '2026 — Present',
    location: 'Lagos, Nigeria',
    image: '/assets/photos/founder.webp',
    imageCaption: 'Opeyemi — Founder of Forge Academy & The UX Forger, creating career-transforming learning environments for young builders.',
    tags: ['Founder', 'Community', 'Forge Academy', 'Leadership'],
    accentColor: '#F4BE24',
    imagePosition: 'object-[center_15%]',
  },
  {
    id: 'ch-06-beyond',
    chapterNumber: 'Chapter 06',
    title: 'Beyond the Screen',
    subtitle: 'Patience in the kitchen, strategy at the board',
    quote: 'Great products need balance. Stepping away from the keyboard makes the work sharper.',
    story:
      'When I’m not designing or coding, you’ll find me cooking (experimenting with seasoning balances and slow simmer recipes), playing board and video games that reward tactical foresight, or engaged in late-night conversations exploring psychology, design philosophy, and human behavior.',
    reflections: [
      'Culinary experimentation: treating recipes like iterative design loops',
      'Strategic gaming: understanding player incentives and emergent systems',
      'Thoughtful conversations with friends and fellow creators',
    ],
    eventOrContext: 'Culinary Craft · Off-Screen Rituals',
    year: 'Ongoing',
    location: 'Lagos, Nigeria',
    image: '/assets/photos/cooking-strip.webp',
    imagePosition: 'object-center',
    imageCaption: 'Iterative seasoning balances off-screen — from fresh chopped prep and slow-simmered sauce to plated spaghetti.',
    tags: ['Culinary Craft', 'Mechanics', 'Philosophy', 'Creative Balance'],
    accentColor: '#EE5828',
  },
  {
    id: 'ch-07-milestones',
    chapterNumber: 'Chapter 07',
    title: 'Milestones & Beyond',
    subtitle: 'Looking back at the markers, looking forward to the future',
    quote: 'The standard isn’t where you started—it’s how relentlessly you refine.',
    story:
      'From studying Industrial Mathematics at the University of Lagos to winning competition honours, shipping 10+ hackathon builds, and founding Forge Academy, each milestone is a proof point of disciplined iteration. The next chapter is about scaling impact and building products that touch millions of lives.',
    reflections: [
      'B.Sc. Industrial Mathematics at University of Lagos (2024–2028 expected)',
      '10+ Hackathons attended and deployed with zero dropped balls',
      'Expanding Forge Academy to empower 100+ new product creators',
    ],
    eventOrContext: 'UNILAG QAS & SERVICOM 2026 Stage',
    year: '2024 — Future',
    location: 'Global Reach',
    image: '/assets/photos/qas-stage.webp',
    imageCaption: 'On stage with Vice-Chancellor Prof. Folasade Ogunsola at UNILAG Quality Assurance & SERVICOM Unit 2026 International Customer Service Week — 1st Runner Up (14 teams).',
    tags: ['Academic Journey', 'UNILAG', 'Vision', 'Growth'],
    accentColor: '#141618',
  },
];

export interface BeyondWorkItem {
  id: string;
  emoji: string;
  title: string;
  tagline: string;
  description: string;
  color: string;
  bgTint: string;
  borderColor: string;
  photo?: { src: string; alt: string };
}

export const BEYOND_WORK_ITEMS: BeyondWorkItem[] = [
  {
    id: 'cooking',
    emoji: '🍳',
    title: 'Culinary Craft & Cooking',
    tagline: 'Treating recipes like iterative design sprints',
    description:
      'Cooking is my favorite creative outlet off-screen. Balancing spices, timing heat, and plating a dish requires the exact same patience, sensory empathy, and iterative taste as refining micro-interactions.',
    color: '#EE5828',
    bgTint: 'rgba(238, 88, 40, 0.06)',
    borderColor: 'rgba(238, 88, 40, 0.25)',
    photo: { src: '/assets/photos/cooking.webp', alt: 'Chopped onions and carrots, a simmering sauce, and the finished spaghetti' },
  },
  {
    id: 'gaming',
    emoji: '🎮',
    title: 'Gaming & System Strategy',
    tagline: 'Deconstructing game mechanics & feedback loops',
    description:
      'From cooperative board games to tactical video games, I love dissecting progression trees, player incentives, and feedback loops. It directly influenced my work on the Pivot therapeutic recovery game.',
    color: '#3062F7',
    bgTint: 'rgba(48, 98, 247, 0.06)',
    borderColor: 'rgba(48, 98, 247, 0.25)',
    photo: { src: '/assets/photos/gaming.webp', alt: 'Holding a PlayStation controller in front of a racing game on a laptop' },
  },
  {
    id: 'conversations',
    emoji: '💬',
    title: 'Late-Night Deep Talks',
    tagline: 'Exploring psychology, mental models & ideas',
    description:
      'I thrive on thoughtful conversations about human behavior, why people use certain tools, and where technology is taking society. The best product insights often begin in unstructured debates with friends.',
    color: '#9B8AF5',
    bgTint: 'rgba(155, 138, 245, 0.06)',
    borderColor: 'rgba(155, 138, 245, 0.25)',
  },
  {
    id: 'community',
    emoji: '🤝',
    title: 'Meeting People & Community',
    tagline: 'Connecting with ambitious builders & creators',
    description:
      'Whether mentoring aspiring designers at Forge Academy or brainstorming with founders at hackathons, I love connecting with curious, driven individuals who want to build meaningful things.',
    color: '#2FA06A',
    bgTint: 'rgba(47, 160, 106, 0.06)',
    borderColor: 'rgba(47, 160, 106, 0.25)',
  },
];

