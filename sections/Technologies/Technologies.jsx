'use client'

import { useRef, useState } from 'react';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import { technologies } from '../../data/technologies';
import './Technologies.css';

const row1 = [...technologies, ...technologies];
const row2 = [...[...technologies].reverse(), ...[...technologies].reverse()];

function TechPill({ tech }) {
  return (
    <div className="tech__pill" style={{ '--tech-color': tech.color }}>
      <div className="tech__pill-logo-wrap">
        <img
          src={tech.img}
          alt={tech.name}
          className="tech__pill-logo"
          loading="lazy"
          draggable="false"
        />
      </div>
      <span className="tech__pill-name">{tech.name}</span>
    </div>
  );
}

export default function Technologies() {
  const [paused1, setPaused1] = useState(false);
  const [paused2, setPaused2] = useState(false);

  return (
    <section className="tech" id="technologies">
      <div className="tech__bg" aria-hidden="true" />
      <div className="tech__glow tech__glow--a" aria-hidden="true" />
      <div className="tech__glow tech__glow--b" aria-hidden="true" />

      <div className="tech__container">
        <ScrollReveal variant="fadeUp">
          <SectionTitle
            badge="OUR TECH STACK"
            title={<>Powered by <span>Cutting-Edge</span> Technologies</>}
            subtitle="We stay at the bleeding edge â€” picking the best tools for every challenge to deliver fast, scalable, future-proof solutions."
          />
        </ScrollReveal>
      </div>

      {/* Row 1 â€” left scroll */}
      <div
        className="tech__marquee-wrapper"
        onMouseEnter={() => setPaused1(true)}
        onMouseLeave={() => setPaused1(false)}
      >
        <div className="tech__fade tech__fade--left" aria-hidden="true" />
        <div className="tech__fade tech__fade--right" aria-hidden="true" />
        <div className={`tech__track tech__track--left${paused1 ? ' tech__track--paused' : ''}`}>
          {row1.map((tech, i) => (
            <TechPill key={`r1-${tech.id}-${i}`} tech={tech} />
          ))}
        </div>
      </div>

      {/* Row 2 â€” right scroll */}
      <div
        className="tech__marquee-wrapper"
        style={{ marginTop: '1.25rem' }}
        onMouseEnter={() => setPaused2(true)}
        onMouseLeave={() => setPaused2(false)}
      >
        <div className="tech__fade tech__fade--left" aria-hidden="true" />
        <div className="tech__fade tech__fade--right" aria-hidden="true" />
        <div className={`tech__track tech__track--right${paused2 ? ' tech__track--paused' : ''}`}>
          {row2.map((tech, i) => (
            <TechPill key={`r2-${tech.id}-${i}`} tech={tech} />
          ))}
        </div>
      </div>
    </section>
  );
}
