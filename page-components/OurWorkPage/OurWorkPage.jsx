'use client'

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import PageHero from '../../components/PageHero/PageHero';
import Footer from '../../components/Footer/Footer';
import './OurWorkPage.css';

const stats = [
  { value: '100+', label: 'Projects Completed' },
  { value: '50+',  label: 'Happy Clients' },
  { value: '10+',  label: 'Years Experience' },
  { value: '15+',  label: 'Countries Served' },
];

const CAT_META = {
  websites:   { label: 'Website Projects',      badge: '01', accent: '#6C63FF', icon: '💻' },
  apps:       { label: 'Mobile Apps',            badge: '02', accent: '#00D9FF', icon: '📱' },
  enterprise: { label: 'Dashboard · CRM · ERP',  badge: '03', accent: '#7C3AED', icon: '📊' },
  saas:       { label: 'SaaS Products',          badge: '04', accent: '#00E676', icon: '☁️' },
  ai:         { label: 'AI & ML Solutions',      badge: '05', accent: '#A855F7', icon: '🤖' },
  design:     { label: 'Brand & Design',         badge: '06', accent: '#F43F5E', icon: '🎨' },
};

const CAT_ORDER = ['websites', 'apps', 'enterprise', 'saas', 'ai', 'design'];

/* ─── Skeleton ─────────────────────────────────────────────── */
function SkeletonCard() {
  return (
    <div className="pw__card pw__card--skel">
      <div className="pw__card-img-wrap pw__skel-img" />
      <div className="pw__card-body">
        <div className="pw__skel-line" style={{ width: '40%', height: 14 }} />
        <div className="pw__skel-line" style={{ width: '75%', height: 20, marginTop: 8 }} />
        <div className="pw__skel-line" style={{ width: '90%', height: 14, marginTop: 8 }} />
        <div className="pw__skel-line" style={{ width: '60%', height: 14, marginTop: 4 }} />
      </div>
    </div>
  );
}

/* ─── Project Card ─────────────────────────────────────────── */
function ProjectCard({ project, index }) {
  const [imgError, setImgError] = useState(false);
  const catIcon = CAT_META[project.category]?.icon || '💻';

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
        {project.image && !imgError ? (
          <img
            src={project.image}
            alt={project.title}
            className="pw__card-img"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="pw__card-img-fallback">
            <span className="pw__card-img-icon">{catIcon}</span>
          </div>
        )}
        <div className="pw__card-overlay">
          <span className="pw__card-type" style={{ color: project.color }}>{project.type}</span>
          <p className="pw__card-overlay-desc">{project.desc}</p>
          <div className="pw__card-overlay-tags">
            {(project.tags || []).slice(0, 4).map(t => (
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
            {project.type || CAT_META[project.category]?.label}
          </span>
          <span className="pw__card-year">{project.year}</span>
        </div>
        <h3 className="pw__card-title">{project.title}</h3>
        <p className="pw__card-desc">{project.desc}</p>
        <div className="pw__card-tags">
          {(project.tags || []).slice(0, 3).map(t => (
            <span key={t} className="pw__card-tag-small">{t}</span>
          ))}
          {(project.tags || []).length > 3 && (
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

/* ─── Portfolio Section ────────────────────────────────────── */
function PortfolioSection({ cat, projects }) {
  const meta = CAT_META[cat] || { label: cat, badge: '—', accent: '#6C63FF', icon: '💻' };
  return (
    <section className="pw__section" id={cat}>
      <div className="container">
        <motion.div
          className="pw__section-head"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="pw__section-badge" style={{ color: meta.accent, borderColor: `${meta.accent}30` }}>
            <span className="pw__section-num">{meta.badge}</span>
            <span className="pw__section-divider" style={{ background: meta.accent }} />
            <span>{meta.label}</span>
          </div>
          <h2 className="pw__section-title">
            Our <span className="gradient-text">{meta.label}</span>
          </h2>
          <p className="pw__section-sub">
            {projects.length} project{projects.length !== 1 ? 's' : ''} delivered with precision, creativity and cutting-edge technology.
          </p>
        </motion.div>

        <div className="pw__grid">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Page ─────────────────────────────────────────────────── */
export default function OurWorkPage() {
  const [projects,  setProjects]  = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [activeNav, setActiveNav] = useState('');

  useEffect(() => {
    document.title = 'Our Work – Shivansh Tech Lab';
    fetch('/api/projects?status=active')
      .then(r => r.json())
      .then(d => { if (d.success) setProjects(d.data) })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  /* Group by category, keep CAT_ORDER */
  const sections = CAT_ORDER
    .map(cat => ({ cat, projects: projects.filter(p => p.category === cat) }))
    .filter(s => s.projects.length > 0);

  useEffect(() => {
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveNav(e.target.id) }),
      { threshold: 0.2, rootMargin: '-10% 0px -60% 0px' }
    );
    const els = sections.map(s => document.getElementById(s.cat)).filter(Boolean);
    els.forEach(el => observer.observe(el));
    return () => { observer.disconnect(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <main className="pw">
      <PageHero
        badge="OUR WORK"
        title="Projects That Define Excellence"
        titleHighlight="Define Excellence"
        subtitle="100+ world-class digital products delivered across industries — from e-commerce websites and mobile apps to enterprise dashboards, CRM, ERP and SaaS platforms."
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

      {/* Sticky quick-jump nav — only after data loads */}
      {sections.length > 0 && (
        <nav className="pw__nav">
          <div className="container">
            <div className="pw__nav-links">
              {sections.map(({ cat }) => {
                const meta = CAT_META[cat] || {};
                return (
                  <a
                    key={cat}
                    href={`#${cat}`}
                    className={`pw__nav-link ${activeNav === cat ? 'pw__nav-link--active' : ''}`}
                    style={{ '--pw-nav-accent': meta.accent }}
                  >
                    <span className="pw__nav-num">{meta.badge}</span>
                    {meta.label}
                  </a>
                );
              })}
            </div>
          </div>
        </nav>
      )}

      {/* Skeletons while loading */}
      {loading && (
        <section className="pw__section">
          <div className="container">
            <div className="pw__grid">
              {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          </div>
        </section>
      )}

      {/* Empty state */}
      {!loading && sections.length === 0 && (
        <section className="pw__section">
          <div className="container" style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: '1.1rem' }}>No projects yet. Check back soon!</p>
          </div>
        </section>
      )}

      {/* Portfolio sections from API */}
      {sections.map(({ cat, projects }) => (
        <PortfolioSection key={cat} cat={cat} projects={projects} />
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
