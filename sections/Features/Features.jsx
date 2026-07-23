'use client'

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import './Features.css';

const features = [
  {
    id: 1,
    label: 'AI-Powered Analytics',
    headline: 'Turn Data Into Decisions With AI',
    description:
      'Our intelligent analytics engine processes millions of data points in real-time, surfacing the insights that matter most. Predictive modeling, anomaly detection, and automated reportingâ€”all in one platform.',
    bullets: ['Real-time dashboards & KPIs', 'Predictive trend forecasting', 'Automated anomaly alerts', 'One-click PDF/CSV exports'],
    visual: 'analytics',
    layout: 'text-left',
    color: '#6C63FF',
  },
  {
    id: 2,
    label: 'Enterprise Security',
    headline: 'Bank-Grade Security, Zero Compromise',
    description:
      'Your data is your most valuable asset. We protect it with military-grade encryption, role-based access controls, automated threat detection, and full compliance with GDPR, HIPAA, and SOC 2.',
    bullets: ['AES-256 encryption at rest & transit', 'Zero-trust architecture', 'Real-time threat monitoring', 'GDPR, HIPAA, SOC 2 compliant'],
    visual: 'security',
    layout: 'text-right',
    color: '#00D9FF',
  },
  {
    id: 3,
    label: 'Scalable Architecture',
    headline: 'Built to Scale From Day One',
    description:
      'Whether you have 100 or 10 million users, our cloud-native microservices architecture scales effortlessly. Auto-scaling, multi-region deployment, and 99.99% uptime SLA guaranteed.',
    bullets: ['Kubernetes auto-scaling', 'Multi-region CDN delivery', '99.99% uptime SLA', 'Zero-downtime deployments'],
    visual: 'architecture',
    layout: 'text-left',
    color: '#7C3AED',
  },
  {
    id: 4,
    label: '24/7 Support',
    headline: 'We\'re Always Here When You Need Us',
    description:
      'Our dedicated support team is available around the clock. With an average response time under 2 minutes, you\'ll never be left waiting. Dedicated account managers, live chat, and priority escalation paths.',
    bullets: ['< 2 min average response time', 'Dedicated account manager', 'Live chat + video calls', 'Proactive health monitoring'],
    visual: 'support',
    layout: 'text-right',
    color: '#00E676',
  },
];

function AnalyticsVisual() {
  const bars = [65, 82, 48, 91, 73, 58, 87, 94, 62, 79];
  return (
    <div className="feature-visual feature-visual--analytics">
      <div className="fv-analytics__card">
        <div className="fv-analytics__header">
          <div className="fv-analytics__pill">Live Analytics</div>
          <div className="fv-analytics__dot" />
        </div>
        <div className="fv-analytics__chart">
          {bars.map((h, i) => (
            <div key={i} className="fv-analytics__bar-wrap">
              <div className="fv-analytics__bar" style={{ '--bar-h': `${h}%`, '--delay': `${i * 0.08}s` }} />
            </div>
          ))}
        </div>
        <div className="fv-analytics__metrics">
          <div className="fv-analytics__metric">
            <span className="fv-analytics__metric-val">+127%</span>
            <span className="fv-analytics__metric-lbl">Revenue</span>
          </div>
          <div className="fv-analytics__metric">
            <span className="fv-analytics__metric-val">98.4%</span>
            <span className="fv-analytics__metric-lbl">Uptime</span>
          </div>
          <div className="fv-analytics__metric">
            <span className="fv-analytics__metric-val">3.2ms</span>
            <span className="fv-analytics__metric-lbl">Latency</span>
          </div>
        </div>
        <div className="fv-analytics__line-chart">
          <svg viewBox="0 0 200 60" preserveAspectRatio="none">
            <defs>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6C63FF" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#6C63FF" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0 50 C20 45, 40 30, 60 35 S100 10, 120 15 S160 5, 200 8" fill="none" stroke="#6C63FF" strokeWidth="2" />
            <path d="M0 50 C20 45, 40 30, 60 35 S100 10, 120 15 S160 5, 200 8 L200 60 L0 60 Z" fill="url(#lineGrad)" />
          </svg>
        </div>
      </div>
      <div className="fv-analytics__floating fv-analytics__floating--1">
        <span>ðŸ”¥</span> Trending up 23%
      </div>
      <div className="fv-analytics__floating fv-analytics__floating--2">
        <span>âš¡</span> 1.2M events/sec
      </div>
    </div>
  );
}

