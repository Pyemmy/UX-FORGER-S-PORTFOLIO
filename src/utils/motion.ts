import type { Transition, Variants } from 'motion/react';

/**
 * Shared motion language for the whole site.
 * Everything animates transform/opacity only, and MotionConfig
 * (reducedMotion="user") turns transforms off for reduced-motion users.
 */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

export const SPRING_SOFT: Transition = { type: 'spring', stiffness: 260, damping: 28, mass: 0.9 };
export const SPRING_SNAPPY: Transition = { type: 'spring', stiffness: 460, damping: 34 };
export const SPRING_BOUNCY: Transition = { type: 'spring', stiffness: 380, damping: 17 };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.45, ease: EASE_OUT } },
};

export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  show: { opacity: 1, scale: 1, transition: SPRING_BOUNCY },
};

export const staggerContainer = (stagger = 0.07, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});

/** Default viewport settings for scroll reveals: trigger once, a bit before fully in view. */
export const REVEAL_VIEWPORT = { once: true, amount: 0.15, margin: '0px 0px -8% 0px' } as const;
