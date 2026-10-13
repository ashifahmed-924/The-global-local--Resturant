import { events } from '../data/events';
import PillButton from '../ui/PillButton';

export default function EventsSection() {
  return (
    <section id="events" className="events-page section-pad">
      <div className="container">
        <h2 className="events-section__title display-title">Make every moment count</h2>
        <div className="events-page__list">
          {events.map((event) => (
            <article key={event.id} className="events-page__card">
              <div className="events-page__image">
                <img src={event.image} alt="" />
              </div>
              <div className="events-page__body">
                <div className="events-page__date">
                  <span className="display-title">{event.day}</span>
                  <span>{event.month}</span>
                </div>
                <div>
                  <h3 className="display-title">{event.title}</h3>
                  <p>{event.summary}</p>
                  <a className="events-page__more" href="#reserve">
                    Book ahead →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="events-page__cta">
          <PillButton href="#reserve">Book a table</PillButton>
        </div>
      </div>
    </section>
  );
}
