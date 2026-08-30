# Technical SEO Audit

Audit date: 29 August 2026  
Scope: all indexable App Router pages (`/`, `/about`, `/dojos`, `/events`, `/gallery`, `/contact`), shared layout/components, `robots.txt`, `sitemap.xml`, internal links, external map links, and referenced images.

## Executive summary

- **Critical issues:** 3 active, 1 resolved
- **Warnings:** 8
- **Passed checks:** 12
- All six pages have a unique title, a meta description, exactly one H1, and meaningful image alternative text.
- No broken internal page links or missing referenced image files were found.
- The production origin was updated to `https://darkankarate.in` after the audit.

## 1. Critical issues

### 1.1 Resolved: placeholder production URL

**Affected pages:** all pages, `/robots.txt`, and `/sitemap.xml`  
**Files:** `data/site.ts`, `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts`, `app/dojos/page.tsx`

`site.url` was changed from the reserved placeholder domain to the verified production origin, `https://darkankarate.in`. Canonicals, structured-data URLs, sitemap entries, the robots sitemap location, and absolute social-image URLs now use the live host.

**Completed change:** the verified HTTPS production origin is configured, and all brand spelling is standardised as **Darkan**. Regenerate and submit the sitemap after deployment.

### 1.2 Canonical tags are missing from every indexable page

**Affected pages:** `/`, `/about`, `/dojos`, `/events`, `/gallery`, `/contact`  
**Files:** `app/layout.tsx` and/or each `app/**/page.tsx`

No `alternates.canonical` metadata is declared. Next.js does not create canonical links automatically. This leaves protocol, host, trailing-slash, and parameter variants without an explicit preferred URL.

**Required change:** add a self-referencing canonical for every page after the real production origin is known. Do not add canonicals using the current `.example` host.

### 1.3 Social metadata is duplicated and inaccurate on five pages

**Affected pages:** `/about`, `/dojos`, `/events`, `/gallery`, `/contact`  
**Files:** `app/layout.tsx` and each affected `app/**/page.tsx`

Page-specific `title` and `description` fields do not update the separately declared root `openGraph` object. Consequently, every route inherits the homepage Open Graph title and description. The Twitter metadata supplies only `card` and `images`, so it also lacks explicit page-specific `twitter:title` and `twitter:description` values (platform fallback behavior should not be relied upon).

**Required change:** provide route-specific Open Graph and Twitter title, description, URL, and image metadata, or generate them consistently with a helper. Use a social image with appropriate share-card dimensions rather than the square logo where possible.

### 1.4 Sitemap and structured data contain non-production contact/entity data

**Affected pages:** sitewide structured data, `/dojos`, `/sitemap.xml`, and the homepage call link  
**Files:** `data/site.ts`, `app/layout.tsx`, `app/dojos/page.tsx`, `app/sitemap.ts`, `app/page.tsx`

The earlier shared entity used a retired placeholder email and phone number, although the site URL was correct. Those values have since been replaced by the real contact details, eliminating the conflicting business identity signals.

**Required change:** replace placeholders with the verified academy email, phone, canonical URL, and full postal/locality information. Reuse the same source of truth in visible content and JSON-LD. For dojo schema, use each academy page URL as `url` and place the Google Maps share URL in `hasMap`; include a real address where available.

## 2. Warnings

### 2.1 Invalid nested `<main>` landmarks

**Affected pages:** `/gallery`, `/contact`  
**Files:** `app/layout.tsx`, `app/gallery/page.tsx`, `app/contact/page.tsx`

The root layout already wraps every page in `<main id="main">`. Gallery and Contact each render another `<main>` inside it. HTML permits only one non-hidden main landmark and `<main>` must not be nested. This is an HTML-validation and accessibility issue.

**Recommended change:** change the page-level `<main>` elements to `<div>` or `<section>` while retaining the existing classes; this does not require a visual change.

