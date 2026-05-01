# Personal Stylist

**Document type:** Feature documentation (customer-facing + internal)
**Owner:** Saket Panwar
**Last reviewed:** 09 March 2026
**Status:** Generally available; iterating on outputs.

---

## What it is

Personal Stylist is our human-led, software-assisted styling service. A customer can book a session in three formats:

1. **Async chat** — exchange messages over a few days with a styling lead. Most popular.
2. **Live video** (45 min) — for wardrobe-building, gifting, or major purchases.
3. **In-showroom** (90 min) — New York, Los Angeles, London, Tokyo. Free for Circle, $80 for non-members (credited toward purchase).

The output is a curated edit of items from across SmartCartCommerce's roster, considered together.

It is NOT a recommendation engine output. A human writes the edit. Software helps the human do the work faster.

## Who it's for

Originally built for Circle members; opened to all customers in 2024. Most useful for:

- Customers building a long-term wardrobe.
- Customers planning for a specific occasion or trip.
- Customers who want gifts curated for a specific recipient.
- Customers expanding into a new category they don't know well (a fashion regular exploring jewelry, for instance).

It is less useful for customers who already know exactly what they want.

## How a session works

For an async chat (the most common):

1. Customer books at *smartcartcommerce.com/stylist*. Brief intake form: occasion, sizes, palette, budget range, brands they already own, brands they avoid.
2. Within 24 hours, a styling lead replies with five clarifying questions and an initial mood — three or four ideas to direct the work.
3. Customer reacts; styling lead refines; they go back and forth typically 2-4 rounds.
4. Final edit delivered: 8-12 items, with a written paragraph for each explaining why it's in the edit, and 2-3 alternates per role.
5. Customer browses the edit at their own pace. Items are reserved for 48 hours from edit delivery.

Average end-to-end: 3-5 days. Faster paths exist for time-constrained cases.

## How software helps

A retrieval system pulls candidate items from across the platform based on the brief. The styling lead reviews, rejects most, refines the search, and curates the final edit. The customer never sees the raw retrieval.

Inputs the system uses:

- Stated brief (intake form + chat).
- Customer's saved items, past purchases, return reasons.
- Sizing profile (where stored).
- Item compatibility data (what works with what, derived from styling team annotations).

Inputs the system does NOT use:

- Affiliate or commission optimization. The system surfaces items by fit-to-brief, not by margin.
- "Trending" or "popular" weighting beyond a low base rate to surface neglected work.

## Privacy

Stylist conversations are visible to the styling team and to your concierge (Circle members). They are not shared with brands except when the styling lead requests something specific from a brand on the customer's behalf.

We retain stylist conversations for 24 months for service continuity. Customers can delete the history from their account.

## What customers love

From feedback over 18 months:

- "Someone read the brief carefully" — most common comment.
- "Suggested things I wouldn't have found" — the discovery value.
- "Didn't try to upsell me" — we are explicit that the styling team is not measured on edit revenue.
- "Suggested NOT buying something" — the styling lead, occasionally, will tell a customer that a piece they're considering is wrong for them. This is a remarkable thing to hear from a retailer.

## What we have struggled with

- Throughput. The team is small; bookings sometimes wait 5-7 days during peak. We are growing the team.
- International sizing across brands. Even with our tools, it remains the most common reason an edit needs revision.
- Gifting briefs about people the customer doesn't know well. Not everyone can describe their nephew accurately enough for a stylist to land the gift. We have learned to ask better intake questions.

## Pricing

Free for Circle members. $80 per session for non-members, credited as $80 toward any purchase from the resulting edit (within 30 days). In-showroom is $120, similarly credited.

Gift sessions are billable to the gifter; the recipient receives the edit only and never sees pricing.

## Internal: how the team is run

Styling team is structured by category (fashion lead, home & living lead, gifting lead, jewelry/watch lead, beauty lead). Crossover briefs (most of them) are jointly handled.

We do not run quota or revenue targets on the styling team. We measure: customer satisfaction (target 4.7/5), revision rate (lower is better), time-to-first-edit (target < 3 days), and customer retention.

Styling leads come from boutique retail backgrounds, not from algorithmic-recommendations roles. The hiring profile matters.
