# Design & Template Library

**Document type:** Brand-facing reference
**Owner:** Saket Panwar
**Last reviewed:** 18 February 2026

---

## What brands control

The marketplace storefront design is platform-managed. Brands cannot change the customer-facing look (typography, layout, color system, navigation). This is one of the strongest reasons SmartCartCommerce works as a curated boutique — customers know what to expect across every brand page.

Brands DO control:

- The brand-page hero (a single image and a short paragraph).
- The brand profile (a longer essay shown on a dedicated profile page; co-authored with our editorial team).
- Their image library and file library.
- Email templates for transactional and marketing emails sent under their name.
- Custom product forms (covered separately).
- Generic forms (e.g., a wholesale-application form, a custom-commission inquiry).

This document covers those surfaces.

## Template Library

*Design → Template Library.*

A library of editable templates for brand-controlled email and page surfaces. Each template has:

- **A purpose** (what it's for — e.g., "Order confirmation," "Restock alert," "Custom commission inquiry response").
- **A scope** (transactional, marketing, internal).
- **A variant tier** (Default = our writing, Customized = your version).
- **A preview** with sample data.

You start with our defaults — written by our editorial team. You can clone any default and customize it for your brand. The customized version replaces the default for your brand only.

### Editable surfaces

| Template | Editable? | Notes |
|---|---|---|
| Order confirmation | Limited | You can add a brand-side note; cannot change the operational content (totals, shipping, etc.) |
| Shipping notification | Limited | Same — brand-side note allowed |
| Delivery confirmation | Limited | Same |
| Return label issued | Read-only | Platform-managed |
| Refund issued | Read-only | Platform-managed |
| Restock alert | Editable | Subject and body |
| Made-to-order updates | Editable | "Production started," "Production complete" |
| Custom inquiry responses | Editable | For inquiries via your custom forms |
| Marketing emails (your tool) | Not in this library | Lives in your email-marketing integration |

### Template variables

Templates support a small set of variables in `{{variable}}` syntax:

- `{{customer_first_name}}` — uses the name the customer chose to display.
- `{{order_number}}`, `{{order_total}}`, `{{currency}}`.
- `{{tracking_url}}`, `{{tracking_number}}`, `{{carrier}}`.
- `{{product_title}}`, `{{product_url}}`, `{{product_image}}`.
- `{{brand_name}}`, `{{brand_email}}`, `{{brand_signature}}`.
- `{{session_link}}` — used for cart-restoration in cart abandonment emails (see *03-marketing-and-integrations/04-cart-abandonment.md*).

A complete variable list is in the template editor's right panel.

### Template Tags

Some templates use tags that map to UI elements (a CTA button, a divider, a quote block). These render consistently across email clients and on mobile. Tags are documented in-line in the editor.

## Image Library

*Design → Image Library.*

Central storage for all brand-side imagery: product photos, brand-page heroes, lifestyle shots, social-share images, internal references.

### Capabilities

- **Upload** — single or batch (up to 200 at a time, 6 MB each).
- **Search** — by filename, alt text, upload date, uploader, dimensions, used-on (which products reference this image).
- **Tag** — folksonomy tagging for your team.
- **Folders** — optional; up to 3 levels deep.
- **Replace** — upload a new version of an existing image; references update automatically. Old version is kept in version history.
- **Bulk-edit alt text** — useful when an editorial review pass identifies missing or weak alt text.
- **Auto-generated thumbnails** — multiple sizes generated on upload for fast page loads.

### Image specs we accept

| Format | Notes |
|---|---|
| JPEG | Quality ≥ 85; sRGB color profile |
| PNG | For images requiring transparency |
| WEBP | Accepted; converted to JPEG/PNG for email |
| AVIF | Not yet supported |

Resolution: 2400 px on the long edge minimum, up to 6000 px. Below 2400 px is rejected for primary product imagery; allowed for secondary content.

### Editorial photography in the library

Photography commissioned by our editorial team is stored in your image library marked *Editorial*. You have non-commercial usage rights as documented in *04-seller-operations/04-photography-and-listing-standards.md*. The images are watermarked internally as editorial-owned.

## File Library

*Design → File Library.*

For brand-supplied non-image files: PDFs, care booklets, certificates of authenticity, downloadable patterns. Files attach to products or brand pages. We do not host arbitrary brand documents (no internal financials, no spreadsheets).

Limit: 25 MB per file.

## Generic Forms

*Design → Generic Forms.*

Build forms for non-checkout purposes: wholesale inquiry, custom commission, sample request, brand-page contact. Drag-and-drop builder; supports text, paragraph, single/multi-select, file upload, and consent checkbox fields.

Submissions land in your *Inbox* (a small section of the Admin Console at the bottom of the navigation). Optionally email a copy to a designated address.

Forms cannot collect payment information. Payments must go through standard checkout.

## Automatic Backups

*Design → Backups.*

Every change in the Template Library and Image Library is versioned. Automatic backups happen daily; manual snapshots can be triggered before a major change.

Restore from a backup with one click; the restore is logged in the audit log and creates a new version (it does not erase the intervening history).

## What we do not let you change

- The platform's typography, header navigation, footer, or color system.
- The product page layout (heading position, image-gallery structure, review placement).
- The cart and checkout flow.
- The customer account page.

We get asked about these. The answer is consistent: a uniform marketplace experience is part of why customers trust the platform. Brand-page hero, brand profile, and email templates are the surface area where brand identity expresses itself.
