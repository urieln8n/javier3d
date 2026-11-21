import { chromium, expect } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

// Run against a production build, without other browser suites for timing measurements.
const baseURL = process.env.REVIEW_URL || "http://127.0.0.1:3004";
const output = process.env.REVIEW_OUTPUT || "artifacts/deep-audit-v5";
await mkdir(output, { recursive: true });
const browser = await chromium.launch();
const results = [];
try {
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await page.goto(baseURL);
  await page.evaluate(() => document.fonts.ready);
  // Let the one-off entrance (bricks laid course by course) finish before capturing.
  await page.evaluate(() => Promise.all(document.getAnimations().map(animation => animation.finished)));
  await page.getByLabel("Menú de navegación", { exact: true }).click();
  await page.screenshot({ path: `${output}/mobile-menu.png` });
  await page.getByRole("navigation", { name: "Navegación móvil" }).getByText("Los hornos").click();
  await expect(page.locator(".mobile-quote-bar")).toBeVisible();
  await page.locator("#modelos").evaluate(element => element.scrollIntoView({ behavior: "instant", block: "start" }));
  await expect(page.locator(".mobile-quote-bar")).toBeInViewport({ ratio: 1 });
  await page.screenshot({ path: `${output}/mobile-quote-access.png` });
  await page.close();
  for (const [device, width, height] of [["small", 320, 568], ["landscape", 812, 375]]) {
    const page = await browser.newPage({ viewport: { width, height } });
    await page.goto(baseURL);
    await page.evaluate(() => document.fonts.ready);
  // Let the one-off entrance (bricks laid course by course) finish before capturing.
  await page.evaluate(() => Promise.all(document.getAnimations().map(animation => animation.finished)));
    await page.screenshot({ path: `${output}/${device}-hero.png` });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
    expect(overflow).toBe(false);
    await page.getByRole("button", { name: "Explorar en 3D", exact: true }).click();
    await expect(page.locator("canvas")).toBeVisible();
    await expect(page.locator(".cinematic-track")).toHaveAttribute("data-reduced", "true");
    await page.locator(".cinematic-stage .button").scrollIntoViewIfNeeded();
    await expect(page.locator(".cinematic-stage .button")).toBeInViewport({ ratio: 1 });
    await page.screenshot({ path: `${output}/${device}-3d-cta.png` });
    results.push({ device, overflow, staticComposition: true, quoteAccessible: true });
    await page.close();
  }
  await writeFile(`${output}/responsive-evidence.json`, JSON.stringify(results, null, 2));
} finally { await browser.close(); }
