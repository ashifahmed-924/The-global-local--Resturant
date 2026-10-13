import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../animations/gsapSetup';
import RevealText from '../ui/RevealText';
import AnimatedButton from '../ui/AnimatedButton';
import FoodLightbox from '../ui/FoodLightbox';
import FullMenuModal from '../ui/FullMenuModal';
import { animateImageSwap, staggerCards } from '../animations/imageTransitions';
import {
  formatPrice,
  getFeaturedForCategory,
  itemsByCategory,
  menuCategories,
  menuItems,
} from '../data/menu';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { business } from '../data/business';

export default function MenuExplorer() {
  const sectionRef = useRef(null);
  const featureImgRef = useRef(null);
  const [category, setCategory] = useState('breakfast');
  const [lightboxItem, setLightboxItem] = useState(null);
  const [fullMenuOpen, setFullMenuOpen] = useState(false);
  const [featured, setFeatured] = useState(getFeaturedForCategory('breakfast'));
  const reducedMotion = useReducedMotion();
  const listItems = itemsByCategory(category);

  useGSAP(
    () => {
      staggerCards(sectionRef.current.querySelectorAll('[data-menu-item]'), reducedMotion);
    },
    { scope: sectionRef, dependencies: [category, reducedMotion] },
  );

  const changeCategory = (id) => {
    if (id === category) return;
    const next = getFeaturedForCategory(id);
    const dir = menuCategories.findIndex((c) => c.id === id) > menuCategories.findIndex((c) => c.id === category) ? 'right' : 'left';
    animateImageSwap(featureImgRef.current, null, dir, reducedMotion);
    gsap.fromTo(
      featureImgRef.current,
      { scale: 1.05, filter: 'brightness(1.1)' },
      { scale: 1, filter: 'brightness(1)', duration: 0.5 },
    );
    setCategory(id);
    setFeatured(next);
  };

  const openLightbox = (item) => setLightboxItem(item);
  const closeLightbox = () => setLightboxItem(null);
  const navLightbox = (delta) => {
    if (!lightboxItem) return;
    const idx = menuItems.findIndex((i) => i.id === lightboxItem.id);
    const next = menuItems[(idx + delta + menuItems.length) % menuItems.length];
    setLightboxItem(next);
  };

  return (
    <section id="menu" ref={sectionRef} className="section-shell menu-section">
      <div className="container-wide">
        <RevealText className="menu-heading" lines={["WHAT'S", 'ON THE MENU?']} />
        <div className="menu-cats" role="tablist" aria-label="Menu categories">
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={category === cat.id}
              className={`menu-cat-btn ${category === cat.id ? 'is-active' : ''}`}
              onClick={() => changeCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
        <div className="menu-layout">
          <div>
            <div className="menu-feature-img">
              <img ref={featureImgRef} src={featured.image} alt={featured.name} key={featured.id} />
            </div>
            <h3 className="menu-feature-title">{featured.name}</h3>
            <p className="text-muted">{featured.description}</p>
          </div>
          <ul className="menu-list">
            {listItems.map((item) => {
              const price = formatPrice(item);
              return (
                <li
                  key={item.id}
                  className="menu-list-item"
                  data-menu-item
                  onClick={() => openLightbox(item)}
                  onKeyDown={(e) => e.key === 'Enter' && openLightbox(item)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="menu-item-row">
                    <span className="menu-item-name">{item.name}</span>
                    {price && <span className="menu-item-price">{price}</span>}
                  </div>
                  <p className="text-muted" style={{ fontSize: '0.9rem', marginTop: '0.35rem' }}>
                    {item.description}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="menu-actions">
          <AnimatedButton onClick={() => setFullMenuOpen(true)}>VIEW ALL MENU</AnimatedButton>
          <AnimatedButton variant="outline" href={business.uberEatsUrl} target="_blank" rel="noopener noreferrer">
            UBER EATS
          </AnimatedButton>
        </div>
      </div>
      <FoodLightbox
        item={lightboxItem}
        items={menuItems}
        onClose={closeLightbox}
        onPrev={() => navLightbox(-1)}
        onNext={() => navLightbox(1)}
      />
      <FullMenuModal open={fullMenuOpen} onClose={() => setFullMenuOpen(false)} />
    </section>
  );
}
