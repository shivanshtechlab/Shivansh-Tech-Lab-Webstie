'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';
import appDevBg from '../../assets/appDev_bg.png';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import { seededRandom, round } from '../../utils/helpers';
import './MobileApp.css';

const FEATURES = [
  { icon: '⚡', title: 'Cross-Platform', desc: 'One codebase for iOS and Android with native performance.' },
  { icon: '🚀', title: 'Native Performance', desc: '60fps animations, hardware acceleration, smooth as butter.' },
  { icon: '📡', title: 'Offline Support', desc: 'Full functionality even without an internet connection.' },
  { icon: '🔔', title: 'Push Notifications', desc: 'Re-engage users with smart, targeted push notifications.' },
];

// Seeded so SSR and client hydration render identical particles.
const rand = seededRandom(20);
const PARTICLES = Array.from({ length: 20 }, () => ({
  x: round(rand() * 100),
  y: round(rand() * 100),
  size: round(2 + rand() * 4),
  duration: round(4 + rand() * 4),
  delay: round(rand() * 4),
}));

const ICON_PATHS = {
  bell: ['M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9', 'M10.3 21a1.94 1.94 0 0 0 3.4 0'],
  send: ['M7 17 17 7', 'M7 7h10v10'],
  receive: ['M17 7 7 17', 'M17 17H7V7'],
  scan: ['M3 7V5a2 2 0 0 1 2-2h2', 'M17 3h2a2 2 0 0 1 2 2v2', 'M21 17v2a2 2 0 0 1-2 2h-2', 'M7 21H5a2 2 0 0 1-2-2v-2', 'M7 12h10'],
  grid: ['M4 4h6v6H4z', 'M14 4h6v6h-6z', 'M4 14h6v6H4z', 'M14 14h6v6h-6z'],
  home: ['M3 10.5 12 3l9 7.5', 'M5 9.5V20h14V9.5'],
  chart: ['M3 3v18h18', 'M8 16v-4', 'M13 16V8', 'M18 16v-6'],
  card: ['M2 7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z', 'M2 10h20'],
  user: ['M20 21a8 8 0 0 0-16 0', 'M12 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10z'],
  activity: ['M22 12h-4l-3 9L9 3l-3 9H2'],
  heart: ['M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z'],
  dumbbell: ['M6.5 6.5v11', 'M17.5 6.5v11', 'M3 9v6', 'M21 9v6', 'M6.5 12h11'],
};

function Icon({ name, size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICON_PATHS[name].map((d) => <path key={d} d={d} />)}
    </svg>
  );
}

function StatusBar() {
  return (
    <div className="phone-status">
      <span className="phone-status__time">9:41</span>
      <span className="phone-status__icons" aria-hidden="true">
        <svg width="16" height="10" viewBox="0 0 16 10" fill="currentColor">
          <rect x="0" y="7" width="3" height="3" rx="0.6" />
          <rect x="4.3" y="5" width="3" height="5" rx="0.6" />
          <rect x="8.6" y="2.5" width="3" height="7.5" rx="0.6" />
          <rect x="12.9" y="0" width="3" height="10" rx="0.6" />
        </svg>
        <svg width="22" height="11" viewBox="0 0 22 11" fill="none">
          <rect x="0.5" y="0.5" width="18" height="10" rx="3" stroke="currentColor" opacity="0.5" />
          <rect x="2" y="2" width="13" height="7" rx="1.6" fill="currentColor" />
          <rect x="19.8" y="3.5" width="1.6" height="4" rx="0.8" fill="currentColor" opacity="0.5" />
        </svg>
      </span>
    </div>
  );
}

