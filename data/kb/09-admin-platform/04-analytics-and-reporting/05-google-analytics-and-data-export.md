# Google Analytics, Data Export & Reporting Options

**Document type:** Brand-facing reference
**Owner:** Saket Panwar
**Last reviewed:** 09 February 2026

---

## Google Analytics integration

Brands that want richer web analytics — funnel analysis, custom audiences, cross-channel attribution beyond what we surface — can connect Google Analytics 4.

*Analytics → Options → Google Analytics.*

### Setup

1. Provide your GA4 Measurement ID (format `G-XXXXXXXXXX`).
2. We inject the analytics tag on your brand pages.
3. Enhanced ecommerce events fire automatically: `view_item`, `add_to_cart`, `begin_checkout`, `purchase`.
4. Verify in GA4 within 24 hours.

### What syncs

- All page views on your brand pages and product pages.
- Standard ecommerce events with full line-item detail.
- Custom dimensions (where you map them).

### What doesn't sync

- Customer PII. Email addresses, names, addresses are not passed to GA. Customer ID is hashed.
- Marketplace-wide pages (homepage, category landing). GA is brand-scoped.
- Admin Console. We don't track our own dashboard with your GA.

### Privacy compliance

We surface the GA cookie via our consent banner on a per-region basis where required (EU, UK, California). Brands cannot disable consent gating; that would put us out of compliance.

## Other web analytics tools

Some brands use Plausible, Fathom, or other privacy-focused alternatives. We support custom analytics scripts via *Analytics → Options → Custom Tracking Script*. Limits:

- Only scripts hosted on a small allowlist of analytics providers (we maintain the list; primary names are included).
- No third-party advertising tracking pixels (e.g., raw Meta Pixel). We have decided not to support direct ad-tracking pixel injection on the marketplace.

## Reporting Options — Core Options

A panel of cross-report defaults at *Analytics → Options*.

### Filtering

- **Default exclude bots:** On.
- **Default exclude internal team:** On (your team's IP/account excluded from visit reports). Configure your team in *Team*.
- **Default exclude test orders:** On. Test orders are tagged at order time and never count toward revenue.
- **Default exclude returns from revenue:** Off (default revenue is gross; toggle to make default *net*).

### Options

- **Reporting timezone.**
- **Reporting currency.**
- **First day of week.**
- **Fiscal year start.**
- **Number formatting.**

### Other Info

- **Data retention.** We retain detailed event data for 25 months; aggregated rollups indefinitely.
- **Sampling.** None on revenue. Light sampling on visit reports above 1M sessions/month — flagged in the UI when active.
- **Refresh latency.** Posted on each report.

## Incentive Options

A sub-panel of Options at *Analytics → Options → Incentive Options* covering reporting preferences for incentive programs:

### Affiliate

- **Attribution model:** Last click (default), first click, or linear.
- **Attribution window:** 30 days post-click (configurable up to 90).
- **Self-referral exclusion:** On.
- **Cookieless fallback:** On (we use a server-side fingerprint for cookie-less browsers).

### E-Party

- **Default event window:** 7 days.
- **Default commission tier:** 8%.
- **Approval required:** Yes (low bar).

### Refer-a-Friend

- **Referrer reward:** $25 (platform-funded).
- **Referee reward:** $25.
- **Minimum first purchase:** $75 (platform-set).
- **Cap per referrer:** $200/year (platform-set).
- **Suspect referral rejection:** Auto.

These settings have a mix of brand-editable and platform-managed. The UI marks each clearly.

### Options

- **Whether to show incentive-attributed revenue separately in revenue reports.** On (recommended) so you can see organic vs. incentive-driven revenue at a glance.

## Data export

Beyond per-report export, two broader paths.

### Scheduled export

Set up a recurring export (daily, weekly, monthly) of any saved report view. The export emails to your designated address as CSV or XLSX.

### API export

For programmatic / continuous integration, the API exposes the same underlying data with the same permission model. Common uses:

- Pipe to your data warehouse (Snowflake, BigQuery, Redshift).
- Connect to BI tools (Looker, Tableau, Power BI).
- Build custom dashboards in your own infrastructure.

API documentation lives at *developers.smartcartcommerce.com*. Your account lead can grant access.

## What we don't expose

Some things we deliberately don't surface in reports or via the API:

- Individual customer behavior across multiple brands on SmartCartCommerce.
- Specific competitor performance.
- Platform-wide aggregates that would let a brand back-out competitor data.
- Concierge interactions for customers (we summarize at brand level when relevant).

These are deliberate privacy and competitive-protection decisions.
