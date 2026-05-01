# Reviews & Ratings System

**Document type:** Feature documentation + policy
**Owner:** Saket Panwar
**Last reviewed:** 11 March 2026

---

## What we publish, and why

We publish customer reviews on every product. We require them to be from verified buyers. We display them honestly — including critical reviews. We never delete a critical review for being critical.

Reviews are essential to a marketplace's trust. Faking them, hiding them, or weighting them dishonestly is the most common way platforms erode trust. We are explicit about how we handle each.

## Verified buyer requirement

Reviews can only be submitted by customers who have purchased the product on SmartCartCommerce. We do not accept "verified by description" — i.e., reviews from people who say they own the item but bought it elsewhere.

Verification is automatic from the order record.

## Submission window

We email customers asking for a review 14 days after delivery (after they've had time with the piece). The email is a single email; we do not nag. Customers can review any time after delivery, including months later.

## Rating dimensions

Customers rate on:

- **Overall quality** — 1-5.
- **Fit / size accuracy** (apparel, footwear, jewelry rings).
- **Color accuracy** (anything color-stated).
- **As-described** — does the piece match the listing?
- **Optional written review.**

Average rating shown on product page is overall quality, with side-distributions on the other dimensions.

## Star distribution

We show the full 1-5 distribution, not just the average. A 4.6 average from 200 reviews looks different from a 4.6 average from a polarized set; we let the customer see the shape.

## Display order

Most recent first by default. Customers can sort by *Most helpful* (community-voted), *Critical first*, *Verified Circle members*, or *By star rating*.

We do NOT sort by "most positive" by default. We do not hide critical reviews behind a tab.

## Length and quality

We don't require minimum length. A two-line review like "Bigger than I expected, beautiful color, would buy again" is fine. We don't reward longer reviews algorithmically.

We do flag spam, generic boilerplate, and AI-generated text where we detect it (we have an internal classifier; about 0.4% of submissions are flagged).

## Removing a review

We remove reviews only for these reasons:

1. **Personally identifying** content beyond the customer's own first name.
2. **Defamatory or factually false** statements (with a high bar for "factually false").
3. **Review of a different item** (mistaken submission).
4. **Hate speech or slur language.**
5. **Confidential or off-limits content** — e.g., revealing concierge conversations, internal pricing, or third-party brand information.
6. **Spam, automated content, or paid review fraud.**

We do NOT remove a review for being negative. We do not remove a review at the brand's request unless one of the above applies.

When we remove a review, the customer is notified by email with the reason. They can appeal.

## Brand replies

Brands can reply to reviews on their products. Replies are visible publicly. Brand replies are subject to the same standards as customer reviews: no personally identifying content, no offensive language.

We require brands to respond to critical reviews within 14 days where the review surfaces a substantive product issue. We do not require boilerplate "we're sorry to hear that" replies; we'd rather brands stay quiet than spam a vapid response.

## Review incentives

We do NOT pay for reviews. We do not give discounts in exchange for reviews. We do not feature "incentivized review" disclosures because we do not have any.

## Review-bombing protection

If a product receives a sudden cluster of reviews from accounts with no purchase history (this would be rare given our verification, but it has happened with shared-link campaigns), our trust system flags and pauses display until investigation completes.

We are conservative — false positives leave reviews briefly hidden until human review confirms; false negatives let a manipulated review through.

## How brands feel about it

A meaningful population of brands joining SmartCartCommerce are nervous about reviews — most of them coming from boutique-only or DTC backgrounds. We hear two complaints in the first year:

1. "A 4-star review without a written reason is worse than no review."
2. "A customer returned, then left a 2-star review."

For (1), we acknowledge the problem and have started prompting customers for context on 4-star and below ratings. We do not require it.

For (2), we believe a returner has every right to review. The customer experienced the piece, even briefly. We do, however, weight returns alongside written feedback when surfacing patterns to brands.

## Customer feedback patterns

A pattern across many reviews on a single SKU is more useful than any individual review. We surface SKU-level patterns to brands monthly. Patterns also feed into editorial decisions — a recurring fit comment can prompt us to revise the product page's sizing translation.

## Public summary

Each product page now includes a one-paragraph summary of customer feedback, written by editorial in our voice. The summary is updated quarterly and is sourced from review content with attribution where direct quotes are used. A quote in the summary requires the reviewer's consent (we ask).

## Honest aggregate

If a product has 4.2 stars over 80 reviews and the score is being slowly dragged down by a known issue (fit running small, say), the product page says so directly. We don't hide it behind a 4.2 number.
