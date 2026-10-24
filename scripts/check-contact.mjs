// Run against the background dev server: npm run check:contact
import assert from 'node:assert/strict';
import { chromium, webkit } from 'playwright';

const base = process.env.CONTACT_BASE_URL || 'http://localhost:4321';
const email = 'mail@karanrajkr.com';
const idea = 'A clinic app & follow-ups? + café / नमस्ते 🛠';

for (const [engine, browserType] of Object.entries({ chromium, webkit })) {
  const browser = await browserType.launch();
  try {
    for (const width of [390, 1098]) {
      const context = await browser.newContext({ viewport: { width, height: 844 }, reducedMotion: 'reduce' });
      let draft;
      await context.route(/^https:\/\/(mail\.google\.com|outlook\.live\.com)\//, async (route) => {
        draft = new URL(route.request().url());
        await route.fulfill({ contentType: 'text/html', body: '<title>Compose destination</title><p>Draft destination verified</p>' });
      });
      const page = await context.newPage();
      const home = async () => {
        await page.goto(`${base}/#contact`);
        await page.waitForFunction(() => document.documentElement.classList.contains('is-booted'));
      };
      const back = async () => {
        await page.goBack();
        await page.locator('#ask-idea').waitFor();
        assert.equal(await page.locator('#ask-idea').inputValue(), idea);
      };
      const checkDraft = (provider) => {
        assert.equal(draft.hostname, provider === 'gmail' ? 'mail.google.com' : 'outlook.live.com');
        assert.equal(draft.searchParams.get('to'), email);
        assert.equal(draft.searchParams.get(provider === 'gmail' ? 'su' : 'subject'), 'An idea for Karan');
        assert.equal(draft.searchParams.get('body'), idea);
        assert.equal(context.pages().length, 1, 'Composing must not create a blank extra tab');
      };

      await home();
      await page.locator('#ask-idea').fill('   ');
      await page.locator('.ask__send').click();
      assert.equal(await page.locator('#ask-idea').evaluate((el) => el.validity.valid), false);
      assert.equal(draft, undefined);
      await page.locator('#ask-idea').fill(idea);
      const appHref = await page.locator('.contact [data-email-provider="app"]').getAttribute('href');
      assert.equal(new URL(appHref).searchParams.get('body'), idea);
      assert.ok(appHref.includes('%20'), 'Native email uses percent-encoded spaces');
      const directHref = await page.locator('[data-email-direct]').getAttribute('href');
      assert.equal(directHref, appHref, 'The visible address opens the same email-app draft');
      // Header and hero entry points lead to the contact section on this page.
      assert.equal(await page.locator('.hero__second').getAttribute('href'), '#contact');
      assert.equal(await page.locator('.frame__cta').getAttribute('href'), '#contact');
      await page.locator('.contact [data-email-provider="app"]').evaluate((el) => el.addEventListener('click', (event) => event.preventDefault(), { once: true }));
      await page.locator('.contact [data-email-provider="app"]').click();
      assert.match(await page.locator('.contact [data-email-status]').textContent(), /If no email app opens/);
      await page.screenshot({ path: `/tmp/contact-${engine}-${width}.png` });

      await Promise.all([page.waitForURL('https://mail.google.com/**'), page.locator('#ask-idea').press('Enter')]);
      checkDraft('gmail');
      await back();
      await Promise.all([page.waitForURL('https://outlook.live.com/**'), page.locator('.contact [data-email-provider="outlook"]').click()]);
      checkDraft('outlook');
      await back();
      await Promise.all([page.waitForURL('https://mail.google.com/**'), page.locator('.footer__mail').click()]);
      checkDraft('gmail');
      await back();

      // Clipboard denial and missing Clipboard API must offer real, selectable text.
      await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async () => { throw new DOMException('Denied', 'NotAllowedError'); } } }));
      await page.locator('.contact [data-copy]').click();
      const manual = page.locator('.contact [data-copy-manual]');
      await manual.waitFor({ state: 'visible' });
      assert.equal(await manual.inputValue(), email);
      assert.equal(await manual.evaluate((el) => {
        const field = /** @type {HTMLTextAreaElement} */ (el);
        return field.selectionEnd - field.selectionStart;
      }), email.length);
      await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', { configurable: true, value: undefined }));
      await page.locator('.contact [data-copy-draft]').click();
      assert.equal(await manual.inputValue(), idea);
      await page.locator('[data-clear-draft]').click();
      assert.equal(await page.locator('#ask-idea').inputValue(), '');
      assert.equal(await page.evaluate(() => sessionStorage.getItem('portfolio-contact-idea')), null);
      assert.equal(await page.locator('[data-copy-draft]').isVisible(), false);
      assert.equal(await manual.isVisible(), false);
      assert.equal(await manual.inputValue(), '');

      await page.goto(`${base}/about/`);
      assert.match(await page.locator('.footer__note').textContent(), /Founder of KĀRYO/);
      assert.doesNotMatch(await page.locator('.footer__note').textContent(), /co-founder|Havinash/i);
      await Promise.all([page.waitForURL('https://mail.google.com/**'), page.locator('.footer__mail').click()]);
      assert.equal(draft.searchParams.get('to'), email);
      assert.equal(context.pages().length, 1);
      console.log(`${engine} ${width}px: form, providers, footer, same-tab navigation, draft restoration, validation, manual copy and clear passed`);
      await context.close();
    }

    const context = await browser.newContext({ javaScriptEnabled: false });
    let draft;
    await context.route('https://mail.google.com/**', async (route) => {
      draft = new URL(route.request().url());
      await route.fulfill({ contentType: 'text/html', body: '<title>Compose destination</title>' });
    });
    const page = await context.newPage();
    await page.goto(`${base}/#contact`);
    await page.locator('#ask-idea').fill(idea);
    await Promise.all([page.waitForURL('https://mail.google.com/**'), page.locator('.ask__send').click()]);
    assert.equal(draft.searchParams.get('body'), idea);
    assert.equal(draft.searchParams.get('to'), email);
    assert.equal(context.pages().length, 1);
    await context.close();
    console.log(`${engine}: native form also works without portfolio JavaScript`);
    if (engine === 'chromium') {
      const context = await browser.newContext({ permissions: ['clipboard-read', 'clipboard-write'], reducedMotion: 'reduce' });
      const page = await context.newPage();
      await page.goto(`${base}/#contact`);
      await page.locator('.contact [data-copy]').click();
      await page.waitForFunction(() => document.querySelector('.contact [data-email-status]').textContent === 'Email address copied.');
      assert.equal(await page.evaluate(() => navigator.clipboard.readText()), email);
      await context.close();
      console.log('chromium: clipboard success verified by reading the actual clipboard');
    }
  } finally {
    await browser.close();
  }
}
