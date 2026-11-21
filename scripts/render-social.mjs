// Renders the link-preview card and the Apple touch icon from the brand kit and the approved
// photograph (unchanged; cut out with the same CSS mask the hero uses).
// Run after scripts/build-brand.mjs:  node scripts/render-social.mjs
import { chromium } from "@playwright/test";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const asset = path => `file://${join(root, path)}`;

const card = `<!doctype html><meta charset="utf-8"><style>
@font-face { font-family: Display; font-style: normal; src: url(${asset("public/fonts/bodoni-moda/BodoniModa-Latin.woff2")}); }
@font-face { font-family: Display; font-style: italic; src: url(${asset("public/fonts/bodoni-moda/BodoniModa-Italic-Latin.woff2")}); }
@font-face { font-family: Text; font-weight: 400 900; font-stretch: 100% 125%; src: url(${asset("public/fonts/archivo/Archivo-Latin.woff2")}); }
* { box-sizing: border-box; margin: 0; }
body { width: 1200px; height: 630px; overflow: hidden; background: #102923; color: #f5efdf; font-family: Text, Arial, sans-serif; position: relative; }
.course { position: absolute; left: 0; right: 0; bottom: 0; height: 26px; background: url(${asset("public/brand/hilada.svg")}) repeat-x left center / auto 26px; }
.copy { position: absolute; left: 72px; top: 92px; width: 560px; }
.copy img { display: block; width: 520px; height: auto; margin-left: -4px; }
h1 { margin-top: 44px; font-family: Display, Georgia, serif; font-weight: 500; font-size: 76px; line-height: .98; letter-spacing: -.02em; font-variation-settings: "opsz" 48; }
h1 em { color: #d6b387; font-style: italic; }
p { margin-top: 30px; display: flex; gap: 14px; align-items: center; font-stretch: 112%; font-weight: 650; font-size: 15px; letter-spacing: .2em; text-transform: uppercase; color: #d6b387; }
p::before { content: ""; width: 14px; height: 11px; background: #c27d60; clip-path: polygon(0 0, 100% 0, 76% 100%, 24% 100%); }
.stage { position: absolute; right: 56px; bottom: 26px; width: 500px; height: 520px; }
.arch { position: absolute; left: 0; bottom: 0; width: 500px; aspect-ratio: 644 / 472; background: url(${asset("public/brand/java-arch-tall.svg")}) center bottom / 100% 100% no-repeat; }
.oven { position: absolute; left: 50%; bottom: 0; width: 392px; transform: translateX(-50%);
  clip-path: polygon(28.9% 0%, 42.1% 0%, 42.2% 5%, 54% 4.5%, 66% 5.5%, 77% 8.5%, 84% 13%, 89% 21%, 93.6% 31%, 92% 49%, 90.2% 69%, 89.3% 77.6%, 87.3% 80.8%, 84.4% 83.6%, 79.8% 87.2%, 73.8% 90.6%, 67.8% 93.2%, 60% 95.2%, 54% 97.2%, 52% 98.2%, 15.5% 82.4%, 13.3% 62%, 11.5% 45%, 10.1% 30%, 14% 20%, 19% 14%, 24% 10%, 29.2% 8%); }
.hearth { position: absolute; left: -20px; right: -20px; bottom: 0; height: 2px; background: linear-gradient(90deg, transparent, #d6b38799 15%, #d6b38799 85%, transparent); }
</style>
<div class="copy"><img src="${asset("public/brand/java-wordmark.svg")}" alt=""><h1>Ladrillo<br>a <em>ladrillo.</em></h1><p>Hornos profesionales para pizza</p></div>
<div class="stage"><div class="arch"></div><div class="hearth"></div><img class="oven" src="${asset("public/images/hornos/java-gold-reference.webp")}" alt=""></div>
<div class="course"></div>`;

const icon = `<!doctype html><meta charset="utf-8"><style>* { margin: 0; } body { width: 180px; height: 180px; background: #102923; }
img { display: block; width: 180px; height: 180px; }</style><img src="${asset("app/icon.svg")}" alt="">`;

const work = await mkdtemp(join(tmpdir(), "java-social-"));
const browser = await chromium.launch();
try {
  for (const [name, html, width, height, output] of [
    ["card.html", card, 1200, 630, "public/brand/java-og.jpg"],
    ["icon.html", icon, 180, 180, "app/apple-icon.png"],
  ]) {
    const file = join(work, name);
    await writeFile(file, html);
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
    await page.goto(`file://${file}`, { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    const jpeg = output.endsWith(".jpg");
    await page.screenshot({ path: join(root, output), type: jpeg ? "jpeg" : "png", ...(jpeg ? { quality: 86 } : {}) });
    await page.close();
    console.log(output);
  }
} finally {
  await browser.close();
  await rm(work, { recursive: true, force: true });
}
