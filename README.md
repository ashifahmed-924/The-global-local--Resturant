# The Global Local — Dandenong South

UND New York–inspired single-page marketing site for **The Global Local** (Shop 5/182 Monash Drive, Dandenong South VIC 3175).

## Stack

- React (Vite)
- GSAP + ScrollTrigger + Flip + `@gsap/react`
- Lenis smooth scroll (disabled when `prefers-reduced-motion`)
- Plain CSS (no TypeScript)

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

Deploy the `dist/` folder to DigitalOcean static hosting (or any static CDN).

## Content

- Business details: `src/data/business.js`
- Menu & verified Uber Eats prices: `src/data/menu.js`
- Replace photography via `public/images/` (see `public/images/IMAGE_MANIFEST.md`)

## Reference

Layout and motion patterns are inspired by [UnD New York](https://und-ny.com/) — original branding, copy, and assets only.
