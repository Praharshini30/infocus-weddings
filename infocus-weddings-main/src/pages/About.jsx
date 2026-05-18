import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Award, Camera, Users, ArrowRight } from 'lucide-react';
import './About.css';

const team = [
  {
    name: 'Rahul Sharma',
    role: 'Founder & Lead Photographer',
    initials: 'RS',
    bio: 'With 8+ years of experience, Rahul founded Infocus Weddings with a mission to transform real emotions into timeless visual art. His cinematic eye and passion for storytelling set the creative direction for every shoot.',
  },
  {
    name: 'Priya Nair',
    role: 'Senior Photographer',
    initials: 'PN',
    bio: 'Priya specializes in candid moments and pre-wedding shoots. Her ability to make people feel comfortable in front of the camera results in authentic, natural expressions every time.',
  },
  {
    name: 'Aditya Mehta',
    role: 'Videographer & Film Editor',
    initials: 'AM',
    bio: 'Aditya transforms wedding days into cinematic masterpieces. His expertise in color grading and storytelling brings the Infocus film packages to life.',
  },
];

const milestones = [
  { year: '2016', title: 'Founded in Mumbai', desc: 'Infocus Weddings started as a passion project by Rahul Sharma, armed with a single camera and an eye for stories.' },
  { year: '2018', title: 'First 100 Weddings', desc: 'A milestone that proved our approach to cinematic storytelling resonated deeply with couples across India.' },
  { year: '2020', title: 'Expanded to Corporate & Events', desc: 'We grew our portfolio to include corporate events, birthday celebrations, and branded photography.' },
  { year: '2022', title: 'Award Recognition', desc: 'Named among India\'s Top 10 Wedding Photographers by Wedding Wire Magazine.' },
  { year: '2024', title: '500+ Sessions & Counting', desc: 'Today, we\'re a team of passionate storytellers serving clients across India and beyond.' },
];

export default function About() {
  return (
    <div className="about-page page-enter">
      {/* Header */}
      <section className="page-header">
        <div className="page-header__bg">
          <img src="/wedding_gallery_2.png" alt="About" />
          <div className="page-header__overlay" />
        </div>
        <div className="container page-header__content">
          <span className="section-label">Our Story</span>
          <h1 className="page-header__title">About Infocus</h1>
          <p className="page-header__sub">
            A team of passionate visual storytellers, dedicated to preserving life's most beautiful moments.
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section">
        <div className="container about-philosophy">
          <motion.div
            className="about-philosophy__content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-label">Our Philosophy</span>
            <h2 className="section-title">We Don't Just Take Photos.<br /><em style={{ fontWeight: 400, color: 'var(--color-accent)' }}>We Capture Feelings.</em></h2>
            <div className="gold-divider" style={{ margin: 'var(--space-lg) 0' }} />
            <p className="about-philosophy__text">
              At Infocus Weddings, we believe that the most powerful photographs aren't technically perfect — they're emotionally true. A blurred background that lets laughter shine through. A fleeting glance that speaks volumes. The nervous squeeze of hands before the vows.
            </p>
            <p className="about-philosophy__text">
              Our cinematic approach blends documentary instinct with artistic vision. We observe, we anticipate, and we capture — ensuring your gallery is a rich, authentic narrative of your most cherished day.
            </p>
            <p className="about-philosophy__text">
              Every photo we deliver is an invitation to travel back in time, to feel what you felt, to live it again.
            </p>
          </motion.div>

          <motion.div
            className="about-philosophy__visual"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <img src="/wedding_hero.png" alt="Photography philosophy" className="about-philosophy__img" />
            <div className="about-philosophy__quote glass-card">
              <p className="about-philosophy__quote-text">"Every frame is a doorway back to the moment you felt most alive."</p>
              <span className="about-philosophy__quote-author">— Rahul Sharma, Founder</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="section about-values">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 'var(--space-3xl)' }}>
            <span className="section-label">What Drives Us</span>
            <h2 className="section-title">Our Core Values</h2>
            <div className="gold-divider" />
          </div>
          <div className="values-grid">
            {[
              { icon: <Heart size={32} />, title: 'Authenticity', desc: 'We capture real moments, not posed ones. Your genuine emotions are what make your photos extraordinary.' },
              { icon: <Camera size={32} />, title: 'Artistry', desc: 'Every composition, every light choice, every frame is crafted with creative intention and artistic skill.' },
              { icon: <Award size={32} />, title: 'Excellence', desc: 'We hold ourselves to the highest standard in every shoot, edit, and client interaction.' },
              { icon: <Users size={32} />, title: 'Connection', desc: 'We take the time to know you — your story, your quirks, your love — because it shows in the photos.' },
            ].map((v, i) => (
              <motion.div
                key={i}
                className="value-card glass-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="value-card__icon">{v.icon}</div>
                <h3 className="value-card__title">{v.title}</h3>
                <p className="value-card__desc">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section about-timeline">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 'var(--space-3xl)' }}>
            <span className="section-label">Our Journey</span>
            <h2 className="section-title">How We Got Here</h2>
            <div className="gold-divider" />
          </div>
          <div className="timeline">
            {milestones.map((m, i) => (
              <motion.div
                key={i}
                className="timeline-item"
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="timeline-item__year">{m.year}</div>
                <div className="timeline-item__dot" />
                <div className="timeline-item__card glass-card">
                  <h3 className="timeline-item__title">{m.title}</h3>
                  <p className="timeline-item__desc">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section about-team">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 'var(--space-3xl)' }}>
            <span className="section-label">The Humans Behind the Lens</span>
            <h2 className="section-title">Meet the Team</h2>
            <div className="gold-divider" />
          </div>
          <div className="team-grid">
            {team.map((member, i) => (
              <motion.div
                key={i}
                className="team-card glass-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
              >
                <div className="team-card__avatar">{member.initials}</div>
                <h3 className="team-card__name">{member.name}</h3>
                <span className="team-card__role">{member.role}</span>
                <p className="team-card__bio">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm about-cta">
        <div className="container text-center">
          <span className="section-label">Ready to Work Together?</span>
          <h2 className="section-title" style={{ margin: 'var(--space-md) auto var(--space-lg)', maxWidth: '500px' }}>Let's Create Something Beautiful</h2>
          <Link to="/contact" className="btn btn-primary" id="about-cta-btn">
            Get in Touch <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
