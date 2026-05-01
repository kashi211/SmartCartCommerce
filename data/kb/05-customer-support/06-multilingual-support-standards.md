# Multilingual Support Standards

**Document type:** Internal — concierge ops
**Owner:** Saket Panwar
**Last reviewed:** 04 March 2026

---

## Languages we support

We staff fluent native or near-native speakers in eleven languages, covering business hours in their primary regions:

- English (primary; staffed from New York and Los Angeles offices)
- Spanish (US team in Los Angeles + Mexico City contractors; covers US Spanish-speaking customers and Latin America)
- French (New York + Paris contractor)
- Portuguese (São Paulo contractor; covers Brazil + Portugal customers)
- Italian (Milan contractor)
- German (Berlin contractor)
- Dutch (Amsterdam contractor partnership)
- Japanese (Tokyo office)
- Mandarin (Hong Kong contractor + Los Angeles)
- Korean (partner agency)
- Arabic (Dubai contractor partnership; standard MSA, with Gulf and Levantine speakers)

We do not currently staff: Russian, Hindi, Vietnamese, Thai, Indonesian. Customers writing to us in those languages get a polite English reply with translation tools acknowledged.

## Hours by language

Most languages are staffed on a regional schedule. Two have 24/7 coverage:

| Language | Hours | Notes |
|---|---|---|
| English | 24/7 | Primary; NY (Eastern) + LA (Pacific) coverage; Tokyo overnight |
| Spanish | 24/7 | LA team + Mexico City night contractor |
| French | 08–22 CET | NY morning overlap; Paris afternoon |
| Portuguese | 09–20 BRT | São Paulo contractor; Brazil + Portugal |
| Italian | 09–20 CET | Milan contractor |
| German | 08–20 CET | Berlin contractor |
| Japanese | 09–20 JST | Tokyo office |
| Mandarin | 09–20 HKT | Hong Kong + LA overlap |
| Korean | 09–18 KST | via agency |
| Arabic | 09–20 GST | via Dubai agency |
| Dutch | 09–18 CET | Amsterdam partnership |

If a customer writes in a staffed language outside that language's hours, we respond first in English with a brief note that a teammate will follow up in their language during regional hours. Many customers reply that English is fine.

## Translation tooling

We use a private LLM-based translation tool (DeepL Pro for European pairs, Google Translate API for CJK and Arabic). Translations are NEVER sent verbatim to customers. They are working drafts that a teammate reviews, edits for tone, and signs.

We do not use machine translation for any of:

- Apologies for serious incidents.
- Communications about damage, defect, or safety.
- Press inquiries.
- Legal correspondence.
- Bereavement-related interactions.

Those go to a fluent native speaker, even if it means the response is slower.

## Localization, not translation

Translating English support replies into French and calling it French support is not what we do. Localization includes:

- **Salutations and signoffs** in the appropriate register. Japanese support replies follow a different opening structure than English; we honor it.
- **Currency** in local format (€1.234,50 in German, €1,234.50 in Irish).
- **Date format** local (DD/MM in EU, MM/DD in US, ISO in Japan).
- **Address format** appropriate to the country.
- **Honorifics** where customary (Japanese -san, Korean honorifics, Arabic kunya). Do not over-formal in English-speaking markets where it would feel stiff.

## Cultural notes

Three high-leverage observations from years of practice:

**Japan.** Apology is a precise instrument. Over-apologizing in Japanese reads as theatrical, not heartfelt. The Tokyo team has its own apology gradient: 申し訳ございません (formal apology) for service errors, ご迷惑をおかけしました (regret for trouble caused) for inconvenience, etc. Concierge defers to the Japanese team here.

**Germany.** German customers value precision in commitments. Promising "soon" is a service failure. Promise "Friday at 17:00" or don't promise.

**France.** A formal opening (Madame / Monsieur, no first name) is the safe default unless the customer signed informally. The French team softens this for younger customers writing in informal register.

**Mexico / Spain.** Warm openings and explicit acknowledgment of the relationship work better than they do in northern European correspondence. "Espero que te encuentres bien" lands as care, not fluff, when used sparingly.

**Gulf / Arabic-speaking regions.** Patience is a virtue. Do not rush a customer toward resolution; they expect the conversation to develop. Religious calendar awareness during Ramadan: avoid scheduling delivery during iftar windows where flagged.

## Quality checks

The customer ops team does a weekly sample review across all languages. Samples are scored on accuracy, tone, localization, completeness. Reviewers include native speakers from outside the originating region (a Madrid teammate reviews Mexico City work; a Tokyo teammate reviews English-Japanese translation work) for fresh-eye feedback.

## When the customer requests another language

If a customer writes in language A but asks to be served in language B, we route to language B even if it's not regionally typical. Trust the customer's preference.

## Error handling

If a translation issue creates a real problem — wrong instruction sent, wrong policy applied, offensive phrasing — we treat it as a Sev-2 escalation, fix the immediate issue, write a brief note in the customer's language, and add the case to the next quality review.
