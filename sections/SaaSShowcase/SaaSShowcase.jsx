'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import './SaaSShowcase.css';

const SAAS_EXAMPLES = [
  {
    id: 1,
    name: 'ProjectFlow',
    tagline: 'Team Collaboration & Project Management',
    color: '#6C63FF',
    type: 'B2B SaaS',
  },
  {
    id: 2,
    name: 'DataSense AI',
    tagline: 'Business Intelligence & Analytics Platform',
    color: '#00D9FF',
    type: 'Analytics SaaS',
  },
  {
    id: 3,
    name: 'PayOrbit',
    tagline: 'Global Payment & Subscription Management',
    color: '#00E676',
    type: 'Fintech SaaS',
  },
];

const FEATURES = [
  {
    icon: 'âš¡',
    title: 'Infinite Scalability',
    desc: 'Auto-scaling architecture handles millions of concurrent users with zero downtime.',
    color: '#6C63FF',
  },
  {
    icon: 'ðŸ¢',
    title: 'Multi-Tenancy',
    desc: 'Complete data isolation per tenant with custom branding and domain support.',
    color: '#00D9FF',
  },
  {
    icon: 'ðŸ’³',
    title: 'Smart Billing',
    desc: 'Flexible subscription plans, usage-based pricing, and automated invoicing.',
    color: '#00E676',
  },
  {
    icon: 'ðŸ“Š',
    title: 'Deep Analytics',
    desc: 'Real-time usage analytics, churn prediction, and revenue dashboards.',
    color: '#7C3AED',
  },
  {
    icon: 'ðŸ”’',
    title: 'Enterprise Security',
    desc: 'SOC2 compliant, SSO, 2FA, audit logs, and role-based access control.',
    color: '#FFB800',
  },
  {
    icon: 'ðŸŒ',
    title: 'Global CDN',
    desc: '200+ edge locations ensuring sub-50ms response times worldwide.',
    color: '#FF416C',
  },
];

