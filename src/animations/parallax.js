import { gsap } from './gsapSetup';

export function parallaxY(el, amount = 80, reducedMotion = false) {
  if (!el || reducedMotion) return null;
  return gsap.to(el, {
    y: amount,
    ease: 'none',
    scrollTrigger: {
      trigger: el,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
}
