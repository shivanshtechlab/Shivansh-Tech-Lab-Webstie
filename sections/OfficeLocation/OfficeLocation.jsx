'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import './OfficeLocation.css';

const offices = [
  {
    id: 1,
    city: 'Kolkata',
    country: 'India',
    flag: '🇮🇳',
    label: 'HQ',
    address: '34/1 Ravi Sudha Apartment, Near Post Office, Dum Dum, Kolkata 700030, West Bengal',
    phone: '+91 79917 18363',
    email: 'hello@shivanshtechlab.com',
    color: '#6C63FF',
    // Approximate position on the world map SVG viewBox 0 0 900 400
    mapX: 66,
    mapY: 34,
  },
];

// Simplified world map paths
const landPaths = [
  // North America
  "M 50 80 L 80 70 L 120 65 L 170 60 L 200 70 L 210 90 L 220 110 L 200 130 L 180 145 L 160 150 L 140 160 L 120 175 L 100 170 L 80 155 L 70 140 L 55 130 L 45 115 L 40 95 Z",
  // South America
  "M 145 175 L 175 165 L 200 175 L 215 200 L 220 230 L 215 260 L 200 285 L 180 295 L 165 285 L 150 265 L 140 240 L 138 215 L 140 190 Z",
  // Europe
  "M 430 55 L 470 45 L 510 50 L 530 65 L 520 80 L 500 90 L 480 95 L 460 90 L 440 80 L 425 70 Z",
  // Africa
  "M 455 100 L 490 95 L 520 105 L 540 130 L 545 165 L 540 205 L 525 235 L 505 255 L 480 260 L 455 250 L 435 225 L 425 195 L 425 160 L 430 130 L 440 110 Z",
  // Asia
  "M 530 50 L 600 35 L 680 30 L 760 35 L 810 50 L 830 70 L 820 100 L 790 120 L 760 130 L 720 135 L 680 130 L 640 125 L 600 120 L 560 115 L 535 100 L 520 80 L 525 60 Z",
  // Australia
  "M 740 230 L 790 220 L 830 230 L 845 255 L 840 280 L 820 295 L 790 300 L 760 290 L 740 270 L 732 250 Z",
  // Greenland
  "M 300 25 L 340 20 L 370 30 L 375 50 L 360 65 L 335 68 L 310 60 L 295 45 Z",
  // India
  "M 600 110 L 640 100 L 660 115 L 655 145 L 640 165 L 620 170 L 600 155 L 590 135 L 595 118 Z",
  // Japan
  "M 800 75 L 820 70 L 830 80 L 825 95 L 810 100 L 798 88 Z",
  // SE Asia
  "M 700 140 L 740 130 L 760 145 L 755 165 L 735 175 L 710 165 L 700 150 Z",
];

