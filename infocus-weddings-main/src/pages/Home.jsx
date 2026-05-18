import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Camera, ArrowRight, Star, ChevronDown, Award, Heart, Users, Image } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './Home.css';

// ---- Animated Counter ----
function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start = Math.min(start + step, target);
      setCount(start);
      if (start >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ---- Hero Slides ----
const heroSlides = [
  {
    image: '/wedding_hero.png',
    label: 'Wedding Photography',
    headline: 'Every Love Story',
    sub: 'Deserves to be Told',
    desc: 'Cinematic wedding photography that captures the raw emotion, joy, and beauty of your most precious day.',
  },
  {
    image: '/wedding_gallery_1.png',
    label: 'Ceremony Coverage',
    headline: 'Sacred Moments',
    sub: 'Preserved Forever',
    desc: 'From the first look to the final dance, we document every heartfelt detail of your celebration.',
  },
  {
    image: '/prewedding_gallery_1.png',
    label: 'Pre-Wedding Stories',
    headline: 'Your Unique',
    sub: 'Love Story',
    desc: 'Romantic pre-wedding shoots at stunning locations, crafted to reflect your personality and chemistry.',
  },
];

export default function Home() {
  const { portfolio, services, testimonials } = useApp();
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const featuredPhotos = portfolio.filter(p => p.featured).slice(0, 6);

  // Auto-advance hero
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(s => (s + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Auto-advance testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial(t => (t + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const featuredServices = services.slice(0, 3);

  return (
    <div className="home page-enter">
      {/* ===== HERO ===== */}
      <section className="hero" id="hero">
        <div className="hero__slides">
          {heroSlides.map((slide, i) => (
            <div
              key={i}
              className={`hero__slide ${i === activeSlide ? 'hero__slide--active' : ''}`}
            >
              <img src={slide.image} alt={slide.label} className="hero__img" />
              <div className="hero__overlay" />
            </div>
          ))}
        </div>

        <div className="hero__content container">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="hero__text"
          >
            <span className="section-label" style={{ color: 'var(--color-accent)' }}>
              {heroSlides[activeSlide].label}
            </span>
            <h1 className="hero__headline">
              {heroSlides[activeSlide].headline}<br />
              <em>{heroSlides[activeSlide].sub}</em>
            </h1>
            <p className="hero__desc">{heroSlides[activeSlide].desc}</p>
            <div className="hero__ctas">
              <Link to="/portfolio" className="btn btn-primary hero__btn" id="hero-view-portfolio">
                View Portfolio <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="btn btn-ghost hero__btn" id="hero-book-now">
                Book a Session
              </Link>
            </div>
          </motion.div>

          {/* Slide dots */}
          <div className="hero__dots">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                className={`hero__dot ${i === activeSlide ? 'hero__dot--active' : ''}`}
                onClick={() => setActiveSlide(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <a href="#stats" className="hero__scroll" aria-label="Scroll down">
          <ChevronDown size={24} />
        </a>
      </section>

      {/* ===== STATS ===== */}
      <section className="stats section-sm" id="stats">
        <div className="container">
          <div className="stats__grid">
            {[
              { icon: <Camera size={28} />, target: 500, suffix: '+', label: 'Sessions Shot' },
              { icon: <Heart size={28} />, target: 320, suffix: '+', label: 'Weddings Covered' },
              { icon: <Users size={28} />, target: 98, suffix: '%', label: 'Happy Clients' },
              { icon: <Award size={28} />, target: 8, suffix: '+', label: 'Years Experience' },
            ].map(({ icon, target, suffix, label }, i) => (
              <motion.div
                key={i}
                className="stat-card glass-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="stat-card__icon">{icon}</div>
                <div className="stat-card__number">
                  <Counter target={target} suffix={suffix} />
                </div>
                <div className="stat-card__label">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT TEASER ===== */}
      <section className="section about-teaser">
        <div className="container about-teaser__inner">
          <motion.div
            className="about-teaser__image-grid"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <img src="/wedding_gallery_2.png" alt="Wedding portrait" className="about-teaser__img about-teaser__img--main" />
            <img src="/wedding_detail_1.png" alt="Wedding details" className="about-teaser__img about-teaser__img--accent" />
            <div className="about-teaser__badge glass-card">
              <Star size={18} className="about-teaser__badge-star" />
              <span>Award-Winning</span>
              <span className="about-teaser__badge-sub">Photography</span>
            </div>
          </motion.div>

          <motion.div
            className="about-teaser__content"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="section-label">Our Story</span>
            <h2 className="section-title">Moments Turned Into Timeless Art</h2>
            <div className="gold-divider" style={{ margin: 'var(--space-lg) 0' }} />
            <p className="about-teaser__text">
              At Infocus Weddings, we believe every photograph is a window back in time. For over 8 years, we've been creating visual poetry from real emotions — the stolen glances, the happy tears, the spontaneous laughter that defines your most cherished celebrations.
            </p>
            <p className="about-teaser__text">
              Our cinematic approach blends documentary storytelling with artistic composition, ensuring your gallery tells a rich, authentic narrative of your day.
            </p>
            <Link to="/about" className="btn btn-outline" id="home-about-link" style={{ marginTop: 'var(--space-lg)' }}>
              Learn Our Story <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== FEATURED PORTFOLIO ===== */}
      <section className="section featured-gallery">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 'var(--space-3xl)' }}>
            <span className="section-label">Our Work</span>
            <h2 className="section-title">Featured Portfolio</h2>
            <div className="gold-divider" />
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              A glimpse into the stories we've had the privilege to capture.
            </p>
          </div>

          <div className="featured-grid">
            {featuredPhotos.map((photo, i) => (
              <motion.div
                key={photo.id}
                className={`featured-item ${i === 0 ? 'featured-item--large' : ''}`}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ scale: 1.02 }}
              >
                <img src={photo.image} alt={photo.title} className="featured-item__img" />
                <div className="featured-item__overlay">
                  <span className="featured-item__category">{photo.category}</span>
                  <h3 className="featured-item__title">{photo.title}</h3>
                  {photo.location && (
                    <p className="featured-item__location">{photo.location}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: 'var(--space-2xl)' }}>
            <Link to="/portfolio" className="btn btn-outline" id="home-view-all-portfolio">
              <Image size={16} /> View Full Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* ===== SERVICES PREVIEW ===== */}
      <section className="section services-preview">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 'var(--space-3xl)' }}>
            <span className="section-label">What We Offer</span>
            <h2 className="section-title">Our Services</h2>
            <div className="gold-divider" />
          </div>

          <div className="services-preview__grid">
            {featuredServices.map((svc, i) => (
              <motion.div
                key={svc.id}
                className={`service-card glass-card ${svc.popular ? 'service-card--popular' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                whileHover={{ y: -6 }}
              >
                {svc.popular && <div className="service-card__badge">Most Popular</div>}
                <div className="service-card__icon">{svc.icon}</div>
                <h3 className="service-card__name">{svc.name}</h3>
                <p className="service-card__tagline">{svc.tagline}</p>
                <p className="service-card__desc">{svc.description.slice(0, 120)}...</p>
                <div className="service-card__price">
                  <span className="service-card__from">Starting from</span>
                  <span className="service-card__amount">₹{svc.price.toLocaleString('en-IN')}</span>
                </div>
                <Link to="/services" className="btn btn-outline service-card__btn">
                  Explore Package <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: 'var(--space-2xl)' }}>
            <Link to="/services" className="btn btn-primary" id="home-all-services">
              View All Services <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section testimonials">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 'var(--space-3xl)' }}>
            <span className="section-label">Client Love</span>
            <h2 className="section-title">What Our Clients Say</h2>
            <div className="gold-divider" />
          </div>

          <div className="testimonials__slider">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                className={`testimonial glass-card ${i === activeTestimonial ? 'testimonial--active' : ''}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: i === activeTestimonial ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="testimonial__stars">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={16} fill="var(--color-accent)" color="var(--color-accent)" />
                  ))}
                </div>
                <blockquote className="testimonial__quote">"{t.quote}"</blockquote>
                <div className="testimonial__author">
                  <div className="testimonial__avatar">{t.initials}</div>
                  <div>
                    <div className="testimonial__name">{t.name}</div>
                    <div className="testimonial__event">{t.event}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="testimonials__dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`hero__dot ${i === activeTestimonial ? 'hero__dot--active' : ''}`}
                onClick={() => setActiveTestimonial(i)}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="cta-section">
        <div className="cta-section__bg">
          <img src="/wedding_hero.png" alt="Wedding" />
          <div className="cta-section__overlay" />
        </div>
        <div className="container cta-section__content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-label">Ready to Begin?</span>
            <h2 className="cta-section__title">Let's Create Something Beautiful Together</h2>
            <p className="cta-section__sub">
              Your special moments deserve to be preserved forever. Let's plan your session today.
            </p>
            <div className="cta-section__btns">
              <Link to="/contact" className="btn btn-primary" id="home-cta-contact">
                Book Your Session <ArrowRight size={16} />
              </Link>
              <Link to="/portfolio" className="btn btn-ghost" id="home-cta-portfolio">
                Explore Portfolio
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
