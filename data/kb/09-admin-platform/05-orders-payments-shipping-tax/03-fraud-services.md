# Fraud Services

**Document type:** Brand-facing reference + platform standard
**Owner:** Saket Panwar
**Last reviewed:** 03 March 2026

---

## How fraud is handled

Fraud screening is platform-managed. SmartCartCommerce is the merchant of record on every order, which means we absorb chargeback risk and we run the fraud-screening machinery. Brands have visibility into how their orders are scored but do not configure fraud rules themselves.

This document explains what we do, what brands can see, and what brands should know.

## What we screen

Every order goes through real-time fraud scoring at checkout. Inputs include:

- **Card fingerprint** — risk signals from our payment partners (Stripe, Adyen) including AVS, CVV match, 3DS results.
- **Customer signals** — account age, previous order history, prior chargebacks, declined cards.
- **Behavioral signals** — session pattern, IP geolocation vs. shipping address, device fingerprint, browser anomalies.
- **Order signals** — high-value first-order, mismatched billing/shipping, rapid repeat orders, bulk gifting patterns.
- **Network signals** — known fraud rings, leaked-credentials lists, sanctioned individuals/locations.

Scoring is a weighted combination producing a risk score 0–100.

## Outcomes by score band

- **0–35 (low risk):** order proceeds normally.
- **36–65 (medium risk):** order proceeds; flagged for review post-shipment if anomalies emerge.
- **66–84 (elevated risk):** order placed in *Fraud Review Hold*. Concierge or fraud team reviews within 4 business hours, decides to release or cancel.
- **85+ (high risk):** order declined at checkout. Customer sees a generic "we cannot process this order" message; we do not tell them why. They are invited to contact concierge.

We err on the side of declining when uncertain. Customers wrongly declined can clear up the issue with concierge in 5 minutes; customers victimized by fraud cannot un-experience it as easily.

## What brands see

For each of your orders, you see a *Risk* indicator in the order detail page:

- **Green:** clean.
- **Amber:** elevated risk; cleared by review.
- **Red:** declined at checkout (you don't actually receive these orders, but the system shows the attempt count).
- **Held:** currently in fraud review.

## When we hold an order

If we hold an order for fraud review, you see it in your Pending Orders queue with a *Hold — fraud review* tag. Do not ship. We will release or cancel within 4 business hours typically; longer windows are flagged.

If you've already started production on a made-to-order piece for an order that gets held: pause production. Your account lead and the fraud team will keep you informed. Work paused due to a held order for which the customer is later cleared resumes immediately; work for an order that gets cancelled is lost work and we will not recover the cost (we will note it as exceptional and informally absorb where possible — but it is not a guaranteed credit).

## Chargebacks

A chargeback is a customer or card issuer disputing a charge after the order shipped.

- We absorb chargeback risk fully. The dispute goes to us, not to you.
- We pursue or accept the chargeback based on case strength.
- We do not deduct chargebacks from your payouts. The exception is verified brand-side fraud (e.g., misrepresented inventory, "ghost" orders), which is governed by the seller agreement.

If you suspect a customer is engaging in chargeback fraud (multiple orders, multiple chargebacks), flag with your account lead. We track the customer; we don't share the customer's name with you.

## Fraud Services — settings you see

*Orders → Fraud Services.*

| Surface | What it shows | Editable? |
|---|---|---|
| Risk distribution | Histogram of order risk scores for your brand | No |
| Held orders count | Currently held; recently released; cancelled | No |
| Decline rate | Percent of attempted orders declined | No |
| Chargeback rate | Per-period chargeback rate touching your brand | No |
| Recommended risk threshold for Hold-and-Review | Default: platform recommendation | No (platform-set) |

You can request a deeper conversation with the fraud team if patterns are unusual. Pattern requests come through your account lead.

## What brands should NOT do

- **Do not ship a held order before review completes.** If we cancel it later, you've shipped at our expense (and we may reasonably ask you to absorb a portion, depending on the circumstances).
- **Do not tell the customer "your order was flagged for fraud."** Concierge handles those conversations carefully; the customer interaction has legal nuance.
- **Do not run your own fraud-scoring layer** that overrides ours. Some brands have asked. We don't allow it because conflicting decisions confuse customers and create chargeback risk.

## Edge cases

- **Made-to-order with deposit.** Deposit is captured at order; balance at production complete. Fraud scoring runs at deposit; a held order at deposit pauses production until release.
- **High-value first-time customer.** Often flagged. Most resolve in review without trouble. We err toward cleared if customer signals are clean (real address, real phone, real email history).
- **Gift orders to a different address.** Often flagged. Concierge sometimes calls the customer to verify; this is normal and the customer doesn't mind.
- **B2B / wholesale orders.** Lower fraud rate but higher value when they go wrong. Wholesale orders have a separate review path (see *07-wholesale-and-b2b.md*).

## Reporting

Monthly fraud report shared with your account lead during QBR. Quarterly platform-wide fraud trends are shared in our brand-partner newsletter (anonymized).
