# Email List Management

**Document type:** Brand-facing reference
**Owner:** Saket Panwar
**Last reviewed:** 11 March 2026

---

## What lives here

Tooling for managing the email list that powers your brand-side marketing. Sits next to the email-marketing integrations: this doc is about working with the list itself; the integrations doc is about pushing the list to your ESP.

*Marketing → Email Tools → Email List.*

## Email List

The unified list of customers who have opted in to your marketing communications. Sources:

- **Checkout opt-in.** Customer checked the marketing-consent box at checkout. Most common path.
- **Brand page signup.** Customer subscribed via your brand-page footer or a custom form.
- **Generic form opt-in.** Customer submitted a wholesale-inquiry or sample-request form and consented.
- **Imported.** A list you brought in (with documented consent). See *Import* below.
- **API.** Customers added via your own integration.

Every entry has a source tag. You can filter by source for compliance audits.

## Search Marketing List

Search the list:

- By email address.
- By signup date range.
- By signup source.
- By engagement (opened a recent campaign, clicked, none).

Useful for ad hoc compliance checks ("did this customer opt in?") and for building targeted segments outside your ESP.

## Export Marketing List

CSV with: email, first name, country, signup date, source, consent text version, last engagement date.

Use cases: manual import to a tool we don't natively integrate with, internal analysis, compliance handover. Always handle exports as PII — see *02-customer-policies/04-privacy-policy.md*.

## Import Single Email Address

For one-off additions (a customer signed up at an in-person event; a partner gave you a confirmed-consent contact), use *Import Single*. You provide email, name (optional), source description, and consent text version. We add to the list with the *Manual import* source tag.

For bulk imports of multiple addresses, contact your account lead. We do not surface a bulk-import button by default because the most common reason brands want one is "I want to upload a list from my old platform" — and those lists frequently lack documented opt-in records, which would create compliance risk for both parties.

A bulk import requires:

- A CSV with email, first name, signup date, signup source, consent text.
- A signed declaration from the brand confirming each address has documented consent.
- A spot-check sample we verify against your records.

The process takes 5–10 business days. We've turned it down for brands that couldn't substantiate consent.

## Opt-Out Report

*Marketing → Email Tools → Opt-Out Report.*

A list of customers who have unsubscribed from your marketing, with: timestamp, source of unsubscribe (email link, customer account, contact form), and the campaign that prompted the unsubscribe (if linkable).

You should not contact opted-out customers under any circumstance; the bidirectional sync with your ESP automatically respects this. The opt-out report exists for your own analysis (high opt-out rate after a specific campaign is signal worth reading).

## Bidirectional Sync — opt-outs

A customer who unsubscribes via your ESP is reflected in our list within 5 minutes. A customer who opts out via SmartCartCommerce is propagated to your ESP within 5 minutes.

Opt-outs are non-reversible without explicit re-consent from the customer.

## Compliance — what's on you, what's on us

**On us (the platform):** consent collection at checkout and brand-page signup; consent text versioning; right-to-erasure requests; data export to the customer; transactional email policy.

**On you (the brand):** marketing email content; sending cadence; deliverability of your sending domain; ESP-side data handling; honoring opt-outs for any list you handle outside our ESP integration; compliance with marketing law in your sending market.

## What we will not do

- We will not let you email customers who have not opted in.
- We will not let you email customers who have opted out.
- We will not import a list without documented consent.
- We will not sell or share the list across brands.
- We will not allow scraping of customer email addresses from the platform.

If you find a workflow you think is OK but the system is preventing, ask your account lead. Most often, the system is right; occasionally there is a legitimate use case we hadn't considered, and we'll add support.

## Volume context

For perspective:

- Average brand list size after 2 years on platform: 2,000–8,000 opted-in addresses.
- Top decile (most popular brands): 30,000–80,000.
- Outliers: a few brands above 100,000 (typically brands with strong external marketing presence whose customers came to them and then to us).

If you are below 1,000 after a year, your customer-facing surface (brand page hero, signup CTA placement, post-purchase sequence) is probably worth reviewing with your account lead.
