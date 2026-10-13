import { useEffect } from 'react';
import { business } from '../data/business';
import { ctaLink, navLinks } from '../data/navigation';
import PillButton from './PillButton';

export default function MobileNav({ open, onClose }) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <div className={`mobile-nav ${open ? 'is-open' : ''}`} aria-hidden={!open}>
      <div className="mobile-nav__panel">
        <button type="button" className="mobile-nav__close" onClick={onClose} aria-label="Close menu">
          ×
        </button>
        <p className="mobile-nav__brand display-title">{business.name}</p>
        <nav aria-label="Primary">
          <ul className="mobile-nav__links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={onClose}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <PillButton href={ctaLink.href} onClick={onClose}>
          {ctaLink.label}
        </PillButton>
      </div>
    </div>
  );
}
