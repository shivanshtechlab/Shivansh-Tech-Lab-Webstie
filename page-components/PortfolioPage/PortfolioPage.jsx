'use client'

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import PageHero from '../../components/PageHero/PageHero';
import Footer from '../../components/Footer/Footer';
import { portfolioItems, portfolioCategories } from '../../data/portfolio';
import { testimonials } from '../../data/testimonials';
import './PortfolioPage.css';

const portfolioStats = [
  { value: '100+', label: 'Projects Completed' },
  { value: '50+', label: 'Happy Clients' },
  { value: '10+', label: 'Years Experience' },
  { value: '15+', label: 'Countries Served' },
];

function ProjectCard({ item, index }) {
  return (
    <motion.div
      className="pp__card"
      style={{ '--pp-color': item.color }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      layout
    >
      <div className="pp__card-mockup" aria-hidden="true">
        <div className="pp__mockup-bar">
          <span className="pp__mockup-dot" />
          <span className="pp__mockup-dot" />
          <span className="pp__mockup-dot" />
          <div className="pp__mockup-url">{item.title.toLowerCase().replace(/\s+/g, '-').slice(0, 20)}.com</div>
        </div>
        <div className="pp__mockup-screen">
          <div className="pp__mockup-bg" style={{ background: `linear-gradient(135deg, ${item.color}22, ${item.color}08)` }}>
            <div className="pp__mockup-icon">{item.category === 'AI Solution' ? '🤖' : item.category === 'Mobile App' ? '📱' : '💻'}</div>
            <div className="pp__mockup-lines">
              <div className="pp__mockup-line" style={{ width: '70%' }} />
              <div className="pp__mockup-line" style={{ width: '50%' }} />
              <div className="pp__mockup-line" style={{ width: '60%' }} />
            </div>
          </div>
        </div>
      </div>

      <div className="pp__card-body">
        <span className="pp__card-category" style={{ color: item.color }}>{item.category}</span>
        <h3 className="pp__card-title">{item.title}</h3>
        <p className="pp__card-desc">{item.description}</p>

        <div className="pp__card-tags">
          {item.tags.map((tag) => (
            <span key={tag} className="pp__card-tag">{tag}</span>
          ))}
        </div>

        <div className="pp__card-stats">
          {Object.entries(item.stats).map(([key, val]) => (
            <div key={key} className="pp__card-stat">
              <span className="pp__card-stat-val" style={{ color: item.color }}>{val}</span>
              <span className="pp__card-stat-key">{key}</span>
            </div>
          ))}
        </div>

        <div className="pp__card-footer">
          <span className="pp__card-year">{item.year}</span>
          <Link href="/contact" className="pp__card-link" style={{ color: item.color }}>
            View Details
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function TestimonialCard({ t }) {
  return (
    <motion.div
      className="pp__testimonial"
      style={{ '--pp-color': t.color }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="pp__testimonial-stars" aria-label={`${t.rating} stars`}>
        {Array.from({ length: t.rating }).map((_, i) => (
          <span key={i} className="pp__star">★</span>
        ))}
      </div>
      <p className="pp__testimonial-content">"{t.content}"</p>
      <div className="pp__testimonial-author">
        <div className="pp__testimonial-avatar" style={{ background: `linear-gradient(135deg, ${t.color}, rgba(0,217,255,0.6))` }}>
          {t.avatar}
        </div>
        <div className="pp__testimonial-info">
          <span className="pp__testimonial-name">{t.name}</span>
          <span className="pp__testimonial-role">{t.role}, {t.company}</span>
        </div>
      </div>
      <span className="pp__testimonial-project">{t.project}</span>
    </motion.div>
  );
}

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    document.title = 'Portfolio – Shivansh Tech Lab';
  }, []);

  const filtered = activeCategory === 'All'
    ? portfolioItems
    : portfolioItems.filter((p) => p.category === activeCategory);

  return (
    <main className="pp">
      <PageHero
        badge="OUR PORTFOLIO"
        title="Our Work Speaks for Itself"
        titleHighlight="Speaks for Itself"
        subtitle="Over 100 world-class digital products delivered. Here are some of our most impactful projects."
        breadcrumb="Portfolio"
      />

      {/* Stats */}
      <section className="pp__stats">
        <div className="container">
          <div className="pp__stats-grid">
            {portfolioStats.map((s, i) => (
              <motion.div
                key={s.label}
                className="pp__stat"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <span className="pp__stat-value gradient-text">{s.value}</span>
                <span className="pp__stat-label">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="pp__projects">
        <div className="container">
          <motion.div
            className="pp__section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="pp__section-title">Featured <span className="gradient-text">Projects</span></h2>
            <p className="pp__section-sub">Filter by category to explore our work</p>
          </motion.div>

          {/* Filter Tabs */}
          <div className="pp__filters">
            {portfolioCategories.map((cat) => (
              <button
                key={cat}
                className={`pp__filter-btn ${activeCategory === cat ? 'pp__filter-btn--active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <motion.div className="pp__grid" layout>
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <ProjectCard key={item.id} item={item} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="pp__testimonials">
        <div className="container">
          <motion.div
            className="pp__section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="pp__section-title">Client <span className="gradient-text">Stories</span></h2>
            <p className="pp__section-sub">What our clients say about working with us</p>
          </motion.div>
          <div className="pp__testimonials-grid">
            {testimonials.slice(0, 3).map((t) => (
              <TestimonialCard key={t.id} t={t} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pp__cta-section">
        <div className="container">
          <motion.div
            className="pp__cta-box"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="pp__cta-glow" aria-hidden="true" />
            <h2 className="pp__cta-title">Ready to Join Our <span className="gradient-text">Success Stories?</span></h2>
            <p className="pp__cta-desc">Let's create something extraordinary together. Your project could be next.</p>
            <Link href="/contact" className="pp__cta-btn">Start Your Project</Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
