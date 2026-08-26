'use client'

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import PageHero from '../../components/PageHero/PageHero';
import Footer from '../../components/Footer/Footer';
import './ServicesPage.css';

const stats = [
  { value: '16+', label: 'Services Offered' },
  { value: '100+', label: 'Projects Delivered' },
  { value: '50+', label: 'Happy Clients' },
  { value: '98%', label: 'Satisfaction Rate' },
];

const processSteps = [
  { step: '01', title: 'Discovery', desc: 'We deep-dive into your business goals, target audience, and technical requirements to understand what you truly need.' },
  { step: '02', title: 'Planning', desc: 'Architecture design, tech stack selection, sprint planning, timeline, and resource allocation — fully transparent.' },
  { step: '03', title: 'Design', desc: 'Wireframes, interactive prototypes, and pixel-perfect UI/UX that your users will love from the first click.' },
  { step: '04', title: 'Development', desc: 'Agile sprints with daily standups, live previews, and clean, well-documented code you can own forever.' },
  { step: '05', title: 'Testing', desc: 'Rigorous QA, automated test suites, performance benchmarks, security audits, and cross-device validation.' },
  { step: '06', title: 'Launch & Support', desc: 'Zero-downtime deployment, post-launch monitoring, performance tuning, and ongoing support whenever you need it.' },
];

function hex2rgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

