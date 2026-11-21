import { expect, test } from "@playwright/test";

test("photographic reference selection carries the chosen oven into the quote", async ({ page }, testInfo) => {
  await page.goto("/");
  const gallery = page.locator(".product-theatre");
  await expect(gallery.getByRole("button", { name: "Ver referencia 01" })).toHaveAttribute("aria-pressed", "true");
  await gallery.getByRole("button", { name: "Ver referencia 02" }).click();
  await expect(gallery.getByRole("button", { name: "Ver referencia 02" })).toHaveAttribute("aria-pressed", "true");
  await expect(gallery.locator(".theatre-caption p")).toHaveText("Espíritu italiano.");
  await expect.poll(() => gallery.locator(".reference-frame.is-selected img").evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
  await page.screenshot({ path: testInfo.outputPath("reference-02.png") });
  await gallery.getByRole("link", { name: "Consultar esta referencia" }).click();
  await expect(page.getByLabel("¿Qué horno te interesa?")).toHaveValue("java-02");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
