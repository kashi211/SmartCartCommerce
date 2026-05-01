# GREP and Diff — Operator Tools

**Document type:** Brand-facing reference
**Owner:** Saket Panwar
**Last reviewed:** 14 February 2026
**Audience:** Operators who manage large catalogs or complex configurations.

---

## Why these tools exist

Once a brand has a few hundred SKUs and a handful of teammates editing the catalog, two questions come up constantly: *did anyone change this thing recently, and what did they change?* GREP and Diff exist to answer those without leaving the Admin Console.

Both are accessed from *Store → Operator Tools* in the navigation.

## GREP

A search box and a results panel. You type a string; it searches across:

- Product titles, descriptions, materials, and care text.
- Category names and descriptions.
- Custom form labels and option values.
- Email template content.
- Site setting values (search restricted to text-bearing settings; we don't search secret tokens).
- The most recent 90 days of changelog summaries.

GREP supports plain text, simple wildcards (`*`), and exact-phrase matching with double quotes. It does not support full regular expressions; we evaluated and decided the cost of a malformed regex (a runaway query against your catalog) wasn't worth the convenience.

Results are limited to 500 per query. Each result shows where it lives and a short context snippet around the match.

A common use: "find every product page that mentions 'made in Italy'" before updating a sourcing claim. Or: "find every email template that contains a placeholder we are about to deprecate."

## Diff

Diff compares two versions of the same object. Most often used from the changelog (see *02-store-changelog-and-audit-logs.md*), but also accessible standalone:

- *Diff product* — pick any two timestamps for the same product; see the field-level change.
- *Diff template* — pick two versions of an email template or page template; see line-by-line.
- *Diff settings group* — pick two snapshots of a settings page; see what changed.

Diff renders side-by-side on desktop, stacked on mobile. Removed text is struck through; added text is highlighted. Field changes show old → new values.

You can paste a Diff URL into a Slack Connect channel — it opens with the same comparison for any teammate with access.

## Use cases we hear

- **Onboarding a new teammate.** "What changed last week?" GREP for their work area; Diff to read the change.
- **Pre-launch review.** Diff between current state and yesterday before pushing a campaign live.
- **Investigating a customer complaint.** Customer says the product description has changed since they ordered. GREP for the SKU; Diff to confirm or rule out.
- **Finding stragglers after a policy update.** "Has every product page been updated to the new care language?" GREP for the old phrasing.

## Limits

GREP indexes are updated every 5 minutes; very recent changes may not appear immediately.

Diff can compare any two states from the past 90 days at field granularity. Beyond 90 days, diffs are coarser (object-level only, with a summary) because we don't keep field-level history forever — disk and indexing aren't free.

Neither tool searches binary content (images, PDFs). For images, use the *Image Library* search by filename, alt text, or upload date.

## Permissions

Both tools respect role permissions. Read-only roles can run GREP and Diff but cannot trigger restores. Operators can do both. Owners can additionally execute *bulk replace* (a careful sibling of GREP that proposes a multi-record edit and requires confirmation per record).

## Performance

GREP queries return in under 800 ms for a typical brand catalog (≤ 5,000 SKUs). Larger catalogs may take longer; we paginate results so the page renders quickly even if the full result set is still computing in the background.

Diff is fast at field-level (under 200 ms typically); object-level diffs over long windows can take a couple seconds. We show a spinner if it goes past 1 second.
