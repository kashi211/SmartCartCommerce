# Customer & Program Reports

**Document type:** Brand-facing reference
**Owner:** Saket Panwar
**Last reviewed:** 14 March 2026

---

## Catalog Requests

*Analytics → Reports → Catalog Requests.*

For brands that produce a printed catalog and offer it via a request form on their brand page.

Metrics:

- Requests received per period.
- Requests fulfilled (you marked as shipped).
- Conversion to first purchase within 90 days.
- Geographic distribution of requesters.
- Source of request (brand-page form, generic form, in-person event).

Use cases: justifying the cost of catalog production, identifying high-value markets where you might invest more in physical mailings.

Most brands don't use catalog requests. The volume across the marketplace is low. Brands that do use them tend to be furniture and fine jewelry — the categories where a printed object is part of the consideration ritual.

## Incentive Programs

*Analytics → Reports → Incentive Programs.*

Performance of the platform-level incentive programs (affiliate, refer-a-friend, e-party) as they apply to your brand.

For each program:

- Orders attributed.
- Attributed revenue.
- Commission paid (where applicable).
- Effective cost per acquired customer.
- Repeat-rate of customers acquired through the program.

Useful for understanding which acquisition program is actually working for your customer mix. Common pattern: refer-a-friend has higher repeat rate than affiliate; affiliate has higher AOV; e-party drives stronger niche category performance.

## Inventory Notifications

*Analytics → Reports → Inventory Notifications.*

When customers ask to be notified when an out-of-stock item comes back, we capture that. The report shows:

- Notify-when-back signups by SKU.
- Conversion rate when the item restocks (signup → purchase).
- Average days from signup to restock.
- Cancellation rate (customer lost interest).

Use cases:

- Prioritize restocks. Items with 50+ notify signups are higher-priority than items with 2.
- Understand demand for end-of-edition pieces. Some pieces have more demand than your edition could meet.
- Identify mis-titled or mis-described products. If notify signups massively outperform original sales, the listing might be under-merchandised.

## Product Aging

*Analytics → Reports → Product Aging.*

How long products have been in their current state (live, paused, archived) and how that correlates with sales velocity.

Buckets:

- 0–30 days (new).
- 31–90 days.
- 91–180 days.
- 181–365 days.
- 365+ days.

For each bucket: count of products, units sold in the period, sell-through rate, sample of slow-movers.

Use case: identifying long-tail inventory that warrants either a re-merchandising effort, a sample sale (members-only), or archival.

## Wishlist Products

*Analytics → Reports → Wishlist Products.*

Your products that customers have saved to their wishlists, ranked by save count.

Metrics:

- Save count by SKU.
- Conversion to purchase (saves → orders).
- Save-to-purchase median lag in days.
- Save-without-purchase rate (savers who never bought).

Use cases:

- Identify aspirational items (high saves, low conversion). Customers want them but the price or moment isn't right.
- Identify pricing test candidates (high saves, low conversion + reasonable margin headroom).
- Inform restock decisions on saved items that are out of stock.

## Tell a Friend

*Analytics → Reports → Tell a Friend.*

A small, declining feature. Brands can enable a "tell a friend" link on product pages; customers can email a friend a product link.

Metrics:

- Send volume.
- Click-through rate from sent email.
- Conversion of recipients to first purchase.

We see decreasing usage of this feature; most customers share via screenshot or direct message instead. We're considering deprecation; will give 12 months' notice if we move that direction.

## Visits — by Wishlist (special report)

A cross-cut analytical view: visits to product pages where the customer also has the same product on a wishlist. Helps identify wishlist-to-purchase journeys vs. discovery journeys.

## Customer cohort analysis (in the API)

We don't surface a full cohort retention chart in the console. Brands that need it (typically larger brands with dedicated analytics function) pull the data via API and build their own. We're considering adding it to the console if demand grows.

## Reading these reports together

These reports work best read together. Examples:

- A high notify-when-back signup count + slow product aging suggests an inventory planning miss.
- A high wishlist save count + low conversion suggests a pricing or moment issue, not a desirability issue.
- A high catalog request count from a specific market + low conversion in that market suggests the catalog is reaching the wrong audience.

The reports give you the inputs. The reading is yours.
