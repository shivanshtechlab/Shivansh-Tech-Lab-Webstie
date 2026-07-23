'use client'

import { motion } from 'framer-motion';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import { industries } from '../../data/industries';
import './Industries.css';

function IndustryCard({ item, index }) {
  return (
    <motion.div
      className="ind-card"
      style={{ '--ind-color': item.color }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ y: -6, scale: 1.02 }}
    >
      <div className="ind-card__top">
        <div className="ind-card__icon-wrap">
          <span className="ind-card__icon">{item.icon}</span>
          <div className="ind-card__icon-glow" />
        </div>
        <div className="ind-card__badge">
          <span>{item.projects}</span>
          <span className="ind-card__badge-label">Projects</span>
        </div>
      </div>
      <h3 className="ind-card__name">{item.name}</h3>
      <p className="ind-card__desc">{item.description}</p>
      <div className="ind-card__line" />
      <div className="ind-card__hover-glow" />
    </motion.div>
  );
}

export default function Industries() {
  return (
    <section className="industries-section" id="industries">
      <div className="industries-section__bg">
        <div className="ind-bg-orb ind-bg-orb--1" />
        <div className="ind-bg-orb ind-bg-orb--2" />
      </div>
      <div className="container">
        <ScrollReveal>
          <SectionTitle
            badge="INDUSTRIES WE SERVE"
            title="Transforming Every Industry"
            subtitle="Deep domain expertise across 10+ verticals â€” we understand your business, not just your tech stack."
          />
        </ScrollReveal>

        <div className="ind-grid">
          {industries.map((item, i) => (
            <IndustryCard key={item.id} item={item} index={i} />
          ))}
        </div>

        <ScrollReveal delay={0.2}>
          <div className="ind-bottom-strip">
            <div className="ind-strip-item">
              <span className="ind-strip-num">10+</span>
              <span className="ind-strip-label">Industries</span>
            </div>
            <div className="ind-strip-divider" />
            <div className="ind-strip-item">
              <span className="ind-strip-num">235+</span>
              <span className="ind-strip-label">Projects Delivered</span>
            </div>
            <div className="ind-strip-divider" />
            <div className="ind-strip-item">
              <span className="ind-strip-num">30+</span>
              <span className="ind-strip-label">Countries</span>
            </div>
            <div className="ind-strip-divider" />
            <div className="ind-strip-item">
              <span className="ind-strip-num">98%</span>
              <span className="ind-strip-label">Client Satisfaction</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
