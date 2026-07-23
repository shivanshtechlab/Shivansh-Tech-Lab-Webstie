'use client'

import { useRef, useCallback } from 'react';
import './GlassCard.css';

function parseCurrentTransform(el) {
  const t = el.style.transform || '';
  const rxMatch = t.match(/rotateX\(([-\d.]+)deg\)/);
  const ryMatch = t.match(/rotateY\(([-\d.]+)deg\)/);
  const sMatch  = t.match(/scale3d\(([\d.]+)/);
  return {
    rx: rxMatch ? parseFloat(rxMatch[1]) : 0,
    ry: ryMatch ? parseFloat(ryMatch[1]) : 0,
    s:  sMatch  ? parseFloat(sMatch[1])  : 1,
  };
}

export default function GlassCard({
  children,
  className = '',
  variant = 'default',
  style,
  onClick,
  tiltAmount = 12,
  ...rest
}) {
  const cardRef  = useRef(null);
  const bounds   = useRef(null);
  const rafId    = useRef(null);

  const handleMouseEnter = useCallback(() => {
    if (!cardRef.current) return;
    bounds.current = cardRef.current.getBoundingClientRect();
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current || !bounds.current) return;
    cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      const { left, top, width, height } = bounds.current;
      const nx = ((e.clientX - left) / width) * 2 - 1;
      const ny = ((e.clientY - top) / height) * 2 - 1;
      const rotX = -ny * tiltAmount;
      const rotY =  nx * tiltAmount;
      cardRef.current.style.transform =
        `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02,1.02,1.02)`;
    });
  }, [tiltAmount]);

  const handleMouseLeave = useCallback(() => {
    cancelAnimationFrame(rafId.current);
    if (!cardRef.current) return;
    const start = parseCurrentTransform(cardRef.current);
    const startTime = performance.now();
    const dur = 400;
    const reset = (now) => {
      const p = Math.min((now - startTime) / dur, 1);
      const t = 1 - Math.pow(1 - p, 3);
      const rx = start.rx * (1 - t);
      const ry = start.ry * (1 - t);
      const s  = 1 + (start.s - 1) * (1 - t);
      cardRef.current.style.transform =
        `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(${s},${s},${s})`;
      if (p < 1) rafId.current = requestAnimationFrame(reset);
      else cardRef.current.style.transform = '';
    };
    rafId.current = requestAnimationFrame(reset);
  }, []);

  const classes = [
    'glass-card',
    `glass-card--${variant}`,
    onClick && 'glass-card--clickable',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      ref={cardRef}
      className={classes}
      style={style}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      <div className="glass-card-glow-edge" aria-hidden="true" />
      <div className="glass-card-content">{children}</div>
    </div>
  );
}
