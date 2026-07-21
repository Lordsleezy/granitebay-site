# SEO & Performance Report — Roseville Site

**Domain:** https://rosevillefencingca.com
**Date:** July 20, 2026

## Summary

Rebuilt Roseville from a Grass Valley generator scaffold into a suburban Placer County specialist site with **68 indexable routes** (56 content pages + 8 calculator pages + home/privacy/terms/success) via the shared static generator. Content is unique to Roseville — HOA-approval workflow, master-planned-community fence rules (Fiddyment Farm, WestPark, Stanford Ranch, Morgan Creek, Diamond Creek, Sun City Roseville), expansive clay soil, side-yard gate sag, sprinkler-overspray wood rot, and pool-fence compliance — replacing the prior agricultural/ranch/foothill framing.

## Recent changes

- Rewrote `src/templates/home.js`: wood contractors, repair, HOA approval, suburban replacements, side-yard gates, pool fencing, vinyl, decorative iron. Removed unverifiable "5,000+ projects" counter in favor of honest trust signals (licensed & insured, HOA-approval experience, Google Business Profile link).
- Replaced all `scripts/pages-data/*.mjs` content (`services`, `fence-types`, `gates`, `resources`, `faq`) with Roseville-specific copy; removed agricultural/ranch/rural angles.
- Replaced `nevada-county.mjs` + `cities.mjs` with a new `service-areas.mjs` covering Roseville plus Citrus Heights, Granite Bay, Lincoln, Loomis, and Antelope — each with distinct lot/soil/HOA framing to avoid content overlap with sibling network sites.
- Updated `layout.js` local business schema description and `og:image:alt` to Roseville.
- Rewrote `src/data/calculators.js` and `src/scripts/calculators.js`: removed foothill/slope/ranch/rock terrain factors and pine-forest maintenance notes, replaced with flat-lot/clay-soil/HOA-material factors and sprinkler-overspray/summer-heat maintenance guidance relevant to Roseville's climate and soil.
- Updated `build.mjs` legal copy and `package.json` name for `rosevillefencingca.com` / `roseville-site`.
- Added `netlify.toml`: `node build.mjs` build command, `dist` publish directory, 301 redirects from all `_legacy` paths (blog posts, `/locations/roseville`, `/services/wood-fence`, legal `.html` pages), immutable asset caching, no SPA catch-all.
- Adapted `scripts/verify.mjs` required-route list to Roseville's GSC-priority paths.

## Priority GSC pages

| Query intent | Route |
|--------------|-------|
| Roseville fence company / HOA fence installer | `/`, `/services/hoa-fence-installation/` |
| Fence installation | `/services/fence-installation/` |
| Fence repair | `/fence-repair/` |
| Fence replacement | `/services/fence-replacement/` |
| Wood fence contractors | `/wood-fencing/`, `/fence-types/redwood-fence/`, `/fence-types/cedar-fence/` |
| Vinyl fencing | `/vinyl-fencing/`, `/fence-types/privacy-fence/`, `/fence-types/hoa-fence/` |
| Pool fence compliance | `/fence-types/pool-fence/` |
| Decorative/ornamental iron | `/fence-types/ornamental-iron-fence/` |
| Gates / side-yard gate repair | `/gates/`, `/custom-gates/`, `/gates/wood-gates/`, `/gates/gate-repair/` |
| Temporary fence rental | `/temporary-fence-rental/` |
| Commercial fencing | `/commercial-fencing/` |
| Chain link | `/chain-link-fencing/` |
| Local area | `/service-areas/`, `/service-areas/roseville/` |
| Cost / buying research | `/resources/fence-cost-guide/`, `/resources/fence-buying-guide/`, `/resources/hoa-fence-rules/`, `/resources/wood-vs-vinyl/` |
| FAQ | `/faq/` |
| Quote conversion | `/calculators/fence-cost-calculator/`, `/#contact` |

## Content rules followed

- No fabricated stats or fake reviews — home page trust signals are license #1089233, insured, HOA-approval experience, and a real Google Business Profile link.
- One parent-network link to `https://twinriversfence.com/` (footer/site config), phone `(916) 906-2254` throughout.
- 40 years of experience claim carried from `site.js` (network-level claim, not fabricated per-site stat).
- Service-area pages differentiated from sibling network sites (Rocklin, Folsom, Elk Grove) by lot character, soil, and HOA density rather than duplicated boilerplate.

## Verification

```bash
npm run build && node scripts/verify.mjs
```

Result: **68 routes built**, 0 missing required routes, canonical/breadcrumb/FAQ/LocalBusiness schema present, calculator script wired on `/calculators/*` pages, home `<h1>Roseville Fence Company</h1>` with canonical pointing to `rosevillefencingca.com`.
