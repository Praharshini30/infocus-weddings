import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  defaultCategories,
  defaultPortfolio,
  defaultServices,
  defaultTestimonials,
  defaultInquiries,
} from '../data/seedData';

const AppContext = createContext(null);

function loadFromStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

export function AppProvider({ children }) {
  const [categories, setCategories] = useState(() =>
    loadFromStorage('infocus_categories', defaultCategories)
  );
  const [portfolio, setPortfolio] = useState(() =>
    loadFromStorage('infocus_portfolio', defaultPortfolio)
  );
  const [services, setServices] = useState(() =>
    loadFromStorage('infocus_services', defaultServices)
  );
  const [testimonials] = useState(defaultTestimonials);
  const [inquiries, setInquiries] = useState(() =>
    loadFromStorage('infocus_inquiries', defaultInquiries)
  );
  const [isAdmin, setIsAdmin] = useState(() =>
    loadFromStorage('infocus_admin', false)
  );
  const [toast, setToast] = useState(null);

  useEffect(() => { saveToStorage('infocus_categories', categories); }, [categories]);
  useEffect(() => { saveToStorage('infocus_portfolio', portfolio); }, [portfolio]);
  useEffect(() => { saveToStorage('infocus_services', services); }, [services]);
  useEffect(() => { saveToStorage('infocus_inquiries', inquiries); }, [inquiries]);
  useEffect(() => { saveToStorage('infocus_admin', isAdmin); }, [isAdmin]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Category CRUD
  const addCategory = (cat) => {
    setCategories(prev => [...prev, { ...cat, id: Date.now().toString() }]);
    showToast('Category added!');
  };
  const updateCategory = (id, updates) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
    showToast('Category updated!');
  };
  const deleteCategory = (id) => {
    setCategories(prev => prev.filter(c => c.id !== id));
    showToast('Category deleted.');
  };

  // Portfolio CRUD
  const addPhoto = (photo) => {
    setPortfolio(prev => [...prev, { ...photo, id: Date.now().toString() }]);
    showToast('Photo added!');
  };
  const updatePhoto = (id, updates) => {
    setPortfolio(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    showToast('Photo updated!');
  };
  const deletePhoto = (id) => {
    setPortfolio(prev => prev.filter(p => p.id !== id));
    showToast('Photo deleted.');
  };

  // Service CRUD
  const addService = (svc) => {
    setServices(prev => [...prev, { ...svc, id: Date.now().toString() }]);
    showToast('Service added!');
  };
  const updateService = (id, updates) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
    showToast('Service updated!');
  };
  const deleteService = (id) => {
    setServices(prev => prev.filter(s => s.id !== id));
    showToast('Service deleted.');
  };

  // Inquiry
  const addInquiry = (inquiry) => {
    setInquiries(prev => [{ ...inquiry, id: Date.now().toString(), date: new Date().toISOString(), read: false }, ...prev]);
  };
  const markInquiryRead = (id) => {
    setInquiries(prev => prev.map(i => i.id === id ? { ...i, read: true } : i));
  };

  // Admin auth
  const adminLogin = (password) => {
    if (password === 'infocus2024') {
      setIsAdmin(true);
      return true;
    }
    return false;
  };
  const adminLogout = () => setIsAdmin(false);

  const value = {
    categories, addCategory, updateCategory, deleteCategory,
    portfolio, addPhoto, updatePhoto, deletePhoto,
    services, addService, updateService, deleteService,
    testimonials,
    inquiries, addInquiry, markInquiryRead,
    isAdmin, adminLogin, adminLogout,
    toast, showToast,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
      {toast && (
        <div className={`toast toast-${toast.type}`}>
          {toast.message}
        </div>
      )}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
