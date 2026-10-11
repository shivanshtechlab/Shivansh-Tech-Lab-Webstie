'use client'

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import { testimonials } from '../../data/testimonials';
import { seededRandom, round } from '../../utils/helpers';
import './WhyClientsLoveUs.css';

const stats = [
  { value: 98, suffix: '%', label: 'Client Retention Rate', color: '#6C63FF' },
  { value: 4.9, suffix: '/5', label: 'Average Star Rating', color: '#00D9FF', decimal: true },
  { value: 100, suffix: '+', label: 'Projects Delivered', color: '#7C3AED' },
];

function AnimatedNumber({ value, suffix, decimal, color, inView }) {
  const [display, setDisplay] = useState(0);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!inView) return;
    const start = 0;
    const end = value;
    const duration = 2000;
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = start + (end - start) * ease;
      setDisplay(decimal ? parseFloat(current.toFixed(1)) : Math.round(current));
      if (progress < 1) frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [inView, value, decimal]);

  return (
    <span className="wclu-stat__value" style={{ color }}>
      {decimal ? display.toFixed(1) : display}{suffix}
    </span>
  );
}

function StarRow({ count = 5, color = '#FFB800' }) {
  return (
    <div className="wclu-stars">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="wclu-star" viewBox="0 0 20 20" fill={color}>
          <path d="M10 1l2.39 5.26L18 7.27l-4 3.9.94 5.49L10 14.02l-4.94 2.64L6 11.17 2 7.27l5.61-.01L10 1z" />
        </svg>
      ))}
    </div>
  );
}

const quotes = testimonials.slice(0, 3);

// Seeded so SSR and client hydration render identical stars.
const rand = seededRandom(30);
const STAR_PARTICLES = Array.from({ length: 30 }, () => ({
  left: `${round(rand() * 100)}%`,
  top: `${round(rand() * 100)}%`,
  '--delay': `${round(rand() * 4)}s`,
  '--size': `${round(1 + rand() * 2)}px`,
}));

export default function WhyClientsLoveUs() {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-80px' });

  return (
    <section className="wclu-section">
      <div className="wclu-aurora">
        <div className="wclu-aurora__layer wclu-aurora__layer--1" />
        <div className="wclu-aurora__layer wclu-aurora__layer--2" />
        <div className="wclu-aurora__layer wclu-aurora__layer--3" />
      </div>
      <div className="wclu-stars-bg">
        {STAR_PARTICLES.map((style, i) => (
          <div key={i} className="wclu-star-particle" style={style} />
        ))}
      </div>

      <div className="container">
        <ScrollReveal>
          <SectionTitle
            badge="CLIENT SUCCESS"
            title="Why Our Clients Never Leave"
            subtitle="We don't just build software — we build long-term partnerships. Our results speak louder than promises."
          />
        </ScrollReveal>

        {/* Stats */}
        <div className="wclu-stats" ref={statsRef}>
          {stats.map((stat, i) => (
            <ScrollReveal key={i} variant="scaleUp" delay={i * 0.15}>
              <div className="wclu-stat">
                <div className="wclu-stat__glow" style={{ background: stat.color }} />
                <AnimatedNumber {...stat} inView={statsInView} />
                <span className="wclu-stat__label">{stat.label}</span>
                <StarRow color={stat.color} />
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Floating Review Stars */}
        <div className="wclu-review-banner">
          <div className="wclu-review-banner__inner">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="wclu-review-banner__item">
                <StarRow />
                <span>5.0 stars</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quote Cards */}
        <div className="wclu-quotes">
          {quotes.map((q, i) => (
            <ScrollReveal key={q.id} variant="fadeUp" delay={i * 0.12}>
              <div className="wclu-quote-card">
                <div className="wclu-quote-card__glow" style={{ background: q.color }} />
                <div className="wclu-quote-card__top">
                  <div className="wclu-quote-card__avatar" style={{ background: q.color }}>
                    {q.avatar}
                  </div>
                  <div className="wclu-quote-card__meta">
                    <span className="wclu-quote-card__name">{q.name}</span>
                    <span className="wclu-quote-card__role">{q.role}, {q.company}</span>
                  </div>
                  <div className="wclu-quote-card__project">{q.project}</div>
                </div>
                <StarRow />
                <blockquote className="wclu-quote-card__text">
                  "{q.content}"
                </blockquote>
                <div className="wclu-quote-card__border" style={{ borderColor: q.color }} />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
