# Admin Console Home

**Document type:** Brand-facing reference
**Owner:** Saket Panwar
**Last reviewed:** 11 March 2026

---

## What you see when you sign in

The Admin Console home is the at-a-glance view of your store on SmartCartCommerce. It is designed to surface the things you actually need to act on, and to leave the rest quiet. We deliberately keep the home page short. Long dashboards with thirty cards each are good for press screenshots and bad for daily work.

## Store maintenance panel

The top strip of the home page. Five live indicators:

- **Live site status** — green if your brand page is currently serving customers; amber if a temporary maintenance window is in effect; red if your storefront is offline. The indicator is informational; it is not clickable.
- **Pending orders** — count of new orders waiting to be processed. Click to open the *Pending Orders* page filtered to your brand.
- **Pending wholesale orders** — count of B2B orders waiting for your review. Click to open the wholesale list.
- **Catalog requests** — count of customers who have requested your printed catalog (where applicable). Click to open the catalog request export area.
- **Recent reviews to respond to** — count of reviews left in the last 7 days that haven't received a brand reply. Click to open the *Reviews* tab.

Indicators refresh every 60 seconds while the page is open.

## Quick stats

A four-column table directly below the maintenance panel:

| Metric | Today | Yesterday | Last 7 days | Last 30 days |
|---|---|---|---|---|

The default metrics are *Orders*, *Gross sales*, *Returns*, and *New customers reached*. You can swap any of the four for *Average order value*, *Items per order*, *Top SKU by units*, *Top SKU by revenue*, or *Concierge tickets touching your brand*.

The table is the same each time you open it. We do not auto-rotate metrics or surprise you with what's shown.

## New feature releases

Below the quick stats, a single card noting any platform feature that has shipped since you last logged in. We post here once per release; we do not duplicate to email.

If the feature requires action from you (e.g., a new required setting), the card is highlighted and stays pinned until you click *Acknowledge*. If it is informational, it scrolls off after 30 days.

## Staging and live site buttons

Two buttons in the top-right of the home page. *Open staging* loads your staging environment in a new tab; *Open live site* loads your public brand page. Both deep-link to the same product or page you were last viewing in the console, where applicable.

## Warning notice area

A small strip directly below the header, hidden by default. It appears only when there is something genuinely worth interrupting you for: a payout failed, a fraud review needs attention, a tax registration is expiring in your jurisdiction, an SSL certificate is approaching expiry. We use this surface sparingly. If you see something here, it is real.

## Business rules — what the home page is and isn't

A few principles we hold to:

- The home page is a status page, not a marketing surface. We do not run upsells or feature promotions for paid SmartCartCommerce add-ons here.
- We do not surface AI-generated "insights" or auto-prescribed actions. The board you see was decided by humans (you and us).
- We never modify a metric definition without notice. If we change how *Gross sales* is computed, we will tell you in advance and back-fill the historic period for comparability.

## Mobile

The Admin Console is fully usable on mobile. The home page reorders cards vertically on small screens; the maintenance panel becomes a swipeable strip. We do not have a dedicated merchant mobile app; the web console works well enough that we have not built one.

## Performance

Home page load target: under 800 ms on a connection at the median brand-partner internet quality (we measured this; most of our brand operators are on connections that don't deserve a heavy SPA). If you experience consistent slow loads, message your account lead — we can sometimes diagnose a brand-specific issue (large image library, abnormal query pattern) before it becomes painful.
