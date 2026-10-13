import { menuItems, formatPrice } from '../data/menu';
import { business } from '../data/business';
import PillButton from '../ui/PillButton';
import { useReducedMotion } from '../hooks/useReducedMotion';

const DISHES = [
  { id: 'bacon-egg-roll', tag: 'Morning staple' },
  { id: 'smashed-avocado', tag: 'Crowd favourite' },
  { id: 'chilli-scramble', tag: 'Chef’s pick' },
  { id: 'ham-cheese-croissant', tag: 'Bakery counter' },
  { id: 'almond-croissant', tag: 'Sweet bite' },
  { id: 'meat-pie', tag: 'Lunch ready' },
];

function DishCard({ dish, index }) {
  return (
    <article className="loved__card" aria-hidden={index >= DISHES.length ? true : undefined}>
      <div className="loved__image">
        <img src={dish.image} alt={index >= DISHES.length ? '' : dish.name} />
      </div>
      <p className="loved__tag">{dish.tag}</p>
      <h3 className="display-title">{dish.name}</h3>
      <p className="loved__desc">
        {dish.description}
        {formatPrice(dish) ? ` · ${formatPrice(dish)}` : ''}
      </p>
      <PillButton href={business.uberEatsUrl} variant="ghost" target="_blank" rel="noreferrer" tabIndex={index >= DISHES.length ? -1 : undefined}>
        Try today
      </PillButton>
    </article>
  );
}

export default function LovedDishes() {
  const reducedMotion = useReducedMotion();
  const dishes = DISHES.map((entry) => {
    const item = menuItems.find((menuItem) => menuItem.id === entry.id);
    return item ? { ...item, tag: entry.tag } : null;
  }).filter(Boolean);

  const loop = reducedMotion ? dishes : [...dishes, ...dishes];

  return (
    <section id="favourites" className="loved section-pad">
      <div className="container">
        <h2 className="loved__title display-title">Our Most Loved Dishes</h2>
      </div>
      <div className="loved__viewport">
        <div
          className={`loved__track ${reducedMotion ? '' : 'is-animated'}`}
          aria-label="Most loved dishes"
        >
          {loop.map((dish, index) => (
            <DishCard key={`${dish.id}-${index}`} dish={dish} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
