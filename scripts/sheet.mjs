// Contact sheet of screenshots: node scripts/sheet.mjs <out.png> <cols> <imgWidth> files...
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
const [out, cols, w, ...files] = process.argv.slice(2);
const imgs = files.map((f) => `<figure><img src="data:image/png;base64,${readFileSync(f).toString('base64')}"><figcaption>${f.split('/').pop()}</figcaption></figure>`).join('');
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: Number(cols) * (Number(w) + 8), height: 400 } });
await page.setContent(`<style>body{margin:0;display:grid;grid-template-columns:repeat(${cols},${w}px);gap:8px;background:#888;font:11px sans-serif}img{width:100%;display:block}figure{margin:0}figcaption{color:#fff}</style>${imgs}`);
await page.screenshot({ path: out, fullPage: true });
await browser.close();
