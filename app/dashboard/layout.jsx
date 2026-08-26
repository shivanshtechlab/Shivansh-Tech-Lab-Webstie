'use client'

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import logo from '../../assets/logo.png';
import './layout.css';

const NAV = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  },
  {
    label: 'User Management',
    href: '/dashboard/users',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
  },
  {
    label: 'Projects',
    href: '#',
    soon: true,
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
  },
  {
    label: 'Analytics',
    href: '#',
    soon: true,
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  },
  {
    label: 'Settings',
    href: '#',
    soon: true,
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
  },
];

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  function isActive(href) {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname?.startsWith(href);
  }

  return (
    <div className="db-layout">
      {/* ── Sidebar ── */}
      <aside className="db-sidebar">
        <div className="db-sidebar-header">
          <Link href="/" className="db-logo-link">
            <Image src={logo} alt="Shivansh Tech Lab" className="db-logo-img" priority />
          </Link>
          <div className="db-admin-badge">
            <span className="db-admin-badge-dot" />
            Admin Panel
          </div>
        </div>

        <nav className="db-nav" aria-label="Dashboard navigation">
          <span className="db-nav-label">Menu</span>
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`db-nav-item ${isActive(item.href) ? 'active' : ''} ${item.soon ? 'soon' : ''}`}
              aria-current={isActive(item.href) ? 'page' : undefined}
              onClick={item.soon ? (e) => e.preventDefault() : undefined}
            >
              <span className="db-nav-icon">{item.icon}</span>
              {item.label}
              {item.soon && <span className="db-soon-tag">Soon</span>}
            </Link>
          ))}
        </nav>

        <div className="db-sidebar-footer">
          <Link href="/" className="db-back-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            Back to Website
          </Link>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="db-main">
        {children}
      </main>
    </div>
  );
}
