'use client'

import { motion } from 'framer-motion';
import Link from 'next/link';
import PageHero from '../../components/PageHero/PageHero';
import Footer from '../../components/Footer/Footer';
import { industries } from '../../data/industries';
import './IndustriesPage.css';

const approachSteps = [
  {
    step: '01',
    icon: '🔍',
    title: 'Understand',
    desc: 'We immerse ourselves in your industry, studying regulations, workflows, user behaviors, and competitive landscape.',
  },
  {
    step: '02',
    icon: '🎨',
    title: 'Design',
    desc: 'We craft solutions tailored to your sector — whether HIPAA compliance for healthcare or PCI-DSS for finance.',
  },
  {
    step: '03',
    icon: '🚀',
    title: 'Deliver',
    desc: 'We ship battle-tested, scalable software and provide ongoing support as your industry evolves.',
  },
];

function IndustryCard({ industry, index }) {
  return (
    <motion.div
      className="ip__card"
      style={{ '--ip-color': industry.color }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.08 }}
      whileHover={{ y: -4 }}
    >
      <div className="ip__card-top-line" aria-hidden="true" />
      <div className="ip__card-glow" aria-hidden="true" />
      <div className="ip__card-icon-wrap">
        <span className="ip__card-icon">{industry.icon}</span>
      </div>
      <div className="ip__card-content">
        <h3 className="ip__card-name">{industry.name}</h3>
        <p className="ip__card-desc">{industry.description}</p>
      </div>
      <div className="ip__card-footer">
        <span className="ip__card-projects" style={{ color: industry.color }}>
          {industry.projects} Projects
        </span>
        <Link href="/contact" className="ip__card-link">
          Learn More
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
}

export default function IndustriesPage() {
  return (
    <main className="ip">
      <PageHero
        badge="INDUSTRIES WE SERVE"
        title="We Serve Every Industry"
        titleHighlight="Every Industry"
        subtitle="Deep domain expertise across 10+ verticals. We don't just build software — we understand your world."
        breadcrumb="Industries"
      />

      {/* Industries Grid */}
      <section className="ip__grid-section">
        <div className="container">
          <motion.div
            className="ip__section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="ip__section-title">Our <span className="gradient-text">Industry Expertise</span></h2>
            <p className="ip__section-sub">Specialized knowledge that translates into better products for your sector</p>
          </motion.div>

          <div className="ip__grid">
            {industries.map((industry, i) => (
              <IndustryCard key={industry.id} industry={industry} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="ip__approach">
        <div className="container">
          <motion.div
            className="ip__section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="ip__section-title">Our <span className="gradient-text">Approach</span></h2>
            <p className="ip__section-sub">How we deliver industry-specific solutions that truly work</p>
          </motion.div>

          <div className="ip__approach-steps">
            {approachSteps.map((step, i) => (
              <motion.div
                key={step.step}
                className="ip__approach-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.12 }}
              >
                {i < approachSteps.length - 1 && (
                  <div className="ip__approach-connector" aria-hidden="true" />
                )}
                <div className="ip__approach-icon-wrap">
                  <span className="ip__approach-icon">{step.icon}</span>
                </div>
                <span className="ip__approach-step">{step.step}</span>
                <h3 className="ip__approach-title">{step.title}</h3>
                <p className="ip__approach-desc">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ip__cta-section">
        <div className="container">
          <motion.div
            className="ip__cta-box"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="ip__cta-glow" aria-hidden="true" />
            <h2 className="ip__cta-title">Don't See Your Industry? <span className="gradient-text">No Problem.</span></h2>
            <p className="ip__cta-desc">We build custom solutions for any vertical. Tell us about your unique requirements.</p>
            <div className="ip__cta-actions">
              <Link href="/contact" className="ip__cta-btn ip__cta-btn--primary">Discuss Your Project</Link>
              <Link href="/portfolio" className="ip__cta-btn ip__cta-btn--ghost">See All Projects</Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
