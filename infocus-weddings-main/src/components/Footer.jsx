import { Link } from 'react-router-dom';
import { Camera, Share2, Globe, Play, Phone, Mail, MapPin, Heart } from 'lucide-react';
import './Footer.css';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/portfolio', label: 'Portfolio' },
  { path: '/services', label: 'Services' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__glow" />
      <div className="container">
        <div className="footer__top">
          {/* Brand */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <div className="footer__logo-icon">
                <Camera size={18} />
              </div>
              <div>
                <span className="footer__logo-name">Infocus</span>
                <span className="footer__logo-sub">Weddings</span>
              </div>
            </Link>
            <p className="footer__desc">
              Capturing life's most beautiful moments with artistry, emotion, and cinematic elegance. Your memories, preserved forever.
            </p>
            <div className="footer__socials">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="footer__social-btn">
                <Share2 size={18} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="footer__social-btn">
                <Globe size={18} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="footer__social-btn">
                <Play size={18} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="footer__col">
            <h4 className="footer__col-title">Explore</h4>
            <ul className="footer__links">
              {navLinks.map(({ path, label }) => (
                <li key={path}>
                  <Link to={path} className="footer__link">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer__col">
            <h4 className="footer__col-title">Services</h4>
            <ul className="footer__links">
              <li><Link to="/services" className="footer__link">Wedding Photography</Link></li>
              <li><Link to="/services" className="footer__link">Pre-Wedding Shoot</Link></li>
              <li><Link to="/services" className="footer__link">Reception Coverage</Link></li>
              <li><Link to="/services" className="footer__link">Birthday Events</Link></li>
              <li><Link to="/services" className="footer__link">Corporate Events</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer__col">
            <h4 className="footer__col-title">Contact</h4>
            <ul className="footer__contact-list">
              <li>
                <Phone size={14} />
                <a href="tel:+919999999999" className="footer__link">+91 99999 99999</a>
              </li>
              <li>
                <Mail size={14} />
                <a href="mailto:hello@infocusweddings.in" className="footer__link">hello@infocusweddings.in</a>
              </li>
              <li>
                <MapPin size={14} />
                <span className="footer__link">Mumbai, Maharashtra, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__divider" />

        <div className="footer__bottom">
          <p className="footer__copy">
            © {new Date().getFullYear()} Infocus Weddings. All rights reserved.
          </p>
          <p className="footer__made">
            Made with <Heart size={12} className="footer__heart" /> for beautiful stories
          </p>
          <Link to="/admin/login" className="footer__admin-link">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
