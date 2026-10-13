import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { formatPrice } from '../data/menu';

export default function FoodLightbox({ item, items, onClose, onPrev, onNext }) {
  useEffect(() => {
    if (!item) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [item, onClose, onPrev, onNext]);

  if (!item) return null;

  const price = formatPrice(item);
  const idx = items.findIndex((i) => i.id === item.id);

  return (
    <div className="lightbox-overlay" role="dialog" aria-modal="true" aria-label={item.name}>
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        style={{ position: 'absolute', top: '1.5rem', right: '1.5rem' }}
      >
        <X size={28} />
      </button>
      <button type="button" aria-label="Previous item" onClick={onPrev} style={{ position: 'absolute', left: '1rem' }}>
        <ChevronLeft size={36} />
      </button>
      <button type="button" aria-label="Next item" onClick={onNext} style={{ position: 'absolute', right: '1rem' }}>
        <ChevronRight size={36} />
      </button>
      <div style={{ display: 'grid', gap: '1.5rem', maxWidth: '960px', width: '100%' }}>
        <img
          src={item.image}
          alt={item.name}
          style={{ width: '100%', maxHeight: '55vh', objectFit: 'cover', borderRadius: '4px' }}
        />
        <div>
          <p className="text-muted" style={{ fontSize: '0.75rem', letterSpacing: '0.15em' }}>
            {idx + 1} / {items.length}
          </p>
          <h2 className="display-title" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginTop: '0.5rem' }}>
            {item.name}
          </h2>
          <p style={{ marginTop: '0.75rem', maxWidth: '48ch' }}>{item.description}</p>
          {price && (
            <p style={{ marginTop: '1rem', color: 'var(--accent-lavender)', fontWeight: 700 }}>{price}</p>
          )}
          {!price && (
            <p className="text-muted" style={{ marginTop: '1rem', fontSize: '0.85rem' }}>
              Price available in-store — verify on Uber Eats for delivery.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
