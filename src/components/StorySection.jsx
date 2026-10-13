import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../animations/gsapSetup';
import RevealText from '../ui/RevealText';
import { business } from '../data/business';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function StorySection() {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;
      gsap.from('[data-story-image]', {
        scale: 0.85,
        clipPath: 'inset(20% 20% 20% 20%)',
        scrollTrigger: { trigger: ref.current, scrub: 1, start: 'top 60%', end: 'center center' },
      });
      gsap.to('[data-story-text]', {
        y: -30,
        scrollTrigger: { trigger: ref.current, scrub: 1, start: 'top bottom', end: 'bottom top' },
      });
    },
    { scope: ref, dependencies: [reducedMotion] },
  );

  return (
    <section ref={ref} className="section-shell story-section">
      <p className="story-caption">Welcome to The Global Local</p>
      <span className="story-bg-word" aria-hidden="true">
        LOCAL
      </span>
      <div className="container-wide story-layout">
        <div data-story-text>
          <RevealText className="story-heading" lines={['A PLACE', 'TO PAUSE.']} />
          <p className="story-body" style={{ marginTop: '1.5rem' }}>
            The Global Local is your neighbourhood café in Dandenong South — serving breakfast, specialty coffee
            and lunch from Shop 5 on Monash Drive. Whether you are starting the day with a bacon and egg roll or
            catching up over a flat white, we are here for good food, good coffee and good company.
          </p>
          <p className="editorial-italic" style={{ marginTop: '1.25rem' }}>
            {business.address.formatted}
          </p>
        </div>
        <div data-story-image className="story-image">
          <img src="/images/hero/story.webp" alt="Coffee and café atmosphere" loading="lazy" />
        </div>
      </div>
    </section>
  );
}
