'use client'

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import GlassCard from '../../components/GlassCard/GlassCard';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import { useCountUp } from '../../hooks/useCountUp';
import './About.css';

const highlights = [
  { icon: 'ðŸ“…', label: 'Founded', value: '2015', sub: 'A decade of excellence' },
  { icon: 'ðŸŒ', label: 'Global Reach', value: '30+', sub: 'Countries served' },
  { icon: 'ðŸ’¡', label: 'Innovation', value: '#1', sub: 'Client-first mindset' },
];

const timeline = [
  { year: '2015', title: 'Founded', desc: 'Started with a bold vision to transform digital experiences globally.' },
  { year: '2019', title: 'Global Expansion', desc: 'Expanded to 20+ countries, serving Fortune 500 companies across 5 continents.' },
  { year: '2022', title: 'AI Pioneers', desc: 'Launched our AI division, integrating machine learning into every solution we deliver.' },
  { year: '2025', title: 'Industry Leaders', desc: 'Recognized as a top 10 global software company, with 200+ team members worldwide.' },
];

const stats = [
  { value: 200, suffix: '+', label: 'Projects Delivered' },
  { value: 50, suffix: '+', label: 'Expert Engineers' },
  { value: 30, suffix: '+', label: 'Countries Served' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
];

function StatCard({ stat }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const { count, startCount } = useCountUp(stat.value, 2200);

  useEffect(() => {
    if (isInView) startCount();
  }, [isInView]);

  return (
    <div ref={ref} className="about__stat-card">
      <div className="about__stat-value">
        {count}{stat.suffix}
      </div>
      <div className="about__stat-label">{stat.label}</div>
    </div>
  );
}

export default function About() {
  const [activeYear, setActiveYear] = useState('2025');

  return (
    <section className="about" id="about">
      {/* Aurora background */}
      <div className="about__aurora" aria-hidden="true" />
      <div className="about__glow about__glow--left" aria-hidden="true" />
      <div className="about__glow about__glow--right" aria-hidden="true" />

      <div className="about__container">
        <ScrollReveal variant="fadeUp">
          <SectionTitle
            badge="WHO WE ARE"
            title={<>Building the Future of<br /><span>Digital Innovation</span></>}
            subtitle="We are a team of visionary engineers, designers, and strategists united by one mission: crafting digital products that move the world forward."
          />
        </ScrollReveal>

        <div className="about__layout">
          {/* LEFT: Text + highlights + timeline */}
          <div className="about__left">
            <ScrollReveal variant="fadeLeft" delay={0.1}>
              <p className="about__body">
                Since 2015, Shivansh Tech Lab has been at the forefront of digital transformation â€” helping startups disrupt industries and enterprises evolve with purpose. We don't just build software; we craft experiences that users love and businesses rely on.
              </p>
              <p className="about__body">
                From AI-powered platforms to seamless mobile apps, from enterprise ERP systems to dazzling SaaS products â€” every line of code we write is driven by precision, creativity, and an unwavering commitment to quality.
              </p>
            </ScrollReveal>

            {/* Highlights */}
            <div className="about__highlights">
              {highlights.map((h, i) => (
                <ScrollReveal key={h.label} variant="fadeUp" delay={0.15 + i * 0.1}>
                  <GlassCard className="about__highlight-card">
                    <span className="about__highlight-icon">{h.icon}</span>
                    <div>
                      <div className="about__highlight-value">{h.value}</div>
                      <div className="about__highlight-label">{h.label}</div>
                      <div className="about__highlight-sub">{h.sub}</div>
                    </div>
                  </GlassCard>
                </ScrollReveal>
              ))}
            </div>

            {/* Timeline */}
            <ScrollReveal variant="fadeUp" delay={0.2}>
              <div className="about__timeline">
                <div className="about__timeline-line" />
                {timeline.map((item, i) => (
                  <motion.div
                    key={item.year}
                    className={`about__timeline-item ${activeYear === item.year ? 'about__timeline-item--active' : ''}`}
                    onClick={() => setActiveYear(item.year)}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="about__timeline-dot">
                      <div className="about__timeline-dot-inner" />
                    </div>
                    <div className="about__timeline-content">
                      <span className="about__timeline-year">{item.year}</span>
                      <h4 className="about__timeline-title">{item.title}</h4>
                      <p className="about__timeline-desc">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* RIGHT: Floating stat cards */}
          <div className="about__right">
            <ScrollReveal variant="fadeRight" delay={0.2}>
              <div className="about__visual">
                {/* Stats grid */}
                <div className="about__stats-grid">
                  {stats.map((stat, i) => (
                    <StatCard key={stat.label} stat={stat} />
                  ))}
                </div>

                {/* Floating decorative cards */}
                <div className="about__deco-card about__deco-card--1">
                  <span className="about__deco-icon">ðŸš€</span>
                  <div>
                    <div className="about__deco-title">Latest Deploy</div>
                    <div className="about__deco-sub">Production â€” 2m ago</div>
                  </div>
                  <span className="about__deco-status about__deco-status--live">LIVE</span>
                </div>

                <div className="about__deco-card about__deco-card--2">
                  <span className="about__deco-icon">â­</span>
                  <div>
                    <div className="about__deco-title">Client Review</div>
                    <div className="about__deco-stars">â˜…â˜…â˜…â˜…â˜…</div>
                  </div>
                </div>

                <div className="about__deco-card about__deco-card--3">
                  <div className="about__deco-orb about__deco-orb--a" />
                  <div className="about__deco-orb about__deco-orb--b" />
                  <div className="about__deco-inner">
                    <div className="about__deco-ring" />
                    <span className="about__deco-center-icon">ðŸ’Ž</span>
                  </div>
                  <div className="about__deco-text">
                    <div className="about__deco-title">Premium Quality</div>
                    <div className="about__deco-sub">Every. Single. Time.</div>
                  </div>
                </div>

                {/* Large decorative orb */}
                <div className="about__bg-orb about__bg-orb--a" aria-hidden="true" />
                <div className="about__bg-orb about__bg-orb--b" aria-hidden="true" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
