# AR Try-On — Jewelry, Watches, Eyewear

**Document type:** Feature documentation
**Owner:** Saket Panwar
**Last reviewed:** 16 February 2026
**Status:** GA for jewelry, watches, eyewear; Beta for hats and bags.

---

## What it is

AR Try-On lets a customer use the front camera on their phone or laptop to see how a piece of fine jewelry, a watch, eyewear, or (in beta) a hat or bag would look in real time. The piece is rendered in 3D, scaled to the customer, and tracked to wrist, neck, finger, face, or body as appropriate.

It is not a replacement for in-person trial. It is a way to narrow choices and avoid ordering three watches when one will do.

## Where it works

- Necklaces (chain length, pendant scale).
- Earrings (length, weight visualization, lobe-fit).
- Rings (stacking, finger fit visualization).
- Bracelets (wrist circumference inferred from band placement).
- Watches (case size, lug overhang, strap fit).
- Eyewear (face geometry, frame width, bridge fit).
- Hats (beta — head circumference inferred via a brief calibration).
- Bags (beta — body-relative scale).

## How accurate it is

We are honest about the limits.

| Aspect | Accuracy |
|---|---|
| Color | Good — calibrated to maker-supplied 3D scans |
| Scale | Very good — within ~3-4% on most devices |
| Material behavior (gloss, refraction, gem fire) | Approximate — diamond fire especially is hard to render faithfully on a phone screen |
| Drape (necklaces) | Good — physics simulation runs on-device |
| Movement | Good — real-time tracking holds at 30+ fps on most phones from the past 4 years |

We are explicit about the gem-fire limitation on every product page that uses AR. For high-value diamond purchases, we recommend a Virtual Showroom session instead of (or in addition to) AR.

## Privacy

Camera frames are processed on-device. Frames are NOT sent to our servers. Our 3D engine runs in the browser using WebXR / native iOS / native Android — never as a video stream upload.

We do not run face recognition. We track facial landmarks (eye position, nose bridge, mouth) for fit, but we do not extract or store identity vectors.

A customer can save a single rendered preview image to their account if they want — that is the only data that leaves the device, and only when the customer taps "save."

## Sharing

Customers can save and share an AR preview as a static image (with their consent). The shared image is hosted on SmartCartCommerce and accessible by link. We watermark with a small SmartCartCommerce mark and the SKU.

We do not auto-share. We do not push share suggestions.

## How brands provide assets

Brands supply 3D scans of their pieces using one of two paths:

1. **Self-scan kit** — we ship the brand a kit (turntable, calibrated lighting, app), they capture, we process. Free for brands; takes about 8 hours of brand time per 50 SKUs.
2. **SmartCartCommerce capture service** — pieces shipped to our studio in New York for capture by our team. Free for the first 50 pieces per brand per year.

Roughly 80% of SmartCartCommerce's jewelry, watch, and eyewear inventory is AR-ready. We are progressing toward 100%.

## Known limitations

- Lighting in the customer's environment matters. Very dim or very harsh lighting reduces tracking quality.
- Rings on hands with strong jewelry (other rings, bracelets) sometimes track imperfectly.
- Mirror sunglasses (real-world) on the customer's face confuse the tracker; we ask them to remove them.
- AR for fashion garments is NOT shipping — we evaluated, decided the experience wasn't there yet.

## How customers use it

From a year of usage data:

- Average customer who uses AR before purchase: 6.4% lower return rate.
- Most-used category: eyewear (frame-fit is the biggest customer concern there).
- Most-saved category: rings (customers comparing across multiple options).
- Average sessions per high-AOV jewelry purchase: 2.3 over multiple days.

## Product page integration

When AR is available, the product page shows a *Try on* button next to the primary image. The button doesn't dominate the page — restraint is part of our design language. Customers who don't want AR are not pushed toward it.

## Roadmap

- Q3 2026: Hats and bags out of beta.
- Q4 2026: Multi-piece try-on (e.g., earrings + necklace together).
- 2027: Surface decoration AR for home goods (vase placement, rug visualization on the customer's floor — privacy-respecting).