### 2.2 Heading hierarchy skips from H1/H2 to H3 in repeated cards

**Affected pages:** `/`, `/dojos`, `/events`  
**Files:** `app/page.tsx`, `app/dojos/page.tsx`, `components/EventList.tsx`

Several card groups use H3 headings after a section H2, which is valid. However, some H3 cards are only loosely associated with the preceding H2 because intermediate wrappers are generic `<div>` elements and some sections lack `aria-labelledby`. The Events ledger, for example, is a component of the “Gradings and tournament participation” section but is not programmatically tied to that heading.

**Recommended change:** preserve the visible H1 → H2 → H3 levels, add stable IDs to section headings, and connect containing sections with `aria-labelledby`. Do not promote repeated card titles merely for styling.

### 2.3 Footer H2 repeats the site name on every page

**Affected pages:** all pages  
**File:** `components/Footer.tsx`

The footer brand name is marked as H2 even though it does not introduce a substantive page section. It adds a boilerplate heading to every document and weakens each page’s heading outline.

**Recommended change:** render the visual brand line as a paragraph or non-heading element and keep the same CSS class.

### 2.4 Explicit robots meta directives are absent

**Affected pages:** all pages  
**File:** `app/layout.tsx`

There is no page-level `robots` metadata. Search engines normally default to `index, follow`, so this is not a blocking error, and the generated `/robots.txt` allows crawling. Explicit directives nevertheless make intent clearer and allow preview controls such as `max-image-preview: large`.

**Recommended change:** add global index/follow robots metadata, with page-specific `noindex` only for future non-public pages. Keep the existing `app/robots.ts` crawler policy.

### 2.5 Gallery `<time datetime>` values are not machine-readable dates

**Affected page:** `/gallery`  
**Files:** `components/GalleryGrid.tsx`, `data/gallery.ts`

`dateTime` receives values such as `12 July 2026`. HTML requires a valid machine-readable date such as `2026-07-12`. This is an HTML-validation and semantic-data issue.

**Recommended change:** store a separate ISO date and display label, or convert the data to ISO for `dateTime` while retaining the current visible text.

### 2.6 Duplicate/ambiguous dojo content

**Affected pages:** `/`, `/dojos`  
**File:** `data/dojos.ts`

Two records have the identical public name “Ayyapanthangal Dojo,” the same area, schedule, programmes, and ages; only instructor and map URL differ. To users and search engines these look duplicated or contradictory. The first record also uses slug `thiruvenkadu` while its visible area is `Thiruverkadu`.

**Recommended change:** give the two Ayyapanthangal locations distinct venue names/addresses, confirm whether the identical schedules are correct, and correct the slug spelling before it is used in future public URLs. Do not create separate thin pages until each location has unique, useful information.

### 2.7 Brand and contact details are inconsistent

**Affected pages:** all pages, especially `/contact`  
**Files:** `data/site.ts`, `app/layout.tsx`, `components/Footer.tsx`, `app/contact/page.tsx`, image filenames

Visible branding, asset names, metadata, structured data, and contact details now consistently use “Darkan.” This removes the former entity-naming inconsistency.

**Recommended change:** confirm the official spelling and use it in metadata, structured data, alt text, email/domain, and visible copy. Image filenames may remain if redirects/caching make renaming risky, but their public URLs should be stable.

### 2.8 External links could not be proven durable from repository analysis

**Affected pages:** `/`, `/dojos`  
**File:** `data/dojos.ts`

The four Google Maps destinations use `share.google` short links. They are syntactically valid HTTPS links, but short links can expire, redirect, or hide the final destination; repository analysis cannot prove their current response status. Internal links are not affected.

**Recommended change:** verify all four links in a deployed crawl and prefer stable Google Maps place URLs when available. Retain `rel="noreferrer"`/`noopener` behavior for new tabs.

## 3. Passed checks

### Titles and descriptions

