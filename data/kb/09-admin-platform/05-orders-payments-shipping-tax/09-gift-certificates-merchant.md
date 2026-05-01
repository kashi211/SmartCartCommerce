# Gift Certificates — Merchant View

**Document type:** Brand-facing reference
**Owner:** Saket Panwar
**Last reviewed:** 04 January 2026
**Related:** *02-customer-policies/07-gift-cards.md* (customer-facing policy).

---

## What this is

Gift cards on SmartCartCommerce are platform-issued and platform-redeemable. A customer buys a card; the recipient applies it to any purchase from any brand on the platform.

This document is the merchant-facing view: how gift cards interact with your sales, fulfillment, and reporting.

## How gift cards flow into orders

When a customer applies a gift card balance at checkout:

- The gift card amount reduces the order total visible to the customer.
- The remainder is charged to a payment method or another instrument.
- Your portion of the order — the merchandise total for your items — is unchanged in your ledger.
- The split between gift-card-paid and money-paid is platform-internal accounting; your payout is based on merchandise total.

In other words: from your brand's perspective, a $200 order paid 50% by gift card behaves identically to a $200 order paid 100% by card. You receive your normal payout on the normal cadence.

## Gift Certificate Emails

Customers can include personalized messages when sending a gift card. These messages are platform-generated emails (not your brand's emails); the recipient receives an email from SmartCartCommerce with the sender's note.

You don't see gift-card sender messages — those are between sender, recipient, and us.

## Gift Certificates Report

*Orders → Gift Certificates → Report.*

A read-only report showing your brand's interaction with gift cards:

| Metric | Notes |
|---|---|
| Orders touching your brand paid wholly with gift cards | Count |
| Orders paid partially with gift cards | Count and average % |
| Gift-card-paid revenue attributed to your products | Total |
| Top SKUs commonly bought with gift cards | Useful for understanding gift behavior |
| First-time customers using gift cards | Count |

We provide this because brands sometimes ask "are gift cards just shifting purchases or driving incremental?" The data suggests gift cards drive meaningful incremental purchases — about 40% of gift-card-funded orders are from customers who hadn't bought from the recipient brand before.

## Gift Certificate Options

Brand-facing settings panel — limited; most settings are platform-level. *Orders → Gift Certificates → Options.*

| Setting | Editable? | Notes |
|---|---|---|
| Allow gift cards on your products | No (default yes for all) | Special exception for end-of-edition; contact account lead |
| Gift card receipt visibility | Read-only | Customer always sees gift card line on receipt |
| Gift wrap auto-prompt with gift card | On | Default; we show a gift-wrap prompt when gift card is used |

A small subset of brands ask to exclude their products from gift-card use (typically for limited-edition or commissioned pieces where they want a verified-customer signal). We accommodate this case by case.

## Gift Certificate Services — what brands need to know

Behind the scenes, the gift card lifecycle:

- **Purchase:** customer buys a gift card; we hold the balance as deferred revenue.
- **Delivery:** recipient receives email with code (or physical card mailed).
- **Redemption:** at checkout, code applied; balance debits to the order.
- **Re-issuance:** for lost-or-stolen cases (handled by concierge).
- **Expiry:** 10-year validity; refresh on customer request thereafter.

Your brand sees gift-card-funded orders in the same Pending Orders queue as any other order, with a small *Gift card applied* tag.

## Gift wrapping for gift-card orders

When a customer uses a gift card AND applies gift wrapping, we surface a gentle reminder in your fulfillment view that the order is "from a gift card" — useful for treating it specially (a thank-you note, particularly careful packing).

The customer placing the order with the gift card may not be the original gift-card sender; we don't share gift-card chain-of-custody to brands. From your perspective, treat as a normal gift order.

## What brands cannot do

- Issue your own brand-only gift cards.
- Sell gift cards exclusive to your brand.
- Apply your own promotion codes to a gift-card-funded order (we don't run promotion codes at all; this is consistent).
- Refund gift-card-funded orders directly. As with all refunds, request through concierge.

## What if a customer disputes a gift card

- **"My gift card balance is wrong."** Concierge investigates with the platform's gift-card team.
- **"My gift card was redeemed by someone else."** Likely the customer shared the code; we treat it case-by-case. Brands don't get involved; the case is between concierge, the customer, and our gift-card team.
- **"My recipient says they didn't receive the card."** Concierge resends or reissues.

## Customer-facing summary

For the customer-facing terms (validity, lost cards, bulk corporate gifting, fraud prevention), see *02-customer-policies/07-gift-cards.md*. The customer-facing policy is what brand operators should reference when answering customer questions about gift cards.

## Reporting and tax

Gift card sales are not your revenue; they don't appear in your revenue reports until redeemed. When the gift card is used to buy your products, the redemption flows into your normal revenue (with the gift-card-funded portion noted).

Tax is collected at redemption, not at gift card sale. Your tax reporting for gift-card-funded orders is identical to any other order; we handle the timing-shift on our end.
