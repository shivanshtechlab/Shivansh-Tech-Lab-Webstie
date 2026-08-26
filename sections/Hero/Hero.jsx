'use client'

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { STATS } from '../../constants/index';
import heroImg from '../../assets/hero.png';
import './Hero.css';

// ── Typing effect ─────────────────────────────────────────────────────────────
const TYPING_WORDS = [
  'Custom Software',
  'AI Solutions',
  'ERP Systems',
  'Mobile Apps',
  'SaaS Platforms',
];

function useTypingEffect(words, { typeSpeed = 80, deleteSpeed = 45, pauseMs = 1800 } = {}) {
  const [displayed, setDisplayed] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState('typing');

  useEffect(() => {
    const word = words[wordIndex];
    let timeout;

    if (phase === 'typing') {
      if (displayed.length < word.length) {
        timeout = setTimeout(
          () => setDisplayed(word.slice(0, displayed.length + 1)),
          typeSpeed
        );
      } else {
        timeout = setTimeout(() => setPhase('pausing'), pauseMs);
      }
    } else if (phase === 'pausing') {
      setPhase('deleting');
    } else if (phase === 'deleting') {
      if (displayed.length > 0) {
        timeout = setTimeout(
          () => setDisplayed(displayed.slice(0, -1)),
          deleteSpeed
        );
      } else {
        setWordIndex((i) => (i + 1) % words.length);
        setPhase('typing');
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, phase, wordIndex, words, typeSpeed, deleteSpeed, pauseMs]);

  return displayed;
}

// ── Animated count-up stat ────────────────────────────────────────────────────
function StatCard({ value, label, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const numStr = value.replace(/[^0-9]/g, '');
  const suffix = value.replace(/[0-9]/g, '');
  const targetNum = parseInt(numStr, 10);

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView || isNaN(targetNum)) return;
    let start = 0;
    const duration = 1600;
    const startTime = performance.now();

    function animate(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      start = Math.round(eased * targetNum);
      setCount(start);
      if (progress < 1) requestAnimationFrame(animate);
    }

    const raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [isInView, targetNum]);

  const displayValue = isNaN(targetNum) ? value : `${count}${suffix}`;

  return (
    <motion.div
      ref={ref}
      className="hero__stat"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      <span className="hero__stat-value">{displayValue}</span>
      <span className="hero__stat-label">{label}</span>
    </motion.div>
  );
}

// ── Headline word animation ───────────────────────────────────────────────────
const HEADLINE_LINES = [
  { text: 'We Build', gradient: false },
  { text: 'Digital Experiences', gradient: true },
  { text: 'That Define Tomorrow', gradient: false },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const lineVariants = {
  hidden: { opacity: 0, y: 40, skewY: 3 },
  visible: {
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
};

// ── Main component ─────────────────────────────────────────────────────────────
export default function Hero() {
  const typedWord = useTypingEffect(TYPING_WORDS);

  return (
    <section className="hero" id="hero">
      {/* Decorative background blobs */}
      <div className="hero__blob hero__blob--1" aria-hidden="true" />
      <div className="hero__blob hero__blob--2" aria-hidden="true" />
      <div className="hero__blob hero__blob--3" aria-hidden="true" />

      {/* Content grid */}
      <div className="hero__inner">
        <div className="hero__content">

          {/* Headline */}
          <motion.h1
            className="hero__headline"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {HEADLINE_LINES.map((line) =>
              line.gradient ? (
                <motion.span
                  key={line.text}
                  className="hero__headline-gradient"
                  variants={lineVariants}
                >
                  {line.text}
                </motion.span>
              ) : (
                <motion.span
                  key={line.text}
                  style={{ display: 'block' }}
                  variants={lineVariants}
                >
                  {line.text}
                </motion.span>
              )
            )}
          </motion.h1>

          {/* Typing subtitle */}
          <motion.div
            className="hero__subtitle-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <span className="hero__subtitle-prefix">We specialize in&nbsp;</span>
            <span className="hero__typing" aria-live="polite" aria-atomic="true">
              {typedWord}
            </span>
            <span className="hero__cursor" aria-hidden="true" />
          </motion.div>

          {/* Description */}
          <motion.p
            className="hero__desc"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
          >
            From concept to launch, we craft scalable, high-performance digital
            products that empower businesses to lead in a fast-moving world.
            Trusted by 50&nbsp;+ companies across 10&nbsp;+ countries.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <a href="#contact" className="hero__btn-primary">
              Start Your Project
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>

            <a href="#contact" className="hero__btn-ghost">
              Book Consultation
            </a>
          </motion.div>

          {/* Stats */}
          <div className="hero__stats" role="list" aria-label="Company statistics">
            {STATS.map((stat, i) => (
              <StatCard
                key={stat.label}
                value={stat.value}
                label={stat.label}
                delay={i * 0.1}
              />
            ))}
          </div>
        </div>

        {/* Right column — hero image */}
        <motion.div
          className="hero__image-wrap"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        >
          <div className="hero__img-glow" />
          <Image
            src={heroImg}
            alt=""
            className="hero__img"
            sizes="(max-width: 480px) 300px, (max-width: 640px) 340px, (max-width: 900px) 420px, 650px"
            priority
            draggable="false"
          />
        </motion.div>
      </div>

    </section>
  );
}
