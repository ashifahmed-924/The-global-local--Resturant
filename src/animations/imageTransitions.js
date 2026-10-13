import { gsap } from './gsapSetup';

export function animateImageSwap(outEl, inEl, direction = 'right', reducedMotion = false) {
  if (reducedMotion) {
    if (outEl) gsap.set(outEl, { opacity: 0, display: 'none' });
    if (inEl) gsap.set(inEl, { opacity: 1, display: 'block' });
    return null;
  }

  const xOut = direction === 'left' ? -80 : 80;
  const xIn = direction === 'left' ? 80 : -80;

  const tl = gsap.timeline();
  if (outEl) {
    tl.to(outEl, {
      x: xOut,
      opacity: 0,
      rotation: direction === 'left' ? -6 : 6,
      duration: 0.45,
      ease: 'power2.in',
    });
  }
  if (inEl) {
    gsap.set(inEl, { x: xIn, opacity: 0, rotation: direction === 'left' ? 6 : -6 });
    tl.to(
      inEl,
      { x: 0, opacity: 1, rotation: 0, duration: 0.55, ease: 'power2.out' },
      '-=0.2',
    );
  }
  return tl;
}

export function staggerCards(cards, reducedMotion = false) {
  if (!cards?.length || reducedMotion) return null;
  return gsap.from(cards, {
    y: 60,
    opacity: 0,
    rotation: () => (Math.random() > 0.5 ? 3 : -3),
    stagger: 0.1,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: cards[0],
      start: 'top 85%',
    },
  });
}
