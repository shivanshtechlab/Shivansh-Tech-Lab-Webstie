'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';
import founderImg from '../../assets/founder.jpg';
import './FounderSection.css';

export default function FounderSection({ priority = false }) {
  return (
    <section className="founder">
      <div className="container">
        <motion.div
          className="founder__card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="founder__heading-col">
            <h2 className="founder__heading">
              Meet
              <br />
              The
              <br />
              <span className="gradient-text">Founder</span>
            </h2>
          </div>

          <div className="founder__info-col">
            <div className="founder__dots" aria-hidden="true">
              <span className="founder__dot founder__dot--1" />
              <span className="founder__dot founder__dot--2" />
              <span className="founder__dot founder__dot--3" />
            </div>
            <h3 className="founder__name">Mukesh Tieary</h3>
            <p className="founder__bio">
              Founder, Shivansh Tech Lab.
              <br />
              Full-stack &amp; mobile app developer (Android &amp; iOS) with hands-on DevOps expertise.
            </p>
          </div>

          <div className="founder__photo-col">
            <div className="founder__photo-glow" aria-hidden="true" />
            <Image
              src={founderImg}
              alt="Mukesh Tieary — Founder, Shivansh Tech Lab"
              className="founder__photo"
              sizes="(max-width: 640px) 220px, 280px"
              priority={priority}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
