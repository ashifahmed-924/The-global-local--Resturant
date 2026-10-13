import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../animations/gsapSetup';
import RevealText from '../ui/RevealText';
import ScrollImageSequence from '../ui/ScrollImageSequence';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function BakerySection() {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;
      gsap.from('[data-bakery-heading]', {
        scale: 0.92,
        scrollTrigger: { trigger: ref.current, scrub: 1, start: 'top 70%', end: 'center center' },
      });
      gsap.to('[data-bakery-bg]', {
        y: 40,
        rotation: 2,
        scrollTrigger: { trigger: ref.current, scrub: 1, start: 'top bottom', end: 'bottom top' },
      });
    },
    { scope: ref, dependencies: [reducedMotion] },
  );

  return (
    <section ref={ref} className="section-shell bakery-section">
      <div className="container-wide">
        <div data-bakery-heading>
          <RevealText className="bakery-heading" lines={['BAKED.', 'TOASTED.', 'LOVED.']} />
        </div>
        <div className="bakery-composition">
          <div data-bakery-bg className="bakery-bg">
            <img src="/images/bakery/pastry-bg.webp" alt="Fresh bakery display" loading="lazy" />
          </div>
          <ScrollImageSequence
            src="/images/bakery/croissant.webp"
            alt="Almond croissant"
            variant="left-in"
            className="bakery-cutout"
            mediaClassName=""
          />
        </div>
      </div>
    </section>
  );
}
