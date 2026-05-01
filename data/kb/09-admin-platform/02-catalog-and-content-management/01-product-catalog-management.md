# Product Catalog Management

**Document type:** Brand-facing reference
**Owner:** Saket Panwar
**Last reviewed:** 12 March 2026

---

## Where the catalog lives

Your catalog is the heart of your work on SmartCartCommerce. It is managed at *Catalog → Products* in the Admin Console.

Three primary views:

- **All Products** — every product you have, regardless of status.
- **Products by Category** — filtered by your brand-page categories.
- **Pending Review** — products our editorial team is reviewing or has questions about.

## What a product record contains

| Field group | What it covers |
|---|---|
| Identity | SKU, name, brand-internal product code, edition number (if applicable) |
| Description | Title, primary description, materials, care, sizing |
| Origin | Maker name (where different from brand), region, year of production |
| Pricing | Retail price, brand cost (private), tax category, MSRP comparison (rarely used) |
| Inventory | On-hand count, on-order, made-to-order lead time, edition ceiling |
| Imagery | Primary image, supplementary images, alt text, attribution |
| Status | Draft, Pending review, Live, Paused, Archived |
| Metadata | Created date, last updated, last editorial review, tags |
| Sustainability | Recycled-content %, repair path, take-back eligibility |

Product copy is collaboratively maintained: you submit; our editorial team rewrites for our voice; you sign off before publish (see *04-seller-operations/04-photography-and-listing-standards.md*).

## Statuses

- **Draft.** Visible only to your team. Use for in-progress listings.
- **Pending review.** Submitted to editorial; not customer-visible.
- **Live.** Visible to customers; orderable.
- **Paused.** Customer-visible as "currently unavailable"; not orderable. Useful for temporary stockouts where you want to keep the page indexed.
- **Archived.** Not customer-visible; URL returns 410 (gone). Use for end-of-edition pieces.

A product can move between statuses via *Bulk actions* on any list view.

## Search

The product list has a fast search bar at the top:

- Search by SKU, title, internal code, or any text in the description.
- Filter by status, category, price range, inventory level, last-updated window.
- Save a filter set as a named view (per-team-member).

For text-content search across the whole catalog (e.g., "find every product mentioning hand-thrown"), use *GREP* (see *01-dashboard-and-store-operations/03-grep-and-diff-tools.md*).

## Refined Search

A two-pane search builder for complex queries: combine multiple criteria with AND/OR logic, save as a smart list, share with teammates. Useful when you regularly need to surface, e.g., "all knitwear under $200 with stock between 5 and 25." Less than 10% of brands use Refined Search; the basic search is enough for most.

## Vendors

Some brands work with multiple makers and want to track which vendor produced which SKU. *Catalog → Vendors* lets you maintain a list and tag products. Vendor data is private to your brand (we don't expose it on customer-facing pages unless you opt to). It surfaces internally in your inventory reports and audit log.

## Bulk operations

From any list view: select products, then *Bulk actions*. Available actions:

- Change status.
- Adjust price (absolute or percentage).
- Add/remove tags.
- Move between categories.
- Apply a sale price (subject to platform sale rules — note that SmartCartCommerce does not surface storewide sales to customers).
- Export selection to CSV.

Bulk actions over 200 records run asynchronously; you'll get a completion notification.

## Ratings and curation flag

Each product has an internal *curation tier* set by our team during onboarding and re-reviewed at the annual brand check-in. Tiers are:

- **A — flagship.** Shown prominently in editorial; eligible for journal features.
- **B — core.** Standard merchandising weight.
- **C — secondary.** Lower in default sort; not surfaced in editorial unless specifically called.

You see the tier on each product page; you cannot change it. Conversations about tier are part of QBRs.

## Review and Q&A management

Reviews and Q&A are surfaced in the catalog views. Reviews left in the last 7 days that haven't received a brand reply are flagged amber. Q&A questions older than 5 days without a reply are flagged red. See *05-reviews-and-qa-management.md* for the full review tooling.

## Limits

- 50,000 products per brand. We have not seen a brand approach this; flag your account lead if you might.
- 50 images per product, 6 MB each.
- 10,000 characters per description; 800 per care section; 600 per origin.
- 200 SKUs per bulk import (synchronous); larger imports run async.

## Common questions

**"Why is my product in Pending Review?"** Editorial flagged something — usually a missing detail, an unclear sourcing claim, or copy that needs a rewrite. Click the product to see the editor's note.

**"Can I bulk-import products from another platform?"** Yes — see *03-product-import-export.md*.

**"My product is live but I can't find it in customer-facing search."** This usually means search indexing is still in progress (5-minute lag) or the product is paused. If neither, contact your account lead.
