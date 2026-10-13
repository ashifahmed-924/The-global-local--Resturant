import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../animations/gsapSetup';
import { navLinks, navPreviewImages } from '../data/navigation';

export default function FullscreenNavigation({ open, onClose }) {
  const overlayRef = useRef(null);
  const [preview, setPreview] = useState(navPreviewImages.home);

  useGSAP(
    () => {
      if (!overlayRef.current) return undefined;
      if (open) {
        const tl = gsap.timeline();
        tl.fromTo(overlayRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }).from(
          '[data-nav-link]',
          { y: 40, opacity: 0, stagger: 0.06, duration: 0.5, ease: 'power3.out' },
          '-=0.2',
        );
      } else {
        gsap.set(overlayRef.current, { autoAlpha: 0 });
      }
      return undefined;
    },
    { dependencies: [open] },
  );

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

  return (
    <div
      ref={overlayRef}
      className="nav-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          height: '100%',
          padding: 'var(--section-pad-x)',
        }}
      >
        <nav style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0.5rem' }}>
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              data-nav-link
              onMouseEnter={() => setPreview(navPreviewImages[link.id])}
              onFocus={() => setPreview(navPreviewImages[link.id])}
              onClick={onClose}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                lineHeight: 1,
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1rem' }}>
          <button type="button" className="header-menu-btn" onClick={onClose} aria-label="Close menu">
            <X size={20} />
          </button>
          <div
            style={{
              width: 'min(280px, 40vw)',
              aspectRatio: '4/5',
              overflow: 'hidden',
              borderRadius: '4px',
              marginTop: 'auto',
            }}
          >
            <img src={preview} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
