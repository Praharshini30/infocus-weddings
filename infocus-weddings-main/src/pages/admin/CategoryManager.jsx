import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import './Admin.css';

const emptyForm = { label: '', icon: '' };

function CatModal({ cat, onClose, onSave }) {
  const [form, setForm] = useState(cat || emptyForm);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.label) return;
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
        style={{ maxWidth: 380 }}
      >
        <button className="admin-modal__close" onClick={onClose}><X size={16} /></button>
        <h2 className="admin-modal__title">{cat ? 'Edit Category' : 'Add Category'}</h2>
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-group">
            <label className="admin-label">Category Name *</label>
            <input name="label" value={form.label} onChange={handleChange} className="admin-input" placeholder="e.g. Engagements" required />
          </div>
          <div className="form-group">
            <label className="admin-label">Icon (Emoji)</label>
            <input name="icon" value={form.icon} onChange={handleChange} className="admin-input" placeholder="e.g. 💐" />
          </div>
          <div className="admin-form__actions">
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" id="category-modal-save">{cat ? 'Update' : 'Add Category'}</button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default function CategoryManager() {
  const { categories, addCategory, updateCategory, deleteCategory, portfolio } = useApp();
  const [modal, setModal] = useState(null);

  const handleSave = (form) => {
    if (modal === 'add') addCategory(form);
    else updateCategory(modal.id, form);
    setModal(null);
  };

  const handleDelete = (id) => {
    const count = portfolio.filter(p => p.category === id).length;
    if (count > 0 && !window.confirm(`This category has ${count} photos. Delete anyway?`)) return;
    deleteCategory(id);
  };

  return (
    <div>
      <div className="admin-page-header" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h1 className="admin-page-title">Category Manager</h1>
          <p className="admin-page-sub">Manage portfolio categories for filtering and organization.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setModal('add')} id="category-add-btn">
          <Plus size={16} /> Add Category
        </button>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Icon</th>
              <th>Name</th>
              <th>ID</th>
              <th>Photos</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(cat => (
              <tr key={cat.id}>
                <td style={{ fontSize: '1.5rem' }}>{cat.icon || '—'}</td>
                <td style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>{cat.label}</td>
                <td><code style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{cat.id}</code></td>
                <td>{portfolio.filter(p => p.category === cat.id).length}</td>
                <td>
                  <div className="admin-actions">
                    <button className="admin-btn-icon" onClick={() => setModal(cat)} title="Edit" id={`category-edit-${cat.id}`}>
                      <Pencil size={14} />
                    </button>
                    <button className="admin-btn-icon admin-btn-icon--danger" onClick={() => handleDelete(cat.id)} title="Delete" id={`category-delete-${cat.id}`}>
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
          <CatModal
            cat={modal === 'add' ? null : modal}
            onClose={() => setModal(null)}
            onSave={handleSave}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
