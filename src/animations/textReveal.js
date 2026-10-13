import { gsap } from './gsapSetup';

export function revealLines(container, selector = '[data-reveal-line]', reducedMotion = false) {
  if (!container) return null;
  const lines = container.querySelectorAll(selector);
  if (reducedMotion) {
    gsap.set(lines, { y: 0, opacity: 1 });
    return null;
  }
  return gsap.from(lines, {
    yPercent: 110,
    opacity: 0,
    duration: 1,
    stagger: 0.12,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: container,
      start: 'top 75%',
    },
  });
}

export function maskReveal(el, reducedMotion = false) {
  if (!el || reducedMotion) return null;
  return gsap.from(el, {
    clipPath: 'inset(100% 0 0 0)',
    duration: 1.2,
    ease: 'power3.inOut',
    scrollTrigger: {
      trigger: el,
      start: 'top 80%',
    },
  });
}
