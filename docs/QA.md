# QA Gate

Every phase must validate:
- `npm run build`
- 1440×900 desktop
- 768×1024 tablet
- 390×844 mobile
- keyboard navigation
- prefers-reduced-motion
- no horizontal overflow
- 0 console errors
- 0 failed product asset requests
- lead CTA visible and usable
- real product never hidden by decorative effects

3D-specific:
- GLB loads without decoder surprises
- Orbit/zoom limits make sense
- GPU load reasonable on mid-range hardware/mobile
- fallback present if WebGL fails

## Tooling audit validation — 2026-11-13

This phase uses **375×812 mobile**, superseding the older 390×844 size above for the requested smoke gate. All projects use Chromium 158 (Playwright 1.65.0), including touch-enabled tablet/mobile emulation.

| Check | Result | Evidence / limit |
| --- | --- | --- |
| npm install | PASS | 429 packages audited; 7 moderate tooling findings |
| npm run build | PASS | Next 16.4.6 compiled and prerendered `/`; TypeScript completed |
| Dev server | PASS | Next ready on 127.0.0.1:3000, HTTP 200 |
| Desktop 1440×900 | PASS | Chromium smoke and full-page capture |
| Tablet 768×1024 | PASS | Chromium smoke and full-page capture |
| Mobile 375×812 | PASS | Chromium smoke and full-page capture |
| Console / requests | PASS | No console errors, uncaught page errors, failed requests or HTTP ≥400 in successful smoke runs |
| Quote path | PASS for local demo only | Hero CTA → quote anchor → fill required fields → local confirmation; no API, storage or delivery exists |
| WebGL | PASS for rendering | Live WebGL2 context, visible oven in captures; no physical GPU performance certification |
| Keyboard | Basic PASS | First brand link receives Tab focus; full keyboard viewer control absent |
| Reduced motion | GAP | Media preference emulated; CSS responds, but R3F flames keep animating and Motion hover/tap does not opt out |
| npm run lint | FAIL (pre-existing scene issue) | react-hooks/purity in oven-scene.tsx:10; PostCSS anonymous export warning |

Final browser command: `npm run test:e2e` → **3 passed (8.4s)**. Screenshots are generated under `test-results/home-commercial-page-conceptual-WebGL-and-local-quote-demo-{desktop,tablet,mobile}/{desktop,tablet,mobile}-full.png`; traces are retained on failures. These are QA artifacts, not marketing exports.

Initial browser attempt reused an older dev process and failed to display local form feedback. Restarting the root project dev server resolved all three cases without application changes. A second server on another port was rejected by Next's per-project dev lock; use one server at a time. Avoid building against an already-running stale dev process when diagnosing browser hydration issues.

### Visual observations (no redesign applied)

- Desktop headline is overly tall; hero quote actions fall below the initial 900 px viewport, although the header CTA remains visible.
- Tablet stacking is readable; viewer sits after copy/actions.
- Mobile header quote CTA and navigation are hidden. Hero actions remain reachable, but the viewer is below the initial fold and the model opening is clipped at its left edge.
- The scene's visible conceptual disclaimer is hidden by CSS on mobile. Preserve a visible concept disclosure in a future fix; the current model is not a faithful product representation.
- Existing messaging mixes oven sales with selling a WEB3D service, including developer jargon. Existing names/finish claims need approval. Temporary photos and conceptual geometry cannot establish product credibility.
- Large spacing, gold gradients and outlined badges remain starter styling, not a completed Mediterranean/industrial design system.

### Remaining production gates

No WebGL failure fallback, no accessible alternative viewer controls, continuous rendering, incomplete reduced-motion behavior, real-device performance unmeasured, unverified product details, temporary reference photography and no lead delivery. Smoke PASS does not certify a11y, conversion readiness, performance budgets or real Safari/mobile support.

### Setup changes

Root TypeScript and ESLint exclude the preserved nested starter copy. No application components, product data, original images or marketing files were changed. Next dev automatically appends its managed documentation block to AGENTS.md and refreshes next-env.d.ts; original project instructions remain intact. No commit created; root is not currently a Git repository.

## Conversion V1 production QA — 2026-11-13

This section supersedes earlier starter results where changed. Build first, then `npm run test:e2e`; Playwright starts a production server on port 3002 and shuts it down afterwards. No dev-server reuse.

Six Chromium cases: desktop 1440×900, tablet 768×1024, mobile 375×812, each in normal and reduced-motion mode. Checks: JAVA and professional-oven category, primary CTA in viewport, desktop viewer in viewport, skip-link keyboard focus, Explore anchor, visible concept disclosure, live WebGL2, camera drag changing rendered pixels, identical successive idle canvas captures, product image loads, filled required form fields, explicit no-send status, no POST, disabled pending WhatsApp, reduced-motion scroll behavior, no horizontal overflow, no browser console/page errors, no failed requests/HTTP errors.

Artifacts: `test-results/home-JAVA-oven-conversion-landing-—-reduced-motion-{true,false}-{desktop,tablet,mobile}/`. Each case captures full-page, first viewport and initial oven. Full-page captures include a rotated oven and populated form to demonstrate interaction; initial-oven captures show the original camera composition. Captures inspected visually for headline/CTA visibility, form layout, product clipping and copy/viewer collisions. Screenshots are QA artifacts, not modified marketing/source images.

The prior purity lint error is resolved. Scoped ESLint passes. Build passes. These are local Chromium checks; they do not establish real lead delivery, five-second user comprehension study, hardware performance, physical touch/Safari support or full accessibility compliance. Manual commercial review finds clear JAVA/oven positioning; business approvals remain missing. Full implementation/integration limits: CONVERSION-V1.md.

V1 final evidence: production build PASS; six smoke cases pass in both motion modes. Primary button foreground/background contrast measured at 4.93:1 (normal) and 6.09:1 (hover), meeting AA normal-text contrast for those states; no claim is made for every page color. The mobile hero was compacted after visual inspection to show the CTA and complete oven together in the first 812 px viewport. First-viewport capture waits for WebGL initialization; the page still requires client JS before the procedural oven appears.

## Current commercial delivery — 2026-11-13

Production build PASS; scoped ESLint PASS; **15 production tests passed (47.2s)** across 1440×900, 768×1024 and 375×812. Checks now include approved WhatsApp destination/encoded message, product and situation preselection, native required fields, popup fallback, no false sent state, no first-party POST, FAQ, no-JavaScript contact, opt-in 3D, keyboard rotation/reset, native wheel/reversal/resize, reduced motion and renderer-unavailable recovery. Normal browser cases have zero console/page errors and failed requests. Expected renderer failures in deliberate unsupported-WebGL tests are separate from the normal-error gate. WhatsApp navigation is intercepted: no test messages sent. Updated screenshots and metrics: artifacts/commercial-final/. Full scope and limitations: COMMERCIAL-DELIVERY.md.
