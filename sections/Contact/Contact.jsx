'use client'

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import { useApp } from '../../context/AppContext';
import './Contact.css';

const services = [
  'Custom Web Development', 'Mobile App Development', 'SaaS Platform Development',
  'ERP/CRM Solutions', 'AI & Machine Learning', 'UI/UX Design',
  'E-commerce Development', 'API Development & Integration', 'Cloud Infrastructure & DevOps',
  'Blockchain Development', 'Digital Transformation', 'IT Consulting',
  'QA & Testing', 'Cybersecurity Solutions', 'Data Analytics', 'AR/VR Development',
];

const budgets = [
  'Under $5,000', '$5,000 – $15,000', '$15,000 – $30,000',
  '$30,000 – $75,000', '$75,000 – $150,000', '$150,000+', 'Not sure yet',
];

const socialLinks = [
  { label: 'LinkedIn', href: '#', icon: (
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
  )},
  { label: 'Twitter', href: '#', icon: (
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
  )},
  { label: 'GitHub', href: '#', icon: (
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
  )},
  { label: 'Dribbble', href: '#', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/></svg>
  )},
];

const infoItems = [
  { icon: '✉', label: 'Email', value: 'hello@shivanshtechlabs.com', href: 'mailto:hello@shivanshtechlabs.com' },
  { icon: '📞', label: 'Phone', value: '+91 79917 18363', href: 'tel:+917991718363' },
  { icon: '📍', label: 'Address', value: 'Dum Dum, Kolkata 700030, India', href: '#' },
  { icon: '🕐', label: 'Availability', value: 'Mon–Fri: 9AM – 6PM IST', href: null },
];

function FloatLabel({ id, label, children }) {
  return (
    <div className="contact-field">
      {children}
      <label htmlFor={id} className="contact-field__label">{label}</label>
    </div>
  );
}

const initialForm = {
  name: '', email: '', phone: '', service: '', budget: '', message: '',
};

const validators = {
  name: (v) => v.trim().length < 2 ? 'Name must be at least 2 characters.' : '',
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Please enter a valid email address.',
  service: (v) => v ? '' : 'Please select a service.',
  message: (v) => v.trim().length < 20 ? 'Message must be at least 20 characters.' : '',
};

