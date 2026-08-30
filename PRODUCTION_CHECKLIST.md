# Production Readiness Checklist

Audit date: 30 August 2026  
Production URL: `https://darkankarate.in`  
Scope: current repository plus live Hostinger deployment

## Result

**Not ready for final SEO sign-off.** The current repository contains most required SEO improvements, but the live site is an older deployment that still publishes placeholder-domain data. A dedicated application error boundary is also missing from the repository.

| Check | Result | Evidence |
| --- | --- | --- |
| HTTPS readiness | **PASS** | HTTPS returns `200`. HTTP permanently redirects to `https://darkankarate.in/` with `301`. The live server also sends `Content-Security-Policy: upgrade-insecure-requests`. |
| `robots.txt` | **FAIL** | The repository file is correct and blocks only `/api/`, but the audited live file advertised a retired placeholder sitemap origin. |
| `sitemap.xml` | **FAIL** | The repository generates six correct `darkankarate.in` URLs. The audited live sitemap returned `200` but every `<loc>` still used a retired placeholder origin. |
| Canonical URLs | **FAIL** | Every repository page uses `alternates.canonical`, but canonical link tags are absent from the live pages checked. |
| Metadata | **FAIL** | The repository has unique titles, descriptions, robots, Open Graph, and Twitter metadata. The live deployment still uses placeholder-domain OG/Twitter images; some live titles exceed 60 characters and some descriptions fall outside 140–160 characters. |
| Structured data | **FAIL** | The repository implements Organization, WebSite, BreadcrumbList, Service, SportsActivityLocation, and ContactPage JSON-LD. The audited live schema still contained a retired placeholder origin, email address, and phone number. |
| Favicon | **PASS** | The live PNG favicon and Apple touch icon return `200`. The repository also declares icon metadata and includes both original and WebP logo assets. |
| 404 page | **FAIL** | Unknown live URLs correctly return HTTP `404` and `noindex`, but the deployed site renders Next.js's generic 404. The repository contains a branded, accessible `app/not-found.tsx`, so deployment should resolve this failure. |
| 500 error handling | **FAIL** | No `app/error.tsx` or `app/global-error.tsx` error boundary exists. Unexpected rendering failures therefore use framework-level production handling without a branded recovery path. |
| Compression readiness | **PASS** | The production CDN negotiates Brotli (`Content-Encoding: br`) and sends `Vary: Accept-Encoding`. Next.js production output is compression-ready. |
| Cache headers | **PASS** | Live HTML is CDN cached, missing pages use private/no-store behavior, and the live favicon has a one-year public cache. The repository explicitly gives `/images/:path*` `public, max-age=31536000, immutable`. |

## Repository verification

- `npm run build` passes compilation, linting, type checking, page-data collection, and static generation.
- Public routes generated: `/`, `/about`, `/dojos`, `/events`, `/gallery`, `/contact`, `/sitemap.xml`, and the custom `/_not-found` output.
- `data/site.ts` uses the canonical origin `https://darkankarate.in`.
- `data/metadata.ts` generates canonical, robots, Open Graph, and Twitter metadata consistently.
- `data/structuredData.ts` generates absolute production URLs from the canonical site origin.
- `public/robots.txt` points to `https://darkankarate.in/sitemap.xml` and prevents crawling `/api/`.

## Required before sign-off

1. Deploy the current repository build to replace the stale production version.
2. Add `app/error.tsx` and preferably `app/global-error.tsx` with a safe retry or homepage recovery action.
3. Purge the Hostinger/CDN cache after deployment.
4. Recheck the live robots file, sitemap URLs, canonical tags, OG/Twitter image URLs, JSON-LD contact data, WebP favicon response, and branded 404 page.
5. Trigger a controlled server-side failure in staging—not production—to verify the 500 error boundary and ensure no stack trace or sensitive detail is exposed.

## Live response observations

- `https://darkankarate.in/`: `200 OK`
- `http://darkankarate.in/`: `301` to HTTPS
- `/robots.txt`: `200`, but wrong sitemap host
- `/sitemap.xml`: `200`, but wrong URL host
- Deliberately unknown path: `404`, `Cache-Control: private, no-cache, no-store`, `robots: noindex`
- PNG favicon: `200`, `Cache-Control: max-age=31536000, public`
- HTML with `Accept-Encoding: gzip, br`: `200`, `Content-Encoding: br`

## Files reviewed

- `next.config.ts`
- `app/layout.tsx`
- `app/not-found.tsx`
- `app/sitemap.ts`
- `public/robots.txt`
- `data/site.ts`
- `data/metadata.ts`
- `data/structuredData.ts`
- All page-level metadata and JSON-LD integrations under `app/`

No production configuration was changed during this audit. Only this checklist was created.
