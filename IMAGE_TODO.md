# Image gaps — handoff notes

This lists every place where the redesigned Kemas Studio site needs real photography (or other imagery) that the repo doesn't have yet. It's meant to be picked up in a later session.

The gaps came out of six rounds of design review. Each gap was covered with an honest stand-in: crops of an existing photo, a finish spec, or a designed card. Nothing shows another theme's photo or a fake "before" shot. Once real images exist, each item below says what to swap and where.

## Conventions for adding images

- **Format:** WebP in `assets/img/`. Each photo comes in a full-size version (`name.webp`) and a 640px version (`name-sm.webp`, used for cards and thumbnails).
- **Size:** current sources are only 1024px. Supply at least **2000px on the long edge** so hero images stay sharp on 2× screens.
- **Theme data:** lives in the `THEMES` array at the top of `main.js` (`img`, `shots`, `finishes`, `palette`).
- **Shared header and footer:** `designs.html`, `design-detail.html`, `about.html` and `legal.html` copy the header and footer from `index.html`. If you change those, update all five pages.
- **Content:** every photo should look Malaysian: no fireplaces, tropical light, local condo and terrace layouts.

---

## 1. Room photos for every theme — highest impact

- **Where:** `design-detail.html?theme=<slug>`, in the "Room by room" section (floor-plan hotspots) and the hero's "View photos" lightbox.
- **Now:** each theme has **one** photo, its cover. Only that room shows "As photographed". Dining, Kitchen and Master bedroom show a finish spec: a crop of the cover photo, captioned "Materials as seen in the living room", plus the palette strip.
- **Code:** in `main.js`, `initDetailPage()` → `showRoom()`. See also `COVER_ROOM`, `roomTexture` and `theme.finishes`.
- **Needed:** for each of the 9 themes, photos of the **living, dining, kitchen and master bedroom**. That is about 27 new photos; marble-pantry already covers its kitchen and clay-cotton its master bedroom.

| Theme slug | Cover photo (room) | Missing rooms |
|---|---|---|
| emerald-atelier | theme-emerald (living) | dining, kitchen, master |
| linen-morning | theme-linen (living) | dining, kitchen, master |
| ember-loft | theme-ember (living) | dining, kitchen, master |
| salon-boheme | theme-boheme (living) | dining, kitchen, master |
| soft-arc | theme-softarc (living) | dining, kitchen, master |
| skyline-walnut | theme-skyline (living) | dining, kitchen, master |
| ivory-arch | room-living (living) | dining, kitchen, master |
| marble-pantry | room-kitchen (kitchen) | living, dining, master |
| clay-cotton | room-bedroom (master) | living, dining, kitchen |

- **To wire up:** add a per-room image map to each theme in `THEMES`, for example `rooms: { dining: 'emerald-dining', ... }`. In `showRoom()`, render a photo whenever one exists and keep the finish spec as the fallback.

## 2. Real detail and close-up shots per theme

- **Where:** `design-detail.html`, in the three-image strip under the hero (`#dt-details`) and the lightbox.
- **Now:** `theme-*-d1/d2/d3.webp` (and `room-*-d1..d3`) are **crops of the cover photo**. They're labelled honestly ("Detail · …"), but a reviewer said they read as fake depth.
- **Needed:** about 3 genuine close-ups per theme (hardware, joinery, textiles, lighting).
- **Captions:** in `theme.shots`.

## 3. Before/after slider — new feature, blocked on photos

- **Where:** not built yet. Good spots are the homepage (after the "Two ways to work with us" section) and each theme detail page.
- **Why it matters:** the round 6 reviewer called it "the single most persuasive asset for a makeover company".
- **Needed:** matched **before/after pairs** shot from the same camera position, ideally 3–6 projects, each tagged with property type, sq ft and theme.
- **Don't fake it:** never build a "before" from a desaturated or blurred "after".

## 4. Floor plans per theme

- **Where:** `design-detail.html`, the floor plan in "Room by room".
- **Now:** every theme shares one 3-bedroom plan (`floorplan.webp`). Its second "BEDROOM 2" label was hand-edited to "BEDROOM 3".
- **Problem:** Soft Arc (750 sq ft, "studios & 2-bed") and Ember Loft (900 sq ft) still show a 3-bed plan.
- **Needed:** plans sized to each theme's sample unit (`sqft` and `beds` in `THEMES`), ideally SVG so labels stay crisp. Each plan needs new hotspot coordinates, which are the inline `style="top:…;left:…"` values on the `.hotspot` buttons.

## 5. Homepage "Day 0 → 30" scroll story

