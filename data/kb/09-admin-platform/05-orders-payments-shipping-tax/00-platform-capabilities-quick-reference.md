# Platform Capabilities — Quick Reference

**Document type:** Brand-facing reference + sales/onboarding aid
**Owner:** Saket Panwar
**Last reviewed:** 21 March 2026
**Audience:** Brand operators, prospective brand partners, onboarding teams, anyone who needs the high-level "what can a store on SmartCartCommerce do" summary in one place.

---

## What this is, what it isn't

A consolidated list of the shipping, tax, payment, and security services available to brands on SmartCartCommerce. Each topic has its own deep-dive document elsewhere in the knowledge base; this is the index, the quick orientation, and the answer to "give me the list" questions.

For specifics — configuration, edge cases, troubleshooting — follow the cross-references at the end of each section.

---

## Shipping

Brands ship in one of two patterns: from their own studio (most common) or from one of our four bonded fulfillment centers (New Jersey, Los Angeles, London, Hong Kong). The capabilities below apply to studio-fulfilled brands; FC-fulfilled brands inherit our negotiated rates and skip the carrier configuration entirely.

### Native shipping tools

| Tool | What it does |
|---|---|
| **Shipping Tables** | Flat-rate matrix: weight bands × destination zones. Predictable pricing; no live rate calls. |
| **Shipping Groups** | Per-product packaging strategy — package type, weight floor, handling fee, eligible carriers. |
| **Preset Ship Dates** | Fixed ship dates for made-to-order or scheduled drops. |
| **Blackout Dates** | Days the brand isn't shipping (studio closures, maker on retreat). Customer estimates adjust automatically. |
| **Dimensional Shipping** | Auto-calculates dim weight per package type using carrier-specific density factors. |

### Carrier integrations (third-party)

| Carrier | Use cases |
|---|---|
| **UPS Auto Rate** | Negotiated rates, label generation, pickup scheduling, Saturday delivery |
| **FedEx Auto Rate** | Express, Ground, Home Delivery, SmartPost; international; Saturday + weekend pickup |
| **USPS Auto Rate** | Priority Mail, Priority Express, Ground Advantage, Media Mail, First-Class |
| **ABF Freight** | LTL freight — furniture, oversized, palletized goods |
| **Conway Freight** | LTL alternative to ABF |
| **ShipWorks** | Multi-carrier shipping software; rate-shopping across carriers downstream |
| **Custom Shipping API** | Brand's own 3PL or in-house warehouse via brand-supplied endpoint (2-second latency budget) |

### Customer-facing rate display

Customer sees rate-shopped options at checkout sorted by price/speed. Brand can override the customer's chosen carrier with a notification.

### Cross-references

- `09-admin-platform/05-orders-payments-shipping-tax/05-shipping-options-and-carriers.md` — full configuration detail
- `02-customer-policies/02-shipping-and-delivery.md` — customer-facing shipping policy
- `02-customer-policies/09-international-shipping-guide.md` — DDP, market-by-market notes

---

## Tax

Tax is platform-managed. We are the merchant of record, so we calculate, collect, and remit on behalf of every brand. Brands do not register for tax in markets they ship into via SmartCartCommerce — one of the largest operational benefits of being on the platform.

### Tax engine

**Avalara** — authoritative tax-rate engine. We maintain the integration; brands consume the rates.

### Registered jurisdictions

| Region | Status | Cadence |
|---|---|---|
| United States | 38 states (Streamlined Sales Tax + economic nexus elsewhere) | Monthly to quarterly |
| Canada | GST/HST/PST registered | Per-province, monthly |
| United Kingdom | UK VAT registered | Quarterly |
| EU | OSS scheme + IOSS for low-value | Quarterly |
| Norway | VOEC scheme | Quarterly |
| Switzerland | Swiss VAT registered | Quarterly |
| Japan | JCT registered as Qualified Invoice Issuer | Quarterly |
| Australia | GST as electronic distribution platform | Quarterly |
| New Zealand | GST registered | Quarterly |
| Singapore | GST registered | Quarterly |
| UAE | VAT registered | Quarterly |

For other markets we handle on a case-by-case basis with tax counsel.

### Capabilities

