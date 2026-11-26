// charts.js — hand-drawn SVG charts, one builder per shape.
// No library, no canvas, no network: every chart is plain SVG built from
// the numbers in data.js, so it renders identically on desktop and phone.
// A null point in a monthly series breaks the line and is marked with a
// small "no data" cross — a missing month is shown as missing, never
// joined across or filled in.

const INK = '#12263a';
const RED = '#a93226';
const TEAL = '#17635e';
const GOLD = '#b07d2b';
const GRID = '#ddd3c0';
const MUTED = '#6b6257';
const PAPER = '#f7f3ea';

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

// Round a data range out to tidy one-decimal bounds with a little air.
function tidyRange(values) {
  const lo0 = Math.min(...values);
  const hi0 = Math.max(...values);
  return [Math.floor((lo0 - 0.3) * 10) / 10, Math.ceil((hi0 + 0.3) * 10) / 10];
}

// A line over months. Points are [label, value]; value null = not published.
export function monthlyLine(points, opts) {
  const w = opts.width || 560;
  const h = opts.height || 260;
  const left = 44, right = 14, top = 26, bottom = 30;
  const known = points.filter((p) => p[1] !== null).map((p) => p[1]);
  const [lo, hi] = tidyRange(known);
  const px = (i) => left + (i * (w - left - right)) / (points.length - 1);
  const py = (v) => top + ((hi - v) * (h - top - bottom)) / (hi - lo);
  const colour = opts.color || RED;
  let grid = '';
  for (let t = 0; t <= 4; t++) {
    const v = lo + ((hi - lo) * t) / 4;
    const y = py(v);
    grid += `<line x1="${left}" y1="${y}" x2="${w - right}" y2="${y}" stroke="${GRID}" stroke-width="1"/>`
      + `<text x="${left - 6}" y="${y + 4}" text-anchor="end" font-size="11" fill="${MUTED}">${v.toFixed(1)}</text>`;
  }
  let line = '';
  let marks = '';
  let monthLabels = '';
  let run = [];
  const flushRun = () => {
    if (run.length > 1) {
      line += `<polyline points="${run.map((pt) => pt.join(',')).join(' ')}" fill="none" stroke="${colour}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
    }
    run = [];
  };
  points.forEach((pt, i) => {
    const [label, value] = pt;
    monthLabels += `<text x="${px(i)}" y="${h - 8}" text-anchor="middle" font-size="11" fill="${MUTED}">${esc(label)}</text>`;
    if (value === null) {
      flushRun();
      const cx = px(i);
      const cy = top + (h - top - bottom) / 2;
      marks += `<g stroke="${GOLD}" stroke-width="2"><line x1="${cx - 5}" y1="${cy - 5}" x2="${cx + 5}" y2="${cy + 5}"/><line x1="${cx - 5}" y1="${cy + 5}" x2="${cx + 5}" y2="${cy - 5}"/></g>`
        + `<text x="${cx}" y="${cy - 12}" text-anchor="middle" font-size="10" fill="${GOLD}">no data</text>`;
    } else {
      run.push([px(i), py(value)]);
      marks += `<circle cx="${px(i)}" cy="${py(value)}" r="3.5" fill="${PAPER}" stroke="${colour}" stroke-width="2"/>`;
    }
  });
  flushRun();
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="${esc(opts.title || 'Line chart')}">`
    + `<text x="${left}" y="14" font-size="13" font-weight="700" fill="${INK}">${esc(opts.title || '')}</text>`
    + grid + line + marks + monthLabels + '</svg>';
}

// Horizontal bars. Rows are [label, value, colour]; unit is printed after
// each value (for example "m" or "%").
export function shareBars(rows, opts) {
  const w = opts.width || 560;
  const rowH = 34;
  const h = 34 + rows.length * rowH + 8;
  const left = 150, right = 56;
  const biggest = Math.max(...rows.map((r) => r[1]));
  const unit = opts.unit || '';
  let body = '';
  rows.forEach((row, i) => {
    const [label, value, colour] = row;
    const y = 30 + i * rowH;
    const bw = ((w - left - right) * value) / biggest;
    body += `<text x="${left - 10}" y="${y + 13}" text-anchor="end" font-size="13" fill="${INK}">${esc(label)}</text>`
      + `<rect x="${left}" y="${y}" width="${bw}" height="20" rx="3" fill="${colour || TEAL}"/>`
      + `<text x="${left + bw + 8}" y="${y + 14}" font-size="13" font-weight="700" fill="${INK}">${value}${unit}</text>`;
  });
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="${esc(opts.title || 'Bar chart')}">`
    + `<text x="0" y="14" font-size="13" font-weight="700" fill="${INK}">${esc(opts.title || '')}</text>`
    + body + '</svg>';
}

// Vertical columns by year. Columns are [label, value, colour]; format
// turns a value into its printed label (for example "$29.38T").
export function yearColumns(columns, opts) {
  const w = opts.width || 560;
  const h = opts.height || 260;
  const left = 54, right = 14, top = 26, bottom = 30;
  const ceiling = Math.max(...columns.map((c) => c[1])) * 1.12;
  const slot = (w - left - right) / columns.length;
  const bw = Math.min(90, slot * 0.55);
  let body = '';
  columns.forEach((col, i) => {
    const [label, value, colour] = col;
    const bh = ((h - top - bottom) * value) / ceiling;
    const x = left + i * slot + (slot - bw) / 2;
    const y = h - bottom - bh;
    const printed = opts.format ? opts.format(value) : String(value);
    body += `<rect x="${x}" y="${y}" width="${bw}" height="${bh}" rx="3" fill="${colour || INK}"/>`
      + `<text x="${x + bw / 2}" y="${y - 8}" text-anchor="middle" font-size="13" font-weight="700" fill="${INK}">${esc(printed)}</text>`
      + `<text x="${x + bw / 2}" y="${h - 8}" text-anchor="middle" font-size="12" fill="${MUTED}">${esc(label)}</text>`;
  });
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="${esc(opts.title || 'Column chart')}">`
    + `<text x="${left}" y="14" font-size="13" font-weight="700" fill="${INK}">${esc(opts.title || '')}</text>`
    + body + '</svg>';
}

// A donut with a ruled legend beside it. Segments are [label, value, colour].
export function mixDonut(segments, opts) {
  const size = 240;
  const cx = size / 2, cy = size / 2, outer = 88, inner = 58;
  const total = segments.reduce((s, d) => s + d[1], 0);
  let angle = -Math.PI / 2;
  let slices = '';
  segments.forEach((seg) => {
    const [label, value, colour] = seg;
    const next = angle + (value / total) * Math.PI * 2;
    const big = next - angle > Math.PI ? 1 : 0;
    const x0 = cx + outer * Math.cos(angle), y0 = cy + outer * Math.sin(angle);
    const x1 = cx + outer * Math.cos(next), y1 = cy + outer * Math.sin(next);
    const ix1 = cx + inner * Math.cos(next), iy1 = cy + inner * Math.sin(next);
    const ix0 = cx + inner * Math.cos(angle), iy0 = cy + inner * Math.sin(angle);
    slices += `<path d="M ${x0} ${y0} A ${outer} ${outer} 0 ${big} 1 ${x1} ${y1} L ${ix1} ${iy1} A ${inner} ${inner} 0 ${big} 0 ${ix0} ${iy0} Z" fill="${colour}"/>`;
    angle = next;
  });
  let legend = '';
  segments.forEach((seg) => {
    const [label, value, colour] = seg;
    legend += `<div class="legend-row"><span class="swatch" style="background:${colour}"></span><span>${esc(label)}</span><strong>${value}%</strong></div>`;
  });
  return `<div class="donut-wrap"><svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" role="img" aria-label="${esc(opts.title || 'Donut chart')}">${slices}`
    + `<text x="${cx}" y="${cy - 2}" text-anchor="middle" font-size="15" font-weight="700" fill="${INK}">${esc(opts.centre || '')}</text>`
    + `<text x="${cx}" y="${cy + 16}" text-anchor="middle" font-size="11" fill="${MUTED}">${esc(opts.centreSub || '')}</text></svg>`
    + `<div class="legend">${legend}</div></div>`;
}
