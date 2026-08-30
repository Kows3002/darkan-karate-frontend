# Final SEO Report

Audit date: 30 August 2026  
Website: `https://darkankarate.in`  
Test target: optimized local Next.js production build, mobile Lighthouse profile  
Deployment check: live Hostinger production responses

## Executive result

The current project build is technically strong for SEO, accessibility, and browser best practices. Its measured Lighthouse SEO score is **100/100**. Performance is the main lab-score weakness at **77/100**, driven by LCP and main-thread blocking. The most urgent issue, however, is not source code: the live website was serving an older build containing a retired placeholder domain.

The project should not receive final production SEO sign-off until the current build is deployed and the CDN cache is purged.

## Scores

| Category | Score | Status |
| --- | ---: | --- |
| SEO | **100/100** | Pass in the current production build |
| Performance | **77/100** | Needs improvement |
| Accessibility | **100/100** | Pass |
| Best Practices | **100/100** | Pass |

These are measured Lighthouse mobile lab scores for the optimized local production build, not estimates. Scores can vary between runs and do not replace Chrome User Experience Report field data.

### Performance measurements

| Metric | Result | Assessment |
| --- | ---: | --- |
| First Contentful Paint | 2.1 s | Moderate |
| Largest Contentful Paint | 3.5 s | Needs improvement |
| Speed Index | 4.5 s | Needs improvement |
| Total Blocking Time | 390 ms | Needs improvement |
| Cumulative Layout Shift | 0 | Excellent |

Lighthouse does not provide a real field INP value during a single lab run. Total Blocking Time is the available lab responsiveness proxy. Search Console Core Web Vitals should be used for real-user LCP, INP, and CLS once enough traffic data exists.

## Indexability status

**Status: Indexable, with critical production discovery errors.**

- All six public pages return successful responses and are not blocked by `noindex`.
- The optimized project build passes Lighthouse's crawlability, HTTP status, title, meta description, canonical, and robots checks.
- The custom 404 correctly uses `noindex` in the project build.
- The live pages currently omit canonical link tags because production is running an older build.
- Google can crawl the site, but the outdated live sitemap and metadata can cause incorrect discovery, canonicalisation, and social preview signals.

Public indexable URLs:

- `https://darkankarate.in/`
- `https://darkankarate.in/about`
- `https://darkankarate.in/dojos`
- `https://darkankarate.in/events`
- `https://darkankarate.in/gallery`
- `https://darkankarate.in/contact`

## Structured data status

**Project build: Pass. Live deployment: Fail.**

The project implements:

- Organization
- WebSite
- BreadcrumbList
- Service
- SportsActivityLocation for dojo locations
- ContactPage

The source generates absolute URLs from `https://darkankarate.in` and includes the real business email and phone details. The live deployment still exposes JSON-LD containing:

- A retired placeholder website origin
- A retired placeholder email address
- A placeholder telephone number

Deploy the current build before requesting indexing. After deployment, validate representative pages with Google's Rich Results Test and Schema.org Validator.

## Sitemap status

**Project build: Pass. Live deployment: Fail.**

Expected sitemap:

`https://darkankarate.in/sitemap.xml`

The repository dynamically generates all six canonical production URLs. The previously audited live sitemap returned `200`, but its `<loc>` entries used a retired placeholder origin. Do not submit the sitemap in Search Console until the corrected build has been deployed and verified.

## Robots status

**Project build: Pass. Live deployment: Fail.**

The repository's `public/robots.txt`:

- Allows public crawling.
- Blocks the unnecessary `/api/` route.
- Advertises `https://darkankarate.in/sitemap.xml`.

The previously audited live robots file advertised the retired placeholder sitemap origin, so it must be replaced through deployment.

## Metadata and canonical status

**Project build: Pass. Live deployment: Fail.**

Every project page has unique:

- Title
- Meta description
- Canonical URL
- `index,follow` directive
- Open Graph title, description, URL, and image
- Twitter Card metadata

The live deployment still lacks canonical link tags and publishes placeholder-domain Open Graph and Twitter image URLs. This confirms that production does not match the audited repository.

## Passed technical checks

