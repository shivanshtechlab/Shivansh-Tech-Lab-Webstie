'use client'

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../assets/logo.png';
import { NAV_LINKS, SOCIAL_LINKS } from '../../constants/index';
import { useScrollY, useScrollProgress } from '../../hooks/useScrollAnimation';
import { useTheme } from '../../context/ThemeContext';
import './Navbar.css';

/* â”€â”€â”€ Social SVG Icons â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const SocialIcon = ({ icon }) => {
  const icons = {
    linkedin: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
    twitter: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    github: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
    dribbble: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" />
      </svg>
    ),
    instagram: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  };
  return <span className="nav-social-svg">{icons[icon] || null}</span>;
};

/* â”€â”€â”€ Logo â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const Logo = ({ onClick }) => (
  <Link href="/" className="nav-logo" onClick={onClick} aria-label="Shivansh Tech Lab Home">
    <Image src={logo} alt="Shivansh Tech Lab" className="nav-logo-img" priority />
  </Link>
);

/* â”€â”€â”€ Theme Toggle â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  return (
    <motion.button
      className="nav-theme-toggle"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      whileTap={{ scale: 0.88 }}
      whileHover={{ scale: 1.08 }}
      transition={{ duration: 0.15 }}
    >
      <span className="nav-theme-toggle__track">
        <motion.span
          className="nav-theme-toggle__thumb"
          animate={{ x: isDark ? 22 : 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      </span>
      <span className="nav-theme-toggle__icon nav-theme-toggle__icon--sun" aria-hidden="true">
        <svg viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.22 1.78a1 1 0 011.42 1.42l-.7.7a1 1 0 11-1.42-1.42l.7-.7zM18 9a1 1 0 110 2h-1a1 1 0 110-2h1zM16.22 15.78a1 1 0 01-1.42 1.42l-.7-.7a1 1 0 011.42-1.42l.7.7zM11 17a1 1 0 11-2 0v-1a1 1 0 112 0v1zM5.05 15.05a1 1 0 01-1.42-1.42l.7-.7a1 1 0 111.42 1.42l-.7.7zM3 11a1 1 0 110-2h1a1 1 0 110 2H3zM3.78 4.78a1 1 0 011.42-1.42l.7.7a1 1 0 01-1.42 1.42l-.7-.7zM10 6a4 4 0 100 8 4 4 0 000-8z" />
        </svg>
      </span>
      <span className="nav-theme-toggle__icon nav-theme-toggle__icon--moon" aria-hidden="true">
        <svg viewBox="0 0 20 20" fill="currentColor">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </span>
    </motion.button>
  );
};

/* â”€â”€â”€ Mega Menu â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const MegaMenu = ({ items, onClose }) => (
  <motion.div
    className="nav-mega-menu"
    initial={{ opacity: 0, y: 12, scale: 0.97 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 8, scale: 0.97 }}
    transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
    onMouseLeave={onClose}
  >
    <div className="nav-mega-inner">
      <div className="nav-mega-header">
        <span className="nav-mega-label">Our Services</span>
        <span className="nav-mega-sublabel">End-to-end digital solutions</span>
      </div>
      <div className="nav-mega-grid">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.2 }}
          >
            <Link
              href={item.href}
              className="nav-mega-card"
              onClick={onClose}
            >
              <span className="nav-mega-card-icon">{item.icon}</span>
              <span className="nav-mega-card-label">{item.label}</span>
              <span className="nav-mega-card-arrow">
                <svg viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div className="nav-mega-card-glow" />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

/* â”€â”€â”€ Hamburger Icon â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const HamburgerIcon = ({ isOpen }) => (
  <div className="nav-hamburger-icon" aria-hidden="true">
    <motion.span
      animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
      transition={{ duration: 0.25 }}
    />
    <motion.span
      animate={isOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
    />
    <motion.span
      animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
      transition={{ duration: 0.25 }}
    />
  </div>
);

/* â”€â”€â”€ Mobile Menu â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const MobileMenu = ({ isOpen, onClose }) => {
  const [expandedService, setExpandedService] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="nav-mobile-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className="nav-mobile-menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="nav-mobile-header">
              <Logo onClick={onClose} />
              <button className="nav-mobile-close" onClick={onClose} aria-label="Close menu">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <nav className="nav-mobile-links">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  className="nav-mobile-item"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                >
                  {link.megaMenu ? (
                    <>
                      <button
                        className={`nav-mobile-link nav-mobile-link--has-children ${expandedService ? 'is-expanded' : ''}`}
                        onClick={() => setExpandedService(!expandedService)}
                      >
                        {link.label}
                        <motion.span
                          className="nav-mobile-chevron"
                          animate={{ rotate: expandedService ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <svg viewBox="0 0 16 16" fill="none">
                            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        </motion.span>
                      </button>
                      <AnimatePresence>
                        {expandedService && (
                          <motion.div
                            className="nav-mobile-children"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                          >
                            {link.children.map((child) => (
                              <Link
                                key={child.label}
                                href={child.href}
                                className="nav-mobile-child-link"
                                onClick={onClose}
                              >
                                <span className="nav-mobile-child-icon">{child.icon}</span>
                                {child.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      className="nav-mobile-link"
                      onClick={onClose}
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </nav>

            <motion.div
              className="nav-mobile-footer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
            >
              <Link
                href="/contact"
                className="nav-mobile-cta"
                onClick={onClose}
              >
                Start Project
              </Link>
              <div className="nav-mobile-socials">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="nav-mobile-social"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    <SocialIcon icon={social.icon} />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* â”€â”€â”€ Navbar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
export default function Navbar() {
  const scrollY = useScrollY();
  const progress = useScrollProgress();
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollYRef = useRef(0);
  const [hidden, setHidden] = useState(false);
  const megaMenuTimer = useRef(null);

  /* hide/show on scroll direction */
  useEffect(() => {
    const prev = lastScrollYRef.current;
    lastScrollYRef.current = scrollY;
    if (scrollY < 80) {
      setHidden(false);
    } else if (scrollY > prev + 5) {
      setHidden(true);
      setMegaMenuOpen(false);
    } else if (scrollY < prev - 5) {
      setHidden(false);
    }
  }, [scrollY]);

  /* lock body scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const openMegaMenu = useCallback(() => {
    clearTimeout(megaMenuTimer.current);
    setMegaMenuOpen(true);
  }, []);

  const closeMegaMenu = useCallback(() => {
    megaMenuTimer.current = setTimeout(() => setMegaMenuOpen(false), 120);
  }, []);

  const isScrolled = scrollY > 50;

  return (
    <>
      {/* Progress Bar */}
      <div className="nav-progress-track" aria-hidden="true">
        <motion.div
          className="nav-progress-bar"
          style={{ scaleX: progress, transformOrigin: 'left' }}
        />
      </div>

      {/* Navbar */}
      <motion.header
        className={`navbar ${isScrolled ? 'navbar--scrolled' : ''} ${hidden ? 'navbar--hidden' : ''}`}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="nav-container">
          {/* Logo */}
          <Logo onClick={() => {}} />

          {/* Desktop Nav */}
          <nav className="nav-links" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <div
                key={link.label}
                className="nav-link-wrapper"
                onMouseEnter={link.megaMenu ? openMegaMenu : undefined}
                onMouseLeave={link.megaMenu ? closeMegaMenu : undefined}
              >
                <Link
                  href={link.href}
                  className={`nav-link ${link.megaMenu ? 'nav-link--has-mega' : ''}`}
                >
                  {link.label}
                  {link.megaMenu && (
                    <motion.span
                      className="nav-link-chevron"
                      animate={{ rotate: megaMenuOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      aria-hidden="true"
                    >
                      <svg viewBox="0 0 12 12" fill="none">
                        <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </motion.span>
                  )}
                  <span className="nav-link-underline" aria-hidden="true" />
                </Link>

                {link.megaMenu && (
                  <AnimatePresence>
                    {megaMenuOpen && (
                      <MegaMenu
                        items={link.children}
                        onClose={() => setMegaMenuOpen(false)}
                      />
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="nav-actions">
            <ThemeToggle />
            <Link href="/contact" className="nav-cta">
              <span>Start Project</span>
              <div className="nav-cta-glow" aria-hidden="true" />
            </Link>

            <button
              className={`nav-hamburger ${mobileOpen ? 'is-open' : ''}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <HamburgerIcon isOpen={mobileOpen} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
