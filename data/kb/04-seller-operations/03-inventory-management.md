# Inventory Management Guide

**Document type:** Brand-facing reference
**Owner:** Saket Panwar
**Last reviewed:** 14 February 2026

---

## How inventory works on SmartCartCommerce

Brands run their inventory in their own system (Shopify, custom ERP, spreadsheet, ledger, abacus — we have seen all five). We connect to that source of truth and reflect it on SmartCartCommerce. Two integration paths:

1. **API integration** (Shopify, BigCommerce, WooCommerce, Lightspeed, Cin7, Brightpearl, Linnworks, custom via webhook). Inventory updates in near-real-time. Recommended for brands with more than ~100 SKUs.
2. **CSV upload + scheduled refresh.** For brands without an inventory system. Upload daily; we sync on a 4-hour cadence. Acceptable for small catalogs and made-to-order brands.

A small number of brands hold consigned inventory at one of our four bonded fulfillment centers. For those brands, we are the source of truth and provide a real-time read.

## Stockouts

Stockouts are the single most disruptive event in the customer relationship — worse than slow shipping, worse than damage. The pattern we want to avoid: a customer places an order, the brand realizes it's actually out of stock, the order is cancelled three days later, the customer has been waiting on something that isn't coming.

To avoid that:

- We require stock to be marked as available *only* if it is physically on hand and not promised elsewhere.
- We do not allow oversell except in specifically-flagged backorder or pre-order configurations.
- We treat a same-day cancellation due to stockout as a serious incident, escalating after the second occurrence in 30 days.

If you have committed inventory across multiple channels and are concerned about double-sell, reach out to your account lead. We have integration patterns that solve this for most major channels.

## Backorder & pre-order

Brands can optionally flag SKUs as eligible for backorder or pre-order. The product page shows a clear estimated availability date. We require the date to be conservative — we'd rather you say 6 weeks and ship in 4 than say 3 weeks and ship in 7.

Customer is informed at every step:

1. At order: estimated availability shown.
2. At 50% of stated lead time: status email.
3. At full lead time: shipping confirmation or apology with new estimate.

If an estimate slips by more than 7 days, the customer is notified and offered a no-questions cancellation.

## Made-to-order

Made-to-order is treated like backorder, with one extra step: we publish the maker's stated production lead time on the product page, separate from shipping. Once the order is placed, the maker logs *production started* and *production complete* events in the dashboard, which trigger customer notifications automatically.

Brands can adjust an order's projected ship date in the dashboard. Adjustments triggering more than 7 days of additional wait require an account lead approval. This is a soft check — it exists to protect your relationship with the customer.

## Limited editions & sell-throughs

Limited editions are coded with an edition number and a hard ceiling. We do not allow ceiling overrides. If a piece is "1 of 50," we will sell exactly 50.

For runaway sell-throughs, we offer the brand an optional restock confirmation flow: if a piece sells out in less than 14 days, we ping you to ask whether a restock is feasible. Restocks are flagged as such on the product page; we do not pretend a restocked item is still part of the original edition.

## Returns to inventory

Items returned in saleable condition are returned to your inventory automatically. We re-list within 24 hours. Items not in saleable condition are not returned to inventory; we coordinate with you on disposition (donate, destroy, return to brand, repair-then-relist, sample sale).

For Beauty, opened-but-unused items never return to inventory regardless of condition. They are donated or destroyed.

## Inventory accuracy reports

Each brand receives a monthly inventory accuracy report: deltas between your system and ours, stockout incidents, oversell attempts, slow-moving inventory, fast-moving inventory. The report is for your operational use; we do not score you on it directly.

## Slow-moving inventory

We do not surface "fix your slow movers" pressure to brands. Slow-moving inventory in our context is often slow for legitimate reasons — high price point, niche category, considered purchase. We provide the visibility and let the brand decide.

For brands that want to clear slow movers, we offer two paths: an internal sample sale for SmartCart Circle members, and a periodic deep-dive editorial feature that re-introduces overlooked work. We do not flash-sale.
