'use client'

import { useState, useRef, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import './WhyChooseUs.css';

const features = [
  {
    icon: 'ðŸš€',
    title: 'Lightning Fast Delivery',
    description: 'We execute with precision and speed. Our agile methodology ensures your product reaches market 40% faster than industry average.',
    stat: '40% faster',
    color: '#6C63FF',
  },
  {
    icon: 'ðŸ’Ž',
    title: 'Premium Quality Code',
    description: 'Every line of code is reviewed, tested, and optimized. We follow best practices and deliver solutions built to last a decade.',
    stat: '99.9% uptime',
    color: '#00D9FF',
  },
  {
    icon: 'ðŸ”’',
    title: 'Enterprise Security',
    description: 'Bank-grade security built into every layer. GDPR compliant, ISO-certified processes, and penetration-tested applications.',
    stat: 'ISO 27001',
    color: '#7C3AED',
  },
  {
    icon: 'ðŸ¤',
    title: 'Dedicated Support',
    description: 'Your success is our mission. A dedicated project manager and support team available around the clock, every day of the year.',
    stat: '24/7 support',
    color: '#00E676',
  },
  {
    icon: 'ðŸ“ˆ',
    title: 'Proven ROI',
    description: 'Our clients see an average 3x return on investment within 18 months. Data-driven decisions that directly impact your bottom line.',
    stat: '3x avg ROI',
    color: '#6C63FF',
  },
  {
    icon: 'ðŸŒ',
    title: 'Global Experience',
    description: 'Having served 50+ clients across 30 countries, we understand global markets and deliver culturally intelligent digital solutions.',
    stat: '30+ countries',
    color: '#00D9FF',
  },
];

function FeatureCard({ feature, index }) {
  const cardRef = useRef(null);
  const boundsRef = useRef(null);
  const rafRef = useRef(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const handleMouseEnter = useCallback(() => {
    if (!cardRef.current) return;
    boundsRef.current = cardRef.current.getBoundingClientRect();
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current || !boundsRef.current) return;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const { left, top, width, height } = boundsRef.current;
      const nx = ((e.clientX - left) / width) * 2 - 1;
      const ny = ((e.clientY - top) / height) * 2 - 1;
      cardRef.current.style.transform = `perspective(700px) rotateX(${-ny * 10}deg) rotateY(${nx * 10}deg) translateZ(12px)`;
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    if (cardRef.current) {
      cardRef.current.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
      cardRef.current.style.transform = '';
      setTimeout(() => {
        if (cardRef.current) cardRef.current.style.transition = '';
      }, 500);
    }
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="why__card-wrapper"
    >
      <div
        ref={cardRef}
        className="why__card"
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ '--card-color': feature.color }}
      >
        <div className="why__card-glow" aria-hidden="true" />
        <div className="why__card-border" aria-hidden="true" />

        <div className="why__card-icon-wrap">
          <span className="why__card-icon">{feature.icon}</span>
          <div className="why__card-icon-ring" />
        </div>

        <h3 className="why__card-title">{feature.title}</h3>
        <p className="why__card-desc">{feature.description}</p>

        <div className="why__card-stat">
          <span className="why__card-stat-dot" />
          {feature.stat}
        </div>
      </div>
    </motion.div>
  );
}

export default function WhyChooseUs() {
  return (
    <section className="why" id="why-choose-us">
      {/* Mesh gradient background */}
      <div className="why__mesh" aria-hidden="true" />
      <div className="why__glow why__glow--a" aria-hidden="true" />
      <div className="why__glow why__glow--b" aria-hidden="true" />

      <div className="why__container">
        <ScrollReveal variant="fadeUp">
          <SectionTitle
            badge="WHY NEXUS"
            title={<>Why <span>50+ Companies</span> Choose Us</>}
            subtitle="We combine technical excellence, creative thinking, and relentless dedication to deliver digital products that define industries."
          />
        </ScrollReveal>

        <div className="why__grid">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>

        {/* Bottom CTA band */}
        <ScrollReveal variant="fadeUp" delay={0.3}>
          <div className="why__bottom">
            <div className="why__bottom-inner">
              <div className="why__bottom-text">
                <span className="why__bottom-title">Ready to build something extraordinary?</span>
                <span className="why__bottom-sub">Join 50+ companies that trusted us with their vision</span>
              </div>
              <a href="#contact" className="why__bottom-btn">
                Start Your Project
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
