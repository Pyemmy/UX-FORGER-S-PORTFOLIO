export interface ProjectItem {
  id: string;
  monogram: string;
  title: string;
  categories: string[];
  filterTag: 'Mobile App' | 'Web & AI' | 'Fintech' | 'Game Design';
  shortDescription: string;
  featured?: boolean;
  gradientFrom: string;
  gradientVia: string;
  gradientTo: string;
  accentLineColor: string;
  year: string;
  role: string;
  duration: string;
  problem: string;
  solution: string;
  impactMetrics: { label: string; value: string }[];
  deliverables: string[];
  wireframeHighlights: string[];
}

export interface ExperienceItem {
  id: string;
  period: string;
  company: string;
  role: string;
  employmentType: string;
  description: string;
  skills: string[];
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  deliverables: string[];
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface PricingTier {
  id: string;
  name: string;
  tagline: string;
  price: string;
  unit?: string;
  billingNote: string;
  popular?: boolean;
  features: string[];
  ctaText: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
}

export const HERO_PILLARS = [
  {
    number: '01',
    title: 'UI/UX Design',
    detail: 'Human-centered mobile & web interfaces engineered for clarity and conversion.',
  },
  {
    number: '02',
    title: 'Product Design',
    detail: 'End-to-end systems thinking from discovery research to scalable design tokens.',
  },
  {
    number: '03',
    title: 'UI/UX Tutoring',
    detail: 'Structured 1-on-1 mentorship and bootcamps for emerging product designers.',
  },
  {
    number: '04',
    title: 'Figma & Framer',
    detail: 'Interactive component libraries and high-performance live Framer builds.',
  },
];

export const MARQUEE_ITEMS = [
  'UI/UX DESIGN',
  'PRODUCT DESIGN',
  'THE UX FORGER',
  'FIGMA',
  'FRAMER',
  'LAGOS NIGERIA',
  'CLEAN INTERFACES',
  'UI/UX TUTORING',
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'carecell',
    monogram: 'CC',
    title: 'CareCell',
    categories: ['Case Study', 'Health', 'Healthcare'],
    filterTag: 'Mobile App',
    shortDescription:
      'A mobile app helping sickle cell patients manage their condition and access quality care.',
    gradientFrom: '#05292E',
    gradientVia: '#094D52',
    gradientTo: '#117A7E',
    accentLineColor: '#2DD4BF',
    year: '2025',
    role: 'Lead UI/UX Designer',
    duration: '6 Weeks',
    problem:
      'Sickle cell warriors in Nigeria struggle with fragmented crisis tracking, delayed emergency hematology access, and inconsistent medication reminders.',
    solution:
      'Designed an accessible, low-cognitive-load mobile companion featuring one-tap crisis SOS alerts, hydration & pain log telemetry, and direct specialist tele-consultations.',
    impactMetrics: [
      { label: 'Task Completion Rate', value: '96.4%' },
      { label: 'Crisis Alert Flow Time', value: '< 4 sec' },
      { label: 'Usability Testing Score', value: '4.9 / 5.0' },
    ],
    deliverables: [
      'User Research & Empathy Mapping',
      'Information Architecture & Crisis Flows',
      '45+ High-Fidelity iOS & Android Screens',
      'WCAG AA Accessible Component Library',
    ],
    wireframeHighlights: [
      'Daily Hydration & Pain Episode Tracker',
      'One-Tap Emergency Caregiver & Hospital Dispatch',
      'Medication & Clinic Appointment Timeline',
    ],
  },
  {
    id: 'cartflow',
    monogram: 'CF',
    title: 'CartFlow',
    categories: ['E-Commerce', 'Mobile App'],
    filterTag: 'Mobile App',
    shortDescription:
      'A seamless groceries ordering app designed for speed, clarity and daily ease of use.',
    gradientFrom: '#071B36',
    gradientVia: '#0D3361',
    gradientTo: '#16558F',
    accentLineColor: '#38BDF8',
    year: '2025',
    role: 'Product Designer',
    duration: '5 Weeks',
    problem:
      'Busy urban professionals abandon grocery carts due to cluttered category trees, hidden delivery fees, and multi-step checkout friction.',
    solution:
      'Crafted a speed-first shopping flow with smart recurring baskets, real-time stock substitution preferences, and a 2-tap instant checkout.',
    impactMetrics: [
      { label: 'Checkout Speed Improvement', value: '+42%' },
      { label: 'Repeat Basket Adoption', value: '78%' },
      { label: 'Cart Drop-off Reduction', value: '-31%' },
    ],
    deliverables: [
      'Competitor Benchmarking',
      'Smart Search & Filter Taxonomy',
      'Interactive Checkout Prototype',
      'Design System Tokens',
    ],
    wireframeHighlights: [
      'Predictive Weekly Staples Re-Order Strip',
      'LiveRider Dispatch & Slot Selection',
      'Zero-Friction Split Payment Sheet',
    ],
  },
  {
    id: 'smartajo',
    monogram: 'SA',
    title: 'SmartAjo',
    categories: ['Fintech', 'Savings'],
    filterTag: 'Fintech',
    shortDescription:
      'A smart cooperative savings tool making group finance effortless and transparent.',
    gradientFrom: '#1A0F3B',
    gradientVia: '#2C1B63',
    gradientTo: '#472B8A',
    accentLineColor: '#A78BFA',
    year: '2025',
    role: 'UI/UX Designer',
    duration: '6 Weeks',
    problem:
      'Traditional rotating savings groups (Ajo/Esusu) suffer from manual ledger disputes, late contribution anxiety, and lack of payout transparency.',
    solution:
      'Built a trust-centered cooperative finance interface with automated contribution streaks, verifiable payout rotation schedules, and instant group audit logs.',
    impactMetrics: [
      { label: 'Ledger Transparency Rating', value: '98%' },
      { label: 'Onboarding Completion', value: '91%' },
      { label: 'Group Dispute Reduction', value: '-85%' },
    ],
    deliverables: [
      'Fintech Trust & Security UX Patterns',
      'Circle Rotation Visualizer',
      'Automated Escrow & Payout Screens',
      'Interactive Figma Prototype',
    ],
    wireframeHighlights: [
      'Live Circle Pool & Payout Queue',
      'Member Trust Score & Contribution Streaks',
      'Automated Debit & Instant Receipt Ledger',
    ],
  },
  {
    id: 'pivot',
    monogram: 'PV',
    title: 'Pivot',
    categories: ['Game Design', 'Social Impact'],
    filterTag: 'Game Design',
    shortDescription:
      'A board game designed to guide drug addiction recovery through engaging gameplay.',
    gradientFrom: '#301708',
    gradientVia: '#592B0E',
    gradientTo: '#8C4616',
    accentLineColor: '#FB923C',
    year: '2025',
    role: 'Game UX & Systems Designer',
    duration: '8 Weeks',
    problem:
      'Rehabilitation counseling sessions often feel clinical and intimidating for young adults navigating substance recovery.',
    solution:
      'Designed a cooperative tabletop & companion digital board game mechanic that turns relapse triggers, coping strategies, and peer accountability into structured play.',
    impactMetrics: [
      { label: 'Session Engagement Lift', value: '+64%' },
      { label: 'Facilitator Adoption', value: '100%' },
      { label: 'Playtest Immersion Score', value: '4.8 / 5.0' },
    ],
    deliverables: [
      'Core Game Loop & Progression Math',
      'Board Layout & Tactile Card Hierarchy',
      'Facilitator Companion Guide UI',
      'Playtesting Iteration Reports',
    ],
    wireframeHighlights: [
      'Trigger vs. Resilience Card Mechanics',
      'Milestone Safe-Zone Board Topology',
      'Peer Support Dialogue Prompts',
    ],
  },
  {
    id: 'ventics-ai',
    monogram: 'VA',
    title: 'Ventics AI',
    categories: ['Client Work', 'AI Product', 'Landing Page', 'Featured'],
    filterTag: 'Web & AI',
    featured: true,
    shortDescription:
      'A waitlist landing page for an AI interior design tool — designed to convert visitors into early users before launch. Every section built with one goal.',
    gradientFrom: '#2E1A0B',
    gradientVia: '#6E3E14',
    gradientTo: '#B86B1F',
    accentLineColor: '#FBBF24',
    year: '2026',
    role: 'Founding Product Designer',
    duration: '4 Weeks (Jan — Apr 2026)',
    problem:
      'An early-stage AI interior design startup needed a high-converting pre-launch presence to validate market demand and capture qualified homeowner & architect signups.',
    solution:
      'Architected a narrative-driven conversion page featuring interactive room style transformations, clear value hierarchy, and frictionless waitlist capture.',
    impactMetrics: [
      { label: 'Waitlist Conversion Rate', value: '34.2%' },
      { label: 'Scroll Depth Completion', value: '82%' },
      { label: 'Client Satisfaction', value: '5.0 / 5.0' },
    ],
    deliverables: [
      'Competitor & Conversion Audit',
      'Desktop & Mobile High-Fidelity Landing Page',
      'Interactive Before/After Room Showcase',
      'Developer Handoff & Motion Specs',
    ],
    wireframeHighlights: [
      'Above-the-Fold Instant Prompt Preview',
      'Architectural Style Transfer Comparison',
      'Single-Field High-Intent Waitlist Capture',
    ],
  },
];

