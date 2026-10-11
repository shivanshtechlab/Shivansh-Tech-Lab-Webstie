'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import { erpModules } from '../../data/erpModules';
import { erpScreens } from './erpScreens';
import './ERPModules.css';

const ICON_PATHS = {
  box: ['M21 8 12 3 3 8v8l9 5 9-5z', 'M3 8l9 5 9-5', 'M12 13v8'],
  wallet: ['M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5', 'M16 14h.01'],
  users: ['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', 'M22 21v-2a4 4 0 0 0-3-3.87', 'M16 3.13a4 4 0 0 1 0 7.75'],
  cart: ['M3 3h2l2.4 12.2a2 2 0 0 0 2 1.6h9.2a2 2 0 0 0 2-1.6L22 7H6', 'M10 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2z', 'M19 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2z'],
  trending: ['M22 7l-8.5 8.5-5-5L2 17', 'M16 7h6v6'],
  factory: ['M2 20V9l6 4V9l6 4V4h4l2 16z', 'M2 20h20'],
  truck: ['M14 17V5H2v12h2', 'M14 9h4l4 4v4h-2', 'M9 17h6', 'M6.5 19.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4z', 'M17.5 19.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4z'],
  pie: ['M21.2 15.9A10 10 0 1 1 8 2.8', 'M22 12A10 10 0 0 0 12 2v10z'],
  grid: ['M4 4h6v6H4z', 'M14 4h6v6h-6z', 'M4 14h6v6H4z', 'M14 14h6v6h-6z'],
  layers: ['M12 2 2 7l10 5 10-5z', 'M2 17l10 5 10-5', 'M2 12l10 5 10-5'],
  swap: ['M16 3l4 4-4 4', 'M20 7H4', 'M8 21l-4-4 4-4', 'M4 17h16'],
  refresh: ['M21 12a9 9 0 1 1-3-6.7L21 8', 'M21 3v5h-5'],
  file: ['M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z', 'M14 2v6h6', 'M8 13h8', 'M8 17h5'],
  book: ['M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5z', 'M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5'],
  arrowUp: ['M7 17 17 7', 'M7 7h10v10'],
  arrowDown: ['M17 7 7 17', 'M17 17H7V7'],
  percent: ['M19 5 5 19', 'M6.5 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z', 'M17.5 20a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z'],
  clock: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z', 'M12 6v6l4 2'],
  calendar: ['M3 6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', 'M16 2v4', 'M8 2v4', 'M3 10h18'],
  star: ['M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z'],
  building: ['M3 21h18', 'M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16', 'M9 7h1', 'M14 7h1', 'M9 11h1', 'M14 11h1', 'M10 21v-4h4v4'],
  check: ['M20 6 9 17l-5-5'],
  mail: ['M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', 'M22 6l-10 7L2 6'],
  receipt: ['M4 2v20l3-2 3 2 2-2 2 2 3-2 3 2V2l-3 2-3-2-2 2-2-2-3 2z', 'M8 9h8', 'M8 13h6'],
  clipboard: ['M9 2h6a1 1 0 0 1 1 1v2H8V3a1 1 0 0 1 1-1z', 'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2', 'M9 14l2 2 4-4'],
  shield: ['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', 'M9 12l2 2 4-4'],
  settings: ['M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', 'M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z'],
  route: ['M6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z', 'M18 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4z', 'M8 17h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16'],
  pin: ['M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z', 'M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'],
  target: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z', 'M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z', 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z'],
  database: ['M12 8c4.4 0 8-1.3 8-3s-3.6-3-8-3-8 1.3-8 3 3.6 3 8 3z', 'M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5', 'M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3'],
  bell: ['M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9', 'M10.3 21a1.94 1.94 0 0 0 3.4 0'],
  search: ['M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z', 'M21 21l-4.3-4.3'],
  plus: ['M12 5v14', 'M5 12h14'],
};

function Icon({ name, size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICON_PATHS[name].map((d) => <path key={d} d={d} />)}
    </svg>
  );
}

const PALETTE = ['#6C63FF', '#00D9FF', '#F472B6', '#FBBF24', '#00E676', '#A78BFA'];
const segmentColors = (color) => [color, ...PALETTE.filter((c) => c !== color)];

function toPoints(values, w, h, max) {
  const step = w / (values.length - 1);
  return values.map((v, i) => [i * step, h - (v / max) * h]);
}

const linePath = (pts) => pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');

