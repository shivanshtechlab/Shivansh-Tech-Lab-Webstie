'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import { faqs } from '../../data/faq';
import './FAQ.css';

function FAQItem({ faq, isOpen, onToggle, delay }) {
  return (
    <ScrollReveal variant="fadeUp" delay={delay}>
      <div className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}>
        <button
          className="faq-item__trigger"
          onClick={onToggle}
          aria-expanded={isOpen}
        >
          <span className="faq-item__question">{faq.question}</span>
          <span className="faq-item__icon" aria-hidden="true">
            <motion.svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              animate={{ rotate: isOpen ? 45 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <path d="M12 5v14M5 12h14" strokeLinecap="round" />
            </motion.svg>
          </span>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              className="faq-item__body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="faq-item__answer">{faq.answer}</div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="faq-item__accent" />
      </div>
    </ScrollReveal>
  );
}

export default function FAQ() {
  const [openId, setOpenId] = useState(1);

  const half = Math.ceil(faqs.length / 2);
  const col1 = faqs.slice(0, half);
  const col2 = faqs.slice(half);

  const toggle = (id) => setOpenId(prev => prev === id ? null : id);

  return (
    <section className="faq-section" id="faq">
      <div className="faq-section__bg">
        <div className="faq-section__glow faq-section__glow--1" />
        <div className="faq-section__glow faq-section__glow--2" />
      </div>

      <div className="container">
        <ScrollReveal>
          <SectionTitle
            badge="FAQ"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know before getting started. Can't find your answer? We're just a message away."
          />
        </ScrollReveal>

        <div className="faq-grid">
          <div className="faq-col">
            {col1.map((faq, i) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                isOpen={openId === faq.id}
                onToggle={() => toggle(faq.id)}
                delay={i * 0.06}
              />
            ))}
          </div>
          <div className="faq-col">
            {col2.map((faq, i) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                isOpen={openId === faq.id}
                onToggle={() => toggle(faq.id)}
                delay={i * 0.06 + 0.1}
              />
            ))}
          </div>
        </div>

        <ScrollReveal delay={0.2}>
          <div className="faq-cta">
            <div className="faq-cta__icon">💬</div>
            <div className="faq-cta__text">
              <span className="faq-cta__title">Still have questions?</span>
              <span className="faq-cta__sub">Our team responds within 2 hours on business days.</span>
            </div>
            <a href="#contact" className="faq-cta__btn">
              Ask Us Anything
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 10h10M11 6l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
