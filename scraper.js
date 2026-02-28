// scraper.js
const { chromium } = require('@playwright/test');

const SEEDS = [68, 69, 70, 71, 72, 73, 74, 75, 76, 77];
const BASE_URL = 'https://sanand0.github.io/tdsdata/js_table/?seed=';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  let total = 0;

  for (const seed of SEEDS) {
    const url = BASE_URL + seed;
    console.log(`Visiting: ${url}`);
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    const cells = await page.$$('td, th');
    for (const cell of cells) {
      const text = (await cell.textContent()).trim();
      const n = parseFloat(text);
      if (!isNaN(n)) total += n;
    }
  }

  await browser.close();
  console.log(`Final total: ${total}`);
})();
