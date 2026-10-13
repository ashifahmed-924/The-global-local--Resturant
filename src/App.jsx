import { useState } from 'react';
import { registerGsapPlugins } from './animations/gsapSetup';
import { useLenis } from './hooks/useLenis';
import { useReducedMotion } from './hooks/useReducedMotion';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import IntroSection from './components/IntroSection';
import CircleStrip from './components/CircleStrip';
import SignatureMenu from './components/SignatureMenu';
import LovedDishes from './components/LovedDishes';
import EventsSection from './components/EventsSection';
import ReviewsSection from './components/ReviewsSection';
import ReserveSection from './components/ReserveSection';
import ContactSection from './components/ContactSection';
import CuisineMarquee from './components/CuisineMarquee';
import Footer from './components/Footer';
import MobileNav from './ui/MobileNav';

registerGsapPlugins();

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  useLenis(!reducedMotion);

  return (
    <>
      <Header onMenuOpen={() => setNavOpen(true)} />
      <main>
        <HeroSection />
        <IntroSection />
        <CircleStrip />
        <SignatureMenu />
        <LovedDishes />
        <EventsSection />
        <ReviewsSection />
        <ReserveSection />
        <ContactSection />
        <CuisineMarquee />
        <Footer />
      </main>
      <MobileNav open={navOpen} onClose={() => setNavOpen(false)} />
    </>
  );
}
