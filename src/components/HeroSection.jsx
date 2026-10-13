import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../animations/gsapSetup';
import { business } from '../data/business';
import PillButton from '../ui/PillButton';
import ScallopEdge from '../ui/ScallopEdge';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function HeroSection() {
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-hero-brand]', { y: 80, opacity: 0, duration: 1 })
        .from('[data-hero-line]', { y: 40, opacity: 0, duration: 0.7 }, '-=0.45')
        .from('[data-hero-cta]', { y: 24, opacity: 0, duration: 0.55 }, '-=0.3');
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  );

  return (
    <section id="home" ref={sectionRef} className="hero">
      <div className="hero__media" aria-hidden="true">
        <img src="/images/hero/hero-food.webp" alt="" />
        <div className="hero__shade" />
      </div>

      <div className="hero__content">
        <p data-hero-line className="hero__eyebrow">
          {business.subtitle}
        </p>
        <h1 data-hero-brand className="hero__brand display-title">
          {business.name}
        </h1>
        <p data-hero-line className="hero__tagline">
          {business.tagline}
        </p>
        <div data-hero-cta className="hero__actions">
          <PillButton href="#menu">Explore menu</PillButton>
        </div>
      </div>

      <ScallopEdge position="bottom" color="var(--bg-soft)" />
    </section>
  );
}