function SaaSMockup({ saas }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={saas.id}
        className="saas-mockup"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.3 }}
        style={{ '--saas-color': saas.color }}
      >
        <div className="saas-mockup__top-bar">
          <div className="saas-mockup__dots"><span /><span /><span /></div>
          <div className="saas-mockup__url">app.{saas.name.toLowerCase()}.io</div>
          <div className="saas-mockup__user">
            <div className="saas-mockup__avatar" style={{ background: saas.color }} />
          </div>
        </div>
        <div className="saas-mockup__body">
          <div className="saas-mockup__sidenav">
            <div className="saas-sidenav__brand" style={{ color: saas.color }}>
              <div className="saas-sidenav__dot" style={{ background: saas.color }} />
              {saas.name}
            </div>
            {['Dashboard', 'Projects', 'Team', 'Analytics', 'Billing', 'Settings'].map((item, i) => (
              <div key={item} className={`saas-sidenav__item${i === 0 ? ' saas-sidenav__item--active' : ''}`}
                style={i === 0 ? { color: saas.color, background: saas.color + '15', borderLeft: `2px solid ${saas.color}` } : {}}>
                <div className="saas-sidenav__icon" />
                {item}
              </div>
            ))}
            <div className="saas-sidenav__workspace">
              <div className="saas-sidenav__ws-label">Workspace</div>
              <div className="saas-sidenav__ws-name">Acme Corp â–¾</div>
            </div>
          </div>
          <div className="saas-mockup__content">
            <div className="saas-content__header">
              <div className="saas-content__breadcrumb">Dashboard</div>
              <div className="saas-content__actions">
                <div className="saas-content__btn" />
                <div className="saas-content__btn saas-content__btn--primary" style={{ background: saas.color }} />
              </div>
            </div>
            <div className="saas-content__kpis">
              {[
                { label: 'Monthly Revenue', val: '$128K', icon: 'ðŸ“ˆ' },
                { label: 'Active Users', val: '8,491', icon: 'ðŸ‘¥' },
                { label: 'Churn Rate', val: '1.2%', icon: 'ðŸ“‰' },
                { label: 'NPS Score', val: '72', icon: 'â­' },
              ].map((kpi, i) => (
                <div key={i} className="saas-kpi" style={{ borderTop: `2px solid ${saas.color}` }}>
                  <div className="saas-kpi__icon">{kpi.icon}</div>
                  <div className="saas-kpi__val" style={{ color: saas.color }}>{kpi.val}</div>
                  <div className="saas-kpi__label">{kpi.label}</div>
                </div>
              ))}
            </div>
            <div className="saas-content__main">
              <div className="saas-chart-panel">
                <div className="saas-chart-title">MRR Growth</div>
                <div className="saas-chart">
                  <svg className="saas-chart-svg" viewBox="0 0 200 80" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id={`saasGrad${saas.id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={saas.color} stopOpacity="0.4" />
                        <stop offset="100%" stopColor={saas.color} stopOpacity="0.02" />
                      </linearGradient>
                    </defs>
                    <polyline
                      points="0,65 25,55 50,50 75,38 100,30 125,20 150,14 175,8 200,4"
                      fill="none"
                      stroke={saas.color}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <polygon
                      points={`0,80 0,65 25,55 50,50 75,38 100,30 125,20 150,14 175,8 200,4 200,80`}
                      fill={`url(#saasGrad${saas.id})`}
                    />
                  </svg>
                </div>
              </div>
              <div className="saas-tenant-list">
                <div className="saas-tenant-title">Top Tenants</div>
                {['Acme Corp', 'TechStart', 'MedGroup'].map((t, i) => (
                  <div key={t} className="saas-tenant">
                    <div className="saas-tenant__avatar" style={{ background: saas.color + '30', color: saas.color }}>{t[0]}</div>
                    <div className="saas-tenant__name">{t}</div>
                    <div className="saas-tenant__plan" style={{ color: saas.color }}>Pro</div>
                    <div className="saas-tenant__bar">
                      <div className="saas-tenant__fill" style={{ width: `${[85, 62, 94][i]}%`, background: saas.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function ArchDiagram() {
  return (
    <div className="arch-diagram">
      <div className="arch-title">Architecture Overview</div>
      <div className="arch-body">
        {/* User layer */}
        <div className="arch-layer">
          <div className="arch-layer__label">Client Layer</div>
          <div className="arch-nodes">
            {['Web App', 'Mobile', 'API Clients'].map(n => (
              <div key={n} className="arch-node arch-node--client">{n}</div>
            ))}
          </div>
        </div>
        <div className="arch-arrow-row"><div className="arch-arrow arch-arrow--down" /></div>
        {/* CDN/LB */}
        <div className="arch-layer">
          <div className="arch-layer__label">Edge Layer</div>
          <div className="arch-nodes">
            <div className="arch-node arch-node--cdn">CDN / Load Balancer</div>
          </div>
        </div>
        <div className="arch-arrow-row"><div className="arch-arrow arch-arrow--down" /></div>
        {/* Services */}
        <div className="arch-layer">
          <div className="arch-layer__label">Microservices</div>
          <div className="arch-nodes">
            {['Auth', 'Core API', 'Billing', 'Analytics'].map(n => (
              <div key={n} className="arch-node arch-node--service">{n}</div>
            ))}
          </div>
        </div>
        <div className="arch-arrow-row"><div className="arch-arrow arch-arrow--down" /></div>
        {/* Data */}
        <div className="arch-layer">
          <div className="arch-layer__label">Data Layer</div>
          <div className="arch-nodes">
            {['PostgreSQL', 'Redis Cache', 'S3 Storage'].map(n => (
              <div key={n} className="arch-node arch-node--data">{n}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SaaSShowcase() {
  const [activeSaaS, setActiveSaaS] = useState(SAAS_EXAMPLES[0]);

  return (
    <section className="saas-section" id="saas">
      <div className="saas-section__bg">
        <div className="saas-bg-orb saas-bg-orb--1" />
        <div className="saas-bg-orb saas-bg-orb--2" />
        <div className="saas-bg-grid" />
      </div>
      <div className="container">
        <ScrollReveal>
          <SectionTitle
            badge="SAAS PLATFORMS"
            title="SaaS That Scales to Infinity"
            subtitle="We build multi-tenant SaaS platforms that power thousands of businesses â€” with the architecture to handle whatever comes next."
          />
        </ScrollReveal>

        {/* SaaS selector */}
        <ScrollReveal delay={0.1}>
          <div className="saas-selector">
            {SAAS_EXAMPLES.map(s => (
              <motion.button
                key={s.id}
                className={`saas-sel-btn${activeSaaS.id === s.id ? ' saas-sel-btn--active' : ''}`}
                style={{ '--sel-color': s.color }}
                onClick={() => setActiveSaaS(s)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <div className="saas-sel-btn__dot" style={{ background: s.color }} />
                <div>
                  <div className="saas-sel-btn__name">{s.name}</div>
                  <div className="saas-sel-btn__type">{s.type}</div>
                </div>
              </motion.button>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal variant="scaleUp" delay={0.15}>
          <SaaSMockup saas={activeSaaS} />
        </ScrollReveal>

        {/* Features grid */}
        <ScrollReveal delay={0.1}>
          <div className="saas-features-header">
            <h3 className="saas-features-title">What Makes Our SaaS Different</h3>
            <p className="saas-features-sub">Enterprise-grade features baked in from day one.</p>
          </div>
        </ScrollReveal>
        <div className="saas-features-grid">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              className="saas-feature"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4, borderColor: f.color }}
              style={{ '--feat-color': f.color }}
            >
              <div className="saas-feature__icon" style={{ background: f.color + '20', border: `1px solid ${f.color}44` }}>
                {f.icon}
              </div>
              <h4 className="saas-feature__title">{f.title}</h4>
              <p className="saas-feature__desc">{f.desc}</p>
              <div className="saas-feature__line" />
            </motion.div>
          ))}
        </div>

        {/* Architecture Diagram */}
        <ScrollReveal delay={0.1}>
          <ArchDiagram />
        </ScrollReveal>

        {/* Pricing illustration */}
        <ScrollReveal delay={0.1}>
          <div className="saas-pricing-strip">
            <div className="saas-pricing-label">Flexible Pricing Models We Support:</div>
            <div className="saas-pricing-models">
              {[
                { name: 'Per Seat', icon: 'ðŸ‘¤', desc: 'Per user/month' },
                { name: 'Usage-Based', icon: 'ðŸ“Š', desc: 'Pay as you go' },
                { name: 'Flat Rate', icon: 'ðŸ’°', desc: 'Fixed monthly' },
                { name: 'Freemium', icon: 'ðŸš€', desc: 'Free + Paid tiers' },
                { name: 'Enterprise', icon: 'ðŸ¢', desc: 'Custom contracts' },
              ].map((model, i) => (
                <motion.div
                  key={model.name}
                  className="saas-pricing-model"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="saas-pricing-model__icon">{model.icon}</span>
                  <div className="saas-pricing-model__name">{model.name}</div>
                  <div className="saas-pricing-model__desc">{model.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
