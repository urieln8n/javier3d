import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

const baseURL = process.env.REVIEW_URL || "http://127.0.0.1:3004";
const output = process.env.REVIEW_OUTPUT || "artifacts/commercial-final";
await mkdir(output, { recursive: true });
const browser = await chromium.launch();
const evidence = [];
try {
  for (const [name, width, height] of [["desktop", 1440, 900], ["tablet", 768, 1024], ["mobile", 375, 812]]) {
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1, reducedMotion: "reduce", isMobile: name === "mobile", hasTouch: name !== "desktop" });
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
    page.on("requestfailed", request => errors.push(request.url()));
    await page.goto(baseURL, { waitUntil: "networkidle" });
    await page.locator(".hero-photo .reference-frame.is-selected img").evaluate(image => image.decode());
    await page.screenshot({ path: `${output}/${name}-hero.png` });
    const initial = await page.evaluate(() => {
      const resources = performance.getEntriesByType("resource");
      const scripts = resources.filter(entry => entry.name.includes(".js"));
      const fonts = resources.filter(entry => /\.(woff2?|ttf|otf)(?:$|\?)/.test(entry.name));
      return {
        canvasCount: document.querySelectorAll("canvas").length,
        jsResources: scripts.length,
        jsEncodedBytes: scripts.reduce((total, entry) => total + entry.encodedBodySize, 0),
        jsDecodedBytes: scripts.reduce((total, entry) => total + entry.decodedBodySize, 0),
        fontResources: fonts.length,
        fontEncodedBytes: fonts.reduce((total, entry) => total + entry.encodedBodySize, 0),
        fontDecodedBytes: fonts.reduce((total, entry) => total + entry.decodedBodySize, 0),
        domContentLoadedMs: Math.round(performance.getEntriesByType("navigation")[0].domContentLoadedEventEnd),
        overflow: document.documentElement.scrollWidth > innerWidth,
      };
    });
    // The mobile quote bar is a fixed overlay that hides near the form; it is not page content to scroll to.
    for (const image of await page.locator("img:visible").all()) {
      if (await image.evaluate(element => Boolean(element.closest(".mobile-quote-bar")))) continue;
      await image.scrollIntoViewIfNeeded();
      await image.evaluate(element => element.decode());
    }
    await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
    await page.screenshot({ path: `${output}/${name}-full.png`, fullPage: true });
    await page.getByRole("button", { name: "Ver referencia 02", exact: true }).click();
    await page.locator(".hero-photo .reference-frame.is-selected img").evaluate(image => image.decode());
    await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
    await page.screenshot({ path: `${output}/${name}-reference-02.png` });
    await page.locator("#experiencia").evaluate(element => element.scrollIntoView({ block: "start", behavior: "instant" }));
    await page.screenshot({ path: `${output}/${name}-experience-preview.png` });
    await page.locator("#presupuesto").scrollIntoViewIfNeeded();
    await page.screenshot({ path: `${output}/${name}-quote.png` });
    evidence.push({ device: name, viewport: { width, height }, initial, errors });
    await page.close();
  }
  await writeFile(`${output}/browser-evidence.json`, JSON.stringify(evidence, null, 2) + "\n");
  console.log(JSON.stringify(evidence));
} finally { await browser.close(); }
