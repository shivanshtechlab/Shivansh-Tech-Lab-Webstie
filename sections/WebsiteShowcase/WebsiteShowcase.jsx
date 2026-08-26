'use client'

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import './WebsiteShowcase.css';

const WEBSITES = [
  {
    id: 1,
    name: 'LuxStay Hotels',
    industry: 'Hospitality',
    color: '#C9A84C',
    accent: '#8B6914',
    style: 'luxury',
  },
  {
    id: 2,
    name: 'MediCare Portal',
    industry: 'Healthcare',
    color: '#00E676',
    accent: '#00B259',
    style: 'healthcare',
  },
  {
    id: 3,
    name: 'TechCore SaaS',
    industry: 'Technology',
    color: '#6C63FF',
    accent: '#4C44CC',
    style: 'tech',
  },
  {
    id: 4,
    name: 'EduLearn Platform',
    industry: 'Education',
    color: '#00D9FF',
    accent: '#0096CC',
    style: 'education',
  },
  {
    id: 5,
    name: 'ShopVerse Store',
    industry: 'Ecommerce',
    color: '#FF416C',
    accent: '#CC2050',
    style: 'ecom',
  },
  {
    id: 6,
    name: 'FinEdge Banking',
    industry: 'Finance',
    color: '#7C3AED',
    accent: '#5B1ABA',
    style: 'finance',
  },
  {
    id: 7,
    name: 'FoodHub Delivery',
    industry: 'Food & Beverage',
    color: '#FFB800',
    accent: '#CC8F00',
    style: 'food',
  },
];

