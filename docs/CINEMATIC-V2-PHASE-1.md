# JAVA cinematic scroll V2 — Phase 1

Implemented 2026-11-13. One scroll-driven sequence replaces only the original hero container. The rest of the commercial landing, reference photos, lead form and product data remain unchanged. No new dependency, backend, page, PedidoAI, deployment or commit. Phase 2 is not started.

## Directed sequence

`CinematicHero` uses Motion's normalized `useScroll` progress across one native-scroll track. Its sticky stage contains the existing copy, a single existing Canvas and a quote action in every chapter. The header and initial hero still identify JAVA/professional pizza ovens. “Ver hornos JAVA” and quote anchors bypass the story normally; no wheel handlers prevent default, no body scroll lock or scroll snapping.

| Progress | Camera/product presentation | Copy |
| --- | --- | --- |
| 0 | Assembled, three-quarter initial pose | Existing JAVA headline and both actions |
| .25 | Gentle orbit to the other front angle | Diseñado para el trabajo profesional |
| .48 | Closer, front/dome emphasis | Observa sus formas y detalles |
| .72 | Wider framing, dome/chimney/front assembly separate | Descubre cómo está construido |
| 1 | Return to initial camera and assembled geometry | Imagina tu próximo JAVA; quote CTA |

All camera positions, targets and separation factors are sampled from one deterministic normalized timeline in `lib/oven-story.ts`. Segment interpolation uses smoothstep, with zero derivative at each keyframe. There is no time-based spring chasing a scroll target, no independently running model tween and no automatic rotation. Fast jumps seek directly; scrolling back reverses the same mapping.

Only existing component transforms change: dome rises, chimney rises farther, and the front assembly moves slightly forward. No interior layers, new texture, component geometry or material facts were fabricated. Existing lights/materials/fog are preserved. The same transformation returns each original part to its starting position.

The requested professional-use and construction chapter headings appear alongside explicit visible disclosure: this is a conceptual mockup, and real forms/finishes/construction remain pending validation. The viewer also states “despiece ilustrativo, no técnico”. The despiece must not be presented as verified product engineering.

## Interaction and responsive behavior

OrbitControls remains enabled, bounded and undamped. Directed camera changes are applied as deltas from the previous timeline pose, preserving the visitor's orbit offset rather than resetting it on every scroll update. Reversing the story after manual orbit is tested. Existing zoom/pan restrictions remain unchanged.

