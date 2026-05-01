# Customer & Member Management

**Document type:** Brand-facing reference + privacy standard
**Owner:** Saket Panwar
**Last reviewed:** 06 March 2026

---

## How customer data is split

Customers on SmartCartCommerce have a relationship with the platform, not with individual brands. They sign up once; their account, payment methods, addresses, communication preferences, and lifetime activity are platform-owned. When a customer buys from your brand, you see what you need to fulfill the order — name, ship address, line items — and not what you don't.

This split is a deliberate marketplace design. It protects customers from being marketed-to by every brand they've ever bought from. It also creates a few constraints brands sometimes ask about. This document covers both.

*Orders → Customers.*

## Customer Search

Find customers who have placed orders with your brand.

| Search by | Notes |
|---|---|
| Email | Full or partial |
| Name | First, last, or both |
| Country | Standard ISO codes |
| City | Free text |
| Order date range | When customer's first or last order with you |
| Order count | Customers who have ordered N+ times |
| Lifetime spend with your brand | Banded |

You can save searches as named segments and export a CSV of results.

## What you see in a customer record

For customers who have ordered from your brand:

- First name (the name they chose to display).
- Last name (only if they opted in for brand visibility — most have not).
- Email address (where they opted in to your marketing).
- Country and city (for analytics).
- Order history with your brand (line items, dates, totals).
- Concierge interactions on orders touching your brand.
- Wishlist items from your brand (where they opted in).
- Marketing consent state for your communications.

What you do NOT see:

- Customers' orders with other brands.
- Customers' Lumora Circle / SmartCart Circle status (we know; you don't see).
- Customers' payment information.
- Customers' detailed personal data beyond what's relevant to fulfillment.
- Customers who did not order from your brand even if they viewed your products.

## Customer Groups

Brand-level segmentation. *Customers → Groups.*

You can create groups (e.g., "Top spenders," "Made-to-order customers," "First-time buyers") and use them for:

- Internal reporting.
- Targeted segments in your email tool integration.
- Custom outreach via concierge (with platform approval).

Groups are computed from your order data only; you cannot create groups based on platform-wide customer attributes.

## Customer Data

A panel showing:

- Total customers who have ordered from you.
- New customers in last 30 / 90 / 365 days.
- Repeat-customer rate.
- Geographic distribution.
- Average lifetime value with your brand.

Useful for understanding your customer base shape; not customer-identifying.

## Site Members — Member Search

Some brands have customers who have signed up to their brand-page mailing list without yet placing an order. *Customers → Site Members → Member Search.*

For each member: signup date, signup source, country (if shared), engagement (whether they've opened your emails — if you've integrated your ESP).

Members are NOT customers; they don't have order history with you yet. They've just expressed interest.

## Site Members — Member Options

Configuration for your brand-page sign-up flow. *Customers → Site Members → Options.*

| Setting | Default | Notes |
|---|---|---|
| Show signup prompt on brand-page | On | A small footer prompt; not a popup |
| First-purchase incentive shown to non-members | None | We don't run sales |
| Welcome email sequence | Off (you handle in your ESP) | If on, a default platform welcome fires |
| Transparency about what they'll receive | Required text shown | Editable within bounds |

## Wishlists

Customer-side wishlist management. Brands see:

- How many customers have items from your brand on their wishlist.
- Most-wished items (see *04-customer-and-program-reports.md*).
- Save-to-purchase patterns.

You cannot:

- See a specific customer's full wishlist (privacy).
- Send a "your wishlist item is going fast" email yourself (we don't allow this kind of messaging).
- Add to or modify customer wishlists.

## Rewards Program

SmartCartCommerce does not run a points-based rewards program at the platform level (see the SmartCart Circle membership doc for the alternative model). Brands cannot create their own brand-level points program.

What we do offer:

- **SmartCart Circle membership** — paid annual; benefits apply across the marketplace.
- **Refer-a-Friend** — platform-wide; both giver and receiver get credits.
- **Made-to-order priority** for repeat customers (some brands offer; you configure).
- **Editorial recognition** for long-term customers (we sometimes feature loyal customers in editorial; you can suggest one).

We have considered brand-level points programs and consistently rejected. The marketplace experience would fragment; customers would find themselves accumulating tokens across dozens of brands they never use.

## Privacy obligations

You are a data processor of customer data your brand handles for fulfillment; SmartCartCommerce is the data controller. Your obligations:

- Don't share customer data with anyone outside your fulfillment workflow.
- Don't retain customer data longer than necessary for fulfillment and warranty.
- Honor data deletion requests we forward to you (we'll send you the customer's email and request you delete from your local systems).
- Use the marketing list only as documented in your ESP integration.

The full data-processing addendum is part of your seller agreement.

## What customers can do

Customers control their own data. In their account, they can:

- See what brands they've bought from (always).
- Delete their account.
- Withdraw marketing consent.
- Export their data.

When a customer deletes their account, we propagate a deletion request to you for any data you hold locally about them.

## Special cases

**Press orders / partner orders / brand founder's household orders.** We tag these; they look slightly different in your queue (see *03-vip-customer-handling.md* in the customer support section).

**Concierge-mediated orders** (where SCC concierge placed an order on behalf of a customer for gifting or wholesale-bridging). These have a small *concierge-mediated* tag; treat as standard orders.

**Account-level vs cart-level customers.** A signed-in customer is identified by account email. A guest customer is identified by checkout email. Guest customers may not show in your member search if they've never created an account.
