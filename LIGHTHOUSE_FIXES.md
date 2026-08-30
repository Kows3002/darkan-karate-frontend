# Lighthouse Optimization Report

Updated: 30 August 2026  
Target origin: `https://darkankarate.in`

## Goal

This project has been prepared for the following production Lighthouse targets:

- Performance: 95+
- Accessibility: 95+
- Best Practices: 100
- SEO: 100

Lighthouse scores depend on the deployed server, CDN, network throttling, device profile, third-party services and field data. The repository changes below remove the issues that can be addressed safely in application code without changing the visual design.

## Performance fixes

### Responsive WebP delivery

- Converted all 38 JPG, JPEG and PNG assets to WebP while retaining every original file as a browser fallback.
- Re-encoded the WebP set at high visual quality, reducing its combined size from **23.34 MiB to 7.29 MiB**, a **68.8% reduction**.
- Added `components/ResponsiveImage.tsx`, which emits WebP-first `<picture>` markup and responsive Next.js optimizer candidates.
- Browsers now select an appropriately sized image instead of downloading full 1920–3119px sources for cards and thumbnails.
- Original JPG, JPEG and PNG paths remain available for browsers without WebP support.

### LCP request priority

- The homepage emblem—the likely LCP image—uses `loading="eager"` and `fetchpriority="high"`.
- The three small phoenix animation layers and header logo load eagerly at normal priority, so they do not compete with the LCP resource.
- The About-page hero emblem receives high priority on that route.
- All below-the-fold content images remain lazy-loaded.
- Images use `decoding="async"`.

### CLS prevention

- Every rendered image has explicit intrinsic `width` and `height` attributes.
- Responsive/fill images are placed in containers with fixed dimensions or CSS aspect ratios.
- The site uses Arial, Helvetica, Georgia and Times New Roman system fonts, so no delayed web-font swap can move text.
- No font preload was added because there are no font files to preload; adding one would create a wasted request.

### Rendering and CSS

- Added `content-visibility: auto` and intrinsic-size containment to below-the-fold sections, reducing initial layout and paint work.
- Tailwind continues to generate only referenced utilities and Next.js minifies the production stylesheet.
- Removed unused legacy homepage hero selectors.
- The final stylesheet is **99.4 KiB raw, 18.7 KiB gzip and 15.9 KiB Brotli**.
- Existing reduced-motion rules remain in place for visitors who request less animation.

### JavaScript and interaction cost

- Removed the hero logo's client-side `IntersectionObserver`, state and hydration. Its visual animation is now CSS-only.
- Enabled optimized package imports for `lucide-react`, preventing broad icon-library imports.
- Next.js route splitting keeps the contact form and full gallery interaction code on their relevant routes.
- The production route payload is 102 KiB shared first-load JS; page totals range from 102–109 KiB.
- No third-party analytics, advertising or font scripts block the main thread.

### Caching

- Added `Cache-Control: public, max-age=31536000, immutable` for versioned image assets.
- Next.js optimized-image responses negotiate WebP through the `Accept` header and return responsive variants.

## Accessibility fixes

- Every image has descriptive alt text or an intentional empty alt for decorative artwork.
- Decorative layered logos no longer cause duplicate screen-reader announcements.
- Every public page has exactly one H1 and one `<main>` landmark.
- Removed nested `<main>` elements from Contact and Gallery.
- Added semantic footer navigation and headings.
- Added a reusable `.sr-only` utility for accessible names that do not alter layout.
- Added explicit button types, accessible button names and icon hiding where appropriate.
- Added a keyboard-operable gallery dialog with:
  - focus placement on open;
  - Tab and Shift+Tab focus containment;
  - Escape dismissal;
  - Left/Right arrow navigation;
  - focus restoration to the originating thumbnail;
  - background scroll locking;
  - a specific accessible dialog title.
- Added mobile-menu focus placement, focus containment, Escape dismissal and toggle-focus restoration.
- Added explicit contact-form label associations, `required`, `aria-invalid`, `aria-describedby`, error alerts and a polite status region.
- Invalid form submission moves focus to the first field needing correction.
- The spam honeypot is removed from the accessibility tree and keyboard order.
- Added strong focus-visible indicators to links, buttons and fields.
- Darkened small gold text from a 3.74:1 contrast ratio to approximately 4.91:1 on the paper background.
- Increased dim footer text to approximately 5.9:1 contrast.
- The primary red focus indicator has approximately 6.94:1 contrast on the paper background.

## Best Practices fixes

- Added `X-Content-Type-Options: nosniff`.
- Added `Referrer-Policy: strict-origin-when-cross-origin`.
- Added a restrictive `Permissions-Policy` for unused camera, microphone and geolocation capabilities.
- Added `X-Frame-Options: DENY` to prevent unwanted framing.
- External links opened in new tabs use `rel="noreferrer"`, which also protects `window.opener`.
- Images are served with correct content negotiation and stable dimensions.
- The production build has no TypeScript or ESLint errors or warnings.
- A strict Content Security Policy was intentionally not added blindly: Next.js emits framework scripts that require a nonce/hash-aware deployment policy. An incorrect CSP would break hydration and interactions and is not a safe optimization.
- Dependency upgrades were not forced because unreviewed major upgrades can introduce regressions. They should be handled separately with release-note review and regression testing.

## SEO fixes

- All six public pages have unique titles under 60 characters.
- All meta descriptions are unique and 140–150 characters.
- Every page has a self-referencing canonical URL on `https://darkankarate.in`.
- Every page declares `index, follow`.
- Every page has unique Open Graph and Twitter Card metadata.
- Added `Organization`, `WebSite`, `SportsActivityLocation`, `Service`, `BreadcrumbList` and `ContactPage` JSON-LD.
- Added `public/robots.txt`, allowing all crawlers while excluding `/api/` and linking the production sitemap.
- The sitemap contains every public route.
- All internal routes, fragments and referenced local assets resolve.
- Added `lang="en-IN"`, application name, site category, theme color and explicit viewport metadata.

## Security and SEO headers

The following headers are applied sitewide:

```text
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
X-Frame-Options: DENY
```

## Production verification completed

- `next build`: passed.
- TypeScript: passed.
- ESLint: passed with no errors or warnings.
- All six public pages returned HTTP 200 in the production server.
- `/robots.txt` and `/sitemap.xml` returned HTTP 200.
- Every page rendered a unique title, description and production canonical.
- No rendered image is missing an alt attribute.
- All pages have one H1 and one main landmark.
- No unnamed buttons or empty links were found in rendered markup.
- All contact-form controls have programmatically associated labels.
- Production homepage has one high-priority LCP image, four additional normal-priority eager images and lazy-loaded below-the-fold media.
- Responsive image optimization returned WebP successfully.
- Image caching and security headers were verified on the production server.

## Deployment checks required for final scores

After deploying the current build:

1. Run Lighthouse in an incognito Chrome profile against `https://darkankarate.in/` and each secondary route.
2. Run at least three mobile tests and use the median result; local Lighthouse runs naturally vary.
3. Confirm the host/CDN serves Brotli or gzip for HTML, CSS and JavaScript and preserves the configured cache headers.
4. Test live pages in Google Rich Results Test and submit `https://darkankarate.in/sitemap.xml` in Search Console.
5. Monitor real-user LCP, CLS and INP in Search Console after sufficient traffic is collected.
6. Add complete street addresses and postal codes when verified; these improve LocalBusiness structured-data quality but were not invented for this optimization.

No numeric Lighthouse score is hard-coded or guaranteed by this report. It documents verified code-level improvements and the remaining deployment-dependent checks needed to reach and maintain the target scores.
