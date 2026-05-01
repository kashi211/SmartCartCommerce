# Pending Orders & Order Search

**Document type:** Brand-facing reference
**Owner:** Saket Panwar
**Last reviewed:** 16 March 2026

---

## Pending Orders

*Orders → Pending Orders.*

The work queue for orders that need brand action. Default view: orders awaiting handoff to your fulfillment workflow, sorted oldest first.

### What an order shows in the queue

| Column | Notes |
|---|---|
| Order # | Hyperlinked to full order detail |
| Placed | Timestamp + relative ("3 hours ago") |
| Customer | First name only in queue; full identity on detail page |
| Items (yours) | Count of your line items in this order |
| Order value | Your portion only |
| Region | Customer shipping market |
| Tags | Made-to-order / Pre-order / Backorder / Wholesale / Gift |
| SLA | Time remaining within your stated handling time |

### Handling-time SLA

Each brand commits to a handling-time SLA at signing (typically 24h, 48h, or 72h, plus made-to-order lead times). The Pending Orders queue surfaces a countdown for each order, color-coded:

- **Green:** comfortable margin.
- **Amber:** approaching deadline (within 25% of remaining time).
- **Red:** breached.

A red order is flagged for both you and your account lead. Two reds in 30 days triggers an account lead conversation.

### Actions

For each pending order, available actions:

- **Mark as shipped.** Triggers customer notification and starts the carrier tracking flow. You can mark as shipped manually or via your shipping integration.
- **Request hold.** Pauses the SLA timer; useful when waiting on a customer clarification or pre-shipping inspection.
- **Request cancellation.** If you're unable to fulfill, request cancellation. Goes to concierge for customer outreach.
- **Note to customer.** Add a brief message; surfaced in their order page.
- **Internal note.** Add a brief note visible to your team and concierge; not customer-visible.

### Bulk actions

Select multiple orders, then *Bulk*: mark shipped (with bulk tracking-number import), bulk hold, bulk export.

## Order Search

*Orders → Search.*

Find any order touching your brand. The Pending Orders queue is a filtered view of recent ones; Search covers everything historical.

### Search fields

- Order number (full or partial).
- Customer email or name.
- Order date range.
- Status (pending / shipped / delivered / returned / refunded / cancelled).
- Product / SKU.
- Region.
- Order tags.
- Concierge case linked (yes / no).

### Saved searches

Save common search configurations (e.g., "all wholesale orders this quarter," "all made-to-order pieces awaiting production start"). Saved searches are per-team-member; you can share with teammates.

## Order detail page

Click any order to see full detail. Sections:

- **Customer** — name, shipping address, account history (orders for your brand only).
- **Line items** — your items only. Other brands' items in a mixed-brand order are not shown.
- **Status timeline** — every state transition with timestamp and source.
- **Communications** — concierge messages relayed to and from the customer where they touched your items.
- **Notes** — internal team notes plus brand-customer notes.
- **Audit** — every action on this order from your team and from platform-side teams.

### What you cannot do from the order page

- Refund directly. Refunds are platform-managed (we are merchant of record). You can request a refund; concierge processes it.
- Edit customer information. The customer relationship is platform-owned; for address changes mid-flight, request through concierge.
- Change pricing post-order. The price at order time is the price.

### What you can do

- Update tracking number.
- Mark items as shipped.
- Add a note to the customer (relayed by concierge in their voice if needed).
- Request a cancellation, hold, or status change.

## Mixed-brand orders

When a customer's order contains items from multiple brands, each brand sees only their items. The customer sees the consolidated order. Each brand fulfills independently; the customer can receive multiple packages.

We coordinate where coordination helps the customer: if two brands ship to the same customer at similar times, we may consolidate at one of our fulfillment centers and dispatch as one package. This is opt-in per brand and surfaces in your Pending Orders queue with a *Consolidating* tag.

## Order options

A brief panel at *Orders → Options*:

- **Default handling time SLA** (set at signing; change requires account lead approval).
- **Auto-acknowledge orders** (sends an automatic "we received your order" to the customer; default off — we send the platform-level confirmation).
- **Hold pending review threshold** — orders above a value automatically wait for your review before fulfillment (useful for high-value or made-to-order pieces).
- **Concierge auto-loop** — for orders with concierge notes, automatically include the relevant concierge in the order page (default on).

## Volume context

Most brands receive 5–80 orders per day. Brands above 200/day typically have automated fulfillment integrations; brands below 5/day usually fulfill manually from the Admin Console. Either pattern works.
