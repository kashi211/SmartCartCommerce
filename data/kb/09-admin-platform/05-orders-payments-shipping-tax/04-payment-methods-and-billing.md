# Payment Methods & Billing

**Document type:** Customer-facing summary + brand-facing reference + platform standard
**Owner:** Saket Panwar
**Last reviewed:** 14 March 2026
**Note:** This is the consolidated payment doc. It supersedes scattered payment notes elsewhere.

---

## In one paragraph

SmartCartCommerce is the merchant of record on every order. We accept cards (Visa, Mastercard, Amex, Discover, JCB, UnionPay), the major digital wallets (Apple Pay, Google Pay, Shop Pay), regional bank-debit methods (iDEAL, Bancontact, SEPA Direct Debit), one local cash-equivalent (Konbini in Japan), Klarna for buy-now-pay-later, and SmartCartCommerce gift cards. We tokenize all card data through Stripe and Adyen; we never store full card numbers ourselves. PCI scope sits with us, not with brands. Customers are charged at order placement; made-to-order purchases above a threshold may use a deposit-and-balance structure shown clearly at checkout.

---

## What we accept

### Card networks

- Visa, Mastercard, American Express, Discover, JCB.
- UnionPay (in supported regions).
- Diners Club (limited regions).

### Digital wallets

- Apple Pay (iOS, Safari).
- Google Pay (Android, Chrome).
- Shop Pay (where the customer has an existing Shop account).

### Regional bank-debit and bank transfer

- iDEAL — Netherlands.
- Bancontact — Belgium.
- SEPA Direct Debit — EU.
- Sofort — Germany, Austria, occasionally Switzerland.
- Giropay — Germany.
- BLIK — Poland.
- EPS — Austria.

### Cash-equivalent (local)

- Konbini — Japan. Customer pays at a convenience store within 3 days of order; we hold inventory.

### Buy-now-pay-later

- Klarna — supported in markets where we hold an active integration. Available at checkout for orders $50–$2,500.

We do not currently offer Affirm, Afterpay, or Zip. We have evaluated; the customer base on SmartCartCommerce uses BNPL less than the broader e-commerce average, so the integration cost has not been justified.

### SmartCartCommerce instruments

- Gift cards (see *02-customer-policies/07-gift-cards.md*).
- Store credit (issued via refund or goodwill).
- SmartCart Circle membership benefit applications (free shipping et al. applied at checkout).

## Payment processors

We use two payment processors at the platform level:

- **Stripe** — primary processor for North America, UK, Australia, New Zealand, Singapore, Hong Kong, Japan.
- **Adyen** — primary processor for EU and EEA markets, Switzerland, the UAE, and select APAC markets.

Both processors are PCI-DSS Level 1 compliant. We pass card data directly from the customer's browser to the processor via tokenization; the data never lands in our application.

Brands cannot choose between processors. We route based on the customer's billing country and our own risk model. The choice is invisible to brands.

## Tokenization

All card data is tokenized at the point of capture. The token is stored against the customer's account if they opt in to "remember this card." The actual card number is held by our processors; we hold an opaque token.

This means:

- We do not need to be PCI-DSS scope-aligned for storage; tokenization removes us from scope. We are scope-aligned anyway, voluntarily.
- A token is single-merchant. A token issued for our use cannot be used by anyone else.
- A customer can delete saved cards at any time from their account.

## When we charge

| Order type | When charged |
|---|---|
| Standard stocked goods | At order placement |
| Made-to-order ≤ $1,500 | At order placement |
| Made-to-order > $1,500 | 30% deposit at order; balance at production complete |
| Pre-order (announced future stock) | At order placement; refunded if cancelled |
| Backorder | At shipment, not at order |
| Subscription / Curated Boxes | At each cycle (quarterly), 7 days before ship date |
| Gift card | At purchase |
| SmartCart Circle membership | At signup; renews annually 7 days before expiry |

A few notes:

- For made-to-order with deposit, the customer authorizes the full amount at order; we capture the deposit immediately and the balance at production complete. If the authorization expires (typical bank policy: 7 days), we re-authorize at production complete and notify the customer if the bank declines re-auth.
- For pre-order and backorder, customers can cancel at any point until charge; refunds at shipment are subject to standard return policy.

## What customers see at checkout

