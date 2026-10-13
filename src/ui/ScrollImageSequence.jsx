import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { createScrollImageTimeline } from '../animations/scrollImageSequence';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function ScrollImageSequence({
  src,
  alt = '',
  variant = 'bottom-right',
  pin = false,
  className = '',
  mediaClassName = '',
  scrub = 1.2,
}) {
  const rootRef = useRef(null);
  const mediaRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const tl = createScrollImageTimeline({
        trigger: rootRef.current,
        media: mediaRef.current,
        variant,
        pin,
        scrub,
        reducedMotion,
      });
      return () => {
        tl?.scrollTrigger?.kill();
        tl?.kill();
      };
    },
    { scope: rootRef, dependencies: [variant, pin, scrub, reducedMotion] },
  );

  return (
    <div ref={rootRef} className={`scroll-seq ${className}`}>
      <div ref={mediaRef} className={`scroll-seq__media ${mediaClassName}`}>
        <img src={src} alt={alt} loading="lazy" decoding="async" />
      </div>
    </div>
  );
}
