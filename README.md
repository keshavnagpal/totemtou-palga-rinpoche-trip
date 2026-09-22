# Upper Mustang — Founding Expedition

One-page scroll site for the TotemToU × Palga Rinpoche expedition.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
```

## How it's put together

Five sections, each a `.layer` that sticks to the top of the viewport while the
next one scrolls up over it — `z-index` ascends 1→5 so later sections sit
higher. Sections taller than the viewport get `.layer--tall` and scroll
normally instead of pinning.

| File | Section |
| --- | --- |
| `src/sections/Overview.jsx` | 1 — the essence of the trip |
| `src/sections/Rinpoche.jsx` | 2 — Palga Rinpoche |
| `src/sections/TripDetails.jsx` | 3 — stats + interactive journey map |
| `src/sections/Team.jsx` | 4 — Eksha & Deepak, shuffling photo stacks |
| `src/sections/CTA.jsx` | 5 — pricing and WhatsApp booking |

- `src/lib/motion.js` — `useParallax` (depth drift on `[data-depth]` children)
  and `useReveal` (enter animations on `[data-reveal]`). Both are the single
  place where motion is disabled for reduced-motion and damped on mobile.
- `src/data/trip.js` — all copy, stats, map pins, team bios, pricing and the
  WhatsApp number. **Edit content here, not in the components.**

## Content you'll want to change

- **Team photos.** Each person needs 3 images for the stack to shuffle
  visibly. `public/assets/{eksha,deepak}-2.webp` and `-3.webp` are currently
  copies of `-1.webp` — drop in real photos at the same paths.
- **Map pins.** `journey.destinations` in `src/data/trip.js`; `x`/`y` are
  percentages of the map artwork (`journey-map-plain.webp`, 1400×752).
- **WhatsApp.** `WHATSAPP_NUMBER` at the top of `src/data/trip.js`.

## Accessibility & motion

`prefers-reduced-motion: reduce` disables Lenis smooth scroll, all
ScrollTriggers and the sticky stack; everything renders as plain stacked
sections. Photo stacks still cycle on click, without rotation.
