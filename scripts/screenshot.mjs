import puppeteer from 'puppeteer';
import fs from 'fs';

const url = process.argv[2] || 'http://localhost:3000';
const dir = './temporary screenshots';

if (!fs.existsSync(dir)) fs.mkdirSync(dir);

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto(url, { waitUntil: 'networkidle0' });
    
    const nextNum = fs.readdirSync(dir).length + 1;
    const fileName = `${dir}/screenshot-${nextNum}.png`;
    
    await page.screenshot({ path: fileName, fullPage: true });
    console.log(`Saved screenshot to: ${fileName}`);
    await browser.close();
  } catch (e) {
    console.error(`Screenshot failed: ${e.message}`);
    process.exit(1);
  }
})();