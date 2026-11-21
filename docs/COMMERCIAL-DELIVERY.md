# JAVA — commercial delivery

Date: 2026-11-13. The user authorized finishing the commercial experience with implementation autonomy, supplied `645466308` and approved use of the two current photographs. The Spanish country prefix follows the existing Spain project context. Destination: **+34 645 466 308**. This document supersedes older “contact not configured / demo submission” findings.

No €500,000 valuation, conversion rate or revenue claim has been invented or validated. This delivery improves the actual product presentation and lead journey; it is not a financial valuation.

## What is finished in the application

- Photographic product-first hero, stronger JAVA typography, warm charcoal/ivory/terracotta art direction, editorial spacing and responsive layout.
- A real photo is the initial product representation. The two existing files are unchanged and their publication approval is recorded in structured data. They are still reference crops; high-resolution originals would improve the assets.
- Two neutral product references with individual quote actions and retained selection in the form. “Carácter dorado” and “Espíritu italiano” are editorial descriptions of the visible appearance, not official model names, material specifications or manufacturing-origin claims.
- Project choices prefill the relevant situation. FAQ addresses the actual purchase conversation without temperatures, capacity, certifications, warranty or customer claims.
- Working WhatsApp click-to-chat handoff, direct conversation, telephone and a popup-blocking fallback. Phone/email is optional because the visitor is already contacting the seller through WhatsApp; name, city and project situation are required.
- Opt-in cinematic experience retained. Its heavy module graph loads only on activation, preserving the earlier reversible camera/detail/explosion/reassembly sequence as a clearly labeled concept. The first sales screen never depends on it.
- Keyboard rotation, visible rotation/reset buttons, autofocus into the activated viewer, live reduced motion and a renderer-error recovery path to product photography.
- Metadata, Spanish language, local SVG favicon and actual-domain-driven canonical/social/indexing configuration. No invented domain, business identity or structured-data ratings/offers.

## Real lead flow and data boundary

Product action → product select populated; project action → situation populated. Native required-field validation precedes any handoff. The form builds a WhatsApp URL containing name, city, situation, reference and optional contact/message, plus “Origen: web JAVA”. The payload uses URL encoding, including special characters. Input sizes are bounded.

Opening WhatsApp is not sending a message. The UI explicitly tells the visitor to review and send it, reports only “Tu solicitud está preparada”, and preserves a direct link if the popup is blocked. There is no false backend-success state. Editing the form clears the stale prepared URL.

No first-party API, database, mail send, analytics tracker, localStorage or cookie storage is added. Details are passed to WhatsApp when the visitor continues; the explanatory text reflects this actual handoff. A disabled pre-hydration submit button prevents accidental native GET submissions containing form values. Without JavaScript, direct WhatsApp/telephone contacts and the noscript link remain available.

The format follows WhatsApp's official [click-to-chat documentation](https://faq.whatsapp.com/5913398998672934). QA intercepts the external URL and checks the destination/payload without contacting the seller or sending test messages. WhatsApp account registration and message receipt on the seller's physical device were not tested.

## Performance and resilience

Observed fresh local production browser captures before 3D activation:

| Viewport | Initial JS encoded | Decoded | Initial Canvas | Errors | Overflow |
| --- | --- | --- | --- | --- | --- |
| 1440×900 | approximately 145 KB | approximately 485 KB | 0 | 0 | none |
| 768×1024 | approximately 145 KB | approximately 485 KB | 0 | 0 | none |
| 375×812 | approximately 145 KB | approximately 485 KB | 0 | 0 | none |

Source: `artifacts/commercial-final/browser-evidence.json`. Encoded/decoded sizes are Resource Timing sums in fresh local Chromium contexts, not a field performance score, mobile network benchmark or comparison against a measured previous baseline. The local DOMContentLoaded timings are not production LCP/INP claims.

No new dependencies, font downloads, textures, postprocessing, automatic animation or rendering loop. Next Image preloads the hero and sizes the reference images. Existing 3D uses demand rendering and capped DPR. If rendering fails, an error boundary retains the sales path. No-JavaScript contact is tested separately.

Key contrast pairs calculated: primary CTA foreground/background 4.95:1; dark-page muted text 8.72:1; cream-page secondary text/placeholders 5.67:1. Warm accent text on charcoal is 7.94:1. This is not a full accessibility certification; Safari, assistive technology and physical GPU behavior still deserve real-device review.

## Production QA

Build and scoped ESLint pass. **15 production tests passed (47.2s).** The final production suite covers all three viewports:

- Quote CTA in initial viewport, visible JAVA and real photograph, one h1 and product-specific metadata.
- No Canvas before explicit activation; original reference images loaded.
- Skip-link focus, native FAQ expansion, no overflow, normal/reduced motion.
- Product/situation preselection; invalid-form blocking; actual destination number and correctly encoded message; popup fallback; stale-link reset; no first-party POST.
- Direct telephone and WhatsApp links; no-JavaScript contact.
- Cinematic states, seek/reversal, resize, reassembly, wheel scrolling, manual OrbitControls, keyboard arrows/Home, accessible buttons and live reduced-motion changes.
- WebGL-disabled recovery to product photos and quote selection.

Functional handoff requests are intercepted in tests. Deliberate renderer-failure tests are separate from the normal-browser zero-console-error gate; expected renderer failures must not be represented as normal runtime errors. Fresh screenshots were opened and inspected visually.

## Review files

- [Desktop hero](../artifacts/commercial-final/desktop-hero.png)
- [Desktop full page](../artifacts/commercial-final/desktop-full.png)
- [Tablet hero](../artifacts/commercial-final/tablet-hero.png)
- [Mobile hero](../artifacts/commercial-final/mobile-hero.png)
- [Mobile full page](../artifacts/commercial-final/mobile-full.png)
- [Browser evidence](../artifacts/commercial-final/browser-evidence.json)

Capture command: start production on port 3004, then `node scripts/capture-review.mjs`. It writes QA artifacts only, not source/marketing assets.

## Owner data still needed for publication/content expansion

A real domain and the business identity/publication details are not supplied. The site therefore keeps search indexing disabled until NEXT_PUBLIC_SITE_URL is configured with a real HTTPS domain and rebuilt. No deployment has been performed.

Official model names, specifications, prices, warranty, installation/support terms and company history remain unverified. They are omitted or kept null rather than invented. Sales can start through the quote conversation; the exact product/conditions must be confirmed by the seller. No fake product data, testimonials, manufacturer history or revenue promise was added.

## Files

Application: app/page.tsx, app/globals.css, app/layout.tsx, app/icon.svg; components/header.tsx, product-card.tsx, lead-form.tsx, oven-scene.tsx, new product-experience.tsx; lib/products.ts, new lib/site.ts. Configuration/docs: .env.example, README.md, START-HERE.md, this report. QA: tests/home.spec.ts, tests/cinematic.spec.ts, new scripts/capture-review.mjs and artifacts/commercial-final/.

The earlier cinematic implementation, geometric assets and immutable reference files are retained. No npm dependency change, Git commit, public deployment or PedidoAI integration.
