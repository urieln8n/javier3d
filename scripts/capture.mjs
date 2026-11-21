import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

await mkdir("marketing/exports", { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await page.goto("http://127.0.0.1:3000", { waitUntil: "networkidle" });
await page.screenshot({ path: "marketing/exports/home-desktop.png", fullPage: true });
await page.setViewportSize({ width: 390, height: 844 });
await page.goto("http://127.0.0.1:3000", { waitUntil: "networkidle" });
await page.screenshot({ path: "marketing/exports/home-mobile.png", fullPage: true });
await browser.close();
console.log("Captured marketing/exports/home-desktop.png and home-mobile.png");
