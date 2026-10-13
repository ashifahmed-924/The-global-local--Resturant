import { gsap } from './gsapSetup';

const VARIANTS = {
  'bottom-right': {
    from: { x: 50, y: 130, rotation: 6, scale: 0.75, opacity: 0.6 },
    enter: { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 },
    expand: { scale: 1.12 },
    exit: { x: -80, y: 40, scale: 0.82, opacity: 0.5, rotation: -4 },
  },
  'left-in': {
    from: { x: -120, y: 60, rotation: -8, scale: 0.78, opacity: 0.5 },
    enter: { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 },
    expand: { scale: 1.08 },
    exit: { x: 100, y: -30, scale: 0.75, opacity: 0.4, rotation: 5 },
  },
  'top-down': {
    from: { x: 20, y: -140, rotation: 3, scale: 0.8, opacity: 0.55 },
    enter: { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 },
    expand: { scale: 1.15 },
    exit: { x: -40, y: 100, scale: 0.85, opacity: 0.45, rotation: -6 },
  },
  diagonal: {
    from: { x: 90, y: 90, rotation: 10, scale: 0.72, opacity: 0.65 },
    enter: { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 },
    expand: { scale: 1.1 },
    exit: { x: -60, y: -70, scale: 0.8, opacity: 0.5, rotation: -8 },
  },
};

export function getVariant(name) {
  return VARIANTS[name] || VARIANTS['bottom-right'];
}

/**
 * Builds a scrubbed enter → hold → expand → exit timeline for a media element.
 */
export function createScrollImageTimeline({
  trigger,
  media,
  variant = 'bottom-right',
  pin = false,
  scrub = 1.2,
  reducedMotion = false,
}) {
  if (reducedMotion || !trigger || !media) return null;

  const v = getVariant(variant);
  gsap.set(media, v.from);

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger,
      start: 'top 80%',
      end: 'bottom 20%',
      scrub,
      pin: pin ? trigger : false,
      anticipatePin: 0.5,
    },
  });

  tl.to(media, { ...v.enter, ease: 'none', duration: 0.35 })
    .to(media, { ...v.expand, ease: 'none', duration: 0.25 })
    .to(media, { ...v.expand, ease: 'none', duration: 0.2 })
    .to(media, { ...v.exit, ease: 'none', duration: 0.35 });

  return tl;
}
