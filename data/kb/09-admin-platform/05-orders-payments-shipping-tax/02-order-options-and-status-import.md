# Order Options & Status Import

**Document type:** Brand-facing reference
**Owner:** Saket Panwar
**Last reviewed:** 22 February 2026

---

## Order Options

A configuration panel at *Orders → Options*. Brand-side defaults that affect how orders flow into your queue.

| Setting | Default | Notes |
|---|---|---|
| Handling-time SLA | Per signing | Change requires account lead approval |
| Auto-acknowledge | Off | We send platform-level confirmation; brand-side auto-message is rarely needed |
| Auto-print packing slip | Off | Some brands integrate with a label printer; toggle on if you have one |
| Hold high-value for review | Off | When on, orders above a threshold pause for your review before fulfillment |
| High-value threshold | $1,500 | Editable when *Hold high-value* is on |
| Hold gift orders for review | Off | Useful if your gift workflow has a manual step |
| Auto-mark shipped from carrier scan | Off | When on, we mark shipped automatically the first time the carrier registers a scan |
| Concierge auto-include | On | Concierge cases linked to order are visible in your order page |
| Customer note visible at fulfillment | On | Customer notes (gift messages, special requests) shown in your packing slip |

## Order Status Import

Used by brands that fulfill in their own systems and want to push status updates back to SmartCartCommerce in bulk.

*Orders → Status Import.*

### Format

CSV with columns:

- `order_number` (required).
- `status` (required: shipped, on_hold, cancelled, returned).
- `tracking_number` (required for shipped).
- `carrier` (required for shipped: UPS, FedEx, USPS, DHL, etc.).
- `notes` (optional).

### Behavior

- Dry-run preview before commit.
- Per-row error handling (a malformed row is reported and skipped; others apply).
- Async over 200 rows.
- Audit-logged with the importer's user ID.

### Common patterns

**Daily batch.** Brand exports their day's shipments from their own ERP, transforms to our format, imports into SmartCartCommerce. Common with brands using NetSuite or older bespoke systems.

**Hourly micro-batch.** Smaller brands with light integration push hourly via API or scheduled CSV upload. Lower-friction than building a full real-time integration.

**Real-time API.** Larger brands with engineering capacity. Status updates flow via webhook in real time. Most efficient; highest-quality customer experience.

## Order History Import

Used during onboarding when a brand is migrating from a previous platform and wants to bring their order history into SmartCartCommerce.

### What it does

Loads historical orders into your reporting. The orders are not customer-orderable (you can't refund them through us, since we weren't merchant of record), but they appear in your analytics and your customer's order history (clearly labeled as imported / pre-SCC).

### What it doesn't do

- It does not import customer payment information. Customers re-add payment methods at first purchase on SmartCartCommerce.
- It does not import live customer-account state from another platform.
- It does not import gift-card balances; those are handled separately.

### Format

CSV with the standard order schema. We provide a template at *Orders → History Import*. Most fields are optional; required minimum is order number, customer email, order date, items (with SKU mapping to your SmartCartCommerce catalog), order total.

### Volume

History imports are run once at onboarding. We recommend importing 24 months of history; longer periods are accepted but rarely useful for analytics.

The process can take a couple of hours for large brands. Done overnight typically; we email you when complete.

## Test orders

Brands can place test orders to validate fulfillment, receipts, and integrations. *Orders → Test Order.*

Test orders:

- Use a flagged "test customer" identity.
- Are excluded from revenue and analytics by default.
- Bypass payment processing (no real money moves).
- Trigger the same workflows as real orders, including notifications (you'll receive your own test confirmation email).
- Are labeled internally and customer-visible as "test."

Use test orders before launching, before a major change, after re-configuring a shipping integration. Don't forget to tag a test order if you ship one accidentally as a real order — concierge can fix.

## Order data export

A separate path from order import. *Orders → Export.*

CSV/XLSX/JSON of orders matching your filters. Include line items, customer (name + city only at default; full address available with a private-fields toggle), totals, status, dates.

Use cases: accounting reconciliation, ERP sync, tax preparation, custom reporting.

## Things you cannot do

- Modify line item prices after order placement. Prices are set at order time.
- Add items to an existing order. Customer places a new order.
- Charge an additional amount post-order without explicit customer authorization (rare; managed through concierge if needed).
- Bypass our handling-time SLA monitoring.
