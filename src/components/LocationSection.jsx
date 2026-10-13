import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../animations/gsapSetup';
import RevealText from '../ui/RevealText';
import AnimatedButton from '../ui/AnimatedButton';
import { business } from '../data/business';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function LocationSection() {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;
      gsap.from('[data-location-map]', {
        x: 60,
        opacity: 0,
        duration: 1,
        scrollTrigger: { trigger: ref.current, start: 'top 70%' },
      });
      gsap.to('[data-location-label]', {
        rotation: 360,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, scrub: 2, start: 'top bottom', end: 'bottom top' },
      });
    },
    { scope: ref, dependencies: [reducedMotion] },
  );

  return (
    <section id="visit" ref={ref} className="section-shell location-section">
      <div className="container-wide location-layout">
        <div className="location-info">
          <RevealText className="location-heading" lines={['FIND US', 'LOCALLY.']} />
          <p data-location-label className="location-rotating-label">
            DANDENONG SOUTH
          </p>
          <p>{business.address.line1}</p>
          <p>
            {business.address.line2} {business.address.state} {business.address.postcode}
          </p>
          <p>
            <a href={`tel:${business.phone.tel}`}>{business.phone.display}</a>
          </p>
          <p className="text-muted" style={{ fontSize: '0.9rem', marginTop: '1rem' }}>
            {business.hoursNote}
          </p>
          <div className="location-actions">
            <AnimatedButton href={business.mapsUrl} target="_blank" rel="noopener noreferrer">
              GET DIRECTIONS
            </AnimatedButton>
            <AnimatedButton variant="outline" href={`tel:${business.phone.tel}`}>
              CALL NOW
            </AnimatedButton>
          </div>
        </div>
        <div data-location-map className="location-map">
          <iframe
            title="The Global Local on Google Maps"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={business.mapEmbedSrc}
          />
        </div>
      </div>
    </section>
  );
}