function BrowserMockup({ site }) {
  return (
    <div className="ws-browser" style={{ '--site-color': site.color, '--site-accent': site.accent }}>
      {/* Browser chrome */}
      <div className="ws-browser__chrome">
        <div className="ws-browser__dots">
          <span /><span /><span />
        </div>
        <div className="ws-browser__url">
          <div className="ws-browser__url-lock">🔒</div>
          <span>www.{site.name.toLowerCase().replace(/\s+/g, '')}.com</span>
        </div>
        <div className="ws-browser__actions">
          <div className="ws-browser__action-dot" />
          <div className="ws-browser__action-dot" />
        </div>
      </div>

      {/* Website content */}
      <div className={`ws-site ws-site--${site.style}`}>
        {/* Nav */}
        <div className="ws-nav" style={{ borderBottom: `1px solid ${site.color}22` }}>
          <div className="ws-nav__brand" style={{ color: site.color }}>
            <div className="ws-nav__logo" style={{ background: site.color }} />
            <span>{site.name}</span>
          </div>
          <div className="ws-nav__links">
            {['Home', 'About', 'Services', 'Contact'].map(l => (
              <div key={l} className="ws-nav__link">{l}</div>
            ))}
          </div>
          <div className="ws-nav__cta" style={{ background: site.color }}>Get Started</div>
        </div>

        {/* Hero */}
        <div className="ws-hero" style={{ background: `linear-gradient(135deg, ${site.accent}22 0%, ${site.color}11 100%)` }}>
          <div className="ws-hero__content">
            <div className="ws-hero__badge" style={{ background: site.color + '22', color: site.color, border: `1px solid ${site.color}44` }}>{site.industry}</div>
            <div className="ws-hero__title" />
            <div className="ws-hero__title ws-hero__title--sm" />
            <div className="ws-hero__subtitle" />
            <div className="ws-hero__subtitle ws-hero__subtitle--short" />
            <div className="ws-hero__btns">
              <div className="ws-hero__btn" style={{ background: site.color }} />
              <div className="ws-hero__btn ws-hero__btn--outline" style={{ border: `1px solid ${site.color}`, color: site.color }} />
            </div>
          </div>
          <div className="ws-hero__visual">
            <div className="ws-hero__card" style={{ border: `1px solid ${site.color}44` }}>
              <div className="ws-hero__card-header" style={{ background: site.color + '22' }}>
                <div className="ws-hc-dot" style={{ background: site.color }} />
                <div className="ws-hc-line" />
              </div>
              <div className="ws-hero__card-body">
                <div className="ws-hc-bar" style={{ background: site.color, width: '80%' }} />
                <div className="ws-hc-bar" style={{ width: '60%' }} />
                <div className="ws-hc-bar" style={{ width: '70%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Features row */}
        <div className="ws-features">
          {[1, 2, 3].map(i => (
            <div key={i} className="ws-feature-card">
              <div className="ws-fc-icon" style={{ background: site.color + '20', border: `1px solid ${site.color}44` }}>
                <div className="ws-fc-icon-dot" style={{ background: site.color }} />
              </div>
              <div className="ws-fc-title" />
              <div className="ws-fc-line" />
              <div className="ws-fc-line ws-fc-line--sm" />
            </div>
          ))}
        </div>
      </div>
      <div className="ws-browser__label">
        <span className="ws-browser__site-name">{site.name}</span>
        <span className="ws-browser__industry">{site.industry}</span>
      </div>
    </div>
  );
}

// ── SVG icons ──────────────────────────────────────────────────────────────────
function IconPrev() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}
function IconNext() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}
function IconPause() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="4" width="4" height="16" rx="1" />
      <rect x="14" y="4" width="4" height="16" rx="1" />
    </svg>
  );
}
function IconPlay() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function WebsiteShowcase() {
  const trackRef = useRef(null);
  const posRef = useRef(0);
  const rafRef = useRef(null);
  const hoverPausedRef = useRef(false);
  const manualPausedRef = useRef(false);
  const autoPlayRef = useRef(true);
  const resumeTimerRef = useRef(null);
  const dragRef = useRef({ active: false, startX: 0, startPos: 0 });

  const [autoPlay, setAutoPlay] = useState(true);

  // Keep ref in sync with state (avoids stale closure in RAF)
  useEffect(() => {
    autoPlayRef.current = autoPlay;
  }, [autoPlay]);

  // Auto-scroll RAF loop
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const speed = 0.6;

    const animate = () => {
      if (autoPlayRef.current && !hoverPausedRef.current && !manualPausedRef.current) {
        const totalWidth = track.scrollWidth / 2;
        posRef.current -= speed;
        if (Math.abs(posRef.current) >= totalWidth) posRef.current = 0;
        track.style.transform = `translateX(${posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Manual prev / next
  const scrollManual = (dir) => {
    const track = trackRef.current;
    if (!track) return;

    // Pause auto for 3 s after manual click
    manualPausedRef.current = true;
    clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      manualPausedRef.current = false;
    }, 3000);

    const slideEl = track.querySelector('.ws-slide');
    const slideWidth = (slideEl ? slideEl.offsetWidth : 400) + 24; // card + gap
    const totalWidth = track.scrollWidth / 2;

    posRef.current += dir * slideWidth;

    // Wrap bounds
    if (posRef.current > 0) posRef.current = -(totalWidth - slideWidth);
    if (Math.abs(posRef.current) >= totalWidth) posRef.current = 0;

    track.style.transition = 'transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    track.style.transform = `translateX(${posRef.current}px)`;

    setTimeout(() => {
      if (trackRef.current) trackRef.current.style.transition = '';
    }, 460);
  };

  // Drag / touch scroll
  const onPointerDown = (e) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    dragRef.current = { active: true, startX: e.clientX, startPos: posRef.current };
    manualPausedRef.current = true;
    clearTimeout(resumeTimerRef.current);
    if (trackRef.current) trackRef.current.style.transition = 'none';
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!dragRef.current.active) return;
    const delta = e.clientX - dragRef.current.startX;
    posRef.current = dragRef.current.startPos + delta;
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${posRef.current}px)`;
    }
  };

  const onPointerUp = () => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;
    resumeTimerRef.current = setTimeout(() => {
      manualPausedRef.current = false;
    }, 2000);
  };

  const toggleAutoPlay = () => setAutoPlay(a => !a);

  const doubled = [...WEBSITES, ...WEBSITES];

  return (
    <section className="ws-section">
      <div className="ws-section__bg">
        <div className="ws-bg-orb ws-bg-orb--1" />
        <div className="ws-bg-orb ws-bg-orb--2" />
      </div>
      <div className="container">
        <ScrollReveal>
          <SectionTitle
            badge="WEBSITES"
            title="Websites That Make First Impressions Count"
            subtitle="Stunning, high-converting websites for every industry — built with performance and conversion in mind."
          />
        </ScrollReveal>
      </div>

      <ScrollReveal delay={0.1}>
        {/* Carousel */}
        <div
          className="ws-carousel-wrap"
          onMouseEnter={() => { hoverPausedRef.current = true; }}
          onMouseLeave={() => { hoverPausedRef.current = false; }}
        >
          <div className="ws-fade-left" />
          <div className="ws-fade-right" />

          {/* Prev / Next buttons */}
          <button className="ws-nav-btn ws-nav-btn--prev" onClick={() => scrollManual(1)} aria-label="Previous slide">
            <IconPrev />
          </button>
          <button className="ws-nav-btn ws-nav-btn--next" onClick={() => scrollManual(-1)} aria-label="Next slide">
            <IconNext />
          </button>

          {/* Draggable track */}
          <div
            className="ws-track"
            ref={trackRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
          >
            {doubled.map((site, i) => (
              <div key={`${site.id}-${i}`} className="ws-slide">
                <BrowserMockup site={site} />
              </div>
            ))}
          </div>
        </div>

        {/* Controls row */}
        <div className="ws-controls container">
          <div className="ws-scroll-hint">Drag or use arrows to scroll</div>
          <button
            className={`ws-autoplay-btn${autoPlay ? ' ws-autoplay-btn--active' : ''}`}
            onClick={toggleAutoPlay}
            aria-label={autoPlay ? 'Pause auto-scroll' : 'Resume auto-scroll'}
          >
            {autoPlay ? <IconPause /> : <IconPlay />}
            {autoPlay ? 'Pause' : 'Resume'}
          </button>
        </div>
      </ScrollReveal>

    </section>
  );
}
