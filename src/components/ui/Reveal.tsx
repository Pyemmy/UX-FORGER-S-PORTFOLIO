import React from 'react';
import { motion } from 'motion/react';
import { fadeUp, REVEAL_VIEWPORT, staggerContainer } from '../../utils/motion';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Delay between direct <RevealItem> children. */
  stagger?: number;
  delay?: number;
  as?: 'div' | 'section' | 'ul' | 'ol';
  id?: string;
}

/** Scroll-triggered container: fades its <RevealItem> children up one after another, once. */
export const Reveal: React.FC<RevealProps> = ({ children, className, stagger = 0.07, delay = 0, as = 'div', id }) => {
  const Component = motion[as];
  return (
    <Component
      id={id}
      className={className}
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={REVEAL_VIEWPORT}
    >
      {children}
    </Component>
  );
};

interface RevealItemProps {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'li' | 'article';
}

export const RevealItem: React.FC<RevealItemProps> = ({ children, className, as = 'div' }) => {
  const Component = motion[as];
  return (
    <Component className={className} variants={fadeUp}>
      {children}
    </Component>
  );
};