export const STATS_STRIP = [
  {
    value: '2',
    suffix: '',
    label: 'YEARS DESIGNING',
    subtext: 'From early concept work to full product ecosystems',
  },
  {
    value: '5',
    suffix: '',
    label: 'PROJECTS COMPLETED',
    subtext: 'Mobile apps, landing pages, game design & more',
  },
  {
    value: '3',
    suffix: '+',
    label: 'HAPPY CLIENTS',
    subtext: 'Real collaborations with real results delivered',
  },
  {
    value: '4',
    suffix: '',
    label: 'CASE STUDIES',
    subtext: 'Documented design thinking published on Behance',
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'ux-forger',
    period: '2024 — PRESENT',
    company: 'THE UX FORGER',
    role: 'Freelance UI/UX Designer',
    employmentType: 'FREELANCE',
    description:
      'Designing user-centered web and mobile interfaces under my personal brand. Taking projects from research through to high-fidelity delivery — covering fintech, healthcare, e-commerce, and game design.',
    skills: ['FIGMA', 'UX RESEARCH', 'UI DESIGN', 'PROTOTYPING', 'CASE STUDIES'],
  },
  {
    id: 'wdcx-way',
    period: 'APRIL 2026 — PRESENT',
    company: 'WDCX-WAY TECH HUB',
    role: 'UI/UX Designer',
    employmentType: 'FULL-TIME',
    description:
      'Teaching UI/UX design fundamentals to beginner-level students at Wdcx-Way Tech Hub. Delivering structured lessons covering design thinking, Figma, wireframing, prototyping, and user research — breaking down complex concepts into practical, hands-on learning experiences.',
    skills: ['PRODUCT DESIGN', 'COLLABORATION', 'WIREFRAMING', 'FIGMA'],
  },
  {
    id: 'ventics-ai-exp',
    period: 'JAN 2026 — APRIL 2026',
    company: 'VENTICS AI',
    role: 'Founding Product Designer',
    employmentType: 'CONTRACT',
    description:
      'Designed the complete waitlist landing page for an AI-powered interior design product. Came in via referral, signed contracts, and delivered a full high-fidelity design including research, competitor analysis, and UI design.',
    skills: ['LANDING PAGE', 'COMPETITOR RESEARCH', 'HIGH-FIDELITY UI', 'CLIENT WORK'],
  },
  {
    id: 'plastibuild',
    period: 'OCT 2025 — DEC 2025',
    company: 'PLASTIBUILD CREATIVE SOLUTIONS',
    role: 'Senior UI/UX Designer',
    employmentType: 'INTERNSHIP',
    description:
      'Led the product design and user experience strategy for the PlastiBuild Digital Hub — a sustainability-driven platform connecting waste pickers, artisans, students, and eco-partners. Designed scalable mobile experiences, structured Information Architecture, and high-fidelity interfaces across the LMS, EcoMart, carbon credit, and waste management systems while collaborating closely with product, engineering, and IoT teams.',
    skills: [
      'MOBILE APP DESIGN',
      'USER FLOW',
      'INFORMATION ARCHITECTURE',
      'HIGH-FIDELITY UI',
      'DESIGN SYSTEM',
      'PRODUCT STRATEGY',
    ],
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'ui-ux',
    number: '01',
    title: 'UI/UX Design',
    description:
      'End-to-end design from wireframes to high-fidelity screens. I design for real users — clean, intentional, and built to convert.',
    deliverables: [
      'WIREFRAMING & PROTOTYPING',
      'HIGH-FIDELITY UI DESIGN',
      'DESIGN SYSTEMS',
      'USER FLOW MAPPING',
    ],
  },
  {
    id: 'product-design',
    number: '02',
    title: 'Product Design',
    description:
      'Strategic product thinking that bridges user needs and business goals — from discovery research and information architecture to scalable component systems.',
    deliverables: [
      'PRODUCT STRATEGY & DISCOVERY',
      'INFORMATION ARCHITECTURE',
      'COMPETITOR BENCHMARKING',
      'INTERACTIVE PROTOTYPING',
    ],
  },
  {
    id: 'framer-dev',
    number: '03',
    title: 'Framer Development',
    description:
      'Transforming static Figma layouts into responsive, fluidly animated, and high-converting production websites published directly with Framer.',
    deliverables: [
      'RESPONSIVE FRAMER BUILDS',
      'SCROLL & MICRO-INTERACTIONS',
      'CMS SETUP & SEO OPTIMIZATION',
      'LIGHTNING-FAST PERFORMANCE',
    ],
  },
  {
    id: 'tutoring',
    number: '04',
    title: 'UI/UX Tutoring',
    description:
      'Hands-on 1-on-1 design mentorship tailored for beginners and junior designers mastering Figma, visual hierarchy, and case study storytelling.',
    deliverables: [
      'FIGMA FUNDAMENTALS & AUTO-LAYOUT',
      'PORTFOLIO & CASE STUDY REVIEWS',
      'LIVE DESIGN CRITIQUES',
      'CAREER & INTERVIEW GUIDANCE',
    ],
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Discovery & Research',
    description:
      'Understanding your goals, users, and competitors. Every great design starts with the right questions — not assumptions.',
  },
  {
    number: '02',
    title: 'Wireframes & Flow',
    description:
      'Mapping out the structure and user journey before touching visual design. Getting the logic right first.',
  },
  {
    number: '03',
    title: 'High-Fidelity Design',
    description:
      'Bringing it all together — clean, intentional, pixel-perfect screens that look as good as they work.',
  },
  {
    number: '04',
    title: 'Delivery & Handoff',
    description:
      'Clean Figma files, documented design systems, and full support through to launch. No loose ends.',
  },
];

