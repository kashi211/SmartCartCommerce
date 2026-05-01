# Security Options

**Document type:** Brand-facing reference + platform security standard
**Owner:** Saket Panwar
**Last reviewed:** 03 March 2026

---

## What's in scope

Security on SmartCartCommerce is split between platform-level controls (managed by us, applied to every brand) and brand-level controls (managed by you, applied to your console and your team). This document covers both, marked accordingly.

## Bot prevention — reCAPTCHA (platform-level, brand-visible)

We use Google reCAPTCHA v2 and v3 on customer-facing forms across the platform. Brand operators see this configuration as read-only, with the ability to opt specific custom forms (e.g., a custom catalog request) into reCAPTCHA protection.

**Forms protected by reCAPTCHA:** account creation, sign-in, checkout, password reset, contact forms, custom forms you mark as protected, brand-page Q&A submission, review submission.

**Verification method:** v3 (invisible scoring) by default, with v2 (challenge) fallback when the v3 score is too low.

**v2 threshold:** challenge issued at score < 0.4. **v3 threshold:** request denied silently at score < 0.2 (typically only bots trip this).

You cannot change thresholds; they are platform-level. You can opt your custom forms in via *Store → Security → reCAPTCHA*.

## IP restrictions (brand-level, optional)

You can restrict Admin Console access for your brand to a specific set of IP addresses (or CIDR ranges). Useful for brands with a fixed office network or VPN.

- *Store → Security → Restrict IPs.*
- Up to 50 entries per brand.
- Applies to all roles, including Owner.
- Always-allow your current IP option to prevent self-lockout.
- Two-factor codes via authenticator app are not affected.

If you lock yourself out, your account lead can clear the restriction after identity verification. We have done this; it is annoying for everyone. Test from a second device before saving.

## CSRF protection (platform-level)

Cross-Site Request Forgery protection is applied to every form on the platform. Tokens are generated per session, validated server-side, and rotated on privilege escalation.

You cannot disable CSRF protection. The only configurable surface is *Protected forms* — adding your custom forms to the protected list, which is the default and which we recommend leaving on.

A note on CSRF: we treat this as table stakes. If you ever encounter a "csrf token mismatch" error in the Admin Console, it usually means your session expired in another tab; refresh and re-submit.

## Secure logins (platform-level)

Two-factor authentication is required for every Admin Console role. Methods supported:

- Authenticator app (TOTP) — recommended.
- Hardware security key (FIDO2 / WebAuthn) — recommended for Owner role.
- SMS — supported but discouraged; we will start phasing it out in 2027.

Email-based 2FA is not offered; email is too easy to compromise to be a second factor.

## Allow IFrame display (brand-level)

By default, your brand pages cannot be embedded in iframes (X-Frame-Options: DENY). This prevents clickjacking. If you need to embed your storefront in another site (a corporate intranet, a partner widget), you can allow specific origins via *Store → Security → IFrame*. Wildcard origins are not permitted.

## Full HTTPS (platform-level)

Every customer-facing page is served over HTTPS. There is no opt-out. The Admin Console is also HTTPS-only. We use HSTS with a 1-year max-age.

For brands migrating an existing custom domain to SmartCartCommerce, we provision a Let's Encrypt certificate automatically; the brand's old HTTP traffic redirects 301 to HTTPS. For SEO continuity during migration, we recommend (a) keeping the old site live during the cutover week, and (b) re-verifying ownership in Google Search Console after the migration. See the *Site Settings & Domains* doc for the full migration runbook.

## Site IP address (platform-level, brand-visible)

Read-only. Some brand integrations (corporate firewalls, ERP systems) need to know our outbound and inbound IP ranges to allowlist us. The current ranges are published at *Store → Security → Site IP Address* and we email all brand owners 60 days in advance of any change.

## TLS configuration (platform-level)

Minimum TLS version: 1.2. TLS 1.3 enabled where the client supports it. We do not support TLS 1.0 or 1.1 anywhere in the stack.

Approved cipher suites: a curated list reviewed quarterly by our infosec team. Brands cannot configure cipher suites; we manage them centrally.

## Backup options (platform-level)

We back up every brand's catalog, configuration, and order history daily, with point-in-time recovery available for 30 days. Backup integrity is tested weekly. In a catastrophic data-loss scenario (we have never had one) the recovery time objective is 4 hours; the recovery point objective is 1 hour.

You can request a one-off export of your data at any time (catalog, customers — anonymized, orders, integrations config) via *Store → Security → Export my data*. Exports are produced within 4 business hours and include a manifest plus verifiable hash.

## What you should do, day one

Three actions every brand should take within their first week:

1. Enable 2FA for all team members. Hardware key for Owner.
2. Review the *Restrict IPs* page. Add your office network or leave open if your team works distributed; just decide.
3. Review *Protected forms* and ensure your custom forms are on the list.

That is the security baseline. Everything else is platform-managed.
