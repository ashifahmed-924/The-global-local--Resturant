import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../animations/gsapSetup';
import RevealText from '../ui/RevealText';
import AnimatedButton from '../ui/AnimatedButton';
import { useReducedMotion } from '../hooks/useReducedMotion';

const LUNCH_IMAGES = [
  { src: '/images/lunch/sandwich.webp', label: 'Sandwiches', className: 'lunch-card--hero' },
  { src: '/images/lunch/wrap.webp', label: 'Wraps', className: '' },
  { src: '/images/lunch/toastie.webp', label: 'Toasties', className: '' },
  { src: '/images/lunch/pie.webp', label: 'Hot Food', className: '' },
];

export default function LunchSection() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !trackRef.current) return;
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        gsap.to(trackRef.current, {
          x: () => -(trackRef.current.scrollWidth - window.innerWidth + 80),
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            scrub: 1,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  );

  return (
    <section ref={sectionRef} className="section-shell lunch-section">
      <div className="container-wide">
        <RevealText className="lunch-heading" lines={['YOUR LUNCH.', 'YOUR WAY.']} />
      </div>
      <div style={{ overflow: 'hidden', paddingLeft: 'var(--section-pad-x)' }}>
        <div ref={trackRef} className="lunch-track">
          {LUNCH_IMAGES.map((item) => (
            <figure key={item.label} className={`lunch-card ${item.className}`}>
              <img src={item.src} alt={item.label} loading="lazy" />
              <figcaption className="lunch-label">{item.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
      <div className="container-wide" style={{ marginTop: '2rem' }}>
        <AnimatedButton href="#menu">EXPLORE LUNCH MENU</AnimatedButton>
      </div>
    </section>
  );
}
