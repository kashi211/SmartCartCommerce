# Marketplace Search & Discovery

**Document type:** Feature documentation (technical + editorial)
**Owner:** Saket Panwar
**Last reviewed:** 27 February 2026

---

## How search works at SmartCartCommerce

Search at SmartCartCommerce is a hybrid system: a vector retrieval layer over the catalog, a re-ranking layer that incorporates editorial weights, and a small "human override" layer where curatorial pinning can elevate or suppress specific results.

It is not a pay-to-rank system. Brands cannot pay to appear higher. Algorithmic placement is editorial first, behavioral second.

## What customers can search for

We support four search modes:

1. **Keyword** — basic text search. Most common.
2. **Conceptual** — natural language queries like *something blue and a little melancholy* or *a candle that smells like a closed bookshop*.
3. **Filters** — category, brand, material, color family, price range, size, certification, region of origin.
4. **Visual** — upload an image, find pieces in the catalog with similar character. Beta.

Most customers use a mix. The search bar is unified across modes.

## What the system does, in plain language

When a customer types a query, we:

1. Embed the query into a vector representation using a model fine-tuned on our editorial copy.
2. Retrieve the top several hundred candidate items by vector similarity over our product database.
3. Re-rank candidates using:
   - Editorial weight (curated weights set by category curators).
   - Inventory availability (out-of-stock items deprioritized but not hidden).
   - Brand rotation (so a single brand doesn't dominate the page).
   - Customer's saved items, sizing, and preferences (only for signed-in customers, only if they've allowed it).
4. Apply human pins (rare) — a curator can lock a specific item or brand into a top position for a defined period.
5. Return the result, clearly grouped: top picks, additional candidates, suggested filters.

We make explainability available: any result can show *Why this result?* with a brief explanation.

## What the system does NOT do

- Promote items based on commission rate.
- Promote items because the brand paid for placement.
- Suppress items because of a brand's negotiating position.
- Hide a brand because of a single low-rated review.

We are explicit about all of this — both internally and in our public help center.

## Editorial weights

Each category has approximately 30-60 editorial weights set by the curator: things like "preference for hand-thrown over slipcast in stoneware," "preference for stated provenance in olive oil," "preference for in-edition over reissue in jewelry."

Editorial weights are reviewed quarterly. They are documented in a curators-only handbook (separate doc). We do not publish the weights publicly because doing so would invite gaming, but the principles are public.

## Personalization

For signed-in customers who have opted in:

- Sizing profile filters out items unlikely to fit.
- Brand affinity (purchases, saves) lightly tunes ranking.
- Stated dislikes (added in account settings: "no rose," "no oversized fit") filter accordingly.

For not-signed-in or opted-out customers, search returns un-personalized results.

We do not use third-party data, browsing on other sites, or any cross-site identifier.

## Out-of-stock

Out-of-stock items are not hidden. They are returned with a clear *Out of stock* label and (where applicable) a *Notify me when back* button. We have learned that hiding out-of-stock confuses customers more than it helps.

## "Inspired by" and lookalikes

Some marketplaces surface similar items as alternatives ("you might also like…"). We do this minimally and editorially — at most 3 alternates, written in by editorial, never algorithmically generated for a product page.

The reason: surfacing 12 algorithmic alternates next to a hand-thrown ceramic bowl by the ceramicist is not respectful of the ceramicist.

## Search analytics

We track query volume, zero-result queries (a quality signal — if customers are searching for things we don't have, that's interesting), result-position click distribution, and conversion by query category.

We do NOT track individual customer query history for advertising purposes. Query history is retained for 13 months for the customer's own benefit (autosuggest, recent searches).

## Quality bar for new search

A new search feature has to clear three hurdles before going live:

1. Editorial review confirms the feature respects curatorial integrity.
2. A user test panel (~30 customers, mix of Circle and non-Circle) finds the feature improves their decision-making.
3. The change does not increase pressure on customers to buy — measured with a soft signal, but real.

We have killed two search features in development that passed (1) and (2) but failed (3).

## Voice and visual search

Voice search is rolled out on mobile only. Privacy: audio is processed on-device where the OS permits; transcribed text is searched normally.

Visual search (upload an image, find similar) is in beta. We index our catalog using image embeddings. We never store user-uploaded query images longer than the session.

## What the search does well

Conceptual queries — *a coat that feels like a quiet morning*, *teaware for a small apartment* — are where our system shines compared to keyword-only competitors. This is because our editorial copy is rich, hand-written, and the embeddings reflect that.

## What it doesn't yet do

Mood-based search across categories ("things I'd give to a friend who just moved cities") needs more work. Current approach is to fall back to a curated gift guide, not to attempt the full inferential leap. Roadmap.
