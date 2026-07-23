'use client'

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import { services } from '../../data/services';
import './Services.css';

function ServiceCard({ service, index }) {
  const cardRef = useRef(null);
  const boundsRef = useRef(null);
  const rafRef = useRef(null);

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
      cardRef.current.style.transform = `perspective(900px) rotateX(${-ny * 8}deg) rotateY(${nx * 8}deg) translateZ(10px)`;
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
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="srv__card-wrapper"
    >
      <div
        ref={cardRef}
        className="srv__card"
        style={{ '--srv-color': service.color, '--srv-gradient': service.gradient }}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Gradient border */}
        <div className="srv__card-grad-border" aria-hidden="true" />

        {/* Glow on hover */}
        <div className="srv__card-glow" aria-hidden="true" />

        {/* Top accent line */}
        <div className="srv__card-top-line" aria-hidden="true" />

        {/* Icon */}
        <div className="srv__card-icon-wrap">
          <span className="srv__card-icon">{service.icon}</span>
          <div className="srv__card-icon-bg" />
        </div>

        {/* Content */}
        <h3 className="srv__card-title">{service.title}</h3>
        <p className="srv__card-desc">{service.description}</p>

        {/* Features */}
        <div className="srv__card-features">
          {service.features.map((f) => (
            <span key={f} className="srv__card-tag">{f}</span>
          ))}
        </div>

        {/* CTA */}
        <div className="srv__card-footer">
          <a href="#contact" className="srv__card-link">
            Learn More
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const [showAll, setShowAll] = useState(false);

  const displayed = showAll ? services : services.slice(0, 8);

  return (
    <section className="srv" id="services">
      <div className="srv__bg" aria-hidden="true" />
      <div className="srv__glow srv__glow--a" aria-hidden="true" />
      <div className="srv__glow srv__glow--b" aria-hidden="true" />

      <div className="srv__container">
        <ScrollReveal variant="fadeUp">
          <SectionTitle
            badge="WHAT WE DO"
            title={<>Complete Digital Solutions<br /><span>Under One Roof</span></>}
            subtitle="From concept to launch and beyond â€” we deliver every layer of your digital ecosystem with mastery and precision."
          />
        </ScrollReveal>

        {/* Filter toggle */}
        <ScrollReveal variant="fadeUp" delay={0.1}>
          <div className="srv__filter">
            <button
              className={`srv__filter-btn ${!showAll ? 'srv__filter-btn--active' : ''}`}
              onClick={() => setShowAll(false)}
            >
              <span>Featured</span>
              <span className="srv__filter-count">8</span>
            </button>
            <button
              className={`srv__filter-btn ${showAll ? 'srv__filter-btn--active' : ''}`}
              onClick={() => setShowAll(true)}
            >
              <span>All Services</span>
              <span className="srv__filter-count">16</span>
            </button>
          </div>
        </ScrollReveal>

        {/* Grid */}
        <motion.div className="srv__grid" layout>
          <AnimatePresence mode="popLayout">
            {displayed.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Show more toggle */}
        <ScrollReveal variant="fadeUp" delay={0.2}>
          <div className="srv__more">
            <button
              className="srv__more-btn"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? (
                <>Show Featured Only <span>â†‘</span></>
              ) : (
                <>Explore All 16 Services <span>â†“</span></>
              )}
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
