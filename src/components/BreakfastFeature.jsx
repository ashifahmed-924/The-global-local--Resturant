import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '../animations/gsapSetup';
import ScrollImageSequence from '../ui/ScrollImageSequence';
import RevealText from '../ui/RevealText';
import AnimatedButton from '../ui/AnimatedButton';
import { useReducedMotion } from '../hooks/useReducedMotion';

const SLIDES = [
  { src: '/images/breakfast/bacon-egg.webp', label: 'Bacon & Egg Roll', variant: 'bottom-right' },
  { src: '/images/breakfast/chilli-scramble.webp', label: 'Chilli Scramble with Feta', variant: 'diagonal' },
  { src: '/images/breakfast/avocado.webp', label: 'Smashed Avocado', variant: 'left-in' },
];

export default function BreakfastFeature() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !stageRef.current) return;
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px)', () => {
        const imgs = stageRef.current.querySelectorAll('[data-breakfast-slide]');
        if (imgs.length < 2) return;

        ScrollTrigger.create({
          trigger: stageRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          pinSpacing: true,
        });

        gsap.set(imgs, { autoAlpha: 0, position: 'absolute', inset: 0, margin: 'auto', width: 'min(100%, 720px)' });
        gsap.set(imgs[0], { autoAlpha: 1 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stageRef.current,
            start: 'top top',
            end: '+=130%',
            scrub: 1,
          },
        });

        imgs.forEach((img, i) => {
          if (i === 0) return;
          tl.to(imgs[i - 1], { x: -100, scale: 0.85, autoAlpha: 0, duration: 0.33 }).fromTo(
            img,
            { x: 80, y: 80, scale: 0.75, rotation: 6, autoAlpha: 0 },
            { x: 0, y: 0, scale: 1, rotation: 0, autoAlpha: 1, duration: 0.33 },
          );
        });
      });
      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  );

  return (
    <section ref={sectionRef} className="section-shell breakfast-section">
      <div className="container-wide">
        <RevealText className="breakfast-heading" lines={['MORNINGS,', 'MADE BETTER.']} />
        <div ref={stageRef} className="breakfast-stage">
          <div className="breakfast-stage__desktop" aria-hidden={reducedMotion}>
            {SLIDES.map((slide) => (
              <div key={slide.src} data-breakfast-slide>
                <img className="breakfast-hero-img" src={slide.src} alt={slide.label} />
              </div>
            ))}
          </div>
          <div className="breakfast-stage__mobile">
            {SLIDES.map((slide) => (
              <ScrollImageSequence
                key={`m-${slide.src}`}
                src={slide.src}
                alt={slide.label}
                variant={slide.variant}
                mediaClassName="breakfast-hero-img"
              />
            ))}
          </div>
          <div className="breakfast-labels">
            {SLIDES.map((s) => (
              <span key={s.label}>{s.label}</span>
            ))}
          </div>
        </div>
        <AnimatedButton href="#menu" style={{ marginTop: '2rem' }}>
          BREAKFAST MENU
        </AnimatedButton>
      </div>
    </section>
  );
}
