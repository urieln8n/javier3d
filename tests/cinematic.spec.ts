import { expect, test } from "@playwright/test";

test("one reversible scroll story, resize and reduced-motion alternative", async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  page.on("requestfailed", request => errors.push(request.url()));
  page.on("response", response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/#experiencia");
  await page.getByRole("button", { name: "Explorar en 3D" }).click();
  const track = page.locator(".cinematic-track");
  const canvas = page.locator("canvas");
  await expect.poll(() => canvas.evaluate((el: HTMLCanvasElement) => Boolean(el.getContext("webgl2")))).toBe(true);
  const sameView = async (a: Buffer, b: Buffer) => page.evaluate(async ([first, second]) => {
    const decode = async (data: string) => { const image = new Image(); image.src = `data:image/png;base64,${data}`; await image.decode(); return image; };
    const [left, right] = await Promise.all([decode(first), decode(second)]);
    if (Math.abs(left.height - right.height) > 1 || left.width !== right.width) return false;
    const width = left.width, height = Math.min(left.height, right.height);
    const pixels = (image: HTMLImageElement) => { const c = document.createElement("canvas"); c.width = width; c.height = height; const context = c.getContext("2d")!; context.drawImage(image, 0, 0); return context.getImageData(0, 0, width, height).data; };
    const x = pixels(left), y = pixels(right);
    // Align a possible one-pixel crop rounding at the end of the sticky range.
    return [-1, 0, 1].some(offset => {
      let changed = 0, total = 0;
      for (let row = 1; row < height - 1; row++) for (let col = 0; col < width; col++) {
        const i = (row * width + col) * 4, j = ((row + offset) * width + col) * 4;
        if (Math.max(Math.abs(x[i] - y[j]), Math.abs(x[i + 1] - y[j + 1]), Math.abs(x[i + 2] - y[j + 2])) > 10) changed++;
        total++;
      }
      return changed / total < .02;
    });
  }, [a.toString("base64"), b.toString("base64")]);
  const seek = async (progress: number, chapter: number) => {
    await track.evaluate((el, p) => scrollTo({ top: el.getBoundingClientRect().top + scrollY + (el.getBoundingClientRect().height - innerHeight) * p, behavior: "instant" }), progress);
    await expect(track).toHaveAttribute("data-chapter", String(chapter));
    if (chapter) await expect(page.locator(".story-chapter")).toHaveCSS("opacity", "1");
    await expect(page.locator(".cinematic-stage .button:visible")).toBeInViewport({ ratio: 1 });
    await expect(page.locator(".scene-note")).toBeInViewport({ ratio: 1 });
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  };
  await seek(0, 0);
  await canvas.screenshot();
  await page.screenshot({ path: testInfo.outputPath("01-hero.png") });
  const initial = await canvas.screenshot({ path: testInfo.outputPath("initial-canvas.png") });
  for (const [name, progress, chapter] of [["02-camera", .25, 1], ["03-detail", .48, 2], ["04-exploded", .72, 3], ["05-reassembled", 1, 4]] as const) {
    await seek(progress, chapter);
    await page.screenshot({ path: testInfo.outputPath(`${name}.png`) });
    if (chapter < 4) expect(initial.equals(await canvas.screenshot())).toBe(false);
  }
  const assembled = await canvas.screenshot({ path: testInfo.outputPath("assembled-canvas.png") });
  expect(await sameView(initial, assembled)).toBe(true);
  await seek(.72, 3);
  const exploded = await canvas.screenshot();
  // Fast forward/back and reverse must land at the same geometry/camera pose.
  await seek(.25, 1); await seek(1, 4); await seek(.72, 3);
  expect(await sameView(exploded, await canvas.screenshot())).toBe(true);
  expect(await sameView(exploded, await canvas.screenshot())).toBe(true);
  // Actual wheel input, not only scripted offsets: native scrolling must remain available.
  const before = await page.evaluate(() => scrollY);
  await page.mouse.move(10, 10);
  await page.mouse.wheel(0, 180);
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(before);
  const viewport = page.viewportSize()!;
  await page.setViewportSize({ width: viewport.width + 24, height: viewport.height });
  await seek(.72, 3);
  await page.setViewportSize(viewport);
  await seek(1, 4);
  const keyboardInitial = await canvas.screenshot();
  await page.locator("#visor").focus();
  await page.keyboard.press("ArrowRight");
  expect(keyboardInitial.equals(await canvas.screenshot())).toBe(false);
  await page.keyboard.press("Home");
  expect(await sameView(keyboardInitial, await canvas.screenshot())).toBe(true);
  await page.getByRole("button", { name: "Girar horno a la izquierda" }).click();
  expect(keyboardInitial.equals(await canvas.screenshot())).toBe(false);
  await page.getByRole("button", { name: "Restablecer vista" }).click();
  const orbitBounds = (await canvas.boundingBox())!;
  const beforeOrbit = await canvas.screenshot();
  await page.mouse.move(orbitBounds.x + orbitBounds.width * .45, orbitBounds.y + orbitBounds.height * .5);
  await page.mouse.down();
  await page.mouse.move(orbitBounds.x + orbitBounds.width * .55, orbitBounds.y + orbitBounds.height * .5, { steps: 8 });
  await page.mouse.up();
  const afterOrbit = await canvas.screenshot();
  expect(beforeOrbit.equals(afterOrbit)).toBe(false);
  await seek(.72, 3); await seek(1, 4);
  expect(await sameView(afterOrbit, await canvas.screenshot())).toBe(true);
  await page.locator(".cinematic-stage .button:visible").click();
  await expect(page).toHaveURL(/#presupuesto$/);
  await expect(page.getByLabel("Ciudad")).toBeInViewport();
  // Preference changed live: collapse the pinned track and retain a static assembled oven.
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(track).toHaveAttribute("data-reduced", "true");
  await track.scrollIntoViewIfNeeded();
  await expect(track).toHaveAttribute("data-chapter", "0");
  const reduced = await canvas.screenshot();
  await page.mouse.wheel(0, 120);
  expect(await sameView(reduced, await canvas.screenshot())).toBe(true);
  await page.screenshot({ path: testInfo.outputPath("06-reduced.png") });
  expect(errors).toEqual([]);
});