function PhoneFrame({ children, className = '' }) {
  return (
    <div className={`phone-frame ${className}`}>
      <span className="phone-frame__btn phone-frame__btn--action" aria-hidden="true" />
      <span className="phone-frame__btn phone-frame__btn--vol-up" aria-hidden="true" />
      <span className="phone-frame__btn phone-frame__btn--vol-down" aria-hidden="true" />
      <span className="phone-frame__btn phone-frame__btn--power" aria-hidden="true" />
      <div className="phone-frame__screen">
        <div className="phone-frame__island" aria-hidden="true" />
        <StatusBar />
        {children}
        <div className="phone-frame__home-bar" aria-hidden="true" />
        <div className="phone-frame__glare" aria-hidden="true" />
      </div>
    </div>
  );
}

function TabBar({ items, active }) {
  return (
    <div className="app-tabbar">
      {items.map((name, i) => (
        <span key={name} className={`app-tabbar__item${i === active ? ' app-tabbar__item--active' : ''}`}>
          <Icon name={name} size={15} />
        </span>
      ))}
    </div>
  );
}

const TRANSACTIONS = [
  { name: 'Netflix', meta: 'Subscription · Today', amt: '-$17.99', logo: 'N', bg: '#E50914', positive: false },
  { name: 'Salary Deposit', meta: 'Acme Corp · Yesterday', amt: '+$5,200', logo: '$', bg: '#10B981', positive: true },
  { name: 'Amazon', meta: 'Shopping · Mon', amt: '-$64.20', logo: 'a', bg: '#F59E0B', positive: false },
];

function AppScreen1() {
  return (
    <div className="app-screen app-screen--1">
      <div className="app-head">
        <div className="app-head__avatar">AM</div>
        <div className="app-head__text">
          <div className="app-head__sub">Good morning</div>
          <div className="app-head__title">Alex Morgan</div>
        </div>
        <div className="app-head__action">
          <Icon name="bell" size={13} />
          <span className="app-head__badge" />
        </div>
      </div>

      <div className="app-s1__card">
        <div className="app-s1__card-top">
          <span className="app-s1__card-label">Total Balance</span>
          <span className="app-s1__card-brand">VISA</span>
        </div>
        <div className="app-s1__card-val">$48,291<span>.50</span></div>
        <div className="app-s1__card-delta">▲ 2.4% this week</div>
        <svg className="app-s1__card-spark" viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 24 L14 20 L28 22 L42 13 L56 16 L70 8 L84 11 L100 3" fill="none" stroke="rgba(255,255,255,0.85)"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        </svg>
        <div className="app-s1__card-bottom">
          <span>•••• 4821</span>
          <span>09/29</span>
        </div>
      </div>

      <div className="app-s1__actions">
        {[
          { label: 'Send', icon: 'send' },
          { label: 'Receive', icon: 'receive' },
          { label: 'Scan', icon: 'scan' },
          { label: 'More', icon: 'grid' },
        ].map((a) => (
          <div key={a.label} className="app-s1__action">
            <span className="app-s1__action-icon"><Icon name={a.icon} size={14} /></span>
            <span className="app-s1__action-label">{a.label}</span>
          </div>
        ))}
      </div>

      <div className="app-section-head">
        <span>Recent Activity</span>
        <span className="app-section-head__link">See all</span>
      </div>
      <div className="app-s1__tx-list">
        {TRANSACTIONS.map((tx) => (
          <div key={tx.name} className="app-s1__tx">
            <span className="app-s1__tx-logo" style={{ background: tx.bg }}>{tx.logo}</span>
            <div className="app-s1__tx-info">
              <div className="app-s1__tx-name">{tx.name}</div>
              <div className="app-s1__tx-meta">{tx.meta}</div>
            </div>
            <div className={`app-s1__tx-amt${tx.positive ? ' app-s1__tx-amt--pos' : ''}`}>{tx.amt}</div>
          </div>
        ))}
      </div>

      <TabBar items={['home', 'chart', 'card', 'user']} active={0} />
    </div>
  );
}

