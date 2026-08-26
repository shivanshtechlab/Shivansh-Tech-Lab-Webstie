'use client'

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './ScrollReveal.css';

const VARIANTS = {
  fadeUp: {
    hidden: { opacity: 0, y: 48 },
    visible: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  stagger: {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0 },
  },
};

const STAGGER_CONTAINER = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0,
    },
  },
};

/**
 * ScrollReveal — framer-motion scroll-triggered wrapper
 *
 * Accepts either `animation` or `variant` prop (aliases).
 * Values: 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'scale' | 'stagger'
 */
export default function ScrollReveal({
  children,
  animation,
  variant,
  delay = 0,
  duration = 0.65,
  threshold = 0.15,
  once = true,
  className,
  style,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });

  // Support both `animation` and `variant` prop names
  const animKey = animation || variant || 'fadeUp';
  const isStagger = animKey === 'stagger';
  const selectedVariant = VARIANTS[animKey] || VARIANTS.fadeUp;

  const transition = {
    duration,
    delay,
    ease: [0.22, 1, 0.36, 1],
  };

  if (isStagger) {
    return (
      <motion.div
        ref={ref}
        className={className}
        style={style}
        variants={STAGGER_CONTAINER}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {Array.isArray(children)
          ? children.map((child, i) => (
              <motion.div
                key={i}
                variants={selectedVariant}
                transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
              >
                {child}
              </motion.div>
            ))
          : (
            <motion.div
              variants={selectedVariant}
              transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
            >
              {children}
            </motion.div>
          )}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ display: 'contents', ...style }}
      variants={selectedVariant}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
