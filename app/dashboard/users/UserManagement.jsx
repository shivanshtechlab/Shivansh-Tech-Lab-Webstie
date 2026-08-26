'use client'

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './UserManagement.css';

/* ── Constants ──────────────────────────────────────────────── */
const ROLES    = ['admin', 'manager', 'developer', 'designer', 'client'];
const PER_PAGE = 10;

const ROLE_META = {
  admin:     { color: '#6C63FF', bg: 'rgba(108,99,255,0.12)',  border: 'rgba(108,99,255,0.25)' },
  manager:   { color: '#00D9FF', bg: 'rgba(0,217,255,0.12)',   border: 'rgba(0,217,255,0.25)'  },
  developer: { color: '#A78BFA', bg: 'rgba(167,139,250,0.12)', border: 'rgba(167,139,250,0.25)'},
  designer:  { color: '#FF6B6B', bg: 'rgba(255,107,107,0.12)', border: 'rgba(255,107,107,0.25)'},
  client:    { color: '#00E676', bg: 'rgba(0,230,118,0.12)',   border: 'rgba(0,230,118,0.25)'  },
};

const EMPTY_FORM = { name: '', email: '', phone: '', role: 'client', status: 'active' };

/* ── Helpers ─────────────────────────────────────────────────── */
function fmtDate(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function validEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }

function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : ''; }

/* ── SVG Icons ───────────────────────────────────────────────── */
const IconPlus = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const IconSearch = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const IconEdit = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const IconTrash = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>
    <path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
  </svg>
);
const IconClose = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const IconUsers = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
  </svg>
);
const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);
const IconX = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
  </svg>
);
const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const IconChevronUp = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="18 15 12 9 6 15"/></svg>
);
const IconChevronDown = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
);
const IconChevronLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
);
const IconChevronRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
);
const IconWarn = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);
const IconErr = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

