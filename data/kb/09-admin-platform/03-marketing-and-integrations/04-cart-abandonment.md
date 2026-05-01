# Cart Abandonment

**Document type:** Brand-facing reference + platform standard
**Owner:** Saket Panwar
**Last reviewed:** 04 March 2026

---

## What we mean

A "cart abandonment" event happens when a customer adds an item to cart, begins checkout, and does not complete. SmartCartCommerce surfaces this as a workflow brands can act on — within constraints we set deliberately to keep the marketplace feeling considered, not pushy.

*Marketing → Cart Abandonment.*

## What we send by default

For all signed-in customers who consent to marketing:

- **Reminder 1**, sent 4 hours after abandonment. Light tone — *"You left a piece in your cart. We held it for you for the next 24 hours."* No discount.
- **Reminder 2**, sent 24 hours later if still incomplete. Slightly different framing — *"We're about to release the items. Last note from us."* No discount.
- **No further follow-ups.**

We send a maximum of two reminders. We do not chase customers indefinitely. We do not send reminder cadences with discounts that escalate over time — both because we do not run sales generally, and because the cadence pattern feels manipulative.

Reminders ship via the customer's preferred email channel (the one tied to their account). Each contains the cart link with a session token (`{{session_link}}`) that re-hydrates the cart.

## Brand customization

Brands can customize the email content within constraints. *Cart Abandonment → Emails.*

### Current Emails Table

Shows your current Reminder 1 and Reminder 2. You see the platform default; you can clone and customize.

Editable: subject line, body copy, CTA label, signature.
Not editable: timing (4h / 24h), the existence of the session-link variable, the unsubscribe footer.

### Add new emails

You can add a third reminder if you want — *Cart Abandonment → Add* — but we strongly discourage it. Cap the cadence at two unless you have a strong reason. Brands that run three or more reminders see lower repeat-customer rates; we have measured this.

### Constraints

- No discount codes in the body. (We do not run sales; the cart abandonment surface is not the place to start.)
- No urgency cues ("about to expire," "last chance," "act now"). Editorial reviews any custom email and reverts copy violating this.
- No A/B testing across customers. (Inconsistent customer experience; not worth the lift.)

## Reporting

Two report surfaces.

### Graphs

*Cart Abandonment → Reports → Graphs.*

Trend lines over time:

- Cart-abandonment rate (carts started → carts completed).
- Recovery rate (cart-abandoned → completed-after-reminder).
- Recovered revenue.
- By time-of-day, day-of-week, and customer cohort.

### Report Data

Tabular detail:

- Per-cart records (with customer ID, cart value, items, time of abandonment, recovered or not).
- Aggregations by week, month, quarter.

Exportable to CSV.

## Options

*Cart Abandonment → Options.*

| Setting | Default | Editable |
|---|---|---|
| Send reminders | On | Yes |
| Number of reminders | 2 | Yes (range 0–3) |
| Reminder 1 delay | 4 hours | Yes (range 1–24h) |
| Reminder 2 delay (after R1) | 24 hours | Yes (range 12–72h) |
| Reminder 3 delay (after R2) | Off | Yes |
| Discount allowed in reminder | No | Platform-level (no) |
| Subject-line urgency | No | Platform-level (no) |
| Personalize with customer first name | Yes | Yes |
| Include cart total | Yes | Yes |
| Include item images | Yes | Yes |
| Include alternates | No | Yes (but discouraged — "you might also like" cheapens the message) |

## What works on this platform

A few observations from running this for years:

- The most successful cart-abandonment program for our customer base is *quiet, considered, and short*. Two emails. No discount. Brand-voice copy. Recovery rate around 18%.
- Brands that deviate (longer cadence, more emails, discount escalation) see initial uplift in recovered revenue but lower 90-day repeat purchase rate. The math comes out negative once you measure both.
- Customers in our customer base tell us in surveys they appreciate not being chased. We optimize for that.

## What customers see

A customer who has abandoned a cart can also see the cart at any time when signed in to SmartCartCommerce — it persists for 30 days. Many customers come back on their own without needing a reminder.

## Privacy

Cart abandonment emails are sent only to customers with an account who have consented to marketing. Anonymous browsing carts do not generate emails (we don't have an address to send to). We do not capture-and-send to the customer's email if they entered it at checkout but didn't complete; that pattern, while legal in some markets, isn't how we want to behave.
