# Wishlist & Sharing

**Document type:** Feature documentation
**Owner:** Saket Panwar
**Last reviewed:** 03 March 2026

---

## What it is

Wishlist is the place a SmartCartCommerce customer keeps items they're considering, items they want to remember, and items they hope to receive as gifts. Sharing makes a wishlist visible to specific people — partner, parent, friend, household — without making it public.

Two principles guided the design:

1. The wishlist is private by default. Public lists are not the use case here; we are not a wedding registry or a social-shopping product.
2. The wishlist is not a sales pressure surface. We do not ping users about saved items unless they configure us to.

## How it works

Each customer has one main wishlist plus the ability to create up to 12 named lists (e.g., "Apartment refresh," "Summer travel," "Mum's birthday").

Items are added with a single click from any product page. Optional metadata: size preference, note to self, priority flag.

Items in the wishlist are saved across devices and persist indefinitely. We do not auto-remove old items. We do quietly indicate when an item is no longer available, with a note about whether it might restock.

## Sharing modes

| Mode | Visibility | Use case |
|---|---|---|
| Private | Only the customer | Default |
| Specific people | Named recipients only, by email | Gifting, household coordination |
| Link-only | Anyone with the link | Wedding registry, milestone gifting |
| Open profile | Anyone on SmartCartCommerce | Reserved — see below |

Each list has its own visibility setting. A customer can have a private "personal" list and a link-only "wedding" list at the same time.

## Recipient experience

When a customer shares a list with specific recipients, those recipients see:

- The list, with prices.
- A "Mark as bought" or "Reserve to buy" status flag.
- The original customer's name, but no other account data.

When an item is reserved or bought, the original customer does NOT see it on their list (so the surprise is preserved). They see only how many items remain unreserved.

## Notifications

We do not send "your wishlist item is going fast!" alerts. We do not send "complete your wishlist!" prompts.

We DO send (only if the user opts in):

- Restock alerts on a specific saved item that came back to stock.
- Year-end "your wishlist" summary in mid-November (gifting season prep), once.

That's the whole notification surface. We've heard from customers that this is unusually quiet for an e-commerce wishlist; that is the design.

## Open profile (uncommon)

A small population of customers — typically those building a known collection — opt to make a list public on a profile page. The profile page is opt-in, plain, and does not link to social accounts. We surface it only to customers who explicitly seek it.

We do not gamify or rank profiles. No follower counts, no "top wishers."

## Concierge integration

A Circle member's concierge can view their wishlist (with permission). This is useful for restock outreach, gift suggestions, and stylist briefs.

The customer can revoke this permission at any time. Default is permission granted; we are explicit about it during onboarding.

## Migrating between accounts

A wishlist can be exported as JSON or CSV at any time from the account page. We don't lock data in.

## Privacy commitment

Wishlists are not shared with brands. We do not surface "X customers have saved this product" counts on product pages. We do not use wishlists to build advertising audiences (we don't do third-party advertising at all).

Wishlist data informs internal demand forecasting in aggregate ("12,400 customers have saved items from this brand"), never at the individual level for any external party.

## Things we considered and rejected

A few ideas we tested or considered and decided against:

- **Social sharing buttons** (Facebook, X, Pinterest). The composition felt wrong on the platform; very few customers used them in tests.
- **Friends-of-SmartCartCommerce directory** allowing customers to follow each other. Solved a small problem and created larger ones around privacy, gaming, and creep-out factor.
- **Rich gifting layer** with budget pooling for group gifts. Operationally heavy; we punted to Q4 2026 evaluation.
- **AI auto-curation** that adds items to the wishlist based on browse behavior. Felt overreaching. Skipped.

## Coming next

A "shared list" mode for households, where two or more accounts can edit the same list. Limited to verified-shared addresses. Beta with Circle in May.