- Optimized production build compiles successfully.
- Lighthouse SEO, Accessibility, and Best Practices score 100.
- Correct viewport and responsive breakpoints.
- Responsive WebP images with original fallbacks.
- Explicit image dimensions prevent layout shift.
- CLS measured at zero.
- Semantic headings and accessible navigation.
- Accessible form labels, focus states, buttons, and gallery controls.
- Internal public links resolve successfully.
- Permanent redirects cover plausible legacy aliases.
- Custom noindex 404 exists in the repository.
- HTTPS works and HTTP redirects to HTTPS.
- Production CDN supports Brotli compression.
- Long-lived image caching is configured.

## Remaining issues

### Critical

1. The latest repository build is not deployed.
2. Live robots.txt references the placeholder domain.
3. Live sitemap URLs use the placeholder domain.
4. Live structured data contains placeholder URL, email, and phone values.
5. Live pages lack the canonical tags present in the project.
6. Live Open Graph and Twitter image URLs use the placeholder domain.

### High priority

1. Mobile LCP is 3.5 seconds; target 2.5 seconds or less.
2. Total Blocking Time is 390 ms; reduce client-side work and hydration where practical.
3. Speed Index is 4.5 seconds and FCP is 2.1 seconds.
4. No `app/error.tsx` or `app/global-error.tsx` exists for branded 500-level recovery.

### Medium priority

1. Validate the deployed JSON-LD with Google Rich Results Test.
2. Submit the corrected sitemap in Google Search Console.
3. Inspect and request indexing for the six canonical pages.
4. Monitor Page Indexing, Core Web Vitals, HTTPS, manual actions, and security reports.
5. Confirm the custom 404 and WebP favicon are live after deployment.

### Ongoing content and authority work

1. Add detailed, genuinely useful service content for karate and kobudo programmes.
2. Publish location-specific information for each dojo without duplicating text.
3. Keep events, grading results, instructor achievements, and gallery captions current.
4. Build consistent local citations and profiles using the exact academy name, phone, email, and dojo locations.
5. Earn relevant links from affiliated karate organisations, schools, event organisers, and local community sites.
6. Encourage authentic reviews on the academy's verified Google Business Profile where applicable.

## Ranking improvement priority

### Priority 1 — Correct production signals

Deploy the current repository, purge Hostinger/CDN caches, and verify that no retired placeholder references remain. This is the highest-impact action because Google must see the correct sitemap, canonicals, metadata, and business schema before indexing requests are useful.

### Priority 2 — Complete Search Console onboarding

Verify the Domain property through DNS, submit `sitemap.xml`, inspect all six canonical URLs, and request indexing only after the corrected deployment is live.

### Priority 3 — Improve LCP and responsiveness

Profile the homepage hero and client-side header/gallery code. Prioritise the actual LCP asset, reduce nonessential JavaScript execution, and retest on a production-like mobile connection. Preserve the zero-CLS result.

### Priority 4 — Strengthen local relevance

Create useful dojo-specific sections with address detail, schedules, instructor information, transport/landmark context, FAQs, and consistent local business information. Avoid thin doorway pages or repeated copy.

### Priority 5 — Build authority and freshness

Publish real academy updates and earn relevant third-party mentions. Technical SEO enables ranking, but local relevance, trust, content quality, links, and user engagement determine competitive improvement over time.

### Priority 6 — Monitor field results

Review Search Console weekly after indexing. Use the Page Indexing report for exclusions and the Core Web Vitals report for real-user LCP, INP, and CLS. Field data normally takes time and adequate traffic to appear.

## Final sign-off criteria

The project is ready for SEO sign-off when all of the following are true:

- The live source contains no placeholder domain or contact details.
- The live sitemap contains only `https://darkankarate.in` URLs.
- The live robots file advertises the correct sitemap.
- Every live page emits its self-referencing canonical.
- Live JSON-LD passes validation with real business data.
- The branded 404 is deployed.
- Search Console accepts the sitemap and reports the key pages as indexable.
- Mobile performance is retested after deployment, with LCP moving toward 2.5 seconds or less.

## Audit artifacts and limitations

- Lighthouse raw output: `lighthouse-final.json`
- Production readiness detail: `PRODUCTION_CHECKLIST.md`
- Technical SEO audit: `SEO_AUDIT.md`
- Redirect audit: `REDIRECT_REPORT.md`
- Lighthouse implementation record: `LIGHTHOUSE_FIXES.md`

The Lighthouse scores describe the current local optimized build. The live-status sections describe production responses observed on the audit date. Search Console field reports and indexing decisions are controlled by Google and cannot be guaranteed by a local audit.
