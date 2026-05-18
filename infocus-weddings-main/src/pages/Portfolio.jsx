import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './Portfolio.css';

export default function Portfolio() {
  const { portfolio, categories } = useApp();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [lightboxImg, setLightboxImg] = useState(null);

  const allCategories = [{ id: 'all', label: 'All Work', icon: '✦' }, ...categories];

  const filtered = useMemo(() => {
    let items = portfolio;
    if (activeCategory !== 'all') {
      items = items.filter(p => p.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.location && p.location.toLowerCase().includes(q))
      );
    }
    return items;
  }, [portfolio, activeCategory, searchQuery]);

  return (
    <div className="portfolio-page page-enter">
      {/* Page Header */}
      <section className="page-header">
        <div className="page-header__bg">
          <img src="/wedding_gallery_1.png" alt="Portfolio" />
          <div className="page-header__overlay" />
        </div>
        <div className="container page-header__content">
          <span className="section-label">Our Gallery</span>
          <h1 className="page-header__title">The Portfolio</h1>
          <p className="page-header__sub">
            Stories woven in light and emotion — browse our work across all categories.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Filters */}
          <div className="portfolio-filters">
            <div className="portfolio-filters__categories">
              {allCategories.map(cat => (
                <button
                  key={cat.id}
                  className={`filter-btn ${activeCategory === cat.id ? 'filter-btn--active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                  id={`filter-${cat.id}`}
                >
                  <span>{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="portfolio-search">
              <Search size={16} className="portfolio-search__icon" />
              <input
                type="text"
                placeholder="Search photos..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="portfolio-search__input"
                id="portfolio-search"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="portfolio-search__clear" aria-label="Clear search">
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Count */}
          <p className="portfolio-count">
            Showing <span className="text-accent">{filtered.length}</span> {filtered.length === 1 ? 'photo' : 'photos'}
            {activeCategory !== 'all' && ` in ${allCategories.find(c => c.id === activeCategory)?.label}`}
          </p>

          {/* Grid */}
          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key={activeCategory + searchQuery}
                className="portfolio-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {filtered.map((photo, i) => (
                  <motion.div
                    key={photo.id}
                    className="portfolio-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                    onClick={() => setLightboxImg(photo)}
                    id={`portfolio-item-${photo.id}`}
                  >
                    <div className="portfolio-card__img-wrap">
                      <img src={photo.image} alt={photo.title} className="portfolio-card__img" />
                    </div>
                    <div className="portfolio-card__overlay">
                      <div>
                        <span className="portfolio-card__cat">
                          {categories.find(c => c.id === photo.category)?.icon} {photo.category}
                        </span>
                        <h3 className="portfolio-card__title">{photo.title}</h3>
                        {photo.location && (
                          <p className="portfolio-card__loc">{photo.location}</p>
                        )}
                      </div>
                    </div>
                    {photo.featured && (
                      <div className="portfolio-card__featured">Featured</div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                className="portfolio-empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="portfolio-empty__icon">📷</div>
                <h3>No photos found</h3>
                <p>Try a different category or search term.</p>
                <button
                  className="btn btn-outline"
                  onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImg(null)}
          >
            <button className="lightbox__close" onClick={() => setLightboxImg(null)} aria-label="Close lightbox" id="lightbox-close">
              <X size={24} />
            </button>
            <motion.div
              className="lightbox__content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <img src={lightboxImg.image} alt={lightboxImg.title} className="lightbox__img" />
              <div className="lightbox__info">
                <span className="lightbox__category">
                  {categories.find(c => c.id === lightboxImg.category)?.label}
                </span>
                <h2 className="lightbox__title">{lightboxImg.title}</h2>
                {lightboxImg.location && (
                  <p className="lightbox__location">{lightboxImg.location}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