function Sparkline({ values, color }) {
  const pts = toPoints(values, 60, 18, 100);
  return (
    <svg className="erp-kpi__spark" viewBox="0 -2 60 22" preserveAspectRatio="none" aria-hidden="true">
      <path d={linePath(pts)} fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round"
        strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/* ── Widgets ─────────────────────────────────────────────────────────────── */

function AreaChart({ widget, color, uid }) {
  const W = 300;
  const H = 110;
  const max = 100;
  const { series, labels, forecastFrom } = widget;
  return (
    <div className="erp-w-area">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="erp-w-area__svg" aria-hidden="true">
        <defs>
          <linearGradient id={`${uid}-fill`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((f) => (
          <line key={f} x1="0" x2={W} y1={H * f} y2={H * f} className="erp-w-area__grid" vectorEffect="non-scaling-stroke" />
        ))}
        {series.map((s, si) => {
          const pts = toPoints(s.values, W, H, max);
          const solid = forecastFrom ? pts.slice(0, forecastFrom + 1) : pts;
          const stroke = s.muted ? 'rgba(255,255,255,0.35)' : color;
          return (
            <g key={s.name}>
              {si === 0 && (
                <path d={`${linePath(solid)} L${solid[solid.length - 1][0]} ${H} L0 ${H} Z`} fill={`url(#${uid}-fill)`} />
              )}
              <path d={linePath(solid)} fill="none" stroke={stroke} strokeWidth="2.2" strokeLinecap="round"
                strokeLinejoin="round" vectorEffect="non-scaling-stroke"
                className={s.muted ? undefined : 'erp-anim-draw'}
                strokeDasharray={s.muted ? '5 5' : undefined} />
              {forecastFrom && (
                <path d={linePath(pts.slice(forecastFrom))} fill="none" stroke={color} strokeWidth="2.2"
                  strokeDasharray="4 5" strokeLinecap="round" vectorEffect="non-scaling-stroke" opacity="0.8" />
              )}
            </g>
          );
        })}
      </svg>
      <div className="erp-w-axis">
        {labels.map((l, i) => (
          <span key={i} className={forecastFrom && i > forecastFrom ? 'erp-w-axis--future' : ''}>{l}</span>
        ))}
      </div>
      <div className="erp-w-legend">
        {series.map((s) => (
          <span key={s.name}>
            <i style={{ background: s.muted ? 'rgba(255,255,255,0.35)' : color }} />{s.name}
          </span>
        ))}
        {forecastFrom && <span><i className="erp-w-legend__dash" style={{ borderColor: color }} />Forecast</span>}
      </div>
    </div>
  );
}

function BarChart({ widget, color }) {
  const { values, labels, target, highlight } = widget;
  return (
    <div className="erp-w-bars">
      <div className="erp-w-bars__plot">
        <div className="erp-w-bars__target" style={{ bottom: `${target}%` }}><span>Target</span></div>
        {values.map((v, i) => (
          <div key={i} className="erp-w-bars__col">
            <div
              className={`erp-w-bars__bar erp-anim-grow${i === highlight ? ' erp-w-bars__bar--hl' : ''}`}
              style={{
                height: `${v}%`,
                animationDelay: `${i * 0.035}s`,
                background: i === highlight
                  ? `linear-gradient(to top, ${color}, #ffffff)`
                  : `linear-gradient(to top, ${color}55, ${color}cc)`,
              }}
            />
          </div>
        ))}
      </div>
      <div className="erp-w-axis">
        {labels.map((l, i) => <span key={i}>{l}</span>)}
      </div>
    </div>
  );
}

function Donut({ widget, color }) {
  const colors = segmentColors(color);
  const starts = widget.segments.map((_, i) =>
    widget.segments.slice(0, i).reduce((sum, s) => sum + s.value, 0));
  return (
    <div className="erp-w-donut">
      <div className="erp-w-donut__chart">
        <svg viewBox="0 0 42 42" aria-hidden="true">
          <circle cx="21" cy="21" r="15.9" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
          {widget.segments.map((s, i) => (
            <circle key={s.label} cx="21" cy="21" r="15.9" fill="none" stroke={colors[i]} strokeWidth="5"
              pathLength="100" strokeDasharray={`${s.value - 1.2} ${100 - s.value + 1.2}`}
              strokeDashoffset={-starts[i]} transform="rotate(-90 21 21)" />
          ))}
        </svg>
        <div className="erp-w-donut__center">
          <strong>{widget.center[0]}</strong>
          <span>{widget.center[1]}</span>
        </div>
      </div>
      <ul className="erp-w-donut__legend">
        {widget.segments.map((s, i) => (
          <li key={s.label}>
            <i style={{ background: colors[i] }} />
            <span>{s.label}</span>
            <b>{s.value}%</b>
          </li>
        ))}
      </ul>
    </div>
  );
}

const TONE_COLORS = { low: '#FBBF24', critical: '#FF5C7A' };

function ProgressList({ widget, color }) {
  return (
    <ul className={`erp-w-progress${widget.compact ? ' erp-w-progress--compact' : ''}`}>
      {widget.items.map((it, i) => {
        const c = TONE_COLORS[it.tone] || color;
        return (
          <li key={it.title}>
            <div className="erp-w-progress__row">
              <div className="erp-w-progress__text">
                <span className="erp-w-progress__title">{it.title}</span>
                {it.sub && <span className="erp-w-progress__sub">{it.sub}</span>}
              </div>
              <span className="erp-w-progress__right" style={it.tone !== 'ok' ? { color: c } : undefined}>
                {it.tone === 'low' && <em className="erp-pill erp-pill--warn">Low</em>}
                {it.tone === 'critical' && it.right !== 'Blocked' && <em className="erp-pill erp-pill--bad">Critical</em>}
                {it.right}
              </span>
            </div>
            <div className="erp-w-progress__track">
              <div className="erp-w-progress__fill erp-anim-grow-x"
                style={{ width: `${it.value}%`, background: `linear-gradient(90deg, ${c}88, ${c})`, animationDelay: `${i * 0.06}s` }} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function List({ widget, color }) {
  return (
    <ul className="erp-w-list">
      {widget.items.map((it, i) => (
        <li key={it.title}>
          <span
            className={`erp-w-list__badge${widget.people ? ' erp-w-list__badge--round' : ''}`}
            style={{ background: `linear-gradient(135deg, ${segmentColors(color)[i % 4]}, ${segmentColors(color)[(i + 1) % 4]})` }}
          >
            {it.badge}
          </span>
          <div className="erp-w-list__text">
            <span className="erp-w-list__title">{it.title}</span>
            <span className="erp-w-list__sub">{it.sub}</span>
          </div>
          <div className="erp-w-list__end">
            {it.value && <span className="erp-w-list__value">{it.value}</span>}
            {it.status && <em className={`erp-pill erp-pill--${it.status[1]}`}>{it.status[0]}</em>}
          </div>
        </li>
      ))}
    </ul>
  );
}

function Kanban({ widget, color }) {
  return (
    <div className="erp-w-kanban">
      {widget.stages.map((stage, si) => (
        <div key={stage.label} className="erp-w-kanban__col">
          <div className="erp-w-kanban__head">
            <span className="erp-w-kanban__dot" style={{ background: segmentColors(color)[si] }} />
            {stage.label}
            <b>{stage.count}</b>
          </div>
          {stage.cards.map(([id, vendor, amt]) => (
            <div key={id} className="erp-w-kanban__card" style={{ borderTopColor: segmentColors(color)[si] }}>
              <span className="erp-w-kanban__id">{id}</span>
              <span className="erp-w-kanban__vendor">{vendor}</span>
              <span className="erp-w-kanban__amt">{amt}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function Gauge({ widget, color, uid }) {
  return (
    <div className="erp-w-gauge">
      <div className="erp-w-gauge__chart">
        <svg viewBox="0 0 120 68" aria-hidden="true">
          <defs>
            <linearGradient id={`${uid}-gauge`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FF5C7A" />
              <stop offset="50%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor={color} />
            </linearGradient>
          </defs>
          <path d="M10 60 A50 50 0 0 1 110 60" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="10" strokeLinecap="round" />
          <path d="M10 60 A50 50 0 0 1 110 60" fill="none" stroke={`url(#${uid}-gauge)`} strokeWidth="10"
            strokeLinecap="round" pathLength="100" strokeDasharray={`${widget.value} 100`} />
        </svg>
        <div className="erp-w-gauge__val">
          <strong>{widget.value}%</strong>
          <span>{widget.label} · World-class</span>
        </div>
      </div>
      <ul className="erp-w-gauge__stats">
        {widget.stats.map(([label, val]) => (
          <li key={label}><span>{label}</span><b>{val}</b></li>
        ))}
      </ul>
    </div>
  );
}

function Timeline({ widget, color }) {
  const last = widget.steps.length - 1;
  return (
    <ul className="erp-w-timeline">
      {widget.shipments.map((s) => (
        <li key={s.id}>
          <div className="erp-w-timeline__top">
            <span className="erp-w-timeline__id">{s.id}</span>
            <span className="erp-w-timeline__route">{s.route}</span>
            <em className={`erp-pill erp-pill--${s.status[1]}`}>{s.status[0]}</em>
          </div>
          <div className="erp-w-timeline__track">
            <div className="erp-w-timeline__line">
              <div className="erp-w-timeline__line-fill erp-anim-grow-x" style={{ width: `${(s.step / last) * 100}%`, background: color }} />
            </div>
            {widget.steps.map((step, i) => (
              <span
                key={step}
                className={`erp-w-timeline__node${i <= s.step ? ' erp-w-timeline__node--done' : ''}${i === s.step && s.step < last ? ' erp-w-timeline__node--current' : ''}`}
                style={{ left: `${(i / last) * 100}%`, '--node-color': color }}
              />
            ))}
          </div>
          <div className="erp-w-timeline__labels">
            <span>{widget.steps[s.step]}</span>
            <span>{s.eta}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

const WIDGETS = {
  area: AreaChart,
  bars: BarChart,
  donut: Donut,
  progress: ProgressList,
  list: List,
  kanban: Kanban,
  gauge: Gauge,
  timeline: Timeline,
};

function Widget({ widget, color, uid }) {
  const Body = WIDGETS[widget.type];
  return (
    <div className="erp-widget">
      <div className="erp-widget__head">
        <span className="erp-widget__title">{widget.title}</span>
        {widget.meta && <span className="erp-widget__meta">{widget.meta}</span>}
      </div>
      <Body widget={widget} color={color} uid={uid} />
    </div>
  );
}

/* ── Mockup window ───────────────────────────────────────────────────────── */

function ERPMockup({ module }) {
  const screen = erpScreens[module.id];
  const color = module.color;
  const slug = module.title.toLowerCase().replace(/[^a-z]+/g, '-');

  return (
    <div className="erp-mockup" style={{ '--mod-color': color }}>
      <div className="erp-mockup__header">
        <div className="erp-mockup__dots"><span /><span /><span /></div>
        <div className="erp-mockup__url">
          <span className="erp-mockup__lock" aria-hidden="true">●</span>
          erp.shivanshtech.app/<b>{slug}</b>
        </div>
        <div className="erp-mockup__header-icons" aria-hidden="true">
          <Icon name="bell" size={13} />
          <span className="erp-mockup__avatar">ST</span>
        </div>
      </div>

      <div className="erp-mockup__body">
        <aside className="erp-mockup__sidebar">
          <div className="erp-mockup__brand">
            <span className="erp-mockup__brand-logo"><Icon name={module.iconName} size={12} /></span>
            <span>{module.title.split(' ')[0]}</span>
          </div>
          {screen.nav.map(([label, icon], i) => (
            <div key={label} className={`erp-mock-nav${i === 0 ? ' erp-mock-nav--active' : ''}`}>
              <Icon name={icon} size={13} />
              <span>{label}</span>
            </div>
          ))}
        </aside>

        <AnimatePresence mode="wait">
          <motion.div
            key={module.id}
            className="erp-mockup__main"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="erp-page-head">
              <div>
                <div className="erp-page-head__crumb">ERP / {module.title}</div>
                <div className="erp-page-head__title">{module.title}</div>
              </div>
              <div className="erp-page-head__actions">
                <span className="erp-page-head__search"><Icon name="search" size={12} />Search…</span>
                <span className="erp-page-head__btn"><Icon name="plus" size={12} />{screen.action}</span>
              </div>
            </div>

            <div className="erp-kpis">
              {screen.kpis.map((kpi) => (
                <div key={kpi.label} className="erp-kpi">
                  <div className="erp-kpi__label">{kpi.label}</div>
                  <div className="erp-kpi__row">
                    <span className="erp-kpi__val">{kpi.value}</span>
                    <Sparkline values={kpi.spark} color={kpi.tone === 'bad' ? '#FF5C7A' : color} />
                  </div>
                  <div className={`erp-kpi__delta erp-kpi__delta--${kpi.tone}`}>{kpi.delta}</div>
                </div>
              ))}
            </div>

            <div className="erp-widgets">
              <Widget widget={screen.primary} color={color} uid={`erp${module.id}a`} />
              <Widget widget={screen.secondary} color={color} uid={`erp${module.id}b`} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
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
            subtitle="A modular ERP system built for the way modern businesses operate — scalable, integrated, and intelligent."
          />
        </ScrollReveal>

        <div className="erp-layout">
          <ScrollReveal variant="fadeLeft">
            <div className="erp-modules-list" role="tablist" aria-label="ERP modules">
              <div className="erp-modules-list__label">Select Module</div>
              {erpModules.map((mod) => {
                const active = selected.id === mod.id;
                return (
                  <motion.button
                    key={mod.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    className={`erp-module-btn${active ? ' erp-module-btn--active' : ''}`}
                    style={{ '--mod-color': mod.color }}
                    onClick={() => setSelected(mod)}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="erp-module-btn__icon"><Icon name={mod.iconName} size={18} /></span>
                    <div className="erp-module-btn__text">
                      <span className="erp-module-btn__title">{mod.title}</span>
                      <span className="erp-module-btn__desc">{mod.description}</span>
                    </div>
                    <span className="erp-module-btn__arrow" aria-hidden="true">→</span>
                    {active && (
                      <motion.div className="erp-module-btn__indicator" layoutId="erp-indicator" />
                    )}
                  </motion.button>
                );
              })}
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
