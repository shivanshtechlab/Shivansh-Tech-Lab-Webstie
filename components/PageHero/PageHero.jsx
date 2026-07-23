'use client'

import { motion } from 'framer-motion';
import Link from 'next/link';
import './PageHero.css';

export default function PageHero({ badge, title, titleHighlight, subtitle, ctaText, ctaLink, breadcrumb }) {
  const parts = titleHighlight ? title.split(titleHighlight) : [title];

  return (
    <section className="page-hero">
      <div className="page-hero__bg" aria-hidden="true">
        <div className="page-hero__blob page-hero__blob--1" />
        <div className="page-hero__blob page-hero__blob--2" />
        <div className="page-hero__grid" />
      </div>
      <div className="container">
        {breadcrumb && (
          <motion.div
            className="page-hero__breadcrumb"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link href="/">Home</Link>
            <span> / </span>
            <span>{breadcrumb}</span>
          </motion.div>
        )}
        <motion.div
          className="page-hero__content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {badge && <span className="page-hero__badge">{badge}</span>}
          <h1 className="page-hero__title">
            {titleHighlight ? (
              <>
                {parts[0]}
                <span className="gradient-text">{titleHighlight}</span>
                {parts[1]}
              </>
            ) : (
              title
            )}
          </h1>
          {subtitle && <p className="page-hero__subtitle">{subtitle}</p>}
          {ctaText && ctaLink && (
            <Link href={ctaLink} className="page-hero__cta">
              {ctaText}
            </Link>
          )}
        </motion.div>
      </div>
    </section>
  );
}
