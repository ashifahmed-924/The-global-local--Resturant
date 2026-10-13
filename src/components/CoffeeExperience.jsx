import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../animations/gsapSetup';
import RevealText from '../ui/RevealText';
import { useReducedMotion } from '../hooks/useReducedMotion';

const STEPS = [
  { id: '01', label: 'Espresso', src: '/images/coffee/espresso.webp' },
  { id: '02', label: 'Milk Coffee', src: '/images/coffee/latte.webp' },
  { id: '03', label: 'Iced Coffee', src: '/images/coffee/iced.webp' },
];

export default function CoffeeExperience() {
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;
      const slides = sectionRef.current.querySelectorAll('[data-coffee-slide]');
      gsap.set(slides, { autoAlpha: 0, y: 80, scale: 0.9 });
      gsap.set(slides[0], { autoAlpha: 1, y: 0, scale: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'bottom 20%',
          scrub: 1.2,
        },
      });

      slides.forEach((slide, i) => {
        if (i === 0) return;
        tl.to(slides[i - 1], { x: -60, autoAlpha: 0, scale: 0.85, duration: 0.33 }).fromTo(
          slide,
          { x: 60, autoAlpha: 0, scale: 0.88 },
          { x: 0, autoAlpha: 1, scale: 1, duration: 0.33 },
        );
        tl.to(`[data-coffee-label="${i}"]`, { y: 0, autoAlpha: 1, duration: 0.2 }, '<');
      });
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  );

  return (
    <section id="coffee" ref={sectionRef} className="section-shell coffee-section">
      <div className="container-wide">
        <RevealText className="coffee-heading" lines={['BREWED', 'FOR YOUR DAY.']} />
        <div className="coffee-stage">
          {STEPS.map((step, i) => (
            <article key={step.id} className="coffee-slide" data-coffee-slide={step.id}>
              <span className="coffee-index">{step.id}</span>
              <img src={step.src} alt={step.label} loading="lazy" />
              <p
                className="coffee-label"
                data-coffee-label={i}
                style={i > 0 && !reducedMotion ? { opacity: 0.35, transform: 'translateY(12px)' } : undefined}
              >
                {step.label}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
