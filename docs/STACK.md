# Stack audit and tooling boundary

Audit date: 2026-11-13. Scope: tooling, setup, browser QA and planning only. No redesign, asset conversion, catalog work, deployment or commit.

## Installed versions

Verified with `npm ls --depth=0` after `npm install`; ranges in package.json are not exact installed versions. package-lock.json records resolution.

| Layer | Package | Declared | Installed |
| --- | --- | --- | --- |
| Runtime | next | ^16.3.8 | 16.4.6 |
| Runtime | react / react-dom | ^19.2.0 | 19.3.1 / 19.3.1 |
| Runtime | three | ^0.186.0 | 0.186.1 |
| Runtime | @react-three/fiber | ^9.7.0 | 9.8.2 |
| Runtime | @react-three/drei | ^10.7.8 | 10.7.9 |
| Runtime | motion | ^12.23.24 | 12.43.0 |
| CSS build | tailwindcss / @tailwindcss/postcss | ^4.1.17 | 4.3.5 / 4.3.5 |
| Build | typescript | ^5.9.2 | 5.9.3 |
| QA | @playwright/test | ^1.55.0 | 1.65.0 |
| Lint | eslint / eslint-config-next | ^9.35.0 / ^16.3.8 | 9.39.5 / 16.4.6 |
| Types | @types/node | ^22.15.0 | 22.20.5 |
| Types | @types/react / @types/react-dom | ^19.1.0 | 19.3.0 / 19.3.0 |

Host validation: Node 24.22.2, npm 11.19.1. These are observed versions, not a newly enforced engine policy.

## Architecture

- Next App Router: `app/layout.tsx` supplies Spanish document language and metadata. `app/page.tsx` is the single commercial page; build prerenders `/` and framework not-found route.
- Server components: Home and ProductCard. Client boundaries: Header (Motion), OvenScene (WebGL), LeadForm (local state).
- Page sequence: header, hero, existing product cards, experience benefits, construction, content callout, quote form, footer. No new sections added.
- `lib/products.ts` holds two temporary reference entries. Technical facts remain pending in descriptions; no verified specification schema or real catalog exists. Model names/finish descriptions still need Javier's approval.
- `app/globals.css` imports Tailwind 4 but primarily uses hand-written semantic CSS. Tailwind is not a duplicate runtime styling engine; no second UI kit found.
- `public/images/hornos/` holds two temporary WebP reference crops; `public/models/` contains only instructions, no GLB. `docs/reference/` contains concept visuals. Originals and marketing files were untouched.
- A nested `hornos-java-web3d-starter/` duplicates the app and has its own dependencies/build artifacts (about 455 MB at audit). Preserve it, but exclude it from root TypeScript and ESLint. Do not treat this as a second production app. No Git repository metadata exists at the project root.

## Current 3D and animation

`components/oven-scene.tsx`: procedural meshes, standard materials, lights, fog, bounded OrbitControls and three animated flame meshes. Camera `[3.8, 2.2, 5.1]`, FOV 34, DPR 1–1.7. No GLB loader, postprocessing, physics, AR, GSAP, scroll engine or backend. No direct runtime dependency is clearly redundant.

The default continuous Canvas loop and `useFrame` animate flames even with reduced motion or offscreen. CSS reduced-motion rules disable smooth scrolling/CSS animation but do not stop R3F or Motion transforms. Header uses Motion only for hover/tap. There is no cinematic entrance yet. WebGL fallback/error recovery and keyboard-accessible product controls are absent. `Math.random()` inside useMemo causes the existing react-hooks/purity lint error; left untouched to preserve the current model. One existing PostCSS anonymous-export lint warning also remains.

## Runtime versus tools

Only Next/React, Three/R3F/Drei and Motion belong in application JS. Tailwind/PostCSS, TypeScript, ESLint, Playwright and future gltfjsx are development/build tools. Blender is external asset-authoring software, not installed or validated here. Design skills, component discovery and audit guidance must never be imported into the website or added as runtime dependencies.

| Tool | Prepared role and status | Primary reference |
| --- | --- | --- |
| UI UX Pro Max | Design guidance reference documented; skill not installed or executed. Use in a separately authorized design phase, subordinate to DESIGN-DIRECTION.md. | https://github.com/nextlevelbuilder/ui-ux-pro-max-skill |
| 21st.dev | Optional component discovery; no MCP configured, no component installed. Review source, license, a11y and dependency cost before adoption. | https://21st.dev/ |
| Impeccable | Final visual audit reference; skill/hooks not installed or executed. Reserve for implemented design review. | https://impeccable.style/ |
| Vercel Web Interface Guidelines | UX/a11y checklist reference prepared; not an installed skill or a claim of full compliance. Known gaps recorded above and in QA.md. | https://github.com/vercel-labs/web-interface-guidelines |
| Scroll Craft | Deferred, no installation or integration. Require a product-comprehension use case and mobile/reduced-motion plan first. | https://github.com/nateherkai/scroll-craft |
| gltfjsx | Versioned workflow below; deliberately not installed with no GLB to process. | https://github.com/pmndrs/gltfjsx |

No third-party design skills were available in the session skill catalog, and no substitute skill files were invented. Documentation prepares their use without claiming installation. No new npm dependencies were added or removed.

