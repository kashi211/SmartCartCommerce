# Reports — Overview & Library

**Document type:** Brand-facing reference
**Owner:** Saket Panwar
**Last reviewed:** 06 March 2026

---

## How analytics works on SmartCartCommerce

The Admin Console exposes a library of reports — pre-built, queryable, exportable — covering the operational and revenue questions that come up most often. Power users can also pull data via the API for custom analysis.

We do not build dashboards on your behalf and we do not auto-generate "AI insights." The reports are clean inputs; the interpretation is yours. We have learned that auto-narrative dashboards mostly create false confidence.

*Analytics → Reports.*

## What's in the library

### Revenue & sales

- **Revenue** — total revenue by period.
- **Sales Rank** — your products ranked by units and by revenue.
- **Comparatives** — period-over-period comparisons.
- **Order Detail** — drill into specific orders.

Detailed coverage in *02-revenue-and-sales-reports.md*.

### Traffic & search

- **Visits** — unique visitors, sessions, pageviews.
- **Referrers** — where visits came from.
- **Search Terms** — what customers searched for on your brand page or in marketplace search where they clicked through to you.
- **Bot Tracker** — bot vs human traffic for honest visit counts.

Detailed coverage in *03-traffic-and-search-reports.md*.

### Customer & program

- **Catalog Requests** — printed catalog request volume (where applicable).
- **Incentive Programs** — affiliate, refer-a-friend, e-party performance for your brand.
- **Wishlist Products** — most-wished items in your catalog.
- **Tell a Friend** — performance of share-with-a-friend touchpoints.
- **Inventory Notifications** — notify-when-back signups, conversion rate.
- **Product Aging** — how long products sit at various stock levels.

Detailed coverage in *04-customer-and-program-reports.md*.

### Site optimization

- **Performance Report** — page load times for your brand pages.
- **Best Practices** — automated checks against platform standards (image sizes, alt-text completeness, description length).

### Benchmark Report

A unique surface that compares your performance to the platform median for your category. We surface only median, p25, p75 — never specific competitor data. Useful for sanity-checking your CSAT, return rate, average order value against the relevant peer set.

### Square Inch Analyzer

A specialized report for brands with strong category-page presence: how productive each "square inch" of your category page is. Useful for high-density brands deciding what to feature.

## Common patterns across reports

Every report supports:

- **Date range** with quick presets (today, yesterday, 7 days, 30 days, 90 days, year-to-date, custom).
- **Compare to** — same period last year, previous period, or a custom comparison range.
- **Segment** — by category, by product cohort, by customer cohort (Circle / non-Circle, repeat / first-time, market).
- **Export** — CSV, XLSX, JSON, or scheduled email.
- **Save view** — name a configuration; share with team.

## Refreshing data

Reports refresh on the following cadences:

- Real-time (≤ 5 minutes lag): orders, revenue, inventory.
- Hourly: visits, search terms, conversion.
- Daily: aggregated reports (sales rank, product aging, benchmark).
- Weekly: comparison and trend reports.

The freshness indicator is shown at the top of each report.

## Interpretation reminders

We have observed a few traps in interpreting reports. We surface the reminders inline on the relevant reports:

- **Compare to a relevant period.** Holiday-season month vs. non-holiday is misleading; year-over-year of the same month is the cleaner comparison.
- **Watch for cohort drift.** "Revenue from Circle members" varies with Circle population changes, not just per-member behavior.
- **Beware of small-sample noise.** A 30% week-over-week swing on a base of 12 orders is noise; on 1,200 orders it's a signal.
- **Read returns alongside revenue.** Net revenue (after returns) is the operating number; gross is a vanity number.

## Privacy and aggregation

Customer-level data in reports is anonymized at the brand level. You see counts and aggregates, not individual customer identity except for orders directly placed with your brand (where you obviously know the customer for fulfillment).

You cannot pull customer-level detail across all SmartCartCommerce purchases (you only see purchases within your brand). We don't share cross-brand customer behavior with brands; that would breach the trust customers place in the platform.

## Data export and the API

For analyses we don't surface in reports, the API exposes the underlying data with the same permission model. See API documentation at *developers.smartcartcommerce.com* (account-lead access).

## Custom dashboards

We don't currently support brand-built dashboards in the console. Brands that want a custom view typically (a) export to CSV and analyze in their tooling, (b) connect Google Looker / Tableau / Power BI to our API, or (c) connect Google Analytics for more flexible web analytics.

## Reporting Options — global preferences

A small panel at *Analytics → Options*:

- **Time zone for reports.** Defaults to your operational time zone.
- **Currency.** Defaults to your home currency.
- **First day of week.** For weekly aggregations.
- **Fiscal year start.** If you align reports to a fiscal year.

These defaults apply across every report in the library.
