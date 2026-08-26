'use client'

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import './Process.css';

const steps = [
  {
    num: '01',
    icon: '🔍',
    title: 'Discovery & Strategy',
    description: 'We dive deep into your vision, market landscape, and user needs. Through structured workshops and research, we craft a bulletproof roadmap aligned with your business goals.',
    tags: ['Workshops', 'Market Research', 'Roadmap', 'KPIs'],
    color: '#6C63FF',
  },
  {
    num: '02',
    icon: '🎨',
    title: 'UI/UX Design',
    description: 'Creating wireframes, interactive prototypes, and pixel-perfect visual designs that users fall in love with — balancing beauty, usability, and brand identity.',
    tags: ['Wireframes', 'Prototyping', 'Design System', 'User Testing'],
    color: '#00D9FF',
  },
  {
    num: '03',
    icon: '💻',
    title: 'Development',
    description: 'Building with cutting-edge technology stacks, clean architecture, and test-driven development. Every feature is crafted for performance, scalability, and longevity.',
    tags: ['Agile Sprints', 'Code Reviews', 'CI/CD', 'Unit Tests'],
    color: '#7C3AED',
  },
  {
    num: '04',
    icon: '🧪',
    title: 'Testing & QA',
    description: 'Rigorous multi-layer quality assurance — automated testing, manual QA, performance benchmarking, and security audits ensure your product launches flawlessly.',
    tags: ['Automation', 'Security Audit', 'Performance', 'UAT'],
    color: '#00E676',
  },
  {
    num: '05',
    icon: '🚀',
    title: 'Deployment',
    description: 'Smooth, zero-downtime launches to production. We handle infrastructure setup, monitoring configuration, and provide a comprehensive handover documentation package.',
    tags: ['Zero Downtime', 'Monitoring', 'Documentation', 'Training'],
    color: '#6C63FF',
  },
  {
    num: '06',
    icon: '🛡️',
    title: 'Support & Growth',
    description: 'Our relationship doesn\'t end at launch. Ongoing maintenance, proactive monitoring, feature iterations, and strategic growth guidance keep your product ahead of the curve.',
    tags: ['24/7 Support', 'Optimization', 'Analytics', 'Growth'],
    color: '#00D9FF',
  },
];

function StepCard({ step, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      className={`process__step ${index % 2 === 1 ? 'process__step--alt' : ''}`}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ '--step-color': step.color }}
    >
      {/* Connector line to center */}
      <div className="process__step-connector" aria-hidden="true" />

      {/* Number badge (center) */}
      <div className="process__step-num-wrap">
        <div className="process__step-num">
          <span>{step.num}</span>
          <div className="process__step-num-ring" />
          <div className="process__step-num-pulse" />
        </div>
      </div>

      {/* Card */}
      <div className="process__card">
        <div className="process__card-glow" aria-hidden="true" />
        <div className="process__card-top-line" aria-hidden="true" />

        <div className="process__card-header">
          <span className="process__card-icon">{step.icon}</span>
          <span className="process__card-step-label">Step {step.num}</span>
        </div>

        <h3 className="process__card-title">{step.title}</h3>
        <p className="process__card-desc">{step.description}</p>

        <div className="process__card-tags">
          {step.tags.map((tag) => (
            <span key={tag} className="process__card-tag">{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Process() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start center', 'end center'],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section className="process" id="process" ref={sectionRef}>
      <div className="process__bg" aria-hidden="true" />
      <div className="process__glow process__glow--a" aria-hidden="true" />
      <div className="process__glow process__glow--b" aria-hidden="true" />

      <div className="process__container">
        <ScrollReveal variant="fadeUp">
          <SectionTitle
            badge="HOW WE WORK"
            title={<>Our Proven <span>6-Step</span> Process</>}
            subtitle="A battle-tested methodology refined over 200+ projects. Each phase is designed to maximize quality, minimize risk, and deliver exceptional results."
          />
        </ScrollReveal>

        {/* Timeline */}
        <div className="process__timeline">
          {/* Animated center line */}
          <div className="process__line-track" aria-hidden="true">
            <motion.div
              className="process__line-fill"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Steps */}
          <div className="process__steps">
            {steps.map((step, i) => (
              <StepCard key={step.num} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
