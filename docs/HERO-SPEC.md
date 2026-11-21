# Future hero specification — plan only

No hero implementation or model changes in this phase. Direction: premium industrial, Mediterranean and cinematic. Success is a clear, truthful oven presentation leading to a quote request.

## Content and layout

Provisional headline for Javier's review: “El centro de tu pizzería.” Concise subheadline should identify professional pizza ovens and invite choosing the suitable model; performance, fuel, capacity, material and origin claims stay pending. Do not publish unverified assertions.

Use a 12-column desktop composition: copy about 5 columns, oven about 7. Max content width approximately 1280 px with 40–64 px gutters at 1440 px. Keep copy visually first, short subheadline under the headline and two CTAs immediately below. Primary SOLICITAR PRESUPUESTO points to the quote flow; secondary EXPLORAR EN 3D activates or focuses the product viewer, rather than linking to unrelated explanatory copy as the starter does.

Headline approximately 64–96 px, short measure, line height near 1.0; subheadline 18–20 px with line height 1.5. Space headline/subheadline by 24–32 px and actions by 24–40 px. Avoid hard 100vh dependence or clipped content. Credibility/support copy below actions is conditional on Javier confirming a real contact/support proposition. No placeholder trust badges.

## Camera, lighting and product

Use a three-quarter view that clearly shows opening, silhouette and approved finish; initial camera must be fitted to the bounds of the future GLB, not copied blindly from the procedural scene. Current camera is only a reference. Keep oven clear of headline/CTA and leave breathing room around the chimney. Constrain orbit and zoom to useful inspection angles, disable pan, offer reset view. Preserve color/material fidelity; warm key and subtle fill, no heavy postprocessing. No interior/exploded claims unless geometry and construction are verified.

## Motion and controls

Optional 500–700 ms opacity/short translation entrance; no loading delay for copy or CTA. Load a matching approved still first, then enhance to interactive 3D. Avoid autoplay orbit. Render on demand when idle; pause when hidden/offscreen. Reduced motion: static first frame, no automatic camera or flames, interaction remains available.

Keep controls sparse: labeled Explore/enable viewer and reset. Add buttons for useful rotation/zoom accessible by keyboard; dragging cannot be the only mechanism. Finish selectors and hotspots require verified product data and separate approval; they are not part of this hero phase. Touch orbit must not prevent normal page scrolling.

## Responsive behavior

- Desktop 1440×900: copy and 3D side by side; primary CTA visible without needing the scene to load. Viewer roughly 55–60% of composition width, tuned to actual model dimensions.
- Tablet 768×1024: stack copy/actions before viewer, trim spacing, preserve oven silhouette. Do not shrink desktop UI into unreadable controls.
- Mobile 375×812: compact headline 40–52 px; readable 16–18 px subheadline, stacked actions as needed. Put quote CTA before a roughly 300–360 px viewer/poster. Prefer explicit 3D activation and DPR capped near 1–1.5. Product remains understandable using the still.

## Accessibility and failure handling

One semantic h1, descriptive image text and named viewer region. Visible focus; logical tab order; no keyboard traps; 44 px target controls. Check text contrast to WCAG AA. Loading and failure states do not hide quote actions. Provide a real product still when WebGL is unavailable/context is lost, scripts fail or data saving is preferred. Do not announce continuous scene updates. Test keyboard, touch, zoom to 200%, reduced motion and screen reader names.

## Proposed performance budgets — not measured results

- Field targets at 75th percentile: LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1. Validate with representative mobile hardware and network; smoke tests cannot certify these.
- Initial hero poster target ≤200 KB; defer GLB/Three download where feasible, especially mobile. Audit production transfer size before setting a JS baseline; no invented current bundle measurements.
- Initial optimized GLB target ≤3 MB, total model textures ≤8 MB decoded, approximately ≤100k visible triangles and ≤50 draw calls on mobile. These are planning gates, subject to fidelity review with the real model.
- Stable mobile interaction target ≥30 fps; no continuous render work while idle/offscreen. No default postprocessing/shadows that break the budget. If fidelity cannot fit, use poster-first and explicit viewer loading.

## Future acceptance gate

Build; Chromium smoke/captures at all three sizes; real-device interaction; failed-WebGL fallback; keyboard and reduced motion; frame time/memory/transfer profiling; verified product fidelity; visible quote path. Real submission delivery is a separate launch requirement: current LeadForm only changes local state, so it cannot count as a delivered lead.

Review this plan with Javier before authorizing implementation. Do not start catalog work or change the present page from this document.
