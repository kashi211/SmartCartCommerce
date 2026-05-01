# SEO & Site Optimization

**Document type:** Brand-facing reference + platform standard
**Owner:** Saket Panwar
**Last reviewed:** 14 March 2026

---

## How SEO is split

Marketplace-level SEO (the SmartCartCommerce homepage, category landing pages, editorial pages) is platform-managed. Brand-page SEO (your brand page, your product pages, your editorial features) is collaboratively managed: defaults are sane and platform-set; you can override specific fields per page where helpful.

This document covers the brand-side surfaces.

## Meta Tags

*Marketing → SEO → Meta Tags.*

For each customer-facing brand page (brand homepage, category pages, product pages, profile page), you can review and override:

- **Meta title** — 50–60 characters recommended. Defaults to a templated version of the page title plus brand name.
- **Meta description** — 140–160 characters. Defaults to the first paragraph of the page's primary description.
- **Open Graph image** — for social sharing. Defaults to the page's primary image; can be overridden per page.
- **Open Graph title and description** — defaults to meta title/description; can be different.
- **Twitter card image** — same pattern.
- **Canonical URL** — set automatically; only edit if you know what you're doing.

We do not allow keyword-stuffed titles ("Best premium luxury linen tunic 2026 sale") on any brand page. Editorial reviews any custom meta title that violates the principle and reverts.

## Gateway Pages

Gateway pages are dedicated landing pages for specific traffic sources or campaigns — typically a curated subset of products with custom copy and a custom hero. Brands use them for collaborations, holiday capsules, press partnerships.

*Marketing → Gateway Pages.*

Each gateway page has:

- A vanity URL slug.
- A hero image and headline.
- A short editorial paragraph (drafted by you; reviewed by editorial).
- A curated product list.
- Optional date window (auto-publish, auto-unpublish).
- SEO meta as above.

Gateway pages count toward your SEO sitemap automatically. They can be set to *noindex* if they're for a private partner.

## Gateway Page Tracking

Each gateway page has its own tracking identifier; visits and conversion are reported separately in *Analytics → Gateway Page Performance*. Useful for understanding ROI on a press feature or a partner campaign.

## Google Sitemap

A platform-managed XML sitemap covering every customer-facing page. Includes:

- Marketplace pages.
- Brand pages.
- Product pages (excluding paused, archived, drafts).
- Editorial pieces.
- Gateway pages (unless noindex).

Sitemap is regenerated every 6 hours; submitted to Google and Bing via search-engine APIs.

You see your portion of the sitemap at *SEO → Sitemap*. You can preview which of your pages are indexed and which are noindex.

## URI Redirects

When a URL changes — a slug update, a SKU rename, a category restructure — we generate a 301 redirect automatically. You can also create custom redirects manually.

*Marketing → URI Redirects.*

### Add a redirect

Source path → Destination path. Type: 301 (permanent), 302 (temporary), or 410 (gone).

### Import URI Redirects

CSV of source / destination / type. Useful for bulk migrations from a previous platform — bring your old URL inventory and 301 to the new SmartCartCommerce equivalents.

### Export URI Redirects

CSV of all your redirects. Backup, audit, or external review.

### Limits and behavior

- 50,000 redirect entries per brand.
- Loops are detected and rejected (A → B → A).
- Source path is matched literally; we don't currently support regex source patterns.
- Redirect entries persist indefinitely; we don't garbage-collect.

## HubSpot Integration

For brands using HubSpot for CRM and marketing automation, we provide a native integration. *Marketing → HubSpot.*

### What syncs

- Customers who have given marketing consent → HubSpot contacts (with brand-tag).
- Order events (order placed, fulfilled, refunded) → HubSpot timeline.
- Form submissions from your generic forms (where you opt the form into the integration) → HubSpot contacts.
- Email engagement (opens, clicks) is NOT synced; HubSpot tracks its own.

We only sync customers who have explicitly opted in to your marketing communications. Customers who only purchased — without opting in — are NOT shared.

### Setup

OAuth-based; click *Connect HubSpot*, authenticate, select the HubSpot list to sync to, save. Initial sync takes 15–60 minutes depending on volume.

### Limits

- 1 HubSpot account per brand.
- 100,000 contacts per sync; brands above that should contact us for the high-volume integration path.

## What good SEO looks like on SmartCartCommerce

A few practical observations from years of working with brands:

- **Editorial copy outperforms keyword-stuffed copy.** Our search algorithm and Google's both reward writing that reads like writing. Our editorial reviews already enforce this; trust the process.
- **Real photography outperforms stock photography.** Customers and search engines both reward authenticity (alt text grounded in real product description, no model-on-white-cyclorama generic shots).
- **Originality at the product page matters.** Avoid duplicating manufacturer descriptions across your DTC site and your SmartCartCommerce listing — Google penalizes duplicate content. Our editorial team writes you a fresh version; use it.
- **Domain authority compounds.** Brands that have been on SmartCartCommerce for 3+ years rank substantially better in their category than brands new to us, just from accumulated marketplace authority.
- **Don't game the system.** We do not allow keyword stuffing, hidden text, doorway pages, or link-buying. Brands that try this get caught quickly (we audit) and risk delisting.
