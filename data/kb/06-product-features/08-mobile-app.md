# Mobile App — Features & Design

**Document type:** Feature documentation
**Owner:** Saket Panwar
**Last reviewed:** 04 March 2026
**Available on:** iOS 16+, Android 11+. iPad and Android tablet supported.

---

## What the app is

The SmartCartCommerce mobile app is the most considered way to use SmartCartCommerce on a phone. It is not a wrapper around the website. It is a redesign for touch and mobility, with the kinds of features that benefit specifically from phone capabilities: AR try-on, camera-based search, push-based concierge, and location-aware showroom check-ins.

About 38% of our orders come through the app. About 68% of our active sessions are on mobile (combined web + app).

## What it does that the web does not

- **AR try-on** is faster and higher fidelity in the app (uses native ARKit / ARCore vs. WebXR).
- **Push notifications** for back-in-stock, delivery updates, and concierge replies.
- **Camera search** — point at an object you like, find related pieces in our catalog. Beta.
- **Apple Wallet / Google Wallet integration** for gift cards and showroom appointment passes.
- **Live concierge with read receipts** — Circle members can see when their concierge is reading.
- **Showroom check-in** — when in New York, Los Angeles, London, or Tokyo, the app offers showroom services if you're nearby.

## What the web does that the app does not

- **Long-form editorial reading** — the journal is more comfortable on a larger screen.
- **Bulk gifting flows** — corporate gifting workflows are web-only.
- **Detailed account administration** — closing the account, full data export, advanced privacy settings.
- **Stylist async chat with image attachments** — works in the app, but the web version handles long threads better.

## Design principles

The app design follows the same principles as the web:

- **Quiet** — no popovers, no badges on every screen, no intrusive prompts.
- **Touch-first** — generous tap targets; no actions that require precision pointing.
- **Fast** — initial app load under 1.2 seconds on a 3-year-old phone.
- **Image-quality respect** — we serve high-quality images at appropriate scale; a $400 ceramic vase should not look like a thumbnail.

## Notifications

Notifications are off by default for non-Circle members. We do not opt customers in by default. We do not send promotional notifications.

We send notifications for:

- Order status changes (with customer permission).
- Concierge replies (Circle).
- Restock alerts on items the customer chose to track.
- Shipping delivery on the day of delivery.
- Subscription box ship confirmations.

We do NOT send:

- Daily prompts to "complete your wishlist."
- "Items on sale" (we don't run sales).
- "We miss you" win-back messages.
- Generic editorial prompts.

## Privacy

Camera access is requested only when needed for AR or camera search, with a clear in-app explanation.

Location is requested only for showroom check-in or for delivery-day notification accuracy. Granted is "while using the app." We never ask for "always."

Push tokens, device fingerprints, and similar identifiers are scoped to our own analytics. We do not pass them to third-party advertisers.

## Accessibility

The app meets WCAG 2.1 AA. Specifically:

- VoiceOver / TalkBack tested on every screen.
- Dynamic Type support.
- Sufficient color contrast.
- Reduced-motion support.
- Keyboard navigation on attached external keyboards.

We have an annual accessibility audit by an external partner.

## Offline behavior

The app maintains a small offline cache of the user's wishlist, recent orders, and any open concierge thread. Offline browsing of the full catalog is not supported; we considered it and decided the storage cost (and potentially stale pricing) wasn't worth it.

## Updates

We ship app updates roughly every 4-6 weeks. We don't force-update. We don't rapidly iterate UI changes that destabilize muscle memory. Major redesigns are signaled in advance.

## App-only features (deliberately none)

Some marketplaces gate features to the app to drive install. We do not. Every customer should have access to the same value regardless of channel.

## Performance

Crash-free session rate: 99.94% rolling 30-day. App Store / Play Store rating: 4.7 / 4.8 respectively.

## Roadmap

- Q2 2026: Camera search out of beta, with consent-aware "save for later."
- Q3 2026: Showroom check-in expanding to include reservations from app.
- Q4 2026: Concierge voice notes (Circle).
- 2027: Native iPad design (currently runs as scaled iPhone).
