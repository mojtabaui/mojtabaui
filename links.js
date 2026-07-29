const { chromium } = require("playwright-core");
(async () => {
  const b = await chromium.launch({ executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" });
  const p = await b.newPage({ viewport: { width: 1000, height: 1200 }, deviceScaleFactor: 2 });
  await p.goto("http://localhost:3000/planner/ui", { waitUntil: "networkidle" });
  await p.waitForTimeout(600);
  const s = p.locator("section.sheet");
  await s.nth(2).screenshot({ path: "wk1-links.png" });
  await s.nth(3).screenshot({ path: "wk2-links.png" });
  console.log("ok");
  await b.close();
})();