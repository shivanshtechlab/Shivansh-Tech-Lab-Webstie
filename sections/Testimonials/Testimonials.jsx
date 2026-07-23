'use client'

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import { testimonials } from '../../data/testimonials';
import './Testimonials.css';

function StarRating({ rating }) {
  return (
    <div className="testi-stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`testi-star ${i < rating ? 'testi-star--filled' : ''}`} viewBox="0 0 20 20">
          <path d="M10 1l2.39 5.26L18 7.27l-4 3.9.94 5.49L10 14.02l-4.94 2.64L6 11.17 2 7.27l5.61-.01L10 1z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);
  const dragStartX = useRef(null);
  const total = testimonials.length;

  const goTo = useCallback((index, dir) => {
    setDirection(dir ?? (index > active ? 1 : -1));
    setActive(((index % total) + total) % total);
  }, [active, total]);

  const prev = useCallback(() => goTo(active - 1, -1), [active, goTo]);
  const next = useCallback(() => goTo(active + 1, 1), [active, goTo]);

  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(() => next(), 4500);
    return () => clearInterval(timerRef.current);
  }, [isPaused, next]);

  // Drag-to-scroll
  const handleDragStart = (e) => {
    dragStartX.current = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    setIsPaused(true);
  };

  const handleDragEnd = (e) => {
    if (dragStartX.current === null) return;
    const endX = e.type === 'touchend' ? e.changedTouches[0].clientX : e.clientX;
    const diff = dragStartX.current - endX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    dragStartX.current = null;
    setIsPaused(false);
  };

  const cardVariants = {
    enter: (dir) => ({ x: dir > 0 ? 100 : -100, opacity: 0, scale: 0.9, rotateY: dir > 0 ? 15 : -15 }),
    center: { x: 0, opacity: 1, scale: 1, rotateY: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
    exit: (dir) => ({ x: dir > 0 ? -100 : 100, opacity: 0, scale: 0.9, rotateY: dir > 0 ? -15 : 15, transition: { duration: 0.45 } }),
  };

  const t = testimonials[active];

  return (
    <section className="testi-section">
      <div className="testi-bg">
        <div className="testi-bg__glow testi-bg__glow--1" />
        <div className="testi-bg__glow testi-bg__glow--2" />
        <div className="testi-bg__grid" />
      </div>

      <div className="container">
        <ScrollReveal>
          <SectionTitle
            badge="TESTIMONIALS"
            title="Words From Our Happy Clients"
            subtitle="Don't take our word for it â€” hear directly from the teams who've transformed their businesses with us."
          />
        </ScrollReveal>

        <div className="testi-carousel"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEnd}
        >
          {/* Side preview cards */}
          <div className="testi-side testi-side--prev">
            {testimonials[(active - 1 + total) % total] && (
              <div className="testi-peek">
                <p>"{testimonials[(active - 1 + total) % total].content.substring(0, 60)}..."</p>
              </div>
            )}
          </div>

          {/* Main card */}
          <div className="testi-card-wrap" style={{ perspective: '1200px' }}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={active}
                custom={direction}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="testi-card"
                style={{ '--accent-color': t.color }}
              >
                <div className="testi-card__glow" style={{ background: t.color }} />
                <div className="testi-card__quote-mark">"</div>
                <p className="testi-card__text">{t.content}</p>
                <div className="testi-card__footer">
                  <div className="testi-card__avatar" style={{ background: t.color }}>
                    {t.avatar}
                  </div>
                  <div className="testi-card__info">
                    <span className="testi-card__name">{t.name}</span>
                    <span className="testi-card__role">{t.role} Â· {t.company}</span>
                  </div>
                  <div className="testi-card__right">
                    <StarRating rating={t.rating} />
                    <span className="testi-card__project">{t.project}</span>
                  </div>
                </div>
                <div className="testi-card__accent-line" style={{ background: t.color }} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="testi-side testi-side--next">
            {testimonials[(active + 1) % total] && (
              <div className="testi-peek">
                <p>"{testimonials[(active + 1) % total].content.substring(0, 60)}..."</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="testi-nav">
          <button className="testi-nav__arrow" onClick={prev} aria-label="Previous">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div className="testi-dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`testi-dot ${i === active ? 'testi-dot--active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                style={i === active ? { background: t.color } : {}}
              />
            ))}
          </div>

          <button className="testi-nav__arrow" onClick={next} aria-label="Next">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Progress bar */}
        <div className="testi-progress">
          {!isPaused && (
            <motion.div
              key={active}
              className="testi-progress__bar"
              style={{ background: t.color }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 4.5, ease: 'linear' }}
            />
          )}
        </div>
      </div>
    </section>
  );
}
