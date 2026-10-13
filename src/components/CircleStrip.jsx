import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../animations/gsapSetup';
import ScallopEdge from '../ui/ScallopEdge';
import { useReducedMotion } from '../hooks/useReducedMotion';

const IMAGES = [
  {
    src: '/images/breakfast/chilli-scramble.webp',
    alt: 'Chilli scramble breakfast',
    label: 'Breakfast',
  },
  {
    src: '/images/breakfast/avocado.webp',
    alt: 'Smashed avocado lunch plate',
    label: 'Lunch',
  },
  {
    src: '/images/bakery/croissant.webp',
    alt: 'Bakery croissant',
    label: 'Bakery',
  },
];

export default function CircleStrip() {
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;

      const items = gsap.utils.toArray('[data-circle]');
      gsap.set(items, { opacity: 1, scale: 1 });

      gsap.fromTo(
        items,
        { scale: 0.78, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.14,
          duration: 0.9,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
        },
      );
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  );

  return (
    <section ref={sectionRef} className="circle-strip" aria-label="Food gallery">
      <div className="circle-strip__inner">
        <h2 className="circle-strip__heading display-title">Fresh from our kitchen</h2>
        <div className="circle-strip__row">
          {IMAGES.map((image) => (
            <figure key={image.src} data-circle className="circle-strip__item">
              <img src={image.src} alt={image.alt} loading="lazy" />
              <figcaption className="circle-strip__label">{image.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
      <ScallopEdge position="bottom" color="var(--green)" />
    </section>
  );
}
