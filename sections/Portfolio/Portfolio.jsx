'use client'

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import { portfolioItems, portfolioCategories } from '../../data/portfolio';
import './Portfolio.css';

const MOCK_PATTERNS = {
  'Web Application': 'mock-banking',
  'SaaS Platform': 'mock-saas',
  'ERP System': 'mock-erp',
  'Ecommerce': 'mock-ecom',
  'Mobile App': 'mock-mobile',
  'AI Solution': 'mock-ai',
};

function PortfolioCard({ item, index }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    const y = -((e.clientX - rect.left) / rect.width - 0.5) * 20;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.div
      ref={cardRef}
      className="pf-card"
      style={{ '--card-color': item.color, transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
    >
      <div className="pf-card__image">
        <div className={`pf-mock pf-mock--${MOCK_PATTERNS[item.category] || 'mock-banking'}`}>
          <div className="pf-mock__bar">
            <span /><span /><span />
          </div>
          <div className="pf-mock__content">
            <div className="pf-mock__sidebar" />
            <div className="pf-mock__main">
              <div className="pf-mock__header-row">
                <div className="pf-mock__chip" style={{ background: item.color }} />
                <div className="pf-mock__chip pf-mock__chip--sm" />
              </div>
              <div className="pf-mock__chart" style={{ '--chart-color': item.color }}>
                <div className="pf-mock__bar-chart">
                  {[65, 80, 55, 90, 70, 85, 60].map((h, i) => (
                    <div key={i} className="pf-mock__bar-item" style={{ height: `${h}%`, background: item.color, opacity: 0.6 + i * 0.05 }} />
                  ))}
                </div>
              </div>
              <div className="pf-mock__rows">
                <div className="pf-mock__row" /><div className="pf-mock__row" /><div className="pf-mock__row pf-mock__row--sm" />
              </div>
            </div>
          </div>
        </div>
        <div className="pf-card__overlay">
          <div className="pf-card__overlay-inner">
            <h3 className="pf-card__overlay-title">{item.title}</h3>
            <p className="pf-card__overlay-desc">{item.description}</p>
            <div className="pf-card__tags">
              {item.tags.map(tag => (
                <span key={tag} className="pf-card__tag">{tag}</span>
              ))}
            </div>
            <motion.button
              className="pf-card__cta"
              style={{ '--btn-color': item.color }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              View Case Study <span>â†’</span>
            </motion.button>
          </div>
        </div>
      </div>
      <div className="pf-card__body">
        <span className="pf-card__badge" style={{ color: item.color, borderColor: item.color + '44', background: item.color + '15' }}>{item.category}</span>
        <h3 className="pf-card__title">{item.title}</h3>
        <div className="pf-card__stats">
          {Object.entries(item.stats).map(([key, val]) => (
            <div key={key} className="pf-card__stat">
              <span className="pf-card__stat-val" style={{ color: item.color }}>{val}</span>
              <span className="pf-card__stat-key">{key}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="pf-card__border-glow" style={{ '--glow-color': item.color }} />
    </motion.div>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState('All');

  const filtered = active === 'All' ? portfolioItems : portfolioItems.filter(p => p.category === active);

  return (
    <section className="portfolio-section" id="portfolio">
      <div className="portfolio-section__bg">
        <div className="portfolio-section__orb portfolio-section__orb--1" />
        <div className="portfolio-section__orb portfolio-section__orb--2" />
        <div className="portfolio-section__grid-lines" />
      </div>
      <div className="container">
        <ScrollReveal>
          <SectionTitle
            badge="OUR WORK"
            title="Projects That Define Excellence"
            subtitle="From startup MVPs to enterprise platforms â€” each project showcases our commitment to performance, design, and measurable results."
          />
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="pf-filters">
            {portfolioCategories.map(cat => (
              <button
                key={cat}
                className={`pf-filter-btn${active === cat ? ' pf-filter-btn--active' : ''}`}
                onClick={() => setActive(cat)}
              >
                {cat}
                {active === cat && (
                  <motion.span className="pf-filter-btn__pill" layoutId="pf-pill" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
                )}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <AnimatePresence mode="popLayout">
          <motion.div className="pf-grid" layout>
            {filtered.map((item, i) => (
              <PortfolioCard key={item.id} item={item} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        <ScrollReveal delay={0.2}>
          <div className="pf-cta">
            <motion.button
              className="pf-cta__btn"
              whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(108,99,255,0.5)' }}
              whileTap={{ scale: 0.97 }}
            >
              <span>View All Projects</span>
              <span className="pf-cta__arrow">â†’</span>
            </motion.button>
            <p className="pf-cta__note">120+ projects delivered across 30+ countries</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
