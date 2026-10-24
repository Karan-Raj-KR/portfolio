// Global motion for this site: runs once on the client, before the first page initializes.
// The hero's masked rise is CSS, so the title is painted and settled within about a second even
// before this script runs. One idea throughout, from Karan's own line "from ideas to real
// products": blue is the idea, ink is the thing that shipped, and the ink always follows the blue.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ease, isTouch, onPage, onScroll, prefersReducedMotion, scrollState, scrollToTarget, setTransition } from '../engine';
import { startAlmanac } from './almanac-ui';
import { startGitHub } from './github';
import { setupContact } from '../contact';

let clickedLabel = '';

export function setupMotion() {
  const reduced = prefersReducedMotion();

  // ---------- Page transition: a blue panel rises, the ink panel follows it with the
  // destination's name, then both lift away on the new page.
  document.addEventListener('click', (e) => {
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href]');
    clickedLabel = a?.dataset.transitionLabel || a?.textContent?.trim() || '';
  }, true);
  const shut = 'inset(100% 0% 0% 0%)', open = 'inset(0% 0% 0% 0%)', gone = 'inset(0% 0% 100% 0%)';
  setTransition({
    leave: (c) => {
      const lead = c.querySelector('.curtain__lead');
      const panel = c.querySelector('.curtain__panel');
      const label = c.querySelector<HTMLElement>('[data-curtain-label]');
      if (label) { label.textContent = clickedLabel; label.dataset.ghost = clickedLabel; }
      return gsap.timeline()
        .set(c, { autoAlpha: 1 })
        .set([lead, panel], { clipPath: shut })
        .set(label, { autoAlpha: 0, y: 24 })
        .to(lead, { clipPath: open, duration: 0.5, ease: ease.inOut })
        .to(panel, { clipPath: open, duration: 0.5, ease: ease.inOut }, 0.08)
        .to(label, { autoAlpha: 1, y: 0, duration: 0.35, ease: ease.out }, 0.34);
    },
    enter: (c) => {
      const lead = c.querySelector('.curtain__lead');
      const panel = c.querySelector('.curtain__panel');
      return gsap.timeline()
        .to(panel, { clipPath: gone, duration: 0.55, ease: ease.inOut })
        .to(lead, { clipPath: gone, duration: 0.55, ease: ease.inOut }, 0.08)
        .set(c, { autoAlpha: 0 });
    },
  });

  // ---------- Same-page links (#work, #contact, back to top): the page router would take the
  // click (it listens on document, in capture) and the smooth scroll would never move, so they
  // are handled on window, which hears the click first.
  addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href]');
    if (!a || (a.target && a.target !== '_self')) return;
    if (a.closest('[data-shift].is-live')) return; // the pinned sequence handles its own chapter links
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
    let id = '';
    try { id = decodeURIComponent(url.hash.slice(1)); } catch { return; }
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    e.stopPropagation();
    history.replaceState(history.state, '', url.hash);
    scrollToTarget(id === 'main' ? 0 : el);
    el.setAttribute('tabindex', el.getAttribute('tabindex') ?? '-1');
    el.focus({ preventScroll: true });
  }, true);

  setupContact();

  startAlmanac();
  startGitHub();

  // ---------- Hero: the title eases up as you leave it; the portrait settles as it scrolls by.
  onPage(() => {
    if (reduced) return;
    const title = document.querySelector('.hero__name');
    if (title) gsap.to(title, { yPercent: -14, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    document.querySelectorAll<HTMLElement>('[data-drift]').forEach((img) => {
      gsap.fromTo(img, { scale: 1.14, yPercent: -4 }, { scale: 1, yPercent: 4, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
  });

  // ---------- The hero's blue echo (the idea) runs a little ahead of the ink: it drifts at rest,
  // stretches with the scroll and leans with a quick flick of the pointer, then settles back.
  onPage(() => {
    const el = document.querySelector<HTMLElement>('[data-echo]');
    if (!el || reduced) return;
    let fs = parseFloat(getComputedStyle(el).fontSize) || 100;
    const onResize = () => { fs = parseFloat(getComputedStyle(el).fontSize) || 100; };
    const p = { x: 0, y: 0, vx: 0, vy: 0, t: 0 };
    const pos = { x: fs * 0.035, y: 0 };
    const move = (e: PointerEvent) => {
      const now = performance.now();
      const dt = Math.max(16, now - p.t);
      if (p.t) { p.vx = ((e.clientX - p.x) / dt) * 16; p.vy = ((e.clientY - p.y) / dt) * 16; }
      p.x = e.clientX; p.y = e.clientY; p.t = now;
    };
    const clamp = (v: number, l: number) => Math.max(-l, Math.min(l, v));
    const tick = (t: number) => {
      p.vx *= 0.88; p.vy *= 0.88;
      const lim = fs * 0.045;
      const tx = fs * 0.035 + Math.sin(t * 0.7) * fs * 0.006 + (isTouch() ? 0 : clamp(p.vx * 0.5, lim)) + Math.min(fs * 0.06, Math.abs(scrollState().velocity) * 0.5);
      const ty = isTouch() ? 0 : clamp(p.vy * 0.35, lim * 0.5);
      pos.x += (tx - pos.x) * 0.1;
      pos.y += (ty - pos.y) * 0.1;
      el.style.setProperty('--echo-x', `${pos.x.toFixed(2)}px`);
      el.style.setProperty('--echo-y', `${pos.y.toFixed(2)}px`);
    };
    addEventListener('pointermove', move, { passive: true });
    addEventListener('resize', onResize);
    const st = ScrollTrigger.create({ trigger: el, start: 'top bottom', end: 'bottom top', onToggle: (x) => (x.isActive ? gsap.ticker.add(tick) : gsap.ticker.remove(tick)) });
    if (st.isActive) gsap.ticker.add(tick);
    return () => { gsap.ticker.remove(tick); removeEventListener('pointermove', move); removeEventListener('resize', onResize); };
  });

  // ---------- From ideas to real products. Where the screen is big enough to hold a whole
  // product, the section holds still while the scroll plays each one in turn: its idea arrives
  // in blue, its name lands, then how it works, part by part. Phones, short landscape screens
  // and reduced motion read the same content as a plain stacked sequence.
  onPage(() => {
    const root = document.querySelector<HTMLElement>('[data-shift]');
    if (!root) return;
    const beats = [...root.querySelectorAll<HTMLElement>('[data-beat]')];
    const links = [...root.querySelectorAll<HTMLAnchorElement>('[data-shift-link]')];
    const parts = (b: HTMLElement) => ({
      idea: b.querySelector('.beat__idea'),
      name: b.querySelector<HTMLElement>('.beat__name'),
      rest: b.querySelectorAll('.beat__line, .beat__proof, .beat__more'),
      how: b.querySelector('.how'),
      bits: b.querySelectorAll('.how__title, [data-how-part]'),
    });
    // One beat arriving, as a timeline of length about 1.
    const arrive = (b: HTMLElement) => {
      const { idea, name, rest, how, bits } = parts(b);
      return gsap.timeline()
        .fromTo(idea, { yPercent: 60, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.3, ease: 'power3.out' }, 0)
        .fromTo(name, { '--echo-x': '0.6em', autoAlpha: 0 }, { '--echo-x': '0.035em', autoAlpha: 1, duration: 0.5, ease: 'power3.out' }, 0.1)
        .fromTo(rest, { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.3, stagger: 0.05, ease: 'power3.out' }, 0.3)
        .fromTo(how, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.45, ease: 'power3.inOut' }, 0.15)
        .fromTo(bits, { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.3, stagger: 0.06, ease: 'power3.out' }, 0.4);
    };
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference) and (min-width: 768px) and (min-height: 640px)', () => {
      root.classList.add('is-live');
      let active = -1;
      const setActive = (i: number) => {
        if (i === active) return;
        active = i;
        beats.forEach((b, k) => {
          b.classList.toggle('is-active', k === i);
          b.inert = k !== i;
          b.setAttribute('aria-hidden', String(k !== i));
        });
        links.forEach((l, k) => (k === i ? l.setAttribute('aria-current', 'step') : l.removeAttribute('aria-current')));
      };
      setActive(0);
      // Use the tallest product's actual height, including wrapped copy and its mechanism.
      // This also accommodates zoom, larger text and orientation changes without clipping.
      const fit = () => {
        const style = getComputedStyle(root);
        const height = Math.max(...beats.map((b) => b.offsetHeight))
          + (root.querySelector<HTMLElement>('.shift__toc')?.offsetHeight || 0)
          + parseFloat(style.paddingTop) + parseFloat(style.paddingBottom) + parseFloat(style.rowGap);
        root.style.setProperty('--shift-height', `${Math.ceil(height)}px`);
      };
      fit();
      const observer = new ResizeObserver(fit);
      beats.forEach((b) => observer.observe(b));
      gsap.set(beats[0], { visibility: 'visible' });
      // The first beat plays as the section arrives; the scroll plays the rest.
      const first = arrive(beats[0]).pause();
      const enter = ScrollTrigger.create({ trigger: root, start: 'top 75%', once: true, onEnter: () => first.play() });
      const tl = gsap.timeline({ defaults: { ease: 'none' } });
      const lands: number[] = [0]; // when each beat has fully arrived, on the timeline
      tl.to({}, { duration: 0.35 });
      beats.slice(1).forEach((b, k) => {
        // Each change takes 1.4 units: the old beat leaves, the new one arrives, then a hold.
        const prev = beats[k];
        const T = k * 1.4 + 0.35;
        // The outgoing product is fully gone before the next one starts, so no two overlap.
        tl.to(prev, { yPercent: -8, autoAlpha: 0, duration: 0.25, ease: 'power2.in' }, T)
          .set(prev, { visibility: 'hidden' }, T + 0.26)
          .set(b, { visibility: 'visible', autoAlpha: 1, yPercent: 0 }, T + 0.27)
          .add(arrive(b), T + 0.27);
        lands.push(T + 1.05);
      });
      tl.to({}, { duration: 0.4 });
      const current = () => Math.max(0, lands.filter((t) => tl.time() >= t - 0.45).length - 1);
      tl.eventCallback('onUpdate', () => setActive(current()));
      const st = ScrollTrigger.create({
        trigger: root, start: 'top top', end: () => `+=${(beats.length - 1) * root.offsetHeight * 1.1}`,
        pin: true, scrub: 0.6, animation: tl,
        onRefreshInit: fit,
      });
      // The chapter links jump to where that product has fully arrived.
      const jump = (e: MouseEvent) => {
        const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('[data-shift-link]');
        if (!link) return;
        e.preventDefault();
        e.stopPropagation();
        const i = Number(link.dataset.shiftLink);
        if (!first.progress()) first.progress(1);
        const y = st.start + (st.end - st.start) * Math.min(1, lands[i] / tl.duration());
        scrollToTarget(Math.round(y) + (i ? 2 : 0));
        link.focus({ preventScroll: true });
      };
      root.addEventListener('click', jump, true);
      return () => {
        observer.disconnect();
        root.removeEventListener('click', jump, true);
        st.kill(); enter.kill(); first.kill();
        root.classList.remove('is-live');
        root.style.removeProperty('--shift-height');
        beats.forEach((b) => { b.inert = false; b.removeAttribute('aria-hidden'); });
        links.forEach((l, k) => (k === 0 ? l.setAttribute('aria-current', 'step') : l.removeAttribute('aria-current')));
        gsap.set(beats, { clearProps: 'all' });
      };
    });
    // Stacked: each product plays its arrival once as it scrolls into view.
    mm.add('(prefers-reduced-motion: no-preference) and ((max-width: 767px) or (max-height: 639px))', () => {
      beats.forEach((b) => {
        const t = arrive(b).pause();
        ScrollTrigger.create({ trigger: b, start: 'top 85%', once: true, onEnter: () => t.play() });
      });
    });
    return () => mm.revert();
  });

  // ---------- FormPilot's walkthrough: ARIA tabs with arrow keys, Home and End. Without
  // script all three panels stay visible in order.
  onPage(() => {
    const walk = document.querySelector<HTMLElement>('[data-walk]');
    if (!walk) return;
    const list = walk.querySelector<HTMLElement>('[data-walk-tabs]')!;
    const tabs = [...list.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
    const panels = [...walk.querySelectorAll<HTMLElement>('[data-walk-panel]')];
    list.hidden = false;
    const select = (i: number, focus = false) => {
      tabs.forEach((t, k) => {
        const on = k === i;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        panels[k].hidden = !on;
      });
      if (focus) tabs[i].focus();
      if (!reduced) {
        gsap.fromTo(panels[i].querySelectorAll('td.is-now'), { autoAlpha: 0, x: -12 }, { autoAlpha: 1, x: 0, duration: 0.4, stagger: 0.06, ease: 'power3.out' });
      }
    };
    panels.forEach((p) => { p.tabIndex = 0; });
    select(0);
    const click = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest<HTMLButtonElement>('[role="tab"]');
      if (t) select(tabs.indexOf(t));
    };
    const key = (e: KeyboardEvent) => {
      const i = tabs.indexOf(document.activeElement as HTMLButtonElement);
      if (i < 0) return;
      const n = tabs.length;
      const to = e.key === 'ArrowRight' ? (i + 1) % n : e.key === 'ArrowLeft' ? (i - 1 + n) % n : e.key === 'Home' ? 0 : e.key === 'End' ? n - 1 : -1;
      if (to < 0) return;
      e.preventDefault();
      select(to, true);
    };
    list.addEventListener('click', click);
    list.addEventListener('keydown', key);
    return () => {
      list.removeEventListener('click', click);
      list.removeEventListener('keydown', key);
      list.hidden = true;
      panels.forEach((p) => { p.hidden = false; p.removeAttribute('tabindex'); });
    };
  });

  // ---------- Home navigation scrolls away with the hero, then returns as a fixed bar
  // when the blue results section reaches the top. Subpages use the solid bar immediately.
  onPage(() => {
    const root = document.documentElement;
    const results = document.querySelector<HTMLElement>('.hero + .results');
    if (!results) {
      root.classList.add('frame-compact');
      return () => root.classList.remove('frame-compact');
    }
    const update = (self: ScrollTrigger) => root.classList.toggle('frame-compact', self.scroll() >= self.start);
    const trigger = ScrollTrigger.create({
      trigger: results,
      start: 'top top',
      end: 'max',
      onUpdate: update,
      onRefresh: update,
    });
    update(trigger);
    return () => { trigger.kill(); root.classList.remove('frame-compact'); };
  });
  onScroll(({ progress }) => {
    document.documentElement.style.setProperty('--read', progress.toFixed(4));
  });

  // ---------- Colour fields flip the fixed frame through one class on <html>.
  onPage(() => {
    const root = document.documentElement;
    const set = (f: string | null) => {
      root.classList.toggle('field-blue', f === 'blue');
      root.classList.toggle('field-ink', f === 'ink');
    };
    const frame = document.querySelector<HTMLElement>('[data-frame]');
    const fields = [...document.querySelectorAll<HTMLElement>('[data-field]')];
    const update = () => {
      const probe = (frame?.offsetHeight ?? 64) / 2;
      const field = fields.find((el) => {
        const rect = el.getBoundingClientRect();
        return rect.top <= probe && rect.bottom > probe;
      });
      set(field?.dataset.field ?? null);
    };
    const unsubscribe = onScroll(update);
    ScrollTrigger.addEventListener('refresh', update);
    update();
    return () => {
      unsubscribe();
      ScrollTrigger.removeEventListener('refresh', update);
      set(null);
    };
  });
}
