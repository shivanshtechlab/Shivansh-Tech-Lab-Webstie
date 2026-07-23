'use client'

import { useEffect, useRef, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import './CustomCursor.css';

const LERP_FACTOR = 0.12; // ring lag (0 = max lag, 1 = instant)
const TRAIL_SPEED_THRESHOLD = 8; // px/frame to spawn a trail dot
const MAX_TRAIL_DOTS = 12;

export default function CustomCursor() {
  const { cursorVariant, cursorText } = useApp();

  const dotRef = useRef(null);
  const ringRef = useRef(null);

  // Raw mouse position
  const mouse = useRef({ x: -200, y: -200 });
  // Smoothed ring position
  const ring = useRef({ x: -200, y: -200 });
  // Last mouse pos for velocity
  const lastMouse = useRef({ x: -200, y: -200 });
  // Trail dots pool
  const trailPool = useRef([]);
  const rafId = useRef(null);
  const isMobile = useRef(false);

  // â”€â”€ Spawn a trail particle â”€â”€
  const spawnTrail = useCallback((x, y) => {
    const el = document.createElement('div');
    el.className = 'cursor-trail-particle';
    const size = Math.random() * 4 + 2;
    el.style.cssText = `
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      opacity: ${Math.random() * 0.5 + 0.3};
    `;
    document.body.appendChild(el);
    trailPool.current.push(el);

    // Cleanup after animation
    setTimeout(() => {
      el.remove();
      trailPool.current = trailPool.current.filter(d => d !== el);
    }, 600);

    // Limit pool size
    if (trailPool.current.length > MAX_TRAIL_DOTS) {
      const old = trailPool.current.shift();
      old?.remove();
    }
  }, []);

  // â”€â”€ Animation loop â”€â”€
  const tick = useCallback(() => {
    if (!dotRef.current || !ringRef.current) {
      rafId.current = requestAnimationFrame(tick);
      return;
    }

    // Move dot instantly
    dotRef.current.style.left = `${mouse.current.x}px`;
    dotRef.current.style.top = `${mouse.current.y}px`;

    // Lerp ring
    ring.current.x += (mouse.current.x - ring.current.x) * LERP_FACTOR;
    ring.current.y += (mouse.current.y - ring.current.y) * LERP_FACTOR;
    ringRef.current.style.left = `${ring.current.x}px`;
    ringRef.current.style.top = `${ring.current.y}px`;

    // Check velocity for trail
    const dx = mouse.current.x - lastMouse.current.x;
    const dy = mouse.current.y - lastMouse.current.y;
    const speed = Math.sqrt(dx * dx + dy * dy);
    if (speed > TRAIL_SPEED_THRESHOLD) {
      spawnTrail(mouse.current.x, mouse.current.y);
    }
    lastMouse.current = { ...mouse.current };

    rafId.current = requestAnimationFrame(tick);
  }, [spawnTrail]);

  useEffect(() => {
    // Detect mobile
    isMobile.current = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile.current) return;

    // Add class to body to hide native cursor
    document.documentElement.classList.add('cursor-active');

    const onMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) dotRef.current.style.opacity = '1';
      if (ringRef.current) ringRef.current.style.opacity = '1';
    };

    const onMouseDown = () => {
      if (dotRef.current) dotRef.current.classList.add('clicking');
      if (ringRef.current) ringRef.current.classList.add('clicking');
    };

    const onMouseUp = () => {
      if (dotRef.current) dotRef.current.classList.remove('clicking');
      if (ringRef.current) ringRef.current.classList.remove('clicking');
    };

    const onMouseLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };

    const onMouseEnter = () => {
      if (dotRef.current) dotRef.current.style.opacity = '1';
      if (ringRef.current) ringRef.current.style.opacity = '1';
    };

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.documentElement.addEventListener('mouseleave', onMouseLeave);
    document.documentElement.addEventListener('mouseenter', onMouseEnter);

    rafId.current = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove('cursor-active');
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      document.documentElement.removeEventListener('mouseenter', onMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      // clean up any leftover trail dots
      trailPool.current.forEach(el => el.remove());
      trailPool.current = [];
    };
  }, [tick]);

  // â”€â”€ Update variant classes â”€â”€
  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const variantClass = `variant-${cursorVariant}`;
    // Remove all variant classes
    ['default', 'hover', 'click', 'text', 'drag'].forEach(v => {
      dot.classList.remove(`variant-${v}`);
      ring.classList.remove(`variant-${v}`);
    });

    if (cursorVariant !== 'default') {
      dot.classList.add(variantClass);
      ring.classList.add(variantClass);
    }
  }, [cursorVariant]);

  if (typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches) {
    return null;
  }

  return (
    <>
      <div
        ref={dotRef}
        className={`cursor-dot variant-${cursorVariant}`}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className={`cursor-ring variant-${cursorVariant}`}
        aria-hidden="true"
      >
        {cursorText && (
          <span className="cursor-text-label">{cursorText}</span>
        )}
      </div>
    </>
  );
}
