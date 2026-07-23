'use client'

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import PageHero from '../../components/PageHero/PageHero';
import Footer from '../../components/Footer/Footer';
import { PORTFOLIO_SECTIONS } from '../../data/projects';
import './OurWorkPage.css';

const stats = [
  { value: '100+', label: 'Projects Completed' },
  { value: '50+',  label: 'Happy Clients' },
  { value: '10+',  label: 'Years Experience' },
  { value: '15+',  label: 'Countries Served' },
];

/* â”€â”€â”€ Project Card â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function ProjectCard({ project, index }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.article
      className="pw__card"
      style={{ '--pw-accent': project.color }}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.08 }}
    >
      <div className="pw__card-img-wrap">
        {imgError ? (
          <div className="pw__card-img-fallback">
            <span className="pw__card-img-icon">
              {project.category === 'apps' ? 'ðŸ“±' : project.category === 'enterprise' ? 'ðŸ“Š' : 'ðŸ’»'}
            </span>
          </div>
        ) : (
          <img
            src={project.image}
            alt={project.title}
            className="pw__card-img"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        )}
        <div className="pw__card-overlay">
          <span className="pw__card-type" style={{ color: project.color }}>{project.type}</span>
          <p className="pw__card-overlay-desc">{project.desc}</p>
          <div className="pw__card-overlay-tags">
            {project.tags.slice(0, 4).map(t => (
              <span key={t} className="pw__tag">{t}</span>
            ))}
          </div>
          <Link
            href={`/our-work/${project.slug}`}
            className="pw__card-cta"
            style={{ color: project.color }}
          >
            View Details
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      <div className="pw__card-body">
        <div className="pw__card-meta">
          <span className="pw__card-badge" style={{ background: `${project.color}18`, color: project.color }}>
            {project.type}
          </span>
          <span className="pw__card-year">{project.year}</span>
        </div>
        <h3 className="pw__card-title">{project.title}</h3>
        <p className="pw__card-desc">{project.desc}</p>
        <div className="pw__card-tags">
          {project.tags.slice(0, 3).map(t => (
            <span key={t} className="pw__card-tag-small">{t}</span>
          ))}
          {project.tags.length > 3 && (
            <span className="pw__card-tag-small pw__card-tag-more">+{project.tags.length - 3}</span>
          )}
        </div>
        <Link
          href={`/our-work/${project.slug}`}
          className="pw__view-btn"
          style={{ '--pw-btn-color': project.color }}
        >
          View Details
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </motion.article>
  );
}

/* â”€â”€â”€ Portfolio Section â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function PortfolioSection({ section }) {
  return (
    <section className="pw__section" id={section.id}>
      <div className="container">
        <motion.div
          className="pw__section-head"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="pw__section-badge" style={{ color: section.accent, borderColor: `${section.accent}30` }}>
            <span className="pw__section-num">{section.badge}</span>
            <span className="pw__section-divider" style={{ background: section.accent }} />
            <span>{section.label}</span>
          </div>
          <h2 className="pw__section-title">
            Our <span className="gradient-text">{section.label}</span>
          </h2>
          <p className="pw__section-sub">
            {section.projects.length} projects delivered with precision, creativity and cutting-edge technology.
          </p>
        </motion.div>

        <div className="pw__grid">
          {section.projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* â”€â”€â”€ Page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
export default function OurWorkPage() {
  const [activeNav, setActiveNav] = useState('websites');

  useEffect(() => {
    document.title = 'Our Work â€“ Shivansh Tech Lab';
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveNav(entry.target.id);
        });
      },
      { threshold: 0.25 }
    );
    PORTFOLIO_SECTIONS.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <main className="pw">
      <PageHero
        badge="OUR WORK"
        title="Projects That Define Excellence"
        titleHighlight="Define Excellence"
        subtitle="100+ world-class digital products delivered across industries â€” from e-commerce websites and mobile apps to enterprise dashboards, CRM, ERP and SaaS platforms."
        breadcrumb="Our Work"
      />

      {/* Stats */}
      <section className="pw__stats-section">
        <div className="container">
          <div className="pw__stats-grid">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                className="pw__stat"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <span className="pw__stat-value gradient-text">{s.value}</span>
                <span className="pw__stat-label">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky quick-jump nav */}
      <nav className="pw__nav">
        <div className="container">
          <div className="pw__nav-links">
            {PORTFOLIO_SECTIONS.map(s => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`pw__nav-link ${activeNav === s.id ? 'pw__nav-link--active' : ''}`}
                style={{ '--pw-nav-accent': s.accent }}
              >
                <span className="pw__nav-num">{s.badge}</span>
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Portfolio sections */}
      {PORTFOLIO_SECTIONS.map(section => (
        <PortfolioSection key={section.id} section={section} />
      ))}

      {/* CTA */}
      <section className="pw__cta-section">
        <div className="container">
          <motion.div
            className="pw__cta-box"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="pw__cta-glow" />
            <div className="pw__cta-badge">Let's Build Together</div>
            <h2 className="pw__cta-title">
              Ready to Build Something <span className="gradient-text">Extraordinary?</span>
            </h2>
            <p className="pw__cta-desc">
              Your project could be our next success story. We turn ideas into world-class digital products.
            </p>
            <div className="pw__cta-actions">
              <Link href="/contact" className="pw__cta-btn">Start Your Project</Link>
              <Link href="/services" className="pw__cta-btn-ghost">View Services</Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
