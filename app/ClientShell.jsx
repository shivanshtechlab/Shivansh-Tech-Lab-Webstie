'use client'

import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import Navbar from '../components/Navbar/Navbar';
import Loader from '../components/Loader/Loader';
import Toast from '../components/Toast/Toast';
import { useLoader } from '../context/LoaderContext';
import { useApp } from '../context/AppContext';

export default function ClientShell({ children }) {
  const { isLoading } = useLoader();
  const { toasts, removeToast } = useApp();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    if (isLoading) {
      document.body.classList.add('loading');
    } else {
      document.body.classList.remove('loading');
    }
  }, [isLoading]);

  return (
    <>
      <div className="noise-overlay" aria-hidden="true" />
      <Navbar />
      {children}
      <AnimatePresence>
        {isLoading && <Loader key="loader" />}
      </AnimatePresence>
      <div className="toast-container" aria-live="polite">
        {toasts.map(toast => (
          <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </>
  );
}
