// Refreshes the open-source panel from the public GitHub API in the browser: ONE request (the
// repo list, sorted by last push) gives both the latest push and crewai-recipes' counts. The
// result is cached in localStorage for an hour, so a visitor uses at most one of the API's
// 60 anonymous requests per hour. If the API is unreachable or rate limited, the
// server-rendered text stays as it is.
import { onPage } from '../engine';

type Live = { pushRepo?: string; pushAt?: string; forks?: number; stars?: number; at: number };
const KEY = 'kr:gh:v2';
const TTL = 60 * 60 * 1000;
let pending: Promise<Live | null> | null = null;

const rel = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
function ago(iso: string) {
  const s = (Date.parse(iso) - Date.now()) / 1000;
  const units: [Intl.RelativeTimeFormatUnit, number][] = [['day', 86400], ['hour', 3600], ['minute', 60]];
  for (const [u, n] of units) if (Math.abs(s) >= n || u === 'minute') return rel.format(Math.round(s / n), u);
  return 'just now';
}

function read(): Live | null {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || 'null') as Live | null;
    return v && Date.now() - v.at < TTL ? v : null;
  } catch { return null; }
}

async function load(user: string): Promise<Live | null> {
  const cached = read();
  if (cached) return cached;
  try {
    const r = await fetch(`https://api.github.com/users/${user}/repos?sort=pushed&per_page=100`);
    if (!r.ok) return null;
    const repos = (await r.json()) as { name: string; fork: boolean; pushed_at: string; forks_count: number; stargazers_count: number }[];
    const own = repos.filter((x) => !x.fork && x.name !== user);
    const crew = repos.find((x) => x.name === 'crewai-recipes');
    const out: Live = { at: Date.now(), pushRepo: own[0]?.name, pushAt: own[0]?.pushed_at, forks: crew?.forks_count, stars: crew?.stargazers_count };
    try { localStorage.setItem(KEY, JSON.stringify(out)); } catch {}
    return out;
  } catch { return null; }
}

export function startGitHub() {
  onPage(() => {
    const panel = document.querySelector<HTMLElement>('[data-github]');
    if (!panel) return;
    let live = true;
    // Ask GitHub only when the panel is about to be read, so a visit that never scrolls there
    // spends none of the visitor's 60 anonymous requests an hour.
    const io = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      pending ??= load(panel.dataset.github!);
      pending.then((d) => {
        if (!live || !d) return;
        const set = (sel: string, v?: string | number) => { const el = panel.querySelector(sel); if (el && v !== undefined && v !== '') el.textContent = String(v); };
        if (d.pushRepo && d.pushAt) set('[data-gh="push"]', `${d.pushRepo}, ${ago(d.pushAt)}`);
        if (d.forks !== undefined) set('[data-gh="forks"]', `${d.forks} forks`);
      });
    }, { rootMargin: '600px 0px' });
    io.observe(panel);
    return () => { live = false; io.disconnect(); };
  });
}
