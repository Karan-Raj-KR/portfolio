// Smooth scroll on ONE clock: Lenis is driven by gsap.ticker, ScrollTrigger reads Lenis.
// Reduced motion → native scroll, no Lenis.
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './env';

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;
const listeners = new Set<(s: ScrollState) => void>();

export type ScrollState = { y: number; velocity: number; progress: number; limit: number };
const state: ScrollState = { y: 0, velocity: 0, progress: 0, limit: 0 };

export function initScroll() {
  if (lenis || prefersReducedMotion()) {
    // Still publish native scroll position for WebGL sync.
    if (!lenis) addEventListener('scroll', nativeTick, { passive: true });
    return;
  }
  lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, touchMultiplier: 1.2 }); // same-page anchors are handled in setupMotion
  lenis.on('scroll', (l: Lenis) => {
    state.y = l.scroll;
    state.velocity = l.velocity;
    state.limit = l.limit;
    state.progress = l.limit > 0 ? l.scroll / l.limit : 0; // Lenis reports 1 on pages that cannot scroll
    ScrollTrigger.update();
    listeners.forEach((fn) => fn(state));
  });
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

function nativeTick() {
  const max = document.documentElement.scrollHeight - innerHeight;
  state.velocity = scrollY - state.y;
  state.y = scrollY;
  state.limit = max;
  state.progress = max > 0 ? scrollY / max : 0;
  listeners.forEach((fn) => fn(state));
}

export const onScroll = (fn: (s: ScrollState) => void) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};
export const scrollState = () => state;
/** Where the scroll is going to land: Lenis' target while it eases, else a momentum estimate. */
export function scrollForecast() {
  const est = state.y + state.velocity * 30;
  const t = lenis && Math.abs(lenis.targetScroll - lenis.animatedScroll) > 1 ? lenis.targetScroll : est;
  return Math.max(0, Math.min(state.limit, t));
}
export const stopScroll = () => lenis?.stop();
export const startScroll = () => lenis?.start();
export function resetScroll() {
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
  else scrollTo(0, 0);
  state.y = 0;
  state.velocity = 0;
}
export function scrollToTarget(target: string | HTMLElement | number, { immediate = false } = {}) {
  const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;
  if (el === null) return;
  const offset = typeof el === 'number' ? 0 : -(parseFloat(getComputedStyle(el).scrollMarginTop) || 0);
  // Lenis already reads scroll-margin; only native numeric scrolling needs our offset.
  if (lenis) lenis.scrollTo(el, { immediate, force: immediate, duration: 1.4, easing: (t) => 1 - Math.pow(1 - t, 4) });
  else scrollTo({ top: typeof el === 'number' ? el : el.getBoundingClientRect().top + scrollY + offset, behavior: 'instant' });
}
