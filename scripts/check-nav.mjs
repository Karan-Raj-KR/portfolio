// Navigation and interaction regression checks. Run against a server: node scripts/check-nav.mjs [base]
import assert from 'node:assert/strict';
import { chromium, webkit } from 'playwright';
const base = process.argv[2] || 'http://localhost:4321';
const log = (...a) => console.log('  ✓', ...a);
const booted = (page) => page.waitForFunction(() => document.documentElement.classList.contains('is-booted'));
const headerBottom = (page) => page.evaluate(() => document.querySelector('[data-frame]').getBoundingClientRect().bottom);
const topOf = (page, sel) => page.evaluate((s) => document.querySelector(s).getBoundingClientRect().top, sel);

for (const [engine, type] of Object.entries({ chromium, webkit })) {
  console.log(engine);
  const browser = await type.launch();
  for (const vp of [{ width: 1440, height: 900 }, { width: 390, height: 844 }, { width: 1024, height: 768 }]) {
    const ctx = await browser.newContext({ viewport: vp });
    const page = await ctx.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    const tag = `${vp.width}`;

    // Home: the bar scrolls away with the hero and returns fixed at the results section.
    await page.goto(base + '/'); await booted(page);
    assert.equal(await page.evaluate(() => getComputedStyle(document.querySelector('[data-frame]')).position), 'absolute');
    const resultsY = await page.evaluate(() => document.querySelector('.results').getBoundingClientRect().top + scrollY);
    await page.evaluate((y) => scrollTo(0, y + 40), resultsY); await page.waitForTimeout(900);
    assert.equal(await page.evaluate(() => document.documentElement.classList.contains('frame-compact')), true, 'frame returns at results');
    assert.equal(await page.evaluate(() => getComputedStyle(document.querySelector('[data-frame]')).position), 'fixed');
    log(tag, 'home bar returns at results');
    const hb = await headerBottom(page);
    if (vp.width < 600) assert.ok(hb <= 60, `phone header ${hb}px`);

    // Chapter nav jumps to a product (pinned) or anchors (stacked).
    const live = await page.evaluate(() => document.querySelector('[data-shift]').classList.contains('is-live'));
    if (live) {
      await page.evaluate(() => document.querySelector('#work').scrollIntoView()); await page.waitForTimeout(1200);
      await page.locator('[data-shift-link][href="#beat-crewai-recipes"]').click(); await page.waitForTimeout(2200);
      assert.equal(await page.locator('[data-shift-link][href="#beat-crewai-recipes"]').getAttribute('aria-current'), 'step');
      assert.equal(await page.evaluate(() => document.querySelector('#beat-crewai-recipes').getAttribute('aria-hidden')), 'false');
      const v = await page.evaluate(() => getComputedStyle(document.querySelector('#beat-crewai-recipes .how')).visibility);
      assert.equal(v, 'visible');
      log(tag, 'chapter nav jumps to crewai-recipes');
    } else log(tag, 'stacked product sequence (no pin)');

    // Contact deep link lands below the header.
    await page.goto(base + '/#contact'); await booted(page); await page.waitForTimeout(1500);
    const ct = await topOf(page, '#contact-title'); const hb2 = await headerBottom(page);
    assert.ok(ct >= hb2 - 1 && ct < vp.height, `contact title at ${ct}, header ${hb2}`);
    log(tag, 'direct /#contact lands below header', Math.round(ct));

    // Subpage: solid fixed bar from first paint, active route.
    await page.goto(base + '/work/formpilot/'); await booted(page);
    assert.equal(await page.evaluate(() => getComputedStyle(document.querySelector('[data-frame]')).position), 'fixed');
    assert.equal(await page.locator('.frame__nav a[aria-current="page"]').textContent(), 'Work');
    // Tabs: click and keyboard.
    await page.locator('#walk-tab-1').click();
    assert.equal(await page.locator('#walk-tab-1').getAttribute('aria-selected'), 'true');
    assert.equal(await page.locator('#walk-panel-0').isHidden(), true);
    await page.keyboard.press('ArrowRight');
    assert.equal(await page.evaluate(() => document.activeElement.id), 'walk-tab-2');
    assert.equal(await page.locator('#walk-panel-2').isVisible(), true);
    await page.keyboard.press('Home');
    assert.equal(await page.evaluate(() => document.activeElement.id), 'walk-tab-0');
    await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(() => document.activeElement.id), 'walk-panel-0');
    log(tag, 'FormPilot tabs: click, arrows, Home, Tab into panel');

    // Deep link to a section on a subpage.
    await page.goto(base + '/about/#writing'); await booted(page); await page.waitForTimeout(1500);
    const wt = await topOf(page, '#writing-title'); const hb3 = await headerBottom(page);
    assert.ok(wt >= hb3 - 1 && wt < vp.height * 0.6, `writing title at ${wt}`);
    log(tag, 'about/#writing offset', Math.round(wt));
    await page.goto(base + '/record/#updates'); await booted(page); await page.waitForTimeout(1500);
    const ut = await topOf(page, '#updates-title');
    assert.ok(ut >= (await headerBottom(page)) - 1 && ut < vp.height * 0.6, `updates at ${ut}`);
    assert.equal(await page.locator('.frame__nav a[aria-current="page"]').textContent(), 'Record');
    log(tag, 'record/#updates offset', Math.round(ut));

    // Client-side navigation, back and forward.
    await page.goto(base + '/about/'); await booted(page);
    await page.locator('.frame__nav a[href="/record/"]').click();
    await page.waitForURL('**/record/'); await page.waitForTimeout(1500);
    assert.equal(await page.locator('.frame__nav a[aria-current="page"]').textContent(), 'Record');
    await page.goBack(); await page.waitForURL('**/about/'); await page.waitForTimeout(1500);
    assert.equal(await page.locator('.frame__nav a[aria-current="page"]').textContent(), 'About');
    assert.equal(await page.evaluate(() => document.querySelectorAll('h1').length), 1);
    await page.goForward(); await page.waitForURL('**/record/'); await page.waitForTimeout(1500);
    assert.equal(await page.locator('.frame__nav a[aria-current="page"]').textContent(), 'Record');
    log(tag, 'back/forward keep the right page and active link');

    // 404
    const r = await page.goto(base + '/no-such-page/');
    assert.equal(await page.evaluate(() => document.querySelectorAll('h1').length), 1);
    log(tag, '404 page renders, status', r.status());

    assert.deepEqual(errors, [], 'no page errors');
    await ctx.close();
  }
  await browser.close();
}
console.log('nav checks passed');
