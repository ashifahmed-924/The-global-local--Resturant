import { business } from '../data/business';
import { navLinks } from '../data/navigation';
import PillButton from '../ui/PillButton';
import ScallopEdge from '../ui/ScallopEdge';

const SOCIAL_ICONS = {
  instagram: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z"
      />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M22 12.2c0-2.3-.2-3.7-.5-4.6-.3-.9-.9-1.5-1.7-1.8C18.4 5.3 12 5.3 12 5.3s-6.4 0-7.8.5c-.8.3-1.4.9-1.7 1.8-.3.9-.5 2.3-.5 4.6s.2 3.7.5 4.6c.3.9.9 1.5 1.7 1.8 1.4.5 7.8.5 7.8.5s6.4 0 7.8-.5c.8-.3 1.4-.9 1.7-1.8.3-.9.5-2.3.5-4.6z"
      />
      <path fill="var(--green-deep)" d="M10.2 15.2V9.2l5.2 3-5.2 3z" />
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M16.5 4c.4 1.6 1.5 2.9 3 3.5v2.4c-1.1 0-2.2-.3-3.2-.9v5.5c0 3-2.4 5.4-5.4 5.4S5.5 17.5 5.5 14.5 7.9 9.1 10.9 9.1c.3 0 .6 0 .9.1v2.5c-.3-.1-.6-.2-.9-.2-1.6 0-2.9 1.3-2.9 2.9s1.3 2.9 2.9 2.9 2.9-1.3 2.9-2.9V4h2.7z"
      />
    </svg>
  ),
};

export default function Footer() {
  return (
    <footer className="site-footer">
      <ScallopEdge position="top" color="var(--green)" />
      <div className="site-footer__inner section-pad">
        <div className="container site-footer__grid">
          <div>
            <h2 className="display-title">{business.name}</h2>
            <p>{business.tagline}</p>
            <div className="site-footer__social" aria-label="Social media">
              {business.social.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className="site-footer__social-link"
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                >
                  {SOCIAL_ICONS[item.id]}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="display-title">Company</h3>
            <ul>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="display-title">Visit</h3>
            <p>{business.address.formatted}</p>
            <a href={`tel:${business.phone.tel}`}>{business.phone.display}</a>
            <p className="site-footer__hours">{business.hoursNote}</p>
          </div>

          <div className="site-footer__cta">
            <h3 className="display-title">Order ahead</h3>
            <PillButton href={business.uberEatsUrl} target="_blank" rel="noreferrer">
              Book via Uber Eats
            </PillButton>
            <PillButton href={business.mapsUrl} variant="soft" target="_blank" rel="noreferrer">
              Open maps
            </PillButton>
          </div>
        </div>

        <div className="container site-footer__bottom">
          <p>
            © {new Date().getFullYear()} {business.name}
          </p>
          <p>Shop 5/182 Monash Drive · Dandenong South VIC 3175</p>
        </div>
      </div>
    </footer>
  );
}