export default function OfficeLocation() {
  const [activeId, setActiveId] = useState(1);
  const active = offices.find(o => o.id === activeId);

  return (
    <section className="office-section">
      <div className="office-section__bg">
        <div className="office-section__glow office-section__glow--1" />
        <div className="office-section__glow office-section__glow--2" />
      </div>

      <div className="container">
        <ScrollReveal>
          <SectionTitle
            badge="LOCATION"
            title="Find Us in Kolkata"
            subtitle="Headquartered in Kolkata, India, and working with clients around the world — wherever you are, we're ready to collaborate in your timezone."
          />
        </ScrollReveal>

        {/* Map */}
        <ScrollReveal variant="scaleUp" delay={0.1}>
          <div className="office-map">
            <svg
              className="office-map__svg"
              viewBox="0 0 900 400"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <radialGradient id="mapGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(108,99,255,0.06)" />
                  <stop offset="100%" stopColor="rgba(108,99,255,0.01)" />
                </radialGradient>
                <filter id="glow-filter">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Ocean background */}
              <rect width="900" height="400" fill="rgba(16,21,34,0.5)" rx="16" />

              {/* Grid lines */}
              {[1,2,3,4,5,6].map(i => (
                <line key={`h${i}`} x1="0" y1={i * 60} x2="900" y2={i * 60}
                  stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              ))}
              {[1,2,3,4,5,6,7,8,9,10,11,12].map(i => (
                <line key={`v${i}`} x1={i * 75} y1="0" x2={i * 75} y2="400"
                  stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              ))}

              {/* Land masses */}
              {landPaths.map((d, i) => (
                <path
                  key={i}
                  d={d}
                  fill="rgba(108,99,255,0.12)"
                  stroke="rgba(108,99,255,0.2)"
                  strokeWidth="0.75"
                />
              ))}

              {/* Office dots */}
              {offices.map((office) => {
                const cx = (office.mapX / 100) * 900;
                const cy = (office.mapY / 100) * 400;
                const isActive = office.id === activeId;

                return (
                  <g
                    key={office.id}
                    className="office-map__pin-group"
                    onClick={() => setActiveId(office.id)}
                    style={{ cursor: 'pointer' }}
                    filter={isActive ? 'url(#glow-filter)' : undefined}
                  >
                    {/* Pulse ring */}
                    {isActive && (
                      <>
                        <circle cx={cx} cy={cy} r="20" fill="none" stroke={office.color} strokeWidth="1" opacity="0.4"
                          className="office-map__ring" />
                        <circle cx={cx} cy={cy} r="30" fill="none" stroke={office.color} strokeWidth="0.5" opacity="0.2"
                          className="office-map__ring office-map__ring--2" />
                      </>
                    )}
                    {/* Main dot */}
                    <circle
                      cx={cx} cy={cy} r={isActive ? 8 : 6}
                      fill={office.color}
                      opacity={isActive ? 1 : 0.5}
                      className="office-map__dot"
                    />
                    {/* Inner core */}
                    <circle cx={cx} cy={cy} r={isActive ? 4 : 2.5} fill="white" opacity={isActive ? 1 : 0.7} />

                    {/* Label */}
                    <text
                      x={cx}
                      y={cy - 14}
                      textAnchor="middle"
                      fill={isActive ? office.color : 'rgba(255,255,255,0.4)'}
                      fontSize="8"
                      fontWeight="700"
                      fontFamily="Space Grotesk, sans-serif"
                      letterSpacing="0.05em"
                    >
                      {office.city}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Map overlay glow */}
            <div className="office-map__overlay" style={{ '--active-color': active?.color }} />
          </div>
        </ScrollReveal>

        {/* Office Cards */}
        <div className="office-cards">
          {offices.map((office, i) => (
            <ScrollReveal key={office.id} variant="fadeUp" delay={i * 0.1}>
              <button
                className={`office-card ${office.id === activeId ? 'office-card--active' : ''}`}
                onClick={() => setActiveId(office.id)}
                style={{ '--office-color': office.color }}
              >
                <div className="office-card__glow" />
                <div className="office-card__header">
                  <span className="office-card__flag">{office.flag}</span>
                  <div className="office-card__titles">
                    <span className="office-card__city">{office.city}</span>
                    <span className="office-card__country">{office.country}</span>
                  </div>
                  <span className="office-card__label" style={{ color: office.color, borderColor: `${office.color}40`, background: `${office.color}10` }}>
                    {office.label}
                  </span>
                </div>

                <AnimatePresence>
                  {office.id === activeId && (
                    <motion.div
                      className="office-card__details"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="office-card__detail">
                        <span className="office-card__detail-icon">📍</span>
                        <span>{office.address}</span>
                      </div>
                      <div className="office-card__detail">
                        <span className="office-card__detail-icon">📞</span>
                        <a href={`tel:${office.phone}`} className="office-card__detail-link">{office.phone}</a>
                      </div>
                      <div className="office-card__detail">
                        <span className="office-card__detail-icon">✉</span>
                        <a href={`mailto:${office.email}`} className="office-card__detail-link">{office.email}</a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="office-card__indicator" style={{ background: office.color }} />
              </button>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
