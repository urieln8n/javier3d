# JAVA conversion landing V1

Implemented 2026-11-13. This request supersedes the earlier planning-only restriction in DESIGN-DIRECTION.md and HERO-SPEC.md, and the old WEB3D service positioning. One page, one primary intent: solicitar presupuesto. No commit or deployment.

## Commercial structure

Hero → project situations → explore JAVA → two oven references → why JAVA → product proof placeholder → quote form. JAVA, professional pizza ovens and pizzeria projects replace all developer/service copy. Headline: “Tu pizzería. Tu horno. JAVA.” No company history, materials, temperature, capacity, certifications or delivery/support promises were invented.

The two structured entries use JAVA Oven 01/02 as neutral temporary identifiers. Approved name, specifications, price and originalPhotography are null in lib/products.ts. Existing photos were reused unchanged and labeled provisional. The proof section is explicitly a future place for original photography, not a fabricated installation. Concept disclosure is visible on desktop/tablet/mobile.

## Lead integration boundary

LeadForm has name, contact (phone or email), city, situation and optional message. Required fields use browser validation. The contact field intentionally permits either channel; it is not an email-only input. A valid preview submission calls preventDefault and displays “No se ha enviado tu solicitud”. It makes no API request, stores no data and never displays successful delivery. WhatsApp is disabled and visibly pending; no number is fabricated.

A future separately authorized integration must replace the unavailable submit handler with a validated delivery adapter/server endpoint, confirm destination with Javier, define privacy notice/consent and retention, and implement actual success/error states. Validate phone/email server-side, protect against duplicate/abusive submissions and verify delivery before reporting success. No backend/auth/database was added in V1. Release remains blocked until real contact delivery exists.

## 3D and performance

One existing Canvas in the hero; the explore section links back to it rather than creating a second WebGL context. Mesh geometries/materials remain the original concept. Camera changed to [2.2, 1.6, 7.4], FOV 36; DPR capped at 1.5. Background matches charcoal. Flames retain their geometry but remain static. Removing useFrame/Math.random eliminates automatic motion and the prior purity lint error.

`frameloop="demand"` and non-damped OrbitControls allow renders on camera interaction rather than a perpetual scene loop. Screenshots before/after drag differ; successive idle canvas screenshots are identical in normal and reduced-motion modes. This is behavioral evidence, not a measurement of hardware GPU power or field Web Vitals. Zoom is disabled to keep this bounded presentation safe from user-induced clipping. Drag rotation is retained. Canvas allows vertical page gestures via touch-action: pan-y; physical touch behavior remains to verify.

Main page/product rendering remains server-side; only header feedback, lead preview and existing viewer need client code. No new library, font download, model download, shadows, postprocessing or backend. Next Image serves existing reference images. Heavy Three client code still loads with the hero; no claim of a measured JS reduction or mobile frame-rate budget. No full GLB fidelity is possible with the conceptual model.

## Accessibility and motion

Semantic h1/h2 hierarchy, named navigation/viewer, skip link, explicit input labels, required-field instruction, native select, status announcement and visible focus. Motion only gives restrained header hover/tap feedback and respects useReducedMotion. CSS smooth scrolling becomes instant for reduced motion. The viewer has no automatic animation in either mode. No scroll reveal hides content or delays the CTA.

Known gap: product rotation remains pointer based; the focusable viewer does not have an equivalent keyboard orbit UI. Controls were not added because this phase forbids new 3D features. Photography and quote links provide a noninteractive alternative to understanding available references. Canvas has an unavailable-WebGL text fallback; full context-loss recovery/error boundary is not implemented. Physical Safari/mobile, screen readers and 200% text zoom are not certified by the Chromium smoke suite.

## Final review references and limits

React best-practices review: server/client boundaries kept small, no render-time impurity, labeled controls, no added dependencies, stable product keys, untrusted input never persisted. Scoped ESLint passes for app/components/lib/tests/playwright.config.ts.

Manual final review used the five dimensions from the upstream [Impeccable audit reference](https://github.com/pbakaus/impeccable/blob/main/skill/reference/audit.md): accessibility, performance, theming, responsive layout and implementation integrity. This is not a run of Impeccable's detector/CLI; that engine and hooks were not installed. No automated Impeccable score or full WCAG compliance is claimed.

Findings:
- Release blocker: no configured quote or WhatsApp delivery; explicitly communicated in preview.
- Release blocker: approved factual content, original product/installation photos and real model missing. Placeholders disclosed rather than fabricated.
- Accessibility follow-up: pointer-only rotation, small ancillary text, physical gesture and screen-reader checks outstanding.
- Performance follow-up: hero Three bundle still loads eagerly; measure real hardware before deciding whether to split it further. No field metrics measured.
- Theming follow-up: base tokens are centralized; several section colors remain explicit CSS values. No theme switch was requested.
- Positive evidence: no developer copy, no invented testimonials, consistent quote intent, visible JAVA, legible form, motion preference respected, no collisions/overflow at requested sizes, no new dependencies.

## Business information needed from Javier

Approved wordmark/brand assets and copy; official model names, specs and pricing/quote conditions; original photos and usage permissions; real installation/operation images; company/manufacturing history if published; confirmed installation/support terms; quote destination and approved WhatsApp; business identity/privacy information. No product claims should go live before verification.

## Phase boundary

V1 is a local reviewable commercial prototype, not a launched lead engine. Old STACK.md/QA.md audit entries are historical; their V1 addenda describe current behavior. Do not start new pages, catalog enrichment, PedidoAI, model production, deployment or commits from this document.
