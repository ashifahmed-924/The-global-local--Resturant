import { useEffect } from 'react';
import Lenis from 'lenis';
import { ScrollTrigger } from '../animations/gsapSetup';

export function useLenis(enabled = true) {
  useEffect(() => {
    if (!enabled) return undefined;

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      touchMultiplier: 1.2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [enabled]);
}