Desktop track: 320svh; mobile track: 250svh. The sticky stage occupies one viewport; native page scrolling consumes the extra 220/150svh. Narrow viewers below 400 px (including the tablet's narrow column) use 35% of camera travel and 55% of part separation. This is measured from the actual Canvas size and reevaluates on resize. Mobile reserves 330 px for chapter copy to keep the viewer stable as headings change. CTA remains above it and visible. No desktop-scale explosion is forced onto the phone.

## Reduced motion and performance

A live `matchMedia` subscription through `useSyncExternalStore` responds both at load and when the preference changes. Reduced motion collapses the long scroll track, removes sticky choreography, selects the initial assembled camera/parts and shows stable original copy. No animated explosion or camera orbit is tied to scroll in that mode. Manual product rotation remains available. Server rendering conservatively starts with the static alternative before the client preference is known.

The installed Motion useReducedMotion hook held its initial value during the first live-toggle test; the explicit subscription fixes the new choreography's behavior. The chapter text uses Motion opacity only, about 250 ms, without hiding the whole product or delaying initial content.

Canvas retains `frameloop="demand"`, DPR 1–1.5 and no postprocessing/new textures. The rig updates transforms/camera and calls invalidate on progress or responsive/preference changes; Drei also invalidates for manual camera interaction. No useFrame loop, timers or perpetual rendering were added. React chapter state changes only at chapter boundaries. Repeated idle canvas screenshots remain unchanged. This evidence does not certify actual device frame rate, GPU power, LCP or INP.

## QA and inspected evidence

- `npm run build`: PASS.
- Scoped ESLint for changed TSX/TS and tests: PASS.
- `npm run test:e2e`: **9 passed (39.4s)** against `next start` production.
- Chromium desktop 1440×900, tablet 768×1024 and mobile 375×812: PASS.
- Console errors / failed requests / HTTP errors: 0 in monitored production cases.
- Existing six commercial tests cover both motion preferences, brand/category, visible quote action, keyboard entry, WebGL/drag, reference image loads, form unavailable state/no POST and no overflow.
- Three new story tests cover all five states, forward/back seeks, large seeks, reassembly matching the initial view, idle stability, actual wheel input, resizing, OrbitControls after the story, preserved orbit through replay, quote access and live reduced-motion changes.
- Mobile screenshot comparisons allow a 1 px crop-rounding edge and less than 2% significant pixel difference; the initial 280 vs 281 px sticky screenshot discrepancy was capture geometry, not a failed reassembly. Desktop/tablet reassembly and reverse also passed visual comparison. This tolerance is documented rather than claiming byte-identical screenshots everywhere.

Separate wheel-driven walkthrough: Playwright sent repeated native wheel events up to each chapter on desktop/mobile and then reversed. Captures and wheel coordinates were inspected, in addition to direct-seek assertions. This is browser-driven input and visual review, not a claim of testing a physical mouse/phone or a human usability study. `wheel-walkthrough/wheel-log.json` records chapters 1–4 at each expected stop.

### Screenshot links

- [Hero at initial page position](../artifacts/cinematic-v2/desktop/00-first-viewport.png)
- [Camera move](../artifacts/cinematic-v2/desktop/02-camera.png)
- [Detail](../artifacts/cinematic-v2/desktop/03-detail.png)
- [Exploded](../artifacts/cinematic-v2/desktop/04-exploded.png)
- [Reassembled](../artifacts/cinematic-v2/desktop/05-reassembled.png)
- [Mobile hero](../artifacts/cinematic-v2/mobile/00-first-viewport.png)
- [Mobile mid-scroll](../artifacts/cinematic-v2/mobile/04-exploded.png)
- [Tablet exploded](../artifacts/cinematic-v2/tablet/04-exploded.png)
- [Wheel walkthrough](../artifacts/cinematic-v2/wheel-walkthrough/wheel-log.json)

Five states and reduced-motion captures for all three sizes persist in `artifacts/cinematic-v2/{desktop,tablet,mobile}/`. Initial page-position screenshots include the header; the story's 01-hero screenshots show the sticky start after the header has naturally scrolled away. All requested state screenshots were opened and inspected. The initial layout/CTA still fits; no product clipping or copy/model collision was observed. The exploded front exposes the original primitive flame geometry; it remains a visual limitation of this concept, not a new construction claim.

## Issues fixed during QA

1. Live reduced-motion toggles initially left choreography active: explicit external-store media subscription now updates it immediately.
2. Mobile chapter copy originally moved the Canvas within its flex layout: reserving copy height stabilizes it.
3. The initial separation kept chimney/dome visually attached: increased only their presentation offset and widened the exploded camera/target; no asset geometry changed.
4. State screenshots initially caught chapter text mid-fade: captures now wait for the completed opacity transition; continuous camera motion is still tested with wheel input separately.

## Remaining blockers and honest limits

**Final premium approval remains blocked.** The current oven still has simplified conceptual geometry/materials; scroll storytelling cannot make it a faithful commercial product. Javier must supply original photography, real model references and approved product geometry/material/construction data. Approved names/specs/prices/warranty/install/support/business history remain pending. Lead delivery/WhatsApp remain explicitly unconfigured as in V1.

The pointer-only viewer still lacks keyboard orbit controls and full context-loss recovery. Actual touch gestures, Safari, short landscape viewports, screen readers and physical mid-range GPU performance are not certified by these Chromium viewport checks. The minimum 700 px stage protects the requested portrait layouts; a shorter landscape screen may require scrolling to reach all stage content. No release or accessibility certification is implied.

Changed source: `app/page.tsx`, `app/globals.css`, `components/oven-scene.tsx`, new `components/cinematic-hero.tsx`, new `lib/oven-story.ts`, `tests/home.spec.ts`, new `tests/cinematic.spec.ts`; this document and QA screenshot artifacts. Dependency manifest/lockfile and original assets untouched.

Commit: NOT CREATED. Stop after Phase 1.
