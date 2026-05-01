# Inventory Control

**Document type:** Brand-facing reference
**Owner:** Saket Panwar
**Last reviewed:** 14 February 2026
**Related:** *04-seller-operations/03-inventory-management.md* (the partner-facing summary).

---

## What inventory control means here

This document covers the operator tooling: how to set, adjust, and monitor inventory in the Admin Console. The strategic-policy framing (when to oversell, made-to-order, restock confirmation flow) lives in the seller-operations doc; this is the day-to-day reference.

## Inventory views

*Catalog → Inventory* opens the inventory dashboard with three default panels:

- **Low stock** — products below your set threshold, with reorder timing.
- **Out of stock** — products at zero, grouped by whether they are paused, on backorder, or quietly out.
- **Slow movers** — products that have not sold in your selected window (default 90 days).

You can pin custom panels (e.g., "items I make to order with current production lead time"). Pinned panels persist per-team-member.

## Setting inventory

Three patterns, in order of how brands use them:

**1. Direct edit (small catalogs).** Open the product, type the new on-hand count, save. The change is logged in the audit log with reason ("manual adjust" by default; you can add a free-text reason).

**2. Bulk CSV import (medium catalogs).** Upload a CSV with SKU and on-hand columns. We diff against the current state and ask you to confirm before applying. Async for >200 rows.

**3. API integration (any size).** If your inventory lives in another system (Shopify, Cin7, custom ERP), we connect to it as the source of truth. Inventory updates flow from your system to ours in near-real-time. Available connectors are listed at *Catalog → Inventory → Integrations*.

For brands with consigned inventory at one of our four bonded fulfillment centers, we are the source of truth and provide a real-time read.

## Search inventory

A scoped search inside *Catalog → Inventory*:

- By SKU.
- By location (your studio, FC-Rotterdam, FC-NJ, FC-HK, FC-SY).
- By stock level (zero, low, in-stock, surplus).
- By movement (no movement in N days).

## Inventory Control Options

*Catalog → Inventory → Options* is where you configure your defaults:

| Option | Default | Notes |
|---|---|---|
| Low-stock threshold | 5 | Per-product override allowed |
| Allow oversell | Off | Strongly recommended off; backorder is the better tool |
| Hide at zero | On | Out-of-stock products show "Notify when back" by default |
| Restock notification | On | Sends restock alert to customers who opted in |
| Auto-pause on N stockouts | Off | If on, after N stockout incidents, product auto-pauses pending review |
| Reservation window | 15 minutes | How long an item is reserved during checkout before releasing |
| Made-to-order auto-confirm | On | Automatic confirmation when an MTO order is placed |
| Edition ceiling enforcement | Strict | Always strict; we do not allow ceiling overrides |

## Backorder and pre-order

Backorder is enabled at the product level: open the product, set an estimated availability date, save. Pre-order is the same with a "not yet shipping" flag. Both honor the policies in *04-seller-operations/03-inventory-management.md*.

When a backordered product reaches its estimated availability, the system pings you 24 hours in advance to confirm or extend the date.

## Made-to-order

Made-to-order products do not have an on-hand count; they have a *production lead time* (days from order to dispatch). Brands log production events:

- *Production started* — fires "we have begun your piece" notification to the customer.
- *Production complete* — fires "your piece is ready and shipping" notification.

These events also flow into our analytics for time-to-ship reporting.

## Inventory accuracy reports

Every brand receives a monthly inventory accuracy report:

- Deltas between your declared inventory and your actual fulfillment events (we measure stock-out incidents, oversell attempts, mid-order stock revisions).
- Slow-moving inventory in absolute terms (units) and relative terms (cohort comparison).
- Stockout incidents with timing and customer impact.

The report is for your operational use. We do not score you on it directly. It helps you find the patterns; you decide what to do with them.

## Stockout incident handling

If a customer order cannot be fulfilled because inventory was wrong:

1. Concierge is notified immediately.
2. Customer is contacted within 1 hour (during business hours) with a refund or replace option.
3. Your account lead is notified.
4. The incident is tagged in the changelog and counted toward your stockout metric.

Two stockout incidents in 30 days triggers an account lead conversation. We do not auto-deactivate listings.

## Returns to inventory

Items returned in saleable condition are re-added to inventory automatically and re-listed within 24 hours. You see them in the audit log as *system: return-to-inventory*. Items not in saleable condition are not auto-returned; they require disposition (donate, destroy, return to brand, repair-then-relist).

For Beauty, opened items never return to inventory regardless of condition.

## Limits and edge cases

- Inventory adjustments are versioned. You can see history per SKU at *Inventory → SKU history*.
- Negative inventory is rejected unless oversell is explicitly enabled.
- Bulk imports are atomic per row; a malformed row is reported and skipped, others apply.
- API integrations have a 4-hour catch-up SLA after we reconnect a temporarily failed integration.
