'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Footer from '../../components/Footer/Footer';
import './ProjectDetailPage.css';

const CAT_META = {
  websites:   { label: 'Website Projects'     },
  apps:       { label: 'Mobile Apps'          },
  enterprise: { label: 'Dashboard · CRM · ERP'},
  saas:       { label: 'SaaS Products'        },
  ai:         { label: 'AI & ML Solutions'    },
  design:     { label: 'Brand & Design'       },
};

/* ─── Icon helper ──────────────────────────────────────────── */
const BackArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);
const ExternalLink = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

/* ─── Related card ─────────────────────────────────────────── */
function RelatedCard({ project }) {
  const [imgError, setImgError] = useState(false);
  return (
    <motion.div
      className="pd__related-card"
      style={{ '--pd-accent': project.color }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="pd__related-img-wrap">
        {imgError ? (
          <div className="pd__related-img-fallback">💻</div>
        ) : (
          <img
            src={project.image}
            alt={project.title}
            className="pd__related-img"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        )}
      </div>
      <div className="pd__related-body">
        <span className="pd__related-type" style={{ color: project.color }}>{project.type}</span>
        <h4 className="pd__related-title">{project.title}</h4>
        <p className="pd__related-desc">{project.desc}</p>
        <Link href={`/our-work/${project.slug}`} className="pd__related-link" style={{ color: project.color }}>
          View Details
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
}

/* ─── Main Page ────────────────────────────────────────────── */
export default function ProjectDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [project, setProject] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imgErrors, setImgErrors] = useState({});

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetch(`/api/projects/${slug}`)
      .then(r => r.json())
      .then(async d => {
        if (!d.success) { router.replace('/our-work'); return; }
        const p = d.data;
        setProject(p);
        document.title = `${p.title} – Shivansh Tech Lab`;
        window.scrollTo(0, 0);
        /* fetch related: same category, exclude current */
        const relRes = await fetch(`/api/projects?status=active&category=${p.category}`);
        const relData = await relRes.json();
        if (relData.success) {
          setRelated(relData.data.filter(r => r.id !== p.id).slice(0, 3));
        }
      })
      .catch(() => router.replace('/our-work'))
      .finally(() => setLoading(false));
  }, [slug, router]);

  const handleImgError = (key) => setImgErrors(prev => ({ ...prev, [key]: true }));

  if (loading) return (
    <main className="pd">
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B' }}>
        Loading…
      </div>
    </main>
  );

  if (!project) return null;

  const section = CAT_META[project.category];

  return (
    <main className="pd">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="pd__hero">
        {!imgErrors.hero ? (
          <img
            src={project.image}
            alt={project.title}
            className="pd__hero-bg"
            onError={() => handleImgError('hero')}
          />
        ) : (
          <div className="pd__hero-bg pd__hero-bg--fallback" style={{ background: `linear-gradient(135deg, ${project.color}22, #0a0b16)` }} />
        )}
        <div className="pd__hero-overlay" style={{ '--pd-accent': project.color }} />

        <div className="pd__hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/our-work" className="pd__back-link">
              <BackArrow />
              Back to Our Work
            </Link>
            <div className="pd__hero-badges">
              <span className="pd__hero-type" style={{ background: `${project.color}22`, color: project.color, borderColor: `${project.color}40` }}>
                {project.type}
              </span>
              {section && (
                <span className="pd__hero-category">{section.label}</span>
              )}

            </div>
            <h1 className="pd__hero-title">{project.title}</h1>
            <p className="pd__hero-desc">{project.desc}</p>

            {/* Live Demo button */}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pd__live-demo-btn"
                style={{ '--pd-accent': project.color, borderColor: `${project.color}60` }}
              >
                <span className="pd__live-demo-dot" style={{ background: project.color }} />
                Live Demo
                <ExternalLink />
              </a>
            )}

            <div className="pd__hero-meta">
              <div className="pd__hero-meta-item">
                <span className="pd__hero-meta-label">Client</span>
                <span className="pd__hero-meta-val">{project.client}</span>
              </div>
              <div className="pd__hero-meta-divider" />
              <div className="pd__hero-meta-item">
                <span className="pd__hero-meta-label">Industry</span>
                <span className="pd__hero-meta-val">{project.industry}</span>
              </div>
              <div className="pd__hero-meta-divider" />
              <div className="pd__hero-meta-item">
                <span className="pd__hero-meta-label">Duration</span>
                <span className="pd__hero-meta-val">{project.duration}</span>
              </div>
              <div className="pd__hero-meta-divider" />
              <div className="pd__hero-meta-item">
                <span className="pd__hero-meta-label">Year</span>
                <span className="pd__hero-meta-val">{project.year}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Results strip ────────────────────────────────────── */}
      {(project.results || []).length > 0 && (
      <section className="pd__results-strip">
        <div className="container">
          <div className="pd__results-grid">
            {(project.results || []).map((r, i) => (
              <motion.div
                key={r.label}
                className="pd__result"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <span className="pd__result-value" style={{ color: project.color }}>{r.value}</span>
                <span className="pd__result-label">{r.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      )}

      <div className="container pd__body">

        {/* ── Overview ─────────────────────────────────────────── */}
        <div className="pd__two-col">
          <motion.div
            className="pd__block"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="pd__block-label" style={{ color: project.color }}>The Challenge</span>
            <h2 className="pd__block-title">What Problem We Solved</h2>
            <p className="pd__block-text">{project.challenge}</p>
          </motion.div>
          <motion.div
            className="pd__block"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="pd__block-label" style={{ color: project.color }}>Our Solution</span>
            <h2 className="pd__block-title">How We Built It</h2>
            <p className="pd__block-text">{project.solution}</p>
          </motion.div>
        </div>

        {/* ── Full description ─────────────────────────────────── */}
        <motion.div
          className="pd__overview"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="pd__block-label" style={{ color: project.color }}>Project Overview</span>
          <p className="pd__overview-text">{project.fullDesc}</p>
        </motion.div>

        {/* ── Tech stack ───────────────────────────────────────── */}
        <motion.div
          className="pd__tech-wrap"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="pd__block-label" style={{ color: project.color }}>Tech Stack</span>
          <div className="pd__tech-pills">
            {(project.tags || []).map(tag => (
              <span key={tag} className="pd__tech-pill" style={{ borderColor: `${project.color}30`, color: project.color }}>
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

      </div>

      {/* ── Key Features ─────────────────────────────────────── */}
      {(project.features || []).length > 0 && <section className="pd__features-section">
        <div className="container">
          <motion.div
            className="pd__section-head"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="pd__block-label" style={{ color: project.color }}>What We Built</span>
            <h2 className="pd__section-title">Key Features</h2>
            <p className="pd__section-sub">Every feature was designed to solve a real problem and deliver measurable value.</p>
          </motion.div>
          <div className="pd__features-grid">
            {(project.features || []).map((f, i) => (
              <motion.div
                key={f.title}
                className="pd__feature"
                style={{ '--pd-accent': project.color }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <div className="pd__feature-icon" style={{ background: `${project.color}15`, color: project.color }}>
                  {f.icon}
                </div>
                <div>
                  <h3 className="pd__feature-title">{f.title}</h3>
                  <p className="pd__feature-desc">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>}

      {/* ── Gallery ──────────────────────────────────────────── */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="pd__gallery-section">
          <div className="container">
            <motion.div
              className="pd__section-head"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="pd__block-label" style={{ color: project.color }}>Project Gallery</span>
              <h2 className="pd__section-title">More Screens</h2>
            </motion.div>
            <div className="pd__gallery-grid">
              {project.gallery.map((src, i) => (
                <motion.div
                  key={i}
                  className="pd__gallery-item"
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  {!imgErrors[`gal${i}`] ? (
                    <img
                      src={src}
                      alt={`${project.title} screenshot ${i + 1}`}
                      className="pd__gallery-img"
                      loading="lazy"
                      onError={() => handleImgError(`gal${i}`)}
                    />
                  ) : (
                    <div className="pd__gallery-fallback" style={{ background: `${project.color}10` }}>
                      <span>📷</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Related Projects ─────────────────────────────────── */}
      {related.length > 0 && (
        <section className="pd__related-section">
          <div className="container">
            <motion.div
              className="pd__section-head"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="pd__block-label" style={{ color: project.color }}>More Work</span>
              <h2 className="pd__section-title">Related Projects</h2>
            </motion.div>
            <div className="pd__related-grid">
              {related.map(p => (
                <RelatedCard key={p.id} project={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="pd__cta-section">
        <div className="container">
          <motion.div
            className="pd__cta-box"
            style={{ '--pd-accent': project.color }}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="pd__cta-glow" style={{ background: `radial-gradient(ellipse, ${project.color}20 0%, transparent 70%)` }} />
            <h2 className="pd__cta-title">
              Want a Similar <span className="gradient-text">Project?</span>
            </h2>
            <p className="pd__cta-desc">
              Let's discuss your idea and build something even better. Our team is ready to start.
            </p>
            <div className="pd__cta-actions">
              <Link href="/contact" className="pd__cta-btn" style={{ background: `linear-gradient(135deg, ${project.color}, #7C3AED)` }}>
                Start Your Project
              </Link>
              <Link href="/our-work" className="pd__cta-btn-ghost">
                View More Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
