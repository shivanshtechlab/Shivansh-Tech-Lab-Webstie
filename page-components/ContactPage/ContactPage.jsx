'use client'

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import PageHero from '../../components/PageHero/PageHero';
import Footer from '../../components/Footer/Footer';
import FAQ from '../../sections/FAQ/FAQ';
import './ContactPage.css';

const contactInfo = [
  {
    icon: '✉️',
    title: 'Email Us',
    primary: 'hello@shivanshtechlab.com',
    secondary: 'We reply within 2 hours',
    color: '#6C63FF',
    href: 'mailto:hello@shivanshtechlab.com',
  },
  {
    icon: '📞',
    title: 'Call Us',
    primary: '+91 79917 18363',
    secondary: 'Mon–Fri, 9am–6pm IST',
    color: '#00D9FF',
    href: 'tel:+917991718363',
  },
  {
    icon: '📍',
    title: 'Visit Us',
    primary: '34/1 Ravi Sudha Apartment',
    secondary: 'Dum Dum, Kolkata 700030',
    color: '#7C3AED',
    href: '#',
  },
  {
    icon: '🕒',
    title: 'Working Hours',
    primary: '24/7 Support Available',
    secondary: 'Project teams across time zones',
    color: '#00E676',
    href: '#',
  },
];

const offices = [
  { city: 'Kolkata', label: 'HQ', flag: '🇮🇳', address: '34/1 Ravi Sudha Apartment, Near Post Office, Dum Dum, Kolkata 700030', color: '#6C63FF' },
];

const serviceOptions = [
  'Custom Website Development',
  'Web Application',
  'ERP Development',
  'CRM Development',
  'SaaS Platform',
  'Mobile App',
  'AI Solutions',
  'Cloud & DevOps',
  'UI/UX Design',
  'Ecommerce',
  'Other',
];