function SecurityVisual() {
  return (
    <div className="feature-visual feature-visual--security">
      <div className="fv-security__shield">
        <div className="fv-security__ring fv-security__ring--1" />
        <div className="fv-security__ring fv-security__ring--2" />
        <div className="fv-security__ring fv-security__ring--3" />
        <div className="fv-security__core">
          <svg viewBox="0 0 64 76" fill="none">
            <path d="M32 2L4 14v22c0 18 12 32 28 38 16-6 28-20 28-38V14L32 2z" fill="url(#shieldGrad)" opacity="0.2" stroke="#00D9FF" strokeWidth="1.5" />
            <path d="M32 2L4 14v22c0 18 12 32 28 38 16-6 28-20 28-38V14L32 2z" fill="none" stroke="rgba(0,217,255,0.3)" strokeWidth="0.5" />
            <polyline points="20,38 28,46 44,30" stroke="#00E676" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <defs>
              <linearGradient id="shieldGrad" x1="4" y1="2" x2="60" y2="76" gradientUnits="userSpaceOnUse">
                <stop stopColor="#00D9FF" />
                <stop offset="1" stopColor="#6C63FF" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div className="fv-security__badges">
        {['AES-256', 'GDPR', 'SOC 2', 'HIPAA'].map((b) => (
          <div key={b} className="fv-security__badge">{b}</div>
        ))}
      </div>
      <div className="fv-security__threats">
        <div className="fv-security__threat-row">
          <span className="fv-security__threat-dot fv-security__threat-dot--blocked" />
          <span>Threat blocked</span>
          <span className="fv-security__threat-time">0.3ms</span>
        </div>
        <div className="fv-security__threat-row">
          <span className="fv-security__threat-dot fv-security__threat-dot--scan" />
          <span>Port scan detected</span>
          <span className="fv-security__threat-time">1.1ms</span>
        </div>
        <div className="fv-security__threat-row">
          <span className="fv-security__threat-dot fv-security__threat-dot--blocked" />
          <span>DDoS mitigated</span>
          <span className="fv-security__threat-time">2.4ms</span>
        </div>
      </div>
    </div>
  );
}

function ArchitectureVisual() {
  const nodes = [
    { label: 'CDN', x: 50, y: 8, color: '#7C3AED' },
    { label: 'Load Balancer', x: 50, y: 30, color: '#6C63FF' },
    { label: 'API Gateway', x: 20, y: 52, color: '#00D9FF' },
    { label: 'Auth Service', x: 50, y: 52, color: '#7C3AED' },
    { label: 'DB Cluster', x: 80, y: 52, color: '#00E676' },
    { label: 'Cache', x: 20, y: 80, color: '#6C63FF' },
    { label: 'Storage', x: 80, y: 80, color: '#00D9FF' },
  ];
  const edges = [
    [0, 1], [1, 2], [1, 3], [1, 4], [2, 5], [4, 6],
  ];
  return (
    <div className="feature-visual feature-visual--architecture">
      <div className="fv-arch__diagram">
        <svg viewBox="0 0 100 100" className="fv-arch__svg">
          {edges.map(([a, b], i) => (
            <line key={i}
              x1={`${nodes[a].x}%`} y1={`${nodes[a].y}%`}
              x2={`${nodes[b].x}%`} y2={`${nodes[b].y}%`}
              stroke="rgba(108,99,255,0.35)" strokeWidth="0.5"
              strokeDasharray="2 2"
            />
          ))}
          {nodes.map((n, i) => (
            <g key={i}>
              <circle cx={`${n.x}%`} cy={`${n.y}%`} r="5" fill={n.color} opacity="0.15" />
              <circle cx={`${n.x}%`} cy={`${n.y}%`} r="3" fill={n.color} opacity="0.8" className="fv-arch__node" style={{ '--delay': `${i * 0.2}s` }} />
            </g>
          ))}
        </svg>
        {nodes.map((n, i) => (
          <div key={i} className="fv-arch__label" style={{ left: `${n.x}%`, top: `${n.y}%` }}>
            {n.label}
          </div>
        ))}
      </div>
      <div className="fv-arch__stats">
        <div className="fv-arch__stat"><span>99.99%</span><small>Uptime</small></div>
        <div className="fv-arch__stat"><span>Auto</span><small>Scaling</small></div>
        <div className="fv-arch__stat"><span>12</span><small>Regions</small></div>
      </div>
    </div>
  );
}

