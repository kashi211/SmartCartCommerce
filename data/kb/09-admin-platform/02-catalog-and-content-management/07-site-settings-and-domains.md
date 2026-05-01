# Site Settings, Domains & Checkout Configuration

**Document type:** Brand-facing reference
**Owner:** Saket Panwar
**Last reviewed:** 09 February 2026

---

## What this covers

Brand-page URL configuration (custom domain or subdomain), DNS records, security certificates, and the brand-side surface of checkout configuration. Most of this is platform-managed. The few things brands configure live here.

## Domain Names

Most brands operate at `brandname.smartcartcommerce.com`. A meaningful subset of brands use a custom domain (e.g., `shop.brandname.com`) that points to their SmartCartCommerce-hosted brand page. This is supported.

### Configuring a custom domain

*Site → Domains → Add Custom Domain.*

1. Enter the domain you want to use.
2. We display a CNAME or A record set for you to add to your DNS provider.
3. Add the record at your DNS provider.
4. Click *Verify*. We check propagation; this can take a few minutes to a few hours depending on TTL.
5. Once verified, we provision a Let's Encrypt SSL certificate automatically. Provisioning typically completes within 30 minutes of verification.
6. We enable the domain. Your custom domain serves your brand page over HTTPS.

We do not support apex domain redirects via our tooling; configure those at your registrar (most registrars do this in one click).

### Multiple domains

You can attach multiple domains to one brand. One is *primary* (canonical); others 301-redirect to the primary. Useful for brand-name variants, .com vs .co.uk, common typos.

### Removing a domain

Removing a domain takes effect within 5 minutes. The DNS record on your side remains; we just stop responding to traffic on the removed domain.

## DNS Records

We do not host DNS for brand custom domains; you manage DNS at your registrar. We do show the records you need to set on the *Domains* page, with copy-to-clipboard buttons and verification checks.

Typical records for a custom domain on SmartCartCommerce:

- `CNAME shop.brandname.com → brand-yourname.smartcartcommerce.com.`
- `TXT _scc-verify.brandname.com → <verification token>`

That's usually it. Apex (`brandname.com → SmartCartCommerce`) requires an `ALIAS` or `ANAME` record, which most modern DNS hosts support.

## Security Certificates

Managed automatically. We use Let's Encrypt; certificates renew 30 days before expiry. Brands cannot install custom certificates (we manage the entire chain).

Brands using EV certificates from a previous platform sometimes ask. We don't support EV; modern browsers no longer surface EV indication, and the operational cost isn't justified. Domain Validation certificates work fine.

## HTTPS Migration

For brands moving from a legacy custom domain that previously served HTTP-only content:

- Migration is HTTPS-by-default on SmartCartCommerce. There is no opt-out.
- We honor 301 redirects from the old HTTP URLs to HTTPS automatically.
- For SEO continuity, re-verify the domain in Google Search Console after migration. We provide a one-page guide at *Domains → Migration Guide*.
- The previous certificate is irrelevant; we provision fresh.

## Core Display Options

A small set of brand-page settings:

| Setting | Default | Notes |
|---|---|---|
| Show "Brands" link in marketplace nav | On | Off hides your brand from the directory; you remain searchable |
| Show maker name on product pages | On | Off hides; on shows alongside the brand |
| Show country of origin badge | On | Off hides; on shows on cards |
| Show edition number on limited pieces | On | Off hides; on shows "1 of 50" style |
| Show review count summary | On | Off hides aggregate star count |

Default-on for almost everything; we believe customers benefit from this information. The toggles exist for edge cases.

## Catalog Display — Category, Options, Product

Three sub-panels with display preferences:

**Category display** — How your category pages render. Card density (compact, standard, generous), image aspect ratio (square, 4:5, mixed), filter sidebar position (left, top, off-on-mobile-only).

**Options display** — How product options (size, color, material) render. As dropdowns, swatches, or radio buttons. Default is swatches for color and dropdowns for size; we recommend you don't change.

**Product display** — Product page tweaks: zoom (default on), 360° rotation (off; only available with specific image asset workflow), full-screen gallery (on).

## Checkout Options

Largely platform-managed; brands have a few hooks:

| Setting | Editable? | Notes |
|---|---|---|
| Gift message option | Yes | On / Off |
| Gift message length | Yes | Default 200 characters |
| Custom packaging note | Yes | Free-text shown in your fulfillment dashboard |
| Order acceptance window | No | Platform; orders accepted instantly |
| Currency selection | No | Customer chooses based on shipping country |
| Payment methods | No | Platform-managed; see *Payment Methods & Billing* |
| Tax display | No | Inclusive vs exclusive set by destination market |

### Checkout Security

Reflects platform-level decisions:

- 3DS / SCA enforcement: per-transaction risk-based.
- Address verification (AVS) required for cards.
- CVV required.
- IP and device fingerprinting for fraud scoring.

You see a read-only summary of these settings; brands cannot disable them.

## Site Search

The marketplace search is platform-managed (see *06-product-features/06-search-and-discovery.md*). Brand-page internal search is limited to your products; you can configure synonyms (e.g., "tee" = "t-shirt") at *Site Search → Synonyms*.

Suggested search terms — what appears in the search-as-you-type — is auto-generated from your top SKUs and queries; you can pin or hide specific suggestions.

## SLI Export

For brands using SLI Systems for site search analytics, we provide an export feed at *Site → SLI Export*. Three sub-feeds: categories, products, and images. The feed runs hourly and is consumable via signed URL.

Most brands don't need this; SLI is a niche integration.

## Things you should configure on day one

Walking through what onboarding teams typically set:

1. Brand-page hero image and copy.
2. Custom domain (if using one) and verification.
3. Email signature for templates.
4. Display options (most defaults are fine; review and confirm).
5. Site Search synonyms specific to your category vocabulary.

The rest is rarely touched after onboarding.
