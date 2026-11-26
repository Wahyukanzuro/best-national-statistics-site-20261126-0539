// views.js — every page of the site, as HTML strings.
// Each page ends with its source line (source + year on every figure) and
// links on to the next section, so a visitor can walk the whole country.

import {
  SITE, HERO, UNEMPLOYMENT_2025, CPI_2025, POPULATION, ECONOMY, JOBS,
  PRICES, TRADE, HEALTH, EDUCATION, ENERGY, DEBT, SECTIONS,
} from './data.js';
import { lineChart, hbarChart, vbarChart, donutChart } from './charts.js';

const INK = '#12263a';
const RED = '#a93226';
const TEAL = '#17635e';
const GOLD = '#b07d2b';

function sourceLine(text) {
  return `<p class="source">Source: ${text}</p>`;
}

function statBlock(value, label, note) {
  return `<div class="stat"><div class="stat-value">${value}</div><div class="stat-label">${label}</div><p class="stat-note">${note}</p></div>`;
}

function gapNote() {
  return `<aside class="note"><strong>About the gap.</strong> October 2025 has no official `
    + `unemployment rate and no official CPI: the Bureau of Labor Statistics collected no data `
    + `from 1 October to 12 November 2025 during the federal funding lapse. Where a chart covers `
    + `2025, October is left blank rather than filled with an estimate.</aside>`;
}

function pager(currentRoute) {
  const i = SECTIONS.findIndex((s) => s.route === currentRoute);
  if (i < 0) return '';
  const prev = SECTIONS[(i - 1 + SECTIONS.length) % SECTIONS.length];
  const next = SECTIONS[(i + 1) % SECTIONS.length];
  return `<nav class="pager"><a href="${prev.route}">← ${prev.title}</a>`
    + `<a href="#/">All sections</a><a href="${next.route}">${next.title} →</a></nav>`;
}

function sectionHead(kicker, title, lede) {
  return `<p class="kicker">${kicker}</p><h1>${title}</h1><p class="lede">${lede}</p>`;
}

export function viewHome() {
  const cards = SECTIONS.map((s) => `<a class="card" href="${s.route}">`
    + `<span class="card-figure">${s.figure}</span><span class="card-title">${s.title}</span>`
    + `<span class="card-blurb">${s.blurb}</span></a>`).join('');
  const hero = HERO.map((h) => `<a class="hero-stat" href="${h.route}">`
    + `<span class="hero-value">${h.value}</span><span class="hero-label">${h.label}</span>`
    + `<span class="hero-detail">${h.detail}</span><span class="hero-source">${h.source}</span></a>`).join('');
  return `
  <section class="hero">
    <p class="kicker">United States of America · ${SITE.dateline}</p>
    <h1>The country, in nine numbers.</h1>
    <p class="lede">Every figure below comes from the agency that publishes it, with the year
    it covers. Nothing here is an estimate dressed up as an official release — where the
    official record has a gap, the gap is shown.</p>
    <div class="hero-grid">${hero}</div>
  </section>
  <section class="charts-row">
    <div class="chart-box">${lineChart(UNEMPLOYMENT_2025, { title: 'Unemployment rate, 2025 (%)', color: RED })}
      <p class="chart-cap">Monthly, seasonally adjusted. October: not published — see the gap note below.</p>
      ${sourceLine('Bureau of Labor Statistics, Employment Situation')}</div>
    <div class="chart-box">${lineChart(CPI_2025, { title: 'Consumer prices, 2025 (% year on year)', color: TEAL })}
      <p class="chart-cap">CPI-U, 12-month change. October: not published — see the gap note below.</p>
      ${sourceLine('Bureau of Labor Statistics, Consumer Price Index')}</div>
  </section>
  ${gapNote()}
  <section>
    <h2>Explore the country</h2>
    <div class="card-grid">${cards}</div>
  </section>
  <section class="about">
    <h2>How to read this site</h2>
    <p>Each page covers one subject and ends with the exact source and year of its figures.
    Where a series was revised after publication — GDP, trade — the page says which vintage it
    uses and does not mix vintages. Where the official record is silent, the page says so.
    The full list of sources is on the <a href="#/sources">Sources &amp; methods</a> page.</p>
  </section>`;
}

export function viewPopulation() {
  return sectionHead('People', 'Population', '340.1 million people lived in the United States on 1 July 2024 — '
    + '3.3 million more than a year earlier, the fastest annual growth since 2001.')
    + `<div class="stat-row">${statBlock(POPULATION.total, 'Resident population, 1 July 2024', POPULATION.totalNote)}</div>`
    + `<p>${POPULATION.driver}</p>`
    + `<div class="chart-box wide">${hbarChart(POPULATION.states, { title: 'Largest states, 1 July 2024 (millions of people)', unit: 'm' })}`
    + `<p class="chart-cap">${POPULATION.statesNote}</p>${sourceLine(POPULATION.source)}</div>`
    + pager('#/population');
}

