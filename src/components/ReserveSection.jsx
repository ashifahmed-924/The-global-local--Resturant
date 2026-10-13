import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../animations/gsapSetup';
import { business } from '../data/business';
import PillButton from '../ui/PillButton';
import ScallopEdge from '../ui/ScallopEdge';
import { useReducedMotion } from '../hooks/useReducedMotion';

const INITIAL = {
  name: '',
  email: '',
  phone: '',
  guests: '2',
  date: '',
  time: '',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+]?[\d\s().-]{8,20}$/;
const NAME_RE = /^[\p{L}\s'.-]{2,80}$/u;

function todayISO() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function validateField(name, value, form) {
  const trimmed = typeof value === 'string' ? value.trim() : value;

  switch (name) {
    case 'name':
      if (!trimmed) return 'Please enter your full name.';
      if (!NAME_RE.test(trimmed)) return 'Use letters only (at least 2 characters).';
      return '';
    case 'email':
      if (!trimmed) return 'Please enter your email address.';
      if (!EMAIL_RE.test(trimmed)) return 'Enter a valid email, like you@email.com.';
      return '';
    case 'phone': {
      if (!trimmed) return 'Please enter your phone number.';
      const digits = trimmed.replace(/\D/g, '');
      if (!PHONE_RE.test(trimmed) || digits.length < 8 || digits.length > 15) {
        return 'Enter a valid phone number.';
      }
      return '';
    }
    case 'guests': {
      if (value === '' || value == null) return 'Please choose how many guests.';
      const n = Number(value);
      if (!Number.isInteger(n) || n < 1 || n > 20) {
        return 'Guests must be between 1 and 20.';
      }
      return '';
    }
    case 'date':
      if (!trimmed) return 'Please choose a date.';
      if (trimmed < todayISO()) return 'Date can’t be in the past.';
      return '';
    case 'time':
      if (!trimmed) return 'Please choose a time.';
      if (form.date && form.date === todayISO()) {
        const now = new Date();
        const [h, m] = trimmed.split(':').map(Number);
        const selected = new Date();
        selected.setHours(h, m, 0, 0);
        if (selected <= now) return 'Choose a time later today.';
      }
      return '';
    default:
      return '';
  }
}

function validateForm(form) {
  const fields = ['name', 'email', 'phone', 'guests', 'date', 'time'];
  const next = {};
  let firstInvalid = null;

  fields.forEach((field) => {
    const message = validateField(field, form[field], form);
    if (message) {
      next[field] = message;
      if (!firstInvalid) firstInvalid = field;
    }
  });

  return { errors: next, firstInvalid };
}

export default function ReserveSection() {
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useGSAP(
    () => {
      if (reducedMotion) return;
      gsap.from('[data-reserve-reveal]', {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
      });
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  );

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      if (touched[name] || errors[name]) {
        setErrors((prevErrors) => {
          const message = validateField(name, value, next);
          const updated = { ...prevErrors };
          if (message) updated[name] = message;
          else delete updated[name];
          if (name === 'date' && next.time && (touched.time || prevErrors.time)) {
            const timeMsg = validateField('time', next.time, next);
            if (timeMsg) updated.time = timeMsg;
            else delete updated.time;
          }
          return updated;
        });
      }
      return next;
    });
  };

  const onBlur = (event) => {
    const { name, value } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => {
      const message = validateField(name, value, form);
      const updated = { ...prev };
      if (message) updated[name] = message;
      else delete updated[name];
      return updated;
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const { errors: nextErrors, firstInvalid } = validateForm(form);
    setTouched({
      name: true,
      email: true,
      phone: true,
      guests: true,
      date: true,
      time: true,
    });
    setErrors(nextErrors);

    if (firstInvalid) {
      const field = event.currentTarget.elements.namedItem(firstInvalid);
      if (field && typeof field.focus === 'function') field.focus();
      return;
    }

    const subject = encodeURIComponent(`Table request — ${form.name.trim()}`);
    const body = encodeURIComponent(
      [
        `Name: ${form.name.trim()}`,
        `Email: ${form.email.trim()}`,
        `Phone: ${form.phone.trim()}`,
        `Guests: ${form.guests}`,
        `Date: ${form.date}`,
        `Time: ${form.time}`,
      ].join('\n'),
    );
    window.location.href = `mailto:hello@thegloballocal.example?subject=${subject}&body=${body}`;
  };

  const fieldClass = (name) => (errors[name] ? 'is-invalid' : undefined);

  return (
    <section id="reserve" ref={sectionRef} className="reserve">
      <ScallopEdge position="top" color="var(--bg-light)" />
      <div className="reserve__inner section-pad">
        <div className="container reserve__grid">
          <div data-reserve-reveal className="reserve__copy">
            <h2 className="display-title">Gather Around the Perfect Table</h2>
            <p>
              Call ahead or send a request — we’ll confirm seating, coffee runs and group
              breakfasts when we can.
            </p>
            <a className="reserve__phone" href={`tel:${business.phone.tel}`}>
              {business.phone.display}
            </a>
          </div>

          <form
            data-reserve-reveal
            className="reserve__form"
            onSubmit={onSubmit}
            noValidate
          >
            <label>
              Full name
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                onBlur={onBlur}
                placeholder="Your name"
                autoComplete="name"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'reserve-name-error' : undefined}
                className={fieldClass('name')}
                required
              />
              {errors.name ? (
                <span id="reserve-name-error" className="reserve__error" role="alert">
                  {errors.name}
                </span>
              ) : null}
            </label>
            <label>
              Email address
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                onBlur={onBlur}
                placeholder="you@email.com"
                autoComplete="email"
                inputMode="email"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'reserve-email-error' : undefined}
                className={fieldClass('email')}
                required
              />
              {errors.email ? (
                <span id="reserve-email-error" className="reserve__error" role="alert">
                  {errors.email}
                </span>
              ) : null}
            </label>
            <label>
              Phone number
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={business.phone.display}
                autoComplete="tel"
                inputMode="tel"
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? 'reserve-phone-error' : undefined}
                className={fieldClass('phone')}
                required
              />
              {errors.phone ? (
                <span id="reserve-phone-error" className="reserve__error" role="alert">
                  {errors.phone}
                </span>
              ) : null}
            </label>
            <div className="reserve__row">
              <label>
                Guests
                <input
                  type="number"
                  min="1"
                  max="20"
                  step="1"
                  name="guests"
                  value={form.guests}
                  onChange={onChange}
                  onBlur={onBlur}
                  aria-invalid={Boolean(errors.guests)}
                  aria-describedby={errors.guests ? 'reserve-guests-error' : undefined}
                  className={fieldClass('guests')}
                  required
                />
                {errors.guests ? (
                  <span id="reserve-guests-error" className="reserve__error" role="alert">
                    {errors.guests}
                  </span>
                ) : null}
              </label>
              <label>
                Date
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  min={todayISO()}
                  onChange={onChange}
                  onBlur={onBlur}
                  aria-invalid={Boolean(errors.date)}
                  aria-describedby={errors.date ? 'reserve-date-error' : undefined}
                  className={fieldClass('date')}
                  required
                />
                {errors.date ? (
                  <span id="reserve-date-error" className="reserve__error" role="alert">
                    {errors.date}
                  </span>
                ) : null}
              </label>
              <label>
                Time
                <input
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={onChange}
                  onBlur={onBlur}
                  aria-invalid={Boolean(errors.time)}
                  aria-describedby={errors.time ? 'reserve-time-error' : undefined}
                  className={fieldClass('time')}
                  required
                />
                {errors.time ? (
                  <span id="reserve-time-error" className="reserve__error" role="alert">
                    {errors.time}
                  </span>
                ) : null}
              </label>
            </div>
            <PillButton type="submit">Reserve a table</PillButton>
          </form>
        </div>
      </div>
    </section>
  );
}
