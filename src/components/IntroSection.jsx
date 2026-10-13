import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../animations/gsapSetup';
import PillButton from '../ui/PillButton';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function IntroSection() {
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;

      const items = gsap.utils.toArray('[data-intro-reveal]');
      gsap.set(items, { opacity: 1, y: 0 });

      gsap.fromTo(
        items,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.85,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        },
      );
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  );

  return (
    <section id="about" ref={sectionRef} className="intro section-pad">
      <div className="container intro__inner">
        <h2 data-intro-reveal className="intro__headline display-title">
          <span className="intro__line">
            <span>Where</span>
            <img src="/images/breakfast/bacon-egg.webp" alt="" className="intro__inline-img" />
            <span>Great Food</span>
          </span>
          <span className="intro__line">
            <span>Brings People</span>
            <img src="/images/coffee/latte.webp" alt="" className="intro__inline-img" />
            <span>Together</span>
          </span>
        </h2>

        <p data-intro-reveal className="intro__copy">
          Enjoy chef-crafted breakfast, specialty coffee and warm hospitality made for
          unforgettable mornings and lunch breaks in Dandenong South.
        </p>

        <div data-intro-reveal className="intro__hours">
          <span />
          <p>Daily service · Coffee · Breakfast · Lunch</p>
          <span />
        </div>

        <div data-intro-reveal>
          <PillButton href="#reserve">
            Book a table
          </PillButton>
        </div>
      </div>
    </section>
  );
}
