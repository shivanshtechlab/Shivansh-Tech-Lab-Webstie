'use client'

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../assets/logo.png';
import {
  COMPANY_NAME,
  COMPANY_EMAIL,
  COMPANY_PHONE,
  COMPANY_ADDRESS,
  SOCIAL_LINKS,
  NAV_LINKS,
} from '../../constants/index';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { validateEmail } from '../../utils/helpers';
import './Footer.css';

/* ─── SVG Social Icons ──────────────────────────────────────────────────────── */
const SocialSVG = ({ icon }) => {
  const map = {
    linkedin: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
    twitter: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    github: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
    dribbble: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" />
      </svg>
    ),
    instagram: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  };
  return <span className="footer-social-svg">{map[icon] || null}</span>;
};

/* ─── Animated Particles ────────────────────────────────────────────────────── */
const PARTICLE_COUNT = 30;

const Particles = () => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const colors = ['rgba(108,99,255,', 'rgba(0,217,255,', 'rgba(124,58,237,'];

    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.4 - 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.5 + 0.1,
      life: Math.random(),
      speed: Math.random() * 0.005 + 0.002,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current.forEach((p) => {
        p.life += p.speed;
        if (p.life > 1) {
          p.life = 0;
          p.x = Math.random() * canvas.width;
          p.y = canvas.height + 10;
        }
        const pulse = Math.sin(p.life * Math.PI);
        ctx.beginPath();
        ctx.arc(p.x + p.vx * p.life * 100, p.y - p.vy * p.life * canvas.height, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${(p.alpha * pulse).toFixed(2)})`;
        ctx.fill();
      });
      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(animRef.current);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="footer-particles-canvas" aria-hidden="true" />;
};

/* ─── Column animation variants ────────────────────────────────────────────── */
const colVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: [0.4, 0, 0.2, 1] },
  }),
};

/* ─── Services List ─────────────────────────────────────────────────────────── */
const SERVICES_LINKS = NAV_LINKS.find((l) => l.megaMenu)?.children ?? [];

const COMPANY_NAV = [
  { label: 'About Us', href: '/about' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Blog', href: '/blog' },
  { label: 'Careers', href: '/contact' },
  { label: 'Contact', href: '/contact' },
];

/* ─── Newsletter Form ───────────────────────────────────────────────────────── */
const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!validateEmail(email)) {
        setStatus('error');
        return;
      }
      setStatus('loading');
      setTimeout(() => {
        setStatus('success');
        setEmail('');
      }, 1200);
    },
    [email]
  );

  return (
    <div className="footer-newsletter">
      <p className="footer-newsletter-desc">
        Stay ahead with insights on tech, design, and digital innovation — delivered monthly.
      </p>
      <form className="footer-newsletter-form" onSubmit={handleSubmit} noValidate>
        <div className={`footer-newsletter-field ${status === 'error' ? 'has-error' : ''} ${status === 'success' ? 'has-success' : ''}`}>
          <input
            type="email"
            className="footer-newsletter-input"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setStatus('idle'); }}
            aria-label="Email address for newsletter"
            disabled={status === 'loading' || status === 'success'}
          />
          <button
            type="submit"
            className="footer-newsletter-btn"
            disabled={status === 'loading' || status === 'success'}
            aria-label="Subscribe"
          >
            {status === 'loading' ? (
              <span className="footer-newsletter-spinner" aria-hidden="true" />
            ) : status === 'success' ? (
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M2 8l4 4 8-8" stroke="#00E676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>
        {status === 'error' && (
          <p className="footer-newsletter-msg footer-newsletter-msg--error">
            Please enter a valid email address.
          </p>
        )}
        {status === 'success' && (
          <p className="footer-newsletter-msg footer-newsletter-msg--success">
            You're subscribed! Welcome aboard.
          </p>
        )}
      </form>
      <p className="footer-newsletter-privacy">
        No spam, ever. Unsubscribe at any time.
      </p>
    </div>
  );
};

/* ─── Footer ────────────────────────────────────────────────────────────────── */
export default function Footer() {
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation({ threshold: 0.05 });
  const { ref: wordRef, isVisible: wordVisible } = useScrollAnimation({ threshold: 0.1 });

  const year = new Date().getFullYear();

  return (
    <footer className="footer" aria-label="Site footer">
      {/* Background layers */}
      <div className="footer-bg" aria-hidden="true">
        <div className="footer-bg-grid" />
        <div className="footer-aurora" />
        <Particles />
      </div>

      {/* Word art */}
      <div className="footer-word-art-wrap" ref={wordRef} aria-hidden="true">
        <motion.div
          className="footer-word-art"
          initial={{ opacity: 0, y: 30 }}
          animate={wordVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          Shivansh Tech Lab
        </motion.div>
      </div>

      {/* Glowing Divider */}
      <div className="footer-divider-wrap" aria-hidden="true">
        <div className="footer-divider" />
        <div className="footer-divider-glow" />
      </div>

      {/* Main Grid */}
      <div className="footer-main">
        <div className="footer-container">
          <div className="footer-grid" ref={gridRef}>

            {/* Col 1 — Brand */}
            <motion.div
              className="footer-col footer-col--brand"
              custom={0}
              variants={colVariants}
              initial="hidden"
              animate={gridVisible ? 'visible' : 'hidden'}
            >
              {/* Logo */}
              <Link href="/" className="footer-logo" aria-label="Shivansh Tech Lab home">
                <Image src={logo} alt="Shivansh Tech Lab" className="footer-logo-img" />
              </Link>

              <p className="footer-brand-desc">
                We craft premium digital experiences — from custom websites to enterprise platforms —
                that help ambitious brands scale and lead in their industries.
              </p>

              {/* Contact info */}
              <div className="footer-contact-info">
                <a href={`mailto:${COMPANY_EMAIL}`} className="footer-contact-item">
                  <span className="footer-contact-icon" aria-hidden="true">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </span>
                  {COMPANY_EMAIL}
                </a>
                <a href={`tel:${COMPANY_PHONE}`} className="footer-contact-item">
                  <span className="footer-contact-icon" aria-hidden="true">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </span>
                  {COMPANY_PHONE}
                </a>
              </div>

              {/* Social Icons */}
              <div className="footer-socials">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="footer-social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                  >
                    <SocialSVG icon={s.icon} />
                    <div className="footer-social-glow" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Col 2 — Services */}
            <motion.div
              className="footer-col"
              custom={1}
              variants={colVariants}
              initial="hidden"
              animate={gridVisible ? 'visible' : 'hidden'}
            >
              <h3 className="footer-col-title">Services</h3>
              <ul className="footer-link-list" role="list">
                {SERVICES_LINKS.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="footer-link">
                      <span className="footer-link-arrow" aria-hidden="true">
                        <svg viewBox="0 0 12 12" fill="none">
                          <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Col 3 — Company */}
            <motion.div
              className="footer-col"
              custom={2}
              variants={colVariants}
              initial="hidden"
              animate={gridVisible ? 'visible' : 'hidden'}
            >
              <h3 className="footer-col-title">Company</h3>
              <ul className="footer-link-list" role="list">
                {COMPANY_NAV.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="footer-link">
                      <span className="footer-link-arrow" aria-hidden="true">
                        <svg viewBox="0 0 12 12" fill="none">
                          <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Address */}
              <div className="footer-address">
                <span className="footer-address-icon" aria-hidden="true">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </span>
                <span>{COMPANY_ADDRESS}</span>
              </div>
            </motion.div>

            {/* Col 4 — Newsletter */}
            <motion.div
              className="footer-col footer-col--newsletter"
              custom={3}
              variants={colVariants}
              initial="hidden"
              animate={gridVisible ? 'visible' : 'hidden'}
            >
              <h3 className="footer-col-title">Stay in the Loop</h3>
              <Newsletter />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-container">
          <div className="footer-bottom-inner">
            <p className="footer-copyright">
              &copy; {year} {COMPANY_NAME}. All rights reserved.
            </p>
            <nav className="footer-legal-links" aria-label="Legal navigation">
              <a href="/privacy" className="footer-legal-link">Privacy Policy</a>
              <span className="footer-legal-sep" aria-hidden="true">·</span>
              <a href="/terms" className="footer-legal-link">Terms of Service</a>
              <span className="footer-legal-sep" aria-hidden="true">·</span>
              <a href="/sitemap.xml" className="footer-legal-link">Sitemap</a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
