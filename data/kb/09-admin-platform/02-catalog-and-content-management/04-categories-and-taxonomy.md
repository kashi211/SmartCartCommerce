# Categories & Taxonomy

**Document type:** Brand-facing reference
**Owner:** Saket Panwar
**Last reviewed:** 04 March 2026

---

## How categories work on SmartCartCommerce

There are two layers of categorization on the platform, and they do different jobs.

**Marketplace taxonomy (platform-level).** The five top-level verticals — Fashion, Home & Living, Beauty & Wellness, Artisan Food & Beverage, Fine Jewelry & Watches — and their sub-categories. Set by us. Used for marketplace navigation, search facets, and editorial. You don't manage these.

**Brand-page taxonomy (brand-level).** The categories you create within your own brand page (e.g., "Knitwear," "Outerwear," "Archive sale"). Used for brand-page navigation. You manage these freely.

Most brands have between 3 and 12 brand-page categories. We do not enforce a maximum but we discourage over-categorization — it creates a fragmented brand-page that is harder to browse than a longer, considered list.

## Managing brand-page categories

*Catalog → Categories.*

### Each category has

- **Name** — the label customers see.
- **Slug** — the URL fragment. Auto-generated from the name; editable. Once set and indexed, changes generate a 301 redirect to the new URL automatically.
- **Description** — optional one-paragraph editorial blurb shown at the top of the category page.
- **Display order** — drag to reorder.
- **Cover image** — optional; displayed on the category card.
- **Filters** — which attributes are shown as filters on this category page (color, size, material, price).
- **Sort default** — Featured, Newest, Price ascending, Price descending. Featured is the editorial sort if set, otherwise Newest.
- **Status** — Live or Hidden.

### Adding products to a category

Two ways:

- From a category: click *Add products*, multi-select.
- From a product: edit, set categories. A product can be in multiple categories.

### Bulk import categories

For large taxonomies coming from another platform, *Categories → Import* takes a CSV (parent, child, slug, description). Same dry-run/preview pattern as product import.

### Category export

CSV of your categories with metadata. Useful for backup and for bulk renaming via spreadsheet edit + re-import.

## Category Filters

A separate panel at *Catalog → Categories → Filters*. This is where you tell the platform which product attributes should appear as filter chips on each category page.

For a knitwear category you might enable: size, color, material, price. For a candle category you might enable: scent family, size, vessel material. The filter list is constrained to the attributes your products actually have — if no product has *gender* tagged, *gender* won't appear as a filter even if you enable it.

Filters are shown in a fixed order on customer-facing pages (price first, then size, then most-faceted attribute). You don't reorder filters; we found that brands and customers disagree, and a consistent platform-wide order outperforms customer-by-customer customization.

## Category Import

`category, parent, slug, description, sort_default, filters` — the typical CSV columns. Up to 200 categories per import, sync; more goes async.

A common pattern: bulk-rename a top-level category by exporting, editing, and re-importing.

## Category Export

CSV of your categories with metadata: name, slug, parent, status, product count, last-updated. Useful as a backup before any sweeping change.

## Editorial categories (platform-level)

In addition to your brand-page categories, our editorial team curates *editorial collections* — themed groupings that span brands. Examples have included *Things made of brass*, *A small wardrobe*, *Letters and Light*. Your products may be selected by editorial for these collections. You see when this happens (a notification) and can request inclusion with a brief, but selection is editorial.

You cannot create editorial-style cross-brand collections from your console. Those are curated by our editorial team.

## SEO considerations

Each category page has a meta title and meta description. Defaults are auto-generated; you can override at *Categories → SEO*. We do not allow keyword-stuffed titles ("Best, top, premium, luxury linen tunics 2026") — our editorial guidelines apply to category pages, just as they apply to product pages.

Slug changes generate 301 redirects automatically. Old URLs continue to work indefinitely; we don't delete redirect entries.

## Limits

- 100 brand-page categories per brand.
- Three levels of nesting (parent → child → grandchild). Deeper structures degrade browsing experience.
- A product can be in up to 8 categories. More than that suggests the categorization is over-fragmented.

## Common questions

**"Can I add a category that spans multiple brands?"** No, that's an editorial collection, and editorial creates those.

**"Why doesn't my new category appear on customer-facing pages?"** Status is probably Hidden, or it has zero products in Live status. A category with no live products is hidden automatically.

**"Can I A/B test category sort order?"** No. The platform doesn't run brand-level A/B tests on customer-facing surfaces. We tested it; it created inconsistent customer experiences without proportional benefit.
