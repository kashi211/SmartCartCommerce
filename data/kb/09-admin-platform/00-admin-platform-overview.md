# Brand Admin Console — Platform Overview

**Document type:** Brand-facing + internal reference
**Owner:** Saket Panwar
**Last reviewed:** 04 March 2026
**Audience:** Brand partners, brand-facing teams, anyone touching the merchant tooling.

---

## What the Admin Console is

Every brand on SmartCartCommerce has access to a dedicated workspace we call the Brand Admin Console. It's where brand partners manage their listings, see incoming orders, run their email marketing integrations, configure shipping for the items they fulfill from their own studios, audit changes, and pull analytics specific to their work on the platform.

It is not a generic e-commerce admin panel. It is shaped by the fact that SmartCartCommerce is a curated marketplace, which means some controls a brand might expect to own (the customer relationship, the storefront editorial, the platform-wide payment processor) sit with us, not with them.

This document is the map. It explains which features are brand-level, which are platform-level, and where the line is.

## Brand-level vs platform-level — the line

**Brand-level features.** Things a brand controls from their own console:

- Their catalog: products, categories within their brand page, descriptions (subject to editorial), photography, inventory, made-to-order configurations.
- Their orders: pending orders for their items, shipping for items they fulfill themselves, status updates.
- Their integrations: email marketing tools (Klaviyo, Mailchimp, etc.), product syndication feeds, custom analytics.
- Their customer-facing artifacts: Q&A responses, review replies, custom product forms.
- Their team: who from their organization can log into their console.

**Platform-level features.** Things SmartCartCommerce controls; brands have visibility but not configuration access:

- Payment processing, gateways, tokenization, fraud services. We are the merchant of record.
- Tax calculation and remittance. We handle nexus, tax tables, and compliance globally.
- The customer relationship: account, addresses, communications, returns.
- Storefront design and editorial copy.
- Site search ranking, curation council decisions, SEO at the marketplace level.
- Security (CSRF, reCAPTCHA, TLS, IP restrictions, audit logging at the platform layer).

The split is intentional. It removes a lot of operational burden from the brand (no PCI scope, no tax registrations across 64 markets, no fraud reviews) and concentrates that work where we can do it well.

## Sections of the console

The Admin Console is organized in five top-level sections, mirrored by the documentation in this folder:

1. **Dashboard & Store Operations** — the home view, audit logs, operator tools (GREP, Diff, Set Order ID), session and security configuration.
2. **Catalog & Content Management** — products, inventory, categories, reviews, design assets, brand-page settings.
3. **Marketing & Integrations** — SEO, email marketing tools, cart abandonment, product syndication, incentive programs.
4. **Analytics & Reporting** — the report library, revenue and traffic analytics, integration with Google Analytics.
5. **Orders, Payments, Shipping, Tax** — the operational layer of running a business on the platform.

Each section has its own folder of documentation. Start with the section overview for context, then read the specific feature doc for the task at hand.

## Access and permissions

Each brand's console is locked to verified members of their team. Roles: **Owner** (full access; one per brand), **Operator** (can manage catalog, orders, integrations; cannot delete or change billing), **Read-only** (view all; change nothing). We do not currently support custom roles; we are evaluating it for late 2026.

Two-factor authentication is required for all roles.

## Environments

Most brands work in a single environment. For brands that want to test changes before publishing — typically larger brands or those running scheduled drops — we offer a staging environment that mirrors live but does not affect customers. Staging-to-live promotion is done via an explicit *Push to live* button and is logged in the changelog.

## How the console relates to the public site

A change made in the Admin Console reaches the public site within seconds for most surfaces (catalog, inventory, descriptions). Editorial-reviewed surfaces (re-written product copy, brand profile updates) go through a quick editorial check before publishing, typically within 4 business hours.

If a change must be reverted urgently, *Diff* and *Restore* in the changelog let you roll back to a known-good state. See *01-dashboard-and-store-operations/02-store-changelog-and-audit-logs.md*.

## Support for the console itself

Brand operators do not contact concierge for console issues; they contact their account lead or the partner support team. Email *partners@smartcartcommerce.com*; for urgent operational issues, the Slack Connect channel with your account lead is the fastest path.

For platform-wide outages or incidents, we publish at *status.smartcartcommerce.com* and email all brand owners within 30 minutes of confirmation.
