import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import './Admin.css';

const emptyForm = { title: '', category: '', image: '', location: '', date: '', featured: false };

function PhotoModal({ photo, categories, onClose, onSave }) {
  const [form, setForm] = useState(photo || emptyForm);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.image || !form.category) return;
    onSave(form);
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
        <h2 className="admin-modal__title">{photo ? 'Edit Photo' : 'Add New Photo'}</h2>
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-group">
            <label className="admin-label">Title *</label>
            <input name="title" value={form.title} onChange={handleChange} className="admin-input" placeholder="Photo title" required />
          </div>
          <div className="form-group">
            <label className="admin-label">Category *</label>
            <select name="category" value={form.category} onChange={handleChange} className="admin-input" required>
              <option value="">Select category</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="admin-label">Image URL *</label>
            <input name="image" value={form.image} onChange={handleChange} className="admin-input" placeholder="/photo.jpg or https://..." required />
            {form.image && (
              <img src={form.image} alt="preview" className="admin-img-preview" onError={e => e.target.style.display='none'} />
            )}
          </div>
          <div className="form-group">
            <label className="admin-label">Location</label>
            <input name="location" value={form.location} onChange={handleChange} className="admin-input" placeholder="Event location" />
          </div>
          <div className="form-group">
            <label className="admin-label">Date</label>
            <input name="date" type="date" value={form.date} onChange={handleChange} className="admin-input" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
            <input
              type="checkbox"
              id="featured-check"
              name="featured"
              checked={form.featured}
              onChange={handleChange}
              style={{ width: 16, height: 16, accentColor: 'var(--color-accent)' }}
            />
            <label htmlFor="featured-check" style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', cursor: 'pointer' }}>
              Mark as Featured (shows on homepage)
            </label>
          </div>
          <div className="admin-form__actions">
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" id="portfolio-modal-save">{photo ? 'Update Photo' : 'Add Photo'}</button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default function PortfolioManager() {
  const { portfolio, categories, addPhoto, updatePhoto, deletePhoto } = useApp();
  const [modal, setModal] = useState(null); // null | 'add' | photo object
  const [filterCat, setFilterCat] = useState('all');

  const filtered = filterCat === 'all' ? portfolio : portfolio.filter(p => p.category === filterCat);

  const handleSave = (form) => {
    if (modal === 'add') {
      addPhoto(form);
    } else {
      updatePhoto(modal.id, form);
    }
    setModal(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this photo?')) deletePhoto(id);
  };

  return (
    <div>
      <div className="admin-page-header" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--space-xl)' }}>
        <div>
          <h1 className="admin-page-title">Portfolio Manager</h1>
          <p className="admin-page-sub">Add, edit, or remove photos from your portfolio gallery.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setModal('add')} id="portfolio-add-btn">
          <Plus size={16} /> Add Photo
        </button>
      </div>

      {/* Filter */}
      <div style={{ display: 'flex', gap: 'var(--space-sm)', marginBottom: 'var(--space-xl)', flexWrap: 'wrap' }}>
        <button className={`filter-btn ${filterCat === 'all' ? 'filter-btn--active' : ''}`} onClick={() => setFilterCat('all')}>All ({portfolio.length})</button>
        {categories.map(c => (
          <button key={c.id} className={`filter-btn ${filterCat === c.id ? 'filter-btn--active' : ''}`} onClick={() => setFilterCat(c.id)}>
            {c.icon} {c.label} ({portfolio.filter(p => p.category === c.id).length})
          </button>
        ))}
      </div>

      <div className="admin-table-wrap">
        {filtered.length > 0 ? (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Location</th>
                <th>Featured</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(photo => (
                <tr key={photo.id}>
                  <td>
                    <img src={photo.image} alt={photo.title} className="admin-thumb" />
                  </td>
                  <td style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>{photo.title}</td>
                  <td style={{ textTransform: 'capitalize' }}>
                    {categories.find(c => c.id === photo.category)?.label || photo.category}
                  </td>
                  <td>{photo.location || '—'}</td>
                  <td>
                    {photo.featured && <span className="badge-featured">Featured</span>}
                  </td>
                  <td>
                    <div className="admin-actions">
                      <button className="admin-btn-icon" onClick={() => setModal(photo)} title="Edit" id={`portfolio-edit-${photo.id}`}>
                        <Pencil size={14} />
                      </button>
                      <button className="admin-btn-icon admin-btn-icon--danger" onClick={() => handleDelete(photo.id)} title="Delete" id={`portfolio-delete-${photo.id}`}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="admin-empty">
            <p>No photos found. Add your first photo!</p>
            <button className="btn btn-outline" onClick={() => setModal('add')}>Add Photo</button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {modal && (
          <PhotoModal
            photo={modal === 'add' ? null : modal}
            categories={categories}
            onClose={() => setModal(null)}
            onSave={handleSave}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
