import { useEffect } from 'react';
import { X } from 'lucide-react';
import { formatPrice, menuItems } from '../data/menu';

const CATEGORY_LABELS = {
  breakfast: 'Breakfast',
  toasties: 'Toasties & Sandwiches',
  wraps: 'Lunch Wraps',
  pies: 'Pies & Sausage Rolls',
  bakery: 'Desserts & Bakery',
  'hot-beverages': 'Hot Beverages',
  'cold-beverages': 'Cold Beverages',
  juices: 'Juices & Smoothies',
};

export default function FullMenuModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const grouped = menuItems.reduce((acc, item) => {
    const key = item.category;
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Full menu">
      <div style={{ padding: 'var(--section-pad-x)', maxHeight: '100vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 className="display-title" style={{ fontSize: 'clamp(2rem, 6vw, 4rem)' }}>
            FULL MENU
          </h2>
          <button type="button" className="header-menu-btn" onClick={onClose} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>
        {Object.entries(grouped).map(([cat, items]) => (
          <section key={cat} style={{ marginBottom: '2.5rem' }}>
            <h3
              className="display-title"
              style={{ fontSize: '1.75rem', marginBottom: '1rem', color: 'var(--accent-lavender)' }}
            >
              {CATEGORY_LABELS[cat] || cat}
            </h3>
            <ul style={{ display: 'grid', gap: '1rem' }}>
              {items.map((item) => {
                const price = formatPrice(item);
                return (
                  <li key={item.id} style={{ borderTop: '1px solid var(--border-soft)', paddingTop: '0.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                      <strong>{item.name}</strong>
                      {price && <span style={{ color: 'var(--accent-lavender)' }}>{price}</span>}
                    </div>
                    <p className="text-muted" style={{ fontSize: '0.9rem', marginTop: '0.35rem' }}>
                      {item.description}
                    </p>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
