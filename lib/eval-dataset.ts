import type { Persona } from './types';

export interface EvalCase {
  input: string;
  expected: string;
  metadata: {
    persona: Persona;
    category: string;
  };
}

export const GOLDEN_DATASET: EvalCase[] = [
  // ── Customer: Returns ──────────────────────────────────────────────
  {
    input: 'What is your return window?',
    expected: '60 days from the date of delivery for most items.',
    metadata: { persona: 'customer', category: 'returns' },
  },
  {
    input: 'Is return shipping free?',
    expected: 'Free in 14 markets including the US, Canada, UK, and major European countries. Discounted rates in other markets.',
    metadata: { persona: 'customer', category: 'returns' },
  },
  {
    input: 'Can I return opened beauty products?',
    expected: 'Opened beauty items are returnable within 14 days only if there is a sensitivity reaction or formulation concern.',
    metadata: { persona: 'customer', category: 'returns' },
  },
  {
    input: 'How long does a refund take after I return something?',
    expected: 'Refund is processed within 1 business day of the item being received and scanned. Funds appear on your card within 3–5 business days after that.',
    metadata: { persona: 'customer', category: 'returns' },
  },
  {
    input: 'Can I return a personalized jewelry piece?',
    expected: 'No. Engraved, sized, or commissioned pieces are non-returnable. Stock jewelry follows the standard 60-day window.',
    metadata: { persona: 'customer', category: 'returns' },
  },

  // ── Customer: Shipping ─────────────────────────────────────────────
  {
    input: 'How long does shipping take to the UK?',
    expected: 'Most orders ship within 24–72 hours. Delivery windows vary by carrier and destination — check the product page for the specific handling time.',
    metadata: { persona: 'customer', category: 'shipping' },
  },
  {
    input: 'Do you ship internationally?',
    expected: 'Yes. SmartCartCommerce ships to 64 countries and is the merchant of record on every order.',
    metadata: { persona: 'customer', category: 'shipping' },
  },
  {
    input: 'What happens if my item arrives damaged?',
    expected: 'Send photos to concierge within 14 days. SmartCart will replace, repair, or refund — your choice. No unboxing video required.',
    metadata: { persona: 'customer', category: 'damage' },
  },

  // ── Customer: Orders ───────────────────────────────────────────────
  {
    input: 'Can I cancel my order?',
    expected: 'Yes, any time before the order ships. After it ships, the return process applies. Made-to-order items have separate cancellation rules.',
    metadata: { persona: 'customer', category: 'orders' },
  },
  {
    input: 'Why are my items shipping separately?',
    expected: 'Most items ship directly from the maker\'s studio. Orders from multiple brands arrive in separate packages.',
    metadata: { persona: 'customer', category: 'orders' },
  },

  // ── Customer: Loyalty ──────────────────────────────────────────────
  {
    input: 'What is SmartCart Circle?',
    expected: 'SmartCart Circle is a paid annual membership loyalty program offering benefits like extended return windows, priority concierge access, and other perks.',
    metadata: { persona: 'customer', category: 'loyalty' },
  },

  // ── Concierge: Support playbooks ──────────────────────────────────
  {
    input: 'When should I escalate a customer issue?',
    expected: 'Escalate when the issue involves a high-value customer, a significant financial impact, repeated failures, or safety concerns. Check the severity flags in the escalation playbook.',
    metadata: { persona: 'concierge', category: 'escalation' },
  },
  {
    input: 'How do I handle a VIP Circle member complaint differently?',
    expected: 'Circle members receive priority handling: faster response times, more senior agent assignment, proactive updates, and greater authority to resolve without escalation.',
    metadata: { persona: 'concierge', category: 'vip' },
  },
  {
    input: 'What is the refund decision tree process?',
    expected: 'The refund decision tree guides agents through item condition, return window eligibility, category exceptions, and whether to offer a full refund, partial refund, or exchange.',
    metadata: { persona: 'concierge', category: 'refunds' },
  },
  {
    input: 'What tone should I use when a customer is frustrated?',
    expected: 'Use empathetic, calm language. Acknowledge the frustration first before moving to resolution. Avoid defensive phrasing. Follow the tone and empathy guide for specific situation examples.',
    metadata: { persona: 'concierge', category: 'tone' },
  },

  // ── Brand Partner: Operations ──────────────────────────────────────
  {
    input: 'What commission rate does SmartCartCommerce charge?',
    expected: 'Commission rates are structured in bands by product category. Refer to the commission and payouts document for exact percentages per category.',
    metadata: { persona: 'brand-partner', category: 'commission' },
  },
  {
    input: 'How does the 90-day onboarding process work?',
    expected: 'The onboarding arc covers store setup, catalog upload, photography approval, first-order readiness, and performance benchmarking — spread across a 90-day structured timeline.',
    metadata: { persona: 'brand-partner', category: 'onboarding' },
  },
  {
    input: 'What are the 5 core performance metrics for sellers?',
    expected: 'The five metrics tracked on the brand scorecard cover order fulfillment rate, cancellation rate, response time, return rate, and listing quality — each with defined SLA thresholds.',
    metadata: { persona: 'brand-partner', category: 'performance' },
  },
  {
    input: 'How do I handle a stockout for a popular item?',
    expected: 'Update inventory immediately via the admin console. You can mark items as made-to-order with an estimated lead time, or temporarily delist until restocked.',
    metadata: { persona: 'brand-partner', category: 'inventory' },
  },
  {
    input: 'What photography standards are required for product listings?',
    expected: 'SmartCart requires high-resolution images on white or neutral backgrounds, multiple angles, and lifestyle shots. Specific pixel dimensions, file formats, and styling rules are outlined in the photography and listing standards document.',
    metadata: { persona: 'brand-partner', category: 'listings' },
  },
];
