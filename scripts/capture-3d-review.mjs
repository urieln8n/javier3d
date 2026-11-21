import { chromium, expect } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

const output = process.env.REVIEW_OUTPUT || "artifacts/art-direction-v4";
const baseURL = process.env.REVIEW_URL || "http://127.0.0.1:3004";
await mkdir(output, { recursive: true });
const browser = await chromium.launch();
const evidence = [];
try {
  for (const [device, width, height] of [["desktop", 1440, 900], ["tablet", 768, 1024], ["mobile", 375, 812]]) {
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1, reducedMotion: "no-preference", hasTouch: device !== "desktop", isMobile: device === "mobile" });
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
    page.on("requestfailed", request => errors.push(request.url()));
    await page.goto(`${baseURL}/#experiencia`);
    await page.getByRole("button", { name: "Explorar en 3D" }).click();
    await page.locator("canvas").waitFor();
    await expect.poll(() => page.locator("canvas").evaluate(element => Boolean(element.getContext("webgl2")))).toBe(true);
    await page.waitForLoadState("networkidle");
    await page.evaluate(() => document.fonts.ready);
    for (const [state, progress, chapter] of [["start", 0, 0], ["camera", .25, 1], ["detail", .48, 2], ["exploded", .72, 3], ["reassembled", 1, 4]]) {
      await page.locator(".cinematic-track").evaluate((element, p) => scrollTo({ top: element.getBoundingClientRect().top + scrollY + (element.clientHeight - innerHeight) * p, behavior: "instant" }), progress);
      await expect(page.locator(".cinematic-track")).toHaveAttribute("data-chapter", String(chapter));
      if (chapter) await expect(page.locator(".story-chapter")).toHaveCSS("opacity", "1");
      await page.locator("canvas").screenshot();
      await page.screenshot({ path: `${output}/${device}-3d-${state}.png` });
      if (!chapter) await page.locator("canvas").screenshot({ path: `${output}/${device}-oven.png` });
    }
    evidence.push({ device, errors });
    await page.close();
  }
  await writeFile(`${output}/3d-browser-evidence.json`, JSON.stringify(evidence, null, 2) + "\n");
  console.log(evidence);
} finally { await browser.close(); }
