// Karana computation. A karana is half a tithi: one karana per 6° of moon–sun elongation,
// 60 per lunar month. Longitudes from a truncated Meeus series (Astronomical Algorithms ch. 25
// and 47); the main 34 lunar terms put the moon within ~0.01°, about a minute of karana time.
// Sidereal vs tropical does not matter: the ayanamsa cancels in the elongation.

const RAD = Math.PI / 180;
const norm = (d: number) => ((d % 360) + 360) % 360;
const sin = (d: number) => Math.sin(d * RAD);

const julianCenturies = (ms: number) => (ms / 86400000 + 2440587.5 - 2451545.0) / 36525;

function sunLongitude(T: number) {
  const L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T * T;
  const M = 357.52911 + 35999.05029 * T - 0.0001537 * T * T;
  const C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * sin(M) + (0.019993 - 0.000101 * T) * sin(2 * M) + 0.000289 * sin(3 * M);
  return norm(L0 + C - 0.00569); // aberration (nutation cancels against the moon's)
}

// [D, M, M', F, coefficient in 1e-6 degrees]
const TERMS: [number, number, number, number, number][] = [
  [0, 0, 1, 0, 6288774], [2, 0, -1, 0, 1274027], [2, 0, 0, 0, 658314], [0, 0, 2, 0, 213618],
  [0, 1, 0, 0, -185116], [0, 0, 0, 2, -114332], [2, 0, -2, 0, 58793], [2, -1, -1, 0, 57066],
  [2, 0, 1, 0, 53322], [2, -1, 0, 0, 45758], [0, 1, -1, 0, -40923], [1, 0, 0, 0, -34720],
  [0, 1, 1, 0, -30383], [2, 0, 0, -2, 15327], [0, 0, 1, 2, -12528], [0, 0, 1, -2, 10980],
  [4, 0, -1, 0, 10675], [0, 0, 3, 0, 10034], [4, 0, -2, 0, 8548], [2, 1, -1, 0, -7888],
  [2, 1, 0, 0, -6766], [1, 0, -1, 0, -5163], [1, 1, 0, 0, 4987], [2, -1, 1, 0, 4036],
  [2, 0, 2, 0, 3994], [4, 0, 0, 0, 3861], [2, 0, -3, 0, 3665], [0, 1, -2, 0, -2689],
  [2, 0, -1, 2, -2602], [2, -1, -2, 0, 2390], [1, 0, 1, 0, -2348], [2, -2, 0, 0, 2236],
  [0, 1, 2, 0, -2120], [0, 2, 0, 0, -2069],
];

function moonLongitude(T: number) {
  const Lp = 218.3164477 + 481267.88123421 * T;
  const D = 297.8501921 + 445267.1114034 * T;
  const M = 357.5291092 + 35999.0502909 * T;
  const Mp = 134.9633964 + 477198.8675055 * T;
  const F = 93.272095 + 483202.0175233 * T;
  const E = 1 - 0.002516 * T;
  let s = 0;
  for (const [d, m, mp, f, c] of TERMS) {
    const e = Math.abs(m) === 1 ? E : Math.abs(m) === 2 ? E * E : 1;
    s += c * e * sin(d * D + m * M + mp * Mp + f * F);
  }
  const A1 = 119.75 + 131.849 * T;
  const A2 = 53.09 + 479264.29 * T;
  s += 3958 * sin(A1) + 1962 * sin(Lp - F) + 318 * sin(A2);
  return norm(Lp + s / 1e6);
}

/** Moon minus sun longitude, 0..360. */
export function elongation(ms: number) {
  const T = julianCenturies(ms);
  return norm(moonLongitude(T) - sunLongitude(T));
}

const MOVABLE = ['Bava', 'Balava', 'Kaulava', 'Taitila', 'Gara', 'Vanija', 'Vishti'];

/** Name of karana number k (0..59) in the lunar month. */
export function karanaName(k: number) {
  if (k === 0) return 'Kimstughna';
  if (k === 57) return 'Shakuni';
  if (k === 58) return 'Chatushpada';
  if (k === 59) return 'Naga';
  return MOVABLE[(k - 1) % 7];
}

const MEAN_RATE = 12.190749 / 86400000; // degrees per ms of mean elongation

/** Time (ms) when the elongation next reaches `target` degrees after `from`. */
function solve(target: number, from: number) {
  let t = from + (norm(target - elongation(from)) || 360) / MEAN_RATE;
  for (let i = 0; i < 6; i++) {
    const diff = ((target - elongation(t) + 540) % 360) - 180;
    t += diff / MEAN_RATE;
    if (Math.abs(diff) < 1e-5) break;
  }
  return t;
}

export type Karana = { index: number; name: string; start: number; end: number };

/** The current karana and the `count - 1` after it. */
export function karanas(now = Date.now(), count = 6): Karana[] {
  const e = elongation(now);
  let index = Math.floor(e / 6);
  let start = solve(index * 6, now - 1.2 * 86400000);
  if (start > now) start = solve(index * 6, now - 2.2 * 86400000);
  const out: Karana[] = [];
  for (let i = 0; i < count; i++) {
    const end = solve(((index + 1) % 60) * 6, start + 3600000);
    out.push({ index, name: karanaName(index), start, end });
    start = end;
    index = (index + 1) % 60;
  }
  return out;
}
