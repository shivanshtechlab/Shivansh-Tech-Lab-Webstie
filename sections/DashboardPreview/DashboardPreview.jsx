'use client'

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import './DashboardPreview.css';

const THEMES = [
  { id: 'purple', name: 'Violet', primary: '#6C63FF', secondary: '#00D9FF', bg: '#050816', surface: '#101522' },
  { id: 'emerald', name: 'Emerald', primary: '#00E676', secondary: '#00B8D9', bg: '#030F0A', surface: '#081510' },
  { id: 'rose', name: 'Rose', primary: '#FF416C', secondary: '#FF4B2B', bg: '#0F0608', surface: '#180A0E' },
  { id: 'gold', name: 'Gold', primary: '#FFB800', secondary: '#FF6B35', bg: '#0F0B02', surface: '#181006' },
];

const NAV_ITEMS = ['Dashboard', 'Analytics', 'Users', 'Revenue', 'Reports', 'Settings'];

const FLOATING_STATS = [
  { label: 'Total Revenue', value: '$2.4M', delta: '+18%', pos: { top: '12%', left: '-80px' } },
  { label: 'Active Users', value: '124K', delta: '+24%', pos: { top: '35%', right: '-90px' } },
  { label: 'Conversion', value: '8.6%', delta: '+3.2%', pos: { bottom: '25%', left: '-85px' } },
  { label: 'Avg. Session', value: '4m 32s', delta: '+12%', pos: { bottom: '10%', right: '-80px' } },
];

