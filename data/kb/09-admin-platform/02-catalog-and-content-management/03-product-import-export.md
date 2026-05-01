# Product Import & Export

**Document type:** Brand-facing reference
**Owner:** Saket Panwar
**Last reviewed:** 27 February 2026

---

## Why both exist

Brands move catalogs around: from a previous platform to ours during onboarding, from spreadsheet to system after a wholesale of stock from another maker, from our system to their accounting tool. Import and Export are the workhorse tools for those flows. They are not glamorous; they need to be reliable.

## Product Import

*Catalog → Products → Import.*

### Supported formats

- **CSV** — primary format, UTF-8 encoded.
- **XLSX** — accepted; we convert to CSV internally.
- **JSON** — accepted via API for programmatic imports.

Templates for each are available at the top of the import page. Use the template; don't invent your own column order.

### Required columns

| Column | Required | Notes |
|---|---|---|
| sku | Required | Must be unique within your brand |
| title | Required | 4–80 characters |
| description | Required | 20–10,000 characters |
| price | Required | Numeric, in your default currency |
| category | Required | Must match an existing category in your brand |
| inventory | Required (or "MTO") | Numeric on-hand count, or "MTO" for made-to-order |
| status | Optional | Draft / Live / Paused (default: Draft) |
| materials | Recommended | Comma-separated for multi-material |
| care | Recommended | Plain text |
| origin_country | Recommended | ISO 3166-1 alpha-2 (e.g., "PT") |
| ... | | Many more — see template |

### Import behavior

- **Dry run by default.** When you upload, we parse the file and show you a preview. You see exactly what will be created, updated, or rejected. Nothing is committed until you click *Apply*.
- **Atomic per row.** A malformed row is reported with line number and reason; other rows still apply.
- **Update vs create.** SKU collision = update; new SKU = create. We do not silently merge.
- **Soft delete.** A row with `_action: delete` archives the SKU rather than hard-deleting (recoverable for 30 days).
- **Async over 200 rows.** We notify you when complete.

### Common errors and how to read them

The most common ones:

- **"Unknown category"** — the category column references a category you haven't created. Create it first, then re-import.
- **"Currency mismatch"** — your default currency is EUR but the file has USD prices.
- **"Description too short"** — under 20 characters. Fill it in or leave blank to use a draft placeholder.
- **"Image URL unreachable"** — we tried to fetch the image and got a 404 or 403. Check the URL is publicly accessible.

### Importing images

Two patterns:

1. **Inline URLs.** Image columns hold publicly reachable URLs. We fetch and store. Useful when migrating from another platform.
2. **Pre-uploaded.** Upload images first via the Image Library, then reference by image name in the import.

For very large image sets, the Image Library batch upload is faster than inline URL fetching.

### Editorial review on import

When you import a new product (status = Live), we route it through editorial review just like a manual creation. Existing products updated via import skip editorial review for non-substantive changes (price, inventory) but trigger review for substantive ones (description, materials, origin claim).

## Product Export

*Catalog → Products → Export.*

### What you can export

- All products.
- A filtered list (use saved Refined Search).
- A single category.
- Selected products via multi-select.

### Formats

- **CSV** — most common, opens in Excel/Sheets.
- **XLSX** — for brands that prefer formatted columns.
- **JSON** — for downstream systems.

### What's included

By default, the export includes the full product record except internal-only fields (curation tier, editorial notes, your private cost). You can include these by checking *Include private fields*.

You can also choose to include or exclude:

- Inventory levels.
- Customer reviews (count and average; not full review text — that exports separately).
- Image URLs (we generate signed URLs valid for 14 days).
- Sales history (last N days, configurable up to 365).

### Privacy

The export is downloaded by you. Customer information is not included in product exports. To export customer information for your orders, see *05-orders-payments-shipping-tax/08-customer-and-member-management.md*.

## Migrating from another platform

Most onboarding migrations follow this pattern:

1. Export from your old platform in their native format.
2. Run our migration translator (we publish translators for Shopify, BigCommerce, WooCommerce, Squarespace, Wix, and a handful of bespoke systems). The translator converts to our import format.
3. Upload to our Import preview.
4. Review the preview carefully. Image fetching is the most common point of trouble; verify a sample.
5. Apply.
6. Editorial review handles the rest.

Your account lead and onboarding team will guide the migration. Average migration time for a 200-SKU brand: 2 weeks from first export to live. For a 5,000-SKU brand: 6–8 weeks, mostly because editorial review takes time and we won't rush it.

## Limits

- 200 rows synchronous import; larger is async.
- 50 MB file size for inline-URL imports.
- Image URLs must respond within 8 seconds; slower URLs are skipped with a warning.
- Exports up to 100,000 rows complete in under 60 seconds; beyond that, the export is generated asynchronously and emailed to you.
