# Kemas Studio — RenovateDemo

A static marketing site for a design-and-build home makeover studio in Malaysia. Its feature set mirrors the major makeover players (theme catalogue, own-stay vs. rental-investment paths, cost estimator, financing calculator, warranty and referral club), with its own brand and design.

## Pages

| Page | What it does |
| --- | --- |
| `index.html` | Hero with live theme preview, own-stay/investor tabs, filterable theme grid, guarantees, 5-step process, live cost estimator with lead capture, financing calculator, reviews carousel, care & club, FAQ, contact form |
| `designs.html` | Full theme catalogue with style filter (kept in the URL) and sorting |
| `design-detail.html?theme=<slug>` | Theme detail: interactive floor-plan hotspots, gallery and lightbox, material palette, itemised starting price, monthly instalment |
| `about.html` | Story timeline, written promises, regions, careers |

## Structure

- `style.css` holds the whole design system. Tokens are at the top: warm paper, forest green and terracotta, with Fraunces (display) and Instrument Sans (body).
- `main.js` has all behaviour, plus the `THEMES` data used by the catalogue and detail pages. The estimator's pricing model is `PRICING`.
- `icons.js` injects the shared inline SVG icon sprite (`<svg><use href="#i-name"/></svg>`).
- `assets/img/` holds WebP images, each in full size and in a `-sm` 640px version.

No build step is needed. Serve the folder with any static server:

```sh
python3 -m http.server 8000
```

> Demo content: prices, statistics, reviews, contact details and the company itself are illustrative placeholders. Forms don't submit anywhere yet.