- **Where:** `index.html`, `#process`, with sticky-frame images and mobile inline images (`.jstep__img`).

| Step | Current image | Issue | Needed |
|---|---|---|---|
| Day −14 Free consult | `story-studio` (AI, vintage drafting room) | Looks Western and dated | A designer measuring a real Malaysian unit |
| Day −7 Theme & quote | `floorplan` | OK | Optional: a 3D render on a laptop |
| Day 0 Sign & finance | Designed quote card (HTML/CSS) | OK | Keep |
| Day 1–29 The makeover | `journey-site.webp`, an AI timber-and-brick crop of `story-site` | American-style timber framing | A real in-progress site photo: carpentry install, wiring, local crew |
| Day 30 Keys | `room-bedroom` | Has a fireplace | A finished handover photo |

## 6. About page

- **Where:** `about.html`.
- **Hero:** uses `theme-skyline` (a theme cover reused) because the original team photo (`story-team`) looked like a generic Western tech office. **Needed:** a real team or studio photo.
- **Timeline:**
  - **2014** uses `story-studio`. Needs a real early-studio photo.
  - **2017 "Bringing the build in-house"** uses `story-site` (AI, American timber framing, flagged by reviewers). Needs a real Kemas crew on a Malaysian site.
  - **2021** and **Today** reuse theme covers (`theme-softarc`, `theme-emerald`). Needs real project photos from those years.
- **Optional:** a photo of the Petaling Jaya experience centre (finish samples wall).

## 7. Fireplaces and non-Malaysian settings in theme photos

Reviewers flagged fireplaces as implausible in tropical Malaysia. Copy has already been adjusted ("Ivory Hearth" became "Ivory Arch"; "fireside" and "fireplace" wording removed), but the photos still show:

- **Fireplaces:**
  - `theme-emerald` (fireplace in the timber wall)
  - `theme-linen`
  - `theme-ember` (fireplace and log pile)
  - `theme-skyline` (stacked-stone fireplace)
  - `theme-softarc` (fireplace in the media wall)
  - `room-living`
  - `room-bedroom`
- **Needed:** replacement covers without fireplaces, re-shot or re-rendered in local-looking units (aircon, grilles, tropical light).
- **Keep:** the same theme look and the same `img` names, so no code changes are needed.

## 8. Image reuse on the homepage

Because the photo set is small, the same images repeat:

- **Hero:** the hero switcher previews 4 theme covers (emerald, linen, ember, soft-arc), and all of them also appear in the theme grid below.
- **"I'm moving in" tab:** uses `room-living`, which is also the Ivory Arch cover in the catalogue.
- **"I'm renting it out" tab:** uses `theme-softarc`, which is also in the theme grid.
- **Needed:** two lifestyle photos for the paths section, one of an owner-occupier family home and one of a tenant-ready rental unit (ideally a photo from a real rental listing).

## 9. Resolution

- **Problem:** sources are 1024×1024. They are displayed up to about 1160px wide on the detail hero (`.dt-hero__img`) and the About hero, so they look soft on retina screens.
- **Needed:** at least 2000px versions of every cover photo. Wide heroes also need landscape crops (21:9 at ≥2400px wide).

## 10. People and brand imagery

- **Review avatars:** `index.html` `#reviews` shows coloured circles with initials. **Needed:** customer or project photos per review (with consent), or at least a photo of each project.
- **FAQ designer card:** "Nadia Azman" is shown as initials. **Needed:** a real designer headshot.
- **Logo:** the brand mark is drawn in CSS (`.brand__mark`, an arch) and `assets/img/favicon.svg` is a placeholder. **Needed:** the real logo as SVG, plus favicon and app icons.
- **Social share image:** no `og:image` or Twitter card exists. **Needed:** a 1200×630 share image, plus `<meta property="og:*">` tags on every page.

## 11. Optional imagery that would help

- **Kemas Care and Kemas Club cards** (`#care`): text only. A small photo or illustration each would help.
- **Theme catalogue CTA band** (`designs.html`): uses 3 stacked theme thumbnails. Fine as is, but could use a designer photo.
- **Experience centre or showroom photo:** for the contact section (`#contact`).

---

### Cleaning up old assets

- **Unused now, safe to delete:** `story-team.webp` and `story-team-sm.webp` are no longer referenced anywhere.
- **Delete once replaced:**
  - `story-site*.webp` is used by the About 2017 timeline; `journey-site.webp` is a crop of it.
  - `story-studio*.webp` is used by About 2014 and journey step 1.
  - The `theme-*-d1..d3.webp` and `room-*-d1..d3.webp` crops are used by the detail strip and finish specs.