- **Tax Tables** — platform-managed via Avalara; continuously updated.
- **Tax Categories** — per-product (apparel exempt in PA/NJ; food reduced in EU; children's items lower in some EU markets).
- **Tax Calculations** — line-by-line at checkout; line-rounded; inclusive vs exclusive display per market convention.
- **Tax-exempt customers** — resale, charitable, government; verified by our tax team; applied automatically to subsequent orders.
- **Tax invoicing** — customer-facing invoices compliant with destination-market rules; B2B-format for wholesale.

### Cross-references

- `09-admin-platform/05-orders-payments-shipping-tax/06-tax-configuration.md` — full detail
- `02-customer-policies/09-international-shipping-guide.md` — DDP and customs interaction
- `04-seller-operations/02-commission-and-payouts.md` — how tax flows in payout statements

---

## Payments

Customer-facing payment methods accepted, the processors that power them, and the supporting services. SmartCartCommerce is the merchant of record on every order.

### Card networks

Visa, Mastercard, American Express, Discover, JCB, UnionPay, Diners Club.

### Digital wallets

Apple Pay, Google Pay, Shop Pay.

### Regional bank-debit / bank transfer

| Method | Markets |
|---|---|
| iDEAL | Netherlands |
| Bancontact | Belgium |
| SEPA Direct Debit | EU |
| Sofort | Germany, Austria, Switzerland |
| Giropay | Germany |
| BLIK | Poland |
| EPS | Austria |

### Cash-equivalent

| Method | Markets |
|---|---|
| Konbini | Japan (3-day pay-at-convenience-store hold) |

### Buy-now-pay-later

**Klarna** — supported markets, $50–$2,500 range.

(Affirm, Afterpay, Zip — evaluated, not currently offered.)

### SmartCartCommerce instruments

- **Gift cards** — 10-year validity; platform-issued; accepted across all brands
- **Store credit** — issued via refund or goodwill; applied at checkout
- **SmartCart Circle membership benefits** — free shipping, repair credit, etc.

### Payment processors (third-party)

| Processor | Markets |
|---|---|
| **Stripe** | North America, UK, Australia, New Zealand, Singapore, Hong Kong, Japan |
| **Adyen** | EU, EEA, Switzerland, UAE, select APAC |

Both are PCI-DSS Level 1 certified. Brands cannot choose between processors; we route based on customer billing country and risk model. The choice is invisible to brands.

### Tokenization

All card data tokenized at point of capture. Tokens are single-merchant; opaque to us; held by the processor. Brands never see card numbers; PCI scope sits with us.

### 3D Secure / Strong Customer Authentication

- Always required: EU and UK (regulatory).
- Risk-based: elsewhere (high-value, unusual pattern, new card).

### Charge timing

| Order type | Charge point |
|---|---|
| Stocked goods | Order placement |
| Made-to-order ≤ $1,500 | Order placement |
| Made-to-order > $1,500 | 30% deposit + balance at production complete |
| Pre-order | Order placement |
| Backorder | Shipment |
| Subscription / Curated Boxes | Each cycle, 7 days before ship |
| SmartCart Circle | At signup; renews annually |

### Subscription smart-retry

For failed subscription renewals: Stripe Network Token recovery; Adyen RevenueProtect; one retry at +24h; graceful pause within 7 days.

### What we do NOT accept

- Cryptocurrency (Bitcoin, USDC, etc.) — operational cost vs. usage doesn't justify
- Cash on delivery — not supported anywhere
- Raw wire transfer — only for specific high-value orders, manually coordinated
- Customer-initiated check / ACH — ACH for high-value B2B only, manual

### Cross-references

- `09-admin-platform/05-orders-payments-shipping-tax/04-payment-methods-and-billing.md` — full detail
- `02-customer-policies/04-privacy-policy.md` — payment data handling
- `02-customer-policies/01-returns-and-refunds.md` — refund timing back to payment instruments
- `04-seller-operations/02-commission-and-payouts.md` — brand payout cadence (separate from customer payment)

---

## Security & abuse prevention

What we do to keep customers safe, brands safe, and the platform whole. Layered defense across perimeter, account, transport, transaction, and post-transaction.

### Bot prevention (perimeter)

| Service | Where it runs | Threshold |
|---|---|---|
| **Google reCAPTCHA v3** | All customer-facing forms (sign-in, sign-up, checkout, contact, custom forms, Q&A, reviews) | Silent deny < 0.2 |
| **reCAPTCHA v2 fallback** | When v3 score is uncertain | Challenge served < 0.4 |
| **Bot tracker** | All site traffic | Categorized: search engine, AI scraper, aggregator, malicious |

### Account security

| Service | Notes |
|---|---|
| **Mandatory 2FA** | All Admin Console roles |
| **TOTP authenticator** | Recommended |
| **Hardware security key (FIDO2/WebAuthn)** | Recommended for Owner role |
| **SMS 2FA** | Supported, deprecating in 2027 |
| **Email-based 2FA** | NOT offered (email is too easy to compromise) |
| **IP Restrictions** | Brand-configurable allowlist, up to 50 entries, CIDR-supported |
| **Sign-in alerts** | Auto-email on new-device or new-country login |

### Network & transport security

| Service | Notes |
|---|---|
| **Full HTTPS + HSTS** | 1-year max-age; no opt-out anywhere on the platform |
| **TLS 1.2 minimum, 1.3 where supported** | TLS 1.0/1.1 not allowed anywhere |
| **Curated cipher suites** | Reviewed quarterly by our infosec team |
| **CSRF protection** | Every form; server-validated tokens; rotation on privilege escalation |
| **IFrame protection** | X-Frame-Options DENY by default; per-origin allowlist where needed |
| **DNS security** | DNSSEC where supported by registrar |

### Transaction security (anti-fraud)

| Service | Notes |
|---|---|
| **Real-time fraud scoring** | Stripe + Adyen risk signals + our custom rules → score 0–100 |
| **AVS (Address Verification)** | Required on cards |
| **CVV verification** | Required on cards |
| **3DS / SCA** | Always EU/UK; risk-based elsewhere |
| **Hold-and-review queue** | Risk score 66–84 → human review within 4 business hours |
| **Auto-decline** | Risk score 85+ |
| **Chargeback absorption** | Platform handles fully; not deducted from brand payout |
| **Network signal integration** | Known fraud rings, leaked-credentials lists, sanctioned individuals/locations |

### Content abuse prevention

| Service | Notes |
|---|---|
| **AI-generated review classifier** | ~0.4% of submissions flagged; routed to human review |
| **Spam / boilerplate review detection** | Same classifier covers obvious spam patterns |
| **Review-bombing protection** | Sudden cluster of reviews from no-purchase-history accounts → auto-pause until human review |
| **Custom-form rate limiting** | Per-IP, per-account |
| **Account-creation throttling** | Prevents enumeration and account-farming |

### Compliance & audit

| Service | Standard |
|---|---|
| **PCI-DSS Level 1** | Annual external QSA audit |
| **SOC 2 Type II** | Annual external audit |
| **GDPR / UK GDPR / CCPA** | Compliance program; right-to-erasure honored across integrations |
| **Append-only audit log** | 7-year retention; cannot be deleted by anyone (including platform admins) |
| **Platform-level audit trail** | Every platform-side action on brand data is logged; available on request |

### Phishing & external threats

| Service | Notes |
|---|---|
| **Sender-domain authentication** | DKIM/SPF/DMARC enforced for our outbound |
| **Phishing-campaign monitoring** | Active; takedown requests typically same-day |
| **Customer notification** | Proactive when phishing campaign targets our customers |
| **Brand impersonation monitoring** | We monitor for brand-impersonation phishing attacks against the platform |

### Backup & recovery

| Service | Notes |
|---|---|
| **Daily backups** | Catalog, configuration, order history |
| **Point-in-time recovery** | 30-day window |
| **Weekly integrity tests** | Verifiable restore |
| **RTO** | 4 hours (catastrophic data-loss) |
| **RPO** | 1 hour |
| **Brand data export on demand** | Within 4 business hours; signed manifest |

### Cross-references

- `09-admin-platform/01-dashboard-and-store-operations/05-security-options.md` — perimeter, account, network security in detail
- `09-admin-platform/05-orders-payments-shipping-tax/03-fraud-services.md` — transaction-level fraud detail
- `09-admin-platform/01-dashboard-and-store-operations/02-store-changelog-and-audit-logs.md` — audit log behavior
- `09-admin-platform/01-dashboard-and-store-operations/06-delete-store-and-data-handling.md` — off-boarding data handling
- `02-customer-policies/04-privacy-policy.md` — customer-facing privacy commitments
- `06-product-features/07-reviews-and-ratings.md` — review-abuse prevention detail

---

## What this all costs (brand-facing)

Brands do not pay separately for shipping integrations, tax handling, payment processing, fraud services, or security infrastructure. All of the above is funded out of the commission deducted at payout. See `04-seller-operations/02-commission-and-payouts.md` for commission band detail.

The only paid brand-side program is the Marketing Co-op for expansion campaigns and showroom events; see `04-seller-operations/08-marketing-co-op-program.md`.

## Onboarding checklist

For brand operators new to the platform, the recommended sequence to configure these capabilities:

1. **Day 1 — Account security.** Enable 2FA for all team members. Hardware key for Owner. Review IP Restrictions.
2. **Week 1 — Shipping.** Connect your primary carrier (UPS / FedEx / USPS). Set blackout dates. Configure Shipping Groups for any non-standard packaging.
3. **Week 1 — Tax.** Verify your products are in the right tax categories. Tax registration is platform-side; nothing else from you.
4. **Week 1 — Payments.** Verify your payout banking. Payment methods are platform-managed; no further configuration.
5. **Week 2 — Marketing integrations.** Connect your email tool (Klaviyo / Mailchimp / etc.). Set up cart-abandonment defaults.
6. **Ongoing — Audit log.** Review weekly during onboarding; less frequently as your team settles into routine.

Your account lead walks through this checklist with you in the first 30 days.
