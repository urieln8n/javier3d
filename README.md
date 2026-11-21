# JAVA — Hornos profesionales para pizza

**Lo que se publica ahora:** `web-premium/` — web premium 3D estática (Kit Webs 3D): el horno JAVA de mosaico dorado en 3D guiado por el scroll, las dos referencias con sus fotos, presupuesto por WhatsApp (+34 645 466 308), aviso legal, privacidad y cookies, librerías y fuentes locales. Es una DEMO: lleva `noindex` y `robots.txt`. El horno 3D es una maqueta conceptual hecha a partir de la fotografía, no un modelo técnico. Datos pendientes del titular: nombre o razón social, NIF y domicilio fiscal (páginas legales).

La versión Next.js (v10) sigue en este repo, documentada abajo.

# JAVA — Hornos profesionales para pizza

One-page commercial website with product photography, qualified quote requests through WhatsApp and an optional cinematic 3D exploration.

## Local development

```bash
npm install
npm run dev
```

## Production validation

```bash
npm run build
npm run test:e2e
```

Playwright starts a production server on 127.0.0.1:3002. Install the browser once with `npx playwright install chromium` if it is absent. Projects: 1440×900 desktop, 768×1024 tablet, 375×812 mobile.

For production review screenshots:

```bash
npm run start -- --hostname 127.0.0.1 --port 3004
# In a second terminal:
node scripts/capture-review.mjs
```

Artifacts go into `artifacts/commercial-final/`, separate from original product/marketing assets.

## Commercial destination

The user approved **+34 645 466 308** as the quote contact and authorized the two existing photographs for publication. Public defaults live in `lib/site.ts`; `NEXT_PUBLIC_WHATSAPP_NUMBER` can override the international number at build time. No API token, database or mail provider is needed for click-to-chat.

The form prepares a URL-encoded WhatsApp message with the project details. The visitor opens WhatsApp, reviews and sends it. The page does **not** claim that an opened conversation is a delivered lead. Popup-blocking fallback, direct WhatsApp, telephone and no-JavaScript contact links are available. Browser QA intercepts WhatsApp navigation; it never sends test messages to the commercial number.

## Assets and truthful content

The photo files remain unchanged. Their publication is now approved, but they are still reference crops rather than original high-resolution product photography. Official model names, specifications, price, warranty, company history, installation and support terms are not invented. `lib/products.ts` keeps unknown facts null and uses neutral reference identifiers.

Three/R3F and Motion load only after the visitor activates the optional experience. The existing procedural geometry remains explicitly conceptual; its explosion is not verified engineering. A renderer failure returns to a photographic sales path. Keyboard rotation/reset, reduced motion, bounded controls, demand rendering and DPR cap are preserved.

## Publication

No deployment or commit has been created. Set `NEXT_PUBLIC_SITE_URL` to the actual HTTPS domain before publishing: this supplies canonical/Open Graph URLs and enables indexing. Until a real domain is configured, the page emits noindex. Public `NEXT_PUBLIC_*` settings are embedded by Next at build time; rebuild after changing them.

The domain and business identity/publication information still need the owner's real data. No company legal identity, address, certification or guarantee was fabricated. See `docs/COMMERCIAL-DELIVERY.md` for the final scope, evidence and remaining content inputs.

## Latest deep audit

See [deep audit V5](docs/DEEP-AUDIT-V5.md) for the commercial valuation limits, responsive corrections, performance observations and fresh visual evidence. Mobile now has native navigation and contextual quote access; the optional 3D can be closed and uses a static, naturally scrollable composition on short screens. Run `node scripts/audit-responsive.mjs` against the production review server to capture the additional small-screen checks.

The current visual iteration is [product theatre V6](docs/PRODUCT-THEATRE-V6.md): a photographic reference selector linked to the quote form, an editorial arch composition and a rendered preview of the optional 3D experience. Fresh screenshots are in `artifacts/product-theatre-v6/`.

Latest visual update: [white signature V7](docs/WHITE-SIGNATURE-V7.md), with a monumental white JAVA wordmark and a terracotta product stage. Captures: `artifacts/white-signature-v7/`.

Previous identity: [brick identity V9](docs/BRICK-IDENTITY-V9.md).

Current identity: [Arco JAVA V10](docs/ARCO-JAVA-V10.md), with deep audit, Bodoni Moda + Archivo typography, a brick-built JAVA logotype and the voussoir arch of the real ovens as the product stage. Captures: `artifacts/arch-identity-v10/`. Brand assets are generated, not hand-edited: run `node scripts/build-brand.mjs`, then `node scripts/render-social.mjs`.
