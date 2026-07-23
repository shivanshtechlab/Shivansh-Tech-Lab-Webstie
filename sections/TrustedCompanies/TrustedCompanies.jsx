'use client'

import { useRef } from 'react';
import { trustedCompanies } from '../../data/trustedCompanies';
import './TrustedCompanies.css';

const row1 = [...trustedCompanies, ...trustedCompanies, ...trustedCompanies];
const row2 = [...[...trustedCompanies].reverse(), ...[...trustedCompanies].reverse(), ...[...trustedCompanies].reverse()];

export default function TrustedCompanies() {
  return (
    <section className="trusted" aria-label="Trusted by world-class companies">
      {/* Background grid */}
      <div className="trusted__grid-bg" aria-hidden="true" />

      <div className="trusted__container">
        <div className="trusted__header">
          <div className="trusted__badge">
            <span className="trusted__badge-dot" />
            Trusted by world-class companies
          </div>
          <p className="trusted__subtitle">
            Powering digital experiences for the world's most innovative brands
          </p>
        </div>

        {/* Row 1 â€” scrolls left */}
        <div className="trusted__track-wrapper">
          <div className="trusted__fade trusted__fade--left" aria-hidden="true" />
          <div className="trusted__fade trusted__fade--right" aria-hidden="true" />
          <div className="trusted__track trusted__track--left" aria-hidden="true">
            {row1.map((company, i) => (
              <LogoPill key={`r1-${company.id}-${i}`} company={company} />
            ))}
          </div>
        </div>

        {/* Row 2 â€” scrolls right */}
        <div className="trusted__track-wrapper">
          <div className="trusted__fade trusted__fade--left" aria-hidden="true" />
          <div className="trusted__fade trusted__fade--right" aria-hidden="true" />
          <div className="trusted__track trusted__track--right" aria-hidden="true">
            {row2.map((company, i) => (
              <LogoPill key={`r2-${company.id}-${i}`} company={company} />
            ))}
          </div>
        </div>

        <p className="trusted__cta">
          <span className="trusted__cta-line" />
          <span>50+ companies trust us with their digital future</span>
          <span className="trusted__cta-line" />
        </p>
      </div>
    </section>
  );
}

function LogoPill({ company }) {
  return (
    <div className="trusted__logo-pill">
      <span className="trusted__logo-text">{company.logo}</span>
    </div>
  );
}
