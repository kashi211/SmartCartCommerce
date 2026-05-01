# Traffic & Search Reports

**Document type:** Brand-facing reference
**Owner:** Saket Panwar
**Last reviewed:** 27 February 2026

---

## Visits

*Analytics → Reports → Visits.*

Customer traffic to your brand pages.

### Metrics

| Metric | Definition |
|---|---|
| Visitors | Unique people (deduplicated by browser fingerprint + signed-in identity) |
| Sessions | Distinct visit sessions; 30-min idle = new session |
| Pageviews | Total pages loaded |
| Pages per session | Pageviews / sessions |
| Avg. session duration | Median session duration in minutes |
| Bounce rate | Single-pageview sessions / total sessions |
| Conversion rate | Orders / sessions, by cohort |

### Segmentation

By page type (brand home, category, product, profile, journal article), by source, by device (mobile / desktop / tablet), by market, by signed-in / anonymous.

### What's not in here

Cross-marketplace browsing data (a customer's visits to other brands' pages on SmartCartCommerce) is not exposed at brand level. Privacy reasons — we don't share cross-brand customer behavior.

## Referrers

*Analytics → Reports → Referrers.*

Where visitors came from. Categories:

- **Direct** — customer typed your URL or used a bookmark.
- **Marketplace internal** — from another SmartCartCommerce page (homepage, category, editorial, search).
- **Organic search** — Google, Bing, others. Search engine and (where shared) the query.
- **Paid search** — Google Ads, Bing Ads. With campaign attribution.
- **Social** — Instagram, Pinterest, Facebook, X, others.
- **Email** — your campaigns, our newsletters, partner emails.
- **Affiliate** — tracked publisher links.
- **Other referrers** — specific external sites linking to you.

For each referrer category, the report shows visits, sessions, conversion rate, and revenue contribution.

## Search Terms

*Analytics → Reports → Search Terms.*

What customers searched for, in two surfaces:

**Brand-page search terms.** What customers searched for inside your brand page using the search bar. The most useful surface for understanding what customers expect to find on your page.

**Marketplace search terms (you-relevant).** Marketplace-level searches that resulted in clicks to your products. Note: this only shows queries with at least 5 sessions of click-through to your brand; below that threshold, the data is suppressed for noise.

Each term shows:

- Volume.
- Click-through rate.
- Zero-result rate (if customers searched and got nothing — a quality signal).
- Conversion to your products.

### Reading the report

A few observations:

- **High-volume zero-result terms** are gold. If many customers search for "linen jumpsuit" on your page and you don't have one, that's product feedback.
- **High-volume low-conversion terms** are usually a labeling mismatch. Customers search "blanket" but your products are listed as "throws." Synonym configuration (see *07-site-settings-and-domains.md*) helps.
- **Marketplace-level search terms** show customer intent at the discovery stage. If "ceramic vase Vermont" is a term that drives conversions to your brand, you might surface "Vermont" or "Hudson Valley" more prominently in your descriptions and copy.

## Bot Tracker

*Analytics → Reports → Bot Tracker.*

We separate bot traffic from human traffic in all our visit reporting. The Bot Tracker is the audit surface — what we identified as bots, with reasons.

Bot categories:

- **Search engine crawlers** — Googlebot, Bingbot, etc. Allowed.
- **AI scraper bots** — increasingly prevalent. Mostly allowed but throttled.
- **Aggregator bots** — price comparison crawlers. Allowed for partner aggregators; blocked otherwise.
- **Malicious bots** — scrapers attempting price scraping, content theft, account enumeration. Blocked.
- **Performance / uptime monitors** — yours or ours. Allowed and labeled.

Visits in your other reports exclude bots by default. The Bot Tracker is the only place you'll see them.

### Why it matters

Some platforms inflate visit counts by counting bot traffic as human. We don't. Your "10,000 unique visitors" is 10,000 humans, not 10,000 bots and 30 humans. We document this so you can trust the numbers.

The Bot Tracker also surfaces unusual patterns — a sudden surge in scraper activity targeting your prices, a coordinated bot signup attempt — so you can flag with your account lead.

## Performance Report

*Analytics → Reports → Performance.*

Page load times for your brand pages, broken down by page type and device.

P50, p75, p95 timings. Slow pages are flagged with the likely cause (large image, third-party script, slow API endpoint).

For most brands, this report is rarely actionable — the platform is fast enough end-to-end. Where it's useful: brands with very large image libraries who haven't optimized their primary images; brands using a slow analytics integration.

## Best Practices

Automated checks against platform standards. Each check produces a pass/fail/warn.

Checks include:

- All product pages have alt text on every image.
- All product pages have descriptions ≥ 120 words.
- All product pages have at least 3 supplementary images.
- All categories have a description.
- Brand profile is complete.
- No broken outbound links in editorial content.

Failures are not blocking; they are observations. Brands that maintain high pass rates tend to perform better on platform search and editorial selection.
