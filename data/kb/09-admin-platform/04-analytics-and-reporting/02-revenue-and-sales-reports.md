# Revenue & Sales Reports

**Document type:** Brand-facing reference
**Owner:** Saket Panwar
**Last reviewed:** 06 March 2026

---

## Revenue

*Analytics → Reports → Revenue.*

The headline report. Total revenue for your brand over a chosen period.

### Available metrics

| Metric | Definition |
|---|---|
| Gross revenue | Sum of order subtotals before returns |
| Returns | Refunded value within the period |
| Net revenue | Gross minus returns |
| Average order value (AOV) | Net revenue / orders |
| Items per order | Total items / orders |
| Customer acquisition revenue | Revenue from first-time customers |
| Repeat customer revenue | Revenue from returning customers |
| Lifetime revenue per customer | Cohort-based; rolling computation |

### Segmentation

- By category (your brand-page categories).
- By marketplace category (the platform vertical).
- By region (customer shipping market).
- By channel (organic, search, paid affiliate, email, direct).
- By customer cohort (first / repeat, Circle / non-Circle).

### What "revenue" means here

We define revenue as the merchandise total of confirmed orders, in your brand's reporting currency. Excludes:

- Shipping fees (these are platform revenue net of carrier cost).
- Sales tax / VAT (collected and remitted separately).
- Gift wrap (where free; not revenue).
- Gift card sales until redemption (we recognize revenue on redemption, not on card purchase).

This is the same definition we use on your payout statements. The two numbers reconcile within a small currency-conversion delta.

## Sales Rank

*Analytics → Reports → Sales Rank.*

Your products ranked by performance in the chosen period.

Default ranking is by revenue. Toggle to rank by units, AOV contribution, or returns rate.

Useful pivots:

- **Top-performing products** — your bestsellers.
- **Bottom-performing products** — slow movers; candidates for review.
- **Highest-margin products** — by units sold (we don't show net margin, but by-unit dollars is a proxy).
- **Rising stars** — products with the largest week-over-week percentage increase, base-adjusted.

Each row deep-links into the product page so you can investigate.

## Comparatives

*Analytics → Reports → Comparatives.*

Side-by-side period comparison: this period vs. last period, vs. same period last year, vs. a custom baseline.

Common comparisons:

- This month vs. same month last year.
- This week vs. same week last year.
- Q1 this year vs. Q1 last year.
- Last 7 days vs. trailing average of prior 4 weeks.

Surface metrics: revenue, orders, AOV, returns rate, CSAT, repeat-rate. Movement is shown as absolute, percentage, and statistical-significance indicator (we mark differences as significant only when the cohort size and variance support the signal).

## Order Detail

*Analytics → Reports → Order Detail.*

Per-order detail for any order touching your brand. Filter by:

- Date range.
- Order status (placed, shipped, delivered, returned, refunded).
- Customer cohort.
- Region.
- Brand-side touchpoints (custom forms used, gift wrap, made-to-order, etc.).

Each row expands to show the full order line for items from your brand (we show your items even in mixed-brand orders; we do not show other brands' items).

Useful for: investigating a specific customer issue, reconciling to your accounting, identifying patterns in problematic orders.

## Things to watch in revenue reporting

A few patterns we surface in inline notes on the report:

- **End-of-month dip.** Some customers wait for paydays; this is normal and reverses by mid-next-month.
- **Holiday distortion.** November–December accounts for a disproportionate share of annual revenue; year-over-year comparison is more meaningful than month-over-month for this period.
- **Made-to-order revenue lag.** Made-to-order revenue is recognized at order placement (per our accounting); production and ship can take weeks. Don't confuse "high revenue, low ship volume" as a problem if you have a heavy MTO mix.
- **Returns lag.** Returns trickle in for 60+ days after the holiday peak. January net revenue looks smaller than gross; that's normal.

## Currency notes

If you operate across multiple currencies, the report converts to your brand reporting currency at the spot rate of the order time. Historical reports lock the conversion rate so re-running the same period shows the same number.

## Export

Every report exports to CSV, XLSX, or JSON. You can also schedule a recurring email export (weekly Monday morning, monthly first-of-month) to your designated reporting email.

## Reconciliation with payouts

Revenue in this report should reconcile with your payout statements within currency-conversion-delta tolerance. If the two don't match within ~1.5%, your account lead can investigate.
