# Internal Link and Redirect Report

Audit date: 30 August 2026  
Production origin: `https://darkankarate.in`  
Verification target: local optimized Next.js production build

## Summary

The project was scanned across App Router pages, shared components, data files, CSS, generated HTML, image references, fragment links, the sitemap, and `robots.txt`. All current public navigation destinations return `200`, all referenced local image files exist, and an unknown URL correctly returns `404` with a useful recovery page.

## Issues fixed

### Broken dojo fragment URLs

The LocalBusiness structured data generated URLs such as `/dojos#thiruverkadu`, but dojo cards did not expose matching element IDs. Each dojo card now has an ID derived from its canonical slug, so those URLs resolve to real page sections.

### Misspelled Thiruverkadu slug

`thiruvenkadu` was inconsistent with the dojo's name and location, `Thiruverkadu`. The canonical slug is now `thiruverkadu`. The old path `/dojos/thiruvenkadu` permanently redirects to `/dojos#thiruverkadu` to protect any previously shared or indexed URL.

### Missing custom 404 recovery page

A project-specific not-found page now returns the correct `404` response, is marked `noindex, follow`, and provides links to the homepage and dojo directory. This prevents dead-end navigation without disguising missing URLs as successful pages.

## Permanent redirects added

These aliases use HTTP `308 Permanent Redirect`, preserving the request method and giving search engines a permanent canonical destination.

| Source | Destination | Reason |
| --- | --- | --- |
| `/about-us` | `/about` | Common legacy/marketing alias |
| `/dojo` | `/dojos` | Singular route alias |
| `/classes` | `/dojos` | Class-search intent maps to the location directory |
| `/event` | `/events` | Singular route alias |
| `/photos` | `/gallery` | Common gallery alias |
| `/contact-us` | `/contact` | Common legacy/marketing alias |
| `/enquiry` | `/contact` | Enquiry intent maps to the contact form |
| `/dojos/thiruvenkadu` | `/dojos#thiruverkadu` | Preserves the previously misspelled dojo slug |

Redirects are intentionally limited to plausible equivalents. Arbitrary unknown URLs continue to return a genuine `404`, avoiding soft-404 problems.

## Verification results

### Passed routes

The optimized production build returned `200` for:

- `/`
- `/about`
- `/dojos`
- `/events`
- `/gallery`
- `/contact`
- `/sitemap.xml`
- `/robots.txt`

### Passed rendered-link crawl

Every unique root-relative link emitted by the six public HTML pages returned `200`, including page routes, Next.js assets, the logo, and the homepage faculty fragment. The following fragments were explicitly checked and found in rendered HTML:

- `/#main`
- `/#faculty-title`
- `/dojos#thiruverkadu`

### Passed static asset checks

Every `/images/...` reference found in the application, component, and data sources maps to an existing file under `public/images`. Both WebP sources and original-image fallbacks were included in this check.

### Passed 404 behavior

`/definitely-missing-page` returned HTTP `404` and rendered the custom recovery content. It did not redirect or return a soft `200`.

### Passed build checks

`npm run build` completed successfully, including compilation, linting, type checking, static generation, and route generation.

## Exact files changed

- `next.config.ts` — added permanent redirects.
- `data/dojos.ts` — corrected the Thiruverkadu slug.
- `app/dojos/page.tsx` — added resolvable IDs to dojo cards.
- `app/not-found.tsx` — added the accessible, noindex custom 404 page.
- `REDIRECT_REPORT.md` — documented the audit, fixes, redirects, and verification.

## Deployment note

The checks above validate the repository's production build. After deployment, repeat the same HTTP checks against `https://darkankarate.in` so CDN, DNS, and hosting-platform redirect behavior are also covered.
