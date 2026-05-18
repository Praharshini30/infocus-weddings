import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Calendar, MapPin, X, CheckCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import './Admin.css';

export default function InquiryManager() {
  const { inquiries, markInquiryRead } = useApp();
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');

  const filtered = inquiries.filter(i => {
    if (filter === 'unread') return !i.read;
    if (filter === 'read') return i.read;
    return true;
  });

  const openInquiry = (inq) => {
    setSelected(inq);
    if (!inq.read) markInquiryRead(inq.id);
  };

  return (
    <div>
      <div className="admin-page-header" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h1 className="admin-page-title">Inquiries</h1>
          <p className="admin-page-sub">Customer booking requests and contact form submissions.</p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
          {['all', 'unread', 'read'].map(f => (
            <button key={f} className={`filter-btn ${filter === f ? 'filter-btn--active' : ''}`} onClick={() => setFilter(f)} style={{ textTransform: 'capitalize' }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="admin-table-wrap">
        {filtered.length > 0 ? (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Status</th>
                <th>Name</th>
                <th>Service</th>
                <th>Event Date</th>
                <th>Received</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(inq => (
                <tr key={inq.id} style={{ opacity: inq.read ? 0.7 : 1 }}>
                  <td>
                    {inq.read ? (
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Read</span>
                    ) : (
                      <span className="badge-featured">New</span>
                    )}
                  </td>
                  <td style={{ color: 'var(--color-text-primary)', fontWeight: inq.read ? 400 : 600 }}>{inq.name}</td>
                  <td>{inq.service || '—'}</td>
                  <td>{inq.eventDate || '—'}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    {inq.date ? new Date(inq.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                  </td>
                  <td>
                    <button
                      className="btn btn-ghost"
                      style={{ fontSize: '0.75rem', padding: '0.4rem 0.875rem' }}
                      onClick={() => openInquiry(inq)}
                      id={`inquiry-view-${inq.id}`}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="admin-empty">
            <p>No {filter !== 'all' ? filter : ''} inquiries found.</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (
          <div className="admin-modal-overlay" onClick={() => setSelected(null)}>
            <motion.div
              className="admin-modal"
              onClick={e => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{ maxWidth: 580 }}
            >
              <button className="admin-modal__close" onClick={() => setSelected(null)}><X size={16} /></button>

              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
                <div style={{
                  width: 52, height: 52, borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--color-accent-dark), var(--color-accent))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, color: 'var(--color-bg)', fontSize: '1rem'
                }}>
                  {selected.name?.charAt(0)?.toUpperCase()}
                </div>
                <div>
                  <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>{selected.name}</h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    <CheckCircle size={12} style={{ color: 'var(--color-accent)' }} />
                    Received {selected.date ? new Date(selected.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'N/A'}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
                {[
                  { icon: <Mail size={14} />, label: 'Email', val: selected.email },
                  { icon: <Phone size={14} />, label: 'Phone', val: selected.phone },
                  { icon: null, label: 'Service', val: selected.service },
                  { icon: <Calendar size={14} />, label: 'Event Date', val: selected.eventDate || 'Not specified' },
                  { icon: <MapPin size={14} />, label: 'Location', val: selected.location || 'Not specified' },
                  { icon: null, label: 'Budget', val: selected.budget || 'Not specified' },
                ].map((row, i) => (
                  <div key={i} style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'flex-start' }}>
                    <span style={{ width: 80, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-muted)', paddingTop: 2 }}>{row.label}</span>
                    <span style={{ fontSize: '0.875rem', color: 'var(--color-text-primary)' }}>{row.val}</span>
                  </div>
                ))}
              </div>

              <div style={{ background: 'var(--color-bg-elevated)', borderRadius: 'var(--radius-md)', padding: 'var(--space-lg)', marginBottom: 'var(--space-xl)' }}>
                <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-accent)', marginBottom: 'var(--space-sm)' }}>Message</div>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>{selected.message}</p>
              </div>

              <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
                <a
                  href={`mailto:${selected.email}?subject=Re: Photography Inquiry from Infocus Weddings&body=Dear ${selected.name},%0A%0AThank you for your inquiry...`}
                  className="btn btn-primary"
                  style={{ flex: 1, justifyContent: 'center', fontSize: '0.875rem' }}
                  id="inquiry-reply-email"
                >
                  <Mail size={14} /> Reply via Email
                </a>
                <a
                  href={`tel:${selected.phone}`}
                  className="btn btn-outline"
                  style={{ flex: 1, justifyContent: 'center', fontSize: '0.875rem' }}
                  id="inquiry-call"
                >
                  <Phone size={14} /> Call Client
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
