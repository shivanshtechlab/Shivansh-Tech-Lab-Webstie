'use client'

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import logo from '../../assets/logo.png';
import { useLoader } from '../../context/LoaderContext';
import './Loader.css';

const COMPANY_LETTERS = ['S', 'H', 'I', 'V', 'A', 'N', 'S', 'H', ' ', 'T', 'E', 'C', 'H', ' ', 'L', 'A', 'B'];

const STATUSES = [
  'Initializing systems...',
  'Loading assets...',
  'Calibrating experience...',
  'Almost ready...',
];

export default function Loader() {
  const { isLoading, progress } = useLoader();
  const [statusIdx, setStatusIdx] = useState(0);

  useEffect(() => {
    if (!isLoading) return;
    const interval = setInterval(() => {
      setStatusIdx(i => (i + 1) % STATUSES.length);
    }, 900);
    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="loader-wrapper"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Gradient blobs */}
          <div className="loader-blob loader-blob--purple" />
          <div className="loader-blob loader-blob--cyan" />
          <div className="loader-blob loader-blob--accent" />

          {/* Grid */}
          <div className="loader-grid" />
          <div className="loader-scanlines" />

          {/* Particles */}
          <div className="loader-particles">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="loader-particle" />
            ))}
          </div>

          {/* Main content */}
          <div className="loader-content">
            {/* SVG Logo */}
            <motion.div
              className="loader-logo"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <div className="loader-logo-ring" />
              <div className="loader-logo-ring-2" />

              <Image
                src={logo}
                alt="Shivansh Tech Lab"
                className="loader-logo-img"
              />
            </motion.div>

            {/* Company name */}
            <motion.div
              className="loader-name"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="loader-letters">
                {COMPANY_LETTERS.map((letter, i) => (
                  <motion.span
                    key={i}
                    className="loader-letter"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.6 + i * 0.05,
                      duration: 0.4,
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                  >
                    {letter === ' ' ? ' ' : letter}
                  </motion.span>
                ))}
              </div>
              <motion.p
                className="loader-tagline"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.5 }}
              >
                Crafting Digital Excellence
              </motion.p>
            </motion.div>

            {/* Progress */}
            <motion.div
              className="loader-progress-wrapper"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <div className="loader-progress-bar">
                <div
                  className="loader-progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="loader-progress-text">
                Loading <span>{progress}%</span>
              </div>
            </motion.div>

            {/* Status text */}
            <motion.div
              className="loader-status"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.4 }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={statusIdx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  {STATUSES[statusIdx]}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
