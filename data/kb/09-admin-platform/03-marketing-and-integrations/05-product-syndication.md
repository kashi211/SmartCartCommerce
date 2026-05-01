# Product Syndication

**Document type:** Brand-facing reference
**Owner:** Saket Panwar
**Last reviewed:** 14 March 2026

---

## What product syndication is

A "feed" — typically XML or CSV — that exports your product catalog to external platforms (Google Shopping, comparison engines, marketplaces) so customers can find your products outside SmartCartCommerce and click through to the SmartCartCommerce product page.

We support several syndication targets natively. Brands that want a custom feed can also generate one via our API.

*Marketing → Product Syndication.*

## Why we support it

Most brands on SmartCartCommerce see a meaningful share of customer acquisition through Google Shopping and similar surfaces. We don't want to be in the way of that. We do want the experience after the click to honor our editorial standards.

So: we power the feed; we make sure the SmartCartCommerce product page on the receiving end is well-described and trustworthy.

## Google Shopping

The most-used syndication target.

### Google Shopper Core Settings

*Marketing → Product Syndication → Google Shopping.*

| Setting | Editable |
|---|---|
| Feed enabled | Yes |
| Merchant Center account ID | Yes (required) |
| Feed currency | Auto from your default |
| Feed language | Auto |
| Default Google product category | Yes |
| Override product category | Per-product |
| Include out-of-stock items | Default off |
| Include made-to-order items | Default on, with availability="preorder" |

### Product Identifiers

GTIN, MPN, brand, item identifier — these go in the feed automatically. For products without GTIN (handmade unique pieces), we set `identifier_exists=false` per Google's spec.

### Shipping Fields

Google Shopping requires shipping cost. We compute and inject based on your shipping configuration. Multi-zone shipping is supported.

### Additional Attributes

Color, material, size, gender (where applicable), age group (where applicable). Mapped from your product attributes. You can override per-product.

### Adwords

Auto-tagging for AdWords / Google Ads campaigns: enabled by default, populates the `gclid` parameter on click-through. Required if you run Google Shopping ads.

### Product Selection

Choose which products go in the feed:

- All Live products (default).
- A specific category.
- A saved Refined Search.
- Manual selection.

Most brands run "All Live" — the goal of the feed is broad reach.

### Pick Up Data Feeds

Google fetches the feed at a URL we provide (signed, brand-specific). Default fetch cadence is daily. You can also push a manual update if you've made significant changes.

## ChannelAdvisor

For brands using ChannelAdvisor to manage marketplace presence beyond Google. *Product Syndication → ChannelAdvisor.*

### ChannelAdvisor Settings

OAuth-based connection. Once connected, settings include feed format, currency, primary category mapping, and the ChannelAdvisor account ID.

### Product Selection

Same as Google Shopping. ChannelAdvisor users typically curate a narrower selection rather than syndicating everything.

### Pick Up

ChannelAdvisor pulls; same signed-URL pattern as Google.

## SingleFeed

Lower volume, but still in use. Same shape: settings, product selection, pick-up.

### Custom Details

SingleFeed supports custom fields beyond the standard set; you can map up to 10 custom attributes to SingleFeed columns.

## Other syndication targets

Brands occasionally ask about Pinterest, Meta Catalog, Bing Shopping. We don't have native integrations for these (yet). Workarounds:

- Generate a custom feed via *Custom Feed* (URL-based, JSON or CSV) and configure in the destination platform.
- Use ChannelAdvisor as a hub.

A native Pinterest integration is on our 2026 roadmap.

## What we don't syndicate

- Out-of-stock items by default (you can override).
- Final-sale or end-of-edition items unless explicitly included.
- Custom commission products.
- Editorial-only items (members-only).

## Performance

Feed generation runs every 4 hours during business hours, every 12 hours otherwise. A manual *Refresh feed* button forces an immediate regeneration; useful when you've just launched a new product and want it picked up faster.

Feed health metrics are reported at *Product Syndication → Reports*: feed errors (rejected products), CTR by destination, effective cost per acquisition (where ad spend is connected via Google Ads).

## Compliance

Feed content must accurately match the live product page. Discrepancies (price drift, availability mismatch, category mis-tag) are caught by Google and similar; they will suspend the feed if too many discrepancies accumulate. The platform monitors feed health and alerts you if the suspension risk rises.
