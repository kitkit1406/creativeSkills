import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const out = "/opt/cursor/artifacts/screenshots";
fs.mkdirSync(out, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.getByRole("button", { name: "English" }).click();
await page.waitForTimeout(400);
await page.screenshot({ path: path.join(out, "01-home.png"), fullPage: false });

await page.goto("http://localhost:3000/packages", { waitUntil: "networkidle" });
await page.getByRole("button", { name: "English" }).click();
await page.waitForTimeout(300);
await page.screenshot({ path: path.join(out, "02-packages.png") });

const buyButtons = page.locator("button.btn.primary.block");
await buyButtons.nth(1).click();
await page.waitForURL("**/account**", { timeout: 8000 });
await page.waitForTimeout(500);
const accountText = await page.locator("body").innerText();
if (!/Active|פעיל|Активен/i.test(accountText)) {
  console.error("FAIL: account not active", accountText.slice(0, 400));
  process.exit(1);
}
await page.screenshot({ path: path.join(out, "03-account-active.png") });

await page.goto("http://localhost:3000/watch/live-news-1", {
  waitUntil: "networkidle",
});
await page.waitForTimeout(2500);
const watchText = await page.locator("body").innerText();
if (/Active subscription required|נדרש מנוי|Нужна активная/i.test(watchText)) {
  console.error("FAIL: still gated");
  process.exit(1);
}
const hasVideo = await page.locator("video").count();
if (!hasVideo) {
  console.error("FAIL: no video element");
  process.exit(1);
}
await page.locator("video").evaluate((v) => {
  v.muted = true;
  return v.play().catch(() => undefined);
});
await page.waitForTimeout(1500);
await page.screenshot({ path: path.join(out, "04-watch-player.png") });

await page.goto("http://localhost:3000/live", { waitUntil: "networkidle" });
await page.screenshot({ path: path.join(out, "05-live.png") });

await page.goto("http://localhost:3000/radio", { waitUntil: "networkidle" });
await page.screenshot({ path: path.join(out, "06-radio.png") });

console.log("OK smoke passed");
await browser.close();
