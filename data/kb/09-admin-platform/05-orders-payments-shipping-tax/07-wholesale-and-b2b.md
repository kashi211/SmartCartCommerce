# Wholesale & B2B

**Document type:** Brand-facing reference
**Owner:** Saket Panwar
**Last reviewed:** 04 March 2026

---

## What we mean by wholesale

A subset of brands on SmartCartCommerce sell wholesale to other retailers — boutiques, independent shops, hotels, restaurants, gift programs. Wholesale orders behave differently from consumer orders: larger quantities, longer payment terms, different pricing, different fulfillment expectations.

The platform supports wholesale as an opt-in feature. Not every brand uses it. About 18% of our brands have wholesale active.

*Orders → Wholesale.*

## Wholesale Orders

The list of incoming wholesale orders. Each order has more fields than a consumer order:

| Field | Notes |
|---|---|
| Wholesale account | The buyer's verified business |
| Order # | Wholesale orders use a different ID series |
| PO # | Buyer's purchase order number |
| Items | Quantity per SKU; can be much larger than consumer orders |
| Pricing | Wholesale price (typically 40-50% off retail) |
| Payment terms | Net-15, Net-30, Net-60, Pre-pay, or Credit card at order |
| Ship-to | Buyer's warehouse or store |
| Notes | Buyer's instructions (custom packing, no SCC branding, etc.) |

Wholesale orders are reviewed by you before being released to fulfillment. The customer can place; you can approve, modify, or reject.

## Approve Wholesalers

The buyer onboarding process. *Wholesale → Approve Wholesalers.*

A retailer or hotel that wants to buy from your brand wholesale applies through SmartCartCommerce. Their application includes:

- Business name, address, tax ID.
- Business type (specialty retailer, hotel, gift program, etc.).
- Reseller/resale tax certificate (US) or VAT number (EU).
- Buyer's named contact and email.
- Bank reference or trade credit reference (for net terms).
- Optional: photos of their store, social media, why they want to carry you.

You review; you approve, decline, or request more information. Each approved buyer gets:

- A wholesale account on SmartCartCommerce.
- Access to your wholesale catalog (price visibility).
- Their established payment terms.

You can also approve at the platform level for buyers we have pre-vetted (some larger retail buyers we've worked with for years).

## Search Wholesalers

Find your approved wholesale accounts. Filter by:

- Business name.
- Region.
- Approval date.
- Payment terms.
- Total orders / revenue with you.
- Active / paused / declined.

Useful for: outreach campaigns, end-of-quarter check-ins, identifying buyers worth deepening with.

## Wholesale Shipping

Wholesale orders typically ship differently:

- Larger packages or palletized.
- LTL freight rather than parcel.
- To warehouse / store address (not residential).
- Sometimes consolidated with other wholesale orders to that buyer.

*Wholesale → Shipping* lets you configure:

- Wholesale-specific shipping rates (often pre-negotiated with carriers).
- Pallet/palletization rules.
- Default freight carrier for wholesale.
- Lead time for wholesale (often longer than consumer; allow time for production).

You can also set wholesale shipping origin if it differs from your retail origin (e.g., consumer ships from your studio, wholesale ships from a co-located warehouse).

## Pricing

Wholesale pricing is a brand-set discount off retail. Common patterns:

- **Wholesale price** — 40-50% off retail.
- **Quantity tiers** — bigger discount at higher volumes (50% on 1-50 units, 55% on 51-200, 60% on 201+).
- **Buyer-specific pricing** — special pricing for key accounts.

Pricing is configured at *Wholesale → Pricing* per product or category.

We do not let wholesale pricing exceed retail pricing — that doesn't make business sense and would confuse buyers.

## Payment terms

Most common terms:

- **Pre-pay** (credit card or wire at order). Default for new buyers.
- **Net-15** for established buyers.
- **Net-30** for proven buyers with credit references.
- **Net-60** for select large accounts.

Net-term wholesale orders are extended on credit by SmartCartCommerce. We absorb the receivables risk. If a buyer fails to pay within terms, we pursue collection; the brand still receives payout on the normal cadence.

The exception is brand-side fraud (you and a buyer collude on an order that doesn't ship), which is governed by the seller agreement.

## Wholesale catalog

Buyers see a separate wholesale-version of your brand page. Price points are wholesale; minimum order quantities are configurable; quantity tier breaks are visible.

You configure the wholesale catalog at *Wholesale → Catalog*. Most brands replicate their full retail catalog; some restrict (limited edition pieces stay retail-only).

## Wholesale orders for fulfillment

Wholesale orders flow into your Pending Orders queue with a *Wholesale* tag. They show:

- Buyer's PO number.
- Quantity per SKU.
- Buyer-specific instructions (e.g., "no SCC branding on the outer box").
- Payment terms remaining.

You fulfill same as consumer orders, just with the larger volume.

## What's different about wholesale

A few things to be aware of:

- **No customer reviews.** Wholesale orders don't generate consumer reviews; the buyer rates the experience separately.
- **Different return policy.** Wholesale returns follow industry-standard wholesale terms (typically defective only, often per-batch). The platform default; can be customized per buyer.
- **No SmartCart Circle benefits.** Membership benefits don't apply to wholesale orders.
- **Tax treatment.** Wholesale buyers are typically exempt (resale exemption). Their reseller certificate is on file.

## Reporting

*Analytics → Wholesale*:

- Wholesale revenue by buyer, period, product.
- Buyer ranking.
- Conversion of approval to first order.
- Repeat-buyer rate.
- Average order value.

## Volume context

Wholesale typically represents 15-40% of revenue for brands that participate. For some brands (where wholesale is the historical channel), it can be 60%+ — these brands chose SmartCartCommerce specifically for the consumer reach, but their existing wholesale relationships continue through the platform.

## Common questions

**"Can I bring my existing wholesale buyers onto SmartCartCommerce?"** Yes. Onboarding for existing buyers is faster (we trust your existing relationships).

**"Can I run a private trade show with select buyers?"** Yes — *Wholesale → Trade Shows* lets you create gated catalog views with custom pricing for buyer events.

**"What if a wholesale buyer tries to apply with a bad business reference?"** Decline and document. We track flagged buyers across the platform; a buyer that tries to defraud one brand often tries others.
