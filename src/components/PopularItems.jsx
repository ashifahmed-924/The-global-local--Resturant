import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../animations/gsapSetup';
import RevealText from '../ui/RevealText';
import FoodLightbox from '../ui/FoodLightbox';
import { formatPrice, menuItems } from '../data/menu';
import { useReducedMotion } from '../hooks/useReducedMotion';

const FAVOURITES = menuItems.filter((i) =>
  ['bacon-egg-roll', 'chocolate-brownie', 'almond-croissant', 'chilli-scramble', 'smashed-avocado'].includes(i.id),
);

export default function PopularItems() {
  const [index, setIndex] = useState(0);
  const [lightboxItem, setLightboxItem] = useState(null);
  const carouselRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const visible = 3;
  const maxIndex = Math.max(0, FAVOURITES.length - 1);

  useGSAP(
    () => {
      if (reducedMotion) return;
      gsap.from('[data-popular-slide]', {
        rotation: 6,
        scale: 0.92,
        opacity: 0,
        stagger: 0.08,
        duration: 0.7,
        scrollTrigger: { trigger: carouselRef.current, start: 'top 80%' },
      });
    },
    { scope: carouselRef, dependencies: [index, reducedMotion] },
  );

  const shift = (delta) => {
    setIndex((i) => {
      const next = Math.min(maxIndex, Math.max(0, i + delta));
      if (!reducedMotion) {
        gsap.fromTo(
          `[data-popular-index="${next}"]`,
          { rotation: delta > 0 ? 8 : -8, scale: 0.9 },
          { rotation: 0, scale: 1, duration: 0.5, ease: 'power2.out' },
        );
      }
      return next;
    });
  };

  const windowItems = FAVOURITES.slice(index, index + visible);
  if (windowItems.length < visible && index > 0) {
    // pad from start for display
  }

  return (
    <section className="section-shell popular-section">
      <div className="container-wide">
        <RevealText className="popular-heading" lines={['THE LOCAL', 'FAVOURITES.']} />
        <div ref={carouselRef} className="popular-carousel">
          {FAVOURITES.slice(index, index + 3).map((item, i) => (
            <article key={item.id} data-popular-slide data-popular-index={index + i} className="popular-slide">
              <img src={item.image} alt={item.name} onClick={() => setLightboxItem(item)} />
              <h3 className="display-title" style={{ fontSize: '1.35rem', marginTop: '0.75rem' }}>
                {item.name}
              </h3>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                {item.description}
              </p>
              {formatPrice(item) && (
                <p style={{ color: 'var(--accent-lavender)', marginTop: '0.5rem', fontWeight: 600 }}>
                  {formatPrice(item)}
                </p>
              )}
            </article>
          ))}
        </div>
        <div className="popular-controls">
          <button type="button" aria-label="Previous favourites" onClick={() => shift(-1)} disabled={index === 0}>
            <ChevronLeft size={20} />
          </button>
          <button type="button" aria-label="Next favourites" onClick={() => shift(1)} disabled={index >= maxIndex - 1}>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      <FoodLightbox
        item={lightboxItem}
        items={FAVOURITES}
        onClose={() => setLightboxItem(null)}
        onPrev={() =>
          setLightboxItem((cur) => {
            const idx = FAVOURITES.findIndex((f) => f.id === cur?.id);
            return FAVOURITES[(idx - 1 + FAVOURITES.length) % FAVOURITES.length];
          })
        }
        onNext={() =>
          setLightboxItem((cur) => {
            const idx = FAVOURITES.findIndex((f) => f.id === cur?.id);
            return FAVOURITES[(idx + 1) % FAVOURITES.length];
          })
        }
      />
    </section>
  );
}