const budgetOptions = [
  'Under $10,000',
  '$10,000 – $25,000',
  '$25,000 – $50,000',
  '$50,000 – $100,000',
  '$100,000+',
  'Not sure yet',
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', service: '', budget: '', message: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const validate = useCallback(() => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    if (form.email.trim() && !form.email.includes('@')) e.email = 'Please enter a valid email address';
    if (!form.service) e.service = 'Please select a service';
    if (!form.message.trim() || form.message.length < 20) e.message = 'Message must be at least 20 characters';
    return e;
  }, [form]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setStatus('loading');
    try {
      const res = await fetch('http://localhost:5000/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm({ name: '', email: '', phone: '', service: '', budget: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }, [form, validate]);

  return (
    <main className="cp">
      <PageHero
        badge="GET IN TOUCH"
        title="Let's Build Something Amazing"
        titleHighlight="Something Amazing"
        subtitle="Ready to transform your idea into reality? Tell us about your project and we'll get back to you within 2 hours."
        breadcrumb="Contact"
      />

      {/* Contact Info Cards */}
      <section className="cp__info-section">
        <div className="container">
          <div className="cp__info-grid">
            {contactInfo.map((info, i) => (
              <motion.a
                key={info.title}
                href={info.href}
                className="cp__info-card"
                style={{ '--cp-color': info.color }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="cp__info-card-top-line" aria-hidden="true" />
                <span className="cp__info-icon">{info.icon}</span>
                <h3 className="cp__info-title">{info.title}</h3>
                <p className="cp__info-primary" style={{ color: info.color }}>{info.primary}</p>
                <p className="cp__info-secondary">{info.secondary}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Form + FAQ */}
      <section className="cp__main-section">
        <div className="container">
          <div className="cp__main-grid">
            {/* Contact Form */}
            <motion.div
              className="cp__form-wrap"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <div className="cp__form-header">
                <h2 className="cp__form-title">Send Us a <span className="gradient-text">Message</span></h2>
                <p className="cp__form-subtitle">Fill in the details below and we'll reach out within 2 hours.</p>
              </div>

              {status === 'success' ? (
                <motion.div
                  className="cp__form-success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <span className="cp__success-icon">✅</span>
                  <h3>Message Sent!</h3>
                  <p>Thanks for reaching out! Our team will contact you within 2 business hours.</p>
                  <button className="cp__success-reset" onClick={() => setStatus('idle')}>Send Another</button>
                </motion.div>
              ) : (
                <form className="cp__form" onSubmit={handleSubmit} noValidate>
                  <div className="cp__form-row">
                    <div className={`cp__field ${errors.name ? 'cp__field--error' : ''}`}>
                      <label className="cp__label" htmlFor="name">Full Name *</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        className="cp__input"
                        placeholder="John Smith"
                        value={form.name}
                        onChange={handleChange}
                      />
                      {errors.name && <span className="cp__error">{errors.name}</span>}
                    </div>
                    <div className={`cp__field ${errors.email ? 'cp__field--error' : ''}`}>
                      <label className="cp__label" htmlFor="email">Email Address</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="cp__input"
                        placeholder="john@company.com (optional)"
                        value={form.email}
                        onChange={handleChange}
                      />
                      {errors.email && <span className="cp__error">{errors.email}</span>}
                    </div>
                  </div>

                  <div className="cp__form-row">
                    <div className={`cp__field ${errors.phone ? 'cp__field--error' : ''}`}>
                      <label className="cp__label" htmlFor="phone">Phone Number *</label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        className="cp__input"
                        placeholder="+1 (555) 000-0000"
                        value={form.phone}
                        onChange={handleChange}
                      />
                      {errors.phone && <span className="cp__error">{errors.phone}</span>}
                    </div>
                    <div className={`cp__field ${errors.service ? 'cp__field--error' : ''}`}>
                      <label className="cp__label" htmlFor="service">Service Needed *</label>
                      <select
                        id="service"
                        name="service"
                        className="cp__select"
                        value={form.service}
                        onChange={handleChange}
                      >
                        <option value="">Select a service…</option>
                        {serviceOptions.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      {errors.service && <span className="cp__error">{errors.service}</span>}
                    </div>
                  </div>

                  <div className="cp__field">
                    <label className="cp__label" htmlFor="budget">Project Budget</label>
                    <select
                      id="budget"
                      name="budget"
                      className="cp__select"
                      value={form.budget}
                      onChange={handleChange}
                    >
                      <option value="">Select budget range…</option>
                      {budgetOptions.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>

                  <div className={`cp__field ${errors.message ? 'cp__field--error' : ''}`}>
                    <label className="cp__label" htmlFor="message">Project Details *</label>
                    <textarea
                      id="message"
                      name="message"
                      className="cp__textarea"
                      placeholder="Tell us about your project, goals, and timeline…"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                    />
                    {errors.message && <span className="cp__error">{errors.message}</span>}
                  </div>

                  <button
                    type="submit"
                    className="cp__submit"
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? (
                      <>
                        <span className="cp__btn-spinner" aria-hidden="true" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ />

      {/* Offices */}
      <section className="cp__offices">
        <div className="container">
          <motion.div
            className="cp__offices-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="cp__offices-title">Our <span className="gradient-text">Office</span></h2>
            <p className="cp__offices-sub">Based in Kolkata, working with clients worldwide</p>
          </motion.div>
          <div className="cp__offices-grid">
            {offices.map((office, i) => (
              <motion.div
                key={office.city}
                className="cp__office-card"
                style={{ '--cp-color': office.color }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="cp__office-card-top-line" aria-hidden="true" />
                <div className="cp__office-header">
                  <span className="cp__office-flag">{office.flag}</span>
                  <span className="cp__office-label" style={{ color: office.color }}>{office.label}</span>
                </div>
                <h3 className="cp__office-city">{office.city}</h3>
                <p className="cp__office-address">{office.address}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
