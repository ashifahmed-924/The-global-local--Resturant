import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function GalleryLightbox({ items, index, onClose, onPrev, onNext }) {
  const item = items[index];

  useEffect(() => {
    if (index == null) return undefined;
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
  }, [index, onClose, onPrev, onNext]);

  if (index == null || !item) return null;

  return (
    <div className="lightbox-overlay" role="dialog" aria-modal="true" aria-label="Gallery">
      <button type="button" aria-label="Close" onClick={onClose} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem' }}>
        <X size={28} />
      </button>
      <button type="button" aria-label="Previous" onClick={onPrev} style={{ position: 'absolute', left: '1rem' }}>
        <ChevronLeft size={36} />
      </button>
      <button type="button" aria-label="Next" onClick={onNext} style={{ position: 'absolute', right: '1rem' }}>
        <ChevronRight size={36} />
      </button>
      <figure style={{ maxWidth: '1200px', width: '100%', margin: 0 }}>
        <img
          src={item.src}
          alt={item.alt}
          style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain' }}
        />
        <figcaption className="sr-only">
          Image {index + 1} of {items.length}
        </figcaption>
      </figure>
    </div>
  );
}
