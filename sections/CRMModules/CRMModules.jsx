'use client'

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import { crmModules } from '../../data/crmModules';
import './CRMModules.css';

function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const numeric = parseInt(target.replace(/\D/g, ''));
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numeric));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function StatCounter({ value, label, suffix = '' }) {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const count = useCountUp(value, 1800, started);
  const numeric = parseInt(value.replace(/\D/g, ''));

  return (
    <div ref={ref} className="crm-stat">
      <div className="crm-stat__num">
        {count.toLocaleString()}{value.includes('+') ? '+' : value.includes('%') ? '%' : ''}{suffix}
      </div>
      <div className="crm-stat__label">{label}</div>
    </div>
  );
}

function CRMMockup({ module }) {
  const stages = ['Prospect', 'Qualified', 'Proposal', 'Negotiation', 'Won'];
  const deals = [
    { name: 'Acme Corp', val: '$45K', stage: 0 },
    { name: 'TechStart', val: '$28K', stage: 1 },
    { name: 'MedGroup', val: '$120K', stage: 2 },
    { name: 'RetailCo', val: '$67K', stage: 3 },
    { name: 'AutoBiz', val: '$89K', stage: 4 },
  ];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={module.id}
        className="crm-mockup"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.35 }}
        style={{ '--mod-color': module.color }}
      >
        <div className="crm-mockup__header">
          <div className="crm-mockup__dots"><span /><span /><span /></div>
          <div className="crm-mockup__title">
            <span>{module.icon}</span> {module.title}
          </div>
          <div className="crm-mockup__badge" style={{ background: module.color + '22', color: module.color }}>Live</div>
        </div>
        <div className="crm-mockup__body">
          <div className="crm-mockup__sidebar">
            <div className="crm-sidebar-stat" style={{ borderColor: module.color + '44' }}>
              <div className="crm-sidebar-stat__val" style={{ color: module.color }}>847</div>
              <div className="crm-sidebar-stat__label">Active Leads</div>
            </div>
            <div className="crm-sidebar-stat">
              <div className="crm-sidebar-stat__val" style={{ color: '#00E676' }}>$2.4M</div>
              <div className="crm-sidebar-stat__label">Pipeline Value</div>
            </div>
            <div className="crm-sidebar-stat">
              <div className="crm-sidebar-stat__val">68%</div>
              <div className="crm-sidebar-stat__label">Win Rate</div>
            </div>
            <div className="crm-sidebar-mini-chart">
              <div className="crm-mini-label">Conversion</div>
              <div className="crm-mini-bars">
                {[40, 60, 45, 75, 55, 80, 68].map((h, i) => (
                  <div key={i} className="crm-mini-bar" style={{ height: `${h}%`, background: module.color }} />
                ))}
              </div>
            </div>
          </div>
          <div className="crm-mockup__pipeline">
            <div className="crm-pipeline-fade" />
            <div className="crm-pipeline-title">Sales Pipeline â€” Kanban View</div>
            <div className="crm-pipeline">
              {stages.map((stage, si) => (
                <div key={stage} className="crm-pipeline__col">
                  <div className="crm-pipeline__col-header">
                    <span className="crm-pipeline__stage-name">{stage}</span>
                    <span className="crm-pipeline__count">{deals.filter(d => d.stage === si).length}</span>
                  </div>
                  <div className="crm-pipeline__cards">
                    {deals.filter(d => d.stage === si).map((deal, i) => (
                      <motion.div
                        key={deal.name}
                        className="crm-deal"
                        style={{ borderLeft: `2px solid ${module.color}` }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="crm-deal__name">{deal.name}</div>
                        <div className="crm-deal__val" style={{ color: module.color }}>{deal.val}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function CRMModules() {
  const [selected, setSelected] = useState(crmModules[0]);

  return (
    <section className="crm-section" id="crm">
      <div className="crm-section__bg">
        <div className="crm-bg-orb crm-bg-orb--1" />
        <div className="crm-bg-orb crm-bg-orb--2" />
        <div className="crm-bg-grid" />
      </div>
      <div className="container">
        <ScrollReveal>
          <SectionTitle
            badge="CRM SOLUTION"
            title="Customer Relationships That Drive Revenue"
            subtitle="Turn every lead into a loyal customer with our intelligent CRM platform built for modern sales teams."
          />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="crm-stats-row">
            <StatCounter value="10000+" label="Active Users" />
            <div className="crm-stats-divider" />
            <StatCounter value="500%" label="Avg. Revenue Growth" suffix="+" />
            <div className="crm-stats-divider" />
            <StatCounter value="99%" label="Uptime SLA" />
            <div className="crm-stats-divider" />
            <StatCounter value="200" label="Integrations" suffix="+" />
          </div>
        </ScrollReveal>

        <div className="crm-layout">
          <ScrollReveal variant="fadeLeft">
            <div className="crm-modules-grid">
              {crmModules.map((mod) => (
                <motion.button
                  key={mod.id}
                  className={`crm-mod-btn${selected.id === mod.id ? ' crm-mod-btn--active' : ''}`}
                  style={{ '--mod-color': mod.color }}
                  onClick={() => setSelected(mod)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="crm-mod-btn__icon" style={{ background: mod.color + '20', border: `1px solid ${mod.color}44` }}>
                    {mod.icon}
                  </div>
                  <div className="crm-mod-btn__text">
                    <div className="crm-mod-btn__title">{mod.title}</div>
                    <div className="crm-mod-btn__desc">{mod.description}</div>
                  </div>
                  {selected.id === mod.id && (
                    <motion.div className="crm-mod-btn__active-dot" layoutId="crm-dot" style={{ background: mod.color }} />
                  )}
                </motion.button>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fadeRight">
            <div className="crm-preview">
              <CRMMockup module={selected} />
              <div className="crm-preview__glow" style={{ background: selected.color }} />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
