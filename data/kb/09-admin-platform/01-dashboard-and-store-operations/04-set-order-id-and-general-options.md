# Set Order ID & General Options

**Document type:** Brand-facing reference
**Owner:** Saket Panwar
**Last reviewed:** 18 February 2026

---

## Set Order ID

An infrequently used but occasionally critical operator tool. Found at *Store → Operator Tools → Set Order ID*.

It does one thing: lets you set the next order number SmartCartCommerce will assign to your brand. The most common reason to use it is migration — a brand joining the platform mid-life wants their SmartCartCommerce orders to continue from where their previous system left off (e.g., next order is #12,847 because their existing accounting reconciliation depends on continuity).

Rules:

- The new order ID must be **higher** than the current ID. We do not let you decrement; that would create collisions.
- The change is logged in the changelog and notifies your account lead.
- The change is irreversible without manual platform-side intervention.
- It is not retroactive: existing orders keep their existing IDs.

Permission: Owner only.

## General Options — Admin Options

A small panel of console preferences. Found at *Store → General Options → Admin*.

| Option | What it does |
|---|---|
| Default landing page | Where you land after sign-in — Home, Pending Orders, or Catalog. |
| Time zone for display | Affects timestamps shown in the console. Stored data remains UTC. |
| Notification email | Where the system sends operational notifications. Defaults to Owner email. |
| Items per page | 25, 50, 100, or 200. Larger values load slower; smaller paginate more. |
| Confirmation prompts | On / Off — whether destructive actions ask for confirmation. We strongly recommend leaving on. |

## Sessions

Customer session behavior on your brand page. Found at *Store → General Options → Sessions*.

These settings are platform-managed by default; brands rarely change them. The fields you can see (mostly read-only) include:

**Session behavior.** Cart-with-session lifetime: 30 days for signed-in customers, 14 days for guests. Anonymous browse session: 4 hours.

**Session link variable.** SmartCartCommerce supports a session link variable for cart abandonment emails. The variable embeds a one-time URL that re-hydrates the customer's cart when clicked. Brands using cart-abandonment integrations need this enabled (it is, by default).

**Session length.** How long a customer stays signed in. Default is 30 days; brands cannot change this — it's a platform-level decision.

**Session links in checkout.** Whether session-restored carts can complete checkout without re-authentication. Default is *yes for guests, no for signed-in*. Cannot be changed.

## Web Service ID Info

Read-only. Shows your brand's web service identifiers, used by some product syndication and integration partners. Found at *Store → General Options → Web Service IDs*.

Fields:

- **Brand ID** — your unique platform identifier (immutable).
- **Catalog feed URL** — endpoint partner integrations can pull from with your token.
- **Webhook signing secret** — used to verify webhooks from us. Rotate from this page; rotation invalidates the previous secret immediately.

A few partner integrations (Klaviyo, Omnisend) configure themselves automatically and don't need any of this. Others (a custom analytics tool, a bespoke ERP integration) need the IDs above.

## Things you cannot configure here

Several things that look like "general options" but live elsewhere or aren't user-configurable on the platform:

- Domain names and DNS — see *02-catalog-and-content-management/07-site-settings-and-domains.md*.
- Customer-facing checkout flow — platform-managed, intentionally consistent across brands.
- Currency display in the console — set by your team's locale; checkout currency is set by the customer.
- Storefront theme — platform-managed editorial design.

If you find yourself looking for a setting we don't surface, message your account lead. Sometimes the answer is "we'll add it"; sometimes the answer is "we made that decision deliberately and here's why."
