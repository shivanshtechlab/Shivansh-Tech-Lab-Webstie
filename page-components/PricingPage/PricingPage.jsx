'use client'

import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import PageHero from '../../components/PageHero/PageHero';
import Footer from '../../components/Footer/Footer';
import { websitePlans, dashboardPlans, mobilePlans, packagePlans } from '../../data/pricingFull';
import './PricingPage.css';

/* â”€â”€ Check / Cross icon â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function CheckIcon({ included }) {
  return included ? (
    <svg className="pr-feat-icon pr-feat-icon--check" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9" stroke="#00E676" strokeWidth="1.5" />
      <polyline points="6,10 9,13 14,7" stroke="#00E676" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg className="pr-feat-icon pr-feat-icon--cross" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9" stroke="rgba(128,128,128,0.25)" strokeWidth="1.5" />
      <path d="M7 7l6 6M13 7l-6 6" stroke="rgba(128,128,128,0.3)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* â”€â”€ Standard plan card â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function PlanCard({ plan, index }) {
  const price = plan.price?.one_time;
  const isCustom = price === null || price === undefined;

  return (
    <motion.div
      className={`pr-card ${plan.popular ? 'pr-card--popular' : ''}`}
      style={{ '--pc': plan.color }}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
    >
      {plan.popular && <div className="pr-card__badge">â­ Most Popular</div>}
      <div className="pr-card__glow" style={{ background: plan.gradient }} />

      <div className="pr-card__head">
        <div className="pr-card__name-row">
          <span className="pr-card__name">{plan.name}</span>
          <span className="pr-card__dot" style={{ background: plan.color }} />
        </div>
        <div className="pr-card__price">
          {isCustom ? (
            <span className="pr-card__custom">Custom</span>
          ) : (
            <>
              <span className="pr-card__currency">$</span>
              <span className="pr-card__amount">{price.toLocaleString()}</span>
            </>
          )}
        </div>
        <p className="pr-card__desc">{plan.description}</p>
        <div className="pr-card__timeline">
          <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" />
            <path d="M8 4.5v3.5l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          {plan.timeline}
        </div>
      </div>

      <div className="pr-card__divider" style={{ background: plan.gradient }} />

      <ul className="pr-card__features">
        {plan.features.map((f, i) => (
          <li key={i} className={`pr-card__feature ${!f.included ? 'pr-card__feature--off' : ''}`}>
            <CheckIcon included={f.included} />
            <span>{f.text}</span>
          </li>
        ))}
      </ul>

      <Link href="/contact" className={`pr-card__cta ${plan.popular ? 'pr-card__cta--primary' : 'pr-card__cta--outline'}`}
        style={plan.popular ? { background: plan.gradient } : { borderColor: plan.color, color: plan.color }}>
        {plan.cta}
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
          <path d="M5 10h10M11 6l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </motion.div>
  );
}

/* â”€â”€ Package card (includes list) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function PackageCard({ plan, index }) {
  const price = plan.price?.one_time;
  const isCustom = price === null || price === undefined;

  return (
    <motion.div
      className={`pr-pkg ${plan.popular ? 'pr-pkg--popular' : ''}`}
      style={{ '--pc': plan.color }}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
    >
      {plan.popular && <div className="pr-card__badge">â­ Best Value</div>}
      <div className="pr-card__glow" style={{ background: plan.gradient }} />

      <div className="pr-card__head">
        <div className="pr-card__name-row">
          <span className="pr-card__name">{plan.name}</span>
          <span className="pr-card__dot" style={{ background: plan.color }} />
        </div>
        <div className="pr-card__price">
          {isCustom ? (
            <span className="pr-card__custom">Custom</span>
          ) : (
            <>
              <span className="pr-card__currency">$</span>
              <span className="pr-card__amount">{price.toLocaleString()}</span>
              {plan.saving && (
                <span className="pr-pkg__save">Save ${plan.saving.toLocaleString()}</span>
              )}
            </>
          )}
        </div>
        <p className="pr-card__desc">{plan.description}</p>
        <div className="pr-card__timeline">
          <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" />
            <path d="M8 4.5v3.5l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          {plan.timeline}
        </div>
      </div>

      {/* What's included (summary) */}
      <div className="pr-pkg__includes">
        {plan.includes.map((inc, i) => (
          <div key={i} className="pr-pkg__include-item" style={{ borderColor: plan.color + '33' }}>
            <span className="pr-pkg__inc-icon">{inc.icon}</span>
            <div>
              <div className="pr-pkg__inc-label">{inc.label}</div>
              <div className="pr-pkg__inc-detail">{inc.detail}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="pr-card__divider" style={{ background: plan.gradient }} />

      <ul className="pr-card__features">
        {plan.features.map((f, i) => (
          <li key={i} className={`pr-card__feature ${!f.included ? 'pr-card__feature--off' : ''}`}>
            <CheckIcon included={f.included} />
            <span>{f.text}</span>
          </li>
        ))}
      </ul>

      <Link href="/contact" className={`pr-card__cta ${plan.popular ? 'pr-card__cta--primary' : 'pr-card__cta--outline'}`}
        style={plan.popular ? { background: plan.gradient } : { borderColor: plan.color, color: plan.color }}>
        {plan.cta}
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
          <path d="M5 10h10M11 6l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </motion.div>
  );
}

/* â”€â”€ Section header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function SectionHead({ icon, badge, title, subtitle, color }) {
  return (
    <motion.div
      className="pr-sec-head"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
    >
      <span className="pr-sec-badge" style={{ color, borderColor: color + '44', background: color + '12' }}>
        <span className="pr-sec-badge-icon">{icon}</span>
        {badge}
      </span>
      <h2 className="pr-sec-title">{title}</h2>
      <p className="pr-sec-sub">{subtitle}</p>
    </motion.div>
  );
}

/* â”€â”€ Main Page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
export default function PricingPage() {
  useEffect(() => {
    document.title = 'Pricing â€“ Shivansh Tech Lab';
  }, []);

  return (
    <main className="pr-page">
      <PageHero
        badge="PRICING"
        title="Simple, Transparent Pricing"
        titleHighlight="Transparent Pricing"
        subtitle="No hidden fees. No surprises. Choose the plan that fits your goals â€” from a single website to a complete digital ecosystem."
        breadcrumb="Pricing"
      />

      {/* â”€â”€ Section 1: Website â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="pr-section pr-section--alt" id="website-pricing">
        <div className="pr-container">
          <SectionHead
            icon="ðŸŒ"
            badge="WEBSITE DEVELOPMENT"
            title="Website Pricing"
            subtitle="From a single landing page to a full e-commerce store â€” every site crafted from scratch, mobile-first, and SEO-ready."
            color="#6C63FF"
          />
          <div className="pr-grid pr-grid--3">
            {websitePlans.map((plan, i) => (
              <PlanCard key={plan.id} plan={plan} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€ Section 2: Dashboard / CRM / ERP â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="pr-section" id="dashboard-pricing">
        <div className="pr-container">
          <SectionHead
            icon="ðŸ“Š"
            badge="DASHBOARD Â· CRM Â· ERP"
            title="Business Software Pricing"
            subtitle="Custom dashboards, CRM systems, and enterprise ERP solutions tailored to your workflows and business scale."
            color="#FFB800"
          />
          <div className="pr-grid pr-grid--3">
            {dashboardPlans.map((plan, i) => (
              <PlanCard key={plan.id} plan={plan} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€ Section 3: Mobile App â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="pr-section pr-section--alt" id="mobile-pricing">
        <div className="pr-container">
          <SectionHead
            icon="ðŸ“±"
            badge="MOBILE APP DEVELOPMENT"
            title="Mobile App Pricing"
            subtitle="Native-quality iOS and Android apps â€” from simple single-platform apps to AI-powered cross-platform solutions."
            color="#FF6B6B"
          />
          <div className="pr-grid pr-grid--3">
            {mobilePlans.map((plan, i) => (
              <PlanCard key={plan.id} plan={plan} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€ Section 4: Full Package â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="pr-section pr-section--package" id="package-pricing">
        <div className="pr-container">
          <SectionHead
            icon="ðŸš€"
            badge="FULL PACKAGES"
            title="Website + Dashboard + App Bundles"
            subtitle="Get everything together at a bundled price â€” website, business software, and mobile app in one seamless project."
            color="#00D9FF"
          />
          <div className="pr-grid pr-grid--3">
            {packagePlans.map((plan, i) => (
              <PackageCard key={plan.id} plan={plan} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€ FAQ note + CTA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="pr-section pr-cta-section">
        <div className="pr-container">
          <motion.div
            className="pr-cta-box"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="pr-cta-glow" />
            <h2 className="pr-cta-title">Not Sure Which Plan to Choose?</h2>
            <p className="pr-cta-desc">
              Every project is unique. Talk to us and we'll recommend the best solution for your goals and budget â€” no commitment required.
            </p>
            <div className="pr-cta-actions">
              <Link href="/contact" className="pr-cta-btn pr-cta-btn--primary">Get a Free Quote</Link>
              <Link href="/our-work" className="pr-cta-btn pr-cta-btn--ghost">See Our Work</Link>
            </div>
            <p className="pr-cta-note">All prices in USD Â· One-time project fee Â· No monthly lock-in</p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