export const STACK_ITEMS = [
  'Figma',
  'Framer',
  'Prototyping',
  'UX Research',
  'Wireframing',
  'Design Systems',
  'Competitor Analysis',
  'Case Studies',
];

export const INITIAL_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'ventics-test',
    quote:
      '"Working with The UX Forger was smooth from start to finish. The design direction felt right immediately, and the final outcome exceeded what I had in mind."',
    author: 'VENTICS AI TEAM',
    role: 'AI Interior Design Startup',
  },
  {
    id: 'wdcx-test',
    quote:
      '"Incredibly detail-oriented and easy to collaborate with. He understands the brief deeply and delivers work that actually solves the problem."',
    author: 'CLIENT · WDCX-WAY',
    role: 'Tech Hub Project',
  },
];

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'tier-uiux',
    name: 'UI/UX Design',
    tagline: 'Clean, intentional designs that convert users into action.',
    price: '$500',
    billingNote: 'Per project · based on scope',
    features: [
      'High-fidelity wireframes',
      'Interactive prototypes',
      'User flow mapping',
      'Figma source files',
    ],
    ctaText: 'GET STARTED',
  },
  {
    id: 'tier-product',
    name: 'Product Design',
    tagline: 'End-to-end design for web and mobile products — research to delivery.',
    price: '$1,000',
    billingNote: 'Per project · based on scope',
    popular: true,
    features: [
      'Everything in UI/UX Design',
      'Competitor research',
      'Design system creation',
      'Case study documentation',
    ],
    ctaText: 'GET STARTED',
  },
  {
    id: 'tier-tutoring',
    name: 'UI/UX Tutoring',
    tagline: '1-on-1 design mentoring — practical, no-fluff, results-focused.',
    price: '$50',
    unit: '/hr',
    billingNote: 'Per session · flexible scheduling',
    features: [
      'Figma fundamentals',
      'Portfolio reviews',
      'Career guidance',
      'Design critiques',
    ],
    ctaText: 'BOOK SESSION',
  },
];
