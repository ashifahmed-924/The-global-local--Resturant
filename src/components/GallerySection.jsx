import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../animations/gsapSetup';
import RevealText from '../ui/RevealText';
import GalleryLightbox from '../ui/GalleryLightbox';
import { galleryItems } from '../data/gallery';
import { useReducedMotion } from '../hooks/useReducedMotion';

const layoutClass = {
  'landscape-large': 'gallery-item--lg',
  'portrait-narrow': 'gallery-item--portrait',
  'square-float': 'gallery-item--square',
  'extra-wide': 'gallery-item--wide',
};

export default function GallerySection() {
  const sectionRef = useRef(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;
      sectionRef.current.querySelectorAll('[data-gallery-item]').forEach((el, i) => {
        const fromX = i % 2 === 0 ? -80 : 80;
        gsap.from(el, {
          clipPath: 'inset(50% 50% 50% 50%)',
          x: fromX,
          opacity: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        });
      });
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  );

  return (
    <section id="gallery" ref={sectionRef} className="section-shell gallery-section">
      <div className="container-wide">
        <RevealText className="gallery-heading" lines={['A LITTLE BIT', 'OF EVERYTHING.']} />
        <div className="gallery-collage">
          {galleryItems.map((item, i) => (
            <button
              key={item.id}
              type="button"
              data-gallery-item
              className={`gallery-item ${layoutClass[item.layout] || ''}`}
              onClick={() => setLightboxIndex(i)}
              aria-label={`Open gallery image: ${item.alt}`}
            >
              <img src={item.src} alt={item.alt} loading="lazy" />
            </button>
          ))}
        </div>
      </div>
      <GalleryLightbox
        items={galleryItems}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrev={() => setLightboxIndex((i) => (i - 1 + galleryItems.length) % galleryItems.length)}
        onNext={() => setLightboxIndex((i) => (i + 1) % galleryItems.length)}
      />
    </section>
  );
}
