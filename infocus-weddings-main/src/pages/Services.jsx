import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Services.css';

function ServiceCard({ svc, index }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      className={`svc-card glass-card ${svc.popular ? 'svc-card--popular' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
    >
      {svc.popular && <div className="svc-card__badge">⭐ Most Popular</div>}

      <div className="svc-card__header">
        <div className="svc-card__icon">{svc.icon}</div>
        <div className="svc-card__meta">
          <h3 className="svc-card__name">{svc.name}</h3>
          <span className="svc-card__tagline">{svc.tagline}</span>
        </div>
        <div className="svc-card__pricing">
          <span className="svc-card__from">from</span>
          <span className="svc-card__price">₹{svc.price.toLocaleString('en-IN')}</span>
        </div>
      </div>

      <p className="svc-card__desc">{svc.description}</p>

      <div className="svc-card__info-row">
        <div className="svc-card__info-item">
          <span className="svc-card__info-label">Duration</span>
          <span className="svc-card__info-val">{svc.duration}</span>
        </div>
        <div className="svc-card__info-item">
          <span className="svc-card__info-label">Category</span>
          <span className="svc-card__info-val" style={{ textTransform: 'capitalize' }}>{svc.category}</span>
        </div>
      </div>

      {/* Deliverables */}
      <div className="svc-card__deliverables">
        <h4 className="svc-card__sub-title">What You Get</h4>
        <ul className="svc-card__list">
          {svc.deliverables.map((d, i) => (
            <li key={i} className="svc-card__list-item">
              <Check size={14} className="svc-card__check" />
              {d}
            </li>
          ))}
        </ul>
      </div>

      {/* Customizations (collapsible) */}
      <button
        className="svc-card__expand"
        onClick={() => setExpanded(e => !e)}
        id={`svc-expand-${svc.id}`}
      >
        {expanded ? 'Hide Add-ons' : 'View Add-on Options'}
        {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            className="svc-card__customizations"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="svc-card__sub-title" style={{ marginTop: 'var(--space-lg)' }}>Customization Options</h4>
            <div className="svc-card__addons">
              {svc.customizations.map((c, i) => (
                <span key={i} className="svc-card__addon-tag">{c}</span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Link to="/contact" className="btn btn-primary svc-card__cta" id={`svc-book-${svc.id}`}>
        Book This Package <ArrowRight size={14} />
      </Link>
    </motion.div>
  );
}

export default function Services() {
  const { services, categories } = useApp();
  const [activeFilter, setActiveFilter] = useState('all');

  const filterCategories = [
    { id: 'all', label: 'All Services' },
    ...categories,
  ];

  const filtered = activeFilter === 'all'
    ? services
    : services.filter(s => s.category === activeFilter);

  return (
    <div className="services-page page-enter">
      {/* Header */}
      <section className="page-header">
        <div className="page-header__bg">
          <img src="/wedding_gallery_2.png" alt="Services" />
          <div className="page-header__overlay" />
        </div>
        <div className="container page-header__content">
          <span className="section-label">What We Offer</span>
          <h1 className="page-header__title">Photography Services</h1>
          <p className="page-header__sub">
            Thoughtfully crafted packages for every occasion — from intimate celebrations to grand events.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Category Filter */}
          <div className="services-filter" style={{ marginBottom: 'var(--space-2xl)' }}>
            {filterCategories.map(cat => (
              <button
                key={cat.id}
                className={`filter-btn ${activeFilter === cat.id ? 'filter-btn--active' : ''}`}
                onClick={() => setActiveFilter(cat.id)}
                id={`svc-filter-${cat.id}`}
              >
                {cat.icon && <span>{cat.icon}</span>}
                {cat.label}
              </button>
            ))}
          </div>

          {/* Service Cards */}
          <div className="services-grid">
            <AnimatePresence mode="wait">
              {filtered.map((svc, i) => (
                <ServiceCard key={svc.id} svc={svc} index={i} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="section why-us">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 'var(--space-3xl)' }}>
            <span className="section-label">Why Choose Us</span>
            <h2 className="section-title">The Infocus Promise</h2>
            <div className="gold-divider" />
          </div>
          <div className="why-us__grid">
            {[
              { icon: '🎨', title: 'Cinematic Style', desc: 'Every shoot is planned with a cinematic vision — dramatic lighting, rich colors, and storytelling composition.' },
              { icon: '📸', title: 'Professional Gear', desc: 'We use the latest full-frame cameras, prime lenses, and studio lighting for the sharpest, most beautiful images.' },
              { icon: '⚡', title: 'Fast Delivery', desc: 'Online gallery ready within 3–7 days. Rush delivery available. You won\'t wait forever for your memories.' },
              { icon: '💾', title: 'Secure Backup', desc: 'All photos are backed up across three redundant storage systems. Your memories are safe with us, always.' },
              { icon: '🎬', title: 'Cinematic Films', desc: 'Upgrade any package with a cinematic short film — music, color grading, and storytelling that moves you.' },
              { icon: '🤝', title: 'Dedicated Support', desc: 'A dedicated coordinator from inquiry to delivery. We\'re always available for questions and planning sessions.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="why-us-card glass-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="why-us-card__icon">{item.icon}</div>
                <h3 className="why-us-card__title">{item.title}</h3>
                <p className="why-us-card__desc">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
