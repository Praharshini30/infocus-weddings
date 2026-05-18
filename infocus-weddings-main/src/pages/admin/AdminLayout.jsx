import { useEffect } from 'react';
import { Outlet, NavLink, useNavigate, Link } from 'react-router-dom';
import {
  Camera, LayoutDashboard, Images, Tag, Briefcase, MessageSquare,
  LogOut, ExternalLink, Bell
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import './Admin.css';

const sidebarLinks = [
  { path: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={18} />, end: true },
  { path: '/admin/portfolio', label: 'Portfolio', icon: <Images size={18} /> },
  { path: '/admin/categories', label: 'Categories', icon: <Tag size={18} /> },
  { path: '/admin/services', label: 'Services', icon: <Briefcase size={18} /> },
  { path: '/admin/inquiries', label: 'Inquiries', icon: <MessageSquare size={18} /> },
];

export default function AdminLayout() {
  const { isAdmin, adminLogout, inquiries } = useApp();
  const navigate = useNavigate();
  const unread = inquiries.filter(i => !i.read).length;

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin/login', { replace: true });
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) return null;

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar__logo">
          <div className="admin-logo-icon"><Camera size={20} /></div>
          <div>
            <span className="admin-logo-name">Infocus</span>
            <span className="admin-logo-sub">Admin Panel</span>
          </div>
        </div>

        <nav className="admin-sidebar__nav">
          <span className="admin-sidebar__section-label">Navigation</span>
          {sidebarLinks.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.end}
              className={({ isActive }) =>
                `admin-sidebar__link ${isActive ? 'admin-sidebar__link--active' : ''}`
              }
              id={`admin-nav-${link.label.toLowerCase()}`}
            >
              {link.icon}
              <span>{link.label}</span>
              {link.label === 'Inquiries' && unread > 0 && (
                <span className="admin-sidebar__badge">{unread}</span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar__footer">
          <Link to="/" target="_blank" className="admin-sidebar__link" id="admin-view-site">
            <ExternalLink size={18} />
            <span>View Site</span>
          </Link>
          <button onClick={handleLogout} className="admin-sidebar__link admin-sidebar__logout" id="admin-logout-btn">
            <LogOut size={18} />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="admin-main">
        {/* Top bar */}
        <header className="admin-topbar">
          <div />
          <div className="admin-topbar__right">
            <div className="admin-topbar__user">
              <div className="admin-topbar__avatar">A</div>
              <span className="admin-topbar__name">Admin</span>
            </div>
          </div>
        </header>

        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
