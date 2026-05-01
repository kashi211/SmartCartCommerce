# Shipping Options & Carrier Integrations

**Document type:** Brand-facing reference
**Owner:** Saket Panwar
**Last reviewed:** 22 February 2026
**Related:** *02-customer-policies/02-shipping-and-delivery.md* (customer-facing summary).

---

## Two paths

Brands ship in one of two ways on SmartCartCommerce:

1. **From the maker's own studio.** Most common. The brand configures shipping rates, prints labels through their preferred carrier, and dispatches. SmartCartCommerce provides the carrier integrations and rate-shopping tools.

2. **From a SmartCartCommerce bonded fulfillment center.** Inventory consigned to one of our four FCs (NJ, LA, London, HK). We handle packing, label generation, and dispatch. The brand sees the same Pending Orders queue but doesn't physically ship.

This document focuses on path 1 — what brands using their own studio configure. Path 2 brands have a simpler experience covered briefly at the end.

## Core Options

*Shipping → Options.*

| Setting | Default | Notes |
|---|---|---|
| Origin address | Your studio | Required for accurate rates |
| Default service level | Standard | Standard / Express / Same-day |
| Customer rate display | Calculated at checkout | Or flat-rate per zone |
| Package types | Box (small/med/large), envelope, custom | Used for dimensional weight |
| Default packaging weight | Per package type | Auto-applied to base item weight |
| Insurance | On for orders ≥ $200 | Customer-paid line item, not visible |
| Signature required | On for orders ≥ $1,000 | Default; can override per order |
| Saturday delivery | Off | Toggle on for some carriers |

## Shipping Tables

A flat-rate alternative to live carrier rates. *Shipping → Tables.*

Useful for brands who want predictable shipping pricing or whose carrier doesn't offer real-time rates.

Each table is a matrix:

- Rows: weight bands or order-value bands.
- Columns: destination zones (you define zones; e.g., domestic, EU, North America, rest of world).

The customer sees a single computed shipping price at checkout based on the table.

## Shipping Groups

For brands with mixed packaging needs (one product ships flat, another ships in a long tube, another requires palletization), shipping groups let you assign a default packaging strategy per product. *Shipping → Groups.*

Each group has:

- A default package type.
- A weight floor (minimum charged weight).
- A handling fee (optional).
- Eligible carriers / services.

Products are assigned to a group at the SKU level.

## Preset Ship Dates

For made-to-order or scheduled-launch products, you can set a preset ship date. The customer sees a clear "Ships on [date]" message at checkout.

*Shipping → Preset Ship Dates.*

Use cases:

- Pre-launch: products available for order now, shipping when the launch goes live.
- Made-to-order with cohort production: a brand that produces in batches every two weeks.
- Limited-edition drops with a shared ship date.

## Blackout Dates

Days you do NOT ship. *Shipping → Blackout Dates.*

Use cases:

- Brand vacation.
- Studio closures during local holidays.
- Production-week maker is on retreat.

The customer sees a slightly later estimated delivery date at checkout. If a customer places an order during a blackout window, the order goes to your queue with a flag noting the customer expects late shipment per your published note.

## Dimensional Shipping

Many carriers bill by dimensional weight (a calculation based on length × width × height) rather than actual weight for low-density packages.

*Shipping → Dimensional.*

Configure:

- Package dimensions per package type.
- Density factor per carrier (UPS uses 139 in.³/lb; FedEx similar; USPS varies).

The system computes dim-weight at order time and rate-shops accordingly.

## Custom Shipping API

For brands using a logistics provider we don't have a native integration with — a custom 3PL, an in-house warehouse with its own system. *Shipping → Custom API.*

Specify:

- Endpoint URL for rate quotes.
- Authentication (API key, OAuth).
- Required request fields.
- Expected response shape.

We make the call at checkout and present the rate. Latency budget: 2 seconds; if the API is slower, we fall back to your shipping table.

## Carrier integrations — direct

Native integrations with major carriers. Each provides real-time rates, label generation, and tracking.

### UPS Auto Rate

*Shipping → Carriers → UPS.*

- Connect with your UPS account (account number + API credentials).
- Negotiated rates flow through to checkout.
- Label generation directly from order detail page.
- Pickup scheduling supported.
- Saturday delivery option.

### FedEx Auto Rate

Same shape for FedEx. Includes:

- Express, Ground, Home Delivery, SmartPost.
- International services.
- Saturday delivery and weekend pickup.
- Hold-at-location options.

### USPS Auto Rate

For US-based brands. Priority Mail, Priority Express, Ground Advantage, Media Mail, First-Class.

USPS pickup must be scheduled separately on the USPS site; we do not have native pickup scheduling for USPS.

### ABF Freight

LTL freight carrier. Used by brands shipping furniture or oversized goods.

### Conway Freight

LTL alternative to ABF.

### ShipWorks

Multi-carrier shipping software. Brands using ShipWorks can connect once; it handles rate-shopping across carriers downstream.

## Label generation

For each integrated carrier, you can generate labels directly from the order detail page or from Pending Orders bulk-actions.

- Label PDFs print to standard letter or thermal printer.
- Tracking number is captured automatically and pushed to the order.
- Customer notification fires when label is generated (configurable; default is fire on first carrier scan, not on label generation).

## Carrier choice at order time

When multiple carriers are configured, we rate-shop at order time and present the customer with options sorted by price/speed. Customer picks. The customer's choice arrives in your Pending Orders queue with the carrier and service level locked in.

You can override the customer's carrier choice if you have a reason (e.g., the chosen carrier doesn't pick up at your studio that day). Override emails the customer with the change and updated tracking.

## Shipping for fulfillment-center brands

Brands consigning inventory to one of our four FCs use a simpler flow:

- We rate-shop on your behalf using our negotiated carrier rates.
- We pack and label.
- You see fulfillment events in your order page; you don't configure carriers per order.
- You can specify packaging preferences (e.g., "always use the linen-pouch wrap"); the FC team follows.

## Issues we see and how to handle them

- **Address validation failure.** Customer entered an unverifiable address. Concierge usually fixes by reaching out to the customer. Don't ship; you'll get a return-to-sender.
- **Rate quote mismatch.** Customer paid $X at checkout; the carrier label generates for $Y. We absorb the difference up to 8%; above that, escalate. Usually the cause is a dimensional-weight miscalculation; check your dim-shipping config.
- **Carrier outage.** UPS or FedEx occasionally has regional outages. The system rate-shops to alternates automatically. If your customer's carrier is unavailable, we'll route to the nearest alternative and notify them.

## Reporting

Shipping reporting in *Analytics → Shipping*:

- On-time-delivery rate by carrier.
- Average days from ship to delivery by region.
- Damage report rate by carrier.
- Cost per shipment, per region, per carrier.

Use these to choose between carriers if you have flexibility.
