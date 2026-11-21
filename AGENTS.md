# WEB3D / Hornos JAVA — Agent Rules

## Mission
Build a premium commercial product experience that generates qualified leads for Hornos JAVA. Visual polish matters, but conversion, correctness and performance come first.

## Non-negotiable rules
1. Never invent technical specifications, certifications, warranty, prices, capacity, materials or performance claims.
2. Keep product facts in structured data; mark unknown data as pending.
3. 3D is a sales tool, not decoration. Every new 3D feature must help understand, configure or buy the product.
4. Do not add dependencies without explaining the benefit and footprint.
5. Protect mobile performance. No heavy post-processing by default.
6. Preserve accessibility and prefers-reduced-motion.
7. Any AI-generated visual must be clearly treated as concept/marketing material unless it depicts the real product faithfully.
8. Do not modify source reference images. Production should use originals supplied by Javier.
9. Work in small phases: audit → implement → browser QA → report → commit.
10. Never start the next phase automatically.

## Stack
Next.js + React + TypeScript + Tailwind CSS
Three.js + React Three Fiber + Drei
Blender → GLB/GLTF → gltfjsx
Motion for UI motion
Playwright for browser QA/capture
Vercel for deployment

## Agent workflow
- Claude Code: primary implementation.
- Codex: independent audit, focused refactors, tests and performance.
- Never let both modify the same working tree concurrently.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