export default function Contact() {
  const { addToast } = useApp();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = useCallback((fields = form) => {
    const errs = {};
    Object.keys(validators).forEach(k => {
      const msg = validators[k](fields[k] || '');
      if (msg) errs[k] = msg;
    });
    return errs;
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };
    setForm(updated);
    if (touched[name]) {
      const errs = validate(updated);
      setErrors(prev => ({ ...prev, [name]: errs[name] || '' }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const errs = validate();
    setErrors(prev => ({ ...prev, [name]: errs[name] || '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allTouched = Object.keys(initialForm).reduce((a, k) => ({ ...a, [k]: true }), {});
    setTouched(allTouched);
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).some(k => errs[k])) return;

    setLoading(true);
    await new Promise(r => setTimeout(r, 1800));
    setLoading(false);
    setSubmitted(true);
    setForm(initialForm);
    setTouched({});
    setErrors({});
    addToast('Your message was sent! We\'ll respond within 24 hours.', 'success');
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-section__bg">
        <div className="contact-section__glow contact-section__glow--1" />
        <div className="contact-section__glow contact-section__glow--2" />
        <div className="contact-section__grid" />
      </div>

      <div className="container">
        <ScrollReveal>
          <SectionTitle
            badge="GET IN TOUCH"
            title="Let's Build Something Amazing Together"
            subtitle="Ready to transform your vision into reality? Tell us about your project and we'll get back to you within 24 hours."
          />
        </ScrollReveal>

        <div className="contact-layout">
          {/* ── Left: Info ── */}
          <ScrollReveal variant="fadeLeft">
            <div className="contact-info">
              <div className="contact-info__response">
                <span className="contact-info__response-dot" />
                <span>Average response in &lt; 24 hours</span>
              </div>

              <div className="contact-info__items">
                {infoItems.map((item, i) => (
                  <div key={i} className="contact-info__item">
                    <div className="contact-info__icon">{item.icon}</div>
                    <div className="contact-info__text">
                      <span className="contact-info__label">{item.label}</span>
                      {item.href ? (
                        <a href={item.href} className="contact-info__value contact-info__value--link">
                          {item.value}
                        </a>
                      ) : (
                        <span className="contact-info__value">{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="contact-info__socials">
                <p className="contact-info__socials-label">Follow us</p>
                <div className="contact-info__socials-row">
                  {socialLinks.map((s) => (
                    <a key={s.label} href={s.href} className="contact-info__social" aria-label={s.label} target="_blank" rel="noopener noreferrer">
                      <span className="contact-info__social-icon">{s.icon}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="contact-info__decoration">
                <div className="contact-info__ring contact-info__ring--1" />
                <div className="contact-info__ring contact-info__ring--2" />
                <div className="contact-info__ring contact-info__ring--3" />
              </div>
            </div>
          </ScrollReveal>

          {/* ── Right: Form ── */}
          <ScrollReveal variant="fadeRight" delay={0.1}>
            <div className="contact-form-wrap">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    className="contact-success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="contact-success__icon">✓</div>
                    <h3>Message Sent!</h3>
                    <p>Thank you! Our team will review your project and reach out within 24 hours.</p>
                    <button className="contact-success__reset" onClick={() => setSubmitted(false)}>
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    className="contact-form"
                    onSubmit={handleSubmit}
                    noValidate
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="contact-form__row">
                      <FloatLabel id="name" label="Full Name *">
                        <input
                          id="name"
                          name="name"
                          type="text"
                          className={`contact-input ${errors.name ? 'contact-input--error' : ''} ${form.name ? 'contact-input--filled' : ''}`}
                          value={form.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoComplete="name"
                        />
                      </FloatLabel>

                      <FloatLabel id="email" label="Email Address *">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          className={`contact-input ${errors.email ? 'contact-input--error' : ''} ${form.email ? 'contact-input--filled' : ''}`}
                          value={form.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoComplete="email"
                        />
                      </FloatLabel>
                    </div>

                    <FloatLabel id="phone" label="Phone Number (optional)">
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        className={`contact-input ${form.phone ? 'contact-input--filled' : ''}`}
                        value={form.phone}
                        onChange={handleChange}
                        autoComplete="tel"
                      />
                    </FloatLabel>

                    <FloatLabel id="service" label="Service Required *">
                      <select
                        id="service"
                        name="service"
                        className={`contact-input contact-select ${errors.service ? 'contact-input--error' : ''} ${form.service ? 'contact-input--filled' : ''}`}
                        value={form.service}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value="" disabled />
                        {services.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </FloatLabel>

                    <FloatLabel id="budget" label="Project Budget">
                      <select
                        id="budget"
                        name="budget"
                        className={`contact-input contact-select ${form.budget ? 'contact-input--filled' : ''}`}
                        value={form.budget}
                        onChange={handleChange}
                      >
                        <option value="" disabled />
                        {budgets.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </FloatLabel>

                    <FloatLabel id="message" label="Tell us about your project *">
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        className={`contact-input contact-textarea ${errors.message ? 'contact-input--error' : ''} ${form.message ? 'contact-input--filled' : ''}`}
                        value={form.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </FloatLabel>

                    {/* Field Errors */}
                    {Object.entries(errors).filter(([, v]) => v).map(([k, msg]) => (
                      <p key={k} className="contact-error">{msg}</p>
                    ))}

                    <button type="submit" className={`contact-submit ${loading ? 'contact-submit--loading' : ''}`} disabled={loading}>
                      {loading ? (
                        <>
                          <span className="contact-submit__spinner" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
