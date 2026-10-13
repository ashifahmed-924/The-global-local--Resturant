import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../animations/gsapSetup';
import { foodCoffeeHighlights } from '../data/reviews';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function ReviewsSection() {
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const total = foodCoffeeHighlights.length;
  const current = foodCoffeeHighlights[index];

  useGSAP(
    () => {
      if (reducedMotion) return;
      gsap.from('[data-review-reveal]', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  );

  const prev = () => setIndex((value) => (value - 1 + total) % total);
  const next = () => setIndex((value) => (value + 1) % total);

  return (
    <section id="reviews" ref={sectionRef} className="reviews section-pad">
      <div className="container reviews__inner" data-review-reveal>
        <h2 className="display-title">Trusted by Our Neighbourhood</h2>
        <p className="reviews__sub">What we’re known for at Monash Drive</p>

        <blockquote className="reviews__card" key={current.id}>
          <p className="reviews__quote">“{current.body}”</p>
          <footer>
            <cite className="display-title">{current.title}</cite>
            <span>The Global Local · Dandenong South</span>
          </footer>
        </blockquote>

        <div className="reviews__controls">
          <button type="button" onClick={prev} aria-label="Previous highlight">
            ←
          </button>
          <span>
            {index + 1} / {total}
          </span>
          <button type="button" onClick={next} aria-label="Next highlight">
            →
          </button>
        </div>
      </div>
    </section>
  );
}
