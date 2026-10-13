import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../animations/gsapSetup';
import { menuItems, formatPrice } from '../data/menu';
import PillButton from '../ui/PillButton';
import ScallopEdge from '../ui/ScallopEdge';
import { useReducedMotion } from '../hooks/useReducedMotion';

const SIGNATURE_IDS = [
  'bacon-egg-roll',
  'smashed-avocado',
  'chilli-scramble',
  'ham-cheese-croissant',
  'chocolate-brownie',
];

export default function SignatureMenu() {
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const items = SIGNATURE_IDS.map((id) => menuItems.find((item) => item.id === id)).filter(Boolean);

  useGSAP(
    () => {
      if (reducedMotion) return;
      gsap.from('[data-sig-reveal]', {
        y: 50,
        opacity: 0,
        stagger: 0.08,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  );

  return (
    <section id="menu" ref={sectionRef} className="signature">
      <div className="signature__inner section-pad">
        <div data-sig-reveal className="signature__heading">
          <p className="signature__eyebrow">Our signature items</p>
          <h2 className="display-title">Taste What Everyone’s Talking About</h2>
        </div>

        <div data-sig-reveal className="signature__card">
          <ul className="signature__list">
            {items.map((item) => (
              <li key={item.id} className="signature__row">
                <span className="display-title">{item.name}</span>
                <span className="display-title">{formatPrice(item) || 'Ask us'}</span>
              </li>
            ))}
          </ul>
          <PillButton href="#reserve">Reserve a table</PillButton>
        </div>
      </div>
      <ScallopEdge position="bottom" color="var(--bg-light)" />
    </section>
  );
}