export function viewEconomy() {
  const rows = ECONOMY.gdp.map((g, i) => ({ ...g, color: [TEAL, INK, RED][i] }));
  return sectionHead('Economy', 'The economy', 'The United States produced $29.38 trillion of goods and services '
    + 'in 2024, and $30.86 trillion in 2025 — the largest economy in the world by a wide margin.')
    + `<div class="stat-row">${statBlock('$29.38T', 'Nominal GDP, 2024', 'Real growth +3.0% in 2024; +2.3% in 2025.')}
    ${statBlock(ECONOMY.perCapita, 'GDP per person, 2024', ECONOMY.perCapitaNote)}</div>`
    + `<div class="chart-box wide">${vbarChart(rows, { title: 'Nominal GDP, trillions of dollars', format: (v) => '$' + v.toFixed(2) + 'T' })}`
    + `<p class="chart-cap">${ECONOMY.gdpNote}</p>${sourceLine(ECONOMY.source)}</div>`
    + `<aside class="note"><strong>About the revision.</strong> ${ECONOMY.revisionNote}</aside>`
    + pager('#/economy');
}

export function viewJobs() {
  return sectionHead('Jobs', 'Jobs', 'The labour market cooled through 2025 and steadied in 2026: '
    + 'unemployment was 4.1% in October 2026, with payrolls up 165,000 in the month.')
    + `<div class="stat-row">${statBlock(JOBS.rate, 'Unemployment rate, Oct 2026', JOBS.rateNote)}
    ${statBlock(JOBS.payrolls, 'Payrolls added, Oct 2026', JOBS.payrollsNote)}
    ${statBlock(JOBS.participation, 'Labour-force participation', JOBS.detailNote)}</div>`
    + `<div class="chart-box wide">${lineChart(UNEMPLOYMENT_2025, { title: 'Unemployment rate by month, 2025 (%)', color: RED, height: 300 })}`
    + `<p class="chart-cap">Seasonally adjusted. The 2025 series peaked at 4.5% in November.</p>${sourceLine(JOBS.source)}</div>`
    + `<p>${JOBS.gapNote}</p>`
    + pager('#/jobs');
}

export function viewPrices() {
  const latest = PRICES.latest.map((l) => `<li><strong>${l.v}</strong> — ${l.label}</li>`).join('');
  return sectionHead('Prices', 'Prices', 'Consumer-price inflation averaged about 2.7% in 2025 — '
    + 'close to the Federal Reserve’s 2% target, after the 9.1% peak of June 2022 faded from the series.')
    + `<div class="stat-row">${statBlock(PRICES.annual, 'CPI inflation, 2025', PRICES.annualNote)}</div>`
    + `<div class="chart-box wide">${lineChart(CPI_2025, { title: 'CPI inflation by month, 2025 (% year on year)', color: TEAL, height: 300 })}`
    + `<p class="chart-cap">${PRICES.latestNote}</p>${sourceLine(PRICES.source)}</div>`
    + `<h2>Latest monthly prints</h2><ul class="fact-list">${latest}</ul>`
    + pager('#/prices');
}

export function viewTrade() {
  return sectionHead('Trade', 'Trade', 'The United States ran a goods and services deficit of $918.4 billion '
    + 'in 2024 — exports and imports both at records, with a record goods deficit partly offset by a services surplus.')
    + `<div class="stat-row">${statBlock(TRADE.deficit, 'Goods &amp; services deficit, 2024', TRADE.deficitNote)}
    ${statBlock(TRADE.goodsDeficit, 'Goods deficit, 2024', TRADE.goodsDeficitNote)}
    ${statBlock(TRADE.china, 'Goods deficit with China', TRADE.chinaNote)}</div>`
    + `<div class="stat-row">${statBlock(TRADE.exports, 'Exports, 2024', TRADE.exportsNote)}
    ${statBlock(TRADE.imports, 'Imports, 2024', TRADE.importsNote)}</div>`
    + `<aside class="note"><strong>About the vintage.</strong> ${TRADE.vintageNote}</aside>`
    + sourceLine(TRADE.source)
    + pager('#/trade');
}

export function viewHealth() {
  const coverage = HEALTH.coverage.map((c, i) => ({ ...c, color: [TEAL, INK, GOLD][i] }));
  return sectionHead('Health', 'Health', 'Americans lived longer in 2024 than ever before: life expectancy '
    + 'reached 79.0 years, a record, as the death rate fell sharply from 2023.')
    + `<div class="stat-row">${statBlock(HEALTH.life, 'Life expectancy at birth, 2024', HEALTH.lifeNote)}
    ${statBlock(HEALTH.deathRate, 'Deaths per 100,000, 2024', HEALTH.deathRateNote)}
    ${statBlock(HEALTH.uninsured, 'Without health insurance, 2024', HEALTH.uninsuredNote)}</div>`
    + `<div class="chart-box wide">${hbarChart(coverage, { title: 'Health insurance coverage, 2024 (% of people)', unit: '%' })}`
    + `<p class="chart-cap">${HEALTH.coverageNote}</p>${sourceLine(HEALTH.source)}</div>`
    + pager('#/health');
}

