import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../animations/gsapSetup';
import { useReducedMotion } from '../hooks/useReducedMotion';

const TEXT = 'THE GLOBAL LOCAL • THE GLOBAL LOCAL • THE GLOBAL LOCAL • ';

export default function TypographyMarquee() {
  const trackRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !trackRef.current) return;
      const track = trackRef.current;
      const width = track.scrollWidth / 2;
      gsap.to(track, {
        x: -width,
        duration: 28,
        ease: 'none',
        repeat: -1,
      });
    },
    { dependencies: [reducedMotion] },
  );

  return (
    <section className="marquee-section" aria-hidden={reducedMotion ? undefined : true}>
      <div className="marquee-images">
        <img src="/images/bakery/brownie.webp" alt="" />
        <img src="/images/coffee/latte.webp" alt="" />
        <img src="/images/breakfast/bacon-egg.webp" alt="" />
      </div>
      <div style={{ overflow: 'hidden' }}>
        <div ref={trackRef} className="marquee-track">
          <span className="marquee-item solid">{TEXT}</span>
          <span className="marquee-item">{TEXT}</span>
          <span className="marquee-item solid">{TEXT}</span>
          <span className="marquee-item">{TEXT}</span>
        </div>
      </div>
    </section>
  );
}