/* ── Toast System ────────────────────────────────────────────── */
function ToastItem({ toast, onDismiss }) {
  const icons = { success: <IconCheck />, error: <IconX />, info: <IconWarn />, warning: <IconWarn /> };
  return (
    <motion.div
      className={`um-toast ${toast.type}`}
      initial={{ opacity: 0, x: 60, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 60, scale: 0.85 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      <span className="um-toast-icon">{icons[toast.type] || icons.info}</span>
      <div className="um-toast-body">
        <p className="um-toast-title">{cap(toast.type)}</p>
        <p className="um-toast-msg">{toast.message}</p>
      </div>
      <button className="um-toast-close" onClick={() => onDismiss(toast.id)} aria-label="Close">
        <IconClose />
      </button>
    </motion.div>
  );
}

/* ── Stats Card ──────────────────────────────────────────────── */
function StatCard({ label, value, color, icon, loading }) {
  return (
    <div className="um-stat" style={{ borderColor: `${color}20` }}>
      <div className="um-stat-icon" style={{ background: `${color}18`, color }}>
        {icon}
      </div>
      <div className="um-stat-info">
        <div className="um-stat-value">
          {loading ? <span className="um-skel um-skel-text" style={{ width: 40, display: 'block' }} /> : value}
        </div>
        <div className="um-stat-label">{label}</div>
      </div>
    </div>
  );
}

/* ── Role Badge ──────────────────────────────────────────────── */
function RoleBadge({ role }) {
  const m = ROLE_META[role] || ROLE_META.client;
  return (
    <span className="um-role" style={{ background: m.bg, color: m.color, border: `1px solid ${m.border}` }}>
      <span className="um-role-dot" style={{ background: m.color }} />
      {cap(role)}
    </span>
  );
}

/* ── Skeleton Row ────────────────────────────────────────────── */
function SkeletonRow({ i }) {
  return (
    <tr>
      <td className="um-td-num"><span className="um-skel um-skel-text" style={{ width: 20 }} /></td>
      <td>
        <div className="um-user-cell">
          <span className="um-skel um-skel-circle" />
          <div>
            <div className="um-skel um-skel-text" style={{ width: 120, marginBottom: 6 }} />
            <div className="um-skel um-skel-text" style={{ width: 160 }} />
          </div>
        </div>
      </td>
      <td><span className="um-skel um-skel-text" style={{ width: 100 }} /></td>
      <td><span className="um-skel um-skel-text" style={{ width: 80 }} /></td>
      <td><span className="um-skel um-skel-text" style={{ width: 60 }} /></td>
      <td><span className="um-skel um-skel-text" style={{ width: 80 }} /></td>
      <td>
        <div style={{ display: 'flex', gap: 8 }}>
          <span className="um-skel" style={{ width: 32, height: 32, borderRadius: 8 }} />
          <span className="um-skel" style={{ width: 32, height: 32, borderRadius: 8 }} />
        </div>
      </td>
    </tr>
  );
}

/* ── User Row ────────────────────────────────────────────────── */
function UserRow({ user, num, onEdit, onDelete }) {
  const m = ROLE_META[user.role] || ROLE_META.client;
  return (
    <motion.tr
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <td className="um-td-num">{num}</td>
      <td>
        <div className="um-user-cell">
          <div className="um-avatar" style={{ background: m.bg, color: m.color, border: `1px solid ${m.border}` }}>
            {user.avatar || (user.name || '?').slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="um-user-name">{user.name}</div>
            <div className="um-user-email">{user.email}</div>
          </div>
        </div>
      </td>
      <td style={{ color: user.phone ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.2)' }}>
        {user.phone || '—'}
      </td>
      <td><RoleBadge role={user.role} /></td>
      <td>
        <span className={`um-status ${user.status}`}>
          <span className="um-status-dot" />
          {cap(user.status)}
        </span>
      </td>
      <td className="um-date">{fmtDate(user.createdAt)}</td>
      <td>
        <div className="um-actions">
          <button className="um-action edit" onClick={() => onEdit(user)} title="Edit user" aria-label="Edit user">
            <IconEdit />
          </button>
          <button className="um-action delete" onClick={() => onDelete(user)} title="Delete user" aria-label="Delete user">
            <IconTrash />
          </button>
        </div>
      </td>
    </motion.tr>
  );
}

/* ── Empty State ─────────────────────────────────────────────── */
function EmptyState({ onAdd, hasFilters }) {
  return (
    <div className="um-empty">
      <div className="um-empty-icon"><IconUsers /></div>
      <h3 className="um-empty-title">{hasFilters ? 'No results found' : 'No users yet'}</h3>
      <p className="um-empty-sub">
        {hasFilters ? 'Try adjusting your search or filters.' : 'Create your first user to get started.'}
      </p>
      {!hasFilters && (
        <button className="um-empty-btn" onClick={onAdd}>
          <IconPlus /> Add First User
        </button>
      )}
    </div>
  );
}

/* ── Pagination ──────────────────────────────────────────────── */
function Pagination({ page, total, perPage, onChange }) {
  const totalPages = Math.ceil(total / perPage);
  const from = (page - 1) * perPage + 1;
  const to   = Math.min(page * perPage, total);

  function pages() {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (page <= 4)       return [1, 2, 3, 4, 5, '…', totalPages];
    if (page >= totalPages - 3) return [1, '…', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, '…', page - 1, page, page + 1, '…', totalPages];
  }

  return (
    <div className="um-pagination">
      <span className="um-page-info">Showing {from}–{to} of {total} users</span>
      <div className="um-pages">
        <button className="um-page-btn" onClick={() => onChange(page - 1)} disabled={page === 1} aria-label="Previous">
          <IconChevronLeft />
        </button>
        {pages().map((p, i) =>
          p === '…'
            ? <span key={`e${i}`} className="um-page-ellipsis">…</span>
            : <button key={p} className={`um-page-btn ${page === p ? 'active' : ''}`} onClick={() => onChange(p)}>{p}</button>
        )}
        <button className="um-page-btn" onClick={() => onChange(page + 1)} disabled={page === totalPages} aria-label="Next">
          <IconChevronRight />
        </button>
      </div>
    </div>
  );
}

/* ── User Modal (Create / Edit) ──────────────────────────────── */
function UserModal({ open, mode, form, errors, onChange, onClose, onSubmit, loading }) {
  if (!open) return null;
  const isEdit = mode === 'edit';

  return (
    <div className="um-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <motion.div
        className="um-modal"
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Head */}
        <div className="um-modal-head">
          <div className="um-modal-title-wrap">
            <div className="um-modal-icon">
              {isEdit ? <IconEdit /> : <IconPlus />}
            </div>
            <div>
              <h2 className="um-modal-title">{isEdit ? 'Edit User' : 'Add New User'}</h2>
              <p className="um-modal-sub">{isEdit ? 'Update user information' : 'Fill in the details below'}</p>
            </div>
          </div>
          <button className="um-modal-close" onClick={onClose} aria-label="Close"><IconClose /></button>
        </div>
        <div className="um-modal-divider" />

        {/* Body */}
        <div className="um-modal-body">
          <form id="um-form" onSubmit={onSubmit} noValidate>
            {/* Row 1: Name + Email */}
            <div className="um-form-grid">
              <div className="um-field">
                <label className="um-label" htmlFor="f-name">Full Name <span className="um-label-req">*</span></label>
                <input id="f-name" className={`um-input ${errors.name ? 'err' : ''}`} placeholder="e.g. John Smith"
                  value={form.name} onChange={e => onChange('name', e.target.value)} autoComplete="off" />
                {errors.name && <span className="um-field-err"><IconErr />{errors.name}</span>}
              </div>
              <div className="um-field">
                <label className="um-label" htmlFor="f-email">Email Address <span className="um-label-req">*</span></label>
                <input id="f-email" type="email" className={`um-input ${errors.email ? 'err' : ''}`} placeholder="john@company.com"
                  value={form.email} onChange={e => onChange('email', e.target.value)} autoComplete="off" />
                {errors.email && <span className="um-field-err"><IconErr />{errors.email}</span>}
              </div>
            </div>

            {/* Row 2: Phone + Role */}
            <div className="um-form-grid">
              <div className="um-field">
                <label className="um-label" htmlFor="f-phone">Phone Number</label>
                <input id="f-phone" type="tel" className="um-input" placeholder="+91 98765 43210"
                  value={form.phone} onChange={e => onChange('phone', e.target.value)} />
              </div>
              <div className="um-field">
                <label className="um-label" htmlFor="f-role">Role <span className="um-label-req">*</span></label>
                <select id="f-role" className={`um-sel ${errors.role ? 'err' : ''}`}
                  value={form.role} onChange={e => onChange('role', e.target.value)}>
                  {ROLES.map(r => <option key={r} value={r}>{cap(r)}</option>)}
                </select>
                {errors.role && <span className="um-field-err"><IconErr />{errors.role}</span>}
              </div>
            </div>

            {/* Status toggle */}
            <div className="um-field">
              <label className="um-label">Status</label>
              <div className="um-status-toggle">
                <button type="button"
                  className={`um-status-opt ${form.status === 'active' ? 'sel-active' : ''}`}
                  onClick={() => onChange('status', 'active')}>
                  <IconCheck /> Active
                </button>
                <button type="button"
                  className={`um-status-opt ${form.status === 'inactive' ? 'sel-inactive' : ''}`}
                  onClick={() => onChange('status', 'inactive')}>
                  <IconX /> Inactive
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="um-modal-foot">
          <button className="um-btn-cancel" onClick={onClose} disabled={loading}>Cancel</button>
          <button className="um-btn-submit" form="um-form" type="submit" disabled={loading}>
            {loading ? <span className="um-spinner" /> : (isEdit ? <IconEdit /> : <IconPlus />)}
            {loading ? (isEdit ? 'Updating…' : 'Creating…') : (isEdit ? 'Update User' : 'Create User')}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Delete Modal ────────────────────────────────────────────── */
function DeleteModal({ open, user, onClose, onConfirm, loading }) {
  if (!open || !user) return null;
  return (
    <div className="um-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <motion.div
        className="um-del-modal"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="um-del-icon"><IconTrash /></div>
        <h3 className="um-del-title">Delete User</h3>
        <p className="um-del-msg">
          Are you sure you want to delete <span className="um-del-name">"{user.name}"</span>?
        </p>
        <p className="um-del-warn">⚠ This action cannot be undone.</p>
        <div className="um-del-actions">
          <button className="um-btn-cancel um-del-cancel" onClick={onClose} disabled={loading}>Cancel</button>
          <button className="um-del-confirm" onClick={onConfirm} disabled={loading}>
            {loading ? <span className="um-spinner" /> : <IconTrash />}
            {loading ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════════ */
export default function UserManagement() {
  /* ── Data state ── */
  const [users,    setUsers]    = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [apiError, setApiError] = useState(null);

  /* ── Filter / sort / pagination ── */
  const [search,       setSearch]       = useState('');
  const [roleFilter,   setRoleFilter]   = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortKey,      setSortKey]      = useState('createdAt');
  const [sortDir,      setSortDir]      = useState('desc');
  const [page,         setPage]         = useState(1);

  /* ── Modal state ── */
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [editUser,  setEditUser]  = useState(null);
  const [form,      setForm]      = useState(EMPTY_FORM);
  const [formErrors,setFormErrors]= useState({});
  const [submitting,setSubmitting]= useState(false);

  /* ── Delete state ── */
  const [delTarget, setDelTarget] = useState(null);
  const [deleting,  setDeleting]  = useState(false);

  /* ── Toast state ── */
  const [toasts, setToasts] = useState([]);

  /* ── Toast helper ── */
  const notify = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3800);
  }, []);

  const dismissToast = useCallback((id) => setToasts(prev => prev.filter(t => t.id !== id)), []);

  /* ── Load users ── */
  const loadUsers = useCallback(async () => {
    setLoading(true);
    setApiError(null);
    try {
      const res = await fetch('/api/users');
      const data = await res.json();
      if (data.success) setUsers(data.data);
      else setApiError(data.message || 'Failed to load users');
    } catch {
      setApiError('Cannot connect to server. Check your database connection.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadUsers(); }, [loadUsers]);

  /* ── Filtered + sorted list ── */
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return users
      .filter(u => {
        const mSearch = !q
          || u.name.toLowerCase().includes(q)
          || u.email.toLowerCase().includes(q)
          || (u.phone && u.phone.includes(q));
        const mRole   = roleFilter   === 'all' || u.role   === roleFilter;
        const mStatus = statusFilter === 'all' || u.status === statusFilter;
        return mSearch && mRole && mStatus;
      })
      .sort((a, b) => {
        let va = a[sortKey] ?? '';
        let vb = b[sortKey] ?? '';
        if (typeof va === 'string') va = va.toLowerCase();
        if (typeof vb === 'string') vb = vb.toLowerCase();
        return sortDir === 'asc' ? (va > vb ? 1 : -1) : (va < vb ? 1 : -1);
      });
  }, [users, search, roleFilter, statusFilter, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  /* ── Stats ── */
  const stats = useMemo(() => ({
    total:    users.length,
    active:   users.filter(u => u.status === 'active').length,
    inactive: users.filter(u => u.status === 'inactive').length,
    admins:   users.filter(u => u.role   === 'admin').length,
  }), [users]);

  /* ── Sort toggle ── */
  function toggleSort(key) {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  }

  function SortIcon({ col }) {
    if (sortKey !== col) return <span className="um-sort-icon"><IconChevronDown /></span>;
    return (
      <span className="um-sort-icon active">
        {sortDir === 'asc' ? <IconChevronUp /> : <IconChevronDown />}
      </span>
    );
  }

  /* ── Reset filters ── */
  function resetFilters() { setSearch(''); setRoleFilter('all'); setStatusFilter('all'); setPage(1); }
  const hasFilters = search || roleFilter !== 'all' || statusFilter !== 'all';

  /* ── Open create modal ── */
  function openCreate() {
    setForm(EMPTY_FORM);
    setFormErrors({});
    setEditUser(null);
    setModalMode('create');
    setModalOpen(true);
  }

  /* ── Open edit modal ── */
  function openEdit(user) {
    setForm({ name: user.name, email: user.email, phone: user.phone || '', role: user.role, status: user.status });
    setFormErrors({});
    setEditUser(user);
    setModalMode('edit');
    setModalOpen(true);
  }

  /* ── Close modal ── */
  function closeModal() { setModalOpen(false); setFormErrors({}); }

  /* ── Form change ── */
  function handleChange(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
    setFormErrors(prev => ({ ...prev, [field]: '' }));
  }

  /* ── Validate ── */
  function validate(f) {
    const e = {};
    if (!f.name.trim())              e.name  = 'Full name is required';
    else if (f.name.trim().length < 2) e.name = 'Name must be at least 2 characters';
    if (!f.email.trim())             e.email = 'Email is required';
    else if (!validEmail(f.email))   e.email = 'Enter a valid email address';
    if (!f.role)                     e.role  = 'Please select a role';
    return e;
  }

  /* ── Submit (create / edit) ── */
  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setFormErrors(errs); return; }

    setSubmitting(true);
    try {
      const url    = modalMode === 'create' ? '/api/users' : `/api/users/${editUser.id}`;
      const method = modalMode === 'create' ? 'POST' : 'PUT';
      const res  = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json();

      if (data.success) {
        notify(data.message, 'success');
        closeModal();
        loadUsers();
      } else {
        notify(data.message || 'Something went wrong', 'error');
      }
    } catch {
      notify('Network error. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  }

  /* ── Delete ── */
  async function handleDelete() {
    if (!delTarget) return;
    setDeleting(true);
    try {
      const res  = await fetch(`/api/users/${delTarget.id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        notify(data.message, 'success');
        setDelTarget(null);
        loadUsers();
      } else {
        notify(data.message || 'Delete failed', 'error');
      }
    } catch {
      notify('Network error. Please try again.', 'error');
    } finally {
      setDeleting(false);
    }
  }

  /* ── Sync page when filtered list shrinks ── */
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  /* ══════════════════ RENDER ══════════════════ */
  return (
    <div className="um">
      {/* Toasts */}
      <div className="um-toasts">
        <AnimatePresence>
          {toasts.map(t => <ToastItem key={t.id} toast={t} onDismiss={dismissToast} />)}
        </AnimatePresence>
      </div>

      {/* ── Header ── */}
      <div className="um-header">
        <div>
          <h1 className="um-title">User Management</h1>
          <p className="um-subtitle">Manage all system users, roles and permissions</p>
        </div>
        <button className="um-add-btn" onClick={openCreate}>
          <IconPlus /> Add User
        </button>
      </div>

      {/* ── Stats ── */}
      <div className="um-stats">
        <StatCard label="Total Users"    value={stats.total}    color="#6C63FF" icon={<IconUsers />}  loading={loading} />
        <StatCard label="Active Users"   value={stats.active}   color="#00E676" icon={<IconCheck />}  loading={loading} />
        <StatCard label="Inactive Users" value={stats.inactive} color="#FF4C4C" icon={<IconX />}      loading={loading} />
        <StatCard label="Admins"         value={stats.admins}   color="#7C3AED" icon={<IconShield />} loading={loading} />
      </div>

      {/* ── Toolbar ── */}
      <div className="um-toolbar">
        <div className="um-search-wrap">
          <span className="um-search-icon"><IconSearch /></span>
          <input
            className="um-search"
            placeholder="Search by name, email or phone…"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
          />
          {search && <button className="um-search-clear" onClick={() => { setSearch(''); setPage(1); }}>×</button>}
        </div>

        <div className="um-filters">
          <select className="um-select" value={roleFilter} onChange={e => { setRoleFilter(e.target.value); setPage(1); }}>
            <option value="all">All Roles</option>
            {ROLES.map(r => <option key={r} value={r}>{cap(r)}</option>)}
          </select>
          <select className="um-select" value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}>
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          {hasFilters && (
            <button className="um-reset-btn" onClick={resetFilters}>✕ Reset</button>
          )}
        </div>

        <span className="um-count">{loading ? '…' : `${filtered.length} user${filtered.length !== 1 ? 's' : ''}`}</span>
      </div>

      {/* ── Error ── */}
      {apiError && (
        <div className="um-error">
          <span className="um-error-icon"><IconErr /></span>
          <div>
            <p className="um-error-title">Connection Error</p>
            <p className="um-error-msg">{apiError}</p>
            <button className="um-error-retry" onClick={loadUsers}>Retry</button>
          </div>
        </div>
      )}

      {/* ── Table ── */}
      {!apiError && (
        <div className="um-table-wrap">
          <table className="um-table">
            <thead>
              <tr>
                <th>#</th>
                <th className="sortable" onClick={() => toggleSort('name')}>
                  User <SortIcon col="name" />
                </th>
                <th>Phone</th>
                <th className="sortable" onClick={() => toggleSort('role')}>
                  Role <SortIcon col="role" />
                </th>
                <th className="sortable" onClick={() => toggleSort('status')}>
                  Status <SortIcon col="status" />
                </th>
                <th className="sortable" onClick={() => toggleSort('createdAt')}>
                  Joined <SortIcon col="createdAt" />
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
                : paginated.length === 0
                  ? (
                    <tr>
                      <td colSpan={7} style={{ padding: 0 }}>
                        <EmptyState onAdd={openCreate} hasFilters={!!hasFilters} />
                      </td>
                    </tr>
                  )
                  : paginated.map((u, i) => (
                    <UserRow
                      key={u.id}
                      user={u}
                      num={(page - 1) * PER_PAGE + i + 1}
                      onEdit={openEdit}
                      onDelete={setDelTarget}
                    />
                  ))
              }
            </tbody>
          </table>
        </div>
      )}

      {/* ── Pagination ── */}
      {!loading && !apiError && filtered.length > PER_PAGE && (
        <Pagination page={page} total={filtered.length} perPage={PER_PAGE} onChange={setPage} />
      )}

      {/* ── Modals ── */}
      <AnimatePresence>
        {modalOpen && (
          <UserModal
            open={modalOpen}
            mode={modalMode}
            form={form}
            errors={formErrors}
            onChange={handleChange}
            onClose={closeModal}
            onSubmit={handleSubmit}
            loading={submitting}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {delTarget && (
          <DeleteModal
            open={!!delTarget}
            user={delTarget}
            onClose={() => setDelTarget(null)}
            onConfirm={handleDelete}
            loading={deleting}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
