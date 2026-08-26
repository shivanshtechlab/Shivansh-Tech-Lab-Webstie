'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import Button from '../../components/Button/Button';
import { pricingPlans } from '../../data/pricing';
import './Pricing.css';

function CheckIcon({ included }) {
  return included ? (
    <svg className="pricing-feature-icon pricing-feature-icon--check" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9" stroke="#00E676" strokeWidth="1.5" />
      <polyline points="6,10 9,13 14,7" stroke="#00E676" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg className="pricing-feature-icon pricing-feature-icon--cross" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
      <path d="M7 7l6 6M13 7l-6 6" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PricingCard({ plan, billing, delay }) {
  const price = plan.price[billing];
  const isCustom = price === null;

  return (
    <ScrollReveal variant="scaleUp" delay={delay}>
      <div className={`pricing-card ${plan.popular ? 'pricing-card--popular' : ''} ${plan.name === 'Enterprise' ? 'pricing-card--enterprise' : ''}`}
        style={{ '--plan-color': plan.color }}>

        {plan.popular && (
          <div className="pricing-card__badge">
            <span>⭐ Most Popular</span>
          </div>
        )}

        <div className="pricing-card__glow" style={{ background: plan.gradient }} />

        <div className="pricing-card__header">
          <div className="pricing-card__name-row">
            <span className="pricing-card__name">{plan.name}</span>
            <div className="pricing-card__dot" style={{ background: plan.color }} />
          </div>

          <div className="pricing-card__price">
            <AnimatePresence mode="wait">
              <motion.div
                key={billing + plan.id}
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.25 }}
                className="pricing-card__price-inner"
              >
                {isCustom ? (
                  <span className="pricing-card__custom">Custom</span>
                ) : (
                  <>
                    <span className="pricing-card__currency">$</span>
                    <span className="pricing-card__amount">{price.toLocaleString()}</span>
                    <span className="pricing-card__period">/project</span>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
            {!isCustom && billing === 'yearly' && (
              <div className="pricing-card__save">Save 20% annually</div>
            )}
          </div>
          <p className="pricing-card__desc">{plan.description}</p>
        </div>

        <div className="pricing-card__divider" style={{ background: plan.color }} />

        <ul className="pricing-card__features">
          {plan.features.map((f, i) => (
            <li key={i} className={`pricing-card__feature ${!f.included ? 'pricing-card__feature--excluded' : ''}`}>
              <CheckIcon included={f.included} />
              <span>{f.text}</span>
            </li>
          ))}
        </ul>

        <div className="pricing-card__cta">
          <Button
            variant={plan.popular ? 'primary' : 'outline'}
            size="lg"
            className="pricing-card__btn"
          >
            {plan.cta}
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="pricing-card__btn-arrow">
              <path d="M5 10h10M11 6l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Button>
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function Pricing() {
  const [billing, setBilling] = useState('monthly');

  return (
    <section className="pricing-section" id="pricing">
      <div className="pricing-section__bg">
        <div className="pricing-section__glow pricing-section__glow--1" />
        <div className="pricing-section__glow pricing-section__glow--2" />
        <div className="pricing-section__grid" />
      </div>

      <div className="container">
        <ScrollReveal>
          <SectionTitle
            badge="PRICING"
            title="Transparent Pricing, Exceptional Value"
            subtitle="No hidden fees, no surprises. Pick the plan that fits your growth stage and we'll take care of the rest."
          />
        </ScrollReveal>

        {/* Toggle */}
        <ScrollReveal delay={0.1}>
          <div className="pricing-toggle">
            <span className={`pricing-toggle__label ${billing === 'monthly' ? 'pricing-toggle__label--active' : ''}`}>
              Monthly
            </span>
            <button
              className={`pricing-toggle__btn ${billing === 'yearly' ? 'pricing-toggle__btn--yearly' : ''}`}
              onClick={() => setBilling(b => b === 'monthly' ? 'yearly' : 'monthly')}
              aria-label="Toggle billing period"
            >
              <span className="pricing-toggle__thumb" />
            </button>
            <span className={`pricing-toggle__label ${billing === 'yearly' ? 'pricing-toggle__label--active' : ''}`}>
              Yearly
              <span className="pricing-toggle__save-badge">Save 20%</span>
            </span>
          </div>
        </ScrollReveal>

        {/* Cards */}
        <div className="pricing-grid">
          {pricingPlans.map((plan, i) => (
            <PricingCard key={plan.id} plan={plan} billing={billing} delay={i * 0.12} />
          ))}
        </div>

        {/* Bottom note */}
        <ScrollReveal delay={0.2}>
          <p className="pricing-note">
            All prices are estimates. Final pricing depends on project scope.
            <a href="#contact" className="pricing-note__link">Talk to us for a custom quote →</a>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