export default function DashboardPreview() {
  const [theme, setTheme] = useState(THEMES[0]);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const wrapRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = wrapRef.current.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
    const y = -((e.clientX - rect.left) / rect.width - 0.5) * 16;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  const chartData = [45, 70, 55, 85, 65, 90, 75, 80, 60, 95, 72, 88];

  return (
    <section className="db-section">
      <div className="db-section__bg">
        <div className="db-bg-orb db-bg-orb--1" />
        <div className="db-bg-orb db-bg-orb--2" />
      </div>
      <div className="container">
        <ScrollReveal>
          <SectionTitle
            badge="ADMIN DASHBOARDS"
            title="Beautiful, Data-Rich Admin Panels"
            subtitle="Custom-built dashboards that turn complex data into clear, actionable insights â€” beautifully designed for every role."
          />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="db-theme-switcher">
            <span className="db-theme-label">Choose Theme:</span>
            {THEMES.map(t => (
              <motion.button
                key={t.id}
                className={`db-theme-btn${theme.id === t.id ? ' db-theme-btn--active' : ''}`}
                style={{ '--t-primary': t.primary }}
                onClick={() => setTheme(t)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                title={t.name}
              >
                <span className="db-theme-dot" style={{ background: t.primary }} />
                {t.name}
              </motion.button>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal variant="scaleUp" delay={0.15}>
          <div
            className="db-perspective-wrap"
            ref={wrapRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Floating stats */}
            {FLOATING_STATS.map((stat, i) => (
              <motion.div
                key={i}
                className="db-float-stat"
                style={stat.pos}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
              >
                <div className="db-float-stat__val" style={{ color: theme.primary }}>{stat.value}</div>
                <div className="db-float-stat__label">{stat.label}</div>
                <div className="db-float-stat__delta" style={{ color: '#00E676' }}>{stat.delta}</div>
              </motion.div>
            ))}

            <motion.div
              className="db-mockup"
              style={{
                '--db-primary': theme.primary,
                '--db-secondary': theme.secondary,
                '--db-bg': theme.bg,
                '--db-surface': theme.surface,
                transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 30 }}
            >
              {/* Sidebar */}
              <div className="db-sidebar">
                <div className="db-sidebar__logo">
                  <div className="db-logo-dot" style={{ background: theme.primary }} />
                  <span>AdminPro</span>
                </div>
                <nav className="db-sidebar__nav">
                  {NAV_ITEMS.map((item, i) => (
                    <div key={item} className={`db-nav-item${i === 0 ? ' db-nav-item--active' : ''}`}
                      style={i === 0 ? { background: theme.primary + '20', color: theme.primary, borderLeft: `2px solid ${theme.primary}` } : {}}>
                      <div className="db-nav-icon" />
                      <span>{item}</span>
                    </div>
                  ))}
                </nav>
                <div className="db-sidebar__user">
                  <div className="db-user-avatar" style={{ background: theme.primary }} />
                  <div>
                    <div className="db-user-name">John Admin</div>
                    <div className="db-user-role">Super Admin</div>
                  </div>
                </div>
              </div>

              {/* Main content */}
              <div className="db-main">
                {/* Header */}
                <div className="db-header">
                  <div className="db-header__title">
                    <div className="db-header__greeting">Good morning, John ðŸ‘‹</div>
                    <div className="db-header__subtitle">Here's what's happening today</div>
                  </div>
                  <div className="db-header__actions">
                    <div className="db-search" />
                    <div className="db-notif" />
                    <div className="db-avatar" style={{ background: theme.primary }} />
                  </div>
                </div>

                {/* KPI Cards */}
                <div className="db-kpis">
                  {[
                    { label: 'Total Revenue', val: '$2.4M', delta: '+18%', color: theme.primary },
                    { label: 'Active Users', val: '124,890', delta: '+24%', color: theme.secondary },
                    { label: 'Orders Today', val: '3,247', delta: '+7%', color: '#00E676' },
                    { label: 'Bounce Rate', val: '24.6%', delta: '-3.2%', color: '#FFB800' },
                  ].map((kpi, i) => (
                    <div key={i} className="db-kpi" style={{ '--kpi-c': kpi.color, borderTop: `2px solid ${kpi.color}` }}>
                      <div className="db-kpi__header">
                        <span className="db-kpi__label">{kpi.label}</span>
                        <div className="db-kpi__icon" style={{ background: kpi.color + '20', color: kpi.color }} />
                      </div>
                      <div className="db-kpi__val" style={{ color: kpi.color }}>{kpi.val}</div>
                      <div className="db-kpi__delta" style={{ color: kpi.delta.startsWith('+') ? '#00E676' : '#FF5252' }}>{kpi.delta} this month</div>
                    </div>
                  ))}
                </div>

                {/* Chart + Table row */}
                <div className="db-content-row">
                  {/* Chart */}
                  <div className="db-chart-panel">
                    <div className="db-panel-title">Revenue Overview</div>
                    <div className="db-chart">
                      {/* Area chart background */}
                      <svg className="db-chart-svg" viewBox="0 0 200 80" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={theme.primary} stopOpacity="0.4" />
                            <stop offset="100%" stopColor={theme.primary} stopOpacity="0.02" />
                          </linearGradient>
                        </defs>
                        <polyline
                          points={chartData.map((v, i) => `${i * (200 / 11)},${80 - (v / 100) * 75}`).join(' ')}
                          fill="none"
                          stroke={theme.primary}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <polygon
                          points={`0,80 ${chartData.map((v, i) => `${i * (200 / 11)},${80 - (v / 100) * 75}`).join(' ')} 200,80`}
                          fill="url(#chartGrad)"
                        />
                      </svg>
                      <div className="db-chart-bars">
                        {chartData.map((h, i) => (
                          <div key={i} className="db-chart-month">
                            <div className="db-chart-bar" style={{ height: `${h}%`, background: `linear-gradient(to top, ${theme.primary}, ${theme.secondary})` }} />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="db-chart-labels">
                      {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map(m => (
                        <span key={m}>{m}</span>
                      ))}
                    </div>
                  </div>

                  {/* Mini stats */}
                  <div className="db-right-panel">
                    <div className="db-panel-title">Top Channels</div>
                    {[
                      { name: 'Organic Search', pct: 42 },
                      { name: 'Direct', pct: 28 },
                      { name: 'Social Media', pct: 18 },
                      { name: 'Referral', pct: 12 },
                    ].map((ch, i) => (
                      <div key={i} className="db-channel">
                        <div className="db-channel__header">
                          <span className="db-channel__name">{ch.name}</span>
                          <span className="db-channel__pct">{ch.pct}%</span>
                        </div>
                        <div className="db-progress-bar">
                          <motion.div
                            className="db-progress-fill"
                            style={{ background: theme.primary }}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${ch.pct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                          />
                        </div>
                      </div>
                    ))}

                    <div className="db-recent-title">Recent Activity</div>
                    {[
                      { action: 'New user signup', time: '2m ago' },
                      { action: 'Order #4821 paid', time: '5m ago' },
                      { action: 'Report generated', time: '12m ago' },
                    ].map((act, i) => (
                      <div key={i} className="db-activity">
                        <div className="db-activity__dot" style={{ background: theme.primary }} />
                        <div className="db-activity__text">{act.action}</div>
                        <div className="db-activity__time">{act.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
            {/* Glow under */}
            <div className="db-glow-under" style={{ background: theme.primary }} />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
