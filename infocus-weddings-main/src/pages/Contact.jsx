import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Phone, Mail, MapPin, Share2, Send, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './Contact.css';

export default function Contact() {
  const { addInquiry, services, showToast } = useApp();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    // Simulate processing delay
    await new Promise(r => setTimeout(r, 800));
    addInquiry(data);
    showToast('Your inquiry has been sent! We\'ll be in touch within 24 hours.', 'success');
    setSubmitted(true);
    reset();
  };

  return (
    <div className="contact-page page-enter">
      {/* Header */}
      <section className="page-header">
        <div className="page-header__bg">
          <img src="/reception_gallery_1.png" alt="Contact" />
          <div className="page-header__overlay" />
        </div>
        <div className="container page-header__content">
          <span className="section-label">Get In Touch</span>
          <h1 className="page-header__title">Book a Session</h1>
          <p className="page-header__sub">
            Tell us about your event and we'll craft the perfect photography experience for you.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-layout">
          {/* Info Panel */}
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="contact-info__title">Let's Talk</h2>
            <p className="contact-info__desc">
              Whether you're planning your wedding, a special birthday, or a corporate event, we'd love to hear about it. Reach out and let's start planning together.
            </p>

            <div className="contact-details">
              <div className="contact-detail-item">
                <div className="contact-detail-icon"><Phone size={18} /></div>
                <div>
                  <span className="contact-detail-label">Phone / WhatsApp</span>
                  <a href="tel:+919999999999" className="contact-detail-val">+91 99999 99999</a>
                </div>
              </div>
              <div className="contact-detail-item">
                <div className="contact-detail-icon"><Mail size={18} /></div>
                <div>
                  <span className="contact-detail-label">Email</span>
                  <a href="mailto:hello@infocusweddings.in" className="contact-detail-val">hello@infocusweddings.in</a>
                </div>
              </div>
              <div className="contact-detail-item">
                <div className="contact-detail-icon"><MapPin size={18} /></div>
                <div>
                  <span className="contact-detail-label">Location</span>
                  <span className="contact-detail-val">Mumbai, Maharashtra, India</span>
                </div>
              </div>
              <div className="contact-detail-item">
                <div className="contact-detail-icon"><Share2 size={18} /></div>
                <div>
                  <span className="contact-detail-label">Instagram</span>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="contact-detail-val">@infocusweddings</a>
                </div>
              </div>
            </div>

            <div className="contact-hours glass-card">
              <h4 className="contact-hours__title">Studio Hours</h4>
              <div className="contact-hours__row">
                <span>Monday – Saturday</span>
                <span>9:00 AM – 7:00 PM</span>
              </div>
              <div className="contact-hours__row">
                <span>Sunday</span>
                <span>By Appointment</span>
              </div>
              <p className="contact-hours__note">
                We respond to all inquiries within 24 hours.
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            className="contact-form-wrap glass-card"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {submitted ? (
              <div className="contact-success">
                <CheckCircle size={56} className="contact-success__icon" />
                <h3 className="contact-success__title">Inquiry Received!</h3>
                <p className="contact-success__desc">
                  Thank you for reaching out. Our team will contact you within 24 hours to discuss your photography needs.
                </p>
                <button
                  className="btn btn-outline"
                  onClick={() => setSubmitted(false)}
                  id="contact-send-another"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="contact-form" noValidate id="booking-form">
                <h3 className="contact-form__title">Book Your Session</h3>
                <p className="contact-form__sub">Fill in the details below and we'll get back to you within 24 hours.</p>

                <div className="form-row">
                  <div className="form-group">
                    <label className="admin-label" htmlFor="name">Full Name *</label>
                    <input
                      id="name"
                      type="text"
                      className={`admin-input ${errors.name ? 'input-error' : ''}`}
                      placeholder="Your full name"
                      {...register('name', { required: 'Name is required' })}
                    />
                    {errors.name && <span className="form-error">{errors.name.message}</span>}
                  </div>
                  <div className="form-group">
                    <label className="admin-label" htmlFor="email">Email Address *</label>
                    <input
                      id="email"
                      type="email"
                      className={`admin-input ${errors.email ? 'input-error' : ''}`}
                      placeholder="your@email.com"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' }
                      })}
                    />
                    {errors.email && <span className="form-error">{errors.email.message}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="admin-label" htmlFor="phone">Phone Number *</label>
                    <input
                      id="phone"
                      type="tel"
                      className={`admin-input ${errors.phone ? 'input-error' : ''}`}
                      placeholder="+91 XXXXX XXXXX"
                      {...register('phone', { required: 'Phone number is required' })}
                    />
                    {errors.phone && <span className="form-error">{errors.phone.message}</span>}
                  </div>
                  <div className="form-group">
                    <label className="admin-label" htmlFor="eventDate">Event Date</label>
                    <input
                      id="eventDate"
                      type="date"
                      className="admin-input"
                      {...register('eventDate')}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="admin-label" htmlFor="service">Service Interested In *</label>
                  <select
                    id="service"
                    className={`admin-input ${errors.service ? 'input-error' : ''}`}
                    {...register('service', { required: 'Please select a service' })}
                  >
                    <option value="">Select a service...</option>
                    {services.map(s => (
                      <option key={s.id} value={s.name}>{s.name}</option>
                    ))}
                    <option value="Other">Other / Not sure yet</option>
                  </select>
                  {errors.service && <span className="form-error">{errors.service.message}</span>}
                </div>

                <div className="form-group">
                  <label className="admin-label" htmlFor="location">Event Location</label>
                  <input
                    id="location"
                    type="text"
                    className="admin-input"
                    placeholder="City or venue name"
                    {...register('location')}
                  />
                </div>

                <div className="form-group">
                  <label className="admin-label" htmlFor="budget">Approximate Budget</label>
                  <select id="budget" className="admin-input" {...register('budget')}>
                    <option value="">Prefer not to say</option>
                    <option value="Under ₹15,000">Under ₹15,000</option>
                    <option value="₹15,000 – ₹30,000">₹15,000 – ₹30,000</option>
                    <option value="₹30,000 – ₹60,000">₹30,000 – ₹60,000</option>
                    <option value="₹60,000 – ₹1,00,000">₹60,000 – ₹1,00,000</option>
                    <option value="Above ₹1,00,000">Above ₹1,00,000</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="admin-label" htmlFor="message">Tell Us About Your Event *</label>
                  <textarea
                    id="message"
                    className={`admin-input admin-textarea ${errors.message ? 'input-error' : ''}`}
                    placeholder="Tell us about your event, any special requirements, or questions you have..."
                    rows={5}
                    {...register('message', { required: 'Please tell us a bit about your event' })}
                  />
                  {errors.message && <span className="form-error">{errors.message.message}</span>}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary contact-form__submit"
                  disabled={isSubmitting}
                  id="contact-submit-btn"
                >
                  {isSubmitting ? (
                    <>Sending...</>
                  ) : (
                    <><Send size={16} /> Send Inquiry</>
                  )}
                </button>

                <p className="contact-form__note">
                  * We'll respond within 24 hours. Your information is kept private.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