## GLB / gltfjsx workflow — future execution only

Current registry version checked: 6.5.3. It converts GLTF to R3F JSX; `--transform` additionally changes/optimizes the asset. Package metadata reports approximately 1.15 MB unpacked for gltfjsx itself, plus transitive transforms, Draco, meshoptimizer, Prettier and a separate Three 0.159.0. This cost is unjustified before a real model arrives; zero runtime cost when kept as CLI tooling.

1. Obtain Javier-approved CAD/Blender model and verify geometry, scale, naming and finishes. Preserve source files outside `public/`; work on a separate export copy.
2. When that phase is authorized, install `npm install --save-dev --save-exact gltfjsx@6.5.3`. Inspect lockfile footprint and audit findings then. Do not update runtime Three to match the CLI's internal Three.
3. Export a validated working GLB from Blender. For reproducible conversion, from an isolated staging directory run:
   ```bash
   npx gltfjsx@6.5.3 ./oven.glb --types --keepnames --keepgroups --output ./Oven.tsx
   ```
   This is a documented command only; it was not executed. Review generated paths/types/materials before copying approved outputs into the app.
4. Consider `--transform` only on a working copy in staging. Check geometry/material fidelity, hotspot names and decoder requirements. No transform by default; no source-image modification.
5. Run build and browser QA, compare against originals, test mobile memory/load and fallback. Only then integrate an approved component in a separately authorized phase.

## QA tooling

`npx playwright install chromium` installs browsers in the user cache, not a runtime dependency. `npm run test:e2e` runs all three Chromium projects serially: desktop 1440×900, tablet 768×1024, mobile 375×812. Tablet/mobile include touch; mobile uses Chromium emulation, not Safari or physical hardware. Device scale is 1 to make these smoke captures inexpensive.

Tests verify HTTP success, heading/CTA, first keyboard focus, a live WebGL2 context, reference image loads, anchor navigation, local form feedback, no horizontal overflow, browser errors/failed requests and screenshots under `test-results/`. Reduced-motion media is emulated; its known animation gap is not falsely marked compliant. `trace: retain-on-failure` preserves evidence. No marketing assets are overwritten.

The config uses 127.0.0.1:3000, reuses an existing server locally and starts its own when absent; CI requires its own server. An attempted second dev server on port 3001 was blocked by Next's project lock, so QA used port 3000. The stale existing dev process was then restarted after an initial form-feedback failure; all three cases passed after restart. The existing `npm run capture` remains untouched: it writes marketing exports and uses legacy 390×844; prefer smoke screenshots for this phase.

## Security and release limits

`npm install`: success, 429 packages audited, seven moderate findings. `npm audit` traces them to a minimatch denial-of-service advisory through typescript-eslint tooling (GHSA-g3hv-75wg-m249). No blanket audit fix was run. Review an isolated lockfile-only remediation later; these are tooling findings, not evidence of seven distinct runtime flaws.

Production conversion is blocked by temporary photography, unverified names/claims, a conceptual model, no lead delivery, incomplete a11y and unmeasured real-device performance. Build success does not imply production readiness. Full QA results: QA.md.

## Agent roles and phase control

Claude Code: primary implementation. Codex: independent audit, focused config/refactors, tests and performance. Never edit one working tree concurrently. No subagents used. This request explicitly authorizes audit + setup + QA + planning documentation only. Stop after reporting; no automatic catalog, redesign, conversion, commit or deployment. START-HERE.md and NEXT-PROMPT.md retain historical instructions, not authorization to start their proposed catalog phase.

## Conversion V1 update — 2026-11-13

The separately authorized redesign is now implemented; CONVERSION-V1.md supersedes earlier architecture/behavior findings where changed. Runtime versions and dependencies unchanged. Existing scene now renders on demand with static flames; purity lint issue fixed. Playwright now starts **production** (`npm run start`) on 127.0.0.1:3002 with server reuse disabled, after a separate `npm run build`. Six tests cover all three sizes in normal/reduced motion. Form submission is explicitly unavailable rather than a simulated success. The original npm capture helper remains legacy and was not run.

## Current commercial delivery — 2026-11-13

See COMMERCIAL-DELIVERY.md for the current source of truth. User approved existing photo publication and supplied the WhatsApp contact. The lead form now builds a real click-to-chat message; there is still no backend or automatic delivery claim. Photographic hero is server rendered. The conceptual cinematic module is dynamically imported only on activation and includes keyboard rotation/reset plus renderer recovery. Runtime dependencies are unchanged. Final production suite: 15 tests across desktop/tablet/mobile, with intercepted WhatsApp navigation, reduced motion, no-JavaScript contact and unavailable-3D recovery. Earlier audit descriptions of a disabled contact form/eager hero Canvas are historical.

## Dirección visual V4 — 2026-11-13

Ver ART-DIRECTION-V4.md para investigación, licencias y evidencias. Runtime/npm sin cambios. Fuente local Instrument Serif (OFL) mediante next/font/local. La maqueta del horno se reconstruye en components/oven-model.tsx y lib/oven-geometry.ts; usa DataTexture/BufferGeometry originales y Environment/Lightformer de Drei ya instalado. Sin GLB ajeno ni HDRIs remotos. Capturas y 15 pruebas de producción pasan; contacto comercial preservado.
