// Fills the karana table and every [data-clock] with values computed in the browser.
// Updates once a minute from the shared ticker (no timers of its own).
import { gsap } from 'gsap';
import { onPage } from '../engine';
import { karanas, type Karana } from '../lib/almanac';

const when = new Intl.DateTimeFormat('en-GB', { weekday: 'short', hour: '2-digit', minute: '2-digit' });
const NB = ' ';

function until(ms: number) {
  const m = Math.max(0, Math.round(ms / 60000));
  const h = Math.floor(m / 60);
  return h ? `${h}${NB}h ${m % 60}${NB}min` : `${m}${NB}min`;
}

function render(list: Karana[]) {
  const [cur, next] = list;
  const now = Date.now();
  document.querySelectorAll<HTMLElement>('[data-clock]').forEach((c) => {
    const n = c.querySelector('[data-k-now-wrap]');
    const x = c.querySelector('[data-k-next-wrap]');
    if (n) n.textContent = `Now ${cur.name}`;
    if (x) x.textContent = `${next.name} in ${until(next.start - now)}`;
  });
  const body = document.querySelector<HTMLTableSectionElement>('[data-almanac] tbody');
  if (!body) return;
  const rows = list.map((k, i) => {
    const tr = document.createElement('tr');
    tr.className = i === 0 ? 'is-now' : 'is-ahead';
    const cells = [k.name, when.format(k.start), when.format(k.end)];
    cells.forEach((v, j) => {
      const td = document.createElement('td');
      if (j === 0) td.className = 'almanac__name';
      td.textContent = v;
      tr.appendChild(td);
    });
    return tr;
  });
  body.replaceChildren(...rows);
}

export function startAlmanac() {
  let list = karanas();
  let lastMinute = -1;
  onPage(() => {
    render(list);
  });
  gsap.ticker.add(() => {
    const m = Math.floor(Date.now() / 60000);
    if (m === lastMinute) return;
    lastMinute = m;
    if (Date.now() >= list[0].end) list = karanas();
    render(list);
  });
}