/* ── Service Card ── */
function ServiceCard({ service, index, stData }) {
  const [expanded, setExpanded] = useState(false);
  const color    = stData?.color    || '#6C63FF';
  const icon     = stData?.icon     || '🔧';
  const gradient = `linear-gradient(135deg, ${color}, ${hex2rgba(color, 0.7)})`;
  const num      = String(service.sortOrder || index + 1).padStart(2, '0');

  return (
    <motion.article
      className="srv-card"
      style={{ '--srv-color': color, '--srv-gradient': gradient }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: (index % 2) * 0.1 }}
    >
      <div className="srv-card__glow" aria-hidden="true" />

      {/* Full-width image OR top-bar */}
      {service.image ? (
        <div className="srv-card__hero">
          <img src={service.image} alt={service.title} className="srv-card__hero-img" />
          <div className="srv-card__hero-overlay" aria-hidden="true" />
          <span className="srv-card__hero-num">{num}</span>
        </div>
      ) : (
        <div className="srv-card__top-bar" aria-hidden="true" />
      )}

      {/* Header */}
      <div className="srv-card__header">
        {!service.image && (
          <div className="srv-card__icon-wrap">
            <span className="srv-card__icon" role="img" aria-label={service.title}>{icon}</span>
          </div>
        )}
        <div className={`srv-card__meta ${service.image ? 'srv-card__meta--full' : ''}`}>
          {!service.image && <span className="srv-card__number">{num}</span>}
          <span className="srv-card__category">
            {icon && <span className="srv-card__cat-icon">{icon}</span>}
            {service.category}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="srv-card__body">
        <h3 className="srv-card__title">{service.title}</h3>
        <p className="srv-card__desc">{service.shortDesc}</p>

        {/* What's Included */}
        {service.included?.length > 0 && (
          <div className="srv-card__features-wrap">
            <h4 className="srv-card__sub-label">What's Included</h4>
            <ul className="srv-card__features">
              {service.included.map((f) => (
                <li key={f} className="srv-card__feature">
                  <span className="srv-card__check" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l2.8 2.8L10 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Technologies */}
        {service.technologies?.length > 0 && (
          <div className="srv-card__tech-wrap">
            <h4 className="srv-card__sub-label">Technologies</h4>
            <div className="srv-card__tech-chips">
              {service.technologies.map((tech) => (
                <span key={tech} className="srv-card__chip">{tech}</span>
              ))}
            </div>
          </div>
        )}

        {/* Use Cases + Deliverables — toggle */}
        {(service.useCases?.length > 0 || service.deliverables?.length > 0) && (
          <>
            <button
              className="srv-card__toggle"
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
            >
              <span>{expanded ? 'Hide Details' : 'View Details'}</span>
              <motion.span
                className="srv-card__toggle-icon"
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                aria-hidden="true"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.span>
            </button>

            <AnimatePresence>
              {expanded && (
                <motion.div
                  className="srv-card__usecases"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="srv-card__usecases-inner">
                    {service.useCases?.length > 0 && (
                      <>
                        <h4 className="srv-card__sub-label">Ideal For</h4>
                        <div className="srv-card__usecase-list">
                          {service.useCases.map((uc) => (
                            <span key={uc} className="srv-card__usecase">{uc}</span>
                          ))}
                        </div>
                      </>
                    )}
                    {service.deliverables?.length > 0 && (
                      <>
                        <h4 className="srv-card__sub-label" style={{ marginTop: '1rem' }}>Deliverables</h4>
                        <div className="srv-card__deliverables">
                          {service.deliverables.map((d) => (
                            <span key={d} className="srv-card__deliverable">
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                                <path d="M2 6l2.8 2.8L10 3" stroke="#00E676" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                              {d}
                            </span>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>

      {/* Footer CTA */}
      <div className="srv-card__footer">
        <Link href="/contact" className="srv-card__cta">
          {service.ctaText || 'Get a Free Quote'}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </motion.article>
  );
}

/* ── Skeleton card ── */
function SkeletonCard() {
  return (
    <div className="srv-card srv-card--skeleton">
      <div className="srv-skel-bar" />
      <div className="srv-skel-icon" />
      <div className="srv-skel-line srv-skel-line--wide" />
      <div className="srv-skel-line" />
      <div className="srv-skel-line srv-skel-line--short" />
    </div>
  );
}

/* ── Main Page ── */
export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [serviceTypes,   setServiceTypes]   = useState([]);
  const [services,       setServices]       = useState([]);
  const [loading,        setLoading]        = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const [stRes, svcRes] = await Promise.all([
        fetch('/api/service-types?status=active'),
        fetch('/api/services?status=active'),
      ]);
      const stData  = await stRes.json();
      const svcData = await svcRes.json();
      if (stData.success)  setServiceTypes(stData.data);
      if (svcData.success) setServices(svcData.data);
    } catch (err) {
      console.error('Failed to fetch services data:', err);
    } finally {
      setLoading(false);
    }
  }

  // Build map: { 'WEB DEVELOPMENT': { icon, color, name, ... } }
  const stMap = Object.fromEntries(
    serviceTypes.map(st => [st.name.toUpperCase(), st])
  );

  // Filter tabs: All + each service type
  const tabs = [
    { id: 'all', label: 'All Services', icon: '🗂️' },
    ...serviceTypes.map(st => ({ id: st.name.toUpperCase(), label: st.name, icon: st.icon })),
  ];

  const filtered = activeCategory === 'all'
    ? services
    : services.filter(s => s.category === activeCategory);

  return (
    <main className="sp">
      <PageHero
        badge="OUR SERVICES"
        title="Complete Digital Solutions"
        titleHighlight="Digital Solutions"
        subtitle="From concept to launch — we deliver every layer of your digital ecosystem with precision, speed, and mastery."
        ctaText="Start a Project"
        ctaLink="/contact"
        breadcrumb="Services"
      />

      {/* Stats Row */}
      <section className="sp__stats" aria-label="Company statistics">
        <div className="container">
          <div className="sp__stats-grid">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                className="sp__stat"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <span className="sp__stat-value gradient-text">{s.value}</span>
                <span className="sp__stat-label">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Services */}
      <section className="sp__services-section" aria-label="All services">
        <div className="container">
          <motion.div
            className="sp__section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="sp__section-title">
              All{' '}
              <span className="gradient-text">
                {loading ? '...' : `${services.length} Service${services.length !== 1 ? 's' : ''}`}
              </span>
            </h2>
            <p className="sp__section-sub">
              Every digital need covered under one expert roof — click any service card to see use cases and deliverables
            </p>
          </motion.div>

          {/* Category Filter Tabs */}
          {!loading && tabs.length > 1 && (
            <div className="sp__filter" role="tablist" aria-label="Filter services by category">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`sp__filter-btn${activeCategory === tab.id ? ' sp__filter-btn--active' : ''}`}
                  onClick={() => setActiveCategory(tab.id)}
                  role="tab"
                  aria-selected={activeCategory === tab.id}
                >
                  {tab.icon && <span className="sp__filter-icon">{tab.icon}</span>}
                  {tab.label}
                  {activeCategory === tab.id && (
                    <motion.span className="sp__filter-dot" layoutId="filterDot" />
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Grid */}
          {loading ? (
            <div className="sp__grid">
              {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                className="sp__grid"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {filtered.map((service, i) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    index={i}
                    stData={stMap[service.category]}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {!loading && filtered.length === 0 && (
            <p className="sp__no-results">No services found in this category.</p>
          )}
        </div>
      </section>

      {/* Process Section */}
      <section className="sp__process" aria-label="Our development process">
        <div className="container">
          <motion.div
            className="sp__section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="sp__section-title">Our <span className="gradient-text">Process</span></h2>
            <p className="sp__section-sub">A proven 6-step methodology that delivers results every time, on every project</p>
          </motion.div>
          <div className="sp__process-grid">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.step}
                className="sp__process-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
              >
                <span className="sp__process-num">{step.step}</span>
                <h3 className="sp__process-title">{step.title}</h3>
                <p className="sp__process-desc">{step.desc}</p>
                <div className="sp__process-line" aria-hidden="true" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Strip */}
      <section className="sp__why" aria-label="Why choose Shivansh Tech Lab">
        <div className="container">
          <div className="sp__why-grid">
            {[
              { icon: '⚡', title: 'Fast Delivery', desc: 'We deliver MVPs in 2–4 weeks and full products on schedule, every time.' },
              { icon: '🎯', title: 'Precision Engineering', desc: 'Clean code, thorough documentation, and scalable architecture by default.' },
              { icon: '🔒', title: 'Security First', desc: 'Every project includes security audits, HTTPS, and data protection by design.' },
              { icon: '🤝', title: 'Full Transparency', desc: 'Daily standups, live staging previews, and a dedicated project manager.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="sp__why-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <span className="sp__why-icon">{item.icon}</span>
                <h4 className="sp__why-title">{item.title}</h4>
                <p className="sp__why-desc">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="sp__cta-section" aria-label="Call to action">
        <div className="container">
          <motion.div
            className="sp__cta-box"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="sp__cta-glow" aria-hidden="true" />
            <h2 className="sp__cta-title">
              Ready to Build Something <span className="gradient-text">Amazing?</span>
            </h2>
            <p className="sp__cta-desc">
              Tell us about your project and get a free consultation and quote within 24 hours. No commitment required.
            </p>
            <div className="sp__cta-actions">
              <Link href="/contact" className="sp__cta-btn sp__cta-btn--primary">
                Start Your Project
              </Link>
              <Link href="/portfolio" className="sp__cta-btn sp__cta-btn--ghost">
                View Our Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
