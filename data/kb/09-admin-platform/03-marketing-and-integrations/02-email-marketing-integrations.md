# Email Marketing Integrations

**Document type:** Brand-facing reference
**Owner:** Saket Panwar
**Last reviewed:** 11 March 2026

---

## What's in scope

Brands run their own email marketing. SmartCartCommerce does not send marketing emails on behalf of brands; we send transactional emails (order confirmations, shipping updates, etc.) and our own platform marketing emails (the journal newsletter, editorial dispatches).

For brand marketing, we integrate with the major ESPs so customer data — for customers who explicitly opted in to your marketing — flows from us to your tool.

## Supported integrations

| Tool | Status | Sync depth |
|---|---|---|
| Klaviyo | Native | Full |
| Mailchimp | Native | Full |
| Omnisend | Native | Full |
| Bronto | Native | Full |
| Rejoiner | Native | Cart abandonment focus |
| dotmailer (now Dotdigital) | Native | Full |
| HubSpot | Native | See *01-seo-and-optimization.md* |
| Other ESPs | Via Zapier or webhook | Limited |

"Native" means: OAuth setup, automatic field mapping, real-time sync, two-way event flow.

## Klaviyo

The most-used integration on the platform.

### Setup

*Marketing → Email Tools → Klaviyo → Connect.*

OAuth-based. Required scopes: read/write contacts, read/write lists, read/write events.

### Settings

- **Consent source.** Maps to a Klaviyo property. Required for compliance.
- **Default list.** New opted-in customers join this list.
- **Property mapping.** We sync customer first name, country, language, lifetime spend, last purchase date, brand affinity (other brands they've bought from on SmartCartCommerce, if they consented to platform-wide). You can map additional properties.

### Integration Options

- **Send order events** — order placed, fulfilled, refunded → Klaviyo events with full line-item detail.
- **Send custom events** — Q&A submitted, review submitted, wishlist add, etc.
- **Bidirectional opt-out sync** — customers who opt out in Klaviyo are immediately marked opted-out in SmartCartCommerce; we honor it for transactional / brand-side communications.

### Getting Started — 5-step guide

A brief walkthrough we surface in the Klaviyo panel for first-time setup:

1. Create a *SmartCartCommerce* list in Klaviyo.
2. Connect the integration; map the list.
3. Enable order events.
4. Set up your welcome series (Klaviyo flow) using the new property `scc_signup_source`.
5. Run a test send to a teammate before scheduling your first real campaign.

## Mailchimp

Same pattern as Klaviyo. OAuth setup, list mapping, automatic property sync. Mailchimp's automation features are different from Klaviyo's; the integration covers the basics (lists, segments, opens) but does not surface every Mailchimp surface in the SmartCartCommerce console — for advanced automations, work in Mailchimp directly.

## Omnisend

Used by some of our beauty and food brands. Strong in welcome series and re-engagement automation. Native integration covers contact sync, order events, automation triggers, and cross-channel SMS for brands that opt into Omnisend's SMS module (we don't host SMS ourselves).

## Bronto

Older but stable. Often inherited from a previous DTC site. We support it; if you are setting up email marketing fresh, we recommend Klaviyo or Omnisend over Bronto.

## Rejoiner

Specialized in cart abandonment and post-purchase. Less full-featured than Klaviyo or Mailchimp for general email, but excellent at the cart-abandonment use case. The integration is tighter on cart events than the others.

## dotmailer (Dotdigital)

European brands frequently use dotmailer. Full integration including contact sync, order events, segmentation properties.

## Klaviyo Settings (deep configuration)

For brands with complex needs, *Klaviyo Settings* exposes:

- Custom property mapping (beyond the defaults).
- Event filtering (e.g., don't sync orders below a value threshold).
- Segment-specific behaviors (e.g., one-time purchasers vs repeat).
- Test event trigger.

## What we do NOT sync

- Customers who have not opted in to your marketing. Not our policy; not our customers' expectation.
- Customers' payment methods, full addresses, or sensitive personal data.
- Customer activity on other brands' pages on SmartCartCommerce.
- Customers' Lumora Circle / SmartCart Circle data unless they have given explicit cross-data consent.

## Compliance

GDPR, UK GDPR, CCPA: every integration honors consent and right-to-erasure requests automatically. If a customer asks us to delete their data, we propagate the deletion to your ESP via the integration. You also need to honor the deletion locally; this is your separate obligation as a controller for the data you process in your ESP.

## Email deliverability

Brands send from their own ESP, with their own domain and DKIM/SPF setup. SmartCartCommerce doesn't send marketing emails for you; we don't share our sender reputation. Configure DKIM and SPF for your sending domain in your ESP and at your DNS provider.

## What we recommend

A small set of opinions from years of watching what works:

- **Don't send daily.** A weekly cadence outperforms daily for our customer base.
- **Avoid heavy discounting in subject lines.** SmartCartCommerce customers respond poorly to urgency cues; the marketplace voice does not. Your branded emails will perform better with editorial subject lines than with "Last chance!" subject lines.
- **Welcome series should reference the maker.** New customers came to your brand because of your work. Lead with the work and the maker, not with a "thanks for subscribing, here's 10% off."
- **Quiet > loud.** This applies platform-wide. Our most-loved brand email programs are the ones that respect the inbox.
