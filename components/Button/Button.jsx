'use client'

import { useRef, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import './Button.css';

/**
 * Premium Button Component
 *
 * @param {object} props
 * @param {'primary'|'secondary'|'ghost'|'outline'} props.variant
 * @param {'sm'|'md'|'lg'} props.size
 * @param {boolean} props.loading
 * @param {boolean} props.disabled
 * @param {React.ReactNode} props.iconLeft
 * @param {React.ReactNode} props.iconRight
 * @param {string} props.className
 * @param {React.ReactNode} props.children
 * @param {string} props.as - 'button' | 'a' | etc.
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  iconLeft,
  iconRight,
  className = '',
  children,
  as: Tag = 'button',
  onClick,
  ...rest
}) {
  const { setCursor } = useApp();
  const btnRef = useRef(null);
  const magnetOffset = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);

  // ── Ripple effect ──
  const createRipple = useCallback((e) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const ripple = document.createElement('span');
    ripple.className = 'btn-ripple';
    ripple.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
    `;
    btn.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
  }, []);

  // ── Magnetic effect ──
  const handleMouseMove = useCallback((e) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxDist = Math.max(rect.width, rect.height) * 0.8;
    const strength = Math.max(0, 1 - dist / maxDist);
    const targetX = dx * strength * 0.35;
    const targetY = dy * strength * 0.35;

    cancelAnimationFrame(rafId.current);
    magnetOffset.current = { x: targetX, y: targetY };
    btn.style.transform = `translate(${targetX}px, ${targetY}px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const btn = btnRef.current;
    if (!btn) return;
    // Spring back
    const startX = magnetOffset.current.x;
    const startY = magnetOffset.current.y;
    let progress = 0;
    const duration = 400;
    const startTime = performance.now();

    const springBack = (now) => {
      progress = Math.min((now - startTime) / duration, 1);
      // Ease out cubic
      const t = 1 - Math.pow(1 - progress, 3);
      const x = startX * (1 - t);
      const y = startY * (1 - t);
      btn.style.transform = `translate(${x}px, ${y}px)`;
      if (progress < 1) rafId.current = requestAnimationFrame(springBack);
      else btn.style.transform = '';
    };
    rafId.current = requestAnimationFrame(springBack);
    setCursor('default');
  }, [setCursor]);

  const handleMouseEnter = useCallback(() => {
    setCursor('hover');
  }, [setCursor]);

  const handleClick = useCallback((e) => {
    createRipple(e);
    if (onClick) onClick(e);
  }, [createRipple, onClick]);

  const classes = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    loading && 'btn--loading',
    disabled && 'btn--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag
      ref={btnRef}
      className={classes}
      disabled={disabled || loading}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      {...rest}
    >
      {loading && <span className="btn-spinner" aria-hidden="true" />}

      {!loading && iconLeft && (
        <span className="btn-icon btn-icon--left" aria-hidden="true">
          {iconLeft}
        </span>
      )}

      <span className="btn-text">{children}</span>

      {!loading && iconRight && (
        <span className="btn-icon btn-icon--right" aria-hidden="true">
          {iconRight}
        </span>
      )}
    </Tag>
  );
}
