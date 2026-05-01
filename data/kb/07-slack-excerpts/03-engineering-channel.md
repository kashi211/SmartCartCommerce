# Slack Archive — #engineering

**Document type:** Internal Slack archive
**Channel purpose:** Engineering team coordination. Architecture decisions, incidents, deploys, design discussions.
**Period covered:** January–March 2026.

---

## 09 Jan 2026

**[Product Lead — Discovery, 09:48]** Morning. Wishlist v3 spec is up for review in the docs repo — *wishlist-v3-rfc.md*. Highlights: shared lists for households, "reserve to buy" semantics for gifting, soft delete + recovery, and the privacy posture you'd expect from us. Asking for written reviews by EOW. Will incorporate and start the build week of the 26th.

**[Product Lead — AR, 09:51]** I'll review tonight. One question already — have we talked to the trust team about the household-sharing verification pattern? Verifying shared addresses without leaking personal data feels nontrivial.

**[Product Lead — Discovery, 09:54]** Director of Trust reviewed; section 6 of the doc has the trust path. Short version: paid SmartCartCommerce addresses on file with matching residential identity, manual verification for the first wave, automation later.

---

## 14 Jan 2026

**[Mobile Lead, 11:22]** Heads up — App Store review on the iOS submission flagged the camera-search beta because we don't have a clearly worded permission rationale. Easy fix, am pushing a 2-line copy update. Will resubmit today. ETA back in store Thursday.

**[Director of Product, 11:25]** Mobile Lead — let's also use this to double-check our Android camera permission strings. Better to fix once.

**[Mobile Lead, 11:28]** ack.

---

## 21 Jan 2026

**[Director of Trust, 16:14]** PSA for the team — we're ramping the AI-generated review classifier from 0.4% flagged to also include manual review of LLM-style boilerplate. Caught one this week that was clearly auto-generated but legitimate (older customer pasted a ChatGPT-edited draft). Going to keep the classifier conservative and route the borderline cases to a human. Building a small UI for that today.

Important: the classifier isn't and won't be used to deny legitimate reviews. It's a queue for human verification.

---

## 28 Jan 2026

**[On-call: On-call Engineer, 02:14]** SEV-2 — checkout on EU is hitting 4xx rate of ~7% over the last 12 minutes. Errors point to Adyen authorization. Investigating. Will update.

**[On-call: On-call Engineer, 02:23]** Identified — Adyen IP allowlist on a new edge node we deployed at 21:00 UTC didn't include the EU API endpoint. Rolling back. ETA 10 minutes.

**[On-call: On-call Engineer, 02:38]** Rolled back. Error rate normalized at 02:32. Will write the post-mortem in the morning. ~38 minute partial impact, ~120 abandoned-checkout sessions. Concierge has a draft outreach to anyone who got an error and didn't return to complete.

**[VP Customer Operations, 06:42]** thanks On-call Engineer. Comms draft looks good — ship it.

---

## 02 Feb 2026

**[Director of Product, 13:08]** Discovery alignment for Q2 — we're going forward with the search v4 work (mood-based queries across categories, the "things I'd give to a friend who just moved cities" use case). Editorial team is going to invest heavily in the categorical metadata for this; it's not just an embeddings-only problem. Product Lead — Discovery leading on the engineering side.

Caveat: this work intersects with curatorial integrity. We'll have a hard editorial review gate before any rollout. If the system surfaces things that don't pass curatorial taste, we won't ship.

**[Editorial Director, 13:14]** confirming editorial is in. We've blocked out Tuesdays for the metadata work.

---

## 11 Feb 2026

**[Product Lead — Discovery, 10:46]** Search-v4 prototype is up internally for the team to play with. Try queries like "for someone leaving a city" or "to apologize without making it about you." The first one is great. The second is interesting — surfaces things like a single beeswax candle and a tiny letter-pressed notebook. Curatorial review next week.

**[Editorial Director, 11:01]** Product Lead — Discovery — that second query result is genuinely beautiful. Excited to see this.

**[Director of Product, 11:03]** Don't get too excited yet. We tested 60 queries; about 8 still produce nonsense. Need to harden before any beta exposure.

---

## 18 Feb 2026

**[Mobile Lead, 09:14]** App accessibility audit results in. We have 3 minor issues (missing hint text on a couple of sliders, two dynamic-type breaking points on small screens, a contrast issue in our tabbed nav at the lowest accessibility setting). All actionable. Targeting fixes for the next release.

Big-picture, the report calls our app "best in class" for fashion / luxury commerce. Worth a moment of pride.

**[Director of Product, 09:18]** thanks team. nice work.

---

## 03 Mar 2026

**[Director of Trust, 17:32]** End-of-day reflection — we shut down a phishing campaign today that was targeting Circle members with fake "verify your account" emails purporting to be from us. Combination of sender-domain auth tightening, customer comms, and a takedown request to the hosting provider. About 4,200 customers received the phishing attempt; we proactively reached out to all of them with a clarification + reminder of how we communicate.

Total credentials compromised that we know of: 3. All accounts have been reset, customers reached, MFA enforced. Stripe team aware in case any associated cards see fraud attempts.

This is the kind of work that will probably never make a marketing slide. Wanted to flag it because the team did really excellent work.

**[VP Customer Operations, 17:38]** Excellent work. Genuinely.

**[Saket (founder), 17:42]** Thank you to everyone on the response. Director of Trust, please bring the full story to Tuesday's leadership meeting. Want the leadership team to see how this went down.
