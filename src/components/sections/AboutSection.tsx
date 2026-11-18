import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { BEYOND_WORK_ITEMS, PERSONAL_INFO } from '../../data/portfolioData';
import { SectionHeader } from '../ui/SectionHeader';
import { Reveal, RevealItem } from '../ui/Reveal';
import { SmartImage } from '../ui/SmartImage';
import { InteractivePhotoBook } from '../InteractivePhotoBook';
import { sizeOf } from '../../data/imageSizes';
import { SPRING_SOFT } from '../../utils/motion';

const STATS = [
  { value: '2×', label: 'Award winner', color: 'text-cobalt-ink' },
  { value: '10+', label: 'Hackathons shipped', color: 'text-mint-ink' },
  { value: '10+', label: 'Students mentored', color: 'text-coral-ink' },
];

const NOW = [
  { text: 'Leading product design for Pocketa at EcoVest', color: '#2FA06A' },
  { text: 'Running Cohort 2 at Forge Academy', color: '#EE5828' },
  { text: 'Designing Pivot, a recovery board game', color: '#F4BE24' },
  { text: 'Studying Industrial Maths at UNILAG', color: '#3062F7' },
];

interface AboutSectionProps {
  onNavigate: (id: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigate }) => {
  const photos = BEYOND_WORK_ITEMS.filter((i) => i.photo);

  return (
    <section id="about" aria-labelledby="about-title" className="cv-auto mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
      <SectionHeader
        id="about-title"
        accent="#EE5828"
        kicker="The person behind the work"
        title="About me & my journey"
        subtitle="Product designer, product engineer, founder of Forge Academy and hackathon competitor. I design with deep user empathy and ship directly in code."
      />

      {/* Story bento */}
      <Reveal className="mb-20 grid grid-cols-1 gap-6 md:grid-cols-12" stagger={0.1}>
        <RevealItem className="md:col-span-7">
          <article className="h-full space-y-4 rounded-3xl border-2 border-ink bg-white p-6 shadow-brutal sm:p-8">
            <div className="flex items-center justify-between border-b border-paper pb-3 font-mono text-xs text-ink-3">
              <span className="font-bold text-ink">Who I am</span>
              <span>Lagos, NG · UNILAG</span>
            </div>
            <h3 className="font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
              Designing with intention, engineering with speed, and teaching in the open.
            </h3>
            <div className="space-y-3 text-sm leading-relaxed text-ink-2 sm:text-[15px]">
              <p>
                I&apos;m <strong className="text-ink">{PERSONAL_INFO.name} (The UX Forger)</strong>, a Product Designer
                and Design Engineer studying Industrial Mathematics at the University of Lagos. I approach digital
                experiences through two lenses: mathematical systems modelling and human behavioural empathy.
              </p>
              <p>
                I believe the gap between design and engineering is where great products are won or lost. Instead of
                handing off static rectangles and hoping for the best, I prototype directly in code, test edge cases
                with real data, and ship working MVPs under hackathon constraints.
              </p>
              <p>
                Beyond my own builds, I founded <strong className="text-ink">Forge Academy</strong>, a hands-on design
                and tech academy where I mentor cohorts of ambitious young creators through real product teardowns,
                design systems and modern AI workflows.
              </p>
            </div>
            <dl className="grid grid-cols-3 gap-2 border-t border-paper pt-4 text-center">
              {STATS.map((s) => (
                <div key={s.label} className="flex flex-col rounded-xl border border-[#EFE9DC] bg-paper-2 p-2.5">
                  <dt className="order-2 mt-0.5 font-mono text-[10px] font-bold uppercase text-ink-3">{s.label}</dt>
                  <dd className={`font-display text-lg font-black sm:text-xl ${s.color}`}>{s.value}</dd>
                </div>
              ))}
            </dl>
          </article>
        </RevealItem>

        <RevealItem className="flex flex-col gap-4 md:col-span-5">
          <article className="flex flex-1 flex-col justify-between rounded-3xl border-2 border-ink bg-paper-2 p-6 shadow-brutal">
            <div className="space-y-3">
              <h3 className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-coral-ink">
                <span aria-hidden="true">⚡</span> The philosophy
              </h3>
              <blockquote className="font-serif text-lg italic leading-snug text-ink sm:text-xl">
                &ldquo;I design products and I ship them. The best way to understand constraints is to build inside
                them.&rdquo;
              </blockquote>
              <p className="text-xs text-ink-3 sm:text-sm">
                Every interface is a hypothesis until a real user clicks, hesitates, or completes their goal.
              </p>
              <div className="pt-3">
                <h4 className="mb-2 font-mono text-[10px] font-bold uppercase tracking-wider text-ink-3">Right now</h4>
                <ul className="space-y-2 text-[13px] text-ink-2">
                  {NOW.map((item) => (
                    <li key={item.text} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: item.color }} aria-hidden="true" />
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-line pt-4 font-mono text-xs text-ink-3">
              <span>Founder · Forge Academy</span>
              <a
                href="#experience"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('experience');
                }}
                className="group flex items-center gap-1 font-bold text-ink underline-offset-4 hover:underline"
              >
                Career history
                <ArrowDown className="h-3 w-3 transition-transform group-hover:translate-y-0.5" />
              </a>
            </div>
          </article>

          <div className="flex items-center gap-3 rounded-2xl border-2 border-ink bg-white p-4 shadow-brutal-sm">
            <span
              aria-hidden="true"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cobalt/30 bg-cobalt/10 font-mono text-base font-bold text-cobalt-ink"
            >
              ∫dx
            </span>
            <div>
              <h3 className="font-display text-sm font-bold text-ink">Industrial Mathematics @ UNILAG</h3>
              <p className="font-mono text-[11px] text-ink-3">
                Algorithms, systems thinking &amp; logic applied to UI architecture.
              </p>
            </div>
          </div>
        </RevealItem>
      </Reveal>

      {/* Beyond the screen */}
      <div className="mb-20">
        <Reveal className="mb-8 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <RevealItem>
              <p className="mb-1 font-mono text-xs font-bold uppercase tracking-wider text-coral-ink">Beyond the screen</p>
            </RevealItem>
            <RevealItem>
              <h3 className="font-display text-2xl font-extrabold tracking-tight text-ink sm:text-4xl">
                Life off the keyboard
              </h3>
            </RevealItem>
            <RevealItem>
              <p className="mt-2 max-w-sm text-sm text-ink-3">
                The things that keep me curious, grounded and refreshed, and quietly shape how I design.
              </p>
            </RevealItem>
          </div>

          {/* Polaroids */}
          <div className="flex shrink-0 items-end justify-center gap-3 pr-2 sm:justify-end" aria-label="Photos from life off the keyboard">
            {photos.map((item, i) => {
              const size = sizeOf(item.photo!.src);
              return (
                <motion.figure
                  key={item.id}
                  initial={{ opacity: 0, y: 20, rotate: i === 0 ? -14 : 14 }}
                  whileInView={{ opacity: 1, y: 0, rotate: i === 0 ? -5 : 6 }}
                  viewport={{ once: true, amount: 0.5 }}
                  whileHover={{ rotate: 0, scale: 1.06, zIndex: 10 }}
                  transition={{ ...SPRING_SOFT, delay: 0.1 + i * 0.1 }}
                  className="relative w-32 rounded-md border border-black/10 bg-white p-2 pb-7 shadow-[0_14px_30px_-12px_rgba(40,30,20,0.4)] sm:w-36"
                >
                  <div className="aspect-[4/5] overflow-hidden rounded-sm bg-paper-3">
                    <SmartImage
                      src={item.photo!.src}
                      alt={item.photo!.alt}
                      width={size?.w}
                      height={size?.h}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <figcaption className="absolute inset-x-0 bottom-1.5 text-center font-serif text-[11px] italic text-ink-3">
                    {item.id === 'cooking' ? 'Sunday spaghetti' : 'Racing break'}
                  </figcaption>
                </motion.figure>
              );
            })}
          </div>
        </Reveal>

        <Reveal as="ul" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
          {BEYOND_WORK_ITEMS.map((item) => (
            <RevealItem as="li" key={item.id}>
              <article className="lift flex h-full flex-col justify-between rounded-2xl border-2 border-ink bg-white p-5 shadow-brutal-sm hover:shadow-[5px_6px_0_#141618]">
                <div className="space-y-2.5">
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 text-xl"
                    style={{ backgroundColor: item.bgTint }}
                  >
                    {item.emoji}
                  </span>
                  <div>
                    <h4 className="font-display text-base font-bold leading-tight text-ink">{item.title}</h4>
                    <p className="mt-0.5 font-mono text-[11px] font-semibold text-ink-3">{item.tagline}</p>
                  </div>
                  <p className="text-xs leading-relaxed text-ink-3">{item.description}</p>
                </div>
                <div className="mt-3 flex items-center gap-1.5 border-t border-paper pt-3 font-mono text-[10px] font-bold uppercase text-ink-3">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: item.color }} aria-hidden="true" />
                  Personal pursuit
                </div>
              </article>
            </RevealItem>
          ))}
        </Reveal>
      </div>

      {/* Photo book */}
      <Reveal className="text-center">
        <RevealItem>
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-ink px-3 py-1 font-mono text-xs font-bold text-white">
            <span aria-hidden="true">📖</span> My journey · interactive photo book
          </span>
        </RevealItem>
        <RevealItem>
          <h3 className="font-display text-2xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Flip through memorable moments
          </h3>
        </RevealItem>
        <RevealItem>
          <p className="mx-auto mt-2 max-w-lg text-sm text-ink-3">
            Milestones, stage pitches, cohort workshops and the stories along the way. Open the book, then use the
            arrows, your keyboard or a swipe to turn the pages.
          </p>
        </RevealItem>
      </Reveal>
      <InteractivePhotoBook />
    </section>
  );
};