export function viewEducation() {
  return sectionHead('Education', 'Education', 'More American teenagers finish high school on time than ever: '
    + '87.4% of the 2022–23 cohort graduated within four years.')
    + `<div class="stat-row">${statBlock(EDUCATION.graduation, 'High-school graduation rate, 2022–23', EDUCATION.graduationNote)}</div>`
    + `<p>${EDUCATION.context}</p>`
    + sourceLine(EDUCATION.source)
    + pager('#/education');
}

export function viewEnergy() {
  const mix = ENERGY.mix.map((m, i) => ({ ...m, color: [GOLD, TEAL, INK, '#5a5148', '#c9bda6'][i] }));
  return sectionHead('Energy', 'Energy', 'The United States generated 4.30 trillion kilowatt-hours of electricity '
    + 'in 2024. Natural gas supplied the largest share; renewables supplied nearly a quarter.')
    + `<div class="stat-row">${statBlock(ENERGY.generation, 'Electricity generated, 2024', ENERGY.generationNote)}
    ${statBlock(ENERGY.production, 'Quadrillion BTU produced, 2024', ENERGY.productionNote)}</div>`
    + `<div class="chart-box wide">${donutChart(mix, { title: 'Electricity generation mix, 2024', centre: '4.30T', centreSub: 'kWh, 2024' })}`
    + `<p class="chart-cap">${ENERGY.mixNote}</p>${sourceLine(ENERGY.source)}</div>`
    + pager('#/energy');
}

export function viewDebt() {
  return sectionHead('Government debt', 'Government debt', 'The federal government owed $37.6 trillion at the end '
    + 'of fiscal year 2025 — about $30.3 trillion of it held by the public, the rest owed to its own trust funds.')
    + `<div class="stat-row">${statBlock(DEBT.total, 'Total federal debt, 30 Sep 2025', DEBT.totalNote)}
    ${statBlock(DEBT.public, 'Held by the public', DEBT.publicNote)}
    ${statBlock(DEBT.intra, 'Intragovernmental', DEBT.intraNote)}
    ${statBlock(DEBT.deficit, 'Budget deficit, FY2025', DEBT.deficitNote)}</div>`
    + `<p>Debt held by the public is the part that matters most for interest costs and borrowing: it stood at roughly `
    + `89% of GDP at the end of FY2025, near its post-war high.</p>`
    + sourceLine(DEBT.source)
    + pager('#/debt');
}

export function viewSources() {
  const rows = [
    ['Population', POPULATION.source],
    ['Economy / GDP', ECONOMY.source],
    ['Jobs', JOBS.source],
    ['Prices', PRICES.source],
    ['Income & poverty', 'U.S. Census Bureau, Income, Poverty and Health Insurance Coverage 2024 (CPS ASEC, released 9 September 2025): median household income $83,730; poverty rate 10.6%.'],
    ['Trade', TRADE.source],
    ['Health', HEALTH.source],
    ['Education', EDUCATION.source],
    ['Energy', ENERGY.source],
    ['Government debt', DEBT.source],
  ];
  const list = rows.map(([t, s]) => `<tr><th scope="row">${t}</th><td>${s}</td></tr>`).join('');
  return sectionHead('Sources &amp; methods', 'Sources &amp; methods', 'Every figure on this site names the agency '
    + 'that published it and the year it covers. This page collects them in one place, with the rules the site follows.')
    + `<table class="sources-table"><thead><tr><th>Subject</th><th>Source</th></tr></thead><tbody>${list}</tbody></table>`
    + `<h2>The rules</h2><ul class="fact-list">`
    + `<li><strong>One vintage per series.</strong> Where a series was revised, the page says which vintage it uses and never mixes two.</li>`
    + `<li><strong>Gaps are shown, not filled.</strong> October 2025 has no official unemployment rate or CPI; the charts leave it blank.</li>`
    + `<li><strong>Derived figures are labelled.</strong> GDP per person is computed from GDP and population and says so.</li>`
    + `<li><strong>No figure without a source.</strong> A number the primary source could not confirm is not on the site.</li></ul>`
    + `<p><a href="#/">← Back to the homepage</a></p>`;
}

export const ROUTES = {
  '/': { title: 'The Union Ledger — United States statistics', render: viewHome },
  '/population': { title: 'Population — The Union Ledger', render: viewPopulation },
  '/economy': { title: 'Economy — The Union Ledger', render: viewEconomy },
  '/jobs': { title: 'Jobs — The Union Ledger', render: viewJobs },
  '/prices': { title: 'Prices — The Union Ledger', render: viewPrices },
  '/trade': { title: 'Trade — The Union Ledger', render: viewTrade },
  '/health': { title: 'Health — The Union Ledger', render: viewHealth },
  '/education': { title: 'Education — The Union Ledger', render: viewEducation },
  '/energy': { title: 'Energy — The Union Ledger', render: viewEnergy },
  '/debt': { title: 'Government debt — The Union Ledger', render: viewDebt },
  '/sources': { title: 'Sources & methods — The Union Ledger', render: viewSources },
};
