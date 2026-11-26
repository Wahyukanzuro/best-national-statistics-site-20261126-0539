// views.js — every page of the site, as HTML strings.
// Each page ends with its source line: source and year on every figure.
// Data pages carry a ruled ledger table where the numbers repay a second
// look; the homepage carries the whole country in eight hero figures and
// three charts. Links join every page to the next, so a visitor can walk
// the whole country without ever touching the address bar.

import {
  SITE, HERO_TOP, HERO_MORE, UNEMPLOYMENT, CPI, SECTIONS,
  POPULATION, ECONOMY, INCOME, JOBS, PRICES, TRADE, HEALTH,
  EDUCATION, ENERGY, DEBT,
} from './data.js';
import { monthlyLine, shareBars, yearColumns, mixDonut } from './charts.js';

const INK = '#12263a';
const RED = '#a93226';
const TEAL = '#17635e';
const GOLD = '#b07d2b';

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
}

function cite(ref) {
  return `<p class="source">Source: ${esc(ref)}</p>`;
}

function statCard(big, what, note) {
  return `<div class="stat"><div class="stat-value">${big}</div><div class="stat-label">${what}</div><p class="stat-note">${note}</p></div>`;
}

function heroRow(list, tone) {
  const cards = list.map((h) => `<a class="hero-stat ${tone}" href="${h[4]}">`
    + `<span class="hero-value">${h[0]}</span><span class="hero-label">${h[1]}</span>`
    + `<span class="hero-detail">${h[2]}</span><span class="hero-source">${h[3]}</span></a>`).join('');
  return `<div class="hero-grid">${cards}</div>`;
}

// A ruled ledger table. headers are the column heads; rows are arrays of
// cells; strongRow (if given) is printed bold with a double rule above it.
function ledgerTable(caption, headers, rows, strongRow) {
  const head = `<tr>${headers.map((h, i) => `<th scope="col" class="${i === 0 ? 'l' : 'r'}">${h}</th>`).join('')}</tr>`;
  const body = rows.map((row, i) => {
    const cls = i === strongRow ? ' class="total-row"' : '';
    const cells = row.map((c, j) => (j === 0
      ? `<th scope="row" class="l">${c}</th>`
      : `<td class="r">${c}</td>`)).join('');
    return `<tr${cls}>${cells}</tr>`;
  }).join('');
  return `<div class="ledger-box"><p class="ledger-cap">${caption}</p>`
    + `<table class="ledger"><thead>${head}</thead><tbody>${body}</tbody></table></div>`;
}

function gapBox() {
  return `<aside class="note"><strong>About the gap.</strong> October 2025 has no official `
    + `unemployment rate and no official CPI: the Bureau of Labor Statistics collected no data `
    + `from 1 October to 12 November 2025 during the federal funding lapse. Where a chart covers `
    + `2025, October is left blank rather than filled with an estimate.</aside>`;
}

function pageNav(slug) {
  const i = SECTIONS.findIndex((s) => s.slug === slug);
  if (i < 0) return '';
  const prev = SECTIONS[(i - 1 + SECTIONS.length) % SECTIONS.length];
  const next = SECTIONS[(i + 1) % SECTIONS.length];
  return `<nav class="pager"><a href="#/${prev.slug}">← ${prev.title}</a>`
    + `<a href="#/">All sections</a><a href="#/${next.slug}">${next.title} →</a></nav>`;
}

function pageHead(no, kicker, title, lede) {
  return `<p class="kicker"><span class="folio">№ ${no}</span> · ${kicker}</p><h1>${title}</h1><p class="lede">${lede}</p>`;
}

