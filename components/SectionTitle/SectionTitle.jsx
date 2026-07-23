'use client'

import { useEffect, useRef, useState } from 'react';
import './SectionTitle.css';

export default function SectionTitle({
  badge,
  title,
  subtitle,
  align = 'center',
  className = '',
}) {
  const rootRef  = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const cls = [
    'section-title',
    `section-title--${align}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div ref={rootRef} className={cls}>
      {badge && (
        <div className={`section-title-reveal delay-1 ${visible ? 'visible' : ''}`}>
          <div className="section-title-badge">
            <span className="section-title-badge-dot" aria-hidden="true" />
            {badge}
          </div>
        </div>
      )}

      <h2 className={`section-title-heading section-title-reveal delay-2 ${visible ? 'visible' : ''}`}>
        {title}
      </h2>

      <div
        className={`section-title-underline section-title-underline-reveal delay-3 ${visible ? 'visible' : ''}`}
        aria-hidden="true"
      >
        <div
          className={`section-title-underline-bar section-title-underline-bar--main ${visible ? 'visible' : ''}`}
        />
        <div className="section-title-underline-bar section-title-underline-bar--accent" />
      </div>

      {subtitle && (
        <p className={`section-title-subtitle section-title-reveal delay-4 ${visible ? 'visible' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
