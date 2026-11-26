// charts.js — hand-drawn SVG charts, one function per chart type.
// No library, no canvas, no network: every chart is plain SVG built from
// the numbers in data.js, so it renders identically on desktop and phone.

const INK = '#12263a';
const RED = '#a93226';
const TEAL = '#17635e';
const GOLD = '#b07d2b';
const GRID = '#ddd3c0';
const MUTED = '#6b6257';

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
}

// Line chart over months. A null value breaks the line and is marked with a
// small "no data" cross — a missing month is shown as missing, never joined
// across or filled in.
export function lineChart(series, opts) {
  const w = opts.width || 560;
  const h = opts.height || 260;
  const padL = 44, padR = 14, padT = 26, padB = 30;
  const vals = series.map((d) => d.v).filter((v) => v !== null);
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const lo = Math.floor((min - 0.3) * 10) / 10;
  const hi = Math.ceil((max + 0.3) * 10) / 10;
  const x = (i) => padL + (i * (w - padL - padR)) / (series.length - 1);
  const y = (v) => padT + ((hi - v) * (h - padT - padB)) / (hi - lo);
  const ticks = 4;
  let grid = '';
  for (let t = 0; t <= ticks; t++) {
    const v = lo + ((hi - lo) * t) / ticks;
    const yy = y(v);
    grid += `<line x1="${padL}" y1="${yy}" x2="${w - padR}" y2="${yy}" stroke="${GRID}" stroke-width="1"/>`
      + `<text x="${padL - 6}" y="${yy + 4}" text-anchor="end" font-size="11" fill="${MUTED}">${v.toFixed(1)}</text>`;
  }
  let path = '';
  let dots = '';
  let labels = '';
  let run = [];
  const flush = () => {
    if (run.length > 1) {
      path += `<polyline points="${run.map((p) => `${p[0]},${p[1]}`).join(' ')}" fill="none" stroke="${opts.color || RED}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
    }
    run = [];
  };
  series.forEach((d, i) => {
    labels += `<text x="${x(i)}" y="${h - 8}" text-anchor="middle" font-size="11" fill="${MUTED}">${d.m}</text>`;
    if (d.v === null) {
      flush();
      const cx = x(i), cy = padT + (h - padT - padB) / 2;
      dots += `<g stroke="${GOLD}" stroke-width="2"><line x1="${cx - 5}" y1="${cy - 5}" x2="${cx + 5}" y2="${cy + 5}"/><line x1="${cx - 5}" y1="${cy + 5}" x2="${cx + 5}" y2="${cy - 5}"/></g>`
        + `<text x="${cx}" y="${cy - 12}" text-anchor="middle" font-size="10" fill="${GOLD}">no data</text>`;
    } else {
      run.push([x(i), y(d.v)]);
      dots += `<circle cx="${x(i)}" cy="${y(d.v)}" r="3.5" fill="#f7f3ea" stroke="${opts.color || RED}" stroke-width="2"/>`;
    }
  });
  flush();
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="${esc(opts.title || 'Line chart')}">`
    + `<text x="${padL}" y="14" font-size="13" font-weight="700" fill="${INK}">${esc(opts.title || '')}</text>`
    + grid + path + dots + labels + '</svg>';
}

// Horizontal bar chart (e.g. largest states, insurance coverage).
export function hbarChart(rows, opts) {
  const w = opts.width || 560;
  const rowH = 34;
  const h = 34 + rows.length * rowH + 8;
  const padL = 150, padR = 56;
  const max = Math.max(...rows.map((r) => r.v));
  const unit = opts.unit || '';
  let body = '';
  rows.forEach((r, i) => {
    const y = 30 + i * rowH;
    const bw = ((w - padL - padR) * r.v) / max;
    body += `<text x="${padL - 10}" y="${y + 13}" text-anchor="end" font-size="13" fill="${INK}">${esc(r.name)}</text>`
      + `<rect x="${padL}" y="${y}" width="${bw}" height="20" rx="3" fill="${r.color || TEAL}"/>`
      + `<text x="${padL + bw + 8}" y="${y + 14}" font-size="13" font-weight="700" fill="${INK}">${r.v}${unit}</text>`;
  });
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="${esc(opts.title || 'Bar chart')}">`
    + `<text x="0" y="14" font-size="13" font-weight="700" fill="${INK}">${esc(opts.title || '')}</text>`
    + body + '</svg>';
}

// Vertical bar chart (e.g. GDP by year).
export function vbarChart(rows, opts) {
  const w = opts.width || 560;
  const h = opts.height || 260;
  const padL = 54, padR = 14, padT = 26, padB = 30;
  const max = Math.max(...rows.map((r) => r.v)) * 1.12;
  const slot = (w - padL - padR) / rows.length;
  const bw = Math.min(90, slot * 0.55);
  let body = '';
  rows.forEach((r, i) => {
    const bh = ((h - padT - padB) * r.v) / max;
    const x = padL + i * slot + (slot - bw) / 2;
    const y = h - padB - bh;
    body += `<rect x="${x}" y="${y}" width="${bw}" height="${bh}" rx="3" fill="${r.color || INK}"/>`
      + `<text x="${x + bw / 2}" y="${y - 8}" text-anchor="middle" font-size="13" font-weight="700" fill="${INK}">${opts.format ? opts.format(r.v) : r.v}</text>`
      + `<text x="${x + bw / 2}" y="${h - 8}" text-anchor="middle" font-size="12" fill="${MUTED}">${esc(r.year)}</text>`;
  });
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="${esc(opts.title || 'Bar chart')}">`
    + `<text x="${padL}" y="14" font-size="13" font-weight="700" fill="${INK}">${esc(opts.title || '')}</text>`
    + body + '</svg>';
}

// Donut chart with a legend (e.g. electricity mix).
export function donutChart(segments, opts) {
  const size = 240;
  const cx = size / 2, cy = size / 2, r = 88, inner = 58;
  const total = segments.reduce((s, d) => s + d.v, 0);
  let a0 = -Math.PI / 2;
  let arcs = '';
  segments.forEach((d) => {
    const a1 = a0 + (d.v / total) * Math.PI * 2;
    const large = a1 - a0 > Math.PI ? 1 : 0;
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const xi1 = cx + inner * Math.cos(a1), yi1 = cy + inner * Math.sin(a1);
    const xi0 = cx + inner * Math.cos(a0), yi0 = cy + inner * Math.sin(a0);
    arcs += `<path d="M ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1} L ${xi1} ${yi1} A ${inner} ${inner} 0 ${large} 0 ${xi0} ${yi0} Z" fill="${d.color}"/>`;
    a0 = a1;
  });
  let legend = '';
  segments.forEach((d) => {
    legend += `<div class="legend-row"><span class="swatch" style="background:${d.color}"></span><span>${esc(d.name)}</span><strong>${d.v}%</strong></div>`;
  });
  return `<div class="donut-wrap"><svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" role="img" aria-label="${esc(opts.title || 'Donut chart')}">${arcs}`
    + `<text x="${cx}" y="${cy - 2}" text-anchor="middle" font-size="15" font-weight="700" fill="${INK}">${esc(opts.centre || '')}</text>`
    + `<text x="${cx}" y="${cy + 16}" text-anchor="middle" font-size="11" fill="${MUTED}">${esc(opts.centreSub || '')}</text></svg>`
    + `<div class="legend">${legend}</div></div>`;
}