export function viewHome() {
  const cards = SECTIONS.map((s) => `<a class="card" href="#/${s.slug}">`
    + `<span class="card-figure">${s.figure}</span><span class="card-title">${s.no} · ${s.title}</span>`
    + `<span class="card-blurb">${s.blurb}</span></a>`).join('');
  const gdpCols = ECONOMY.gdpYears.map((g, i) => [g[0], g[1], [TEAL, INK, RED][i]]);
  return `
  <section class="hero">
    <p class="kicker">${SITE.place} · ${SITE.dateline}</p>
    <h1>The country, in ten numbers.</h1>
    <p class="lede">Every figure below comes from the agency that publishes it, with the year
    it covers. Nothing here is an estimate dressed up as an official release — where the
    official record has a gap, the gap is shown.</p>
    ${heroRow(HERO_TOP, 'tone-red')}
  </section>
  <section class="charts-row">
    <div class="chart-box">${monthlyLine(UNEMPLOYMENT, { title: 'Unemployment rate, 2025 (%)', color: RED })}
      <p class="chart-cap">Monthly, seasonally adjusted. October: not published — see the gap note below.</p>
      ${cite('Bureau of Labor Statistics, Employment Situation')}</div>
    <div class="chart-box">${monthlyLine(CPI, { title: 'Consumer prices, 2025 (% year on year)', color: TEAL })}
      <p class="chart-cap">CPI-U, 12-month change. October: not published — see the gap note below.</p>
      ${cite('Bureau of Labor Statistics, Consumer Price Index')}</div>
  </section>
  ${heroRow(HERO_MORE, 'tone-teal')}
  <section>
    <div class="chart-box wide">${yearColumns(gdpCols, { title: 'Nominal GDP, trillions of dollars', height: 220, format: (v) => '$' + v.toFixed(2) + 'T' })}
      <p class="chart-cap">Real growth: +3.0% in 2024 and +2.3% in 2025. The 2024 figure is the revised vintage of the 2026 annual update.</p>
      ${cite(ECONOMY.source)}</div>
  </section>
  ${gapBox()}
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
  const stateRows = POPULATION.states.map((s) => [s[0], s[1].toFixed(2), s[2].toFixed(1) + '%']);
  stateRows.push([POPULATION.statesTotal[0], POPULATION.statesTotal[1].toFixed(2), POPULATION.statesTotal[2].toFixed(1) + '%']);
  return pageHead('01', 'People', 'Population', '340.1 million people lived in the United States on 1 July 2024 — '
    + '3.3 million more than a year earlier, the fastest annual growth since 2001.')
    + `<div class="stat-row">${statCard(POPULATION.total, 'Resident population, 1 July 2024', POPULATION.growthNote)}
    ${statCard(POPULATION.growth, 'People added in a year', 'The fastest annual growth since 2001.')}
    ${statCard(POPULATION.migration, 'Net international migration, 2023–24', POPULATION.migrationNote)}</div>`
    + `<div class="chart-box wide">${shareBars(POPULATION.states.map((s) => [s[0], s[1], TEAL]), { title: 'Largest states, 1 July 2024 (millions of people)', unit: 'm' })}
    <p class="chart-cap">${POPULATION.statesNote}</p></div>`
    + ledgerTable('The five largest states, 1 July 2024',
      ['State', 'People (millions)', 'Share of the U.S.'],
      stateRows, stateRows.length - 1)
    + `<p class="chart-cap">Shares are derived from the published populations and rounded to one decimal place, so the column may not add exactly. The five states together hold about 37% of the country.</p>`
    + cite(POPULATION.source)
    + pageNav('population');
}

export function viewEconomy() {
  const gdpCols = ECONOMY.gdpYears.map((g, i) => [g[0], g[1], [TEAL, INK, RED][i]]);
  return pageHead('02', 'Economy', 'The economy', 'The United States produced $29.38 trillion of goods and services '
    + 'in 2024, and $30.86 trillion in 2025 — the largest economy in the world by a wide margin.')
    + `<div class="stat-row">${statCard('$29.38T', 'Nominal GDP, 2024', 'Real growth +3.0% in 2024; +2.3% in 2025.')}
    ${statCard(ECONOMY.perCapita, 'GDP per person, 2024', ECONOMY.perCapitaNote)}</div>`
    + `<div class="chart-box wide">${yearColumns(gdpCols, { title: 'Nominal GDP, trillions of dollars', format: (v) => '$' + v.toFixed(2) + 'T' })}
    <p class="chart-cap">Nominal GDP, trillions of dollars. Real growth: +3.0% in 2024 and +2.3% in 2025.</p>${cite(ECONOMY.source)}</div>`
    + ledgerTable('The economy in figures',
      ['', '2024', '2025'],
      [['Nominal GDP', '$29.38T', '$30.86T'], ['Real growth', '+3.0%', '+2.3%'], ['GDP per person', '~$86,400', '—']])
    + `<p class="chart-cap">GDP per person is derived from GDP and population; the 2025 figure is not shown because the 2025 population is not yet published in this vintage.</p>`
    + `<aside class="note"><strong>About the revision.</strong> ${ECONOMY.revisionNote}</aside>`
    + pageNav('economy');
}

export function viewIncome() {
  return pageHead('03', 'Income', 'Income', 'The typical American household earned $83,730 in 2024, and 10.6% of '
    + 'the population lived below the official poverty line — the lowest poverty rate in the series’ recent years.')
    + `<div class="stat-row">${statCard(INCOME.median, 'Median household income, 2024', INCOME.medianNote)}
    ${statCard(INCOME.poverty, 'Poverty rate, 2024', INCOME.povertyNote)}
    ${statCard(INCOME.spm, 'Supplemental Poverty Measure, 2024', INCOME.spmNote)}</div>`
    + ledgerTable('Income and poverty, by year',
      ['', '2023', '2024'],
      [['Real median household income', '$82,690', '$83,730'], ['Official poverty rate', '11.0%', '10.6%']])
    + `<p class="chart-cap">The change in median income from 2023 is not statistically significant. The Supplemental Poverty Measure counts taxes, transfers and the cost of essentials; only its 2024 value is shown here.</p>`
    + cite(INCOME.source)
    + pageNav('income');
}

export function viewJobs() {
  return pageHead('04', 'Jobs', 'Jobs', 'The labour market cooled through 2025 and steadied in 2026: '
    + 'unemployment was 4.1% in October 2026, with payrolls up 165,000 in the month.')
    + `<div class="stat-row">${statCard(JOBS.rate, 'Unemployment rate, Oct 2026', JOBS.rateNote)}
    ${statCard(JOBS.payrolls, 'Payrolls added, Oct 2026', JOBS.payrollsNote)}
    ${statCard(JOBS.participation, 'Labour-force participation', JOBS.participationNote)}</div>`
    + `<div class="chart-box wide">${monthlyLine(UNEMPLOYMENT, { title: 'Unemployment rate by month, 2025 (%)', color: RED, height: 260 })}
    <p class="chart-cap">Seasonally adjusted. The 2025 series peaked at 4.5% in November.</p>${cite(JOBS.source)}</div>`
    + `<div class="stat-row">${statCard(JOBS.employed, 'People employed, Oct 2026', JOBS.employedNote)}
    ${statCard(JOBS.unemployed, 'People unemployed, Oct 2026', JOBS.unemployedNote)}
    ${statCard(JOBS.empPop, 'Employment–population ratio', JOBS.empPopNote)}</div>`
    + `<p>${JOBS.gapNote}</p>`
    + pageNav('jobs');
}

export function viewPrices() {
  const latest = PRICES.latest.map((l) => `<li><strong>${l[1]}</strong> — ${l[0]}</li>`).join('');
  return pageHead('05', 'Prices', 'Prices', 'Consumer-price inflation averaged about 2.7% in 2025 — '
    + 'close to the Federal Reserve’s 2% target, after the 9.1% peak of June 2022 faded from the series.')
    + `<div class="stat-row">${statCard(PRICES.annual, 'CPI inflation, 2025', PRICES.annualNote)}
    ${statCard(PRICES.sep2026, 'CPI, September 2026', PRICES.sep2026Note)}</div>`
    + `<div class="chart-box wide">${monthlyLine(CPI, { title: 'CPI inflation by month, 2025 (% year on year)', color: TEAL, height: 260 })}
    <p class="chart-cap">${PRICES.latestNote}</p>${cite(PRICES.source)}</div>`
    + `<h2>Latest monthly prints</h2><ul class="fact-list">${latest}</ul>`
    + pageNav('prices');
}

export function viewTrade() {
  const rows = TRADE.balance.map((r) => [r[0], r[1]]);
  return pageHead('06', 'Trade', 'Trade', 'The United States ran a goods and services deficit of $918.4 billion '
    + 'in 2024 — exports and imports both at records, with a record goods deficit partly offset by a services surplus.')
    + `<div class="stat-row">${statCard(TRADE.deficit, 'Goods &amp; services deficit, 2024', TRADE.deficitNote)}
    ${statCard(TRADE.goodsDeficit, 'Goods deficit, 2024', TRADE.goodsDeficitNote)}
    ${statCard(TRADE.services, 'Services surplus, 2024', TRADE.servicesNote)}</div>`
    + `<div class="stat-row">${statCard(TRADE.exports, 'Exports, 2024', TRADE.exportsNote)}
    ${statCard(TRADE.imports, 'Imports, 2024', TRADE.importsNote)}
    ${statCard(TRADE.china, 'Goods deficit with China', TRADE.chinaNote)}</div>`
    + ledgerTable('The 2024 balance, billions of dollars', ['2024 balance', 'Billions of dollars'], rows, rows.length - 1)
    + `<aside class="note"><strong>About the vintage.</strong> ${TRADE.vintageNote}</aside>`
    + cite(TRADE.source)
    + pageNav('trade');
}

export function viewHealth() {
  const coverage = HEALTH.coverage.map((c, i) => [c[0], c[1], [TEAL, INK, GOLD][i]]);
  return pageHead('07', 'Health', 'Health', 'Americans lived longer in 2024 than ever before: life expectancy '
    + 'reached 79.0 years, a record, as the death rate fell sharply from 2023.')
    + `<div class="stat-row">${statCard(HEALTH.life, 'Life expectancy at birth, 2024', HEALTH.lifeNote)}
    ${statCard(HEALTH.deathRate, 'Deaths per 100,000, 2024', HEALTH.deathRateNote)}
    ${statCard(HEALTH.uninsured, 'Without health insurance, 2024', HEALTH.uninsuredNote)}</div>`
    + ledgerTable('Health, year on year',
      ['', '2023', '2024'],
      [['Life expectancy at birth', '78.4 yrs', '79.0 yrs'], ['Age-adjusted death rate (per 100,000)', '750.5', '722.1']])
    + `<p class="chart-cap">Life expectancy in 2024: men 76.5 years, women 81.4 years.</p>`
    + `<div class="chart-box wide">${shareBars(coverage, { title: 'Health insurance coverage, 2024 (% of people)', unit: '%' })}
    <p class="chart-cap">${HEALTH.coverageNote}</p>${cite(HEALTH.source)}</div>`
    + pageNav('health');
}

export function viewEducation() {
  return pageHead('08', 'Education', 'Education', 'More American teenagers finish high school on time than ever: '
    + '87.4% of the 2022–23 cohort graduated within four years.')
    + `<div class="stat-row">${statCard(EDUCATION.graduation, 'High-school graduation rate, 2022–23', EDUCATION.graduationNote)}</div>`
    + ledgerTable('The graduation rate, then and now',
      ['', '2010–11', '2022–23'],
      [['Public high-school graduation rate (ACGR)', '79%', '87.4%']])
    + `<p>${EDUCATION.context}</p>`
    + cite(EDUCATION.source)
    + pageNav('education');
}

export function viewEnergy() {
  const mix = ENERGY.mix.map((m, i) => [m[0], m[1], [GOLD, TEAL, INK, '#5a5148', '#c9bda6'][i]]);
  const renewRows = ENERGY.renewables.map((r) => [r[0], r[1].toFixed(1) + '%']);
  renewRows.push(['All renewables', '23.0%']);
  return pageHead('09', 'Energy', 'Energy', 'The United States generated 4.30 trillion kilowatt-hours of electricity '
    + 'in 2024. Natural gas supplied the largest share; renewables supplied nearly a quarter.')
    + `<div class="stat-row">${statCard(ENERGY.generation, 'Electricity generated, 2024', ENERGY.generationNote)}
    ${statCard(ENERGY.production, 'Quadrillion BTU produced, 2024', ENERGY.productionNote)}</div>`
    + `<div class="chart-box wide">${mixDonut(mix, { title: 'Electricity generation mix, 2024', centre: '4.30T', centreSub: 'kWh, 2024' })}
    <p class="chart-cap">${ENERGY.mixNote}</p>${cite(ENERGY.source)}</div>`
    + ledgerTable('Renewables, share of all generation, 2024',
      ['Renewable source', 'Share of generation'],
      renewRows, renewRows.length - 1)
    + `<p class="chart-cap">${ENERGY.renewablesNote}</p>`
    + pageNav('energy');
}

export function viewDebt() {
  const rows = DEBT.ledger.map((r) => [r[0], r[1]]);
  return pageHead('10', 'Government debt', 'Government debt', 'The federal government owed $37.6 trillion at the end '
    + 'of fiscal year 2025 — about $30.3 trillion of it held by the public, the rest owed to its own trust funds.')
    + `<div class="stat-row">${statCard(DEBT.total, 'Total federal debt, 30 Sep 2025', DEBT.totalNote)}
    ${statCard(DEBT.increase, 'Added during FY2025', DEBT.increaseNote)}
    ${statCard(DEBT.public, 'Held by the public', DEBT.publicNote)}
    ${statCard(DEBT.intra, 'Intragovernmental', DEBT.intraNote)}
    ${statCard(DEBT.deficit, 'Budget deficit, FY2025', DEBT.deficitNote)}</div>`
    + ledgerTable('The federal debt, trillions of dollars, FY2025',
      ['FY2025', 'Trillions of dollars'],
      rows, 0)
    + `<p class="chart-cap">Figures are rounded to one decimal place; the components sum to $37.7 trillion against a published total of $37.6 trillion.</p>`
    + cite(DEBT.source)
    + pageNav('debt');
}

export function viewSources() {
  const rows = [
    ['Population', POPULATION.source],
    ['Economy / GDP', ECONOMY.source],
    ['Income & poverty', INCOME.source],
    ['Jobs', JOBS.source],
    ['Prices', PRICES.source],
    ['Trade', TRADE.source],
    ['Health', HEALTH.source],
    ['Education', EDUCATION.source],
    ['Energy', ENERGY.source],
    ['Government debt', DEBT.source],
  ];
  const list = rows.map(([t, s]) => `<tr><th scope="row">${t}</th><td>${s}</td></tr>`).join('');
  return pageHead('§', 'Sources &amp; methods', 'Sources &amp; methods', 'Every figure on this site names the agency '
    + 'that published it and the year it covers. This page collects them in one place, with the rules the site follows.')
    + `<table class="sources-table"><thead><tr><th>Subject</th><th>Source</th></tr></thead><tbody>${list}</tbody></table>`
    + `<h2>The rules</h2><ul class="fact-list">`
    + `<li><strong>One vintage per series.</strong> Where a series was revised, the page says which vintage it uses and never mixes two.</li>`
    + `<li><strong>Gaps are shown, not filled.</strong> October 2025 has no official unemployment rate or CPI; the charts leave it blank.</li>`
    + `<li><strong>Derived figures are labelled.</strong> GDP per person and the states’ shares of the population are computed from published figures and say so.</li>`
    + `<li><strong>No figure without a source.</strong> A number the primary source could not confirm is not on the site.</li></ul>`
    + `<p><a href="#/">← Back to the homepage</a></p>`;
}

export const ROUTES = {
  '/': { title: 'The Union Ledger — United States statistics', render: viewHome },
  '/population': { title: 'Population — The Union Ledger', render: viewPopulation },
  '/economy': { title: 'Economy — The Union Ledger', render: viewEconomy },
  '/income': { title: 'Income — The Union Ledger', render: viewIncome },
  '/jobs': { title: 'Jobs — The Union Ledger', render: viewJobs },
  '/prices': { title: 'Prices — The Union Ledger', render: viewPrices },
  '/trade': { title: 'Trade — The Union Ledger', render: viewTrade },
  '/health': { title: 'Health — The Union Ledger', render: viewHealth },
  '/education': { title: 'Education — The Union Ledger', render: viewEducation },
  '/energy': { title: 'Energy — The Union Ledger', render: viewEnergy },
  '/debt': { title: 'Government debt — The Union Ledger', render: viewDebt },
  '/sources': { title: 'Sources & methods — The Union Ledger', render: viewSources },
};
