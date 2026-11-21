import { expect, test } from "@playwright/test";

for (const reduced of [false, true]) {
  test(`commercial sales flow and real WhatsApp handoff — reduced motion ${reduced}`, async ({ page, context }, testInfo) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
    page.on("requestfailed", request => errors.push(`${request.url()}: ${request.failure()?.errorText}`));
    page.on("response", response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
    // Test the external handoff without sending test data to WhatsApp or contacting anyone.
    await context.route("https://wa.me/**", route => route.fulfill({ contentType: "text/html", body: "<title>WhatsApp handoff intercepted for QA</title>" }));
    await page.emulateMedia({ reducedMotion: reduced ? "reduce" : "no-preference" });
    expect((await page.goto("/"))?.status()).toBe(200);
    await expect(page).toHaveTitle(/JAVA.*Hornos profesionales/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Ladrillo");
    await expect(page.locator(".sales-hero .eyebrow")).toContainText("Hornos profesionales para pizza");
    await expect(page.locator(".sales-hero .button")).toBeInViewport({ ratio: 1 });
    await expect(page.locator(".header .brand")).toBeInViewport({ ratio: 1 });
    await expect(page.locator(".hero-photo .reference-frame.is-selected img")).toBeVisible();
    await expect.poll(() => page.locator(".hero-photo .reference-frame.is-selected img").evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
    await expect(page.locator("canvas")).toHaveCount(0);
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Saltar al contenido" })).toBeFocused();
    await page.locator(".sales-hero h1").click();
    await page.screenshot({ path: testInfo.outputPath("hero.png") });
    await page.locator("#modelos").scrollIntoViewIfNeeded();
    for (const img of await page.locator("#modelos img").all()) {
      await expect.poll(() => img.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
    }
    await page.locator(".product-card").first().getByRole("link", { name: "Solicitar presupuesto", exact: true }).click();
    await expect(page.getByLabel("¿Qué horno te interesa?")).toHaveValue("java-01");
    await page.locator(".project-list a").nth(1).click();
    await expect(page.getByLabel("¿En qué punto estás?")).toHaveValue("Quiero renovar mi horno");
    const postRequests: string[] = [];
    page.on("request", request => { if (request.method() === "POST") postRequests.push(request.url()); });
    await page.getByRole("button", { name: "Continuar en WhatsApp" }).click();
    await expect(page.getByRole("status")).toHaveCount(0);
    await page.getByLabel("Nombre", { exact: false }).fill("QA & prueba");
    await page.getByLabel("Ciudad", { exact: false }).fill("Valencia");
    await page.getByLabel("Tu idea").fill("Quiero orientación para mi local.");
    const popupPromise = page.waitForEvent("popup");
    await page.getByRole("button", { name: "Continuar en WhatsApp" }).click();
    const popup = await popupPromise;
    await popup.waitForLoadState("domcontentloaded");
    const destination = new URL(popup.url());
    expect(destination.hostname).toBe("wa.me");
    expect(destination.pathname).toBe("/34645466308");
    const message = destination.searchParams.get("text")!;
    expect(message).toContain("QA & prueba");
    expect(message).toContain("Valencia");
    expect(message).toContain("Quiero renovar mi horno");
    expect(message).toContain("Referencia 01");
    expect(message).toContain("Origen: web JAVA");
    await popup.close();
    await expect(page.getByRole("status")).toContainText("Tu solicitud está preparada");
    await expect(page.getByRole("link", { name: "Abrir mi solicitud en WhatsApp" })).toHaveAttribute("href", /^https:\/\/wa\.me\/34645466308\?text=/);
    expect(postRequests).toEqual([]);
    await page.getByLabel("Ciudad", { exact: false }).fill("Madrid");
    await expect(page.getByRole("status")).toHaveCount(0);
    await expect(page.locator(".direct-contact a").first()).toHaveAttribute("href", /^https:\/\/wa\.me\/34645466308/);
    await expect(page.getByRole("link", { name: "+34 645 466 308", exact: true })).toHaveAttribute("href", "tel:+34645466308");
    await page.locator(".faq-list summary").first().click();
    await expect(page.locator(".faq-list details").first()).toHaveAttribute("open", "");
    await expect(page.locator(".faq-list details").first().locator("p")).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    if (reduced) expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe("auto");
    await page.screenshot({ path: testInfo.outputPath("full-page.png"), fullPage: true });
    expect(errors).toEqual([]);
  });
}

test("sales contact remains available without JavaScript", async ({ browser }, testInfo) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: testInfo.project.use.viewport });
  try {
    const page = await context.newPage();
    await page.goto("http://127.0.0.1:3002/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Ladrillo");
    await expect(page.getByRole("button", { name: "Continuar en WhatsApp" })).toBeDisabled();
    await expect(page.getByRole("link", { name: "Solicita tu presupuesto por WhatsApp" })).toHaveAttribute("href", "https://wa.me/34645466308");
    await expect(page.getByRole("link", { name: "+34 645 466 308", exact: true })).toHaveAttribute("href", "tel:+34645466308");
    expect(await page.locator('script[src*="three"]').count()).toBe(0);
  } finally { await context.close(); }
});

test("unavailable 3D does not break the commercial page", async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
      value: function (this: HTMLCanvasElement, kind: string, options?: unknown) {
        if (kind === "webgl" || kind === "webgl2" || kind === "experimental-webgl") return null;
        return Reflect.apply(original, this, [kind, options]);
      },
    });
  });
  await page.goto("/#experiencia");
  await page.getByRole("button", { name: "Explorar en 3D" }).click();
  await expect(page.locator(".experience-recovery")).toBeVisible();
  await expect(page.locator(".experience-recovery")).toContainText("La vista interactiva no está disponible");
  await page.locator(".experience-recovery").getByRole("link", { name: "Ver hornos JAVA" }).click();
  await expect(page).toHaveURL(/#modelos$/);
  await page.locator(".product-card").first().getByRole("link", { name: "Solicitar presupuesto", exact: true }).click();
  await expect(page.getByLabel("¿Qué horno te interesa?")).toHaveValue("java-01");
});
