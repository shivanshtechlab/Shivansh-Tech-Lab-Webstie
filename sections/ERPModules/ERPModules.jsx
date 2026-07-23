'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import { erpModules } from '../../data/erpModules';
import './ERPModules.css';

function ERPMockup({ module }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={module.id}
        className="erp-mockup"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ '--mod-color': module.color }}
      >
        <div className="erp-mockup__header">
          <div className="erp-mockup__dots">
            <span /><span /><span />
          </div>
          <div className="erp-mockup__title-bar">
            <span className="erp-mockup__icon">{module.icon}</span>
            <span className="erp-mockup__module-name">{module.title}</span>
          </div>
          <div className="erp-mockup__actions">
            <div className="erp-mockup__action-btn" />
            <div className="erp-mockup__action-btn erp-mockup__action-btn--primary" style={{ background: module.color }} />
          </div>
        </div>
        <div className="erp-mockup__body">
          <div className="erp-mockup__sidebar">
            {['Overview', 'Details', 'Reports', 'Settings'].map((item, i) => (
              <div key={item} className={`erp-mock-nav${i === 0 ? ' erp-mock-nav--active' : ''}`} style={i === 0 ? { color: module.color, borderLeft: `2px solid ${module.color}`, background: `${module.color}15` } : {}}>
                <div className="erp-mock-nav__dot" style={{ background: i === 0 ? module.color : undefined }} />
                {item}
              </div>
            ))}
          </div>
          <div className="erp-mockup__main">
            <div className="erp-mockup__kpis">
              {[
                { label: 'Total Records', val: '24,891', delta: '+12%' },
                { label: 'Active', val: '18,203', delta: '+8%' },
                { label: 'Pending', val: '1,247', delta: '-3%' },
              ].map((kpi, i) => (
                <div key={i} className="erp-kpi" style={{ '--kpi-color': module.color }}>
                  <div className="erp-kpi__val">{kpi.val}</div>
                  <div className="erp-kpi__label">{kpi.label}</div>
                  <div className="erp-kpi__delta" style={{ color: kpi.delta.startsWith('+') ? '#00E676' : '#FF5252' }}>{kpi.delta}</div>
                </div>
              ))}
            </div>
            <div className="erp-mockup__chart-area">
              <div className="erp-mockup__chart-title">Activity Overview</div>
              <div className="erp-mockup__chart">
                {[45, 70, 55, 85, 65, 90, 75, 80, 60, 95, 70, 85].map((h, i) => (
                  <div key={i} className="erp-chart-bar" style={{ height: `${h}%`, background: `linear-gradient(to top, ${module.color}, ${module.color}88)` }} />
                ))}
              </div>
            </div>
            <div className="erp-mockup__table">
              <div className="erp-mockup__table-header">
                {['ID', 'Name', 'Status', 'Date', 'Value'].map(col => (
                  <span key={col}>{col}</span>
                ))}
              </div>
              {[
                ['#0041', 'Alpha Record', 'Active', '2024-01-15', '$12,400'],
                ['#0042', 'Beta Record', 'Pending', '2024-01-16', '$8,900'],
                ['#0043', 'Gamma Record', 'Active', '2024-01-17', '$21,100'],
              ].map((row, i) => (
                <div key={i} className="erp-mockup__table-row">
                  {row.map((cell, j) => (
                    <span key={j} className={j === 2 ? `erp-status erp-status--${cell.toLowerCase()}` : ''}
                      style={j === 2 && cell === 'Active' ? { color: '#00E676', background: '#00E67618', padding: '2px 8px', borderRadius: '100px' } :
                        j === 2 ? { color: '#FFB800', background: '#FFB80018', padding: '2px 8px', borderRadius: '100px' } : {}}>
                      {cell}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function ERPModules() {
  const [selected, setSelected] = useState(erpModules[0]);

  return (
    <section className="erp-section" id="erp">
      <div className="erp-section__bg">
        <div className="erp-bg-orb erp-bg-orb--1" />
        <div className="erp-bg-orb erp-bg-orb--2" />
      </div>
      <div className="container">
        <ScrollReveal>
          <SectionTitle
            badge="ERP SOLUTION"
            title="Complete Enterprise Resource Planning"
            subtitle="A modular ERP system built for the way modern businesses operate â€” scalable, integrated, and intelligent."
          />
        </ScrollReveal>

        <div className="erp-layout">
          <ScrollReveal variant="fadeLeft">
            <div className="erp-modules-list">
              <div className="erp-modules-list__label">Select Module</div>
              {erpModules.map((mod) => (
                <motion.button
                  key={mod.id}
                  className={`erp-module-btn${selected.id === mod.id ? ' erp-module-btn--active' : ''}`}
                  style={{ '--mod-color': mod.color }}
                  onClick={() => setSelected(mod)}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="erp-module-btn__icon">{mod.icon}</span>
                  <div className="erp-module-btn__text">
                    <span className="erp-module-btn__title">{mod.title}</span>
                    <span className="erp-module-btn__desc">{mod.description}</span>
                  </div>
                  {selected.id === mod.id && (
                    <motion.div className="erp-module-btn__indicator" layoutId="erp-indicator" />
                  )}
                </motion.button>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fadeRight">
            <div className="erp-preview">
              <ERPMockup module={selected} />
              <div className="erp-preview__glow" style={{ background: selected.color }} />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