A clean payment selector showing methods relevant to their billing country (we don't show iDEAL to a US customer). Saved methods appear at the top with the last 4 digits of the card. New cards collect via Stripe Elements / Adyen Drop-in — both PCI-compliant card forms.

Checkout currency is set by the customer's shipping country, not by their card's currency. The customer can switch currency from a top-of-page selector. We display a clear price quote in their chosen currency, with a small note about FX if different from their card currency.

## 3DS / SCA

3D Secure is invoked dynamically:

- Always required in EU and UK (Strong Customer Authentication).
- Risk-based elsewhere (high-value, unusual pattern, new card on file).

A customer who fails 3DS sees a clear "your bank declined" message and can retry with another method.

## Subscription billing

For Curated Boxes and SmartCart Circle:

- Stored token re-charged on the next cycle date.
- 7-day advance notice email to the customer.
- Failed charge: we retry once after 24 hours with smart retry (Stripe Network Token recovery, Adyen RevenueProtect). If still failing, we email the customer and pause.
- Customer can update payment method or cancel from their account.

## Brand-side billing

Brands do not pay SmartCartCommerce a subscription fee. Our compensation is the commission deducted from each order at payout. See *04-seller-operations/02-commission-and-payouts.md*.

The exception is the Marketing Co-op program — opt-in, transparent, billed separately to the brand. See *04-seller-operations/08-marketing-co-op-program.md*.

## What brands need to know about payments

- We are merchant of record. Your tax invoice to the customer reflects you only insofar as the line item; the tax-collected receipt comes from us.
- You do not handle customer card data, ever. PCI scope is ours.
- You do not pay payment processing fees directly; they are absorbed in our commission.
- You see refunds when they happen via your order page; you cannot initiate a refund directly. Refund requests go to concierge or via the order page's *Request refund* button.

## What customers can use that we don't list above

We get asked about:

- Cryptocurrency (Bitcoin, USDC, etc.). We do not accept. We have evaluated and the operational cost (volatility, refund mechanics, chargeback equivalent) has not been worth the very small share of customers who would use it.
- Wire transfer. Only for specific high-value orders, hand-coordinated by concierge. Not a self-serve checkout option.
- Check or ACH (US). ACH for one-off high-value orders only, manual.
- "Pay on delivery" (cash on delivery). Not supported anywhere.
- PayPal as a separate path. Where customers want PayPal, we accept it for B2B/wholesale orders only via the alternative checkout path (see *Fulfillment Options*); not on the standard consumer flow.

## Failed payments

When a customer's payment fails at checkout:

- Specific error message (e.g., "Insufficient funds," "Wrong CVV," "Card expired") is shown where the bank shares it.
- For 3DS failures: re-auth retry is offered.
- For "do not honor" or "card declined" without specifics: we suggest trying another method or contacting the bank.
- Concierge can help on the platform side; we do not have access to the customer's bank.

## Refunds and partial captures

- **Full refund.** Initiated by concierge upon return or eligible request. Hits the original payment method.
- **Partial refund.** Same path; common in damaged-item replacements where customer keeps the original.
- **Captures and re-captures.** Standard behavior of card networks; happens automatically. Brands don't see this layer.

## Compliance

PCI-DSS Level 1, with annual external audit by a Qualified Security Assessor. SOC 2 Type II, annual audit. We publish a summary of our compliance posture annually. Detail available under NDA for partners who need it (typically B2B/wholesale buyers).

## Operational SLAs

- Checkout availability: 99.99% rolling 30-day. Our 28 January 2026 incident was the only sustained checkout impact in the last 18 months.
- Refund posting time: under 1 business day on platform side; bank delivery 3–5 business days for cards, instant for gift card / store credit.
- Subscription renewal failure handling: smart retry then graceful pause within 7 days.

## Where to look elsewhere in the KB

- **Customer-facing payment FAQs:** *05-customer-support/01-support-faq-top-30.md* (Q20–Q21).
- **Privacy of payment data:** *02-customer-policies/04-privacy-policy.md*.
- **Refund timing back to payment instruments:** *02-customer-policies/01-returns-and-refunds.md*.
- **International / DDP charging:** *02-customer-policies/09-international-shipping-guide.md*.
- **Brand-side payouts (not customer payments):** *04-seller-operations/02-commission-and-payouts.md*.
- **Fraud services:** *09-admin-platform/05-orders-payments-shipping-tax/03-fraud-services.md*.
- **Tax handling:** *09-admin-platform/05-orders-payments-shipping-tax/06-tax-configuration.md*.
