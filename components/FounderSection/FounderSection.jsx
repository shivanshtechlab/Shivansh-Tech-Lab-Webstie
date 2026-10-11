'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import founderImg from '../../assets/founder.jpg';
import './FounderSection.css';

const SKILLS = ['Full-Stack Development', 'Android & iOS Apps', 'DevOps & Cloud'];

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
          <div className="founder__photo-col">
            <div className="founder__photo-glow" aria-hidden="true" />
            <div className="founder__frame">
              <Image
                src={founderImg}
                alt="Mukesh Tiwary — Founder, Shivansh Tech Lab"
                className="founder__photo"
                sizes="(max-width: 720px) 280px, 360px"
                priority={priority}
              />
              <div className="founder__nameplate">
                <span className="founder__nameplate-dot" aria-hidden="true" />
                Founder &amp; Lead Engineer
              </div>
            </div>
          </div>

          <div className="founder__content">
            <span className="founder__eyebrow">
              <span className="founder__eyebrow-line" aria-hidden="true" />
              Meet The Founder
            </span>

            <h2 className="founder__name">
              Mukesh <span className="gradient-text">Tiwary</span>
            </h2>
            <p className="founder__role">Founder, Shivansh Tech Lab</p>

            <p className="founder__bio">
              Full-stack &amp; mobile app developer (Android &amp; iOS) with hands-on DevOps
              expertise — building products end to end, from the first line of code to
              production deployment.
            </p>

            <ul className="founder__skills">
              {SKILLS.map((skill) => (
                <li key={skill} className="founder__skill">{skill}</li>
              ))}
            </ul>

            <Link href="/contact" className="founder__cta">
              Let&apos;s build together
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
