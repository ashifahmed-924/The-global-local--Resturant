import { useState } from 'react';
import { business } from '../data/business';
import { faqs } from '../data/faq';
import PillButton from '../ui/PillButton';

export default function ContactSection() {
  const [openId, setOpenId] = useState(faqs[0]?.id ?? null);

  return (
    <>
    <section id="contact" className="contact-page section-pad">
      <div className="container contact-page__grid">
        <div className="contact-page__copy">
          <h2 className="display-title">Visit & contact</h2>
          <p>
            Premium coffee, breakfast and lunch with a warm neighbourhood pace — crafted for
            Dandenong South mornings and midday breaks.
          </p>
          <p className="contact-page__hours">{business.hoursNote}</p>
          <PillButton href="#reserve">Reserve your seat</PillButton>
        </div>

        <div className="contact-page__cards">
          <article>
            <h3 className="display-title">Phone us</h3>
            <a href={`tel:${business.phone.tel}`}>{business.phone.display}</a>
          </article>
          <article>
            <h3 className="display-title">Address</h3>
            <p>{business.address.formatted}</p>
            <PillButton href={business.mapsUrl} variant="ghost" target="_blank" rel="noreferrer">
              Get directions
            </PillButton>
          </article>
          <article>
            <h3 className="display-title">Order ahead</h3>
            <p>Skip the wait — order on Uber Eats.</p>
            <PillButton href={business.uberEatsUrl} variant="ghost" target="_blank" rel="noreferrer">
              Open Uber Eats
            </PillButton>
          </article>
        </div>
      </div>

      <div className="container contact-page__map">
        <iframe
          title="The Global Local on Google Maps"
          src={business.mapEmbedSrc}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

    </section>
      <section className="about-faq section-pad" aria-labelledby="faq-heading">
        <div className="container about-faq__inner">
          <h2 id="faq-heading" className="display-title">
            Everything you need to know
          </h2>
          <div className="about-faq__list">
            {faqs.map((item) => {
              const open = openId === item.id;
              return (
                <div key={item.id} className={`about-faq__item ${open ? 'is-open' : ''}`}>
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setOpenId(open ? null : item.id)}
                  >
                    <span>{item.question}</span>
                    <span aria-hidden="true">{open ? '−' : '+'}</span>
                  </button>
                  {open ? <p>{item.answer}</p> : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
