# Store Changelog & Audit Logs

**Document type:** Brand-facing reference + internal compliance
**Owner:** Saket Panwar
**Last reviewed:** 09 February 2026

---

## What gets logged

Every action that materially changes your brand's state on SmartCartCommerce is written to the changelog. That includes: product create/update/delete, inventory adjustments, price changes, listing publishes and unpublishes, integration connections, role changes, payout configuration changes, and admin sign-ins from new devices.

We do not log read-only events. Loading a page or running a report is not in the log.

## Where to find it

Admin Console → *Store* → *Changelog*.

The default view is the last 30 days, most recent at the top.

## What each row shows

| Field | Description |
|---|---|
| Timestamp | UTC + your local time, both displayed |
| User | The team member who performed the action (or *system* for automated actions) |
| Action type | Create / Update / Delete / Publish / Connect / Disconnect / Other |
| Object | The thing changed (Product, Order, Integration, Setting, etc.) |
| Object ID | Internal reference, hyperlinked to the object |
| Summary | One-line description in plain language |
| Diff | Click to see exactly what changed (see *Diff*) |

## Filtering

Three filters along the top:

- **User** — narrow by who. Useful when you have multiple team members and want to know who pushed a price change.
- **Action type** — narrow by category.
- **Period** — date range, with quick presets for last 24 hours, 7 days, 30 days, 90 days.

Results count is capped at 1,000 by default; raise the cap from the UI if you need more.

## Behavior

The changelog is append-only. You cannot delete entries; we do not provide a feature to. This is by design — for your protection (an attacker who can edit the audit log can hide their tracks) and for ours (we're the merchant of record and need a verifiable history).

Entries persist for **7 years** in line with our standard data retention. After 7 years they are archived to cold storage and become slower to retrieve but remain available on request.

## Diff

Every change has a *Diff* link that opens a side-by-side view of the field-level change. For multi-field updates (e.g., bulk product re-import) the diff shows all changed fields. For binary objects (images, files) the diff shows metadata changes (filename, size, alt text) but does not render the binary itself.

See *03-grep-and-diff-tools.md* for power-user usage of Diff outside the changelog.

## Restore

Most updates can be reverted by clicking *Restore previous version* on the diff view. The restore creates a new changelog entry — it does not retroactively erase the change you are reverting.

Deletes are restorable for **30 days**. After 30 days, the underlying record is purged and cannot be recovered. We surface a "delete is permanent in 27 days" reminder for any item you have soft-deleted.

## What the audit log is good for

The two most common uses we see:

- **Diagnosing surprises.** A brand's listings show the wrong price; the changelog reveals a teammate ran an import that overrode it. Two clicks to restore.
- **Compliance and disputes.** Counter-party disputes about who changed what and when. The log is the answer.

## What the audit log isn't

It is not an analytics surface. It tells you what happened, not why or whether it worked. For business outcomes, see the analytics section.

It is not a security alarm. It records events; it does not actively page you when something looks off. We do, however, send proactive alerts on a small set of high-risk patterns: bulk deletes, payout-account changes, role escalations, sign-ins from a new country. Those alerts are separate from the log and arrive by email plus an in-console banner.

## Platform-level audit trail

In addition to the brand-level changelog, SmartCartCommerce maintains a platform-level audit trail of all platform-side actions taken on your data (concierge accessing an order, an editor updating product copy, an account lead changing a commission tier). You can request an export of platform-level activity touching your brand at any time from your account lead. We aim to provide it within 5 business days.