- All six indexable pages declare a title; rendered title sources are unique.
- No duplicate HTML title declarations were found in source metadata.
- All six pages have non-empty meta-description sources.
- Title lengths are generally descriptive. The template adds ` | Darkan Academy` to subpages, so check final pixel width after deployment, particularly `/about` and `/dojos`.

### Headings

- Every page has exactly one H1.
- No H4–H6 headings are used, and no direct H1 → H3 skip was found in primary page content.
- Major content sections generally use H2 and repeated cards use H3.

### Images and favicon

- Every content-bearing `next/image` instance has a non-empty, descriptive `alt` value.
- The three phoenix overlay images correctly use empty alt text and `aria-hidden="true"` because they are decorative parts of the labelled emblem.
- Every locally referenced image file exists under `public/`.
- A favicon and Apple-touch icon are configured through Next.js metadata, and the referenced PNG exists. A conventional `.ico` is optional, not missing for this implementation.

### Links, URLs, and crawlability

- All internal navigation destinations resolve to an existing App Router page: `/`, `/about`, `/dojos`, `/events`, `/gallery`, and `/contact`.
- Fragment links `#main` and `/#faculty-title` target existing IDs.
- No orphan public page was found; every page is linked from global navigation/footer and included in the sitemap source.
- Public page paths are short, lowercase, readable, and free of query-string routing.
- `app/robots.ts` allows crawling and references a sitemap.
- No page-level duplicate-content pair was found; each page has a distinct purpose and primary copy.

### Code/validation checks

- Next.js compilation completed successfully during the audit.
- ESLint was launched and reported no immediate source errors before the final audit was written.
- JSX uses framework components that escape content safely, document language is set to `en`, and the layout provides a skip link and one top-level main landmark.

## 4. Exact files that need changes

| Priority | File | Required SEO change |
|---|---|---|
| Critical | `data/site.ts` | Replace placeholder URL/email/phone; normalize official brand spelling. |
| Critical | `app/layout.tsx` | Add canonical/robots strategy; correct shared OG/Twitter strategy and verified Organization data. |
| Critical | `app/sitemap.ts` | Emit URLs on the verified production origin; preferably use stable last-modified values rather than changing every URL on every build. |
| Critical | `app/robots.ts` | Emit the production sitemap URL after the origin is corrected. |
| Critical | `app/page.tsx` | Fix the placeholder call link through corrected shared data; add homepage canonical/social URL metadata if not generated centrally. |
| Critical | `app/about/page.tsx` | Add canonical plus page-specific Open Graph/Twitter metadata. |
| Critical | `app/dojos/page.tsx` | Add canonical/social metadata; improve LocalBusiness/SportsActivityLocation URL/address/map schema. |
| Critical | `app/events/page.tsx` | Add canonical plus page-specific Open Graph/Twitter metadata. |
| Critical | `app/gallery/page.tsx` | Add canonical/social metadata; replace nested `<main>`. |
| Critical | `app/contact/page.tsx` | Add canonical/social metadata; replace nested `<main>`; source contact values consistently. |
| Warning | `components/GalleryGrid.tsx` | Supply ISO `dateTime` values. |
| Warning | `data/gallery.ts` | Store ISO dates separately from human-readable labels. |
| Warning | `data/dojos.ts` | Disambiguate duplicate dojo records, verify map links/schedules, and correct slug spelling. |
| Warning | `components/Footer.tsx` | Normalize brand spelling in alt text and change the decorative footer H2 to non-heading text. |
| Warning | `components/EventList.tsx` | Improve section/heading association if IDs are added to the Events page. |

## Audit limitations

This is a repository and local-build audit, not a live-domain crawl. HTTP status, redirect chains, TLS, final deployed HTML, Core Web Vitals, server headers, and the current destinations of third-party short links must be rechecked against the production URL after deployment. “Broken links” here means unresolved internal route/fragment references and missing local assets; the external Google Maps links require live verification.
