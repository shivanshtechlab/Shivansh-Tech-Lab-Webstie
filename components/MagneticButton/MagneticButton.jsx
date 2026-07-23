'use client'

import { useRef, useCallback } from 'react';
import './MagneticButton.css';

/**
 * MagneticButton
 * Wraps any children and applies a magnetic pull toward the cursor.
 *
 * @param {number} strength  - how strongly it pulls (0â€“1, default 0.4)
 * @param {number} radius    - activation radius multiplier vs element size (default 1.5)
 */
export default function MagneticButton({
  children,
  className = '',
  strength = 0.4,
  radius = 1.5,
  ...rest
}) {
  const wrapRef    = useRef(null);
  const rafId      = useRef(null);
  const current    = useRef({ x: 0, y: 0 });
  const target     = useRef({ x: 0, y: 0 });
  const animating  = useRef(false);

  const lerp = (a, b, t) => a + (b - a) * t;

  const animate = useCallback(() => {
    const el = wrapRef.current;
    if (!el) return;
    current.current.x = lerp(current.current.x, target.current.x, 0.1);
    current.current.y = lerp(current.current.y, target.current.y, 0.1);
    el.style.transform = `translate(${current.current.x}px, ${current.current.y}px)`;
    if (
      Math.abs(current.current.x - target.current.x) > 0.05 ||
      Math.abs(current.current.y - target.current.y) > 0.05
    ) {
      rafId.current = requestAnimationFrame(animate);
    } else {
      el.style.transform = `translate(${target.current.x}px, ${target.current.y}px)`;
      animating.current = false;
    }
  }, []);

  const handleMouseMove = useCallback((e) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const maxD = Math.max(rect.width, rect.height) * radius;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > maxD) return;
    const pull = (1 - dist / maxD) * strength;
    target.current.x = dx * pull;
    target.current.y = dy * pull;
    if (!animating.current) {
      animating.current = true;
      rafId.current = requestAnimationFrame(animate);
    }
  }, [animate, strength, radius]);

  const handleMouseLeave = useCallback(() => {
    target.current = { x: 0, y: 0 };
    if (!animating.current) {
      animating.current = true;
      rafId.current = requestAnimationFrame(animate);
    }
  }, [animate]);

  const classes = ['magnetic-btn', className].filter(Boolean).join(' ');

  return (
    <div
      ref={wrapRef}
      className={classes}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      {children}
    </div>
  );
}
