import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { revealLines } from '../animations/textReveal';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function RevealText({ lines, className = '', as: Tag = 'h2' }) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      revealLines(ref.current, '[data-reveal-line]', reducedMotion);
    },
    { scope: ref, dependencies: [reducedMotion] },
  );

  return (
    <Tag ref={ref} className={`display-title ${className}`}>
      {lines.map((line) => (
        <span key={line} className="intro-heading-line">
          <span data-reveal-line>{line}</span>
        </span>
      ))}
    </Tag>
  );
}
