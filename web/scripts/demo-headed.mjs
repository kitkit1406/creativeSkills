import { chromium } from "playwright";

const browser = await chromium.launch({
  headless: false,
  args: ["--start-maximized"],
});
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.getByRole("button", { name: "English" }).click();
await page.waitForTimeout(1500);

await page.goto("http://localhost:3000/live", { waitUntil: "networkidle" });
await page.waitForTimeout(1200);

await page.goto("http://localhost:3000/packages", { waitUntil: "networkidle" });
await page.getByRole("button", { name: "English" }).click();
await page.waitForTimeout(800);
await page.locator("button.btn.primary.block").nth(1).click();
await page.waitForURL("**/account**");
await page.waitForTimeout(1500);

await page.goto("http://localhost:3000/watch/live-news-1", {
  waitUntil: "networkidle",
});
await page.waitForTimeout(2500);

await page.goto("http://localhost:3000/radio", { waitUntil: "networkidle" });
await page.waitForTimeout(1500);

await browser.close();
console.log("demo done");