function SupportVisual() {
  return (
    <div className="feature-visual feature-visual--support">
      <div className="fv-support__dashboard">
        <div className="fv-support__header">
          <div className="fv-support__header-dot fv-support__header-dot--green" />
          <span>Support Console</span>
          <div className="fv-support__header-badge">LIVE</div>
        </div>
        <div className="fv-support__tickets">
          {[
            { id: '#4821', status: 'resolved', msg: 'Deployment issue', time: '1m' },
            { id: '#4820', status: 'progress', msg: 'API latency spike', time: '3m' },
            { id: '#4819', status: 'resolved', msg: 'Database query', time: '8m' },
          ].map((t) => (
            <div key={t.id} className="fv-support__ticket">
              <span className={`fv-support__status fv-support__status--${t.status}`} />
              <span className="fv-support__ticket-id">{t.id}</span>
              <span className="fv-support__ticket-msg">{t.msg}</span>
              <span className="fv-support__ticket-time">{t.time} ago</span>
            </div>
          ))}
        </div>
        <div className="fv-support__chat">
          <div className="fv-support__bubble fv-support__bubble--user">How do I scale my cluster?</div>
          <div className="fv-support__bubble fv-support__bubble--agent">
            Hi! I can walk you through that right now. Let me pull up your config...
            <span className="fv-support__typing" />
          </div>
        </div>
        <div className="fv-support__metrics">
          <div className="fv-support__metric">
            <span className="fv-support__metric-val" style={{ color: '#00E676' }}>1.8m</span>
            <span>Avg Response</span>
          </div>
          <div className="fv-support__metric">
            <span className="fv-support__metric-val" style={{ color: '#00D9FF' }}>99%</span>
            <span>CSAT Score</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const visuals = {
  analytics: AnalyticsVisual,
  security: SecurityVisual,
  architecture: ArchitectureVisual,
  support: SupportVisual,
};

function FeatureRow({ feature, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const isLeft = feature.layout === 'text-left';
  const Visual = visuals[feature.visual];

  return (
    <div ref={ref} className={`feature-row feature-row--${isLeft ? 'left' : 'right'}`}>
      <div className="feature-row__text">
        <ScrollReveal variant={isLeft ? 'fadeLeft' : 'fadeRight'} delay={0.1}>
          <div className="feature-row__label" style={{ color: feature.color }}>
            <span className="feature-row__label-dot" style={{ background: feature.color }} />
            {feature.label}
          </div>
          <h3 className="feature-row__headline">{feature.headline}</h3>
          <p className="feature-row__desc">{feature.description}</p>
          <ul className="feature-row__bullets">
            {feature.bullets.map((b, i) => (
              <li key={i} className="feature-row__bullet">
                <span className="feature-row__bullet-icon" style={{ color: feature.color }}>âœ“</span>
                {b}
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
      <motion.div className="feature-row__visual" style={{ y }}>
        <ScrollReveal variant={isLeft ? 'fadeRight' : 'fadeLeft'} delay={0.25}>
          <Visual />
        </ScrollReveal>
      </motion.div>
      {index < features.length - 1 && (
        <div className="feature-row__connector">
          <div className="feature-row__connector-line" style={{ borderColor: feature.color }} />
          <div className="feature-row__connector-dot" style={{ background: feature.color }} />
        </div>
      )}
    </div>
  );
}

export default function Features() {
  return (
    <section className="features-section" id="features">
      <div className="features-section__bg">
        <div className="features-section__glow features-section__glow--1" />
        <div className="features-section__glow features-section__glow--2" />
      </div>
      <div className="container">
        <ScrollReveal>
          <SectionTitle
            badge="FEATURES"
            title="Everything You Need to Succeed"
            subtitle="A complete platform engineered for performance, security, and scale â€” so you can focus on building great products."
          />
        </ScrollReveal>
        <div className="features-list">
          {features.map((f, i) => (
            <FeatureRow key={f.id} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
