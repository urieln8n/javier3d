import { expect, test } from "@playwright/test";

test("navigation and contextual mobile quote access", async ({ page }, testInfo) => {
  await page.goto("/");
  if (testInfo.project.name !== "mobile") return;
  const menu = page.getByLabel("Menú de navegación", { exact: true });
  await expect(menu).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Navegación móvil" })).not.toBeVisible();
  await menu.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("navigation", { name: "Navegación móvil" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
  await menu.click();
  await page.getByRole("navigation", { name: "Navegación móvil" }).getByText("Los hornos").click();
  await expect(page.locator(".mobile-navigation")).not.toHaveAttribute("open", "");
  await expect(page.locator(".mobile-quote-bar")).toBeVisible();
  await page.locator(".mobile-quote-bar a").click();
  await expect(page.locator("#presupuesto")).toBeInViewport();
  await expect(page.locator(".mobile-quote-bar")).not.toBeVisible();
});

test("3D can be exited and reopened without trapping navigation", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Explorar en 3D", exact: true }).click();
  await expect(page.locator("canvas")).toBeVisible();
  await page.getByRole("button", { name: "Cerrar experiencia 3D" }).click();
  await expect(page.locator("canvas")).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Explorar en 3D", exact: true })).toBeFocused();
  await page.getByRole("button", { name: "Explorar en 3D", exact: true }).click();
  await expect(page.locator("canvas")).toBeVisible();
  await page.locator(".cinematic-track").focus();
  await page.keyboard.press("Escape");
  await expect(page.locator("canvas")).toHaveCount(0);
});

test("short landscape uses a scrollable static product composition", async ({ page }) => {
  await page.setViewportSize({ width: 812, height: 375 });
  await page.goto("/");
  await page.getByRole("button", { name: "Explorar en 3D", exact: true }).click();
  await expect(page.locator("canvas")).toBeVisible();
  await expect(page.locator(".cinematic-track")).toHaveAttribute("data-reduced", "true");
  await expect(page.locator(".cinematic-stage")).toHaveCSS("position", "relative");
  await page.locator(".cinematic-stage .button").scrollIntoViewIfNeeded();
  await expect(page.locator(".cinematic-stage .button")).toBeInViewport({ ratio: 1 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
