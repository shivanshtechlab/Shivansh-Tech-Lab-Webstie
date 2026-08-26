'use client'

import { motion } from 'framer-motion';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import './MobileApp.css';

const FEATURES = [
  { icon: '⚡', title: 'Cross-Platform', desc: 'One codebase for iOS and Android with native performance.' },
  { icon: '🚀', title: 'Native Performance', desc: '60fps animations, hardware acceleration, smooth as butter.' },
  { icon: '📡', title: 'Offline Support', desc: 'Full functionality even without an internet connection.' },
  { icon: '🔔', title: 'Push Notifications', desc: 'Re-engage users with smart, targeted push notifications.' },
];

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 2 + Math.random() * 4,
  duration: 4 + Math.random() * 4,
  delay: Math.random() * 4,
}));

function PhoneFrame({ children, className = '' }) {
  return (
    <div className={`phone-frame ${className}`}>
      <div className="phone-frame__notch" />
      <div className="phone-frame__screen">{children}</div>
      <div className="phone-frame__home-bar" />
    </div>
  );
}

function AppScreen1() {
  return (
    <div className="app-screen app-screen--1">
      <div className="app-screen__header">
        <div className="app-s1__avatar" />
        <div className="app-s1__greeting">
          <div className="app-s1__hello">Good morning, Alex 👋</div>
          <div className="app-s1__sub">Your summary for today</div>
        </div>
        <div className="app-s1__notif" />
      </div>
      <div className="app-s1__hero-card">
        <div className="app-s1__hero-label">Total Balance</div>
        <div className="app-s1__hero-val">$48,291.50</div>
        <div className="app-s1__hero-delta">+2.4% this week</div>
        <div className="app-s1__hero-chart">
          {[35, 55, 45, 70, 60, 85, 75].map((h, i) => (
            <div key={i} className="app-s1__bar" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
      <div className="app-s1__quick-actions">
        {['Send', 'Receive', 'Pay', 'More'].map((a, i) => (
          <div key={a} className="app-s1__action">
            <div className="app-s1__action-icon" />
            <span>{a}</span>
          </div>
        ))}
      </div>
      <div className="app-s1__section-title">Recent Transactions</div>
      {[
        { name: 'Amazon Prime', amt: '-$14.99', color: '#FF416C' },
        { name: 'Salary Deposit', amt: '+$5,200', color: '#00E676' },
        { name: 'Netflix', amt: '-$17.99', color: '#FF416C' },
      ].map((tx, i) => (
        <div key={i} className="app-s1__tx">
          <div className="app-s1__tx-icon" />
          <div className="app-s1__tx-name">{tx.name}</div>
          <div className="app-s1__tx-amt" style={{ color: tx.color }}>{tx.amt}</div>
        </div>
      ))}
      <div className="app-s1__bottom-nav">
        {['🏠', '📊', '💳', '👤'].map((ic, i) => (
          <div key={i} className={`app-s1__nav-item${i === 0 ? ' app-s1__nav-item--active' : ''}`}>{ic}</div>
        ))}
      </div>
    </div>
  );
}

function AppScreen2() {
  return (
    <div className="app-screen app-screen--2">
      <div className="app-s2__header">
        <div className="app-s2__back">←</div>
        <div className="app-s2__title">Fitness Dashboard</div>
        <div className="app-s2__share">⋯</div>
      </div>
      <div className="app-s2__ring-area">
        <div className="app-s2__ring-wrap">
          <svg viewBox="0 0 100 100" className="app-s2__svg">
            <circle cx="50" cy="50" r="40" fill="none" stroke="#ffffff10" strokeWidth="8" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="#6C63FF" strokeWidth="8"
              strokeDasharray="251.2" strokeDashoffset="62.8" strokeLinecap="round"
              transform="rotate(-90 50 50)" />
            <circle cx="50" cy="50" r="28" fill="none" stroke="#ffffff08" strokeWidth="6" />
            <circle cx="50" cy="50" r="28" fill="none" stroke="#00D9FF" strokeWidth="6"
              strokeDasharray="175.9" strokeDashoffset="52.7" strokeLinecap="round"
              transform="rotate(-90 50 50)" />
          </svg>
          <div className="app-s2__ring-center">
            <div className="app-s2__ring-val">75%</div>
            <div className="app-s2__ring-label">Goal</div>
          </div>
        </div>
      </div>
      <div className="app-s2__stats">
        {[
          { icon: '🔥', val: '842', label: 'Calories' },
          { icon: '👟', val: '8,421', label: 'Steps' },
          { icon: '⏱️', val: '48m', label: 'Active' },
        ].map((s, i) => (
          <div key={i} className="app-s2__stat">
            <span className="app-s2__stat-icon">{s.icon}</span>
            <div className="app-s2__stat-val">{s.val}</div>
            <div className="app-s2__stat-label">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="app-s2__week">
        <div className="app-s2__week-title">This Week</div>
        <div className="app-s2__week-bars">
          {['M','T','W','T','F','S','S'].map((d, i) => (
            <div key={i} className="app-s2__week-col">
              <div className="app-s2__week-bar-wrap">
                <div className="app-s2__week-bar" style={{ height: `${[60,80,45,90,70,55,75][i]}%` }} />
              </div>
              <span className="app-s2__day">{d}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="app-s2__bottom-nav">
        {['🏠', '🏋️', '📊', '👤'].map((ic, i) => (
          <div key={i} className={`app-s2__nav-item${i === 1 ? ' app-s2__nav-item--active' : ''}`}>{ic}</div>
        ))}
      </div>
    </div>
  );
}

export default function MobileApp() {
  return (
    <section className="mobile-section" id="mobile">
      <div className="mobile-section__bg">
        {PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            className="mobile-particle"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
            animate={{ y: [-20, 20, -20], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
          />
        ))}
        <div className="mobile-bg-orb mobile-bg-orb--1" />
        <div className="mobile-bg-orb mobile-bg-orb--2" />
      </div>
      <div className="container">
        <ScrollReveal>
          <SectionTitle
            badge="MOBILE APPS"
            title="Native Mobile Experiences Users Love"
            subtitle="From fintech to fitness — we craft mobile apps that users return to every single day."
          />
        </ScrollReveal>

        <div className="mobile-showcase">
          {/* Left phone */}
          <ScrollReveal variant="fadeLeft" delay={0.1}>
            <div className="mobile-phone-wrap mobile-phone-wrap--left">
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <PhoneFrame className="phone-frame--purple">
                  <AppScreen1 />
                </PhoneFrame>
              </motion.div>
            </div>
          </ScrollReveal>

          {/* Center features */}
          <div className="mobile-features-center">
            <div className="mobile-features-list">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f.title}
                  className="mobile-feature"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="mobile-feature__icon">{f.icon}</span>
                  <div>
                    <div className="mobile-feature__title">{f.title}</div>
                    <div className="mobile-feature__desc">{f.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div
              className="mobile-center-badge"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="mobile-center-badge__val">5M+</div>
              <div className="mobile-center-badge__label">Downloads</div>
            </motion.div>
          </div>

          {/* Right phone */}
          <ScrollReveal variant="fadeRight" delay={0.1}>
            <div className="mobile-phone-wrap mobile-phone-wrap--right">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              >
                <PhoneFrame className="phone-frame--cyan">
                  <AppScreen2 />
                </PhoneFrame>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.2}>
          <div className="mobile-tech-strip">
            {['Flutter', 'React Native', 'Swift', 'Kotlin', 'Firebase', 'App Store', 'Play Store'].map((tech) => (
              <div key={tech} className="mobile-tech-chip">{tech}</div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
