const ITEMS = [
  'Breakfast',
  'Coffee',
  'Toasties',
  'Bakery',
  'Wraps',
  'Lunch',
  'Dandenong South',
];

export default function CuisineMarquee() {
  const loop = [...ITEMS, ...ITEMS];

  return (
    <section className="marquee" aria-label="Kitchen highlights">
      <div className="marquee__track">
        {loop.map((item, index) => (
          <span key={`${item}-${index}`} className="display-title">
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
