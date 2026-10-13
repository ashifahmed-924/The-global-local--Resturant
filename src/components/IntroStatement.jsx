import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../animations/gsapSetup';
import RevealText from '../ui/RevealText';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function IntroStatement() {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;
      gsap.to('[data-intro-line="1"]', {
        x: -40,
        scrollTrigger: { trigger: ref.current, scrub: 1, start: 'top bottom', end: 'bottom top' },
      });
      gsap.to('[data-intro-line="2"]', {
        x: 30,
        scrollTrigger: { trigger: ref.current, scrub: 1, start: 'top bottom', end: 'bottom top' },
      });
      gsap.to('[data-intro-line="3"]', {
        x: -20,
        scrollTrigger: { trigger: ref.current, scrub: 1, start: 'top bottom', end: 'bottom top' },
      });
      gsap.from('[data-intro-circle]', {
        rotation: 20,
        scale: 0.6,
        scrollTrigger: { trigger: ref.current, start: 'top 70%', end: 'center center', scrub: 1 },
      });
    },
    { scope: ref, dependencies: [reducedMotion] },
  );

  return (
    <section id="about" ref={ref} className="section-shell intro-section">
      <div className="container-wide intro-circle-wrap">
        <RevealText
          className="intro-heading"
          lines={['GOOD FOOD.', 'GOOD COFFEE.', 'GOOD COMPANY.']}
        />
        <div data-intro-circle className="intro-circle">
          <img src="/images/breakfast/intro-circle.webp" alt="Breakfast plate" />
        </div>
        <p className="text-muted" style={{ maxWidth: '42ch', marginTop: '3rem', fontSize: '1.05rem' }}>
          A neighbourhood café on Monash Drive — breakfast, coffee and lunch with local flavour and a global
          feel.
        </p>
      </div>
    </section>
  );
}
