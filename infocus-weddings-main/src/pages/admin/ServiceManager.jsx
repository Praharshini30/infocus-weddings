import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import './Admin.css';

const emptyForm = {
  name: '', category: '', icon: '', tagline: '', description: '',
  price: '', duration: '', deliverables: '', customizations: '', popular: false,
};

function SvcModal({ svc, categories, onClose, onSave }) {
  const [form, setForm] = useState(svc ? {
    ...svc,
    deliverables: (svc.deliverables || []).join('\n'),
    customizations: (svc.customizations || []).join('\n'),
  } : emptyForm);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...form,
      price: Number(form.price),
      deliverables: form.deliverables.split('\n').filter(Boolean),
      customizations: form.customizations.split('\n').filter(Boolean),
    });
  };

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <motion.div
        className="admin-modal"
        onClick={e => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
      >
        <button className="admin-modal__close" onClick={onClose}><X size={16} /></button>
        <h2 className="admin-modal__title">{svc ? 'Edit Service' : 'Add Service'}</h2>
        <form onSubmit={handleSubmit} className="admin-form">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
            <div className="form-group">
              <label className="admin-label">Service Name *</label>
              <input name="name" value={form.name} onChange={handleChange} className="admin-input" placeholder="Package name" required />
            </div>
            <div className="form-group">
              <label className="admin-label">Category *</label>
              <select name="category" value={form.category} onChange={handleChange} className="admin-input" required>
                <option value="">Select category</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 'var(--space-md)' }}>
            <div className="form-group">
              <label className="admin-label">Icon</label>
              <input name="icon" value={form.icon} onChange={handleChange} className="admin-input" placeholder="💍" />
            </div>
            <div className="form-group">
              <label className="admin-label">Tagline</label>
              <input name="tagline" value={form.tagline} onChange={handleChange} className="admin-input" placeholder="Short tagline" />
            </div>
          </div>
          <div className="form-group">
            <label className="admin-label">Description *</label>
            <textarea name="description" value={form.description} onChange={handleChange} className="admin-input admin-textarea" placeholder="Package description" required />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
            <div className="form-group">
              <label className="admin-label">Price (₹) *</label>
              <input name="price" type="number" value={form.price} onChange={handleChange} className="admin-input" placeholder="49999" required />
            </div>
            <div className="form-group">
              <label className="admin-label">Duration</label>
              <input name="duration" value={form.duration} onChange={handleChange} className="admin-input" placeholder="8–10 hours" />
            </div>
          </div>
          <div className="form-group">
            <label className="admin-label">Deliverables (one per line)</label>
            <textarea name="deliverables" value={form.deliverables} onChange={handleChange} className="admin-input admin-textarea" placeholder="400+ edited photos&#10;Online gallery&#10;USB drive" rows={4} />
          </div>
          <div className="form-group">
            <label className="admin-label">Customization Options (one per line)</label>
            <textarea name="customizations" value={form.customizations} onChange={handleChange} className="admin-input admin-textarea" placeholder="Drone coverage&#10;Second shooter" rows={3} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
            <input type="checkbox" id="popular-check" name="popular" checked={form.popular} onChange={handleChange} style={{ width: 16, height: 16, accentColor: 'var(--color-accent)' }} />
            <label htmlFor="popular-check" style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', cursor: 'pointer' }}>Mark as Most Popular</label>
          </div>
          <div className="admin-form__actions">
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" id="service-modal-save">{svc ? 'Update Service' : 'Add Service'}</button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default function ServiceManager() {
  const { services, categories, addService, updateService, deleteService } = useApp();
  const [modal, setModal] = useState(null);

  const handleSave = (form) => {
    if (modal === 'add') addService(form);
    else updateService(modal.id, form);
    setModal(null);
  };

  return (
    <div>
      <div className="admin-page-header" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h1 className="admin-page-title">Service Manager</h1>
          <p className="admin-page-sub">Manage your photography service packages, pricing, and options.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setModal('add')} id="service-add-btn">
          <Plus size={16} /> Add Service
        </button>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Icon</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Duration</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map(svc => (
              <tr key={svc.id}>
                <td style={{ fontSize: '1.4rem' }}>{svc.icon}</td>
                <td style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>{svc.name}</td>
                <td style={{ textTransform: 'capitalize' }}>{svc.category}</td>
                <td style={{ color: 'var(--color-accent)', fontWeight: 600 }}>₹{Number(svc.price).toLocaleString('en-IN')}</td>
                <td>{svc.duration}</td>
                <td>{svc.popular && <span className="badge-popular">Popular</span>}</td>
                <td>
                  <div className="admin-actions">
                    <button className="admin-btn-icon" onClick={() => setModal(svc)} title="Edit" id={`service-edit-${svc.id}`}>
                      <Pencil size={14} />
                    </button>
                    <button className="admin-btn-icon admin-btn-icon--danger" onClick={() => { if(window.confirm('Delete this service?')) deleteService(svc.id); }} title="Delete" id={`service-delete-${svc.id}`}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {modal && (
          <SvcModal
            svc={modal === 'add' ? null : modal}
            categories={categories}
            onClose={() => setModal(null)}
            onSave={handleSave}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
