# Delete Store & Off-Boarding Data Handling

**Document type:** Brand-facing reference + compliance
**Owner:** Saket Panwar
**Last reviewed:** 21 February 2026

---

## What "delete store" means

A button at *Store → Operator Tools → Delete Store* that initiates the off-boarding of your brand from SmartCartCommerce. It is irreversible. We have built it deliberately to be hard to trigger by accident, and easy to recover from if you change your mind during the deletion window.

This is the brand-initiated counterpart to a platform-initiated off-boarding (see *04-seller-operations/06-performance-metrics-and-slas.md* for that path).

## Confirmation flow

Clicking *Delete Store* does NOT delete anything. It opens a multi-step confirmation:

1. **Reason.** A free-text field. We use this to learn; we do not contest it. Optional.
2. **Re-authentication.** You re-enter your password and 2FA code. The button is enabled only for the Owner.
3. **Type the brand name.** A literal type-the-name confirmation, the way GitHub asks before deleting a repository.
4. **Final confirmation.** A summary screen showing what will happen and on what schedule, plus a final *Begin deletion* button.

After step 4, we send a confirmation email to all brand admins and a notification to your account lead.

## Deletion schedule

Deletion is staged across **30 days**. During that time, the store is suspended (not visible to customers, not accepting orders) but data is retained. You can cancel at any time during the 30 days from *Store → Operator Tools → Restore Store*. The Owner can do it; no other role can.

After 30 days, deletion proceeds in order:

- **Day 30:** customer-visible surfaces removed (brand page, products, journal references soft-deleted).
- **Day 31–37:** payouts settled, financial reconciliation completed.
- **Day 38–60:** order history and customer data anonymized in line with privacy obligations.
- **Day 60:** brand record archived; recoverable only via a manual platform process (which we do not commit to performing).
- **Day 60 + 7 years:** records that we are legally required to retain (tax, regulatory) are purged.

We do not "soft-keep" your data after off-boarding for marketing or analytics purposes. We do not maintain a "former brands" directory.

## What stays, what goes

**Goes:** brand page, product listings, brand-supplied photography, brand-authored copy, integration tokens (revoked immediately at suspension), team members' Admin Console access.

**Stays (legally required, encrypted at rest):** order records (7 years for tax), payout records (7 years for accounting), regulatory disclosures, dispute records.

**Stays (customer-protective, anonymized):** review content remains on archived product pages where the customer chose to leave it, with the brand name and any maker reference removed.

## Customer communication

We do not send a "this brand has left" email to customers. We have considered it. We decided that for most customers a quiet wind-down is more respectful than a notification. Customers who explicitly subscribed to a delisted brand's restock alerts receive one email letting them know the brand has wound down and the alerts will stop.

The brand's editorial archive (any feature articles published while you were on the platform) remains available without commerce links, with a one-line note that the brand is no longer active on SmartCartCommerce. This honors past readers; it does not direct anyone away.

## Recurring orders, subscriptions, gift cards

If your brand had recurring orders or subscriptions in flight at the moment of deletion, those orders are honored. Specifically:

- Made-to-order pieces in production complete and ship.
- Subscription boxes including your work that have already shipped are not affected.
- Outstanding gift cards remain redeemable platform-wide; your delisted products simply become unavailable.

## Tax and 1099-K equivalents

We will issue your final tax document for the year of deletion in the normal cycle (early following year). For brands deleted mid-year, the document covers the partial year through your final payout.

## Why we built it this way

Two reasons. First: every off-boarding we have seen is a meaningful event for the people on the brand side (tired, frustrated, retiring, pivoting, sometimes celebrating). The flow respects that. We do not gamify the exit with a "before you go..." popup. Second: a quiet, well-scheduled wind-down protects customers, our concierge team, and your reputation as you transition.

## If you change your mind

Email *partners@smartcartcommerce.com* or your account lead. During the 30-day window, recovery is one click. After day 30, recovery is a conversation; we will try, but cannot guarantee.

## Related: terminating a single team member's access

Often what a brand wants is not "delete the store" but "an employee left and their access needs to end." That's a different flow at *Store → Team → Members → Revoke*. Use that, not deletion.
