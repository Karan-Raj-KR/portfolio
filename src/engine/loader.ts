// First-load sequence. Progress follows REAL work (fonts + critical images), eased by GSAP,
// with a floor so it reads as intentional and a ceiling so it never becomes a usability problem.
// Markup (#loader) lives in the layout; its look is authored per project.
import { gsap } from 'gsap';
import { ease, prefersReducedMotion } from './env';

let format = (p: number) => String(Math.round(p)).padStart(3, '0');
/** Customize the counter text, e.g. a clock, a year, a frame count. p goes 0 → 100. */
export const setLoaderFormat = (fn: (p: number) => string) => { format = fn; };
let exit: ((root: HTMLElement) => gsap.core.Timeline) | null = null;
/** Replace the exit choreography (the loader → hero handoff). Return a timeline. */
export const setLoaderExit = (fn: (root: HTMLElement) => gsap.core.Timeline) => { exit = fn; };

const MIN = 0.7; // seconds: long enough to read as a designed moment
const MAX = 1.2; // seconds: progress cap, leaves room for boot + exit inside 2.6 s

function criticalAssets(): Promise<unknown>[] {
  const imgs = [...document.querySelectorAll<HTMLImageElement>('img[data-critical], [data-intro] img, [data-gl-instant] img')];
  return [document.fonts.ready, ...imgs.map((i) => (i.complete ? Promise.resolve() : i.decode().catch(() => {})))];
}

export async function runLoader(): Promise<void> {
  const root = document.getElementById('loader');
  if (!root) return;
  // Phones skip the loader (CSS hides it): on a slow connection the JS download alone would
  // push it past the budget. They get the hero intro directly.
  if (getComputedStyle(root).display === 'none') return finish(root);
  if (prefersReducedMotion()) {
    await Promise.race([Promise.all(criticalAssets()), wait(MAX)]);
    await gsap.to(root, { autoAlpha: 0, duration: 0.3 });
    return finish(root);
  }
  const count = root.querySelector<HTMLElement>('[data-loader-count]');
  const bar = root.querySelector<HTMLElement>('[data-loader-bar]');
  const tasks = criticalAssets();
  let done = 0;
  const shown = { v: 0 };
  const target = { v: 0 };
  tasks.forEach((t) => t.then(() => { done++; target.v = (done / tasks.length) * 100; }));
  const start = performance.now();

  await new Promise<void>((resolve) => {
    const tick = () => {
      const elapsed = (performance.now() - start) / 1000;
      const timeCap = Math.min(100, (elapsed / MIN) * 100); // never faster than MIN
      const goal = elapsed > MAX ? 100 : Math.min(target.v, timeCap);
      shown.v += (goal - shown.v) * (1 - Math.pow(0.86, gsap.ticker.deltaRatio()));
      if ((goal === 100 && shown.v > 98) || elapsed > MAX + 0.3) shown.v = 100;
      if (count) count.textContent = format(shown.v);
      if (bar) bar.style.transform = `scaleX(${shown.v / 100})`;
      if (shown.v === 100) { gsap.ticker.remove(tick); resolve(); }
    };
    gsap.ticker.add(tick);
  });

  if (exit) { await exit(root); return finish(root); }
  await gsap.timeline()
    .to(root.querySelectorAll('[data-loader-out]'), { yPercent: -110, duration: 0.7, ease: ease.inOut, stagger: 0.05 })
    .to(root, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1, ease: ease.inOut }, '-=0.35');
  finish(root);
}

// Hide rather than remove.
function finish(root: HTMLElement) {
  root.hidden = true;
  try { sessionStorage.setItem('kr:loaded', '1'); } catch {} // the loader plays once per visit
  document.documentElement.classList.add('is-loaded');
}

const wait = (s: number) => new Promise((r) => setTimeout(r, s * 1000));
