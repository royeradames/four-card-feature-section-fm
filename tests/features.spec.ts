import { expect, test } from "@playwright/test";

const cards = ["Supervisor", "Team Builder", "Karma", "Calculator"];

test("renders the supplied heading, intro and four feature cards", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Four card feature section | Royer Adames");
  await expect(page.getByRole("main")).toBeVisible();
  await expect(page.getByRole("contentinfo")).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Reliable, efficient deliveryPowered by Technology");
  await expect(page.getByText("Our Artificial Intelligence powered tools use millions of project data points to ensure that your project is successful")).toBeVisible();
  const list = page.getByRole("list", { name: "Features" });
  await expect(list.getByRole("listitem")).toHaveCount(4);
  await expect(list.getByRole("heading", { level: 2 })).toHaveText(cards);
  for (const image of await page.locator(".feature img").all()) {
    await expect(image).toHaveAttribute("alt", "");
    expect(await image.evaluate(element => element instanceof HTMLImageElement && element.complete && element.naturalWidth > 0)).toBe(true);
  }
});

test("declares one site name in the footer, og:site_name and WebSite JSON-LD", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".site-name")).toHaveText("Four card feature section");
  await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute("content", "Four card feature section");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /Supervisor, Team Builder, Karma and Calculator/);
  const jsonLd = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent() ?? "{}");
  expect(jsonLd).toEqual({ "@context": "https://schema.org", "@type": "WebSite", name: "Four card feature section", url: "https://four-card-feature-section-fm.royeradames.com" });
});

test("each card keeps its accent colour from the style guide", async ({ page }) => {
  await page.goto("/");
  const expected: Record<string, string> = {
    Supervisor: "rgb(68, 211, 210)",
    "Team Builder": "rgb(234, 84, 84)",
    Karma: "rgb(252, 174, 74)",
    Calculator: "rgb(84, 158, 242)",
  };
  for (const [title, colour] of Object.entries(expected)) {
    const card = page.getByRole("article", { name: title });
    await expect(card).toHaveCSS("border-top-color", colour);
    await expect(card).toHaveCSS("border-top-width", "4px");
  }
});

test("follows the Figma arrangement at mobile, tablet and desktop", async ({ page }) => {
  const box = async (title: string) => (await page.getByRole("article", { name: title }).boundingBox())!;
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto("/");
  const mobile = await Promise.all(cards.map(box));
  expect(Math.abs(mobile[0].width - 314)).toBeLessThanOrEqual(2);
  expect(Math.abs(mobile[0].x - 30.5)).toBeLessThanOrEqual(1.5);
  for (let index = 1; index < mobile.length; index++) {
    expect(mobile[index].y).toBeGreaterThan(mobile[index - 1].y + mobile[index - 1].height);
    expect(Math.abs(mobile[index].x - mobile[0].x)).toBeLessThan(1);
  }

  await page.setViewportSize({ width: 768, height: 1200 });
  const [supervisor, team, karma, calculator] = await Promise.all(cards.map(box));
  expect(team.y).toBeLessThan(supervisor.y);
  expect(Math.abs(supervisor.y - karma.y)).toBeLessThan(1);
  expect(supervisor.x).toBeLessThan(karma.x);
  expect(calculator.y).toBeGreaterThan(karma.y + karma.height);
  expect(Math.abs(team.x + team.width / 2 - 384)).toBeLessThan(2);
  expect(Math.abs(calculator.x + calculator.width / 2 - 384)).toBeLessThan(2);

  await page.setViewportSize({ width: 1440, height: 1029 });
  const desktop = await Promise.all(cards.map(box));
  const [dSupervisor, dTeam, dKarma, dCalculator] = desktop;
  expect(dSupervisor.x).toBeLessThan(dTeam.x);
  expect(dTeam.x).toBeLessThan(dCalculator.x);
  expect(Math.abs(dTeam.x - dKarma.x)).toBeLessThan(1);
  expect(dKarma.y).toBeGreaterThan(dTeam.y + dTeam.height);
  const middle = (dTeam.y + dKarma.y + dKarma.height) / 2;
  expect(Math.abs(dSupervisor.y + dSupervisor.height / 2 - middle)).toBeLessThan(2);
  expect(Math.abs(dCalculator.y + dCalculator.height / 2 - middle)).toBeLessThan(2);
  expect(Math.round(dSupervisor.width)).toBe(350);
});

test("fits narrow and enlarged layouts with the family text and target floors", async ({ page }) => {
  for (const width of [320, 375, 400, 640, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const smallText = await page.locator("h1, h2, p, footer, footer a").evaluateAll(elements =>
      elements.filter(element => element.getClientRects().length > 0 && parseFloat(getComputedStyle(element).fontSize) < 16).map(element => element.textContent));
    expect(smallText).toEqual([]);
    for (const link of await page.locator("a").all()) {
      const linkBox = await link.boundingBox();
      expect(linkBox?.height).toBeGreaterThanOrEqual(44);
    }
  }
  await page.setViewportSize({ width: 640, height: 900 });
  await page.addStyleTag({ content: "html { font-size: 200%; }" });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("keyboard reaches the footer links with a visible focus ring", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const mentor = page.getByRole("link", { name: "Frontend Mentor", exact: true });
  await expect(mentor).toBeFocused();
  await expect(mentor).toHaveCSS("outline-style", "solid");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Royer Adames", exact: true })).toBeFocused();
});