const RINGS = [
  { r: 42, pct: 78, from: '#FF4D8D', to: '#FF8A4C', id: 'ringMove' },
  { r: 32, pct: 64, from: '#A3FF4D', to: '#22E39A', id: 'ringExercise' },
  { r: 22, pct: 88, from: '#22D3EE', to: '#6C63FF', id: 'ringStand' },
];

const WEEK = [55, 72, 48, 86, 64, 92, 40];

function AppScreen2() {
  return (
    <div className="app-screen app-screen--2">
      <div className="app-head">
        <div className="app-head__text">
          <div className="app-head__sub">Saturday, 11 Oct</div>
          <div className="app-head__title">Today&apos;s Activity</div>
        </div>
        <div className="app-head__avatar app-head__avatar--fit">SK</div>
      </div>

      <div className="app-s2__rings-card">
        <svg viewBox="0 0 100 100" className="app-s2__rings" aria-hidden="true">
          <defs>
            {RINGS.map((ring) => (
              <linearGradient key={ring.id} id={ring.id} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={ring.from} />
                <stop offset="100%" stopColor={ring.to} />
              </linearGradient>
            ))}
          </defs>
          {RINGS.map((ring) => (
            <g key={ring.id}>
              <circle cx="50" cy="50" r={ring.r} fill="none" stroke={ring.from} strokeOpacity="0.15" strokeWidth="8" />
              <circle cx="50" cy="50" r={ring.r} fill="none" stroke={`url(#${ring.id})`} strokeWidth="8"
                pathLength="100" strokeDasharray={`${ring.pct} 100`} strokeLinecap="round"
                transform="rotate(-90 50 50)" />
            </g>
          ))}
        </svg>
        <div className="app-s2__legend">
          {[
            { label: 'Move', val: '624', unit: '/800 kcal', color: '#FF4D8D' },
            { label: 'Exercise', val: '38', unit: '/60 min', color: '#22E39A' },
            { label: 'Stand', val: '10', unit: '/12 hr', color: '#22D3EE' },
          ].map((l) => (
            <div key={l.label} className="app-s2__legend-item">
              <span className="app-s2__legend-label" style={{ color: l.color }}>{l.label}</span>
              <span className="app-s2__legend-val">{l.val}<small>{l.unit}</small></span>
            </div>
          ))}
        </div>
      </div>

      <div className="app-s2__stats">
        {[
          { icon: 'heart', val: '72', unit: 'bpm', label: 'Heart Rate', tone: 'pink' },
          { icon: 'activity', val: '8,421', unit: '', label: 'Steps', tone: 'green' },
        ].map((s) => (
          <div key={s.label} className={`app-s2__stat app-s2__stat--${s.tone}`}>
            <span className="app-s2__stat-icon"><Icon name={s.icon} size={12} /></span>
            <div className="app-s2__stat-val">{s.val}<small>{s.unit}</small></div>
            <div className="app-s2__stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="app-s2__week">
        <div className="app-section-head app-section-head--flush">
          <span>This Week</span>
          <span className="app-section-head__link">5.2 km avg</span>
        </div>
        <div className="app-s2__week-bars">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
            <div key={i} className={`app-s2__week-col${i === 5 ? ' app-s2__week-col--today' : ''}`}>
              <div className="app-s2__week-track">
                <div className="app-s2__week-bar" style={{ height: `${WEEK[i]}%` }} />
              </div>
              <span className="app-s2__day">{d}</span>
            </div>
          ))}
        </div>
      </div>

      <TabBar items={['home', 'dumbbell', 'chart', 'user']} active={1} />
    </div>
  );
}

export default function MobileApp() {
  return (
    <section className="mobile-section" id="mobile">
      <div className="mobile-section__bg">
        <Image
          src={appDevBg}
          alt=""
          fill
          sizes="100vw"
          placeholder="blur"
          className="mobile-section__bg-img"
        />
        <div className="mobile-section__bg-overlay" />
        {PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            className="mobile-particle"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: `${p.size}px`, height: `${p.size}px` }}
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
