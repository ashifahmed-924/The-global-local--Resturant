import { useEffect, useState } from 'react';
import { business } from '../data/business';
import { ctaLink } from '../data/navigation';
import PillButton from '../ui/PillButton';

export default function Header({ onMenuOpen }) {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.65);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-header ${solid ? 'is-solid' : ''}`}>
      <button type="button" className="site-header__menu" onClick={onMenuOpen} aria-label="Open menu">
        <span className="site-header__burger" aria-hidden="true" />
        <span>MENU</span>
      </button>

      <a href="#home" className="site-header__logo">
        <span className="site-header__mark" aria-hidden="true">
          ✦
        </span>
        <span className="display-title">{business.name}</span>
      </a>

      <PillButton href={ctaLink.href} className="site-header__cta">
        {ctaLink.label}
      </PillButton>
    </header>
  );
}
