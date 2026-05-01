# Incentive Programs — Affiliate, Refer-a-Friend, E-Party

**Document type:** Brand-facing reference + platform standard
**Owner:** Saket Panwar
**Last reviewed:** 18 February 2026

---

## What's available

SmartCartCommerce supports three incentive programs at the platform level. Brands can opt in or out per program; participation is editorial in every case (we want to protect the customer experience and brand integrity).

*Marketing → Incentive Programs.*

## Affiliate Program

A platform-wide affiliate program where approved publishers earn a commission for orders driven from their tracked links.

### How it works at a high level

- A publisher (a writer, a content creator, a publication) applies through our affiliate manager.
- We approve based on audience fit and content quality. We do not approve coupon sites, deal aggregators, or sub-affiliate networks.
- Approved publishers get a tracking link for the marketplace (or for a specific brand or category).
- Orders attributed to the link earn the publisher a commission.

### Brand participation

Brands can opt out of the affiliate program entirely (no orders for your brand earn affiliate commissions; your products are excluded from publisher feeds).

Brands can also set their **affiliate commission rate** within a range. Higher rates surface your products to publishers more prominently. The default is the platform-standard rate; we recommend you don't change it without a specific reason.

### What we won't allow

- Coupon-site affiliates. We don't run sales, and we don't allow back-channel discount distribution via affiliate.
- Toolbar-injection affiliates. They hijack last-click attribution and are bad citizens.
- Sub-affiliate networks. We require direct relationships.
- Affiliate-driven email campaigns to lists not opted-in to that affiliate's marketing.

### Reporting

*Marketing → Incentive Programs → Affiliate.*

Per-brand: orders attributed, attributed revenue, commission paid, top publishers driving sales, conversion rate. Platform-level rollup is visible to us; we don't share other brands' figures with you.

## Refer-a-Friend

A structured program where existing customers refer new customers and both receive credit.

### How it works

- Customer A shares their referral link.
- Customer B clicks, signs up, and makes a first purchase above a threshold (default $75).
- Both receive a $25 credit applied to their next order.

The credit is funded by SmartCartCommerce platform-level. Brands do not directly fund refer-a-friend rewards. The platform absorbs the cost as a customer-acquisition expense.

### Brand visibility

Brands cannot opt out of refer-a-friend (it's a platform-wide program). Brands see referred-customer flags in their order data and can view referral-driven revenue in *Analytics*.

### Constraints

- One referral credit per referrer per quarter, capped at $200/year.
- Referrals from existing accounts to existing accounts don't count.
- Self-referral attempts (same household, same payment method, same address) flagged and rejected.

## E-Party

A small program for in-person and event-based selling. A host signs up, hosts an event (online or in-person), invites guests, and earns commission on guest purchases during the event window.

### How it works

- Host applies through their account.
- We approve (low bar; this is mostly customer-driven).
- Host receives a hosted-event link with a custom landing page.
- Guests purchase through the link during a 7-day window.
- Host earns 8% on guest purchases.

### Brand participation

Brands cannot opt out. The program is platform-funded.

### What it's for

E-Party works well for niche product categories (specialty cookware, jewelry collections, fragrance discovery) and for community-based sellers (a yoga teacher hosting a wellness-product event for her studio). It does not work well for general e-commerce or large social media followings — those are served by the affiliate program.

## E-Party Options

A few configuration items at *Marketing → Incentive Programs → E-Party*:

- **Minimum event size** for approval (default 10 invitees).
- **Event window length** (default 7 days; can extend to 14 for special events).
- **Commission tier** (default 8%; not currently configurable per brand).

## Cross-program interactions

A single order can only attribute to one program. Priority order: refer-a-friend (if applicable), then affiliate, then E-Party. Customer purchasing through their own affiliate link is rejected; we detect and decline.

## Compliance

All three programs require:

- Disclosure on publisher / host side, per FTC, ASA, and local equivalents.
- Tax-form (1099-K equivalent) for publishers / hosts above the relevant threshold in their jurisdiction.
- Anti-fraud screening (we run it; brands don't).

## Why we run it this way

A few principles:

- Editorial integrity is non-negotiable. We do not let publishers post sponsored content as editorial coverage. Publisher links are tracked; the content stays publisher-owned.
- The customer experience is consistent. A customer arriving via affiliate sees the same SmartCartCommerce we always run. No ambush discounts, no different-than-baseline pricing, no upsell engines.
- The brand experience is fair. We don't let one brand crowd out others by paying higher affiliate rates beyond platform-set bands.

## What you can NOT do

- Run your own affiliate program inside SmartCartCommerce (you can run one outside, on your own DTC site).
- Distribute referral codes for off-platform redemption.
- Coordinate with a specific publisher to favor your brand.
