import { Link } from 'react-router-dom';
import { Images, Tag, Briefcase, MessageSquare, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import './Admin.css';

export default function Dashboard() {
  const { portfolio, categories, services, inquiries } = useApp();
  const unread = inquiries.filter(i => !i.read).length;

  const stats = [
    { label: 'Portfolio Items', value: portfolio.length, icon: <Images size={22} />, link: '/admin/portfolio' },
    { label: 'Categories', value: categories.length, icon: <Tag size={22} />, link: '/admin/categories' },
    { label: 'Services', value: services.length, icon: <Briefcase size={22} />, link: '/admin/services' },
    { label: 'Inquiries', value: inquiries.length, icon: <MessageSquare size={22} />, link: '/admin/inquiries' },
  ];

  const recentInquiries = inquiries.slice(0, 5);

  return (
    <div>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Dashboard</h1>
        <p className="admin-page-sub">Welcome back! Here's an overview of your Infocus Weddings site.</p>
      </div>

      {/* Stats */}
      <div className="admin-stat-cards">
        {stats.map((s, i) => (
          <Link key={i} to={s.link} className="admin-stat-card" style={{ textDecoration: 'none', display: 'block' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span className="admin-stat-card__label">{s.label}</span>
              <span className="admin-stat-card__icon">{s.icon}</span>
            </div>
            <div className="admin-stat-card__value">{s.value}</div>
            {s.label === 'Inquiries' && unread > 0 && (
              <div style={{ fontSize: '0.75rem', color: 'var(--color-accent)', marginTop: '4px' }}>
                {unread} unread
              </div>
            )}
          </Link>
        ))}
      </div>

      {/* Quick Links */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-xl)' }}>
        {/* Recent Inquiries */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-lg)' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>Recent Inquiries</h2>
            <Link to="/admin/inquiries" style={{ fontSize: '0.8rem', color: 'var(--color-accent)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="admin-table-wrap">
            {recentInquiries.length > 0 ? (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Service</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentInquiries.map(inq => (
                    <tr key={inq.id}>
                      <td style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>{inq.name}</td>
                      <td>{inq.service || '—'}</td>
                      <td>
                        {inq.read ? (
                          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Read</span>
                        ) : (
                          <span className="badge-featured">New</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="admin-empty">
                <p>No inquiries yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 'var(--space-lg)' }}>Quick Actions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
            {[
              { label: 'Add New Photo to Portfolio', link: '/admin/portfolio', icon: '📷' },
              { label: 'Manage Service Packages', link: '/admin/services', icon: '💼' },
              { label: 'Add / Edit Categories', link: '/admin/categories', icon: '🏷️' },
              { label: 'View All Inquiries', link: '/admin/inquiries', icon: '📩' },
              { label: 'Preview Public Website', link: '/', icon: '🌐' },
            ].map((a, i) => (
              <Link
                key={i}
                to={a.link}
                target={a.label.includes('Preview') ? '_blank' : undefined}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-md)',
                  padding: 'var(--space-md)',
                  background: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  textDecoration: 'none',
                  color: 'var(--color-text-secondary)',
                  fontSize: '0.875rem',
                  transition: 'all var(--transition-fast)',
                }}
                className="quick-action-link"
                id={`dashboard-action-${i}`}
              >
                <span style={{ fontSize: '1.2rem' }}>{a.icon}</span>
                {a.label}
                <ArrowRight size={14} style={{ marginLeft: 'auto', color: 'var(--color-accent)' }} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
